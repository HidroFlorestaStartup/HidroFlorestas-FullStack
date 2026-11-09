# Históricos de backend e recuperação sintética

## Resultado e escopo

Frentes A/D: **PARCIAL**. Foram recuperadas evidências históricas reais do GitHub, executadas suítes do produto em PostgreSQL descartável próprio e realizado um ciclo real de `pg_dump`/`pg_restore`. As causas antigas continuam **INCONCLUSIVAS**. Não foi demonstrado defeito causal que justificasse patch de produto nestes históricos. A extensão móvel encontrou **FAIL** no redirecionamento final de logout; essa ocorrência foi encaminhada à frente frontend para distinguir produto, configuração e harness.

Base e HEAD de produto de todas as execuções: `b1f83cfa8e52dd25c6246c584a576553c5e9e131`, em worktree exclusiva `wt-backend`, branch `review/hf-pos-backend-20261021`. Este recorte acrescenta somente documentação e evidências projetadas. O coordenador controla integração e publicação. Nenhuma migration, seed, leitura de dados ou restauração foi feita em banco hospedado.

Os recibos locais foram colhidos em 21–22/10/2026 UTC; o nome da entrega segue o checkpoint de 21/10. Linux Ubuntu 24.04, Node 24.19.0, npm 11.9.0, PostgreSQL **16.15**, Prisma 7.4.2, Next.js 16.3.8 e Playwright 1.55.1/Chromium 140.0.7339.186. Esse ambiente é complementar: não equivale ao runner oficial Windows/PostgreSQL 17 nem herda os quinze gates da RC.

## Proveniência

O ZIP fornecido foi somente inventariado e lido como arquivo. Possui 779 entradas, sete migrations e referência legada `refs/heads/007-ihfr-evolution`, SHA `97d95583fa62ed1f3dc88f7a7c69e150afddb968`. Seu conteúdo não foi extraído para execução nem usado como base atual. Digest, tamanho e validação de caminhos constam de [backend-upload-provenance.json](evidence/backend-upload-provenance.json).

Foram recuperados quatro ZIPs de artifacts por conector GitHub real; os arquivos selecionados foram lidos diretamente, com CRC, caminhos, tamanhos e SHA-256 verificados. Os ZIPs completos e logs brutos não integram o commit. [backend-historical.json](evidence/backend-historical.json) contém a projeção de run, attempt, head, artifact, arquivo, digest e journal. O estado histórico é separado da reprodução atual.

## Matriz dos incidentes

| Incidente | Evidência efetivamente recuperada | Reprodução ou análise desta execução | Conclusão causal e próximo passo |
|---|---|---|---|
| INV-001, IHFR intermitente | [Run 39300023357, attempt 1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39300023357/attempts/1), head `3f1eba566a1f4f01e469f75a6c174fd2e602a9d2`, artifact `12212173104`: seis falhas IHFR após doze gates PASS; Bootstrap/SchemaAudit ausentes. [Attempt 2](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39300023357/attempts/2), mesmo head e snapshot `2cb2e33…`, artifact `12213157147`: seis IHFR PASS e quinze gates PASS. | O primeiro log registra ausência de Fuso da coleta, Uso predominante e regiões IHFR, mas não contém diagnóstico suficiente de status/URL/DOM, e os `error-context.md` citados não estão no artifact. Na base atual, IHFR 6/6 PASS, sem retries. | **INCONCLUSIVO / NÃO_REPRODUZIDO** no ensaio atual. O rerun histórico PASS não explica o primeiro FAIL. Para fechar causa, capturar status de página, URL, DOM e estado sintético no mesmo incidente; não aumentar timeout. |
| INV-002, duas chamadas/quota/OCC | [Run 39267705060, attempt 1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39267705060/attempts/1), head `7b8d9c0c8894d4e3e86d35d90b4d1b3d2eab003d`, artifact `12192554979`: Integration 217/218 PASS. Na disputa de duas chamadas, esperava `RATE_LIMITED`, recebeu `INTERNAL_ERROR`; três erros de transação incluíram SQLSTATE `40001` e Prisma `P2034`. A falha impediu as asserções finais de contagem. | Os testes originais de capas e contenção passaram 36/36 na base atual, incluindo duas chamadas simultâneas de quota ativa/horária, idempotência, autorização, revisão/ABA e os cenários FIX022 de quatro operações em três ondas, com conflitos Serializable reais. | **INCONCLUSIVO / NÃO_REPRODUZIDO** para o incidente antigo. Spec022 cobre um contrato de contenção maior; isso não prova retrospectivamente a causa das duas chamadas. Manter o histórico e correlacionar falha futura à transação, resultado e contagem final. |
| INV-004, conta/login | Comentários da PR #18 relidos por conector; o [recibo 6298927257](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/18#issuecomment-6298927257) preserva a classificação histórica inconclusiva e aponta run `39477040095`, attempt 1, job `118815571617`, head abreviado `64332e0`. | Leitura do helper atual e da [contraprova versionada](../../../specs/023-frontend-collections/evidence/r3/account-login-counterproof.json). O helper espera a resposta HTTP e mantém a asserção de URL em cinco segundos. Essa contraprova anterior não foi contada como execução nova. A suíte dedicada de contas não foi reexecutada por esta frente. | **INCONCLUSIVO**; reprodução dedicada atual **NOT_RUN** nesta frente. Nem o PASS antigo nem a contraprova isolada explicam a ocorrência original. A nova falha móvel em `/logout` também não foi atribuída a este histórico. |
| INV-005, 404 de página versus API | [Run 39465856665, attempt 1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39465856665/attempts/1), head `85e397bd4271ab07a197ea88db652227e6e392ce`, artifact `12287280647`: seis IHFR FAIL. O log contém seis respostas 404 de páginas `/dashboard/...` e diagnóstico de documento pronto, sem login nem regiões IHFR. | No ensaio IHFR atual, 15 linhas de resposta de página 200, zero de página 404; duas respostas 404 de API de lookup foram distinguidas. | **INCONCLUSIVO / NÃO_REPRODUZIDO** na base atual. O 404 histórico era de página; não deve ser descartado como 404 esperado de API. A causa do roteamento/estado naquele run permanece aberta. |

Não houve alteração de timeout, retry, assertiva, contrato científico, quota, OCC ou política de autenticação. Não há ciclo RED/GREEN de correção de produto a declarar nesta frente.

## Testes novos e comandos

Dependências instaladas com `npm ci --no-audit --no-fund`, conforme lock; cliente gerado com `npx --no-install prisma generate`. A configuração sintética foi passada em memória, sem persistir valores secretos nas evidências. Foram preservados os guards existentes (`TEST_DATABASE_CONFIRMATION`, `IMP006_DATABASE_VARIABLE`, `IMP006_LOCAL_POSTGRESQL`) e o isolamento dos nomes de bancos de teste.

| Execução | Resultado | Evidência publicada |
|---|---|---|
| `npm run test:unit` | **PASS**, 402 testes centrais + 17 de e-mail; zero falha | [backend-unit-results.txt](evidence/backend-unit-results.txt) |
| `node --conditions=react-server --import=tsx --test --test-concurrency=1 tests/integration/area-covers.test.ts tests/integration/area-covers-contention.test.ts` | **PASS**, 36 testes; zero skip; conflitos reais registrados | [backend-covers-results.txt](evidence/backend-covers-results.txt) |
| `npm run test:migration` | **PASS**, 37 testes; zero skip | [backend-migration-results.txt](evidence/backend-migration-results.txt) |
| `node --import=tsx scripts/imp006-local-e2e.ts` | **PASS**, seis testes IHFR; um worker, zero retries | [backend-ihfr-results.txt](evidence/backend-ihfr-results.txt) |
| `node node_modules/@playwright/test/cli.js test tests/e2e/frontend-mobile-navigation.spec.ts --reporter=list` | **FAIL**, quatro casos (320/375 px × texto 100/200%); um worker, zero retries. Ao final, URL `/logout` persistiu por cinco segundos quando se esperava `/login`. | Execução de 22/10/2026 00:07:14.987 a 00:08:50.434 UTC; log SHA-256 `c5d193b7dbc2f8207cbb42fcd98ae63717da96693121da0a9d2c71f1fcc2d4f5`, 76.730 bytes. Frente frontend recebeu o log e 92 capturas/4 geometrias para adendo independente. |

[backend-execution.json](evidence/backend-execution.json) registra ambiente, comandos, códigos de saída e hashes dos logs das quatro suítes backend. As contagens e resultados são projeções fechadas; não incluem `process.env`, configuração completa de Playwright, URL de banco com credenciais ou conteúdo de dump.

As quatro falhas móveis ocorreram depois das capturas de navegação, Back/Forward, orientação e foco; a existência das imagens não torna os casos PASS. O processo da suíte encerrou com código 1. Não houve repetição para tentar obter verde. Esse achado requer triagem antes de declarar a navegação móvel integralmente aprovada.

## Cadeia de migrations e ambiente descartável

O cluster foi criado nesta execução, em diretório temporário exclusivo, com executável PostgreSQL extraído em scratch, sem instalação de pacotes no sistema. Processo sob usuário de sistema `nobody`, role de banco `imp006_owner`, escuta restrita a `127.0.0.1:55426` e autenticação SCRAM com senha efêmera privada. Os bancos `imp006_development`, `imp006_regression_v2_test` e `imp006_regression_v2_reference` foram criados vazios para o ensaio; não representam ambientes hospedados. Para recuperação foram criados separadamente `hf_pos_backup_source` e `hf_pos_backup_restored`, ambos com `public` vazio verificado antes de escrever.

A árvore atual tem **14 migrations**, com nomes, bytes, SHA-256 e Git blob em [backend-migrations-source.json](evidence/backend-migrations-source.json). As duas entradas iniciadas por `20260920000100` possuem nomes completos diferentes e foram preservadas. A aplicação parte do baseline formal `prisma/bootstrap/initial-legacy-baseline.sql`: ele materializa a estrutura legada e o efeito da migration inicial; somente então a primeira migration é marcada como aplicada, e as demais são executadas por `prisma migrate deploy`. Não se usou `db push`, reset ou reconstrução de histórico.

## Recuperação executada

O [recibo de recuperação](evidence/backend-synthetic-recovery.json) registra execução de 22/10/2026 00:05:44.602 a 00:05:49.090 UTC. O procedimento foi:

1. Criar source e target próprios e comprovar ausência de tabelas em `public`.
2. Aplicar o baseline formal e a cadeia de migrations no source; executar `migrate status` e verificar 14 registros terminados, nenhum revertido e seus checksums.
3. Inserir somente fixtures artificiais existentes de IHFR (`insertIHFRActorFixtures`, `insertIHFRContextFixtures`, `insertIHFRDomainFixtures`), sob transação, recusando endpoint diferente de loopback/porta/banco acordados e source de usuários já preenchido.
4. Obter inventário de cada tabela: contagem e MD5 do agregado ordenado de `to_jsonb(linha)::text`; obter registros de migrations e contagem de constraints.
5. Criar dump custom, conferir sua lista e restaurá-lo no target vazio, com falha imediata em qualquer erro.
6. Repetir o inventário no target e comparar source/restored. Comparar também os dumps de schema, removendo somente as linhas aleatórias `\restrict`/`\unrestrict`.

Comandos efetivamente executados, com credenciais fornecidas privadamente e `DATABASE_URL` apontando apenas para o source próprio:

```sh
# Pré-condição: cluster descartável próprio; PGHOST=127.0.0.1,
# PGPORT=55426, PGUSER=imp006_owner; senha somente no ambiente privado.
createdb hf_pos_backup_source
createdb hf_pos_backup_restored
psql -X -A -t -d hf_pos_backup_source -c "SELECT count(*) FROM pg_tables WHERE schemaname='public'"
psql -X -v ON_ERROR_STOP=1 -1 -d hf_pos_backup_source -f prisma/bootstrap/initial-legacy-baseline.sql
node node_modules/prisma/build/index.js migrate resolve --applied 20260907120000_unique_laboratory_access_code
node node_modules/prisma/build/index.js migrate deploy
node node_modules/prisma/build/index.js migrate status
# Inserção transacional das três fixtures IHFR existentes e inventário source.
pg_dump --format=custom --no-owner --no-privileges --dbname=hf_pos_backup_source --file=synthetic-only.dump
pg_restore --list synthetic-only.dump
psql -X -A -t -d hf_pos_backup_restored -c "SELECT count(*) FROM pg_tables WHERE schemaname='public'"
pg_restore --dbname=hf_pos_backup_restored --no-owner --no-privileges --exit-on-error synthetic-only.dump
# Inventário target e comparação registrados no JSON de evidência.
pg_dump --schema-only --no-owner --no-privileges --dbname=hf_pos_backup_source
pg_dump --schema-only --no-owner --no-privileges --dbname=hf_pos_backup_restored
```

**PASS limitado:** dump e restore encerraram sem erro; 26 tabelas, 52 linhas totais (incluindo histórico de migrations), contagens e MD5 por tabela, 14 históricos/checksums e 120 constraints por contagem coincidiram. O dump sintético possui 117.810 bytes e SHA-256 `7d3bd6537be19bb7e5becec631400b21a9d3792efc36b557169fbc3cfc0e76af`. A operação de restore levou 0,232 s nesta amostra mínima. Esse tempo não é RTO de piloto ou produção.

**FAIL da igualdade textual de schema:** oito definições CHECK foram reexpressas após reparse, com diferenças de parênteses ou distribuição de casts de arrays. Não houve outra linha diferente no schema normalizado. Os nomes e as duas definições observadas estão no recibo. A contagem igual de constraints não certifica equivalência semântica total; essa certificação, ACLs/roles, PITR, recuperação de ativos Cloudinary e cofre de segredos são **NOT_RUN**. O dump completo, mesmo sintético, permanece fora do Git.

## Gates, limites e continuidade

| Recorte | Gate | Estado | Ação necessária |
|---|---|---|---|
| Proveniência e isolamento local desta frente | G0 | **PASS** | Integrar este commit documental pela coordenação; manter o vínculo com o SHA de produto testado. |
| Fechamento causal INV-001/002/004/005 | G1 | **BLOCKED** | Evidência histórica não discrimina causa suficiente; guardar hipóteses e obter diagnóstico correlacionado quando ocorrer nova falha. Responsável humano não designado. |
| Suítes backend complementares acima | G2, recorte local | **PASS** | Os quinze gates oficiais do SHA integrado têm recibo separado da coordenação; não são substituídos por estas contagens. |
| Navegação móvel completa | G4, recorte local | **FAIL** | Triar o logout com a frente frontend e registrar causa/ambiente antes de propor correção ou repetição. |
| Recuperação sintética e checks de dados | G5, ensaio local limitado | **PASS** | Preservar as limitações e a diferença textual de oito CHECKs. |
| Identidade/isolamento Preview versus Production, backup operacional e recuperação hospedada | G5 operacional | **BLOCKED** | Mantenedor designar responsável por banco, demonstrar projeto/instância/role/target, isolamento e permissões, aprovar janela e evidenciar backup/restauração em destino descartável isolado. |

Não há identidade de banco hospedado verificada nem autorização operacional inferida de `DATABASE_URL` ou de Preview READY. Não se testaram dados reais, SMTP real, recebimento humano, exclusão em ambiente hospedado ou recuperação de Production. O progresso sintético não libera G3–G5.

Para continuidade, usar o [runbook de migrations](../2026-10-10-cri-rc/migration-runbook.md), o [runbook de contas](../../operations/account-homologation-runbook.md), o [runbook de e-mail](../../operations/mail-runbook.md), o [runbook de drafts](../../operations/environmental-drafts-runbook.md) e o [runbook de capas](../../operations/area-covers-runbook.md). Antes de qualquer aplicação hospedada, confrontar os 14 checksums com o destino por acesso autorizado, verificar backup e ensaiar a restauração no escopo aprovado. Rollback de código não reverte schema/dados e não deve ser tratado como procedimento de recuperação do banco.
