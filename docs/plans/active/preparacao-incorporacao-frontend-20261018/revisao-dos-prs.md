# Revisão individual dos PRs — 18/10/2026

`EVIDENCIA_IMPLEMENTACAO`: inventário remoto reconsultado; seis PRs abertos,
#2–#7. REST/GraphQL completos para descrições, comentários, reviews e threads
(nenhuma coleção atingiu o limite 100). `RECOMENDACAO`: classificações e ações
abaixo. Nenhuma ação de escrita foi realizada no GitHub.

Referência de comparação: development 118a3a8; não substituir o diff encadeado
com a base do PR pelo diff contra main. Números de ahead/behind abaixo são
**head do PR / development**, nessa ordem. SHAs completos em evidencias.json.

| PR / base atual | Head | Ancestral de development; exclusivos | Diff encadeado / árvores atuais | Check do head atual | Classificação |
|---|---|---|---|---|---|
| [#2](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/2) / review/cri-reconciliation-20261010 (a88d846) | 7180209 | Sim; 0/83 | 15 arquivos da etapa; development já inclui a etapa e avanços posteriores (278 diferenças de árvore, não 278 entregas faltantes) | Nenhum observado; ausência não é PASS | **JÁ INCORPORADO — CANDIDATO A FECHAMENTO** |
| [#3](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/3) / review/014-account-test-runners (7180209) | 65516f6 | Sim; 0/75 | 72 arquivos; 227 diferenças da árvore para a versão posterior em development | SUCCESS, run38454674811 | **JÁ INCORPORADO — CANDIDATO A FECHAMENTO** |
| [#4](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/4) / review/015-environmental-drafts (65516f6) | 8856b85 | Sim; 0/44 | 178 arquivos; 65 diferenças de árvore por documentação cumulativa/avanços posteriores | SUCCESS, run39064680132 | **JÁ INCORPORADO — CANDIDATO A FECHAMENTO** |
| [#5](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/5) / review/016-area-covers (8856b85) | 333abde | Sim; 0/27 | 18 arquivos documentais; 50 diferenças de árvore para development | SUCCESS, run39064682644 | **JÁ INCORPORADO — CANDIDATO A FECHAMENTO** |
| [#6](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/6) / review/cri-audit-20261010 (333abde) | 5ea9823 | Não; 1/1 | 51 arquivos no diff encadeado; **somente 2 diferenças de árvore** contra development | SUCCESS, run39071712863 | **CONTEÚDO EXCLUSIVO PENDENTE** |
| [#7](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/7) / release/cri-rc-20261010 (baseRefOid consultado: 0f669b7) | a01857b | Não; 16/1 | 26 arquivos no diff encadeado e nas árvores contra development; só documentação/evidências | SUCCESS, run39064689472 | **CONTEÚDO EXCLUSIVO PENDENTE** |

GitHub retorna baseRefOid de #7 em 0f669b7, enquanto a ponta Git atual da release
está em 5ea9823. Foram comparadas as duas perspectivas: merge-base para o diff
encadeado é 0f669b7; comparar diretamente as pontas 5ea9823/a01857b acrescenta
as duas diferenças do parecer/README da release. Não há código faltante no #7.
Não apresentar o baseRefOid retornado como se fosse a ponta atual da branch.

## Evidência e recomendação por PR

**#2:** commits de runners/checksum, spec e evidências são ancestrais de
development. O código atual conserva a seleção dedicada e testes de LF/CRLF,
UTF-8 inválido e alteração real de SQL. Sem comentários, reviews ou threads.
Fechamento sem novo merge é candidato; CI ausente nesse head não é substituído
por alegação de check próprio: a validação cumulativa pertence à árvore posterior.

**#3:** inclui fc82ecc/RC-DRAFT-001; o formulário atual conserva prontidão de
hidratação e testes de primeiro PUT, sem apenas confiar no texto do PR. Sem
comentários/reviews/threads. Nenhum conteúdo exclusivo do head; pode fechar sem
merge adicional depois da confirmação humana do diagnóstico.

**#4:** inclui correções de preview, disponibilidade, preflight/adapter/retry,
contrato e seletores. Três reviews: um CHANGES_REQUESTED histórico em dace407e
e dois COMMENTED; dois comentários gerais. Uma thread **aberta, outdated**, em
area-cover.tsx, com três comentários, originalmente reproduzindo RC-UI-001.
O fix c317271 e teste da mesma revisão estão em development. A pendência formal
pertence ao revisor; não foi resolvida nem convertida em APPROVED pelo agente.
Ser candidato a fechamento não apaga o review histórico nem equivale a aprovação.

**#5:** evidências, erratas e documentação da etapa são ancestrais. Dois
comentários gerais; zero reviews/threads. O comentário de falha Ihfr0/6 na
attempt1 de run39062363513 foi lido: causa INCONCLUSIVA, distinta da ambiguidade.
Attempt2 e heads finais passaram, sem apagar a primeira. Recibo durável já está
em specs/016-area-covers/cri-rev-005-evidence/ci-published-checkpoint.json e
ci-audit-attempt1-failure.txt, presentes em development; há ainda evidências
históricas independentes exclusivas em #7, cuja preservação segue necessária.

**#6:** não é candidato a fechamento como “já incorporado por inteiro”.
O conteúdo funcional de 0f669b7 está em development, mas 5ea9823 acrescenta:

- docs/releases/2026-10-10-cri-rc/2026-10-17-parecer-aprovacao-integracao-development.md;
- atualização de docs/releases/2026-10-10-cri-rc/readme.md.

O parecer registra aprovação expressa do mantenedor e o merge real, com limites
operacionais e científicos. É conteúdo necessário para rastrear a decisão e
deve ser preservado na base de destino antes de fechar #6. Três comentários e
um CHANGES_REQUESTED histórico em ca80376; zero threads. O parecer documental
não altera eventos de review do GitHub. Recomendação: mantenedor revisar o diff
documental de dois arquivos e decidir sua incorporação por PR para development.

**#7:** o patch original de dependências 99d8363 já é ancestral de development.
Os 16 commits exclusivos incluem merges de sincronização e commits documentais;
não são 16 correções funcionais faltantes. Dois comentários gerais, zero reviews
e threads. Diff de 26 arquivos preserva relatório independente, plano encerrado,
registro documental, recibos, logs/JSON de testes/audits/cleanup e duas capturas
de navegador. Lista exata em evidencias.json; nenhuma alteração de src/tests/
scripts/prisma/specs/package/config. Recomendação: revisão humana do pacote
documental e preservação integral com os cortes históricos, sem reescrever seus
FAILs ou promover o recibo assistido a revisão humana independente.

## Sequência proposta de ações remotas — somente recomendação

1. Mantenedor conferir os SHAs desta análise e decidir a preservação de #6 e #7.
   Não fechar nem excluir essas branches enquanto houver conteúdo exclusivo.
2. Para #6, uma opção concreta é retarget futuro para development e revisão do
   diff final de dois arquivos antes de merge autorizado. Não foi executado.
   Não promover development para main nem repetir integração funcional.
3. Após preservar #6, revisar #7 contra a development então atual. Se escolher
   retarget futuro de #7 para development, esperar 26 arquivos independentes,
   com eventual conciliação aditiva em DOCUMENT_REGISTER; conservar os blobs
   históricos e a origem dos reviews. O parecer/README já preservados não podem
   desaparecer. Merge continua decisão do mantenedor e exige conferir o diff real.
4. #2–#5 podem ser encerrados sem merge como redundantes, sem atualizar seus
   heads. Para facilitar conferência de dependências, ordem recomendada após a
   preservação documental: #5 → #4 → #3 → #2. Manter branches-base existentes;
   fechar PR não apaga branch e não incorpora conteúdo. A preservação dos
   dependentes evita tratar a cadeia antiga como trabalho funcional por fazer.
5. Revisor tratar CHANGES_REQUESTED/thread quando entender cabível. Nenhuma
   aprovação, dispensa, resolução ou revisão em nome de terceiros está autorizada
   nesta execução. A escolha de fechar sem merge deve citar a integração efetiva.

Os textos prontos estão em [textos-de-encerramento.md](textos-de-encerramento.md)
somente para #2–#5. Não foi redigido encerramento de #6/#7 porque seus conteúdos
exclusivos ainda não foram incorporados/preservados na base de destino.

Descrições e comentários que dizem que main/development permanecem em beba96f
ou que 99d8363/c317271 ainda estão fora da RC descrevem cortes anteriores.
O Git atual prevalece para implementação. Não reescrever essa história nem
confundir o estado documental anterior com uma lacuna funcional atual.
