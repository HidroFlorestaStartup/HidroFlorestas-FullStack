# HF-CLOSE-01 — revisão independente pré-push

Data: 2026-10-25. Revisor nativo: `/root/revisao_r`, delegado por
`collaboration.spawn_agent`, sem autoria dos arquivos aceitos, sem ação remota
e sem execução própria das suítes de B. A única escrita de R é este parecer em
saída local ignorada; a cópia pública cabe ao coordenador.

`RECOMENDACAO`: **PASS_RECORTE_PRE_PUSH_COM_LIMITES_EXPLICITOS**.
Zero achados P0/P1/P2 abertos no conteúdo examinado. O recorte está apto à
publicação contida e à revisão remota prevista. **Este parecer não declara
`INTEGRATION_GATE=PASS`**: CI oficial, Codex da agregadora, política/preflight
imediatos e verificação de merge ainda dependem das provas posteriores.

## Corte aceito por conteúdo

Base: `08262dc57c1ad365244f9ec6902b1e4be39e2d7d`.
Composição dos sete merges:
`3f176288114b0daf9d65f764d311b662b056d5c7`, tree
`dfc7bc7c9a089a5b59d1bbf368c7bb481fe18c9d`.
Tree de conteúdo final anterior ao próprio parecer:
`b984be158c94d1eb6ae03d4e9bcac2c213394a32`.
Nenhum SHA de commit futuro é usado como autorreferência.

As sete entradas abaixo constituem todo o delta novo sobre a composição.
R calculou os hashes físicos, os blobs esperados com os filtros Git aplicáveis
e a igualdade com a tree acima. Todos os modos são `100644`. Os blobs Git e
SHA256 físicos são identidades distintas, inclusive sob conversão de EOL.
Este próprio parecer está excluído dos dois fingerprints e de seu próprio
aceite; sua incorporação posterior deve ser uma cópia exata e um delta separado.

| Caminho | Bytes físicos | SHA256 físico | Blob Git esperado |
|---|---:|---|---|
| `.github/workflows/rc-review.yml` | 5651 | `fc4a8f2f7054a5b2587e22ad50fed058e2f8ed0592b5940e00903aa4a33aa9b2` | `8e5434efb7c399ca929532733e4e89f4f145faa2` |
| `docs/releases/2026-10-25-hf-close-01/conclusao-instrucoes-alunos.md` | 12470 | `356780501ab917dfa6361d52dd9f33735e439cd0974b6496d30f604c46554baf` | `4e9b1d76b95a6cb3db85ad1ec3f973d5bee3bde9` |
| `docs/releases/2026-10-25-hf-close-01/manifesto-integracao.json` | 261195 | `751720dc2cd2d13a20c2403be3716d1411e0d1751a6c987807cd646de66424f2` | `6448a26cc13f20897e82a4b9f13fdc6579f2e837` |
| `docs/releases/2026-10-25-hf-close-01/pendencias-operacionais.md` | 4085 | `faf0eade75c4eff6f1877752ba359e284f93dd4fe34d63b8e3254bfb8d91d146` | `65acb3f86ea4f7d38b2ece52b388e333ccc161c7` |
| `docs/releases/2026-10-25-hf-close-01/readme.md` | 7658 | `116d966c9b99f106d25b22c25211b1a063cbd269366cbf7d56b0948861cf182e` | `7b20c758338c600b5579296b92a2a2b9b3403bbc` |
| `docs/releases/2026-10-25-hf-close-01/validacao-local.json` | 30179 | `565cf84ad5fcc55c2eb6b125eef30784e360d21bff89ea842ab5543fa5cc2d54` | `b3f0b93d97daf05d1727d5da420a208613deeb7e` |
| `vercel.json` | 1685 | `4d86e9deb4291c21b8384bdb5be85597a3536bb8405565719c0ff190a8b045d6` | `4a9441aa7f09dacfe5c2ca544cbac60a2d6ba96f` |

Ordenação: caminho crescente. Fingerprint físico = SHA256 da concatenação
`path TAB physicalBytes TAB physicalSha256 LF`:
`99dc49118cf6384ab1a8382adf6595f11a93b089ca2790cf5871c5512d3935a0`.
Fingerprint Git = SHA256 de `path TAB mode TAB blob LF`:
`0b01c0df71a0007254dda469e3b823d65b3800d9083d9e9600f4eaa94835f95c`.
Uma alteração nesses bytes/blobs exige revisão do delta; este aceite não se
transfere automaticamente a outro conteúdo.

## Composição, whitelist e preservação

`EVIDENCIA_IMPLEMENTACAO`: R confrontou árvores, modos, blobs e históricos
locais com `git show`, `ls-tree`, `diff`, `rev-list` e `merge-base`.

- Os sete HEADs congelados são ancestrais. Os únicos sete commits extras
  anteriores ao fechamento são merges normais, na ordem #33/#34/#36/#38/#37/#39/#35.
  O ancestral funcional #38 `fb1523b4ef77c9dc96c8d1816335b40674aee972`
  está incluído. Nenhum commit inesperado foi encontrado.
- A união das fontes tem 158 caminhos. Os 157 fora de `vercel.json` coincidem
  exatamente em modo/blob; não há colisão semântica ou delta funcional novo.
  Depois da composição, somente os sete caminhos da tabela foram acrescentados
  ou modificados antes deste parecer.
- 4/4 originais estudantis, 206/206 documentos próprios #27, 16/16 documentos
  LOCAL e 24/24 artefatos C1 preservam os modos/blobs, SHA256 e tamanhos declarados
  no manifesto. R recalculou esses campos a partir dos objetos Git.
- Dos quatro apontadores C1, três são idênticos à base; `PROJECT_CONTEXT.md`
  conserva o adendo autorizado da #33. Isso explica a conferência equivalente
  de 27 caminhos C1 idênticos e um apontador aditivo. Não houve novo apontador
  de fechamento nem reescrita de C0/C1 ou dos recibos históricos.
- Os 32 caminhos protegidos de `docs/raw/**`, `prisma/**` e pacotes/configuração
  de instalação existentes conferidos mantêm os blobs da base. Schema,
  migrations, dependências, lockfile, fontes e FAILs permanecem preservados.
- Os 15 blobs de aplicação/UI coincidem com a prova combinada
  `456029f7cbbd5bdd22e35f59ee637b8b0c43a2e0`. Essa branch e as branches
  inteiras estudantil/#27/#28 não foram incorporadas.
- Os oito paths/blobs históricos #28 foram conferidos: três documentos novos
  ausentes da composição, dois adendos exclusivos retidos na fonte e três
  apontadores sucedidos. Não se afirma transplante ou equivalência integral.

## Configuração, documentação e privacidade

`EVIDENCIA_IMPLEMENTACAO`: parser `yaml 2.9.1`, YAML 1.2, chave string `on` e
checagem de duplicatas. As 35 guardas têm os nomes exatos da união
base/fontes/própria e valor `false`, incluindo `development`; a guarda da prova
combinada está ausente. Nenhum `true`, wildcard ou remoção foi introduzido.
O único acréscimo aos seletores RC é `release/hf-close-01-20261025`, tanto em
`on.push.branches` quanto por igualdade no predicado. Ambos passam de 19 para
20 nomes correspondentes; os demais campos parseados do workflow são idênticos
à base, incluindo runner, permissões, ações, steps, timeout e dispatch.

Os 48 JSONs e 18 linhas JSONL provenientes das fontes foram parseados sem erro
ou chave duplicada; o BOM histórico foi tratado somente na leitura. Os JSONs
novos e o YAML final também passaram. `git diff --check` passou na composição
e no delta rastreado; os novos documentos não têm whitespace residual ou
marcadores de conflito. Foram conferidos os links relativos novos e 17 alvos
imutáveis de blob por objetos Git; o link previsto para este parecer é resolvido
por sua incorporação. Referências externas de apoio não foram navegadas por R.

A busca estática focal não encontrou segredos, chaves privadas, tokens reais,
connection strings reais ou caminhos absolutos pessoais no delta. As URLs com
credenciais de fixtures são negativas sintéticas com loopback/`host.invalid`.
Nenhum log bruto, dump, env ou credencial integra os sete arquivos aceitos.
Isso é inspeção estática delimitada, não garantia universal de privacidade/egress.

## Requisitos e evidências locais

R leu os requisitos das specs029–034 e confrontou os 58 IDs FR/SC e 66 IDs de
tarefa com o recibo B. R não alterou checkboxes históricos de specify, não os
atribui a esta revisão nem os transforma em aceite funcional/humano.

| Critério de qualidade do contrato | Resultado da revisão de R |
|---|---|
| Escopo, fontes e autoridade distinguem composição, produto e operação (§0–4/8) | PASS: sete SHAs e envelope explícitos. |
| Critérios de contenção/CI são completos e mensuráveis (§4/9) | PASS: nomes/valores e os dois seletores definidos sem ampliar gatilhos. |
| Evidência nova, reaproveitada e seus recortes são consistentes (§6–7) | PASS: fingerprints 595/598 delimitados e resultados não somados como testes únicos. |
| As seis instruções têm disposição e pendência rastreáveis (§5/11–13) | PASS: execução na base, disposição ratificada e atos externos separados. |
| Falhas, drift, exigência humana e condições de merge estão definidos (§7–10) | PASS: gate condicionado, sem bypass ou aprovação humana presumida. |
| Autoridades de operação, aceite e ciência permanecem independentes (§12–13) | PASS: responsáveis não inventados e qualificadores preservados. |

O [recibo local](validacao-local.json) é execução de B. R conferiu os hashes e
tamanhos dos 12 logs de checks, o log da instalação concluída e os resumos das
seis suítes: UI 6/27/14; metadata 5; scheduler 4; policy/navigation 18, todos
sem falhas/skip na execução efetiva. Prisma, typecheck antes/depois do build,
build e lint efetivo têm exit 0; lint conserva dois avisos preexistentes.
O wrapper de instalação falho e o lint inicial que coletou suporte CJS não
rastreado permanecem separados, com repetição motivada sem alteração de código,
dependências, assertions, timeouts ou gates.

R rehashou fisicamente 598/598 entradas do manifesto B, confirmou a igualdade
antes/depois e seus modos/blobs na tree revisada. Fingerprint
`54d71174ace84339f336431d642aef63d740fa167b7066c4d1dde0cfee4c9ce9`,
recalculado como SHA256 de `JSON.stringify` dos objetos ordenados com campos
`path,mode,blob,sha256`. O manifesto de 595 entradas usa outro recorte e algoritmo,
também reconferidos. Nenhum dos dois é apresentado como snapshot integral.

O recibo B registra analyze/converge reais das seis specs: 58 obrigações,
33 cenários, 27 decisões de plano, sete princípios, 66 tarefas, zero gaps/tarefas
novas e tasks byte-idênticas. R conferiu as listas e os contextos locais; a
execução das skills permanece atribuída a B. Não foi criada spec artificial,
nem houve nova execução E2E completa, restore ou benchmark por R.

## Achados e condições posteriores

P3 de clareza identificado por R: `executableScope` poderia parecer um snapshot
integral. **RESOLVIDO antes deste freeze** por `coverage/otherRootConfigs`, sem
alterar código nem exigir nova suíte. Nenhum P3 residual material foi mantido
como dispensa, e nenhum P0/P1/P2 foi reclassificado como limitação cosmética.

R leu os recibos sanitizados de consultas do coordenador: política de 15:51:54Z
(404 explícito `Branch not protected`, regras efetivas/rulesets200 vazios,
merge commit permitido, snapshots exatos) e reviews fonte de 15:43:04Z
(sete completed nos HEADs finais, sem finding aberto; thread P2 #39 resolvida e
outdated). Também leu os oito acessos remotos #28 registrados como acessíveis.
São observações do coordenador, não consultas remotas de R, aprovação humana,
review da agregadora ou prova de estado futuro.

Antes do merge, o coordenador ainda precisa comprovar na PR o HEAD/tree final,
os quinze gates oficiais com sucesso/exit 0 sem skips, Codex no HEAD final sem
finding material aberto, política atual e pré-merge sem drift. Esta revisão de
conteúdo não dispensa esses itens, não concede bypass e não emite `APPROVED`
humano. A disposição administrativa depende do merge e preservação verificados.

`RESTORE_OPERACIONAL=NAO_HOMOLOGADO`; o FAIL
`CATALOG_CONSTRAINT_MISMATCH` e os 188 probes separados permanecem intactos.
`G3=BLOCKED; G4=BLOCKED; G5=BLOCKED`.
`HUMAN_ASSISTIVE_ACCEPTANCE=PENDING`.
Não se declara que todos os atos operacionais das instruções foram concluídos.

IHFR mantém `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO` e
`NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
