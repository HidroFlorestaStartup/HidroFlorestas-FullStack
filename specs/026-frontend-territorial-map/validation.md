# Recibo local e entrega ao coordenador — Spec 026

**Data**: 2026-10-21. **Branch**: `feat/frontend-territorial-map`.

Base `development`: `1ea3cc2552c244e1004f4f733f838e0f9ea62993`. Parent planejado da candidata local: seed `b3f65f2ccd8a4b08cf53a1bebf16e3ba33db09a6`. O SHA da candidata será informado após o commit; resultados posteriores de CI/review devem ficar vinculados ao HEAD em recibo externo, sem mudar o código/documentação apenas para transportar um verde antigo.

## Mudança entregue

- Cabeçalho contextual, cartões e hierarquia coerentes com a frente de áreas incorporada e a referência do starter.
- Lista completa com nomes sem truncamento, seleção explícita, painel com localização/instantes e links reais.
- CSS Module local para reflow, foco e controles de zoom; atribuição e avisos de tiles preservados.
- Oito E2E novos: seis combinações de viewport/texto, transporte loading/erro/retry e estados/contexto/back/forward/reload. Fixture com nome de 97 caracteres persistido no banco sintético pelo harness autorizado.
- Helper próprio de captura, reutilizando as funções de geometria/readiness existentes sem alterar o helper compartilhado.
- Nenhuma mudança em DTO, API, backend, schema, rota servidor, algoritmo cartográfico, testes territoriais herdados, CSS global, shell, dependências, CI ou proteção de Preview.

## Execuções locais da implementação inicial

| Verificação | Resultado | Observação |
|---|---|---|
| Spec Kit setup-plan/setup-tasks/check-prerequisites | PASS | Diretório explícito; metadata local não versionada |
| Primeira execução unitária | FAIL de pré-requisito | Cliente Prisma gerado ausente; arquivo de serviço não iniciou; outros três arquivos passaram |
| Primeiro typecheck | FAIL de pré-requisito | Erros de módulo Prisma ausente e derivados; nenhum erro TS identificado na nova frente |
| `npx prisma generate` | PASS | Cliente 7.4.2 gerado localmente, sem conexão a banco nem alteração de schema/lockfile |
| Unit territorial focal, repetido | PASS | Quatro arquivos passam sob node --test; execução direta confirma 11 casos (3 estado + 3 contratos + 1 OpenAPI + 4 serviço) |
| `npm run typecheck`, após geração | PASS | Exit 0, sem diagnóstico |
| ESLint dos componentes/teste/helper | PASS | Exit 0, sem diagnóstico |
| `git diff --check` | PASS | Sem erro de whitespace |
| E2E territorial existente/novo | NOT_RUN local | Runner oficial Windows/PostgreSQL não executado em Linux |
| CI de 15 gates no HEAD | NOT_RUN nesta frente | Responsabilidade do coordenador após publicação protegida |
| Capturas reais/inspeção | NOT_RUN local | Nenhum PNG demonstrativo ou resultado visual fabricado |
| Codex review independente do HEAD | NOT_RUN nesta frente | Responsabilidade do coordenador após publicar candidata |

O aviso de configuração `http-proxy` do npm foi observado sem impedir geração, typecheck ou lint. Nenhum valor de ambiente, token ou dado real foi registrado.

## Falha do CI publicado e correção focal — 2026-10-21

A tabela anterior preserva o recibo da implementação inicial. O coordenador publicou a mesma árvore `846f4887e83557318f85753caae7bc9e23ced1f2` no HEAD `39cbf99f588022ac35926a135387133b6f10516c`, PR [#22](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/22).

- [Run 39578551717](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39578551717), tentativa 1, evento `push`, job `119150115017`: `FAIL` em E2E.
- Artefato `12336228091`, `rc-validation-39cbf99f588022ac35926a135387133b6f10516c`, 30.741.731 bytes. SHA-256: `12c71465152867b1c7b42ce61810820ea55e3d7230c8cb99c8a610b22cc847f8`.
- Download conferido contra o digest oficial, CRC válido e 729 entradas sem caminhos inseguros ou links simbólicos. Recibo e extração preservados em `ci-artifacts/map-39578551717/` no workspace do coordenador, fora do repositório versionado.

| Gate | Resultado observado |
|---|---|
| RegressionSetup | PASS |
| Unit | PASS |
| Integration | PASS |
| Migration | PASS |
| Contract | PASS |
| R1 | PASS |
| Build | PASS |
| Typecheck | PASS |
| Lint | PASS; zero erros e três avisos preexistentes |
| E2E | FAIL; 190 testes passaram, um falhou e sete não executaram |
| Https | NOT_RUN após interrupção no E2E |
| Deletion | NOT_RUN após interrupção no E2E |
| Ihfr | NOT_RUN após interrupção no E2E |
| Bootstrap | NOT_RUN após interrupção no E2E |
| SchemaAudit | NOT_RUN após interrupção no E2E |

**Falha observada**: o primeiro cenário novo, `320x760-text100`, mediu largura de 30 px no zoom, contra a assertion de pelo menos 44 px em `tests/e2e/frontend-territorial-map.spec.ts`. A falha ocorreu antes da primeira captura; o ZIP não contém PNGs/JSONs territoriais. Os sete cenários restantes da suíte serial não executaram. Esses estados não são promovidos a PASS nem a inspeção visual concluída.

**Diagnóstico e reparo**: `leaflet/dist/leaflet.css` contém `.leaflet-touch .leaflet-bar a` com largura, altura e line-height de 30 px. A regra local `.mapFrame :global(.leaflet-control-zoom a)` tinha a mesma especificidade `(0,2,1)`. **INFERENCIA** sustentada pelo valor observado e pelas regras: a ordem de carregamento permitiu à regra externa vencer o empate. A correção acrescenta o ancestral local `.mapCanvas`, elevando a especificidade para `(0,3,1)` e tornando os 44 px independentes dessa ordem. `territorial-map.client.tsx` aplica `.mapCanvas` ao `MapContainer`, filho direto de `.mapFrame`; o seletor mantém correspondência com a estrutura real. Nenhum `!important`, CSS global, handler, teste, assertion ou timeout foi alterado.

**Validação desta correção**: `npm run typecheck` passou. `npm run lint` passou com zero erros e os mesmos três avisos preexistentes em arquivos fora da frente. E2E/browser, novos 15 gates e capturas da correção permanecem **NOT_RUN**, aguardando a publicação do novo SHA pelo coordenador. T016/T017 continuam abertas.

O Codex concluiu a revisão de código do HEAD anterior `39cbf99f588022ac35926a135387133b6f10516c` sem findings, com [recibo efetivo](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/22#issuecomment-6312911243). Esse recibo não constitui aprovação humana nem revisão do próximo SHA corrigido.

## Evidências esperadas no CI

`.accounts-validation/frontend-territorial-map/*-frontend-territorial-map-*-viewport.png` e `*-viewport.json`, também anexados ao resultado do Playwright. Nomes incluem identificador de cenário/repetição para não sobrescrever tentativas. Capturas `fullPage:false`, animações observadas, campos de formulário mascarados, sem trace/vídeo, geometria sem texto/URLs/valores.

Matriz: 320×760, 375×900, 768×900, 1440×900, 320×760 com fonte raiz a 200% e 844×390 paisagem. A escala de fonte é registrada como tal, sem alegar zoom nativo. Capturas cobrem mapa, último item focado e última ação focada, além de loading/erro/retry/vazio/inativo. Um controle obstruído gera evidência diagnóstica e falha o teste.

## Próximos passos e limites

1. Coordenador publica somente um HEAD descendente do seed protegido; cria PR Draft contra development.
2. Executa 15 gates/E2E e inspeciona PNG/JSON da candidata; trata FAIL com logs e causalidade, sem reclassificar cancelamento/skip como PASS.
3. Obtém review efetivo do HEAD publicado, corrige achados e revalida cada novo SHA; aceite de mantenedor não é simulado.
4. Registra no recibo externo SHA/parent/tree, run/attempt/job, artifact/digest, resultados individuais, capturas e review.

Leitor de tela, equipamento físico, UX humano e homologação operacional continuam não verificados. Históricos inconclusivos de reset/navegação não são declarados resolvidos. Nenhum merge, push remoto ou deploy foi realizado por esta frente.
