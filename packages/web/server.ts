import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import app from "./src/api/index.ts";

const server = new Hono();

// API routes
server.route("/", app);

// Static files
server.use("/*", serveStatic({ root: "./dist" }));

// SPA fallback
server.get("/*", serveStatic({ path: "./dist/index.html" }));

const port = Number(process.env.PORT) || 3000;
console.log(`Server running on port ${port}`);

serve({ fetch: server.fetch, port });
