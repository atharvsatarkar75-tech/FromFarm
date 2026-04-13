import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { db } from "../firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import useIsMobile from "../useIsMobile";
import MarqueeBanner from "../components/MarqueeBanner";
import FadeIn from "../components/FadeIn";
import SeasonalBanner from "../components/SeasonalBanner";
export default function Home() {
  const navigate = useNavigate();
const { totalItems, setCartOpen, addToCart } = useCart();
const isMobile = useIsMobile();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [activePhoto, setActivePhoto] = useState(0);
  const [heroBg, setHeroBg] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [slideIndex, setSlideIndex] = useState(0);
  const trackRef = useRef(null);
  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER;

  const heroImgs = ["/images/kesar1.jpg", "/images/kesar2.jpg", "/images/kesar3.jpg"];

  const products = [
    {
      id: "alphonso", name: "Alphonso Mango", price: "₹800", unit: "/dozen",
      emoji: "🥭", bg: "#FFF3E0", photos: [],
      badges: [{ t: "ORGANIC", c: "green" }],
      desc: "The Alphonso mango — known as the King of Mangoes — is celebrated worldwide for its rich, creamy, tender texture and non-fibrous pulp. Our Alphonso mangoes are grown without any chemicals or pesticides on our family farm in Maharashtra, ripened naturally under the Maharashtra sun.",
      features: ["Naturally sun-ripened on the tree", "Zero chemicals or pesticides used", "Rich golden colour and intense aroma", "Hand-harvested at peak ripeness", "Delivered within 48 hours of picking"],
      reviews: [{ n: "Priya S.", s: 5, t: "Best mangoes I have ever tasted! The aroma when you open the box is incredible. Will order every season." }, { n: "Rahul M.", s: 5, t: "My entire family loves these. You can actually taste the difference from market mangoes." }, { n: "Sneha K.", s: 4, t: "Fresh and delicious. Delivery was very fast too. Will definitely be ordering again." }]
    },
    {
      id: "kesar", name: "Kesar Mango", price: "₹700", unit: "/dozen",
      emoji: "🥭", bg: "#FFFDE7", photos: ["/images/kesar1.jpg", "/images/kesar2.jpg", "/images/kesar3.jpg"],
      badges: [{ t: "GI TAGGED", c: "green" }, { t: "FROM OUR FARM", c: "dark" }],
      desc: "Kesar mango is a GI-tagged variety celebrated for its distinctive saffron colour and incredibly sweet fragrance. The photos you see here are from our actual farm. Our Kesar mangoes are grown using traditional organic methods on our family land in Maharashtra.",
      features: ["GI-tagged certified Kesar variety", "Saffron-hued pulp with rich fragrance", "Grown on our own land — never sourced", "Traditional organic farming methods", "Photos are from our actual farm!"],
      reviews: [{ n: "Amit P.", s: 5, t: "The fragrance alone is worth every rupee! These Kesar mangoes are exactly like the ones from my childhood." }, { n: "Deepa R.", s: 5, t: "Ordered the Farm Box and fell in love with Kesar. Now ordering a full dozen. Absolutely divine." }, { n: "Vijay N.", s: 5, t: "Direct from farm makes all the difference. Juicy, sweet, and so fresh. 10 out of 10!" }]
    },
    {
      id: "pom", name: "Pomegranate", price: "₹120", unit: "/kg",
      emoji: "❤️", bg: "#FCE4EC", photos: [],
      badges: [{ t: "ORGANIC", c: "green" }],
      desc: "Our pomegranates are grown on the same organic land as our mangoes. Deep ruby red arils bursting with sweet-tart juice, rich in antioxidants and vitamins. Grown without any pesticides or artificial inputs on our family farm.",
      features: ["Deep ruby red colour arils", "Rich in antioxidants and Vitamin C", "Zero pesticides or chemicals ever", "Hand-sorted for quality and size", "Fresh from our Maharashtra farm"],
      reviews: [{ n: "Kavita L.", s: 5, t: "The juice from these pomegranates is a beautiful deep red. So much better than store-bought." }, { n: "Mohan T.", s: 4, t: "Fresh and very juicy. My kids love them. Great quality at a fair price." }]
    },
    {
      id: "box", name: "Farm Box", price: "₹1200", unit: "/box",
      emoji: "📦", bg: "#F1F8E9", photos: [],
      badges: [{ t: "BESTSELLER", c: "amber" }],
      desc: "Our curated Farm Box contains a seasonal selection of our very best fruits — a hand-selected mix of Alphonso and Kesar mangoes plus fresh pomegranates, all handpicked and packed fresh on the day of delivery.",
      features: ["Mix of Alphonso and Kesar mangoes", "Fresh pomegranates included", "Handpicked and packed on delivery day", "Eco-friendly and beautiful packaging", "Perfect as a thoughtful gift"],
      reviews: [{ n: "Ritu B.", s: 5, t: "Sent this as a gift to my parents. They called immediately to say how amazing everything tasted." }, { n: "Sanjay K.", s: 5, t: "The presentation is beautiful and the fruit is even better. Will buy every season." }]
    }
  ];

  const handleOrder = (productName) => {
    const message = `Hi! I want to order ${qty} x ${productName} from From Farm.`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleContact = async () => {
    if (!name || !phone) return alert("Please fill in your name and phone.");
    await addDoc(collection(db, "inquiries"), { name, phone, createdAt: new Date() });
    const message = `Hi, I am ${name}. I want to know more about your products.`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
    setName(""); setPhone("");
  };

  

  const slide = (dir) => {
    const max = products.length - 1;
    const next = Math.max(0, Math.min(max, slideIndex + dir));
    setSlideIndex(next);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${next * 324}px)`;
    }
  };

  const scrollToSection = (id) => {
    setDrawerOpen(false);
    setCurrentPage("home");
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const s = {
    page: { fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#1a1a1a", background: "#fff" },
    nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", height: 64, background: "rgba(23,52,4,0.75)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid rgba(99,153,34,0.3)", position: "sticky", top: 0, zIndex: 200 },
    badge: (c) => ({ fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.5px", background: c === "green" ? "#3B6D11" : c === "amber" ? "#BA7517" : "#173404", color: c === "dark" ? "#C0DD97" : "#fff" }),
  };

  if (currentPage === "product" && selectedProduct) {
    const p = selectedProduct;
    return (
      <div style={s.page}>
        <SeasonalBanner />
<MarqueeBanner />
        <nav style={s.nav}>
          <div onClick={() => { setCurrentPage("home"); setSelectedProduct(null); }} style={{ display: "flex", flexDirection: "column", gap: 5, cursor: "pointer", padding: 6 }}>
            {[0,1,2].map(i => <span key={i} style={{ display: "block", width: 22, height: 2, background: "#173404", borderRadius: 2 }} />)}
          </div>
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => { setCurrentPage("home"); setSelectedProduct(null); }}>
            <div style={{ width: 38, height: 38, background: "#173404", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌿</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", letterSpacing: 2 }}>FROM <span style={{ color: "#97C459" }}>FARM</span></div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#EAF3DE", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }} onClick={() => setCartOpen(true)}>
              🛒
              <div style={{ position: "absolute", top: -2, right: -2, width: 17, height: 17, background: "#3B6D11", borderRadius: "50%", fontSize: 10, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{totalItems}</div>
            </div>
          </div>
        </nav>

        <button onClick={() => { setCurrentPage("home"); setSelectedProduct(null); setQty(1); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#3B6D11", fontSize: 14, fontWeight: 600, cursor: "pointer", padding: "20px 32px", border: "none", background: "transparent" }}>
          ← Back to products
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, padding: "0 48px 72px", maxWidth: 1100, margin: "0 auto" }}>
          <div>
            <div style={{ borderRadius: 20, overflow: "hidden", height: 400, background: p.photos.length > 0 ? "#000" : p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 120, marginBottom: 12 }}>
              {p.photos.length > 0 ? <img id="pd-main" src={p.photos[activePhoto]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : p.emoji}
            </div>
            {p.photos.length > 0 && (
              <div style={{ display: "flex", gap: 10 }}>
                {p.photos.map((photo, idx) => (
                  <div key={idx} onClick={() => setActivePhoto(idx)} style={{ width: 76, height: 76, borderRadius: 12, overflow: "hidden", cursor: "pointer", border: activePhoto === idx ? "2px solid #3B6D11" : "2px solid #e5e5e5" }}>
                    <img src={photo} alt={`View ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {p.badges.map((b, i) => <div key={i} style={s.badge(b.c)}>{b.t}</div>)}
            </div>
            <div style={{ fontSize: 34, fontWeight: 900, color: "#173404", marginBottom: 8 }}>{p.name}</div>
            <div style={{ fontSize: 30, fontWeight: 900, color: "#3B6D11", marginBottom: 20 }}>{p.price}<span style={{ fontSize: 16, fontWeight: 400, color: "#888" }}>{p.unit}</span></div>
            <div style={{ fontSize: 15, color: "#555", lineHeight: 1.9, marginBottom: 24 }}>{p.desc}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {p.features.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#333" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B6D11", flexShrink: 0 }}></div>
                  {f}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#173404" }}>Quantity:</div>
              <div style={{ display: "flex", alignItems: "center", border: "2px solid #e5e5e5", borderRadius: 25, overflow: "hidden" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 42, height: 42, background: "#EAF3DE", border: "none", fontSize: 20, cursor: "pointer", fontWeight: 700, color: "#173404" }}>−</button>
                <div style={{ width: 52, textAlign: "center", fontSize: 16, fontWeight: 700, color: "#173404" }}>{qty}</div>
                <button onClick={() => setQty(q => q + 1)} style={{ width: 42, height: 42, background: "#EAF3DE", border: "none", fontSize: 20, cursor: "pointer", fontWeight: 700, color: "#173404" }}>+</button>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
              <button onClick={() => { addToCart(p, qty); }} style={{ flex: 1, background: "#3B6D11", color: "#fff", border: "none", padding: 16, borderRadius: 25, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Add to Cart</button>
              <button onClick={() => handleOrder(p.name)} style={{ flex: 1, background: "#25D366", color: "#fff", border: "none", padding: 16, borderRadius: 25, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Order on WhatsApp</button>
            </div>
            <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: 28 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#173404", marginBottom: 20 }}>Customer Reviews</div>
              {p.reviews.map((r, i) => (
                <div key={i} style={{ background: "#fafff5", border: "1px solid #e8f5e0", borderRadius: 16, padding: 18, marginBottom: 12 }}>
                  <div style={{ color: "#BA7517", fontSize: 15, marginBottom: 4 }}>{"★".repeat(r.s)}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#173404", marginBottom: 4 }}>{r.n}</div>
                  <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{r.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <MarqueeBanner />
      {drawerOpen && <div onClick={() => setDrawerOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 250 }} />}
      <div style={{ position: "fixed", top: 0, left: drawerOpen ? 0 : -280, width: 280, height: "100%", background: "#173404", zIndex: 300, transition: "left 0.35s cubic-bezier(0.4,0,0.2,1)", paddingTop: 72 }}>
        <button onClick={() => setDrawerOpen(false)} style={{ position: "absolute", top: 20, right: 20, width: 36, height: 36, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", cursor: "pointer", color: "#C0DD97", fontSize: 18 }}>✕</button>
        <div style={{ padding: "0 28px 24px", fontSize: 20, fontWeight: 800, color: "#C0DD97", letterSpacing: 2, borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 8 }}>FROM <span style={{ color: "#97C459" }}>FARM</span></div>
        {[["🏠", "Home", () => scrollToSection("hero-section")], ["🛒", "Shop", () => { setDrawerOpen(false); navigate("/shop"); }], ["🌳", "Our Story", () => { setDrawerOpen(false); navigate("/our-story"); }], ["📞", "Contact Us", () => scrollToSection("contact-sec")]].map(([icon, label, fn]) => (
          <div key={label} onClick={fn} style={{ display: "flex", alignItems: "center", gap: 14, color: "#C0DD97", fontSize: 17, fontWeight: 600, padding: "18px 28px", borderBottom: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", transition: "padding-left 0.2s" }}>
            {icon} {label}
          </div>
        ))}
      </div>

      <nav style={s.nav}>
        <div onClick={() => setDrawerOpen(!drawerOpen)} style={{ display: "flex", flexDirection: "column", gap: 5, cursor: "pointer", padding: 6, borderRadius: 8 }}>
          {[0,1,2].map(i => <span key={i} style={{ display: "block", width: 22, height: 2, background: "#173404", borderRadius: 2 }} />)}
        </div>
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <div style={{ width: 38, height: 38, background: "#173404", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌿</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#173404", letterSpacing: 2 }}>FROM <span style={{ color: "#639922" }}>FARM</span></div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div onClick={() => setSearchOpen(!searchOpen)} style={{ width: 38, height: 38, borderRadius: "50%", background: "#EAF3DE", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>🔍</div>
          <div onClick={() => setCartOpen(true)} style={{ width: 38, height: 38, borderRadius: "50%", background: "#EAF3DE", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, position: "relative" }}>
            🛒
            <div style={{ position: "absolute", top: -2, right: -2, width: 17, height: 17, background: "#3B6D11", borderRadius: "50%", fontSize: 10, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{totalItems}</div>
          </div>
        </div>
      </nav>

      {searchOpen && (
        <div style={{ background: "#fff", borderBottom: "1px solid #e8f5e0", padding: "12px 28px", display: "flex", gap: 10, alignItems: "center" }}>
          <input autoFocus placeholder="Search for mangoes, pomegranates..." style={{ flex: 1, padding: "10px 16px", borderRadius: 25, border: "2px solid #C0DD97", fontSize: 14, outline: "none" }} />
          <button onClick={() => setSearchOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#173404" }}>✕</button>
        </div>
      )}

      <div id="hero-section" style={{ position: "relative", minHeight: 560, background: "#173404", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <img src={heroImgs[heroBg]} alt="Farm" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }} />
<div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(23,52,4,0.6) 0%, rgba(23,52,4,0.3) 60%, rgba(23,52,4,0.05) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: isMobile ? "40px 20px" : "60px 48px", maxWidth: 620 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(150,196,89,0.2)", color: "#97C459", fontSize: 11, fontWeight: 700, padding: "6px 16px", borderRadius: 25, marginBottom: 20, letterSpacing: "1.5px", border: "1px solid rgba(150,196,89,0.3)" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#97C459" }}></div>
            100% ORGANIC · MAHARASHTRA
          </div>
          <h1 style={{ fontSize: isMobile ? 36 : 54, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>Farm Fresh,<br /><span style={{ color: "#97C459" }}>Straight to</span><br />Your Door</h1>
          <div style={{ width: 60, height: 3, background: "#639922", borderRadius: 2, marginBottom: 16 }}></div>
          <p style={{ fontSize: 16, color: "#C0DD97", lineHeight: 1.8, marginBottom: 32, maxWidth: 480 }}>Hand-picked mangoes and pomegranates from our organic farm in Maharashtra. No chemicals, no middlemen — just pure, honest fruit grown with love.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={() => navigate("/shop")} style={{ background: "#fff", color: "#173404", padding: "15px 32px", borderRadius: 25, fontSize: 15, fontWeight: 800, border: "none", cursor: "pointer" }}>Shop Now</button>
            <button onClick={() => navigate("/our-story")} style={{ background: "transparent", color: "#fff", padding: "15px 32px", borderRadius: 25, fontSize: 15, fontWeight: 700, border: "2px solid rgba(255,255,255,0.4)", cursor: "pointer" }}>Our Story</button>
          </div>
          <div style={{ display: "flex", gap: 0, marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.15)" }}>
            {[["100%","Organic"],["0","Chemicals"],["48hr","Delivery"],["♾️","Love"]].map(([num, label]) => (
              <div key={label} style={{ flex: 1, textAlign: "center", padding: "0 16px", borderRight: label !== "Love" ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#fff" }}>{num}</div>
                <div style={{ fontSize: 11, color: "#97C459", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: isMobile ? "relative" : "absolute", bottom: 20, right: 24, display: "flex", gap: 8, zIndex: 3, justifyContent: isMobile ? "center" : "flex-end", marginTop: isMobile ? 16 : 0 }}>
          {heroImgs.map((img, idx) => (
            <div key={idx} onClick={() => setHeroBg(idx)} style={{ width: 56, height: 56, borderRadius: 12, overflow: "hidden", cursor: "pointer", border: heroBg === idx ? "2px solid #fff" : "2px solid rgba(255,255,255,0.3)", transition: "border-color 0.2s" }}>
              <img src={img} alt={`View ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>

      <div id="products-sec" style={{ padding: isMobile ? "40px 16px" : "72px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40 }}>
            <div>
              <div style={{ display: "inline-block", background: "#EAF3DE", color: "#3B6D11", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 25, marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>Our Products</div>
              <div style={{ fontSize: isMobile ? 24 : 36, fontWeight: 900, color: "#173404" }}>Fresh from the tree</div>
              <div style={{ fontSize: 15, color: "#666", marginTop: 6 }}>Click arrows to slide — click any card for full details</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => slide(-1)} style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #e5e5e5", background: "#fff", cursor: "pointer", fontSize: 16, transition: "all 0.2s" }}>←</button>
              <button onClick={() => slide(1)} style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #e5e5e5", background: "#fff", cursor: "pointer", fontSize: 16, transition: "all 0.2s" }}>→</button>
            </div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <div ref={trackRef} style={{ display: "flex", gap: 24, transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
              {products.map((p) => (
                <div key={p.id} className="farm-card"
  style={{ flex: isMobile ? "0 0 260px" : "0 0 300px" }}>

  {/* Aurora blob */}
  <div className="farm-card-aurora" />
  {/* Glass panel */}
  <div className="farm-card-bg" />

  {/* IMAGE */}
  <div style={{ position: "relative", height: 200, background: p.bg, overflow: "hidden", zIndex: 3, margin: 8, borderRadius: 14 }}
    onClick={() => { setSelectedProduct(p); setCurrentPage("product"); setQty(1); setActivePhoto(0); window.scrollTo(0,0); }}>
    {p.photos.length > 0
      ? <img src={p.photos[0]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
      : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 90 }}>{p.emoji}</div>
    }
    {/* Badges */}
    <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
      {p.badges.map((b, i) => <div key={i} style={s.badge(b.c)}>{b.t}</div>)}
    </div>
    {/* Price tag */}
    <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(255,255,255,0.95)", borderRadius: 20, padding: "4px 12px" }}>
      <span style={{ fontSize: 15, fontWeight: 900, color: "#3B6D11" }}>{p.price}</span>
      <span style={{ fontSize: 11, color: "#888" }}>{p.unit}</span>
    </div>
  </div>

  {/* INFO */}
  <div style={{ padding: "10px 16px 16px", position: "relative", zIndex: 3 }}>
    <div style={{ fontSize: 17, fontWeight: 800, color: "#173404", marginBottom: 4 }}>{p.name}</div>
    <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6, marginBottom: 12, height: 36, overflow: "hidden" }}>{p.desc.substring(0, 75)}...</div>
    <div style={{ display: "flex", gap: 8 }}>
      <button
        onClick={(e) => { e.stopPropagation(); setSelectedProduct(p); setCurrentPage("product"); setQty(1); setActivePhoto(0); window.scrollTo(0,0); }}
        style={{ flex: 1, background: "#EAF3DE", color: "#27500A", border: "none", padding: "9px 8px", borderRadius: 12, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.background = "#3B6D11"; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#EAF3DE"; e.currentTarget.style.color = "#27500A"; }}>
        View Details →
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); addToCart(p, 1); }}
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
      </div>

      <FadeIn>
<div style={{ background: "#fafff5", padding: isMobile ? "40px 16px" : "72px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-block", background: "#EAF3DE", color: "#3B6D11", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 25, marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>Why Choose Us</div>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#173404" }}>The difference is real</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(210px, 1fr))", gap: 16, maxWidth: 1200, margin: "0 auto" }}>
          {[["🌱","Zero chemicals","No pesticides, no synthetic fertilizers. Traditional organic methods passed down through generations."],["👨‍🌾","Direct from farmer","Buy directly from us — no middlemen, no markups. Fresher fruit at better prices."],["🚚","48hr delivery","Packed and shipped the same day we pick. Delivered fresh across Maharashtra in 48 hours."],["🏡","Family farm","Cultivated for generations with love, care and deep respect for the land and community."]].map(([icon, title, desc]) => (
            <div key={title} style={{ background: "#fff", border: "1px solid #e8f5e0", borderRadius: 20, padding: "28px 24px", textAlign: "center", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#97C459"; e.currentTarget.style.transform = "translateY(-6px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8f5e0"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ width: 60, height: 60, background: "#EAF3DE", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 16px" }}>{icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#173404", marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
</FadeIn>

      <div id="story-sec" style={{ background: "#173404", padding: isMobile ? "40px 20px" : "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 32 : 56, alignItems: "center", marginBottom: 56 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: isMobile ? "160px 160px" : "220px 220px", gap: 14 }}>
              <div style={{ gridRow: "span 2", borderRadius: 20, overflow: "hidden" }}><img src="/images/kesar1.jpg" alt="Farm" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
              <div style={{ borderRadius: 16, overflow: "hidden" }}><img src="/images/kesar2.jpg" alt="Farm 2" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
              <div style={{ borderRadius: 16, overflow: "hidden" }}><img src="/images/kesar3.jpg" alt="Farm 3" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
            </div>
            <div>
              <div style={{ display: "inline-block", background: "rgba(150,196,89,0.2)", color: "#97C459", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 25, marginBottom: 16, letterSpacing: 1, border: "1px solid rgba(150,196,89,0.3)" }}>Our Story</div>
              <h2 style={{ fontSize: 36, fontWeight: 900, color: "#C0DD97", marginBottom: 16, lineHeight: 1.3 }}>Grown with patience, delivered with pride</h2>
              <p style={{ fontSize: 15, color: "#97C459", lineHeight: 1.9, marginBottom: 16 }}>Our founder, Rajesh Ramrao Satarkar, built this farm with a deep belief — that food should be pure, natural, and grown with honesty. Spread across 100–120 acres in Maharashtra, our farm grows mango, pomegranate, tamarind, and Indian gooseberry using 100% organic practices.</p>
              <p style={{ fontSize: 15, color: "#97C459", lineHeight: 1.9, marginBottom: 20 }}>At a time when chemical farming was becoming common, we chose a different path. No chemicals. No shortcuts. No compromises. Our quality has even reached European export markets — a reflection of the standards we maintain.</p>
              {["Over 60 years of organic farming heritage","Acres of certified organic land in Maharashtra","Hand-picked at peak ripeness every time","No cold storage — always fresh, never frozen"].map((feat) => (
                <div key={feat} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#C0DD97", marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#639922", flexShrink: 0 }}></div>
                  {feat}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
              <button onClick={() => navigate("/our-story")} style={{ background: "#97C459", color: "#173404", border: "none", padding: "12px 24px", borderRadius: 25, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Read Our Full Story →</button>
              <button onClick={() => scrollToSection("contact-sec")} style={{ background: "transparent", color: "#C0DD97", border: "2px solid rgba(150,196,89,0.4)", padding: "12px 24px", borderRadius: 25, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Get in Touch</button>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 48, marginBottom: 48 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#C0DD97", marginBottom: 32, textAlign: "center" }}>Our Journey</div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? 24 : 0 }}>
              {[["🌱","1962","Grandfather plants first mango trees on our Maharashtra land"],["🌳","1985","Farm grows to include pomegranates. Second generation takes over"],["🏆","2010","Certified organic. Zero chemicals pledge made by our family"],["📱","2024","From Farm launches — bringing our fruit direct to your table"]].map(([icon, year, text]) => (
                <div key={year} style={{ textAlign: "center", padding: "0 16px" }}>
                  <div style={{ width: 48, height: 48, background: "#3B6D11", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 18, border: "3px solid #173404" }}>{icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#639922", marginBottom: 6, letterSpacing: 1 }}>{year}</div>
                  <div style={{ fontSize: 13, color: "#97C459", lineHeight: 1.6 }}>{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 48 }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ display: "inline-block", background: "rgba(150,196,89,0.2)", color: "#97C459", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 25, marginBottom: 10, letterSpacing: 1 }}>Watch</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#C0DD97", marginTop: 10 }}>A day on our farm</div>
            </div>
            <div onClick={() => alert("Add your farm video URL here!")} style={{ background: "#27500A", borderRadius: 24, height: 340, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, cursor: "pointer" }}>
              <div style={{ width: 72, height: 72, background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 0, height: 0, borderTop: "14px solid transparent", borderBottom: "14px solid transparent", borderLeft: "22px solid #173404", marginLeft: 5 }}></div>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#C0DD97" }}>Watch: From Farm — A day in Maharashtra</div>
              <div style={{ fontSize: 13, color: "#639922" }}>Tap to play · Add your farm video here</div>
            </div>
          </div>

          {/* FARM VALUES */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 56, marginTop: 56 }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ display: "inline-block", background: "rgba(150,196,89,0.2)", color: "#97C459", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 25, marginBottom: 10, letterSpacing: 1 }}>Our Values</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#C0DD97", marginTop: 10 }}>Why we farm the way we do</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 32 }}>
              {[
                { icon: "🌿", title: "Farm to Table", desc: "Fruit leaves our farm and reaches your door within 48 hours. No warehouses, no cold storage." },
                { icon: "👨‍🌾", title: "Traditional Farming", desc: "Three generations of farming knowledge. We use methods passed down since 1962." },
                { icon: "🚫", title: "Zero Chemicals", desc: "Not a single pesticide or synthetic fertilizer has ever touched our soil or our fruit." },
                { icon: "🤝", title: "Direct from Farmer", desc: "When you buy from us, you buy directly from the family that grew your fruit. No middlemen." },
              ].map((item, i) => (
                <div key={i}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                  style={{ textAlign: "center", padding: "0 16px", transition: "transform 0.3s" }}>
                  <div style={{ width: 80, height: 80, background: "rgba(150,196,89,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 36, border: "1px solid rgba(150,196,89,0.3)" }}>
                    {item.icon}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#C0DD97", marginBottom: 10 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: "#97C459", lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div id="contact-sec" style={{ background: "#EAF3DE", padding: isMobile ? "40px 20px" : "80px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "#3B6D11", color: "#EAF3DE", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 25, marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>Get in Touch</div>
          <div style={{ fontSize: 36, fontWeight: 900, color: "#173404", marginBottom: 10 }}>Ready to order?</div>
          <div style={{ fontSize: 16, color: "#27500A", marginBottom: 32 }}>Leave your details and we'll reach out — or order instantly on WhatsApp!</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 16 }}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ flex: 1, minWidth: 160, padding: "14px 20px", borderRadius: 25, border: "2px solid #C0DD97", background: "#fff", color: "#173404", fontSize: 14, outline: "none" }} />
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" style={{ flex: 1, minWidth: 160, padding: "14px 20px", borderRadius: 25, border: "2px solid #C0DD97", background: "#fff", color: "#173404", fontSize: 14, outline: "none" }} />
            <button onClick={handleContact} style={{ background: "#3B6D11", color: "#fff", border: "none", padding: "14px 28px", borderRadius: 25, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Send</button>
          </div>
          <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi! I want to order from From Farm.")}`} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: "#fff", padding: "14px 28px", borderRadius: 25, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
            <div style={{ width: 24, height: 24, background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#25D366", fontWeight: 800 }}>W</div>
            Order on WhatsApp
          </a>
        </div>
      </div>

      <div style={{ background: "#173404", padding: isMobile ? "40px 20px 0" : "56px 48px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: isMobile ? 24 : 48, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#C0DD97", letterSpacing: 2, marginBottom: 12 }}>FROM <span style={{ color: "#639922" }}>FARM</span></div>
            <div style={{ fontSize: 14, color: "#639922", lineHeight: 1.7, maxWidth: 240 }}>Organic mangoes and pomegranates grown with love in Maharashtra. From our family farm, to your table.</div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#97C459", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Products</div>
            {["Alphonso Mango","Kesar Mango","Pomegranate","Farm Box"].map(p => <div key={p} style={{ fontSize: 14, color: "#639922", marginBottom: 10, cursor: "pointer" }}>{p}</div>)}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#97C459", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Connect</div>
            {["WhatsApp Us","Instagram","Our Story","Contact"].map(l => <div key={l} style={{ fontSize: 14, color: "#639922", marginBottom: 10, cursor: "pointer" }}>{l}</div>)}
          </div>
        </div>
        <div style={{ textAlign: "center", padding: 20, fontSize: 13, color: "#639922" }}>Maharashtra, India · Organic Certified · fromfarm.co.in · © 2026</div>
      </div>
    </div>
  );
}