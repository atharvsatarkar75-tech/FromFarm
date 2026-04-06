import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [activePhoto, setActivePhoto] = useState(0);
  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER;

  const kesarPhotos = ["/images/kesar1.jpg", "/images/kesar2.jpg", "/images/kesar3.jpg"];

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

  const s = {
    page: { fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#1a1a1a", background: "#fff" },
    nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 40px", borderBottom: "1px solid #e8f5e0", background: "#fff", position: "sticky", top: 0, zIndex: 10 },
    logo: { fontSize: 20, fontWeight: 700, color: "#173404", letterSpacing: 2 },
    navLinks: { display: "flex", gap: 28 },
    navLink: { fontSize: 14, color: "#444", textDecoration: "none", fontWeight: 500 },
    navBtn: { background: "#3B6D11", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 25, fontSize: 14, cursor: "pointer", fontWeight: 700 },
  };

  return (
    <div style={s.page}>

      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.logo}>FROM <span style={{ color: "#639922" }}>FARM</span></div>
        <div style={s.navLinks}>
          <a href="#products" style={s.navLink}>Products</a>
          <a href="#why" style={s.navLink}>Why Us</a>
          <a href="#story" style={s.navLink}>Our Story</a>
          <a href="#contact" style={s.navLink}>Contact</a>
        </div>
        <button onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })} style={s.navBtn}>Order Now</button>
      </nav>

      {/* HERO */}
      <div style={{ background: "#EAF3DE", padding: "80px 40px 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#173404", color: "#97C459", fontSize: 11, fontWeight: 700, padding: "6px 16px", borderRadius: 25, marginBottom: 20, letterSpacing: 1.5 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#97C459" }}></div>
              100% ORGANIC · MAHARASHTRA
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 800, color: "#173404", lineHeight: 1.15, marginBottom: 16 }}>
              Farm Fresh,<br /><span style={{ color: "#3B6D11" }}>Straight to</span><br />Your Door
            </h1>
            <p style={{ fontSize: 16, color: "#27500A", lineHeight: 1.8, marginBottom: 28, maxWidth: 420 }}>
              Hand-picked mangoes and pomegranates from our organic farm in Maharashtra. No chemicals, no middlemen — just pure honest fruit.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="#products" style={{ background: "#3B6D11", color: "#fff", padding: "14px 32px", borderRadius: 25, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>Shop Now</a>
              <a href="#story" style={{ background: "transparent", color: "#3B6D11", padding: "14px 32px", borderRadius: 25, fontSize: 15, fontWeight: 700, border: "2px solid #3B6D11", textDecoration: "none" }}>Our Story</a>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 28, paddingTop: 24, borderTop: "1px solid #c5e29a" }}>
              {[["100%", "Organic"], ["0", "Chemicals"], ["48hr", "Delivery"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#173404" }}>{num}</div>
                  <div style={{ fontSize: 12, color: "#639922", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "🥭", name: "Alphonso Mango", price: "₹800/dozen", bg: "#FFF3E0" },
              { icon: "🥭", name: "Kesar Mango", price: "₹700/dozen", bg: "#FFFDE7" },
              { icon: "❤️", name: "Pomegranate", price: "₹120/kg", bg: "#FCE4EC" },
              { icon: "📦", name: "Farm Box", price: "₹1200/box", bg: "#173404", dark: true },
            ].map((item) => (
              <div key={item.name} style={{ background: item.dark ? "#173404" : item.bg, borderRadius: 20, padding: 20, border: item.dark ? "none" : "1px solid #d4eab8" }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: item.dark ? "#C0DD97" : "#173404", marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 13, color: item.dark ? "#97C459" : "#3B6D11", fontWeight: 600 }}>{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products" style={{ padding: "72px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "inline-block", background: "#EAF3DE", color: "#3B6D11", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 25, marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>Our Products</div>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: "#173404", marginBottom: 8 }}>Fresh from the tree</h2>
        <p style={{ fontSize: 16, color: "#555", marginBottom: 40, lineHeight: 1.6 }}>Every fruit hand-picked at peak ripeness, packed and delivered within 48 hours</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>

          {/* ALPHONSO */}
          <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 20, overflow: "hidden" }}>
            <div style={{ height: 160, background: "#FFF3E0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, position: "relative" }}>
              🥭
              <div style={{ position: "absolute", top: 12, left: 12, background: "#3B6D11", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: 1 }}>ORGANIC</div>
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#173404", marginBottom: 6 }}>Alphonso Mango</div>
              <div style={{ fontSize: 13, color: "#666", marginBottom: 14, lineHeight: 1.6 }}>The king of mangoes. Naturally ripened with rich golden colour and irresistible aroma.</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#3B6D11" }}>₹800/dozen</div>
                <button onClick={() => handleOrder("Alphonso Mango")} style={{ background: "#EAF3DE", color: "#27500A", border: "none", padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Order Now</button>
              </div>
            </div>
          </div>

          {/* KESAR with real photos */}
          <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 20, overflow: "hidden" }}>
            <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
              <img src={kesarPhotos[activePhoto]} alt="Kesar Mango" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 12, left: 12, background: "#3B6D11", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: 1 }}>GI TAGGED</div>
              <div style={{ position: "absolute", bottom: 10, left: 12, display: "flex", gap: 6 }}>
                {kesarPhotos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt={`Kesar ${idx + 1}`}
                    onClick={() => setActivePhoto(idx)}
                    style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 8, border: activePhoto === idx ? "2px solid #fff" : "2px solid rgba(255,255,255,0.4)", cursor: "pointer" }}
                  />
                ))}
              </div>
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#173404", marginBottom: 6 }}>Kesar Mango</div>
              <div style={{ fontSize: 13, color: "#666", marginBottom: 14, lineHeight: 1.6 }}>Saffron-hued and incredibly fragrant. A GI-tagged pride grown organically on our farm.</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#3B6D11" }}>₹700/dozen</div>
                <button onClick={() => handleOrder("Kesar Mango")} style={{ background: "#EAF3DE", color: "#27500A", border: "none", padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Order Now</button>
              </div>
            </div>
          </div>

          {/* POMEGRANATE */}
          <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 20, overflow: "hidden" }}>
            <div style={{ height: 160, background: "#FCE4EC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, position: "relative" }}>
              ❤️
              <div style={{ position: "absolute", top: 12, left: 12, background: "#3B6D11", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: 1 }}>ORGANIC</div>
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#173404", marginBottom: 6 }}>Pomegranate</div>
              <div style={{ fontSize: 13, color: "#666", marginBottom: 14, lineHeight: 1.6 }}>Deep ruby red, bursting with sweet-tart juice. Rich in antioxidants, zero pesticides.</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#3B6D11" }}>₹120/kg</div>
                <button onClick={() => handleOrder("Pomegranate")} style={{ background: "#EAF3DE", color: "#27500A", border: "none", padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Order Now</button>
              </div>
            </div>
          </div>

          {/* FARM BOX */}
          <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 20, overflow: "hidden" }}>
            <div style={{ height: 160, background: "#F1F8E9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, position: "relative" }}>
              📦
              <div style={{ position: "absolute", top: 12, left: 12, background: "#BA7517", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: 1 }}>BESTSELLER</div>
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#173404", marginBottom: 6 }}>Farm Box</div>
              <div style={{ fontSize: 13, color: "#666", marginBottom: 14, lineHeight: 1.6 }}>A curated seasonal mix — perfect as a gift or to stock up your kitchen with the best.</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#3B6D11" }}>₹1200/box</div>
                <button onClick={() => handleOrder("Farm Box")} style={{ background: "#EAF3DE", color: "#27500A", border: "none", padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Order Now</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* WHY US */}
      <div id="why" style={{ background: "#fafff5", padding: "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "#EAF3DE", color: "#3B6D11", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 25, marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>Why From Farm</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#173404", marginBottom: 8 }}>The difference is real</h2>
          <p style={{ fontSize: 16, color: "#555", marginBottom: 40 }}>We're not a reseller. We're the farmer.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[
              { icon: "🌱", title: "Zero chemicals", desc: "No pesticides, no synthetic fertilizers. Traditional organic methods only." },
              { icon: "👨‍🌾", title: "Direct from farmer", desc: "You buy directly from us — no middlemen, fresher fruit at better prices." },
              { icon: "🚚", title: "48hr delivery", desc: "Packed and shipped same day we pick. Delivered fresh across Maharashtra." },
              { icon: "🏡", title: "Family farm", desc: "Cultivated for generations with love and deep respect for the land." },
            ].map((item) => (
              <div key={item.title} style={{ background: "#EAF3DE", borderRadius: 20, padding: "28px 24px" }}>
                <div style={{ width: 48, height: 48, background: "#3B6D11", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16 }}>{item.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#173404", marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#27500A", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STORY */}
      <div id="story" style={{ background: "#173404", borderRadius: 24, padding: "56px 48px", margin: "72px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <div style={{ background: "#27500A", borderRadius: 20, height: 260, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 80 }}>🌳</div>
          <div style={{ color: "#97C459", fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>Our Farm · Maharashtra</div>
        </div>
        <div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#C0DD97", marginBottom: 14, lineHeight: 1.3 }}>Grown with patience, delivered with pride</h2>
          <p style={{ fontSize: 15, color: "#97C459", lineHeight: 1.8, marginBottom: 20 }}>Our farm spans acres of mango and pomegranate trees tended by hand every day. We believe in farming the way it was meant to be — with care for the soil, the tree, and the person eating the fruit.</p>
          {["Acres of certified organic land", "Hand-picked at peak ripeness", "No cold storage — always fresh", "Delivered across Maharashtra"].map((feat) => (
            <div key={feat} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#C0DD97", fontWeight: 500, marginBottom: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#639922", flexShrink: 0 }}></div>
              {feat}
            </div>
          ))}
          <a href="#contact" style={{ display: "inline-block", marginTop: 16, background: "#3B6D11", color: "#fff", padding: "12px 28px", borderRadius: 25, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Get in Touch</a>
        </div>
      </div>

      {/* PROCESS */}
      <div style={{ padding: "0 40px 72px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "inline-block", background: "#EAF3DE", color: "#3B6D11", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 25, marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>How It Works</div>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: "#173404", marginBottom: 8 }}>From tree to you</h2>
        <p style={{ fontSize: 16, color: "#555", marginBottom: 40 }}>Every step handled with care</p>
        <div style={{ background: "#fafff5", borderRadius: 20, border: "1px solid #d4eab8", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          {[
            { num: "1", icon: "🌱", title: "Organic growing", desc: "No pesticides, natural compost, traditional methods" },
            { num: "2", icon: "👐", title: "Hand picked", desc: "Each fruit picked at perfect ripeness by experienced hands" },
            { num: "3", icon: "🧺", title: "Sorted & packed", desc: "Cleaned and packed in eco-friendly boxes same day" },
            { num: "4", icon: "🚚", title: "Fast delivery", desc: "Delivered across Maharashtra within 48 hours" },
          ].map((step, i, arr) => (
            <div key={step.num} style={{ textAlign: "center", padding: "28px 20px", borderRight: i < arr.length - 1 ? "1px solid #e5e5e5" : "none" }}>
              <div style={{ width: 40, height: 40, background: "#3B6D11", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", margin: "0 auto 14px" }}>{step.num}</div>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{step.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#173404", marginBottom: 6 }}>{step.title}</div>
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ background: "#EAF3DE", borderRadius: 24, padding: "56px 48px", textAlign: "center", margin: "0 40px 72px" }}>
        <div style={{ display: "inline-block", background: "#3B6D11", color: "#EAF3DE", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 25, marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>Get in Touch</div>
        <h2 style={{ fontSize: 32, fontWeight: 800, color: "#173404", marginBottom: 8 }}>Ready to order?</h2>
        <p style={{ fontSize: 16, color: "#27500A", marginBottom: 32 }}>Leave your details and we'll reach out — or order instantly on WhatsApp!</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", maxWidth: 560, margin: "0 auto 16px" }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={{ flex: 1, minWidth: 160, padding: "14px 18px", borderRadius: 25, border: "2px solid #C0DD97", background: "#fff", color: "#173404", fontSize: 14, outline: "none" }} />
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" style={{ flex: 1, minWidth: 160, padding: "14px 18px", borderRadius: 25, border: "2px solid #C0DD97", background: "#fff", color: "#173404", fontSize: 14, outline: "none" }} />
          <button onClick={handleContact} style={{ background: "#3B6D11", color: "#fff", border: "none", padding: "14px 28px", borderRadius: 25, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Send</button>
        </div>
        <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi! I want to order from From Farm.")}`} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", padding: "14px 28px", borderRadius: 25, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
          <div style={{ width: 20, height: 20, background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#25D366", fontWeight: 800 }}>W</div>
          Order on WhatsApp
        </a>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#173404", padding: "48px 40px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#C0DD97", letterSpacing: 2, marginBottom: 12 }}>FROM <span style={{ color: "#639922" }}>FARM</span></div>
            <p style={{ fontSize: 14, color: "#639922", lineHeight: 1.7, maxWidth: 280 }}>Organic mangoes and pomegranates grown with love in Maharashtra. From our family farm to your table.</p>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#97C459", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Products</div>
            {["Alphonso Mango", "Kesar Mango", "Pomegranate", "Farm Box"].map(p => (
              <div key={p} style={{ fontSize: 14, color: "#639922", marginBottom: 8 }}>{p}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#97C459", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Connect</div>
            {["WhatsApp Us", "Instagram", "Our Story", "Contact"].map(l => (
              <div key={l} style={{ fontSize: 14, color: "#639922", marginBottom: 8 }}>{l}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: "#0d1f07", padding: "16px 40px", textAlign: "center", fontSize: 13, color: "#639922" }}>
        Maharashtra, India · Organic Certified · fromfarm.co.in · © 2026
      </div>

    </div>
  );
}