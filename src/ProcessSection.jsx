import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { C, F } from "./tokens";

// ── Step data ────────────────────────────────────────────────
const volunteerSteps = [
  {
    number: "01",
    title: "Inscreve-te",
    summary: "Preenche um formulário rápido com as tuas competências, interesses e disponibilidade.",
    detail: "O formulário demora menos de 5 minutos. Pedimos-te que indiques a tua área profissional, as competências que queres partilhar, e quantas horas por semana podes dedicar. Podes alterar estes dados a qualquer momento.",
    accent: C.teal,
  },
  {
    number: "02",
    title: "Recebe propostas",
    summary: "O nosso sistema analisa o teu perfil e sugere associações que precisam exatamente do que tu sabes fazer.",
    detail: "Cruzamos as tuas competências com as necessidades reais das associações registadas. Recebes sugestões personalizadas por e-mail, com informação sobre cada projeto, a missão da associação e o tipo de envolvimento esperado.",
    accent: C.orange,
  },
  {
    number: "03",
    title: "Escolhe e conecta",
    summary: "Escolhe o projeto que mais te motiva e entra em contacto direto com a associação.",
    detail: "Tens total liberdade para escolher o projeto que mais te inspira. Facilitamos a primeira conversa entre ti e a associação para alinhar expectativas, definir prazos e combinar a forma de trabalho.",
    accent: C.burgundy,
  },
  {
    number: "04",
    title: "Faz a diferença",
    summary: "Começa a colaborar, acompanha o impacto do teu trabalho e cresce junto com a causa.",
    detail: "A partir daqui, o trabalho é teu e da associação. Acompanhamos o progresso à distância e estamos disponíveis para ajudar caso surjam dúvidas. No final, ambos avaliam a experiência para melhorarmos o processo.",
    accent: C.teal,
  },
];

const associationSteps = [
  {
    number: "01",
    title: "Regista a associação",
    summary: "Conta-nos sobre a vossa missão, desafios e as áreas onde mais precisam de apoio.",
    detail: "O registo é simples e gratuito. Precisamos de conhecer a vossa associação: missão, dimensão, área de atuação. Quanto mais detalhe derem, melhores serão as sugestões.",
    accent: C.burgundy,
  },
  {
    number: "02",
    title: "Define as necessidades",
    summary: "Especifica as tarefas, projetos ou competências que procuram. Desde design a contabilidade.",
    detail: "Criem pedidos concretos: precisam de um site novo? De apoio jurídico pontual? De alguém que vos ajude a organizar a contabilidade? Cada pedido gera um projeto com descrição, prazo estimado e nível de envolvimento necessário.",
    accent: C.orange,
  },
  {
    number: "03",
    title: "Recebe voluntários",
    summary: "Nós encontramos profissionais com as competências certas e apresentamo-los diretamente.",
    detail: "Fazemos a triagem e seleção de perfis adequados ao vosso pedido. Apresentamos os candidatos com um resumo das suas competências e disponibilidade. Vocês decidem com quem querem avançar.",
    accent: C.teal,
  },
  {
    number: "04",
    title: "Cresçam juntos",
    summary: "Colaborem em projetos concretos e vejam a vossa associação ganhar novas capacidades.",
    detail: "O voluntário integra-se no vosso ritmo. Ao longo da colaboração, a associação ganha não só o trabalho feito mas também conhecimento interno que fica para o futuro. É crescimento real e duradouro.",
    accent: C.orange,
  },
];

// ── Single step row ─────────────────────────────────────────
function StepRow({ step, index, isOpen, onToggle }) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      onMouseEnter={onToggle}
      style={{
        cursor: "pointer",
        borderBottom: `1px solid ${C.dark}12`,
        outline: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "clamp(16px, 3vw, 40px)",
          padding: "28px 0 20px",
          transition: "padding 0.3s ease",
        }}
      >
        {/* Step number */}
        <span
          style={{
            fontFamily: F.sora,
            fontSize: "clamp(13px, 1.2vw, 15px)",
            fontWeight: 600,
            color: isOpen ? step.accent : C.text,
            minWidth: 28,
            transition: "color 0.3s ease",
            letterSpacing: "0.04em",
          }}
        >
          {step.number}
        </span>

        {/* Title + content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontFamily: F.sora,
              fontSize: "clamp(20px, 2.2vw, 30px)",
              fontWeight: 700,
              color: isOpen ? step.accent : C.dark,
              margin: 0,
              lineHeight: 1.3,
              transition: "color 0.3s ease",
            }}
          >
            {step.title}
          </h3>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ paddingTop: 14, paddingBottom: 8, maxWidth: 620 }}>
                  <p
                    style={{
                      fontFamily: F.dm,
                      fontSize: "clamp(15px, 1.2vw, 17px)",
                      color: C.text,
                      lineHeight: 1.7,
                      margin: "0 0 10px",
                    }}
                  >
                    {step.summary}
                  </p>
                  <p
                    style={{
                      fontFamily: F.dm,
                      fontSize: "clamp(14px, 1.1vw, 16px)",
                      color: C.text,
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ── Main exported component ──────────────────────────────────
export default function ProcessSection() {
  const [activeRole, setActiveRole] = useState("volunteer");
  const [openStep, setOpenStep] = useState(0);

  const steps = activeRole === "volunteer" ? volunteerSteps : associationSteps;

  return (
    <section
      style={{
        width: "90%",
        maxWidth: 860,
        margin: "0 auto",
        padding: "clamp(64px, 8vw, 120px) 0",
        display: "flex",
        flexDirection: "column",
        gap: 48,
      }}
    >
      {/* ── Section header ── */}
      <h2
        style={{
          fontFamily: F.sora,
          fontSize: "clamp(28px, 3.2vw, 42px)",
          fontWeight: 800,
          color: C.burgundy,
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        Como funciona
      </h2>

      {/* ── Role toggle ── */}
      <div
        role="tablist"
        aria-label="Tipo de utilizador"
        style={{
          display: "flex",
          gap: 0,
          borderBottom: `2px solid ${C.dark}10`,
          alignSelf: "flex-start",
        }}
      >
        {[
          { key: "volunteer", label: "Sou Voluntário" },
          { key: "association", label: "Sou Associação" },
        ].map((r) => (
          <button
            key={r.key}
            role="tab"
            aria-selected={activeRole === r.key}
            onClick={() => {
              setActiveRole(r.key);
              setOpenStep(0);
            }}
            style={{
              position: "relative",
              padding: "12px 28px",
              minHeight: 44,
              border: "none",
              cursor: "pointer",
              fontFamily: F.dm,
              fontSize: 15,
              fontWeight: activeRole === r.key ? 700 : 500,
              background: "transparent",
              color: activeRole === r.key ? C.burgundy : C.muted,
              transition: "color 0.25s",
            }}
          >
            {r.label}
            {activeRole === r.key && (
              <motion.div
                layoutId="tabIndicator"
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: C.burgundy,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Steps list ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRole}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          role="tabpanel"
          style={{
            borderTop: `1px solid ${C.dark}12`,
          }}
        >
          {steps.map((step, i) => (
            <StepRow
              key={i}
              step={step}
              index={i}
              isOpen={openStep === i}
              onToggle={() => setOpenStep(i)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
