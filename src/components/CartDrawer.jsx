import { useCart } from "../CartContext";

export default function CartDrawer() {
  const { cartItems, cartOpen, setCartOpen, updateQty, removeFromCart, totalPrice, totalItems } = useCart();
  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER;

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;
    const itemsList = cartItems.map(item => `${item.qty} x ${item.name} (${item.price}${item.unit})`).join("\n");
    const message = `Hi! I want to order the following from From Farm:\n\n${itemsList}\n\nTotal: ₹${totalPrice}`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      {/* Overlay */}
      {cartOpen && (
        <div onClick={() => setCartOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 300 }} />
      )}

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: cartOpen ? 0 : -420, width: 400,
        height: "100vh", background: "#fff", zIndex: 400,
        transition: "right 0.35s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
        boxShadow: "-4px 0 24px rgba(0,0,0,0.15)"
      }}>

        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e5e5", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#173404" }}>Your Cart</div>
            <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{totalItems} item{totalItems !== 1 ? "s" : ""}</div>
          </div>
          <button onClick={() => setCartOpen(false)} style={{ background: "#f4f4f4", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#173404", marginBottom: 8 }}>Your cart is empty</div>
              <div style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>Add some fresh fruits from our farm!</div>
              <button onClick={() => setCartOpen(false)} style={{ background: "#3B6D11", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 25, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                Shop Now
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: "flex", gap: 14, alignItems: "center", background: "#f9fafb", borderRadius: 14, padding: 14, border: "1px solid #e5e5e5" }}>
                  {/* Product Emoji/Image */}
                  <div style={{ width: 64, height: 64, background: item.bg || "#EAF3DE", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0 }}>
                    {item.emoji || "🥭"}
                  </div>

                  {/* Product Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#173404", marginBottom: 2 }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: "#3B6D11", fontWeight: 700, marginBottom: 8 }}>
                      {item.price}{item.unit}
                    </div>
                    {/* Quantity Controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid #e5e5e5", background: "#fff", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>−</button>
                      <span style={{ fontSize: 14, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid #e5e5e5", background: "#fff", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>+</button>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button onClick={() => removeFromCart(item.id)} style={{ background: "#FCEBEB", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>🗑️</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: "1px solid #e5e5e5" }}>
            {/* Total */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#173404" }}>Estimated Total</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#3B6D11" }}>₹{totalPrice}</div>
            </div>

            {/* WhatsApp Order Button */}
            <button onClick={handleWhatsAppOrder} style={{ width: "100%", background: "#25D366", color: "#fff", border: "none", padding: "16px", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              💬 Order on WhatsApp
            </button>
            <div style={{ fontSize: 12, color: "#888", textAlign: "center", marginTop: 10 }}>
              We'll confirm your order via WhatsApp
            </div>
          </div>
        )}
      </div>
    </>
  );
}