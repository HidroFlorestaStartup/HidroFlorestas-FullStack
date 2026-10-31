# Feature Specification: navegação, conta e shell responsivo

**Feature Branch**: `feat/ajustes-navegacao-conta`
**Created**: 2026-10-31
**Status**: Draft — preparação G0; produto NAO_IMPLEMENTADO nesta frente.
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
