import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SeasonalBanner() {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  if (!visible) return null;

  return (
    <div style={{
      background: "linear-gradient(90deg, #3B6D11 0%, #639922 50%, #3B6D11 100%)",
      padding: "10px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      position: "relative"
    }}>
      <span style={{ fontSize: 18 }}>🥭</span>
      <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: 0.5 }}>
        Mango Season is Live! Fresh Alphonso & Kesar Mangoes available now.
      </span>
      <button
        onClick={() => navigate("/shop")}
        style={{
          background: "#fff",
          color: "#3B6D11",
          border: "none",
          padding: "6px 16px",
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 800,
          cursor: "pointer",
          whiteSpace: "nowrap"
        }}>
        Order Now →
      </button>
      <button
        onClick={() => setVisible(false)}
        style={{
          position: "absolute",
          right: 16,
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: 18,
          cursor: "pointer",
          lineHeight: 1
        }}>
        ✕
      </button>
    </div>
  );
}