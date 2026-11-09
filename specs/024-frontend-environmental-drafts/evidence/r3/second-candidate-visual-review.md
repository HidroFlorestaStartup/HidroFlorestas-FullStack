# Fase 7 v2 — inspeção visual oficial e primeiro desvio

## Resultado do recorte

As duas matrizes de frontend estão **completas e preservadas**: 26 pares de aplicativo da coleta, 27 ambientais e um par sintético separado. Os **42 quadros dos controles alvo** — 18 de coleta e 24 ambientais — mostram o alvo inteiro. A revisão dos pixels não transforma esta execução em PASS global: o run terminou com falha no gate IHFR, depois de 188 E2E PASS.

O primeiro desvio observado foi **HTTP 404 na navegação para a página de nova coleta do gate IHFR**, antes da espera pelo campo de fuso. As seis navegações desse gate retornaram 404. Não há evidência de falha geométrica nesse gate e não foi atribuída causa a H4, ao domínio científico ou à autorização.

## Proveniência

| Item | Valor |
| --- | --- |
| HEAD | `85e397bd4271ab07a197ea88db652227e6e392ce` |
| Run / tentativa | `39465856665` / `1` |
| Job | `118776943818` |
| Artifact | `12287280647` |
| ZIP SHA-256 | `c8f87eb327d5bd3a8c7235fdc84a3ef60ab01dfd7fa42bb0cf62ce4468a41e6e` |
| ZIP bytes | 20.601.581 |
| Download e digest | agente `ux_collections` |

O recibo do observador registra 12 gates PASS, IHFR FAIL e Bootstrap/SchemaAudit NOT_RUN. E2E: 188/188 PASS, sem skip ou NOT_RUN. IHFR: zero PASS e seis FAIL. Codex concluiu a revisão deste SHA sem achados, o que não substitui o gate que falhou nem remove as limitações de captura herdadas do helper da fase 6.

## Primeiro erro real

Foi lido diretamente o log `ihfr-1792518732781.log`. A primeira navegação para `/dashboard/laboratories/{laboratory}/areas/{area}/collections/new` recebeu 404. O teste declarado em `ihfr-diagnosis-manage.spec.ts:51` depois esperou pelo campo de fuso por 120 segundos. O diagnóstico do browser registrou documento completo, sem tela de login, sem controle de ocorrência e sem regiões IHFR.

O mesmo status 404 aparece nas seis navegações do gate. Não há PNG nem arquivo de contexto de erro IHFR no artifact; a allowlist preservou as capturas de frontend, mas não esses contextos. A investigação causal do 404 permanece separada desta inspeção visual.

## Inventário e método de inspeção

Os **54 pares PNG/JSON** estão em diretórios duráveis: 53 `application-viewport` e um `synthetic-helper-counterproof`. Todos têm o HEAD correto, PNG correspondente e dimensões compatíveis; as escalas, tamanhos de fonte, nomes seguros e namespaces conferem. `physicalDevice` e `fullPage` são falsos. Não há overflow horizontal registrado. As duas matrizes somam 48 quadros, mais cinco capturas dos fluxos.

Foram vistos diretamente os **27 PNGs ambientais** e os **seis PNGs de coleta que diferem da fase 6 v2**. Os outros 20 PNGs de aplicativo da coleta são byte a byte idênticos, por SHA-256, aos pixels já inspecionados naquela fase. O sintético também é idêntico e permanece excluído da aceitação do aplicativo. Essa reutilização é de pixels comprovadamente iguais; os metadados de cada artifact foram conferidos separadamente contra seu próprio HEAD.

As cópias duráveis sobreviveram às invocações posteriores de Deletion e IHFR. A falha tardia não apagou a evidência das matrizes.

## Matriz ambiental

| Viewport / texto | Salvar rascunho | Declividade final | Revisar / confirmar | Limite do enquadramento |
| --- | --- | --- | --- | --- |
| 320×900 / 100% | Inteiro | Input inteiro | Inteiros | Máscara sobre nav no rascunho. Scroll de documento desloca nav e remove cabeçalho do quadro em formulário/campo final. |
| 375×900 / 100% | Inteiro | Input inteiro | Inteiros | Mesmos efeitos de máscara e scroll; revisão mostra cabeçalho e nav no enquadramento normal. |
| 768×900 / 100% | Inteiro | Input inteiro | Inteiros | Cabeçalho e nav lateral visíveis. Campo final e formulário têm PNG idêntico; ambos os alvos cabem no mesmo quadro. |
| 1440×900 / 100% | Inteiro | Input inteiro | Inteiros | Campo final e formulário têm PNG idêntico; revisão mostra zero separadamente de campos não informados. |
| 320×900 / 200% | Inteiro | Label e input inteiros | Inteiros | Formulário tem `scrollY=217`, cabeçalho fora do quadro e nav acima de espaço vazio. Revisão e campo final mantêm o enquadramento normal. |
| 844×390 / 200% | Inteiro | Input inteiro | Inteiros | Parte do label de Declividade está acima do limite do cabeçalho; a confirmação está inteira abaixo dele. |

Nos formulários móveis a 100%, `scrollY=287` em 320 e 375 px. Nos quadros do campo final, os valores são 106 e 122 px, respectivamente. Esses deslocamentos correspondem à navegação visivelmente elevada e ao espaço vazio abaixo; não foram normalizados ou omitidos para produzir uma avaliação mais favorável.

O fluxo de erro mostra a seção expandida, o campo obrigatório com foco e a mensagem inline. A revisão de fluxo distingue “Não” de “Não informado”. O quadro de confirmação mostra o contexto superior da página; sozinho, não apresenta o dataset confirmado inteiro. Os contratos completos de `false`, zero, `null`, ausência, parcialidade e precisão dependem das assertions e resultados HTTP registrados separadamente.

## Matriz de coleta herdada

Os seis formatos continuam mostrando os botões de revisão/confirmação e o link final de dados ambientais inteiros. Nas capturas anteriores ao posicionamento, 375×900/100%, 768×900/100% e 1440×900/100% ainda mostram carregamento. O detalhe posterior está carregado e apresenta o link.

“Antes” e “depois” são estados da mesma execução antes/depois de posicionar o alvo, não comparação histórica de produto antes/depois de uma correção. As qualificações de máscara sobre a navegação em 375/100 e do indicador de desenvolvimento continuam aplicáveis.

## Limites preservados

- O run continua FAIL por IHFR. A matriz completa não fornece substituto para o gate que falhou.
- Estas imagens são da v2, anterior às mudanças posteriores de ordem da captura e drenagem de callbacks. A política de screenshot desta revisão ainda desabilita animações.
- Máscaras rosas cruzam a navegação nos rascunhos estreitos e partes do cabeçalho em outros quadros. Elas não provam sobreposição real de campos, nem permitem afirmar que todos os pixels da navegação estão livres.
- O indicador de desenvolvimento cobre parte do primeiro item da navegação móvel em alguns quadros.
- O input final em paisagem está inteiro, mas seu label não está inteiramente visível no mesmo quadro.
- Os quadros não comprovam teclado físico, dispositivo real, leitor de tela ou aceitação manual de acessibilidade.

## Sugestões de quadros representativos

As duas prioridades ambientais são `last-field-320-900-200`, com label e input final acima da navegação, e `review-844-390-200`, com a confirmação completa abaixo do cabeçalho. Como complementos que preservam os limites, `form-320-900-200` registra a nav deslocada e o espaço vazio, e `last-field-844-390-200` registra o input inteiro com o label parcialmente cortado.

O resumo JSON contém nomes completos e hashes de PNG/metadata. Não houve cópia dos quadros intermediários para o repositório; os pixels versionados devem vir da candidata funcional final e carregar sua própria proveniência.

## Arquivos

`second-candidate-visual-summary.json` é o recibo sanitizado autocontido. `second-candidate-visual-metadata.json` contém o inventário completo com hashes. Nenhum ensaio adicional, alteração de produto, edição de testes ou ação remota foi realizado por esta inspeção.
