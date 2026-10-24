# LOCAL01 — proveniência e erratas de publicação

Missão: `HF-DOC-20261024-PUB02`. Preparação em 24/10/2026.

`FATO_DOCUMENTADO`: o usuário concedeu nesta execução autorização focal para
publicar as fontes LOCAL originais disponíveis, C1, três erratas explícitas,
commits, push, PRs Draft para `development`, comentários factuais e `@codex review`.
A autorização foi registrada às **18:50:17 UTC / 15:50:17 America/Sao_Paulo**.
Ela permite acrescentar somente as duas regras `false` especificadas em
`vercel.json`; não aprova merge, piloto, ciência nem as oito decisões propostas.
O ato remoto só estará confirmado pelo comentário factual posterior da PR própria.

## Origem preservada

`EVIDENCIA_IMPLEMENTACAO`: o objeto commit LOCAL
`6f24cb345b8b3a33c46b9b76c3eb6171328296bd`, sua árvore
`d9075c6c8d8f63a204f97483344271e6921d958b` e seu único parent
`c4adfb379e5dc78f27f31b91edbd13f43228d9f9` foram verificados no ambiente local
nesta execução (`VERIFICADO_NO_LOCAL`). O delta original contém exatamente
16 documentos adicionados. Os 16 blobs Git brutos coincidem com os documentos
do transporte original e com os hashes do recibo, sem normalização de bytes.
O novo commit de contenção é descendente do original; não há transplante documental.

O ZIP `hf-doc-local01-6f24cb34-pacote-chat.zip` tem 234461 bytes e SHA-256
`2d598359ce495977bc8869d579ed2403b11dc8d37813803c350a7ed5dae1f7a3`.
O recibo original, externo e também incluído no ZIP, tem 7684 bytes e SHA-256
`39b98167facfa8a998f8ba498904c7b42fd1526f3f13af6c48f2bab888362786`.
As 17 entradas passaram pela verificação de limites, caminhos, colisões,
criptografia, arquivos especiais e CRC antes da extração. Nenhum conteúdo foi executado.

A identidade criptográfica dos objetos não autentica a autoria. A autoria e os
documentos de origem são preservados; a worktree original, incluindo suas
alterações posteriores, permanece separada e intocada.
`LOCAL_HISTORICAL_PROVENANCE=PARTIAL_IN_CHAT_C1`: a confirmação local atual
não reescreve o `PARTIAL` verdadeiro no recibo histórico CHAT.

## Três erratas explícitas do C1

`FATO_DOCUMENTADO`: o [recibo C1 da PR #29, comentário 6387288801](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/29#issuecomment-6387288801)
registra estas correções da síntese, preservando as fontes LOCAL:

| Identificador exato | Conclusão corrigida |
|---|---|
| `IMP-002-C02` | Parcial somente no avatar de iniciais do popup geral exigido por `FR-015`. Serviço com `initials` e tela de gestão de papéis não demonstram esse avatar no popup. C1 não implementou correção funcional. |
| `CRI-016-01` | Tentativa/jobs de capas precedem o upload do asset, mas a validação remota do preset ocorre antes. Não equivale a persistência antes de todo I/O. |
| `CRI-016-02` | `OWNERSHIP_MISMATCH` termina `BLOCKED`; não equivale a `RECONCILE`. |

A [matriz LOCAL original](matriz-implementacao.md), seu JSON e os fragmentos são
**fontes preservadas**. Quando contraditos pelas três erratas acima, não constituem
a síntese corrente. Seus bytes não foram editados para apagar erros ou atribuir
retroativamente a eles a revisão C1.

O recibo C1 identifica o ZIP `HidroFloresta_HF-DOC_CHAT02_C1_2026-10-24.zip`,
592681 bytes, SHA-256
`ece19ff8519562dba4f00a1125ff78dbcd5bc14fb5994bbf7ea8625acbec439d`.
Essa referência ao hash anunciado não substitui a verificação dos bytes C1
nesta execução. A publicação C1 tem branch própria e base `development`;
seu permalink será informado apenas quando existir, no recibo posterior.
O [recibo C0 6386457414](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/29#issuecomment-6386457414)
e os estados históricos de publicação bloqueada permanecem válidos para seus instantes.

## Alcance do novo ato

O delta de publicação LOCAL é de documentação mais contenção configuracional focal:
16 originais intactos, este adendo novo e somente as regras
`docs/hf-doc-local01-20261024: false` e `docs/hf-doc-chat01-20261024: false`
acrescentadas a `git.deploymentEnabled`, preservando as 23 regras anteriores,
`development:false`, `$schema` e a estrutura. A primeira ref remota deverá apontar
para a árvore já contida; a existência deste arquivo não prova que o push ocorreu.

`RECOMENDACAO`: consultar este adendo junto às fontes LOCAL e ao recibo C1 antes
de usar a matriz como apoio à decisão. Publicação não ratifica recomendações,
não integra #27/#28/#29 e não importa suas branches completas.
Código implementado, validação local, CI, revisão técnica, integração,
homologação, aceite humano e ciência conservam suas dimensões próprias.

Aplicação, build, testes funcionais, browser e banco nesta missão: `NOT_RUN`.
Os quinze gates históricos da #29 pertencem a outro SHA. Revisão independente,
manifesto de publicação, resultado Codex e observação delimitada de deployments
serão vinculados ao HEAD exato no recibo factual, sem commit autorreferente.
Sem merge, fechamento de PR antiga, workflow, código, contrato, dependência,
provedor, env/secrets, banco, deploy, piloto ou e-mail.

IHFR: `CONTRATO_EXPERIMENTAL`; `VALIDACAO_CIENTIFICA_PENDENTE`;
`SUJEITO_A_RECALIBRACAO`; `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
