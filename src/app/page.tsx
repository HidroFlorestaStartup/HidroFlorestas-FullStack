import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardList, FlaskConical, MapPin, Sprout } from "lucide-react";
import logo from "@/assets/logo/logo-hf.png";
import trees from "@/assets/lading-page/tree-hero-landingpage.png";
import styles from "./landing.module.css";

export const metadata: Metadata = {
  title: "HidroFlorestas | Monitoramento ambiental por laboratório",
  description: "Organize áreas, coletas e medições ambientais por laboratório. Conheça o IHFR experimental e seus limites científicos.",
};

const steps = [
  { number: "01", icon: MapPin, title: "Localize suas áreas", description: "Organize os pontos de monitoramento do laboratório e consulte as coordenadas revisadas no mapa territorial." },
  { number: "02", icon: ClipboardList, title: "Registre o que foi observado", description: "Associe coletas e medições de água, solo, vegetação e terreno à área e ao momento da observação, mantendo a origem dos dados." },
  { number: "03", icon: FlaskConical, title: "Consulte o IHFR experimental", description: "Acompanhe os diagnósticos e as versões de medição usadas no cálculo. Quando faltam dados, a insuficiência fica explícita." },
];

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#conteudo">Ir para o conteúdo</a>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <Link href="/" className={styles.brand} aria-label="HidroFlorestas — página inicial">
            <Image src={logo} alt="HidroFlorestas" width={200} height={64} sizes="200px" preload />
          </Link>
          <nav className={styles.navigation} aria-label="Navegação da página pública">
            <a href="#plataforma">A plataforma</a>
            <a href="#ihfr">IHFR experimental</a>
            <a href="#projeto">O projeto</a>
            <a href="#equipe">Equipe</a>
          </nav>
          <Link className={styles.headerAccess} href="/login">Entrar <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </header>

      <main id="conteudo" tabIndex={-1}>
        <section className={`${styles.container} ${styles.hero}`} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span aria-hidden="true" /> Monitoramento ambiental por laboratório</p>
            <h1 id="hero-title">Conhecer o território começa com <span>bons registros.</span></h1>
            <p className={styles.lead}>Reúna áreas, coletas e medições em um só lugar. Acompanhe a origem das informações para construir uma leitura mais cuidadosa do ambiente.</p>
            <div className={styles.actions}>
              <Link href="/login" className={styles.primaryAction}>Acessar plataforma <ArrowRight size={19} aria-hidden="true" /></Link>
              <Link href="/register" className={styles.secondaryAction}>Criar conta</Link>
            </div>
            <p className={styles.heroNote}>Da observação em campo ao histórico do laboratório.</p>
          </div>
          <figure className={styles.illustration}>
            <div className={styles.illustrationLabel}><Sprout size={18} aria-hidden="true" /> Água, solo e vegetação</div>
            <Image src={trees} alt="" sizes="(max-width: 959px) 90vw, 500px" className={styles.trees} preload />
            <figcaption>O território é o ponto de partida.</figcaption>
          </figure>
        </section>

        <section id="plataforma" className={`${styles.container} ${styles.section}`} aria-labelledby="platform-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>A plataforma</p>
            <h2 id="platform-title">Cada registro, no seu contexto.</h2>
            <p>Um fluxo conectado por laboratório, área e coleta, com histórico para acompanhar o trabalho da equipe.</p>
          </div>
          <ol className={styles.steps}>
            {steps.map(({ number, icon: Icon, title, description }) => (
              <li key={number} className={styles.step}>
                <div className={styles.stepTop}><Icon size={25} aria-hidden="true" /><span>{number}</span></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="ihfr" className={`${styles.container} ${styles.section}`} aria-labelledby="ihfr-title">
          <div className={styles.science}>
            <div>
              <p className={styles.eyebrow}>Ciência em desenvolvimento</p>
              <h2 id="ihfr-title">IHFR experimental: informação com limites claros.</h2>
              <p>O Índice HidroFlorestal de Riscos (IHFR) v0.1 organiza uma leitura experimental a partir dos dados registrados. Cada diagnóstico mantém a referência às medições utilizadas.</p>
              <p>O resultado precisa ser interpretado dentro desses limites. Ele não substitui a avaliação técnica do território nem constitui uma prescrição de manejo.</p>
            </div>
            <div className={styles.qualifications}>
              <h3>Como interpretar o índice</h3>
              <ul>
                <li>Contrato experimental</li>
                <li>Validação científica pendente</li>
                <li>Sujeito a recalibração</li>
                <li>Não aprovado como contrato científico definitivo</li>
              </ul>
              <p>A disponibilidade de um cálculo não significa validação científica.</p>
            </div>
          </div>
        </section>

        <section id="projeto" className={`${styles.container} ${styles.section} ${styles.project}`} aria-labelledby="project-title">
          <div>
            <p className={styles.eyebrow}>Itapecuru-Mirim · Maranhão</p>
            <h2 id="project-title">Um projeto de base científica, próximo do território.</h2>
            <p>A HidroFlorestas é um projeto do IFMA Campus Itapecuru-Mirim voltado à segurança hídrica, ao diagnóstico ambiental e à restauração produtiva no Maranhão.</p>
            <p>A proposta reúne organização de informações, observação em campo e pesquisa sobre Soluções Baseadas na Natureza. A plataforma é uma parte desse trabalho.</p>
            <a className={styles.textLink} href="#equipe">Conheça a equipe <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
          <div className={styles.projectScope}>
            <h3>Frentes do projeto</h3>
            <dl>
              <div><dt>Plataforma de registros</dt><dd>Informações ambientais organizadas e histórico por laboratório.</dd></div>
              <div><dt>Observação em campo</dt><dd>Proposta de kit simplificado para apoiar o trabalho de coleta.</dd></div>
              <div><dt>Restauração produtiva</dt><dd>Pesquisa de soluções relacionadas à água, ao solo e à vegetação.</dd></div>
            </dl>
            <p className={styles.scopeNote}>As frentes de pesquisa expressam os objetivos do projeto. Resultados e recomendações dependem de avaliação técnica e científica.</p>
          </div>
        </section>

        <section id="equipe" className={`${styles.container} ${styles.section}`} aria-labelledby="team-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Equipe</p>
            <h2 id="team-title">Pesquisa e formação, juntas.</h2>
            <p>Pesquisadores e estudantes do IFMA Campus Itapecuru-Mirim.</p>
          </div>
          <div className={styles.team}>
            <article>
              <p className={styles.role}>Coordenação do projeto</p>
              <h3>Fabio Mesquita de Souza</h3>
              <p>Doutorado em Recursos Florestais / Engenharia Florestal</p>
              <p className={styles.affiliation}>DERI-ITA · IFMA Campus Itapecuru-Mirim</p>
            </article>
            <article>
              <p className={styles.role}>Corpo técnico e estudantes</p>
              <h3>Equipe multidisciplinar</h3>
              <p>Iolanda S. Carmo, Humberto M. Silva</p>
              <p className={styles.affiliation}>Bolsistas: Arthur Gabryel, Ana Clara Cunha, Horacio Bizerra</p>
            </article>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerGrid}`}>
          <div><p className={styles.footerBrand}>HidroFlorestas</p><p>Registros que aproximam pesquisa e território.</p></div>
          <div><h2>Apoio institucional</h2><p>Instituto Federal do Maranhão (IFMA)<br />Pró-Reitoria de Pesquisa, Pós-Graduação e Inovação (PRPGI)<br />Fábrica de Inovação — Campus Itapecuru-Mirim</p></div>
          <div><h2>Contato</h2><a href="mailto:fabio.souza@ifma.edu.br">fabio.souza@ifma.edu.br</a><p>Unidade proponente: ITA / DERI-ITA</p></div>
          <div><h2>Projeto</h2><p>Edital PRPGI Nº 180/2025<br />Período de execução:<br /><time dateTime="2026-03-01">01/03/2026</time> a <time dateTime="2026-10-31">31/10/2026</time></p></div>
        </div>
        <div className={`${styles.container} ${styles.copyright}`}>© 2026 HidroFlorestas. Todos os direitos reservados.</div>
      </footer>
    </div>
  );
}
