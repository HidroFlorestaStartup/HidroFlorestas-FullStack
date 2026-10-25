# Revisão independente — presença operacional e contenção HF-NIGHT-01

Revisor: `/root/students`, 2026-10-25. Sem autoria do instrumento, testes,
inventário, resultado ou runbook; a revisão anterior da checklist de requisitos
foi uma atuação independente explicitamente autorizada. Esta autoria escreve
somente este parecer no recorte operacional.

## Parecer e snapshot

`RECOMENDACAO`: **APTO_TECNICAMENTE_NO_RECORTE_OFFLINE** após o tratamento do P3
documental. Zero P0–P2 identificados nesta revisão; nenhum achado aberto no
corte final. Os cinco testes foram executados pelo
revisor e passaram; o resultado do inventário foi reproduzido com exit2 e
G3/G4/G5 `BLOCKED`. Não há autorização operacional ou aprovação humana decorrente
deste parecer.

Base: `08262dc57c1ad365244f9ec6902b1e4be39e2d7d`, branch `feat/hf-night-01`,
delta ainda sem commit no instante da revisão. Identidades dos bytes lidos:

| Arquivo | SHA-256 |
|---|---|
| `scripts/ops-metadata-presence.mjs` | `8a11106c2893160863a163d49d448f7025d256c1dfde79a2a6e9a5a9a4bea41c` |
| `tests/operations/ops-metadata-presence.test.mjs` | `c8edb73fbfa657024bb9b5392fdf560a0061d42cbbf9c1fb7ec10549fccad14d` |

Foram lidos spec, plano, research, modelo, contrato CLI, tarefas, checklist de
segurança, código/testes, evidência de implementação, inventário sanitizado,
resultado e [runbook](runbook.md). A consulta de metadados Vercel relatada pelo
coordenador não foi repetida nem tratada como execução desta autoria.

## Achados e cobertura

| ID | Severidade / estado | Evidência | Orientação |
|---|---|---|---|
| OPS-REQ-001 | Requisito / tratado antes do código | O modelo inicial não distinguia os 18 nomes de saída dos cinco nomes de baseline aceitos. Spec e modelo passaram a enumerar/separar os conjuntos e apontar a fonte por SHA/caminho completo, com limite de publicação. | `FATO_DOCUMENTADO`: delta reavaliado; CHK002 marcado, seis critérios de segurança satisfeitos. Sem override. |
| OPS-DOC-001 | P3 / tratado e reconferido | `validBranch` aceita até 200 caracteres ASCII, primeiro alfanumérico e restante `[A-Za-z0-9._/-]`; o contrato inicial não descrevia esse subconjunto. | `FATO_DOCUMENTADO`: contrato/spec passaram a explicitar o subconjunto deliberado. O delta acrescenta recusa explícita de whitespace e testes com LF/CRLF finais; foi lido e executado novamente pelo revisor. Não foi reproduzido ou alegado RED para essas novas negativas. |

`EVIDENCIA_IMPLEMENTACAO`, inspeção direta e testes executados:

| Requisito / critério | Tratamento conferido |
|---|---|
| FR-001 / SC-001 | Whitelist fechada de 18 operacionais mais cinco nomes de entrada sem contagem; saída sempre com 18 nomes canônicos, sem baseline na contagem. |
| FR-002 | Escopo por target e branch preview idêntica; registro de branch restrito a preview; presença global tem precedência somente de relato. |
| FR-003 | Objeto fechado em ambos os níveis, rejeição de campo/value/nome extra e duplicata por key/target/branch; limite de 1000 registros e leitura máxima de 1 MiB; lstat/fstat exigem arquivo regular. |
| FR-004 / SC-002 | Saída construída de constantes e contagens, sem repetir branch/caminho ou registro arbitrário. Erro único, sem conteúdo/stack. Canários recusados não aparecem em stdout/stderr. |
| FR-005 | CLI importa somente fs e url de Node; não lê process.env, dotenv, rede ou aplicação; sem subprocessos/escrita/banco/SMTP/provedor. Os testes criam subprocessos e temporário próprios, com destino validado antes do descarte. |
| FR-006 / SC-003 | Códigos 0/2/1 distinguem presença completa, ausências e entrada inválida. Todos os resultados válidos conservam os três gates BLOCKED. |

## Execução própria

Windows, Node 24.19.0. Comandos executados sequencialmente pelo revisor:

| Verificação | Resultado |
|---|---|
| `node --test tests/operations/ops-metadata-presence.test.mjs`, corte inicial | exit0; 5 PASS, 0 FAIL/skip/cancel, 823.605 ms. |
| Mesmo comando, após delta final de branch/contrato | exit0; 5 PASS, 0 FAIL/skip/cancel, 680.4731 ms. Inclui LF/CRLF finais. |
| `node --check scripts/ops-metadata-presence.mjs` | exit0. |
| `node --check tests/operations/ops-metadata-presence.test.mjs` | exit0. |
| CLI com `metadata-inventory.json`, target preview e branch desta missão | exit2, stderr vazio, 18 ausentes; resultado estruturalmente igual a `presence-preview.json`. |
| Links relativos do runbook | 8/8 destinos existentes. |

Os testes cobrem vazio/completo, escopos globais/branch/targets, baseline sem
contagem, duplicatas inclusive sobreposição de targets, campos inesperados,
limites, falhas de arquivo/JSON, argumentos e ausência de eco de canários.
A revisão não declara cobertura universal de todos os estados do filesystem.

## Contenção Git/CI/deploy

`EVIDENCIA_IMPLEMENTACAO`: comparação por chave/valor com `HEAD:vercel.json`
nas quatro worktrees; as 27 entradas anteriores, incluindo `development:false`,
permanecem iguais. Cada candidata tem somente uma entrada adicional própria:

| Worktree | Entrada adicional | Total false | Workflow |
|---|---|---:|---|
| raiz | `feat/hf-night-01: false` | 28 | Equivalente à base |
| fr015 | `fix/hf-night-fr015-20261025: false` | 28 | Equivalente à base |
| qa | `test/hf-night-baseline-20261025: false` | 28 | Equivalente à base |
| students | `docs/hf-night-students-20261025: false` | 28 | Equivalente à base |

O único workflow rastreado em development é `rc-review.yml`; os 19 filtros
de push e os 19 predicados do job conservam a lista fechada, sem as quatro
branches novas. `workflow_dispatch` continua sujeito ao predicado do job;
não se presume CI executada nas candidatas por existir esse workflow.
`main` e `origin/main` locais, ambos em
`beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`, não contêm workflows rastreados.
Os seis 404 de Actions foram informados pelo coordenador; esta revisão não
repetiu as consultas remotas nem transforma 404 em inventário universal.

`INFERENCIA`: o delta examinado conserva a contenção Git conhecida e não amplia
os gatilhos de CI. A conclusão não cobre hooks externos, execução CLI/API,
configurações remotas ou intervenção posterior; não é prova universal de
impossibilidade de deploy. Nenhuma guarda foi removida ou generalizada.

## Limites de entrega

Operação hospedada, valores de configuração, estado do deployment, banco,
restauração, SMTP, inbox, scheduler, Cloudinary, aceites humanos e ciência não
foram executados ou aprovados. Presença de nomes não comprova formato,
independência de chaves, isolamento, binding ou funcionamento. G3/G4/G5
permanecem `BLOCKED`; responsáveis e decisões humanas constam no runbook.

IHFR: `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
