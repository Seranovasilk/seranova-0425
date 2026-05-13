import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function SonnoEBenessere() {
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
            Sonno & Benessere
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "#1A1208", lineHeight: 1.2, marginBottom: "1rem" }}>
          Perché la Seta è il Segreto per Dormire Meglio
        </h1>

        <p style={{ fontSize: "0.8rem", color: "#6B5B3E", marginBottom: "3rem" }}>28 Aprile 2026 · 5 min di lettura</p>

        {/* Hero image placeholder */}
        <div style={{ width: "100%", height: "360px", background: "linear-gradient(135deg, #E8D5A3 0%, #C9A84C22 100%)", marginBottom: "3rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "#C9A84C", opacity: 0.5, fontStyle: "italic" }}>Seranova Silk</span>
        </div>

        {/* Body */}
        <div style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "#3A2E1E" }}>
          <p style={{ marginBottom: "1.8rem" }}>
            Passiamo circa un terzo della nostra vita a dormire. Eppure pochi si chiedono davvero <em>su cosa</em> dormono. Il materiale della federa — quella superficie che tocca il nostro viso per otto ore ogni notte — ha un impatto molto più profondo di quanto si pensi, sia sulla qualità del sonno che sulla salute della pelle e dei capelli.
          </p>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: "#1A1208", margin: "2.5rem 0 1rem" }}>
            La seta regola la temperatura corporea
          </h2>
          <p style={{ marginBottom: "1.8rem" }}>
            A differenza del cotone, che assorbe l'umidità ma trattiene il calore, la seta è naturalmente termoregolante. Le fibre di seta di gelso — in particolare quelle Grade 6A a 22 Momme usate nelle nostre federe — creano un microclima attorno al viso che si adatta alla temperatura corporea. D'estate mantiene fresca la pelle, d'inverno trattiene il calore necessario. Il risultato? Meno risvegli notturni, meno sudorazione, sonno più profondo.
          </p>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: "#1A1208", margin: "2.5rem 0 1rem" }}>
            Addio alle rughe da cuscino
          </h2>
          <p style={{ marginBottom: "1.8rem" }}>
            Le federe in cotone, per quanto morbide, creano attrito contro la pelle. Nel tempo questo attrito — ripetuto notte dopo notte — favorisce la formazione di rughe e segni. La seta ha un coefficiente di attrito tra i più bassi in natura: il viso scivola sulla superficie senza resistenza, riducendo significativamente i segni meccanici che contribuiscono all'invecchiamento cutaneo precoce.
          </p>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: "#1A1208", margin: "2.5rem 0 1rem" }}>
            I capelli ringraziano
          </h2>
          <p style={{ marginBottom: "1.8rem" }}>
            Chi soffre di capelli crespi, spezzati o difficili da gestire al mattino troverà nella seta un alleato inaspettato. L'attrito ridotto preserva la cuticola del capello, evitando l'effetto "nido" tipico del risveglio su cotone. Parrucchieri e dermatologi lo consigliano da anni per chi ha capelli fragili, trattati chimicamente o particolarmente secchi.
          </p>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: "#1A1208", margin: "2.5rem 0 1rem" }}>
            Non assorbe i prodotti per la cura della pelle
          </h2>
          <p style={{ marginBottom: "1.8rem" }}>
            Applichi una crema notte, una siero, un olio. E poi dormi su una federa in cotone che assorbe tutto. La seta è molto meno assorbente: lascia che i principi attivi rimangano sulla tua pelle invece di finire nel tessuto. Se hai una routine skincare, dormire su seta significa semplicemente che funziona meglio.
          </p>

          <blockquote style={{ borderLeft: "3px solid #C9A84C", paddingLeft: "1.5rem", margin: "2.5rem 0", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontStyle: "italic", color: "#6B5B3E", lineHeight: 1.6 }}>
            "Piccoli cambiamenti nelle abitudini notturne producono risultati visibili nel tempo. La federa è il cambiamento più semplice che puoi fare."
          </blockquote>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: "#1A1208", margin: "2.5rem 0 1rem" }}>
            Non tutta la seta è uguale
          </h2>
          <p style={{ marginBottom: "1.8rem" }}>
            Il mercato è pieno di prodotti che si definiscono "seta" ma sono in realtà raso di poliestere o seta di bassa qualità. I parametri da controllare sono due: la qualità (Grade 6A è la più alta disponibile) e il peso, misurato in Momme. Sotto i 19 Momme la federa è troppo sottile e fragile; sopra i 25 diventa rigida. I 22 Momme rappresentano il punto di equilibrio ideale tra morbidezza, durata e sensazione al tatto.
          </p>

          <p style={{ marginBottom: "1.8rem" }}>
            Le nostre federe Seranova Silk sono realizzate esclusivamente in seta di gelso Grade 6A a 22 Momme, con chiusura a zip nascosta per un aspetto pulito e una confezione regalo inclusa. Un investimento nel tuo riposo — e nella tua pelle.
          </p>
        </div>

        {/* CTA */}
        <div style={{ marginTop: "4rem", padding: "2.5rem", background: "#fff", border: "1px solid #E8D5A3", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 400, color: "#1A1208", marginBottom: "0.5rem" }}>
            Pronta a dormire meglio?
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
