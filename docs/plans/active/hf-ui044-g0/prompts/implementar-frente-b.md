# HF-UI-044 — Execução da Frente B — Área, coletas e IHFR

**Missão independente.** Implementar UI-02, UI-03, UI-04 e UI-06 na branch `feat/ajustes-area-coletas-ihfr` / PR Draft #47 (destino `development`).

## Antes de alterar qualquer arquivo

Leia integralmente, nesta ordem, as fontes versionadas:

1. [Dossiê G0 da execução](../handoff-de-execucao.md) e [índice da preparação](../README.md), incluindo todas as evidências disponíveis. Se o ZIP estiver no repositório, trate-o como cópia histórica e confira hashes antes de utilizar.
2. [Decisões e escopo aprovados de Pedro](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030/decisoes-e-escopo.md), e no mesmo SHA: `prompt-de-execucao.md`, `plano-de-execucao.md`, `criterios-de-aceite.md`, `referencias-visuais.md` e `evidencias-de-preparacao.json`.
3. `AGENTS.md`, `PROJECT_CONTEXT.md`, `TECH_DECISIONS.md`, `PLANS.md`, constituição Spec Kit, `SOURCE_AUTHORITY.md`, `docs/code-first-prd/` e `specs/036-ajustes-area-coletas-ihfr/` no HEAD efetivo da branch.
4. [PR Draft #47](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/47) e a [PR de guards #45](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/45); observe HEADs reais, dependências, ownership e resultados de Actions.

**Checkpoint do G0, não alvo de reset:** `353a3fd00bc7d4155ab3fc2f17ad063e7108d68f`. **GUARD_SHA ancestral congelado:** `07755822f5dc75fe2be1d924005d30ed99f64a0b`. Confirme novamente HEAD/merge-base e preserve commits concorrentes; não force-push ou recrie os artefatos já publicados.

## Instruções integrais do recorte

Retome HidroFlorestaStartup/HidroFlorestas-FullStack, branch feat/ajustes-area-coletas-ihfr, PR Draft #47 para development.
Checkpoint G0: 353a3fd00bc7d4155ab3fc2f17ad063e7108d68f.
Base comum congelada: 07755822f5dc75fe2be1d924005d30ed99f64a0b.
Reserva exclusiva: specs/036-ajustes-area-coletas-ihfr/.
Leia integralmente o pacote aprovado de #44 no SHA 972f9b00189bf09117883913d8c4fa63e69f4d2f, a governança aplicável e os quatro documentos da reserva.
Confira HEADs/ancestralidade, guardas, PRs, upstreams/worktrees/alterações locais quando aplicável. Se o HEAD avançou, reconcilie e preserve o trabalho; não resete para o checkpoint.
Complete o fluxo Spec Kit e o mapa de paths/contratos/testes na mesma reserva. Não abra nova branch/spec/PR para duplicar este início.
Preserve ocorrência em campo/offsets, confirmado/draft e estado vigente/substituído/revogado. Exiba origem e ocorrência do IHFR disponível, mesmo de coleta anterior. A seleção do primeiro diagnóstico vigente entre coletas ordenadas por ocorrência é INFERENCIA operacional do handoff, a confirmar contra contratos, não nova decisão aprovada. Preserve os quatro qualificadores experimentais acessíveis e a orientação humana sobre falta de dados confirmados. Não altere fórmula, ciência, manifestos ou hashes científicos.
Vercel/workflow são somente leitura. Encaminhe deltas compartilhados ao coordenador com hunks, contrato e testes; não absorva outras frentes nem automated-setup.
Consulte o run G0 41216396078 por SHA/tentativa antes de alegar baseline verde. Execute testes próprios e gates preservados no HEAD de implementação; registre PASS/FAIL/NOT_RUN e evidências reais.
Atualize spec/plano/tarefas/evidências e o PR próprio, apresentando diff exclusivo contra GUARD_SHA e acumulado contra development atual.
Sem merge, deploy, escrita em main/development/#44, Neon, migrations hospedadas, SMTP, Cloudinary, alterações científicas ou REV-01–REV-03. Não simule revisão independente ou aprovação humana.

## Entrega e condições de aceite

Não encerre só em planejamento: implemente o código real de produto, testes, provas visuais e documentação da própria spec, publique commits na branch e atualize a PR Draft existente. Verifique os checks no SHA final e registre limitações. Se o ambiente impedir publicar, reporte bloqueio real e preserve resultados; não simule execução. Use subagentes nativos somente se realmente disponíveis, com ownership e revisão independente comprovados. **Sem merge, deploy, mudanças em main/development/#44, Neon, migrations hospedadas, SMTP, Cloudinary, alterações científicas ou REV-01–REV-03.**
