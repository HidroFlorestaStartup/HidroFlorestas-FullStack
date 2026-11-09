# Feature Specification: navegação, conta e shell responsivo

**Estado corrente — HF-UI-044-A6, 01/11/2026:** reconciliação documental em revisão; implementação A5 testada isoladamente com FAIL terminal em IHFR. A composição exata A+B+C foi validada com limites. Nenhum código/teste funcional alterado nesta rodada.

`CODE_SHA_TESTED_A=6f236bbe7b5f4d7f9718efaa2c334f7d1520e0a0`: run [41268640475/1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41268640475), 12 gates PASS, Ihfr FAIL (5 PASS/1 FAIL), Bootstrap/SchemaAudit NOT_RUN; E2E geral 228 PASS. Não existe PASS isolado de quinze gates de A neste registro.

`CODE_SHA_TESTED_COMPOSITION=6c61056fe1dc2193e225d935f49b78cb6c6781ed`: produto `a585087dbbe9294c18922e3397c2561f245446c9`, árvore com overlay `f40b4e8c0217311869dc5336e4fc15c7176df7a5`; run [41275910130/1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41275910130) com 15/15 gates PASS, 235 E2E e 6 IHFR. Esse resultado pertence somente à candidata composta, com os arquivos de B, e não ao SHA isolado de A nem ao futuro `DOC_HEAD` A6 identificado no recibo da PR #46.

**Dependência material:** `ScientificNotice` e testes IHFR pertencem a B/#47. A usa `sm:grid-cols-2`; B preserva as fontes e os quatro qualificadores e usa uma coluna abaixo de `lg`, com ajustes de legibilidade. A safe-area A5 de 34px exige padding computado de 42px. Na composição, o cenário 667×375/texto200 passou com `toBeInViewport({ratio:1})` intacto. Não duplicar esse reparo no shell A, transportar B silenciosamente ou encerrar PASS isolado por PASS composto.

**Aceite:** FR-035-003, US3 e a parcela bilateral de SC-035-001/002/003 continuam pendentes: `UI06_RUNTIME_PENDING` / `UI06_BILATERAL_NOT_RUN`. A proposta focal [UI-06](ui06-runtime-proposal.md) cobre somente shell; UI-06 global exige também área/coleta/IHFR com B. `UI037_CAPTURE_PENDING` é lacuna separada de arquivamento. `HUMAN_ACCEPTANCE_PENDING` e `GEOCODER_OPERATIONAL_PENDING` permanecem explícitos. Matriz por requisito, tarefa e fonte em [evidências](implementation-evidence.md).

As decisões UI de Pedro no handoff #44 não mudam. IHFR conserva `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO` e `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

## Histórico anterior à reconciliação A6

As afirmações temporais abaixo pertencem aos respectivos checkpoints; o estado corrente é o A6 acima. Relatos antigos de CI pendente, ambiente não observável e ferramentas indisponíveis não descrevem esta sessão.

**Feature Branch**: `feat/ajustes-navegacao-conta`
**Created**: 2026-10-31
**Status**: Implementação publicada para validação; checks funcionais e aceite humano dependem da execução no SHA final. O estado G0 anterior permanece como histórico.
**Input**: UI-01, UI-05 e UI-06 no shell/conta/navegação, aprovadas por Pedro no handoff #44; organização ratificada na missão HF-UI-044-G0.
**Base exata**: `07755822f5dc75fe2be1d924005d30ed99f64a0b` (guards); não começar de setup, #44 ou de outra feature.

## Fontes e autoridade

[Decisões completas](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030/decisoes-e-escopo.md), [critérios](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030/criterios-de-aceite.md) e [plano G0](../../docs/plans/active/hf-ui044-g0/plan.md). Fonte visual starter `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`; screenshots do handoff são históricos, não evidência deste HEAD.

As decisões UI são DECISAO_CONFIRMADA; prioridades técnicas abaixo são RECOMENDACAO de organização, não nova decisão de produto. Constituição, AGENTS e estados Code-First preservados. Não promover o PRD em revisão a norma final.

## User Scenarios & Testing

### US1 — Navegar com contexto e reencontrar a conta (P1)

A pessoa autenticada identifica o contexto ativo e acessa as opções apropriadas sem menus duplicados.

**Teste independente**: entrar no workspace sem laboratório selecionado; selecionar um laboratório; navegar e voltar; abrir a conta.

**Aceite**: sem laboratório ativo, não exibir Áreas como destino sem contexto. Conta agrupa senha e exclusão. Dentro de laboratório, Resumo/Áreas/Mapa/Membros ficam na navegação lateral desktop, sem a antiga navegação horizontal duplicada. Cabeçalho preserva identidade, contexto e saída, sem mudar autorização ou rotas reais.

### US2 — Navegar em tela pequena sem conteúdo encoberto (P1)

**Teste independente**: nas mesmas rotas, navegar pela barra inferior contextual, rolar até o último controle, abrir/fechar menu e usar histórico.

**Aceite**: barra mobile compacta, contextual e sem duplicidade; safe-area e conteúdo final acessíveis; teclado/foco, voltar/avançar e reload preservados. O shell não cobre botões, diálogos ou mensagens das páginas de B/C.

### US3 — Aproximar a apresentação do starter sem copiar sua lógica (P2)

**Teste independente**: comparação de runtime starter/FullStack nos mesmos estados e viewports, com capturas viewport reais.

**Aceite**: hierarquia, proporções e tipografia Poppins coerentes; adaptação TanStack → Next.js App Router, sem copiar mocks, personas ou autenticação fictícia.

### Edge Cases

Sessão restrita/expirada, troca de laboratório, URL direta, nomes longos, menu aberto durante navegação, erro/loading/vazio, zoom textual 200%, paisagem e insets mobile. Não mudar regras de acesso para facilitar navegação.

## Requirements

- **FR-035-001**: aplicar UI-01 ao workspace, shell e conta conforme US1.
- **FR-035-002**: aplicar UI-05 com navegação mobile contextual e safe-area.
- **FR-035-003**: aplicar UI-06 somente no ownership A, com evidências comparativas atuais.
- **FR-035-004**: preservar autenticação, políticas de senha/exclusão, autorização contextual, rotas e dados reais.
- **FR-035-005**: não editar vercel.json ou rc-review.yml; já herdados dos guards.

Entidades existentes reutilizadas: sessão, pessoa e contexto de laboratório. Não há novo modelo de domínio aprovado por esta preparação. Completar rastreabilidade Code-First por identificadores inteiros e leitura das specs 018/019 no planejamento técnico.

## Success Criteria

**SC-035-001**: cenários US1–US3 e contraprovas de acesso passam nos testes próprios, com SHA e logs.
**SC-035-002**: 320, 375/390, 768 e 1440 px, texto 200% e teclado sem navegação redundante ou último controle inacessível.
**SC-035-003**: capturas `fullPage: false`, geometria/overflow e estados reais acompanhados de evidência; capturas antigas não substituem os testes.
**SC-035-004**: quinze gates existentes preservados e resultados reais registrados, sem confundir check verde com aceite humano.

## Assumptions and limits

Reutilizar a stack e APIs existentes; implementação e inspeção detalhada ainda pertencem ao executor A. Não implementar B/C, REV-01–REV-03, ciência, provedores ou deploy. Nenhum novo aceite humano é concedido. [Plano](plan.md), [tarefas](tasks.md), [evidências](implementation-evidence.md).

## Registro de implementação — 31/10/2026

`EVIDENCIA_IMPLEMENTACAO` de código: o workspace não oferece Áreas sem contexto; no laboratório, uma única navegação contextual contém retorno à seleção, Resumo, Áreas, Mapa e Membros somente quando o layout servidor autorizado informa OWNER. Cabeçalho agrupa senha/exclusão em Conta; Sair utiliza a rota existente `/logout`. A navegação interna mobile é fixa ao rodapé com `env(safe-area-inset-bottom)`, enquanto o desktop usa trilho lateral. O shell protege visibilidade do foco perante a barra móvel. Esses enunciados dizem respeito aos arquivos de implementação, **não** a um PASS de E2E neste documento.

**Rastreabilidade:** UI-01 → FR-035-001/004, US1; UI-05 → FR-035-002/004, US2; UI-06 → FR-035-003, US3 (comparação de runtime do starter pendente). Code-First (EM_REVISAO): CF-PRD-FR-003/004/011, CF-US-004/005/007/008 e CF-UC-004/006/016/017; contratos implementados das specs 018/019. Nenhuma regra nova de laboratório, permissão, conta ou sessão foi aprovada.

**Limite objetivo:** UI-06 exige execução real de starter e FullStack no mesmo estado/viewport; screenshots originais da PR #44 são apenas referência. O gate visual completo permanece NOT_RUN até haver as duas execuções e comparação documentada. Resultados reais da Actions ficam na descrição da PR #46, sempre associados ao SHA/tentativa.

## Estado factual CLOSE02 — coleta R3, 01/11/2026

O requisito FR-035-003 agora possui execução bilateral real e[análise atual](evidence/close02-r3-visual-analysis.md): run41356318087/1, SHAebf7e970,86pares/172PNGs completos. **UI06_A_EVIDENCE_COMPLETE** qualifica a coleta, não aprovação da tipografia/US3 ou aceite humano.79paresNON_EQUIVALENT e6regiõesmainstarterUNOBSERVED continuam explícitos. HUMAN_TYPOGRAPHY_REVIEW_PENDING/HUMAN_ACCEPTANCE_PENDING e bloqueioUI06_B permanecem. Este adendo substitui somente oNOT_RUN da comparaçãoA nos parágrafos históricos; não muda intenção, requisitos ou resultados antigos.
