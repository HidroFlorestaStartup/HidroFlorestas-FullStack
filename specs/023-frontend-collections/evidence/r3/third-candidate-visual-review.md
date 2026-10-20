# Fase 6 v3 — inspeção visual oficial

## Conclusão do recorte

Os **26 quadros de aplicativo** estão cobertos pelo parecer: sete PNGs alterados foram vistos diretamente nesta rodada e 19 são idênticos, byte a byte por SHA-256, aos quadros v2 já inspecionados. Os **18 quadros dos controles finais** — formulário, revisão e detalhe após posicionamento, em seis configurações — mostram o alvo inteiro, sem interseção visível com cabeçalho ou navegação. Os seis quadros anteriores ao posicionamento foram avaliados separadamente; todos mostram contexto carregado nesta candidata. As duas capturas sintéticas são excluídas da aceitação visual do aplicativo.

A matriz e as cópias duráveis estão completas. A candidata exata tem **15 gates PASS, 182 E2E PASS, seis IHFR PASS e Codex concluído sem achados**, conforme recibo independente revisado. Esse resultado da fase 6 não encerra a falha IHFR 404 da candidata separada da fase 7 nem determina sua causa.

## Proveniência

| Item | Valor |
| --- | --- |
| HEAD | `5f5d8719e25856b59e84c053cb13d2516dbeac49` |
| Run / tentativa | `39469650449` / `1` |
| Job | `118790047117` |
| Artifact | `12286659078` |
| ZIP SHA-256 | `57748ae803485ddff742b5f43dcaaf6a8ec76f12b1788e2788cef39d0587956e` |
| ZIP / entradas | 19.261.404 bytes / 469 |
| Recibo Codex no SHA exato | `6297489682` — sem achados |
| Verificação de download, digest e CRC | agente `qa_account` |

## Inventário e metadados

Há **28 pares PNG/JSON** no diretório durável de coleta: 26 `application-viewport` e dois `synthetic-helper-counterproof`. Os 24 pares da matriz cobrem formulário, revisão, detalhe antes e detalhe depois em seis configurações. Os dois pares restantes de aplicativo são dos fluxos. Todos os namespaces, HEADs, dimensões de PNG, viewports e escalas conferem; o tamanho raiz da fonte é 16 px em 100% e 32 px em 200%. `physicalDevice` e `fullPage` são falsos. Todos os metadados registram `animations: allow`, e nenhum registra overflow horizontal.

Os pares sobreviveram aos gates posteriores Deletion e Ihfr no diretório durável. Não dependem de `test-results` para aparecer no ZIP. A captura sintética nova de ordem de captura mostra uma área vazia; esse desenho é parte da contraprova do helper e não uma tela vazia do aplicativo.

## Matriz examinada

| Viewport / texto | Formulário e revisão | Detalhe após posicionamento | Observações visuais |
| --- | --- | --- | --- |
| 320×900 / 100% | Alvos completos | Link completo | Navegação inferior presente; indicador de desenvolvimento cobre parte do primeiro item. Uma faixa estreita de máscara toca a borda inferior no detalhe. |
| 375×900 / 100% | Alvos completos | Link completo | O detalhe antes da rolagem agora está carregado. A máscara rosa cruza pixels da navegação no quadro final, igual à v2. |
| 768×900 / 100% | Alvos completos | Link completo | Cabeçalho e navegação lateral visíveis; máscaras de campos abaixo do alvo. |
| 1440×900 / 100% | Alvos completos | Link completo | Cabeçalho e navegação lateral visíveis; captura de viewport. |
| 320×900 / 200% | Alvos completos | Link completo | Textos quebram em várias linhas; alvo inteiro acima da navegação inferior. Indicador de desenvolvimento cobre parte do primeiro item. |
| 844×390 / 200% | Alvos completos | Link completo | Alvos inteiros abaixo do cabeçalho. Na revisão, a ação secundária de voltar está parcialmente acima do enquadramento, enquanto a confirmação está inteira. |

“Antes” e “depois” significam **a mesma revisão e execução**, antes e depois do único posicionamento do alvo. Não representam comparação de produto antes e depois de uma correção. Em 844×390/200%, a imagem anterior mostra o contexto superior do laboratório e a posterior mostra o link de dados ambientais inteiro abaixo do cabeçalho.

## Limites preservados

- `animations: allow` confirma a política de captura registrada. A ordem causal da espera e o término natural das transições são demonstrados pelos testes e contraprovas associados ao código; pixels estáticos, isoladamente, não provam esse comportamento temporal.
- Máscaras rosas são intervenções da captura. Quando atravessam a navegação, a imagem não permite concluir que um campo real a cobre nem comprovar todos os pixels desse item livres.
- O indicador de desenvolvimento interfere em parte dos quadros móveis e não foi removido para melhorar a evidência.
- A captura de resultado incerto não inclui integralmente a parte inferior do aviso e a área de retry.
- A matriz usa em detalhe uma fixture já existente; formulário e revisão contêm uma nova ocorrência ainda não salva. Comparar timestamps desses estados diferentes não demonstra perda de milissegundos.
- Dispositivo real, teclado físico, leitor de tela e aceitação manual de acessibilidade não são comprovados por estas capturas emuladas.
- Sete PNGs de aplicativo e um sintético foram vistos diretamente nesta rodada; os 20 restantes têm identidade SHA-256 com imagens previamente inspecionadas. A comparação completa está registrada, sem alegar nova abertura direta de todos os arquivos.

## Quadros representativos para versionar

1. `frontend-collections-form-320-900-200`: revisão inteira acima da navegação em tela estreita, texto 200%.
2. `frontend-collections-detail-844-390-200`: link completo abaixo do cabeçalho em paisagem, texto 200%.
3. `frontend-collections-detail-before-844-390-200`: complemento da mesma execução antes do posicionamento; não chamar de imagem anterior à correção.
4. `frontend-collections-review-320-900-200`: confirmação final inteira em texto ampliado.

Os nomes completos e hashes dos PNGs e metadados estão no resumo JSON. As quatro imagens pertencem à candidata funcional exata v3; o integrador decide sua cópia para os Specs. Esta revisão não alterou repositórios nem executou testes adicionais.

## Arquivos deste parecer

`third-candidate-visual-summary.json` é o resumo sanitizado autocontido. `third-candidate-visual-metadata.json` contém todos os hashes e observações de metadados. `third-candidate-pixel-comparison.json` documenta a identidade ou mudança de cada PNG. Nenhum deles depende de caminhos absolutos de scratch.
