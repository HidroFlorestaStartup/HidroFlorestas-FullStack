import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowRight, ClipboardList, CloudSun, Droplets, FlaskConical, Layers3, MapPin, Sprout, TreePine, Users, Waves } from "lucide-react";
import logo from "@/assets/logo/logo-hf.png";
import { MascotAnimation } from "./mascot-animation";
import styles from "./landing.module.css";

export const metadata: Metadata = {
  title: "HidroFlorestas | Segurança hídrica e restauração florestal",
  description: "Startup de base científica focada em segurança hídrica, diagnóstico ambiental e restauração produtiva no Maranhão. Conheça o projeto e a plataforma HidroFlorestas.",
};

const challenges = [
  { number: "01", icon: Layers3, title: "Desafios Geológicos", description: "A Formação Itapecuru possui sedimentos argilosos de baixa permeabilidade. Solos adensados dificultam a infiltração natural e causam encharcamento e rebaixamento do lençol freático." },
  { number: "02", icon: Waves, title: "Salinização de Poços", description: "A degradação das áreas de recarga e a concentração capilar de sais em aquíferos rasos resultam na inutilização de poços comunitários por salinização progressiva." },
  { number: "03", icon: MapPin, title: "Falta de Diagnóstico Local", description: "Inexistência de ferramentas acessíveis e de baixo custo para que comunidades rurais e quilombolas possam medir a infiltração e planejar a recuperação do solo." },
];

const solutions = [
  { icon: FlaskConical, title: "Plataforma digital e IHFR", description: "Áreas, coletas e medições ambientais reunidas em um só lugar, com cálculo do IHFR e histórico dos registros de cada laboratório." },
  { icon: Activity, title: "Observação em campo", description: "Proposta de kit simplificado para apoiar o trabalho de coleta.", detail: "A iniciativa busca facilitar medições locais de infiltração, compactação, salinidade e condições básicas da água." },
  { icon: Sprout, title: "Restauração produtiva (SBN)", description: "Pesquisa de soluções relacionadas à água, ao solo e à vegetação, com foco em Sistemas Agroflorestais, florestas de infiltração e manejo regenerativo." },
];

const steps = [
  { number: "01", icon: MapPin, title: "Localize suas áreas", description: "Organize os pontos de monitoramento do laboratório e consulte as coordenadas revisadas no mapa territorial." },
  { number: "02", icon: ClipboardList, title: "Registre o que foi observado", description: "Associe coletas e medições de água, solo, vegetação e terreno à área e ao momento da observação, mantendo a origem dos dados." },
  { number: "03", icon: FlaskConical, title: "Consulte o IHFR", description: "Acompanhe o IHFR e consulte as medições que deram origem ao resultado, mantendo a leitura conectada ao histórico da área." },
];

const territorialReadings = [
  { icon: Droplets, label: "Segurança hídrica", description: "Mitigar a salinização de poços e aumentar a recarga de aquíferos." },
  { icon: Sprout, label: "Restauração produtiva (SBN)", description: "Pesquisar Soluções Baseadas na Natureza, como Sistemas Agroflorestais (SAFs), florestas de infiltração e manejo regenerativo." },
  { icon: Activity, label: "Infiltração de água", description: "Compreender as restrições do solo para apoiar a recuperação do ciclo hidrológico e a resiliência produtiva." },
];

const goals = [
  { number: "06", icon: Droplets, title: "Água Potável e Saneamento" },
  { number: "13", icon: CloudSun, title: "Ação Contra a Mudança Global do Clima" },
  { number: "15", icon: TreePine, title: "Vida Terrestre e Manejo do Solo" },
  { number: "10", icon: Users, title: "Redução das Desigualdades" },
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
            <a href="#desafio">O desafio</a>
            <a href="#projeto">Nossa solução</a>
            <a href="#plataforma">A plataforma</a>
            <a href="#impacto">Impacto social</a>
            <a href="#equipe">Equipe</a>
          </nav>
          <Link className={styles.headerAccess} href="/login">Entrar <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </header>

      <main id="conteudo" tabIndex={-1}>
        <section className={`${styles.container} ${styles.hero}`} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span aria-hidden="true" /> Monitoramento ambiental por laboratório</p>
            <h1 id="hero-title">Soluções Inteligentes para <span>Segurança Hídrica e Restauração Florestal</span></h1>
            <p className={styles.lead}>Unimos ciência e Soluções Baseadas na Natureza para enfrentar a salinização de poços, favorecer a recarga de aquíferos e promover a resiliência produtiva no Maranhão.</p>
            <div className={styles.actions}>
              <Link href="/login" className={styles.primaryAction}>Acessar plataforma <ArrowRight size={19} aria-hidden="true" /></Link>
              <Link href="/register" className={styles.secondaryAction}>Criar conta</Link>
            </div>
            <p className={styles.heroNote}>Da observação em campo ao histórico do laboratório.</p>
          </div>
          <figure className={styles.illustration}>
            <MascotAnimation />
          </figure>
        </section>

        <section id="desafio" className={`${styles.container} ${styles.section}`} aria-labelledby="challenge-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>O desafio</p>
            <h2 id="challenge-title">O Paradoxo Hídrico do Médio Itapecuru</h2>
            <p>Chuva abundante, mas escassez de água potável e solo degradado.</p>
          </div>
          <ol className={styles.steps}>
            {challenges.map(({ number, icon: Icon, title, description }) => (
              <li key={number} className={styles.step}>
                <div className={styles.stepTop}><Icon size={25} aria-hidden="true" /><span>{number}</span></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="projeto" className={`${styles.container} ${styles.section}`} aria-labelledby="project-title">
          <div className={styles.projectIntro}>
            <div>
              <p className={styles.eyebrow}>Nossa solução</p>
              <h2 id="project-title">Tecnologia, diagnóstico e restauração para o território.</h2>
            </div>
          </div>
          <div className={styles.solutions}>
            {solutions.map(({ icon: Icon, title, description, detail }) => (
              <article key={title} className={styles.step}>
                <div className={styles.solutionIcon}><Icon size={25} aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{description}</p>
                {detail && <p className={styles.solutionDetail}>{detail}</p>}
              </article>
            ))}
          </div>
          <div className={styles.projectCopy}>
            <p>A HidroFlorestas é uma startup nascida no IFMA Campus Itapecuru-Mirim, voltada à segurança hídrica, ao diagnóstico ambiental e à restauração produtiva no Maranhão.</p>
            <p>A proposta reúne organização de informações, observação em campo e pesquisa sobre Soluções Baseadas na Natureza. A plataforma é uma parte desse trabalho.</p>
          </div>
          <a className={styles.textLink} href="#equipe">Conheça a equipe <ArrowRight size={18} aria-hidden="true" /></a>
        </section>

        <section id="plataforma" className={`${styles.container} ${styles.section}`} aria-labelledby="platform-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>A plataforma</p>
            <h2 id="platform-title">Cada registro, no seu contexto.</h2>
            <p>Um fluxo conectado por laboratório, área e coleta, com histórico para acompanhar o trabalho da equipe.</p>
          </div>
          <div className={styles.platformLayout}>
            <ol className={styles.steps}>
              {steps.map(({ number, icon: Icon, title, description }) => (
                <li key={number} className={styles.step}>
                  <div className={styles.stepTop}><Icon size={25} aria-hidden="true" /><span>{number}</span></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
            <aside className={styles.territorialPanel} aria-labelledby="territorial-title">
              <div className={styles.panelHeader}>
                <div><p className={styles.eyebrow}>Conexão com o território</p><h3 id="territorial-title">Do diagnóstico à restauração</h3></div>
              </div>
              <p className={styles.panelIntro}>Os registros ambientais e o IHFR conectam a leitura do território às frentes de pesquisa e atuação do projeto.</p>
              <ul className={styles.territorialReadings} aria-label="Frentes de aplicação dos registros ambientais">
                {territorialReadings.map(({ icon: Icon, label, description }) => (
                  <li key={label} className={styles.territorialRow}>
                    <span className={styles.readingIcon}><Icon size={23} aria-hidden="true" /></span>
                    <div className={styles.readingCopy}><h4>{label}</h4><p>{description}</p></div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section id="impacto" className={`${styles.container} ${styles.section}`} aria-labelledby="impact-title">
          <div className={styles.impact}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Justiça territorial e sustentabilidade</p>
              <h2 id="impact-title">Para mais de 70 comunidades quilombolas e rurais.</h2>
              <p>Na Bacia do Rio Itapecuru, a proposta contempla um público potencial de mais de 10 mil pessoas. A HidroFlorestas busca democratizar o conhecimento científico para contribuir com a segurança alimentar e hídrica e a recuperação dos territórios.</p>
            </div>
            <ul className={styles.goals} aria-label="Objetivos de Desenvolvimento Sustentável">
              {goals.map(({ number, icon: Icon, title }) => (
                <li key={number}>
                  <Icon size={30} aria-hidden="true" />
                  <p className={styles.goalNumber}>ODS {number}</p>
                  <h3>{title}</h3>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="equipe" className={`${styles.container} ${styles.section}`} aria-labelledby="team-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Equipe</p>
            <h2 id="team-title" className={styles.teamHeading}>Equipe e competências.</h2>
            <p>Conheça as pessoas envolvidas na ciência, no desenvolvimento e nos dados da plataforma.</p>
          </div>
          <div className={styles.team}>
            <article>
              <p className={styles.role}>Pesquisa</p>
              <h3>Coordenação científica</h3>
              <ul className={styles.teamNames}>
                <li>Fábio Mesquita de Souza</li>
                <li>Iolanda Souza do Carmo</li>
                <li>Humberto Morais da Silva</li>
                <li>Horacio Bizerra Vale Neto</li>
                <li>Antonio Marcos da Penha Santos</li>
              </ul>
              <p>Concepção histórica do IHFR.</p>
            </article>
            <article>
              <p className={styles.role}>Desenvolvimento</p>
              <h3>Coordenação de desenvolvimento</h3>
              <ul className={styles.teamNames}>
                <li>Pedro Vitor Silva de Brito</li>
                <li>Ana Clara Cunha Santos</li>
                <li>Thales Levi Azevedo Valente</li>
              </ul>
              <p>Implementação do software e organização do trabalho.</p>
            </article>
            <article>
              <p className={styles.role}>Plataforma</p>
              <h3>Dados e funcionalidades</h3>
              <ul className={styles.teamNames}>
                <li>Luciano Mendes de Almeida</li>
                <li>Arthur Gabryel Costa Lima</li>
                <li>Rafael Silva Andrade</li>
              </ul>
              <p>Interfaces e estruturação dos dados da plataforma.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerGrid}`}>
          <div><p className={styles.footerBrand}>HidroFlorestas</p><p>Startup de base científica focada em segurança hídrica, diagnóstico ambiental e restauração produtiva no Maranhão.</p></div>
          <div><h2>Apoio institucional</h2><p>Instituto Federal do Maranhão (IFMA)<br />Pró-Reitoria de Pesquisa, Pós-Graduação e Inovação (PRPGI)<br />Fábrica de Inovação — Campus Itapecuru-Mirim<br />AGiFMA<br />FAPEMA</p></div>
          <div>
            <h2>Contato</h2>
            <div className={styles.contactLinks}>
              <a href="mailto:startup.hidroflorestas.ifma@gmail.com">startup.hidroflorestas.ifma@gmail.com</a>
              <a className={styles.socialLink} href="https://www.instagram.com/startup.hidroflorestas/" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="M17.5 6.5h.01" />
                </svg>
                <span>@startup.<wbr />hidroflorestas</span>
              </a>
            </div>
            <p>Unidade proponente: ITA / DERI-ITA</p>
          </div>
        </div>
        <div className={`${styles.container} ${styles.copyright}`}>© 2026 HidroFlorestas. Todos os direitos reservados.</div>
      </footer>
    </div>
  );
}
