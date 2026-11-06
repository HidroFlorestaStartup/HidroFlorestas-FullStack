# Plano — aceite, integração e handoff das correções UI-044

## Estado vigente — executado, aceito e integrado em 06/11/2026

Este é um mandato histórico já executado. C1, C2 e C3 foram implementadas na [PR #53](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/53), testadas manualmente e [aprovadas por Pedro](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/53#pullrequestreview-5800053435), e integradas em development no merge `865054b53e5820582d7956a29dc95fc9a2690bd8`. Não reexecutar estas instruções como trabalho pendente. O texto de 05/11 permanece preservado abaixo, com seus estados e evidências daquele corte.

A CI42157996425/1 e a revisão Codex pertencem ao head1f305fb da correção; a árvore do merge foi conferida igual à candidata. A organização das PRs é documentada no [plano de encerramento](../encerramento-prs-ui044-20261106/plano-de-execucao.md). Este registro não atribui aceite a Luciano, homologação operacional ou validação científica.

ID HF-UI044-ACEITE-20261105. Estado AGUARDANDO_REVISAO. Data 05/11/2026 (America/Fortaleza).

## Objetivo e autoridade

DECISAO_CONFIRMADA: Pedro aprovou a usabilidade, design e aparência da entrega testada, com somente três correções indicadas, e autorizou registrar seu aceite, integrar a candidata e publicar instruções para outro desenvolvedor. Origem: mensagem desta conversa em 05/11/2026. Não atribuir aceite a Luciano, homologação operacional ou validação científica.

## Estado inicial e preservação

PR51 Draft, head febee101aa718de5b236f99f8080621c405a1d7f; development 9b8595d232842d401ce81bbc92c54dd543aa2829; main beba96fbf6bbaac8771dbb29abea2f9f8f5b0054. CI42101827226/1 concluída SUCCESS; Codex Review concluída no mesmo head, sem findings. Logs oficiais sendo conferidos. Trabalho via API Git e diretório novo; nenhum checkout/worktree anterior será modificado. Não há inventário de outras máquinas.

## Escopo, fontes e etapas

AGENTS/PLANS, constituição e SOURCE_AUTHORITY regem a documentação; decisão atual de Pedro rege UX. Prints originais 1–3 fornecidos por Pedro são apoio visual de origem identificada. Código e CI são EVIDENCIA_IMPLEMENTACAO, não aceite de design.

1. Conferir quinze gates e identidade do head, registrar aceite e limites na PR51; retirar Draft e integrar por merge commit com expected_head_sha, sem autoaprovação.
2. Verificar SHA/tree resultantes e main preservada. Não mesclar indiscriminadamente PRs44–50.
3. Publicar branch documental a partir da nova development, com prompt, recibo, originais 1–3 e registros navegacionais atualizados; preservar os textos históricos de preparação.
4. Verificar diff/escopo, links, JSON, hashes de imagens e igualdade de código/testes/configuração fora do guard documental; abrir PR documental para development e entregar link direto do prompt.

## Conteúdo das correções futuras

C1: retirar link redundante IHFR dos cards das coletas; score da própria coleta é preferido apenas se simples usando dados existentes; alternativa aprovada mantém somente Abrir coleta/Dados ambientais. C2: aviso de limites somente em LEITURA DA COLETA. C3: mobile na ordem Leitura, Registro, Dados ambientais, Ações; desktop preservado. Nenhuma correção de produto será implementada nesta publicação de instruções.

## Riscos, limites e pontos de parada

Bloqueio real de CI, drift material ou conflito impede somente o merge afetado. Não dispensar gates/reviews nem criar autoaprovação. Desenvolvimento das correções, commits, push e PR futuro ficam autorizados no prompt; merge futuro fica com Pedro. Deploy, Production, limpeza de branches, geocodificador real, SMTP, scheduler e banco hospedado não integram esta tarefa. Contrato IHFR permanece experimental. Escolhas rotineiras seguem o mandato sem confirmação adicional.

## Validação, encerramento e histórico

Planejados: logs do head exato, conferência de merge/tree, preservação histórica, escopo documental, links e hashes. Sem nova suíte funcional para esta mudança documental se a árvore funcional for preservada. Ao publicar, atualizar resultados e pendências nesta trilha.

05/11: pedido explícito recebido; PR/refs/CI/review e governança conferidos. Handoff em preparação.

05/11: aceite de Pedro registrado no comentário6671722605; #51 integrado em7bae1f87cb8d6a708b7c4de0b990e82e5a503369, árvore idêntica à candidata. Quinze gates PASS/E2E241 e Codex Review sem findings no headfebee101aa. Mainbeba96f preservada. Handoff, recibo, originais e apontadores preparados; links, JSON e preservação documental verificados. Publicação documental para revisão; correções futuras seguem PENDENTES. Nenhuma suíte funcional repetida, código alterado, deploy ou limpeza.
