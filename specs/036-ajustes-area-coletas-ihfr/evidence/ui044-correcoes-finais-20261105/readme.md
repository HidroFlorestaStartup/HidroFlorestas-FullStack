# Correções finais UI044 — ciclo C1–C3

Data: 05/11/2026, America/Fortaleza. P00 é o coordenador, integrador e publicador único.

## Identidade e estado

- Base B: `7bae1f87cb8d6a708b7c4de0b990e82e5a503369`.
- Árvore base: `0c836da964c377a7d1e6bc8b2331524e931ea901`.
- Fonte: [handoff pinado em71b8c95](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/71b8c95b7d1d1509b7155a36d65f70289c0a39f3/docs/plans/active/correcoes-finais-ui044-20261105/prompt-de-execucao.md).
- Branch única: `fix/ui044-correcoes-finais-20261105`; destino development.
- O0: **PASS**, [manifesto comum com ownership/preimages/guias](o0.json).
- O1: deltas P01/P02/P03 entregues e aplicados com hashes/preimages/postimages idênticos. [Recibo da composição](composition-progress.json).
- O2: composição e checks locais **PASS**. F1 foi publicado na PR53; sua CI terminou **FAIL**. Reparo T078 integrado e revisado, aguardando qualificação do sucessor na mesma PR. O3/O4 do sucessor: **PENDING** neste snapshot.

## Crosswalk

| Recorte | Requisitos | Tarefas | Owner |
|---|---|---|---|
| C1 — link/score por coleta | FR-036-001; FR-036-005; US1 | T069; T071 | P01 produto, P03 testes |
| C2 — aviso único na leitura | FR-036-003; FR-036-005; US3 | T070; T072 | P02 produto, P03 testes |
| C3 — leitura primeiro no mobile | FR-036-002; FR-036-005; US2 | T070; T072 | P02 produto, P03 testes |
| Identidade/guardas/composição | SC-036-001; SC-036-004 | T068; T073; T074 | P00 |
| Browser/CI/review/handoff | SC-036-001; SC-036-002; SC-036-003; SC-036-004 | T075; T076; T077 | P00, P03 evidência, P04 não autora |

## Execução e preservação

As skills reais analyze/plan/tasks/implement/converge orientam o ciclo enxuto da Spec036. Prerequisites, setup-plan e setup-tasks executados com exit0; spec/plan/tasks anteriores preservados pelos scripts e estado `.specify/feature.json` restaurado. O histórico de tarefas não é reclassificado.

P01 `/root/p01_cards`, P02 `/root/p02_detail` e P03 `/root/p03_tests` são subagentes reais. Até três simultâneos; sem publicação por worker. O0 foi auditado por `/root/o0_refs`, `/root/o0_speckit` e `/root/o0_guards`, com ausência de autoria de produto/config/testes.

P00 recebe patches com hashes e preimages contra B. A candidata deve conter deploy=false para a branch exata antes de sua primeira ref remota. Após freeze, recibos terminais ficam na descrição/comentário da mesma PR, identificando F/tree/run/attempt; não se acrescenta commit somente para anunciar resultados de outro SHA.

## Limites

O código previamente testado `febee101aa718de5b236f99f8080621c405a1d7f` e seu run42101827226/1 são baseline histórico. Capturas equivalentes podem ser comparadas, mas seus resultados não qualificam F. A CI oficial é Windows/Node24.19/PostgreSQL sintético owned; o workspace Chat usa Linux/Node24.22.1. Nenhum teste contra banco hospedado, fallback full-ui, provedor, merge ou deploy é autorizado.

CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO permanecem. O handoff futuro é técnico para revisão de Pedro; não representa aceite de Luciano nem homologação operacional/científica.

## Entregas e checks da composição

| Evidência | Resultado e limite |
|---|---|
| [P01](p01-receipt.json) | C1; patch `658c3ef0ed198fc027a493a9fa77f3ab2a4cacae9fcdb3d4ae2ab0214d525bf2` |
| [P02](p02-receipt.json) | C2/C3; patch `d3406dcf8b2e60168bd5c8e5c0d4ddd60271c7b7487fe22a03e2c9883ed2f4db` |
| [P03](p03-receipt.json) | Testes; patch `eed5f52d80ec69ac3c286f8f96b9add0813ef11ff81c3346a4e21e45190160f1` |
| [RED funcional](p03-red.json) | Oito testes novos contra B: seis falhas funcionais + dois PASS; sem falha de imports |
| [Validação local](p00-local-validation.json) | 17/17 unidades, typecheck completo e lint PASS; dois warnings preexistentes, nenhum erro |
| [Guardas](p00-guard-check.json) | Somente nome exato em Vercel=false e push/if RC; demais valores semanticamente iguais a B |
| [Ownership adicional](ownership-addenda.json) | Novo layout focal P02 e helper de testes P03 reservados antes da escrita |

P02/P03 registraram typecheck exit2 em suas worktrees sem Prisma gerado. P00 gerou o cliente do schema existente, sem banco, e executou o typecheck composto com exit0. Isso resolve a limitação local; nenhum erro foi ocultado. Os testes são identificados pelos hashes técnicos e ainda não representam a execução de CI de um commit publicado.

A pré-revisão P04 envolve `/root/o0_guards`, `/root/o0_refs` e `/root/o0_speckit`, todos sem autoria dos deltas auditados. Resultados finais dependem de F e da execução real. A matriz escrita cobre OWNER com/sem diagnóstico, MEMBER com/sem, inativo, ADMIN/lifecycle,1440/375/390 e320 com texto200; zero/precisão são provas de apresentação, sem cálculo científico artificial. Capturas e geometria ainda NOT_RUN neste registro; os nomes seguem os padrões de upload oficiais existentes.

## Corte para publicação

P00 revisou o diff composto e confrontou todos os preimages/postimages, escopo e checks locais; nenhum achado material conhecido nesse corte. Essa revisão do integrador não é a QA independente final. Conforme P00/GATES5–6, F será publicado com P04, CI e Codex ainda pendentes, para que os três recebam a mesma identidade e executem em paralelo. O parecer independente não é presumido. O recibo terminal na PR governa o resultado posterior deste snapshot.

## Recuperação de F1 e qualificação do sucessor

[Recibo F1](recovery-f1.json): 9 gates PASS, E2E FAIL (237 PASS, 1 FAIL, 3 não executados) e 5 gates NOT_RUN. A falha é a seleção do artigo completo pelo teste US4 de metadados mínimos após C3. O [patch de P03](p03-recovery-receipt.json) exige Registro único/visível/imutável sem IHFR e mantém privacidade no artigo completo, inclusive reload/inativo. [QA não autora do reparo](p04-recovery-review.json): PASS estático, sem findings. [Typecheck/lint locais](recovery-local-validation.json): exit0.

Produto, scripts, guards e demais testes não mudaram. A nova rodada é necessária para corrigir e qualificar esse defeito comprovado no novo SHA, preservando a execução falha. A matriz de 23 casos ainda é NOT_RUN em F1. O Codex de F1 concluiu sem findings; esse recibo não qualifica o sucessor. Resultados finais ficam no recibo da mesma PR53, sem commit documental posterior para anunciar CI antiga.

## Recuperação de F2

[Recibo F2](recovery-f2.json): 12 gates PASS, Ihfr FAIL (2 PASS / 4 timeouts) e Bootstrap/SchemaAudit NOT_RUN; E2E geral 241/241 PASS. A matriz produziu 7/23 cenários, insuficientes para O3. Todos os stacks apontam a espera de renderização do novo helper UI044; a causa interna ainda está em investigação neste corte. P03 mantém ownership do helper; P04 revisa sem autoria. Nenhum timeout, helper oficial ou guarda foi alterado.

Instrumentação preparada: [P03](p03-f2-diagnostic-receipt.json), [P04 não autora](p04-f2-diagnostic-review.json), [provas Node](p03-f2-diagnostic-probes.json) e [typecheck/lint do integrador](p00-f2-diagnostic-local.json). O await oficial permanece; observadores registram animações, frames e mensagens e restauram os descritores/listeners. Não há fallback, mudança de timeout, cancelamento de animações ou alteração de foco/scroll. As provas sintéticas qualificam observação/isolamento; a execução seguinte busca causa no runner autorizado. T079 funcional permanece pendente.

## Recuperação de F3

[Recibo F3](recovery-f3.json):12 gates PASS, Ihfr FAIL (1 PASS/5 FAIL),2 NOT_RUN, E2E geral241/241 e matriz7/23. O [trace ordenado](f3-render-observations.json) localiza quatro bloqueios em `animation.finished` de uma transição finita no viewport390×844; a causa interna da promessa pendente não foi atribuída. A primeira versão do parser assumia ordem das linhas do console e foi rejeitada; o relatório canônico agrupa por perfil/estado/viewport, ordena por sequência e exige uma instalação e sequências únicas por sessão.

P03 recebeu adendo focal para o helper oficial e suas contraprovas, preservando o predicado de prontidão e a barreira final. A instrumentação temporária será removida. A falha distinta de elegibilidade tem query `landUseType` ausente; a preparação do formulário e as asserções de entrada/request serão reforçadas sem relaxar ELIGIBLE nem alterar domínio ou fixture. T079/T080 e O3 permanecem pendentes neste corte.
