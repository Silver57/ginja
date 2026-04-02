import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Layout from "./Layout";
import { supabase } from "./lib/supabase.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  cardBg: "#FFFFFF",
  whiteColor: "#FFFFFF",
  orange: "#F4A623",

};

const F = {
  sora: "'Sora', sans-serif",
  inter: "'Inter', sans-serif",
  dm: "'DM Sans', sans-serif",
};

const AREAS = ["Design & UX", "Tecnologia", "Marketing", "Jurídico", "Finanças", "Gestão", "Educação", "Saúde", "Outro"];

export default function GinjasPage() {
  const bgRef = useRef(null);
  const mosaicRef = useRef(null);

  useEffect(() => {
    // Make body transparent so the fixed background image shows through
    const prev = document.body.style.background;
    document.body.style.background = "transparent";
    return () => { document.body.style.background = prev; };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          start: "top top",
          end: "+=900",
          scrub: 1.5,
        },
      });

      gsap.fromTo(mosaicRef.current,
        { y: 120 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: mosaicRef.current,
            start: "top 100%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const [role, setRole] = useState("volunteer");
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

  function scrollToForm(selectedRole) {
    setRole(selectedRole);
    document.getElementById("join")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Layout noBg>
      {/* ── Fixed background image ─────────────────────
           Portalled to document.body so Layout's overflow-x
           doesn't clip it. GSAP zooms this on scroll.       */}
      {createPortal(
        <div
          ref={bgRef}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            backgroundImage: "url('/images/hero_section_2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
            transformOrigin: "center center",
          }}
        />,
        document.body
      )}

      {/* ── Hero — full viewport, content over fixed image ── */}
      <section style={{ position: "relative", height: "100vh", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "10vh" }}>

        <div className="mobile-stack" style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column", alignItems: "flex-start",
          justifyContent: "flex-start", gap: 32,
          padding: "var(--hero-padding)", width: "100%", maxWidth: "1440px",
        }}>
          <h1
            style={{
              fontFamily: F.sora, fontWeight: 800,
              color: C.burgundy, lineHeight: 1.25, letterSpacing: "-0.01em",
              display: "flex", flexDirection: "column", gap: 6, flex: 1,
            }}
          >
            <span style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>Há quem saiba fazer.</span>
            <span style={{ fontSize: "clamp(24px, 3.2vw, 44px)" }}>Há quem precise que aconteça.</span>
            <span style={{ fontSize: "clamp(20px, 2.5vw, 36px)" }}>Ainda não se encontraram.</span>
          </h1>
          <div style={{ display: "flex", flexDirection: "row", gap: 16, flexShrink: 0, flexWrap: "wrap" }}>
            <button onClick={() => scrollToForm("volunteer")} style={{
              background: C.teal, color: C.whiteColor, fontFamily: F.dm,
              fontSize: 16, fontWeight: 700, padding: "18px 40px",
              borderRadius: 0, border: "none", cursor: "pointer",
              boxShadow: "0 6px 24px rgba(63,167,150,0.35)",
              letterSpacing: "0.01em",
            }}>Sou Voluntário</button>
            <button onClick={() => scrollToForm("org")} style={{
              background: "transparent", color: C.burgundy, fontFamily: F.dm,
              fontSize: 16, fontWeight: 700, padding: "18px 40px",
              borderRadius: 0, border: `2px solid ${C.burgundy}`, cursor: "pointer",
              letterSpacing: "0.01em",
            }}>Sou uma Associação</button>
          </div>
        </div>
      </section>

      {/* ── Description ──────────────────────────────── */}
      <section style={{
        width: "90%", margin: "0 auto",
        padding: "clamp(48px, 7vw, 96px) 0 clamp(32px, 4vw, 56px)",
        display: "flex", flexDirection: "column", gap: 12,
      }}>
        <p style={{
          fontFamily: F.sora, fontWeight: 700,
          fontSize: "clamp(20px, 2.4vw, 30px)",
          color: C.burgundy, lineHeight: 1.35, margin: 0,
          maxWidth: 720,
        }}>
          Passamos a explicar
        </p>
        <p style={{
          fontFamily: F.dm, fontSize: "clamp(15px, 1.4vw, 18px)",
          color: C.muted, lineHeight: 1.7, margin: 0, maxWidth: 600,
        }}>
          Contabilistas, Advogados, Designers, Programadores… Todos têm uma capacidade especial para ajudar uma associação a crescer, mas aqueles que querem ajudar não sabem onde procurar.
        </p>
      </section>

      {/* ── How It Works ─────────────────────────────── */}
      <section ref={mosaicRef} style={{ width: "90%", margin: "0 auto clamp(60px, 8vw, 100px)" }}>
        <div className="mosaic-grid">
            <MosaicTile
              className="mosaic-tile-tall"
              img="/images/generated_image1.png"
              title="O desafio"
/*              paras={[
                ["Gerir uma associação social não é facil."],
              ]}*/
              bullets={[
                ["Labirinto burocratico: ", "Ainda não é simples ", {h:"criar uma associação."}],
                ["Apoio limitado: ", "Muitos dos mecanismos já disponiveis não conseguem dar ", {h:"apoio personalizado"}],
                  ["Gestão financeira", "É dificil gerir o financimento de uma associação sem ", {h:"conhecimento especializado"}],
                  ["Encontrar voluntários", "Saber onde encontrar voluntários com as competências certas é um desafio constante para as associações."],
              ]}
              bulletGap={28}
              bgColor="linear-gradient(158deg, #E4F6F3 0%, #9DD8D2 45%, #64B8B0 100%)"
            />

            {/* Tile 2a — top right, left half: text left, image right */}
            <MosaicTile
              className="mosaic-tile-right-a"
              layout="side"
              img="/images/casa.svg"
              title="Voluntários"
              paras={[
                ["Sabemos que a vida profissional nem sempre permite dedicar tempo a voluntariado, mas ", {h:"pequenas contribuições regulares"}," podem fazer uma grande diferença."],
              ]}
              bgColor="linear-gradient(122deg, #F9EEF3 0%, #E8B4CC 50%, #D48CAC 100%)"
              decorImg="/images/casa.svg"
              fillImage
              imageFit="contain"
              imageObjPosition="right center"
              imageScale={1.5}
              imageFlex={0.75}
            />

            {/* Tile 2b — text top-left full width, image bottom-left corner */}
            <MosaicTile
              className="mosaic-tile-right-b"
              img="/images/borboletas.svg"
              title="Associações"
              paras={[
                ["A missão da associação deve ser a sua maior preocupação. ", {h:"Gerir um site, campanhas ou contabilidade não deveria ser um obstáculo."}],
              ]}
              bgColor="linear-gradient(148deg, #F8C84A 0%, #FBD987 50%, #FEF5E0 100%)"
              decorImg="/images/borboletas.svg"
              fillImage
              imageFit="contain"
              imageObjPosition="left bottom"
              imageScale={1.6}
              imageFlex={0.75}
            />

            {/* Tile 3 — bottom right */}
            <MosaicTile
              className="mosaic-tile-right"
              layout="side-reverse"
              img="/images/generated_image3.svg"
              title="O que fazemos"
              paras={[
                [{h:"Criamos a ponte entre associações e voluntários."}, " Uma plataforma onde associações podem encontrar voluntários com as competências de que precisam, e voluntários podem encontrar associações que precisam da sua ajuda. Disponiiblizamo também ferramentas para que o impacto seja máximo"],
              ]}
              bgColor="linear-gradient(132deg, #C4698A 0%, #DC98B2 45%, #F4E0EA 100%)"
              decorImg="/images/generated_image3.png"
              fillImage
              imageFit="cover"
              imageObjPosition="center center"
              imageScale={0.75}
              imageFlex={0.7}
            />

            {/* Tile 4 — row 3, left */}
            <MosaicTile
              className="mosaic-tile-bottom-left"
              layout="side"
              img="/images/generated_image2.png"
              title="A plataforma"
              paras={[
                ["Não somos apenas uma plataforma de encontro entre voluntários e associações. Nosso objetivo é tornar o voluntariado mais eficaz e impactante, ajudando a conectar pessoas com as causas que mais importam para elas."],
              ]}
              bgColor="linear-gradient(118deg, #EAF7F5 0%, #AEDBD7 50%, #74BDB8 100%)"
              decorImg="/images/generated_image2.png"
              fillImage
              imageFit="cover"
              imageObjPosition="center center"
              imageScale={0.75}
            />

            {/* Tile 5 — row 3, right */}
            <MosaicTile
              className="mosaic-tile-bottom-right"
              layout="side"
              title="Artigos e recursos"
              paras={[
                ["Temos também uma base de recursos por onde as associações podem logo começar a aprender e a melhorar. Desde criar um site a gerir as redes sociais, a nossa secção de artigos tem guias práticos e dicas para ajudar as associações a crescerem e terem mais impacto."],
              ]}
              bgColor="linear-gradient(142deg, #EE9660 0%, #F5BF90 45%, #FDEEDE 100%)"
            />
        </div>
      </section>

      {/* ── Join Section ─────────────────────────────── */}
      <section id="join" style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 32, padding: "var(--section-padding)",
        background: C.white,
        position: "relative", zIndex: 1,
      }}>
        {/* Section intro */}
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
          <h2 style={{ fontFamily: F.sora, fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 800, color: C.burgundy, lineHeight: 1.6 }}>
           Ainda estamos a começar<br />Ajuda-nos a construir isto juntos.
          </h2>
        </div>

        {/* Role toggle */}
        <div
          role="tablist"
          aria-label="Tipo de utilizador"
          style={{ display: "flex", background: "rgba(249, 244, 232, 0.7)", borderRadius: 999, padding: 4, gap: 4, border: `1px solid ${C.divider}` }}
        >
          {[
            { value: "volunteer", label: "Sou Voluntário" },
            { value: "org",       label: "Sou uma Associação" },
          ].map(({ value, label }) => (
            <button
              key={value}
              id={`tab-${value}`}
              role="tab"
              aria-selected={role === value}
              aria-controls={`panel-${value}`}
              onClick={() => setRole(value)}
              style={{
                fontFamily: F.sora, fontSize: 14, fontWeight: 600,
                padding: "10px 24px", borderRadius: 999, border: "none", cursor: "pointer",
                background: role === value ? C.teal : "transparent",
                color: role === value ? C.whiteColor : C.subtle,
                transition: "all 0.15s",
              }}
            >{label}</button>
          ))}
        </div>

        {/* Dynamic subheading */}
        <p style={{ fontFamily: F.dm, fontSize: 15, color: C.subtle, lineHeight: 1.7, maxWidth: 460, textAlign: "center", marginTop: -16 }}>
          {role === "volunteer"
            ? "Diz-nos quem és e partilha a tua visão. O teu feedback vai moldar a plataforma."
            : "Conta-nos o que a vossa associação precisa. O vosso feedback é essencial para nós."}
        </p>

        {/* Form Card */}
        <form
          id={`panel-${role}`}
          role="tabpanel"
          aria-labelledby={`tab-${role}`}
          onSubmit={handleSubmit}
          className="mobile-full-width"
          style={{
            background: C.whiteColor, borderRadius: 20, padding: "clamp(24px, 4vw, 40px)",
            display: "flex", flexDirection: "column", gap: 24, width: "100%", maxWidth: 680,
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            border: `1px solid ${C.divider}`,
          }}
        >
          {/* Volunteer fields */}
          {role === "volunteer" && (<>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <span style={{ fontFamily: F.sora, fontSize: 13, fontWeight: 700, color: C.teal, letterSpacing: 1.5, textTransform: "uppercase" }}>Os teus dados</span>
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
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontFamily: F.sora, fontSize: 13, fontWeight: 700, color: C.teal, letterSpacing: 1.5, textTransform: "uppercase" }}>A tua opinião</span>
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
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <span style={{ fontFamily: F.sora, fontSize: 13, fontWeight: 700, color: C.teal, letterSpacing: 1.5, textTransform: "uppercase" }}>A vossa associação</span>
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
                        style={{
                          padding: "6px 14px", borderRadius: 999, fontSize: 13, fontFamily: F.dm, cursor: "pointer",
                          border: `1px solid ${active ? C.teal : "#E2E8F0"}`,
                          background: active ? C.tealLight : "transparent",
                          color: active ? C.teal : C.subtle,
                          transition: "all 0.12s",
                        }}
                      >{a}</button>
                    );
                  })}
                </div>
              </fieldset>
            </div>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontFamily: F.sora, fontSize: 13, fontWeight: 700, color: C.teal, letterSpacing: 1.5, textTransform: "uppercase" }}>Detalhes</span>
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
                  <option>€2.000–€5.000/mês</option>
                  <option>Mais de €5.000/mês</option>
                </select>
              </div>
            </div>
          </>)}

          {error && (
            <p role="alert" aria-live="assertive" aria-atomic="true" style={{ fontFamily: F.dm, fontSize: 13, color: "#c0392b", textAlign: "center" }}>{error}</p>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" disabled={loading} style={{
              background: C.burgundy, color: C.whiteColor,
              fontFamily: F.sora, fontSize: 15, fontWeight: 700,
              padding: "14px 48px", borderRadius: 999,
              border: "none", cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              boxShadow: "0 4px 16px rgba(139,30,63,0.2)",
            }}>
              {loading ? "A enviar…" : "Enviar feedback"}
            </button>
          </div>
        </form>

        {submitted && (
          <div role="status" aria-live="polite" aria-atomic="true" style={{
            display: "flex", alignItems: "center", gap: 10,
            background: C.tealLight, color: C.teal,
            fontFamily: F.dm, fontSize: 14, fontWeight: 600,
            padding: "14px 28px", borderRadius: 12,
          }}>
            <CheckCircleIcon />
            Obrigado pelo feedback! A tua opinião vai ajudar-nos a construir algo melhor.
          </div>
        )}
      </section>
    </Layout>
  );
}

// ── Mosaic tile ────────────────────────────────────────────

function MosaicTile({ className, img, title, paras = [], bullets = [], bulletsTitle, bgColor, decorImg, layout = "top-bottom", imagePadding = "16px", imageSize = "auto", fillImage = false, imageFit = "cover", imageObjPosition = "center center", imageScale = 1, bulletGap = 20, imageFlex = 1 }) {
  const dark = !!bgColor;
  const textColor = dark ? C.dark : "#fff";
  const bodyColor = dark ? "rgba(26,26,26,0.8)" : "rgba(255,255,255,0.85)";
  const isSide = layout === "side" || layout === "side-reverse";
  const isReverse = layout === "side-reverse";

  const textPane = (
    <div style={{
      flex: 1, padding: isSide ? "28px 28px" : "28px 28px 20px", minWidth: 0,
      display: "flex", flexDirection: "column", gap: 8,
      justifyContent: "flex-start",
      zIndex: 1,
    }}>
<h3 style={{
        fontFamily: F.sora, fontSize: dark ? "clamp(24px, 2.2vw, 34px)" : "clamp(20px, 1.8vw, 28px)", fontWeight: 700,
        color: textColor, lineHeight: 1.25, margin: 0,
      }}>{title}</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
        {paras.map((segments, i) => (
          <p key={i} style={{
            fontFamily: F.dm, fontSize: dark ? "clamp(14px, 1.15vw, 17px)" : "clamp(13px, 1.05vw, 16px)",
            color: bodyColor, lineHeight: 1.65, margin: 0,
          }}>
            {segments.map((s, j) =>
              typeof s === "string"
                ? s
                : <strong key={j} style={{ color: textColor, fontWeight: 600 }}>{s.h}</strong>
            )}
          </p>
        ))}
        {bulletsTitle && (
          <p style={{
            fontFamily: F.sora, fontSize: dark ? "clamp(14px, 1.1vw, 16px)" : "clamp(13px, 1.0vw, 15px)",
            fontWeight: 600, color: textColor, margin: "20px 0 0px",
          }}>
            {bulletsTitle}
            <br />
          </p>
        )}
        {bullets.length > 0 && (
          <ul style={{
            margin: bulletsTitle ? "0" : "20px 0 0", paddingLeft: 0, listStylePosition: "inside", display: "flex", flexDirection: "column", gap: bulletGap,
            fontFamily: F.dm, fontSize: dark ? "clamp(13px, 1.05vw, 16px)" : "clamp(12px, 1.0vw, 15px)",
            color: bodyColor, lineHeight: 1.5,
          }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ paddingLeft: 4 }}>
                {Array.isArray(b) ? b.map((s, j) =>
                  typeof s === "string"
                    ? (j === 0 ? <><strong key={j} style={{ color: textColor, fontWeight: 700 }}>{s}</strong><br /></> : s)
                    : <strong key={j} style={{ color: textColor, fontWeight: 600 }}>{s.h}</strong>
                ) : b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  const imagePane = (
    <div style={{
      flex: imageFlex, minWidth: 0, minHeight: 0,
      position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: fillImage ? 0 : imagePadding,
      zIndex: 1,
      overflow: "hidden",
    }}>
      {decorImg && (fillImage ? (
        <img
          src={decorImg}
          alt=""
          role="presentation"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: imageFit, objectPosition: imageObjPosition, pointerEvents: "none", transform: imageScale !== 1 ? `scale(${imageScale})` : undefined, transformOrigin: imageObjPosition }}
        />
      ) : (
        <img
          src={decorImg}
          alt=""
          role="presentation"
          style={{ maxWidth: "100%", maxHeight: "100%", width: imageSize, height: imageSize, objectFit: "contain", pointerEvents: "none" }}
        />
      ))}
    </div>
  );

  return (
    <div
      className={className}
      style={{
        position: "relative", borderRadius: 16, overflow: "hidden",
        display: "flex",
        flexDirection: isSide ? "row" : "column",
      }}
    >
      {bgColor && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: bgColor.includes("gradient") ? bgColor : undefined,
          backgroundColor: bgColor.includes("gradient") ? undefined : bgColor,
        }} />
      )}

      {/* Full-bleed background image (only when no bgColor) */}
      {!bgColor && (
        <img
          src={img}
          alt=""
          role="presentation"
          loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        />
      )}

      {/* Gradient overlay (only when no bgColor) */}
      {!bgColor && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: "linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.3) 55%, transparent 100%)",
        }} />
      )}

      {/* Grain texture overlay */}
      <div className="mosaic-tile-texture" />

      {isReverse
        ? <>{decorImg && imagePane}{textPane}</>
        : <>{textPane}{decorImg && imagePane}</>
      }
    </div>
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

export function Field({ label, placeholder, type = "text", value, onChange, required }) {
  const id = label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
      <label htmlFor={id} style={labelStyle}>{label}{required && <span aria-hidden="true" style={{ color: "#c0392b", marginLeft: 2 }}>*</span>}</label>
      <input id={id} type={type} placeholder={placeholder} style={inputStyle} value={value ?? ""} onChange={onChange} required={required} aria-required={required ? "true" : undefined} />
    </div>
  );
}

export function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #EAEAEA", margin: 0 }} />;
}

function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
