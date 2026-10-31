# Evidências — frente C / Spec 037

Data: 2026-10-31. Estado: PREPARACAO_G0; produto NAO_IMPLEMENTADO nesta frente.
Base exata `07755822f5dc75fe2be1d924005d30ed99f64a0b`; development de origem `9b8595d232842d401ce81bbc92c54dd543aa2829`. Branch `feat/localizacao-endereco-opcional`; PR alvo development, dependência #45.

G0 acrescenta somente os quatro documentos deste diretório; guards herdados antes da primeira publicação. Não foi selecionado/ativado provedor, chamado serviço de geocodificação, alterado schema ou executada migration. Fonte de decisões #44 em `972f9b00189bf09117883913d8c4fa63e69f4d2f`.

| Verificação | Estado deste corte |
| --- | --- |
| Guards estáticos herdados | PASS no pacote G0 |
| Implementação/testes próprios C | NAO_IMPLEMENTADO / NOT_RUN |
| Quinze gates no HEAD C | Não observado ainda neste commit; consultar run real após publicação |
| Integração real com geocodificador | NOT_RUN |
| Revisão independente / aceite humano | NÃO REALIZADOS |
| Subagentes nativos G0 | NATIVE_SUBAGENTS_UNAVAILABLE |

Recibo de publicação registra SHA e PR sem autorreferência. Acrescentar resultados reais por SHA/run/tentativa e preservar este histórico. Mock de rede pode provar tratamento das respostas, não disponibilidade/limites de serviço real. Nenhum PASS herdado certifica UI-07.

## Implementação posterior ao G0 — checkpoint de publicação

Commits próprios:
- `391bf2e900756fd94b2e922a7bb310a464bc93eb`: estado assíncrono revisional, formulário, endpoint opt-in autenticado, testes unitários/de integração.
- `a4b523fc60687fb6a1a94827a7fb0ee0c5d1ca40`: E2E sintético de dispositivo/mapa/digitação, fallback 429, proteção de edição manual e screenshots planejados.

**Escopo observado:** somente UI/formulário C, adaptador de endereço, novo endpoint C, testes próprios e documentação da spec 037. Guards herdados; nenhuma alteração de schema, migration, contrato compartilhado, CI/Preview, main/development ou outras branches. Contrato de CEP ainda não atribuído (proposta publicada no comentário #6547701906 da #45). Provedor externo não configurado/ativado nesta entrega.

| Verificação | Resultado observado até este checkpoint | Proveniência |
| --- | --- | --- |
| Branch/PR/merge-base | PASS; HEAD G0 e guard SHA conferidos | GitHub PR #48, comparação `GUARD_SHA...a4b523fc` |
| Baseline G0, quinze gates | PASS no SHA **e1ec632**, run [41216197678](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41216197678), tentativa 1 | Actions completed/success, job validate success |
| Testes novos no HEAD C | PUBLICADOS; resultado runtime ainda NOT_RUN neste checkpoint | GitHub diff dos commits acima |
| Provedor externo real | NOT_RUN; desabilitado por padrão | Sem chamada de rede externa/contratação |
| E2E/capturas de runtime | NOT_RUN neste checkpoint; cenários e paths no teste | Aguardar execução dos checks do HEAD funcional |
| Persistência de CEP | BLOQUEADA por ownership compartilhado; NÃO IMPLEMENTADA | Campo nullable no schema, recusa explícita no parser atual |
| Aceite humano/revisão independente | NÃO REALIZADOS | Não simular agentes ou validação humana |

Não confundir screenshots geradas por execução de Playwright futura com imagens de referência fornecidas pelo usuário; não alegar captura física ou comparação Lovable executada. A evidência final deve indicar run/tentativa/artefato real.

## Checkpoint de revisão do harness e dos testes (31/10/2026)

- `d65d55b02ae0b2ee47a03cd91b9d533d81513158`: nomes de screenshots adequados ao glob de artefatos existente, sem editar CI.
- `0b94749376ddb843673638a3dc33220d27872f82`: separação `route.ts`/handler puro para teste Node; correção de limpeza de área E2E com prefixo reservado (`AREA_FIXTURES.prefix`).
- `942a3b5c19d54b0d51771a102a91b55573ab664b`: teste de timeout com `AbortSignal` e timer sintético (5 ms), regressão de respostas obsoletas, teste de contrato que prova 0/1/2 campos opcionais já permitidos e prova explicitamente a recusa atual do CEP até writer coordenado.

Os runs de commits intermediários foram cancelados por `concurrency.cancel-in-progress`, não são falhas funcionais ou validação terminal. O run correspondente ao commit de documentação final deverá ser identificado no recibo da PR (sem inventar SHA futuro). Os quince gates e provas visuais ainda não podem ser declarados PASS neste arquivo até evidência terminal vinculada ao commit executado.

## Diagnóstico do run de implementação (pós-G0)

**Run 41232297194, tentativa 1, HEAD `53af10765bc401b43e80749c6a763ff11ee3d33f`: `completed/failure`**. Artefato GitHub [13055030510](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41232297194/artifacts/13055030510), `.accounts-validation/results.jsonl` inspecionado por bytes via download conectado:

- PASS: RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck, Lint (**9 gates**).
- FAIL: E2E, `222 passed / 1 failed`; timeout 90000 ms dentro do `page.evaluate` de `settleTransitions`, `tests/e2e/frontend-mobile-navigation.spec.ts:68`, cenário 320px/texto 200% (linha 95); incidente de ownership A, registrado na PR #46 comentário [6550340205](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/46#issuecomment-6550340205).
- NOT_RUN por fail-fast: Https, Deletion, Ihfr, Bootstrap, SchemaAudit (**5 gates**). O run não recebeu PASS global.
- O teste de formulário C não aparece como falha do E2E; as capturas C não estavam no artefato (corrigir `TestInfo.outputPath`). Nenhuma prova visual C foi falsamente declarada.

**Coordenação:** comentário de alocação de writer focal na #45 [6550339752](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/45#issuecomment-6550339752). Sem novos provedores, banco hospedado, schema ou CI modificados. Esta entrada é evidência histórica do HEAD 53af107, não do futuro HEAD corrigido.

## Continuidade corretiva — código preparado para publicação/CI (2026-10-31)

Resultado de análise: [analysis-review.md](analysis-review.md); pesquisa [research.md](research.md); modelo [data-model.md](data-model.md); validação [quickstart.md](quickstart.md); contrato aditivo `contracts/area-optional-address.openapi.yaml`. A instância atual de `CollectionArea` já tinha `cep String?`; não foi editada.

Changesets staged em commits descendentes do HEAD 53af107: extensão de CEP opcional normalizada no parser/DTO, submissão de CEP no formulário, manutenção do service sem migration, teste histórico de API atualizado no **código de teste corrente** (arquivo histórico da spec 003 não modificado), testes com 8 subconjuntos + persistência PostgreSQL sintética, snapshots de UI `TestInfo.outputPath` e contrato OpenAPI versionado. Os commits foram criados como objetos Git antes de mover a ref, preservando o HEAD observado; só a atualização fast-forward protegida da branch publica a composição.

**EVIDÊNCIA NÃO DISPONÍVEL NESTE INSTANTE:** nenhum PASS dos testes corrigidos, screenshot gerado pelo código corrigido ou conclusão dos 15 gates pode ser declarado antes de run terminal do SHA final. Os PASS do run 41232297194 pertencem exclusivamente ao antigo HEAD 53af107. Provedor externo continua não configurado; revisão independente e aceite humano não foram realizados.

## Run pós-CEP / falha de paridade atual versus histórica

[Run #41251238442](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251238442), tentativa 1, SHA `91565eb9817ce341bbefe22708fa7ff1b8de3a1c`: `completed/failure`. Artifact [13061003416](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251238442/artifacts/13061003416) preserva o journal e `unit-1793488173436.log`.

- RegressionSetup: **PASS**.
- Unit: **FAIL** — 410 tests, 407 PASS, 3 FAIL, unicamente `tests/unit/area-openapi-parity.test.ts`; validador histórico rejeitou o novo `cep` serializado.
- Integration, Migration, Contract, R1, Build, Typecheck, Lint, E2E, Https, Deletion, Ihfr, Bootstrap, SchemaAudit: **NOT_RUN**, runner fail-fast sem enfraquecimento.

Correção T018 adicionada na mesma branch por commit derivado (contrato ativo em memória = IMP-003 + extensão 037), sem reescrever contrato histórico e mantendo assertions `additionalProperties:false`. Teste Unit corrigido **NÃO FOI EXECUTADO** neste snapshot; aguardar run final para declarar PASS.

## Run de validação depois da correção de paridade

[Run 41251491666](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251491666), tentativa 1, SHA `506cb57b38bd798bf37f369d1d153c6ccf662097`: `completed/failure`. **PASS:** RegressionSetup, Unit, Integration, Migration, Contract e R1. **FAIL:** Build, somente erros de tipagem TS2345 nas linhas 24/28 de `tests/unit/areas-service.test.ts`: fixture sem CEP passada a um `CreateAreaInput` que exigia CEP apesar de opcional no POST. **NOT_RUN:** Typecheck, Lint, E2E, Https, Deletion, Ihfr, Bootstrap, SchemaAudit. A correção subsequente foi restringir `CreateAreaInput.cep` a propriedade TypeScript opcional; `parseAreaInput` continua devolvendo `cep:null` em ausência. O status do próximo SHA deve ser coletado separadamente.
