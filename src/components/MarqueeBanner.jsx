export default function MarqueeBanner() {
  const items = [
    "🌿 100% Organic",
    "🥭 Farm Fresh Mangoes",
    "🚫 Zero Chemicals",
    "📦 Direct from Farm",
    "⭐ Export Quality",
    "🌱 Maharashtra Farm",
    "🤝 No Middlemen",
    "🥭 Alphonso & Kesar",
  ];

  return (
    <div style={{ background: "#173404", overflow: "hidden", padding: "8px 0", whiteSpace: "nowrap" }}>
      <div style={{ display: "inline-block", animation: "marquee 20s linear infinite" }}>
        {[...items, ...items].map((text, i) => (
          <span key={i} style={{ color: "#97C459", fontSize: 12, fontWeight: 600, letterSpacing: 1, marginRight: 48 }}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}