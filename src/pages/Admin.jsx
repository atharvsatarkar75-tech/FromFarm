import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/config";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Admin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [tab, setTab] = useState("dashboard");
  const [newProduct, setNewProduct] = useState({ name: "", price: "", unit: "", emoji: "📦", description: "" });
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/admin/login");
      } else {
        fetchData();
      }
    });
    return () => unsubscribe();
  }, []);

  const showStatus = (msg, type = "success") => {
    setStatus({ msg, type });
    setTimeout(() => setStatus(null), 3000);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const pSnap = await getDocs(collection(db, "products"));
      setProducts(pSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      const iSnap = await getDocs(collection(db, "inquiries"));
      setInquiries(iSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      showStatus("Failed to load data.", "error");
    }
    setLoading(false);
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      showStatus("Please fill in name and price.", "error");
      return;
    }
    try {
      await addDoc(collection(db, "products"), newProduct);
      setNewProduct({ name: "", price: "", unit: "", emoji: "📦", description: "" });
      showStatus("✅ Product added successfully!");
      fetchData();
    } catch (err) {
      showStatus("Failed to add product.", "error");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setConfirmDelete(null);
      showStatus("🗑️ Product deleted.");
      fetchData();
    } catch (err) {
      showStatus("Failed to delete product.", "error");
    }
  };

  const saveEdit = async () => {
    try {
      await updateDoc(doc(db, "products", editing.id), {
        name: editing.name,
        price: editing.price,
        unit: editing.unit || "",
        emoji: editing.emoji || "📦",
        description: editing.description,
      });
      setEditing(null);
      showStatus("✅ Product updated!");
      fetchData();
    } catch (err) {
      showStatus("Failed to update product.", "error");
    }
  };

  const logout = async () => {
    await auth.signOut();
    navigate("/admin/login");
  };

  const chartData = [
    { name: "Products", value: products.length },
    { name: "Inquiries", value: inquiries.length },
  ];

  const inputStyle = {
    padding: "10px 14px", borderRadius: 8, border: "1px solid #e5e5e5",
    fontSize: 14, width: "100%", boxSizing: "border-box", outline: "none",
    fontFamily: "inherit"
  };

  const navItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "products", icon: "🥭", label: "Products" },
    { id: "inquiries", icon: "📩", label: "Inquiries" },
  ];

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", minHeight: "100vh", background: "#f4f6f8", display: "flex" }}>

      {/* STATUS TOAST */}
      {status && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: status.type === "error" ? "#E74C3C" : "#173404", color: "#fff", padding: "12px 28px", borderRadius: 25, fontSize: 14, fontWeight: 600, zIndex: 9999, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", whiteSpace: "nowrap" }}>
          {status.msg}
        </div>
      )}

      {/* DELETE MODAL */}
      {confirmDelete && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 36, maxWidth: 380, width: "90%", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🗑️</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#173404", marginBottom: 8 }}>Delete Product?</div>
            <div style={{ fontSize: 14, color: "#666", marginBottom: 28 }}>This action cannot be undone.</div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, background: "#f4f6f8", color: "#333", border: "none", padding: 14, borderRadius: 12, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Cancel</button>
              <button onClick={() => deleteProduct(confirmDelete)} style={{ flex: 1, background: "#E74C3C", color: "#fff", border: "none", padding: 14, borderRadius: 12, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <div style={{ width: sidebarOpen ? 260 : 70, background: "#173404", minHeight: "100vh", transition: "width 0.3s ease", flexShrink: 0, display: "flex", flexDirection: "column" }}>
        {/* Sidebar Header */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {sidebarOpen && (
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#C0DD97", letterSpacing: 2 }}>FROM <span style={{ color: "#639922" }}>FARM</span></div>
              <div style={{ fontSize: 11, color: "#639922", marginTop: 2 }}>Admin Panel</div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, padding: 8, cursor: "pointer", color: "#C0DD97", fontSize: 16 }}>
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        {/* Nav Items */}
        <div style={{ flex: 1, padding: "16px 12px" }}>
          {navItems.map(item => (
            <div key={item.id} onClick={() => setTab(item.id)} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
              borderRadius: 12, cursor: "pointer", marginBottom: 6, transition: "all 0.2s",
              background: tab === item.id ? "rgba(150,196,89,0.2)" : "transparent",
              border: tab === item.id ? "1px solid rgba(150,196,89,0.3)" : "1px solid transparent"
            }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              {sidebarOpen && <span style={{ fontSize: 14, fontWeight: 600, color: tab === item.id ? "#C0DD97" : "#639922" }}>{item.label}</span>}
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", borderRadius: 12, cursor: "pointer", marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>🌐</span>
            {sidebarOpen && <span style={{ fontSize: 14, fontWeight: 600, color: "#639922" }}>View Website</span>}
          </div>
          <div onClick={logout} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", borderRadius: 12, cursor: "pointer", background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.3)" }}>
            <span style={{ fontSize: 20 }}>🚪</span>
            {sidebarOpen && <span style={{ fontSize: 14, fontWeight: 600, color: "#ff6b6b" }}>Logout</span>}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, overflow: "auto" }}>

        {/* Top Bar */}
        <div style={{ background: "#fff", padding: "16px 32px", borderBottom: "1px solid #e5e5e5", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#173404" }}>
              {tab === "dashboard" && "Dashboard"}
              {tab === "products" && "Products"}
              {tab === "inquiries" && "Inquiries"}
            </div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>From Farm Admin Panel</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ background: "#EAF3DE", borderRadius: 25, padding: "6px 16px", fontSize: 12, color: "#3B6D11", fontWeight: 700 }}>
              🟢 Live
            </div>
            <div style={{ width: 36, height: 36, background: "#173404", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🌿</div>
          </div>
        </div>

        <div style={{ padding: 32 }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: 80 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
              <div style={{ fontSize: 16, color: "#888" }}>Loading data...</div>
            </div>
          ) : (
            <>
              {/* DASHBOARD */}
              {tab === "dashboard" && (
                <div>
                  {/* Stats Cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 32 }}>
                    {[
                      { label: "Total Products", value: products.length, icon: "🥭", bg: "#EAF3DE", color: "#3B6D11", sub: "In your store" },
                      { label: "Total Inquiries", value: inquiries.length, icon: "📩", bg: "#FFF3E0", color: "#E65100", sub: "Customer messages" },
                      { label: "Website Status", value: "Live", icon: "🌐", bg: "#E8F5E9", color: "#2E7D32", sub: "fromfarm.co.in" },
                      { label: "Farm Since", value: "2000s", icon: "🌱", bg: "#F3E5F5", color: "#6A1B9A", sub: "Years of farming" },
                    ].map((s, i) => (
                      <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #e5e5e5", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
                          <div style={{ width: 40, height: 40, background: s.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
                        </div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: s.color, marginBottom: 4 }}>{s.value}</div>
                        <div style={{ fontSize: 12, color: "#888" }}>{s.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #e5e5e5", marginBottom: 32 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#173404", marginBottom: 24 }}>Overview</div>
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={chartData} barSize={60}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: 13 }} />
                        <YAxis axisLine={false} tickLine={false} style={{ fontSize: 13 }} />
                        <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
                        <Bar dataKey="value" fill="#3B6D11" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Quick Actions */}
                  <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #e5e5e5" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#173404", marginBottom: 20 }}>Quick Actions</div>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      {[
                        { label: "Add Product", icon: "➕", action: () => setTab("products") },
                        { label: "View Inquiries", icon: "📩", action: () => setTab("inquiries") },
                        { label: "View Website", icon: "🌐", action: () => navigate("/") },
                      ].map((a, i) => (
                        <button key={i} onClick={a.action} style={{ display: "flex", alignItems: "center", gap: 8, background: "#EAF3DE", color: "#27500A", border: "none", padding: "12px 20px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                          {a.icon} {a.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* PRODUCTS */}
              {tab === "products" && (
                <div>
                  {/* Add Product Form */}
                  <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #e5e5e5", marginBottom: 24 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#173404", marginBottom: 20 }}>➕ Add New Product</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 12 }}>
                      <input placeholder="Product name *" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} style={inputStyle} />
                      <input placeholder="Price (e.g. ₹800) *" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} style={inputStyle} />
                      <input placeholder="Unit (e.g. /dozen)" value={newProduct.unit} onChange={e => setNewProduct({ ...newProduct, unit: e.target.value })} style={inputStyle} />
                      <input placeholder="Emoji (e.g. 🥭)" value={newProduct.emoji} onChange={e => setNewProduct({ ...newProduct, emoji: e.target.value })} style={inputStyle} />
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                      <input placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} style={{ ...inputStyle, flex: 1 }} />
                      <button onClick={addProduct} style={{ background: "#3B6D11", color: "#fff", border: "none", padding: "10px 28px", borderRadius: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", fontSize: 14 }}>Add Product</button>
                    </div>
                  </div>

                  {/* Products List */}
                  <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #e5e5e5" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#173404", marginBottom: 20 }}>🥭 All Products ({products.length})</div>
                    {products.length === 0 ? (
                      <div style={{ textAlign: "center", padding: 48, color: "#888" }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
                        <div>No products yet. Add one above!</div>
                      </div>
                    ) : (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                        {products.map(p => (
                          <div key={p.id} style={{ background: "#f9fafb", borderRadius: 14, padding: 20, border: "1px solid #e5e5e5" }}>
                            {editing?.id === p.id ? (
                              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="Name" style={inputStyle} />
                                <input value={editing.price} onChange={e => setEditing({ ...editing, price: e.target.value })} placeholder="Price" style={inputStyle} />
                                <input value={editing.unit || ""} onChange={e => setEditing({ ...editing, unit: e.target.value })} placeholder="Unit" style={inputStyle} />
                                <input value={editing.emoji || ""} onChange={e => setEditing({ ...editing, emoji: e.target.value })} placeholder="Emoji" style={inputStyle} />
                                <input value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} placeholder="Description" style={inputStyle} />
                                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                                  <button onClick={saveEdit} style={{ flex: 1, background: "#3B6D11", color: "#fff", border: "none", padding: 10, borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>Save</button>
                                  <button onClick={() => setEditing(null)} style={{ flex: 1, background: "#e5e5e5", color: "#333", border: "none", padding: 10, borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div style={{ fontSize: 32, marginBottom: 8 }}>{p.emoji || "📦"}</div>
                                <div style={{ fontWeight: 800, fontSize: 16, color: "#173404", marginBottom: 4 }}>{p.name}</div>
                                <div style={{ fontSize: 13, color: "#666", marginBottom: 8, lineHeight: 1.5 }}>{p.description}</div>
                                <div style={{ fontWeight: 800, color: "#3B6D11", fontSize: 18, marginBottom: 16 }}>{p.price}<span style={{ fontWeight: 400, color: "#888", fontSize: 13 }}> {p.unit}</span></div>
                                <div style={{ display: "flex", gap: 8 }}>
                                  <button onClick={() => setEditing(p)} style={{ flex: 1, background: "#EAF3DE", color: "#3B6D11", border: "none", padding: 10, borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>✏️ Edit</button>
                                  <button onClick={() => setConfirmDelete(p.id)} style={{ flex: 1, background: "#FCEBEB", color: "#A32D2D", border: "none", padding: 10, borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>🗑️ Delete</button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* INQUIRIES */}
              {tab === "inquiries" && (
                <div>
                  <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #e5e5e5" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#173404", marginBottom: 20 }}>📩 Customer Inquiries ({inquiries.length})</div>
                    {inquiries.length === 0 ? (
                      <div style={{ textAlign: "center", padding: 48, color: "#888" }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
                        <div>No inquiries yet.</div>
                      </div>
                    ) : (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                        {inquiries.map(inq => (
                          <div key={inq.id} style={{ background: "#f9fafb", borderRadius: 14, padding: 20, border: "1px solid #e5e5e5" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                              <div style={{ width: 44, height: 44, background: "#EAF3DE", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👤</div>
                              <div>
                                <div style={{ fontWeight: 800, fontSize: 15, color: "#173404" }}>{inq.name}</div>
                                <div style={{ fontSize: 12, color: "#888" }}>{inq.createdAt?.toDate?.()?.toLocaleDateString() || "Recent"}</div>
                              </div>
                            </div>
                            <a href={`tel:${inq.phone}`} style={{ display: "flex", alignItems: "center", gap: 8, background: "#EAF3DE", color: "#3B6D11", padding: "10px 16px", borderRadius: 10, textDecoration: "none", fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                              📞 {inq.phone}
                            </a>
                            <a href={`https://wa.me/${inq.phone}`} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, background: "#E8F5E9", color: "#25D366", padding: "10px 16px", borderRadius: 10, textDecoration: "none", fontSize: 14, fontWeight: 700 }}>
                              💬 WhatsApp
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}