import Layout from "../Layout";

const C = { teal: "#3FA796", burgundy: "#8B1E3F", dark: "#1F1F1F", muted: "#5A5A5A", subtle: "#666", divider: "#EAEAEA", heroBg: "linear-gradient(180deg, #FFF8E7 0%, #FFFDF5 45%, #F0F7E4 100%)" };
const F = { sora: "'Sora', sans-serif", inter: "'Inter', sans-serif", dm: "'DM Sans', sans-serif" };

const values = [
  { emoji: "🤝", title: "Colaboração", desc: "Acreditamos que grandes mudanças acontecem quando pessoas e organizações trabalham juntas." },
  { emoji: "💡", title: "Propósito", desc: "Cada habilidade aplicada com intenção pode transformar comunidades inteiras." },
  { emoji: "🌱", title: "Impacto Duradouro", desc: "Focamos em conexões que geram resultados mensuráveis e sustentáveis." },
  { emoji: "🔓", title: "Transparência", desc: "Operamos com abertura total — para voluntários, organizações e a sociedade." },
];

export default function SobrePage() {
  return (
    <Layout>
      {/* Hero */}
      <section style={{ background: C.heroBg, padding: "var(--section-padding)", textAlign: "center" }}>
        <h1 style={{ fontFamily: F.sora, fontSize: "clamp(32px, 8vw, 44px)", fontWeight: 800, color: C.dark, marginBottom: 20 }}>
          Sobre o Ginja
        </h1>
        <p style={{ fontFamily: F.dm, fontSize: 19, color: C.muted, lineHeight: 1.7, maxWidth: 620, margin: "0 auto" }}>
          Nascemos da crença de que o talento humano, quando direcionado com propósito, é o recurso mais
          poderoso para transformar o mundo.
        </p>
      </section>

      {/* Story */}
      <section style={{ background: "#FFFFFF", padding: "var(--section-padding)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontFamily: F.sora, fontSize: 30, fontWeight: 700, color: C.dark, marginBottom: 20 }}>
            Nossa História
          </h2>
          <p style={{ fontFamily: F.inter, fontSize: 16, color: C.subtle, lineHeight: 1.8, marginBottom: 16 }}>
            O Ginja surgiu em 2025 quando percebemos uma lacuna enorme: de um lado, profissionais qualificados
            buscando maneiras de contribuir com a sociedade; de outro, organizações de impacto sem acesso a
            essas habilidades.
          </p>
          <p style={{ fontFamily: F.inter, fontSize: 16, color: C.subtle, lineHeight: 1.8 }}>
            Decidimos construir a ponte. Uma plataforma simples, humana e eficaz — onde a conexão entre
            competência e necessidade acontece de forma natural e estruturada.
          </p>
        </div>
      </section>

      {/* Values */}
      <style>{`
        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (max-width: 1024px) {
          .values-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .values-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <section style={{ background: "#FAF7F5", padding: "var(--section-padding)" }}>
        <h2 style={{ fontFamily: F.sora, fontSize: 30, fontWeight: 700, color: C.dark, textAlign: "center", marginBottom: 48 }}>
          Nossos Valores
        </h2>
        <div className="values-grid">
          {values.map((v) => (
            <div key={v.title} style={{
              background: "#FFFFFF", borderRadius: 16, padding: 32,
              border: `1px solid ${C.divider}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{v.emoji}</div>
              <h3 style={{ fontFamily: F.sora, fontSize: 17, fontWeight: 700, color: C.dark, marginBottom: 10 }}>{v.title}</h3>
              <p style={{ fontFamily: F.inter, fontSize: 14, color: C.subtle, lineHeight: 1.65 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </Layout>
  );
}
