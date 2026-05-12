"use client";

import { useEffect, useState } from "react";

const links: Array<[string, string, string]> = [
  ["i", "Work", "work"],
  ["ii", "About", "about"],
  ["iii", "Contact", "contact"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
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
            gap: 16,
          }}
        >
          <a href="#top" style={{ textDecoration: "none", display: "flex", gap: 14, alignItems: "baseline", minWidth: 0 }}>
            <span
              className="serif"
              style={{ fontSize: 22, fontStyle: "italic", fontWeight: 500, color: "var(--color-ink)" }}
            >
              Sebagabo
            </span>
            <span className="mono nav-mono" style={{ whiteSpace: "nowrap" }}>
              № 01 · MMXXVI
            </span>
          </a>

          <div className="nav-desktop-links" style={{ display: "flex", gap: 32 }}>
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

          <button
            type="button"
            className="nav-mobile-toggle mono"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            style={{
              display: "none",
              background: "transparent",
              border: "none",
              padding: "6px 0",
              cursor: "pointer",
              color: "var(--color-ink)",
              letterSpacing: ".18em",
            }}
          >
            Menu
          </button>
        </div>
      </nav>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="nav-overlay"
        data-open={open}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "var(--color-bg)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .35s cubic-bezier(.2,.7,.3,1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--color-line)",
            gap: 16,
          }}
        >
          <span style={{ display: "flex", gap: 14, alignItems: "baseline", minWidth: 0 }}>
            <span
              className="serif"
              style={{ fontSize: 22, fontStyle: "italic", fontWeight: 500, color: "var(--color-ink)" }}
            >
              Sebagabo
            </span>
            <span className="mono" style={{ whiteSpace: "nowrap" }}>
              № 01 · MMXXVI
            </span>
          </span>
          <button
            type="button"
            className="mono"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{
              background: "transparent",
              border: "none",
              padding: "6px 0",
              cursor: "pointer",
              color: "var(--color-ink)",
              letterSpacing: ".18em",
            }}
          >
            Close
          </button>
        </div>

        <nav
          aria-label="Primary"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "40px 32px",
            gap: 28,
          }}
        >
          {links.map(([n, l, h], i) => (
            <a
              key={h}
              href={"#" + h}
              onClick={() => setOpen(false)}
              className="serif"
              style={{
                textDecoration: "none",
                color: "var(--color-ink)",
                fontSize: "clamp(48px, 14vw, 96px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                fontWeight: 500,
                display: "flex",
                alignItems: "baseline",
                gap: 18,
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(12px)",
                transition: `opacity .5s cubic-bezier(.2,.7,.3,1) ${0.12 + i * 0.08}s, transform .5s cubic-bezier(.2,.7,.3,1) ${0.12 + i * 0.08}s`,
              }}
            >
              <span
                style={{
                  fontStyle: "italic",
                  color: "var(--color-rust)",
                  fontSize: "clamp(20px, 5vw, 32px)",
                  fontWeight: 500,
                }}
              >
                {n}.
              </span>
              <span style={{ fontStyle: "italic" }}>{l}</span>
            </a>
          ))}
        </nav>

        <div
          style={{
            padding: "24px 32px",
            borderTop: "1px solid var(--color-line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span className="mono">Alberta, Canada</span>
          <span className="serif" style={{ fontSize: 15, fontStyle: "italic", color: "var(--color-ink)" }}>
            Soli Deo Gloria.
          </span>
        </div>
      </div>
    </>
  );
}
