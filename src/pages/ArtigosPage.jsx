import Layout from "../Layout";
import { Link } from "react-router-dom";

const C = {
  teal: "#3FA796",
  burgundy: "#8B1E3F",
  dark: "#1A1A1A",
  text: "#2D2D2D",
  muted: "#555555",
  subtle: "#6B6B6B",
  white: "#F9F4E8",
  whiteColor: "#FFFFFF",
  divider: "#E8E8E8",
};

const F = {
  sora: "'Sora', sans-serif",
  inter: "'Inter', sans-serif",
  dm: "'DM Sans', sans-serif",
};

const articles = [
  {
    slug: "site-para-associacoes",
    title: "Como criar um site para a tua associação (sem saber programar)",
    excerpt:
      "Um guia directo ao assunto sobre ferramentas modernas, domínios, alojamento e SEO — escrito por quem já trotou por muitos prados digitais.",
    author: "Ginja",
    authorRole: "Cavalo de estimação dos Ginjas",
    date: "Março 2026",
    image: "/images/Cavalinho.png",
    readTime: "5 min",
  },
];

export default function ArtigosPage() {
  return (
    <Layout>
      <section style={{ padding: "var(--section-padding)", background: C.white, minHeight: "60vh" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>
          <div>
            <h1
              style={{
                fontFamily: F.sora,
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 800,
                color: C.burgundy,
                marginBottom: 12,
              }}
            >
              Artigos
            </h1>
            <p style={{ fontFamily: F.dm, fontSize: 17, color: C.subtle, lineHeight: 1.7 }}>
              Recursos práticos para associações e organizações sem fins lucrativos.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {articles.map((a) => (
              <Link
                key={a.slug}
                to={`/artigos/${a.slug}`}
                style={{ textDecoration: "none" }}
              >
                <article
                  style={{
                    background: C.whiteColor,
                    borderRadius: 20,
                    overflow: "hidden",
                    border: `1px solid ${C.divider}`,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    display: "flex",
                    flexDirection: "row",
                    transition: "box-shadow 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.13)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <img
                    src={a.image}
                    alt={a.author}
                    style={{
                      width: 200,
                      minWidth: 200,
                      height: "auto",
                      objectFit: "cover",
                      objectPosition: "top center",
                      display: "block",
                    }}
                  />
                  <div style={{ padding: "32px 36px", display: "flex", flexDirection: "column", gap: 14, justifyContent: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span
                        style={{
                          fontFamily: F.sora,
                          fontSize: 11,
                          fontWeight: 700,
                          color: C.teal,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                        }}
                      >
                        {a.date}
                      </span>
                      <span style={{ color: C.divider }}>·</span>
                      <span style={{ fontFamily: F.inter, fontSize: 12, color: C.subtle }}>{a.readTime} de leitura</span>
                    </div>
                    <h2
                      style={{
                        fontFamily: F.sora,
                        fontSize: "clamp(18px, 2vw, 24px)",
                        fontWeight: 700,
                        color: C.dark,
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                    >
                      {a.title}
                    </h2>
                    <p style={{ fontFamily: F.dm, fontSize: 15, color: C.subtle, lineHeight: 1.7, margin: 0 }}>
                      {a.excerpt}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                      <span style={{ fontFamily: F.inter, fontSize: 13, fontWeight: 600, color: C.burgundy }}>
                        por {a.author}
                      </span>
                      <span style={{ fontFamily: F.inter, fontSize: 12, color: C.subtle }}>— {a.authorRole}</span>
                    </div>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontFamily: F.sora,
                        fontSize: 13,
                        fontWeight: 700,
                        color: C.teal,
                        marginTop: 4,
                      }}
                    >
                      Ler artigo →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
