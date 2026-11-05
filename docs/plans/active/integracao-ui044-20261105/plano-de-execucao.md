# Plano — integração UI-044 e Preview de aceite

## Encerramento da integração e atualização documental — 05/11/2026

Estado vigente do plano: AGUARDANDO_REVISAO da atualização documental; integração técnica e aceite de Pedro CONCLUIDOS COM TRES RESSALVAS. Após revisão da trilha documental, arquivar conforme PLANS.md, preservando apontadores existentes. A origem da autorização foi ampliada pela mensagem atual de Pedro, que confirmou os três ajustes e autorizou o merge #51; os estados EM_ANDAMENTO/HUMAN_ACCEPTANCE_PENDING abaixo são históricos.

EVIDENCIA_IMPLEMENTACAO: CI42101827226/1 concluiu quinze gates PASS no head febee101aa; Codex Review concluída sem findings. Merge #51 `7bae1f87cb8d6a708b7c4de0b990e82e5a503369`, árvore idêntica à candidata. Main beba96f preservada. [Aceite e CI](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/51#issuecomment-6671722605), [recibo da integração](../correcoes-finais-ui044-20261105/aceite-e-integracao.json) e [execução futura](../correcoes-finais-ui044-20261105/prompt-de-execucao.md). As três correções não foram implementadas nesta publicação. Nenhum deploy, limpeza ou nova suíte funcional local. Riscos/qualificadores científicos e gates operacionais mantêm seus limites.

ID HF-UI044-INT-20261105. Estado EM_ANDAMENTO. Data 05/11/2026 America/Fortaleza.

## Autoridade e objetivo
DECISAO_CONFIRMADA: Pedro respondeu “Okay, vamos iniciar / O que faremos agora?” à recomendação de preparar PR única e Preview isolado para novos testes manuais. Autoriza esta preparação, publicação e testes do Preview; não é aceite visual, autorização de merge, Production ou limpeza. HUMAN_ACCEPTANCE_PENDING; GEOCODER_OPERATIONAL_PENDING. Somente Pedro fez esta autorização; nenhum aceite de Luciano é inferido.
Fonte procedimental: handoff HF-UI044-HANDOFF-ACEITE-INTEGRACAO-LIMPEZA-20261102.md fornecido pelo usuário; AGENTS/PLANS e decisões atuais.

## Estado inicial e preservação
GitHub confirmado: development9b8595d232842d401ce81bbc92c54dd543aa2829, mainbeba96fbf6bbaac8771dbb29abea2f9f8f5b0054. PRs44–50 abertos;50 depende49, head3c9b9c83e3abca48ede0b8c4f03343e4b4aa3698/tree0f134faf3d69c87a449f908d106d3986a34192a1.
A/B/C src/tests coincidem por blob com50. Faltam15arquivos44,12G0 e4recibosA/B. Versões divergentes de specs devem ser preservadas em snapshots, mantendo as finais50 ativas.
Novo diretório/API GitHub; checkouts/worktrees anteriores não serão alterados. Não há declaração sobre worktrees de outras máquinas.

## Escopo e sequência
O0: reconferir fontes/refs/CI/reviews e preparar matriz de proveniência.
O1/O2: branch integrate/hf-ui044-aceite-20261105 a partir da development atual, composição explícita dos conteúdos44/45/50 e recibosA/B; manter todos os blobs funcionais50 e preservar snapshots divergentes. Guard Preview false antes do primeiro push; adicionar nome exato no push.branches e if do workflow oficial, sem alterar gates/runners/permissões.
O3: PR única para development; CI oficial do novoSHA e revisão Codex. Reuso de UI06 anterior somente como apoio histórico com identidade dos blobs, sem transferir PASS. Smoke hospedado na candidata.
Preview: novo banco/branch Neon isolada a partir do banco sintético anterior, preservando manualdata original; chaves próprias e configuração Preview por branch, origem canônica estável e proteção SSO preservada. CAPAS_OFF; sem SMTP/scheduler/geocodificador real por inferência.
O4: entregar PR/URL/conta/roteiro e resultados verdadeiros; parar antes do merge. Limpeza/exclusão de branches não executadas.

## Validações
Escopo/diff/conflitos, bytes dos documentos e PNGs, preservação de base e todos os blobssrc/tests50, CI15gates no novoSHA, review exato, login/área/coletas/IHFR/opcionais e navegação desktop/mobile no Preview. Registrar PASS/FAIL/NOT_RUN e limites.
Sem fórmula/manifestos científicos alterados. IHFR permanece CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO, NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

## Riscos e pontos de parada
Conflito material de fonte, perda de dados ou ação fora do escopo: parar apenas a parte afetada, registrar evidência e continuar independentes. Escolhas reversíveis rotineiras seguem a autorização. Não atribuir aceites/reviews inexistentes.
Rollback do Preview é separado de dados; original permanece disponível. Falha de ambiente ou CI deve ser preservada e tratada proporcionalmente, sem reruns indiscriminados.

## Histórico
05/11: preparação autorizada, preflightGit/API e auditoria de blobs iniciados. Nenhum merge, deploy Production ou limpeza autorizado.
