import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../Layout";
import { supabase } from "../lib/supabase.js";
import { C, F } from "../tokens";
import { Field, Divider, labelStyle, inputStyle } from "../FormHelpers.jsx";

const AREAS = ["Design & UX", "Tecnologia", "Marketing", "Jurídico", "Finanças", "Gestão", "Educação", "Saúde", "Outro"];

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function PreInscricaoPage() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") === "org" ? "org" : "volunteer";

  const [role, setRole] = useState(initialRole);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", area: "", hoursPerWeek: "", improvement: "", love: "",
    helpful: "", orgAreas: [], urgentTasks: "", monthlySpend: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function setField(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function toggleArea(area) {
    setForm((f) => ({
      ...f,
      orgAreas: f.orgAreas.includes(area)
        ? f.orgAreas.filter((a) => a !== area)
        : [...f.orgAreas, area],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (role === "volunteer") {
      if (!form.name.trim()) { setError("Por favor, insere o teu nome."); return; }
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError("Por favor, insere um e-mail válido."); return; }
    } else {
      if (!form.helpful) { setError("Por favor, indica se isto seria útil para a vossa associação."); return; }
    }
    setLoading(true);
    const table = role === "volunteer" ? "volunteer_feedback" : "org_feedback";
    const payload = role === "volunteer"
      ? { name: form.name, email: form.email, area: form.area, hours_per_week: form.hoursPerWeek, improvement: form.improvement, love: form.love }
      : { helpful: form.helpful, org_areas: form.orgAreas, urgent_tasks: form.urgentTasks, monthly_spend: form.monthlySpend };
    const { error: err } = await supabase.from(table).insert([payload]);
    setLoading(false);
    if (err) { console.error(`[${table}] submit failed:`, err); setError("Erro ao enviar. Tente novamente."); return; }
    setSubmitted(true);
  }

  return (
    <Layout>
      <div className="form-page-split">
        {/* ── Left panel: burgundy with texture ── */}
        <div className="form-page-hero" aria-hidden="true">
          <div className="form-page-hero-grain" />
          <div className="form-page-hero-content">
            <p style={{
              fontFamily: F.dm, fontSize: 13, fontWeight: 600,
              color: C.orange, textTransform: "uppercase",
              letterSpacing: "0.16em", margin: 0,
            }}>
              Pré-inscrição
            </p>
            <h1 style={{
              fontFamily: F.sora,
              fontSize: "clamp(32px, 3.5vw, 52px)",
              fontWeight: 800,
              color: "#F9F4E8",
              lineHeight: 1.15,
              margin: 0,
            }}>
              Ajuda-nos a construir isto juntos.
            </h1>
            <p style={{
              fontFamily: F.dm,
              fontSize: "clamp(15px, 1.3vw, 18px)",
              color: "rgba(249,244,232,0.7)",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 380,
            }}>
              Ainda estamos a começar. A tua opinião vai moldar a plataforma que queremos criar.
            </p>

            {/* Decorative element */}
            <div style={{
              width: 48, height: 3,
              background: C.orange,
              marginTop: 8,
            }} />
          </div>
        </div>

        {/* ── Right panel: form on textured cream ── */}
        <div className="form-page-form-panel">
          <section
            aria-label="Pré-inscrição"
            style={{
              display: "flex", flexDirection: "column",
              gap: 36,
              padding: "clamp(32px, 5vw, 64px) clamp(24px, 4vw, 56px)",
              maxWidth: 720,
              width: "100%",
            }}
          >
            {/* Role toggle */}
            <div
              role="tablist"
              aria-label="Tipo de utilizador"
              style={{
                display: "flex",
                gap: 4,
                alignSelf: "flex-start",
              }}
            >
              {[
                { value: "volunteer", label: "Sou Voluntário" },
                { value: "org", label: "Sou Associação" },
              ].map(({ value, label }) => {
                const active = role === value;
                return (
                  <button
                    key={value}
                    id={`tab-${value}`}
                    role="tab"
                    aria-selected={active}
                    aria-controls={`panel-${value}`}
                    onClick={() => setRole(value)}
                    className="form-tab-btn"
                    style={{
                      fontFamily: F.sora, fontSize: 14, fontWeight: 700,
                      padding: "12px 24px", minHeight: 44,
                      border: "none", cursor: "pointer",
                      background: active ? C.burgundy : "transparent",
                      color: active ? "#F9F4E8" : C.muted,
                      transition: "background 0.2s, color 0.2s",
                    }}
                  >{label}</button>
                );
              })}
            </div>

            {/* Dynamic subheading */}
            <p style={{
              fontFamily: F.dm, fontSize: 16, color: C.text,
              lineHeight: 1.7, margin: "-12px 0 0", maxWidth: 480,
            }}>
              {role === "volunteer"
                ? "Diz-nos quem és e partilha a tua visão. O teu feedback vai moldar a plataforma."
                : "Conta-nos o que a vossa associação precisa. O vosso feedback é essencial para nós."}
            </p>

            {/* Form */}
            <form
              id={`panel-${role}`}
              role="tabpanel"
              aria-labelledby={`tab-${role}`}
              onSubmit={handleSubmit}
              style={{
                display: "flex", flexDirection: "column", gap: 28,
                width: "100%",
              }}
            >
              {/* Volunteer fields */}
              {role === "volunteer" && (<>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <span style={{
                    fontFamily: F.sora, fontSize: 11, fontWeight: 700,
                    color: C.teal, letterSpacing: "0.18em", textTransform: "uppercase",
                    borderLeft: `3px solid ${C.teal}`, paddingLeft: 12,
                  }}>Os teus dados</span>
                  <div className="mobile-stack-small" style={{ display: "flex", gap: 16 }}>
                    <Field label="Nome completo" placeholder="O teu nome" value={form.name} onChange={setField("name")} required />
                    <Field label="E-mail" placeholder="o.teu@email.com" type="email" value={form.email} onChange={setField("email")} required />
                  </div>
                  <div className="mobile-stack-small" style={{ display: "flex", gap: 16 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                      <label htmlFor="area-select" style={labelStyle}>Área de especialização</label>
                      <select id="area-select" style={inputStyle} value={form.area} onChange={setField("area")}>
                        <option value="">Seleciona a tua área</option>
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
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                      <label htmlFor="hours-select" style={labelStyle}>Horas por semana disponíveis</label>
                      <select id="hours-select" style={inputStyle} value={form.hoursPerWeek} onChange={setField("hoursPerWeek")}>
                        <option value="">Quanto tempo podes dedicar?</option>
                        <option>Menos de 2h/semana</option>
                        <option>2–5h/semana</option>
                        <option>5–10h/semana</option>
                        <option>Mais de 10h/semana</option>
                      </select>
                    </div>
                  </div>
                </div>
                <Divider />
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <span style={{
                    fontFamily: F.sora, fontSize: 11, fontWeight: 700,
                    color: C.orange, letterSpacing: "0.18em", textTransform: "uppercase",
                    borderLeft: `3px solid ${C.orange}`, paddingLeft: 12,
                  }}>A tua opinião</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label htmlFor="improvement-textarea" style={labelStyle}>Na tua opinião, qual seria a maior ajuda que poderias dar dentro da tua área de especialidade?</label>
                    <textarea id="improvement-textarea" rows={4} placeholder="Partilha as tuas sugestões…" style={{ ...inputStyle, resize: "none", fontFamily: F.dm, lineHeight: 1.6 }} value={form.improvement} onChange={setField("improvement")} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label htmlFor="love-textarea" style={labelStyle}>Deixa um elogio, crítica ou mensagem de apoio</label>
                    <textarea id="love-textarea" rows={3} placeholder="Diz-nos o que quiseres…" style={{ ...inputStyle, resize: "none", fontFamily: F.dm, lineHeight: 1.6 }} value={form.love} onChange={setField("love")} />
                  </div>
                </div>
              </>)}

              {/* Org fields */}
              {role === "org" && (<>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <span style={{
                    fontFamily: F.sora, fontSize: 11, fontWeight: 700,
                    color: C.burgundy, letterSpacing: "0.18em", textTransform: "uppercase",
                    borderLeft: `3px solid ${C.burgundy}`, paddingLeft: 12,
                  }}>A vossa associação</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label htmlFor="helpful-select" style={labelStyle}>Isto seria útil para a vossa associação?</label>
                    <select id="helpful-select" style={inputStyle} value={form.helpful} onChange={setField("helpful")} required aria-required="true">
                      <option value="">Seleciona uma opção</option>
                      <option>Sim, muito!</option>
                      <option>Provavelmente</option>
                      <option>Talvez</option>
                      <option>Não realmente</option>
                    </select>
                  </div>
                  <fieldset style={{ border: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    <legend style={labelStyle}>Em que áreas precisam de ajuda?</legend>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {AREAS.map((a) => {
                        const active = form.orgAreas.includes(a);
                        return (
                          <button
                            key={a}
                            type="button"
                            onClick={() => toggleArea(a)}
                            aria-pressed={active}
                            className="form-tag-btn"
                            style={{
                              padding: "8px 16px", fontSize: 13, fontFamily: F.dm,
                              fontWeight: active ? 600 : 400,
                              cursor: "pointer",
                              border: `1.5px solid ${active ? C.teal : C.divider}`,
                              background: active ? C.tealLight : "transparent",
                              color: active ? C.teal : C.text,
                              transition: "all 0.15s",
                            }}
                          >{a}</button>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>
                <Divider />
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <span style={{
                    fontFamily: F.sora, fontSize: 11, fontWeight: 700,
                    color: C.orange, letterSpacing: "0.18em", textTransform: "uppercase",
                    borderLeft: `3px solid ${C.orange}`, paddingLeft: 12,
                  }}>Detalhes</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label htmlFor="urgent-textarea" style={labelStyle}>Quais são as vossas tarefas mais urgentes?</label>
                    <textarea id="urgent-textarea" rows={4} placeholder="Descreve os desafios mais urgentes da vossa organização…" style={{ ...inputStyle, resize: "none", fontFamily: F.dm, lineHeight: 1.6 }} value={form.urgentTasks} onChange={setField("urgentTasks")} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label htmlFor="spend-select" style={labelStyle}>Quanto gastam por mês em serviços que voluntários poderiam ajudar?</label>
                    <select id="spend-select" style={inputStyle} value={form.monthlySpend} onChange={setField("monthlySpend")}>
                      <option value="">Seleciona um intervalo</option>
                      <option>Não gastamos</option>
                      <option>Menos de €500/mês</option>
                      <option>€500–€2.000/mês</option>
                      <option>€2.000–€5.000/més</option>
                      <option>Mais de €5.000/mês</option>
                    </select>
                  </div>
                </div>
              </>)}

              {error && (
                <p role="alert" aria-live="assertive" aria-atomic="true" style={{
                  fontFamily: F.dm, fontSize: 14, color: "#c0392b",
                  background: "#c0392b10", padding: "12px 16px",
                }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="form-submit-btn"
                style={{
                  background: C.burgundy, color: "#F9F4E8",
                  fontFamily: F.sora, fontSize: 16, fontWeight: 700,
                  padding: "18px 48px",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  letterSpacing: "0.02em",
                  alignSelf: "flex-start",
                  transition: "background 0.2s",
                }}
              >
                {loading ? "A enviar…" : "Enviar feedback"}
              </button>
            </form>

            {submitted && (
              <div role="status" aria-live="polite" aria-atomic="true" style={{
                display: "flex", alignItems: "center", gap: 12,
                background: "#E8F5F2",
                color: C.teal,
                fontFamily: F.dm, fontSize: 15, fontWeight: 600,
                padding: "18px 24px",
                borderLeft: `4px solid ${C.teal}`,
              }}>
                <CheckCircleIcon />
                Obrigado pelo feedback! A tua opinião vai ajudar-nos a construir algo melhor.
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
}
