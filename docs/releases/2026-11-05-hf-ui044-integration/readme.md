# Integração UI-044 — candidata para testes manuais

## Encerramento vigente — 06/11/2026

O aceite anterior com três ressalvas foi concluído: [PR53](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/53), merge865054b, com [aprovação manual de Pedro](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/53#pullrequestreview-5800053435). A candidata1f305fb passou pelos quinze gates/E2E244 e pelo Codex; a árvore do merge é idêntica à candidata. As ressalvas C1–C3 não permanecem pendentes.

O histórico da integração51, a proveniência e os snapshots abaixo continuam íntegros. As PRs44–48/50 foram encerradas sem reaplicar seus códigos. [Consolidação e evidências](../../plans/active/encerramento-prs-ui044-20261106/plano-de-execucao.md) distinguem recibos históricos de41/52 do estado atual. Sem novo deploy, operação de banco ou validação científica.

## Fechamento vigente — integrada com três ressalvas de UX

Em 05/11/2026, Pedro aprovou o restante da usabilidade, design e aparência testados, confirmou as três correções e autorizou o merge. [Recibo de aceite](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/51#issuecomment-6671722605). PR51 integrada em `7bae1f87cb8d6a708b7c4de0b990e82e5a503369`, tree0c836da964c377a7d1e6bc8b2331524e931ea901, idêntica ao head febee101aa. CI42101827226/1: quinze gates PASS/E2E241; Codex Review concluída sem findings nesse head. Não houve nova suíte no merge nem aprovação científica/operacional.

Próxima execução: [prompt das três correções](../../plans/active/correcoes-finais-ui044-20261105/prompt-de-execucao.md), [recibo detalhado](../../plans/active/correcoes-finais-ui044-20261105/aceite-e-integracao.json). Correções ainda PENDENTES. A autorização inicial e os estados de preparação abaixo são preservados como histórico, superados neste alcance pela decisão posterior de Pedro. Sem autoaprovação formal, deploy ou limpeza.

Estado: PREPARADA_PARA_CI_E_PREVIEW; HUMAN_ACCEPTANCE_PENDING. Data: 05/11/2026, America/Fortaleza.

## Autoridade
DECISAO_CONFIRMADA: Pedro autorizou iniciar a preparação recomendada nesta conversa (“Okay, vamos iniciar / O que faremos agora?”): PR única, reconciliação e Preview isolado para repetir testes manuais. Merge, Production, encerramento de PRs e limpeza/exclusão não foram autorizados. Nenhum aceite de Luciano ou aprovação visual final foi inferido.

## Fontes e composição
Development-base9b8595d232842d401ce81bbc92c54dd543aa2829; mainbeba96fbf6bbaac8771dbb29abea2f9f8f5b0054.
Candidata técnica3c9b9c83e3abca48ede0b8c4f03343e4b4aa3698, PR50 baseada49. Sua CI41488874486/1 e revisão Codex são evidências históricas desse SHA, não PASS desta integração.

A composição preserva integralmente os blobs da candidata50, exceto os arquivos explicitamente reconciliados de documentação/configuração. Conteúdos originais44 e G045 ausentes e quatro recibosA/B voltam aos caminhos originais. Variantes divergentes035/036, governança e configuração ficam preservadas por blob em source-snapshots, sem substituir as specs finais50. Não há cherry-pick de código A/B/C nem implementação duplicada.

[Proveniência por caminho](proveniencia.json) e [matriz de reconciliação](matriz-de-reconciliacao.md).
[Plano da execução](../../plans/active/integracao-ui044-20261105/plano-de-execucao.md).
[Guia original fornecido por Thales](handoff-original-20261102.md).

Os snapshots preservam os bytes de cada fonte histórica. Links relativos dentro deles pertencem à localização original; use as URLs imutáveis da matriz para ler no contexto da fonte. Não são o estado decisório ou runtime atual.

## Validação a executar no novo SHA
CI oficialRC de quinze gates, sem alteração de runner, permissões, ações ou gates. A branch aparece somente como novo alvo no filtro e condição de acionamento do workflow já existente. Preview Git automático bloqueado, developmentfalse preservado.

UI06-B75/75, UI06-A86 e seus PNGs são evidências anteriores, com reutilização delimitada pela igualdade dos blobs relevantes; não foi declarado novo PASS bilateral deste SHA. A CI e o smoke hospedado desta candidata terão seus resultados registrados por SHA/run/tentativa. Sem rerun indiscriminado ou fabricação de aceite humano.

As threads históricas P1 scroll-owner/P2 rounded-hit da PR50 devem ser lidas com os reparos e recibo terminal3c9b9c8; não foram convertidas em findings novos nem encerradas por inferência. A nova PR tem revisão própria.

## Preview de aceite
Preparar cópia isolada do banco sintético de demonstração, conservando o banco/Preview anteriores e seus dados de testes. Somente variáveis de Preview por branch, origem canônica estável e proteção SSO preservada. CAPAS_OFF. SMTP/scheduler e homologação do geocodificador externo continuam separados.

O roteiro humano deve conferir UI-01–UI-07, inclusive diferenças visuais NON_EQUIVALENT, a observação do logo em844px e o aviso histórico de hidratação. Não usar o Preview antigo para aprovar esta candidata sem identificar a versão.

## Limites
Nenhum merge, promoção Production, exclusão ou fechamento de PR por esta preparação. GEOCODER_OPERATIONAL_PENDING e aceite humano continuam pendentes. Município/UF/CEP opcionais e os três modos de entrada não autorizam ativação de provedor real por inferência.
IHFR: CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO, NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
