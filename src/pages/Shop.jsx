import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import useIsMobile from "../useIsMobile";
import MarqueeBanner from "../components/MarqueeBanner";
import Navbar from "../components/Navbar";
import SeasonalBanner from "../components/SeasonalBanner";
import Footer from "../components/Footer";

const ALL_PRODUCTS = [
  {
    id: "alphonso", name: "Alphonso Mango", price: 800, unit: "/dozen",
    emoji: "🥭", bg: "#FFF3E0", category: "Mango", popularity: 2,
    badges: ["ORGANIC"],
    badgeColor: "#BA7517", accentColor: "#BA7517",
    desc: "The Alphonso mango — known as the King of Mangoes — celebrated worldwide for its rich, creamy texture and incredibly sweet flavour.",
  },
  {
    id: "kesar", name: "Kesar Mango", price: 700, unit: "/dozen",
    emoji: "🥭", bg: "#FFFDE7", category: "Mango", popularity: 1,
    badges: ["GI TAGGED", "FROM OUR FARM"],
    photos: ["/images/kesar1.jpg", "/images/kesar2.jpg", "/images/kesar3.jpg"],
    badgeColor: "#BA7517", accentColor: "#BA7517",
    desc: "Kesar mango is a GI-tagged variety celebrated for its distinctive saffron colour and incredibly sweet fragrance.",
  },
  {
    id: "pomegranate", name: "Pomegranate", price: 120, unit: "/kg",
    emoji: "❤️", bg: "#FCE4EC", category: "Pomegranate", popularity: 3,
    badges: ["ORGANIC"],
    badgeColor: "#A32D2D", accentColor: "#A32D2D",
    desc: "Deep ruby red arils bursting with sweet-tart juice, rich in antioxidants and vitamins. Grown without any pesticides.",
  },
  {
    id: "tamarind", name: "Tamarind (Imli)", price: 80, unit: "/kg",
    emoji: "🫘", bg: "#F5E6D3", category: "Other", popularity: 5,
    badges: ["ORGANIC"],
    badgeColor: "#6B3A1F", accentColor: "#6B3A1F",
    desc: "Sun-dried organic tamarind from our Maharashtra farm. Rich tangy flavour perfect for cooking, chutneys and drinks.",
  },
  {
    id: "amla", name: "Indian Gooseberry (Amla)", price: 60, unit: "/kg",
    emoji: "🍃", bg: "#E8F5E9", category: "Other", popularity: 6,
    badges: ["ORGANIC"],
    badgeColor: "#2E7D32", accentColor: "#2E7D32",
    desc: "Fresh organic Amla — one of nature's richest sources of Vitamin C. Grown on our certified organic farm in Maharashtra.",
  },
  {
    id: "box", name: "Farm Box", price: 1200, unit: "/box",
    emoji: "📦", bg: "#F1F8E9", category: "Box", popularity: 4,
    badges: ["BESTSELLER"],
    badgeColor: "#3B6D11", accentColor: "#3B6D11",
    desc: "Our curated Farm Box contains a seasonal selection of our very best fruits — handpicked and packed fresh on the day of delivery.",
  },
];

const CATEGORIES = ["All", "Mango", "Pomegranate", "Other", "Box"];
const SORT_OPTIONS = [
  { label: "Most Popular", value: "popularity" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

export default function Shop() {
  const navigate = useNavigate();
const { addToCart, setCartOpen } = useCart();
const isMobile = useIsMobile();
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
      <SeasonalBanner />
<MarqueeBanner />

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div style={{ background: "#173404", padding: isMobile ? "40px 20px" : "56px 48px", textAlign: "center" }}>
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
      <div style={{ background: "#fff", padding: isMobile ? "16px 20px" : "24px 48px", borderBottom: "1px solid #e8f5e0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
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
      <div style={{ padding: isMobile ? "24px 16px" : "48px", background: "#fafff5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>
            Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(280px, 1fr))", gap: isMobile ? 12 : 24 }}>
            {filtered.map((p) => (
              <div key={p.id} className="farm-card" style={{}}>

  {/* Aurora blob */}
  <div className="farm-card-aurora" style={{ background: `radial-gradient(circle, ${p.accentColor}, transparent)` }} />
  {/* Glass panel */}
  <div className="farm-card-bg" />

  {/* IMAGE */}
  <div style={{ position: "relative", height: 200, background: p.bg, overflow: "hidden", zIndex: 3, margin: 8, borderRadius: 14 }}>
    {p.photos && p.photos.length > 0
  ? <img src={p.photos[0]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 90 }}>{p.emoji}</div>}
    <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
      {p.badges.map((b, i) => (
        <span key={i} style={{ background: p.badgeColor, color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>{b}</span>
      ))}
    </div>
    <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(255,255,255,0.95)", borderRadius: 20, padding: "4px 12px" }}>
      <span style={{ fontSize: 15, fontWeight: 900, color: p.accentColor }}>₹{p.price}</span>
      <span style={{ fontSize: 11, color: "#888" }}>{p.unit}</span>
    </div>
  </div>

  {/* INFO */}
  <div style={{ padding: "10px 16px 16px", position: "relative", zIndex: 3 }}>
    <div style={{ fontSize: 17, fontWeight: 800, color: "#173404", marginBottom: 4 }}>{p.name}</div>
    <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6, marginBottom: 12, height: 36, overflow: "hidden" }}>{p.desc}</div>
    <div style={{ display: "flex", gap: 8 }}>
      <button onClick={() => navigate(`/product/${p.id}`)}
        style={{ flex: 1, background: "#EAF3DE", color: "#27500A", border: "none", padding: "9px 8px", borderRadius: 12, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.background = "#3B6D11"; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#EAF3DE"; e.currentTarget.style.color = "#27500A"; }}>
        View Details →
      </button>
      <button onClick={() => { addToCart(p, 1); }}
        style={{ flex: 1, background: "#173404", color: "#fff", border: "none", padding: "9px 8px", borderRadius: 12, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.background = "#3B6D11"}
        onMouseLeave={e => e.currentTarget.style.background = "#173404"}>
        🛒 Add to Cart
      </button>
    </div>
  </div>
</div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ background: "#173404", padding: isMobile ? "40px 20px" : "56px 48px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: "#C0DD97", marginBottom: 12 }}>Can't decide? We'll help!</h2>
        <p style={{ fontSize: 15, color: "#97C459", marginBottom: 28 }}>Chat with us on WhatsApp and we'll recommend the best fruits for you.</p>
        <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi! I need help choosing products from From Farm.")}`} target="_blank" rel="noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: "#fff", padding: "14px 32px", borderRadius: 25, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
          💬 Chat on WhatsApp
        </a>
      </div>

      {/* FOOTER */}
      {/* FOOTER */}
      <Footer />

    </div>
  );
}