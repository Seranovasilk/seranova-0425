import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Star, ChevronRight, ArrowRight, Check, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "wouter";
import { hc } from "hono/client";
import type { AppType } from "../../../api";
import { CartProvider, useCart } from "../lib/cart";
import { CartDrawer } from "../components/cart-drawer";

const api = hc<AppType>("/").api;

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

type Product = { id: number; name: string; price: number; image: string; badge: string; description: string; active: boolean };
const FALLBACK: Product[] = [
  { id: 1, name: "Federa per Cuscino in Seta — Talpa", price: 59.99, image: "/taupe-silk.png", badge: "Novità", description: "Seta di gelso Grade 6A 22 Momme · Chiusura con zip · Confezione regalo inclusa", active: true },
];

const features = [
  { title: "100% Seta di Gelso", desc: "La più pregiata seta Grade 6A per una morbidezza e durabilità senza pari.", icon: "✦" },
  { title: "Pelle e Capelli Perfetti", desc: "Riduce l'attrito — svegliati con la pelle più liscia e capelli senza crespo.", icon: "✦" },
  { title: "Termoregolante", desc: "La seta naturalmente traspirante ti mantiene fresca in estate e calda in inverno.", icon: "✦" },
  { title: "Ipoallergenica", desc: "Naturalmente resistente agli acari, alla muffa e agli allergeni.", icon: "✦" },
];

const testimonials = [
  { name: "Sofia M.", location: "Milano, Italia", text: "Non sapevo quanto la mia federa influenzasse la mia pelle. Dopo una settimana con Seranova, la mia dermatologa ha notato subito i miglioramenti.", stars: 5 },
  { name: "Claire D.", location: "Parigi, Francia", text: "La qualità è assolutamente incredibile. È come dormire su una nuvola. Ne ho ordinate tre — una per ogni letto di casa.", stars: 5 },
  { name: "Emma R.", location: "Londra, UK", text: "Vale ogni centesimo. I capelli al mattino sono molto meno aggrovigliati e il tessuto è divino. Lusso allo stato puro.", stars: 5 },
];

const blogPosts = [
  { title: "Perché la Seta è il Segreto per Dormire Meglio", date: "28 Aprile 2026", image: "/blog1.jpg", tag: "Sonno & Benessere", slug: "/blog/sonno-e-benessere" },
  { title: "Come Prendersi Cura della Federa in Seta", date: "3 Maggio 2026", image: "/blog2.jpg", tag: "Guida alla Cura", slug: "/blog/cura-della-federa" },
];

function SiteContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(FALLBACK);
  const { addItem, count } = useCart();

  const heroSection = useInView(0.1);
  const featuresSection = useInView();
  const productsSection = useInView();
  const aboutSection = useInView();
  const testimonialsSection = useInView();
  const blogSection = useInView();
  const newsletterSection = useInView();

  useEffect(() => {
    api.products.$get().then(r => r.json()).then(data => {
      const active = (data as Product[]).filter(p => p.active);
      if (active.length > 0) setProducts(active);
    }).catch(() => {});
  }, []);

  const handleAdd = (p: Product) => {
    addItem({ id: p.id, name: p.name, price: p.price, image: p.image });
    setCartOpen(true);
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#FAF7F2", color: "#1A1208" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* NAVBAR */}
      <nav style={{ backgroundColor: "#FAF7F2", borderBottom: "1px solid #E8D5A3", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.7rem", fontWeight: 500, letterSpacing: "0.04em" }}>
            Seranova <span style={{ color: "#C9A84C" }}>Silk</span>
          </div>
          <div style={{ display: "flex", gap: "2.5rem" }}>
            {["Shop", "Collezioni", "Chi Siamo", "Blog"].map(item => (
              <a key={item} href="#" style={{ fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B5B3E", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#C9A84C")}
                onMouseLeave={e => (e.currentTarget.style.color = "#6B5B3E")}
              >{item}</a>
            ))}
          </div>
          <button onClick={() => setCartOpen(true)} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: "#1A1208" }}>
            <ShoppingBag size={22} />
            {count > 0 && (
              <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#C9A84C", color: "#fff", borderRadius: "50%", width: "18px", height: "18px", fontSize: "0.65rem", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>{count}</span>
            )}
          </button>
        </div>
      </nav>

      {/* SALE BANNER */}
      <Link href="/preorder" style={{ display: "block", background: "#1A1208", color: "#E8D5A3", textAlign: "center", padding: "0.7rem", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500, textDecoration: "none" }}>
        🎉 Pre-ordine Aperto — Prezzo Lancio €59.99 · Solo 23 Posti <span style={{ color: "#C9A84C", marginLeft: "0.5rem" }}>→ Prenota ora</span>
      </Link>

      {/* HERO */}
      <section ref={heroSection.ref} style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="/hero.jpg" alt="Hero" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,18,8,0.72) 0%, rgba(26,18,8,0.2) 60%, transparent 100%)" }} />
        </div>
        <div style={{
          position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "0 3rem",
          opacity: heroSection.inView ? 1 : 0, transform: heroSection.inView ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.9s ease, transform 0.9s ease"
        }}>
          <p style={{ color: "#C9A84C", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 500, marginBottom: "1.2rem" }}>✦ Seta di Gelso Premium ✦</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "#FAF7F2", fontWeight: 400, lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: "600px" }}>
            Dormi nel Lusso,<br /><em style={{ color: "#E8D5A3" }}>Svegliati nella Seta.</em>
          </h1>
          <p style={{ color: "#E8D5A3", fontSize: "1rem", maxWidth: "420px", lineHeight: 1.8, marginBottom: "2.5rem", fontWeight: 300 }}>
            Federe in seta artigianali che trasformano il tuo sonno in un rituale da spa. La tua pelle e i tuoi capelli te ne saranno grati.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: "#C9A84C", color: "#FAF7F2", border: "none", padding: "1rem 2.4rem", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.6rem" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#b8933e")}
              onMouseLeave={e => (e.currentTarget.style.background = "#C9A84C")}
            >Acquista Ora <ArrowRight size={16} /></button>
            <button style={{ background: "transparent", color: "#FAF7F2", border: "1px solid rgba(255,255,255,0.4)", padding: "1rem 2.4rem", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer" }}>
              Scopri di Più
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginTop: "3rem" }}>
            <div style={{ display: "flex" }}>{[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#C9A84C" color="#C9A84C" />)}</div>
            <span style={{ color: "#E8D5A3", fontSize: "0.82rem" }}>4.9/5 da oltre 560 clienti soddisfatti</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featuresSection.ref} style={{ padding: "6rem 2rem", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem", opacity: featuresSection.inView ? 1 : 0, transform: featuresSection.inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease" }}>
          <p style={{ color: "#C9A84C", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.8rem" }}>Perché Seranova</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400 }}>La Differenza della Seta</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
          {features.map((f, i) => (
            <div key={i} style={{ padding: "2.5rem 2rem", border: "1px solid #E8D5A3", textAlign: "center", background: "#fff", opacity: featuresSection.inView ? 1 : 0, transform: featuresSection.inView ? "translateY(0)" : "translateY(30px)", transition: `all 0.8s ease ${i * 0.12}s` }}>
              <div style={{ color: "#C9A84C", fontSize: "1.4rem", marginBottom: "1rem" }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 500, marginBottom: "0.8rem" }}>{f.title}</h3>
              <p style={{ color: "#6B5B3E", fontSize: "0.85rem", lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ textAlign: "center", padding: "0 2rem 2rem" }}>
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #C9A84C, transparent)", maxWidth: "800px", margin: "0 auto" }} />
      </div>

      {/* PRODUCTS */}
      <section id="products" ref={productsSection.ref} style={{ padding: "4rem 2rem 6rem", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem", opacity: productsSection.inView ? 1 : 0, transition: "opacity 0.8s ease" }}>
          <div>
            <p style={{ color: "#C9A84C", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.6rem" }}>La Nostra Collezione</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400 }}>Prodotti in Evidenza</h2>
          </div>
          <a href="#" style={{ color: "#C9A84C", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.4rem" }}>
            Vedi Tutti <ChevronRight size={16} />
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "3rem", maxWidth: "900px" }}>
          {products.map((p, i) => (
            <div key={p.id} className="product-card" style={{ opacity: productsSection.inView ? 1 : 0, transform: productsSection.inView ? "translateY(0)" : "translateY(40px)", transition: `all 0.8s ease ${i * 0.1}s`, cursor: "pointer", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "center" }}>
              <div style={{ position: "relative", overflow: "hidden", aspectRatio: "1", background: "#EDE8DF" }}>
                <img src={p.image} alt={p.name} className="product-img" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
                {p.badge && (
                  <span style={{ position: "absolute", top: "1rem", left: "1rem", padding: "0.3rem 0.8rem", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: "#C9A84C", color: "#FAF7F2" }}>{p.badge}</span>
                )}
              </div>
              <div>
                <div style={{ display: "flex", marginBottom: "0.6rem", gap: "2px" }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={13} fill="#C9A84C" color="#C9A84C" />)}
                  <span style={{ fontSize: "0.72rem", color: "#6B5B3E", marginLeft: "0.4rem" }}>({p.reviews})</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 500, marginBottom: "0.8rem", lineHeight: 1.2 }}>{p.name}</h3>
                <p style={{ color: "#6B5B3E", fontSize: "0.78rem", marginBottom: "0.5rem" }}>{(p as any).description}</p>
                <div style={{ margin: "1rem 0 1.5rem" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 500, color: "#1A1208" }}>€{p.price.toFixed(2)}</span>
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  {["Riduce il crespo e protegge i capelli", "Mantiene l'idratazione della pelle", "Termoregolante tutto l'anno", "Confezione regalo inclusa"].map(b => (
                    <div key={b} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                      <Check size={13} color="#C9A84C" />
                      <span style={{ fontSize: "0.78rem", color: "#6B5B3E" }}>{b}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => handleAdd(p)}
                  style={{ width: "100%", background: "#C9A84C", color: "#FAF7F2", border: "none", padding: "0.9rem 1.5rem", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#b8933e")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#C9A84C")}
                >
                  <ShoppingBag size={15} /> Aggiungi al Carrello
                </button>
                <p style={{ textAlign: "center", fontSize: "0.7rem", color: "#6B5B3E", marginTop: "0.6rem" }}>🔒 Pagamento sicuro · Spedizione gratuita</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section ref={aboutSection.ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "500px" }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img src="/about.jpg" alt="Chi Siamo" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s ease", transform: aboutSection.inView ? "scale(1)" : "scale(1.05)" }} />
        </div>
        <div style={{ background: "#1A1208", display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem 4rem", opacity: aboutSection.inView ? 1 : 0, transform: aboutSection.inView ? "translateX(0)" : "translateX(40px)", transition: "all 0.9s ease" }}>
          <p style={{ color: "#C9A84C", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1rem" }}>La Nostra Storia</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "#FAF7F2", fontWeight: 400, lineHeight: 1.2, marginBottom: "1.5rem" }}>
            Nata da una Passione<br /><em style={{ color: "#E8D5A3" }}>per il Vivere Raffinato</em>
          </h2>
          <p style={{ color: "#EDE8DF", fontSize: "0.9rem", lineHeight: 1.9, marginBottom: "2rem", fontWeight: 300 }}>
            Seranova Silk nasce dalla convinzione che il vero lusso inizi dove riposa la tua testa. Selezioniamo solo la seta di gelso Grade 6A più pregiata, realizzando ogni federa con cura artigianale affinché tu possa vivere la differenza fin dalla prima notte.
          </p>
          <div style={{ display: "flex", gap: "2rem" }}>
            {[["100%", "Seta di Gelso"], ["6A", "Qualità Grade"], ["500+", "Clienti Felici"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#C9A84C", fontWeight: 400 }}>{n}</div>
                <div style={{ color: "#E8D5A3", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={testimonialsSection.ref} style={{ padding: "6rem 2rem", background: "#FFF8EE" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem", opacity: testimonialsSection.inView ? 1 : 0, transition: "opacity 0.8s ease" }}>
            <p style={{ color: "#C9A84C", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.8rem" }}>Recensioni</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400 }}>Cosa Dicono i Nostri Clienti</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: "#fff", padding: "2.5rem", borderLeft: "3px solid #C9A84C", opacity: testimonialsSection.inView ? 1 : 0, transform: testimonialsSection.inView ? "translateY(0)" : "translateY(30px)", transition: `all 0.8s ease ${i * 0.12}s` }}>
                <div style={{ display: "flex", gap: "2px", marginBottom: "1.2rem" }}>{[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#C9A84C" color="#C9A84C" />)}</div>
                <p style={{ color: "#1A1208", fontSize: "0.92rem", lineHeight: 1.8, marginBottom: "1.5rem", fontStyle: "italic" }}>"{t.text}"</p>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{t.name}</div>
                  <div style={{ color: "#6B5B3E", fontSize: "0.78rem" }}>{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section style={{ padding: "5rem 2rem", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 600, marginBottom: "0.8rem" }}>La Differenza che si Vede</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 400, color: "#1A1208", marginBottom: "1rem" }}>
            Una Notte Cambia Tutto
          </h2>
          <p style={{ color: "#6B5B3E", fontSize: "0.85rem", maxWidth: "520px", margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            La federa in cotone crea attrito sui capelli durante il sonno. La seta no. Il risultato parla da solo.
          </p>
          <img
            src="/before-after.png"
            alt="Prima e dopo: capelli aggrovigliati vs capelli lisci dormendo su federa in seta"
            style={{ width: "100%", maxWidth: "900px", display: "block", margin: "0 auto", boxShadow: "0 8px 48px rgba(0,0,0,0.10)" }}
          />
        </div>
      </section>

      {/* BLOG */}
      <section ref={blogSection.ref} style={{ padding: "6rem 2rem", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem", opacity: blogSection.inView ? 1 : 0, transition: "opacity 0.8s ease" }}>
          <div>
            <p style={{ color: "#C9A84C", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Dal Nostro Diario</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400 }}>Il Mondo della Seta</h2>
          </div>
          <a href="#" style={{ color: "#C9A84C", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.4rem" }}>Tutti gli Articoli <ChevronRight size={16} /></a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem" }}>
          {blogPosts.map((b, i) => (
            <Link key={i} href={b.slug} style={{ textDecoration: "none", color: "inherit", display: "block", opacity: blogSection.inView ? 1 : 0, transform: blogSection.inView ? "translateY(0)" : "translateY(30px)", transition: `all 0.8s ease ${i * 0.15}s`, cursor: "pointer" }}>
              <div style={{ overflow: "hidden", aspectRatio: "16/9", marginBottom: "1.5rem" }}>
                <img src={b.image} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
              </div>
              <span style={{ background: "#E8D5A3", color: "#6B5B3E", padding: "0.25rem 0.8rem", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>{b.tag}</span>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 500, marginTop: "0.8rem", marginBottom: "0.4rem", lineHeight: 1.3 }}>{b.title}</h3>
              <p style={{ color: "#6B5B3E", fontSize: "0.78rem" }}>{b.date}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section ref={newsletterSection.ref} style={{ background: "#1A1208", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", opacity: newsletterSection.inView ? 1 : 0, transform: newsletterSection.inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.9s ease" }}>
          <p style={{ color: "#C9A84C", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1rem" }}>Resta Aggiornata</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#FAF7F2", fontWeight: 400, marginBottom: "1rem" }}>Entra nel Circolo Seranova</h2>
          <p style={{ color: "#EDE8DF", fontSize: "0.88rem", lineHeight: 1.8, marginBottom: "2.5rem", fontWeight: 300 }}>
            Accedi in anteprima alle nuove collezioni, sconti esclusivi e consigli per la cura della seta.
          </p>
          <div style={{ display: "flex", maxWidth: "480px", margin: "0 auto" }}>
            <input type="email" placeholder="La tua email" style={{ flex: 1, padding: "1rem 1.5rem", border: "1px solid #6B5B3E", background: "transparent", color: "#FAF7F2", fontSize: "0.85rem", outline: "none" }} />
            <button style={{ background: "#C9A84C", color: "#FAF7F2", border: "none", padding: "1rem 1.8rem", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}>Iscriviti</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "1.2rem" }}>
            <Check size={14} color="#C9A84C" />
            <span style={{ color: "#6B5B3E", fontSize: "0.75rem" }}>Niente spam. Cancellati quando vuoi.</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0F0A04", padding: "4rem 2rem 2rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 500, color: "#FAF7F2", marginBottom: "1rem" }}>
                Seranova <span style={{ color: "#C9A84C" }}>Silk</span>
              </div>
              <p style={{ color: "#6B5B3E", fontSize: "0.83rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>Federe in seta artigianali per una vita vissuta con eleganza.</p>
              <div style={{ display: "flex", gap: "1rem" }}>
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <button key={i} style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
            {[
              { title: "Shop", links: ["Tutte le Federe", "Collezioni", "Confezioni Regalo", "Saldi"] },
              { title: "Info", links: ["La Nostra Storia", "Sostenibilità", "Guida alla Cura", "Blog"] },
              { title: "Assistenza", links: ["FAQ", "Spedizioni e Resi", "Contattaci", "Guida alle Taglie"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ color: "#FAF7F2", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.2rem", fontWeight: 500 }}>{col.title}</h4>
                {col.links.map(link => (
                  <a key={link} href="#" style={{ display: "block", color: "#6B5B3E", fontSize: "0.83rem", textDecoration: "none", marginBottom: "0.6rem" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#C9A84C")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#6B5B3E")}
                  >{link}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ color: "#6B5B3E", fontSize: "0.75rem" }}>© 2026 Seranova Silk. Tutti i diritti riservati.</p>
            <p style={{ color: "#6B5B3E", fontSize: "0.75rem" }}>Privacy Policy · Termini e Condizioni</p>
          </div>
        </div>
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <style>{`
        .product-card:hover .product-img { transform: scale(1.04); }
        @media (max-width: 768px) {
          section[style*="grid-template-columns: 1fr 1fr"] { display: block !important; }
          footer div[style*="grid-template-columns: 2fr"] { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default function Index() {
  return (
    <CartProvider>
      <SiteContent />
    </CartProvider>
  );
}
