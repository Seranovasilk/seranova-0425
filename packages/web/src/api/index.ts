import { Hono } from 'hono';
import { cors } from "hono/cors";
import Stripe from "stripe";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { db } from "./database/index.ts";
import { products } from "./database/schema.ts";
import { eq } from "drizzle-orm";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.S3_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.S3_BUCKET!;

const app = new Hono()
  .basePath('api')
  .use(cors({ origin: (origin) => origin ?? "*", credentials: true }))
  .get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }))
  .get('/health', (c) => c.json({ status: 'ok' }))

  // ─── PRODUCTS ───────────────────────────────────────────────────────────────

  // List all active products
  .get('/products', async (c) => {
    const all = await db.select().from(products).orderBy(products.createdAt);
    return c.json(all);
  })

  // Create product
  .post('/products', async (c) => {
    const body = await c.req.json();
    const [product] = await db.insert(products).values({
      name: body.name,
      price: body.price,
      description: body.description ?? "",
      image: body.image ?? "",
      badge: body.badge ?? "",
      active: body.active ?? true,
    }).returning();
    return c.json(product, 201);
  })

  // Update product
  .put('/products/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const body = await c.req.json();
    const [product] = await db.update(products).set({
      name: body.name,
      price: body.price,
      description: body.description,
      image: body.image,
      badge: body.badge,
      active: body.active,
    }).where(eq(products.id, id)).returning();
    return c.json(product);
  })

  // Delete product
  .delete('/products/:id', async (c) => {
    const id = Number(c.req.param('id'));
    await db.delete(products).where(eq(products.id, id));
    return c.json({ ok: true });
  })

  // Upload image → presigned URL
  .post('/products/upload-url', async (c) => {
    const { filename, contentType } = await c.req.json();
    const key = `products/${Date.now()}-${filename}`;
    const cmd = new PutObjectCommand({ Bucket: BUCKET, Key: key, ContentType: contentType });
    const url = await getSignedUrl(s3, cmd, { expiresIn: 300 });
    const publicUrl = `${process.env.S3_ENDPOINT}/${BUCKET}/${key}`;
    return c.json({ url, publicUrl });
  })

  // ─── CHECKOUT ────────────────────────────────────────────────────────────────

  .post('/checkout', async (c) => {
    const body = await c.req.json();
    const { items } = body as { items: { name: string; price: number; quantity: number; image?: string }[] };
    const origin = c.req.header('origin') || 'http://localhost:4200';

    if (!stripe) return c.json({ error: 'Stripe not configured' }, 500);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            ...(item.image ? { images: [item.image] } : {}),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
      shipping_address_collection: { allowed_countries: ['IT', 'FR', 'DE', 'GB', 'ES', 'NL', 'BE', 'PT', 'US'] },
      shipping_options: [{ shipping_rate_data: { type: 'fixed_amount', fixed_amount: { amount: 0, currency: 'eur' }, display_name: 'Spedizione gratuita' } }],
      billing_address_collection: 'auto',
    });

    return c.json({ url: session.url }, 200);
  })

  // ─── ORDER ───────────────────────────────────────────────────────────────────

  .get('/order/:sessionId', async (c) => {
    const { sessionId } = c.req.param();
    if (!stripe) return c.json({ error: 'Stripe not configured' }, 500);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer_details'],
    });
    return c.json({
      status: session.payment_status,
      customerEmail: session.customer_details?.email,
      customerName: session.customer_details?.name,
      amount: session.amount_total,
      currency: session.currency,
      items: session.line_items?.data ?? [],
    }, 200);
  });

export type AppType = typeof app;
export default app;
