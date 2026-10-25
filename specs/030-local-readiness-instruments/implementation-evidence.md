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
