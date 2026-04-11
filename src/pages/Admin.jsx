import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
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

  useEffect(() => {
    if (!localStorage.getItem("fromfarm_admin")) navigate("/admin/login");
    fetchData();
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
      console.error("Failed to fetch data:", err);
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
      showStatus("Product added.");
      fetchData();
    } catch (err) {
      console.error("Failed to add product:", err);
      showStatus("Failed to add product.", "error");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setConfirmDelete(null);
      showStatus("Product deleted.");
      fetchData();
    } catch (err) {
      console.error("Failed to delete product:", err);
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
      showStatus("Product updated.");
      fetchData();
    } catch (err) {
      console.error("Failed to update product:", err);
      showStatus("Failed to update product.", "error");
    }
  };

  const logout = () => {
    localStorage.removeItem("fromfarm_admin");
    navigate("/admin/login");
  };

  const chartData = [
    { name: "Inquiries", value: inquiries.length },
    { name: "Products", value: products.length },
  ];

  const tabStyle = (t) => ({
    padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14,
    background: tab === t ? "#3B6D11" : "#EAF3DE", color: tab === t ? "#fff" : "#3B6D11"
  });

  const inputStyle = { padding: "10px 14px", borderRadius: 8, border: "1px solid #e5e5e5", fontSize: 14, width: "100%", boxSizing: "border-box" };

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f9f9f9" }}>
      {/* Status toast */}
      {status && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: status.type === "error" ? "#E74C3C" : "#173404", color: "#fff", padding: "12px 24px", borderRadius: 25, fontSize: 14, fontWeight: 600, zIndex: 9999, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", whiteSpace: "nowrap" }}>
          {status.msg}
        </div>
      )}

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, maxWidth: 360, width: "90%", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#173404", marginBottom: 10 }}>Delete product?</div>
            <div style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>This cannot be undone.</div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, background: "#e5e5e5", color: "#333", border: "none", padding: 12, borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
              <button onClick={() => deleteProduct(confirmDelete)} style={{ flex: 1, background: "#E74C3C", color: "#fff", border: "none", padding: 12, borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: "#173404", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: "#C0DD97", fontWeight: 700, fontSize: 20, letterSpacing: 2 }}>FROM FARM — Admin</div>
        <button onClick={logout} style={{ background: "#639922", color: "#173404", border: "none", padding: "8px 18px", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Logout</button>
      </div>

      <div style={{ padding: 32, maxWidth: 1100, margin: "0 auto" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
          <button style={tabStyle("dashboard")} onClick={() => setTab("dashboard")}>Dashboard</button>
          <button style={tabStyle("products")} onClick={() => setTab("products")}>Products</button>
          <button style={tabStyle("inquiries")} onClick={() => setTab("inquiries")}>Inquiries</button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#888" }}>Loading...</div>
        ) : (
          <>
            {/* Dashboard */}
            {tab === "dashboard" && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
                  {[{ label: "Total Products", value: products.length, bg: "#EAF3DE", color: "#3B6D11" },
                    { label: "Total Inquiries", value: inquiries.length, bg: "#FAEEDA", color: "#BA7517" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: s.bg, padding: 24, borderRadius: 12 }}>
                      <div style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>{s.label}</div>
                      <div style={{ fontSize: 36, fontWeight: 700, color: s.color }}>{s.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#fff", padding: 24, borderRadius: 12, border: "1px solid #e5e5e5" }}>
                  <h3 style={{ marginBottom: 16, color: "#173404" }}>Overview</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3B6D11" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Products */}
            {tab === "products" && (
              <div>
                <div style={{ background: "#fff", padding: 24, borderRadius: 12, border: "1px solid #e5e5e5", marginBottom: 24 }}>
                  <h3 style={{ marginBottom: 16, color: "#173404" }}>Add New Product</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 12 }}>
                    <input placeholder="Product name *" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} style={inputStyle} />
                    <input placeholder="Price (e.g. ₹800) *" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} style={inputStyle} />
                    <input placeholder="Unit (e.g. /dozen)" value={newProduct.unit} onChange={e => setNewProduct({ ...newProduct, unit: e.target.value })} style={inputStyle} />
                    <input placeholder="Emoji (e.g. 🥭)" value={newProduct.emoji} onChange={e => setNewProduct({ ...newProduct, emoji: e.target.value })} style={inputStyle} />
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <input placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} style={{ ...inputStyle, flex: 1 }} />
                    <button onClick={addProduct} style={{ background: "#3B6D11", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 8, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>Add Product</button>
                  </div>
                </div>

                {products.length === 0 ? (
                  <div style={{ background: "#fff", padding: 32, borderRadius: 12, border: "1px solid #e5e5e5", textAlign: "center", color: "#888" }}>No products yet. Add one above.</div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                    {products.map(p => (
                      <div key={p.id} style={{ background: "#fff", padding: 20, borderRadius: 12, border: "1px solid #e5e5e5" }}>
                        {editing?.id === p.id ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="Name" style={inputStyle} />
                            <input value={editing.price} onChange={e => setEditing({ ...editing, price: e.target.value })} placeholder="Price" style={inputStyle} />
                            <input value={editing.unit || ""} onChange={e => setEditing({ ...editing, unit: e.target.value })} placeholder="Unit (e.g. /dozen)" style={inputStyle} />
                            <input value={editing.emoji || ""} onChange={e => setEditing({ ...editing, emoji: e.target.value })} placeholder="Emoji" style={inputStyle} />
                            <input value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} placeholder="Description" style={inputStyle} />
                            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                              <button onClick={saveEdit} style={{ flex: 1, background: "#3B6D11", color: "#fff", border: "none", padding: 8, borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Save</button>
                              <button onClick={() => setEditing(null)} style={{ flex: 1, background: "#e5e5e5", color: "#333", border: "none", padding: 8, borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div style={{ fontSize: 24, marginBottom: 6 }}>{p.emoji || "📦"}</div>
                            <div style={{ fontWeight: 700, fontSize: 16, color: "#173404", marginBottom: 4 }}>{p.name}</div>
                            <div style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>{p.description}</div>
                            <div style={{ fontWeight: 700, color: "#3B6D11", marginBottom: 16 }}>{p.price}{p.unit && <span style={{ fontWeight: 400, color: "#888", fontSize: 13 }}> {p.unit}</span>}</div>
                            <div style={{ display: "flex", gap: 8 }}>
                              <button onClick={() => setEditing(p)} style={{ flex: 1, background: "#EAF3DE", color: "#3B6D11", border: "none", padding: 8, borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Edit</button>
                              <button onClick={() => setConfirmDelete(p.id)} style={{ flex: 1, background: "#FCEBEB", color: "#A32D2D", border: "none", padding: 8, borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Delete</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Inquiries */}
            {tab === "inquiries" && (
              <div>
                <h3 style={{ marginBottom: 16, color: "#173404" }}>Customer Inquiries</h3>
                {inquiries.length === 0 ? (
                  <div style={{ background: "#fff", padding: 32, borderRadius: 12, border: "1px solid #e5e5e5", textAlign: "center", color: "#888" }}>No inquiries yet.</div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                    {inquiries.map(inq => (
                      <div key={inq.id} style={{ background: "#fff", padding: 20, borderRadius: 12, border: "1px solid #e5e5e5" }}>
                        <div style={{ fontWeight: 700, fontSize: 16, color: "#173404", marginBottom: 4 }}>{inq.name}</div>
                        <div style={{ fontSize: 14, color: "#3B6D11", marginBottom: 8 }}>{inq.phone}</div>
                        <div style={{ fontSize: 12, color: "#888" }}>{inq.createdAt?.toDate?.()?.toLocaleDateString() || "Recent"}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
