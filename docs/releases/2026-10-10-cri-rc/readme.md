# Release Candidate CRI — 10/10/2026

Atualização da revisão de 15/10, executada em 16/10:
[correções, decisão A, RED/GREEN, prontidão e handoff](cri-rev-readiness-20261015.md).
Consultar esse acompanhamento para o estado das correções; a revisão original
abaixo permanece histórica. Aprovação humana ainda pendente.

[Próximas ações de Pedro Vitor e Luciano — 16/10/2026](proximas-acoes-revisores-2026-10-16.md).

Ponto de entrada para a equipe: [plano de execução dos estudantes](plano-execucao-estudantes.md).
O roteiro principal tem seis entregas: revisão, testes, tratamento de achados,
integração, atualização acompanhada e registro final. As 43 referências técnicas
são consultas condicionais. Estudantes entregam trabalho técnico; operadores e
aprovadores do projeto assumem serviços, dados, custos e produção. Provas existentes
são reaproveitadas conforme alcance/impacto, sem repetição geral dos testes.
A publicação do plano não fecha aceites nem autoriza operações produtivas.

Revisão independente de 2026-10-15: **CORREÇÕES NECESSÁRIAS**. Antes de integrar
esta RC em `development`, consultar os
[achados detalhados](achados-revisao-2026-10-15.md) e o
[guia de correção para desenvolvimento com IA](guia-correcao-achados-2026-10-15.md).
Os documentos registram dois defeitos no fluxo de capas, a defasagem do PR 7 e
reviews pendentes. Eles não autorizam merge, deploy ou operação produtiva.

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

RECOMENDACAO: usar as seis entregas do plano; frentes independentes podem avançar
em paralelo, com evidências e responsabilidades separadas:

1. Revisão: estudantes analisam os sete PRs pelo diff; revisores independentes
   designados aprovam conforme política. Consultar [checklist](review-checklist.md).
2. Testes: estudantes/testadores complementam lacunas no alvo autorizado;
   revisor e responsável pelo aceite aceitam cobertura/reuso e resultados humanos.
3. Achados: estudantes registram/planejam correções; revisores aceitam mudanças,
   e autoridades do projeto decidem risco, dados e custos.
4. Integração: estudantes preparam/conferem; mantenedor autorizado realiza merges
   pela cadeia Git, conforme [guia](integration-guide.md), com aprovações pertinentes.
5. Atualização acompanhada: estudantes apoiam; operadores executam
   [preparação/janela](production-update-runbook.md) e [banco](migration-runbook.md)
   com backup/ensaio/recuperação e GO aprovados pelo projeto.
6. Registro final: estudantes consolidam situação real/evidências; projeto aceita
   relatório e mantém operadores contínuos. Sem pressupor privilégios dos estudantes.

Nenhum merge em development/main, deploy, migration remota, alteração de
credencial ou recurso de provedor faz parte desta preparação. Não confundir
projeto de homologação com produção. Não há necessidade demonstrada de criar
novos projetos Vercel/Neon/Cloudinary.

O IHFR preserva CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
