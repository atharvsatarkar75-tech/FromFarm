import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ALL_PRODUCTS = [
  {
    id: "alphonso",
    name: "Alphonso Mango",
    price: "₹800",
    unit: "/dozen",
    emoji: "🥭",
    bg: "#FAEEDA",
    badges: ["ORGANIC"],
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
    badges: ["GI TAGGED", "FROM OUR FARM"],
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
    badges: ["ORGANIC"],
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
    badges: ["BESTSELLER"],
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
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER;
  const [qty, setQty] = useState(1);

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

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: "#1a1a1a", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 32px", background: "#fff", borderBottom: "1px solid #e5e5e5", position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#3B6D11", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
          ← Back
        </button>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#3B6D11", letterSpacing: 2 }}>
          FROM <span style={{ color: "#97C459" }}>FARM</span>
        </div>
        <div style={{ width: 60 }} />
      </nav>

      {/* BREADCRUMB */}
      <div style={{ padding: "12px 32px", fontSize: 13, color: "#888" }}>
        <span style={{ cursor: "pointer", color: "#3B6D11" }} onClick={() => navigate("/")}>Home</span>
        {" → "}
        <span>{product.name}</span>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 32px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>

        {/* LEFT — Product Image */}
        <div>
          <div style={{ height: 360, background: product.bg, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 140, marginBottom: 16 }}>
            {product.emoji}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {[1, 2, 3].map((_, i) => (
              <div key={i} style={{ flex: 1, height: 80, background: product.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, cursor: "pointer", border: i === 0 ? "2px solid #3B6D11" : "2px solid transparent" }}>
                {product.emoji}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Product Info */}
        <div>
          {/* Badges */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            {product.badges.map((b, i) => (
              <span key={i} style={{ background: "#EAF3DE", color: "#27500A", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>{b}</span>
            ))}
          </div>

          {/* Name */}
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#173404", marginBottom: 8 }}>{product.name}</h1>

          {/* Price */}
          <div style={{ fontSize: 28, fontWeight: 800, color: "#3B6D11", marginBottom: 16 }}>
            {product.price}<span style={{ fontSize: 16, color: "#888", fontWeight: 400 }}>{product.unit}</span>
          </div>

          {/* Description */}
          <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, marginBottom: 20 }}>{product.desc}</p>

          {/* Features */}
          <div style={{ marginBottom: 24 }}>
            {product.features.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                <span style={{ color: "#3B6D11", fontSize: 16 }}>✓</span>
                <span style={{ fontSize: 14, color: "#444" }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Quantity Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#173404" }}>Quantity:</span>
            <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #e5e5e5", background: "#fff", fontSize: 18, cursor: "pointer" }}>−</button>
            <span style={{ fontSize: 16, fontWeight: 700, minWidth: 24, textAlign: "center" }}>{qty}</span>
            <button onClick={() => setQty(q => q + 1)} style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #e5e5e5", background: "#fff", fontSize: 18, cursor: "pointer" }}>+</button>
          </div>

          {/* Order Button */}
          <button onClick={handleOrder} style={{ width: "100%", background: "#25D366", color: "#fff", border: "none", padding: "16px", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", marginBottom: 12 }}>
            💬 Order on WhatsApp
          </button>
          <button onClick={() => navigate("/")} style={{ width: "100%", background: "#EAF3DE", color: "#27500A", border: "none", padding: "14px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            ← Continue Shopping
          </button>
        </div>
      </div>

      {/* REVIEWS */}
      <div style={{ background: "#f9f9f9", padding: "48px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#173404", marginBottom: 24 }}>Customer Reviews</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {product.reviews.map((r, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 14, color: "#FFB800", marginBottom: 8 }}>{"★".repeat(r.s)}</div>
                <p style={{ fontSize: 14, color: "#444", lineHeight: 1.6, marginBottom: 12 }}>"{r.t}"</p>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#173404" }}>— {r.n}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ padding: "24px 32px", borderTop: "1px solid #e5e5e5", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: 13, color: "#888" }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#3B6D11", letterSpacing: 2 }}>FROM FARM</div>
        <div>Maharashtra, India · Organic Since 1962</div>
        <div>fromfarm.co.in · © 2026</div>
      </footer>

    </div>
  );
}