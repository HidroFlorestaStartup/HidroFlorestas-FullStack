# Preparação local de G3–G5

Data: 2026-10-25. `G3=BLOCKED; G4=BLOCKED; G5=BLOCKED`.
`RECOMENDACAO`: usar este roteiro junto dos runbooks existentes; ele não autoriza
operação hospedada. Operadores e aceites humanos continuam `A_DESIGNAR`.

## Evidência atual e instrumento offline

`EVIDENCIA_IMPLEMENTACAO`: consulta GET pela conexão Vercel da organização ao
FullStack `prj_DiLVjku1AglHtTXv8ckxg8pBiZR3`, equipe
`team_YqedIK09zOGFeZ8M84kra0oM`, nesta sessão, antes de04:03:53UTC.
Inventário:11 registros/5 nomes, nenhum dos18 operacionais históricos.
Nessa consulta não foram lidos valores, consultado banco, aberto SMTP nem chamado worker.
O conector não expôs rootDirectory/Git settings; esses campos não foram inferidos.
Frontend-starter identificado e excluído do recorte.

Somente `{schemaVersion,records:[{key,target,gitBranch}]}` foi preservado em
[metadata-inventory.json](metadata-inventory.json). Campos do provedor foram
reduzidos por whitelist: sem values, IDs de env, autores, comentários ou timestamps
de pessoas. [Resultado preview](presence-preview.json): exit2,18 ausentes.

```powershell
node --test tests/operations/ops-metadata-presence.test.mjs
node scripts/ops-metadata-presence.mjs docs/reports/2026-10-25-hf-night-01/ops/metadata-inventory.json preview feat/hf-night-01
```

Saídas0/2 significam presença completa/incompleta;1 significa input inválido.
Todas mantêm gates BLOCKED. Não passar export bruto de env ou arquivo .env.
Para reconfirmação, operador autorizado consulta metadados `decrypt=false` e
produz whitelist com somente os três campos do registro. Não buscar valores.
`ACCOUNT_TESTER_ALLOWLIST` é opcional no parser; este inventário preserva sua
relevância no recorte de teste controlado, sem torná-la requisito universal.
Defaults numéricos ausentes não são automaticamente falha.
Custom environments, vínculo ao deployment, formatos/chaves independentes,
target real e isolamento de banco não são comprovados pelo instrumento.

## Ensaios locais já existentes

O [runner RC](../../../../scripts/rc-review-validation.ps1) verifica ownership do
PostgreSQL, coleta gates e usa serviços sintéticos. Seguir
[runbook CI/local](../../../operations/rc-review-ci-runbook.md); não falsificar
`GITHUB_ACTIONS`, relaxar timeouts ou substituir o destino por banco hospedado.
A frente QA registra nesta missão seu ambiente novo, comandos, exit codes e
contagens. Resultados não são transferidos a outro SHA nem ao destino hospedado.

`EVIDENCIA_IMPLEMENTACAO`: no baseline funcional `e718647365dfb904eb13c968babdc947963541bf75f239f2f1c266e2c418fa59`,
os recortes existentes abaixo foram exercitados pelos gates Integration e E2E
do runner owned. O consolidado QA discrimina coortes e tentativas; não são
novos testes nem uma soma adicional às contagens231/220.

- [Verificação/recuperação de contas](../../../../tests/integration/account-verification-recovery.test.ts):
  expiração, reenvio/cooldown, invalidade da prova anterior, consumo único,
  revogação por versão e negativas/rollback no banco sintético.
- [Jornadas de conta em browser](../../../../tests/e2e/account-verification-recovery.spec.ts):
  confirmação por mensagem recebida no adaptador determinístico, logout/retomada
  e reset revogando outro browser por requisição efetiva; sem caixa externa.
- [Outbox](../../../../tests/integration/mail-outbox.test.ts) e
  [SMTP loopback](../../../../tests/mail/mail-smtp.test.ts): leases/fencing,
  concorrência/timeout/recuperação e transporte real local TLS/STARTTLS, distinguindo
  verificação, accepted e inbox. O subtotal SMTP pertence ao Unit419, não ao
  Integration231; a execução R1 é subconjunto e não acrescenta17 casos únicos.

Contas/mail: [homologação](../../../operations/account-homologation-runbook.md),
[mail](../../../operations/mail-runbook.md), fixtures
[account-mail-harness](../../../../tests/fixtures/account-mail-harness.ts) e
[worker sintético](../../../../tests/fixtures/account-mail-worker.ts) distinguem
conexão, accepted, inbox e consumo. Somente localhost no ensaio sintético.
O script `accounts-homologation-scheduler.ps1` tem contexto próprio histórico;
não reutilizá-lo como scheduler do FullStack nem executá-lo remotamente.

O [scheduler substituto desta missão](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/37)
tem Spec Kit034 e comando focal próprios:

```powershell
node --experimental-strip-types --test tests/investigations/mail/local-scheduler.test.mjs
```

Executar somente na árvore da PR37. Em `2341275eac6c60054be00ef81b0e1a84619225ca`,
4/4 testes do autor e4/4 do revisor independente passaram: autorização HTTP real
em127.0.0.1, temporizador automático serial, pausa/retomada e fila/accepted falsos.
Timeout é fail-stop; abortar HTTP não prova cancelamento do callback no servidor.
Não executa SQL, `processMailBatch`, SMTP ou inbox. Esse ensaio e o verificador
offline031 são complementares; nenhum substitui as provas hospedadas abaixo.

## Contrato para o futuro operador hospedado

| Ordem / gate | Autorização e prova necessárias | Critério verificável / contingência |
|---|---|---|
| 1 / G5-DB | Destino opaco, projeto/target/deployment/SHA/root, instância/branch/banco/papel e owners confirmados | Provar isolamento de Production, schema e histórico/checksums aplicados; nenhum reset/db push/seed por inferência |
| 2 / G5-RESTORE | Backup identificável, retenção/RPO/RTO e destino descartável explicitamente autorizados | Restore hospedado + invariantes/duração/aceite; restauração sintética não fecha gate; preservar origem/backup em falha |
| 3 / G3-config | Origem/ingress, allowlist do recorte, keyrings independentes e caixa autorizada preparados privadamente | Presença/formato/independência/binding como booleanos; diagnóstico SMTP sem envio antes de mensagem |
| 4 / G3-contas | Contas descartáveis e caixa real autorizadas; teste de verificação/reenvio/cooldown/expiração/reuso/reset | Sessão restrita antes da prova; desafio anterior recusado, novo consumido; reset em outro navegador revoga sessão anterior por requisição efetiva; accepted não é inbox |
| 5 / G3-job | Scheduler específico FullStack, job/timeout/cadência/custos/janela autorizados | Duas execuções automáticas e backlog limitado após pausa/retomada; reconciliar possíveis efeitos at-least-once; não duplicar retries após timeout |
| 6 / G4 | Dados/papéis descartáveis e jornadas aprovadas após DB/restore/contas | Laboratório→área→coleta→dados/drafts→IHFR→mapa/lista→admin→exclusão/impedimentos; recibos por papel e persistência |
| 7 / G4-capas | Decisão expressa CAPAS_OFF ou CAPAS_ON, operador/custos/cleanup se ON | OFF é PROPOSTA, não flag operada; ON exige Cloudinary privado, quotas, substituição/remoção/cleanup; mismatch permanece BLOCKED |
| 8 / G5-UX/piloto | Testadores, dispositivos/assistiva, suporte/substituto, janela e autoridade de aceite | Teclado/foco/zoom200%, rede/tiles, erros/retomada, aceites humanos e decisão de piloto separados; suspender caso impeditivo |

Recibos públicos: caso/resultado PASS|FAIL|BLOCKED|NOT_RUN, destino opaco,
SHA/deployment/target/UTC, papel sintético e localização privada da prova.
Omitir pessoas, endereços, tokens/cookies/códigos, env e links assinados.

## Decisões humanas restantes

1. Quem assume plataforma/DB/restore, contas/mail/job, produto/UX e suporte,
   e qual destino/SHA/target isolado será autorizado para homologação?
2. Quais RPO/RTO/retenção, backup e restauração descartável serão aceitos?
3. CAPAS_OFF é suficiente ao recorte ou CAPAS_ON será homologado com custos e cleanup?
4. Quais participantes, tecnologia assistiva/dispositivos, janela e autoridade
   concederão aceite de UX e eventual piloto após os gates?

PENDING, convites e Plotly não são decididos aqui. AccessCode não prova convite.
IHFR: CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE;
SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
