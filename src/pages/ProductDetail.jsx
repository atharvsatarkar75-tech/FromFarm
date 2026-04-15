import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import useIsMobile from "../useIsMobile";
import MarqueeBanner from "../components/MarqueeBanner";
import SeasonalBanner from "../components/SeasonalBanner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ALL_PRODUCTS = [
  {
    id: "alphonso",
    name: "Alphonso Mango",
    price: "₹800",
    unit: "/dozen",
    emoji: "🥭",
    bg: "#FAEEDA",
    badges: ["ORGANIC"],accentColor: "#BA7517",
    desc: "The Alphonso mango — known as the King of Mangoes — is celebrated worldwide for its rich, creamy texture and incredibly sweet flavour. Our Alphonso mangoes are grown on the same land our grandfather planted in 1962.",
    features: [
      "Naturally sun-ripened on the tree",
      "Zero chemicals or pesticides",
      "Hand-picked at peak ripeness",
      "Delivered within 48 hours of picking",
    ],
    reviews: [
      { n: "Priya S.", s: 5, t: "Best mangoes I have ever tasted. So sweet and fresh!" },
      { n: "Rahul M.", s: 5, t: "Ordered for the whole family. Everyone loved them." },
      { n: "Sneha T.", s: 5, t: "You can taste the difference from market mangoes." },
    ],
  },
  {
    id: "kesar",
    name: "Kesar Mango",
    price: "₹700",
    unit: "/dozen",
    emoji: "🥭",
    bg: "#FFF3CD",
    badges: ["GI TAGGED", "FROM OUR FARM"],accentColor: "#BA7517",
    photos: ["/images/kesar1.jpg", "/images/kesar2.jpg", "/images/kesar3.jpg"],
    desc: "Kesar mango is a GI-tagged variety celebrated for its distinctive saffron colour and incredible fragrance. Our Kesar mangoes come straight from our Maharashtra farm — no cold storage, no preservatives.",
    features: [
      "GI-tagged certified Kesar variety",
      "Saffron-coloured, incredibly fragrant",
      "From our own Maharashtra farm",
      "No cold storage — always fresh",
    ],
    reviews: [
      { n: "Amit P.", s: 5, t: "The fragrance alone is worth it. Incredible mangoes." },
      { n: "Meera K.", s: 5, t: "Sent this as a gift to my parents. They loved it." },
      { n: "Vijay R.", s: 5, t: "Authentic Kesar taste. Better than anything in the market." },
    ],
  },
  {
    id: "pomegranate",
    name: "Pomegranate",
    price: "₹120",
    unit: "/kg",
    emoji: "❤️",
    bg: "#FBEAF0",
    badges: ["ORGANIC"],accentColor: "#A32D2D",
    desc: "Our pomegranates are grown on the same organic land as our mangoes. Deep ruby red arils bursting with juice — rich in antioxidants and naturally sweet.",
    features: [
      "Deep ruby red, juicy seeds",
      "Rich in antioxidants",
      "Grown on certified organic land",
      "No chemicals or pesticides",
    ],
    reviews: [
      { n: "Kavita L.", s: 5, t: "The juice from these is incredible. So fresh." },
      { n: "Suresh B.", s: 5, t: "Best pomegranates I have had. Very juicy." },
      { n: "Anita R.", s: 5, t: "Ordering every week now. Absolutely love them." },
    ],
  },
  {
    
    id: "box",
    name: "Farm Box",
    price: "₹1200",
    unit: "/box",
    emoji: "📦",
    bg: "#EAF3DE",
    badges: ["BESTSELLER"],accentColor: "#3B6D11",
    desc: "Our curated Farm Box contains a seasonal selection of our finest fruits — a mix of Alphonso and Kesar mangoes, fresh pomegranates, and whatever is best from the farm that week.",
    features: [
      "Mix of Alphonso and Kesar mangoes",
      "Fresh pomegranates included",
      "Seasonal farm selection",
      "Perfect as a gift",
    ],
    reviews: [
      { n: "Ritu B.", s: 5, t: "Sent this as a gift. Everyone was so happy." },
      { n: "Deepak S.", s: 5, t: "Great value. Fresh and beautifully packed." },
      { n: "Pooja M.", s: 5, t: "Ordering every season now. Love the variety." },
    ],
  },
  {
    id: "tamarind",
    name: "Tamarind (Imli)",
    price: "₹80",
    unit: "/kg",
    emoji: "🫘",
    bg: "#F5E6D3",
    badges: ["ORGANIC"],accentColor: "#6B3A1F",
    desc: "Sun-dried organic tamarind from our Maharashtra farm. Rich tangy flavour perfect for cooking, chutneys and drinks. Grown with zero chemicals on our certified organic land.",
    features: [
      "Sun-dried naturally on the farm",
      "Rich tangy authentic flavour",
      "Zero chemicals or preservatives",
      "Perfect for cooking and chutneys",
    ],
    reviews: [
      { n: "Sunita P.", s: 5, t: "Best tamarind I have ever used. So fresh and tangy!" },
      { n: "Ramesh K.", s: 5, t: "Makes the best imli chutney. Ordering every month." },
      { n: "Priya M.", s: 5, t: "Authentic farm taste. Much better than market tamarind." },
    ],
  },
  {
    id: "amla",
    name: "Indian Gooseberry (Amla)",
    price: "₹60",
    unit: "/kg",
    emoji: "🍃",
    bg: "#E8F5E9",
    badges: ["ORGANIC"],accentColor: "#2E7D32",
    desc: "Fresh organic Amla — one of nature's richest sources of Vitamin C. Grown on our certified organic farm in Maharashtra with zero chemicals or pesticides.",
    features: [
      "One of nature's richest Vitamin C sources",
      "100% organic, zero chemicals",
      "Fresh from our Maharashtra farm",
      "Great for health and immunity",
    ],
    reviews: [
      { n: "Meena S.", s: 5, t: "So fresh and pure. Makes amazing amla juice!" },
      { n: "Vijay T.", s: 5, t: "Best amla I have had. Very juicy and sour." },
      { n: "Anita B.", s: 5, t: "Ordering every week for my family. Highly recommend!" },
    ],
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const isMobile = useIsMobile();
  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER;
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [addedMsg, setAddedMsg] = useState(false);

  const product = ALL_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: 80 }}>
        <div style={{ fontSize: 64 }}>🥭</div>
        <h2 style={{ fontSize: 24, color: "#173404", marginTop: 16 }}>Product not found</h2>
        <button onClick={() => navigate("/")} style={{ marginTop: 24, background: "#3B6D11", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          Back to Home
        </button>
      </div>
    );
  }

  const handleOrder = () => {
    const message = `Hi! I want to order ${qty} ${product.unit} of ${product.name} from From Farm.`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2000);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: "#1a1a1a", minHeight: "100vh", background: "#f7f9f4" }}>
      <SeasonalBanner />
      <MarqueeBanner />
      <Navbar />

      {/* BREADCRUMB */}
      <div style={{ padding: "12px 32px", fontSize: 13, color: "#888" }}>
        <span style={{ cursor: "pointer", color: "#3B6D11" }} onClick={() => navigate("/")}>Home</span>
        {" → "}
        <span style={{ cursor: "pointer", color: "#3B6D11" }} onClick={() => navigate("/shop")}>Shop</span>
        {" → "}
        <span>{product.name}</span>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "20px 16px 60px" : "32px 32px 80px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 24 : 48, alignItems: "start" }}>

        {/* LEFT — Glass Image Card */}
        <div className="farm-card" style={{ padding: 0, background: "rgba(255,255,255,0.25)" }}>
          <div className="farm-card-aurora" style={{ width: 280, height: 280, top: "40%", left: "50%", background: `radial-gradient(circle, ${product.accentColor}, transparent)` }} />
          <div className="farm-card-bg" />
          <div style={{ position: "relative", zIndex: 3, padding: 24 }}>
            {/* Main image */}
            <div style={{ height: isMobile ? 260 : 340, background: product.bg, borderRadius: 16, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 130, marginBottom: 16, transition: "0.3s ease" }}>
              {product.photos && product.photos.length > 0
                ? <img src={product.photos[activeThumb]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : product.emoji}
            </div>
            {/* Thumbnails */}
            <div style={{ display: "flex", gap: 10 }}>
              {(product.photos && product.photos.length > 0 ? product.photos : [product.emoji, product.emoji, product.emoji]).map((photo, i) => (
                <div
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  style={{
                    flex: 1, height: 72, background: product.bg, borderRadius: 12,
                    overflow: "hidden",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, cursor: "pointer",
                    border: activeThumb === i ? "2px solid #3B6D11" : "2px solid rgba(255,255,255,0.5)",
                    transition: "0.2s ease",
                    transform: activeThumb === i ? "scale(1.05)" : "scale(1)"
                  }}
                >
                  {product.photos && product.photos.length > 0
                    ? <img src={photo} alt={`View ${i+1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : product.emoji}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Product Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

          {/* Badges */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            {product.badges.map((b, i) => (
              <span key={i} style={{ background: "#EAF3DE", color: "#27500A", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, letterSpacing: 1 }}>{b}</span>
            ))}
          </div>

          {/* Name */}
          <h1 style={{ fontSize: isMobile ? 26 : 34, fontWeight: 800, color: "#173404", marginBottom: 8, lineHeight: 1.2 }}>{product.name}</h1>

          {/* Stars */}
          <div style={{ fontSize: 14, color: "#FFB800", marginBottom: 12 }}>★★★★★ <span style={{ color: "#888", fontWeight: 400, fontSize: 13 }}>({product.reviews.length} reviews)</span></div>

          {/* Price */}
          <div style={{ fontSize: 30, fontWeight: 800, color: "#3B6D11", marginBottom: 16 }}>
            {product.price}<span style={{ fontSize: 16, color: "#888", fontWeight: 400 }}>{product.unit}</span>
          </div>

          {/* Description */}
          <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, marginBottom: 20 }}>{product.desc}</p>

          {/* Features — glass card */}
          <div className="farm-card" style={{ marginBottom: 24, padding: 0 }}>
            <div className="farm-card-aurora" style={{ width: 150, height: 150, opacity: 0.5 }} />
            <div className="farm-card-bg" />
            <div style={{ position: "relative", zIndex: 3, padding: "16px 20px" }}>
              {product.features.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: i < product.features.length - 1 ? 10 : 0 }}>
                  <span style={{ color: "#3B6D11", fontSize: 16, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 14, color: "#444" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#173404" }}>Quantity:</span>
            <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #d0e8b8", background: "#EAF3DE", fontSize: 20, cursor: "pointer", color: "#173404", fontWeight: 700 }}>−</button>
            <span style={{ fontSize: 18, fontWeight: 700, minWidth: 28, textAlign: "center", color: "#173404" }}>{qty}</span>
            <button onClick={() => setQty(q => q + 1)} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #d0e8b8", background: "#EAF3DE", fontSize: 20, cursor: "pointer", color: "#173404", fontWeight: 700 }}>+</button>
            <span style={{ fontSize: 13, color: "#888" }}>Total: <strong style={{ color: "#3B6D11" }}>₹{parseInt(product.price.replace("₹", "")) * qty}</strong></span>
          </div>

          {/* Buttons */}
          <button
            onClick={handleAddToCart}
            style={{ width: "100%", background: addedMsg ? "#27500A" : "#3B6D11", color: "#fff", border: "none", padding: "16px", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", marginBottom: 12, transition: "0.3s ease" }}
          >
            {addedMsg ? "✓ Added to Cart!" : "🛒 Add to Cart"}
          </button>
          <button onClick={handleOrder} style={{ width: "100%", background: "#25D366", color: "#fff", border: "none", padding: "16px", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", marginBottom: 12 }}>
            💬 Order on WhatsApp
          </button>
          <button onClick={() => navigate("/shop")} style={{ width: "100%", background: "#EAF3DE", color: "#27500A", border: "none", padding: "14px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            ← Continue Shopping
          </button>
        </div>
      </div>

      {/* REVIEWS — glass cards */}
      <div style={{ padding: isMobile ? "32px 16px" : "48px 32px", background: "linear-gradient(180deg, #f7f9f4 0%, #eaf3de 100%)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#173404", marginBottom: 24 }}>Customer Reviews</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
            {product.reviews.map((r, i) => (
              <div key={i} className="farm-card" style={{ padding: 0 }}>
                <div className="farm-card-aurora" style={{ width: 120, height: 120, opacity: 0.4 }} />
                <div className="farm-card-bg" />
                <div style={{ position: "relative", zIndex: 3, padding: 20 }}>
                  <div style={{ fontSize: 14, color: "#FFB800", marginBottom: 8 }}>{"★".repeat(r.s)}</div>
                  <p style={{ fontSize: 14, color: "#444", lineHeight: 1.6, marginBottom: 12 }}>"{r.t}"</p>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#173404" }}>— {r.n}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      {/* FOOTER */}
      <Footer />

    </div>
  );
}