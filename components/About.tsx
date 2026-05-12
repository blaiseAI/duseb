import Reveal from "./Reveal";
import SectionMast from "./SectionMast";

const practice: Array<[string, string]> = [
  ["Web", "Next.js · React"],
  ["Mobile", "React Native"],
  ["Design", "UI/UX · Brand"],
  ["Counsel", "Consulting"],
  ["Tongues", "TypeScript · EN/RW"],
];

export default function About() {
  return (
    <section
      id="about"
      className="mobile-pad"
      style={{
        background: "var(--color-paper)",
        padding: "100px 48px",
        borderTop: "2px solid var(--color-ink)",
        borderBottom: "2px solid var(--color-ink)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionMast num="II" label="About the Author" title="A craft, shaped by calling." />
        <Reveal
          className="stack-on-mobile"
          style={{ display: "grid", gridTemplateColumns: "260px 1fr 280px", gap: 60, marginTop: 36 }}
        >
          <div>
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: "var(--color-rust)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-serif)",
                fontSize: 96,
                fontWeight: 500,
                letterSpacing: "-0.04em",
                boxShadow: "0 24px 48px -28px rgba(196,90,47,.5)",
              }}
            >
              BS
            </div>
            <div className="mono" style={{ marginTop: 18 }}>Portrait · plate № III</div>
            <div
              className="serif"
              style={{ fontSize: 18, marginTop: 6, color: "var(--color-ink)", fontStyle: "italic" }}
            >
              Blaise Sebagabo
            </div>
            <div style={{ fontSize: 13, color: "var(--color-ink-soft)" }}>
              Developer · Designer · Consultant · Alberta, Canada
            </div>
          </div>
          <div style={{ columns: 2, columnGap: 36, columnRule: "1px solid var(--color-line)" }}>
            <p
              className="serif"
              style={{
                margin: "0 0 16px",
                fontSize: 22,
                lineHeight: 1.45,
                letterSpacing: "-0.01em",
                fontWeight: 500,
                breakInside: "avoid",
              }}
            >
              <span
                style={{
                  float: "left",
                  fontSize: 72,
                  lineHeight: 0.85,
                  paddingRight: 10,
                  paddingTop: 6,
                  fontWeight: 600,
                  color: "var(--color-rust)",
                }}
              >
                I
              </span>
              &apos;m a developer and designer who believes technology is a gift meant to be shared.
            </p>
            <p style={{ margin: "0 0 14px", fontSize: 15, lineHeight: 1.75, color: "var(--color-ink-soft)" }}>
              Based in Alberta, Canada, I build websites, mobile apps, and digital tools for churches, ministries, and
              nonprofits. My work spans the full stack — from UI/UX design and consulting to shipping production apps
              on both app stores.
            </p>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: "var(--color-ink-soft)" }}>
              I do this because I believe every ministry doing God&apos;s work deserves tools that match their mission.
              Whether it&apos;s a hymnal app used by thousands or a quiet consulting call to help a church plan their
              digital presence — <em style={{ color: "var(--color-rust)" }}>it&apos;s all Kingdom work</em>.
            </p>
          </div>
          <aside style={{ borderLeft: "1px solid var(--color-line)", paddingLeft: 24 }}>
            <div className="mono" style={{ marginBottom: 12 }}>The practice</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, fontSize: 13.5, lineHeight: 1.9, color: "var(--color-ink)" }}>
              {practice.map(([k, v], i) => (
                <li
                  key={k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: i < practice.length - 1 ? "1px dotted var(--color-muted)" : "none",
                  }}
                >
                  <span className="serif" style={{ fontStyle: "italic" }}>{k}</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
            <blockquote
              className="serif"
              style={{
                margin: "32px 0 0",
                padding: "16px 0 0 18px",
                borderLeft: "3px solid var(--color-rust)",
                fontSize: 18,
                lineHeight: 1.4,
                color: "var(--color-ink)",
                fontStyle: "italic",
              }}
            >
              &quot;Each of you should use whatever gift you have received to serve others, as faithful stewards of
              God&apos;s grace in its various forms.&quot;
              <footer
                style={{
                  marginTop: 10,
                  fontSize: 11,
                  fontStyle: "normal",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: ".1em",
                  color: "var(--color-muted)",
                }}
              >
                — I PETER IV : X
              </footer>
            </blockquote>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
