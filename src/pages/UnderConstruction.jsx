import { Link } from "react-router-dom";
import Layout from "../Layout";

const C = {
  burgundy: "#8B1E3F",
  teal: "#3FA796",
  dark: "#1A1A1A",
  subtle: "#6B6B6B",
  divider: "#E8E8E8",
  heroBg: "#F9F4E8",
};
const F = { sora: "'Sora', sans-serif", dm: "'DM Sans', sans-serif" };

export default function UnderConstruction({ title }) {
  return (
    <Layout>
      <section style={{
        background: C.heroBg, minHeight: "70vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "80px 24px", textAlign: "center", gap: 24,
      }}>
        <span style={{
          fontFamily: F.sora, fontSize: 11, fontWeight: 700,
          color: C.teal, letterSpacing: 2.5, textTransform: "uppercase",
        }}>
          {title}
        </span>

        <h1 style={{
          fontFamily: F.sora, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800,
          color: C.burgundy, lineHeight: 1.2, maxWidth: 520,
        }}>
          Estamos a construir isto com cuidado.
        </h1>

        <p style={{
          fontFamily: F.dm, fontSize: 16, color: C.subtle,
          lineHeight: 1.7, maxWidth: 440,
        }}>
          Esta página ainda não está pronta, mas o Ginjas está a crescer. Em breve terás mais para ler aqui.
        </p>

        <div style={{
          width: 48, height: 2, background: C.teal, borderRadius: 2, margin: "4px 0",
        }} />

        <Link to="/" style={{
          fontFamily: F.sora, fontSize: 14, fontWeight: 700,
          color: C.teal, textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: 6,
        }}>
          ← Voltar ao início
        </Link>
      </section>
    </Layout>
  );
}
