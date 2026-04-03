import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import ProcessSection from "./ProcessSection";
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


export default function GinjasPage() {
  const bgRef = useRef(null);
  const mosaicRef = useRef(null);
  const navigate = useNavigate();

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
            <button onClick={() => navigate("/pre-inscricao?role=volunteer")} style={{
              background: C.teal, color: C.whiteColor, fontFamily: F.dm,
              fontSize: 16, fontWeight: 700, padding: "18px 40px",
              borderRadius: 0, border: "none", cursor: "pointer",
              boxShadow: "0 6px 24px rgba(63,167,150,0.35)",
              letterSpacing: "0.01em",
            }}>Sou Voluntário</button>
            <button onClick={() => navigate("/pre-inscricao?role=org")} style={{
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

      {/* ── Process / How matching works ────────────── */}
      <ProcessSection />

      <div style={{ height: "clamp(80px, 10vw, 160px)" }} />
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

