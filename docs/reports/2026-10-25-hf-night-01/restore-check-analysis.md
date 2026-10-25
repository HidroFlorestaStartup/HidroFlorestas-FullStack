# Análise e protocolo finito dos oito CHECKs do restore

Autoria: `/root/students`, 25/10/2026. Escopo delegado pelo coordenador nesta sessão:
análise documental e preparação de SELECTs; execução pertence ao QA após revisão
do protocolo pelo coordenador e encerramento da janela030. O autor deste
documento não executa PostgreSQL, browser, testes ou utilitários de restore.

## Errata documental posterior à execução

O [protocolo executado](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/bef9152a7e465f9e14fd106cbabb2d3efdbab40e/docs/reports/2026-10-25-hf-night-01/restore-check-analysis.md)
está fixado no commit `bef9152a7e465f9e14fd106cbabb2d3efdbab40e`, blob Git
`449404f06c416166bf41206afdba4f5833d36d2d`, 32263 bytes, SHA-256
`e31beb00fe00d51098a5f6d138c6a7ef7d792ec63150bdf431575b464af3a6f6`.
Esses bytes foram conferidos diretamente pelo objeto Git local; a publicação
remota cabe ao coordenador. O campo `protocolSha256` dos recibos QA refere-se
a esse blob histórico.

Esta versão corrige somente a narrativa: os seis campos temporais pertinentes
do Prisma já têm `@db.Timestamptz(3)`. A suspeita intermediária de conflito
usou uma generalização de campos de outros models e não se sustenta neste
recorte. A fonte exata e a correção estão no histórico abaixo. Nenhuma PD de
schema é demonstrada por essa suspeita. SQL, fixtures e expressões permanecem
byte a byte iguais aos dois blocos SQL do protocolo executado; não houve nova
query. O resultado posterior está na [auditoria](qa-independent-audit.md).

Estado no corte histórico de preparação da versão executada: **RECOMENDACAO — METADATA_EXECUTADA, VETORES_NAO_EXECUTADOS**. O gate original
do restore permanece **FAIL / CATALOG_CONSTRAINT_MISMATCH**. A aprovação deste
protocolo não muda esse resultado, G3/G4/G5, produto ou ciência.

## Plano proporcional e fonte fixada

1. Ler recibo e diferenças sem editar fontes ou expressões — concluído.
2. Fundamentar a análise dos oito casos em fontes primárias PostgreSQL17 — concluído.
3. Preparar vetores finitos e SELECTs sem escrita, com comparação de três valores — concluído.
4. Conferir estaticamente contagens, expressões literais e escopo — recibo ao final.
5. Revisão independente por `/root`: metadata liberada e executada; delta final dos vetores pendente neste corte.
6. QA já coletou metadata; executa vetores nas duas bases próprias só após novo gate e preserva JSON sanitizado.
7. Revisor confere recibo, limites e divergências; não reclassifica retroativamente o FAIL textual.

Fonte: `.worktrees/qa/docs/reports/2026-10-25-hf-night-01/qa/synthetic-restore.json`,
SHA-256 `d129fc583c9ab91b06aeadcdd61885a9fefcd09b863f1b89e5d05ef4be4286c2`,
ensaio de05:51:17–05:51:18 UTC. Os oito pares abaixo são copiados literalmente
dos campos `sourceExpression`/`targetExpression`; nenhum cast, parêntese,
literal, operador ou nome foi removido/reordenado.

O ensaio registra PostgreSQL17.10, clientes17.11, dump/restore exit0,
26 tabelas com105 linhas em cada lado e digests coincidentes,14 migrations
com checksums coincidentes,47 FKs e17 triggers habilitados coincidentes.
O gate integral falhou nas oito definições de catálogo. Todos os oito CHECKs
estão presentes/validados em ambos os lados, segundo o recibo.
O snapshot do banco deriva de08262dc/`e718…`; o fingerprint do instrumento
na execução do restore é `8bb76bf268fd92b7addfbd5b5f48de2e594599b6e366ab320c0a5cd6703a096d`.
Essas identidades não são intercambiáveis.

## Análise semântica das diferenças

`INFERENCIA`, condicionada aos mesmos tipos, operadores e collations:
os dois reagrupamentos de AND preservam os mesmos predicados. Em lógica SQL,
havendo FALSE a conjunção é FALSE; sem FALSE, todos TRUE dão TRUE e qualquer
UNKNOWN dá UNKNOWN. A alteração da associação desses predicados puros não
muda esse resultado. Não há divisão, função volátil ou efeito externo neles.
Fundamento: [PostgreSQL17 — operadores lógicos](https://www.postgresql.org/docs/17/functions-logical.html).

`INFERENCIA`: os seis casos ARRAY preservam cada literal, ordem e comparação
do lado esquerdo em text. O manual explica que converter um construtor ARRAY
ao tipo de destino tem o mesmo efeito de converter cada elemento; varchar/text
são coercíveis binariamente. Isso fundamenta equivalência destas formas
particulares, sem constituir execução dos catálogos ou prova de um backup geral.
Fontes: [construtores ARRAY](https://www.postgresql.org/docs/17/sql-expressions.html#SQL-SYNTAX-ARRAY-CONSTRUCTORS)
e [CREATE CAST](https://www.postgresql.org/docs/17/sql-createcast.html).

| CHECK | Diferença observada | Análise particular — INFERENCIA |
|---|---|---|
| AccountEmailChallenge_bounds | Associação dos dois limites de maxAttempts | Permanecem 1≤max≤100, 0≤attemptCount≤max e expiresAt>createdAt; sem predicado novo/removido. |
| AccountRequest_action_check | Cast do vetor varchar[] para text[] passa aos elementos | Permanecem sign-up, verification-resend e password-reset. |
| CoverCleanupJob_kind_check | Mesmo cast ARRAY/elementos | Permanecem STAGING e FINAL. |
| CoverCleanupJob_resourceType_check | Mesmo cast ARRAY/elementos | Permanecem image, video e raw. |
| CoverCleanupJob_state_check | Mesmo cast ARRAY/elementos | Permanecem PENDING, PROCESSING, RECONCILE e BLOCKED. |
| CoverUploadAttempt_state_check | Mesmo cast ARRAY/elementos | Permanecem ISSUED, PROCESSING, CONFIRMED e FAILED. |
| MailOutbox_bounds | Associação dos dois limites de maxAttempts | Permanecem 1≤max≤5, 0≤attempts≤max, validade estrita e regex de64 hex minúsculos. |
| MailRateLimitBucket_bounds | Cast ARRAY/elementos na conjunção | Permanecem count≥0, janela estrita, regex de64 hex e as mesmas nove ações. |

ANY compara o valor esquerdo aos elementos do vetor; os vetores desses pares
são constantes sem NULL e com os mesmos elementos text. Com valor esquerdo
NULL, a comparação estrita produz UNKNOWN em ambas as formas. Isso não
autoriza aceitar linhas NULL: CHECK aceita TRUE/UNKNOWN, enquanto NOT NULL é
uma restrição independente. Fontes: [ANY de arrays](https://www.postgresql.org/docs/17/functions-comparisons.html#FUNCTIONS-COMPARISONS-ANY-SOME)
e [CHECK/NOT NULL](https://www.postgresql.org/docs/17/ddl-constraints.html).

`pg_get_expr` e `pg_get_constraintdef` reconstroem representações do catálogo;
não são uma prova geral de equivalência semântica. Os textos diferentes
continuam diferentes, e o hash de catálogo original não será substituído.
Fonte: [funções de informação PostgreSQL17](https://www.postgresql.org/docs/17/functions-info.html).

## Condições de execução e recibo

`RECOMENDACAO`: executar somente depois do gate do coordenador, fora da
janela030, em uma conexão owned para cada uma das duas bases sintéticas já
retidas. Revalidar os markers/identidades pelo mecanismo privado existente;
não abrir outro projeto, banco, configuração de ambiente ou credencial.
A conexão é explicitamente escolhida; nenhuma URL ou senha pertence ao recibo.

O primeiro bloco inicia READ ONLY e recolhe somente catálogos. Antes do bloco
de vetores, o executor deve confirmar banco permitido, transação read-only,
PostgreSQL17.10 esperado, oito constraints presentes/validadas e expressões
exatamente iguais ao lado correspondente do recibo fixado. Drift ou erro:
ROLLBACK, preservar FAIL e interromper; não atualizar o esperado para obter verde.
Comparar entre as bases os nomes/tipos/typmods/attnotnull/collations das19
ocorrências de colunas referidas, sem exigir igualdade dos oito textos divergentes.
As migrations lidas declaram essas19 ocorrências NOT NULL; comprovar o catálogo
atual separadamente é parte do protocolo. O catálogo observado nas duas bases
confirmou seis ocorrências temporais timestamp(3) with time zone, typmod3.
Portanto as fixtures usam TIMESTAMPTZ com offset+00, mantendo milissegundos
representáveis. Exigir os mesmos tipos/typmods/NOT NULL e nenhuma diferença
entre source/target antes dos vetores. Se houver drift, parar e registrar os
metadados em revisão própria; não ajustar o esperado automaticamente.

O segundo bloco usa apenas VALUES/SELECT com literais sintéticos. VARCHAR
sem typmod nos vetores evita que um cast para varchar(64) trunque silenciosamente
o caso de65 caracteres antes de avaliar a regex. Esse caso e os NULLs examinam
a expressão além do domínio de armazenamento; não alegam que uma linha
equivalente seria inserível. Tipos/NOT NULL reais vêm do primeiro bloco.

Comparar os resultados com `IS NOT DISTINCT FROM`, preservando TRUE/FALSE/NULL,
e conferir o esperado independente de cada vetor. Comparar também os resultados
por check/caseId entre as duas bases. Não usar `=` para tratar NULL.
Fontes: [comparações com NULL](https://www.postgresql.org/docs/17/functions-comparison.html)
e [casts varchar e truncamento explícito](https://www.postgresql.org/docs/17/datatype-character.html).

Recibo novo sugerido: `qa/restore-check-vectors.json`, sanitizado e separado do
recibo de dump/restore. Registrar UTC, papel source/target, identidade opaca
de banco/cluster próprio, versões/hashes de servidor/clientes, SHA do protocolo
e do recibo fixado, readOnly confirmado, metadados/hash dos19 campos, contagens
planejadas/executadas por CHECK, resultados TRUE/FALSE/NULL por caso, divergências
e duração/exit/ROLLBACK. Publicar somente nomes/caseIds sintéticos, booleans,
NULLs e contagens; sem dados de tabelas, URLs, credenciais ou logs brutos.

Resultado adicional só pode ser PASS se os94 casos aparecerem exatamente uma
vez por base, sem diferença source/target/esperado em qualquer lado e com
metadados compatíveis. Zero falhas em188 linhas é evidência destes vetores;
não é prova universal de equivalência ou substituição do gate textual FAIL.
Não há INSERT/UPDATE/DELETE/DDL, alteração de constraint, SMTP ou provedor.
READ ONLY é uma propriedade da transação, não promessa de ausência física
absoluta de I/O. Fonte: [SET TRANSACTION](https://www.postgresql.org/docs/17/sql-set-transaction.html).

## SQL de metadados — primeiro bloco

```sql
BEGIN READ ONLY;
SET LOCAL statement_timeout = '5s';

SELECT current_database() IN (
         'hf_night_restore_source_485ed76a',
         'hf_night_restore_target_485ed76a'
       ) AS "expectedDatabase",
       current_setting('transaction_read_only') = 'on' AS "readOnly",
       current_setting('server_version_num') AS "serverVersionNum";

WITH expected("checkName", "tableName") AS (
  VALUES
    ('AccountEmailChallenge_bounds', 'AccountEmailChallenge'),
    ('AccountRequest_action_check', 'AccountRequest'),
    ('CoverCleanupJob_kind_check', 'CoverCleanupJob'),
    ('CoverCleanupJob_resourceType_check', 'CoverCleanupJob'),
    ('CoverCleanupJob_state_check', 'CoverCleanupJob'),
    ('CoverUploadAttempt_state_check', 'CoverUploadAttempt'),
    ('MailOutbox_bounds', 'MailOutbox'),
    ('MailRateLimitBucket_bounds', 'MailRateLimitBucket')
)
SELECT e."checkName", e."tableName",
       c.oid IS NOT NULL AS "present",
       c.contype = 'c' AS "isCheck",
       c.convalidated AS "validated",
       c.condeferrable AS "deferrable",
       c.condeferred AS "deferred",
       pg_get_expr(c.conbin, c.conrelid, false) AS "expression",
       pg_get_constraintdef(c.oid, false) AS "definition",
       cols."columns"
FROM expected e
LEFT JOIN pg_catalog.pg_namespace n ON n.nspname = 'public'
LEFT JOIN pg_catalog.pg_class r
  ON r.relnamespace = n.oid AND r.relname = e."tableName"
LEFT JOIN pg_catalog.pg_constraint c
  ON c.conrelid = r.oid AND c.conname = e."checkName" AND c.contype = 'c'
LEFT JOIN LATERAL (
  SELECT jsonb_agg(
           jsonb_build_object(
             'name', a.attname,
             'type', pg_catalog.format_type(a.atttypid, a.atttypmod),
             'typmod', a.atttypmod,
             'notNull', a.attnotnull,
             'collation', col.collname,
             'collationProvider', col.collprovider,
             'collationDeterministic', col.collisdeterministic
           ) ORDER BY a.attnum
         ) AS "columns"
  FROM pg_catalog.pg_attribute a
  LEFT JOIN pg_catalog.pg_collation col ON col.oid = a.attcollation
  WHERE a.attrelid = r.oid AND a.attnum = ANY (c.conkey)
    AND a.attnum > 0 AND NOT a.attisdropped
) cols ON true
ORDER BY e."checkName";
-- Confirmar os guards/metadados/expressões antes do próximo bloco.
-- Se houver divergência, não executar os vetores.
ROLLBACK;
```

## SQL de vetores — segundo bloco, em nova transação READ ONLY

As expressões abaixo estão intactas; parênteses externos apenas delimitam
o valor atribuído a cada alias de resultado.

```sql
BEGIN READ ONLY;
SET LOCAL statement_timeout = '5s';

WITH
aec_v("caseId", "maxAttempts", "attemptCount", "expiresAt", "createdAt", "expectedResult") AS (
  VALUES
    ('lower_ok', 1, 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', TRUE),
    ('upper_ok', 100, 100, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', TRUE),
    ('max_below', 0, 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', FALSE),
    ('max_above', 101, 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', FALSE),
    ('attempt_negative', 2, -1, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', FALSE),
    ('attempt_at_max', 2, 2, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', TRUE),
    ('attempt_over_max', 2, 3, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', FALSE),
    ('expiry_equal', 2, 0, TIMESTAMPTZ '2000-01-01 00:00:00.000+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', FALSE),
    ('expiry_before', 2, 0, TIMESTAMPTZ '1999-12-31 23:59:59.999+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', FALSE),
    ('max_null', NULL, 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', NULL),
    ('attempt_null', 2, NULL, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', NULL),
    ('expires_null', 2, 0, NULL, TIMESTAMPTZ '2000-01-01 00:00:00.000+00', NULL),
    ('created_null', 2, 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', NULL, NULL),
    ('all_null', NULL, NULL, NULL, NULL, NULL),
    ('false_max_null_attempt', 0, NULL, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', FALSE),
    ('false_attempt_null_expiry', 2, -1, NULL, TIMESTAMPTZ '2000-01-01 00:00:00.000+00', FALSE)
),
aec AS (
  SELECT 'AccountEmailChallenge_bounds'::text AS "checkName", "caseId",
         (((("maxAttempts" >= 1) AND ("maxAttempts" <= 100)) AND (("attemptCount" >= 0) AND ("attemptCount" <= "maxAttempts")) AND ("expiresAt" > "createdAt"))) AS "sourceResult",
         ((("maxAttempts" >= 1) AND ("maxAttempts" <= 100) AND (("attemptCount" >= 0) AND ("attemptCount" <= "maxAttempts")) AND ("expiresAt" > "createdAt"))) AS "targetResult",
         "expectedResult"
  FROM aec_v
),
ar_v("caseId", "action", "expectedResult") AS (
  VALUES
    ('valid_1', 'sign-up'::character varying, TRUE),
    ('valid_2', 'verification-resend'::character varying, TRUE),
    ('valid_3', 'password-reset'::character varying, TRUE),
    ('empty', ''::character varying, FALSE),
    ('unknown', 'INVALID'::character varying, FALSE),
    ('null', NULL, NULL)
),
ar AS (
  SELECT 'AccountRequest_action_check'::text AS "checkName", "caseId",
         (((action)::text = ANY ((ARRAY['sign-up'::character varying, 'verification-resend'::character varying, 'password-reset'::character varying])::text[]))) AS "sourceResult",
         (((action)::text = ANY (ARRAY[('sign-up'::character varying)::text, ('verification-resend'::character varying)::text, ('password-reset'::character varying)::text]))) AS "targetResult",
         "expectedResult"
  FROM ar_v
),
ck_v("caseId", "kind", "expectedResult") AS (
  VALUES
    ('valid_1', 'STAGING'::character varying, TRUE),
    ('valid_2', 'FINAL'::character varying, TRUE),
    ('empty', ''::character varying, FALSE),
    ('unknown', 'INVALID'::character varying, FALSE),
    ('null', NULL, NULL)
),
ck AS (
  SELECT 'CoverCleanupJob_kind_check'::text AS "checkName", "caseId",
         (((kind)::text = ANY ((ARRAY['STAGING'::character varying, 'FINAL'::character varying])::text[]))) AS "sourceResult",
         (((kind)::text = ANY (ARRAY[('STAGING'::character varying)::text, ('FINAL'::character varying)::text]))) AS "targetResult",
         "expectedResult"
  FROM ck_v
),
cr_v("caseId", "resourceType", "expectedResult") AS (
  VALUES
    ('valid_1', 'image'::character varying, TRUE),
    ('valid_2', 'video'::character varying, TRUE),
    ('valid_3', 'raw'::character varying, TRUE),
    ('empty', ''::character varying, FALSE),
    ('unknown', 'INVALID'::character varying, FALSE),
    ('null', NULL, NULL)
),
cr AS (
  SELECT 'CoverCleanupJob_resourceType_check'::text AS "checkName", "caseId",
         ((("resourceType")::text = ANY ((ARRAY['image'::character varying, 'video'::character varying, 'raw'::character varying])::text[]))) AS "sourceResult",
         ((("resourceType")::text = ANY (ARRAY[('image'::character varying)::text, ('video'::character varying)::text, ('raw'::character varying)::text]))) AS "targetResult",
         "expectedResult"
  FROM cr_v
),
cs_v("caseId", "state", "expectedResult") AS (
  VALUES
    ('valid_1', 'PENDING'::character varying, TRUE),
    ('valid_2', 'PROCESSING'::character varying, TRUE),
    ('valid_3', 'RECONCILE'::character varying, TRUE),
    ('valid_4', 'BLOCKED'::character varying, TRUE),
    ('empty', ''::character varying, FALSE),
    ('unknown', 'INVALID'::character varying, FALSE),
    ('null', NULL, NULL)
),
cs AS (
  SELECT 'CoverCleanupJob_state_check'::text AS "checkName", "caseId",
         (((state)::text = ANY ((ARRAY['PENDING'::character varying, 'PROCESSING'::character varying, 'RECONCILE'::character varying, 'BLOCKED'::character varying])::text[]))) AS "sourceResult",
         (((state)::text = ANY (ARRAY[('PENDING'::character varying)::text, ('PROCESSING'::character varying)::text, ('RECONCILE'::character varying)::text, ('BLOCKED'::character varying)::text]))) AS "targetResult",
         "expectedResult"
  FROM cs_v
),
us_v("caseId", "state", "expectedResult") AS (
  VALUES
    ('valid_1', 'ISSUED'::character varying, TRUE),
    ('valid_2', 'PROCESSING'::character varying, TRUE),
    ('valid_3', 'CONFIRMED'::character varying, TRUE),
    ('valid_4', 'FAILED'::character varying, TRUE),
    ('empty', ''::character varying, FALSE),
    ('unknown', 'INVALID'::character varying, FALSE),
    ('null', NULL, NULL)
),
us AS (
  SELECT 'CoverUploadAttempt_state_check'::text AS "checkName", "caseId",
         (((state)::text = ANY ((ARRAY['ISSUED'::character varying, 'PROCESSING'::character varying, 'CONFIRMED'::character varying, 'FAILED'::character varying])::text[]))) AS "sourceResult",
         (((state)::text = ANY (ARRAY[('ISSUED'::character varying)::text, ('PROCESSING'::character varying)::text, ('CONFIRMED'::character varying)::text, ('FAILED'::character varying)::text]))) AS "targetResult",
         "expectedResult"
  FROM us_v
),
mo_v("caseId", "maxAttempts", "attempts", "expiresAt", "createdAt", "contentMac", "expectedResult") AS (
  VALUES
    ('lower_ok', 1, 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, TRUE),
    ('upper_ok', 5, 5, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, TRUE),
    ('max_below', 0, 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, FALSE),
    ('max_above', 6, 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, FALSE),
    ('attempt_negative', 5, -1, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, FALSE),
    ('attempt_over_max', 5, 6, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, FALSE),
    ('expiry_equal', 5, 0, TIMESTAMPTZ '2000-01-01 00:00:00.000+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, FALSE),
    ('expiry_before', 5, 0, TIMESTAMPTZ '1999-12-31 23:59:59.999+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, FALSE),
    ('mac_short', 5, 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',63)::character varying, FALSE),
    ('mac_long', 5, 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',65)::character varying, FALSE),
    ('mac_uppercase', 5, 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('A',64)::character varying, FALSE),
    ('mac_nonhex', 5, 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('g',64)::character varying, FALSE),
    ('mac_empty', 5, 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', ''::character varying, FALSE),
    ('max_null', NULL, 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, NULL),
    ('attempt_null', 5, NULL, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, NULL),
    ('expires_null', 5, 0, NULL, TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, NULL),
    ('created_null', 5, 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', NULL, pg_catalog.repeat('a',64)::character varying, NULL),
    ('mac_null', 5, 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', NULL, NULL),
    ('all_null', NULL, NULL, NULL, NULL, NULL, NULL),
    ('false_max_null_mac', 0, 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', NULL, FALSE)
),
mo AS (
  SELECT 'MailOutbox_bounds'::text AS "checkName", "caseId",
         (((("maxAttempts" >= 1) AND ("maxAttempts" <= 5)) AND ((attempts >= 0) AND (attempts <= "maxAttempts")) AND ("expiresAt" > "createdAt") AND (("contentMac")::text ~ '^[0-9a-f]{64}$'::text))) AS "sourceResult",
         ((("maxAttempts" >= 1) AND ("maxAttempts" <= 5) AND ((attempts >= 0) AND (attempts <= "maxAttempts")) AND ("expiresAt" > "createdAt") AND (("contentMac")::text ~ '^[0-9a-f]{64}$'::text))) AS "targetResult",
         "expectedResult"
  FROM mo_v
),
rb_v("caseId", "count", "windowEnd", "windowStart", "subjectMac", "action", "expectedResult") AS (
  VALUES
    ('valid_action_1', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, 'email-verification'::character varying, TRUE),
    ('valid_action_2', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, 'password-reset'::character varying, TRUE),
    ('valid_action_3', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, 'sign-up'::character varying, TRUE),
    ('valid_action_4', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, 'sign-in'::character varying, TRUE),
    ('valid_action_5', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, 'verification-confirm'::character varying, TRUE),
    ('valid_action_6', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, 'reset-confirm'::character varying, TRUE),
    ('valid_action_7', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, 'change-password'::character varying, TRUE),
    ('valid_action_8', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, 'account-global'::character varying, TRUE),
    ('valid_action_9', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, 'delete-account'::character varying, TRUE),
    ('count_negative', -1, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, 'sign-up'::character varying, FALSE),
    ('count_positive', 1, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, 'sign-up'::character varying, TRUE),
    ('window_equal', 0, TIMESTAMPTZ '2000-01-01 00:00:00.000+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, 'sign-up'::character varying, FALSE),
    ('window_before', 0, TIMESTAMPTZ '1999-12-31 23:59:59.999+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, 'sign-up'::character varying, FALSE),
    ('mac_short', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',63)::character varying, 'sign-up'::character varying, FALSE),
    ('mac_long', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',65)::character varying, 'sign-up'::character varying, FALSE),
    ('mac_uppercase', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('A',64)::character varying, 'sign-up'::character varying, FALSE),
    ('mac_nonhex', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('g',64)::character varying, 'sign-up'::character varying, FALSE),
    ('mac_empty', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', ''::character varying, 'sign-up'::character varying, FALSE),
    ('action_empty', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, ''::character varying, FALSE),
    ('action_unknown', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, 'INVALID'::character varying, FALSE),
    ('count_null', NULL, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, 'sign-up'::character varying, NULL),
    ('window_end_null', 0, NULL, TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, 'sign-up'::character varying, NULL),
    ('window_start_null', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', NULL, pg_catalog.repeat('a',64)::character varying, 'sign-up'::character varying, NULL),
    ('mac_null', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', NULL, 'sign-up'::character varying, NULL),
    ('action_null', 0, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, NULL, NULL),
    ('all_null', NULL, NULL, NULL, NULL, NULL, NULL),
    ('false_count_null_action', -1, TIMESTAMPTZ '2000-01-01 00:00:00.001+00', TIMESTAMPTZ '2000-01-01 00:00:00.000+00', pg_catalog.repeat('a',64)::character varying, NULL, FALSE)
),
rb AS (
  SELECT 'MailRateLimitBucket_bounds'::text AS "checkName", "caseId",
         (((count >= 0) AND ("windowEnd" > "windowStart") AND (("subjectMac")::text ~ '^[0-9a-f]{64}$'::text) AND ((action)::text = ANY ((ARRAY['email-verification'::character varying, 'password-reset'::character varying, 'sign-up'::character varying, 'sign-in'::character varying, 'verification-confirm'::character varying, 'reset-confirm'::character varying, 'change-password'::character varying, 'account-global'::character varying, 'delete-account'::character varying])::text[])))) AS "sourceResult",
         (((count >= 0) AND ("windowEnd" > "windowStart") AND (("subjectMac")::text ~ '^[0-9a-f]{64}$'::text) AND ((action)::text = ANY (ARRAY[('email-verification'::character varying)::text, ('password-reset'::character varying)::text, ('sign-up'::character varying)::text, ('sign-in'::character varying)::text, ('verification-confirm'::character varying)::text, ('reset-confirm'::character varying)::text, ('change-password'::character varying)::text, ('account-global'::character varying)::text, ('delete-account'::character varying)::text])))) AS "targetResult",
         "expectedResult"
  FROM rb_v
),
results AS (
  SELECT * FROM aec
  UNION ALL
  SELECT * FROM ar
  UNION ALL
  SELECT * FROM ck
  UNION ALL
  SELECT * FROM cr
  UNION ALL
  SELECT * FROM cs
  UNION ALL
  SELECT * FROM us
  UNION ALL
  SELECT * FROM mo
  UNION ALL
  SELECT * FROM rb
)
SELECT "checkName", "caseId", "sourceResult", "targetResult", "expectedResult",
       "sourceResult" IS NOT DISTINCT FROM "targetResult" AS "sameThreeValuedResult",
       "sourceResult" IS NOT DISTINCT FROM "expectedResult" AS "sourceMatchesExpected",
       "targetResult" IS NOT DISTINCT FROM "expectedResult" AS "targetMatchesExpected",
       "sourceResult" IS NOT FALSE AS "sourceCheckAccepts",
       "targetResult" IS NOT FALSE AS "targetCheckAccepts"
FROM results
ORDER BY "checkName", "caseId";

ROLLBACK;
```

## Matriz fixada e limites de conclusão

| CHECK | Casos | TRUE esperado | FALSE esperado | UNKNOWN esperado |
|---|---:|---:|---:|---:|
| AccountEmailChallenge_bounds | 16 | 3 | 8 | 5 |
| AccountRequest_action_check | 6 | 3 | 2 | 1 |
| CoverCleanupJob_kind_check | 5 | 2 | 2 | 1 |
| CoverCleanupJob_resourceType_check | 6 | 3 | 2 | 1 |
| CoverCleanupJob_state_check | 7 | 4 | 2 | 1 |
| CoverUploadAttempt_state_check | 7 | 4 | 2 | 1 |
| MailOutbox_bounds | 20 | 2 | 12 | 6 |
| MailRateLimitBucket_bounds | 27 | 10 | 11 | 6 |

Total: **94 casos por base,188 linhas esperadas nas duas bases**. A ordem dos
casos não importa; cada par checkName/caseId deve ser único. Casos UNKNOWN
conservam NULL no JSON; não converter NULL em false, vazio ou string.

O protocolo não testa INSERTs reais, FKs, triggers, ACLs, restauração de roles,
PITR/RPO/RTO, efeitos externos ou backups hospedados. O dump usa no-acl e o
restore no-owner/no-privileges; nada aqui os homologa. Muitas das26 tabelas
restauradas estão vazias, inclusive as de desafios/outbox/capas, portanto
igualdade dos digests existentes não cobre os limites inválidos desses CHECKs.
A análise formal acima é INFERENCIA; a bateria futura será evidência finita de
expressões. Nenhuma das duas substitui o registro FAIL textual nem fecha
ciência/produto/piloto ou uma auditoria universal de recuperação.

## Validação estática do protocolo

Gerador documental local leu o recibo fixado, sem abrir conexão. Conferidos:
8 nomes únicos,94 pares check/caseId únicos,16 expressões originais contidas
literalmente no SQL e apenas SELECT/VALUES/CTEs no corpo de avaliação. Os
comandos adicionais são BEGIN READ ONLY, SET LOCAL de timeout e ROLLBACK.
Catálogo real: PASS no recibo abaixo. Execução dos vetores e gate final
do coordenador: **NOT_RUN/PENDENTE** neste corte.


## Histórico de tipos e metadata observada

- Versão cf885bc396f9483d15bf02559133a2e0490f964a31450ecdd26a2e5ff5f892fe: fixtures TIMESTAMPTZ com base nas migrations; vetores NOT_RUN.
- Versão 07cc1263fec5d7cf46ba6f3d139d88bdc7fd4878605c7a3d7bb94e8660216235: proposta intermediária TIMESTAMP sem TZ e guard universal, baseada em generalização indevida de campos de outros models, sem conferir os seis campos pertinentes. O coordenador revogou essa exigência antes de qualquer vetor e liberou somente metadata com ROLLBACK. Nenhum vetor dessa versão foi executado.
- `qa/restore-check-metadata.json`, SHA-256 6457bb46a75146bbfce41a372c068a3dd751652dbbe7b2fcd64e0c2905e23c58: B executou metadata em 06:04:08 UTC, 162,8285 ms, exit 0,READ ONLY/ROLLBACK nos dois lados;19 ocorrências NOT NULL compatíveis por base,8 expressões exatas de cada lado sem drift e zero vetores executados.
- A leitura independente do JSON confirmou esses19 campos/8 expressões por lado. Todos os campos temporais observados são timestamp(3) with time zone. Isso fundamenta o retorno a TIMESTAMPTZ+00 neste protocolo, sem alterar qualquer coluna, migration ou expressão CHECK.

`EVIDENCIA_IMPLEMENTACAO` — correção da suspeita anterior: no objeto
`08262dc57c1ad365244f9ec6902b1e4be39e2d7d:prisma/schema.prisma`, os seis campos
abaixo já possuem `@db.Timestamptz(3)`. SHA-256 desse blob de schema:
`466a2a5d18c609024b83813a90a2f397179bd4ce17b80300a2fc7c0454aab3d8`.

| Model | Campos exatos e linhas na fonte fixada |
|---|---|
| AccountEmailChallenge | [expiresAt, L83](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/08262dc57c1ad365244f9ec6902b1e4be39e2d7d/prisma/schema.prisma#L83), [createdAt, L88](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/08262dc57c1ad365244f9ec6902b1e4be39e2d7d/prisma/schema.prisma#L88) |
| MailOutbox | [expiresAt, L121](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/08262dc57c1ad365244f9ec6902b1e4be39e2d7d/prisma/schema.prisma#L121), [createdAt, L126](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/08262dc57c1ad365244f9ec6902b1e4be39e2d7d/prisma/schema.prisma#L126) |
| MailRateLimitBucket | [windowStart, L140](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/08262dc57c1ad365244f9ec6902b1e4be39e2d7d/prisma/schema.prisma#L140), [windowEnd, L141](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/08262dc57c1ad365244f9ec6902b1e4be39e2d7d/prisma/schema.prisma#L141) |

Portanto, neste recorte, Prisma, migrations de mail e tipos observados no
catálogo são consistentes com TIMESTAMPTZ(3). A afirmação anterior de diferença
estática foi imprecisa e está retirada. Nenhum schema, intenção de produto ou
contrato científico foi alterado, e não se cria pendência de decisão por ela.

IHFR permanece CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO e
NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO. Este protocolo de limites
operacionais não produz conclusão científica.
