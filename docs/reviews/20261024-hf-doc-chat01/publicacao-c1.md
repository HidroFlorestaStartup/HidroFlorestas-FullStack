# C1 — ato focal de publicação PUB02

Missão: `HF-DOC-20261024-PUB02`. Preparação em 24/10/2026.

`FATO_DOCUMENTADO`: o usuário autorizou nesta execução a publicação de C1 e das
fontes LOCAL disponíveis nas duas branches próprias, com três erratas explícitas,
commits, push, PRs Draft para `development`, comentários factuais e `@codex review`.
Registro da autorização às **18:50:17 UTC / 15:50:17 America/Sao_Paulo**.
O novo ato será confirmado em comentário factual posterior da PR própria, com
base, HEAD, tree, manifesto, verificações e estado do review remoto.
Este adendo não presume que commit local já esteja publicado.

## Inputs e preservação

`EVIDENCIA_IMPLEMENTACAO`: o ZIP C1 efetivamente acessível tem **592681 bytes**,
SHA-256 `ece19ff8519562dba4f00a1125ff78dbcd5bc14fb5994bbf7ea8625acbec439d`.
As 32 entradas passaram pela validação de limites de expansão, caminhos relativos,
duplicatas/colisões, tipos especiais, criptografia e CRC antes da extração;
nenhum conteúdo foi executado. O manifesto tem 11099 bytes e SHA-256
`6c1ee361036e37760fa501db4ad68f29be66bc6a830f1279b088bdac36e07196`.
Seus **31 hashes**, incluindo os **28 documentos**, foram conferidos.

Os quatro preimages do inventário coincidem com os blobs brutos de `development`
`c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. O patch `delta-base-c1.patch`
foi conferido antes da aplicação nessa base; o patch C0→C1 não foi usado.
A candidata parte diretamente dessa `development`, com os 28 documentos do ZIP
preservados byte a byte. `tree/` é somente prefixo de transporte.
Os finais de linha produzidos pelo transporte do patch foram confrontados com
os originais; a gravação final usa os bytes brutos verificados do ZIP e blobs
Git sem filtros. Nenhum original foi normalizado.
Não houve importação das branches completas #27/#28/#29/alunos nem composição
dos 206 documentos #27. Os títulos e os corpos históricos inteiros dos quatro
apontadores canônicos permanecem íntegros; os adendos originais C1 são inseridos
após os títulos, antes dos corpos históricos.

Os seis registros C0 transportados por C1 e todos os recibos presentes no pacote
ficam intactos. A igualdade histórica entre dois pacotes C0/C1 não foi novamente
atestada por um ZIP C0 externo nesta execução; foi preservada a prova recebida em C1.
O recibo externo C1 de 7001 bytes foi efetivamente recebido e conferido:
SHA-256 `2359debf6c199cb6c42383cfe91d4adb19ac1996a84c7cb8853d6448709cb062`.
O relatório externo, 14222 bytes, é byte a byte idêntico ao
`README_ENTREGA.md` interno; ambos têm o SHA-256
`3a756ef9b9eccbe48163471fdb5b4c1fd4ea0e0307fba6c30f4b943b6969d90b`
anunciado. Os três arquivos chegaram no pacote completo de transporte,
verificado antes da extração; o recibo externo não integra as 32 entradas C1.

O [recibo C1 #29/6387288801](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/29#issuecomment-6387288801)
e o [recibo C0 #29/6386457414](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/29#issuecomment-6386457414)
permanecem fontes históricas. `PUBLICACAO_BLOQUEADA` conserva seu instante;
não foi substituído em massa por estado de publicação posterior.

## LOCAL, três erratas e links

O commit de origem LOCAL `6f24cb345b8b3a33c46b9b76c3eb6171328296bd`, árvore
`d9075c6c8d8f63a204f97483344271e6921d958b`, parent `c4adfb3`, foi verificado
localmente nesta execução (`VERIFICADO_NO_LOCAL`), com 16 blobs iguais ao ZIP e
ao recibo originais. Identidade de objeto não autentica autoria.
`LOCAL_HISTORICAL_PROVENANCE=PARTIAL_IN_CHAT_C1` fica preservado nos originais.

| Identificador | Síntese corrigida, sem edição retroativa da fonte LOCAL |
|---|---|
| `IMP-002-C02` | Parcial somente no avatar de iniciais do popup geral exigido por `FR-015`; serviço com `initials` e tela de gestão de papéis não provam esse avatar. C1 não implementou correção funcional. |
| `CRI-016-01` | Tentativa/jobs precedem o upload do asset; a validação remota do preset ocorre antes. Não equivale a persistência antes de todo I/O. |
| `CRI-016-02` | `OWNERSHIP_MISMATCH` termina `BLOCKED`; não equivale a `RECONCILE`. |

**Dependência visível:** as referências recebidas de C1 aos paths do diretório
`docs/reviews/20261024-hf-doc-local01/` identificam a fonte LOCAL, que não integra
a base nem o delta desta PR C1. Essa fonte tem publicação própria, independente,
sem empilhar uma PR na outra. A publicação LOCAL foi confirmada na [PR Draft #30](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/30),
HEAD `cc9a8f814b8a14e5eb26b4bf66bdab1d82017386`, árvore
`71416df23626e33ca4441382544ef987db21bbe8`, com os 18 paths conferidos.
A [fonte LOCAL original publicada](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/tree/6f24cb345b8b3a33c46b9b76c3eb6171328296bd/docs/reviews/20261024-hf-doc-local01)
é a contraparte remota dos paths de proveniência, que não são presumidos presentes
na árvore C1. Os 151 links Markdown relativos
verificados no escopo documental resolvem na candidata. Os 28 originais conservam
os bytes do ZIP.

## Contenção, revisão e limites

Esta entrega é documentação mais contenção configuracional focal. Em `vercel.json`,
somente `docs/hf-doc-local01-20261024: false` e
`docs/hf-doc-chat01-20261024: false` são acrescentadas sob
`git.deploymentEnabled`. As 23 regras anteriores, `development:false`, `$schema`
e a estrutura permanecem. A primeira ref remota deverá conter a guarda.
`EVIDENCIA_IMPLEMENTACAO`: leitura autenticada somente de metadados, pela CLI
Vercel já instalada, confirmou às **19:05:32 UTC / 16:05:32 America/Sao_Paulo**
o projeto `prj_DiLVjku1AglHtTXv8ckxg8pBiZR3`, equipe `hidrofloresta-8598`,
framework Next.js e a propriedade `rootDirectory` presente com valor **null**.
O vínculo GitHub corresponde a `HidroFlorestaStartup/HidroFlorestas-FullStack`.
O retorno resumido do conector omitira a raiz; a confirmação veio da CLI,
sem leitura direta ou exposição de credenciais/valores de ambiente.
Nenhum gatilho externo conhecido para as candidatas foi encontrado no escopo
observável; a guarda Git não oferece certeza universal sobre hooks/CLI/API inacessíveis.

Matriz: **40 linhas × 8 eixos = 320 células**; resumo: **8 IMPs × 8 = 64 células**.
`DOC-D01` a `DOC-D08` mantêm onze campos e seus estados de recomendação/pendência.
`DECISIONS=NOT_RATIFIED_BY_PUBLICATION`. Implementação, validação local, CI,
revisão técnica, integração, homologação, aceite humano e ciência são distintos.
G3–G5, responsáveis, avatar FR-015, ingresso não localizado, Plotly futuro e
propostas sobre capas/PENDING conservam seus estados substantivos.

A revisão documental independente desta publicação examina o HEAD/tree final
e o delta novo, sem reiniciar os 40 registros. O review Codex é próprio da PR,
uma solicitação por HEAD estabilizado após conferir pedidos já existentes.
Resultado e eventual pendência externa ficarão no recibo posterior, sem commit
apenas para narrar o próprio CI e sem transferir os quinze gates da #29.
Aplicação, build, testes funcionais, browser, banco e instalação: `NOT_RUN`.
Sem merge, fechamento de PR antiga, workflow, código, contratos, dependências,
provedor, env/secrets, banco, deploy, piloto ou e-mail.

IHFR: `CONTRATO_EXPERIMENTAL`; `VALIDACAO_CIENTIFICA_PENDENTE`;
`SUJEITO_A_RECALIBRACAO`; `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
