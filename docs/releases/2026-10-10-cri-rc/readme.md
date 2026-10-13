# Release Candidate CRI — 10/10/2026

Ponto de entrada para a equipe: [plano de execução dos estudantes](plano-execucao-estudantes.md).
São 43 tarefas pendentes, com papéis a preencher, sete fases e gates de revisão,
integração, homologação e atualização da aplicação já existente. A publicação
do plano não fecha os aceites humanos nem autoriza operações produtivas.

Atualização de2026-10-13: correções RC-DRAFT-001/RC-UI-001, merges internos da
pilha e dependências originais99d8363 na RC. Consultar
[prontidão atual](rc-readiness-20261013.md) antes dos registros históricos abaixo.
O PR7 mantém a revisão independente; conferir todas as sete etapas.
Revisão humana e autorização de produção continuam pendentes.

Estado: PUBLICADA NO GITHUB, aguardando revisão dos estudantes;
APTO COM RESSALVAS é o parecer da
[revisão focal](../../reports/audits/2026-10-10-revisao-focal-cri-pre-homologacao.md).
Homologação e autorização de produção permanecem pendentes.

EVIDENCIA_IMPLEMENTACAO: esta entrega conserva os11 commits até
539f38d52bba207d2822528d4afd6b936aa64d9f. Branch completa:
`release/cri-rc-20261010`, no repositório
[HidroFlorestaStartup/HidroFlorestas-FullStack](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/tree/release/cri-rc-20261010).
Os PRs e SHAs estão no [guia de integração](integration-guide.md) e em
[evidências da publicação](publication-evidence.json), com
[relatório das verificações](verification-report.md).

RECOMENDACAO: estudantes devem seguir esta ordem:

1. Ler [release notes](release-notes.md), [integração](integration-guide.md) e
   [checklist](review-checklist.md); revisar os sete PRs pelo diff de cada etapa.
2. Cumprir revisão/aceites e identificar os recursos existentes pelo
   [guia operacional](production-update-runbook.md). Registrar o SHA aprovado.
3. Ensaiar a atualização em destino isolado autorizado, com backup restaurado,
   seguindo o [runbook de migrations](migration-runbook.md).
4. Somente com os pré-requisitos fechados e autorização própria, integrar no
   repositório conectado e atualizar o projeto existente; validar e monitorar.

Nenhum merge em development/main, deploy, migration remota, alteração de
credencial ou recurso de provedor faz parte desta preparação. Não confundir
projeto de homologação com produção. Não há necessidade demonstrada de criar
novos projetos Vercel/Neon/Cloudinary.

O IHFR preserva CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
