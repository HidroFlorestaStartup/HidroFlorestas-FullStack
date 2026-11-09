# Validação da candidata

Este arquivo fecha o estado estático antes da publicação. O recibo final de
CI/review será publicado na conversa da PR da branch
`fix/investigacoes-intermitentes-20261023-local01`, com SHA/árvore/run/attempt/job.
Não há transferência de PASS entre commits ou ambientes.

| Verificação local | Resultado | Identidade/limite |
|---|---|---|
| Unit central | 402/402 PASS | Candidata inicial45fb89f, client gerado ignorado; duas falhas de setup anteriores distintas no preflight |
| Mail unit | 17/17 PASS | Mesmo código-base; não somar subconjuntos R1 novamente |
| Contenção CI/Vercel | PASS | Só inclusão da candidata no push/if e uma regra false;23regras anteriores e development:false preservadas |
| NAV4 original | 4/4 PASS | Fonte/assertions/90s/5s/retries0 intactos; accounts local |
| Contraste de origem A/B/A | 3/3 PASS, controle externo3/3 recusado | v5; v3 negativa permanece no recibo |
| Back e reload | 12/12+12/12 PASS | v4 no ingresso oficial; cookie ausente/me401/DOM privado ausente |
| Login/latência | 3/3 PASS | Resposta real e ordem antes da rota;500ms é controle sintético |
| IHFR | 6/6 em cada um de dois servidores novos | Seis casos originais repetidos; controles separados2FAIL deliberados+2PASS |
| Concorrência | Baseline1/1, espelhos2/2 PASS | Baseline reaparece na regressão; não contar duas vezes como caso único |
| Regressão focal B | 45/45 PASS | Capas, OCC e idempotência, com sobreposição explicitada |
| Navegação pública C | 3/3 PASS; controles2/2 | Pós-readiness, não servidor inteiramente frio |
| Navegação autenticada C | 13/13 PASS | 11mapa originais+2investigativos; worker1/retries0 |
| Auditoria/teardown A/B/C | PASS | Zero schemas gerenciados; clusters próprios parados |
| Typecheck da composição | PASS | 23/10/2026 21:24:59–21:25:03 UTC; inclui A/B/C; exit0 |
| Lint da composição | PASS | 23/10/2026 21:24:59–21:25:16 UTC; inclui A/B/C; exit0, avisos existentes preservados |

Typecheck/lint/diff da composição, links, JSON, hashes e privacidade são
verificados antes do push e registrados no recibo da PR. As verificações focais
dos autores permanecem vinculadas aos respectivos snapshots, não a um HEAD
agregado fictício. A revisão independente trata a correspondência de fontes.

Os quinze gates oficiais exigidos são RegressionSetup, Unit, Integration,
Migration, Contract, R1, Build, Typecheck, Lint, E2E, Https, Deletion, Ihfr,
Bootstrap e SchemaAudit. O workflow usa runner/permissões/actions/timeouts/guards
existentes; somente a branch foi incluída. Nenhum gate foi removido ou marcado
PASS por inferência. **No instante deste fechamento estático: NOT_RUN no HEAD
final ainda por publicar.** O estado posterior verificável pertence ao recibo
remoto da PR, evitando commit autorreferente apenas para narrar o próprio teste.

CI antiga131ade3/run39699435699/attempt1 é exclusivamente histórica. A revisão
concluída da #27/223839c9 não cria CI funcional desse HEAD, que continua NOT_RUN.
Não houve teste em dispositivo físico, zoom nativo, leitor de tela humano,
SMTP/Cloudinary real, recuperação hospedada ou concessão de aceite científico.
