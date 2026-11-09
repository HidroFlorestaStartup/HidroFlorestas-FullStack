# Evidência de implementação — instrumento030

Estado final: implementação e ensaio real concluídos, revisão independente PASS; ver complementos datados abaixo. O checkpoint inicial de desenho foi preservado nesta trilha, sem antecipar resultados.

## Fluxo Spec Kit real

2026-10-25, QA: skills instaladas lidas e aplicadas `speckit-specify`, `speckit-plan`, `speckit-tasks`, `speckit-checklist`, `speckit-analyze`; `speckit-implement` carregada para sequência posterior. `extensions.yml` inexistente: nenhum hook omitido.

- `resolve-template.sh spec-template --json`: PASS, template resolvido pela pilha local e spec criada na pasta explícita030; `.specify/feature.json` local aponta030.
- `setup-plan.sh --json`: PASS, paths absolutos da worktree QA e plano copiado do template instalado.
- `setup-tasks.sh --json`: PASS, template/tasks context retornado;12 tarefas geradas,2setup,2foundation,3US1,2US2,2polish e1review (T003 dentro setup).
- `check-prerequisites.sh --json --template checklist-template`: PASS; checklist de segurança gerada com seis critérios de qualidade, inicialmente abertos.
- `check-prerequisites.sh --json --require-spec --require-tasks --include-tasks`: PASS para análise read-only;6FR+5SC inventariados,12tarefas, cobertura100%, nenhum requisito sem tarefa, nenhuma tarefa sem mapeamento;0conflito constitucional,0ambiguidade,0duplicação,0achado crítico/alto/médio.

Mapeamento analisado: FR001–002/SC004→T004–005/T009–010;FR003/SC001–002→T006–008/T011;FR004/SC003→T007–008/T011;FR005–006/SC005→T010–012. Princípios constitucionais I–VII atendidos no desenho, sem inferir produto/scientificidade nova.

## Revisão independente anterior ao código

`FATO_DOCUMENTADO`: coordenador `/root` leu spec, plano, pesquisa, modelo, quickstart e tasks e concluiu cobertura clara do recorte, isolamento,100 respostas,EXPLAIN sanitizado,teardown e custo. Solicitou checklist/analyze antes do código; ambos foram realizados. Depois leu a checklist custom e a fonte008§6.2 e marcou6/6 requisitos satisfeitos em `checklists/security.md`, liberando implementação após o baseline para preservar seu fingerprint.

Requisitos da revisão incorporados ao desenho: somente SELECTs da própria schema; erros/SQL sem stack nem parâmetros publicados; falhas e metas não alcançadas preservadas; fingerprint do instrumento separado do baseline. Metas derivam de [008 quickstart](../008-territorial-map/quickstart.md#62-real-endpoint-and-postgresql-measurement), linhas190–193 na base:100 leituras,p95≤500ms como meta técnica,EXPLAIN parametrizado e lista≤2s após resposta. A análise foi estritamente read-only; este documento é recibo posterior da missão, não efeito da skill analyze.

Gate de requisitos lido pelo implement: requirements16/16 e security6/6, zero abertos. Aprovação de qualidade não é teste executado nem aceite humano de produto. Sem commit/push/publicação antes da revisão final independente.

## Limites preservados

Medição Next dev/Windows local não transfere desempenho a produção; interação automatizada não substitui tecnologia assistiva real nem estudo moderado. IHFR: CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO, NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.


## Implementação em andamento e revisão estática anterior ao ensaio

Nove testes de política cobrem guard, p95, minimização de EXPLAIN e permuta de coletas entre áreas do mesmo laboratório. O pré-implemento teve módulo ausente (exit1), sem fabricar RED de assertion. O primeiro typecheck detectou tipos de NODE_ENV/ChildProcess e Set<UUID>; foram corrigidos e a nova verificação passou.

Revisor `/root/fr015` apontou: associação global não prova vínculo área/coleta; loop120×(timeout1s+delay0,5s) não é deadline60s; orçamento cooperativo não garante cleanup20s; falha de setup de schema anterior ao callback não pode ser REFUSED/NOT_CREATED. Correções: mapa esperado independente das fixtures e teste de permuta; deadline monotônico60s; Status timeout15s; budget cooperativo explicitado e claimhard removido; stage próprio antes de I/O e schemaUNVERIFIED sem apagar identidade desconhecida. Helpers baseline permanecem intactos. Root concordou com as correções antes de p95/freeze.

## Validação final de2026-10-25

Implementação limitada a `scripts/local-readiness.ts`, `scripts/local-readiness-policy.ts` e `tests/investigations/readiness/local-readiness-policy.test.ts`. Nenhum src/app, schema/migration, pacote, workflow, teste baseline ou assertion foi alterado. A captura browser foi ajustada antes do ensaio para usar `response.finished()` em observador registrado antes de goto; o DOM verifica unicidade de hrefs separadamente da associação exata das fixtures.

| Verificação | Resultado |
| --- | --- |
| `node --import=tsx --test tests/investigations/readiness/local-readiness-policy.test.ts` pelo autor | 9/9 PASS,0skip;312,2687ms |
| Mesmo comando pelo revisor independente | 9/9 PASS,0skip;192,7ms |
| `npx tsc --noEmit` após correção transacional final | exit0;4,087s |
| `npx eslint scripts/local-readiness.ts scripts/local-readiness-policy.ts tests/investigations/readiness/local-readiness-policy.test.ts` | exit0;0errors/0warnings |
| Execução manual real via wrapper owned | PASS/exit0;23.186,3287ms no instrumento;25.812,4906ms no wrapper+Stop |

Os testes puros não dependem da transação de fixture e não foram repetidos após esse delta; typecheck/lint e a execução real verificaram o novo trecho. O revisor leu o delta e a constraint existente, sem segunda carga territorial.

Primeiro ensaio real: [territorial-readiness-attempt1.json](../../docs/reports/2026-10-25-hf-night-01/qa/territorial-readiness-attempt1.json), FAIL em fixtures,2.290,9749ms, Next/browser NOT_STARTED e schema REMOVED. Reprodução focal owned identificou `IMP003_OWNER_INVARIANT`: laboratorio em autocommit antes da membership OWNER violava o trigger DEFERRABLE INITIALLY DEFERRED da migration existente. [Diagnóstico](../../docs/reports/2026-10-25-hf-night-01/qa/readiness-fixture-diagnosis.json). Corrigido somente o harness para criar laboratórios+memberships na mesma transação; constraints e cardinalidades preservadas, revisão incremental independente PASS.

Ensaio final: [recibo](../../docs/reports/2026-10-25-hf-night-01/qa/territorial-readiness.json), [comando/UTC](../../docs/reports/2026-10-25-hf-night-01/qa/territorial-readiness-command.json), [manifesto funcional](../../docs/reports/2026-10-25-hf-night-01/qa/territorial-readiness-fingerprint.json). SHA base `08262dc57c1ad365244f9ec6902b1e4be39e2d7d` acompanhado pelo fingerprint novo `8313f11b969379019da1e6dc84240d49b52f2792e1ad6a65b13059485184a90e`, igual antes/depois; não transferir os15 gates da baselinee718 a essa árvore. UTC05:54:51.754–05:55:14.940Z, Node24.19/Windows10.0.26200/PostgreSQL17.10/Next dev; janela exclusiva coordenada, sem carga concorrente da equipe.

Foram10 aquecimentos e100 respostas completas autenticadas,147.036 bytes UTF8, validação integral da associação100 áreas/1000 coletas em cada resposta e ruído10/100 separado. p95 pelo posto95=57,8354ms frente à meta500ms. A consulta real do serviço capturou dois SELECTs own-schema; EXPLAIN ANALYZE/BUFFERS/JSON com parâmetros em memória e projeção sanitizada publicou cardinalidades100/1000. SQL execution0,122ms/2,655ms e HTTP medem fronteiras distintas; Seq Scans pequenos não são defeitos por si. ANALYZE foi executado só em cinco tabelas do próprio schema após as fixtures.

Lista/teclado:252,1367ms após término da resposta, frente à meta2s,100 hrefs de áreas e1000 hrefs distintos de coletas conferidos; dois destinos realmente abertos. Browser bloqueou15 requests de outra origem,0 mutações e0 pageerrors. Isso não prova egress nulo em todos os processos. Cleanup servidor STOPPED, browser CLOSED, schema REMOVED,0errors; wrapper finalmente parou PostgreSQL owned. Logs/dados/cookies/chaves privados ignorados, sem SQL/parâmetros/stack públicos.

[Revisão independente](../../docs/reports/2026-10-25-hf-night-01/qa/independent-review.md): fonte e quatro achados anteriores resolvidos,9/9 puros próprios e revisão documental dos recibos/aritmética final PASS; sem segundo p95/EXPLAIN/browser. Hash final runner `97c7684c2e38a7fcb6451b7ef6c62e71ef3b415d785b4b3ef8c5d547fccce200`, policy `51990658f5db810067975271b31fe850d84352127d85246b519fa1b559668dfd`, teste `ef0ecc26017b7154166fca3a0dff40debd504fdbfb2a8c424c19c3660e5d4376`.

T011 satisfeita. T012 inclui runbook/evidências/sanitização/referências e converge final; nenhum registro de governança global exigiu mudança, pois não há decisão nova de produto/domínio/ciência. Não foram realizados homologação hospedada, avaliação humana, tecnologia assistiva real, SLA, validação científica nem tuning automático.

## Convergência final real

Skill instalada `speckit-converge` lida e aplicada após `speckit-implement`/validação. Executado uma vez `.specify/scripts/bash/check-prerequisites.sh --json --require-spec --require-tasks --include-tasks`: PASS, feature030 resolvida; extensions.yml inexistente. Avaliação do estado presente limitada a spec/plan/tasks e constituição, sem comparação de branches como fonte de intenção. Conferidos6FR+5SC,5 cenários de aceite,4 edge cases,8 decisões do plano e7 princípios constitucionais,12/12 tarefas concluídas. Findings0 (missing/partial/contradicts/unrequested e todas severidades); tasks appended0; resultado `converged`.

A skill não escreveu tasks.md nem criou fase vazia: SHA256 permaneceu `28d5d3255f9d273b1818e813f14db8e8b2f256eda7bcd68c37dbbcf5d290da53`. Este parágrafo é registro posterior da missão, fora dos efeitos da análise. T012 concluída:46 arquivos conferidos por diff whitespace inclusive untracked,25JSON+4JSONL válidos,51links relativos existentes,597/597 hashes do manifesto030 iguais; scanners públicos não identificaram caminho pessoal absoluto, URL de banco com credencial ou JWT. Literais `unused-fixture` nos testes puros são placeholders sem conexão, lidos pelo revisor; não são segredos. Recibos posteriores de metadados/vetores do restore conservam validação e escopo próprios, sem alterar030 ou seu fingerprint.

## Reabertura pelo P2 material da PR39

`EVIDENCIA_IMPLEMENTACAO`: Codex encontrou o P2 no HEAD `3e0066ab82a415e04342bd751254ee65cf533dfb`, thread `PRRT_kwDOVAitc86v--4u`, comentário4369900482. A espera da resposta era criada antes de awaitgoto e só recebia await depois. Se goto falhasse primeiro, o waiter ou seu callback assíncrono finished() podia rejeitar durante finally sem handler, encerrando Node antes de cleanup/recibo. O PASS feliz8313 e a revisão daquele recorte não eram prova desse caminho de erro. O coordenador confirmou a contraprova Node24.19/strict independentemente, sem DB/browser/servidor.

Workflow proporcional real: `speckit-converge` com pré-requisito bash --require-spec --require-tasks --include-tasks PASS acrescentou somente fase6/T013–T016, sem renumerar/desmarcar tarefas antigas; lacunas HIGH de coordenação/regressão em FR-002/FR-005, MEDIUM de validação e LOW documental. Ajuste técnico autorizado do plano define helper/test/fixture. `speckit-analyze` read-only executou o mesmo pré-requisito:11 requisitos/SC,16 tarefas,100% cobertura,0ambiguidade/duplicação/conflito constitucional/tarefa sem requisito. Requirements16/16/security6/6 continuam gates read-only. `speckit-implement` --require-tasks --include-tasks PASS. Extensão bug e hooks inexistentes; nenhuma extensão nova foi criada.

Correção: `scripts/local-readiness-navigation.ts` agenda os dois callbacks com Promise.resolve().then e anexa Promise.all antes de eles executarem. O waiter é registrado antes de iniciar navegação; throws síncronos e a rejeição de finished() pertencem aos ramos observados. O primeiro erro é propagado, enquanto o outro ramo permanece tratado durante finalização do chamador. O timestamp continua dentro do callback da resposta, depois de finished(); o valor retorna só quando ambos completam. O finally real de browser/Next/Prisma/schema não foi alterado e nenhum handler global de unhandledRejection foi registrado. Integração limitada a scripts; app/schema/dependências/workflows permanecem intactos.

[Regressão RED/GREEN](../../docs/reports/2026-10-25-hf-night-01/qa/navigation-rejection-regression.json): com helper extraído na sequência antiga equivalente,9 testes tiveram4 PASS/5 FAIL, Node2.260,4049ms,exit1. Dois controles legacy confirmam strictchild exit1 com marcador de recurso presente e recibo ausente, tanto por waiter tardio quanto por finished() tardio. Após correção,9 testes de política+9 de coordenação passaram18/18,0skip/fail/cancel, Node2.252,5039ms/exit0. O ambiente mínimo do child recebeu NODE_ENV=test após typecheck inicial TS2769; essa falha e o retry ficam no recibo. Typecheck final exit0/2.703,4894ms; lint dos seis arquivos exit0/2.968,0314ms e rerun do único teste ajustado exit0/2.254,7771ms.

Seis cenários protegidos exercitam waiter/finished tardios após goto recusado, throws síncronos de ambos callbacks e rejeição primeiro do waiter/finished com navegação tardia. O helper real é chamado pelos testes; cada childstrict precisa preservar o erro causal, remover somente seu marcador e escrever recibo FAIL. O caso feliz verifica ordem e retorno tipado. Os dois controles negativos mantêm a sequência antiga documentada, sem mascaramento global. São oito children controlados pela regressão, além do runner node:test, sem rede/DB/browser/servidor. Essa prova de arquivo não é uma injeção de falha real de Playwright/PostgreSQL.

Revisor `/root/fr015`: fonte e ligação ao finally real PASS, rerun próprio strict18/18 PASS/0skip,2.184,6925ms; sem carga pesada. Fonte liberada antes do único ensaio real seguinte.

[Novo ensaio030](../../docs/reports/2026-10-25-hf-night-01/qa/territorial-readiness-p2.json), [comando](../../docs/reports/2026-10-25-hf-night-01/qa/territorial-readiness-p2-command.json), [manifesto](../../docs/reports/2026-10-25-hf-night-01/qa/territorial-readiness-p2-fingerprint.json), [delta](../../docs/reports/2026-10-25-hf-night-01/qa/functional-delta-p2.json). Executado uma vez sob --unhandled-rejections=strict, UTC06:54:26.988–06:54:49.296Z/22.307,9963ms, PASS. Source HEAD3e0066 acompanhado do delta não commitado e fingerprint `46a9e540483c4e3748a8b185e7ea3e3fecf9ad5f2bbb8b7a748dec8c88aa2489`, igual antes/depois,600 entradas. Em relação a8313: três arquivos auxiliares novos e somente runner alterado; em relação à baselinee718: seis arquivos do instrumento novos, nenhuma entrada existente alterada/removida. Não transferir baseline15gates ou coorte composta a esse fingerprint.

Resultado real:10 aquecimentos/100 respostas completas,147.036 bytes, p95=54,9855ms/meta500; lista/teclado213,3963ms/meta2s. Payload e hrefs100áreas/1000coletas conferidos, dois destinos abertos e dois EXPLAINs reais sanitizados. Browser bloqueou15 requests de outra origem,0mutações/0pageerrors. Cleanup servidor STOPPED/browser CLOSED/schema REMOVED,0errors; PostgreSQL owned parou no finally externo,0listeners fixos. Esse ensaio verifica a integração/caminho feliz, não a falha real de navegação; a regressão strict é a prova finita do erro corrigido. Recibos8313/FAILs anteriores e gate textualFAIL do restore não foram sobrescritos.

Fechamento independente P2: `/root/fr015` reconferiu os quatro hashes funcionais do delta, recalculou as100 amostras/posto95=54,985499999998865ms e revisou documentalmente o novo cleanup/recibo, PASS sem segunda carga. [Parecer](../../docs/reports/2026-10-25-hf-night-01/qa/independent-review.md). O review remoto do HEAD3e0066 não é transferido ao futuro HEAD corrigido; commit/push/resposta ao finding e nova revisão remota pertencem ao coordenador.

Converge final real após implementação: pré-requisito bash --require-spec --require-tasks --include-tasks PASS,16/16 tarefas,11FR/SC+5AC+4edge cases+9 decisões de plano+7 princípios,0findings/0tasksappended. Nenhuma escrita em tasks.md durante essa análise; SHA256 `0de4d6c9b55d5735d1119d9913c057641f134da684df5a8e1cf3d7ea3bb68c5b` permaneceu igual. Esta nota é registro posterior, não efeito da skill read-only/converge. Conferência final estática:59 arquivos,35JSON+4JSONL válidos,73links existentes,600/600hashes funcionais,whitespace inclusive untracked e scanners PASS. T013–T016 concluídas; nenhum runtime adicional foi executado.

Manifesto segue a decisão de publicação do coordenador: um único corte atual pósP2 com58 entradas mais o próprio manifesto, sha256/bytes locais atuais, frozenUtc novo e Git fields null/PENDING_COORDINATOR_COMMIT. previousPublishedManifest referencia commit `3e0066ab82a415e04342bd751254ee65cf533dfb`, mesmo path e SHA256 do blob `77e093e55a9ec9fcbd9714fefc604b4650e5164c1b38121a535335e95395872e`. O Git preserva os hashes anteriores; não se usam entradas antigas como se fossem atuais. Root preencherá somente os campos Git do novo corte após commit. Nenhuma fonte ou dado de aplicação muda nessa etapa de metadados.
