# HF-UI-044-CLOSE-OPS — conciliar as tarefas operacionais encaminhadas a Pedro e Luciano

**Ambiente:** nova conversa com GitHub; Gmail apenas para ler o e-mail anterior se conectado. **Trilha separada do fechamento de código A/B/C**, podendo iniciar em paralelo. **Escopo estrito:** verificar e organizar responsabilidades, evidências e perguntas de decisão; nenhuma operação hospedada é autorizada por este prompt.

**Origem do encaminhamento:** e-mail de 25/10/2026 "HidroFloresta | Entrega técnica concluída e encaminhamentos para homologação", à equipe. Documentação canônica de entrada no `development@9b8595d232842d401ce81bbc92c54dd543aa2829`:
- `docs/releases/2026-10-25-hf-close-01/conclusao-instrucoes-alunos.md` (seis instruções históricas);
- `docs/releases/2026-10-25-hf-close-01/pendencias-operacionais.md` (G3/G4/G5, restauração e aceite);
- PRs #40 (ciclo técnico encerrado) e #41 (demonstração isolada), #44–#48 (novos ajustes UI).

## Fontes de autoridade e preflight — obrigatório

1. Repositório `HidroFlorestaStartup/HidroFlorestas-FullStack`. Leia `AGENTS.md` aplicáveis, `PLANS.md`, `PROJECT_CONTEXT.md`, `TECH_DECISIONS.md`, `.specify/memory/constitution.md`, `docs/governance/SOURCE_AUTHORITY.md`, PRD Code-First e as skills `speckit-*` realmente instaladas.
2. Leia integralmente as decisões de Pedro no [handoff #44](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030/decisoes-e-escopo.md), mais `prompt-de-execucao.md`, `plano-de-execucao.md`, `criterios-de-aceite.md`, `referencias-visuais.md` e `evidencias-de-preparacao.json` nesse SHA. Os sete ajustes UI-01–UI-07 estão aprovados; REV-01–REV-03 não.
3. Consulte o [handoff G0 completo](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/01a2b0fe99da470b1ecc1b7f8e785b7023f81cb2/docs/plans/active/hf-ui044-g0/handoff-de-execucao.md), as PRs #45–#48 e as specs 035–037 nos HEADs **novamente observados**. `GUARD_SHA=07755822f5dc75fe2be1d924005d30ed99f64a0b`, `development` histórico `9b8595d232842d401ce81bbc92c54dd543aa2829`. Não trate SHAs históricos como alvo de reset.
4. Antes de editar, examine branches/upstreams, histórico/ancestralidade, worktrees e alterações não commitadas no ambiente que realmente controla, PRs/commits concorrentes, scripts e o banco sintético permitido. Conserve todo trabalho alheio. Se não puder observar máquina local, diga `LOCAL_WORKTREES_NOT_OBSERVABLE`; não invente preflight.
5. Use Spec Kit **ANALYZE → PLAN → IMPLEMENT → REVIEW** conforme o recorte; não crie nova numeração se a spec já existe. Delegue subagentes **apenas** se houver ferramenta real; caso contrário `NATIVE_SUBAGENTS_NOT_AVAILABLE`, sem revisão independente simulada.

## Limites invariantes

Não executar merge, auto-merge, deploy, promoção, alterações em `main`/`development`/PR #44, Neon, migrations hospedadas, SMTP real, Cloudinary, ativação de geocodificador, nem mudança científica. Não absorber `feature/automated-setup`; não editar `vercel.json` ou `.github/workflows/rc-review.yml` em branches funcionais. Preservar autenticação/autorização, drafts vs confirmados, idempotência, quatro qualificadores do IHFR experimental e os quinze gates sintéticos. `PASS`, `FAIL` e `NOT_RUN` são por **SHA, run e tentativa**, nunca herdados. Sem aprovação humana fictícia.

## Evidências e distinções

- O ciclo técnico da PR #40 foi encerrado em `development` em 25/10; não reabrir as seis instruções técnicas nem afirmar que a limpeza adiada, provedores e aceites foram concluídos por CI.
- G3: identificar responsável/ambiente/autoridade para contas, SMTP real (envio **e recebimento** em inbox autorizado) e scheduler FullStack, sem chaves/destinatários reais ou ativação agora.
- G4: identificar autoridade e decisão explícita `CAPAS_OFF` ou `CAPAS_ON`, usos e aceites de responsividade, navegação, acessibilidade, dispositivos reais; `CAPAS_OFF` da demo não equivale necessariamente a decisão vinculante do piloto.
- G5: plataforma/banco isolado, papéis, backups, RPO/RTO e restore em destino descartável com evidências, responsáveis por aceite, participantes autorizados, suporte/janela; não presumir que bootstrap/teste sintético homologa recuperação.
- UI-07: seleção/ativação operacional do geocodificador, privacidade, atribuição, licença, limites de uso, rate-limit/caching; os testes mock e a persistência CEP não provam provedor real.
- Ciência IHFR: autoridade e validação experimental separadas, não governadas por decisão operacional ou um gate E2E.

## Trabalho autorizado — somente ANALYZE / PLAN / HANDOFF

1. Compare e-mail, docs, PRs e recibos com o estado observado: `CONCLUIDO_COM_EVIDENCIA`, `EM_ANDAMENTO`, `NAO_COMPROVADO`, `AGUARDA_DECISAO`, identificando fonte/SHA e período. Nenhuma pessoa vira responsável só por ser destinatária ou autor de commit.
2. Gere matriz curta por G3/G4/G5/provedor UI-07/científico: próxima ação, autoridade, evidência necessária, status real e dependência. Diferencie pronta infraestrutura de autorização/funcionamento.
3. Prepare **uma mensagem copiável e pronta para revisão** a Pedro e Luciano com perguntas objetivas: designações, ambiente isolado e autorização, decisão capas, critérios/participantes/suporte/janela, fornecedor de geocodificação. Sem credenciais, segredos, acesso pessoal, promessas de data ou exigência de novas tarefas técnicas já encerradas.
4. Publique documentação factual no comentário da PR #45 apenas se realmente acrescentar conclusão verificável sem apagar histórico; antes de postar, confira permissões/escopo. **Não envie e-mail automaticamente**; não faça deploy, SMTP, Cloudinary, Neon, migration, backup/restore ou chamada ao fornecedor sem autorização operacional específica.

**Saída:** matriz de quitação efetiva das tarefas dos alunos, texto de encaminhamento com botão de copiar, pendências operacionais separadas de `HF-UI-044`, e próximo ato humano mínimo. Não rotular a homologação como concluída sem prova.
