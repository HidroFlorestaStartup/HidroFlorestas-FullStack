# Cobertura IMP-002–005 e fronteira IMP-001 — L-A

Missão `HF-DOC-20261024-LOCAL01`, 2026-10-24. Autor lógico L-A, delegado nativamente. Modelo/esforço não foram expostos por ferramenta nesta execução; não há atribuição de Ultra. Ownership: apenas este Markdown e seu [JSON](cobertura-imp-002-005.json). Sem commit.

## Recorte e evidência

- Development: `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- Candidata: `00477e961e36416d8d602d36f7e0ee195c487148`.
- Estado inicial da worktree: nenhum arquivo rastreado alterado; apenas `docs/plans/active/hf-doc-20261024/` não rastreado, preexistente à atuação de L-A e preservado.
- Inspeção estática de arquivos rastreados e Git como dados. `git diff --stat` entre os dois SHAs foi vazio em `src`, `prisma` e `specs`; `git diff --name-only` foi vazio em `tests/unit`, `tests/integration`, `tests/migration` e `tests/e2e`. Isto explica a presença igual nos dois snapshots, sem atribuir resultados executados a eles.
- Cada vínculo abaixo usa SHA integral na URL; o JSON contém SHA integral em cada referência. As specs não foram associadas a IMP pela igualdade numérica: 019/020 refinam workspace/papéis; 021 refina áreas/capas; 023 refina coleta; 015/024 incrementam dados ambientais.
- Aplicação, testes, build, npm, scripts operacionais, banco/migrations, provedor, deploy e navegador: `NOT_RUN`. Leitura dos arquivos de teste identifica intenção dos cenários; não produz PASS. Evidências históricas são declarações documentadas sobre seus próprios cortes, consultadas sem execução.
- Não foram lidos valores de ambiente nem `demo-private.json`; `docs/raw/**` não foi usado. Documentação de governança/Code-First e fontes históricas da própria feature foram lidas como dados. Nenhum adendo canônico foi aplicado.
- `presentInDevelopment`/`presentInCandidate` indicam cadeia localizada estaticamente; `false` no ingresso significa `NAO_LOCALIZADO` na superfície delimitada. Não é prova de inexistência em toda branch.
- `oldClaim` identifica trecho antigo a preservar e adendar; `nextAction`/`recommendedAddendum` são `RECOMENDACAO`, sem decisão de produto inferida.

## Quadro de subcapacidades

| ID | IMP | Recorte | Development | Candidata | Estado |
|---|---|---|---|---|---|
| `IMP-001-F01` | `IMP-001` | Fronteira de sessão exigida pelos fluxos 002–005: identidade corrente, conta ACTIVE, verificação quando exigida e credentialVersion. | presente | presente | `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE` |
| `IMP-002-C01` | `IMP-002` | Criar laboratório por nome e listar apenas vínculos atuais, com limite de cinco, criação atômica e DTO público. | presente | presente | `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE` |
| `IMP-002-C02` | `IMP-002` | Consultar informações/membros mínimos e desativar ou excluir laboratório com confirmação textual e restrição a dados dependentes. | presente | presente | `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE` |
| `IMP-002-F03` | `IMP-002` | Fronteira de ingresso/convite por código: não confundir criação/listagem conectadas com gestão de ingresso implementada. | não localizado | não localizado | `NAO_LOCALIZADO` |
| `IMP-003-C01` | `IMP-003` | Selecionar laboratório explicitamente e preservar o contexto na URL/navegação com revalidação de vínculo e inativo somente leitura. | presente | presente | `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE` |
| `IMP-003-C02` | `IMP-003` | Papéis contextuais OWNER/ADMIN/MEMBER, proprietário único e alteração concorrente de papel por OWNER. | presente | presente | `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE` |
| `IMP-003-C03` | `IMP-003` | Criar área-ponto por entrada manual/mapa/localização opcional, validar e persistir apenas ponto final e autoria contextual. | presente | presente | `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE` |
| `IMP-003-C04` | `IMP-003` | Listar e detalhar áreas reais do laboratório, com ponto, opcionais, privacidade e somente leitura. | presente | presente | `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE` |
| `IMP-004-C01` | `IMP-004` | Iniciar coleta na área, informar ocorrência RFC3339/offset/milissegundos e revisar em memória antes de confirmar. | presente | presente | `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE` |
| `IMP-004-C02` | `IMP-004` | Confirmar coleta atomicamente, recuperar resposta perdida sem duplicação e preservar a identidade que iniciou a tentativa. | presente | presente | `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE` |
| `IMP-004-C03` | `IMP-004` | Consultar coleta confirmada e preservar associação, autoria interna, precisão temporal e imutabilidade. | presente | presente | `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE` |
| `IMP-005-C01` | `IMP-005` | Contrato de captura ambiental v1: quatro grupos, unidades/regras explícitas, ausência distinta de zero/false e separação da matemática IHFR. | presente | presente | `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE` |
| `IMP-005-C02` | `IMP-005` | Confirmar conjunto integral imutável por coleta, idempotência própria e consumo transacional do draft pessoal quando fornecido. | presente | presente | `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE` |
| `IMP-005-C03` | `IMP-005` | Consultar valores ambientais efetivamente persistidos, ausência explícita e contexto somente leitura sem autoria/chaves/diagnóstico no DTO. | presente | presente | `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE` |
| `IMP-005-I04` | `IMP-005` | Incremento015/024: salvar, retomar e descartar draft ambiental pessoal por titular/coleta confirmada, com revisão otimista, replay e isolamento. | presente | presente | `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE` |
| `IMP-005-I05` | `IMP-005` | Incremento024: prontidão/hidratação, representações fiéis e recuperação sem trocar titular ou liberar tentativa incerta. | presente | presente | `IMPLEMENTADO_VERIFICADO_ESTATICAMENTE` |

## Limites materiais comuns

`EVIDENCIA_IMPLEMENTACAO`: CREATE_COLLECTION e CREATE_ENVIRONMENTAL_DATA permitem OWNER, ADMIN e MEMBER vinculados em laboratório ativo. CREATE_AREA e MANAGE_AREA_IMAGE excluem MEMBER; MANAGE_ROLES é exclusivo de OWNER, inclusive a listagem específica de vínculos. Nome/iniciais de membros em configurações002 são projeção distinta da lista de gestão003. Autoria passada/papel global não substituem vínculo atual.

`FATO_DOCUMENTADO`: gates humanos permanecem próprios: IMP-001 SC-006/SC-007; IMP-003 SC-009/SC-010; IMP-004 SC-002/SC-007; IMP-005 SC-006/T037. Automação histórica e revisão pelo agente não os encerram. Operação real de e-mail/Cloudinary, exclusão de conta, dispositivo físico e suporte universal de navegador não foram homologados neste trabalho.

`FATO_DOCUMENTADO`: aprovação de captura `ihfr-measurement-v1` resolve o recorte técnico005; não valida o cálculo IHFR. Consumidores IHFR preservam `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO` e `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

## IMP-001-F01 — Fronteira de sessão exigida pelos fluxos 002–005: identidade corrente, conta ACTIVE, verificação quando exigida e credentialVersion.

`EVIDENCIA_IMPLEMENTACAO`: IMPLEMENTADO_VERIFICADO_ESTATICAMENTE. Presença: development=true; candidata=true.

### Intenção e contrato, sem promoção normativa

- [specs/001-authenticated-access/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/001-authenticated-access/spec.md>) — `Evidence and Code-First Traceability`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/012-account-verification-recovery/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/012-account-verification-recovery/spec.md>) — `política de sessão`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.

### Cadeia seguida estaticamente

| Camada | Evidência e limite |
|---|---|
| route | GET /api/auth/me e entradas privadas; handlers de 002–005 chamam requireAuth. |
| authorization | authenticateSession valida token, consulta identidade atual e exige ACTIVE; se verificationRequired, exige emailVerifiedAt; compara propósito e credentialVersion, com regra explícita para sessão legada. |
| service | users.service.getCurrentIdentityById é adapter de identidade atual; requireAuth lança AuthBoundaryError. |
| persistence | User.status, verificationRequired, emailVerifiedAt e credentialVersion; nenhuma operação de banco executada. |
| ui | Layout privado e workspace dependem do guard atual. Proxy isolado não foi tratado como autorização suficiente. |

### Fontes de implementação e testes nos dois snapshots

- `src/app/api/server/middlewares/auth.middleware.ts` — `requireAuth / requireAuthWithAdapters`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/middlewares/auth.middleware.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/middlewares/auth.middleware.ts>).
- `src/app/api/server/auth/auth.core.ts` — `authenticateSession`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/auth/auth.core.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/auth/auth.core.ts>).
- `src/app/api/server/auth/session.ts` — `verifySessionToken`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/auth/session.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/auth/session.ts>).
- `src/app/(private)/layout.tsx` — `LayoutPrivate`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/layout.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/(private)/layout.tsx>).
- `src/app/api/auth/me/route.ts` — `GET`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/me/route.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/auth/me/route.ts>).
- `tests/unit/auth-core.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/auth-core.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/auth-core.test.ts>).
- `tests/unit/session.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/session.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/session.test.ts>).
- `tests/integration/auth-me.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/auth-me.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/auth-me.test.ts>).
- `tests/integration/auth-guard.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/auth-guard.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/auth-guard.test.ts>).
- `tests/e2e/authenticated-access.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/authenticated-access.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/authenticated-access.spec.ts>).

### Seleção de testes e histórico consultado

Execução nesta missão: `NOT_RUN`. Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.

- `tests/unit/auth-core.test.ts`.
- `tests/unit/session.test.ts`.
- `tests/integration/auth-me.test.ts`.
- `tests/integration/auth-guard.test.ts`.
- `tests/e2e/authenticated-access.spec.ts`.

- `FATO_DOCUMENTADO`: [specs/019-frontend-workspace-shell/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/019-frontend-workspace-shell/spec.md>); localização: **Status; US2**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Registra implementação técnica e aceite humano pendente do shell; não constitui execução desta missão. Consulta sem execução (`NOT_RUN`).

Aceite humano: SC-006/SC-007 de IMP-001 permanecem NAO_VERIFICADO; pertencem ao follow-up IMP-010, não encerrado por este fragmento.

Estado científico: NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.

### Afirmação anterior a adendar

Fonte: [docs/code-first-prd/implementation/backlog.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/backlog.md>); SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Localização: **Itens > linha IMP-001 > Resultado de produto**.

> Usuário `ACTIVE` previamente cadastrado faz login, restaura a sessão, acessa rotas protegidas e encerra a sessão sem exposição de senha ou campos privilegiados.

RECOMENDACAO: Preservar o corte histórico e acrescentar que a fronteira atual de sessão incorpora verificação quando exigida e versão de credencial; não reclassificar IMP-010 como concluída.

Lacuna/limite: Fronteira inspecionada; não é reauditoria de cadastro/recuperação/exclusão, cookie em produção, provedor de e-mail ou logout global.

Próxima ação: RECOMENDACAO: Adendar o baseline de identidade com as restrições atuais e manter os gates humanos/operacionais próprios.

## IMP-002-C01 — Criar laboratório por nome e listar apenas vínculos atuais, com limite de cinco, criação atômica e DTO público.

`EVIDENCIA_IMPLEMENTACAO`: IMPLEMENTADO_VERIFICADO_ESTATICAMENTE. Presença: development=true; candidata=true.

### Intenção e contrato, sem promoção normativa

- [specs/002-criar-laboratorio/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/002-criar-laboratorio/spec.md>) — `FR-001–FR-013`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/002-criar-laboratorio/contracts/laboratories-api.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/002-criar-laboratorio/contracts/laboratories-api.openapi.yaml>) — `GET/POST laboratories`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/019-frontend-workspace-shell/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/019-frontend-workspace-shell/spec.md>) — `US1`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.

### Cadeia seguida estaticamente

| Camada | Evidência e limite |
|---|---|
| route | GET/POST /api/laboratories delegam principal.id; parser de nome rejeita campos não previstos; respostas no-store. |
| authorization | requireAuth valida sessão/identidade corrente; listagem é filtrada por ResearchersLinked.userId. Criar recebe o usuário do principal, não do body. |
| service | Prisma repository conta vínculos e cria LaboratoryRoom + ResearchersLinked OWNER em Serializable; MAX_LABORATORIES=5 e MAX_RETRIES=4 para P2002/P2034. |
| persistence | LaboratoryRoom, ResearchersLinked e accessCode único. Nome repetido permitido; limite inclui todos os vínculos, inclusive inativos. Nenhuma migration foi aplicada. |
| ui | LaboratoryWorkspace faz GET/POST reais, mantém loading/erro/vazio, trava envio e recarrega lista; criação não seleciona automaticamente laboratório. |

### Fontes de implementação e testes nos dois snapshots

- `src/app/api/laboratories/route.ts` — `exports GET/POST`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/route.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/route.ts>).
- `src/app/api/laboratories/route.handlers.ts` — `createLaboratoriesHandlers`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/route.handlers.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/route.handlers.ts>).
- `src/app/api/server/middlewares/auth.middleware.ts` — `requireAuth`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/middlewares/auth.middleware.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/middlewares/auth.middleware.ts>).
- `src/app/api/server/services/laboratories.service.ts` — `createAtomic / create / listAccessible`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/laboratories.service.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/laboratories.service.ts>).
- `src/app/api/server/laboratories/laboratory.contracts.ts` — `parseCreateLaboratoryInput / serializePublicLaboratory`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/laboratories/laboratory.contracts.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/laboratories/laboratory.contracts.ts>).
- `prisma/schema.prisma` — `LaboratoryRoom / ResearchersLinked`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/schema.prisma>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/schema.prisma>).
- `prisma/migrations/20260907120000_unique_laboratory_access_code/migration.sql` — `índice accessCode`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260907120000_unique_laboratory_access_code/migration.sql>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20260907120000_unique_laboratory_access_code/migration.sql>).
- `prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql` — `OWNER`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql>).
- `src/components/workspace/laboratory-workspace.tsx` — `load / creationForm`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/workspace/laboratory-workspace.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/workspace/laboratory-workspace.tsx>).
- `tests/unit/laboratory-contracts.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/laboratory-contracts.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/laboratory-contracts.test.ts>).
- `tests/unit/laboratories-service.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/laboratories-service.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/laboratories-service.test.ts>).
- `tests/integration/laboratories-route.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/laboratories-route.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/laboratories-route.test.ts>).
- `tests/e2e/create-laboratory.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/create-laboratory.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/create-laboratory.spec.ts>).
- `tests/e2e/frontend-workspace.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-workspace.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-workspace.spec.ts>).

### Seleção de testes e histórico consultado

Execução nesta missão: `NOT_RUN`. Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.

- `tests/unit/laboratory-contracts.test.ts`.
- `tests/unit/laboratories-service.test.ts`.
- `tests/integration/laboratories-route.test.ts`.
- `tests/e2e/create-laboratory.spec.ts`.
- `tests/e2e/frontend-workspace.spec.ts`.

- `FATO_DOCUMENTADO`: [specs/002-criar-laboratorio/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/002-criar-laboratorio/spec.md>); localização: **Reconciliation with development — 2026-09-13**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Registra testes focais e limitação histórica de E2E por persistência; não converter em execução atual. Consulta sem execução (`NOT_RUN`).
- `FATO_DOCUMENTADO`: [specs/019-frontend-workspace-shell/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/019-frontend-workspace-shell/implementation-evidence.md>); localização: **arquivo de evidência**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Evidência histórica da incorporação do workspace consultada; validade limitada ao corte que o documento nomeia. Consulta sem execução (`NOT_RUN`).

Aceite humano: NAO_VERIFICADO nesta missão. SC-005/SC-006/SC-010 da 002 exigem evidência de uso/teclado/rolagem compatível; specs019/020 mantêm aceite humano pendente. Automação histórica não prova participação humana.

Estado científico: NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.

### Afirmação anterior a adendar

Fonte: [docs/code-first-prd/implementation/backlog.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/backlog.md>); SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Localização: **Itens > linha IMP-002 > Estado atual / Evidência**.

> `PROXIMO_CANDIDATO`; schema e interface parcial/mockada, sem API conectada.

RECOMENDACAO: Adicionar estado por subcapacidade: criar/listar têm cadeia HTTP→sessão→serviço→Prisma→workspace nos dois snapshots; ingresso continua separado e indisponível.

Lacuna/limite: Não há evidência produzida nesta missão sobre concorrência real, aplicação remota da migration, latência ou uso humano.

Próxima ação: RECOMENDACAO: Atualizar a linha com fontes imutáveis, mantendo histórico e testes atuais NOT_RUN.

## IMP-002-C02 — Consultar informações/membros mínimos e desativar ou excluir laboratório com confirmação textual e restrição a dados dependentes.

`EVIDENCIA_IMPLEMENTACAO`: IMPLEMENTADO_VERIFICADO_ESTATICAMENTE. Presença: development=true; candidata=true.

### Intenção e contrato, sem promoção normativa

- [specs/002-criar-laboratorio/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/002-criar-laboratorio/spec.md>) — `FR-015–FR-019; Amendment — Configurações do laboratório`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/019-frontend-workspace-shell/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/019-frontend-workspace-shell/spec.md>) — `US1 cenário 4`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.

### Cadeia seguida estaticamente

| Camada | Evidência e limite |
|---|---|
| route | GET/PATCH/DELETE /api/laboratories/{laboratoryId}, com resposta no-store e envelope de conflito preservado. |
| authorization | requireAuth; consulta inicial filtra vínculo. Mutações comparam laboratory.userId com principal.id e nome atual com confirmationName no servidor. |
| service | getDetails projeta somente nome/iniciais dos membros; deactivate marca isActive=false; delete recusa áreas dependentes e remove vínculos/laboratório em transação. |
| persistence | Dados subordinados e FKs impedem perda da cadeia; trigger diferível OWNER permite a exclusão administrativa ao final da transação. Não há reativação nesta superfície. |
| ui | Diálogo real do workspace exige nome exato; loading/erro e cancelamento/foco; membros aparecem com nome e iniciais. |

### Fontes de implementação e testes nos dois snapshots

- `src/app/api/laboratories/[laboratoryId]/route.ts` — `GET/PATCH/DELETE`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/route.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/route.ts>).
- `src/app/api/laboratories/[laboratoryId]/route.handlers.ts` — `createLaboratorySettingsHandlers`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/route.handlers.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/route.handlers.ts>).
- `src/app/api/server/middlewares/auth.middleware.ts` — `requireAuth`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/middlewares/auth.middleware.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/middlewares/auth.middleware.ts>).
- `src/app/api/server/services/laboratories.service.ts` — `getDetails / deactivate / delete`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/laboratories.service.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/laboratories.service.ts>).
- `src/app/api/server/laboratories/laboratory.contracts.ts` — `parseRiskActionInput`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/laboratories/laboratory.contracts.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/laboratories/laboratory.contracts.ts>).
- `prisma/schema.prisma` — `LaboratoryRoom / ResearchersLinked / CollectionArea`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/schema.prisma>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/schema.prisma>).
- `prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql` — `triggers OWNER diferíveis`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql>).
- `src/components/workspace/laboratory-workspace.tsx` — `openSettings / executeRiskAction`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/workspace/laboratory-workspace.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/workspace/laboratory-workspace.tsx>).
- `tests/unit/laboratories-service.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/laboratories-service.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/laboratories-service.test.ts>).
- `tests/integration/laboratory-settings-route.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/laboratory-settings-route.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/laboratory-settings-route.test.ts>).
- `tests/migration/area-registration-migration.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/migration/area-registration-migration.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/migration/area-registration-migration.test.ts>).
- `tests/e2e/frontend-workspace.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-workspace.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-workspace.spec.ts>).

### Seleção de testes e histórico consultado

Execução nesta missão: `NOT_RUN`. Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.

- `tests/unit/laboratories-service.test.ts`.
- `tests/integration/laboratory-settings-route.test.ts`.
- `tests/migration/area-registration-migration.test.ts`.
- `tests/e2e/frontend-workspace.spec.ts`.

- `FATO_DOCUMENTADO`: [specs/003-area-registration-and-viewing/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/003-area-registration-and-viewing/implementation-evidence.md>); localização: **Encerramento do bloqueio E2E em 2026-09-15**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Relata teste de migration para commit da exclusão administrativa e trigger OWNER; histórico consultado sem repetição. Consulta sem execução (`NOT_RUN`).

Aceite humano: NAO_VERIFICADO nesta missão. SC-005/SC-006/SC-010 da 002 exigem evidência de uso/teclado/rolagem compatível; specs019/020 mantêm aceite humano pendente. Automação histórica não prova participação humana.

Estado científico: NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.

### Afirmação anterior a adendar

Fonte: [docs/code-first-prd/implementation/implementation-plan.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/implementation-plan.md>); SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Localização: **Módulos identificados > Laboratórios e workspace**.

> Models e interface existem, mas a tela usa estado e conteúdo fixos e não há API de domínio conectada.

RECOMENDACAO: Registrar consulta/configurações reais, confirmação pelo nome e recusa da exclusão com dados; não confundir desativação do laboratório com exclusão de conta nem afirmar teste remoto novo.

Lacuna/limite: Inspeção do guard e transações não demonstra execução de exclusão, integridade de base existente ou comportamento físico/assistivo.

Próxima ação: RECOMENDACAO: Adendar o plano com configuração conectada e preservar os limites humanos e remotos.

## IMP-002-F03 — Fronteira de ingresso/convite por código: não confundir criação/listagem conectadas com gestão de ingresso implementada.

`EVIDENCIA_IMPLEMENTACAO`: NAO_LOCALIZADO. Presença: development=false; candidata=false.

### Intenção e contrato, sem promoção normativa

- [specs/002-criar-laboratorio/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/002-criar-laboratorio/spec.md>) — `FR-014`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/019-frontend-workspace-shell/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/019-frontend-workspace-shell/spec.md>) — `US1 cenário 1`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.

### Cadeia seguida estaticamente

| Camada | Evidência e limite |
|---|---|
| route | Na superfície inspecionada, /api/laboratories oferece criar/listar; memberships lista/altera papéis, sem endpoint de ingresso localizado. |
| authorization | Não há ação de ingresso autorizada localizada; código de acesso gerado não concede autorização por si. |
| service | Nenhum join/invite/add-member localizado no conjunto de serviços/rotas inspecionado; ausência limitada a esse escopo. |
| persistence | accessCode persistido/único é infraestrutura, não prova fluxo de ingresso. |
| ui | Bloco Entrar em um laboratório informa Disponível em uma próxima etapa e não envia pedido de ingresso. |

### Fontes de implementação e testes nos dois snapshots

- `src/components/workspace/laboratory-workspace.tsx` — `bloco Entrar em um laboratório`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/workspace/laboratory-workspace.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/workspace/laboratory-workspace.tsx>).
- `src/app/api/laboratories/route.handlers.ts` — `superfície GET/POST`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/route.handlers.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/route.handlers.ts>).
- `src/app/api/server/services/laboratories.service.ts` — `superfície de serviço`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/laboratories.service.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/laboratories.service.ts>).
- `src/app/api/server/services/laboratory-memberships.service.ts` — `list / change`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/laboratory-memberships.service.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/laboratory-memberships.service.ts>).
- `tests/e2e/frontend-workspace.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-workspace.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-workspace.spec.ts>).
- `tests/e2e/create-laboratory.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/create-laboratory.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/create-laboratory.spec.ts>).

### Seleção de testes e histórico consultado

Execução nesta missão: `NOT_RUN`. Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.

- `tests/e2e/frontend-workspace.spec.ts`.
- `tests/e2e/create-laboratory.spec.ts`.

Nenhuma evidência histórica de execução adicional é atribuída a esta subcapacidade.

Aceite humano: NAO_VERIFICADO nesta missão. SC-005/SC-006/SC-010 da 002 exigem evidência de uso/teclado/rolagem compatível; specs019/020 mantêm aceite humano pendente. Automação histórica não prova participação humana.

Estado científico: NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.

### Afirmação anterior a adendar

Fonte: [docs/code-first-prd/implementation/backlog.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/backlog.md>); SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Localização: **Itens > linha IMP-002 > Riscos decisórios**.

> `CF-PD-002` e `CF-PD-006` mantêm abertas criação, responsabilidade, ingresso, cardinalidade e permissões além do mínimo.

RECOMENDACAO: Separar as regras mínimas já especificadas e conectadas das políticas de ingresso/convite ainda fora do recorte. Não encerrar pendências amplas por extrapolação.

Lacuna/limite: NAO_LOCALIZADO é ausência na busca delimitada e coerente com FR-014, não prova de inexistência em qualquer branch nem aprovação de política futura.

Próxima ação: RECOMENDACAO: Manter ingresso indisponível; encaminhar intenção e autoridade em feature própria se houver decisão humana.

## IMP-003-C01 — Selecionar laboratório explicitamente e preservar o contexto na URL/navegação com revalidação de vínculo e inativo somente leitura.

`EVIDENCIA_IMPLEMENTACAO`: IMPLEMENTADO_VERIFICADO_ESTATICAMENTE. Presença: development=true; candidata=true.

### Intenção e contrato, sem promoção normativa

- [specs/003-area-registration-and-viewing/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/003-area-registration-and-viewing/spec.md>) — `FR-008–FR-015`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/019-frontend-workspace-shell/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/019-frontend-workspace-shell/spec.md>) — `US1–US2`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.

### Cadeia seguida estaticamente

| Camada | Evidência e limite |
|---|---|
| route | Páginas /dashboard/laboratories/{laboratoryId}/... e APIs com laboratoryId explícito; criação/listagem não elegem contexto automaticamente. |
| authorization | requireAuth e authorizeLaboratoryAccess consultam conta/vínculo atual; UUID não é credencial; permissão e isActive reavaliados. Recurso inacessível resulta NOT_FOUND. |
| service | Consumers usam laboratório do caminho e não estado local como autoridade. Mutate=true recusa inativo; leituras mantêm readOnly=true. |
| persistence | ResearchersLinked composto userId+laboratoryRoomId e LaboratoryRoom.isActive governam contexto atual. |
| ui | Escolha no workspace; links do shell conservam laboratoryId e navegação/reload; inativo identificado e controles de escrita condicionados. |

### Fontes de implementação e testes nos dois snapshots

- `src/app/(private)/workspace/page.tsx` — `Workspace`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/workspace/page.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/(private)/workspace/page.tsx>).
- `src/components/workspace/laboratory-workspace.tsx` — `link Acessar`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/workspace/laboratory-workspace.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/workspace/laboratory-workspace.tsx>).
- `src/components/shell/laboratory-navigation.tsx` — `LaboratoryNavigation`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/shell/laboratory-navigation.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/shell/laboratory-navigation.tsx>).
- `src/app/(private)/dashboard/laboratories/[laboratoryId]/layout.tsx` — `LaboratoryLayout`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/dashboard/laboratories/[laboratoryId]/layout.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/(private)/dashboard/laboratories/[laboratoryId]/layout.tsx>).
- `src/app/api/server/areas/area.authorization.ts` — `authorizeLaboratoryAccess / assertLaboratoryPermission`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/areas/area.authorization.ts>).
- `prisma/schema.prisma` — `ResearchersLinked`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/schema.prisma>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/schema.prisma>).
- `src/app/api/server/services/areas.service.ts` — `list / detail`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/areas.service.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/areas.service.ts>).
- `tests/integration/laboratory-context-access.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/laboratory-context-access.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/laboratory-context-access.test.ts>).
- `tests/e2e/laboratory-context.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/laboratory-context.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/laboratory-context.spec.ts>).
- `tests/e2e/frontend-workspace.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-workspace.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-workspace.spec.ts>).
- `tests/unit/area-authorization.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/area-authorization.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/area-authorization.test.ts>).

### Seleção de testes e histórico consultado

Execução nesta missão: `NOT_RUN`. Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.

- `tests/integration/laboratory-context-access.test.ts`.
- `tests/e2e/laboratory-context.spec.ts`.
- `tests/e2e/frontend-workspace.spec.ts`.
- `tests/unit/area-authorization.test.ts`.

- `FATO_DOCUMENTADO`: [specs/003-area-registration-and-viewing/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/003-area-registration-and-viewing/implementation-evidence.md>); localização: **Encerramento do bloqueio E2E em 2026-09-15**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Relata E2E de contexto, revogação, cruzamento e inatividade; não prova execução no snapshot desta missão. Consulta sem execução (`NOT_RUN`).

Aceite humano: SC-009 e SC-010 = NAO_VERIFICADO, conforme spec003. Nova inspeção estática não mede conclusão sem assistência nem compreensão do contexto/ponto/somente leitura; aceite visual posterior continua separado.

Estado científico: NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.

### Afirmação anterior a adendar

Fonte: [docs/code-first-prd/implementation/backlog.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/backlog.md>); SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Localização: **Itens > linha IMP-003 > Estado atual**.

> `DEPENDENTE_DE_AUTENTICACAO_E_LABORATORIO`; schema parcial, lista mockada e ação placeholder.

RECOMENDACAO: Registrar contexto explícito e revalidação atuais como subcapacidade implementada estaticamente; manter SC-009/SC-010 sem medida humana.

Lacuna/limite: Nenhuma sessão ou navegação foi exercitada nesta missão; autorização foi seguida no código como dados.

Próxima ação: RECOMENDACAO: Adendar dependências já materializadas, evitando conservar estado histórico de placeholder como estado atual.

## IMP-003-C02 — Papéis contextuais OWNER/ADMIN/MEMBER, proprietário único e alteração concorrente de papel por OWNER.

`EVIDENCIA_IMPLEMENTACAO`: IMPLEMENTADO_VERIFICADO_ESTATICAMENTE. Presença: development=true; candidata=true.

### Intenção e contrato, sem promoção normativa

- [specs/003-area-registration-and-viewing/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/003-area-registration-and-viewing/spec.md>) — `FR-001–FR-007; FR-038`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/020-frontend-laboratory-dashboard/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/020-frontend-laboratory-dashboard/spec.md>) — `US3; FR-006/FR-007`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.

### Cadeia seguida estaticamente

| Camada | Evidência e limite |
|---|---|
| route | GET memberships e PATCH memberships/{membershipId}; parser allowlist recebe role/expectedRole. |
| authorization | Somente OWNER contextual passa MANAGE_ROLES; papel global não substitui vínculo. Mutação em laboratório inativo é recusada. |
| service | change recusa mutação de OWNER; updateMany condiciona expectedRole e devolve CONFLICT se não alterar exatamente um vínculo; Serializable. |
| persistence | Enum contextual, índice único parcial de OWNER e triggers diferíveis garantem relação do OWNER com criador no SQL versionado; backfill não promove ADMIN. |
| ui | LaboratoryMemberships carrega lista real, trava envio, mantém expectedRole e recarrega após conflito; layout/links de membros respeitam papel contextual. |

### Fontes de implementação e testes nos dois snapshots

- `src/app/api/laboratories/[laboratoryId]/memberships/route.handlers.ts` — `GET`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/memberships/route.handlers.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/memberships/route.handlers.ts>).
- `src/app/api/laboratories/[laboratoryId]/memberships/[membershipId]/route.handlers.ts` — `PATCH`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/memberships/[membershipId]/route.handlers.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/memberships/[membershipId]/route.handlers.ts>).
- `src/app/api/server/areas/area.authorization.ts` — `assertLaboratoryPermission`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/areas/area.authorization.ts>).
- `src/app/api/server/services/laboratory-memberships.service.ts` — `list / change`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/laboratory-memberships.service.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/laboratory-memberships.service.ts>).
- `src/app/api/server/laboratories/laboratory-membership.contracts.ts` — `parseMembershipChange`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/laboratories/laboratory-membership.contracts.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/laboratories/laboratory-membership.contracts.ts>).
- `prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql` — `ResearchersLinked_one_owner; imp003_check_owner`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql>).
- `src/components/laboratories/laboratory-memberships.tsx` — `LaboratoryMemberships`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/laboratories/laboratory-memberships.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/laboratories/laboratory-memberships.tsx>).
- `tests/unit/laboratory-membership-contracts.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/laboratory-membership-contracts.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/laboratory-membership-contracts.test.ts>).
- `tests/unit/laboratory-memberships-service.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/laboratory-memberships-service.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/laboratory-memberships-service.test.ts>).
- `tests/integration/laboratory-memberships-route.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/laboratory-memberships-route.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/laboratory-memberships-route.test.ts>).
- `tests/migration/area-registration-migration.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/migration/area-registration-migration.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/migration/area-registration-migration.test.ts>).
- `tests/e2e/laboratory-membership-roles.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/laboratory-membership-roles.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/laboratory-membership-roles.spec.ts>).

### Seleção de testes e histórico consultado

Execução nesta missão: `NOT_RUN`. Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.

- `tests/unit/laboratory-membership-contracts.test.ts`.
- `tests/unit/laboratory-memberships-service.test.ts`.
- `tests/integration/laboratory-memberships-route.test.ts`.
- `tests/migration/area-registration-migration.test.ts`.
- `tests/e2e/laboratory-membership-roles.spec.ts`.

- `FATO_DOCUMENTADO`: [specs/003-area-registration-and-viewing/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/003-area-registration-and-viewing/implementation-evidence.md>); localização: **Implementação observada; Encerramento do bloqueio E2E**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Relata OWNER único, gestão de papéis e ensaios de migration/E2E no corte histórico. Consulta sem execução (`NOT_RUN`).
- `FATO_DOCUMENTADO`: [specs/020-frontend-laboratory-dashboard/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/020-frontend-laboratory-dashboard/implementation-evidence.md>); localização: **arquivo de evidência**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Evidência histórica da apresentação de membros e concorrência; sem execução atual. Consulta sem execução (`NOT_RUN`).

Aceite humano: SC-009 e SC-010 = NAO_VERIFICADO, conforme spec003. Nova inspeção estática não mede conclusão sem assistência nem compreensão do contexto/ponto/somente leitura; aceite visual posterior continua separado.

Estado científico: NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.

### Afirmação anterior a adendar

Fonte: [docs/code-first-prd/implementation/implementation-plan.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/implementation-plan.md>); SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Localização: **Módulos identificados > Laboratórios e workspace**.

> Models e interface existem, mas a tela usa estado e conteúdo fixos e não há API de domínio conectada.

RECOMENDACAO: Acrescentar contexto/papéis da spec003 e apresentação020: alteração de papel existe sob OWNER, sem autorizar ingresso, remoção, transferência ou administração global.

Lacuna/limite: Não foi executado backfill nem verificada integridade da instância remota; existência da migration não prova aplicação.

Próxima ação: RECOMENDACAO: Usar rastreabilidade por capacidade e registrar validação histórica separada de estado estático atual.

## IMP-003-C03 — Criar área-ponto por entrada manual/mapa/localização opcional, validar e persistir apenas ponto final e autoria contextual.

`EVIDENCIA_IMPLEMENTACAO`: IMPLEMENTADO_VERIFICADO_ESTATICAMENTE. Presença: development=true; candidata=true.

### Intenção e contrato, sem promoção normativa

- [specs/003-area-registration-and-viewing/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/003-area-registration-and-viewing/spec.md>) — `FR-016–FR-029`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/003-area-registration-and-viewing/contracts/area-registration-api.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/003-area-registration-and-viewing/contracts/area-registration-api.openapi.yaml>) — `POST áreas`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/021-frontend-areas-cover/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/021-frontend-areas-cover/spec.md>) — `áreas`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.

### Cadeia seguida estaticamente

| Camada | Evidência e limite |
|---|---|
| route | POST /api/laboratories/{laboratoryId}/areas; body allowlisted, Location contextual para detalhe. |
| authorization | requireAuth; CREATE_AREA permite OWNER/ADMIN em laboratório ativo; userId e laboratoryRoomId derivados do servidor. |
| service | AreasService.create parseia entrada e cria área em Serializable; coordenadas Decimal com seis casas. Nomes/opcionais normalizados e limitados. |
| persistence | CollectionArea guarda latitude/longitude com checks; migration transporta ponto legado, verifica referências antes de remover Coordinates. Não é polígono nem histórico GPS. |
| ui | AreaForm sincroniza campos e marcador; localização é explícita/opcional, preserva edição diante de resposta tardia/erro e faz POST ao confirmar. Base cartográfica é opcional; manual continua disponível. |

### Fontes de implementação e testes nos dois snapshots

- `src/app/api/laboratories/[laboratoryId]/areas/route.ts` — `GET/POST`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/route.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/route.ts>).
- `src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts` — `createAreaHandlers`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts>).
- `src/app/api/server/areas/area.authorization.ts` — `CREATE_AREA`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/areas/area.authorization.ts>).
- `src/app/api/server/services/areas.service.ts` — `create`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/areas.service.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/areas.service.ts>).
- `src/app/api/server/areas/area.contracts.ts` — `parseAreaInput`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.contracts.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/areas/area.contracts.ts>).
- `prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql` — `DECIMAL; checks coordenadas; migração Coordinates`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql>).
- `src/components/areas/area-form.tsx` — `AreaForm`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/areas/area-form.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/areas/area-form.tsx>).
- `src/components/areas/area-form-state.ts` — `estado de geolocalização`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/areas/area-form-state.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/areas/area-form-state.ts>).
- `src/components/areas/area-map.client.tsx` — `Point`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/areas/area-map.client.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/areas/area-map.client.tsx>).
- `tests/unit/area-contracts.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/area-contracts.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/area-contracts.test.ts>).
- `tests/unit/area-form-state.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/area-form-state.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/area-form-state.test.ts>).
- `tests/unit/areas-service.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/areas-service.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/areas-service.test.ts>).
- `tests/integration/areas-route.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/areas-route.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/areas-route.test.ts>).
- `tests/migration/area-registration-migration.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/migration/area-registration-migration.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/migration/area-registration-migration.test.ts>).
- `tests/e2e/area-registration.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/area-registration.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/area-registration.spec.ts>).
- `tests/e2e/frontend-areas.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-areas.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-areas.spec.ts>).

### Seleção de testes e histórico consultado

Execução nesta missão: `NOT_RUN`. Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.

- `tests/unit/area-contracts.test.ts`.
- `tests/unit/area-form-state.test.ts`.
- `tests/unit/areas-service.test.ts`.
- `tests/integration/areas-route.test.ts`.
- `tests/migration/area-registration-migration.test.ts`.
- `tests/e2e/area-registration.spec.ts`.
- `tests/e2e/frontend-areas.spec.ts`.

- `FATO_DOCUMENTADO`: [specs/003-area-registration-and-viewing/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/003-area-registration-and-viewing/implementation-evidence.md>); localização: **Retomada final; Encerramento do bloqueio E2E; Correção dos gates finais**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Relata criação, fallback geolocalização, migration5/5 e E2E12/12 no pai histórico nomeado; execução atual NOT_RUN. Consulta sem execução (`NOT_RUN`).

Aceite humano: SC-009 e SC-010 = NAO_VERIFICADO, conforme spec003. Nova inspeção estática não mede conclusão sem assistência nem compreensão do contexto/ponto/somente leitura; aceite visual posterior continua separado.

Estado científico: NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.

### Afirmação anterior a adendar

Fonte: [docs/code-first-prd/implementation/backlog.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/backlog.md>); SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Localização: **Itens > linha IMP-003 > Evidência / Estado atual**.

> `CollectionArea` e `Coordinates` em `prisma/schema.prisma`; ... schema parcial, lista mockada e ação placeholder.

RECOMENDACAO: Acrescentar que o modelo atual localiza coordenadas na CollectionArea e há POST contextual, form/mapa local e persistência; preservar Coordinates como baseline histórico, não tabela atual.

Lacuna/limite: Não há prova nova de funcionamento do GPS, tiles externos, coordenadas de uma base existente ou migration remota.

Próxima ação: RECOMENDACAO: Adendar área-ponto conectada e sua precisão; manter mapa territorial/ciência em capacidades distintas.

## IMP-003-C04 — Listar e detalhar áreas reais do laboratório, com ponto, opcionais, privacidade e somente leitura.

`EVIDENCIA_IMPLEMENTACAO`: IMPLEMENTADO_VERIFICADO_ESTATICAMENTE. Presença: development=true; candidata=true.

### Intenção e contrato, sem promoção normativa

- [specs/003-area-registration-and-viewing/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/003-area-registration-and-viewing/spec.md>) — `FR-030–FR-037`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/021-frontend-areas-cover/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/021-frontend-areas-cover/spec.md>) — `listagem/detalhe`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.

### Cadeia seguida estaticamente

| Camada | Evidência e limite |
|---|---|
| route | GET coleção e GET /areas/{areaId}; página de detalhe também usa serviço no servidor. |
| authorization | Vínculo atual e laboratório autorizados antes da área; findFirst vincula id a laboratoryRoomId; três papéis leem, inclusive inativo. |
| service | List ordena createdAt/id, detail projeta allowlist; sem nome/id do criador, código de acesso ou estado funcional legado como filtro. |
| persistence | CollectionArea real; list inclui metadados de cover versionados quando existentes. Capa016/021 é incremento independente, não requisito original da003. |
| ui | AreaList faz fetch real; detalhe apresenta coordenadas, mapa de um ponto, opcionais/data e readOnly. AreaCoverEditor é consumidor integrado; operação Cloudinary não foi validada aqui. |

### Fontes de implementação e testes nos dois snapshots

- `src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts` — `GET`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts>).
- `src/app/api/laboratories/[laboratoryId]/areas/[areaId]/route.handlers.ts` — `GET`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/route.handlers.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/route.handlers.ts>).
- `src/app/api/server/areas/area.authorization.ts` — `READ_AREAS`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/areas/area.authorization.ts>).
- `src/app/api/server/services/areas.service.ts` — `list / detail`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/areas.service.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/areas.service.ts>).
- `src/app/api/server/areas/area.contracts.ts` — `serializeAreaSummary / serializeAreaDetail`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.contracts.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/areas/area.contracts.ts>).
- `src/components/areas/area-list.tsx` — `AreaList`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/areas/area-list.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/areas/area-list.tsx>).
- `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx` — `AreaDetail`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx>).
- `src/components/areas/area-map.client.tsx` — `AreaMapClient`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/areas/area-map.client.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/areas/area-map.client.tsx>).
- `prisma/schema.prisma` — `CollectionArea`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/schema.prisma>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/schema.prisma>).
- `tests/unit/areas-service.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/areas-service.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/areas-service.test.ts>).
- `tests/unit/area-openapi-contract.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/area-openapi-contract.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/area-openapi-contract.test.ts>).
- `tests/unit/area-openapi-parity.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/area-openapi-parity.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/area-openapi-parity.test.ts>).
- `tests/integration/areas-route.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/areas-route.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/areas-route.test.ts>).
- `tests/e2e/area-registration.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/area-registration.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/area-registration.spec.ts>).
- `tests/e2e/frontend-areas.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-areas.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-areas.spec.ts>).

### Seleção de testes e histórico consultado

Execução nesta missão: `NOT_RUN`. Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.

- `tests/unit/areas-service.test.ts`.
- `tests/unit/area-openapi-contract.test.ts`.
- `tests/unit/area-openapi-parity.test.ts`.
- `tests/integration/areas-route.test.ts`.
- `tests/e2e/area-registration.spec.ts`.
- `tests/e2e/frontend-areas.spec.ts`.

- `FATO_DOCUMENTADO`: [specs/003-area-registration-and-viewing/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/003-area-registration-and-viewing/implementation-evidence.md>); localização: **Paridade final; E2E final conjunto**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Documenta allowlists, somente leitura e cenários históricos. Consulta sem execução (`NOT_RUN`).
- `FATO_DOCUMENTADO`: [specs/021-frontend-areas-cover/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/021-frontend-areas-cover/implementation-evidence.md>); localização: **arquivo de evidência**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Registro posterior consultado como histórico; cenários de capa sintética não são homologação de provedor. Consulta sem execução (`NOT_RUN`).

Aceite humano: SC-009 e SC-010 = NAO_VERIFICADO, conforme spec003. Nova inspeção estática não mede conclusão sem assistência nem compreensão do contexto/ponto/somente leitura; aceite visual posterior continua separado.

Estado científico: NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.

### Afirmação anterior a adendar

Fonte: [docs/code-first-prd/implementation/implementation-plan.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/implementation-plan.md>); SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Localização: **Módulos identificados > Áreas e coordenadas**.

> Models e lista visual existem; a lista é mockada, a criação é placeholder e não há API conectada.

RECOMENDACAO: Acrescentar GET/lista/detalhe reais e privacidade; mapa local da área não equivale a análise territorial nem validação de capa em provedor real.

Lacuna/limite: Testes frontend-areas incluem cenários UI fake de capa; sua presença não prova upload/Cloudinary real. Não foi executada lista/detalhe nesta missão.

Próxima ação: RECOMENDACAO: Atualizar visão global por subcapacidade e remeter capa a016/021 com gate operacional próprio.

## IMP-004-C01 — Iniciar coleta na área, informar ocorrência RFC3339/offset/milissegundos e revisar em memória antes de confirmar.

`EVIDENCIA_IMPLEMENTACAO`: IMPLEMENTADO_VERIFICADO_ESTATICAMENTE. Presença: development=true; candidata=true.

### Intenção e contrato, sem promoção normativa

- [specs/004-environmental-collection-registration/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/004-environmental-collection-registration/spec.md>) — `FR-001–FR-018; FR-023`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/004-environmental-collection-registration/contracts/collection-registration-api.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/004-environmental-collection-registration/contracts/collection-registration-api.openapi.yaml>) — `POST collections`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/023-frontend-collections/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/023-frontend-collections/spec.md>) — `US2`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.

### Cadeia seguida estaticamente

| Camada | Evidência e limite |
|---|---|
| route | Página /collections/new lê área autorizada; POST /api/laboratories/{laboratoryId}/areas/{areaId}/collections recebe apenas occurredAt e Idempotency-Key. |
| authorization | requireAuth e autorização contextual; OWNER/ADMIN/MEMBER podem CREATE_COLLECTION em laboratório ativo; confirmação reavalia área subordinada. |
| service | parseCollectionInput valida data civil, offset explícito Z ou numérico, precisão até milissegundos e ocorrência não futura; CollectionsService fixa UUID, autoria e confirmedAt. |
| persistence | Nenhuma gravação antes da confirmação; somente a operação create posterior persiste CollectionData. Data de campo não é substituída por createdAt/confirmedAt. |
| ui | Form e review preservam contexto/instante/offset e valores corrigíveis antes de confirmar; não há draft persistido da criação de coleta. Draft015 aplica-se a medições em coleta já confirmada. |

### Fontes de implementação e testes nos dois snapshots

- `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/new/page.tsx` — `NewCollectionPage`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/new/page.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/new/page.tsx>).
- `src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts` — `createCollectionHandlers`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts>).
- `src/app/api/server/collections/collection.contracts.ts` — `parseCollectionInput / parseIdempotencyKey`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/collections/collection.contracts.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/collections/collection.contracts.ts>).
- `src/app/api/server/areas/area.authorization.ts` — `CREATE_COLLECTION`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/areas/area.authorization.ts>).
- `src/app/api/server/services/collections.service.ts` — `create`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/collections.service.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/collections.service.ts>).
- `src/components/collections/collection-form.tsx` — `CollectionForm`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/collections/collection-form.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/collections/collection-form.tsx>).
- `src/components/collections/collection-form-state.ts` — `estado/revisão`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/collections/collection-form-state.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/collections/collection-form-state.ts>).
- `src/lib/collection-date-time.ts` — `conversão de apresentação`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/lib/collection-date-time.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/lib/collection-date-time.ts>).
- `tests/unit/collection-contracts.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collection-contracts.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collection-contracts.test.ts>).
- `tests/unit/collection-date-time.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collection-date-time.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collection-date-time.test.ts>).
- `tests/unit/collection-form-state.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collection-form-state.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collection-form-state.test.ts>).
- `tests/unit/collections-service.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collections-service.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collections-service.test.ts>).
- `tests/integration/collections-route.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/collections-route.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/collections-route.test.ts>).
- `tests/e2e/collection-registration.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/collection-registration.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/collection-registration.spec.ts>).
- `tests/e2e/frontend-collections.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-collections.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-collections.spec.ts>).

### Seleção de testes e histórico consultado

Execução nesta missão: `NOT_RUN`. Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.

- `tests/unit/collection-contracts.test.ts`.
- `tests/unit/collection-date-time.test.ts`.
- `tests/unit/collection-form-state.test.ts`.
- `tests/unit/collections-service.test.ts`.
- `tests/integration/collections-route.test.ts`.
- `tests/e2e/collection-registration.spec.ts`.
- `tests/e2e/frontend-collections.spec.ts`.

- `FATO_DOCUMENTADO`: [specs/004-environmental-collection-registration/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/004-environmental-collection-registration/implementation-evidence.md>); localização: **T052–T053; T081–T084; T109**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Registra validação temporal, consulta e reconciliação técnicas históricas; SC-002/SC-007 permanecem não verificadas. Consulta sem execução (`NOT_RUN`).

Aceite humano: SC-002 e SC-007 = NAO_VERIFICADO, conforme Human evaluation status da spec004; metas de 90% e compreensão não foram medidas nesta missão. Aceite humano da incorporação visual permanece pendente.

Estado científico: NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.

### Afirmação anterior a adendar

Fonte: [docs/code-first-prd/implementation/backlog.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/backlog.md>); SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Localização: **Itens > linha IMP-004 > Estado atual / Evidência**.

> `AGUARDANDO_DEPENDENCIAS`; estrutura sem consumidor conectado.

RECOMENDACAO: Registrar início/revisão/validação de ocorrência e POST atuais; distinguir coleta sem rascunho persistido de draft ambiental015.

Lacuna/limite: Inspeção não demonstra data de campo de usuários reais nem cumprimento das metas humanas.

Próxima ação: RECOMENDACAO: Adendar o fluxo conectado sem modificar os limites de edição, exclusão, offline e ciência.

## IMP-004-C02 — Confirmar coleta atomicamente, recuperar resposta perdida sem duplicação e preservar a identidade que iniciou a tentativa.

`EVIDENCIA_IMPLEMENTACAO`: IMPLEMENTADO_VERIFICADO_ESTATICAMENTE. Presença: development=true; candidata=true.

### Intenção e contrato, sem promoção normativa

- [specs/004-environmental-collection-registration/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/004-environmental-collection-registration/spec.md>) — `FR-019–FR-022`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/023-frontend-collections/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/023-frontend-collections/spec.md>) — `US1; FR-004–FR-006`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.

### Cadeia seguida estaticamente

| Camada | Evidência e limite |
|---|---|
| route | POST usa Idempotency-Key UUID; prova de iniciador opcional para compatibilidade de cliente legado, mas conferida se presente; resposta201/200 com Location canônica. |
| authorization | requireAuth antes do envio; prova HMAC enviada pelo browser vincula principal corrente à identidade inicial. Serviço revalida contexto antes de consultar replay. |
| service | Transação Serializable: busca mesma chave por autor, compara laboratório/área/instante/offset; igual recupera mesmo ID, divergência CONFLICT; retry limitado para P2002/P2034. |
| persistence | Unicidade composta userId+confirmationKey e tuple de metadados; create completo em transação. |
| ui | Snapshot estável de contexto/chave/body/prova; envio único; incerteza mantém bloqueio de edição e permite reenvio original; rejeição posterior não resolve automaticamente a primeira tentativa. |

### Fontes de implementação e testes nos dois snapshots

- `src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts` — `POST; X-Collection-Initiator-Proof`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts>).
- `src/app/api/server/collections/collection-initiation.ts` — `makeCollectionInitiatorProof / matchesCollectionInitiatorProof`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/collections/collection-initiation.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/collections/collection-initiation.ts>).
- `src/app/api/server/services/collections.service.ts` — `create / sameTuple / PrismaCollectionStore`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/collections.service.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/collections.service.ts>).
- `prisma/migrations/20260915000100_collection_registration_metadata/migration.sql` — `unicidade userId+confirmationKey`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260915000100_collection_registration_metadata/migration.sql>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20260915000100_collection_registration_metadata/migration.sql>).
- `src/components/collections/collection-form-state.ts` — `snapshot e incerteza`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/collections/collection-form-state.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/collections/collection-form-state.ts>).
- `src/components/collections/collection-form.tsx` — `confirm`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/collections/collection-form.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/collections/collection-form.tsx>).
- `src/components/collections/collection-submission.ts` — `readCollectionConfirmation`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/collections/collection-submission.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/collections/collection-submission.ts>).
- `tests/unit/collection-initiation.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collection-initiation.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collection-initiation.test.ts>).
- `tests/unit/collection-form-state.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collection-form-state.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collection-form-state.test.ts>).
- `tests/unit/frontend-collections-recovery.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/frontend-collections-recovery.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/frontend-collections-recovery.test.ts>).
- `tests/unit/frontend-collections-submission.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/frontend-collections-submission.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/frontend-collections-submission.test.ts>).
- `tests/unit/collections-service.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collections-service.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collections-service.test.ts>).
- `tests/integration/collections-route.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/collections-route.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/collections-route.test.ts>).
- `tests/e2e/frontend-collections.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-collections.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-collections.spec.ts>).

### Seleção de testes e histórico consultado

Execução nesta missão: `NOT_RUN`. Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.

- `tests/unit/collection-initiation.test.ts`.
- `tests/unit/collection-form-state.test.ts`.
- `tests/unit/frontend-collections-recovery.test.ts`.
- `tests/unit/frontend-collections-submission.test.ts`.
- `tests/unit/collections-service.test.ts`.
- `tests/integration/collections-route.test.ts`.
- `tests/e2e/frontend-collections.spec.ts`.

- `FATO_DOCUMENTADO`: [specs/023-frontend-collections/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/023-frontend-collections/implementation-evidence.md>); localização: **Fechamento da candidata funcional e gate do HEAD publicado; Regra de encerramento por SHA**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Relata15 gates e182 E2E da candidata funcional5f5d8719e25856b59e84c053cb13d2516dbeac49; exige validação do HEAD publicado separadamente. Números históricos, não execução desta missão. Consulta sem execução (`NOT_RUN`).

Aceite humano: SC-002 e SC-007 = NAO_VERIFICADO, conforme Human evaluation status da spec004; metas de 90% e compreensão não foram medidas nesta missão. Aceite humano da incorporação visual permanece pendente.

Estado científico: NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.

### Afirmação anterior a adendar

Fonte: [docs/code-first-prd/implementation/implementation-plan.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/implementation-plan.md>); SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Localização: **Módulos identificados > Coletas**.

> Model e ação visual existem, sem fluxo persistido conectado.

RECOMENDACAO: Registrar confirmação atômica/idempotente e recuperação segura023 já conectadas; relatar prova de iniciador no browser sem afirmar obrigatoriedade para todo cliente da API.

Lacuna/limite: Transações e cenários A→B→A foram inspecionados como dados; não houve corrida, POST ou recuperação em runtime nesta missão.

Próxima ação: RECOMENDACAO: Atualizar o estado técnico estático e citar evidência023 pelo SHA próprio, sem transportar resultados para a base ou candidata atuais.

## IMP-004-C03 — Consultar coleta confirmada e preservar associação, autoria interna, precisão temporal e imutabilidade.

`EVIDENCIA_IMPLEMENTACAO`: IMPLEMENTADO_VERIFICADO_ESTATICAMENTE. Presença: development=true; candidata=true.

### Intenção e contrato, sem promoção normativa

- [specs/004-environmental-collection-registration/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/004-environmental-collection-registration/spec.md>) — `FR-024–FR-032`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/023-frontend-collections/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/023-frontend-collections/spec.md>) — `US3`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.

### Cadeia seguida estaticamente

| Camada | Evidência e limite |
|---|---|
| route | GET /collections/{collectionId}; detalhe server-side em caminho com laboratório e área explícitos. |
| authorization | Vínculo atual e READ_AREAS; findDetail restringe simultaneamente id/areaId/laboratoryId e tuple confirmado. Inativo continua legível com readOnly. |
| service | DTO fechado contém id, occurredAt com offset original, confirmedAt, área/laboratório públicos e readOnly; não inclui userId nem confirmationKey. |
| persistence | FK composta para CollectionArea/laboratório e FK restritiva; trigger impede UPDATE/DELETE de coleta confirmada, inclusive fora da UI. Legado sem tuple completo não é projetado como coleta confirmada nova. |
| ui | CollectionDetail distingue ocorrência e confirmação; não oferece editar/excluir. Página tem consumidores IHFR posteriores, que não integram criação004 nem autorizam ciência nova. |

### Fontes de implementação e testes nos dois snapshots

- `src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.ts` — `GET`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.ts>).
- `src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.handlers.ts` — `GET`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.handlers.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.handlers.ts>).
- `src/app/api/server/services/collections.service.ts` — `detail / completeRecord / toDetail`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/collections.service.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/collections.service.ts>).
- `src/app/api/server/collections/collection.contracts.ts` — `serializeCollectionDetail`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/collections/collection.contracts.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/collections/collection.contracts.ts>).
- `prisma/schema.prisma` — `CollectionData`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/schema.prisma>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/schema.prisma>).
- `prisma/migrations/20260915000100_collection_registration_metadata/migration.sql` — `FK composta e trigger imp004_collection_immutable`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260915000100_collection_registration_metadata/migration.sql>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20260915000100_collection_registration_metadata/migration.sql>).
- `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx` — `CollectionDetailPage`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx>).
- `src/components/collections/collection-detail.tsx` — `CollectionDetail`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/collections/collection-detail.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/collections/collection-detail.tsx>).
- `tests/unit/collections-service.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collections-service.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collections-service.test.ts>).
- `tests/unit/collection-openapi-contract.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collection-openapi-contract.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collection-openapi-contract.test.ts>).
- `tests/integration/collections-route.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/collections-route.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/collections-route.test.ts>).
- `tests/migration/collection-registration-migration.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/migration/collection-registration-migration.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/migration/collection-registration-migration.test.ts>).
- `tests/e2e/collection-registration.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/collection-registration.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/collection-registration.spec.ts>).
- `tests/e2e/frontend-collections.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-collections.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-collections.spec.ts>).

### Seleção de testes e histórico consultado

Execução nesta missão: `NOT_RUN`. Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.

- `tests/unit/collections-service.test.ts`.
- `tests/unit/collection-openapi-contract.test.ts`.
- `tests/integration/collections-route.test.ts`.
- `tests/migration/collection-registration-migration.test.ts`.
- `tests/e2e/collection-registration.spec.ts`.
- `tests/e2e/frontend-collections.spec.ts`.

- `FATO_DOCUMENTADO`: [specs/004-environmental-collection-registration/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/004-environmental-collection-registration/implementation-evidence.md>); localização: **T094–T106; T109**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Relata migration, integração e E2E históricos; reconhece critérios humanos não medidos. Consulta sem execução (`NOT_RUN`).

Aceite humano: SC-002 e SC-007 = NAO_VERIFICADO, conforme Human evaluation status da spec004; metas de 90% e compreensão não foram medidas nesta missão. Aceite humano da incorporação visual permanece pendente.

Estado científico: NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.

### Afirmação anterior a adendar

Fonte: [docs/code-first-prd/implementation/backlog.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/backlog.md>); SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Localização: **Itens > linha IMP-004 > Riscos decisórios**.

> Data de campo, revisão, edição, exclusão e permissões estão abertas.

RECOMENDACAO: Adicionar que ocorrência/revisão/permissões mínimas e consulta foram especificadas e conectadas na004; edição e exclusão continuam fora do recorte, sem encerrar políticas futuras.

Lacuna/limite: Não se conclui integridade de uma instância remota nem sucesso de trigger executada neste snapshot. Listagem/histórico pertencem a007, não são lacuna da consulta mínima004.

Próxima ação: RECOMENDACAO: Adendar os recortes resolvidos e preservar fronteiras com007 e006.

## IMP-005-C01 — Contrato de captura ambiental v1: quatro grupos, unidades/regras explícitas, ausência distinta de zero/false e separação da matemática IHFR.

`EVIDENCIA_IMPLEMENTACAO`: IMPLEMENTADO_VERIFICADO_ESTATICAMENTE. Presença: development=true; candidata=true.

### Intenção e contrato, sem promoção normativa

- [specs/005-environmental-collection-data/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/005-environmental-collection-data/spec.md>) — `Authority and Scope; FR-003–FR-005; FR-014–FR-019; G2/G3`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/005-environmental-collection-data/contracts/measurement-contract-v1.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/005-environmental-collection-data/contracts/measurement-contract-v1.md>) — `Contrato de medição`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/005-environmental-collection-data/contracts/math-contract-v1.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/005-environmental-collection-data/contracts/math-contract-v1.md>) — `Separação de versões; Condição de ativação`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.

### Cadeia seguida estaticamente

| Camada | Evidência e limite |
|---|---|
| route | POST environmental-data valida envelope fechado water/soil/vegetation/terrain e Content-Type JSON; campos/valores inválidos resultam400. |
| authorization | O contrato de captura não substitui sessão/autorização; handler usa requireAuth e serviço aplica contexto atual. |
| service | Parser canônico rejeita extras/legado, enums/faixas/números não finitos e preserva zero/false/null opcionais. Hash/versionamento são do conjunto confirmado. |
| persistence | Payload v1 em EnvironmentalMeasurementSet separado dos models legados WaterData/SoilData/VegetationData/TerrainData. Contrato de medição não é mathContractVersion/algorithmVersion. |
| ui | Form/review mostram quatro grupos, labels/unidades e campos opcionais; nenhuma fórmula IHFR é executada por esse parser/formulário. |

### Fontes de implementação e testes nos dois snapshots

- `src/types/environmental-data.type.ts` — `MEASUREMENT_CONTRACT_VERSION / ENVIRONMENTAL_FIELDS`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/types/environmental-data.type.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/types/environmental-data.type.ts>).
- `src/types/environmental-data.validation.ts` — `validação compartilhada`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/types/environmental-data.validation.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/types/environmental-data.validation.ts>).
- `src/app/api/server/environmental-data/environmental-data.contracts.ts` — `parseEnvironmentalInput / hashPayload`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/environmental-data.contracts.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/environmental-data.contracts.ts>).
- `src/app/api/server/environmental-data/environmental-data.http.ts` — `POST`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/environmental-data.http.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/environmental-data.http.ts>).
- `src/components/environmental-data/environmental-data-form-state.ts` — `formToPayload`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-data-form-state.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-data-form-state.ts>).
- `src/components/environmental-data/environmental-data-review.tsx` — `EnvironmentalReview`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-data-review.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-data-review.tsx>).
- `src/components/environmental-data/environmental-data-detail.tsx` — `EnvironmentalValues`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-data-detail.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-data-detail.tsx>).
- `tests/unit/environmental-data-contracts.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/environmental-data-contracts.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/environmental-data-contracts.test.ts>).
- `tests/unit/environmental-data-form-state.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/environmental-data-form-state.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/environmental-data-form-state.test.ts>).
- `tests/unit/environmental-data-openapi-contract.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/environmental-data-openapi-contract.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/environmental-data-openapi-contract.test.ts>).
- `tests/unit/frontend-environmental-preservation.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/frontend-environmental-preservation.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/frontend-environmental-preservation.test.ts>).

### Seleção de testes e histórico consultado

Execução nesta missão: `NOT_RUN`. Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.

- `tests/unit/environmental-data-contracts.test.ts`.
- `tests/unit/environmental-data-form-state.test.ts`.
- `tests/unit/environmental-data-openapi-contract.test.ts`.
- `tests/unit/frontend-environmental-preservation.test.ts`.

- `FATO_DOCUMENTADO`: [specs/005-environmental-collection-data/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/005-environmental-collection-data/implementation-evidence.md>); localização: **Aceite humano e governança; Exclusões científicas verificadas — T036**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Registra separação de captura/diagnóstico e ausência de promoção científica; histórico consultado sem execução. Consulta sem execução (`NOT_RUN`).

Aceite humano: SC-006/T037 = NAO_VERIFICADO, conforme implementation-evidence da spec005; identificação humana de origem, ausência e somente leitura não decorre dos testes. Aceite humano posterior permanece separado.

Estado científico: Contrato de captura ihfr-measurement-v1 registrado como DECISAO_CONFIRMADA na spec005/contrato, com origem técnica de 2026-09-17. Isso não aprova cálculo nem valida ciência IHFR. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO para consumidores IHFR.

### Afirmação anterior a adendar

Fonte: [docs/code-first-prd/implementation/backlog.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/backlog.md>); SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Localização: **Itens > linha IMP-005 > Estado atual / Dependências**.

> `AGUARDANDO_DECISAO_CIENTIFICA`; models sem consumidor. ... contrato científico validado e versionado no nível aplicável.

RECOMENDACAO: Distinguir captura técnica v1 aprovada para005 de validação científica do IHFR: parser/formulário/contrato estão conectados; G2/G3 fechados apenas no recorte técnico explicitado em2026-09-17.

Lacuna/limite: A formulação antiga não pode ser corrigida declarando ciência IHFR validada. Legado e schema isolado continuam sem autoridade científica.

Próxima ação: RECOMENDACAO: Adendar contrato técnico, versão e limites de aprovação; encaminhar qualquer mudança científica à autoridade competente.

## IMP-005-C02 — Confirmar conjunto integral imutável por coleta, idempotência própria e consumo transacional do draft pessoal quando fornecido.

`EVIDENCIA_IMPLEMENTACAO`: IMPLEMENTADO_VERIFICADO_ESTATICAMENTE. Presença: development=true; candidata=true.

### Intenção e contrato, sem promoção normativa

- [specs/005-environmental-collection-data/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/005-environmental-collection-data/spec.md>) — `FR-006–FR-009; FR-014–FR-018`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/005-environmental-collection-data/contracts/environmental-data-boundary.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/005-environmental-collection-data/contracts/environmental-data-boundary.md>) — `C-002/C-004`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/015-environmental-drafts/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/015-environmental-drafts/spec.md>) — `consumo na confirmação`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.

### Cadeia seguida estaticamente

| Camada | Evidência e limite |
|---|---|
| route | POST environmental-data recebe Idempotency-Key próprio; Draft-Id/Draft-Revision opcionais são validados juntos. Prova de iniciador enviada pelo browser é verificada se presente. |
| authorization | requireAuth, identidade ACTIVE, vínculo e CREATE_ENVIRONMENTAL_DATA; três papéis podem gravar em ativo; área/coleta/tuple confirmado subordinados são revalidados antes do replay. |
| service | Serializable: compara autor/chave/coleta/hash/measurementContractVersion; mesma ação retorna200, divergência/segundo conjunto409. Se há draft próprio, exige referência atual; consumo e create ocorrem na mesma transação. |
| persistence | CollectionData único por EnvironmentalMeasurementSet; userId+confirmationKey único; payload JSON/versionado e confirmedAt; trigger rejeita UPDATE/DELETE de conjunto confirmado. |
| ui | Revisão em memória e POST final; sucesso após resposta válida; resultado incerto conserva snapshot e bloqueio. Conjunto confirmado permanece distinto de draft e metadados da coleta. |

### Fontes de implementação e testes nos dois snapshots

- `src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts` — `POST`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts>).
- `src/app/api/server/environmental-data/environmental-data.http.ts` — `createEnvironmentalHandlers`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/environmental-data.http.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/environmental-data.http.ts>).
- `src/app/api/server/services/environmental-data.service.ts` — `create / PrismaMeasurementStore / measurementAuthorization`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/environmental-data.service.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/environmental-data.service.ts>).
- `src/app/api/server/areas/area.authorization.ts` — `CREATE_ENVIRONMENTAL_DATA`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/areas/area.authorization.ts>).
- `prisma/migrations/20260917000100_environmental_measurement_set/migration.sql` — `unicidades; trigger imutabilidade`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260917000100_environmental_measurement_set/migration.sql>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20260917000100_environmental_measurement_set/migration.sql>).
- `prisma/migrations/20261010000100_environmental_drafts/migration.sql` — `EnvironmentalDraft`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20261010000100_environmental_drafts/migration.sql>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20261010000100_environmental_drafts/migration.sql>).
- `src/components/environmental-data/environmental-data-form.tsx` — `confirm`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-data-form.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-data-form.tsx>).
- `tests/unit/environmental-data-service.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/environmental-data-service.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/environmental-data-service.test.ts>).
- `tests/integration/environmental-data-route.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/environmental-data-route.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/environmental-data-route.test.ts>).
- `tests/integration/environmental-data-concurrency.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/environmental-data-concurrency.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/environmental-data-concurrency.test.ts>).
- `tests/integration/environmental-drafts.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/environmental-drafts.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/environmental-drafts.test.ts>).
- `tests/migration/environmental-data-migration.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/migration/environmental-data-migration.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/migration/environmental-data-migration.test.ts>).
- `tests/e2e/environmental-data-registration.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/environmental-data-registration.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/environmental-data-registration.spec.ts>).
- `tests/e2e/frontend-environmental-drafts.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-environmental-drafts.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-environmental-drafts.spec.ts>).

### Seleção de testes e histórico consultado

Execução nesta missão: `NOT_RUN`. Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.

- `tests/unit/environmental-data-service.test.ts`.
- `tests/integration/environmental-data-route.test.ts`.
- `tests/integration/environmental-data-concurrency.test.ts`.
- `tests/integration/environmental-drafts.test.ts`.
- `tests/migration/environmental-data-migration.test.ts`.
- `tests/e2e/environmental-data-registration.spec.ts`.
- `tests/e2e/frontend-environmental-drafts.spec.ts`.

- `FATO_DOCUMENTADO`: [specs/005-environmental-collection-data/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/005-environmental-collection-data/implementation-evidence.md>); localização: **Validação incremental; Preparação final do PR — 2026-09-18**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Registra resultados próprios do commit de produto e regressão completa histórica incompleta; não somar nem promover as execuções. Consulta sem execução (`NOT_RUN`).
- `FATO_DOCUMENTADO`: [specs/015-environmental-drafts/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/015-environmental-drafts/implementation-evidence.md>); localização: **Evidências de implementação015**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Relata consumo/rollback/save-versus-confirm e limitações; sem nova execução. Consulta sem execução (`NOT_RUN`).

Aceite humano: SC-006/T037 = NAO_VERIFICADO, conforme implementation-evidence da spec005; identificação humana de origem, ausência e somente leitura não decorre dos testes. Aceite humano posterior permanece separado.

Estado científico: Contrato de captura ihfr-measurement-v1 registrado como DECISAO_CONFIRMADA na spec005/contrato, com origem técnica de 2026-09-17. Isso não aprova cálculo nem valida ciência IHFR. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO para consumidores IHFR.

### Afirmação anterior a adendar

Fonte: [docs/code-first-prd/implementation/implementation-plan.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/implementation-plan.md>); SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Localização: **Módulos identificados > Dados ambientais**.

> Models de água, solo, vegetação e terreno existem sem consumidor; não representam contrato científico aprovado.

RECOMENDACAO: Acrescentar conjunto EnvironmentalMeasurementSet v1 conectado, integral/idempotente/imutável, separado dos quatro models legados; não transformar esse incremento em aprovação da matemática IHFR.

Lacuna/limite: Migration/teste versionado não prova aplicação em banco remoto; concorrência/rollback/identidade foram lidos, não exercitados.

Próxima ação: RECOMENDACAO: Atualizar a cadeia persistida e citar contratos005/015 em vez de resumir tudo como models legados sem consumidor.

## IMP-005-C03 — Consultar valores ambientais efetivamente persistidos, ausência explícita e contexto somente leitura sem autoria/chaves/diagnóstico no DTO.

`EVIDENCIA_IMPLEMENTACAO`: IMPLEMENTADO_VERIFICADO_ESTATICAMENTE. Presença: development=true; candidata=true.

### Intenção e contrato, sem promoção normativa

- [specs/005-environmental-collection-data/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/005-environmental-collection-data/spec.md>) — `FR-008; FR-010–FR-013`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/005-environmental-collection-data/contracts/environmental-data-boundary.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/005-environmental-collection-data/contracts/environmental-data-boundary.md>) — `C-003/C-005`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.

### Cadeia seguida estaticamente

| Camada | Evidência e limite |
|---|---|
| route | GET environmental-data devolve environmentalData:null para coleta acessível sem conjunto; ausência não se confunde com recurso inexistente. |
| authorization | requireAuth e READ_ENVIRONMENTAL_DATA; laboratório→área→coleta revalidados; inativo pode ler e retorna readOnly. |
| service | project exige versão conhecida e revalida payload persistido; somente id/collectionId/versão/confirmedAt/readOnly e quatro grupos, sem userId/chave/hash. |
| persistence | Leitura de EnvironmentalMeasurementSet da coleta confirmada; não adapta nem preenche dados a partir de WaterData/SoilData/VegetationData/TerrainData legados. |
| ui | EnvironmentalDataPage usa serviços no servidor e diferencia ausência, form, leitura e inativo; EnvironmentalValues mostra valores aceitos/ausência sem inferir qualidade científica. |

### Fontes de implementação e testes nos dois snapshots

- `src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts` — `GET`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts>).
- `src/app/api/server/environmental-data/environmental-data.http.ts` — `GET`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/environmental-data.http.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/environmental-data.http.ts>).
- `src/app/api/server/services/environmental-data.service.ts` — `detail / project / assertContext`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/environmental-data.service.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/environmental-data.service.ts>).
- `src/components/environmental-data/environmental-data-page.tsx` — `EnvironmentalDataPage`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-data-page.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-data-page.tsx>).
- `src/components/environmental-data/environmental-data-detail.tsx` — `EnvironmentalDetail / EnvironmentalValues`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-data-detail.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-data-detail.tsx>).
- `src/types/environmental-data.type.ts` — `PublicEnvironmentalData`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/types/environmental-data.type.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/types/environmental-data.type.ts>).
- `prisma/schema.prisma` — `EnvironmentalMeasurementSet`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/schema.prisma>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/schema.prisma>).
- `tests/unit/environmental-data-service-read.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/environmental-data-service-read.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/environmental-data-service-read.test.ts>).
- `tests/integration/environmental-data-route.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/environmental-data-route.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/environmental-data-route.test.ts>).
- `tests/e2e/environmental-data-read.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/environmental-data-read.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/environmental-data-read.spec.ts>).
- `tests/e2e/frontend-environmental-drafts.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-environmental-drafts.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-environmental-drafts.spec.ts>).

### Seleção de testes e histórico consultado

Execução nesta missão: `NOT_RUN`. Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.

- `tests/unit/environmental-data-service-read.test.ts`.
- `tests/integration/environmental-data-route.test.ts`.
- `tests/e2e/environmental-data-read.spec.ts`.
- `tests/e2e/frontend-environmental-drafts.spec.ts`.

- `FATO_DOCUMENTADO`: [specs/005-environmental-collection-data/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/005-environmental-collection-data/implementation-evidence.md>); localização: **Aceite humano e governança**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. SC-006/T037 segue NAO_VERIFICADO. Consulta sem execução (`NOT_RUN`).
- `FATO_DOCUMENTADO`: [specs/024-frontend-environmental-drafts/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/024-frontend-environmental-drafts/implementation-evidence.md>); localização: **Fechamento da candidata funcional e gate do HEAD publicado**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Explicita que as seis configurações visuais cobrem formulário/draft/revisão; leitura confirmada é verificada separadamente, não seis capturas de leitura. Consulta sem execução (`NOT_RUN`).

Aceite humano: SC-006/T037 = NAO_VERIFICADO, conforme implementation-evidence da spec005; identificação humana de origem, ausência e somente leitura não decorre dos testes. Aceite humano posterior permanece separado.

Estado científico: Contrato de captura ihfr-measurement-v1 registrado como DECISAO_CONFIRMADA na spec005/contrato, com origem técnica de 2026-09-17. Isso não aprova cálculo nem valida ciência IHFR. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO para consumidores IHFR.

### Afirmação anterior a adendar

Fonte: [docs/code-first-prd/implementation/backlog.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/backlog.md>); SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Localização: **Itens > linha IMP-005 > Evidência**.

> `WaterData`, `SoilData`, `VegetationData` e `TerrainData` em `prisma/schema.prisma`; `CF-PRD-FR-007`.

RECOMENDACAO: Adicionar leitura do conjunto confirmado v1 e allowlist/ausência/readOnly; citar schema atual e serviço, mantendo models legados como legado e não contrato vigente.

Lacuna/limite: SC-006 continua humano. Leitura confirmada tem testes distintos de pixels/capturas da tela em edição; não inferir todas as telas pela matriz visual do formulário.

Próxima ação: RECOMENDACAO: Adendar leitura real com aceites separados e limite científico explícito.

## IMP-005-I04 — Incremento015/024: salvar, retomar e descartar draft ambiental pessoal por titular/coleta confirmada, com revisão otimista, replay e isolamento.

`EVIDENCIA_IMPLEMENTACAO`: IMPLEMENTADO_VERIFICADO_ESTATICAMENTE. Presença: development=true; candidata=true.

### Intenção e contrato, sem promoção normativa

- [specs/015-environmental-drafts/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/015-environmental-drafts/spec.md>) — `draft pessoal e salvamento explícito`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/015-environmental-drafts/contracts/drafts.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/015-environmental-drafts/contracts/drafts.md>) — `contrato de draft`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/024-frontend-environmental-drafts/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/024-frontend-environmental-drafts/spec.md>) — `US1/US2; FR-001–FR-006`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.

### Cadeia seguida estaticamente

| Camada | Evidência e limite |
|---|---|
| route | GET/PUT/DELETE /environmental-data/draft; PUT/DELETE conferem CSRF; limite de body32768 bytes; private,no-store. |
| authorization | requireAuth, prova de iniciador quando presente e contexto atual antes de cada ação; chave de leitura userId+collectionDataId separa titulares. |
| service | Serializable com retry limitado; saveKey/hash e expectedRevision+draftId impedem sobrescrita silenciosa; discard condiciona identidade/revisão e não remove draft recriado. |
| persistence | EnvironmentalDraft separado de ciência confirmada, unique(userId,collectionDataId), versão environmental-draft-v1, revisão positiva; sem TTL automático. Conta excluída pode ter cleanup pessoal em fluxo013, que não foi reauditado aqui. |
| ui | Save/reload/discard explícitos, conflito/retry com tentativa original e bloqueio em resultado incerto; nenhuma política de autosave, colaboração ou offline foi localizada neste recorte. |

### Fontes de implementação e testes nos dois snapshots

- `src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/draft/route.ts` — `GET/PUT/DELETE`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/draft/route.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/draft/route.ts>).
- `src/app/api/server/environmental-data/draft.http.ts` — `createDraftHandlers`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/draft.http.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/draft.http.ts>).
- `src/app/api/server/environmental-data/draft.service.ts` — `detail / save / discard / context`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/draft.service.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/draft.service.ts>).
- `src/types/environmental-draft.ts` — `parseDraftSave / parseDraftReference / parseDraftFields`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/types/environmental-draft.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/types/environmental-draft.ts>).
- `prisma/migrations/20261010000100_environmental_drafts/migration.sql` — `unicidade e checks`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20261010000100_environmental_drafts/migration.sql>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20261010000100_environmental_drafts/migration.sql>).
- `src/components/environmental-data/environmental-draft-actions.tsx` — `useEnvironmentalDraft / EnvironmentalDraftActions`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-draft-actions.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-draft-actions.tsx>).
- `src/components/environmental-data/environmental-data-form.tsx` — `saveDraft / reloadDraft / discardDraft`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-data-form.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-data-form.tsx>).
- `tests/unit/environmental-draft-contracts.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/environmental-draft-contracts.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/environmental-draft-contracts.test.ts>).
- `tests/integration/environmental-draft-http.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/environmental-draft-http.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/environmental-draft-http.test.ts>).
- `tests/integration/environmental-drafts.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/environmental-drafts.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/environmental-drafts.test.ts>).
- `tests/migration/environmental-drafts.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/migration/environmental-drafts.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/migration/environmental-drafts.test.ts>).
- `tests/e2e/environmental-drafts.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/environmental-drafts.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/environmental-drafts.spec.ts>).
- `tests/e2e/frontend-environmental-drafts.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-environmental-drafts.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-environmental-drafts.spec.ts>).

### Seleção de testes e histórico consultado

Execução nesta missão: `NOT_RUN`. Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.

- `tests/unit/environmental-draft-contracts.test.ts`.
- `tests/integration/environmental-draft-http.test.ts`.
- `tests/integration/environmental-drafts.test.ts`.
- `tests/migration/environmental-drafts.test.ts`.
- `tests/e2e/environmental-drafts.spec.ts`.
- `tests/e2e/frontend-environmental-drafts.spec.ts`.

- `FATO_DOCUMENTADO`: [specs/015-environmental-drafts/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/015-environmental-drafts/implementation-evidence.md>); localização: **Remediação posterior — RC-DRAFT-001; Revisão focal posterior**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Relata hidratação, OCC, consumo/rollback e limite Chromium; consulta histórica sem repetição. Consulta sem execução (`NOT_RUN`).
- `FATO_DOCUMENTADO`: [specs/024-frontend-environmental-drafts/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/024-frontend-environmental-drafts/implementation-evidence.md>); localização: **Fechamento da candidata funcional e gate do HEAD publicado**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Relata candidataec4b06e4b27059b1077904e0b67fde498c28b053 com15 gates/190 E2E e revisão no mesmo SHA; não é execução deste fragmento. Consulta sem execução (`NOT_RUN`).

Aceite humano: SC-006/T037 = NAO_VERIFICADO, conforme implementation-evidence da spec005; identificação humana de origem, ausência e somente leitura não decorre dos testes. Aceite humano posterior permanece separado.

Estado científico: Contrato de captura ihfr-measurement-v1 registrado como DECISAO_CONFIRMADA na spec005/contrato, com origem técnica de 2026-09-17. Isso não aprova cálculo nem valida ciência IHFR. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO para consumidores IHFR.

### Afirmação anterior a adendar

Fonte: [docs/code-first-prd/implementation/backlog.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/backlog.md>); SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Localização: **Itens > linha IMP-005 > Estado atual, lida com Entrega de rascunhos015 — 2026-10-10**.

> `AGUARDANDO_DECISAO_CIENTIFICA`; models sem consumidor.

RECOMENDACAO: O adendo015 já informa implementação, mas a tabela principal segue no corte antigo. Acrescentar mapa explícito IMP005→005/015/024 e manter os estados históricos e de homologação separados.

Lacuna/limite: Bloqueio de histórico SPA fora de Navigation API cancelável não é garantia universal; estudo humano, dispositivo físico e operação externa não foram executados.

Próxima ação: RECOMENDACAO: Integrar a rastreabilidade do incremento no adendo Code-First e manter limitações de browser e aceites.

## IMP-005-I05 — Incremento024: prontidão/hidratação, representações fiéis e recuperação sem trocar titular ou liberar tentativa incerta.

`EVIDENCIA_IMPLEMENTACAO`: IMPLEMENTADO_VERIFICADO_ESTATICAMENTE. Presença: development=true; candidata=true.

### Intenção e contrato, sem promoção normativa

- [specs/024-frontend-environmental-drafts/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/024-frontend-environmental-drafts/spec.md>) — `US1–US3; FR-002/FR-003/FR-005/FR-007/FR-008/FR-010/FR-011`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- [specs/015-environmental-drafts/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/015-environmental-drafts/spec.md>) — `representações e limites`; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.

### Cadeia seguida estaticamente

| Camada | Evidência e limite |
|---|---|
| route | Mesmos GET/PUT/DELETE de draft e POST ambiental; prova de iniciador e snapshot acompanham novas tentativas do browser. |
| authorization | Servidor compara prova presente com principal corrente; APIs seguem compatibilidade de clientes sem esse header. Prova não substitui revalidação de vínculo/papel/estado. |
| service | Parser definitivo só na confirmação; células de draft diferenciam ausente/editing/value. Reenvio preserva revisão/chave/corpo e contexto; incerteza anterior persiste após400/401/403/404/409/422/429/5xx. |
| persistence | Mesmo EnvironmentalDraft e EnvironmentalMeasurementSet; apresentação não altera schema, contrato de medição, payload confirmado ou cálculo. |
| ui | Controles dependem de hidratação; baseline/touched preservam false/zero/vazio/texto parcial; formatEnvironmentalNumber preserva magnitude não nula e focusEnvironmentalTarget abre grupos antes de focar. Sem alimentação de IHFR por draft. |

### Fontes de implementação e testes nos dois snapshots

- `src/components/environmental-data/environmental-data-form.tsx` — `hydrated / touched / savedForm / confirm`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-data-form.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-data-form.tsx>).
- `src/components/environmental-data/environmental-draft-actions.tsx` — `useEnvironmentalDraft`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-draft-actions.tsx>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-draft-actions.tsx>).
- `src/types/environmental-draft.ts` — `formToDraftFields / draftFieldsToForm`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/types/environmental-draft.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/types/environmental-draft.ts>).
- `src/components/environmental-data/environmental-presentation.ts` — `formatEnvironmentalNumber / focusEnvironmentalTarget`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-presentation.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-presentation.ts>).
- `src/components/environmental-data/environmental-outcome.ts` — `keepEnvironmentalUncertainty`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-outcome.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-outcome.ts>).
- `src/app/api/server/environmental-data/environmental-initiation.ts` — `prova de principal`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/environmental-initiation.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/environmental-initiation.ts>).
- `src/app/api/server/environmental-data/environmental-data.http.ts` — `X-Environmental-Initiator-Proof`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/environmental-data.http.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/environmental-data.http.ts>).
- `src/app/api/server/environmental-data/draft.http.ts` — `assertInitialPrincipal`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/draft.http.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/draft.http.ts>).
- `src/app/api/server/services/environmental-data.service.ts` — `create`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/environmental-data.service.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/environmental-data.service.ts>).
- `tests/unit/frontend-environmental-preservation.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/frontend-environmental-preservation.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/frontend-environmental-preservation.test.ts>).
- `tests/unit/frontend-environmental-presentation.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/frontend-environmental-presentation.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/frontend-environmental-presentation.test.ts>).
- `tests/unit/environmental-initiation.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/environmental-initiation.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/environmental-initiation.test.ts>).
- `tests/integration/environmental-draft-http.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/environmental-draft-http.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/environmental-draft-http.test.ts>).
- `tests/integration/environmental-data-route.test.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/environmental-data-route.test.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/environmental-data-route.test.ts>).
- `tests/e2e/frontend-environmental-drafts.spec.ts`: [development](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-environmental-drafts.spec.ts>) / [candidata](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-environmental-drafts.spec.ts>).

### Seleção de testes e histórico consultado

Execução nesta missão: `NOT_RUN`. Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.

- `tests/unit/frontend-environmental-preservation.test.ts`.
- `tests/unit/frontend-environmental-presentation.test.ts`.
- `tests/unit/environmental-initiation.test.ts`.
- `tests/integration/environmental-draft-http.test.ts`.
- `tests/integration/environmental-data-route.test.ts`.
- `tests/e2e/frontend-environmental-drafts.spec.ts`.

- `FATO_DOCUMENTADO`: [specs/024-frontend-environmental-drafts/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/024-frontend-environmental-drafts/implementation-evidence.md>); localização: **Fechamento da candidata funcional e gate do HEAD publicado**; SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Histórico distingue resultados oficiais, mocks/Pg, leitura/capturas e causas históricas inconclusivas; não atribuir nova execução ou causa resolvida. Consulta sem execução (`NOT_RUN`).

Aceite humano: SC-006/T037 = NAO_VERIFICADO, conforme implementation-evidence da spec005; identificação humana de origem, ausência e somente leitura não decorre dos testes. Aceite humano posterior permanece separado.

Estado científico: Contrato de captura ihfr-measurement-v1 registrado como DECISAO_CONFIRMADA na spec005/contrato, com origem técnica de 2026-09-17. Isso não aprova cálculo nem valida ciência IHFR. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO para consumidores IHFR.

### Afirmação anterior a adendar

Fonte: [docs/code-first-prd/implementation/implementation-plan.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/implementation-plan.md>); SHA `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Localização: **Módulos identificados > Dados ambientais**.

> Models de água, solo, vegetação e terreno existem sem consumidor; não representam contrato científico aprovado.

RECOMENDACAO: Acrescentar apresentação/recuperação024 sobre contratos005/015; separar preservação de valores/identidade da validade científica e do aceite humano.

Lacuna/limite: Testes nomeiam cenários A→B→A e tiny numbers, mas permanecem NOT_RUN nesta missão. Pixels e asserts unitários não provam todos os dispositivos/leitores de tela.

Próxima ação: RECOMENDACAO: Adendar capacidades atuais com evidência por SHA e registrar validações ausentes sem ampliar ciência ou suporte.

## Entrega e verificações documentais

Foram produzidas16 linhas estáveis (uma fronteira IMP-001, três recortes IMP-002, quatro IMP-003, três IMP-004 e cinco IMP-005), com cadeia, testes/seleção, evidência histórica, aceite, ciência, afirmação anterior e recomendação. O JSON é a fonte estruturada deste fragmento.

A checagem documental de parse, referências Git e escopo será registrada pelo coordenador no pacote agregado. Nenhum teste funcional foi executado por L-A. Não foram alterados código, configuração, artefatos globais de governança, docs/raw ou specs. Recomendações de adendo ficam para o executor CHAT autorizado; nenhum caminho canônico foi escrito aqui.
