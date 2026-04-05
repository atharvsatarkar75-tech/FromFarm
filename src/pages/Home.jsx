import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER;

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  const handleOrder = async (productName) => {
    const message = `Hi! I want to order ${productName} from From Farm.`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleContact = async () => {
    if (!name || !phone) return alert("Please fill in your name and phone.");
    await addDoc(collection(db, "inquiries"), { name, phone, createdAt: new Date() });
    const message = `Hi, I am ${name}. I want to know more about your products.`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
    setName(""); setPhone("");
  };

  return (
    <div style={{ fontFamily: "sans-serif", color: "#1a1a1a" }}>
      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid #e5e5e5", background: "#fff", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#3B6D11", letterSpacing: 2 }}>FROM <span style={{ color: "#639922" }}>FARM</span></div>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#products" style={{ fontSize: 14, color: "#555", textDecoration: "none" }}>Products</a>
          <a href="#story" style={{ fontSize: 14, color: "#555", textDecoration: "none" }}>Our Story</a>
          <a href="#contact" style={{ fontSize: 14, color: "#555", textDecoration: "none" }}>Contact</a>
        </div>
        <button onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })} style={{ background: "#3B6D11", color: "#fff", border: "none", padding: "9px 20px", borderRadius: 8, fontSize: 14, cursor: "pointer", fontWeight: 600 }}>Order Now</button>
      </nav>

      {/* HERO */}
      <div style={{ background: "#EAF3DE", padding: "80px 32px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#27500A", color: "#C0DD97", fontSize: 12, fontWeight: 600, padding: "5px 16px", borderRadius: 20, marginBottom: 18, letterSpacing: 1.5 }}>100% ORGANIC · MAHARASHTRA</div>
        <h1 style={{ fontSize: 44, fontWeight: 700, color: "#173404", lineHeight: 1.2, marginBottom: 14 }}>From Our Farm,<br /><span style={{ color: "#3B6D11" }}>To Your Table</span></h1>
        <p style={{ fontSize: 17, color: "#27500A", maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.7 }}>Fresh organic mangoes and pomegranates grown with love in Maharashtra. No chemicals. No middlemen. Just pure, honest fruit.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#products" style={{ background: "#3B6D11", color: "#fff", padding: "13px 30px", borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Shop Now</a>
          <a href="#story" style={{ background: "transparent", color: "#27500A", padding: "13px 30px", borderRadius: 8, fontSize: 15, fontWeight: 600, border: "2px solid #3B6D11", textDecoration: "none" }}>Our Story</a>
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products" style={{ padding: "56px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#173404", marginBottom: 6 }}>Our Products</h2>
        <p style={{ fontSize: 15, color: "#666", marginBottom: 32 }}>Straight from the farm, delivered fresh to you</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {products.length === 0 ? (
            [{ name: "Alphonso Mango", emoji: "🥭", price: "₹800/dozen", desc: "The king of mangoes. Naturally ripened, chemical-free.", bg: "#FAEEDA" },
             { name: "Kesar Mango", emoji: "🥭", price: "₹700/dozen", desc: "Rich saffron colour, incredibly fragrant. GI-tagged gem.", bg: "#FFF3CD" },
             { name: "Pomegranate", emoji: "🍎", price: "₹120/kg", desc: "Deep red, juicy seeds. Rich in antioxidants.", bg: "#FBEAF0" },
             { name: "Farm Box", emoji: "📦", price: "₹1200/box", desc: "A mix of seasonal fruits. Perfect gift.", bg: "#EAF3DE" }
            ].map((p, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ height: 150, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>{p.emoji}</div>
                <div style={{ padding: 16 }}>
                  <div style={{ background: "#EAF3DE", color: "#27500A", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 8 }}>ORGANIC</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#173404", marginBottom: 6 }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: "#666", marginBottom: 12, lineHeight: 1.6 }}>{p.desc}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#3B6D11", marginBottom: 12 }}>{p.price}</div>
                  <button onClick={() => handleOrder(p.name)} style={{ width: "100%", background: "#EAF3DE", color: "#27500A", border: "none", padding: 10, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Order on WhatsApp</button>
                </div>
              </div>
            ))
          ) : products.map((p) => (
            <div key={p.id} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ height: 150, background: "#FAEEDA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>🥭</div>
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#173404", marginBottom: 6 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 12 }}>{p.description}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#3B6D11", marginBottom: 12 }}>₹{p.price}</div>
                <button onClick={() => handleOrder(p.name)} style={{ width: "100%", background: "#EAF3DE", color: "#27500A", border: "none", padding: 10, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Order on WhatsApp</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STORY */}
      <div id="story" style={{ background: "#EAF3DE", borderRadius: 16, padding: "40px", margin: "0 32px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
        <div style={{ height: 200, background: "#C0DD97", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>🌳</div>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#173404", marginBottom: 12 }}>Grown with Patience, Delivered with Pride</h2>
          <p style={{ fontSize: 15, color: "#27500A", lineHeight: 1.7, marginBottom: 16 }}>Our farm in Maharashtra spans acres of mango and pomegranate trees, tended by hand every single day. No chemicals, no shortcuts.</p>
          <a href="#contact" style={{ background: "#3B6D11", color: "#fff", padding: "10px 22px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Get in Touch</a>
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ background: "#173404", borderRadius: 16, padding: "48px 32px", textAlign: "center", margin: "0 32px 56px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#C0DD97", marginBottom: 8 }}>Ready to Order?</h2>
        <p style={{ fontSize: 15, color: "#97C459", marginBottom: 28 }}>Leave your number and we'll get in touch directly.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", maxWidth: 520, margin: "0 auto" }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ flex: 1, minWidth: 180, padding: "12px 16px", borderRadius: 8, border: "1px solid #3B6D11", background: "#27500A", color: "#C0DD97", fontSize: 14 }} />
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" style={{ flex: 1, minWidth: 180, padding: "12px 16px", borderRadius: 8, border: "1px solid #3B6D11", background: "#27500A", color: "#C0DD97", fontSize: 14 }} />
          <button onClick={handleContact} style={{ background: "#639922", color: "#173404", border: "none", padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Get in Touch</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ padding: "24px 32px", borderTop: "1px solid #e5e5e5", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: 13, color: "#888" }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#3B6D11", letterSpacing: 2 }}>FROM FARM</div>
        <div>Maharashtra, India · Organic</div>
        <div>fromfarm.co.in · © 2026</div>
      </footer>
    </div>
  );
}