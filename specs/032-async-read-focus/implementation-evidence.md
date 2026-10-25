# Evidências locais — foco das leituras

Missão HF-NIGHT-01/M04/M07, feature032, autor `/root/fr015`, 2026-10-25. `EVIDENCIA_IMPLEMENTACAO` limitada aos cenários descritos; sem aceite humano ou conclusão científica.

## Estado inicial e fontes

- Worktree exclusiva `.worktrees/af`, branch `fix/hf-night-async-focus-20261025`, baseline `08262dc57c1ad365244f9ec6902b1e4be39e2d7d`.
- Estado inicial: somente `M vercel.json`, guarda exata acrescentada pelo coordenador `/root`, preservada e separada do delta de foco. Nenhuma alteração anterior do autor ou outro caminho foi incorporada.
- Fontes de intenção: mandato corrente, spec007 FR-018/spec020 FR-002 e spec008 FR-027/spec026 FR-005. CF-PRD-FR-010/CF-PRD-FR-015 rastreiam dashboard/território; C1 mantém aceites/ciência como eixos independentes.
- Investigação anterior do autor em fr015 HEADdaebd71 executou12 cenários offline; o código destes leitores coincide com baseline032. `/root/fr015/focus_review` revisou fontes e recibos, executou0 cenários próprios e não escreveu arquivos. Sua crítica de estratégia recomendou mesma identidade DOM, nome/outline e geometria320/texto200. Não é aceite humano.

## Fluxo Spec Kit executado

- Skills reais `.agents/skills/speckit-*/SKILL.md`, previamente lidas nesta sessão, aplicadas em sequência: specify,plan,checklist,tasks,analyze,implement,converge. Template ativo resolvido, ponteiro `.specify/feature.json` local ignorado; setup-plan,check-prerequisites e setup-tasks executados com Git Bash.
- Specify validou16/16 critérios de escrita. Checklist customizado8 itens foi gerado unchecked; o coordenador avaliou8/8 e registrou nota. Gate implement:24 critérios revisados,0 pendentes; implement não alterou marcadores.
- Analyze anterior ao código:7FR,4SC,11tarefas,100%cobertura,0ambiguidades/duplicações/conflitos/tarefas sem vínculo;7princípios constitucionais PASS.
- Extensões: `.specify/extensions.yml` e diretório `.specify/extensions` ausentes; nenhum hook de bugfix ou outro hook instalado.

## Preparação e escopo

- Node24.19.0/npm12.0.2, Next16.3.8/React19.2.4/Playwright1.55.1.
- `npm ci --offline --no-audit --no-fund`: PASS,553pacotes do cache, sem lock/config alterados. Scripts bloqueados de6pacotes foram informados pelo npm; política preservada.
- Guias Next locais lidos antes do código: `05-server-and-client-components.md` e `11-css.md`, incluindo CSS Modules, em `node_modules/next/dist/docs/01-app/01-getting-started/`.
- `npx prisma generate`, com engine da mesma versão no worktree QA referenciado por leitura: PASS; gerados ignorados somente em af, sem migration/conexão de banco.
- Implementação: helper puro `focusReadRegion` (guard de acionador focado), refs/tabIndex=-1 em raízes persistentes dos três leitores, nome de região no mapa e outlines locais. Foco somente em handlers explícitos, antes da carga; zero foco em resposta/effect/finally.
- Fetch, abort, geração do mapa, clearData, cursores, autorização, shell, auth, API, schema, tiles e ciência não foram alterados. Somente helper+3TSX+2CSS e testes/spec032 pertencem ao autor.

## Validação executada

| Comando/verificação | Resultado | Alcance |
|---|---|---|
| `npx playwright test --config tests/ui/async-read-focus.config.ts --grep 'history pagination\|retry keeps identity'` no baseline, antes do código | RED:4FAIL/0PASS | Paginação e retry dos três leitores falharam por região sem foco na carga. |
| `npx playwright test --config tests/ui/async-read-focus.config.ts` final | PASS:27/27,0skip,24.8s | Identidade DOM/nome/outline, paginação ida/volta/refresh, retry/erro repetido/vazio, fast/delayed, foco posterior em sucesso/erro, carga inicial/não focada, abort/contexto/unmount e8combinações de reflow/tiles. |
| `npx eslint src/components/async-read-focus.ts src/components/dashboard/dashboard-summary.tsx src/components/dashboard/dashboard-history.tsx src/components/territorial-map/territorial-map-view.tsx tests/ui/async-read-focus.spec.ts tests/ui/async-read-focus.config.ts` | PASS,exit0 | Última execução após correções do harness; sem erro/aviso. Execução autorizada fora da restrição Windows de subprocessos. |
| `npm run typecheck` | PASS,exit0 | Tipos Prisma locais; nenhuma conexão de dados. |
| `git diff --check`, revisão de escopo e referências novas | PASS | Sem whitespace inválido ou referência relativa quebrada; paths fora do escopo preservados. |

O harness usa os componentes, shell, hooks de scroll, CSS Modules/global e Leaflet reais, com stub apenas das APIs Next necessárias à montagem offline. Respostas são sintéticas e qualquer egress é abortado. Tiles foram bloqueados antes de conexão; a lista, seleção e destino final continuaram utilizáveis. Nenhum Next/DB/SMTP ou serviço externo foi iniciado ou acessado.

Os27 testes contam1jornada de paginação,18cenários dos3leitores (6por leitor) e8combinações largura/texto. As combinações são320/375/768/1440px com texto100/200%; a ampliação é font-size raiz, com fonte de fallback Arial local. Capturas viewport `fullPage:false` ficam ignoradas em `test-results/async-read-focus/**`.

## Falhas intermediárias e limites

- Primeira passagem pós-código24testes:8PASS/16FAIL em amostragem instantânea do outline. A transição global existente de0.3s ainda estava em andamento; assert foi trocado por polling do mesmo requisito≥2px, sem desabilitar transições ou mudar CSS global.
- Passagem seguinte27testes:26PASS/1FAIL porque o teste esperava retry no primeiro Tab do mapa. A ordem existente inclui Voltar ao resumo antes de retry; corrigidos somente teste e descrição do contrato para preservar essa ordem. A aplicação não foi alterada para acomodar o teste.
- Typecheck intermediário encontrou `click` em HTMLElement|SVGElement no harness; corrigido com guard HTMLButtonElement. Typecheck final PASS.
- A skill `vercel:react-best-practices` foi lida e aplicada após os3TSX, incluindo regras locais de interação em handler e refs para valores transitórios: PASS. Hooks incondicionais, refs DOM sem estado extra, sem listeners/timers globais, fetch/abort/deps preservados, labels/tabIndex/outline e ordem Tab verificados; nenhum achado residual.
- Não houve teste de servidor Next completo, build, suíte ampla de banco, leitor de tela manual, zoom real de navegador ou aceite humano. Os recibos automatizados não encerram SC-008/SC-009 da spec007 nem acessibilidade/homologação globais de C1.
- Sem commit/push/PR pelo autor. PR34/worktreefr015 e administração global/feature033 permanecem fora deste incremento. Nenhuma necessidade de alteração dos registros canônicos globais foi identificada para esta correção local; histórico e docs/raw intactos.

## Convergência

speckit-converge executado após implement, usando apenas spec/plan/tasks e constituição como intenção e os caminhos previstos como escopo. Sem comparação Git durante a avaliação.

| Métrica | Resultado |
|---|---|
| Requisitos/critérios/cenários examinados |17:7FR,4SC,6aceites |
| Decisões do plano |5 |
| Princípios constitucionais |7 |
| missing /partial /contradicts /unrequested |0 /0 /0 /0 |
| Severidades CRITICAL/HIGH/MEDIUM/LOW |0 /0 /0 /0 |
| Tarefas acrescentadas |0 |

**Converged — the implementation satisfies the spec, plan, and tasks.** tasks.md permaneceu byte a byte inalterado durante converge: SHA256 antes/depois `E513FEC82216EB525FB8ACEF035D5FA34ADEDF2739F4BBAEDC7B4431AC120733`. T011 foi marcada posteriormente em implement, após registrar esta evidência. Sem hooks instalados. Próximo passo: revisão independente do delta sem commit pelo autor.

## Revisão independente posterior

[Parecer /root](independent-review.md): PASS local, sem finding material.
Revisor leu o delta/harness e executou27/27cenários PASS,0skip,36.1s.
Resultado sem aceite humano; publicação e Codex do SHA final são gates próprios.
