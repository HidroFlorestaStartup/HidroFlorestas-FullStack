# QA HF-NIGHT-01

`EVIDENCIA_IMPLEMENTACAO`: os 15 gates oficiais têm resultado final PASS, preservando tentativas anteriores e falhas de setup. A coorte E2E realmente fresca passou 220/220, sem skip/retry. O foco administrativo intermitente reproduzido na base foi tratado separadamente na033; o timeout NAV4 de um replay conserva causa inconclusiva.

Estado inicial: branch `test/hf-night-baseline-20261025`, SHA `08262dc57c1ad365244f9ec6902b1e4be39e2d7d`, árvore limpa. O coordenador adicionou a guarda Git Vercel false antes dos gates. A baseline congelada tem fingerprint `e718647365dfb904eb13c968babdc947963541bf75f239f2f1c266e2c418fa59`, com594 entradas em [13-baseline-fingerprint.json](13-baseline-fingerprint.json), rehash independente conferido. Instrumento030 e restore posterior têm fingerprints próprios.

Ambiente: Windows10.0.26200 x64, PowerShell5.1.26100.9711, Node24.19.0, npm12.0.2,14 processadores disponíveis,33.777.467.392 bytes de RAM. PostgreSQL17.10 owned loopback; pacote pinado `@embedded-postgres/windows-x64@17.10.0-beta.17`, [hash/versão](17-postgresql-runtime.json). Next dev, Chromium1193 local, um worker, retries0. Cluster preexistente sem ownership preservado, sem ler sua credencial ou invocar Start/Stop/Dispose. `-InitializeCiCluster` continua exclusivo de Actions; flags de CI não foram simuladas.

## Gates reais

[baseline.json](baseline.json) contém comando, UTC, duração, exit code, contagens, fingerprint e tentativas. R1 e gates dedicados podem ser subconjuntos: não somar como casos únicos.

| Gate | Resultado final | Duração (s) | Exit |
| --- | --- | ---: | ---: |
| RegressionSetup | 14 migrations | 6,290 | 0 |
| Unit | 419/419 PASS | 23,220 | 0 |
| Integration | 231/231 PASS | 161,921 | 0 |
| Migration | 37/37 PASS | 18,590 | 0 |
| Contract | 6/6 PASS | 10,652 | 0 |
| R1 | 17/17 PASS (subconjunto) | 10,862 | 0 |
| Build | PASS | 157,799 | 0 |
| Typecheck | PASS | 8,337 | 0 |
| Lint | 0 errors / 2 warnings | 32,399 | 0 |
| E2E | 220/220 PASS | 562,901 | 0 |
| Https | 2/2 PASS | 38,510 | 0 |
| Deletion | 3/3 PASS | 11,311 | 0 |
| Ihfr | 6/6 PASS | 62,259 | 0 |
| Bootstrap | 14 migrations | 3,473 | 0 |
| SchemaAudit | 0 schemas candidatos | 0,660 | 0 |

Pré-testes: npm ci553 pacotes em140,631s; Prisma generate7.4.2 PASS6,415s após falha de rede. npm12 bloqueou seis lifecycle scripts de dependências, sem aprovação global. Build restrito falhou ao buscar Poppins e passou com rede autorizada. Token sandbox Windows falhou em tsx antes dos testes (`uv_os_get_passwd/ENOMEM`); token autorizado permitiu execução. Isso não prova falta de RAM nem bug do produto. Lint conserva dois warnings preexistentes.

## Histórico E2E e isolamento

1. E2E1: interrompido pelo operador após97/220 às04:14:45Z; collector FAIL/exit1, status INCOMPLETE_BY_OPERATOR. Tiles públicos GET POSSIBLE/UNVERIFIED; nenhuma captura prova zero egress retrospectivo. Mutação em banco hospedado/SMTP/provedor não foi exercitada. Somente Playwright próprio foi parado; finally encerrou PostgreSQL owned. [Interrupção](15-e2e-interruption.json).
2. E2E2:193 PASS/3 FAIL/24 NOT_RUN. Colisão create-only de fixture após interrupção, attribution sintética sem link esperado e foco403 fora do alerta. Assertions, guards e retries preservados. [Excertos](sanitized-excerpts.md).
3. E2E3:218 PASS/2 FAIL. Timeout90000ms em settleTransitions NAV4, causa inconclusiva; teste administrativo encontrou dois eventos persistidos de justificativa em DB reutilizado, confirmado como HARNESS_REUSE ([contagem](admin-audit-reuse-count.json)). O403 passou nessa bateria, preservando a falha anterior.
4. Coorte v3: binário17.10 reutilizado somente por leitura/hash; marcador, credencial, cluster e bancos frescos. [Prova pré-fixtures](30-fresh-v3-empty-proof.json):14 migrations,0 usuários/labs/áreas/coletas/audits,0 tabelas no reference. E2E220 PASS em562,901s (04:48:45.089–04:58:07.990Z), sem skip/retry, tiles loopback e attribution canônica. Dados/auditoria v2 preservados.

A configuração compilada inclui tiles loopback ([prova](18-loopback-tile-config-proof.json)); isso não é captura universal de rede. O runbook fixa attribution canônica com link OpenStreetMap, sem acesso necessário ao link.

## Investigações separadas

- [Quota](quota-investigation.json): duas schedules existentes de AreaCoverService/FakeCoverProvider,2/2 PASS,2848,959ms; sem ciência IHFR. Primeira invocação sem condição react-server permanece SETUP_FAIL,0 schedules iniciadas. Audit posterior0 schemas no banco próprio selecionado.
- [Foco403 na base](admin-focus-reproduction.json):1/1 focal PASS e experimento serial delimitado9/10 PASS,1 FAIL. Alerta presente, elemento ativo exato não capturado. Feature033 foi validada em outra árvore/DB fresca:10/10 casos reais originais sem retry, SHA `fb1523b4ef77c9dc96c8d1816335b40674aee972`, fingerprint `99988cbcc774faa898ef38289a9ca7a6b431d76866b2ca2e95b5d2744db771a4`. Recibo próprio `specs/033-admin-access-focus/evidence/real-e2e.json` na entrega033; nenhum resultado transferido à baselinee718.
- [Restore sintético](synthetic-restore.json): pg_dump/pg_restore17.11 exit0 no servidor17.10;26 tabelas e14 migrationchecksums iguais,47 FKs e17 triggers iguais. Gate integral FAIL por diferenças textuais de oito CHECKs em pg_get_expr/constraintdef, sem normalização para PASS. Semântica operacional não provada nesse recibo. [Tentativa1](synthetic-restore-attempt1.json) sem ferramentas, [tentativa2](synthetic-restore-attempt2.json) preflight de hash incorreto e [diagnóstico](restore-preflight-diagnosis.json) preservados. Clientes EDB oficiais separados: [download](edb-client-download.json), [extração/hash](edb-client-extraction.json). Sem prova de restore hospedado/RTO/RPO.
- [Instrumento030](territorial-readiness.json): PASS,10 aquecimentos+100 respostas integrais, p95=57,8354ms/meta500ms,147.036 bytes UTF8. Lista e seleção por teclado252,1367ms/meta2s;100 hrefs de áreas e1000 hrefs distintos de coletas conferidos,2 destinos abertos,2 EXPLAINs reais sanitizados. Browser bloqueou15 requests externos,0 mutações,0 pageerrors. Cleanup STOPPED/CLOSED/REMOVED. Fingerprint `8313f11b969379019da1e6dc84240d49b52f2792e1ad6a65b13059485184a90e` estável. [Comando/UTC](territorial-readiness-command.json), [Spec Kit](../../../../specs/030-local-readiness-instruments/implementation-evidence.md), [revisão independente](independent-review.md). Primeira tentativa FAIL antes de Next/browser por transação incompleta de fixture: [recibo](territorial-readiness-attempt1.json), [causa/correção](readiness-fixture-diagnosis.json).

## Evidência privada e limites

Complemento do restore: [metadados](restore-check-metadata.json) confirmam19 ocorrências de colunas por base, tipos/typmods/NOT NULL/collation iguais e oito expressões sem drift. Os campos temporais reais são `timestamp(3) with time zone`. [Vetores finais](restore-check-probes.json): PASS em172,2687ms,94 casos por base/188 no total,0 divergências,31 TRUE/41 FALSE/22 NULL por base. As16 expressões originais foram avaliadas intactas em READ ONLY/timeout5s/ROLLBACK; resultados também coincidiram entre as bases. Isso cobre esses vetores finitos, sem prova universal ou INSERTs inválidos reais. O FAIL textual original e seus hashes permanecem. [Preflight recusado](restore-check-probes-attempt1.json) antes de qualquer conexão: scanner privado confundiu o literal `delete-account` com token mutante; correção do scanner preservou SQL/protocolo e tentou novamente pela causa concreta. Nenhum novo dump/restore nem constraint alterada. Protocolo congelado SHA256 `e31beb00fe00d51098a5f6d138c6a7ef7d792ec63150bdf431575b464af3a6f6`, publicado pelo coordenador em `docs/reports/2026-10-25-hf-night-01/restore-check-analysis.md`.

[functional-delta.json](functional-delta.json) compara os manifestos:594 entradas baseline→597 instrumento, somente três arquivos030 novos, zero entrada existente modificada/removida. Isso não transfere os PASSs da baseline ao novo fingerprint.

Revisão documental independente dos probes por `/root/students` e pelo coordenador:188 linhas comparadas ao mapa94 do protocolo congelado, sem caso ausente/extra/duplicado ou mismatch; flags, NULL, markers, tipos e ROLLBACK conferidos. Hash do recibo PASS `7a7c983ea7e7292efe354d607c50080caf71bbc8dba26e76df9f620352b00ca7`. Nenhum revisor executou novamente os vetores. O índice [public-artifact-manifest.json](public-artifact-manifest.json) fixa os arquivos públicos desta entrega e hashes de bytes capturados; logs privados e a guarda Vercel do coordenador não pertencem à sua lista.

[Índice dos34 logs privados](private-log-index.json) conserva tamanho/SHA e destino ignorado. Originais movidos sem alterar bytes; classificação inicial incorreta de quatro logs como ignored corrigida. Leitura hash-only independente validou34/34 e ausência dos originais. Não publicar raw logs, dump, clixml, cookies, trace, chaves ou ambiente. [Excertos](sanitized-excerpts.md), [comandos diretos](baseline-results.jsonl), [collector unitário](results.jsonl), [setup](setup-diagnostics.jsonl) e [investigações](investigation-results.jsonl) são públicos. Paths antigos .log em registros históricos são resolvidos pelo índice, não links públicos. O campo environment fixo do collector unitário não significa uso de banco pelos unitários.

[Runbook/custo](runbook.md), [plano/evolução](plano.md). Homologação, aceite humano, acessibilidade com tecnologia assistiva real/participantes e readiness operacional conservam eixos próprios. IHFR permanece CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO. Nenhum resultado técnico altera intenção científica ou de produto.
