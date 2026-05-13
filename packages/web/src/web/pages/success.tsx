import { useEffect, useState } from "react";
import { useSearch } from "wouter";
import { CheckCircle, Loader2, Package, Mail, ArrowRight } from "lucide-react";
import { hc } from "hono/client";
import type { AppType } from "../../../api";

const api = hc<AppType>("/").api;

export default function SuccessPage() {
  const search = useSearch();
  const sessionId = new URLSearchParams(search).get("session_id");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) { setLoading(false); return; }
    api.order[":sessionId"].$get({ param: { sessionId } })
      .then(r => r.json())
      .then(data => { setOrder(data); setLoading(false); })
      .catch(() => { setError("Impossibile caricare i dettagli dell'ordine."); setLoading(false); });
  }, [sessionId]);

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "'Poppins', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Logo */}
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 500, marginBottom: "3rem", color: "#1A1208" }}>
        Seranova <span style={{ color: "#C9A84C" }}>Silk</span>
      </div>

      <div style={{ background: "#fff", border: "1px solid #E8D5A3", padding: "3rem", maxWidth: "520px", width: "100%", textAlign: "center" }}>
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", color: "#6B5B3E" }}>
            <Loader2 size={40} style={{ animation: "spin 1s linear infinite", color: "#C9A84C" }} />
            <p style={{ fontSize: "0.9rem" }}>Conferma del tuo ordine...</p>
          </div>
        ) : error ? (
          <div>
            <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>
          </div>
        ) : (
          <>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(201,168,76,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <CheckCircle size={38} color="#C9A84C" />
            </div>

            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 400, color: "#1A1208", marginBottom: "0.5rem" }}>
              Grazie{order?.customerName ? `, ${order.customerName.split(" ")[0]}` : ""}!
            </h1>
            <p style={{ color: "#6B5B3E", fontSize: "0.88rem", lineHeight: 1.8, marginBottom: "2rem" }}>
              Il tuo ordine è stato confermato e viene preparato con cura. Riceverai una email di conferma a breve.
            </p>

            {/* Order details */}
            <div style={{ background: "#FAF7F2", border: "1px solid #EDE8DF", padding: "1.5rem", marginBottom: "2rem", textAlign: "left" }}>
              {order?.customerEmail && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.8rem" }}>
                  <Mail size={15} color="#C9A84C" />
                  <span style={{ fontSize: "0.82rem", color: "#6B5B3E" }}>Conferma inviata a <strong style={{ color: "#1A1208" }}>{order.customerEmail}</strong></span>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.8rem" }}>
                <Package size={15} color="#C9A84C" />
                <span style={{ fontSize: "0.82rem", color: "#6B5B3E" }}>Consegna stimata: <strong style={{ color: "#1A1208" }}>3–5 giorni lavorativi</strong></span>
              </div>

              {order?.items?.length > 0 && (
                <div style={{ marginTop: "1rem", borderTop: "1px solid #E8D5A3", paddingTop: "1rem" }}>
                  {order.items.map((item: any, i: number) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "0.4rem" }}>
                      <span style={{ color: "#1A1208" }}>{item.description} × {item.quantity}</span>
                      <span style={{ color: "#1A1208", fontWeight: 500 }}>€{(item.amount_total / 100).toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: "1px solid #E8D5A3", marginTop: "0.8rem", paddingTop: "0.8rem", display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                    <span>Totale</span>
                    <span style={{ color: "#C9A84C" }}>€{order?.amount ? (order.amount / 100).toFixed(2) : "—"}</span>
                  </div>
                </div>
              )}
            </div>

            <a href="/" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "#C9A84C", color: "#FAF7F2", textDecoration: "none",
              padding: "0.9rem 2rem", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600
            }}>
              Continua lo Shopping <ArrowRight size={15} />
            </a>
          </>
        )}
      </div>

      <p style={{ marginTop: "2rem", color: "#6B5B3E", fontSize: "0.75rem" }}>
        Domande? <a href="mailto:hello@seranovasilk.com" style={{ color: "#C9A84C" }}>hello@seranovasilk.com</a>
      </p>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
