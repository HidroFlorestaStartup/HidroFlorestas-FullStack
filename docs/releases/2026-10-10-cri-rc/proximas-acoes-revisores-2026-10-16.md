# Próximas ações de Pedro Vitor e Luciano — 16/10/2026

Estado: **AGUARDANDO REVISÃO HUMANA**. Conferência de Git/PRs/Actions em
16/10/2026 (America/Sao_Paulo), antes deste commit documental.
Encaminhamento solicitado pelo usuário nessa data; complementa o
[plano dos estudantes](plano-execucao-estudantes.md), sem criar outro plano geral.

## Contexto e candidato conferido

EVIDENCIA_IMPLEMENTACAO, conforme a
[prontidão da RC](cri-rev-readiness-20261015.md) e as
[evidências da Spec 016](../../../specs/016-area-covers/cri-rev-20261015-evidence.md):

- **CRI-REV-001:** corrigido com separação entre disponibilidade
  (`featureEnabled`), autorização contextual (`canEdit`) e existência da capa.
  Política A registrada na Spec 016: recurso desligado bloqueia mutações e conteúdo,
  preservando metadados e fallback.
- **CRI-REV-002:** corrigido com preflight de elegibilidade, replay, revisão e
  quotas antes da chamada externa ao Cloudinary; segunda transação reautoriza e
  revalida após a rede, preservando idempotência e limites sob concorrência.
- **CRI-REV-003:** sincronização técnica realizada no PR #7. Na conferência, a
  RC `ee1242d` era ancestral de `dc180cb`; o diff continha somente 26 arquivos de
  documentação/evidências, sem diferenças em código, testes ou dependências.
- **CRI-REV-004:** permanece pendente de revisão e aprovação humanas.
  Implementação publicada e CI positivo não constituem aprovação do revisor.

FATO_DOCUMENTADO: os quatro PRs continuam abertos, sem merge. SHAs completos,
checks e reviews foram consultados no GitHub:

| PR | HEAD antes desta publicação | Actions confirmado | Revisão humana |
|---|---|---|---|
| [#4 — capas](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/4) | `0b154ce1ea5b2e528c1c84227880060ce452adf7` | [38846149479 — SUCCESS](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/38846149479) | `CHANGES_REQUESTED` de Pedro; nova revisão solicitada a Pedro/Luciano |
| [#5 — auditoria](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/5) | `3a514097ed027a9af4f286ff7fcf5b2d2277588d` | [38846198412 — SUCCESS](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/38846198412) | Sem parecer; revisão solicitada a Pedro/Luciano |
| [#6 — RC](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/6) | `ee1242da5e5ffec10ceee8101c8cd6f52b1e06f4` | [38846283634 — SUCCESS](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/38846283634) | `CHANGES_REQUESTED` de Pedro; nova revisão solicitada a Pedro/Luciano |
| [#7 — revisão independente](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/7) | `dc180cb258f9c9fe543a7a5815ab81ea21f8ae93` | [38846424965 — SUCCESS, tentativa 2](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/38846424965) | Sem parecer; revisão solicitada a Luciano; autor: Pedro |

**Efeito desta publicação:** o novo commit avança somente a RC e deixa o HEAD
de #7 acima sem esse avanço documental. Fica pendente sincronizar #7 posteriormente,
conferir ancestralidade/diff e validar seu novo HEAD antes do parecer final.
A sincronização não é executada nesta tarefa; preservar a revisão independente,
conforme o [guia de integração](integration-guide.md).

## Próximas ações de Pedro Vitor

RECOMENDACAO operacional, conforme o encaminhamento solicitado:

- [ ] Reavaliar o PR #4: correções funcionais, [Spec 016](../../../specs/016-area-covers/spec.md),
  contrato e testes; conferir o atendimento aos
  [achados anteriores](achados-revisao-2026-10-15.md), usando a prontidão atual.
- [ ] Examinar a [thread pendente de RC-UI-001](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/4#discussion_r4255042102)
  e as respostas técnicas. Continua aberta, embora marcada `outdated`;
  esse marcador não equivale a aceite. Decidir sua resolução como revisor autor.
- [ ] Reavaliar o PR #6, conferindo a consolidação das correções na RC vigente.
- [ ] Registrar novo parecer nos PRs #4 e #6, identificando os SHAs examinados:
  aprovar se os critérios forem atendidos ou indicar precisamente problemas
  restantes, critério não atendido e evidência correspondente.

## Próximas ações de Luciano

RECOMENDACAO operacional, conforme as solicitações de revisão existentes:

- [ ] Revisar os PRs #4 e #6, suas correções e evidências nos HEADs efetivos.
- [ ] Revisar o PR #7 sincronizado, conferindo se contém a RC vigente como ancestral
  e mantém apenas as diferenças documentais/evidências previstas.
- [ ] Registrar os pareceres nos PRs correspondentes, com os SHAs examinados,
  aprovação ou indicação precisa das pendências.

Pedro é autor do PR #7; seu parecer não substitui a revisão independente desse
PR. O executor não aprova, dispensa reviews nem resolve threads em nome dos revisores.

## Evidências e alcance dos resultados

- [RED/GREEN, quotas, concorrência e retry transacional](../../../specs/016-area-covers/cri-rev-20261015-evidence.md):
  preserva falhas iniciais e a correção adicional do conflito ao commit;
  [registros do ajuste](../../../specs/016-area-covers/cri-rev-20261015-evidence/adapter-retry/validation-records.json).
- [Contrato de capas](../../../specs/016-area-covers/contracts/images.md),
  [provas da interface/RC-UI-001](../../../specs/016-area-covers/rc-ui-001-evidence.md)
  e [prontidão da RC](cri-rev-readiness-20261015.md).
- Nos logs das quatro runs da tabela: **15 gates PASS, 215/215 testes de integração
  e 72/72 E2E**, em cada execução final. São resultados dos SHAs indicados,
  anteriores a esta publicação. Conferir separadamente os
  [Actions do novo HEAD da RC](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/workflows/rc-review.yml);
  não atribuir a ele o SUCCESS do SHA anterior. Sem regressão funcional local
  adicional nesta alteração exclusivamente documental.
- Intermitência histórica do IHFR preservada: no PR #7, a tentativa 1 da run
  38846424965 falhou no E2E IHFR por locator com dois elementos; a tentativa 2
  passou no **mesmo SHA**, sem alteração de testes/assertions/timeouts, conforme o
  [recibo publicado](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/7#issuecomment-6207758672).
  [Artefato da falha](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/38846424965/artifacts/12024015689).
  **A intermitência não está declarada resolvida.**

## Critérios de conclusão da revisão

- [ ] Responsáveis examinaram os HEADs efetivos, incluindo os avanços documentais.
- [ ] Pareceres necessários estão registrados nos PRs correspondentes.
- [ ] Não há `CHANGES_REQUESTED` obrigatório sem tratamento e novo parecer.
- [ ] Comentários pertinentes receberam decisão documentada de seus responsáveis.
- [ ] O coordenador consegue identificar, por achado e SHA, o que foi aprovado
  e o que permanece pendente.

PENDENCIA_DE_DECISAO: pareceres humanos e fechamento de CRI-REV-004. Homologações
reais, operadores e autorização produtiva seguem nos runbooks existentes.
Esta publicação altera somente este documento e seu link no README da RC;
sem merge em `main`/`development`, deploy, migrations ou operações em provedores.
O IHFR mantém `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO` e `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
