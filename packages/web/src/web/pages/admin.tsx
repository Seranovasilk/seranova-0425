import { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, X, Check, Loader2, ImagePlus, Eye, EyeOff } from "lucide-react";
import { hc } from "hono/client";
import type { AppType } from "../../../api";

const api = hc<AppType>("/").api;

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  badge: string;
  active: boolean;
};

const empty = (): Omit<Product, "id"> => ({
  name: "",
  price: 0,
  description: "",
  image: "",
  badge: "",
  active: true,
});

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; product: Omit<Product, "id"> & { id?: number } }>({
    open: false,
    product: empty(),
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const res = await api.products.$get();
    const data = await res.json();
    setProducts(data as Product[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const openCreate = () => setModal({ open: true, product: empty() });
  const openEdit = (p: Product) => setModal({ open: true, product: { ...p } });
  const closeModal = () => setModal({ open: false, product: empty() });

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const res = await api.products["upload-url"].$post({
        json: { filename: file.name, contentType: file.type },
      });
      const { url, publicUrl } = await res.json() as { url: string; publicUrl: string };
      await fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
      setModal(m => ({ ...m, product: { ...m.product, image: publicUrl } }));
      showToast("Immagine caricata!");
    } catch {
      showToast("Errore nel caricamento immagine.");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    const p = modal.product;
    if (!p.name || !p.price) return;
    setSaving(true);
    try {
      if (p.id) {
        await api.products[":id"].$put({ param: { id: String(p.id) }, json: p });
      } else {
        await api.products.$post({ json: p });
      }
      await load();
      closeModal();
      showToast(p.id ? "Prodotto aggiornato!" : "Prodotto creato!");
    } catch {
      showToast("Errore nel salvataggio.");
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id: number) => {
    await api.products[":id"].$delete({ param: { id: String(id) } });
    await load();
    setDeleteConfirm(null);
    showToast("Prodotto eliminato.");
  };

  const toggleActive = async (p: Product) => {
    await api.products[":id"].$put({ param: { id: String(p.id) }, json: { ...p, active: !p.active } });
    await load();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F5F3EE", fontFamily: "'Poppins', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <header style={{ background: "#1A1208", color: "#FAF7F2", padding: "0 2rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 500 }}>
          Seranova <span style={{ color: "#C9A84C" }}>Silk</span>
          <span style={{ fontSize: "0.7rem", fontWeight: 400, marginLeft: "1rem", opacity: 0.6, letterSpacing: "0.12em", textTransform: "uppercase" }}>Admin</span>
        </span>
        <a href="/" style={{ fontSize: "0.75rem", color: "#C9A84C", textDecoration: "none", letterSpacing: "0.08em" }}>← Vai al sito</a>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2.5rem 2rem" }}>
        {/* Title row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 400, color: "#1A1208", margin: 0 }}>Prodotti</h1>
            <p style={{ color: "#6B5B3E", fontSize: "0.8rem", margin: "0.3rem 0 0" }}>{products.length} prodotti totali</p>
          </div>
          <button
            onClick={openCreate}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#C9A84C", color: "#FAF7F2", border: "none", padding: "0.75rem 1.4rem", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}
          >
            <Plus size={16} /> Nuovo Prodotto
          </button>
        </div>

        {/* Product list */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#6B5B3E" }}>
            <Loader2 size={32} style={{ animation: "spin 1s linear infinite" }} />
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#6B5B3E", background: "#fff", border: "1px solid #E8D5A3" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem" }}>Nessun prodotto ancora</p>
            <p style={{ fontSize: "0.82rem", marginTop: "0.5rem" }}>Crea il tuo primo prodotto cliccando "Nuovo Prodotto"</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {products.map(p => (
              <div key={p.id} style={{ background: "#fff", border: "1px solid #E8D5A3", display: "flex", alignItems: "center", gap: "1.2rem", padding: "1rem 1.4rem", opacity: p.active ? 1 : 0.55 }}>
                {/* Image */}
                <div style={{ width: "72px", height: "72px", flexShrink: 0, background: "#FAF7F2", border: "1px solid #E8D5A3", overflow: "hidden" }}>
                  {p.image ? (
                    <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A84C", opacity: 0.4 }}>
                      <ImagePlus size={22} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.2rem" }}>
                    <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1A1208", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</span>
                    {p.badge && <span style={{ background: "#E8D5A3", color: "#6B5B3E", padding: "0.15rem 0.6rem", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, flexShrink: 0 }}>{p.badge}</span>}
                  </div>
                  <p style={{ color: "#C9A84C", fontWeight: 600, fontSize: "0.9rem", margin: "0 0 0.2rem" }}>€{p.price.toFixed(2)}</p>
                  {p.description && <p style={{ color: "#6B5B3E", fontSize: "0.75rem", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.description}</p>}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexShrink: 0 }}>
                  <button
                    onClick={() => toggleActive(p)}
                    title={p.active ? "Nascondi" : "Mostra"}
                    style={{ background: "none", border: "1px solid #E8D5A3", padding: "0.45rem", cursor: "pointer", color: p.active ? "#22a06b" : "#aaa", display: "flex" }}
                  >
                    {p.active ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button
                    onClick={() => openEdit(p)}
                    style={{ background: "none", border: "1px solid #E8D5A3", padding: "0.45rem", cursor: "pointer", color: "#1A1208", display: "flex" }}
                  >
                    <Pencil size={16} />
                  </button>
                  {deleteConfirm === p.id ? (
                    <>
                      <button onClick={() => deleteProduct(p.id)} style={{ background: "#e53e3e", border: "none", padding: "0.45rem 0.8rem", cursor: "pointer", color: "#fff", fontSize: "0.72rem", fontWeight: 600 }}>Elimina</button>
                      <button onClick={() => setDeleteConfirm(null)} style={{ background: "none", border: "1px solid #E8D5A3", padding: "0.45rem", cursor: "pointer", color: "#6B5B3E", display: "flex" }}><X size={16} /></button>
                    </>
                  ) : (
                    <button onClick={() => setDeleteConfirm(p.id)} style={{ background: "none", border: "1px solid #E8D5A3", padding: "0.45rem", cursor: "pointer", color: "#e53e3e", display: "flex" }}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal.open && (
        <>
          <div onClick={closeModal} style={{ position: "fixed", inset: 0, background: "rgba(26,18,8,0.5)", zIndex: 200 }} />
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "#FAF7F2", border: "1px solid #E8D5A3", zIndex: 201, width: "min(520px, 95vw)", maxHeight: "90vh", overflowY: "auto", padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.8rem" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400, color: "#1A1208", margin: 0 }}>
                {modal.product.id ? "Modifica Prodotto" : "Nuovo Prodotto"}
              </h2>
              <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B5B3E" }}><X size={20} /></button>
            </div>

            {/* Image upload */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle}>Immagine</label>
              <div
                onClick={() => fileRef.current?.click()}
                style={{ border: "2px dashed #E8D5A3", padding: "1.5rem", textAlign: "center", cursor: "pointer", background: "#fff", position: "relative", overflow: "hidden" }}
              >
                {modal.product.image ? (
                  <img src={modal.product.image} alt="" style={{ width: "100%", maxHeight: "180px", objectFit: "cover" }} />
                ) : (
                  <div style={{ color: "#C9A84C", opacity: 0.6 }}>
                    {uploading ? <Loader2 size={28} style={{ animation: "spin 1s linear infinite" }} /> : <><ImagePlus size={28} /><p style={{ fontSize: "0.78rem", marginTop: "0.5rem", color: "#6B5B3E" }}>Clicca per caricare un'immagine</p></>}
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
              {modal.product.image && (
                <button onClick={() => setModal(m => ({ ...m, product: { ...m.product, image: "" } }))} style={{ fontSize: "0.72rem", color: "#e53e3e", background: "none", border: "none", cursor: "pointer", marginTop: "0.4rem" }}>Rimuovi immagine</button>
              )}
            </div>

            <Field label="Nome prodotto *" value={modal.product.name} onChange={v => setModal(m => ({ ...m, product: { ...m.product, name: v } }))} placeholder="es. Federa in Seta — Avorio" />
            <Field label="Prezzo (€) *" value={String(modal.product.price)} onChange={v => setModal(m => ({ ...m, product: { ...m.product, price: Number(v) } }))} placeholder="59.99" type="number" />
            <Field label="Descrizione" value={modal.product.description} onChange={v => setModal(m => ({ ...m, product: { ...m.product, description: v } }))} placeholder="Seta di gelso Grade 6A 22 Momme · Chiusura con zip" multiline />
            <Field label="Badge (opzionale)" value={modal.product.badge} onChange={v => setModal(m => ({ ...m, product: { ...m.product, badge: v } }))} placeholder="es. Novità · Bestseller" />

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "2rem" }}>
              <input type="checkbox" id="active" checked={modal.product.active} onChange={e => setModal(m => ({ ...m, product: { ...m.product, active: e.target.checked } }))} style={{ accentColor: "#C9A84C", width: "16px", height: "16px" }} />
              <label htmlFor="active" style={{ fontSize: "0.82rem", color: "#3A2E1E", cursor: "pointer" }}>Prodotto visibile nel sito</label>
            </div>

            <button
              onClick={save}
              disabled={saving || uploading || !modal.product.name || !modal.product.price}
              style={{ width: "100%", background: "#C9A84C", color: "#FAF7F2", border: "none", padding: "0.9rem", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", opacity: saving ? 0.8 : 1 }}
            >
              {saving ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Salvataggio...</> : <><Check size={16} /> {modal.product.id ? "Salva Modifiche" : "Crea Prodotto"}</>}
            </button>
          </div>
        </>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: "2rem", left: "50%", transform: "translateX(-50%)", background: "#1A1208", color: "#FAF7F2", padding: "0.8rem 1.8rem", fontSize: "0.82rem", zIndex: 300, borderLeft: "3px solid #C9A84C" }}>
          {toast}
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B5B3E", fontWeight: 600, marginBottom: "0.4rem" };

function Field({ label, value, onChange, placeholder, type = "text", multiline = false }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; multiline?: boolean }) {
  const shared: React.CSSProperties = { width: "100%", border: "1px solid #E8D5A3", background: "#fff", padding: "0.7rem 0.9rem", fontSize: "0.85rem", color: "#1A1208", outline: "none", boxSizing: "border-box", marginBottom: "1.2rem", fontFamily: "'Poppins', sans-serif" };
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={{ ...shared, resize: "vertical" }} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={shared} />
      }
    </div>
  );
}
