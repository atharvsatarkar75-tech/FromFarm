import { useNavigate } from "react-router-dom";
import useIsMobile from "../useIsMobile";

export default function OurStory() {
  const navigate = useNavigate();
const isMobile = useIsMobile();

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#1a1a1a", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", height: 64, background: "#fff", borderBottom: "1px solid #e8f5e0", position: "sticky", top: 0, zIndex: 200 }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#3B6D11", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
          ← Back
        </button>
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => navigate("/")}>
          <div style={{ width: 38, height: 38, background: "#173404", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌿</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#173404", letterSpacing: 2 }}>FROM <span style={{ color: "#639922" }}>FARM</span></div>
        </div>
        <div style={{ width: 60 }} />
      </nav>

      {/* HERO */}
      <div style={{ background: "#173404", padding: isMobile ? "40px 20px" : "80px 48px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(150,196,89,0.2)", color: "#97C459", fontSize: 11, fontWeight: 700, padding: "5px 16px", borderRadius: 25, marginBottom: 20, letterSpacing: 1.5, border: "1px solid rgba(150,196,89,0.3)" }}>
          OUR STORY
        </div>
        <h1 style={{ fontSize: isMobile ? 32 : 52, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
          Grown with Patience,<br /><span style={{ color: "#97C459" }}>Delivered with Pride</span>
        </h1>
        <p style={{ fontSize: 16, color: "#C0DD97", maxWidth: 600, margin: "0 auto", lineHeight: 1.8 }}>
          Over two decades of organic farming in Maharashtra — built on honesty, trust, and love for the land.
        </p>
      </div>

      {/* FARM PHOTOS GRID */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 4, height: isMobile ? "auto" : 400 }}>
        <div style={{ background: "#C0DD97", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>🌳</div>
        <div style={{ background: "#97C459", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>🥭</div>
        <div style={{ background: "#B8D98D", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>🌿</div>
      </div>

      {/* FOUNDER SECTION */}
      <div style={{ background: "#fff", padding: isMobile ? "40px 20px" : "80px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr", gap: isMobile ? 24 : 56, alignItems: "center" }}>
          <div style={{ background: "#EAF3DE", borderRadius: 24, height: 320, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 100 }}>
            👨‍🌾
          </div>
          <div>
            <div style={{ display: "inline-block", background: "#EAF3DE", color: "#3B6D11", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 25, marginBottom: 16, letterSpacing: 1 }}>OUR FOUNDER</div>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#173404", marginBottom: 8 }}>Rajesh Ramrao Satarkar</h2>
            <p style={{ fontSize: 15, color: "#444", lineHeight: 1.9, marginBottom: 16 }}>
              Our journey began with a vision. Our founder, Rajesh Ramrao Satarkar, built this farm with a deep belief — that food should be pure, natural, and grown with honesty.
            </p>
            <p style={{ fontSize: 15, color: "#444", lineHeight: 1.9 }}>
              At a time when chemical farming was becoming common, he chose a different path. He committed to 100% organic cultivation. No chemicals. No shortcuts. No compromises.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN STORY */}
      <div style={{ background: "#EAF3DE", padding: isMobile ? "40px 20px" : "80px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "#3B6D11", color: "#EAF3DE", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 25, marginBottom: 24, letterSpacing: 1 }}>THE FARM</div>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: "#173404", marginBottom: 24, lineHeight: 1.3 }}>100–120 Acres of Pure,<br />Organic Maharashtra Land</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 24 : 48, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: 15, color: "#27500A", lineHeight: 1.9, marginBottom: 20 }}>
                Spread across 100–120 acres in Maharashtra, our farm is home to a diverse range of crops including mango, pomegranate, tamarind (imli), and Indian gooseberry (amla). For over two decades, this land has been carefully nurtured using only organic farming practices.
              </p>
              <p style={{ fontSize: 15, color: "#27500A", lineHeight: 1.9, marginBottom: 20 }}>
                This decision was not easy — it required patience, effort, and trust in nature. But over the years, the soil grew richer, the produce became healthier, and the taste remained true to its roots.
              </p>
              <p style={{ fontSize: 15, color: "#27500A", lineHeight: 1.9 }}>
                Our quality has even reached beyond India, with our produce being exported to European markets — a reflection of the standards we maintain on our farm.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "🥭", label: "Mango", desc: "Alphonso & Kesar varieties" },
                { icon: "❤️", label: "Pomegranate", desc: "Deep ruby red, rich in antioxidants" },
                { icon: "🌿", label: "Tamarind (Imli)", desc: "Naturally grown on our land" },
                { icon: "🍃", label: "Indian Gooseberry (Amla)", desc: "Rich in Vitamin C" },
              ].map((crop, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, background: "#fff", borderRadius: 14, padding: "14px 20px", border: "1px solid #C0DD97" }}>
                  <div style={{ fontSize: 32 }}>{crop.icon}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#173404" }}>{crop.label}</div>
                    <div style={{ fontSize: 13, color: "#555" }}>{crop.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div style={{ background: "#173404", padding: isMobile ? "40px 20px" : "80px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-block", background: "rgba(150,196,89,0.2)", color: "#97C459", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 25, marginBottom: 16, letterSpacing: 1 }}>OUR JOURNEY</div>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: "#C0DD97" }}>From a Vision to Your Table</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { year: "2000s", icon: "🌱", title: "The Farm Begins", desc: "Rajesh Ramrao Satarkar establishes the farm on Maharashtra's rich black soil with a vision for pure, honest farming." },
              { year: "Early Years", icon: "🌳", title: "Going 100% Organic", desc: "At a time when chemical farming was becoming common, we chose a different path. 100% organic. No compromises." },
              { year: "Growing", icon: "🏆", title: "European Export Quality", desc: "Our produce quality reaches European export standards — a reflection of the care and standards maintained on our farm." },
              { year: "2024", icon: "📱", title: "From Farm Launches", desc: "We launch From Farm to bring our produce directly to Indian homes. No middlemen, no storage, no artificial ripening." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 24, paddingBottom: 40, position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 52, height: 52, background: "#3B6D11", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0, border: "3px solid #639922" }}>{item.icon}</div>
                  {i < 3 && <div style={{ width: 2, flex: 1, background: "rgba(150,196,89,0.3)", marginTop: 8 }} />}
                </div>
                <div style={{ paddingTop: 8, paddingBottom: 32 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#639922", letterSpacing: 1, marginBottom: 6 }}>{item.year}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#C0DD97", marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontSize: 14, color: "#97C459", lineHeight: 1.8 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROMISE SECTION */}
      <div style={{ background: "#fff", padding: "80px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: 48, marginBottom: 24 }}>🤝</div>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: "#173404", marginBottom: 20 }}>Our Promise to You</h2>
          <p style={{ fontSize: 16, color: "#444", lineHeight: 1.9, marginBottom: 32 }}>
            Today, From Farm is our way of bringing this same purity directly to your home. No middlemen. No storage. No artificial ripening. Just fresh, naturally grown fruits — delivered straight from our farm.
          </p>
          <p style={{ fontSize: 16, color: "#444", lineHeight: 1.9, marginBottom: 40, fontStyle: "italic" }}>
            "When you choose From Farm, you're not just buying fruits. You're choosing trust, quality, and a legacy built with care."
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/")} style={{ background: "#3B6D11", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 25, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Shop Our Products
            </button>
            <button onClick={() => navigate("/")} style={{ background: "transparent", color: "#3B6D11", border: "2px solid #3B6D11", padding: "14px 32px", borderRadius: 25, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ background: "#EAF3DE", padding: "56px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 20, textAlign: "center" }}>
          {[
            { num: "100+", label: "Acres of Farm Land" },
            { num: "20+", label: "Years of Organic Farming" },
            { num: "4", label: "Crops Grown" },
            { num: "🌍", label: "Exported to Europe" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "28px 16px", border: "1px solid #C0DD97" }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#3B6D11", marginBottom: 6 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "#555", fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#173404", padding: "24px 32px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: 13, color: "#639922" }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#C0DD97", letterSpacing: 2 }}>FROM FARM</div>
        <div>Maharashtra, India · Organic Since 2000s</div>
        <div>fromfarm.co.in · © 2026</div>
      </footer>

    </div>
  );
}