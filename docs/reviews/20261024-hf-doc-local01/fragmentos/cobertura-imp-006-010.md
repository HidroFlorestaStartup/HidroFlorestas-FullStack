# Cobertura IMP-006–009, fronteira IMP-010 e incrementos CRI

Missão HF-DOC-20261024-LOCAL01, autoria nativa L-B, 24/10/2026. Inspeção documental/estática na worktree exclusiva da missão. Base development `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`; candidata #29 `00477e961e36416d8d602d36f7e0ee195c487148`. O [JSON pareado](cobertura-imp-006-010.json) é um array de24 linhas; cada ID abaixo tem os mesmos campos materiais. Não houve execução de aplicação, testes, build, npm, migration ou provedor; testes `NOT_RUN` e `consultedEvidence: []` significam que nenhum recibo foi convertido em execução própria.

## Autoridade e correspondência

`EVIDENCIA_IMPLEMENTACAO` descreve somente a cadeia diretamente inspecionada. Specs/contratos documentam a intenção de seu recorte e mantêm seus estados de aprovação; o PRD Code-First continua em revisão. Governança: constituição, SOURCE_AUTHORITY e source-policy consultadas. A numeração é resolvida pelo assunto: IMP-006→006 e frontend025; spec022 trata concorrência de capas e investigação IHFR, sem equivalência à IMP-006; IMP-007→007 e frontend020; IMP-008→008 e frontend026; IMP-009→009 e frontend027. A spec010 é cadastro público ACTIVE; a IMP-010 do backlog é estudo humano de UX da IMP-001. Specs mail-foundation/012/013/014/016 são incrementos próprios, sem renomear IMPs. Draft015/024 é detalhado no fragmento L-A por seu vínculo com IMP-005.

IHFR conserva, em toda a cadeia: `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`. Conformidade técnica, vetores de engenharia e recibos sintéticos não aprovam ciência, universalidade, calibração regional ou uso definitivo.

## Leitura dos estados e testes

`presentInDevelopment/presentInCandidate` refere-se à subcapacidade, não à presença de cada artefato investigativo: a #29 não modifica `src/**`, `prisma/**` ou dependências. As duas linhas futuras (Plotly e estudo humano) usam false/false para sua realização, embora os documentos de intenção existam. `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE` não declara validação runtime nesta missão.

Seleção inspecionada: `package.json` usa Node test runner, não Vitest. Unit seleciona `tests/unit/*.test.ts` e `*.test.tsx` e depois mail; `scripts/imp006-test-runner.ts` seleciona `tests/integration/*.test.ts`, `tests/contract/*.test.ts`, `tests/migration/*.test.ts` após preflight. `playwright.config.ts` cobre `tests/e2e`, mas exclui `ihfr-diagnosis-*.spec.ts`, `full-ui-flow.spec.ts` e `account-deletion.spec.ts`; HTTPS tem exclusão adicional. IHFR tem config/runner dedicado; exclusão tem `playwright.account-deletion.config.ts`/`scripts/account-deletion-e2e.ts`. `tests/investigations/**` não é coletado por esses globs. Existência e seleção não provam execução, cobertura integral, PASS ou aceite humano.

## Mapa do adendo para os textos antigos

| Fonte preservada | Localização/afirmação histórica | Adendo necessário |
|---|---|---|
| `docs/code-first-prd/implementation/backlog.md` | Linhas IMP-006/007/008/009: sem API/cálculo/UI; mock; adiado; sem interface | Usar os textos exatos por linha abaixo, sem substituir o corte histórico. |
| `docs/code-first-prd/implementation/implementation-plan.md` | Tabela Módulos identificados: IHFR sem API/cálculo; dashboard mock; mapa placeholder; admin sem UI | Apontar ao mesmo adendo e às cadeias006–009 abaixo; não copiar a ordem inicial antiga como prioridade atual. |
| `docs/code-first-prd/implementation/backlog.md` | IMP-010: UX humana adiada/NAO_VERIFICADO | Preservar pendência, sem declarar conclusão com spec010 ou testes automáticos. |
| `docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md` | Tabela do corte inicialbeba96f e adendos posteriores014/015/016 | Distinguir corte histórico do incremento já implementado; capa sem provedor homologado. |

Os adendos são propostas de redação (`RECOMENDACAO`) para o CHAT, não alterações canônicas executadas aqui. A implementação não estabelece uma nova intenção de produto.

## Resumo por subcapacidade

| ID | Recorte | Development / #29 | Estado técnico | Aceite humano / ciência |
|---|---|---|---|---|
| IMP-006-01 | Manifestos, parser fechado e avaliador determinístico | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Humano não verificado; ciência pendente |
| IMP-006-02 | Elegibilidade, ausência conhecida e incompatibilidade versionada | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Humano não verificado; ciência pendente |
| IMP-006-03 | Consulta CURRENT e detalhe imutável com DTO mínimo | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Humano não verificado; ciência pendente |
| IMP-006-04 | CREATE/REPLACE transacional, suplemento 1:N e vigência única | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Humano não verificado; ciência pendente |
| IMP-006-05 | Revogação justificada sem apagar diagnóstico | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Humano não verificado; ciência pendente |
| IMP-006-06 | Recuperação por chave, projeção terminal e fronteira da investigação29 | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Humano não verificado; ciência pendente |
| IMP-007-01 | Resumo persistido contextual | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Sem aceite novo; não valida ciência |
| IMP-007-02 | Histórico derivado paginado e navegação à origem | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Sem aceite novo; não valida ciência |
| IMP-008-01 | Projeção territorial privada de áreas-ponto/coletas | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Sem aceite novo; não valida ciência |
| IMP-008-02 | Leaflet, lista equivalente e recuperação visual | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Sem aceite novo; não valida ciência |
| IMP-008-03 | Fronteira: Plotly e análises territoriais futuras | false / false | NAO_LOCALIZADO | Sem aceite novo; não valida ciência |
| IMP-009-01 | Leitura global, filtros, detalhe e DTO mínimo | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Sem aceite novo; não valida ciência |
| IMP-009-02 | Alteração de estado com justificativa/OCC | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Sem aceite novo; não valida ciência |
| IMP-009-03 | Alteração de papel global e proteção do último administrador | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Sem aceite novo; não valida ciência |
| IMP-009-04 | Auditoria funcional administrativa, retenção imutável | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Sem aceite novo; não valida ciência |
| IMP-010-01 | Validação humana de UX de acesso: SC-006/SC-007 | false / false | NAO_APLICAVEL | Estudo humano não verificado |
| FRONTEIRA-SPEC-010 | Spec010 cadastro ACTIVE é entrega distinta da IMP-010 de UX | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Sem aceite novo; não valida ciência |
| CRI-MAIL-01 | Fundação mail: outbox, worker e transporte | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Sem aceite novo; não valida ciência |
| CRI-012-01 | Verificação e reenvio de e-mail | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Sem aceite novo; não valida ciência |
| CRI-012-02 | Reset/troca de senha e revogação de sessões | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Sem aceite novo; não valida ciência |
| CRI-013-01 | Exclusão pessoal condicionada e preservação de ciência | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Sem aceite novo; não valida ciência |
| CRI-014-01 | Runners de contas: seleção e fixtures próprias | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Sem aceite novo; não valida ciência |
| CRI-016-01 | Capa authenticated com proxy contextual e edição OCC | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Sem aceite novo; não valida ciência |
| CRI-016-02 | Cleanup por identidade imutável, leases e rollout operacional | true / true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE | Sem aceite novo; não valida ciência |

## IMP-006-01 — Manifestos, parser fechado e avaliador determinístico

- IMP/recorte: `IMP-006`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/006-ihfr-diagnosis/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/spec.md); [specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml); [docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md).
- Implementação: [src/app/api/server/ihfr-diagnosis/manifest-loader.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/ihfr-diagnosis/manifest-loader.ts); [src/app/api/server/ihfr-diagnosis/evaluator.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/ihfr-diagnosis/evaluator.ts); [src/app/api/server/ihfr-diagnosis/ihfr-diagnosis.contracts.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/ihfr-diagnosis/ihfr-diagnosis.contracts.ts); [src/app/api/server/ihfr-diagnosis/ihfr-diagnosis.constants.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/ihfr-diagnosis/ihfr-diagnosis.constants.ts); [specs/006-ihfr-diagnosis/contracts/ihfr-math-experimental-v0.1.1.json](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/contracts/ihfr-math-experimental-v0.1.1.json).

| Elo | Evidência e limite |
|---|---|
| route | POST /api/laboratories/{laboratoryId}/areas/{areaId}/collections/{collectionId}/ihfr-diagnosis/diagnoses invoca handler e serviço; avaliador não tem endpoint público independente. |
| authorization | requireAuth; authorizeWrite/authorizeLaboratoryAccess MANAGE_IHFR_DIAGNOSIS, OWNER/ADMIN contextual e laboratório ativo. |
| service | loadActiveIHFRManifest verifica hash e congela manifesto; parseIHFRDiagnosisRequest fecha campos; evaluator calcula determinística e explicitamente a versão v0.1.1. |
| persistence | Leitura EnvironmentalMeasurementSet ihfr-measurement-v1; novo suplemento fechado deduplicado e diagnóstico versionado no ciclo transacional (006-04). |
| ui | IHFRDiagnosisManagement informa uso da terra/origem/observedAt; ScientificNotice mostra quatro qualificadores. |

Testes existentes: `tests/unit/ihfr-diagnosis-manifest-loader.test.ts`; `tests/unit/ihfr-diagnosis-evaluator.test.ts`; `tests/unit/ihfr-diagnosis-input-policy.test.ts`; `tests/contract/ihfr-diagnosis-api.test.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual. Ciência: CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, tabela Itens, linha IMP-006: “AGUARDANDO_DECISOES; model sem API, cálculo ou interface conectada.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO em c4adfb3 e 00477e9: manifestos históricos/ativo com hash verificável, parser fechado e avaliador TypeScript determinístico estão conectados ao serviço experimental; fórmula, scores e pesos não são cientificamente homologados. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO

Lacuna/limite: Vetores de engenharia não substituem vetores científicos/testes de campo; G2-SCI permanece pendente.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## IMP-006-02 — Elegibilidade, ausência conhecida e incompatibilidade versionada

- IMP/recorte: `IMP-006`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/006-ihfr-diagnosis/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/spec.md); [specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml); [docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md).
- Implementação: [src/app/api/server/services/ihfr-diagnosis.service.ts — IHFRDiagnosisService.eligibility](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/ihfr-diagnosis.service.ts); [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/eligibility/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/%5BlaboratoryId%5D/areas/%5BareaId%5D/collections/%5BcollectionId%5D/ihfr-diagnosis/eligibility/route.ts); [src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-eligibility.handler.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-eligibility.handler.ts); [src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx).

| Elo | Evidência e limite |
|---|---|
| route | GET .../ihfr-diagnosis/eligibility: outcomes controlados (inclusive INCOMPATIBLE_VERSION) retornam 200; query inválida retorna 400. O terminal idempotente422 pertence ao POST .../diagnoses. |
| authorization | requireAuth; READ_IHFR_DIAGNOSIS; vínculo atual e cadeia laboratório→área→coleta. |
| service | eligibility distingue coleta não confirmada, ausência do measurement set/slope/landUseType, incompatibilidade e currentDiagnosisId; desconhecidos são inválidos. |
| persistence | Consulta CollectionData e EnvironmentalMeasurementSet e ponteiro vigente; nenhuma escrita na elegibilidade. |
| ui | Gerência solicita elegibilidade e distingue insuficiência; GET não gera diagnóstico. |

Testes existentes: `tests/integration/ihfr-diagnosis-eligibility-route.test.ts`; `tests/unit/ihfr-diagnosis-input-policy.test.ts`; `tests/integration/ihfr-diagnosis-persisted-insufficiency.test.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual. Ciência: CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, tabela Itens, linha IMP-006: “AGUARDANDO_DECISOES; model sem API, cálculo ou interface conectada.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: elegibilidade contextual e insuficiência estão implementadas; ausência não vira zero nem score fabricado. GET /eligibility retorna HTTP 200 com outcome INCOMPATIBLE_VERSION para incompatibilidade controlada e HTTP 400 para query inválida; POST /diagnoses distingue falha estrutural/sintática 400 de seleção bem formada incompatível com terminal idempotente 422 conforme PD-018. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO

Lacuna/limite: Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## IMP-006-03 — Consulta CURRENT e detalhe imutável com DTO mínimo

- IMP/recorte: `IMP-006`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/006-ihfr-diagnosis/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/spec.md); [specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml); [docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md).
- Implementação: [src/app/api/server/services/ihfr-diagnosis.service.ts — IHFRDiagnosisService.readCurrent/readDetail](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/ihfr-diagnosis.service.ts); [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/current/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/%5BlaboratoryId%5D/areas/%5BareaId%5D/collections/%5BcollectionId%5D/ihfr-diagnosis/current/route.ts); [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/diagnoses/[diagnosisId]/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/%5BlaboratoryId%5D/areas/%5BareaId%5D/collections/%5BcollectionId%5D/ihfr-diagnosis/diagnoses/%5BdiagnosisId%5D/route.ts); [src/app/api/server/areas/area.authorization.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts); [src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/dashboard/laboratories/%5BlaboratoryId%5D/areas/%5BareaId%5D/collections/%5BcollectionId%5D/page.tsx); [src/components/ihfr-diagnosis/experimental-diagnosis-summary.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/ihfr-diagnosis/experimental-diagnosis-summary.tsx); [src/components/ihfr-diagnosis/scientific-notice.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/ihfr-diagnosis/scientific-notice.tsx).

| Elo | Evidência e limite |
|---|---|
| route | GET .../current e GET .../diagnoses/{diagnosisId}; seis operações HTTP no contrato, incluindo as demais linhas006. |
| authorization | requireAuth; READ_IHFR_DIAGNOSIS, OWNER/ADMIN/MEMBER vinculados; IDs/contexto resolvidos; leitura permitida em laboratório inativo. |
| service | readCurrent/readDetail e project derivam área, ciclo, score, classe, qualidade, versões/hash e proveniência permitida. |
| persistence | ExperimentalIHFRDiagnosis, CurrentExperimentalIHFRDiagnosis, IHFRDiagnosisLifecycleEvent; legado não é promovido. |
| ui | Página de detalhe da coleta chama readCurrent; ExperimentalDiagnosisSummary/NoCurrentDiagnosis/ScientificNotice. |

Testes existentes: `tests/integration/ihfr-diagnosis-current-route.test.ts`; `tests/integration/ihfr-diagnosis-detail-route.test.ts`; `tests/integration/ihfr-diagnosis-read-authorization.test.ts`; `tests/unit/ihfr-diagnosis-public-dto.test.ts`; `tests/e2e/ihfr-diagnosis-read.spec.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual. Ciência: CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, tabela Itens, linha IMP-006: “AGUARDANDO_DECISOES; model sem API, cálculo ou interface conectada.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: consulta experimental vigente e detalhe estão conectados ao serviço/persistência e à página da coleta, com DTO público e ausência explícita; não há interpretação científica definitiva nem promoção de legado. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO

Lacuna/limite: Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## IMP-006-04 — CREATE/REPLACE transacional, suplemento 1:N e vigência única

- IMP/recorte: `IMP-006`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/006-ihfr-diagnosis/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/spec.md); [specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml); [docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md).
- Implementação: [src/app/api/server/services/ihfr-diagnosis.service.ts — IHFRDiagnosisService.createOrReplace/writeWithRetry](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/ihfr-diagnosis.service.ts); [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/diagnoses/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/%5BlaboratoryId%5D/areas/%5BareaId%5D/collections/%5BcollectionId%5D/ihfr-diagnosis/diagnoses/route.ts); [src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-write.handler.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-write.handler.ts); [prisma/migrations/20260920000100_ihfr_experimental_diagnosis/migration.sql](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260920000100_ihfr_experimental_diagnosis/migration.sql); [prisma/migrations/20260926000100_ihfr_lifecycle_reference_integrity/migration.sql](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260926000100_ihfr_lifecycle_reference_integrity/migration.sql); [src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx).

| Elo | Evidência e limite |
|---|---|
| route | POST .../diagnoses com mode CREATE ou REPLACE, versões/hash e Idempotency-Key próprios. |
| authorization | requireAuth/authorizeWrite antes do parsing; MANAGE_IHFR_DIAGNOSIS revalidada na transação, OWNER/ADMIN em contexto ativo. |
| service | createOrReplace→writeWithRetry; hash do request, expectedCurrentDiagnosisId, lock por coleta e retry de transação; avaliação e resultado terminal atômicos. |
| persistence | Suplemento UNIQUE(collectionDataId,payloadHash) reutilizável 1:N; diagnóstico/ledger/eventos imutáveis, ponteiro único; migrations 20260920 e integridade cruzada20260926. |
| ui | IHFRDiagnosisManagement confirma criação/substituição e gerencia estado incerto; resultado reabre na coleta. |

Testes existentes: `tests/integration/ihfr-diagnosis-write-route.test.ts`; `tests/integration/ihfr-diagnosis-service-lifecycle.test.ts`; `tests/integration/ihfr-diagnosis-concurrency.test.ts`; `tests/integration/ihfr-diagnosis-supplement-cardinality.test.ts`; `tests/migration/ihfr-diagnosis-cross-record-integrity.test.ts`; `tests/e2e/ihfr-diagnosis-manage.spec.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual. Ciência: CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, tabela Itens, linha IMP-006: “AGUARDANDO_DECISOES; model sem API, cálculo ou interface conectada.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: CREATE/REPLACE, suplemento deduplicado 1:N, imutabilidade, idempotência e vigência única estão implementados em cadeia; o novo diagnóstico substitui o anterior por evento, sem reescrevê-lo. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO

Lacuna/limite: Concorrência técnica IHFR observada em código/testes; INV-002 é incidente de quota/emissão de tickets de CAPAS e não prova nem refuta concorrência/recuperação do diagnóstico. Seu controle específico não integra a evidência desta linha.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## IMP-006-05 — Revogação justificada sem apagar diagnóstico

- IMP/recorte: `IMP-006`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/006-ihfr-diagnosis/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/spec.md); [specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml); [docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md).
- Implementação: [src/app/api/server/services/ihfr-diagnosis.service.ts — IHFRDiagnosisService.revoke](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/ihfr-diagnosis.service.ts); [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/diagnoses/[diagnosisId]/revocations/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/%5BlaboratoryId%5D/areas/%5BareaId%5D/collections/%5BcollectionId%5D/ihfr-diagnosis/diagnoses/%5BdiagnosisId%5D/revocations/route.ts); [src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-revocation.handler.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-revocation.handler.ts); [prisma/migrations/20260920000100_ihfr_experimental_diagnosis/migration.sql](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260920000100_ihfr_experimental_diagnosis/migration.sql); [src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx).

| Elo | Evidência e limite |
|---|---|
| route | POST .../diagnoses/{diagnosisId}/revocations. |
| authorization | requireAuth/authorizeWrite; OWNER/ADMIN contextual ativo; diagnóstico e vigente esperado devem pertencer à coleta. |
| service | revoke valida motivo fechado/limite, expectedCurrentDiagnosisId, operação e replay; disputa produz conflito. |
| persistence | Remove só ponteiro CURRENT; grava evento REVOKED e ledger imutáveis, preserva diagnóstico/suplemento. |
| ui | Gerência confirma motivo e reflete ausência de vigente; histórico técnico mantém proveniência. |

Testes existentes: `tests/integration/ihfr-diagnosis-revocation.test.ts`; `tests/migration/ihfr-diagnosis-immutability.test.ts`; `tests/e2e/ihfr-diagnosis-manage.spec.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual. Ciência: CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, tabela Itens, linha IMP-006: “AGUARDANDO_DECISOES; model sem API, cálculo ou interface conectada.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: revogação autorizada, justificada e idempotente remove vigência e preserva evidências imutáveis; não edita nem exclui o diagnóstico. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO

Lacuna/limite: Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## IMP-006-06 — Recuperação por chave, projeção terminal e fronteira da investigação29

- IMP/recorte: `IMP-006`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/006-ihfr-diagnosis/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/spec.md); [specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml); [docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md).
- Implementação: [src/app/api/server/services/ihfr-diagnosis.service.ts — IHFRDiagnosisService.operation](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/ihfr-diagnosis.service.ts); [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/operations/[idempotencyKey]/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/%5BlaboratoryId%5D/areas/%5BareaId%5D/collections/%5BcollectionId%5D/ihfr-diagnosis/operations/%5BidempotencyKey%5D/route.ts); [src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-operation.handler.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-operation.handler.ts); [docs/releases/2026-10-23-hf-inv-local01/ihfr/results.md — Contexto investigativo INV-001; INV-002 é CAPAS, sem prova de recuperação IHFR](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/docs/releases/2026-10-23-hf-inv-local01/ihfr/results.md).

| Elo | Evidência e limite |
|---|---|
| route | GET .../operations/{idempotencyKey}. |
| authorization | requireAuth; READ_IHFR_DIAGNOSIS e chave escopada ao ator/cadeia; não expõe ledger de terceiros. |
| service | operation consulta resultado terminal, diferencia replay/ausência e não repete cálculo. |
| persistence | IHFRDiagnosisOperation UNIQUE(actorUserId,idempotencyKey), hash e response persistidos; sem nova escrita na recuperação. |
| ui | IHFRDiagnosisManagement mantém chave estável e recupera resultado incerto antes de alegar sucesso. |

Testes existentes: `tests/integration/ihfr-diagnosis-idempotency.test.ts`; `tests/unit/ihfr-diagnosis-write-response.test.ts`; `tests/e2e/ihfr-diagnosis-manage.spec.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima; controle de quota de capas pertence à CRI-016-01.

Aceite humano: NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual. Ciência: CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, tabela Itens, linha IMP-006: “AGUARDANDO_DECISOES; model sem API, cálculo ou interface conectada.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: recuperação terminal por chave própria está implementada. A #29 acrescenta evidência investigativa, sem patch de produto: INV-001 continua causalmente limitado; INV-002 e o teste two-request-quota referem emissão de tickets de CAPAS, não recuperação IHFR. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO

Lacuna/limite: Recuperação IHFR é sustentada pelos testes dedicados de idempotência/gerência. O diretório investigations/ihfr contém também controle de quota de capas; nome do diretório não cria equivalência funcional nem evidência de recuperação IHFR.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## IMP-007-01 — Resumo persistido contextual

- IMP/recorte: `IMP-007`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/007-dashboard-history/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/007-dashboard-history/spec.md); [specs/007-dashboard-history/contracts/dashboard-api.openapi.yaml](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/007-dashboard-history/contracts/dashboard-api.openapi.yaml); [specs/020-frontend-laboratory-dashboard/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/020-frontend-laboratory-dashboard/spec.md).
- Implementação: [src/app/api/laboratories/[laboratoryId]/dashboard/summary/route.handlers.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/%5BlaboratoryId%5D/dashboard/summary/route.handlers.ts); [src/app/api/server/services/dashboard.service.ts — DashboardService.summary](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/dashboard.service.ts); [src/app/api/server/areas/area.authorization.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts); [src/app/(private)/dashboard/laboratories/[laboratoryId]/page.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/dashboard/laboratories/%5BlaboratoryId%5D/page.tsx); [src/components/dashboard/dashboard-summary.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/dashboard/dashboard-summary.tsx).

| Elo | Evidência e limite |
|---|---|
| route | GET /api/laboratories/{laboratoryId}/dashboard/summary. |
| authorization | requireAuth→authorizeLaboratoryAccess READ_AREAS; conta ACTIVE e vínculo atual; laboratório inativo legível. |
| service | DashboardService.summary calcula totais reais de áreas e coletas com campos de confirmação completos. |
| persistence | CollectionArea.count e CollectionData.count na transação; sem tabela de resumo ou dados ambientais/IHFR. |
| ui | DashboardSummary é montado na página contextual e distingue carregamento/vazio/erro/retry. |

Testes existentes: `tests/unit/dashboard-service.test.ts`; `tests/integration/dashboard-routes.test.ts`; `tests/e2e/dashboard-history.spec.ts`; `tests/e2e/frontend-dashboard.spec.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO: SC-008 na parcela de tecnologia assistiva e SC-009 (estudo moderado com participantes representativos, meta de90%) permanecem pendentes segundo specs/007-dashboard-history/spec.md; teclado/foco/ARIA automáticos não os substituem. Ciência: NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, tabela Itens, linha IMP-007: “PARCIAL_MOCKADO; composição visual e dados fixos sem fonte persistida.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: o dashboard contextual consulta totais persistidos de áreas e coletas confirmadas, com autorização e estados de interface; não agrega resultados IHFR, dados ambientais, drafts ou capas.

Lacuna/limite: Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação. SC-008 (tecnologia assistiva) e SC-009 (estudo moderado,90%) continuam NAO_VERIFICADO; nenhuma sessão humana foi executada nesta missão.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## IMP-007-02 — Histórico derivado paginado e navegação à origem

- IMP/recorte: `IMP-007`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/007-dashboard-history/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/007-dashboard-history/spec.md); [specs/007-dashboard-history/contracts/dashboard-api.openapi.yaml](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/007-dashboard-history/contracts/dashboard-api.openapi.yaml); [specs/020-frontend-laboratory-dashboard/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/020-frontend-laboratory-dashboard/spec.md).
- Implementação: [src/app/api/laboratories/[laboratoryId]/dashboard/history/route.handlers.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/%5BlaboratoryId%5D/dashboard/history/route.handlers.ts); [src/app/api/server/services/dashboard.service.ts — DashboardService.history](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/dashboard.service.ts); [src/app/api/server/dashboard/dashboard.contracts.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/dashboard/dashboard.contracts.ts); [src/components/dashboard/dashboard-history.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/dashboard/dashboard-history.tsx).

| Elo | Evidência e limite |
|---|---|
| route | GET /api/laboratories/{laboratoryId}/dashboard/history?cursor=... |
| authorization | requireAuth; READ_AREAS antes de validar cursor/consultar fontes; escopo do laboratório atual. |
| service | history combina AREA_CREATED e COLLECTION_CONFIRMED, ordenação determinística e página20/cursor; consulta21 de cada fonte. |
| persistence | Deriva de CollectionArea.createdAt e CollectionData.confirmedAt; nenhum event store/auditoria nova. |
| ui | DashboardHistory pagina, limpa estado por contexto e abre destinos de área/coleta. |

Testes existentes: `tests/unit/dashboard-contracts.test.ts`; `tests/unit/dashboard-service.test.ts`; `tests/integration/dashboard-routes.test.ts`; `tests/e2e/dashboard-history.spec.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO: SC-008 na parcela de tecnologia assistiva e SC-009 (estudo moderado com participantes representativos, meta de90%) permanecem pendentes segundo specs/007-dashboard-history/spec.md; teclado/foco/ARIA automáticos não os substituem. Ciência: NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, tabela Itens, linha IMP-007: “PARCIAL_MOCKADO; composição visual e dados fixos sem fonte persistida.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: histórico básico é projeção persistida paginada de criação de área e confirmação de coleta, com links para origem; não equivale a auditoria universal nem histórico científico.

Lacuna/limite: Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação. SC-008 (tecnologia assistiva) e SC-009 (estudo moderado,90%) continuam NAO_VERIFICADO; nenhuma sessão humana foi executada nesta missão.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## IMP-008-01 — Projeção territorial privada de áreas-ponto/coletas

- IMP/recorte: `IMP-008`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/008-territorial-map/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/008-territorial-map/spec.md); [specs/008-territorial-map/contracts/territorial-map-api.openapi.yaml](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/008-territorial-map/contracts/territorial-map-api.openapi.yaml); [specs/026-frontend-territorial-map/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/026-frontend-territorial-map/spec.md).
- Implementação: [src/app/api/laboratories/[laboratoryId]/territorial-map/route.handlers.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/%5BlaboratoryId%5D/territorial-map/route.handlers.ts); [src/app/api/server/services/territorial-map.service.ts — TerritorialMapService.read](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/territorial-map.service.ts); [src/app/api/server/territorial-map/territorial-map.contracts.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/territorial-map/territorial-map.contracts.ts); [src/app/api/server/areas/area.authorization.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts); [src/app/(private)/dashboard/laboratories/[laboratoryId]/map/page.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/dashboard/laboratories/%5BlaboratoryId%5D/map/page.tsx).

| Elo | Evidência e limite |
|---|---|
| route | GET /api/laboratories/{laboratoryId}/territorial-map. |
| authorization | requireAuth; READ_AREAS, conta ACTIVE/vínculo atual; leitura em laboratório inativo. |
| service | read seleciona somente id/nome/coordenadas de área e coletas confirmadas em uma query contextual. |
| persistence | CollectionArea latitude/longitude e CollectionData confirmada; nenhuma migration própria008; não consulta EnvironmentalMeasurementSet/ExperimentalIHFRDiagnosis. |
| ui | Página map monta TerritorialMapView; lista/contagem/destinos de coletas vinculados à área. |

Registro de limites: [implementation-evidence008](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/008-territorial-map/implementation-evidence.md).

Testes existentes: `tests/unit/territorial-map-service.test.ts`; `tests/unit/territorial-map-contracts.test.ts`; `tests/integration/territorial-map-route.test.ts`; `tests/e2e/territorial-map.spec.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO: tecnologia assistiva real e estudo moderado com participantes permanecem pendentes conforme specs/008-territorial-map/implementation-evidence.md; teclado/overflow automatizados não os substituem. Ciência: NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, tabela Itens, linha IMP-008: “ESPECIFICADO_E_PLANEJADO_DOCUMENTALMENTE; T001–T055 aguardam nova análise independente e a implementação permanece adiada.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: o mapa mínimo privado já projeta áreas-ponto e coletas confirmadas do laboratório, com endpoint real e navegação à origem; sem localização própria da coleta, polígonos, camada ambiental ou IHFR.

Lacuna/limite: Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação. p95 de 100 leituras, EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) e interação sem tiles permanecem NAO_VERIFICADO no registro da008; nenhuma medição própria nesta missão.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## IMP-008-02 — Leaflet, lista equivalente e recuperação visual

- IMP/recorte: `IMP-008`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/008-territorial-map/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/008-territorial-map/spec.md); [specs/008-territorial-map/contracts/territorial-map-api.openapi.yaml](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/008-territorial-map/contracts/territorial-map-api.openapi.yaml); [specs/026-frontend-territorial-map/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/026-frontend-territorial-map/spec.md).
- Implementação: [src/components/territorial-map/territorial-map-view.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/territorial-map/territorial-map-view.tsx); [src/components/territorial-map/territorial-map.client.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/territorial-map/territorial-map.client.tsx); [src/components/territorial-map/territorial-map.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/territorial-map/territorial-map.tsx); [src/components/territorial-map/territorial-map-state.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/territorial-map/territorial-map-state.ts); [src/components/territorial-map/territorial-map.module.css](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/territorial-map/territorial-map.module.css).

| Elo | Evidência e limite |
|---|---|
| route | Mesma GET territorial-map; não há endpoint/cartografia paralelo criado pela UI. |
| authorization | Página getLaboratoryContext + API server-authorized; estados não concedem acesso por frontend. |
| service | TerritorialMapService.read e serializeTerritorialArea alimentam mapa/lista. |
| persistence | Projeção transitória de fontes existentes; tiles externos não são fonte de registros científicos. |
| ui | Leaflet/React-Leaflet, lista textual e markers com teclado; estado de tiles/erro de transporte, retry e foco conforme026. |

Registro de limites: [implementation-evidence008](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/008-territorial-map/implementation-evidence.md).

Testes existentes: `tests/unit/territorial-map-state.test.ts`; `tests/e2e/territorial-map.spec.ts`; `tests/e2e/frontend-territorial-map.spec.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO: tecnologia assistiva real e estudo moderado com participantes permanecem pendentes conforme specs/008-territorial-map/implementation-evidence.md; teclado/overflow automatizados não os substituem. Ciência: NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, tabela Itens, linha IMP-008: “ESPECIFICADO_E_PLANEJADO_DOCUMENTALMENTE; implementação permanece adiada.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: Leaflet/React-Leaflet, lista textual, seleção por teclado e recuperação de erro já existem no mapa mínimo; a inspeção atual não homologa dispositivos, leitor de tela nem aceite visual humano.

Lacuna/limite: INV-003/NAV-SETTLE e OBS não têm causa histórica encerrada pelos protocolos atuais; capturas não substituem homologação. p95 de 100 leituras, EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) e interação sem tiles permanecem NAO_VERIFICADO no registro da008; nenhuma medição própria nesta missão.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## IMP-008-03 — Fronteira: Plotly e análises territoriais futuras

- IMP/recorte: `IMP-008`; classificação: `FATO_DOCUMENTADO`.
- Presença development/candidata: `false/false`; estado: `NAO_LOCALIZADO`.
- Intenção: [TECH_DECISIONS.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/TECH_DECISIONS.md); [specs/008-territorial-map/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/008-territorial-map/spec.md); [docs/code-first-prd/analysis/gaps-and-open-questions.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/analysis/gaps-and-open-questions.md).
- Implementação: [package.json](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/package.json); [src/app/api/server/services/territorial-map.service.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/territorial-map.service.ts).

| Elo | Evidência e limite |
|---|---|
| route | NAO_IMPLEMENTADO no recorte observado: nenhum endpoint Plotly/analítico identificado. |
| authorization | Contrato futuro a definir; autorização do mapa não concede análise científica nova. |
| service | TerritorialMapService não calcula nem consulta IHFR ou medidas. |
| persistence | Nenhuma tabela/migration Plotly específica; entradas futuras a definir. |
| ui | Não há componente Plotly; Leaflet não comprova gráficos analíticos. |

Testes existentes: nenhum caso automático reivindicado para realizar esta entrega humana/futura. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_APLICAVEL: entrega futura. Ciência: NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.

Texto antigo em `TECH_DECISIONS.md`, TD-010, decisões confirmadas ainda não implementadas: “Adotar Plotly ... em entrega posterior à IMP-009. ... NAO_IMPLEMENTADO.”

Adendo exato recomendado:

> FATO_DOCUMENTADO: a direção Plotly e suas pendências permanecem atuais no recorte observado; mapa mínimo entregue não satisfaz gráficos analíticos futuros.

Lacuna/limite: Decisões de integração/dados/gráficos e ciência aplicável ainda abertas; não confundir mapa mínimo entregue com toda a visão territorial.

Próxima ação: RECOMENDACAO: preservar como entrega futura dependente de contratos e decisões próprias; não atribuir novo IMP por inferência.

## IMP-009-01 — Leitura global, filtros, detalhe e DTO mínimo

- IMP/recorte: `IMP-009`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/009-user-administration/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/spec.md); [specs/009-user-administration/contracts/admin-users.openapi.yaml](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/contracts/admin-users.openapi.yaml); [specs/027-frontend-user-administration/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/027-frontend-user-administration/spec.md).
- Implementação: [src/app/api/admin/users/route.handlers.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/admin/users/route.handlers.ts); [src/app/api/admin/users/[userId]/route.handlers.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/admin/users/%5BuserId%5D/route.handlers.ts); [prisma/migrations/20260920000100_remove_legacy_is_admin/migration.sql](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260920000100_remove_legacy_is_admin/migration.sql); [src/app/api/server/services/user-administration.service.ts — UserAdministrationService.list/detail](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/user-administration.service.ts); [src/app/api/server/user-administration/global-authority.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/user-administration/global-authority.ts); [src/app/api/server/middlewares/admin.middleware.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/middlewares/admin.middleware.ts); [src/components/user-administration/user-administration-page.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/user-administration/user-administration-page.tsx).

| Elo | Evidência e limite |
|---|---|
| route | GET /api/admin/users e GET /api/admin/users/{userId}. |
| authorization | requireAdmin→requireAuth→requireGlobalAdmin(role ADMIN); serviço reconsulta ator ACTIVE/ADMIN na transação. ADMIN global difere de ADMIN contextual. |
| service | list/detail revalidam autoridade global, fecham query, filtram estado/papel/busca, paginam e projetam campos públicos administrativos sem senha/hash. |
| persistence | User selecionado por allowlist e filtros/cursor; User.isAdmin legado removido por migration20260920000100. |
| ui | /admin/users monta UserAdministrationPage; alias /dashboard/admin/users preservado; lista/detalhe/filtros/diálogos e erros de versão conforme027. |

Registro de limites: [implementation-evidence009](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/implementation-evidence.md).

Testes existentes: `tests/unit/user-administration-read-service.test.ts`; `tests/integration/user-administration-routes.test.ts`; `tests/e2e/user-administration-read.spec.ts`; `tests/e2e/frontend-user-administration.spec.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO: revisão humana com leitor de tela/tecnologia assistiva permanece pendente conforme specs/009-user-administration/implementation-evidence.md; Playwright/DOM/build não substituem esse gate. Ciência: NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, tabela Itens, linha IMP-009: “FORA_DO_RECORTE_INICIAL; infraestrutura parcial e sem interface conectada.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: administração global tem lista/filtros/detalhe e UI conectada, restrita a ADMIN global ACTIVE; role governa autoridade, e isAdmin legado foi removido.

Lacuna/limite: Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## IMP-009-02 — Alteração de estado com justificativa/OCC

- IMP/recorte: `IMP-009`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/009-user-administration/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/spec.md); [specs/009-user-administration/contracts/admin-users.openapi.yaml](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/contracts/admin-users.openapi.yaml); [specs/027-frontend-user-administration/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/027-frontend-user-administration/spec.md).
- Implementação: [src/app/api/admin/users/[userId]/status/route.handlers.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/admin/users/%5BuserId%5D/status/route.handlers.ts); [prisma/migrations/20260919000100_user_administration/migration.sql](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260919000100_user_administration/migration.sql); [src/app/api/server/services/user-administration.service.ts — UserAdministrationService.changeStatus](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/user-administration.service.ts); [src/app/api/server/user-administration/global-authority.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/user-administration/global-authority.ts); [src/app/api/server/middlewares/admin.middleware.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/middlewares/admin.middleware.ts); [src/components/user-administration/user-administration-page.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/user-administration/user-administration-page.tsx).

| Elo | Evidência e limite |
|---|---|
| route | PATCH /api/admin/users/{userId}/status. |
| authorization | requireAdmin→requireAuth→requireGlobalAdmin(role ADMIN); serviço reconsulta ator ACTIVE/ADMIN na transação. ADMIN global difere de ADMIN contextual. |
| service | changeStatus proíbe autoalteração, compara expectedRevision/expectedStatus, protege último ADMIN ACTIVE, incrementa revision e audita atomicamente. |
| persistence | User.revision e AdministrativeAuditEvent; migration20260919000100 define checks e imutabilidade de auditoria; escrita serializable. |
| ui | /admin/users monta UserAdministrationPage; alias /dashboard/admin/users preservado; lista/detalhe/filtros/diálogos e erros de versão conforme027. |

Registro de limites: [implementation-evidence009](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/implementation-evidence.md).

Testes existentes: `tests/unit/user-administration-status-service.test.ts`; `tests/integration/user-administration-concurrency.test.ts`; `tests/integration/user-administration-last-admin.test.ts`; `tests/e2e/user-administration-status.spec.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO: revisão humana com leitor de tela/tecnologia assistiva permanece pendente conforme specs/009-user-administration/implementation-evidence.md; Playwright/DOM/build não substituem esse gate. Ciência: NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, tabela Itens, linha IMP-009: “FORA_DO_RECORTE_INICIAL; infraestrutura parcial e sem interface conectada.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: estado de outra conta pode ser alterado por ADMIN global com justificativa e versão esperada; autoalteração e remoção do último ADMIN ACTIVE são protegidas. Não é aprovação manual obrigatória de cadastro.

Lacuna/limite: Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação. Retorno de conta previamente ativada a PENDING permanece PENDENCIA_DE_DECISAO (spec009 e implementation-evidence); o código conserva o contrato atual que admite essa transição, sem aprovar a recomendação de restringi-la à pré-ativação.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## IMP-009-03 — Alteração de papel global e proteção do último administrador

- IMP/recorte: `IMP-009`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/009-user-administration/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/spec.md); [specs/009-user-administration/contracts/admin-users.openapi.yaml](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/contracts/admin-users.openapi.yaml); [specs/027-frontend-user-administration/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/027-frontend-user-administration/spec.md).
- Implementação: [src/app/api/admin/users/[userId]/role/route.handlers.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/admin/users/%5BuserId%5D/role/route.handlers.ts); [prisma/migrations/20260919000100_user_administration/migration.sql](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260919000100_user_administration/migration.sql); [src/app/api/server/services/user-administration.service.ts — UserAdministrationService.changeRole](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/user-administration.service.ts); [src/app/api/server/user-administration/global-authority.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/user-administration/global-authority.ts); [src/app/api/server/middlewares/admin.middleware.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/middlewares/admin.middleware.ts); [src/components/user-administration/user-administration-page.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/user-administration/user-administration-page.tsx).

| Elo | Evidência e limite |
|---|---|
| route | PATCH /api/admin/users/{userId}/role. |
| authorization | requireAdmin→requireAuth→requireGlobalAdmin(role ADMIN); serviço reconsulta ator ACTIVE/ADMIN na transação. ADMIN global difere de ADMIN contextual. |
| service | changeRole verifica expectedRevision/expectedRole, proíbe autoalteração, protege último administrador ativo e persiste papel+evento na mesma transação. |
| persistence | User.revision e AdministrativeAuditEvent; migration20260919000100 define checks e imutabilidade de auditoria; escrita serializable. |
| ui | /admin/users monta UserAdministrationPage; alias /dashboard/admin/users preservado; lista/detalhe/filtros/diálogos e erros de versão conforme027. |

Registro de limites: [implementation-evidence009](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/implementation-evidence.md).

Testes existentes: `tests/unit/user-administration-role-service.test.ts`; `tests/integration/user-administration-last-admin.test.ts`; `tests/integration/user-administration-concurrency.test.ts`; `tests/e2e/user-administration-role.spec.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO: revisão humana com leitor de tela/tecnologia assistiva permanece pendente conforme specs/009-user-administration/implementation-evidence.md; Playwright/DOM/build não substituem esse gate. Ciência: NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, tabela Itens, linha IMP-009: “FORA_DO_RECORTE_INICIAL; infraestrutura parcial e sem interface conectada.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: papel global de outra conta é mutável com OCC/justificativa/auditoria; isso não muda papéis OWNER/ADMIN/MEMBER do laboratório nem autoriza implicitamente o ADMIN global ao território.

Lacuna/limite: Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## IMP-009-04 — Auditoria funcional administrativa, retenção imutável

- IMP/recorte: `IMP-009`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/009-user-administration/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/spec.md); [specs/009-user-administration/contracts/admin-users.openapi.yaml](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/contracts/admin-users.openapi.yaml); [specs/027-frontend-user-administration/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/027-frontend-user-administration/spec.md).
- Implementação: [src/app/api/admin/users/[userId]/audit/route.handlers.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/admin/users/%5BuserId%5D/audit/route.handlers.ts); [prisma/migrations/20260919000100_user_administration/migration.sql](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260919000100_user_administration/migration.sql); [src/app/api/server/services/user-administration.service.ts — UserAdministrationService.audit](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/user-administration.service.ts); [src/app/api/server/user-administration/global-authority.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/user-administration/global-authority.ts); [src/app/api/server/middlewares/admin.middleware.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/middlewares/admin.middleware.ts); [src/components/user-administration/user-administration-page.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/user-administration/user-administration-page.tsx).

| Elo | Evidência e limite |
|---|---|
| route | GET /api/admin/users/{userId}/audit. |
| authorization | requireAdmin→requireAuth→requireGlobalAdmin(role ADMIN); serviço reconsulta ator ACTIVE/ADMIN na transação. ADMIN global difere de ADMIN contextual. |
| service | audit valida alvo/filtro/cursor e pagina eventos permitidos; eventos before/after/motivo/revision têm trigger de imutabilidade. |
| persistence | User.revision e AdministrativeAuditEvent; migration20260919000100 define checks e imutabilidade de auditoria; escrita serializable. |
| ui | /admin/users monta UserAdministrationPage; alias /dashboard/admin/users preservado; lista/detalhe/filtros/diálogos e erros de versão conforme027. |

Registro de limites: [implementation-evidence009](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/implementation-evidence.md).

Testes existentes: `tests/unit/user-administration-audit-service.test.ts`; `tests/migration/user-administration-migration.test.ts`; `tests/e2e/user-administration-audit.spec.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO: revisão humana com leitor de tela/tecnologia assistiva permanece pendente conforme specs/009-user-administration/implementation-evidence.md; Playwright/DOM/build não substituem esse gate. Ciência: NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, tabela Itens, linha IMP-009: “FORA_DO_RECORTE_INICIAL; infraestrutura parcial e sem interface conectada.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: auditoria administrativa paginada e imutável registra mudanças de estado/papel; não equivale ao histórico básico do dashboard nem à auditoria científica IHFR.

Lacuna/limite: Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## IMP-010-01 — Validação humana de UX de acesso: SC-006/SC-007

- IMP/recorte: `IMP-010`; classificação: `FATO_DOCUMENTADO`.
- Presença development/candidata: `false/false`; estado: `NAO_APLICAVEL`.
- Intenção: [specs/001-authenticated-access/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/001-authenticated-access/spec.md); [specs/001-authenticated-access/quickstart.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/001-authenticated-access/quickstart.md); [docs/code-first-prd/implementation/backlog.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/backlog.md).
- Implementação: [specs/001-authenticated-access/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/001-authenticated-access/spec.md).

| Elo | Evidência e limite |
|---|---|
| route | Acesso autenticado é pré-condição; endpoints técnicos não medem tempo/compreensão de participantes. |
| authorization | Protocolo humano deve usar participantes/ambiente autorizados e minimizar dados. |
| service | NAO_APLICAVEL: estudo de usabilidade, não serviço de produto. |
| persistence | Amostra, tempos sem assistência e compreensão devem ser registrados por protocolo humano; não encontrados como aceite atual. |
| ui | Fluxos de login e falha são objeto de avaliação; automação de teclado/layout não mede90% de participantes. |

Testes existentes: nenhum caso automático reivindicado para realizar esta entrega humana/futura. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO: nenhum estudo de participantes executado ou inferido nesta missão. Ciência: NAO_APLICAVEL à UX do acesso.

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, tabela Itens, linha IMP-010: “ADIADO_PARA_UX_PRODUTO; SC-006 e SC-007 estão NAO_VERIFICADO.”

Adendo exato recomendado:

> FATO_DOCUMENTADO: IMP-010 continua follow-up humano não bloqueante da IMP-001: metas originais de90% (entrada em até2min e compreensão de falhas) estão NAO_VERIFICADO; ausência de aceite não é ausência de autenticação implementada.

Lacuna/limite: Participantes/protocolo/amostra/tempos/compreensão e autoridade de aceite continuam pendentes. Estado de implementação NAO_APLICAVEL porque IMP-010 é avaliação humana, não capacidade de software a implementar; realização do estudo continua não verificada.

Próxima ação: RECOMENDACAO: manter IMP-010 como pesquisa/aceite de UX e designar responsável/protocolo; nenhum teste automático substitui SC-006/007.

## FRONTEIRA-SPEC-010 — Spec010 cadastro ACTIVE é entrega distinta da IMP-010 de UX

- IMP/recorte: `FRONTEIRA-SPEC-010`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/010-active-public-signup/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/010-active-public-signup/spec.md); [specs/012-account-verification-recovery/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/012-account-verification-recovery/spec.md); [TECH_DECISIONS.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/TECH_DECISIONS.md).
- Implementação: [src/app/api/auth/sign-up/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/sign-up/route.ts); [src/app/api/server/accounts/service.ts — AccountService.signup/login](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/accounts/service.ts); [src/app/api/server/accounts/http.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/accounts/http.ts); [prisma/schema.prisma](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/schema.prisma).

| Elo | Evidência e limite |
|---|---|
| route | POST /api/auth/sign-up (e sign-in para retomada). |
| authorization | Cadastro público com política/CSRF/idempotência; estado ACTIVE não dispensa emailVerifiedAt quando verificationRequired. |
| service | Rota atual delega AccountService.signup; cria ACTIVE com verificationRequired:true e sessão email-verification até confirmação. AuthService da entrega010 é evidência histórica, não a cadeia atual isolada. |
| persistence | User, AccountEmailChallenge, AccountRequest e outbox; 012 refina sessão sem revogar origem histórica TD-017. |
| ui | Cadastro→/verify-email; login retoma verificação quando necessário. |

Testes existentes: `tests/unit/auth-service.test.ts`; `tests/integration/account-verification-recovery.test.ts`; `tests/e2e/account-verification-recovery.spec.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual. Ciência: NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.

Texto antigo em `specs/010-active-public-signup/spec.md`, US1 e FR-001/FR-002; refinamento posterior em012: “Criar conta e entrar imediatamente ... conta nasce ACTIVE.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: o cadastro continua ACTIVE; a cadeia atual passa por AccountService e sessão restrita até verificação segundo012. Esta spec não é a IMP-010 de validação humana de UX.

Lacuna/limite: Risco de equivalência numérica entre IMP, spec e fase frontend; preservação de TD-017 e refinamento012 precisam aparecer juntos.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## CRI-MAIL-01 — Fundação mail: outbox, worker e transporte

- IMP/recorte: `CRI-MAIL`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/mail-foundation/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/mail-foundation/spec.md); [docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md).
- Implementação: [src/app/api/internal/mail/process/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/internal/mail/process/route.ts); [src/app/api/server/mail/trigger.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/mail/trigger.ts); [src/app/api/server/mail/outbox.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/mail/outbox.ts); [src/app/api/server/mail/worker.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/mail/worker.ts); [src/app/api/server/mail/transport.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/mail/transport.ts); [prisma/migrations/20261004000100_mail_foundation/migration.sql](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20261004000100_mail_foundation/migration.sql).

| Elo | Evidência e limite |
|---|---|
| route | GET/POST /api/internal/mail/process. |
| authorization | Guard de configuração e Bearer do worker; não é endpoint público de envio nem depende de sessão de participante. |
| service | enqueueMail/outbox/worker, leases e fencing; transporte/SMTP validado de forma lazy; recibo SENT/accepted não prova recebimento. |
| persistence | MailOutbox e tentativas/locks de envio; payload protegido conforme contrato. |
| ui | Sem UI própria; e-mails de verificação/reset/aviso são efeitos das jornadas012/013. |

Testes existentes: `tests/integration/mail-outbox.test.ts`; `tests/mail/mail-smtp.test.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual. Ciência: NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, Estado corrente do recorte CRI / Incrementos CRI: “Mail-foundation/012/013 já têm código integrado ... Gate B de contas e aceite humano de exclusão continuam abertos.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: fundação mail está integrada com outbox/worker/leases/fencing; envio real, recebimento da caixa e scheduler do FullStack exigem provas próprias. Run histórico de outra homologação não comprova o destino atual.

Lacuna/limite: Gate B/SMTP/recebimento/scheduler/operação hospedada pendentes; sem contato a provedor nesta missão.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## CRI-012-01 — Verificação e reenvio de e-mail

- IMP/recorte: `CRI-012`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/012-account-verification-recovery/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/012-account-verification-recovery/spec.md); [specs/018-frontend-account/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/018-frontend-account/spec.md); [docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md).
- Implementação: [src/app/api/auth/email-verification/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/email-verification/route.ts); [src/app/api/auth/email-verification/confirm/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/email-verification/confirm/route.ts); [src/app/api/auth/email-verification/resend/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/email-verification/resend/route.ts); [src/app/api/server/accounts/service.ts — signup/verificationState/resend/confirmVerification](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/accounts/service.ts); [src/app/api/server/auth/session.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/auth/session.ts); [src/components/account/email-verification-form.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/account/email-verification-form.tsx); [prisma/migrations/20261004000200_account_verification_recovery/migration.sql](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20261004000200_account_verification_recovery/migration.sql).

| Elo | Evidência e limite |
|---|---|
| route | POST sign-up; GET email-verification; POST confirm/resend. |
| authorization | Cookie com propósito email-verification, challenge ligado a usuário/versão, CSRF, política e rate limit; privado só após confirmação. |
| service | Conta ACTIVE + desafio/outbox atômicos, código protegido/uso único/expiração/reenvio que invalida anterior e retomada legítima. |
| persistence | User.emailVerifiedAt/verificationRequired/credentialVersion, AccountEmailChallenge, AccountRequest, rate limits e outbox. |
| ui | EmailVerificationForm permite confirmar/reenvio/logout e erros; frontend018 não substitui contrato012. |

Testes existentes: `tests/contract/account-api.test.ts`; `tests/integration/account-verification-recovery.test.ts`; `tests/e2e/account-verification-recovery.spec.ts`; `tests/e2e/frontend-account.spec.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual. Ciência: NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, Estado corrente do recorte CRI / Incrementos CRI: “Mail-foundation/012/013 já têm código integrado ... Gate B de contas ... continuam abertos.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: verificação/reenvio/sessão restrita/retomada estão implementados; Gate B de recebimento e jornadas humanas no destino não está encerrado. ACTIVE administrativo e autorização de sessão são eixos distintos.

Lacuna/limite: Spec012 conserva cabeçalho histórico 'implementação em andamento'; código não é homologação remota nem aceite humano.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## CRI-012-02 — Reset/troca de senha e revogação de sessões

- IMP/recorte: `CRI-012`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/012-account-verification-recovery/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/012-account-verification-recovery/spec.md); [specs/018-frontend-account/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/018-frontend-account/spec.md); [docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md).
- Implementação: [src/app/api/auth/password-reset/request/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/password-reset/request/route.ts); [src/app/api/auth/password-reset/confirm/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/password-reset/confirm/route.ts); [src/app/api/auth/change-password/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/change-password/route.ts); [src/app/api/server/accounts/service.ts — requestReset/confirmReset/changePassword/passwordChanged](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/accounts/service.ts); [src/app/api/server/auth/session.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/auth/session.ts); [src/components/account/password-reset-form.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/account/password-reset-form.tsx); [src/components/account/forgot-password-form.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/account/forgot-password-form.tsx).

| Elo | Evidência e limite |
|---|---|
| route | POST password-reset/request, password-reset/confirm e change-password. |
| authorization | CSRF/política/rate limits; request genérico sem enumerar conta; proof fechado e uso único; troca requer sessão e senha atual. |
| service | requestReset enfileira sem divulgar identidade; confirmReset consome prova e passwordChanged atualiza credentialVersion, invalida desafios/sessões. |
| persistence | AccountEmailChallenge/AccountRequest, hash de senha/User.credentialVersion e outbox de aviso. |
| ui | ForgotPasswordForm/PasswordResetForm; token em fragmento conforme contrato, sem exigir sessão original para reset. |

Testes existentes: `tests/integration/account-verification-recovery.test.ts`; `tests/e2e/account-verification-recovery.spec.ts`; `tests/e2e/frontend-account.spec.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual. Ciência: NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, Estado corrente do recorte CRI / Incrementos CRI: “reset por link real pendente.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: solicitação/reset/troca e revogação por credentialVersion estão implementados; recebimento, consumo do link em jornada humana e SMTP do destino seguem separados dos testes sintéticos.

Lacuna/limite: Gate B operacional/humano permanece; não promover relato de recebimento sem consumo a aceite de reset.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## CRI-013-01 — Exclusão pessoal condicionada e preservação de ciência

- IMP/recorte: `CRI-013`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/013-account-deletion/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/013-account-deletion/spec.md); [docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md).
- Implementação: [src/app/api/auth/account-deletion/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/account-deletion/route.ts); [src/app/api/server/accounts/deletion.http.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/accounts/deletion.http.ts); [src/app/api/server/accounts/service.ts — deletionState/deletionBlockers/deleteAccount](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/accounts/service.ts); [src/app/api/server/accounts/deletion.contracts.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/accounts/deletion.contracts.ts); [src/components/account/account-deletion-form.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/account/account-deletion-form.tsx); [prisma/migrations/20261005000100_account_deletion_mail_ownership/migration.sql](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20261005000100_account_deletion_mail_ownership/migration.sql).

| Elo | Evidência e limite |
|---|---|
| route | GET/DELETE /api/auth/account-deletion. |
| authorization | Sessão própria elegível/restrita conforme contrato; CSRF, confirmação e senha atual; revalidação sob lock. |
| service | deletionBlockers impede apagar vínculos/autorias científicas; deleteAccount limpa dados pessoais permitidos/draft pessoal e invalida acesso. |
| persistence | Transação de User/desafios/requests/mail ownership; restrições de FK preservam domínio e ciência; capa da área não é apagada pela conta. |
| ui | AccountDeletionForm mostra bloqueios/consequências e confirma senha; não é exclusão administrativa009. |

Testes existentes: `tests/unit/account-deletion-contracts.test.ts`; `tests/integration/account-deletion.test.ts`; `tests/migration/account-deletion.test.ts`; `tests/e2e/account-deletion.spec.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual. Ciência: NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, Estado corrente do recorte CRI / Incrementos CRI: “aceite humano de exclusão ... continua aberto.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: exclusão da própria conta existe com senha/confirmacão, bloqueios de vínculos/autorias e limpeza pessoal permitida, sem excluir ciência ou capa de área; aceite humano013 segue pendente.

Lacuna/limite: Homologação humana e operação do destino permanecem pendentes; não usar implementação como decisão de apagar dados reais.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## CRI-014-01 — Runners de contas: seleção e fixtures próprias

- IMP/recorte: `CRI-014`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/014-account-test-runners/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/014-account-test-runners/spec.md); [docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md).
- Implementação: [playwright.config.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/playwright.config.ts); [playwright.account-deletion.config.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/playwright.account-deletion.config.ts); [scripts/account-deletion-e2e.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/scripts/account-deletion-e2e.ts); [scripts/accounts-local-postgresql.ps1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/scripts/accounts-local-postgresql.ps1).

| Elo | Evidência e limite |
|---|---|
| route | NAO_APLICAVEL: infraestrutura de verificação, sem capacidade de produto nova. |
| authorization | Guards de loopback/banco sintético e fixtures dos runners; nenhuma autorização operacional hospedada. |
| service | Suíte geral exclui account-deletion; runner dedicado cria fixtures e mantém cenários/assertions. Preparador compara SQL LF/CRLF sem aceitar alteração de conteúdo. |
| persistence | Somente PostgreSQL sintético autorizado quando runner é executado; nada executado nesta missão. |
| ui | Playwright próprio; não acrescenta fluxo de usuário. |

Testes existentes: `tests/e2e/account-deletion.spec.ts`; `tests/unit/accounts-local-postgresql.test.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual. Ciência: NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, Estado corrente do recorte CRI / Incrementos CRI: “funcionalidades aprovadas014/015/016 têm evidências locais em runtime.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO:014 corrige seleção/preparação dos testes de contas, preservando fixtures/guards e a suíte dedicada de exclusão; número014 não é novo requisito funcional nem aceite externo.

Lacuna/limite: Seleção atual foi inspecionada, não executada; ausência de caso na suíte geral não significa ausência de cobertura dedicada.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## CRI-016-01 — Capa authenticated com proxy contextual e edição OCC

- IMP/recorte: `CRI-016`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/016-area-covers/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/016-area-covers/spec.md); [specs/021-frontend-areas-cover/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/021-frontend-areas-cover/spec.md); [docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md).
- Implementação: [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/image/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/%5BlaboratoryId%5D/areas/%5BareaId%5D/image/route.ts); [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/image/content/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/%5BlaboratoryId%5D/areas/%5BareaId%5D/image/content/route.ts); [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/image/uploads/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/%5BlaboratoryId%5D/areas/%5BareaId%5D/image/uploads/route.ts); [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/image/uploads/[attemptId]/confirm/route.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/%5BlaboratoryId%5D/areas/%5BareaId%5D/image/uploads/%5BattemptId%5D/confirm/route.ts); [src/app/api/server/images/service.ts — AreaCoverService.initiate/confirm/content/remove](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/images/service.ts); [src/app/api/server/images/cloudinary.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/images/cloudinary.ts); [src/app/api/server/images/sanitize.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/images/sanitize.ts); [src/components/areas/area-cover.tsx](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/areas/area-cover.tsx); [prisma/migrations/20261010000200_area_covers/migration.sql](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20261010000200_area_covers/migration.sql).

| Elo | Evidência e limite |
|---|---|
| route | GET/DELETE image, GET image/content, POST uploads e POST uploads/{attemptId}/confirm. |
| authorization | requireAuth/CSRF; READ_AREAS leitura; MANAGE_AREA_IMAGE OWNER/ADMIN contextual ativo para mutações; reautoriza após download. |
| service | Uma capa privada; tickets/attempt antes de I/O, quota de 3 tentativas ativas e 10 por hora, expectedRevision/CAS, Sharp reencode sem metadados e provider authenticated. |
| persistence | AreaCover/CoverUploadAttempt; revisão/asset identity; cadeia de migrations016 não substitui registro legado CollectionArea.image. |
| ui | AreaCover: upload/confirmação/remover/retry e fallback;021 consome016 sem converter URL CDN em dado público. |

Instrumento contextual29: [two-request-quota.test.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/investigations/ihfr/two-request-quota.test.ts) verifica AreaCoverService.initiate/FakeCoverProvider para INV-002, fora dos globs usuais; diretório ihfr não altera o assunto CAPAS.

Testes existentes: `tests/unit/area-cover-contracts.test.ts`; `tests/integration/area-cover-http.test.ts`; `tests/integration/area-cover-provider.test.ts`; `tests/integration/area-cover-transactions.test.ts`; `tests/migration/area-covers.test.ts`; `tests/e2e/area-covers.spec.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual. Ciência: NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, Estado corrente do recorte CRI / Incrementos CRI: “Corte inicial beba96f: DTO/serviço/UI não fazem upload ... Cloudinary não é dependência.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: o recorte016 posterior implementa capa Cloudinary authenticated com proxy autorizado, revisão/OCC, validação e reencode; a linha inicial da matriz é histórica e já tem adendo corrente. Não é galeria, upload público nem provedor homologado.

Lacuna/limite: Configuração/feature off e fallback devem ser decididos por destino; nenhum Cloudinary real ou teste foi acionado nesta missão. INV-002 é concorrência de emissão de tickets de CAPAS; controle de duas chamadas em00477e9 não demonstra retrospectivamente a causa histórica e não é teste de recuperação IHFR.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## CRI-016-02 — Cleanup por identidade imutável, leases e rollout operacional

- IMP/recorte: `CRI-016`; classificação: `EVIDENCIA_IMPLEMENTACAO`.
- Presença development/candidata: `true/true`; estado: `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE`.
- Intenção: [specs/016-area-covers/spec.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/016-area-covers/spec.md); [docs/operations/area-covers-runbook.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/operations/area-covers-runbook.md); [docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md).
- Implementação: [src/app/api/server/images/service.ts — AreaCoverService.cleanup](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/images/service.ts); [src/app/api/server/images/provider.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/images/provider.ts); [src/app/api/server/images/cloudinary.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/images/cloudinary.ts); [src/app/api/server/images/settings.ts](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/images/settings.ts); [prisma/migrations/20261010000200_area_covers/migration.sql](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20261010000200_area_covers/migration.sql).

| Elo | Evidência e limite |
|---|---|
| route | Cleanup é operação interna/runner, não concessão por UI de participante. |
| authorization | Ownership de asset_id/publicId/contexto comprovado, feature flag/config válidas e leases; sem exclusão por URL/prefixo presumido. |
| service | cleanup seleciona jobs e revalida identidade/fencing antes de destruir; mismatch fica RECONCILE; não há expiração automática de tombstone. |
| persistence | CoverCleanupJob com lease/CAS/retry; area cover persiste independentemente da conta criadora. |
| ui | Fallback e indisponibilidade preservam metadados/antiga; operador/monitoramento de créditos não têm aceite humano automático. |

Testes existentes: `tests/integration/area-covers.test.ts`; `tests/integration/area-covers-contention.test.ts`; `tests/integration/area-cover-provider.test.ts`. Execução `NOT_RUN`; evidências de execução consultadas no campo da linha: `[]`. Seleção conforme regra acima.

Aceite humano: NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual. Ciência: NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.

Texto antigo em `docs/code-first-prd/implementation/backlog.md`, Estado corrente do recorte CRI / Incrementos CRI: “operação real pendente.”

Adendo exato recomendado:

> EVIDENCIA_IMPLEMENTACAO: cleanup016 opera somente sobre identidade imutável comprovada, com leases/reconciliação, sem apagar capa na exclusão da conta. RECOMENDACAO: conservar decisão de rollout/fallback/operador como pendência operacional separada.

Lacuna/limite: Cloudinary, créditos/cleanup real e decisão explícita de capas off/on no piloto permanecem pendentes; G3–G5 não herdam PASS técnico.

Próxima ação: RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.

## Validação documental do fragmento

JSON parseado com24 IDs únicos; fontes associadas a SHAs e paths verificadas por `git cat-file -e`; testes/globs inspecionados sem execução. Revisão de escopo/terminologia e `git diff --check` fazem parte da validação final coordenada. Não há decisão de integração/fechamento de PR, homologação operacional ou científica nesta autoria.
