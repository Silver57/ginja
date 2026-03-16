import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "./Layout";

// ── Design tokens ─────────────────────────────────────────
const C = {
  teal: "#3FA796",
  tealLight: "rgba(63,167,150,0.10)",
  burgundy: "#8B1E3F",
  dark: "#1A1A1A",
  text: "#2D2D2D",
  muted: "#555555",
  subtle: "#6B6B6B",
  white: "#F9F4E8",
  divider: "#E8E8E8",
  heroBg: "linear-gradient(rgba(249, 244, 232, 0.4), rgba(249, 244, 232, 0.4)), url('/images/hero_image_ginja.png') center/cover no-repeat",
  cardBg: "#FFFFFF",
  whiteColor: "#FFFFFF",
  heroSectionBg: "linear-gradient(rgba(249, 244, 232, 0.4), rgba(249, 244, 232, 0.4)), url('/images/hero_section_2.png') center/cover no-repeat",
};

const F = {
  sora: "'Sora', sans-serif",
  inter: "'Inter', sans-serif",
  dm: "'DM Sans', sans-serif",
};

export default function GinjasPage() {
  const [role, setRole] = useState("volunteer");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function scrollToForm(selectedRole) {
    setRole(selectedRole);
    document.getElementById("join")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Layout>
      {/* ── Hero Section ─────────────────────────────── */}
      <section style={{ background: C.heroSectionBg, width: "100%" }}>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 32, padding: "var(--hero-padding)", textAlign: "center",
        }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              fontFamily: F.sora, fontWeight: 800,
              color: C.burgundy, lineHeight: 1.2, letterSpacing: "-0.01em",
              display: "flex", flexDirection: "column", gap: "8px"
            }}
          >
            <span style={{ fontSize: "clamp(44px, 8vw, 78px)" }}>Há quem saiba fazer.</span>
            <span style={{ fontSize: "clamp(36px, 6vw, 64px)" }}>Há quem precise que aconteça.</span>
            <span style={{ fontSize: "clamp(28px, 4vw, 50px)" }}>Ainda não se encontraram.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="mobile-stack-buttons"
            style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}
          >
            <button onClick={() => scrollToForm("volunteer")} style={{
              background: C.teal, color: C.whiteColor, fontFamily: F.dm,
              fontSize: 14, fontWeight: 700, padding: "12px 28px",
              borderRadius: 12, border: "none", cursor: "pointer",
              boxShadow: "0 4px 14px rgba(63,167,150,0.25)",
            }}>Sou Voluntário</button>
            <button onClick={() => scrollToForm("org")} style={{
              background: "transparent", color: C.teal, fontFamily: F.dm,
              fontSize: 14, fontWeight: 700, padding: "12px 28px",
              borderRadius: 12, border: `1.5px solid ${C.teal}`, cursor: "pointer",
            }}>Sou uma Associação</button>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────── */}
      <section style={{ background: C.white, width: "100%", padding: "var(--section-padding)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: 36 }}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: F.sora, fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 700, color: C.dark, marginBottom: 8 }}>
              Como funciona
            </h2>
          </div>
          <div className="mobile-stack" style={{ display: "flex", gap: 24, alignItems: "stretch" }}>
            {[
              {
                n: "Fase 1", img: "/images/generated_image1.png",
                title: "Querer ajudar e querer ser ajudado",
                paras: [
                  ["Há profissionais com muito para dar e associações com muito por fazer. O problema é que raramente se encontram. Nós tratamos disso. ", {h:"Encontramos a associação certa para o teu perfil e as tuas competências."}, ],
                  ["Mas antes de avançares, é importante saberes: ", {h:"isto não é voluntariado ocasional."}, " Quando uma associação conta contigo, conta a sério. Pedimos-te ", {h:"compromisso com prazos, entregas e disponibilidade real."}, ],
                ],
              },
              {
                n: "Fase 2", img: "/images/generated_image2.png",
                title: "Juntos, lado a lado",
                paras: [
                  ["Depois do match, começa o trabalho. Tu trazes o conhecimento técnico, a associação traz o contexto e a missão. ", {h:"Trabalham como parceiros"}, " — não és um empregado nem a associação é tua cliente."],
                  [{h:"Nós acompanhamos o processo do início ao fim"}, ", garantindo que a comunicação flui e que ambos os lados têm o que precisam para avançar."],
                ],
              },
              {
                n: "Fase 3", img: "/images/generated_image3.png",
                title: "O impacto que constróis",
                paras: [
                  ["Um site que finalmente funciona. Uma contabilidade organizada. Uma campanha que chegou a quem precisava. ", {h:"São estes os resultados quando alguém que sabe se junta a quem precisa."} ],
                  [{h:"Tu ganhas propósito e experiência com significado."}, " A associação ganha capacidade que antes não tinha. E as comunidades que ela serve ganham um mundo um bocadinho melhor."],
                ],
                cta: "Junta-te a nós e coloca o que sabes ao serviço de quem precisa.",
              },
            ].map(({ n, img, title, paras, cta }) => (
              <div key={n} style={{
                flex: 1, background: C.whiteColor, borderRadius: 20, overflow: "hidden",
                display: "flex", flexDirection: "column",
                border: `1px solid ${C.divider}`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              }}>
                <img src={img} alt={title} style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }} />
                <div style={{ padding: "32px 32px 36px", display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
                  <span style={{ fontFamily: F.sora, fontSize: 11, fontWeight: 700, color: C.teal, letterSpacing: 2.5, textTransform: "uppercase" }}>{n}</span>
                  <h3 style={{ fontFamily: F.sora, fontSize: 21, fontWeight: 700, color: C.dark, lineHeight: 1.4 }}>{title}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {paras.map((segments, i) => (
                      <p key={i} style={{ fontFamily: F.dm, fontSize: 16, color: C.subtle, lineHeight: 1.8, margin: 0 }}>
                        {segments.map((s, j) =>
                          typeof s === "string"
                            ? s
                            : <strong key={j} style={{ color: C.dark, fontWeight: 600 }}>{s.h}</strong>
                        )}
                      </p>
                    ))}
                  </div>
                  {cta && (
                    <p style={{ fontFamily: F.dm, fontSize: 15, fontWeight: 700, color: C.teal, marginTop: "auto", paddingTop: 8 }}>{cta}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join Section ─────────────────────────────── */}
      <section id="join" style={{
        background: C.white, display: "flex", flexDirection: "column",
        alignItems: "center", gap: 32, padding: "var(--section-padding)",
      }}>
        {/* Section intro */}
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
          <h2 style={{ fontFamily: F.sora, fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 800, color: C.burgundy, lineHeight: 1.6 }}>
            Estamos ansiosos para começar.<br />Mas primeiro precisamos de te conhecer.
          </h2>
        </div>

        {/* Role toggle */}
        <div style={{ display: "flex", background: "rgba(249, 244, 232, 0.7)", borderRadius: 999, padding: 4, gap: 4, border: `1px solid ${C.divider}` }}>
          {[
            { value: "volunteer", label: "Sou Voluntário" },
            { value: "org",       label: "Sou uma Associação" },
          ].map(({ value, label }) => (
            <button key={value} onClick={() => setRole(value)} style={{
              fontFamily: F.sora, fontSize: 14, fontWeight: 600,
              padding: "10px 24px", borderRadius: 999, border: "none", cursor: "pointer",
              background: role === value ? C.teal : "transparent",
              color: role === value ? C.whiteColor : C.subtle,
              transition: "all 0.15s",
            }}>{label}</button>
          ))}
        </div>

        {/* Dynamic subheading */}
        <p style={{ fontFamily: F.dm, fontSize: 15, color: C.subtle, lineHeight: 1.7, maxWidth: 460, textAlign: "center", marginTop: -16 }}>
          {role === "volunteer"
            ? "Diz-nos quem és e o que sabes fazer. Nós encontramos a associação certa para ti."
            : "Conta-nos o que a tua associação precisa. Encontramos o profissional certo para ajudar."}
        </p>

        {/* Form Card */}
        <div className="mobile-full-width" style={{
          background: C.whiteColor, borderRadius: 20, padding: "clamp(24px, 4vw, 40px)",
          display: "flex", flexDirection: "column", gap: 24, width: "100%", maxWidth: 680,
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          border: `1px solid ${C.divider}`,
        }}>
          {/* Contact info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontFamily: F.sora, fontSize: 13, fontWeight: 700, color: C.teal, letterSpacing: 1.5, textTransform: "uppercase" }}>
              {role === "volunteer" ? "Os teus dados" : "Dados da associação"}
            </span>
            <div className="mobile-stack-small" style={{ display: "flex", gap: 16 }}>
              <Field label="Nome completo" placeholder="O teu nome" />
              <Field label="E-mail" placeholder="o.teu@email.com" type="email" />
            </div>
            <div className="mobile-stack-small" style={{ display: "flex", gap: 16 }}>
              {role === "org"
                ? <Field label="Nome da associação" placeholder="Nome da vossa organização" />
                : <Field label="Área profissional" placeholder="Ex: Design, Contabilidade, IT…" />}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                <label style={labelStyle}>País</label>
                <select style={inputStyle}>
                  <option value="">Seleciona o teu país</option>
                  <option>Portugal</option>
                  <option>Brasil</option>
                  <option>Outro</option>
                </select>
              </div>
            </div>
          </div>

          <Divider />

          {/* Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ fontFamily: F.sora, fontSize: 13, fontWeight: 700, color: C.teal, letterSpacing: 1.5, textTransform: "uppercase" }}>
              {role === "volunteer" ? "O que podes oferecer" : "O que precisas"}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <textarea
                rows={4}
                placeholder={role === "volunteer"
                  ? "Descreve as tuas competências e em que tipo de projetos tens interesse…"
                  : "Descreve o desafio ou projeto em que a tua associação precisa de ajuda…"}
                style={{ ...inputStyle, resize: "none", fontFamily: F.dm, lineHeight: 1.6 }}
              />
            </div>
          </div>

          <Divider />

          {/* Consent + submit */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
              <input
                type="checkbox" checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                style={{ marginTop: 3, width: 15, height: 15, flexShrink: 0 }}
              />
              <span style={{ fontFamily: F.dm, fontSize: 14, color: C.subtle, lineHeight: 1.6 }}>
                Aceito ser contactado pelo Ginjas sobre o próximo passo.
              </span>
            </label>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={() => setSubmitted(true)} style={{
                background: C.burgundy, color: C.whiteColor,
                fontFamily: F.sora, fontSize: 15, fontWeight: 700,
                padding: "14px 48px", borderRadius: 999,
                border: "none", cursor: "pointer",
                boxShadow: "0 4px 16px rgba(139,30,63,0.2)",
              }}>
                {role === "volunteer" ? "Quero ser voluntário" : "Quero apoio para a minha associação"}
              </button>
            </div>
          </div>
        </div>

        {submitted && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: C.tealLight, color: C.teal,
            fontFamily: F.dm, fontSize: 14, fontWeight: 600,
            padding: "14px 28px", borderRadius: 12,
          }}>
            <CheckCircleIcon />
            Obrigado! Entraremos em contacto em breve.
          </div>
        )}
      </section>
    </Layout>
  );
}

// ── Shared helpers ─────────────────────────────────────────

export const labelStyle = {
  fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#1A1A1A",
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
