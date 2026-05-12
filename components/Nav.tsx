const links: Array<[string, string, string]> = [
  ["i", "Work", "work"],
  ["ii", "About", "about"],
  ["iii", "Contact", "contact"],
];

export default function Nav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "#F4EFE6dd",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <div
        className="mobile-pad"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "18px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a href="#top" style={{ textDecoration: "none", display: "flex", gap: 14, alignItems: "baseline" }}>
          <span className="serif" style={{ fontSize: 22, fontStyle: "italic", fontWeight: 500, color: "var(--color-ink)" }}>
            Sebagabo
          </span>
          <span className="mono">№ 01 · MMXXVI</span>
        </a>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {links.map(([n, l, h]) => (
            <a
              key={h}
              href={"#" + h}
              style={{
                textDecoration: "none",
                color: "var(--color-ink)",
                fontSize: 14,
                display: "flex",
                gap: 8,
                alignItems: "baseline",
              }}
            >
              <span className="serif" style={{ fontSize: 14, fontStyle: "italic", color: "var(--color-rust)" }}>
                {n}.
              </span>
              <span style={{ fontWeight: 400 }}>{l}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
