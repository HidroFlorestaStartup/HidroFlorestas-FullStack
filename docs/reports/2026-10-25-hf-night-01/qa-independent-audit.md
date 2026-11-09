# Auditoria independente dos recibos de baseline QA — HF-NIGHT-01

Revisor: `/root/students`, 2026-10-25. Escopo delegado: leitura do baseline QA e
escrita somente deste parecer, etapa de revisão do plano transversal HF-NIGHT-01.
Sem autoria dos comandos/gates ou dos recibos QA. O revisor é autor da correção
033 em outra worktree; esta auditoria não constitui revisão independente desse
próprio patch, nem transfere os resultados do baseline para ele.

## Parecer

`RECOMENDACAO`: **APTO_COM_RESSALVA_DOCUMENTAL_P3** para a apresentação dos
resultados do baseline. Confirmados por leitura **14 categorias de gate fora de
E2E com PASS e o E2E fresco com220PASS**, com exit0 nas fontes respectivas.
Não foi identificado P0–P2 na consistência dessas contagens. O P3 abaixo exige
acertar a proveniência de quatro logs antes da publicação do pacote QA.

`EVIDENCIA_IMPLEMENTACAO`: o revisor recalculou594/594 hashes do manifesto
funcional, sem diferença, e `sha256(JSON.stringify(functionalManifest))` resultou
em `e718647365dfb904eb13c968babdc947963541bf75f239f2f1c266e2c418fa59`.
São594 caminhos únicos e ordenados. Base identificada:
`08262dc57c1ad365244f9ec6902b1e4be39e2d7d`, branch
`test/hf-night-baseline-20261025`, com guarda Vercel própria adicionada pelo
coordenador. Base SHA não significa árvore sem essa guarda.

**Nenhum teste foi executado pelo revisor nesta onda.** A verificação própria
consistiu em leitura, parsing, contagem, rehash de arquivos e comparação de
metadados. Não houve servidor, browser, banco, SQL, provedor, push ou operação
de PR por esta autoria.

## Fontes e método

Foram lidos `qa/baseline.json`, manifesto/fingerprint, provas da coorte fresca,
reproduções, excertos sanitizados e os três coletores efetivamente existentes:

- `qa/baseline-results.jsonl`:11 comandos PowerShell de setup/retries, incluindo
  uma anotação do terceiro replay; não é o ledger dos15 gates.
- `qa/results.jsonl`:um registro do collector Unit.
- `.accounts-validation/results.jsonl`:15 registros de PostgreSQL/E2E, com
  reexecuções de RegressionSetup e quatro E2E. É material privado/ignorado.

O path `baseline-results/results.jsonl` mencionado no handoff não existe neste
corte; não foi criado ou presumido. O consolidado sanitizado final é
`qa/baseline.json`. JSONL com BOM UTF-8 inicial foi interpretado removendo apenas
esse marcador em memória. Logs PowerShell UTF-16LE foram decodificados pelo BOM;
nenhum arquivo de origem foi normalizado ou escrito pelo revisor.

Comandos de leitura/verificação: `Get-ChildItem`, `Get-Content`, `rg` focal em
fixtures/testes existentes; Node `readFileSync`/`JSON.parse`/`createHash` para
rehash e contagens; `git check-ignore --quiet -- <path>` para conferir a
classificação dos logs. Nos logs privados foram extraídos somente contagens,
exit/result, tempos e localização de testes; não foram copiados valores de
ambiente, parâmetros SQL, cookies, credenciais, commandlines pessoais ou provas
brutas. Não foi solicitada nem executada nova rodada de QA.

## Contagens e atribuição

`EVIDENCIA_IMPLEMENTACAO`: os15 `latest` de `baseline.json` coincidem com as
fontes nos exit codes, instantes finais e contagens. Durações abaixo são do
comando/collector, incluindo preparação; não devem ser confundidas com o tempo
interno de cada teste. Sem total global de testes únicos: há subconjuntos e
reexecuções.

| Gate | Resultado lido | Duração do comando | Fonte/coorte |
|---|---|---:|---|
| RegressionSetup | PASS,14 migrations |6,290s| V3 fresca; V2 anterior também PASS, contado uma vez como categoria |
| Unit | PASS,402+17=419 execuções,0skip |23,220s| Collector Unit; fakes/SMTP loopback, sem exigir banco |
| Integration | PASS,231 |161,921s| V2 owned local |
| Migration | PASS,37 |18,590s| V2 owned local |
| Contract | PASS,6 |10,652s| V2 owned local |
| R1 | PASS,17 |10,862s| Subconjunto já exercitado; **não somar17 como casos novos** |
| Build | PASS,32 páginas geradas |157,799s| Retry de rede após falha restrita de fonte; histórico preservado |
| Typecheck | PASS |8,337s| Comando registrado em baseline-results.jsonl |
| Lint | PASS,0errors/2warnings |32,399s| Avisos preexistentes, sem tratá-los como zero warnings |
| Https | PASS,2 |38,510s| V2 owned local |
| Deletion | PASS,3 |11,311s| V2 owned local |
| Ihfr | PASS,6 |62,259s| Engenharia experimental, sem validação científica |
| Bootstrap | PASS,14 migrations |3,473s| Bootstrap sintético limpo, distinto de restore operacional |
| SchemaAudit | PASS,0 candidate schemas |0,660s| Somente o destino owned selecionado da V2 |
| E2E | PASS,220/220,0FAIL/NOT_RUN |562,901s| V3 fresca,04:48:45.089Z–04:58:07.990Z |

O consolidado descreve15 categorias com resultado mais recente PASS. Ele não é
um único pipeline atômico executado numa coorte única, nem execução CI. O PASS
de SchemaAudit da V2 não vira automaticamente auditoria universal dos bancos ou
da V3 após todas as operações posteriores.

## Histórico E2E preservado

| Execução | Evidência confirmada | Interpretação limitada |
|---|---|---|
| E2E1,04:08:31Z |97 linhas de casos PASS de220 planejados; collector FAIL/exit1 e interrupção04:14:45Z| `INCOMPLETE_BY_OPERATOR`; não atribuir assertion FAIL aos97 concluídos nem inventar contagem exata de NOT_RUN no restante |
| E2E2,04:15:08Z |193PASS/3FAIL/24NOT_RUN| Fontes: preparo de áreas, atribuição cartográfica e foco403 administrativo; preservar cada achado |
| Focal403 |1/1PASS isolado; depois9PASS/1FAIL de10,35,7s, retries0| Intermitência reproduzida; alerta presente/tabindex-1, `activeElementTag=NOT_CAPTURED` |
| E2E3,04:31:25Z |218PASS/2FAIL| Fontes distintas: mobile reading area em frontend-mobile-navigation.spec.ts:95 e conflito/revisão em frontend-user-administration.spec.ts:72; não contar como outra falha403 |
| E2E fresca V3 |220PASS,0FAIL/NOT_RUN| Novo estado de fixtures e prova de vazio antes dos testes; não apaga as falhas anteriores |

`FATO_DOCUMENTADO`: E2E1 foi interrompido para conter possíveis GETs públicos
de tiles; a ausência de captura de rede conserva `POSSIBLE/UNVERIFIED`, sem
provar egress zero retrospectivo. O comprovante posterior de chunk compilado
mostra configuração loopback, sem pretender ser captura universal de tráfego.
A atribuição canônica foi restaurada após o controle sintético inadequado, sem
mudar assertions do produto.

`EVIDENCIA_IMPLEMENTACAO`: o recibo de reutilização administrativa registra dois
eventos persistidos e dois IDs distintos, omitidos na prova pública. O helper
existente usa upsert de contas/reset de estado e revisão, sem limpeza de
auditoria nessa preparação. Isso distingue registros persistidos duplicados
por repetição do recorte de uma hipótese de renderizar uma única linha duas
vezes. O PASS fresco não autoriza excluir auditoria antiga ou afrouxar locator.
`INFERENCIA`: a coorte reutilizada explica a ambiguidade da seleção de motivo
repetido no recorte demonstrado; não resolve por associação a causa do timeout
mobile ou a causa universal do comportamento403.

`FATO_DOCUMENTADO`: QA comunicou que o mobile E2E3 atingiu90s em
settleTransitions/page.evaluate e conservou causa inconclusiva; no admin E2E3,
o foco do status já havia passado antes do locator estrito encontrar dois
eventos com motivo igual. Essa informação da autoria QA complementa as fontes
de testes/contagens lidas; não foi reexecução nem SQL próprio do revisor.

## Coorte fresca

`EVIDENCIA_IMPLEMENTACAO`: em04:46:32Z, a prova pré-instalação V3 registra raiz
nova, ausência de data/credencial/marker e cópia somente do pacote binário. Em
04:48:44.749Z, após14 migrations e antes das fixtures, o recibo registra zero
users/laboratories/memberships/areas/collections/audit_events, referência pública
vazia e destino local verificado. O E2E fresco começou depois desse recibo.
O identificador de cluster é representado somente por hash; nenhum valor
de conexão foi lido pelo revisor. Esses são recibos QA conferidos, sem consulta
própria ao banco.

## Achado de proveniência

| ID | Severidade/estado no corte | Evidência | Tratamento requerido |
|---|---|---|---|
| QA-AUDIT-001 | P3 documental, ABERTO | `latest.rawLog.privateIgnored=true` de Unit/Build/Typecheck/Lint aponta a quatro logs em docs/reports/.../qa. `git check-ignore` retornou1: estão não versionados, porém não ignorados. Os logs PG em .accounts-validation retornaram0, coerentes com o rótulo. | `RECOMENDACAO`: mover os quatro logs ao destino privado/ignorado e atualizar os ponteiros, ou registrar corretamente privado/não versionado/não publicado antes do commit. Rechecar metadados e stage por whitelist; não incorporar logs brutos. |

O achado foi comunicado ao autor QA e ao coordenador. Não altera os exit codes,
contagens ou o fingerprint comprovados. A intenção de manter logs privados não
substitui a situação observada de ignore. O coordenador confirmou que nenhum
`.log` bruto será incorporado e que fará staging por caminhos explícitos.
Este parecer pode receber adendo de fechamento após a correção verificável.

## Identidades dos inputs lidos

Hashes SHA-256 dos bytes locais deste corte, antes da correção de proveniência.
Prefixo `qa/` refere-se à pasta de recibos na worktree QA; o collector privado
não é apresentado como arquivo publicado ou link de distribuição.

| Fonte | SHA-256 |
|---|---|
| `qa/baseline.json` | `5c06843accfdf94914d119a779f81f307a3226b316fdf1d5213de7d2d64b1a88` |
| `qa/13-baseline-fingerprint.json` | `96fac655ed24fe20027ebf8a16107bc3d37480dfd4c424d4347f2629fe7bdc79` |
| `qa/30-fresh-v3-empty-proof.json` | `6c49f9ef55eb77dc9f6e3b145551ede7a5875f279464c3b51c37db3a536bc26f` |
| `qa/28-fresh-cohort-v3-preinstall.json` | `9786317df6ca3fbdd0be04c18b4c91f3b55693402f7926e1ce92dc0954fe3bc2` |
| `qa/baseline-results.jsonl` | `689fccda6860bffd8598e073ae02d32965e894f03bd052fc4654beccfa88538d` |
| `qa/results.jsonl` | `1c131e2aa702320f85c5d701d4dfb6f915882bc9a326ac77afeee2642a6fac92` |
| `qa/admin-focus-reproduction.json` | `a70109d6b0250ab7d0f53c43c618fb190042b95f0035e9e821b5a0e80f8480a1` |
| `qa/admin-audit-reuse-count.json` | `a888cd700b6bf9f85babca1bd0eafacaf93741a9b1426ab5fa5ed02172e9645d` |
| `qa/sanitized-excerpts.md` | `70a258114d9cf4df7320bafeafee1e0d417b96a429a55cc892e7e50d14385bcf` |
| Collector privado `.accounts-validation/results.jsonl` | `feae9a88112d836ab1997693e3a8cd0272282a5f6e401e95aa941ba37dad3c9e` |

## Limites de conclusão

Não foram avaliados nesta onda: conclusão da spec030, restore ou o replay real
da correção033. Cada frente conserva seu recibo e revisão próprios. Nenhum
resultado do baseline é transferido para outro SHA ou para aceite de produto,
dispositivo/tecnologia assistiva real, operação hospedada ou piloto. G3/G4/G5
continuam separados; build local, CI remota, merge e homologação são atos
distintos. O revisor não consultou CI remota nem alterou PRs.

IHFR permanece `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO` e
`NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

## Adendo de proveniência — P3 fechado em 25/10, 05:36 UTC

`EVIDENCIA_IMPLEMENTACAO`: **QA-AUDIT-001 RESOLVIDO_DOCUMENTALMENTE**.
O estado inicial acima permanece histórico. O autor QA moveu 34 logs brutos
para `.accounts-validation/hf-night-private-logs/` e publicou somente o índice
sanitizado `qa/private-log-index.json`. A rechecagem independente encontrou
**34/34 origens ausentes, 34/34 tamanhos coincidentes, 34/34 SHA-256 coincidentes
e 34/34 destinos ignorados pelo Git**, sem falhas. Os bytes foram lidos somente
para hashing; nenhum conteúdo bruto foi impresso, copiado ou incorporado aqui.

Também foram conferidos os 35 apontamentos `relativePath`/`privateIgnored` do
baseline, contando referências repetidas em `latest` e `attempts`: todos
resolvem para arquivos existentes e ignorados. Os quatro gates inicialmente
afetados e o retry de build agora apontam ao diretório privado. A leitura de
metadados de quatro referências foi repetida fora do sandbox após a consulta
restrita não confirmar existência; a checagem aprovada confirmou os arquivos,
sem alterar ACLs ou ownership. Ignore do Git não equivale a garantia universal
de ACL de cada arquivo; o autor preservou a limitação de hardening de sete
logs. Essa limitação não invalida a correção de proveniência Git verificada.

Fontes deste adendo, SHA-256 dos bytes efetivamente lidos:

| Fonte | SHA-256 |
|---|---|
| `qa/baseline.json` | `f31bb0372865729369dc6995764396b08ef0bb4e8fe03de4b7c57a352e3b3be6` |
| `qa/private-log-index.json` | `b001b8bebc2df7c2208d5dd57c496212aedd2a3b45f6f5df715e0a9aa20b3663` |

`RECOMENDACAO`: **APTO_DOCUMENTAL** quanto à consistência do baseline e à
proveniência dos logs neste corte. Nenhum novo gate foi executado, e a ressalva
P3 fechada não altera os resultados, coortes ou limites históricos anteriores.

## Recibo de leitura integral das fontes OPS históricas

`EVIDENCIA_IMPLEMENTACAO`: `/root/students` leu integralmente os nove paths no
objeto Git local `943e21d325e65ec210a6e6c69e311d9fded1cdfc`, via
`git show <SHA>:<path>`, em 35 blocos de até 75 linhas e 5500 caracteres. As saídas
truncadas foram relidas em blocos individuais antes de contar a conclusão.
Esta declaração identifica a leitura deste revisor; não atribui leitura
integral pessoal ao coordenador. O objeto local não comprova publicação remota.
Nenhuma fonte foi migrada, reescrita ou promovida a aprovação atual.

Prefixo `ops/` da tabela significa
`docs/reviews/20261024-hf-ops-g3g5-read01/`. Intervalos incluem linhas vazias
terminais exibidas pela leitura; todos os blocos de cada arquivo foram lidos.

| Path no objeto | Linhas lidas | SHA-256 dos bytes Git |
|---|---|---|
| `docs/plans/completed/hf-ops-g3g5-read01-20261024.md` | 1–62 | `160daffa6069642d7e97f9ac57017bb0472f57652ccf4143ee2b2a31561439ed` |
| `ops/checklist-operacional.md` | 1–84 | `869d3f76df002a7c489298140af6a97924c1fa2e210acc02e256ae18eed9a745` |
| `ops/evidencias-preflight.json` | 1–371 | `0d8aaabaf0b8c06849460267df480f6ad38ea1950bf407cdff8d2989546ad7a5` |
| `ops/frente-a-contas.md` | 1–142 | `3e1d805f42031bbe14c54b7b888df4b846cdd90ffdabf7ec8ecb5d2386fa70e2` |
| `ops/frente-b-banco-recuperacao.md` | 1–129 | `0705543be9cf41c6f36732e03dd47385be24cd7383f3cc37f03d0dfea067491a` |
| `ops/frente-c-piloto-ux-suporte.md` | 1–142 | `399ae20f7bac2ce2499b9e86f288246a2c093a678ed59c393c01ade795ff8027` |
| `ops/relatorio-operacional.md` | 1–126 | `88c5ad40f7ac90adc39ed51cb7d0a3ac1028031217055522554d50e0dc1e6f71` |
| `ops/revisao-independente.md` | 1–37 | `3cae46743ca655874bc44f30a4880dc8d880a2db785081c51fd353a720046c91` |
| `ops/validacao-documental.json` | 1–58 | `8b74e05f4f338978fb0964dfb3d6f325aa9c075d8c6af4bddb5a9693567dbb15` |

Os oito hashes de fontes registrados no recibo histórico foram recalculados e
coincidem 8/8; o hash de `validacao-documental.json` daquele objeto histórico
foi calculado separadamente. Seu PASS
documental de 24/10 e o bloqueio de publicação daquela branch não foram
transferidos para a branch ou para os testes desta missão.

`INFERENCIA`: o instrumento 031, o manifesto do baseline com as 14 migrations
e o ensaio 030 têm recortes relacionados às recomendações antigas, mas não
fecham isoladamente G3/G4/G5. Não foi localizado nessa leitura outro ato local
obrigatório que justificasse reabrir decisões humanas. Um ponto local de
evidência merece conferência no novo recibo de restore: comparação de
cardinalidades, migrations/checksums, FKs e CHECKs entre origem e destino,
preservando separadamente a diferença textual histórica dos oito CHECKs.

`RECOMENDACAO` repassada ao QA: examinar `AccountEmailChallenge_bounds`,
`AccountRequest_action_check`, `CoverCleanupJob_kind_check`,
`CoverCleanupJob_resourceType_check`, `CoverCleanupJob_state_check`,
`CoverUploadAttempt_state_check`, `MailOutbox_bounds` e
`MailRateLimitBucket_bounds` no restore próprio, com definição de catálogo e
contexto de mesma major PostgreSQL identificados. Igualdade observada no novo
ensaio não reescreve o FAIL textual antigo nem prova todos os limites/NULLs por
execução. Não normalizar o histórico ou a expressão para forçar PASS. A revisão
do recibo novo permanece separada desta leitura OPS, sem declarar030 concluída.

Propostas CAPAS_OFF/ON, owners, participantes, suporte, job FullStack,
transporte/recebimento/consumo de e-mail, destino isolado e recuperação
hospedada, dispositivos/assistiva e aceites humanos conservam a classificação
e a autoridade das fontes. Não houve consulta de provedor, comunicação,
aprovação operacional/de produto/ciência ou novo teste nesta leitura.

## Adendo de provas locais fora do baseline

`EVIDENCIA_IMPLEMENTACAO`: os resultados seguintes foram apenas relidos pelo
revisor. Não são novos gates do baseline e não entram em suas somas.

**Replay real da033.** O recibo
`.worktrees/admin/specs/033-admin-access-focus/evidence/real-e2e.json`
(SHA-256 `1cb685d6d6a4c216c7e44493ca21f061ef3265a111b67bd10c559961ab57d45a`)
registra o teste existente de 403: **10/10 PASS, 0 falhas, 0 skips, 0 retries**, um
worker, exit 0, 33,753 s entre 05:11:04.303 e 05:11:38.057 UTC. A identidade é
`fb1523b4ef77c9dc96c8d1816335b40674aee972`, fingerprint antes/depois
`99988cbcc774faa898ef38289a9ca7a6b431d76866b2ca2e95b5d2744db771a4`, runtime
próprio fresco e distinto do QA `e718…`. A prova de banco fresco registra 14
migrations e zero usuários/laboratórios/áreas/coletas/eventos antes das
fixtures. Não transfiro esses resultados ao baseline ou a outros cenários.

O SHA-256 físico do teste coincide com o recibo
(`6bb96c9db8a6e33755adb38fc34f747a0d241d671777116616db79d196808f6b`).
O blob Git desse teste no commit033 e na base é idêntico
(`6068ca3a3ed6a97dfd46ee5d871a64084ccf7cf0b9063931fd319a6bd68e0b92`).
O checkout tem 280 CRLF; a conversão somente em memória para LF é byte a byte
igual ao blob, e o diff rastreado do teste está vazio. A asserção existente
continua exigindo foco do alerta após HTTP 403 real, remoção da linha/detalhe e
ausência do diálogo. O revisor é autor do patch033: esta conferência do recibo
QA não substitui a revisão independente do código realizada por outro autor,
nem encerra a causalidade universal do problema intermitente original.

**Quota de capas em duas chamadas.** O collector sanitizado
`qa/investigation-results.jsonl` preserva duas tentativas: a primeira saiu 1
em 2,7408161 s, e a segunda saiu 0 em 5,8536003 s com
`--conditions=react-server`. A extração privada minimizada encontrou no primeiro
log o erro de importação `server-only`, 1 teste de arquivo falho e 0 PASS;
isso não é RED de uma assertion do produto. O retry registra **2 testes,
2 PASS, 0 falhas, 0 skips**, duração do runner 2848,959 ms. O tempo do wrapper
inclui setup/auditoria, portanto não é a duração isolada dos dois testes.

O teste existente `tests/investigations/ihfr/two-request-quota.test.ts` usa
`AreaCoverService`, provedor falso e PostgreSQL próprio; o nome do diretório
não faz dele validação científica do IHFR. Cada um dos dois schedules libera
um vencedor diferente antes do INSERT concorrente. As projeções sanitizadas
confirmam 9 tentativas/36 jobs antes e 10/40 depois, um sucesso, uma recusa
`RATE_LIMITED` e um erro de serialização `40001` em cada schedule. São duas
chamadas novas por schedule, não uma bateria geral de concorrência, HTTP real
de capas, prova de custo/Cloudinary ou equivalência à investigação anterior de
quatro operações em três ondas.

Os hashes dos dois logs privados coincidem com o índice público:
`276849c7c08b0d9d4a7d0fabd7ecf8550d72f6f5a1a60b8310995ab0659fba02`
(tentativa inicial) e
`1dcabf22a9142cf561b4be76e45eea659e3bfac2e56af0b75fe74fb1f1c80d56`
(retry). Foram publicados aqui somente resultados, contagens, códigos e tempos;
snapshots transacionais, identificadores e linhas brutas não foram copiados.
O fechamento do pacote030 e seu teardown integral ainda dependem do recibo
final correspondente; o revisor não os deduz desses dois PASS.

Recibo público posteriormente lido: `qa/quota-investigation.json`, SHA-256
`4a80625c2c3d97c18d31d5d27608dac4bc8aa441c9054c94357007eb827410cd`.
Sua identidade08262dc/`e718…`, contagens, schedules e durações coincidem com
as extrações acima. O recibo declara auditoria exit0 e zero schemas candidatos
no banco PostgreSQL próprio selecionado. Esse é o alcance do teardown de
quota, sem extrapolação para outros bancos/processos ou para a conclusão030.

## Adendo de restore sintético e diferenças CHECK

`EVIDENCIA_IMPLEMENTACAO`: foram lidos os três recibos preservados e o
diagnóstico da preparação. Nenhum comando de banco ou cliente foi executado
pelo revisor.

| Tentativa/fonte | Resultado observado | Limite |
|---|---|---|
| `qa/synthetic-restore-attempt1.json` | FAIL, exit1, 990,5533 ms; primeiro stage pg_dump falhou em 1,8085 ms; preflight separado constatou ENOENT dos utilitários | Não houve restore bem-sucedido nessa tentativa. |
| `qa/synthetic-restore-attempt2.json` | FAIL, exit1, 218,2911 ms; SERVER_BINARY_CHANGED no preflight; zero stages | O nome do erro não comprova alteração do servidor. |
| `qa/restore-preflight-diagnosis.json` | QA registra HARNESS_HASH_SERIALIZATION_ERROR: helper privado hashava JSON.stringify(Buffer); bytes esperados/observados e versão17.10 coincidem | Corrigir o método de hashing preservou a tentativa falha; não se forçou o hash esperado. |
| `qa/synthetic-restore.json` | Dump exit0/228,7417 ms e restore exit0/466,4824 ms; gate integral FAIL, exit1/1232,1027 ms, CATALOG_CONSTRAINT_MISMATCH em target invariants | Êxito dos dois comandos não substitui os invariantes do gate. |

O recibo final identifica clientes17.11 extraídos do arquivo EDB com
SHA-256 `80379b2c04d51c30225532e0ae04509899141e9957ed096fe749d7fd9df8f82f`
e381.531.864 bytes, sem instalação sistêmica ou substituição do servidor.
O servidor17.10 mantém hash
`db14ddb0efc10b72b57dc29dbce5a719e2755dcd0ae54297d0ea4bbfc75f79a0`.
O dump privado tem120.247 bytes, SHA-256
`2583ba7edc7332561b14a859b58f220d6c5996475903e6cf56ed3698b0988d32`;
seu conteúdo não foi lido ou publicado nesta auditoria.

A conferência estrutural do JSON encontrou26 tabelas únicas,105 linhas
por lado e26/26 pares de cardinalidade/digest declarados coincidentes;
14 migrations únicas, completas e com checksums source/target idênticos;
47 FKs por lado e17 triggers habilitados por lado, sem trigger desabilitado,
com igualdade declarada das respectivas definições/flags. Os oito CHECKs
solicitados estão presentes e validados nos dois catálogos, mas8/8 expressões
e o hash agregado de constraints diferem. Não foram calculados novos digests
de dados a partir do banco pelo revisor.

Importa separar proveniência: os bancos retidos derivam da coorte QA v3
08262dc/`e718…`, com uma probe sintética adicionada na primeira tentativa;
o instrumento que produziu o recibo final registra fingerprint
`8bb76bf268fd92b7addfbd5b5f48de2e594599b6e366ab320c0a5cd6703a096d`.
Não é uma nova execução do baseline, backup hospedado, teste de roles/ACLs,
PITR/RPO/RTO ou reconciliação de efeitos externos. Várias tabelas relevantes
estão vazias; igualdade desses dados existentes não prova limites inválidos.

`INFERENCIA`: as duas diferenças de associação AND e as seis de cast de ARRAY
são compatíveis com equivalência das expressões particulares sob os mesmos
tipos/operadores/collations. A análise individual, referências primárias PG17,
guard de metadados/NOT NULL e94 vetores por banco estão no
[protocolo de CHECKs](restore-check-analysis.md). Ele mantém as16 expressões
literais, três valores por comparação e BEGIN READ ONLY; execução e revisão do
protocolo ainda estavam pendentes na sua preparação. Não converto essa
inferência ou um futuro PASS amostral em PASS do gate textual original.

`RECOMENDACAO`: parecer **APTO_DOCUMENTAL_COM_LACUNA_TECNICA_EXPLICITA** para
apresentar esse restore como comandos bem-sucedidos e invariantes parcialmente
comprovados, com o gate integral FAIL preservado. A evidência adicional finita
deve ter recibo próprio e conservar os resultados de cada tentativa.

| Fonte lida | SHA-256 |
|---|---|
| `qa/synthetic-restore-attempt1.json` | `c5dfa7590e24df6d41b143b24a3960430e4a4456cd58c8e43699c2b25f42357d` |
| `qa/synthetic-restore-attempt2.json` | `68817ccd0a720b270db2f85ddb8f09b737aa56d98857009a930785196779cc64` |
| `qa/restore-preflight-diagnosis.json` | `43b664c71b09bc2bc064b0c4db8439808e310ecb48977ba4184ef9dd27273fbd` |
| `qa/synthetic-restore.json` | `d129fc583c9ab91b06aeadcdd61885a9fefcd09b863f1b89e5d05ef4be4286c2` |
| `qa/edb-client-download.json` | `1870cff92a0bc79ae2a8a51c119e0dd82fdc9ba4fcadd4f7e16dc08583fbc6a0` |
| `qa/edb-client-extraction.json` | `f232738467a9facffde02ac328c84c812b2cb9eb415fb1a33aed4206a5dcbec1` |

`EVIDENCIA_IMPLEMENTACAO` posterior: `qa/restore-check-metadata.json`, SHA-256
`6457bb46a75146bbfce41a372c068a3dd751652dbbe7b2fcd64e0c2905e23c58`,
registra a coleta QA autorizada em06:04:08 UTC,162,8285 ms,exit0: apenas
catálogos, zero vetores. Parsing independente confirmou duas roles, oito
expressões exatas do respectivo lado do recibo sem drift,19 ocorrências de
colunas por lado, tipos/typmods/NOT NULL/collations compatíveis e todas NOT NULL;
READ ONLY e ROLLBACK verdadeiros nos dois lados. As seis ocorrências temporais
são `timestamp(3) with time zone`. Esse resultado determinou as fixtures
TIMESTAMPTZ+00 do protocolo, após revogação da proposta intermediária sem TZ.
Nenhum schema ou CHECK foi alterado; os vetores ainda dependem do gate próprio.

## Fechamento da revisão dos vetores CHECK — 06:09 UTC

`FATO_DOCUMENTADO`: o coordenador revisou e liberou o protocolo final
`e31beb00fe00d51098a5f6d138c6a7ef7d792ec63150bdf431575b464af3a6f6` nesta sessão.
O [blob histórico do protocolo executado](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/bef9152a7e465f9e14fd106cbabb2d3efdbab40e/docs/reports/2026-10-25-hf-night-01/restore-check-analysis.md)
foi congelado nesse hash. Seu estado de preparação permanece nesse objeto;
a [versão documental posterior](restore-check-analysis.md) contém a errata
narrativa abaixo, com os mesmos blocos SQL e sem nova execução. Este adendo
registra a execução QA e sua conferência documental.

`EVIDENCIA_IMPLEMENTACAO`: `qa/restore-check-probes-attempt1.json` preserva
FAIL/MUTATION_REFUSED, exit 1, 3,3561 ms, com zero roles executadas. O recibo final
registra a correção do scanner privado, que confundira o literal permitido
`delete-account` com comando DELETE. Ignorar strings/identificadores/comentários
no scanner não alterou o literal ou nenhuma das 16 expressões do protocolo.
Essa recusa de preparação não é uma falha de CHECK executado ou RED do produto.

O recibo `qa/restore-check-probes.json` registra **PASS, exit 0, 172,2687 ms**,
06:09:00.812–06:09:00.984 UTC. A conferência independente extraiu do SQL
congelado os 94 pares CHECK/caseId e os esperados literais, sem executar SQL.
Comparou cada linha do recibo com esse mapa e encontrou:

- source: 94 casos únicos, 31 TRUE, 41 FALSE e 22 NULL;
- target: 94 casos únicos, 31 TRUE, 41 FALSE e 22 NULL;
- 188 linhas totais, zero caso ausente/extra/duplicado e zero divergência de
  resultado source/target/esperado;
- flags de comparação e de aceitação por CHECK consistentes em todas as linhas;
  NULL continua NULL e produz `IS NOT FALSE=true`, separado de NOT NULL;
- registros de READ ONLY, markers verificados, ROLLBACK de metadata/vetores,
  19 campos NOT NULL e PostgreSQL 170010 presentes nos dois lados, sem drift;
- hashes do protocolo executado no blob histórico, do restore original e do
  recibo de metadata coincidem com os bytes fixados; as duas listas de 94
  resultados também coincidem.

`RECOMENDACAO`: **PASS NA CONSISTENCIA DOCUMENTAL DA EVIDENCIA ADICIONAL**, sem
achado residual no recorte revisado. Os 94 vetores por base sustentam somente
os limites/valores/NULLs planejados. O raciocínio de associação AND e cast de
construtor ARRAY permanece `INFERENCIA` fundamentada nas fontes primárias do
protocolo; o ensaio finito não é prova universal de equivalência.

**O restore original continua FAIL/CATALOG_CONSTRAINT_MISMATCH.** Seus hashes
de catálogo e todas as tentativas anteriores foram preservados. Não houve nova
execução de dump/restore, INSERT inválido real, DDL ou alteração de constraints
nesse complemento; tampouco prova de FK/trigger/ACL/PITR/RPO/RTO hospedado.
Nenhum teste, conexão ou serviço foi iniciado por este revisor. A revisão da
execução QA é independente; a autoria do protocolo é deste revisor e sua
revisão anterior à execução coube ao coordenador.

| Fonte posterior | SHA-256 |
|---|---|
| `qa/restore-check-probes-attempt1.json` | `7b7aaf572c1bef47411ee2e9b4d4051c5d466d94965b046c94cc472517e2f29b` |
| `qa/restore-check-probes.json` | `7a7c983ea7e7292efe354d607c50080caf71bbc8dba26e76df9f620352b00ca7` |

IHFR permanece `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO` e
`NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`. Nenhuma evidência operacional
deste parecer constitui aceite humano de produto/piloto ou validação científica.

## Errata de proveniência dos tipos temporais

`EVIDENCIA_IMPLEMENTACAO`: a suspeita intermediária de conflito entre Prisma
e migrations nos seis campos temporais desses CHECKs era imprecisa. A leitura
focal do objeto `08262dc57c1ad365244f9ec6902b1e4be39e2d7d:prisma/schema.prisma`
confirmou `@db.Timestamptz(3)` em `AccountEmailChallenge.expiresAt`/`createdAt`
(L83/L88), `MailOutbox.expiresAt`/`createdAt` (L121/L126) e
`MailRateLimitBucket.windowStart`/`windowEnd` (L140/L141). SHA-256 do blob:
`466a2a5d18c609024b83813a90a2f397179bd4ce17b80300a2fc7c0454aab3d8`.
As [seis referências fixadas](restore-check-analysis.md#histórico-de-tipos-e-metadata-observada)
identificam cada campo. A generalização de campos de outros models não
demonstrava conflito nestes CHECKs; não há nova PD demonstrada nesse recorte.

O coordenador fixou o protocolo usado pelos probes no commit local
`bef9152a7e465f9e14fd106cbabb2d3efdbab40e`, blob Git
`449404f06c416166bf41206afdba4f5833d36d2d`, 32263 bytes. Rehash independente
confirmou exatamente e31, como o receipt. Depois desse registro imutável,
apenas narrativa/errata foram corrigidas no documento atual. Os dois blocos
SQL e todas as fixtures permanecem byte a byte iguais ao blob executado;
nenhuma query foi repetida e nenhum resultado foi reclassificado. A proposta
intermediária sem TZ continua registrada como preparação revogada antes dos vetores.

## Adendo de publicação Git do manifesto QA

`EVIDENCIA_IMPLEMENTACAO`: o freeze original está no commit local
`63c0fe0267f5bfb706e7ec2ecc0f4b08a44bd7bc`. Seu manifesto
`docs/reports/2026-10-25-hf-night-01/qa/public-artifact-manifest.json` tem
SHA-256 `8e53ec4a22935104d4fff349299024145f5a7d9c109ab7afecdc59e004abc9f4`.
A versão aditiva lida nesta revisão tem SHA-256
`77e093e55a9ec9fcbd9714fefc604b4650e5164c1b38121a535335e95395872e`.

Comparação estrutural independente: removendo somente `gitPublication` e os
três campos novos de cada entrada (`gitSha256`, `gitBytes`, `gitObjectId`),
o JSON é exatamente igual ao manifesto do commit original, inclusive ordem
das entradas, `frozenUtc`, `sha256`, `bytes` e demais campos. O freeze continua
sendo a observação original dos arquivos locais; não foi reescrito como se
seus bytes já fossem os bytes filtrados pelo Git.

Foram lidos os 50 objetos via `git ls-tree -r -z` e `git cat-file --batch`,
preservando seus bytes binários, e os 50 arquivos locais somente para rehash.
Resultado: **50/50 pares locais de SHA-256/tamanho corretos; 50/50 triplas
Git de SHA-256 do conteúdo, tamanho e object ID corretas**. Os object IDs
resolvem no commit indicado por `gitPublication.sourceCommit`. Não se confundiu
hash do conteúdo com identificador de objeto Git.

Em 28 entradas os bytes locais e Git são idênticos. Nas outras 22, a remoção
somente de CR imediatamente anterior a LF dos bytes locais produz exatamente
o blob Git, sem alterar qualquer outro byte; a redução de tamanho coincide
com a quantidade de CR removidos em cada arquivo. Isso inclui arquivos com
EOL misto, sem pressupor que todas as linhas eram CRLF. Nenhuma diferença de
conteúdo adicional ou campo original modificado foi encontrada.

O delta do freeze perante a base contém exatamente 52 paths: os 50 listados,
o próprio manifesto e `vercel.json`; zero path extra/ausente. Depois do freeze,
`git diff`/status na worktree QA mostram somente o manifesto alterado. Assim,
nenhuma fonte, receipt ou guarda foi alterada por esse complemento de metadados.
A configuração observada é `core.autocrlf=true` no escopo system; os 50 paths
não têm atributos explícitos `text`, `eol`, `filter` ou `working-tree-encoding`.
Não há delta versionável de atributos/configuração de normalização. Esta
revisão aplicou somente comandos de leitura de configuração.

A busca `rg` por `public-artifact-manifest`/`gitPublication` não encontrou
consumidores em scripts, testes, package/package-lock ou workflows do root e
da QA. Esse é o alcance da inspeção de consumidores; o manifesto é um recibo
da missão. Nenhum teste, build, browser ou banco foi executado nesta revisão.

`RECOMENDACAO`: **PASS DOCUMENTAL PARA O COMPLEMENTO DE PUBLICACAO GIT**, sem
achado residual. Manter os dois domínios de hashes e o commit original visíveis;
os resultados QA e o FAIL original do restore conservam seus recortes anteriores.

## Adendo de publicação QA após P2

`RECOMENDACAO`: **PASS DOCUMENTAL DO COMPLEMENTO GIT**, sem achado residual.
Freeze local `aeb54924d2d5e1355d533c0b3cd687337fd75c47`, manifesto
`fe44e4e0ecf604f0131615c748a1307832f4e3c8e9d5e39b758dc87fff237b6b`;
versão aditiva atual
`7b6fb3564ba7d39c12a781f21b7a3c7018f27be2a86aa4a7519527c2937f3a66`.

`EVIDENCIA_IMPLEMENTACAO`: 58 entradas únicas; todos os campos locais
`sha256`/`bytes`, `frozenUtc` e demais campos não associados à publicação
permanecem iguais ao freeze. Conferidos 58/58 pares físicos e 58/58 triplas
Git de conteúdo SHA-256/tamanho/object ID por `ls-tree`/`cat-file --batch`.
São 35 entradas byte-idênticas e 23 cuja única diferença é CRLF→LF; nenhuma
outra alteração de byte foi encontrada. O `hashScope` esclarece os domínios
físico/Git, e os campos antes null agora identificam o commit correto.

`previousPublishedManifest` permaneceu intacto e resolve no commit
`3e0066ab82a415e04342bd751254ee65cf533dfb`, no path do manifesto QA, para o
conteúdo de SHA-256
`77e093e55a9ec9fcbd9714fefc604b4650e5164c1b38121a535335e95395872e`.
O único delta/status atual da QA é o manifesto. Este gate verifica publicação
e proveniência; não relê nem reexecuta o instrumento, baseline ou testes P2,
cuja revisão própria por A permanece separada. Nenhum arquivo QA foi escrito
por este revisor e nenhuma observação histórica foi reclassificada.
