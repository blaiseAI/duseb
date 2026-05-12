"use client";

import { useState, type CSSProperties } from "react";
import Reveal from "./Reveal";
import SectionMast from "./SectionMast";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

export default function Contact() {
  const [f, setF] = useState<Fields>({ name: "", email: "", message: "" });
  const [err, setErr] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const er: Errors = {};
    if (!f.name.trim()) er.name = "Please share your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) er.email = "Email looks off.";
    if (f.message.trim().length < 10) er.message = "A few more lines, please.";
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    // Intentionally not wired to a backend. Locked by spec.
    setTimeout(() => {
      setBusy(false);
      setSent(true);
    }, 800);
  };

  const fieldStyle = (hasError: boolean, multiline: boolean): CSSProperties => ({
    width: "100%",
    padding: "12px 0",
    background: "transparent",
    border: "none",
    borderBottom: `1.5px solid ${hasError ? "var(--color-rust)" : "var(--color-ink)"}`,
    fontSize: 18,
    fontFamily: "var(--font-serif)",
    fontStyle: "italic",
    color: "var(--color-ink)",
    outline: "none",
    resize: multiline ? "vertical" : "none",
  });

  const field = (k: keyof Fields, label: string, type: string = "text", multiline = false) => {
    const has = err[k];
    return (
      <label style={{ display: "block" }}>
        <div className="mono" style={{ marginBottom: 4 }}>{label}</div>
        {multiline ? (
          <textarea
            value={f[k]}
            onChange={(e) => setF({ ...f, [k]: e.target.value })}
            style={fieldStyle(!!has, true)}
            rows={4}
          />
        ) : (
          <input
            type={type}
            value={f[k]}
            onChange={(e) => setF({ ...f, [k]: e.target.value })}
            style={fieldStyle(!!has, false)}
          />
        )}
        {has && (
          <div style={{ fontSize: 11, color: "var(--color-rust)", marginTop: 4, fontFamily: "var(--font-mono)" }}>
            {has}
          </div>
        )}
      </label>
    );
  };

  return (
    <section id="contact" style={{ padding: "100px 48px", maxWidth: 1280, margin: "0 auto" }}>
      <SectionMast num="III" label="Correspondence" title="Let us begin a correspondence." />
      <Reveal
        className="stack-on-mobile"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          borderTop: "1px solid var(--color-line)",
          paddingTop: 36,
        }}
      >
        <div>
          <p className="serif" style={{ margin: 0, fontSize: 22, lineHeight: 1.45, letterSpacing: "-0.01em", fontWeight: 500, maxWidth: 460 }}>
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
              W
            </span>
            hether your church needs a website, your ministry needs an app, or you simply have an idea worth thinking
            through — <em style={{ color: "var(--color-rust)" }}>I would love to hear from you</em>.
          </p>
          <div style={{ marginTop: 36, fontSize: 14, lineHeight: 1.9, color: "var(--color-ink)", maxWidth: 420 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px dotted var(--color-muted)",
                padding: "6px 0",
              }}
            >
              <span className="serif" style={{ fontStyle: "italic" }}>By post</span>
              <span>Alberta, Canada</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px dotted var(--color-muted)",
                padding: "6px 0",
              }}
            >
              <span className="serif" style={{ fontStyle: "italic" }}>By electronic</span>
              <a href="mailto:hello@sebagabo.dev" style={{ color: "var(--color-rust)", textDecoration: "none" }}>
                hello@sebagabo.dev
              </a>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
              <span className="serif" style={{ fontStyle: "italic" }}>Hours kept</span>
              <span>Mon–Fri · weekends for ministries</span>
            </div>
          </div>
        </div>
        <div style={{ background: "var(--color-paper)", padding: 32, border: "1px solid var(--color-line)" }}>
          {sent ? (
            <div style={{ minHeight: 340, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span
                className="serif"
                style={{ fontSize: 44, lineHeight: 1, color: "var(--color-rust)", fontStyle: "italic" }}
              >
                Received.
              </span>
              <p style={{ marginTop: 20, fontSize: 16, lineHeight: 1.6, color: "var(--color-ink-soft)", maxWidth: 340 }}>
                Thank you for writing. I&apos;ll reply within a couple of days — usually sooner. Grace and peace.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setF({ name: "", email: "", message: "" });
                }}
                className="mono"
                style={{
                  marginTop: 20,
                  background: "transparent",
                  border: "none",
                  color: "var(--color-rust)",
                  cursor: "pointer",
                  padding: 0,
                  textAlign: "left",
                }}
              >
                Compose another →
              </button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "grid", gap: 20 }}>
              <div className="mono" style={{ textAlign: "right", letterSpacing: ".18em" }}>
                Letter № 01
              </div>
              {field("name", "Your name")}
              {field("email", "Where to reply", "email")}
              {field("message", "Your message", "text", true)}
              <button
                type="submit"
                disabled={busy}
                style={{
                  marginTop: 8,
                  padding: "14px 24px",
                  background: "var(--color-ink)",
                  color: "var(--color-bg)",
                  border: "none",
                  borderRadius: 0,
                  fontSize: 13,
                  letterSpacing: ".06em",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  cursor: busy ? "default" : "pointer",
                  opacity: busy ? 0.7 : 1,
                }}
              >
                {busy ? "Sealing…" : "Send the letter →"}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
