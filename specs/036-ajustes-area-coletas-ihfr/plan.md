# Implementation Plan: área/coletas/IHFR — preparação B

**Branch**: `feat/ajustes-area-coletas-ihfr` | **Date**: 2026-10-31 | **Spec**: [spec.md](spec.md)
**Estado**: IMPLEMENTADO_EM_REVISAO; fonte G0 preservada, validação runtime/visual e revisão independente pendentes.

## Summary and technical context

UI-02/UI-03/UI-04/UI-06 no conteúdo de área/coleta. Base `07755822f5dc75fe2be1d924005d30ed99f64a0b`; development de origem `9b8595d232842d401ce81bbc92c54dd543aa2829`; dependência de integração #45.

Next.js/App Router e TypeScript existentes; PostgreSQL apenas sintético nos testes autorizados. CI preservada Windows/Node 24.19.0/PowerShell. Ler versões locais e contratos reais antes de planejar alterações de consulta. Não redefinir o algoritmo IHFR, persistência confirmada ou autorização. Desempenho quantitativo novo: não especificado.

## Constitution Check

Recorte e decisões aprovados, spec/branch/PR separados, ciência e fonte histórica preservadas. Verificação de implementação e revisão independente pendentes; G0 é mesmo executor sequencial.

## Project Structure and ownership

Documentação exclusiva: `specs/036-ajustes-area-coletas-ihfr/`.
Pontos de entrada observados na árvore base:
- `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx`;
- `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx`;
- subrotas `environmental-data` da coleta.

Esses caminhos orientam a leitura; o executor deve seguir imports e congelar a lista exata de componentes/leituras e AGENTS aplicáveis antes de editar. Nenhuma inspeção runtime de cada componente é alegada por G0. B controla detalhe da área/coleta; não controla o formulário de localização C nem o shell/layout A.

Testes novos propostos, ainda não criados: `tests/unit/hf-ui036-area-presentation.test.ts` e `tests/e2e/hf-ui036-area-collections.spec.ts`; adequar ao harness existente. DTO/repositórios de áreas, estilos/UI compartilhada, fixtures e configuração exigem um writer alocado pelo coordenador. Vercel/workflow somente leitura.

## Sequência e dependências

1. Preflight por SHA/PR/guardas e ambiente local; completar Spec Kit na reserva 036, rastreabilidade Code-First e mapa de arquivos.
2. Testar/implementar US1: instantes de ocorrência com offsets, desempate técnico explícito e seleção/exibição correta de resultado disponível e sua origem.
3. Testar/implementar US2 e US3, sem confundir confirmado/draft, resultado válido/revogado e prova científica.
4. Comparar starter/FullStack no mesmo estado e viewport; usar fixtures sintéticas, não mocks como produto.
5. Executar testes focais e os quinze gates existentes; registrar SHA/run/tentativa, falhas e NOT_RUN; atualizar documentação/PR.

Pode iniciar sem aguardar A/C. Quando o shell A estiver pronto, validar a composição com seu contrato antes da integração futura; mudanças compartilhadas são propostas ao coordenador, não absorvidas por merge nesta missão.

## Handoff Git

Pai exato do primeiro commit B: `07755822f5dc75fe2be1d924005d30ed99f64a0b`. Usar a branch existente; não recriar de development sem os guards. Diff exclusivo `git diff 07755822f5dc75fe2be1d924005d30ed99f64a0b...HEAD`; acumulado inicial `git diff 9b8595d232842d401ce81bbc92c54dd543aa2829...HEAD`. PR final para development, dependência #45 explícita.

Integração futura somente autorizada: guards primeiro, conciliar shell/DTO e refazer CI. Se guards sofrer squash/rebase, transportar apenas commits B posteriores à base congelada e revisar a união das configurações. Não executar merge, deploy ou alteração de branch alheia agora.

## Riscos e parada focal

Ordenação textual de datas, misturar último diagnóstico com última coleta, exibir revogado, ocultar qualificadores e alterar confirmação são riscos materiais. Bloquear somente recorte dependente de decisão não resolvida; continuar tarefas independentes. Não implementar UI-07, REV-01–REV-03, ciência ou provedores.


## Mapa real de imports, contratos e writer B

Os caminhos abaixo foram confirmados por inspeção do HEAD G0 `353a3fd00bc7d4155ab3fc2f17ad063e7108d68f` e alterados exclusivamente pelo executor B; nenhuma alteração a arquivos compartilhados de A/C foi absorvida.

| Camada | Arquivo exato | Contrato / limitação |
| --- | --- | --- |
| Rota área | `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx` | `requireAuth`, `areasService.detail`; anexa o componente B, mantém mapa/capa/formulário existente |
| Leitura B de coleções | `src/app/api/server/collections/area-collections.read.ts` | `authorizeLaboratoryAccess` (READ_AREAS + READ_IHFR_DIAGNOSIS), valida laboratório/área, consulta somente registros completos com ponteiro CURRENT |
| Projeção pura B | `src/components/areas/area-collections-presentation.ts` | preservar offset RFC3339; instante UTC desc; desempate por UUID desc; primeira coleta com ponteiro vigente |
| UI B de área | `src/components/areas/area-collections.tsx` | lista, origem do IHFR, links reais para coleta/ambiental/IHFR, ausência explícita; dados de score persistido |
| Rota coleta | `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx` | `collectionsService.detail`, `ihfrDiagnosisService.readCurrent`, leitura de existência de medições e `READ_IHFR_DIAGNOSIS`; desktop duas colunas |
| Leitura presença ambiental B | `src/app/api/server/collections/collection-environmental-presence.read.ts` | `READ_ENVIRONMENTAL_DATA`, contexto completo, `environmentalMeasurementSet` sem parse do payload/versão, para não bloquear leitura de coleta legada |
| Conteúdo coleta | `src/components/collections/collection-detail.tsx` | mensagem humana, CTA de registro quando ativo; metadados confirmados imutáveis e link ambiental |
| Resultado | `src/components/ihfr-diagnosis/experimental-diagnosis-summary.tsx` | `<details>/<summary>` nativos, quatro qualificadores e proveniência preservados |
| Gestão de diagnóstico | `src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx` | feedback humano traduz razões técnicas; sem mudança de transação/idempotência |
| Unidade | `tests/unit/hf-ui036-area-presentation.test.ts`, `tests/unit/frontend-ihfr-presentation.test.tsx` | ordem/offset/corrente/ausência/teclado sem motor científico |
| E2E | `tests/e2e/hf-ui036-area-collections.spec.ts`, `tests/e2e/ihfr-diagnosis-read.spec.ts` | fixtures isoladas PostgreSQL sintético, rota completa, viewports 320/375/390/768/1440 e 200%, máscara em capturas; testes pré-existentes com asserções adaptadas ao disclosure aprovado |

Dependências **somente leitura**: `src/app/api/server/services/areas.service.ts`, `collections.service.ts`, `environmental-data.service.ts`, `ihfr-diagnosis.service.ts`, `src/app/api/server/areas/area.authorization.ts`, `src/lib/collection-date-time.ts`, `prisma/schema.prisma`, `src/types/*`, `src/components/areas/areas.module.css`, `src/components/collections/collections.module.css`. Componentes compartilhados e DTOs pertencentes ao coordenador não sofreram escrita.

Fontes Code-First relacionadas: `docs/code-first-prd/README.md` e `governance/source-policy.md` (**EM_REVISAO**, não normativos); `specs/021-frontend-areas-cover/`, `023-frontend-collections/`, `024-frontend-environmental-drafts/`, `025-frontend-ihfr/`, `docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md` (v0.1 experimental). Fonte de decisão de UI: PR #44 no SHA congelado.

`AGENTS.md` raiz e constituição Spec Kit lidos; não se localizaram `AGENTS.md` aninhados nos diretórios de escrita ou `.specify/extensions.yml`/checklist próprio de 036. `scripts/rc-review-validation.ps1` registra os 15 gates sem alterações. Execução foi via API GitHub, sem checkout atual com dependências Windows/Node 24; o ZIP local de setembro não é HEAD atual e não substitui evidência de runtime.

## Verificações de integração pendentes

1. Comparar FullStack **e starter** com mesmos dados/viewport e registrar imagens reais; fixtures sintéticas da action não constituem tal comparação automaticamente.
2. Ler conclusão dos 15 gates no SHA final, incluindo o E2E conhecido do shell com texto200, e só marcar PASS com logs. Guardar imagens e geometria criadas pelo harness E2E se o gate as produzir.
3. A revisão por segundo executor e o aceite humano continuam pendentes; nenhuma ferramenta `spawn_agent` real estava disponível nesta sessão (`NATIVE_SUBAGENTS_UNAVAILABLE`).

## Ciclo corretivo Spec Kit — 2026-10-31 (ANALYZE → PLAN → IMPLEMENT → REVIEW)

### ANALYZE (somente leitura)

- Fonte de execução: run [41234289600](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41234289600), tentativa 1, commit `6cfd15b026055566dda529e2c6964a60ce1de372`. Os 12 primeiros gates passaram; `Ihfr` falhou (4 PASS, 2 FAIL) e `Bootstrap`/`SchemaAudit` não rodaram.
- Achado UI036-R1: `tests/e2e/ihfr-diagnosis-manage.spec.ts` usava área da fixture IMP-006 com diagnóstico CURRENT preexistente em coleta de ocorrência `now()`, posterior às datas estáticas dos dois registros novos. A lista/seleção do produto estava coerente, mas a expectativa do teste confundia fonte da fixture com fonte criada pela prova.
- Achado UI036-R2: a leitura em `tests/e2e/ihfr-diagnosis-read.spec.ts` detectou fragmentação de `experimental` pelo helper `expectIHFRScientificWords` em 320px/200%; há uma sequência de paddings em `ExperimentalDiagnosisSummary` e `ScientificNotice`. O reparo anterior de ícone empilhado não recuperou largura suficiente.
- Checagem de consistência spec → plan → tasks: R1 afeta FR-036-001/SC-036-001; R2 afeta FR-036-003/SC-036-002; ambos cabem na branch B. Não há conflito com a constituição ou decisão científica. T008 (comparação real com starter) permanece pendente; análise de código/screenshot de uma só aplicação não equivale à comparação dos runtimes.

### PLAN (plano focal)

1. Em R1, criar uma nova área via `POST /api/laboratories/{laboratoryId}/areas` autenticado, **dentro do schema PostgreSQL descartável já alocado pelo runner IMP-006**. Realizar nela o fluxo real coleta → medições confirmadas → diagnóstico CURRENT → coleta de campo posterior sem diagnóstico. Comparar ambas as origens na área sem alterar, excluir ou recalibrar fixtures compartilhadas.
2. Em R2, reduzir somente paddings internos do aviso IHFR no componente da própria B, preservando font-size 200%, texto integral, rótulos científicos, `<details>/<summary>` e os asserts existentes de palavras inteiras/scrollWidth. Nenhuma mudança de layout/shell global.
3. Validar no HEAD publicado com os **15 gates originais**, banco sintético isolado e artefatos de viewport; classificação individual PASS/FAIL/NOT_RUN por SHA/tentativa. Não corrigir falhas apagando asserts, mudando timeouts ou removendo testes.
4. REVIEW: verificar diff exclusivo contra `07755822f5dc75fe2be1d924005d30ed99f64a0b`, acumulado contra development atual; confirmar nenhum arquivo de A/C/ci/provedor/ciência alterado; registrar revisão técnica sequencial (não independente por subagente) e pendências visuais/humanas.

**Ambiente:** GitHub API/Actions; sem checkout atualizado neste executor por DNS externo indisponível. Skills `speckit-analyze`, `speckit-plan`, `speckit-implement` e constituição 1.0.0 foram conferidas no repositório, sem executar seus scripts Bash locais. Não existe `.specify/extensions.yml` ou checklist 036 no HEAD inicial.
