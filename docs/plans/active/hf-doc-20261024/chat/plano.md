# HF-DOC-20261024 — plano transversal CHAT, continuidade C0 → C1

- Missão conjunta: `HF-DOC-20261024`.
- Frente: `CHAT`; modo: `PARALELO`.
- Estado do plano: CONCLUIDO no alcance documental C1 — HF-DOC-20261024-CHAT02; confronto e revisão material encerrados com limites explícitos. Publicação e atos humanos permanecem separados.
- Baseline de edição: `development@c4adfb379e5dc78f27f31b91edbd13f43228d9f9`.
- Candidata examinada como fonte separada: `00477e961e36416d8d602d36f7e0ee195c487148` (#29).
- Revisão dos alunos: `d2168c840937a6120e32467f24cb46383e8dcd29`.
- Data: 24/10/2026; novos registros C1 em UTC e America/Fortaleza; horários históricos C0 em America/Sao_Paulo preservados.

As seções seguintes até Encerramento do escopo independente registram C0 historicamente. O mandato vigente e os estados atuais estão no Complemento CHAT02 ao final; os antigos bloqueios de falta de bytes foram superados. Publicação continua separada.

## Objetivo e critério de entrega

Produzir conciliação documental e recomendações concretas para o mantenedor,
com fontes imutáveis, preservação histórica e separação de implementação,
validação, integração e autoridade. C0 entrega tudo que independe de LOCAL.
C1 exige consumir e revisar o handoff LOCAL por SHA ou arquivos verificáveis.
Ausência de handoff não transfere ownership para CHAT.

## Escopo autorizado

Leitura técnica e documental, análise de decisões, inventário histórico G3–G5,
rascunho do adendo Code-First, apontadores canônicos estritamente necessários,
validação documental e revisão independente. Publicação em branch própria e
Codex review somente se o gatilho operacional estiver comprovadamente contido.
Comentários factuais consolidados nas PRs existentes estão autorizados pela missão.

São excluídos código, testes funcionais, build, configuração, scripts do projeto,
novas investigações HF-INV, operação em provedores, merge, deploy, homologação,
aceite humano/científico, e-mail e escrita nos caminhos ou branches de LOCAL.
`docs/raw/**`, recibos históricos e os documentos originais dos alunos são preservados.

## Fontes, autoridade e método

Aplicam-se `AGENTS.md`, `PLANS.md`, `PROJECT_CONTEXT.md`, `TECH_DECISIONS.md`,
`.specify/memory/constitution.md`, `docs/governance/SOURCE_AUTHORITY.md` e a
política Code-First do baseline acima. A missão corrente autoriza o trabalho
documental independente antes do merge da #29; essa autorização não aprova
integração, aceitação de riscos nem mudança de intenção do produto.

As skills `speckit-analyze` e `speckit-checklist` presentes no snapshot do
repositório foram consultadas. O comando por feature de `speckit-analyze` exige
spec/plan/tasks gerados; esta missão transversal não cria tais artefatos nem
executa esse comando. Aplicam-se os critérios de consistência, cobertura,
ambiguidade e conformidade constitucional em método documental equivalente.
Não há alegação de execução de pipeline Spec Kit nem instalação/atualização.

Toda orientação nova é `RECOMENDACAO`; decisões só recebem
`DECISAO_CONFIRMADA` com origem identificada. Mantêm-se os quatro qualificadores
IHFR: `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

## Estado inicial e preservação

O conector GitHub da conta HidroFlorestaStartup confirmou as fontes remotas.
A tentativa de clone somente leitura falhou na conexão ao proxy; as leituras
continuam pelo conector. O ambiente de edição é um conjunto de arquivos
preparados a partir dos blobs exatos, não um checkout Git completo. Nenhuma
branch remota foi criada e nenhum commit remoto é presumido.

O ZIP anexado foi inventariado, sem extração para o baseline. Ele não governa
esta entrega. Não foram alterados os anexos nem arquivos preexistentes do projeto.

## Equipe real e ownership

| ID lógico | Responsabilidade | Área exclusiva |
|---|---|---|
| C-COORD | Coordenação, fontes, integração e únicos adendos canônicos | Plano CHAT, pacote CHAT e apontadores autorizados |
| C-A | Autoridade e recomendações DOC-D01–DOC-D08 | Rascunhos próprios de decisões e fontes |
| C-B | Documentação, RTH-P2-001 e inventário G3–G5 | Rascunhos próprios de documentação/operação |
| C-R | Revisão independente e confronto com fontes | Pareceres próprios; não altera os documentos revisados |

Três subagentes nativos foram efetivamente iniciados, além do coordenador.
As identidades operacionais são preservadas em ledger privado; a entrega pública
usa IDs lógicos. O esforço de raciocínio foi solicitado no maior nível disponível;
os agentes herdaram a configuração da sessão, cujo nível nominal não é exposto
por recibo. Processos shell e leituras paralelas não são contados como agentes.

## Etapas e dependências

| Etapa | Responsável | Resultado verificável | Dependência |
|---|---|---|---|
| T0 — preflight | C-COORD + C-R | SHAs, fontes, permissões e gatilhos registrados | Nenhuma |
| T1 — análise independente | C-A + C-B | Quadro decisório, autoridade, G3–G5 e adendo C0 | T0 |
| T2 — composição C0 | C-COORD | Pacote documental e preimages preservados | T1 |
| T3 — barreira LOCAL | C-COORD + C-R | Handoff lido por SHA, integridade e deriva confrontadas | Entrega efetiva de LOCAL |
| T4 — revisão | C-R | Achados e hashes dos arquivos revisados | T2; T3 para C1 |
| T5 — entrega | C-COORD | Arquivos verificáveis e recibos; publicação apenas se contida | T4 e gate de publicação |

C0 não declara matriz técnica final nem conclusão C1. Sem handoff, registrar
`AGUARDANDO_HANDOFF_LOCAL` e encerrar as partes independentes, sem polling.

## Riscos e pontos de decisão humana

- A nova branch CHAT não é explicitamente bloqueada em `vercel.json`; Draft e
  Markdown não garantem contenção. Aplicar `PUBLICACAO_BLOQUEADA_POR_GATILHO`.
- Uma revisão automática não é aprovação humana da #29 nem decisão de merge.
- A decisão sobre documentos da #27 não é aceite G3–G5.
- Conteúdo exclusivo de #28 e a classificação final por IMP dependem da matriz LOCAL.
- Qualquer operação hospedada, remoção de regra `false`, designação de owner ou
  homologação exige recorte e autoridade próprios, fora desta entrega.

## Verificações documentais previstas

Lista fechada de paths; diff completo; comparação de preimages/blobs e preservação
byte a byte dos textos anteriores; resolução de links locais contra baseline+
arquivos propostos; URLs entre branches fixadas por SHA; JSON parseável;
coerência de IDs/estados entre tabela e JSON; ausência de circularidade de hashes;
ausência de segredos/PII desnecessária; whitespace; delta zero para código,
testes e configuração. CI funcional desta missão: `NOT_RUN`.

## Histórico

| Data/hora | Estado | Registro |
|---|---|---|
| 24/10/2026, preflight | `EM_ANDAMENTO` | Missão e anexos lidos; três subagentes reais iniciados; SHAs previstos reconfirmados pelo conector. |
| 24/10/2026, 12:37:44 -03:00 | `EM_ANDAMENTO` | Base c4adfb3 confirmada; fonte #29 separada; nenhuma PR LOCAL/CHAT encontrada na descoberta inicial. |
| 24/10/2026, execução | `EM_ANDAMENTO` | Contenção ausente para novas branches; publicação de ref bloqueada; trabalho documental independente continua. |
| 24/10/2026, 12:45:18 -03:00 | `EM_ANDAMENTO` | Barreira LOCAL consultada sem entrega; development permanece c4adfb3. Este é o horário da barreira, não da submissão à revisão. |
| 24/10/2026, após 12:49:47 -03:00 | `AGUARDANDO_REVISAO` | Validação documental e freeze 1 preparados; pacote agregado submetido à revisão documental independente. |
| 24/10/2026, fechamento C0 | `BLOQUEADO` | Revisão integral sem P0–P2; dois ajustes P3 de precisão incorporados e bytes finais sujeitos à confirmação registrada no parecer. C1 e publicação permanecem bloqueados por dependências distintas. |
| 24/10/2026, registro às 12:57:04 -03:00 | `BLOQUEADO` | Usuário retransmite conclusão LOCAL no commit local 6f24cb345b8b3a33c46b9b76c3eb6171328296bd e hash esperado do ZIP. Links apontam à máquina LOCAL; arquivos ainda inacessíveis nesta sessão. Anúncio incorporado sem afirmar leitura ou integridade do pacote. |

## Encerramento do escopo independente

C0 concluído no escopo independente: recomendações, G3–G5, diagnóstico, adendo
e apontadores produzidos, validados e submetidos à revisão independente.
A barreira de 24/10/2026 às 12:45:18 -03:00 não forneceu branch/PR/handoff LOCAL;
development permaneceu c4adfb3. Após essa barreira, houve anúncio de conclusão
LOCAL, registrado na conciliação com o commit local e hash esperado informados.
O ZIP e o recibo ainda não estão disponíveis para leitura nesta sessão.
C1 mantém `AGUARDANDO_HANDOFF_LOCAL`, agora com motivo `AGUARDANDO_ARQUIVOS_LOCAL`.
Publicação permanece `PUBLICACAO_BLOQUEADA_POR_GATILHO`; nenhum commit/ref/PR
remoto criado. O resultado e os hashes exatos da revisão independente ficam
no parecer separado do pacote; não há alegação de Codex review remoto próprio.
O plano permanece neste caminho autorizado; não é movido para outra área de ownership.

## Complemento CHAT02 — PLAN → EXECUTE → REVIEW

Mandato: fechar C1 documental usando o C0 original e o pacote LOCAL anexado,
sem reiniciar LOCAL01 ou condicionar a conciliação à publicação. Registros novos
usam UTC e `America/Fortaleza`; os horários históricos de C0 são preservados.

Em 24/10/2026 às 16:50:52 UTC / 13:50:52 America/Fortaleza, development e os
HEADs de #27/#28/#29 permaneciam nos SHAs acima. As três PRs continuavam abertas,
Ready e sem merge. Não foi observado marcador `[HF-DOC-CHAT02-C1]` na #29.

O ZIP LOCAL original de 234.461 bytes corresponde ao SHA-256
`2d598359ce495977bc8869d579ed2403b11dc8d37813803c350a7ed5dae1f7a3`;
o recibo externo de 7.684 bytes corresponde a
`39b98167facfa8a998f8ba498904c7b42fd1526f3f13af6c48f2bab888362786`.
Foram conferidos caminhos, duplicatas, links, CRC e limites de expansão antes
da extração isolada, além dos 16 documentos declarados e do recibo interno.
O commit `6f24cb345b8b3a33c46b9b76c3eb6171328296bd` permanece local: bytes
documentais verificáveis não substituem o objeto Git ausente do transporte.

C0 foi preservado com ZIP, relatório, manifesto e 20 arquivos conferidos contra
seus hashes. O complemento altera uma cópia de trabalho dos mesmos caminhos;
fontes LOCAL e entregas C0 permanecem intocadas. A matriz C0 e seus recibos
continuam históricos; C1 terá matriz, consumo e revisão próprios.

| Etapa C1 | Responsável | Critério verificável |
|---|---|---|
| Admissão e deriva | Coordenação | Hashes dos anexos/C0, extração segura, handoff e bases confrontados. |
| Matriz 002–005 e fronteira 001 | C-I, subagente nativo real | Todas as subcapacidades desse grupo confrontadas com fontes primárias. |
| Matriz 006–009 e fronteira 010 | Coordenação | Cadeias e lacunas materiais confrontadas por SHA, sem executar produto. |
| Decisões, topologia e fronteiras CRI | C-D, subagente nativo real | Oito recomendações completas, conteúdos exclusivos e limites específicos. |
| Composição e apontadores | Coordenação, único escritor canônico | Delta C0→C1 delimitado, quatro textos de origem preservados, oito eixos distintos. |
| Revisão independente | C-R, subagente nativo real | Novas classificações, decisões afetadas e apontadores revisados por bytes finais. |
| Entrega | Coordenação | C1 com limites explícitos, manifesto, recibo e eventual adendo factual único na #29. |

Os três agentes foram iniciados pelo delegador nativo; identidades operacionais
ficam em ledger privado. O esforço solicitado é o maior disponível; a configuração
nominal efetiva não é exposta por recibo e não foi alterada globalmente.

Riscos materiais: confundir transporte com proveniência completa; transferir CI
entre SHAs; usar teste de quota de capas como prova de recuperação IHFR; promover
mapa mínimo a visão Plotly; apagar pendências humanas/científicas; tratar
conteúdo exclusivo como já integrado. O confronto deve resolver fatos e manter
pendências de autoridade com recomendação e efeito claros.

Critério de término documental: integridade admitida, fontes LOCAL lidas,
conciliação por subcapacidade/decisão concluída com lacunas delimitadas, validação
e revisão independentes aprovadas no alcance documental. Publicação, decisão
humana, homologação e ciência conservam estados próprios. Nenhuma operação de
provedor, configuração, branch/ref/PR, aplicação ou teste funcional é autorizada.

## Execução documental C1 para revisão

2026-10-24 17:10:43 UTC / 2026-10-24 14:10:43 -03:00 America/Fortaleza. Foram consumidos16 documentos LOCAL,40 registros e as fontes primárias atribuídas. Três divergências factuais foram tratadas: avatar de membros, ordem de I/O de capas e BLOCKED no mismatch. Inventários próprios #27/#28/alunos foram conciliados. A composição mantém quatro preimages c4adfb3 e todos os corpos antigos. As matrizes, recibos e pareceres C0 continuam históricos.

C-R revisou o delta composto, as 40 classificações, as oito decisões e os quatro apontadores por hashes. A revisão material encerrou os achados documentais P2/P3; o plano recebe CONCLUIDO somente no alcance documental, com confirmação focal dos estados finais no parecer. O caminho ativo é preservado por ownership explícito da missão; nenhuma migração de diretório é realizada.

## Encerramento documental C1

2026-10-24T17:20:25+00:00 UTC / 2026-10-24T14:20:25-03:00 America/Fortaleza. Confronto de40 registros concluído;32 células de validação explicitadas como NOT_RUN, preservando fontes históricas; campo de proveniência corrigido para a ausência exclusiva do objeto Git LOCAL. Revisão independente APTO_DOCUMENTAL_C1_COM_LIMITES, zero P0–P2 documental aberto. Os estados finais e a validação recebem confirmação focal por C-R, sem repetir revisão dos bytes inalterados.

C0 e LOCAL preservados; nenhum código, teste funcional, configuração, provedor, branch/ref/PR, merge, deploy ou e-mail. Publicação continua bloqueada e ratificação humana/operacional/científica pendente; essas dependências não mantêm aberto o plano documental C1.
