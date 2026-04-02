import { useState } from "react";
import Layout from "../Layout";
import { Field, labelStyle, inputStyle } from "../GinjasPage.jsx";
import { supabase } from "../lib/supabase.js";

const C = { teal: "#3FA796", burgundy: "#8B1E3F", dark: "#1F1F1F", subtle: "#666", divider: "#EAEAEA", heroBg: "#F9F4E8" };
const F = { sora: "'Sora', sans-serif", inter: "'Inter', sans-serif", dm: "'DM Sans', sans-serif" };

const channels = [
  { emoji: "📧", label: "E-mail", value: "oi@ginjas.org" },
  { emoji: "🐦", label: "Twitter", value: "@ginjasorg" },
  { emoji: "💼", label: "LinkedIn", value: "linkedin.com/company/ginjas" },
];

export default function ContatoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function setField(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: err } = await supabase.from("contato_submissions").insert([{
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    }]);
    setLoading(false);
    if (err) { console.error("[contato_submissions] submit failed:", err); setError("Erro ao enviar. Tente novamente."); return; }
    setSubmitted(true);
  }

  return (
    <Layout>
      {/* Hero */}
      <section style={{ background: C.heroBg, padding: "var(--section-padding)", textAlign: "center" }}>
        <h1 style={{ fontFamily: F.sora, fontSize: "clamp(32px, 8vw, 44px)", fontWeight: 800, color: C.dark, marginBottom: 20 }}>
          Fale Conosco
        </h1>
        <p style={{ fontFamily: F.dm, fontSize: 19, color: "#5A5A5A", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
          Tem uma dúvida, sugestão ou quer saber mais sobre o Ginjas? Estamos aqui.
        </p>
      </section>

      <section className="mobile-stack" style={{ background: "#F9F4E8", padding: "var(--section-padding)", display: "flex", gap: 64, alignItems: "flex-start", justifyContent: "center" }}>
        {/* Contact channels */}
        <div className="mobile-full-width" style={{ display: "flex", flexDirection: "column", gap: 24, width: 260, flexShrink: 0 }}>
          <h2 style={{ fontFamily: F.sora, fontSize: 22, fontWeight: 700, color: C.dark }}>Canais diretos</h2>
          {channels.map((ch) => (
            <div key={ch.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ fontSize: 24 }} aria-hidden="true">{ch.emoji}</div>
              <div>
                <p style={{ fontFamily: F.inter, fontSize: 12, fontWeight: 600, color: C.teal, marginBottom: 2 }}>{ch.label}</p>
                <p style={{ fontFamily: F.inter, fontSize: 14, color: C.dark }}>{ch.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="mobile-full-width"
            style={{
              background: "#FFFFFF", borderRadius: 16, padding: "clamp(20px, 5vw, 40px)",
              display: "flex", flexDirection: "column", gap: 24, width: "100%", maxWidth: 560,
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: `1px solid ${C.divider}`,
            }}
          >
            <div className="mobile-stack" style={{ display: "flex", gap: 16 }}>
              <Field label="Nome" placeholder="Seu nome" value={form.name} onChange={setField("name")} />
              <Field label="E-mail" placeholder="seu@email.com" type="email" value={form.email} onChange={setField("email")} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="subject-select" style={labelStyle}>Assunto</label>
              <select id="subject-select" style={inputStyle} value={form.subject} onChange={setField("subject")}>
                <option value="">Selecione um assunto</option>
                <option>Quero ser voluntário</option>
                <option>Sou uma organização</option>
                <option>Parceria</option>
                <option>Imprensa</option>
                <option>Outro</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="message-textarea" style={labelStyle}>Mensagem</label>
              <textarea
                id="message-textarea"
                rows={5}
                placeholder="Escreva sua mensagem..."
                style={{ ...inputStyle, resize: "none", fontFamily: F.inter }}
                value={form.message}
                onChange={setField("message")}
              />
            </div>
            {error && (
              <p role="alert" style={{ fontFamily: F.inter, fontSize: 13, color: "#c0392b" }}>{error}</p>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: C.burgundy, color: "#FFFFFF",
                  fontFamily: F.inter, fontSize: 15, fontWeight: 600,
                  padding: "13px 40px", borderRadius: 999, border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  width: "100%", maxWidth: "fit-content",
                }}
              >
                {loading ? "A enviar…" : "Enviar Mensagem"}
              </button>
            </div>
          </form>
        ) : (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 16, width: "100%", maxWidth: 560, padding: "64px 40px", textAlign: "center",
            background: "rgba(63,167,150,0.06)", borderRadius: 16, border: `1px solid rgba(63,167,150,0.2)`,
          }}>
            <div style={{ fontSize: 48 }} aria-hidden="true">✅</div>
            <h3 style={{ fontFamily: F.sora, fontSize: 22, fontWeight: 700, color: C.dark }}>Mensagem recebida!</h3>
            <p style={{ fontFamily: F.inter, fontSize: 15, color: C.subtle, lineHeight: 1.6 }}>
              Obrigado pelo contato. Nossa equipe responderá em até 2 dias úteis.
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
}
