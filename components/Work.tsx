import Reveal from "./Reveal";
import SectionMast from "./SectionMast";
import Phone from "./Phone";

const flagshipMetrics: Array<[string, string]> = [
  ["25,700+", "downloads"],
  ["500", "hymns"],
  ["3", "iOS · Android · Web"],
  ["2", "Kinyarwanda · English"],
];

const flagshipTags = ["Mobile App", "Web App", "Next.js", "React Native"];

const glwBooks: Array<{ h: number; c: string; l: string }> = [
  { h: 130, c: "#B07A4A", l: "RW" },
  { h: 160, c: "#8E6238", l: "EN" },
  { h: 120, c: "#C28A4A", l: "FR" },
  { h: 150, c: "#9C6B3D", l: "SW" },
];

const glwTags = ["Mobile App", "Multilingual", "In Development"];

export default function Work() {
  return (
    <section id="work" className="mobile-pad" style={{ padding: "100px 48px", maxWidth: 1280, margin: "0 auto" }}>
      <SectionMast num="I" label="Selected Work" title="Things made, slowly, and on purpose." />

      {/* Flagship spread */}
      <Reveal
        className="stack-on-mobile"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 48,
          borderTop: "1px solid var(--color-line)",
          paddingTop: 36,
        }}
      >
        <div>
          <div
            className="folio-row"
            style={{ display: "flex", gap: 14, alignItems: "baseline", marginBottom: 18 }}
          >
            <span
              className="serif folio-label"
              style={{ fontSize: 42, fontStyle: "italic", color: "var(--color-rust)", fontWeight: 500 }}
            >
              Folio 1
            </span>
            <span className="mono">The flagship · Live · 25,700+ downloads</span>
          </div>
          <h3
            className="serif"
            style={{
              margin: 0,
              fontSize: "clamp(40px,4.6vw,64px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            SDA Kinyarwanda
            <br />
            <span className="italic-accent">Hymnal.</span>
          </h3>
          <div className="rule" style={{ margin: "28px 0" }} />
          <div
            className="stack-on-mobile"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
          >
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: "var(--color-ink)" }}>
              <span
                className="serif"
                style={{
                  float: "left",
                  fontSize: 56,
                  lineHeight: 0.85,
                  paddingRight: 8,
                  paddingTop: 4,
                  fontWeight: 600,
                }}
              >
                T
              </span>
              he complete digital hymn book for the Seventh-day Adventist church —{" "}
              <em style={{ color: "var(--color-rust)" }}>500 hymns in Kinyarwanda and English</em>, with melodies,
              search by number, and a continue-where-you-left-off card on the home screen.
            </p>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--color-ink-soft)" }}>
              Shipped to iOS, Android, and the web — written in Next.js and React Native, with shared content pipelines
              so the same hymn database flows to every surface. Used in homes, on Sabbath mornings, in cars on the long
              drive home.
            </p>
          </div>
          <div
            className="metrics-grid"
            style={{
              marginTop: 32,
              display: "grid",
              gap: 0,
              borderTop: "1px solid var(--color-line)",
              borderBottom: "1px solid var(--color-line)",
              overflow: "hidden",
            }}
          >
            {flagshipMetrics.map(([v, l], i) => (
              <div
                key={i}
                style={{
                  padding: "18px 16px",
                  borderRight: i < 3 ? "1px solid var(--color-line)" : "none",
                }}
              >
                <div
                  className="serif"
                  style={{
                    fontSize: 36,
                    letterSpacing: "-0.02em",
                    fontWeight: 500,
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {v}
                </div>
                <div className="mono" style={{ marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
            {flagshipTags.map((t) => (
              <span
                key={t}
                style={{
                  padding: "6px 12px",
                  border: "1px solid var(--color-ink)",
                  borderRadius: 0,
                  fontSize: 12,
                  letterSpacing: ".01em",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href="https://sda-kinyarwanda-hymnal.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="serif"
            style={{
              marginTop: 28,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 22,
              fontStyle: "italic",
              color: "var(--color-rust)",
              textDecoration: "none",
              borderBottom: "1px solid #C45A2F55",
              paddingBottom: 4,
            }}
          >
            Read the colophon →
          </a>
        </div>

        {/* Phone composition */}
        <div
          style={{
            position: "relative",
            minHeight: 520,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, var(--color-paper) 0%, var(--color-bg) 100%)",
              border: "1px solid var(--color-line)",
              borderRadius: 2,
            }}
          />
          <div className="mono" style={{ position: "absolute", top: 24, left: 24 }}>
            Plate № I · The Hymnal
          </div>
          <div className="mono" style={{ position: "absolute", bottom: 24, right: 24 }}>
            Fig. 1.1 — Home screen
          </div>
          <div style={{ position: "relative", width: 320, height: 420, overflow: "hidden" }}>
            <Phone tilt={-7} z={1} style={{ position: "absolute", left: 0, top: 10 }} />
            <Phone tilt={6} z={2} style={{ position: "absolute", left: 150, top: 0 }} />
          </div>
        </div>
      </Reveal>

      {/* Secondary entry: GLW Ministry */}
      <Reveal
        className="stack-on-mobile"
        style={{
          marginTop: 80,
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 48,
          borderTop: "1px solid var(--color-line)",
          paddingTop: 36,
          alignItems: "start",
        }}
      >
        <div
          style={{
            background: "#D4A37322",
            border: "1px solid #D4A37388",
            borderRadius: 2,
            padding: 36,
            minHeight: 340,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            {glwBooks.map((b, i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: b.h,
                  background: b.c,
                  color: "#fff",
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  writingMode: "vertical-rl",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: 8,
                  boxShadow: "inset -3px 0 0 rgba(0,0,0,.12), 0 8px 16px -8px rgba(28,28,28,.3)",
                }}
              >
                {b.l}
              </div>
            ))}
          </div>
          <span className="mono" style={{ position: "absolute", top: 18, left: 18, color: "#8E6238" }}>
            Plate № II · In press
          </span>
          <span
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              padding: "5px 10px",
              background: "#8E6238",
              color: "#fff",
              fontSize: 10,
              letterSpacing: ".1em",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
            }}
          >
            Forthcoming
          </span>
        </div>
        <div>
          <div
            className="folio-row"
            style={{ display: "flex", gap: 14, alignItems: "baseline", marginBottom: 18 }}
          >
            <span
              className="serif folio-label"
              style={{ fontSize: 36, fontStyle: "italic", color: "#8E6238", fontWeight: 500 }}
            >
              Folio 2
            </span>
            <span className="mono">In development · Multilingual library</span>
          </div>
          <h3
            className="serif"
            style={{
              margin: 0,
              fontSize: "clamp(36px,4vw,56px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            GLW Ministry —
            <br />
            <span style={{ fontStyle: "italic", color: "#8E6238" }}>a multilingual library.</span>
          </h3>
          <p style={{ marginTop: 24, fontSize: 16.5, lineHeight: 1.7, color: "var(--color-ink-soft)", maxWidth: 520 }}>
            A mobile app bringing translated Christian books to readers in four to five local languages. Making truth
            accessible to every tongue — beginning with Kinyarwanda, English, French, and Swahili.
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
            {glwTags.map((t) => (
              <span
                key={t}
                style={{ padding: "6px 12px", border: "1px solid var(--color-ink)", borderRadius: 0, fontSize: 12 }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal
        style={{
          marginTop: 60,
          padding: 32,
          border: "1.5px dashed var(--color-muted)",
          textAlign: "center",
        }}
      >
        <span className="serif" style={{ fontSize: 24, fontStyle: "italic", color: "var(--color-muted)" }}>
          The next page is unwritten.
        </span>
        <div className="mono" style={{ marginTop: 8 }}>More folios in due season</div>
      </Reveal>
    </section>
  );
}
