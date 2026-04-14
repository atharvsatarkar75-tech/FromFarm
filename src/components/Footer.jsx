import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{ background: "#173404", color: "#fff", padding: "48px 32px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 38, height: 38, background: "#67e033", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌿</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", letterSpacing: 2 }}>FROM <span style={{ color: "#72f137" }}>FARM</span></div>
            </div>
            <p style={{ fontSize: 13, color: "#97C459", lineHeight: 1.7 }}>
              Maharashtra's finest organic mangoes and pomegranates. Grown with love since 1962.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#97C459", letterSpacing: 2, marginBottom: 16 }}>QUICK LINKS</div>
            {[
              { label: "Home", path: "/" },
              { label: "Shop", path: "/shop" },
              { label: "Our Story", path: "/our-story" },
              { label: "Contact Us", path: "/contact" },
            ].map((link) => (
              <div key={link.path} onClick={() => navigate(link.path)} style={{ fontSize: 14, color: "#ccc", marginBottom: 10, cursor: "pointer" }}
                onMouseEnter={e => e.target.style.color = "#97C459"}
                onMouseLeave={e => e.target.style.color = "#ccc"}
              >
                {link.label}
              </div>
            ))}
          </div>

          {/* Products */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#97C459", letterSpacing: 2, marginBottom: 16 }}>OUR PRODUCTS</div>
            {[
              { label: "Alphonso Mango", path: "/product/alphonso" },
              { label: "Kesar Mango", path: "/product/kesar" },
              { label: "Pomegranate", path: "/product/pomegranate" },
              { label: "Farm Box", path: "/product/box" },
            ].map((link) => (
              <div key={link.path} onClick={() => navigate(link.path)} style={{ fontSize: 14, color: "#ccc", marginBottom: 10, cursor: "pointer" }}
                onMouseEnter={e => e.target.style.color = "#97C459"}
                onMouseLeave={e => e.target.style.color = "#ccc"}
              >
                {link.label}
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#97C459", letterSpacing: 2, marginBottom: 16 }}>CONTACT US</div>
            <div style={{ fontSize: 14, color: "#ccc", marginBottom: 10 }}>📍 Maharashtra, India</div>
            <div style={{ fontSize: 14, color: "#ccc", marginBottom: 10 }}>🌐 fromfarm.co.in</div>
            <div style={{ fontSize: 14, color: "#ccc", marginBottom: 20 }}>✉️ atharvsatarkar75@gmail.com</div>
            <div
              onClick={() => window.open("https://wa.me/91XXXXXXXXXX", "_blank")}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", padding: "10px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
            >
              💬 WhatsApp Us
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div style={{ borderTop: "1px solid rgba(150,196,89,0.2)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: 12, color: "#97C459" }}>
          <div>© 2026 From Farm · Maharashtra, India · Organic Since 1962</div>
          <div>Made with ❤️ for our farmers</div>
        </div>

      </div>
    </footer>
  );
}