import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

// ── Design tokens ─────────────────────────────────────────
const C = {
  teal: "#3FA796",
  tealLight: "rgba(63,167,150,0.08)",
  burgundy: "#8B1E3F",
  dark: "#1F1F1F",
  text: "#2D2D2D",
  muted: "#5A5A5A",
  subtle: "#666666",
  white: "#FFFFFF",
  divider: "#EAEAEA",
  heroBg: "linear-gradient(180deg, #FFF8E7 0%, #FFFDF5 45%, #F0F7E4 100%)",
};

const F = {
  sora: "'Sora', sans-serif",
  inter: "'Inter', sans-serif",
  dm: "'DM Sans', sans-serif",
};

export default function GinjaPage() {
  const [role, setRole] = useState("volunteer");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout>
      {/* ── Hero Section ─────────────────────────────── */}
      <section style={{ background: C.heroBg, width: "100%" }}>
        <div className="mobile-stack" style={{ display: "flex", alignItems: "center", gap: 48, padding: "var(--section-padding)" }}>
          <div className="mobile-center-text" style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1 }}>
            <h1 style={{
              fontFamily: F.sora, fontSize: 48, fontWeight: 800,
              color: C.text, lineHeight: 1.2, letterSpacing: -0.5,
            }}>
              Conectando Profissionais Com Propósito
            </h1>
            <p style={{ fontFamily: F.dm, fontSize: 18, color: C.muted, lineHeight: 1.65 }}>
              Ginja conecta profissionais que desejam doar suas habilidades com
              organizações que geram impacto social.
            </p>
            <div className="mobile-center-items" style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button
                onClick={() => navigate("/voluntario")}
                style={{
                  background: C.teal, color: C.white, fontFamily: F.dm,
                  fontSize: 15, fontWeight: 700, padding: "14px 32px",
                  borderRadius: 16, border: "none", cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(63,167,150,0.19)",
                }}
              >
                Seja Voluntário
              </button>
              <button
                onClick={() => navigate("/apoio")}
                style={{
                  background: C.white, color: C.teal, fontFamily: F.dm,
                  fontSize: 15, fontWeight: 700, padding: "14px 32px",
                  borderRadius: 16, border: `2px solid ${C.teal}`, cursor: "pointer",
                }}
              >
                Solicitar Apoio
              </button>
            </div>
          </div>

          <div className="mobile-full-width" style={{
            width: 520, height: "auto", aspectRatio: "520/420", flexShrink: 0,
            borderRadius: 20, overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
          }}>
            <img
              src="/images/generated-1773335684949.png"
              alt="Hero Visual"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* ── Feedback Section ─────────────────────────── */}
      <section style={{
        background: C.white, display: "flex", flexDirection: "column",
        alignItems: "center", gap: 32, padding: "var(--section-padding)",
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: "100%", maxWidth: 680 }}>
          <h2 style={{ fontFamily: F.sora, fontSize: 36, fontWeight: 700, color: C.dark, textAlign: "center" }}>
            Ajude-nos a Construir o Ginja
          </h2>
          <p style={{ fontFamily: F.inter, fontSize: 16, color: C.subtle, textAlign: "center", lineHeight: 1.6, width: "100%", maxWidth: 580 }}>
            Estamos preparando o lançamento da nossa plataforma. Seu feedback
            nos ajudará a atender voluntários e organizações de forma eficaz.
          </p>
        </div>

        {/* Form Card */}
        <div className="mobile-full-width" style={{
          background: C.white, borderRadius: 16, padding: "clamp(20px, 5vw, 40px)",
          display: "flex", flexDirection: "column", gap: 28, width: "100%", maxWidth: 680,
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          border: `1px solid ${C.divider}`,
        }}>
          {/* Who are you */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <span style={{ fontFamily: F.inter, fontSize: 15, fontWeight: 600, color: C.dark }}>Quem é você?</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { value: "volunteer", label: "Profissional voluntário" },
                { value: "org",       label: "Organização buscando ajuda" },
                { value: "both",      label: "Ambos" },
                { value: "other",     label: "Outro" },
              ].map((opt) => (
                <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                  <input
                    type="radio" name="role" value={opt.value}
                    checked={role === opt.value}
                    onChange={() => setRole(opt.value)}
                    style={{ width: 16, height: 16 }}
                  />
                  <span style={{ fontFamily: F.inter, fontSize: 14, color: C.dark }}>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <Divider />

          {/* Your Information */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontFamily: F.inter, fontSize: 15, fontWeight: 600, color: C.dark }}>Suas Informações</span>
            <div className="mobile-stack" style={{ display: "flex", gap: 16 }}>
              <Field label="Nome Completo" placeholder="Seu nome completo" />
              <Field label="E-mail" placeholder="seu@email.com" type="email" />
            </div>
            <div className="mobile-stack" style={{ display: "flex", gap: 16 }}>
              <Field label="Nome da Organização (opcional)" placeholder="Sua organização" />
              <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                <label style={labelStyle}>País</label>
                <select style={inputStyle}>
                  <option value="">Selecione seu país</option>
                  <option>Brasil</option>
                  <option>Portugal</option>
                  <option>Outro</option>
                </select>
              </div>
            </div>
          </div>

          <Divider />

          {/* Tell us more */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontFamily: F.inter, fontSize: 15, fontWeight: 600, color: C.dark }}>Conte-nos mais</span>
            <Field
              label="Como você gostaria de participar?"
              placeholder="Habilidades que pode oferecer / Tipo de apoio necessário"
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={labelStyle}>Comentários</label>
              <textarea
                rows={4}
                placeholder="Pensamentos ou feedback adicionais..."
                style={{ ...inputStyle, resize: "none", fontFamily: F.inter }}
              />
            </div>
          </div>

          <Divider />

          {/* Consent */}
          <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
            <input
              type="checkbox" checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              style={{ marginTop: 2, width: 16, height: 16, flexShrink: 0 }}
            />
            <span style={{ fontFamily: F.inter, fontSize: 13, color: C.subtle, lineHeight: 1.5 }}>
              Eu consinto em ser contatado sobre o acesso antecipado ao Ginja.
            </span>
          </label>

          {/* Submit */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => setSubmitted(true)}
              style={{
                background: C.burgundy, color: C.white,
                fontFamily: F.inter, fontSize: 16, fontWeight: 600,
                padding: "16px 48px", borderRadius: 999,
                border: "none", cursor: "pointer",
              }}
            >
              Enviar Feedback
            </button>
          </div>
        </div>

        {submitted && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(63,167,150,0.08)", color: C.teal,
            fontFamily: F.inter, fontSize: 14, fontWeight: 500,
            padding: "12px 24px", borderRadius: 12,
          }}>
            <CheckCircleIcon />
            Obrigado por ajudar a moldar o Ginja.
          </div>
        )}
      </section>
    </Layout>
  );
}

// ── Shared helpers ─────────────────────────────────────────

export const labelStyle = {
  fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: "#1F1F1F",
};

export const inputStyle = {
  width: "100%", border: "1px solid #E2E8F0", borderRadius: 8,
  padding: "10px 16px", fontSize: 14, fontFamily: "'Inter', sans-serif",
  color: "#1F1F1F", background: "#FFFFFF",
};

export function Field({ label, placeholder, type = "text" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
      <label style={labelStyle}>{label}</label>
      <input type={type} placeholder={placeholder} style={inputStyle} />
    </div>
  );
}

export function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #EAEAEA", margin: 0 }} />;
}

function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
