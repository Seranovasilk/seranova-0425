import { useState } from "react";
import { Check, ArrowRight, Star, ShoppingBag, ChevronDown } from "lucide-react";
import { Link } from "wouter";

const faqs = [
  { q: "Quando riceverò il prodotto?", a: "Le prime spedizioni partono entro 21 giorni dall'ordine. Ti aggiorneremo via email in ogni fase." },
  { q: "Posso annullare il pre-ordine?", a: "Sì, puoi annullare in qualsiasi momento prima della spedizione con rimborso completo." },
  { q: "Che qualità è la seta?", a: "Seta di gelso Grade 6A, 22 Momme — lo standard più alto disponibile. Ipoallergenica e termoregolante." },
  { q: "Cosa include la confezione?", a: "Federa in seta, sacchetto porta-indumenti in cotone e una nota scritta a mano." },
];

export default function PreOrder() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !name) return;
    setLoading(true);
    // Simulate API call — replace with real endpoint
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  }

  const ORIGINAL = 79.99;
  const PREORDER = 51.99;
  const DISCOUNT = Math.round((1 - PREORDER / ORIGINAL) * 100);
  const SPOTS_LEFT = 23;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FDFBF7", minHeight: "100vh", color: "#1A1208" }}>

      {/* NAV */}
      <nav style={{ padding: "1.2rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E8D5A3", background: "#FDFBF7", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", letterSpacing: "0.12em", color: "#1A1208", fontWeight: 400 }}>SERANOVA</span>
        </Link>
        <a href="#preorder-form" style={{ background: "#1A1208", color: "#E8D5A3", padding: "0.6rem 1.4rem", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontWeight: 500 }}>
          Prenota ora
        </a>
      </nav>

      {/* HERO */}
      <section style={{ padding: "5rem 2rem 4rem", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#C9A84C", color: "#fff", padding: "0.3rem 1rem", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.8rem" }}>
          Pre-ordine — Posti Limitati
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 400, lineHeight: 1.15, marginBottom: "1.4rem" }}>
          Dormi sulla Seta.<br />Svegliati Perfetta.
        </h1>
        <p style={{ color: "#6B5B3E", fontSize: "1rem", lineHeight: 1.8, maxWidth: "560px", margin: "0 auto 2.5rem" }}>
          La nostra federa in seta di gelso Grade 6A è in arrivo. Prenota ora al prezzo fondatore — solo per i primi 50 clienti.
        </p>

        {/* PRICE */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "0.8rem" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", color: "#1A1208", fontWeight: 400 }}>€{PREORDER}</span>
          <div style={{ textAlign: "left" }}>
            <span style={{ color: "#999", textDecoration: "line-through", fontSize: "1.1rem", display: "block" }}>€{ORIGINAL}</span>
            <span style={{ background: "#E8D5A3", color: "#6B5B3E", padding: "0.1rem 0.5rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em" }}>-{DISCOUNT}% FONDATORE</span>
          </div>
        </div>

        {/* SPOTS */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "2.5rem" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C9A84C", animation: "pulse 2s infinite" }} />
          <span style={{ color: "#C9A84C", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em" }}>Solo {SPOTS_LEFT} posti rimasti</span>
        </div>

        {/* PRODUCT IMAGE */}
        <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto 3rem" }}>
          <img
            src="/taupe-silk.png"
            alt="Federa in seta Seranova — colore talpa"
            style={{ width: "100%", boxShadow: "0 20px 80px rgba(0,0,0,0.12)", display: "block" }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
          <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "#1A1208", color: "#E8D5A3", padding: "0.5rem 0.9rem", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Spedizione Giugno 2026
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="preorder-form" style={{ background: "#1A1208", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
          {!submitted ? (
            <>
              <p style={{ color: "#C9A84C", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.8rem" }}>Prenota il Tuo Posto</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#E8D5A3", fontWeight: 400, marginBottom: "0.8rem" }}>
                Entra nella Lista Fondatori
              </h2>
              <p style={{ color: "#8B7355", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
                Lascia i tuoi dati — ti contatteremo entro 24h per completare l'ordine e garantirti il prezzo fondatore.
              </p>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                  type="text"
                  placeholder="Il tuo nome"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  style={{ padding: "1rem 1.2rem", background: "transparent", border: "1px solid #3A3020", color: "#E8D5A3", fontSize: "0.9rem", outline: "none", fontFamily: "inherit" }}
                />
                <input
                  type="email"
                  placeholder="La tua email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{ padding: "1rem 1.2rem", background: "transparent", border: "1px solid #3A3020", color: "#E8D5A3", fontSize: "0.9rem", outline: "none", fontFamily: "inherit" }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{ background: "#C9A84C", color: "#1A1208", padding: "1rem", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? "Invio..." : <><ShoppingBag size={16} /> Prenota al Prezzo Fondatore</>}
                </button>
              </form>
              <p style={{ color: "#3A3020", fontSize: "0.72rem", marginTop: "1rem", lineHeight: 1.6 }}>
                Nessun addebito ora. Ti contatteremo entro 24h. Cancellazione gratuita in qualsiasi momento.
              </p>
            </>
          ) : (
            <div style={{ padding: "2rem 0" }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#C9A84C", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <Check size={28} color="#1A1208" />
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#E8D5A3", fontWeight: 400, marginBottom: "1rem" }}>
                Sei dentro, {name}!
              </h2>
              <p style={{ color: "#8B7355", fontSize: "0.9rem", lineHeight: 1.7 }}>
                Hai bloccato il prezzo fondatore di €{PREORDER}.<br />
                Ti scriveremo a <strong style={{ color: "#C9A84C" }}>{email}</strong> entro 24h.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* WHY SILK */}
      <section style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "#C9A84C", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.8rem" }}>Perché Sceglierci</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400 }}>La Differenza è nella Qualità</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.5rem" }}>
          {[
            { icon: "✦", title: "Grade 6A", desc: "La classificazione più alta per la seta di gelso. Fibra lunga, liscia, uniforme." },
            { icon: "✦", title: "22 Momme", desc: "Il peso ideale: abbastanza denso da durare anni, abbastanza leggero da respirare." },
            { icon: "✦", title: "Capelli & Pelle", desc: "Riduce l'attrito notturno del 43%. Meno crespo, meno rughe da sonno." },
            { icon: "✦", title: "Confezione Regalo", desc: "Ogni federa arriva in una box luxury — perfetta anche da regalare." },
          ].map((f, i) => (
            <div key={i} style={{ textAlign: "center", padding: "2rem 1rem" }}>
              <div style={{ color: "#C9A84C", fontSize: "1.4rem", marginBottom: "1rem" }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 500, marginBottom: "0.6rem" }}>{f.title}</h3>
              <p style={{ color: "#6B5B3E", fontSize: "0.82rem", lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ background: "#F5F0E8", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#C9A84C", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.8rem" }}>Chi ci Ha Già Scelto</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 400, marginBottom: "3rem" }}>I Fondatori Parlano</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            {[
              { name: "Giulia R.", city: "Milano", text: "Ho pre-ordinato subito appena ho visto la qualità. Non vedo l'ora di riceverla." },
              { name: "Martina C.", city: "Roma", text: "Finalmente una federa in seta italiana di vera qualità. Prezzo fondatore imperdibile." },
              { name: "Sara B.", city: "Firenze", text: "Regalo perfetto per me stessa. La confezione è già bellissima dalle foto." },
            ].map((t, i) => (
              <div key={i} style={{ background: "#fff", padding: "2rem", textAlign: "left" }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "1rem" }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={13} fill="#C9A84C" color="#C9A84C" />)}
                </div>
                <p style={{ color: "#1A1208", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1.2rem", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{t.name}</div>
                <div style={{ color: "#6B5B3E", fontSize: "0.75rem" }}>{t.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "6rem 2rem", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 400 }}>Domande Frequenti</h2>
        </div>
        {faqs.map((f, i) => (
          <div key={i} style={{ borderBottom: "1px solid #E8D5A3", padding: "1.2rem 0" }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left", padding: 0 }}
            >
              <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1A1208" }}>{f.q}</span>
              <ChevronDown size={18} color="#C9A84C" style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }} />
            </button>
            {openFaq === i && (
              <p style={{ color: "#6B5B3E", fontSize: "0.85rem", lineHeight: 1.7, marginTop: "0.8rem", paddingRight: "2rem" }}>{f.a}</p>
            )}
          </div>
        ))}
      </section>

      {/* FINAL CTA */}
      <section style={{ background: "#1A1208", padding: "5rem 2rem", textAlign: "center" }}>
        <p style={{ color: "#C9A84C", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.8rem" }}>Ultimi Posti</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#E8D5A3", fontWeight: 400, marginBottom: "2rem" }}>
          Non Perdere il Prezzo Fondatore
        </h2>
        <a
          href="#preorder-form"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "#C9A84C", color: "#1A1208", padding: "1rem 2.5rem", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, textDecoration: "none" }}
        >
          Prenota ora — €{PREORDER} <ArrowRight size={16} />
        </a>
        <p style={{ color: "#3A3020", fontSize: "0.72rem", marginTop: "1.2rem" }}>Nessun addebito ora · Cancellazione gratuita · Spedizione Giugno 2026</p>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "2rem", textAlign: "center", borderTop: "1px solid #E8D5A3" }}>
        <Link href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#1A1208", textDecoration: "none", letterSpacing: "0.1em" }}>SERANOVA</Link>
        <p style={{ color: "#999", fontSize: "0.72rem", marginTop: "0.5rem" }}>© 2026 Seranova Silk. Tutti i diritti riservati.</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@400;500;600&display=swap');
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #3A3020; }
        input:focus { border-color: #C9A84C !important; }
      `}</style>
    </div>
  );
}
