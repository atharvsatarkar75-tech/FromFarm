import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

export default function Navbar({ onMenuClick, menuOpen }) {
  const navigate = useNavigate();
  const { totalItems, setCartOpen } = useCart();

  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 28px", height: 64,
      background: "rgba(23,52,4,0.75)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(99,153,34,0.3)",
      position: "sticky", top: 0, zIndex: 200
    }}>
      {/* Hamburger */}
      {onMenuClick ? (
        <div onClick={onMenuClick} style={{ display: "flex", flexDirection: "column", gap: 5, cursor: "pointer", padding: 6, borderRadius: 8 }}>
          {[0,1,2].map(i => <span key={i} style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2 }} />)}
        </div>
      ) : (
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#97C459", fontWeight: 700 }}>
          ← Back
        </button>
      )}

      {/* Logo */}
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => navigate("/")}>
        <div style={{ width: 38, height: 38, background: "#67e033", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌿</div>
        <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", letterSpacing: 2 }}>FROM <span style={{ color: "#72f137" }}>FARM</span></div>
      </div>

      {/* Right Icons */}
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(150,196,89,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>🔍</div>
        <div onClick={() => setCartOpen(true)} style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(150,196,89,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, position: "relative" }}>
          🛒
          <div style={{ position: "absolute", top: -2, right: -2, width: 17, height: 17, background: "#97C459", borderRadius: "50%", fontSize: 10, fontWeight: 700, color: "#173404", display: "flex", alignItems: "center", justifyContent: "center" }}>{totalItems}</div>
        </div>
      </div>
    </nav>
  );
}