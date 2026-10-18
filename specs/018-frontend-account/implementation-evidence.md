# Evidências — frontend de contas

Estado: IMPLEMENTADO_E_REVISADO_LOCALMENTE, 2026-10-18. Aceite humano pendente; nenhum merge/deploy. O CI do SHA publicado é acompanhado no PR, separadamente dos resultados locais.

## Baseline e planejamento

EVIDENCIA_IMPLEMENTACAO: branch feat/frontend-account criada na worktree limpa existente `C:/projetos/consolidados/HidroFlorestas-frontend-login`, base origin/development afef5db6ced1a4604a114d842bf85950ac32c69b. Primeiro commit49b38cc documenta Spec018. RC0f669b7 e dois ZIPs não rastreados preservados. Starter oficial main cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f, somente leitura.

Spec Kit: specify → plan (setup-plan.sh) → tasks (setup-tasks.sh) → analyze (check-prerequisites.sh) → implement (check-prerequisites.sh). Bash portátil localizado após caminho convencional ausente. feature.json é ignorado e permanece seletor local; não foi forçado ao Git. Sem extensions.yml/hooks. Checklist8/8 PASS. Análise:9 requisitos+4 critérios com tarefas, cobertura100%, sem ambiguidades/críticos/conflitos constitucionais.18 tarefas distribuídas em setup/fundação, US1(3), US2(2), US3(2) e entrega transversal.

Revisão independente inicial detectou P2 no teste de duplo envio pós-rerender e P3 na comparação de preenchimento só por tamanho. Ambos foram corrigidos antes do código: dois eventos síncronos iniciados ociosos e comparação booleana do valor integral. Capturas aguardam rede ociosa para evitar interferência durante hidratação; mascaram somente inputs preenchidos, sem esconder controles vazios.

## RED real antes da implementação

| Rodada | Runner | Resultado | Alcance |
|---|---|---|---|
| Inicial | rc-review-validation.ps1 -Gates E2E |81 PASS,8 FAIL,6 não executados |5 falhas novas de UI;3 em jornadas ambientais existentes |
| Preparada | rc-review-validation.ps1 -Gates RegressionSetup,E2E | RegressionSetup PASS; E2E86 PASS,7 FAIL,2 não executados |6 falhas novas de UI;1 em drafts existentes |

[Journal inicial](evidence/red-initial.json), [assertions iniciais](evidence/red-initial.log), [journal preparado](evidence/red-prepared.jsonl), [assertions preparadas](evidence/red-prepared.log). Logs integrais sanitizados permanecem localmente em .accounts-validation. Capturas antes: evidence/before-frontend-account-*.png, seis jornadas em375/768/1440/320(texto200), mais estados capturados.

Falhas novas demonstradas: overflow de telas de conta em320/texto200 (recuperação e exclusão na rodada preparada), controles SSR ativos em cadastro/recuperação/troca, submissões simultâneas no cadastro (o segundo resultado desbloqueia o primeiro ainda pendente), alvo do PasswordField inferior a44px.

Falhas fora do código alterado: rodada inicial apresentou404 em leitura/registro ambiental e drafts. Após RegressionSetup, leitura/registro passaram; isso não comprova a causa anterior. A segunda rodada falhou em drafts por strict mode: dois textos idênticos de laboratório inativo, um oculto. Fixtures novas usam IDs001–004, ambientais501–504, teardown exato; não foi demonstrada interferência direta. Nenhuma guarda, assertion antiga, timeout ou retry foi alterado para esconder essas falhas. Reavaliar na regressão GREEN/CI e preservar este histórico.

## Implementação e limites

CSS Module de contas e composição split do cadastro adaptados do starter, sem importar mocks/adapters/roteador. AccountShell e PasswordField harmonizados; controles de prontidão e refs de envio síncrono acrescentados localmente. Senhas/payload e fronteira de renovação da chave mantidos; destino continua no AuthContext inalterado. Código/prova, cooldown, reenvio, captura/limpeza de fragmento, política15/72, geração de prova, revogação, blockers, confirmação e returnTo preservados. Exclusão mantém botão vermelho e confirmação explícita.

Branch adicionada ao trigger e if do validate, preview desabilitado por nome exato. Os15 gates, guards, isolamento PostgreSQL, permissões e SHAs de Actions não foram alterados. Upload acrescenta somente frontend-account-*.png.

Instalação: npm ci --no-audit --no-fund PASS (553 pacotes, lockfile preservado). Uma tentativa de geração Prisma foi iniciada prematuramente durante instalação e interrompida quando npx tentou resolver versão ausente fora do lock. Nenhuma mudança de package/lock foi produzida. Geração repetida com o binário local7.4.2 após instalação: PASS. Nenhuma migration remota.

## GREEN e revisão final

EVIDENCIA_IMPLEMENTACAO: a primeira execução completa dos15 gates passou, incluindo E2E95/95, HTTPS2/2, exclusão3/3, IHFR6/6, integração218, migration37, contrato6, R1 17 e bootstrap14 migrations. [Journal](evidence/green-intermediate.jsonl). Essa execução atravessou mudanças de testes/capturas; não é evidência de uma árvore final única.

A inspeção visual independente detectou coluna estreita em320/texto200. Duas novas rodadas RED preservadas em [reflow-red.jsonl](evidence/reflow-red.jsonl) e [reflow-red-second.jsonl](evidence/reflow-red-second.jsonl), com assertions nos logs correspondentes, demonstraram quebra interna de palavra no título de recuperação. Corrigidos padding móvel em pixels, tamanho do título e fluxo da confirmação; o teste passou a verificar largura útil dos campos, palavras inteiras e espaço para seis dígitos ampliados.

Última rodada de UI: Unit, Build, Typecheck, Lint, E2E100/100, HTTPS2/2, exclusão3/3 e SchemaAudit0 PASS. [Journal](evidence/green-final-ui.jsonl). Os14 novos cenários passaram; as suites ambientais anteriormente falhas passaram sem alteração. O ajuste final de privacidade do teste substituiu valores sintéticos por entradas do harness e sanitizou erro de navegação com fragmento; Typecheck/Lint repetidos: PASS. O CI publicado deve executar novamente os15 gates na árvore final, incluindo esse ajuste. Lint:0 erros e3 avisos preexistentes fora do escopo.

Capturas finais:37 arquivos `evidence/after-frontend-account-*.png`: seis telas em375/768/1440/320(texto200), seis estados loading, seis de erro e foco visível. Capturas anteriores e REDs permanecem. Inputs preenchidos mascarados; provas e credenciais não são publicadas. O arquivo ignorado de PNGs sanitizados sobrevive aos gates que limpam test-results e integra o artefato do CI.

Revisão independente após GREEN: diff e todas as37 capturas inspecionados; sem achados bloqueantes remanescentes. Corrigidos P2 de teste síncrono de duplo envio, P3 de valor integral na hidratação e P2 de reflow. Revisor confirmou preservação de senha bruta, chave idempotente, destinos/estados do servidor, prova em memória/geração e retorno da exclusão. AuthContext, APIs, Prisma, middleware, login, CSS global e lockfile sem diff. Revisão não executou testes próprios nem substitui aceite humano.

## Publicação e limites

Branch `feat/frontend-account`, PR com base `development`. Commits, HEAD final, URL do PR e resultado exato dos15 gates constam no histórico Git e no próprio PR/relatório de entrega. O resultado remoto não é presumido neste documento preparado antes da execução. Não alterar main/development diretamente nem fazer merge/deploy. A próxima fase reutiliza a mesma worktree, após validação e publicação, com base reconferida.

Capturas automatizadas não provam leitor de tela manual, WCAG integral, Gmail real, homologação produtiva ou validação científica. A intermitência histórica do IHFR permanece registrada; nenhuma regra científica, retry ou guarda foi alterada.
