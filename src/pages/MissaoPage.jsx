import Layout from "../Layout";

const C = { teal: "#3FA796", burgundy: "#8B1E3F", dark: "#1F1F1F", muted: "#5A5A5A", subtle: "#666", divider: "#EAEAEA", heroBg: "linear-gradient(180deg, #FFF8E7 0%, #FFFDF5 45%, #F0F7E4 100%)" };
const F = { sora: "'Sora', sans-serif", inter: "'Inter', sans-serif", dm: "'DM Sans', sans-serif" };

const pillars = [
  {
    number: "01",
    title: "Acesso democratizado ao talento",
    desc: "Organizações de impacto muitas vezes não têm recursos para contratar especialistas. O Ginja muda isso, conectando-as gratuitamente com profissionais voluntários.",
  },
  {
    number: "02",
    title: "Voluntariado com significado",
    desc: "Não queremos apenas 'horas doadas'. Queremos projetos reais, com escopo claro, onde o voluntário veja o impacto direto do seu trabalho.",
  },
  {
    number: "03",
    title: "Comunidade de impacto",
    desc: "Cada conexão feita no Ginja fortalece uma rede mais ampla de pessoas comprometidas com um mundo melhor.",
  },
];

const stats = [
  { value: "500+", label: "Voluntários na lista de espera" },
  { value: "120+", label: "Organizações cadastradas" },
  { value: "15", label: "Países representados" },
  { value: "2025", label: "Ano de fundação" },
];

export default function MissaoPage() {
  return (
    <Layout>
      {/* Hero */}
      <section style={{ background: C.heroBg, padding: "72px 80px 64px", textAlign: "center" }}>
        <h1 style={{ fontFamily: F.sora, fontSize: 44, fontWeight: 800, color: C.dark, marginBottom: 20 }}>
          Nossa Missão
        </h1>
        <p style={{ fontFamily: F.dm, fontSize: 19, color: C.muted, lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
          Democratizar o acesso a habilidades profissionais para organizações que transformam vidas —
          construindo pontes entre competência e propósito.
        </p>
      </section>

      {/* Stats */}
      <section style={{ background: C.teal, padding: "56px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-around", maxWidth: 1000, margin: "0 auto" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: F.sora, fontSize: 40, fontWeight: 800, color: "#FFFFFF", marginBottom: 6 }}>{s.value}</p>
              <p style={{ fontFamily: F.inter, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section style={{ background: "#FFFFFF", padding: "72px 80px" }}>
        <h2 style={{ fontFamily: F.sora, fontSize: 30, fontWeight: 700, color: C.dark, marginBottom: 48, textAlign: "center" }}>
          Os Pilares do Ginja
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 800, margin: "0 auto" }}>
          {pillars.map((p) => (
            <div key={p.number} style={{
              display: "flex", gap: 28, alignItems: "flex-start",
              background: "#FAF7F5", borderRadius: 16, padding: "32px 36px",
              border: `1px solid ${C.divider}`,
            }}>
              <span style={{ fontFamily: F.sora, fontSize: 36, fontWeight: 800, color: C.teal, opacity: 0.3, lineHeight: 1 }}>
                {p.number}
              </span>
              <div>
                <h3 style={{ fontFamily: F.sora, fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontFamily: F.inter, fontSize: 15, color: C.subtle, lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section style={{ background: "#FAF7F5", padding: "72px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontFamily: F.sora, fontSize: 30, fontWeight: 700, color: C.dark, marginBottom: 20 }}>
            Nossa Visão
          </h2>
          <p style={{ fontFamily: F.inter, fontSize: 17, color: C.subtle, lineHeight: 1.8, marginBottom: 12 }}>
            Imaginamos um mundo onde nenhuma organização de impacto deixa de crescer por falta de acesso a
            expertise — e onde todo profissional tem a oportunidade de deixar uma marca positiva no mundo.
          </p>
          <p style={{ fontFamily: F.inter, fontSize: 17, color: C.subtle, lineHeight: 1.8 }}>
            O Ginja é o caminho para esse mundo.
          </p>
        </div>
      </section>
    </Layout>
  );
}