# Revisão técnica e análise Spec Kit — 017

## Análise preliminar — 2026-10-18

EVIDENCIA_IMPLEMENTACAO: check-prerequisites.sh --json --require-spec --require-tasks --include-tasks executado com feature explícita. Spec, plano, tarefas, pesquisa, modelo e contrato presentes. Sem extensions.yml/hooks.

| ID | Categoria | Severidade | Local | Achado e tratamento |
|---|---|---|---|---|
| P1 | Estrutura | MEDIUM | tasks.md do pacote | Oito tarefas sem fases/histórias/paths consistentes; reconciliadas em 14 tarefas executáveis antes da implementação. |
| P2 | Rastreabilidade | MEDIUM | spec.md do pacote | Vínculo apenas a Specs001/012; acrescentados CF-PRD-FR-001/CF-UC-002, mantendo estado em revisão. |
| P3 | Estado | MEDIUM | plan.md do pacote | Bloqueios do ambiente parcial poderiam parecer atuais; identificados como históricos e acrescentado estado do checkout oficial. |
| P4 | Compatibilidade | LOW | candidata page.tsx | priority de Image deprecado no guia Next instalado; substituição focal por preload planejada antes do código. |

| Requisito | Tarefas |
|---|---|
| FR-001 | T005,T006,T013 |
| FR-002 | T004,T005,T006 |
| FR-003 | T005,T006 |
| FR-004 | T007,T008 |
| FR-005 | T004,T007,T008 |
| FR-006 | T006,T007,T008 |
| FR-007 | T005,T007,T013 |
| FR-008 | T009,T010 |
| FR-009 | T009,T010 |
| SC-001 | T006,T011 |
| SC-002 | T004,T006,T008 |
| SC-003 | T008,T014 |
| SC-004 | T011 |
| SC-005 | T010,T014 |

Métricas: 9 requisitos funcionais + 5 critérios; 14 tarefas; cobertura 14/14 (100%). Zero ambiguidades materiais, duplicações bloqueantes, conflitos constitucionais ou achados CRITICAL remanescentes. T001–T003/T012–T014 são tarefas de governança/qualidade do mandato, sem funcionalidade extra. A análise é leitura; correções de planejamento acima decorreram da reconciliação expressamente autorizada pelo usuário, antes desta análise.

RECOMENDACAO: executar RED→implementação→GREEN e repetir revisão sobre o diff final. Aprovação visual humana, outros navegadores e conformidade WCAG integral não são inferidos.

## Revisão adversarial da candidata no checkout

EVIDENCIA_IMPLEMENTACAO: pass separado de leitura do diff completo contra origin/development, handler original e AuthContext, contrato, CSS e testes. Nenhum subagente ou revisor humano foi representado como autor de aprovação.

- AuthContext/API/schema/migrations, assets, globals/layout e package/lockfile: zero diff. Na página, somente signIn({email,password}) autentica; não há router, fetch paralelo, token, storage, adapter/mock, TanStack, persona ou DemoPanel. A senha não é transformada; a política de vazio do baseline permanece.
- Readiness SSR/primeira hidratação e trava síncrona de envio são locais. Erro continua vindo do contexto. Cookies/destinos não foram recodificados na UI. Suítes reais de auth/verificação e HTTPS validam o contrato; interceptação401 e abort do teste novo são rotulados como testes de UI/transporte.
- CSS Module local com seletor raiz de login, foco visível, targets e reduced-motion. Marca/Poppins preservadas. Cabeçalho com links# e comentário demonstrativo antigos removidos na candidata; nenhuma outra tela recebe CSS novo.
- Configurações parseadas e comparadas estruturalmente: depois de remover somente a nova exclusão Vercel, branch no trigger/if e glob das capturas, os objetos voltam exatamente ao baseline. Runners/Actions/permissões/guards/15 gates preservados; job habilitado para push no HEAD da feature.
- Capturas de login preenchido mascaram ambos os campos. Um snapshot automático de falha focal continha a senha sintética e foi sanitizado; versões publicáveis não contêm o valor. Não são publicados traces, cookies ou env. Pacote/RC/outros trabalhos preservados.

Achados materiais: estabilização das capturas após transição global de fonte; execução focal de resposta real deve herdar ambiente completo RC; largura útil insuficiente em320/texto200 com paddings emrem. Evidências e tratamento planejado em plan.md/implementation-evidence.md. Os dois primeiros foram tratados sem alterar runtime/guard/assertions; o terceiro será encerrado com novo RED/GREEN e captura estável.

## Encerramento da revisão local

EVIDENCIA_IMPLEMENTACAO: reflow corrigido por padding-inline escopado abaixo de400px, com FAIL1/PASS1 na mesma assertion. Fonte final9bb0eb9: build/typecheck/lint/E2E82/HTTPS2/auditoria PASS; unit296+mail17 PASS na candidata com a mesma lógica de produto. A tabela e os journals em implementation-evidence.md preservam toda a sequência e as falhas anteriores. Capturas reais finais inspecionadas em375/768/1440 e320/texto200, incluindo erro/loading mascarados.

Análise final Spec Kit: FR001–009/SC001–005 cobertos pelas mesmas 14 tarefas; 100% de cobertura planejada; zero conflito constitucional, ambiguidade material, duplicação bloqueante ou achado HIGH/CRITICAL remanescente. T010/T014 são publicação e solicitação de revisão, pendentes nesta fotografia local. Checklist da spec: 8/8; não há hooks. diff --check, caminhos, imports, bytes do AuthContext, links e padrões sensíveis PASS. O recorte científico/IHFR não mudou.

RECOMENDACAO: APTO PARA REVISÃO HUMANA após publicar e verificar CI no HEAD. A aprovação de composição/copy e integração pertence ao responsável humano. Não declarar revisão humana recebida, conformidade WCAG integral ou aceite operacional/científico a partir destes testes. O PR manterá a referência viva do check final para não confundir o SHA funcional com os commits documentais.
