# Evidências — workspace e shell

Estado: RED,2026-10-18; nenhum código da aplicação desta fase alterado até a coleta baseline.

## Baseline e dependência

EVIDENCIA_IMPLEMENTACAO: worktree única reutilizada `C:/projetos/consolidados/HidroFlorestas-frontend-login`; branch feat/frontend-workspace-shell, base8cacfc99ba0e2876c1036a0f67ec41375806b9ac da fase2. PR11 permanece aberto para development, sem merge. Seu CI final [39166203271](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39166203271) passou15/15; artefato12150897907 baixado/inspecionado,37 PNGs, fingerprint único8cdade645e026efe093ab80c153100b18fd07bb7144bc721438c58eabc65e517. SHA256 do ZIP489a19a063894b7287246dc394dbfae2989cac0e50bdebc30714ffc60961b9c9; expira2026-11-01. Recibo final vivo no PR11, evitando commits recursivos de recibo. Fonte do runtime da fase2 já passara15 gates locais no fingerprint24fd4f205161d7395ce31a8e0c927b22c6619af345521616eb0c15b7768e8d0e.

origin/development afef5db6ced1a4604a114d842bf85950ac32c69b e main beba96fbf6bbaac8771dbb29abea2f9f8f5b0054 reconferidos sem avanço. RC0f669b7 e dois ZIPs preservados. Starter oficial cbb954a somente leitura. Branch preferida estava livre;019 foi confirmado livre por scan sequential. Não houve merge documental nem criação de outra worktree.

## PLAN e revisão dos testes

Spec Kit specify → plan/setup-plan → pesquisa independente somente leitura → tasks/setup-tasks → analyze/check-prerequisites → implement/check-prerequisites. Hooks ausentes. Checklist16/16;10FR+4SC cobertos por20 tarefas, sem críticos/conflitos. Commit23d77ed registra o planejamento. Consumidores/rotas/capacidades e reversão inventariados antes de alterar shared files.

Revisão independente dos testes encontrou P2 de main artificial (áreas/membros têm0; resumo/mapa1), cleanup por caso de lifecycle e restauração condicional de vínculo. Corrigidos; cópia exata da inatividade inclui OWNER, sem enfraquecer regras. Removido first() no admin em favor de header escopado. Alerts escopados ao conteúdo/diálogo para não confundir anunciador global do Next. Incluídos wrap de foco nos dois sentidos, menu por foco/clique/resize/navegação e foco livre do rodapé. Tiles OSM abortados como na suite territorial existente, mantendo APIs/roles reais.

## RED

Rodada exploratória RegressionSetup PASS, E2E102 PASS/16 FAIL em118 casos. Somente testes novos falharam;100 existentes passaram. [Journal](evidence/red-exploratory.jsonl), [assertions](evidence/red-exploratory.log). Essa rodada atravessou correções de testes durante reinícios de workers e inclui expectativas artificiais descritas acima; não representa uma árvore estável nem16 defeitos confirmados. Capturas parciais em before-exploratory-*.png preservadas como histórico.

Rodada estável seguinte congela20 testes novos (120 total), antes de código. Typecheck/Lint PASS (0 erros/3 avisos preexistentes); E2E e capturas ainda em coleta. Somente seu resultado estável será usado como RED para a implementação.

## Limites

Somente PostgreSQL sintético próprio em loopback/runner oficial, sem InitializeCiCluster local. Sem .env produtivo, Neon/Gmail/Cloudinary reais; guards/fixtures/origens/ACL preservados. Capturas mascaram campos preenchidos; trace/video/autoscreenshot desligados nos novos testes e inputs limpos no teardown. Nenhuma prova/token/cookie é publicado. Testes automatizados/Chromium e revisão do agente não equivalem a aceite humano, leitor de tela manual, WCAG integral ou homologação produtiva. Ciência IHFR permanece inalterada e experimental conforme ADR0001; intermitência histórica não é apagada.
