export default function Footer() {
  return (
    <footer style={{ padding: "40px 48px", borderTop: "2px solid var(--color-ink)" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span className="mono">© MMXXVI · Blaise Sebagabo</span>
        <span className="serif" style={{ fontSize: 18, color: "var(--color-ink)", fontStyle: "italic" }}>
          Soli Deo Gloria.
        </span>
        <span className="mono">Set in Cormorant &amp; Inter Tight · Printed on the web</span>
      </div>
    </footer>
  );
}
