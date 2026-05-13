import { useState } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { useCart } from "../lib/cart";
import { hc } from "hono/client";
import type { AppType } from "../../../api";

const api = hc<AppType>("/").api;

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQty, total, count } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    setError("");
    try {
      const res = await api.checkout.$post({
        json: {
          items: items.map(i => ({
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: window.location.origin + i.image,
          })),
        },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Impossibile avviare il checkout. Riprova.");
      }
    } catch (e) {
      setError("Qualcosa è andato storto. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          style={{ position: "fixed", inset: 0, background: "rgba(26,18,8,0.5)", zIndex: 200, transition: "opacity 0.3s" }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px, 100vw)",
        background: "#FAF7F2", zIndex: 201, display: "flex", flexDirection: "column",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: "-4px 0 24px rgba(0,0,0,0.12)"
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 1.8rem", borderBottom: "1px solid #E8D5A3" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <ShoppingBag size={20} color="#1A1208" />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 500 }}>
              Il Tuo Carrello {count > 0 && <span style={{ color: "#C9A84C" }}>({count})</span>}
            </span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#1A1208" }}>
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 1.8rem" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: "4rem", color: "#6B5B3E" }}>
              <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: "1rem" }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>Il carrello è vuoto</p>
              <p style={{ fontSize: "0.82rem", marginTop: "0.5rem" }}>Aggiungi una federa per iniziare</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid #EDE8DF" }}>
                <img src={item.image} alt={item.name} style={{ width: "80px", height: "80px", objectFit: "cover", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 500, marginBottom: "0.3rem" }}>{item.name}</p>
                  <p style={{ color: "#C9A84C", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.8rem" }}>€{item.price.toFixed(2)}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid #E8D5A3" }}>
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} style={{ background: "none", border: "none", padding: "0.4rem 0.7rem", cursor: "pointer", color: "#6B5B3E" }}>
                        <Minus size={13} />
                      </button>
                      <span style={{ padding: "0 0.6rem", fontSize: "0.85rem", fontWeight: 500 }}>{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} style={{ background: "none", border: "none", padding: "0.4rem 0.7rem", cursor: "pointer", color: "#6B5B3E" }}>
                        <Plus size={13} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B5B3E" }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                <div style={{ fontWeight: 600, fontSize: "0.95rem", whiteSpace: "nowrap" }}>
                  €{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "1.5rem 1.8rem", borderTop: "1px solid #E8D5A3" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ color: "#6B5B3E", fontSize: "0.85rem" }}>Subtotale</span>
              <span style={{ fontWeight: 600 }}>€{total.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <span style={{ color: "#6B5B3E", fontSize: "0.85rem" }}>Spedizione</span>
              <span style={{ color: "#22a06b", fontSize: "0.85rem" }}>Gratuita</span>
            </div>
            {error && <p style={{ color: "red", fontSize: "0.78rem", marginBottom: "0.8rem", textAlign: "center" }}>{error}</p>}
            <button
              onClick={handleCheckout}
              disabled={loading}
              style={{
                width: "100%", background: "#C9A84C", color: "#FAF7F2", border: "none",
                padding: "1rem", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase",
                fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: "0.6rem", opacity: loading ? 0.8 : 1, transition: "all 0.2s"
              }}
            >
              {loading ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Elaborazione...</> : <>Acquista · €{total.toFixed(2)} <ArrowRight size={16} /></>}
            </button>
            <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#6B5B3E", marginTop: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
              🔒 Pagamento sicuro con Stripe · Apple Pay & Google Pay accettati
            </p>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
