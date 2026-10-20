# Fase 6 v2 — inspeção visual oficial

## Conclusão do recorte

Foram inspecionados os **26 PNGs de aplicativo**: 24 da matriz e dois dos fluxos. Os **18 quadros dos controles finais** — formulário, revisão e detalhe após posicionamento, em seis configurações — mostram o alvo inteiro, sem interseção visível com o cabeçalho ou a navegação. Os seis quadros de detalhe antes do posicionamento foram examinados separadamente. O PNG sintético de obstrução foi identificado e excluído da aceitação visual do aplicativo.

A matriz e suas cópias duráveis estão completas. Isso fecha a lacuna de preservação observada no artifact anterior; **não fecha os achados Codex P1/P2 sobre este SHA**, nem valida as alterações posteriores do helper.

## Proveniência

| Item | Valor |
| --- | --- |
| HEAD | `2a047d10360803517ff6bf64b38754cd0f07f5ba` |
| Run / tentativa | `39465489762` / `1` |
| Job | `118775663664` |
| Artifact | `12285318854` |
| ZIP SHA-256 | `9f03b69123144f461f36a42a1aaf13680f6fd314b322aac26aa57bdab2b56e43` |
| Entradas no ZIP | 467 |
| Verificação de download, digest e CRC | agente `qa_account` |

O recibo oficial revisado registra os 15 gates PASS e 180 E2E PASS. As imagens pertencem à candidata v2. O helper posterior com `MessageChannel`, callback depois da espera e capturas com animações permitidas não pertence a esse HEAD.

## Inventário e metadados

Há **27 pares PNG/JSON** no diretório durável de coleta: 26 `application-viewport` e um `synthetic-helper-counterproof`. Todos os nomes seguros, namespaces, SHA do metadata, dimensões do PNG, viewports e escalas da matriz conferem. Os tamanhos de fonte são 16 px em 100% e 32 px em 200%; `physicalDevice` e `fullPage` são falsos. Não há overflow horizontal registrado. O scroll vertical de documento nos layouts maiores é compatível com os enquadramentos e não foi interpretado como falha por si só.

Os pares permaneceram no ZIP após os gates Deletion e Ihfr concluírem. São cópias duráveis; o ZIP não depende de `test-results` para conter esses quadros.

## Matriz examinada

| Viewport / texto | Formulário e revisão | Detalhe após posicionamento | Observações visuais |
| --- | --- | --- | --- |
| 320×900 / 100% | Alvos completos | Link completo | Navegação inferior presente; indicador de desenvolvimento sobre parte do primeiro item. |
| 375×900 / 100% | Alvos completos | Link completo | O detalhe “antes” ainda mostra carregamento; uma máscara rosa cruza a navegação no quadro final. |
| 768×900 / 100% | Alvos completos | Link completo | Cabeçalho e navegação lateral visíveis; máscaras de campos aparecem abaixo do alvo. |
| 1440×900 / 100% | Alvos completos | Link completo | Cabeçalho e navegação lateral visíveis; enquadramento de viewport, sem captura de página inteira. |
| 320×900 / 200% | Alvos completos | Link completo | Textos quebram em várias linhas; alvo acima da navegação inferior. Indicador de desenvolvimento cobre parte do primeiro item. |
| 844×390 / 200% | Alvos completos | Link completo | Alvos abaixo do cabeçalho. Na revisão, a ação secundária de voltar está parcialmente acima do enquadramento, enquanto a confirmação está inteira. |

“Antes” e “depois” representam **a mesma revisão e execução**, antes e depois de posicionar o alvo. Não são imagens anteriores e posteriores a uma correção de produto. Em 844×390/200%, o quadro anterior mostra o cabeçalho/contexto do laboratório; o posterior mostra o link de dados ambientais inteiro abaixo do cabeçalho.

## Limites preservados

- Neste SHA, as capturas ainda desabilitam animações. Um enquadramento final correto não resolve o P2 que motivou a correção posterior.
- As máscaras rosas são uma intervenção da captura. Quando cruzam a navegação, a imagem não permite concluir que um campo real a cobre, nem comprovar que todos os pixels desse item estão desobstruídos.
- O indicador de desenvolvimento interfere em alguns quadros de navegação móvel. Não foi removido nem ocultado para melhorar a evidência.
- A captura de resultado incerto é de viewport: a parte inferior do aviso e a área de retry não aparecem integralmente nesse quadro.
- As imagens não comprovam teclado físico, dispositivo real, leitor de tela ou aceitação manual de acessibilidade.
- O detalhe da matriz usa uma fixture já existente; o formulário e a revisão anteriores contêm uma nova ocorrência ainda não salva. Comparar os timestamps desses estados diferentes não demonstra perda de milissegundos.

## Quadros representativos sugeridos

Prioridade 1: `frontend-collections-form-320-900-200`, que mostra o botão de revisão inteiro acima da navegação em tela estreita. Prioridade 2: `frontend-collections-detail-844-390-200`, que mostra o link inteiro abaixo do cabeçalho em paisagem. Como complementos, o `detail-before-844-390-200` permite explicar a rolagem da mesma execução, e o `review-320-900-200` registra a confirmação final em texto ampliado.

Os nomes completos e hashes de PNG e metadata estão no resumo JSON. Conforme orientação do integrador, estes quadros intermediários não foram copiados para o repositório: a seleção de pixels versionados deve usar os equivalentes da candidata funcional final.

## Arquivos deste parecer

`second-candidate-visual-summary.json` é o recibo sanitizado autocontido. `second-candidate-visual-metadata.json` contém o inventário completo com hashes e observações de metadata, sem caminhos absolutos de scratch. Nenhum teste adicional ou alteração de repositório foi feito nesta inspeção.
