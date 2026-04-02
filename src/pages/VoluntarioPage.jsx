import { useState } from "react";
import Layout from "../Layout";
import { Field, Divider, labelStyle, inputStyle } from "../GinjasPage.jsx";
import { supabase } from "../lib/supabase.js";

const C = { teal: "#3FA796", burgundy: "#8B1E3F", dark: "#1F1F1F", muted: "#5A5A5A", subtle: "#666", divider: "#EAEAEA", heroBg: "#F9F4E8" };
const F = { sora: "'Sora', sans-serif", inter: "'Inter', sans-serif", dm: "'DM Sans', sans-serif" };

const perks = [
  { emoji: "🎯", text: "Projetos com escopo claro e impacto mensurável" },
  { emoji: "⏱", text: "Flexibilidade total — trabalhe no seu ritmo" },
  { emoji: "🌍", text: "Conecte-se com organizações do mundo todo" },
  { emoji: "📜", text: "Certificado de voluntariado ao concluir projetos" },
];

export default function VoluntarioPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", linkedin: "", country: "", area: "", availability: "", about: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function setField(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: err } = await supabase.from("voluntario_submissions").insert([{
      name: form.name,
      email: form.email,
      linkedin: form.linkedin,
      country: form.country,
      area: form.area,
      availability: form.availability,
      about: form.about,
    }]);
    setLoading(false);
    if (err) { console.error("[voluntario_submissions] submit failed:", err); setError("Erro ao enviar. Tente novamente."); return; }
    setSubmitted(true);
  }

  return (
    <Layout>
      {/* Hero */}
      <section style={{ background: C.heroBg, padding: "var(--section-padding)" }}>
        <div style={{ maxWidth: 620 }}>
          <span style={{
            fontFamily: F.inter, fontSize: 13, fontWeight: 600, color: C.teal,
            background: "rgba(63,167,150,0.1)", padding: "4px 14px", borderRadius: 999,
            display: "inline-block", marginBottom: 20,
          }}>
            Para voluntários
          </span>
          <h1 style={{ fontFamily: F.sora, fontSize: "clamp(32px, 8vw, 44px)", fontWeight: 800, color: C.dark, marginBottom: 20, lineHeight: 1.2 }}>
            Doe suas habilidades. Mude o mundo.
          </h1>
          <p style={{ fontFamily: F.dm, fontSize: 18, color: C.muted, lineHeight: 1.7, marginBottom: 36 }}>
            Junte-se a uma comunidade de profissionais que usam seu talento para apoiar causas que importam.
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none", padding: 0 }}>
            {perks.map((p) => (
              <li key={p.text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }} aria-hidden="true">{p.emoji}</span>
                <span style={{ fontFamily: F.inter, fontSize: 15, color: C.subtle }}>{p.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Form */}
      <section style={{ background: "#F9F4E8", padding: "var(--section-padding)", display: "flex", justifyContent: "center" }}>
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="mobile-full-width"
            style={{
              background: "#FFFFFF", borderRadius: 16, padding: "clamp(20px, 5vw, 40px)",
              display: "flex", flexDirection: "column", gap: 28, width: "100%", maxWidth: 680,
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: `1px solid ${C.divider}`,
            }}
          >
            <h2 style={{ fontFamily: F.sora, fontSize: 24, fontWeight: 700, color: C.dark }}>
              Cadastre-se como voluntário
            </h2>

            <Divider />

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <span style={{ fontFamily: F.inter, fontSize: 15, fontWeight: 600, color: C.dark }}>Informações pessoais</span>
              <div className="mobile-stack" style={{ display: "flex", gap: 16 }}>
                <Field label="Nome Completo" placeholder="Seu nome completo" value={form.name} onChange={setField("name")} />
                <Field label="E-mail" placeholder="seu@email.com" type="email" value={form.email} onChange={setField("email")} />
              </div>
              <div className="mobile-stack" style={{ display: "flex", gap: 16 }}>
                <Field label="LinkedIn (opcional)" placeholder="linkedin.com/in/seu-perfil" value={form.linkedin} onChange={setField("linkedin")} />
                <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                  <label htmlFor="country-select" style={labelStyle}>País</label>
                  <select id="country-select" style={inputStyle} value={form.country} onChange={setField("country")}>
                    <option value="">Selecione seu país</option>
                    <option>Brasil</option>
                    <option>Portugal</option>
                    <option>Outro</option>
                  </select>
                </div>
              </div>
            </div>

            <Divider />

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <span style={{ fontFamily: F.inter, fontSize: 15, fontWeight: 600, color: C.dark }}>Suas habilidades</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label htmlFor="vol-area-select" style={labelStyle}>Área de atuação</label>
                <select id="vol-area-select" style={inputStyle} value={form.area} onChange={setField("area")}>
                  <option value="">Selecione sua área</option>
                  <option>Design & UX</option>
                  <option>Tecnologia & Desenvolvimento</option>
                  <option>Marketing & Comunicação</option>
                  <option>Jurídico</option>
                  <option>Finanças & Contabilidade</option>
                  <option>Gestão & Estratégia</option>
                  <option>Educação</option>
                  <option>Saúde</option>
                  <option>Outro</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label htmlFor="availability-select" style={labelStyle}>Disponibilidade mensal</label>
                <select id="availability-select" style={inputStyle} value={form.availability} onChange={setField("availability")}>
                  <option value="">Quanto tempo você pode dedicar?</option>
                  <option>Até 5 horas/mês</option>
                  <option>5–10 horas/mês</option>
                  <option>10–20 horas/mês</option>
                  <option>Mais de 20 horas/mês</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label htmlFor="about-textarea" style={labelStyle}>Sobre você</label>
                <textarea
                  id="about-textarea"
                  rows={4}
                  placeholder="Descreva brevemente sua experiência e por que quer ser voluntário no Ginjas..."
                  style={{ ...inputStyle, resize: "none", fontFamily: F.inter }}
                  value={form.about}
                  onChange={setField("about")}
                />
              </div>
            </div>

            <Divider />

            {error && (
              <p role="alert" style={{ fontFamily: F.inter, fontSize: 13, color: "#c0392b", textAlign: "center" }}>{error}</p>
            )}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: C.teal, color: "#FFFFFF",
                  fontFamily: F.inter, fontSize: 16, fontWeight: 600,
                  padding: "16px 56px", borderRadius: 999, border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  boxShadow: "0 4px 16px rgba(63,167,150,0.25)",
                }}
              >
                {loading ? "A enviar…" : "Quero ser voluntário"}
              </button>
            </div>
          </form>
        ) : (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 16, maxWidth: 520, textAlign: "center", padding: "64px 0",
          }}>
            <div style={{ fontSize: 56 }} aria-hidden="true">🎉</div>
            <h2 style={{ fontFamily: F.sora, fontSize: 28, fontWeight: 800, color: C.dark }}>Você está na lista!</h2>
            <p style={{ fontFamily: F.inter, fontSize: 16, color: C.subtle, lineHeight: 1.7 }}>
              Obrigado por se cadastrar. Entraremos em contato assim que a plataforma for lançada com as
              primeiras oportunidades de voluntariado disponíveis para você.
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
}
