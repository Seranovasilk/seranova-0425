import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function CuraDellaFedera() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", fontFamily: "'Poppins', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <header style={{ borderBottom: "1px solid #E8D5A3", background: "#FAF7F2", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/">
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 500, color: "#1A1208", cursor: "pointer" }}>
              Seranova <span style={{ color: "#C9A84C" }}>Silk</span>
            </span>
          </Link>
          <Link href="/">
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "#6B5B3E", cursor: "pointer", letterSpacing: "0.05em" }}>
              <ArrowLeft size={14} /> Torna al sito
            </span>
          </Link>
        </div>
      </header>

      {/* Article */}
      <article style={{ maxWidth: "720px", margin: "0 auto", padding: "4rem 2rem 6rem" }}>
        {/* Tag */}
        <div style={{ marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 600 }}>
            Guida alla Cura
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "#1A1208", lineHeight: 1.2, marginBottom: "1rem" }}>
          Come Prendersi Cura della Federa in Seta
        </h1>

        <p style={{ fontSize: "0.8rem", color: "#6B5B3E", marginBottom: "3rem" }}>3 Maggio 2026 · 4 min di lettura</p>

        {/* Hero image placeholder */}
        <div style={{ width: "100%", height: "360px", background: "linear-gradient(135deg, #E8D5A3 0%, #C9A84C22 100%)", marginBottom: "3rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "#C9A84C", opacity: 0.5, fontStyle: "italic" }}>Seranova Silk</span>
        </div>

        {/* Body */}
        <div style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "#3A2E1E" }}>
          <p style={{ marginBottom: "1.8rem" }}>
            La seta è un tessuto straordinario, ma richiede attenzione. La buona notizia è che prendersi cura di una federa in seta è più semplice di quanto si pensi — basta conoscere le poche regole fondamentali. Seguirle significa avere una federa che dura anni mantenendo la sua morbidezza e lucentezza originali.
          </p>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: "#1A1208", margin: "2.5rem 0 1rem" }}>
            Lavaggio: la regola d'oro
          </h2>
          <p style={{ marginBottom: "1.8rem" }}>
            La seta va lavata a freddo — massimo 30°C. Il calore è il principale nemico delle fibre di seta: le indebolisce, le restringe e le rende opache nel tempo. Puoi lavare a mano con un detergente delicato per capi delicati, oppure usare la lavatrice impostando il programma "delicati" o "seta" con centrifuga bassa (max 400 giri). Evita assolutamente il programma cotone.
          </p>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: "#1A1208", margin: "2.5rem 0 1rem" }}>
            Detersivo: scegli con cura
          </h2>
          <p style={{ marginBottom: "1.8rem" }}>
            I detergenti aggressivi, quelli con enzimi o con candeggina, degradano la struttura proteica della seta. Usa un detergente specifico per seta o capi delicati, oppure semplicemente uno shampoo delicato — le fibre di seta, essendo di origine proteica come i capelli, rispondono benissimo. Dosi ridotte rispetto a quelle indicate: la seta non ha bisogno di molto.
          </p>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: "#1A1208", margin: "2.5rem 0 1rem" }}>
            Asciugatura: mai il calore
          </h2>
          <p style={{ marginBottom: "1.8rem" }}>
            L'asciugatrice è vietata. Il caldo diretto — che sia dell'asciugatrice, del phon o del sole diretto — danneggia irreversibilmente la seta. Dopo il lavaggio, stendi delicatamente la federa all'ombra, preferibilmente su una superficie piana per evitare che si deformi. Si asciuga rapidamente, spesso in poche ore.
          </p>

          <blockquote style={{ borderLeft: "3px solid #C9A84C", paddingLeft: "1.5rem", margin: "2.5rem 0", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontStyle: "italic", color: "#6B5B3E", lineHeight: 1.6 }}>
            "Tratta la tua federa in seta come un capo di alta qualità: con rispetto e metodo. Durerà anni."
          </blockquote>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: "#1A1208", margin: "2.5rem 0 1rem" }}>
            Stiratura: se necessario
          </h2>
          <p style={{ marginBottom: "1.8rem" }}>
            La seta di buona qualità, stesa correttamente ad asciugare, non ha bisogno di essere stirata. Se vuoi comunque stirarla, usa il ferro alla temperatura più bassa, con la federa ancora leggermente umida e sempre con un panno di cotone interposto tra il ferro e la seta. Mai il vapore direttamente sulle fibre.
          </p>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: "#1A1208", margin: "2.5rem 0 1rem" }}>
            Conservazione e frequenza di lavaggio
          </h2>
          <p style={{ marginBottom: "1.8rem" }}>
            Si consiglia di lavare la federa ogni 1–2 settimane, come qualsiasi altra federa. Se hai una seconda federa da alternare, la vita di entrambe si allunga notevolmente. Conserva la seta al riparo dalla luce diretta del sole e lontano da fonti di calore. Evita le grucce metalliche che potrebbero lasciare segni sulle fibre.
          </p>

          {/* Quick guide */}
          <div style={{ background: "#fff", border: "1px solid #E8D5A3", padding: "2rem", margin: "2.5rem 0" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#1A1208", marginBottom: "1.2rem", fontWeight: 500 }}>
              Promemoria rapido
            </p>
            {[
              { icon: "✓", text: "Lava a 30°C, programma delicati" },
              { icon: "✓", text: "Detersivo delicato o per seta" },
              { icon: "✓", text: "Asciuga all'ombra, in piano" },
              { icon: "✓", text: "Ferro bassa temperatura con panno interposto" },
              { icon: "✗", text: "No asciugatrice" },
              { icon: "✗", text: "No candeggina o enzimi" },
              { icon: "✗", text: "No sole diretto" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.6rem", fontSize: "0.85rem" }}>
                <span style={{ color: item.icon === "✓" ? "#22a06b" : "#e53e3e", fontWeight: 700, width: "16px", flexShrink: 0 }}>{item.icon}</span>
                <span style={{ color: "#3A2E1E" }}>{item.text}</span>
              </div>
            ))}
          </div>

          <p style={{ marginBottom: "1.8rem" }}>
            Con la giusta cura, una federa Seranova Silk diventa un compagno fedele per anni — mantenendo quella sensazione di fresco vellutato che rende ogni notte un piccolo lusso quotidiano.
          </p>
        </div>

        {/* CTA */}
        <div style={{ marginTop: "4rem", padding: "2.5rem", background: "#fff", border: "1px solid #E8D5A3", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 400, color: "#1A1208", marginBottom: "0.5rem" }}>
            Non hai ancora la tua federa?
          </p>
          <p style={{ fontSize: "0.82rem", color: "#6B5B3E", marginBottom: "1.5rem" }}>
            Federa in seta Grade 6A · 22 Momme · Spedizione gratuita
          </p>
          <Link href="/#products">
            <span style={{ display: "inline-block", background: "#C9A84C", color: "#FAF7F2", padding: "0.9rem 2.5rem", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}>
              Scopri la Federa
            </span>
          </Link>
        </div>
      </article>
    </div>
  );
}
