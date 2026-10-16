# Correções da revisão CRI de 15/10 — prontidão e handoff

Mandato de 15/10/2026, execução continuada em 16/10 (America/Sao_Paulo).
EVIDENCIA_IMPLEMENTACAO; aprovação dos estudantes e homologações reais continuam
abertas. Este acompanhamento atualiza a leitura do candidato sem reescrever os
[achados originais](achados-revisao-2026-10-15.md), o
[guia](guia-correcao-achados-2026-10-15.md) ou os resultados históricos.

| Achado | Correção e estado |
|---|---|
| CRI-REV-001 | Política A explicitamente confirmada pelo usuário; DTO separa featureEnabled/canEdit/hasImage; servidor bloqueia mutações/conteúdo desligado; UI/lista usam fallback e não pedem bytes. Implementado e validado localmente; publicação pela cadeia em andamento |
| CRI-REV-002 | Duas transações Serializable com validação compartilhada; preset entre elas, sem transação aberta; replay/preset/quota/reautorização preservados. Implementado e validado localmente; publicação pela cadeia em andamento |
| CRI-REV-003 | RC corrigida; sincronização da revisão independente e seus novos checks ainda em andamento. Parecer independente permanece humano |
| CRI-REV-004 | Resposta técnica/re-review após publicação. CHANGES_REQUESTED mantidos; aprovação não foi emitida pelo executor |

## Decisão e rastreabilidade

DECISAO_CONFIRMADA: a pergunta explícita ao responsável ou representante de
produto recebeu “Confirmo a política A e autorizo sua implementação.” Origem
registrada em [spec.md](../../../specs/016-area-covers/spec.md). Flag desligado,
ausente/inválido ou configuração incompleta bloqueia upload, confirmação, remoção
e conteúdo; conserva metadados/ponteiro/revisão/assets. canEdit continua somente
autorização contextual. Não é uma nova autorização de rollout/produção.

Requisitos FR-010–FR-013, critérios SC-005–SC-008 e tarefas T026–T038 estão na
Spec016. Planejamento anterior a código: 0d90254fc6c3e3f542e8564f95b998a75ff3a470
e 357f6fbaf679c350623451030a52297f817a9721. Código/testes/evidências:
d93124e21974c0e571ad30f28fd04010a399e757; normalização somente de espaços finais
nas cópias dos logs: 036f54a529b5097c3b8c787b7e598a8af3c76a44.

Primeiros HEADs publicados/conferidos: origem036f54a; auditoria
98d8aaca7e3938fed60677c54b14846d4e234c2f. Merge da RC testado:
b842b292bc4cd2580770abda408d6be16eb17a92. Fechamentos documentais posteriores
devem preservar essa árvore funcional; consultar refs/PRs para HEAD final.

## Testes e limites

[Evidências completas RED/GREEN](../../../specs/016-area-covers/cri-rev-20261015-evidence.md),
[registros e hashes](../../../specs/016-area-covers/cri-rev-20261015-evidence/validation-records.json).
RED integração17PASS/5FAIL, E2E1FAIL/4não executados por serialidade e Unit290/1;
GREEN focal23/23 e navegador5/5. Após casos adicionais, origem passou Unit291+
Mail17, Integration207, Migration37, Contract6, R1 subconjunto17, E2E72, HTTPS2,
Deletion3, IHFR6, Build/Typecheck/Lint, Bootstrap14 e SchemaAudit0. Lint3 avisos
anteriores. Um FAIL inicial P2028 no IHFR foi preservado; rerun integral passou
207/207 sem alterar código/guards/assertions/timeouts. Causa histórica não provada.

A RC mantém o commit original99d8363 de dependências, portanto recebe regressão
cumulativa própria no SHA acima, com Node24.19/Prisma7.4.2/PostgreSQL17 próprio,
Next16.3.8/sharp0.35.5 e fakes. Primeira regressão cumulativa: 15 gates PASS,
03:08:34.245–03:18:47.536Z de16/10. Snapshot
`4fb194adbf089983b1c45e73ed633004ad7ea78e25a84efa3e2fe960f3e4c552`;
[registros](cri-rev-evidence-20261015/b842b29/validation-records.json) e
[manifesto](cri-rev-evidence-20261015/b842b29/functional-manifest.json) preservados.
Auditoria tem árvore funcional idêntica à origem, com typecheck adicional PASS.
Nenhum teste do navegador/fake equivale a homologação Cloudinary real.

### Retry de commit revelado pelo CI

As runs38843869327/38843986244 falharam nas corridas ativa/horária: o perdedor
recebia INTERNAL_ERROR. Os resultados locais anteriores não as substituem.
Diagnóstico Pg real confirmou DriverAdapterError/TransactionWriteConflict/40001;
o helper só tratava P2034/P2002. Planejamento adicional a8d5819671d2fda693d9b6b0ebcffd8209fd4627
precedeu RED8(3PASS/5FAIL), correção restrita e GREEN8/8. Teto3 e timeouts intactos.
Código corretivo247fe5e1b1a1864968e0c1118c651c95e288bd0b publicado na origem;
auditoria1c28288f73f089064c5dcf14793da423354e4e6d, merge RC
b1d770c37eef319d599f6abb7da43a7bcc5c9aab. Revalidação de origem: Unit291+Mail17,
Integration215, Build/Typecheck/Lint/SchemaAudit e E2E focal5 PASS, com registros
e FAILs preservados na evidência da spec. Validação complementar da RC concluída:
Integration215/215, Build/Typecheck/Lint (0erros/3avisos anteriores), SchemaAudit0
PASS, 03:26:03.211–03:27:53.818Z, snapshot
`85cdcfd55a070615392894eb311c43c035840e2d31237832b9d0f0c1ea71cc08`.
[Registros do ajuste na RC](cri-rev-evidence-20261015/b1d770c/validation-records.json)
e [manifesto](cri-rev-evidence-20261015/b1d770c/functional-manifest.json).
Os novos HEADs continuam sujeitos à conclusão do Actions; não reutilizar o check
de SHA antigo. Migrations, E2E72/HTTPS2/Deletion3/IHFR6/Bootstrap14/R1 e demais
gates integrais anteriores foram preservados como evidência com alcance explícito.

## Operação, estudantes e aprovação

O [plano de seis entregas](plano-execucao-estudantes.md) permanece válido.
RECOMENDACAO: estudantes revisam os diffs atuais e evidências novas; complementam
aceites e registram novo parecer nos HEADs publicados de #4/#6 e #7 sincronizado.
Revisor que abriu a thread decide sua resolução; o executor não dispensa review,
não registra APPROVED e não declara prontidão para integrar development.

Gates reais continuam conforme os runbooks: Gate B012, aceite humano013,
navegadores alvo, preset frozen/hash e privacidade/EXIF/raw/late uploads/cleanup/
créditos Cloudinary, operadores, inventário/backup/restore/ensaio e autorização
operacional. Política A não fecha esses gates. Migrations remotas, deploy e
integração main/development não foram executados nem autorizados aqui.
IHFR mantém CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
