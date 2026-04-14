import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import MarqueeBanner from "../components/MarqueeBanner";
import SeasonalBanner from "../components/SeasonalBanner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useIsMobile from "../useIsMobile";

export default function Contact() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER;

  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.phone) return alert("Please enter your name and phone number.");
    setLoading(true);
    try {
      await addDoc(collection(db, "inquiries"), {
        ...form,
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (e) {
      alert("Something went wrong. Please try WhatsApp instead.");
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: "#1a1a1a", minHeight: "100vh", background: "#f7f9f4" }}>
      <SeasonalBanner />
      <MarqueeBanner />
      <Navbar />

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #173404 0%, #3B6D11 100%)", padding: isMobile ? "48px 24px" : "72px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📞</div>
        <h1 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Get in Touch</h1>
        <p style={{ fontSize: 16, color: "#97C459", maxWidth: 500, margin: "0 auto" }}>
          Have a question about our fruits? Want to place a bulk order? We'd love to hear from you.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "32px 16px" : "60px 32px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 48 }}>

        {/* LEFT — Contact Form */}
        <div className="farm-card" style={{ padding: 0 }}>
          <div className="farm-card-aurora" style={{ width: 200, height: 200 }} />
          <div className="farm-card-bg" />
          <div style={{ position: "relative", zIndex: 3, padding: isMobile ? 24 : 36 }}>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#173404", marginBottom: 8 }}>Message Sent!</h2>
                <p style={{ fontSize: 15, color: "#444", marginBottom: 24 }}>We will get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} style={{ background: "#3B6D11", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#173404", marginBottom: 24 }}>Send us a Message</h2>

                {/* Name */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#173404", display: "block", marginBottom: 6 }}>Your Name *</label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Rajesh Satarkar"
                    style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d0e8b8", fontSize: 15, background: "#fff", boxSizing: "border-box" }}
                  />
                </div>

                {/* Phone */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#173404", display: "block", marginBottom: 6 }}>Phone Number *</label>
                  <input
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d0e8b8", fontSize: 15, background: "#fff", boxSizing: "border-box" }}
                  />
                </div>

                {/* Email */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#173404", display: "block", marginBottom: 6 }}>Email (optional)</label>
                  <input
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d0e8b8", fontSize: 15, background: "#fff", boxSizing: "border-box" }}
                  />
                </div>

                {/* Message */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#173404", display: "block", marginBottom: 6 }}>Message</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="I would like to order 2 dozen Alphonso mangoes..."
                    rows={4}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d0e8b8", fontSize: 15, background: "#fff", resize: "vertical", boxSizing: "border-box" }}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ width: "100%", background: "#3B6D11", color: "#fff", border: "none", padding: "16px", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", marginBottom: 12 }}
                >
                  {loading ? "Sending..." : "📨 Send Message"}
                </button>

                <button
                  onClick={() => window.open(`https://wa.me/${whatsapp}?text=Hi! I have a question about From Farm.`, "_blank")}
                  style={{ width: "100%", background: "#25D366", color: "#fff", border: "none", padding: "16px", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer" }}
                >
                  💬 WhatsApp Us Instead
                </button>
              </>
            )}
          </div>
        </div>

        {/* RIGHT — Info Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Farm Info */}
          <div className="farm-card" style={{ padding: 0 }}>
            <div className="farm-card-aurora" style={{ width: 150, height: 150, opacity: 0.5 }} />
            <div className="farm-card-bg" />
            <div style={{ position: "relative", zIndex: 3, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🌿</div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#173404", marginBottom: 8 }}>Visit Our Farm</h3>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7 }}>Maharashtra, India<br />Open for farm visits by appointment</p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="farm-card" style={{ padding: 0 }}>
            <div className="farm-card-aurora" style={{ width: 150, height: 150, opacity: 0.5 }} />
            <div className="farm-card-bg" />
            <div style={{ position: "relative", zIndex: 3, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>💬</div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#173404", marginBottom: 8 }}>WhatsApp Orders</h3>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7, marginBottom: 14 }}>Fastest way to order. We reply within 1 hour during farm hours.</p>
              <div
                onClick={() => window.open(`https://wa.me/${whatsapp}`, "_blank")}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", padding: "10px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >
                💬 Open WhatsApp
              </div>
            </div>
          </div>

          {/* Bulk Orders */}
          <div className="farm-card" style={{ padding: 0 }}>
            <div className="farm-card-aurora" style={{ width: 150, height: 150, opacity: 0.5 }} />
            <div className="farm-card-bg" />
            <div style={{ position: "relative", zIndex: 3, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>📦</div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#173404", marginBottom: 8 }}>Bulk Orders</h3>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7 }}>Corporate gifting, wedding orders, bulk purchases — we offer special rates. Contact us to discuss.</p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}