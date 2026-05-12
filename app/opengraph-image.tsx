import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Blaise Sebagabo — Developer for Churches & Ministries";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F4EFE6",
          color: "#1B1916",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontFamily: "ui-monospace, monospace",
            fontSize: 18,
            letterSpacing: "0.18em",
            color: "#1B19169C",
            textTransform: "uppercase",
          }}
        >
          <span>Vol. I · A Chronicle of Work</span>
          <span>MMXXVI</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              display: "flex",
              flexWrap: "wrap",
              gap: 18,
            }}
          >
            <span>Blaise</span>
            <span style={{ fontStyle: "italic", color: "#C45A2F" }}>Sebagabo</span>
          </div>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.3,
              maxWidth: 900,
              color: "#5D5953",
            }}
          >
            Developer & designer for churches, ministries, and faith-based nonprofits — Alberta, Canada.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #1B1916",
            paddingTop: 24,
            fontFamily: "ui-monospace, monospace",
            fontSize: 16,
            letterSpacing: "0.18em",
            color: "#1B19169C",
            textTransform: "uppercase",
          }}
        >
          <span>duseb.pro</span>
          <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 22, textTransform: "none", color: "#1B1916" }}>
            Soli Deo Gloria.
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
