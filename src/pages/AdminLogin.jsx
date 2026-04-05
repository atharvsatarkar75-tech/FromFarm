import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      localStorage.setItem("fromfarm_admin", "true");
      navigate("/admin");
    } else {
      setError("Wrong password. Try again.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#EAF3DE", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", padding: 40, borderRadius: 16, border: "1px solid #e5e5e5", width: 360, textAlign: "center" }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#3B6D11", marginBottom: 8, letterSpacing: 2 }}>FROM FARM</div>
        <div style={{ fontSize: 14, color: "#666", marginBottom: 28 }}>Admin Panel Login</div>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #e5e5e5", fontSize: 14, marginBottom: 12, boxSizing: "border-box" }}
        />
        {error && <div style={{ color: "red", fontSize: 13, marginBottom: 12 }}>{error}</div>}
        <button onClick={handleLogin} style={{ width: "100%", background: "#3B6D11", color: "#fff", border: "none", padding: "12px", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          Login
        </button>
      </div>
    </div>
  );
}