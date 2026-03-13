import { useState } from "react";
import Layout from "../Layout";
import { Field, Divider, labelStyle, inputStyle } from "../GinjaPage";

const C = { teal: "#3FA796", burgundy: "#8B1E3F", dark: "#1F1F1F", subtle: "#666", divider: "#EAEAEA", heroBg: "linear-gradient(180deg, #FFF8E7 0%, #FFFDF5 45%, #F0F7E4 100%)" };
const F = { sora: "'Sora', sans-serif", inter: "'Inter', sans-serif", dm: "'DM Sans', sans-serif" };

const channels = [
  { emoji: "📧", label: "E-mail", value: "oi@ginja.org" },
  { emoji: "🐦", label: "Twitter", value: "@ginjaorg" },
  { emoji: "💼", label: "LinkedIn", value: "linkedin.com/company/ginja" },
];

export default function ContatoPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout>
      {/* Hero */}
      <section style={{ background: C.heroBg, padding: "var(--section-padding)", textAlign: "center" }}>
        <h1 style={{ fontFamily: F.sora, fontSize: "clamp(32px, 8vw, 44px)", fontWeight: 800, color: C.dark, marginBottom: 20 }}>
          Fale Conosco
        </h1>
        <p style={{ fontFamily: F.dm, fontSize: 19, color: "#5A5A5A", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
          Tem uma dúvida, sugestão ou quer saber mais sobre o Ginja? Estamos aqui.
        </p>
      </section>

      <section className="mobile-stack" style={{ background: "#FFFFFF", padding: "var(--section-padding)", display: "flex", gap: 64, alignItems: "flex-start", justifyContent: "center" }}>
        {/* Contact channels */}
        <div className="mobile-full-width" style={{ display: "flex", flexDirection: "column", gap: 24, width: 260, flexShrink: 0 }}>
          <h2 style={{ fontFamily: F.sora, fontSize: 22, fontWeight: 700, color: C.dark }}>Canais diretos</h2>
          {channels.map((ch) => (
            <div key={ch.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ fontSize: 24 }}>{ch.emoji}</div>
              <div>
                <p style={{ fontFamily: F.inter, fontSize: 12, fontWeight: 600, color: C.teal, marginBottom: 2 }}>{ch.label}</p>
                <p style={{ fontFamily: F.inter, fontSize: 14, color: C.dark }}>{ch.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        {!submitted ? (
          <div className="mobile-full-width" style={{
            background: "#FFFFFF", borderRadius: 16, padding: "clamp(20px, 5vw, 40px)",
            display: "flex", flexDirection: "column", gap: 24, width: "100%", maxWidth: 560,
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: `1px solid ${C.divider}`,
          }}>
            <div className="mobile-stack" style={{ display: "flex", gap: 16 }}>
              <Field label="Nome" placeholder="Seu nome" />
              <Field label="E-mail" placeholder="seu@email.com" type="email" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={labelStyle}>Assunto</label>
              <select style={inputStyle}>
                <option value="">Selecione um assunto</option>
                <option>Quero ser voluntário</option>
                <option>Sou uma organização</option>
                <option>Parceria</option>
                <option>Imprensa</option>
                <option>Outro</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={labelStyle}>Mensagem</label>
              <textarea
                rows={5}
                placeholder="Escreva sua mensagem..."
                style={{ ...inputStyle, resize: "none", fontFamily: F.inter }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setSubmitted(true)}
                style={{
                  background: C.burgundy, color: "#FFFFFF",
                  fontFamily: F.inter, fontSize: 15, fontWeight: 600,
                  padding: "13px 40px", borderRadius: 999, border: "none", cursor: "pointer",
                  width: "100%", maxWidth: "fit-content"
                }}
              >
                Enviar Mensagem
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 16, width: "100%", maxWidth: 560, padding: "64px 40px", textAlign: "center",
            background: "rgba(63,167,150,0.06)", borderRadius: 16, border: `1px solid rgba(63,167,150,0.2)`,
          }}>
            <div style={{ fontSize: 48 }}>✅</div>
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
