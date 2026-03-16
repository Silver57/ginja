import { Link, useNavigate } from "react-router-dom";

const C = {
  teal: "#3FA796",
  burgundy: "#8B1E3F",
  orange: "#F4A623",
  white: "#FFFFFF",
  faint: "#999999",
  footerBg: "#1F1F1F",
  footerDivider: "#333333",
};

const F = {
  sora: "'Sora', sans-serif",
  inter: "'Inter', sans-serif",
};

export default function Layout({ children }) {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=DM+Sans:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --nav-padding: 14px 64px;
          --section-padding: 56px 64px;
          --footer-padding: 40px 64px;
          --section-gap: 56px;
          --hero-padding: 72px 64px 64px;
        }
        @media (max-width: 768px) {
          :root {
            --nav-padding: 12px 20px;
            --section-padding: 40px 20px;
            --footer-padding: 36px 20px;
            --section-gap: 40px;
            --hero-padding: 52px 20px 44px;
          }
          .mobile-hide { display: none !important; }
          .mobile-stack { flex-direction: column !important; gap: 32px !important; }
          .mobile-stack-small { flex-direction: column !important; gap: 16px !important; }
          .mobile-stack-buttons { flex-direction: column !important; width: 100% !important; max-width: 320px !important; }
          .mobile-stack-buttons button { width: 100% !important; }
          .mobile-full-width { width: 100% !important; max-width: 100% !important; }
          .mobile-center-text { text-align: center !important; }
          .mobile-center-items { align-items: center !important; }
          .mobile-center-content { display: flex !important; flex-direction: column !important; align-items: center !important; text-align: center !important; }
          .mobile-nav-menu { display: none !important; } 
        }
        body { background: #F9F4E8; }
        input:focus, select:focus, textarea:focus { outline: 2px solid #3FA796; outline-offset: -1px; }
        input[type="radio"], input[type="checkbox"] { accent-color: #3FA796; }
        a { text-decoration: none; }
        nav a:hover { color: #3FA796 !important; }
        footer a:hover { color: #FFFFFF !important; }
      `}</style>

      <div style={{ width: "100%", overflowX: "hidden", background: "#F9F4E8" }}>
        {/* ── Nav ── */}
        <nav style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "var(--nav-padding)", width: "100%", background: "transparent",
          position: "sticky", top: 0, zIndex: 100,
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.04)",
          backgroundColor: "rgba(249, 244, 232, 0.85)",
        }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.orange }} />
            <span style={{ fontFamily: F.sora, fontSize: 24, fontWeight: 600, color: C.burgundy }}>
              Ginjas
            </span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div className="mobile-hide" style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {[
                { label: "Sobre", to: "/sobre" },
                { label: "Missão", to: "/missao" },
                { label: "Contato", to: "/contato" },
              ].map(({ label, to }) => (
                <Link key={to} to={to} style={{ fontFamily: F.inter, fontSize: 15, fontWeight: 500, color: "#4A4A4A" }}>
                  {label}
                </Link>
              ))}
            </div>
            <button
              onClick={() => navigate("/participe")}
              style={{
                background: C.teal, color: C.white, fontFamily: F.inter,
                fontSize: 14, fontWeight: 600, padding: "10px 20px",
                borderRadius: 999, border: "none", cursor: "pointer",
              }}
            >
              Participe
            </button>
          </div>
        </nav>

        {children}

        {/* ── Footer ── */}
        <footer style={{ background: C.footerBg, padding: "var(--footer-padding)", width: "100%" }}>
          <div className="mobile-stack" style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#F7D6CF" }} />
                <span style={{ fontFamily: F.sora, fontSize: 22, fontWeight: 700, color: C.white }}>Ginjas</span>
              </Link>
              <p style={{ fontFamily: F.inter, fontSize: 14, color: C.faint, lineHeight: 1.5, maxWidth: 280 }}>
                Conectando Habilidades Com Impacto Social
              </p>
            </div>

            <div style={{ display: "flex", gap: 48 }}>
              <FooterColumn title="Empresa" links={[
                { label: "Sobre", to: "/sobre" },
                { label: "Missão", to: "/missao" },
                { label: "Contato", to: "/contato" },
                { label: "Política de Privacidade", to: "/privacidade" },
              ]} />
              <FooterColumn title="Conectar" links={[
                { label: "LinkedIn", to: "#" },
                { label: "Twitter", to: "#" },
                { label: "E-mail", to: "/contato" },
              ]} />
            </div>
          </div>

          <hr style={{ border: "none", borderTop: `1px solid ${C.footerDivider}`, margin: 0 }} />

          <div className="mobile-stack" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32 }}>
            <span style={{ fontFamily: F.inter, fontSize: 12, color: "#666" }}>
              © 2026 Ginjas. Todos os direitos reservados.
            </span>
            <span style={{ fontFamily: F.inter, fontSize: 12, color: "#666" }}>
              Feito com propósito.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <span style={{ fontFamily: F.inter, fontSize: 13, fontWeight: 600, color: "#FFFFFF" }}>{title}</span>
      {links.map(({ label, to }) => (
        <Link key={label} to={to} style={{ fontFamily: F.inter, fontSize: 13, color: "#999999" }}>
          {label}
        </Link>
      ))}
    </div>
  );
}
