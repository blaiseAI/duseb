import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="top" className="mobile-pad" style={{ padding: "140px 48px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60 }}>
        <span className="mono">Vol. I · A Chronicle of Work · Alberta, Canada</span>
        <span className="mono">Established 2019</span>
      </Reveal>
      <Reveal className="rule-thick" style={{ marginBottom: 36 }} />

      <Reveal
        className="stack-on-mobile"
        style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 48, alignItems: "end" }}
      >
        <h1
          className="serif"
          style={{
            margin: 0,
            fontWeight: 500,
            fontSize: "clamp(64px,8.5vw,148px)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "var(--color-ink)",
          }}
        >
          A quiet
          <br />
          <span className="italic-accent">chronicle</span>
          <br />
          of work made
          <br />
          for the <span className="italic-accent">Kingdom</span>.
        </h1>
        <div style={{ paddingBottom: 8 }}>
          <span className="mono">The author</span>
          <div className="serif" style={{ fontSize: 24, fontWeight: 500, marginTop: 4, letterSpacing: "-0.01em" }}>
            Blaise Sebagabo
          </div>
          <div style={{ fontSize: 14, color: "var(--color-ink-soft)", marginTop: 2 }}>
            Developer · Designer · Consultant
          </div>
        </div>
      </Reveal>

      <Reveal
        className="stack-on-mobile"
        style={{
          marginTop: 80,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 48,
          borderTop: "1px solid var(--color-line)",
          paddingTop: 32,
        }}
      >
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>Prologue</div>
          <p className="serif" style={{ margin: 0, fontSize: 22, lineHeight: 1.4, letterSpacing: "-0.01em" }}>
            <span
              style={{
                float: "left",
                fontSize: 74,
                lineHeight: 0.85,
                paddingRight: 10,
                paddingTop: 6,
                fontWeight: 600,
                color: "var(--color-ink)",
              }}
            >
              I
            </span>
            began making websites for a small church plant in college because the quote they were given was more than
            their plate offering. Seven years later, the work has not stopped — but the purpose has clarified.
          </p>
        </div>
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>The practice</div>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "var(--color-ink-soft)" }}>
            Websites, mobile apps, and quiet consulting work for churches, parachurch ministries, and faith-based
            nonprofits — across Alberta and beyond.{" "}
            <em style={{ color: "var(--color-rust)" }}>
              Free when I can, at cost when I should, honestly when the scope is real.
            </em>
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href="#work"
              style={{
                padding: "12px 22px",
                border: "1.5px solid var(--color-ink)",
                borderRadius: 0,
                textDecoration: "none",
                color: "var(--color-ink)",
                fontSize: 13,
                letterSpacing: ".02em",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              Read the chronicle <span style={{ fontFamily: "serif", fontStyle: "italic" }}>→</span>
            </a>
            <a
              href="#contact"
              style={{
                padding: "12px 22px",
                background: "var(--color-ink)",
                color: "var(--color-bg)",
                borderRadius: 0,
                textDecoration: "none",
                fontSize: 13,
                letterSpacing: ".02em",
              }}
            >
              Send a letter
            </a>
          </div>
        </div>
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>Marginalia</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", fontSize: 14, lineHeight: 1.7, color: "var(--color-ink)" }}>
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px dotted var(--color-muted)",
                padding: "6px 0",
              }}
            >
              <span className="serif" style={{ fontStyle: "italic" }}>Location</span>
              <span>Alberta, CA</span>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px dotted var(--color-muted)",
                padding: "6px 0",
              }}
            >
              <span className="serif" style={{ fontStyle: "italic" }}>Practice</span>
              <span>Web · Mobile · UI</span>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px dotted var(--color-muted)",
                padding: "6px 0",
              }}
            >
              <span className="serif" style={{ fontStyle: "italic" }}>Patrons</span>
              <span>Churches · Ministries</span>
            </li>
            <li style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
              <span className="serif" style={{ fontStyle: "italic" }}>Status</span>
              <span style={{ color: "var(--color-rust)" }}>● Open this season</span>
            </li>
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
