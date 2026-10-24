# Resultado C — navegação, mapa e observações

Missão `HF-INV-20261023-01-LOCAL01`; owner `agent-c-navigation`.
`EVIDENCIA_IMPLEMENTACAO`: produto-base
`c4adfb379e5dc78f27f31b91edbd13f43228d9f9`, sem alteração do produto ou dos
testes originais. Os scripts investigativos não rastreados foram identificados
por hashes dos bytes executados. Este relatório não transfere PASS para o HEAD
integrado; CI e revisão da composição pertencem à coordenação.

## Experimentos e resultado

O [protocolo](protocol.md) foi definido antes do runtime. O
[resumo público](public-evidence-summary.json) preserva quatro recibos:
dois bloqueios inválidos de setup/readiness, uma rodada browser com três FAILs
de ambiente contaminado, e a contraprova com três PASS. Na rodada positiva,
375×900/texto200%, o helper concluiu sem timeout; login→cadastro→Back→Forward→
reload funcionou. Os dois controles sintéticos de animação finita/infinita e
cancelamento passaram, sem mudar o guard90s ou adicionar retries.

As duas primeiras fontes exatas do runner foram editadas sem snapshot; seus
hashes antigos não correspondem ao arquivo atual. Essa lacuna P3 fica explícita:
não se reconstrói código nem se usa esses bloqueios como evidência do produto.
As fontes da rodada browser FAIL e da rodada PASS são verificáveis. O protocolo
público executado foi preservado por prefixo inalterado e hash exato conferido.

`EVIDENCIA_IMPLEMENTACAO`: a [rodada autenticada](authenticated/results.json)
teve **13 testes PASS, zero FAIL/skip/retry**, entre21:06:55 e21:08:32UTC:
oito cenários originais frontend territorial, três originais territorial e dois
casos investigativos. A [projeção de observações](authenticated/observations.json)
mantém o experimento do formulário real e os dois jars independentes. As
versões, hashes, contagens, logs projetados e recursos estão no
[manifesto](authenticated/manifest.json). SchemaAudit e Stop próprios tiveram
exit0; HTTP3001 e PostgreSQL55427 foram aferidos livres, dados preservados.

| Item | Resultado atual e estado causal | Limite preservado |
|---|---|---|
| INV-003 | `NAO_REPRODUZIDO` no protocolo atual:11 cenários originais mapa/lista, teclado, seleção, atribuição, contexto, Back/Forward/reload PASS. | Tiles abortados e503 são injeções sintéticas identificadas; não reconstituem a rede das fases3/4. A causa histórica permanece `INCONCLUSIVO`. |
| NAV-SETTLE | `NAO_REPRODUZIDO` no recorte público375/200; três conclusões naturais e dois controles de animações PASS. | O servidor estava aquecido pela readiness. A navegação autenticada original pertence à frente A; não atribuir o logout ao timeout antigo. |
| INV-005 | `NAO_REPRODUZIDO`: dois documentos reais200, dois lookups API404 esperados preservados, contexts/jars independentes e apenas GET. | As seis rotas404 históricas exatas não foram recuperadas por C; projeção da PR27 e janela do job não demonstram sua causa. A evidência B de IHFR é separada e não somada a C. |
| OBS-001 | `INCONCLUSIVO` quanto ao aviso histórico: o formulário real de coleta teve doc200/me200, nenhuma warning e campo habilitado/focável após captura. O helper efetivamente adiciona carettransparent e restaura seu valor, deixando atributo style vazio. | A captura controle ocorreu durante transição de fonte; não é A/B geométrico puro. O helper mede32px. Isso sustenta o mecanismo de instrumentação, não causa retrospectiva de hidratação. |
| OBS-002 | Controles e amostra visual atuais favoráveis; histórico de pixels ocultos/enquadramento permanece `INCONCLUSIVO`. | Quatro PNGs de mapa e dois de coleta foram abertos; outros19 PNGs de mapa não foram inspecionados. Máscaras e indicador Next não aprovam pixels escondidos nem conferem aceite humano. |

## Negativos e segurança

Instalação1 falhou EACCES de rede; instalação2 ECONNRESET; instalação3 offline
com cache preenchido concluiu exit0. Prisma7.4.2 foi gerado na própria worktree,
sem URL ou operação de banco. A primeira compilação também expôs essa ausência.
Um erro do novo runner chamava `Response.status` como método; foi corrigido antes
de interpretar readiness. São falhas do setup investigativo, preservadas.

Um comando inline do diagnóstico foi reinterpretado pelo Windows e criou um
arquivo espúrio cuja extensão tornou o glob do Turbopack inválido. A rodada
browser registrou três/register500. Foi removido somente esse arquivo próprio;
restart do Next próprio, com o mesmo cache, produziu três PASS. Não houve patch
de produto nem atribuição desse episódio a INV-003/005.

Processos usaram allowlist, fixtures, chaves efêmeras, marcadores/ACL e guards
oficiais. O pacote PostgreSQL foi copiado sem data/credential/marker de A;
seu hash foi conferido. Não foram lidos env privados ou sessões reais nem
operados banco, SMTP, storage ou contas hospedadas. Reporter não serializa env,
cookies, tokens, payloads ou erros brutos. A máscara parcial da captura controle
mostra apenas data/hora sintética; a limitação está na
[inspeção dos seis PNGs](authenticated/image-inspection.json).

## Revisão e entrega

A [revisão](review.md) registra os três ajustes de prova pedidos por A antes do
runtime C, os findings `RV-C-A-001/002` tratados por A com contraprovas, e a
revisão estática de B. C não é apresentado como revisor independente de seu
próprio código. A revisão final da composição permanece com outro agente.

Validações locais:13 casos autenticados PASS; três públicos e dois controles
sintéticos PASS, sem somar os negativos anteriores como novos casos únicos;
typecheck e `git diff --check` PASS. Não foram executados por C os quinze gates
oficiais da candidata final, aceite humano, dispositivo físico ou leitor de
tela. Nenhuma spec de correção foi criada porque não houve patch demonstrado
de produto ou alteração do contrato do harness oficial. As investigações
residuais, aceites e liberação do piloto permanecem separados.

Correção de contenção após a execução: Playwright resolve `outputDir` relativo
ao config, portanto os artifacts brutos foram inicialmente escritos numa pasta
aninhada não ignorada. Nenhum foi commitado. Após conferir origem/destino dentro
de C e encerramento dos processos, somente essa pasta própria foi movida ao
diretório ignorado da raiz. O config passou a usar caminho absoluto calculado
na raiz; nenhuma assertion, guard ou teste mudou. Os bytes do
[config executado](authenticated/executed-sources/authenticated.config.ts.txt)
foram preservados antes dessa correção, permitindo conferir seu hash no recibo.
