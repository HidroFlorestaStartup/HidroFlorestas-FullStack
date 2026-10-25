# HF-NIGHT-01 — handoff técnico

Consolidação para revisão humana, 2026-10-25, America/Sao_Paulo.
`NIGHT_RUN_STATUS=PARTIAL_WITH_BLOCKERS`: o escopo técnico local foi executado;
G3–G5/aceites humanos continuam bloqueados e o gate textual do restore permanece
FAIL, acompanhado de prova finita separada. Nenhuma tarefa local segura foi
encerrada por limite arbitrário de rodadas. O review do próprio HEAD final deste
handoff fica vinculado na timeline da PR #35, conforme a política abaixo.

## Estado e fronteiras

`BASE_INITIAL=08262dc57c1ad365244f9ec6902b1e4be39e2d7d`.
`BASE_FINAL_OBSERVED=08262dc57c1ad365244f9ec6902b1e4be39e2d7d`, confirmado
remotamente em07:06:15UTC. Main permanece em
`main=beba96fbf6bbaac8771dbb29abea2f9f8f5b0054; MAIN_CHANGED=NO`.
`MERGE=NONE_OF_NEW_PRS; DEPLOY=NONE`.
`EXTERNAL_MUTATIONS=NONE` no recorte de banco/provedor/SMTP/configuração
hospedados. Pushes, PRs Draft e comentários técnicos GitHub são as publicações
expressamente autorizadas, discriminadas abaixo.

#27/#28 continuam OPEN. #29–#32 estão MERGED e não foram recriadas,
reaplicadas ou integradas de novo. Guardas false, contratos, schema, dependências
e ciência permanecem sob suas autoridades próprias.

## MISSIONS — matriz de missões

| Missão | Estado no corte | Evidência e limite |
|---|---|---|
| M01 alunos | DONE | PR #33 preserva 4 originais byte-idênticos, atribuição e matriz RTH;206 docs#27 coincidem com a base |
| M02 FR-015 | DONE | PR #34/spec029, renderiza member.initials, campo já existente no DTO, no popup geral; RED→GREEN e revisão independente |
| M03 baseline/instrumentos | DONE_NO_RECORTE_TECNICO |15 categorias latestPASS e 220 E2E frescos; spec030 corrigiu P2 com18 testes strict/novo real, revisão independente e Codex final sem findings |
| M04 UX/A11y | DONE_NO_RECORTE_AUTOMATIZADO | PR #34/36/38, teclado/foco/reflow/estados sintéticos; aceite assistivo humano pendente |
| M05 G3–G5 | PARTIAL_LOCAL | PR #35/spec031 e PR #37/spec034; 18 ausências de metadados; dump/restore exit0, gate textual FAIL preservado e188 probes finitos PASS; hospedado BLOCKED_HUMAN_DECISION |
| M06 governança | DONE | PR #33/checkpoint aditivo, fontes preservadas, propostas para#28/guardas sem executá-las; handoff com fontes/revisões no Git |
| M07 defeitos descobertos | DONE_NO_RECORTE | PR #36/spec032 e PR #38/spec033: dois incrementos contra requisitos existentes, sem nova decisão de produto |

## NEW_PRS — PRs Draft e SHAs

Todas apontam para development. Nenhuma está autorizada a merge automático ou
conversão em Ready para disparar review.

| PR / frente | HEAD publicado |
|---|---|
| [33 — alunos](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/33) | `9a2b757c32f28d2bb5ab505239c175b55fab9f20` |
| [34 — FR-015](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/34) | `daebd71fef7168d4266ea9a6bb7c928ddc295e9b` |
| [35 — preparo local e coordenação](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/35) | Código031 em`c7b16383ec62a38a99306b2bf4181356b3e54d4b`; HEAD deste handoff resolvido pela timeline/Git, sem autorreferência |
| [36 — foco em leituras](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/36) | `ddd4e82477c03507808f03a6858137d72e3ac9cb` |
| [37 — scheduler substituto](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/37) | `2341275eac6c60054be00ef81b0e1a84619225ca` |
| [38 — alerta administrativo](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/38) | `1dbe3d42e6c4865ce0c49021f1cf98929c5a29ed` |
| [39 — baseline e instrumentos](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/39) | `6b9ed579912ee9ca1590cff41779232ade40d966` |

### LOCAL_REVIEWS e GITHUB_CODEX_REVIEWS

O [ledger](review-ledger.json) registra os SHAs completos, pedidos únicos,
resumos, recibos, findings, threads e checks observados. Para33/34/35c7/36/37/38,
Codex completed no SHA exato, sem findings observados; reviews formais e threads0.
Isso não concede aprovação humana nem prova ausência universal de defeitos.
PR #39: o primeiro review3e0066 encontrou P2 4369900482, tratado em aeb5492
com regressão antes/depois e um novo real. A threadPRRT_kwDOVAitc86v--4u foi
resolvida após publicação. Pedido único6394763147 do HEAD6b9ed57 teve
completed07:15:43Z sem findings, receipt6394776686. Summary6394375002 é vivo
por PR; o ledger distingue o snapshot antigo e o resultado novo. Não houve
pedido duplicado por SHA, mudança Draft→Ready ou review de29–32.

| Delta | Revisor independente / prova |
|---|---|
| Estudantes | /root, [parecer](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/9a2b757c32f28d2bb5ab505239c175b55fab9f20/docs/reports/2026-10-25-hf-night-01/students/independent-review.md) |
| 029 | /root, [parecer e rerun6/6](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/daebd71fef7168d4266ea9a6bb7c928ddc295e9b/specs/029-member-popup-initials/independent-review.md) |
| 031 | /root/students, [parecer e rerun5/5](ops/independent-review.md) |
| 032 | /root, [parecer e rerun27/27](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/ddd4e82477c03507808f03a6858137d72e3ac9cb/specs/032-async-read-focus/independent-review.md) |
| 033 | /root/fr015, [revisão14/14 e achados resolvidos](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/1dbe3d42e6c4865ce0c49021f1cf98929c5a29ed/specs/033-admin-access-focus/implementation-evidence.md) |
| 034 | /root/fr015, [parecer e rerun4/4](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/2341275eac6c60054be00ef81b0e1a84619225ca/specs/034-local-mail-scheduler/independent-review.md) |
| Baseline | /root/students, [auditoria de recibos e rehash594/594](qa-independent-audit.md), sem nova execução de suites |

Para o próprio commit que vier a encerrar este handoff, seu SHA e review
final serão vinculados no corpo/timeline da PR #35 após o commit, evitando
autorreferência. Resolver `git log -1 --format=%H -- docs/reports/2026-10-25-hf-night-01/readme.md`
e comparar com o HEAD da PR #35. O review de c7b1638 é histórico e não se transfere
ao commit documental posterior. Qualquer alteração posterior exige review
próprio do novo HEAD.

## CI_AND_TESTS — testes e atribuição

Windows10.0.26200/x64, Node24.19.0/npm12.0.2. Baseline funcional:
`e718647365dfb904eb13c968babdc947963541bf75f239f2f1c266e2c418fa59`,
594 entradas verificadas independentemente; fonte08262dc+guarda própria.
Não equivale ao fingerprint de instrumentos posteriores.

- Setup: `npm ci --no-audit --no-fund`,553 pacotes/140.63s;
  `npx prisma generate`,6.42s após falha restrita de rede preservada.
- `npm run typecheck`:8.337s; `npm run lint`:32.399s,0 errors/2 warnings
  preexistentes;`npm run build`:157.799s/32 páginas após falha restrita de fonte.
- Unit:402+mail17=419 execuções PASS. Integration231, Migration37, Contract6,
  HTTPS2, Deletion3, Ihfr6 PASS. R1:17PASS já exercitados em outros gates,
  sem soma como17 casos únicos adicionais.
- RegressionSetup14 migrations, Bootstrap14 migrations, SchemaAudit0 schemas
  candidatos PASS no destino/coorte identificados. As15 categorias latestPASS
  vêm de execuções delimitadas; não se afirma pipeline CI/coorte única.
- E2E fresco v3:220/220PASS,0 skip/retry,562.901s,
  04:48:45.089Z–04:58:07.990Z;14 migrations/0 dados comprovados antes das fixtures.
- Quota sob demanda:2/2PASS com FakeCoverProvider e AreaCoverService,
  audit0 schemas. Não é recuperação ou validação científica IHFR.
- 030 pós-P2:18/18 testes strict e 18/18 rerun independente PASS. Comando:
 `node --unhandled-rejections=strict --import=tsx --test --test-reporter=tap --test-concurrency=1 tests/investigations/readiness/local-readiness-policy.test.ts tests/investigations/readiness/local-readiness-navigation.test.ts`.
 Um único novo real strict 22.308s,100 respostas após10 warmups, p95 nearest-rank
 54.9855ms/meta500, lista213.3963ms/meta2000,100 áreas/1000 hrefs,2 destinos/2 planos.
 Fingerprint600 entradas estável
 `46a9e540483c4e3748a8b185e7ea3e3fecf9ad5f2bbb8b7a748dec8c88aa2489`.
 Cleanup STOPPED/CLOSED/REMOVED,0 erros. Revisor conferiu o p95 sem segunda carga.
 O recibo8313 anterior(57.8354ms/252.1367ms) permanece como histórico.
 RED controlado9 casos/5 FAIL; dois controles antigos ainda mostram aborto antes
 de cleanup/recibo. Seis casos do helper de produção preservam erro e finalização,
 sem listener global; esse lifecycle é sintético, sem injeção de falha real no DB/browser.
- 029:`npx playwright test --config=tests/ui/member-popup.config.ts`,
 6/6PASS, unit9/lint/typecheckPASS; revisor6/6PASS.
- 032:`npx playwright test --config=tests/ui/async-read-focus.config.ts`,
 27/27PASS24.8s; revisor27/27PASS36.1s; lint/typecheckPASS.
- 033:`npx playwright test --config=tests/ui/admin-access-focus.config.ts`,
 14/14PASS; revisor14/14PASS13.3s; unit6/lint/typecheckPASS.
 O E2E403 existente passou10/10, retries0,33.753s no commitfb1523b, fingerprint
 `99988cbcc774faa898ef38289a9ca7a6b431d76866b2ca2e95b5d2744db771a4`.
 O HEAD1dbe3d4 altera somente três documentos/recibo; src/tests diff vazio.
- 031:`node --test tests/operations/ops-metadata-presence.test.mjs`,5/5PASS,
 revisão independente5/5PASS eCLIpreview exit2/18 ausências.
- 034:`node --experimental-strip-types --test tests/investigations/mail/local-scheduler.test.mjs`,
 4/4PASS e4/4rerunA; HTTP/guard reais em127.0.0.1, fila/accepted falsos.
 Timeout fail-stop não implica cancelamento do callback no servidor.

Os comandos completos, UTC, exit codes, durações e falhas pertencem aos recibos
de cada incremento. Sem total global de testes únicos. Os checks GitHub
consultados dos HEADs33–39 retornaram0; baseline local não é CI remota dessas branches.

Histórico preservado: E2E1 interrompido97/220, exit1, INCOMPLETE_BY_OPERATOR;
possíveis GETs públicos de tiles não verificados. E2E2:193PASS/3FAIL/24NOT_RUN;
E2E3:218PASS/2FAIL; focal403:9PASS/1FAIL. Reuso de fixtures/auditoria e atribuição
sintética inadequada foram HARNESS; timeout mobile90s conserva causa inconclusiva.
O fresco220PASS não apaga falhas ou demonstra causa universal do403.
031/032/033 guardam REDs e negativas próprias; novas negativas que já passavam
antes do reforço não foram apresentadas como REDs.

## Composição local das três correções

Snapshot de código `840cd1b6e51d7adc2fd196d177870ff513d5ad87`, branch
`test/hf-night-ui-combined-20261025`, árvore .worktrees/ui. Quatro cherry-picks
preservam autoria: daebd71, ddd4e82, fb1523b,1dbe3d4. A última revisão033 sozinha
é documental; o patch funcional está em seu pai. Root verificou15/15blobs
(9arquivos app+6UI) idênticos aos três HEADs fonte; único conflito foi vercel.json,
resolvido por união. Nenhum novo comportamento foi acrescentado.

Executor A: npm ci553/76.959s, Prisma6.825s, typecheck8.588s, lint15.086s
(0errors/2warnings), build21.110s, unit402+mail17/14.355s e47UI(6+27+14) PASS.
Coorte owned realmente nova,14migrations/0dados antes das fixtures;220/220E2E,
0skip/retries,06:17:07.381Z–06:26:39.050Z/571.669s. O teste403 existente passou.
Fingerprint601entradas
`1f11a53ef3a5510ad35033b9000d12b6ae10b4c7e6222c425880f3d5c7ff7eac`
antes/depois idêntico; PostgreSQL/Next encerrados, portas55427/3001 livres e dados
preservados. Isso valida esta composição; não transfere o baseline original.

Reanálise/converge Spec Kit029/032/033 reais:30obrigações FR/SC,31tarefas,
0gaps/novas tarefas, tasks intactas. Backendgates Integration/Migration/
Contract/HTTPS não repetidos porque backend/schema não mudaram e não houve
falha pertinente. Não é execução dos15gates sobre a composição.
C concluiu revisão independente e o plano foi arquivado. Publicação final
`456029f7cbbd5bdd22e35f59ee637b8b0c43a2e0`:
[recibos e relatório](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/456029f7cbbd5bdd22e35f59ee637b8b0c43a2e0/docs/reports/2026-10-25-hf-night-01/combined/readme.md) e
[parecer](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/456029f7cbbd5bdd22e35f59ee637b8b0c43a2e0/docs/reports/2026-10-25-hf-night-01/combined/independent-review.md). A branch é exclusivamente de verificação; as sete PRs
separadas são os candidatos para decisão humana. O Codex remoto cobre os
HEADs fonte; não se atribui essa revisão ao snapshot composto.

## Restore, protocolo e fronteiras de evidência

Clientes oficiais17.11, arquivo381531864bytes/SHA
`80379b2c04d51c30225532e0ae04509899141e9957ed096fe749d7fd9df8f82f`;
servidor17.10 original preservado. Dump228.742ms/restore466.482ms exit0.
26tabelas/105linhas e digests,14migrationchecksums,47FKs e17triggers coincidem;
o gate integral `FAIL/CATALOG_CONSTRAINT_MISMATCH` conserva as oito diferenças
de representação. Tentativas ENOENT e hash incorreto do helper privado foram
preservadas; nenhum servidor foi substituído.

[Análise atual e errata](restore-check-analysis.md) e
[protocolo executado imutável](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/bef9152a7e465f9e14fd106cbabb2d3efdbab40e/docs/reports/2026-10-25-hf-night-01/restore-check-analysis.md)
explicam AND reagrupado e casts de ARRAY/elementos, com referências primárias.
A hipótese intermediária de Prisma sem anotação foi afastada: os seis campos
pertinentes já usam @db.Timestamptz(3), consistente com migrations/catálogos.
Nenhum conflito ou PD novo foi criado por essa hipótese. Os dois blocos SQL
atual/histórico são byte-idênticos; a revisão narrativa posterior não foi executada.

B executou o protocolo e31 emREAD ONLY/ROLLBACK:94casos por base,188linhas,
31TRUE/41FALSE/22NULL por lado,0divergências. Root eC conferiram todas as linhas,
esperados, unicidade e tipos/NOTNULL/collations de19ocorrências. O scanner privado
recusou uma tentativa antes de conexão por ler DELETE no literal delete-account;
a recusa e correção ficaram separadas. Essa prova finita não modifica o FAIL
textual nem exercita INSERTs reais nem homologa roles/ACL/PITR/RPO/RTO/backups hospedados.

Os 59 artefatos QA têm
[manifesto público](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/6b9ed579912ee9ca1590cff41779232ade40d966/docs/reports/2026-10-25-hf-night-01/qa/public-artifact-manifest.json):
sha256/bytes/frozenUtc são a observação física original; gitSha256/gitBytes/objectID
identificam conteúdo publicado. C confirmou58/58 dos dois conjuntos;23 diferenças
exclusivamente CRLF→LF. O corte anterior existe em63c0fe0/3e0066 e o novo em aeb5492/6b9ed57; Git
preserva ambas as observações. O preenchimento de metadata Git não mudou
fontes ou recibos. Logs brutos, dump, credenciais, caches e
traces privados não foram publicados. Ignore não prova ACL universal; hardening
de sete logs locais não foi comprovado, conforme a auditoria.

## Encerramento das recomendações estudantis

Fonte imutável `d2168c840937a6120e32467f24cb46383e8dcd29`, quatro originais
na PR #33. Títulos/crédito preservados; identidade humana não inferida por conta
ou metadata de commit. Síntese atual atribuída ao agente documental.

| Item | Estado / evidência | Lacuna / responsável futuro |
|---|---|---|
| RTH-P2-001 | INFERENCIA — RESOLVIDO_DOCUMENTALMENTE:C1/matriz40 e4 apontadores na base | Aceites humanos/operação/ciência separados; FR015 tem PR #34 e testes próprios; A_DESIGNAR |
| RTH-P2-002 | INFERENCIA — TRATADO_POR_COMPOSICAO_FOCAL:merges29–32 e206 blobs#27 preservados;#28 inventariada |3 docs novos#28 ausentes/2 adendos distintos; destino27/28 depende decisão; A_DESIGNAR |
| RTH-P3-001 | DOCUMENTADO_SOB_DEMANDA:protocolos/seletores/custos na PR #33; QA amplia prova atual | Investigações separadas de CI usual; manutenção/custo A_DESIGNAR |
| RTH-P3-002 | PROPOSTA_DE_LIMPEZA_FASEADA:19 filtros/predicados e27 guardas inventariados | Consumidores/reruns externos não comprovados; nenhuma limpeza executada; A_DESIGNAR |

São conclusões documentais delimitadas, não decisões presumidas da equipe.

## SPEC_KIT e NATIVE_AGENTS

`SPEC_KIT=ACTUAL_COMMANDS_USED`:instalação1.0.4, skills em
`.agents/skills/`, constituição1.0.0 sem emenda. Specify→plan→checklist→tasks→
analyze→implement→converge nas features029–034 concluídas; reanálise/converge dos três incrementos na composição.
Clarify dispensado quando escopo inequívoco; extensão bug/hooks ausentes.
Documentação pura seguiu plano proporcional, sem feature artificial.

Scripts reais executados com Git Bash instalado. O contexto foi selecionado por
`.specify/feature.json` local ignorado ou pelas variáveis temporárias
`SPECIFY_FEATURE_DIRECTORY`/`SPECIFY_FEATURE`, usadas na composição sem persistir
feature.json. Nos diretórios de feature aplicáveis, os comandos foram:

```text
.specify/scripts/bash/resolve-template.sh spec-template --json
.specify/scripts/bash/setup-plan.sh --json
.specify/scripts/bash/check-prerequisites.sh --json --template checklist-template
.specify/scripts/bash/setup-tasks.sh --json
.specify/scripts/bash/check-prerequisites.sh --json --require-spec --require-tasks --include-tasks
.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks
```

Os marcadores de skills não foram simulados como comandos de shell.
Analyze foi read-only antes de código; converge sucedeu testes/revisão.

| Identidade nativa | Autoria / isolamento | Revisão independente |
|---|---|---|
| /root | Coordenação,031 na worktree original,034 em .worktrees/mail | Estudantes,029,032; publicação única |
| /root/fr015 | 029 em .worktrees/fr015;032 em .worktrees/af; execução em .worktrees/ui | 030/P2,033,034 e fechamento documental |
| /root/qa | Baseline/030 em .worktrees/qa | Replay real033 em runtime admin próprio, sem autoria do patch |
| /root/students | Estudantes em .worktrees/students;033 em .worktrees/admin | 031, recibosbaseline/restore, fontesOPS |
| /root/fr015/focus_review | Filho somente leitura da triagem032,0 cenários próprios/sem edição | Crítica antes da implementação; terminou antes da reativaçãoC |

Quatro subagentes reais ao longo das ondas; máximo quatro participantes
concorrentes incluindo coordenação. A(/root/fr015), B(/root/qa) e C(/root/students)
foram configurados gpt-6.1-sol/ultra; filho herda o autor. Esforço do coordenador sem seletor
verificável exposto; nenhuma reconfiguração fictícia afirmada.

Autoria exclusiva, autores não aceitam seu próprio delta. Worktrees anteriores
preservadas; sem reset/clean/stash/remoção. Gerados/dados/logs privados ficam
ignorados;34 logs movidos foram rehashados/ignorados independentemente.
`.worktrees/` é diretório local deliberadamente não staged no coordenador.

## Contenção e fontes operacionais

`VERCEL_GUARDS=27_BASE_FALSE_PLUS_EXACT_OWN_FALSE`: cada uma das sete árvores
individuais tem28 false, conserva as27anteriores e somente sua própria adicional.
A oitava árvore de verificação preserva27base+3guardas fonte+própria=31false.
Não há guarda true/coringa nova, remoção ou generalização. As sete PRs individuais permanecem isoladas; a composição reúne somente as
três guardas fonte identificadas, além da própria. RevisorA confirmou as sete árvores individuais; root verificou a composição.
Nenhuma remoção ou limpeza de guarda foi executada.

O único workflow rastreado na base,`rc-review.yml`, mantém19 filtros de push
e19 predicados fechados, sem as branches novas;`workflow_dispatch` sujeito ao
mesmo predicado. Nenhum workflow/settings externo alterado. Main não tem
workflow rastreado. As seis inscrições antigas de Actions retornaram404 para
conteúdo no main no preflight; isso não prova inventário universal de hooks.
Consulta Vercel das oito branches publicadas às07:10:31UTC retornou0 deployments
em todas, dentro dessa observação limitada; rootDirectory/Git settings não expostos pelo conector continuam
NOT_EXPOSED. Draft/skip-ci não foram usados como contenção.

Fontes OPS locais em`943e21d325e65ec210a6e6c69e311d9fded1cdfc`:
consulta focal do coordenador e leitura integral9/9 por C,35 chunks, com hashes
e paths no [recibo independente](qa-independent-audit.md). Não foram migradas,
promovidas a autoridade atual ou confundidas com publicação remota.

## Arquivos, revisão e verificações não realizadas

O [plano transversal](../../plans/active/hf-night-01-20261025.md) permanece
AGUARDANDO_REVISAO humana; a execução local está concluída e seus bloqueios
estão registrados. [Parecer independente do fechamento](final-independent-review.md).

No checkout coordenador, o delta contém o verificador031 em
`scripts/ops-metadata-presence.mjs`, seus testes em`tests/operations/`,
`specs/031-ops-metadata-presence/`, relatórios`ops/`, este handoff/ledger e
as auditorias/protocolo ligados acima. Os arquivos das outras entregas estão
nos Files Changed das PRs e nos manifestos de QA/composição; não foram
copiados para esta branch para simular integração.

Não realizados: homologação/restore/PITR/RPO/RTO/roles/ACL hospedados, env/SMTP/
inbox/scheduler/provedor reais, piloto e aceite assistivo/dispositivo/humano,
validação científica. Na composição não se repetiram os gates de backend
inalterado; seus PASSs anteriores não foram transferidos. Não houve auditoria
universal de rede, configurações remotas ou ACLs locais. Nenhum gate humano foi
fechado por testes sintéticos. TECH_DECISIONS/PENDING_DECISIONS/DOCUMENT_REGISTER
não receberam decisão nova presumida; o checkpoint aditivo de PROJECT_CONTEXT
está na PR33 e os históricos/autoria/docs/raw foram preservados.

## Limites e menor próximo ato

[G3–G5](ops/runbook.md):`G3=BLOCKED; G4=BLOCKED; G5=BLOCKED`.
`AUTOMATED_A11Y_PASS` aplica-se somente aos cenários locais explicitados;
`HUMAN_ASSISTIVE_ACCEPTANCE_PENDING`. Simulação de reflow200% não substitui
zoom/dispositivo/tecnologia assistiva reais, teste com participantes ou piloto.

`IHFR=CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

`HUMAN_DECISIONS_REMAINING`:

1. Quem assume plataforma/DB/restore, contas/mail/job, produto/UX e suporte,
 e qual destino/SHA/target isolado será autorizado?
2. Quais backup, retenção/RPO/RTO e restauração descartável serão aceitos?
3. CAPAS_OFF basta ao recorte ou CAPAS_ON exige homologação/custos/cleanup?
4. Quais participantes, dispositivos/assistiva, janela e autoridade concederão
 aceite de UX e eventual piloto após os gates?

`NEXT_ACTION`: revisar os Drafts33–39 e designar responsáveis/destino isolado
para futura homologação explicitamente autorizada. Publicação e review do
próprio HEAD deste handoff ficam vinculados na PR35. Restore operacional,
SMTP/provedor, merge e aceites humanos continuam fora da execução desta missão.
Nenhum PENDING, accessCode, convite ou Plotly foi transformado em nova regra.
