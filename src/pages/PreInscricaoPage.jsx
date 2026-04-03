import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../Layout";
import { supabase } from "../lib/supabase.js";
import { C, F } from "../tokens";
import { inputStyle } from "../FormHelpers.jsx";

const AREAS = ["Design & UX", "Tecnologia", "Marketing", "Jurídico", "Finanças", "Gestão", "Educação", "Saúde", "Outro"];

// ── Step definitions per role ────────────────────────────────
const VOLUNTEER_STEPS = [
  { id: "role", title: "Quem és tu?", subtitle: "Ajuda-nos a conhecer-te." },
  { id: "dados", title: "Os teus dados", subtitle: "Nome e contacto." },
  { id: "perfil", title: "O teu perfil", subtitle: "Área e disponibilidade." },
  { id: "opiniao", title: "A tua opinião", subtitle: "Como podes ajudar?" },
  { id: "mensagem", title: "Uma última coisa", subtitle: "Deixa-nos uma mensagem." },
];

const ORG_STEPS = [
  { id: "role", title: "Quem és tu?", subtitle: "Ajuda-nos a conhecer-te." },
  { id: "utilidade", title: "Seria útil?", subtitle: "Diz-nos o que achas." },
  { id: "areas", title: "Áreas de ajuda", subtitle: "Seleciona as que se aplicam." },
  { id: "urgente", title: "Tarefas urgentes", subtitle: "O que mais precisam?" },
  { id: "custos", title: "Custos atuais", subtitle: "Quanto gastam hoje?" },
];

// ── Label style ──────────────────────────────────────────────
const label = {
  fontFamily: F.dm, fontSize: 15, fontWeight: 500, color: C.dark,
  lineHeight: 1.5, display: "block", marginBottom: 8,
};

const fieldInput = {
  ...inputStyle,
  padding: "14px 18px",
  fontSize: 16,
  borderRadius: 4,
};

// ── Main component ───────────────────────────────────────────
export default function PreInscricaoPage() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") === "org" ? "org" : "volunteer";

  const [role, setRole] = useState(initialRole);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", area: "", hoursPerWeek: "", improvement: "", love: "",
    helpful: "", orgAreas: [], urgentTasks: "", monthlySpend: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const steps = role === "volunteer" ? VOLUNTEER_STEPS : ORG_STEPS;
  const totalSteps = steps.length;
  const current = steps[step];
  const isLast = step === totalSteps - 1;
  const progress = ((step + 1) / totalSteps) * 100;

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

  function validateStep() {
    setError(null);
    if (role === "volunteer") {
      if (current.id === "dados") {
        if (!form.name.trim()) { setError("Por favor, insere o teu nome."); return false; }
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError("Por favor, insere um e-mail válido."); return false; }
      }
    } else {
      if (current.id === "utilidade" && !form.helpful) {
        setError("Por favor, seleciona uma opção."); return false;
      }
    }
    return true;
  }

  function goNext() {
    if (!validateStep()) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }

  function goBack() {
    setError(null);
    setDirection(-1);
    if (step === 0) return;
    setStep((s) => s - 1);
  }

  function selectRole(r) {
    setRole(r);
    setDirection(1);
    setStep(1);
  }

  async function handleSubmit() {
    if (!validateStep()) return;
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

  // ── Step content renderer ──────────────────────────────────
  function renderStepContent() {
    // Role selection (step 0 for both)
    if (current.id === "role") {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={label}>Para quem estás a preencher?</p>
          <div className="mobile-stack-small" style={{ display: "flex", gap: 16 }}>
            {[
              { value: "volunteer", text: "Sou Voluntário", desc: "Quero oferecer as minhas competências" },
              { value: "org", text: "Sou uma Associação", desc: "Preciso de ajuda especializada" },
            ].map(({ value, text, desc }) => {
              const active = role === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => selectRole(value)}
                  className="form-role-card"
                  style={{
                    flex: 1,
                    padding: "28px 24px",
                    border: `2px solid ${active ? C.burgundy : C.divider}`,
                    background: active ? `${C.burgundy}08` : "transparent",
                    cursor: "pointer",
                    display: "flex", flexDirection: "column", gap: 8,
                    textAlign: "left",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                >
                  <span style={{
                    fontFamily: F.sora, fontSize: 17, fontWeight: 700,
                    color: active ? C.burgundy : C.dark,
                  }}>{text}</span>
                  <span style={{
                    fontFamily: F.dm, fontSize: 14,
                    color: C.muted, lineHeight: 1.5,
                  }}>{desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // ── Volunteer steps ──
    if (role === "volunteer") {
      if (current.id === "dados") {
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label htmlFor="name-input" style={label}>Nome completo *</label>
              <input id="name-input" type="text" placeholder="O teu nome" style={fieldInput} value={form.name} onChange={setField("name")} required />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label htmlFor="email-input" style={label}>E-mail *</label>
              <input id="email-input" type="email" placeholder="o.teu@email.com" style={fieldInput} value={form.email} onChange={setField("email")} required />
            </div>
          </div>
        );
      }
      if (current.id === "perfil") {
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label htmlFor="area-select" style={label}>Área de especialização</label>
              <select id="area-select" style={fieldInput} value={form.area} onChange={setField("area")}>
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
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label htmlFor="hours-select" style={label}>Horas por semana disponíveis</label>
              <select id="hours-select" style={fieldInput} value={form.hoursPerWeek} onChange={setField("hoursPerWeek")}>
                <option value="">Quanto tempo podes dedicar?</option>
                <option>Menos de 2h/semana</option>
                <option>2–5h/semana</option>
                <option>5–10h/semana</option>
                <option>Mais de 10h/semana</option>
              </select>
            </div>
          </div>
        );
      }
      if (current.id === "opiniao") {
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label htmlFor="improvement-textarea" style={label}>Na tua opinião, qual seria a maior ajuda que poderias dar dentro da tua área de especialidade?</label>
            <textarea id="improvement-textarea" rows={5} placeholder="Partilha as tuas sugestões…" style={{ ...fieldInput, resize: "none", fontFamily: F.dm, lineHeight: 1.6 }} value={form.improvement} onChange={setField("improvement")} />
          </div>
        );
      }
      if (current.id === "mensagem") {
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label htmlFor="love-textarea" style={label}>Deixa um elogio, crítica ou mensagem de apoio</label>
            <textarea id="love-textarea" rows={5} placeholder="Diz-nos o que quiseres…" style={{ ...fieldInput, resize: "none", fontFamily: F.dm, lineHeight: 1.6 }} value={form.love} onChange={setField("love")} />
          </div>
        );
      }
    }

    // ── Org steps ──
    if (role === "org") {
      if (current.id === "utilidade") {
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={label}>Isto seria útil para a vossa associação? *</p>
            {["Sim, muito!", "Provavelmente", "Talvez", "Não realmente"].map((opt) => {
              const active = form.helpful === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, helpful: opt }))}
                  className="form-option-btn"
                  style={{
                    padding: "16px 20px",
                    border: `2px solid ${active ? C.teal : C.divider}`,
                    background: active ? C.tealLight : "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: F.dm, fontSize: 16, fontWeight: active ? 600 : 400,
                    color: active ? C.teal : C.text,
                    transition: "all 0.15s",
                  }}
                >{opt}</button>
              );
            })}
          </div>
        );
      }
      if (current.id === "areas") {
        return (
          <fieldset style={{ border: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            <legend style={label}>Em que áreas precisam de ajuda?</legend>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
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
                      padding: "10px 20px", fontSize: 14, fontFamily: F.dm,
                      fontWeight: active ? 600 : 400,
                      cursor: "pointer",
                      border: `2px solid ${active ? C.teal : C.divider}`,
                      background: active ? C.tealLight : "transparent",
                      color: active ? C.teal : C.text,
                      transition: "all 0.15s",
                    }}
                  >{a}</button>
                );
              })}
            </div>
          </fieldset>
        );
      }
      if (current.id === "urgente") {
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label htmlFor="urgent-textarea" style={label}>Quais são as vossas tarefas mais urgentes?</label>
            <textarea id="urgent-textarea" rows={5} placeholder="Descreve os desafios mais urgentes da vossa organização…" style={{ ...fieldInput, resize: "none", fontFamily: F.dm, lineHeight: 1.6 }} value={form.urgentTasks} onChange={setField("urgentTasks")} />
          </div>
        );
      }
      if (current.id === "custos") {
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={label}>Quanto gastam por mês em serviços que voluntários poderiam ajudar?</p>
            {["Não gastamos", "Menos de €500/mês", "€500–€2.000/mês", "€2.000–€5.000/mês", "Mais de €5.000/mês"].map((opt) => {
              const active = form.monthlySpend === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, monthlySpend: opt }))}
                  className="form-option-btn"
                  style={{
                    padding: "16px 20px",
                    border: `2px solid ${active ? C.teal : C.divider}`,
                    background: active ? C.tealLight : "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: F.dm, fontSize: 16, fontWeight: active ? 600 : 400,
                    color: active ? C.teal : C.text,
                    transition: "all 0.15s",
                  }}
                >{opt}</button>
              );
            })}
          </div>
        );
      }
    }

    return null;
  }

  // ── Success screen ─────────────────────────────────────────
  if (submitted) {
    return (
      <Layout>
        <div className="form-page-split">
          <div className="form-page-hero" aria-hidden="true">
            <div className="form-page-hero-grain" />
            <div className="form-page-hero-content">
              <div style={{ width: 48, height: 3, background: C.orange }} />
              <h1 style={{
                fontFamily: F.sora, fontSize: "clamp(32px, 3.5vw, 52px)",
                fontWeight: 800, color: "#F9F4E8", lineHeight: 1.15, margin: 0,
              }}>
                Obrigado.
              </h1>
              <p style={{
                fontFamily: F.dm, fontSize: "clamp(15px, 1.3vw, 18px)",
                color: "rgba(249,244,232,0.7)", lineHeight: 1.7, margin: 0, maxWidth: 380,
              }}>
                A tua opinião vai ajudar-nos a construir algo melhor para todos.
              </p>
            </div>
          </div>
          <div className="form-page-form-panel">
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", padding: "64px 32px", textAlign: "center",
              gap: 24, minHeight: "60vh",
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: C.tealLight, display: "flex",
                alignItems: "center", justifyContent: "center",
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 style={{
                fontFamily: F.sora, fontSize: "clamp(22px, 2.5vw, 32px)",
                fontWeight: 800, color: C.burgundy, margin: 0,
              }}>
                Feedback enviado!
              </h2>
              <p style={{
                fontFamily: F.dm, fontSize: 16, color: C.text,
                lineHeight: 1.7, maxWidth: 400,
              }}>
                Obrigado por dedicares o teu tempo. Vamos usar o teu contributo para melhorar a plataforma Ginjas.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Main render ────────────────────────────────────────────
  return (
    <Layout>
      <div className="form-page-split">
        {/* ── Left panel: burgundy with texture ── */}
        <div className="form-page-hero">
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
              {current.title}
            </h1>
            <p style={{
              fontFamily: F.dm,
              fontSize: "clamp(15px, 1.3vw, 18px)",
              color: "rgba(249,244,232,0.7)",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 380,
            }}>
              {current.subtitle}
            </p>
            <div style={{ width: 48, height: 3, background: C.orange, marginTop: 8 }} />
          </div>
        </div>

        {/* ── Right panel: step wizard ── */}
        <div className="form-page-form-panel">
          <div style={{
            display: "flex", flexDirection: "column",
            padding: "clamp(32px, 5vw, 56px) clamp(24px, 4vw, 56px)",
            maxWidth: 640, width: "100%",
          }}>
            {/* Progress header */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{
                  fontFamily: F.dm, fontSize: 13, fontWeight: 600,
                  color: C.muted,
                }}>
                  Passo {step + 1} de {totalSteps}
                </span>
                <span style={{
                  fontFamily: F.dm, fontSize: 13, fontWeight: 600,
                  color: C.burgundy,
                }}>
                  {Math.round(progress)}%
                </span>
              </div>
              <div style={{
                height: 4,
                background: C.divider,
                overflow: "hidden",
              }}>
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    height: "100%",
                    background: C.burgundy,
                  }}
                />
              </div>
            </div>

            {/* Step content with animation */}
            <div style={{ flex: 1 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${role}-${step}`}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {renderStepContent()}

                  {error && (
                    <p role="alert" aria-live="assertive" style={{
                      fontFamily: F.dm, fontSize: 14, color: "#c0392b",
                      background: "#c0392b0a", padding: "12px 16px",
                      marginTop: 20, borderLeft: "3px solid #c0392b",
                    }}>
                      {error}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            {current.id !== "role" && (
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginTop: 48,
                paddingTop: 24,
                borderTop: `1px solid ${C.divider}`,
              }}>
                <button
                  type="button"
                  onClick={goBack}
                  className="form-back-btn"
                  style={{
                    fontFamily: F.dm, fontSize: 15, fontWeight: 600,
                    color: C.muted, background: "transparent",
                    border: "none", cursor: "pointer",
                    padding: "12px 0",
                    display: "flex", alignItems: "center", gap: 8,
                    transition: "color 0.2s",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Voltar
                </button>

                <button
                  type="button"
                  onClick={isLast ? handleSubmit : goNext}
                  disabled={loading}
                  className="form-submit-btn"
                  style={{
                    background: C.burgundy, color: "#F9F4E8",
                    fontFamily: F.sora, fontSize: 16, fontWeight: 700,
                    padding: "16px 40px",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    letterSpacing: "0.02em",
                    display: "flex", alignItems: "center", gap: 10,
                    transition: "background 0.2s",
                  }}
                >
                  {loading ? "A enviar…" : isLast ? "Enviar" : "Continuar"}
                  {!loading && !isLast && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
