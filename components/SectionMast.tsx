import Reveal from "./Reveal";

type Props = { num: string; label: string; title: string };

export default function SectionMast({ num, label, title }: Props) {
  return (
    <Reveal style={{ marginBottom: 48 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          borderBottom: "2px solid var(--color-ink)",
          paddingBottom: 10,
        }}
      >
        <div style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
          <span
            className="serif"
            style={{ fontSize: 36, fontStyle: "italic", color: "var(--color-rust)", fontWeight: 500, lineHeight: 1 }}
          >
            § {num}
          </span>
          <span className="mono">{label}</span>
        </div>
        <span className="mono">A Chronicle · {label}</span>
      </div>
      <h2
        className="serif"
        style={{
          margin: "28px 0 0",
          fontSize: "clamp(44px,5.2vw,72px)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          lineHeight: 1.02,
        }}
      >
        {title}
      </h2>
    </Reveal>
  );
}
