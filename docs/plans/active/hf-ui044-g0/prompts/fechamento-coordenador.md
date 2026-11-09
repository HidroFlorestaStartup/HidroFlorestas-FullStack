# HF-UI-044-CLOSE-COORD — consolidação final e decisão de prontidão de integração

**Ambiente:** ChatGPT Work/Pro com GitHub. **Owner:** coordenador, único integrador autorizado para arquivos compartilhados; **não é licença para merge/deploy**. **Início:** após as frentes A, B, C concluírem seus follow-ups e a QA emitir parecer, embora leitura prévia possa avançar sem esse bloqueio.

**Missão:** reconciliar o pacote aprovado da PR #44 com o estado efetivo das PRs Draft #45 (guards), #46 (A), #47 (B), #48 (C), sem reiniciar o desenvolvimento nem executar integração irreversível.

## Fontes de autoridade e preflight — obrigatório

1. Repositório `HidroFlorestaStartup/HidroFlorestas-FullStack`. Leia `AGENTS.md` aplicáveis, `PLANS.md`, `PROJECT_CONTEXT.md`, `TECH_DECISIONS.md`, `.specify/memory/constitution.md`, `docs/governance/SOURCE_AUTHORITY.md`, PRD Code-First e as skills `speckit-*` realmente instaladas.
2. Leia integralmente as decisões de Pedro no [handoff #44](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030/decisoes-e-escopo.md), mais `prompt-de-execucao.md`, `plano-de-execucao.md`, `criterios-de-aceite.md`, `referencias-visuais.md` e `evidencias-de-preparacao.json` nesse SHA. Os sete ajustes UI-01–UI-07 estão aprovados; REV-01–REV-03 não.
3. Consulte o [handoff G0 completo](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/01a2b0fe99da470b1ecc1b7f8e785b7023f81cb2/docs/plans/active/hf-ui044-g0/handoff-de-execucao.md), as PRs #45–#48 e as specs 035–037 nos HEADs **novamente observados**. `GUARD_SHA=07755822f5dc75fe2be1d924005d30ed99f64a0b`, `development` histórico `9b8595d232842d401ce81bbc92c54dd543aa2829`. Não trate SHAs históricos como alvo de reset.
4. Antes de editar, examine branches/upstreams, histórico/ancestralidade, worktrees e alterações não commitadas no ambiente que realmente controla, PRs/commits concorrentes, scripts e o banco sintético permitido. Conserve todo trabalho alheio. Se não puder observar máquina local, diga `LOCAL_WORKTREES_NOT_OBSERVABLE`; não invente preflight.
5. Use Spec Kit **ANALYZE → PLAN → IMPLEMENT → REVIEW** conforme o recorte; não crie nova numeração se a spec já existe. Delegue subagentes **apenas** se houver ferramenta real; caso contrário `NATIVE_SUBAGENTS_NOT_AVAILABLE`, sem revisão independente simulada.

## Limites invariantes

Não executar merge, auto-merge, deploy, promoção, alterações em `main`/`development`/PR #44, Neon, migrations hospedadas, SMTP real, Cloudinary, ativação de geocodificador, nem mudança científica. Não absorber `feature/automated-setup`; não editar `vercel.json` ou `.github/workflows/rc-review.yml` em branches funcionais. Preservar autenticação/autorização, drafts vs confirmados, idempotência, quatro qualificadores do IHFR experimental e os quinze gates sintéticos. `PASS`, `FAIL` e `NOT_RUN` são por **SHA, run e tentativa**, nunca herdados. Sem aprovação humana fictícia.

## ANALYZE

- Leia na íntegra os prompts de fechamento A/B/C/QA e resultados **efetivamente publicados**; confirme branches, PRs abertas, comentários, reviews reais, HEADs, merge-base, pipelines por tentativa, gates, artefatos, ownership e ausência de alterações indevidas. Não usar os snapshots iniciais dos prompts como HEAD final.
- Reconcilie `specs/035`, `036`, `037` com a matriz de 13 cenários de aceite UI-01–UI-07 da #44. Distinguir trabalho implementado, teste unitário/integração/E2E, comparação bilateral UI-06, composição A+B+C, revisão independente e aceite humano. Audite checklist: não manter T concluída como [ ] sem observação, nem marcar como [x] algo `NOT_RUN`.
- Confira guarda Preview `false` nas quatro branches e a documental #44, filtros de push/if, 15 gates intactos e tratamento do shared commit; #45 recebeu documentação de handoff posterior ao GUARD_SHA que **não é ancestral de A/B/C**. Não conflar os dois SHAs.
- Verifique que as correções CEP opcionais e testes de geocodificador sintético estão concluídos em C; operação com fornecedor real é gate separado. Não reabrir REV-01–REV-03 ou fórmula científica.

## PLAN / PREPARE / REVIEW

- Matriz para cada frente: `BRANCH`, `HEAD`, `GUARD_SHA`, `DIFF_EXCLUSIVO`, `DIFF_ACUMULADO`, testes por run/tentativa/artefato, evidências visuais, findings, arquivos compartilhados, estado Spec Kit, decisões humanas/operacionais pendentes.
- Trate toda colisão de arquivos/hunks por writer explicitamente alocado; nenhum transplante silencioso entre A/B/C. Se QA ainda não testou composição, marque `COMPOSITION_UNVERIFIED` e prepare comando/ambiente seguro de execução, sem alegar readiness completo.
- Publique relatório de coordenação **no comentário da PR #45**, sem sobrescrever históricos/documentos de outros owners. Se for indispensável editar qualquer configuração compartilhada, exigir novo diff autorizado, guard seguro antes de push e CI no SHA exato; por padrão, este prompt é só revisão/handoff.
- **Ordem futura proposta, NÃO executada aqui:** reconciliação da PR documental #44 e #45 preservando a união de `vercel.json`; integrar #45 antes de A/B/C mediante autorização do mantenedor; depois A, B e C na ordem compatível com dependências, revalidando em `development` cada merge efetivamente autorizado. Se houver squash/rebase de guards, transportar apenas deltas exclusivos após GUARD_SHA, sem duplicar regras.
- Registre `READY_FOR_MAINTAINER_REVIEW` somente se A/B/C CI válido, prova bilateral UI-06, QA independente com composição realmente exercitada ou limitação aceita expressamente pelo mantenedor, nenhum finding bloqueante e rastreabilidade íntegra. Caso contrário `CLOSEOUT_BLOCKED` ou `READY_WITH_NAMED_GAPS`, com itens exatos. Não simular aceites, testes em dispositivo físico, leitores de tela ou validação científica.

**Saída:** parecer conclusivo na PR #45, prioridades de integração e checklist por PR, SHAs, runs, evidências faltantes e decisões para o mantenedor. **Não** fechar Drafts nem executar merge, aprovação humana, deploy, banco ou provedor.
