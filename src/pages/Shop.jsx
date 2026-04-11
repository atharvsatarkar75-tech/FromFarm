import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ALL_PRODUCTS = [
  {
    id: "alphonso", name: "Alphonso Mango", price: 800, unit: "/dozen",
    emoji: "🥭", bg: "#FFF3E0", category: "Mango", popularity: 2,
    badges: ["ORGANIC"],
    desc: "The Alphonso mango — known as the King of Mangoes — celebrated worldwide for its rich, creamy texture and incredibly sweet flavour.",
  },
  {
    id: "kesar", name: "Kesar Mango", price: 700, unit: "/dozen",
    emoji: "🥭", bg: "#FFFDE7", category: "Mango", popularity: 1,
    badges: ["GI TAGGED", "FROM OUR FARM"],
    desc: "Kesar mango is a GI-tagged variety celebrated for its distinctive saffron colour and incredibly sweet fragrance.",
  },
  {
    id: "pomegranate", name: "Pomegranate", price: 120, unit: "/kg",
    emoji: "❤️", bg: "#FCE4EC", category: "Pomegranate", popularity: 3,
    badges: ["ORGANIC"],
    desc: "Deep ruby red arils bursting with sweet-tart juice, rich in antioxidants and vitamins. Grown without any pesticides.",
  },
  {
    id: "box", name: "Farm Box", price: 1200, unit: "/box",
    emoji: "📦", bg: "#F1F8E9", category: "Box", popularity: 4,
    badges: ["BESTSELLER"],
    desc: "Our curated Farm Box contains a seasonal selection of our very best fruits — handpicked and packed fresh on the day of delivery.",
  },
];

const CATEGORIES = ["All", "Mango", "Pomegranate", "Box"];
const SORT_OPTIONS = [
  { label: "Most Popular", value: "popularity" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

export default function Shop() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER;

  const handleOrder = (productName) => {
    const message = `Hi! I want to order ${productName} from From Farm.`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const filtered = ALL_PRODUCTS
    .filter(p => activeCategory === "All" || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "popularity") return a.popularity - b.popularity;
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      return 0;
    });

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#1a1a1a", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", height: 64, background: "#fff", borderBottom: "1px solid #e8f5e0", position: "sticky", top: 0, zIndex: 200 }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#3B6D11", fontWeight: 700 }}>
          ← Back
        </button>
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => navigate("/")}>
          <div style={{ width: 38, height: 38, background: "#173404", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌿</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#173404", letterSpacing: 2 }}>FROM <span style={{ color: "#639922" }}>FARM</span></div>
        </div>
        <div style={{ width: 60 }} />
      </nav>

      {/* HERO */}
      <div style={{ background: "#173404", padding: "56px 48px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(150,196,89,0.2)", color: "#97C459", fontSize: 11, fontWeight: 700, padding: "5px 16px", borderRadius: 25, marginBottom: 16, letterSpacing: 1.5, border: "1px solid rgba(150,196,89,0.3)" }}>
          OUR PRODUCTS
        </div>
        <h1 style={{ fontSize: 42, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 12 }}>
          Fresh from the <span style={{ color: "#97C459" }}>Farm</span>
        </h1>
        <p style={{ fontSize: 15, color: "#C0DD97", maxWidth: 500, margin: "0 auto", lineHeight: 1.8 }}>
          100% organic fruits grown on our Maharashtra farm. No chemicals, no middlemen — just pure, honest fruit.
        </p>
      </div>

      {/* FILTERS & SORT */}
      <div style={{ background: "#fff", padding: "24px 48px", borderBottom: "1px solid #e8f5e0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        {/* Category Filter */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: "8px 20px", borderRadius: 25, fontSize: 13, fontWeight: 700, cursor: "pointer", border: "none",
              background: activeCategory === cat ? "#3B6D11" : "#EAF3DE",
              color: activeCategory === cat ? "#fff" : "#27500A",
              transition: "all 0.2s"
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 13, color: "#666", fontWeight: 600 }}>Sort by:</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: "8px 16px", borderRadius: 25, border: "1px solid #C0DD97", fontSize: 13, color: "#173404", background: "#fff", cursor: "pointer", outline: "none" }}>
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div style={{ padding: "48px", background: "#fafff5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>
            Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {filtered.map((p) => (
              <div key={p.id}
                style={{ background: "#fff", border: "1px solid #e8f5e0", borderRadius: 24, overflow: "hidden", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(59,109,17,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>

                {/* Product Image */}
                <div style={{ height: 200, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 90, position: "relative" }}>
                  {p.emoji}
                  <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.badges.map((b, i) => (
                      <span key={i} style={{ background: "#3B6D11", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>{b}</span>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div style={{ padding: 20 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#173404", marginBottom: 6 }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "#3B6D11" }}>
                      ₹{p.price}<span style={{ fontSize: 13, fontWeight: 400, color: "#888" }}>{p.unit}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => navigate(`/product/${p.id}`)} style={{ flex: 1, background: "#EAF3DE", color: "#27500A", border: "none", padding: "11px", borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#3B6D11"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#EAF3DE"; e.currentTarget.style.color = "#27500A"; }}>
                      View Details
                    </button>
                    <button onClick={() => handleOrder(p.name)} style={{ flex: 1, background: "#25D366", color: "#fff", border: "none", padding: "11px", borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                      💬 Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ background: "#173404", padding: "56px 48px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: "#C0DD97", marginBottom: 12 }}>Can't decide? We'll help!</h2>
        <p style={{ fontSize: 15, color: "#97C459", marginBottom: 28 }}>Chat with us on WhatsApp and we'll recommend the best fruits for you.</p>
        <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi! I need help choosing products from From Farm.")}`} target="_blank" rel="noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: "#fff", padding: "14px 32px", borderRadius: 25, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
          💬 Chat on WhatsApp
        </a>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#fff", padding: "24px 32px", borderTop: "1px solid #e8f5e0", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: 13, color: "#888" }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#3B6D11", letterSpacing: 2 }}>FROM FARM</div>
        <div>Maharashtra, India · Organic Since 2000s</div>
        <div>fromfarm.co.in · © 2026</div>
      </footer>

    </div>
  );
}