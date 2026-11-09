# Revisão técnica para continuidade por Thales — 24/10/2026

## Parecer executivo

**RECOMENDACAO:** a PR
[#29](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/29)
está **tecnicamente apta, com ressalvas, para decisão humana de integração** no
HEAD exato `00477e961e36416d8d602d36f7e0ee195c487148`. A integração deve ocorrer
antes de qualquer tentativa de aproveitar as PRs #27 e #28. Não foi encontrado
defeito P0–P2 aberto no produto introduzido pela #29.

Essa recomendação não é aprovação humana, merge, homologação do piloto, deploy
nem validação científica. Na consulta ao GitHub em 24/10/2026, a PR estava
aberta, não draft e `mergeable`, mas as PRs #27, #28 e #29 tinham **zero review
submissions**. Os comentários do Codex e a revisão remota sem findings são
evidência técnica; não equivalem a um evento `APPROVED` de mantenedor.

O primeiro trabalho seguro para Thales, depois da decisão do mantenedor sobre a
#29, é reconciliar o estado Code-First com o código já entregue. O backlog ainda
descreve como mock/placeholder ou sem API módulos que hoje têm rotas, serviços,
telas e evidências de implementação. Começar uma nova feature a partir desse
backlog criaria risco real de duplicar trabalho e reabrir contratos estabilizados.

## Snapshot examinado

| Item | Valor verificado |
|---|---|
| Base | `origin/development@c4adfb379e5dc78f27f31b91edbd13f43228d9f9` |
| Candidata | `origin/fix/investigacoes-intermitentes-20261023-local01@00477e961e36416d8d602d36f7e0ee195c487148` |
| Árvore candidata | `c980346ef3044e0da79d36c42f3cd0da0a4839c2` |
| Relação | 12 commits à frente, zero atrás; merge-base igual à base |
| Delta | 91 arquivos, 15.251 inserções e 2 exclusões |
| Produto/schema/dependências | nenhum arquivo alterado nesses grupos |
| Worktree da revisão | isolada da candidata |
| Branch local da revisão | `docs/revisao-20261024` |

`git merge-tree --write-tree` produziu a própria árvore candidata ao simular
`development + #29`, sem conflito textual. A revisão integral do delta confirmou
que a entrega contém documentação/recibos, instrumentos investigativos e as
duas entradas de configuração necessárias para executar a branch; não contém
patch de produto, mudança de schema, migration ou dependência.

## Achados priorizados

### RTH-P2-001 — o estado Code-First está materialmente desatualizado

**Classificação:** `FATO_DOCUMENTADO` + `EVIDENCIA_IMPLEMENTACAO`.

`docs/code-first-prd/implementation/backlog.md:20-27` e
`docs/code-first-prd/implementation/implementation-plan.md:25-32` ainda afirmam,
entre outros pontos, que laboratório/áreas não têm API, IHFR não tem cálculo ou
interface, dashboard/histórico é mock, mapa é placeholder e administração não
tem interface conectada. O build atual enumera rotas reais para esses domínios;
há serviços em `src/app/api/server/services/**`, páginas privadas e evidências
de implementação das specs 003–006, 008–009 e 017–024/027.

**Impacto:** um executor que trate o backlog antigo como estado vigente pode
reimplementar módulos, contrariar contratos e escolher a próxima prioridade com
base falsa. O problema é preexistente e documental; não foi causado pela #29.

**Tratamento recomendado:** criar um adendo de estado atual, com matriz
`IMP-* → spec → rotas/serviços/telas → evidência → pendências reais`, mantendo os
documentos históricos intactos. Não alterar contratos de produto por inferência.

### RTH-P2-002 — #27 e #28 não podem ser integradas cegamente após #29

**Classificação:** `EVIDENCIA_IMPLEMENTACAO` + `RECOMENDACAO`.

A simulação `#29 + #28` encontrou conflitos em `PROJECT_CONTEXT.md`,
`docs/governance/DOCUMENT_REGISTER.md` e
`docs/plans/active/preparacao-incorporacao-frontend-20261018/investigacoes-pos-consolidacao-visual.md`.
A simulação `#29 + #27` encontrou conflitos em `.github/workflows/rc-review.yml`
e `vercel.json`. #27 e #28 não têm caminhos sobrepostos entre si.

**Impacto:** merge em ordem arbitrária pode reintroduzir estado anterior,
duplicar a preparação já executada ou perder guards de CI/deploy.

**Tratamento recomendado:** integrar #29 primeiro. Em seguida, considerar #28
supersedida pela execução da #29, preservando sua história e extraindo apenas
algum conteúdo ainda único por commit normal. Avaliar #27 separadamente, após a
decisão sobre os riscos G1–G5, reconciliando manualmente workflow/Vercel e
revalidando qualquer novo SHA.

### RTH-P3-001 — testes investigativos não pertencem aos scripts usuais

**Classificação:** `EVIDENCIA_IMPLEMENTACAO`.

Os instrumentos em `tests/investigations/**` não são coletados por
`npm run test:unit`, `test:integration`, `test:e2e` ou pelo glob convencional do
`package.json:15-30`. Eles foram executados pelos protocolos próprios e seus
recibos são verificáveis, mas um mantenedor não deve supor que rodar a suíte
usual repetirá a investigação.

**Tratamento recomendado:** decidir explicitamente entre mantê-los como
diagnóstico sob demanda, com comando documentado, ou promover um subconjunto
estável a gate suportado. Não aumentar a CI sem owner e custo conhecidos.

### RTH-P3-002 — entradas de branch no workflow e no Vercel são temporárias

**Classificação:** `EVIDENCIA_IMPLEMENTACAO` + `RECOMENDACAO`.

`.github/workflows/rc-review.yml:24,55` e `vercel.json:28` contêm a branch
`fix/investigacoes-intermitentes-20261023-local01`. As entradas foram corretas
para validar a candidata e impedir deploy automático, mas viram configuração
obsoleta após o encerramento da branch.

**Tratamento recomendado:** remover ou generalizar somente em follow-up próprio,
depois da última necessidade de rerun da #29. Qualquer modificação cria novo SHA
e requer validação correspondente.

## Reconstrução da entrega investigativa

Os 12 commits formam uma sequência coerente: início/preflight; protocolos de
concorrência; evidências IHFR; reprodução autenticada NAV4; verificador
imutável; navegação/mapa; consolidação; apontadores canônicos; revisão
independente; errata HTTP; e tratamento final do finding CLI. Os dois achados P2
internos foram tratados antes do HEAD final:

- apontadores canônicos ausentes, tratados em `3b3138a`;
- classificação indevida de GETs Next como 15 documentos, tratada por errata em
  `70660f3` e reconferida em `00477e9`, sem reescrever recibos históricos.

Três limites P3 históricos permanecem declarados: fingerprint incompleto de
estado inicial sujo, projeções HTTP com filtros distintos e fontes das duas
primeiras tentativas bloqueadas não preservadas. Eles restringem a força da
inferência retrospectiva, mas não invalidam os protocolos atuais.

## Nove IDs e estado causal

| ID | Conclusão sustentada pela evidência atual |
|---|---|
| `NAV4-LOCAL` | Mecanismo de ingresso/origem do ambiente atual demonstrado; 4/4 cenários oficiais passam no ingresso correto. Não explica retrospectivamente os quatro FAILs Linux antigos. |
| `INV-001` | Não reproduzido; causa histórica inconclusiva. |
| `INV-002` | Assinatura histórica de duas chamadas não reproduzida; conflito controlado atual comprovado, sem justificar mudança de quota/retry/OCC. |
| `INV-003` | Não reproduzido; cenários atuais de mapa/lista/navegação passaram; causa histórica inconclusiva. |
| `INV-004` | Não reproduzido, inclusive com resposta de login retida; causa antiga inconclusiva. |
| `INV-005` | Não reproduzido; documento/RSC/API permanecem distinguidos e a causa histórica é inconclusiva. |
| `NAV-SETTLE` | Não reproduzido; não há prova de que o timeout antigo causou logout. |
| `OBS-001` | Inconclusivo para o aviso histórico de hidratação/caret; sem patch especulativo. |
| `OBS-002` | Inconclusivo para pixels ocultos/aceite humano; amostra atual favorável, sem homologação visual. |

Conclusão correta: a #29 **não prova que todas as intermitências foram
resolvidas**. Ela demonstra a causa de configuração/ingresso na reprodução NAV4
atual e fornece protocolos/contraprovas para os demais IDs.

## Jornada atual do código

O caminho funcional observado é consistente e server-authorized:

1. autenticação e sessão entram por `src/app/api/auth/**` e pelos serviços de
   autenticação/contas;
2. o workspace usa `src/app/api/laboratories/**`,
   `laboratories.service.ts` e memberships para derivar contexto autorizado;
3. áreas e capas passam pelas rotas aninhadas e por `areas.service.ts`;
4. coletas usam rotas aninhadas e `collections.service.ts`, com autoria e
   contexto derivados no servidor;
5. dados ambientais e drafts usam serviços/contratos próprios e payloads
   fechados;
6. IHFR lê dados persistidos, aplica manifesto/evaluator e expõe operações
   versionadas, idempotentes e qualificadas como experimentais;
7. dashboard/histórico e mapa territorial usam projeções allowlisted;
8. administração exige autoridade global, concorrência otimista e auditoria.

Esse inventário comprova implementação, não aceite de produto. O IHFR continua
`CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO` e
`NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

## Validação executada nesta revisão

| Verificação | Resultado | Alcance |
|---|---|---|
| instalação pelo lockfile | PASS | Node 24.22.1; 562 pacotes; cache isolado em `/tmp` |
| `npx prisma generate` | PASS | Prisma Client 7.4.2 gerado localmente |
| `npm run test:unit` | PASS | 402/402 principais e 17/17 de e-mail; execução fora das limitações de subprocesso/loopback do sandbox |
| `npm run typecheck` | PASS | executado antes e repetido após o build |
| `npm run lint` | PASS com avisos | 0 erros; 2 avisos preexistentes em `user-profile` e `white-box` |
| `npm run build` | PASS | Next 16.3.8; compilação, TypeScript e 32 páginas estáticas concluídos |
| CI do HEAD consultada | PASS | run 40030207450, tentativa 1, job 120676307853; 15/15 registros PASS/exit 0 no log |
| revisão Codex do HEAD consultada | concluída sem findings | comentário técnico; não é aprovação humana |

O primeiro `test:unit` após `npm ci` falhou por ausência do cliente Prisma em
checkout limpo; depois do mesmo passo de bootstrap usado pela CI, a suíte passou
integralmente. A primeira tentativa de build no sandbox ficou sem progresso por
restrição de subprocessos; a execução autorizada fora dessa restrição passou.
Esses eventos são limitações de preparação/ambiente, não regressões do produto.

## Estado das PRs relacionadas

| PR | Head consultado | Leitura da revisão |
|---|---|---|
| [#27](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/27) | `223839c9ae91591ded8de387144d8c1ee84b5c20` | pacote pós-consolidação e prontidão parcial; G1–G5 não encerrados; CI funcional do head final `NOT_RUN`; integrar apenas por decisão própria |
| [#28](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/28) | `f56f73fda1d7bd459a1415bf02df25edc9120674` | preparação documental da investigação que a #29 executou; não tratar como implementação adicional |
| [#29](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/29) | `00477e961e36416d8d602d36f7e0ee195c487148` | execução investigativa completa, CI 15/15 e revisão técnica sem findings; apta com ressalvas para decisão humana |

## Limites e não alegações

- Nenhuma PR foi alterada, comentada, aprovada, fechada ou integrada nesta revisão.
- Nenhum push, deploy, migration, banco hospedado, Vercel, Cloudinary, SMTP ou
  dado real foi operado.
- CI e revisão consultadas não foram contadas como execução local.
- Não houve teste E2E local com PostgreSQL/browser, dispositivo físico, leitor
  de tela, aceite visual/humano, homologação operacional ou validação científica.
- `main` não foi alterada; a modificação preexistente em `package-lock.json` no
  checkout principal foi preservada fora desta worktree.
- Um commit novo de documentação desta revisão não herda os gates do SHA
  `00477e9` e não deve ser confundido com a candidata da #29.

## Decisão solicitada ao mantenedor

1. registrar uma revisão humana da #29 no SHA exato e decidir sua integração;
2. se integrada sem novo SHA, preservar a distinção entre investigação concluída
   e piloto não homologado;
3. considerar a #28 supersedida, preservando seu histórico;
4. decidir separadamente se/quando incorporar a #27 e aceitar seus riscos;
5. autorizar o adendo Code-First e designar os owners de G3–G5 antes de qualquer
   operação hospedada ou piloto.
