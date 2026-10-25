# Parecer independente da coorte UI combinada

Revisor: `/root/students`, 25/10/2026. **RECOMENDACAO: PASS DOCUMENTAL,
SEM ACHADO RESIDUAL NO RECORTE REVISADO.**

`EVIDENCIA_IMPLEMENTACAO`: as constatações abaixo provêm dos recibos congelados,
objetos Git e verificações de leitura/hash descritas neste parecer.

Foram conferidos composição, recibos, contagens, hashes e limites. Nenhum teste,
Next, browser, PostgreSQL ou SQL foi executado pelo revisor. O revisor é autor
da correção 033; este parecer avalia a nova composição/execução de A e não
constitui nova revisão independente do próprio patch.

## Corte e composição

Corte `840cd1b6e51d7adc2fd196d177870ff513d5ad87`, branch
`test/hf-night-ui-combined-20261025`, base 08262dc. Instruções aplicáveis
consultadas; governança/contexto iguais à base previamente lida. O
[plano](../../../plans/completed/hf-night-ui-combined-20261025.md) e
relatórios novos recebidos foram preservados; este é o único arquivo escrito
pelo revisor na worktree.

O [manifesto de origem](source-manifest.json) foi confrontado com objetos Git
e arquivos locais: **15/15 blobs funcionais iguais às origens** (nove arquivos
da aplicação, seis das suítes UI). Foram conferidos os sourceHeads e object IDs,
separadamente dos SHA-256 físicos declarados. As fontes são daebd71/029,
ddd4e82/032 e a árvore 1dbe3d4/033, que já conserva o código de fb1523b;
o commit documental posterior não foi tomado isoladamente como implementação.

`vercel.json` preserva todas as 27 entradas da base e acrescenta quatro:
**31 valores false**, sem mudança de valor anterior. O restante do JSON e os
workflows são iguais à base; workflow blob
`1c116152531dae7d3b4a28cf8fb4f6e8423158c7`. É evidência estática de contenção,
sem consulta ou deploy remoto.

## Coorte, contagens e encerramento

Os [checks](check-results.json), [E2E](e2e-results.json) e extrações minimizadas
dos logs coincidem: **402+17 unit PASS; UI 6+27+14=47 PASS; E2E 220/220 PASS**,
zero falhas/skips/retries nos recortes registrados. Prisma/typecheck/lint/build
e npm ci têm exit 0; lint mantém dois warnings preexistentes e zero erros.
O log do wrapper repete o mesmo E2E do log específico: contou-se uma bateria,
sem somar 440. Não se declarou um total global de testes únicos ou 15 gates.

O E2E foi serial, um worker, entre 06:17:07.381 e 06:26:39.050 UTC:
**571669 ms**, exatamente o intervalo do collector. O teste 403 existente consta
no log com 1,1 s; testes E2E/configuração permanecem iguais à base, sem alteração
de assertions/timeouts. Integration/Migration/Contract/HTTPS não foram repetidos,
conforme o recorte sem mudança de backend/schema.

O [setup](runtime-setup.json) registra runtime próprio novo, pacote público
pinado PostgreSQL 17.10 e nenhuma cópia de dados/marker/credencial. A
[prova anterior às fixtures](fresh-empty-proof.json), 06:17:06.114 UTC, registra
14 migrations, zero usuários/laboratórios/memberships/áreas/coletas/audit e
zero tabelas na referência. A cronologia e o fingerprint conferem, sem SQL
adicional pelo revisor.

O [encerramento](runtime-result.json) registra Stop verificado de PostgreSQL,
Next encerrado, zero listeners próprios 55427/3001 e nenhum processo alheio parado.
O executor confirmou a fronteira dos relógios: Stop oficial → Stopwatch parado
→ consulta dos listeners → endedUtc. Logo 598892,5386 ms do Stopwatch global
e 600181,3714 ms do intervalo UTC global medem fronteiras diferentes; a diferença
não pertence aos 571669 ms do E2E nem representa retry. Não houve inspeção
independente do SO ou nova operação de stop por este revisor.

## Hashes e rastreabilidade

[Antes](fingerprint-before.json)/[depois](fingerprint-after.json) têm os mesmos
**601 caminhos únicos e ordenados**. O revisor recalculou 601/601 hashes físicos
e reproduziu o conjunto selecionado por `isMailSnapshotPath`/`git ls-files`,
sem path adicional/ausente. `sha256(JSON.stringify(manifest))` reproduziu
`1f11a53ef3a5510ad35033b9000d12b6ae10b4c7e6222c425880f3d5c7ff7eac`,
igual a RegressionSetup, prova fresca e E2E.

O [índice público do freeze](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/6005bcf5399fa8f7a850974db1f2774266acfb51/docs/reports/2026-10-25-hf-night-01/combined/public-artifacts.json), SHA-256
`b0af5b46186ceda0ee9b56a9d8d986f64893a6b1faf121b855b2004d97e73125`,
tem 13 entradas conferidas: tamanho/hash corretos, UTF-8 sem BOM/LF e bytes
preservados pelo clean do Git. São 11 JSONs e dois Markdown indexados, mais o
próprio índice JSON; este parecer é explicitamente excluído. Os 601 arquivos
funcionais medidos não foram normalizados. O [índice privado](private-log-index.json)
confere 12/12 tamanhos/hashes/estados Git ignored. Publicaram-se somente contagens
e metadados necessários, sem logs brutos, parâmetros, credenciais ou PII.

[Analyze](spec-analysis.json)/[converge](spec-convergence.json) são consistentes
com os IDs existentes: 30 FR/SC, 31 tarefas mapeadas, zero tarefa aberta/nova,
17 cenários, 16 decisões e sete princípios inventariados. As três tasks têm
hashes físicos iguais aos registrados; A confirmou comparação física
antes/depois da coorte. O revisor confirmou os mesmos blobs origem/composição
e diff rastreado vazio. Checkout CRLF versus blob LF explica 51/49/41 CR nas
tasks 029/032/033, sem outra diferença; `tasksByteIdentical` não foi confundido
com igualdade entre bytes físicos e Git. Isso confere o recibo e não reaplica
aceite de produto ou do patch próprio.

Método: leituras de JSON/Markdown, `git show/rev-parse/diff/ls-files/check-ignore`,
`hash-object` sem escrita de objeto, SHA-256 de buffers e parsing minimizado.
Links locais, UTF-8, tabelas e whitespace deste parecer foram conferidos.
Os artefatos congelados do autor não foram alterados.

## Limites

O corte 840cd1b/1f11… é separado de 08262dc/e718…, instrumento 030 e probes de
restore. O instrumento 030 não existe nesta árvore; seu ciclo de reparo em QA
não reclassifica estes dados. Nenhuma medição é transferida entre cortes.

As suítes UI usam componentes/CSS reais com respostas/controles sintéticos;
não provam causalidade universal dos defeitos antigos. Execução local não é
CI remota, homologação hospedada, aceite assistivo/humano, G3/G4/G5 ou decisão
de merge/deploy/piloto. Não houve captura universal de rede; build pode obter
fontes públicas e SMTP unitário é apenas loopback sintético.

IHFR conserva `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO` e
`NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

## Adendo — arquivamento documental

`RECOMENDACAO`: **PASS DO DELTA DE ARQUIVAMENTO, sem achado residual**.
Referência imutável: commit `6005bcf5399fa8f7a850974db1f2774266acfb51`, que
preserva o índice b0af… e este parecer inicial 168d…. O delta do autor limita-se
ao plano active→completed, estado/histórico de encerramento, links/readme e
manifesto próprio. No plano, somente o estado e duas linhas finais de histórico
mudaram além do path. Os 11 demais artefatos indexados permanecem byte a byte
iguais ao freeze; o corte-fonte 840cd1b e os recibos medidos não foram alterados.

O [manifesto atual](public-artifacts.json), SHA-256
`00024f669dd09e8e2926211a23fe0e95b1df029442292092b2b938616d3ea2ae`,
mantém 13 entradas e registra o freeze anterior. Hashes/tamanhos do plano
concluído e readme atualizados conferem com ele; nenhum path extra foi incluído.
O plano ativo está ausente e o concluído existe. Os links atuais foram validados.

Nesta etapa o revisor mudou somente o link do plano, o ponteiro ao índice
histórico e este adendo. Não repetiu 601 hashes, testes ou runtime. Os resultados,
limites e separação do instrumento 030 do parecer anterior permanecem válidos.
