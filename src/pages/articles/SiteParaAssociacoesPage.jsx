import Layout from "../../Layout";
import { Link } from "react-router-dom";

const C = {
  teal: "#3FA796",
  tealLight: "rgba(63,167,150,0.10)",
  burgundy: "#8B1E3F",
  dark: "#1A1A1A",
  text: "#2D2D2D",
  muted: "#555555",
  subtle: "#6B6B6B",
  white: "#F9F4E8",
  whiteColor: "#FFFFFF",
  divider: "#E8E8E8",
  orange: "#F4A623",
};

const F = {
  sora: "'Sora', sans-serif",
  inter: "'Inter', sans-serif",
  dm: "'DM Sans', sans-serif",
};

export default function SiteParaAssociacoesPage() {
  return (
    <Layout>
      <article style={{ background: C.white }}>
        {/* Hero */}

        {/* Byline */}
        <div
          className="article-byline"
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 64px)",
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 40,
          }}
        >
          <img
            src="/images/Cavalinho.png"
            alt="Ginja"
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "top center",
              border: `3px solid ${C.orange}`,
              flexShrink: 0,
            }}
          />
          <div>
            <p style={{ fontFamily: F.sora, fontSize: 15, fontWeight: 700, color: C.dark, margin: 0 }}>
              Ginja
            </p>
            <p style={{ fontFamily: F.inter, fontSize: 13, color: C.subtle, margin: "2px 0 0" }}>
              Cavalo de estimação dos Ginjas · Março 2026 · 5 min de leitura
            </p>
          </div>
          <div
            style={{
              marginLeft: "auto",
              background: C.tealLight,
              borderRadius: 999,
              padding: "6px 16px",
              fontFamily: F.inter,
              fontSize: 12,
              fontWeight: 600,
              color: C.teal,
              whiteSpace: "nowrap",
            }}
          >
            Ferramentas digitais
          </div>
        </div>

        {/* Body */}
        <div
          className="article-body"
          style={{ maxWidth: 760, margin: "0 auto", padding: "0 64px 80px", display: "flex", flexDirection: "column", gap: 0 }}
        >

          <Heading>Como criar um site para a tua associação (sem saber programar)</Heading>

          <Section title="Quatro conceitos rápidos">
            <Dl>
              <Dt>Domínio</Dt>
              <Dd>
                É o endereço do teu site, por exemplo <Code>associacaoexemplo.pt</Code>. Custa entre 10 a 20 euros por ano.
              </Dd>
              <Dt>Alojamento</Dt>
              <Dd>
                É onde o computador o teus site, as ferramentas modernas tratam da parte chata toda.
              </Dd>
              <Dt>Publicar</Dt>
              <Dd>
                É o momento em que o teu site passa a estar disponível para qualquer pessoa no mundo aceder.
              </Dd>
              <Dt>SEO</Dt>
              <Dd>
                É o que faz o teu site aparecer no Google. As ferramentas que recomendamos tratam disto automaticamente.
              </Dd>
            </Dl>
          </Section>

          <Section title="O mundo mudou">
            <Para>
              Hoje qualquer pessoa consegue criar um site completo a partir de uma descrição simples escrita em
              linguagem normal. O que antes exigia um programador, hoje faz-se numa tarde.
            </Para>
            <Para>
              Há muitas ferramentas com estas capacidades: Wix, Squarespace, Framer e muitas outras. Vale a pena
              explorar antes de decidir. A que nós gostámos mais foi o{" "}
              <strong style={{ color: C.dark }}>Durable</strong>.
            </Para>
          </Section>

          <Section title="Mãos à obra">
            <Para>
              O Durable serve bem para a maioria das organizações. O plano gratuito permite explorar sem compromisso.
              O plano pago começa em cerca de 25 euros por mês e inclui domínio e alojamento.
            </Para>

            <SubHeading>Passo a passo:</SubHeading>

            <Steps>
              <Step n={1}>
                Vai a <Code>durable.com</Code> e clica em <strong>"Generate your website"</strong>. Descreve a tua
                organização, por exemplo{" "}
                <em>
                  "associação cultural sem fins lucrativos para evitar a extinção das populações de abelhas na zona
                  das beiras"
                </em>
                , escolhe um nome e em segundos tens um site gerado. Quanto mais descritivo e detalhado for a tua
                descrição inicial, mais fácil vai ser fazer os ajustes finais. Se conseguires, escreve dois ou três
                parágrafos a descrever o que queres no site.
              </Step>
              <Step n={2}>
                Clica em qualquer elemento para o editar. Altera textos, troca imagens, muda cores. Se não gostares
                do resultado, gera uma nova versão.
              </Step>
              <Step n={3}>
                Quando estiveres satisfeito clica em <strong>"Publish"</strong>. Com o plano gratuito o endereço
                fica do tipo <Code>meusite.durable.site</Code>. Com o plano pago podes ligar o teu próprio domínio
                nas definições.
              </Step>
            </Steps>

            <SubHeading>Algumas coisas que podem dar jeito:</SubHeading>
            <Bullets>
              <Li>
                O Durable tem um sistema de <strong>blog integrado</strong> onde podes publicar notícias e
                actualizações sobre as actividades da organização.
              </Li>
              <Li>
                Podes criar <strong>formulários personalizados</strong> para receber candidaturas de voluntários ou
                inscrições em eventos. As respostas chegam directamente ao teu email e ficam guardadas na plataforma.
              </Li>
              <Li>
                Tem um <strong>CRM básico</strong> que te permite guardar e organizar os contactos de voluntários,
                parceiros e pessoas interessadas, tudo dentro da mesma plataforma.
              </Li>
              <Li>
                Por último, tens um <strong>assistente de IA</strong> onde podes colocar perguntas sobre como criar o
                teu site e que escreve textos para redes sociais e campanhas de email com base no conteúdo do teu
                site.
              </Li>
            </Bullets>
          </Section>

          <Section title="Dicas">
            <Bullets>
              <Li>
                <strong>Responde logo no início quem és e o que fazes.</strong> Uma frase clara no topo da página é
                suficiente.
              </Li>
              <Li>
                <strong>Usa fotografias reais.</strong> Uma foto tirada com telemóvel numa actividade vale mais do
                que qualquer imagem genérica.
              </Li>
              <Li>
                <strong>Facilita o contacto.</strong> Formulário visível, redes sociais, telefone se fizer sentido.
                Quanto mais fácil for dar o primeiro passo, melhor.
              </Li>
              <Li>
                <strong>Garante que mais do que uma pessoa sabe gerir o site.</strong> A autonomia interna vale muito
                e evita depender de alguém de fora para qualquer pequena alteração.
              </Li>
              <Li>
                <strong>Quando tiveres dúvidas, pergunta a uma IA.</strong> Ferramentas como o ChatGPT ou o Claude
                respondem em segundos a qualquer questão sobre o Durable. É como ter um técnico disponível a qualquer
                hora, de graça.
              </Li>
            </Bullets>
          </Section>

          {/* Horse sign-off */}
          <div
            style={{
              background: C.whiteColor,
              border: `1px solid ${C.divider}`,
              borderLeft: `4px solid ${C.orange}`,
              borderRadius: "0 12px 12px 0",
              padding: "20px 24px",
              marginTop: 24,
              fontFamily: F.dm,
              fontSize: 15,
              color: C.subtle,
              lineHeight: 1.8,
              fontStyle: "italic",
            }}
          >
            <em>
              E pronto, foi o que o prado me deu hoje. Se tiverem dúvidas, passem pelos Ginjas — eu fico por aqui
              a pastar, mas os humanos respondem. Um relinchos,
            </em>
            <br />
            <strong style={{ fontFamily: F.sora, color: C.dark, fontStyle: "normal" }}>— Ginja 🐴</strong>
          </div>

          {/* Back link */}
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${C.divider}` }}>
            <Link
              to="/artigos"
              style={{
                fontFamily: F.sora,
                fontSize: 14,
                fontWeight: 700,
                color: C.teal,
                textDecoration: "none",
              }}
            >
              ← Voltar aos artigos
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}

// ── Article components ─────────────────────────────────────

function Heading({ children }) {
  return (
    <h1
      style={{
        fontFamily: F.sora,
        fontSize: "clamp(24px, 3.5vw, 38px)",
        fontWeight: 800,
        color: C.burgundy,
        lineHeight: 1.3,
        marginBottom: 40,
      }}
    >
      {children}
    </h1>
  );
}

function SubHeading({ children }) {
  return (
    <h3
      style={{
        fontFamily: F.sora,
        fontSize: 17,
        fontWeight: 700,
        color: C.dark,
        marginTop: 28,
        marginBottom: 16,
      }}
    >
      {children}
    </h3>
  );
}

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2
        style={{
          fontFamily: F.sora,
          fontSize: "clamp(18px, 2vw, 24px)",
          fontWeight: 700,
          color: C.dark,
          marginBottom: 20,
          paddingBottom: 10,
          borderBottom: `2px solid ${C.tealLight}`,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Para({ children }) {
  return (
    <p
      style={{
        fontFamily: F.dm,
        fontSize: 16,
        color: "#444",
        lineHeight: 1.85,
        marginBottom: 16,
      }}
    >
      {children}
    </p>
  );
}

function Dl({ children }) {
  return (
    <dl
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        background: C.whiteColor,
        border: `1px solid ${C.divider}`,
        borderRadius: 12,
        padding: "24px 28px",
      }}
    >
      {children}
    </dl>
  );
}

function Dt({ children }) {
  return (
    <dt
      style={{
        fontFamily: F.sora,
        fontSize: 14,
        fontWeight: 700,
        color: C.teal,
        letterSpacing: 1,
        textTransform: "uppercase",
        marginBottom: 2,
      }}
    >
      {children}
    </dt>
  );
}

function Dd({ children }) {
  return (
    <dd
      style={{
        fontFamily: F.dm,
        fontSize: 15,
        color: "#444",
        lineHeight: 1.75,
        marginLeft: 0,
        marginBottom: 8,
        paddingLeft: 12,
        borderLeft: `2px solid ${C.divider}`,
      }}
    >
      {children}
    </dd>
  );
}

function Steps({ children }) {
  return <ol style={{ display: "flex", flexDirection: "column", gap: 16, paddingLeft: 0, listStyle: "none", marginBottom: 8 }}>{children}</ol>;
}

function Step({ n, children }) {
  return (
    <li style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <span
        style={{
          flexShrink: 0,
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: C.teal,
          color: "#fff",
          fontFamily: F.sora,
          fontSize: 13,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        {n}
      </span>
      <p style={{ fontFamily: F.dm, fontSize: 16, color: "#444", lineHeight: 1.85, margin: 0 }}>{children}</p>
    </li>
  );
}

function Bullets({ children }) {
  return <ul style={{ display: "flex", flexDirection: "column", gap: 12, paddingLeft: 0, listStyle: "none" }}>{children}</ul>;
}

function Li({ children }) {
  return (
    <li style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <span style={{ color: C.teal, fontSize: 18, lineHeight: 1.6, flexShrink: 0 }}>·</span>
      <p style={{ fontFamily: F.dm, fontSize: 16, color: "#444", lineHeight: 1.85, margin: 0 }}>{children}</p>
    </li>
  );
}

function Code({ children }) {
  return (
    <code
      style={{
        fontFamily: "monospace",
        fontSize: 14,
        background: "rgba(63,167,150,0.08)",
        color: C.teal,
        padding: "2px 6px",
        borderRadius: 4,
      }}
    >
      {children}
    </code>
  );
}
