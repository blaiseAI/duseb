import type { CSSProperties } from "react";

type Props = { tilt?: number; z?: number; style?: CSSProperties };

const tabBar: Array<[string, 0 | 1]> = [["№", 0], ["Hymns", 1], ["♥", 0], ["⋯", 0]];
const hymns: Array<[string, string]> = [
  ["1", "Murinzi We"],
  ["2", "Umwam' Ageze"],
  ["3", "Ndashima Yesu"],
  ["4", "Reka Mvuge"],
];

export default function Phone({ tilt = 0, z = 1, style = {} }: Props) {
  return (
    <div
      style={{
        width: 200,
        height: 400,
        background: "var(--color-paper)",
        borderRadius: 30,
        border: "6px solid var(--color-ink)",
        boxShadow: "0 26px 50px -20px rgba(28,28,28,.35)",
        padding: "18px 12px 4px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        transform: `rotate(${tilt}deg)`,
        zIndex: z,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 6,
          left: "50%",
          transform: "translateX(-50%)",
          width: 54,
          height: 14,
          borderRadius: 9,
          background: "var(--color-ink)",
        }}
      />
      <div className="mono" style={{ marginTop: 14, color: "var(--color-rust)", fontSize: 8.5 }}>
        The Hymnal · 500
      </div>
      <div
        className="serif"
        style={{
          lineHeight: 0.95,
          fontWeight: 500,
          letterSpacing: "-0.02em",
          fontSize: 26,
          color: "var(--color-ink)",
          marginTop: 4,
        }}
      >
        Indirimbo
        <br />
        <span style={{ fontStyle: "italic", color: "var(--color-rust)" }}>z&apos;agakiza.</span>
      </div>
      <div
        style={{
          marginTop: 10,
          background: "#fff",
          borderRadius: 8,
          padding: "7px 9px",
          fontSize: 9.5,
          color: "var(--color-muted)",
          boxShadow: "0 1px 0 rgba(0,0,0,.04)",
        }}
      >
        ⌕ Search hymns
      </div>
      <div
        style={{
          marginTop: 8,
          background: "var(--color-ink)",
          color: "var(--color-paper)",
          borderRadius: 10,
          padding: "8px 10px",
          position: "relative",
        }}
      >
        <div className="mono" style={{ color: "#C9BEAE", fontSize: 7 }}>
          CONTINUE · 1/3
        </div>
        <div className="serif" style={{ fontSize: 14, lineHeight: 1.05, marginTop: 2 }}>
          Har&apos; Izina
          <br />
          <span style={{ fontStyle: "italic", color: "#E6D9C6" }}>Rihebuje</span>
        </div>
        <div
          className="serif"
          style={{ position: "absolute", top: 8, right: 10, fontSize: 20, color: "#E6D9C6", fontStyle: "italic" }}
        >
          123
        </div>
      </div>
      <div style={{ marginTop: 8, fontSize: 9 }}>
        {hymns.map(([n, t]) => (
          <div
            key={n}
            style={{
              display: "grid",
              gridTemplateColumns: "18px 1fr",
              gap: 6,
              padding: "6px 0",
              borderBottom: "1px solid var(--color-line)",
            }}
          >
            <span className="serif" style={{ fontSize: 13, fontStyle: "italic", color: "var(--color-rust)" }}>
              {n}
            </span>
            <span style={{ fontWeight: 600, fontSize: 9.5, letterSpacing: "-0.01em", color: "var(--color-ink)" }}>
              {t}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          padding: "6px 0",
          borderTop: "1px solid var(--color-line)",
        }}
      >
        {tabBar.map(([l, on], i) => (
          <div
            key={i}
            className="mono"
            style={{
              textAlign: "center",
              fontSize: 6.5,
              color: on ? "var(--color-rust)" : "var(--color-muted)",
            }}
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
