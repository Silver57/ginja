import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { C, F } from "./tokens";

const NAV_LINKS = [
  { label: "Artigos", to: "/artigos" },
];

export default function Layout({ children, noBg }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    function handleKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  return (
    <>
      <style>{`
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
        }
        input:focus, select:focus, textarea:focus { outline: 2px solid #3FA796; outline-offset: -1px; }
        input[type="radio"], input[type="checkbox"] { accent-color: #3FA796; }
        a { text-decoration: none; }
        nav a:hover { color: #3FA796 !important; }
        footer a:hover { color: #FFFFFF !important; }
      `}</style>

      <a href="#main-content" className="skip-link">Saltar para o conteúdo</a>

      <div style={{ width: "100%", overflowX: "hidden", background: noBg ? "transparent" : C.cream }}>
        {/* ── Nav ── */}
        <nav
          aria-label="Navegação principal"
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "var(--nav-padding)", width: "100%",
            position: "sticky", top: 0, zIndex: 100,
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(0,0,0,0.04)",
            backgroundColor: "rgba(249, 244, 232, 0.85)",
          }}
        >
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div aria-hidden="true" style={{ width: 32, height: 32, borderRadius: "50%", background: C.orange }} />
            <span style={{ fontFamily: F.sora, fontSize: 24, fontWeight: 600, color: C.burgundy }}>
              Ginjas
            </span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div className="mobile-hide" style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {NAV_LINKS.map(({ label, to }) => (
                <Link key={to} to={to} style={{ fontFamily: F.inter, fontSize: 15, fontWeight: 500, color: "#4A4A4A" }}>
                  {label}
                </Link>
              ))}
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                padding: 8, flexDirection: "column", gap: 5, alignItems: "center", justifyContent: "center",
              }}
            >
              <span style={{
                display: "block", width: 22, height: 2, background: C.burgundy, borderRadius: 2,
                transition: "transform 0.2s",
                transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
              }} />
              <span style={{
                display: "block", width: 22, height: 2, background: C.burgundy, borderRadius: 2,
                transition: "opacity 0.2s",
                opacity: menuOpen ? 0 : 1,
              }} />
              <span style={{
                display: "block", width: 22, height: 2, background: C.burgundy, borderRadius: 2,
                transition: "transform 0.2s",
                transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
              }} />
            </button>

          </div>
        </nav>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <div
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 99,
            }}
          />
        )}

        {/* Mobile menu panel */}
        {menuOpen && (
          <div
            role="dialog"
            aria-label="Menu de navegação"
            style={{
              position: "fixed", top: 60, left: 0, right: 0, zIndex: 100,
              background: C.cream, borderBottom: "1px solid rgba(0,0,0,0.08)",
              display: "flex", flexDirection: "column", padding: "8px 20px 20px",
            }}
          >
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: F.inter, fontSize: 17, fontWeight: 500,
                  color: "#4A4A4A", padding: "14px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  display: "block",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        <main id="main-content">
          {children}
        </main>

        {/* ── Footer ── */}
        <footer style={{ background: C.footerBg, padding: "var(--footer-padding)", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div aria-hidden="true" style={{ width: 28, height: 28, borderRadius: "50%", background: "#F7D6CF" }} />
              <span style={{ fontFamily: F.sora, fontSize: 22, fontWeight: 700, color: C.white }}>Ginjas</span>
            </Link>
            <p style={{ fontFamily: F.inter, fontSize: 14, color: C.footerMuted, lineHeight: 1.5, maxWidth: 280 }}>
              Conectando Habilidades Com Impacto Social
            </p>
          </div>

          <hr style={{ border: "none", borderTop: `1px solid ${C.footerDivider}`, margin: 0 }} />

          <div className="mobile-stack" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32 }}>
            <span style={{ fontFamily: F.inter, fontSize: 12, color: C.footerMuted }}>
              © 2026 Ginjas. Todos os direitos reservados.
            </span>
            <span style={{ fontFamily: F.inter, fontSize: 12, color: C.footerMuted }}>
              Feito com propósito.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
