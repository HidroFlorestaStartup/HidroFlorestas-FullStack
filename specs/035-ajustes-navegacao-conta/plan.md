# Implementation Plan: navegação e conta — preparação A

**Branch**: `feat/ajustes-navegacao-conta` | **Date**: 2026-10-31 | **Spec**: [spec.md](spec.md)
**Estado**: EM_ANDAMENTO — mapa concretizado e código/testes preparados na própria reserva. Scripts CLI do Spec Kit não executados neste ambiente API-only; estrutura specify → plan → tasks → implement reconciliada manualmente.

## Summary and technical context

Implementar UI-01/UI-05/UI-06 no shell e conta. Base `07755822f5dc75fe2be1d924005d30ed99f64a0b`, pai development `9b8595d232842d401ce81bbc92c54dd543aa2829`. PR de guards #45 é dependência de integração, não bloqueia trabalho isolado.

Aplicação Next.js/App Router e TypeScript existente; preservar dependências e contratos. CI Windows/Node 24.19.0/PowerShell com quinze gates sintéticos. Ler package/lockfile e documentação local da versão Next antes de codificar. Não instalar ou mudar dependências por inferência do G0. Metas quantitativas de desempenho além do aceite: não especificadas.

## Constitution Check

Decisões atuais e recorte aprovados; spec/branch/PR próprios; documentação histórica imutável; auth e dados existentes preservados. Verificação de ownership e diff por paths realizada; validação funcional e revisão independente ainda pendentes. Revisão atual do mesmo coordenador não é revisão independente.

## Project Structure and ownership

Documentos exclusivamente em `specs/035-ajustes-navegacao-conta/`. O executor deve enumerar e congelar os arquivos concretos de shell, layouts privados, workspace e conta em `src/` antes de editar, após ler AGENTS aplicáveis. G0 não inspecionou cada componente para fechar esse mapa e não autoriza refatoração global.

A é writer do shell/layout; B/C não editam esses arquivos em paralelo. Estilos globais, UI compartilhada, fixtures, configuração, dependências e autenticação exigem coordenação. Configurações de deploy e workflow são somente leitura. Nenhum novo schema previsto por este recorte.

Testes próprios propostos: `tests/unit/hf-ui035-navigation.test.ts` e `tests/e2e/hf-ui035-navigation.spec.ts`, adaptando localização ao harness realmente existente sem duplicar runner. Os arquivos de testes foram criados na branch A após o G0 e submetidos à verificação do CI; não afirmar PASS antes da Actions.

## Sequência

1. Revalidar refs, ancestralidade, PRs, guardas, ambiente local e exclusividade de arquivos; preservar alterações existentes.
2. Completar specify → plan → tasks com skills `.agents/skills/speckit-*`, reutilizando esta reserva, sem criar outra branch/spec. Confirmar rastreabilidade Code-First e arquivos reais.
3. Implementar e testar US1; depois US2; comparar US3. Novos testes devem demonstrar a regressão antes da correção quando reproduzível.
4. Executar testes focais, Typecheck/Lint/Build e o runner completo quando ambiente permitir; registrar cada resultado real por SHA, run e tentativa. Não enfraquecer gates.
5. Atualizar documentos e PR próprio, revisão independente quando disponível; sem aprovação humana simulada, merge ou deploy.

## Integração e handoff exato

Trabalhar na branch existente derivada dos guards. Diff exclusivo: `git diff 07755822f5dc75fe2be1d924005d30ed99f64a0b...HEAD`; acumulado inicial: `git diff 9b8595d232842d401ce81bbc92c54dd543aa2829...HEAD`. Recalcular a base de development antes da integração futura. PR final sempre para development, mantendo dependência #45 explícita.

Nenhuma necessidade de aguardar implementação de B/C. Mudança necessária em contrato compartilhado deve ser proposta com hunks e testes ao coordenador, sem absorver suas branches. Guards devem integrar primeiro em autorização posterior; squash/rebase requer transportar apenas commits exclusivos após a base dos guards e revalidar o diff. Não executar essa integração agora.

## Riscos e pontos de parada

Sobreposição da barra mobile, foco perdido, rotas reais alteradas e concorrência em layout são riscos focais. Conflito não resolvível para somente o arquivo afetado. Sem merge/deploy/main/development/provedores, REV-01–REV-03 ou ciência. Testes/aceite final pendentes em [implementation-evidence.md](implementation-evidence.md).

## Mapa concreto de paths, contratos e regressões — implementação A

| Path sob ownership A | Mudança e contrato | Verificação |
| --- | --- | --- |
| `src/components/shell/navigation-state.ts` | Projeção de links; sem autorização client-side | `tests/unit/hf-ui035-navigation.test.ts` |
| `src/components/sidebar/index.tsx` | Só destinos globais fora de laboratório; nenhuma Área sem contexto | E2E 035/workspace/mobile |
| `src/components/shell/laboratory-navigation.tsx` | Navegação contextual única, rotas Next reais, Membros condicional ao `canManageMembers` SSR | E2E 035/workspace/dashboard |
| `src/app/(private)/dashboard/laboratories/[laboratoryId]/layout.tsx` | `getLaboratoryContext` preservado; trilho como irmão do cabeçalho contextual | E2E 035/consumidores |
| `src/components/top-bar/index.tsx` | Disclosure Conta para `/change-password` e `/delete-account`; Sair somente `/logout`, sem novos handlers | E2E 035/workspace/account/logout |
| `src/components/shell/shell.module.css` | Sidebar desktop, rodapé fixo mobile com safe-area, contexto compacto | captura e geometria do E2E 035 |
| `src/components/shell/use-content-scroll.ts` | Foco de controles considera o limite superior da barra fixa no mobile | E2E 035/mobile regression |
| `tests/unit/hf-ui035-navigation.test.ts` | Ausência de destino global inválido, rotas, papel e active state | `npm run test:unit` |
| `tests/e2e/hf-ui035-navigation.spec.ts` | owner/member, 320/375/390/768/1440, zoom, safe-area simulado, conta, histórico e último controle | `npm run test:e2e` |
| `tests/e2e/frontend-mobile-navigation.spec.ts`, `frontend-workspace.spec.ts`, `frontend-dashboard.spec.ts` | Atualizar apenas as expectativas de apresentação incompatíveis com UX aprovada; manter assertions de domínio | E2E oficial completo |

**Contratos inalterados:** `getLaboratoryContext` exige sessão/autorização e decide 404/redirect, não há escolha implícita de laboratório; `canManageMembers` não é expandido a ADMIN global. Sem edição em AuthContext, serviços, Prisma, API, conta, dados ou fixtures. Sem alteração no código de `logout`, troca de senha ou exclusão. Destinos visuais possuem `href` existentes. O layout protegido do laboratório continua fonte de nome/status/papel.

**Ownership compartilhado:** nenhum arquivo global, `package.json`/lockfile, `tests/fixtures`, `vercel.json`, `.github/workflows/rc-review.yml` foi alterado. A entrega B/C deve consumir os links/navegação de A sem editar o shell. Qualquer delta compartilhado novo exige coordenador e teste correspondente.

**Constituição/Spec Kit:** (I) escopo de Pedro 30/10 confirmado #44; PRD Code-First em revisão; (II) feature vertical; (III) única reserva 035; (IV) traces e estados separados; (V) autorização server-side; (VI) raw/histórico imutáveis; (VII) mesmo writer exclusivo. Não foi criado data-model porque não há entidade/campo novo. CLI Spec Kit não executado na sessão sem checkout íntegro/current Node 24; a análise/artefatos foram adaptados aos templates existentes, sem alegar uso da CLI.

**Regressão exigida:** `npm run test:unit`, `npm run typecheck`, `npm run lint`, `npm run build`, `npm run test:e2e`, runner sintético oficial `scripts/rc-review-validation.ps1` com 15 gates no HEAD final. Só GitHub Actions com dados próprios; nunca usar banco/provedores hospedados. Se a falha IHFR no baseline G0 persistir, manter FAIL sem editar ciência.

**Limitação visual:** starter `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f` é somente leitura; capturas atuais de FullStack podem surgir do E2E e são claramente identificadas pelo run, mas não comprovam a comparação bilateral sem runtime starter. Visuais antigos da #44 não são tratados como execução.

## Ciclo Spec Kit ANALYZE → PLAN → IMPLEMENT → REVIEW — correção pós-CI #46 (31/10/2026)

### ANALYZE (somente leitura, executado contra o HEAD d8951199)
Reconciliados FR-035-001..005 (5), SC-035-001..004 (4) e T001..T009 (9). Sem requisitos órfãos, mas persistem lacunas de **evidência de aceite**: UI-06/T007 carece da comparação de dois runtimes; T008 não tinha suite PASS; T003/T005 estavam marcadas como escritas, não testadas; T002 não passou pela CLI Spec Kit. Constituição 1.0.0 mantida; nunca converter aprovação de UI em aprovação de código.

A fonte de diagnóstico **é o ZIP real da Actions** `41232069860` tentativa1, SHA `d8951199baa88beddb930b2ce14e33b9848cbe18`, artefato `13054207847`, SHA-256 `9979305f73e4bde6a1480dfa5849d3a86171e2c30025e27434eaa4f9eac1ba05`. Foram 9 gates PASS; `E2E` FAIL com 213 PASS/10 FAIL; os cinco gates subsequentes não rodaram (HTTPS, Deletion, IHFR, Bootstrap, SchemaAudit). Achados reproduzíveis nos logs e PNGs do próprio SHA:

| ID | Severidade | Sintoma comprovado | Origem/Risco |
| --- | --- | --- | --- |
| A-01 | HIGH | fluxo real de recuperação espera link Alterar senha no header; novo disclosure Conta não foi aberto | expectativa E2E stale; jornada ainda precisa autenticação real |
| A-02 | HIGH | em 844×390, texto200, controles de coleta/ambientais estão por trás do header sticky (175px), `elementFromPoint` atinge `headerInfo` | identidade da UI-01 pode causar wrap; teste de geometria não pode ser enfraquecido |
| A-03 | HIGH | no laboratório, três testes UI-035 falham ao focar último controle com barra fixa; PNG 320/text200 tem rótulos sobrepostos | foco e reflow inadequados |
| A-04 | HIGH | duas regressões de dashboard com respostas reais retidas chegam a timeout durante troca de laboratório | helper de teste usava navegação dentro do segmento suspenso; preservar contraprova de dados stale |
| A-05 | MEDIUM | suite mobile antiga aguarda animações continuamente no texto200 até timeout90s | proteger prontidão sem dispensar verificação de visibilidade/foco |
| A-06 | HIGH | UI-06 bilateral runtime starter/FullStack não executada | T007 e SC-035-003 continuam pendentes |
| A-07 | HIGH | 5 gates bloqueados por E2E FAIL | 15 gates precisam ser observados em HEAD final |

### PLAN / ownership preservado
- Corrigir a cadeia UX real em `TopBar` e sua regressão de conta; **nenhuma** mudança em login, sessão, POST de logout, senhas, exclusão ou mock de serviços.
- Corrigir reflow do footer em alta escala por wrapping de links sem quebrar palavras, mantendo `aria-current`, role e nomes; reservar espaço real após o último conteúdo.
- Conter altura visual do cabeçalho desktop entre 768–1023 mesmo com texto200: identidade truncada visualmente (nome completo acessível no disclosure), sem perder componente nem alterar auth.
- Fazer `use-content-scroll` deslocar apenas o scrollport dono em um passo determinístico; preservar scroll cache e sem relaxar asserts de geometria.
- No teste de dashboard com API intencionalmente bloqueada, iniciar retorno pelo link **persistente** do cabeçalho; o teste novo 035 permanece cobrindo retorno pela navegação contextual e autorização.
- Animações: limitar repetições de espera apenas no auxiliar do shell; foco/visibilidade/teclado continuam assertions funcionais.
- Executar suite preservada `rc-review-validation.ps1` no SHA final pela Actions oficial, inspecionar ZIP por gate e comparar falhas e screenshots; não tocar workflows, globais, dependências, B/C, fixtures ou ciência.

### REVIEW gates e critérios de saída
PASS somente quando o artefato final mostrar testes focais, segurança e todos os 15 gates PASS no mesmo SHA. Se houver FAIL, diagnosticar seu stack trace, não mascarar via `test.skip`, falso retorno ou timeout arbitrário. Se apenas 10 gates executarem, registrar os cinco restantes NOT_RUN. Comparação bilateral UI-06 segue independente da cobertura executável: **não dizer COMPLETO sem executar o starter**. Revalidar `GUARD_SHA`, development e ownership antes do push; manter PR #46 Draft sem merge/deploy. Se tempo/ambiente impossibilitar execução visual, registrar pendência factual.

### Ciclo A3: diagnóstico incremental e plano de verificação

O run A2 `41251125020` eliminou as 5 falhas anteriores de conta, dashboard e header em paisagem (e outras 2 de foco), mas deixou 5 falhas E2E e 3 cenários sem execução, conforme relatório real na implementação-evidence. Sem mudança de requisito, o plano incremental é: (1) corrigir scroll-padding escalado em `rem` exclusivamente no shell A e preservá-lo compatível com `env(safe-area-inset-bottom)`, (2) aguardar transições de modo limitado no auxiliar E2E sem enfraquecer as assertions de geometria, (3) selecionar controle *operável* no teste 035 e exigir foco real, (4) repetir o runner oficial no novo commit, ler PNGs/JSON e journal, (5) manter UI-06 bilateral como pendência se não for executada. O mapa e o dashboard de domínio não são modificados.

### A4 — reparo de tipo da preparação de testes

[Run A3 #41252699370](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41252699370), tentativa 1, SHA `8b9a60c3ff36f7ab80ef58eb8d035b71a2d60822`: RegressionSetup, Unit, Integration, Migration, Contract e R1 **PASS**; Build **FAIL** no typecheck do Next 16.3.8 em `tests/e2e/frontend-mobile-navigation.spec.ts:74`, `TS2365 Operator '<=' cannot be applied to types CSSNumberish and number`. Typecheck separado, Lint, E2E, Https, Deletion, Ihfr, Bootstrap, SchemaAudit não executados pelo runner fail-fast. O valor Web Animations `endTime` é `CSSNumberish`; o reparo A4 exige `typeof endTime === 'number'` antes da comparação. A espera ainda é finita e as assertions funcionais seguintes permanecem inalteradas. Revalidar todo o runner no HEAD A4, sem invocar PASS herdado de A2.
