# Implementation Plan: Áreas e capa
**Branch**: feat/frontend-areas-cover | **Date**: 2026-10-19 | **Spec**: [spec.md](spec.md)
**Input**: specs/021-frontend-areas-cover/spec.md

## Summary
PLAN → EXECUTE → REVIEW. Usar fonte visualcbb954a; adaptar CSS local e composição de áreas/capa; preservar ponto e protocolo. Testar antes de alterar produto e obter RED somente para divergência demonstrável (sucesso visual antes de bytes novos é candidato por inspeção).

## Technical Context
TypeScript, React19.2.4, Next16.3.8 App Router, Node24.19.0, npm travado, CSS Modules/Tailwind existente, Leaflet/OSM e fronteira client/SSR atuais. PostgreSQL17.10 loopback próprio e Chromium140/Playwright1.55.1 pelos runners oficiais. Nenhuma dependência nova ou alteração de storage.
Target:375/768/1440 e320px texto200%; viewport900 e foco/rolagem declarados. Meta de performance nova não é inferida.

## Constitution Check
I autoridade da missão e fontes classificadas; II recorte implementável próprio; III spec numerada livre; IV rastreabilidade003/016/020 e Code-First EM_REVISAO; V guards/segurança/projeções preservadas; VI histórico e docs/raw intactos; VII validação/publicação por branch, sem merge. PASS antes/depois do desenho, sem exceção.

## Project Structure
specs/021-frontend-areas-cover/{spec,plan,research,data-model,quickstart,tasks,review,implementation-evidence}.md; contracts/ui-contracts.md; checklists/requirements.md; evidence/.
src/components/areas/{area-list.tsx,area-form.tsx,area-cover.tsx e novo cover.module.css,areas.module.css}; detalhe SSR src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx.
Tests tests/e2e/frontend-areas.spec.ts e suítes existentes inalteradas. CI/vercel.json focais. area-form-state.ts/area-map.tsx/area-map.client.tsx/map-config.ts são consumidores revisados e permanecem funcionais sem mudança necessária.

## Base, Dependencies and Preservation
Worktree reutilizada sequencialmente C:/projetos/consolidados/HidroFlorestas-frontend-login, limpa após fase4. HEADbase 7b8d9c0c8894d4e3e86d35d90b4d1b3d2eab003d, PR pendente por403 do conector; branch publicada https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/tree/feat/frontend-laboratory-dashboard. Se fase4 aberta: PRbase temporária feat/frontend-laboratory-dashboard, destino development; declarar dependência e pedir conferência de ancestralidade/diff antes do retarget pelo mantenedor após merge. Não apagar branchbase. Development atual conferida no preflight da fase.
RC e ZIPs/worktrees preexistentes preservados; nenhum serviço alheio será interrompido. Começar runner somente com cluster próprio parado e nenhuma suíte concorrente.

## Sequence and Risks
1. Conferir refs/base/próximo número; templates SpecKit, spec/design/tasks/checklist/análise e commit PLAN.
2. Testes reais de ponto/lista/detalhe e matriz/protocolo UI fake delimitado; capturas before e baseline oficial congelada.
3. Registrar RED real ou caracterização PASS sem fabricar falha; implementar CSS/composição.
4. Se demonstrado: mensagem de preview dependente da tentativa atual/onLoad, preservando confirmação/ticket/revision.
5. Allowlist/if/upload focal e Previewfalse exato antes do push;15gates congelados.
6. Revisão independente artefatos/diff/testes/imagens; corrigir achados materiais e validar delta.
7. Publicar PR empilhado/revisor confirmado; verificarCI do SHA final e recibo no PR, sem ciclo documental indefinido.
Riscos: ignorar flag/capacidade/existência; confundir confirmação persistida com bytes carregados; perder key em retry incerto; stale sobrescrever imagem; localização tardia apagar edição; screenshot não expor estado; mapa/foco no scroller. Tratamento pela matriz e testes.
RECOMENDACAO de reversão: commits separados revisáveis; eventual revert pelo mantenedor, sem reset/force/rollback de dados.

## State
PLAN preparado; nenhum teste novo aprovado por inspeção. Leitura do código e testes existentes é EVIDENCIA_IMPLEMENTACAO; candidato a bug de status depende de RED antes da correção.

## Estado sequencial conferido
2026-10-19T14:20Z: worktree frontend-login limpa sobre origin/feat/frontend-laboratory-dashboard7b8d9c0c8894d4e3e86d35d90b4d1b3d2eab003d; origin/development continua c33bf50b510dd7af7ad59cde039839f56519c87e. Demais worktrees/RC/ZIPs preservados. Nenhum processo Node desta worktree; cluster próprio parado, dados preservados. Branch feat/frontend-areas-cover e PR correspondente inexistentes antes da criação. Script SpecKit1.0.4 selecionou021, sem criar branch extra; git switch -c criou somente a branch exata. Hooks inexistentes. Fase4 tecnicamente validada por15gates da candidata e4gates do delta final; fonte funcional7d13dedfa6c89edf5c2a3262e1c5eae4c958da1f386cb86890e7ade9963d9a51. CI remoto run39267705060 em progresso no HEADpublicado. A falta de escrita do conector403 afeta abertura de PRs/review, não impede a implementação independente autorizada; usuário informado e acesso solicitado sem credenciais. PRfase5 terá base temporária feat/frontend-laboratory-dashboard; destino finaldevelopment, sem merges.

## Estado antes do push da fase 5

Implementação/review local concluídos;15gates locais PASS na fonte congelada6448f21/snapshot1b80704b. PRfase4 #14 publicado eCI15PASS noHEAD7b8d9c0, recibo https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/14#issuecomment-6270896754. Base temporária fase5 continua feat/frontend-laboratory-dashboard enquantoPR14 aberto. Publicação/CI exato fase5 encerram somente pelo recibo noPR. [Relatório das duas fases](mission-report.md). Registros anteriores preservam seu instante histórico.

## PLAN focal OBS-UI-02 — 2026-10-19
FATO_DOCUMENTADO: PROMPT-CODEX.md lido integralmente e escopo atual autorizado. EVIDENCIA_IMPLEMENTACAO: branch15 original33e3e5bd2a3265e9dc47d723db7a80693cf7c0f5 sincronizada por merge Git não destrutivo da branch14 c076ec17f668ee7cf632a6bff0c71df4e7cd2564 na mesma worktree frontend-login, sem nova branch/worktree, rebase/reset/force. Base temporária continua feat/frontend-laboratory-dashboard; destino finaldevelopment. RC/ZIPs/outros processos preservados.
A fonte funcional14 foi validada pelos15gates do CI39292821274 em9b0806e (artefato12207263687/digest735e93945b22c000c1a372601ec1eab43b34c9bbeb27c46c85c66e5ba4a92e77). c076ec1 muda apenas texto documental UTF-8/plano; CI de seu HEAD final é acompanhado em paralelo à execução local desta fase e será confirmado antes do push15. Não atribuir ao novo SHA o resultado anterior.
A captura histórica do CI39278467163 foi inspecionada: instrução de retry em painel de sucesso verde após falhaGET. Revisor independente identificou hipótese adicional no patch: pendingPreview ainda ativo durante DELETE pode permitir onLoad anterior restaurar verde após falha. Reproduzir antes de corrigir; não alterar protocolo.
Sequência: commit PLAN → aplicador somente testes e extensão revisada no mesmo frontend-areas.spec.ts (soft apenas nos novos asserts de cor, capturas metadata/bytes/sucesso e corrida com DELETE/bytes retidos) → commit testes → RegressionSetup/E2E oficial completo com prefixbefore → preservar RED → aplicador somente area-cover.tsx/cover.module.css e invalidação mínima de pendingPreview/message no início da remoção aceita se RED demonstrar → commit produto → RegressionSetup/Build/Typecheck/Lint/E2E oficial completo prefixafter → revisão independente código/PNG/JSON → evidências e commit → conferir CI14final e push na branch15 existente →15gates no SHA15exato e atualizar PR15.
Constitution Check I–VII PASS; checklist requirements16/16; hooks inexistentes; artefatos Spec Kit existentes preservados com adendos, sem regeneração/nova spec. Guias Next locais de CSS/fontes lidos; modelo/contratos/quickstart/research da021 e guardas atuais consultados. Novo booleano é só apresentação; API/DTO/AuthContext/contexto/geolocalização/chave/revisão/OCC/upload/confirm/reconcile/proxy/flags/IHFR permanecem no contrato existente. Sem provedor real/merge de PR/deploy. Reversão RECOMENDACAO por commits delimitados, sem reset.

EVIDENCIA_IMPLEMENTACAO: commit de sincronização Git 2dbd0fb42b4aff0104450481a70987163b410b02, sem conflitos.
