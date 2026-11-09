# HF-UI-044 — Execução da Frente A — Navegação, conta e shell responsivo

**Missão independente.** Implementar UI-01, UI-05 e UI-06 na branch `feat/ajustes-navegacao-conta` / PR Draft #46 (destino `development`).

## Antes de alterar qualquer arquivo

Leia integralmente, nesta ordem, as fontes versionadas:

1. [Dossiê G0 da execução](../handoff-de-execucao.md) e [índice da preparação](../README.md), incluindo todas as evidências disponíveis. Se o ZIP estiver no repositório, trate-o como cópia histórica e confira hashes antes de utilizar.
2. [Decisões e escopo aprovados de Pedro](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030/decisoes-e-escopo.md), e no mesmo SHA: `prompt-de-execucao.md`, `plano-de-execucao.md`, `criterios-de-aceite.md`, `referencias-visuais.md` e `evidencias-de-preparacao.json`.
3. `AGENTS.md`, `PROJECT_CONTEXT.md`, `TECH_DECISIONS.md`, `PLANS.md`, constituição Spec Kit, `SOURCE_AUTHORITY.md`, `docs/code-first-prd/` e `specs/035-ajustes-navegacao-conta/` no HEAD efetivo da branch.
4. [PR Draft #46](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/46) e a [PR de guards #45](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/45); observe HEADs reais, dependências, ownership e resultados de Actions.

**Checkpoint do G0, não alvo de reset:** `55e00b531c9691c1b568fc83e86c0ccf176430fd`. **GUARD_SHA ancestral congelado:** `07755822f5dc75fe2be1d924005d30ed99f64a0b`. Confirme novamente HEAD/merge-base e preserve commits concorrentes; não force-push ou recrie os artefatos já publicados.

## Instruções integrais do recorte

Retome HidroFlorestaStartup/HidroFlorestas-FullStack, branch feat/ajustes-navegacao-conta, PR Draft #46 para development.
Checkpoint G0: 55e00b531c9691c1b568fc83e86c0ccf176430fd.
Base comum congelada: 07755822f5dc75fe2be1d924005d30ed99f64a0b.
Reserva exclusiva: specs/035-ajustes-navegacao-conta/.
Leia integralmente o pacote aprovado de #44 no SHA 972f9b00189bf09117883913d8c4fa63e69f4d2f, a governança aplicável e os quatro documentos da reserva.
Confira HEADs/ancestralidade, guardas, PRs, upstreams/worktrees/alterações locais quando aplicável. Se o HEAD avançou, reconcilie e preserve o trabalho; não resete para o checkpoint.
Complete o fluxo Spec Kit e o mapa de paths/contratos/testes na mesma reserva. Não abra nova branch/spec/PR para duplicar este início.
Preserve Resumo/Áreas/Mapa/Membros no contexto correto, conta agrupando senha/exclusão, rotas e autorização reais. Implemente navegação inferior mobile contextual com safe-area e último controle acessível. Compare starter/FullStack executados nos mesmos estados e viewports; não copie mocks, personas ou TanStack Router. B/C não escrevem no shell em paralelo.
Vercel/workflow são somente leitura. Encaminhe deltas compartilhados ao coordenador com hunks, contrato e testes; não absorva outras frentes nem automated-setup.
Consulte o run G0 41216365650 por SHA/tentativa antes de alegar baseline verde. Execute testes próprios e gates preservados no HEAD de implementação; registre PASS/FAIL/NOT_RUN e evidências reais.
Atualize spec/plano/tarefas/evidências e o PR próprio, apresentando diff exclusivo contra GUARD_SHA e acumulado contra development atual.
Sem merge, deploy, escrita em main/development/#44, Neon, migrations hospedadas, SMTP, Cloudinary, alterações científicas ou REV-01–REV-03. Não simule revisão independente ou aprovação humana.

## Entrega e condições de aceite

Não encerre só em planejamento: implemente o código real de produto, testes, provas visuais e documentação da própria spec, publique commits na branch e atualize a PR Draft existente. Verifique os checks no SHA final e registre limitações. Se o ambiente impedir publicar, reporte bloqueio real e preserve resultados; não simule execução. Use subagentes nativos somente se realmente disponíveis, com ownership e revisão independente comprovados. **Sem merge, deploy, mudanças em main/development/#44, Neon, migrations hospedadas, SMTP, Cloudinary, alterações científicas ou REV-01–REV-03.**
