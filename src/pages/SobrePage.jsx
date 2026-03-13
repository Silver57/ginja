import Layout from "../Layout";

const C = { teal: "#3FA796", burgundy: "#8B1E3F", dark: "#1F1F1F", muted: "#5A5A5A", subtle: "#666", divider: "#EAEAEA", heroBg: "linear-gradient(180deg, #FFF8E7 0%, #FFFDF5 45%, #F0F7E4 100%)" };
const F = { sora: "'Sora', sans-serif", inter: "'Inter', sans-serif", dm: "'DM Sans', sans-serif" };

const team = [
  { name: "Ana Costa", role: "Co-fundadora & CEO", bio: "10 anos em impacto social e tecnologia cívica." },
  { name: "Rafael Mendes", role: "Co-fundador & CTO", bio: "Engenheiro de software com paixão por produtos de impacto." },
  { name: "Sofia Alves", role: "Diretora de Parcerias", bio: "Especialista em conexão entre setor privado e OSCs." },
];

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
      <section style={{ background: C.heroBg, padding: "72px 80px 64px", textAlign: "center" }}>
        <h1 style={{ fontFamily: F.sora, fontSize: 44, fontWeight: 800, color: C.dark, marginBottom: 20 }}>
          Sobre o Ginja
        </h1>
        <p style={{ fontFamily: F.dm, fontSize: 19, color: C.muted, lineHeight: 1.7, maxWidth: 620, margin: "0 auto" }}>
          Nascemos da crença de que o talento humano, quando direcionado com propósito, é o recurso mais
          poderoso para transformar o mundo.
        </p>
      </section>

      {/* Story */}
      <section style={{ background: "#FFFFFF", padding: "72px 80px" }}>
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
      <section style={{ background: "#FAF7F5", padding: "72px 80px" }}>
        <h2 style={{ fontFamily: F.sora, fontSize: 30, fontWeight: 700, color: C.dark, textAlign: "center", marginBottom: 48 }}>
          Nossos Valores
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
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

      {/* Team */}
      <section style={{ background: "#FFFFFF", padding: "72px 80px" }}>
        <h2 style={{ fontFamily: F.sora, fontSize: 30, fontWeight: 700, color: C.dark, textAlign: "center", marginBottom: 48 }}>
          Time Fundador
        </h2>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
          {team.map((m) => (
            <div key={m.name} style={{
              background: "#FAF7F5", borderRadius: 16, padding: "32px 28px",
              width: 240, textAlign: "center", border: `1px solid ${C.divider}`,
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.teal}, ${C.burgundy})`,
                margin: "0 auto 16px",
              }} />
              <p style={{ fontFamily: F.sora, fontSize: 16, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{m.name}</p>
              <p style={{ fontFamily: F.inter, fontSize: 13, fontWeight: 600, color: C.teal, marginBottom: 10 }}>{m.role}</p>
              <p style={{ fontFamily: F.inter, fontSize: 13, color: C.subtle, lineHeight: 1.6 }}>{m.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}