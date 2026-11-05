# CLOSE02 — UI-A R3, fechamento da coleta bilateral

Estado **UI06_A_EVIDENCE_COMPLETE**, no sentido de coleta bilateral, integridade e análise documentada do recorte A. Não concede paridade visual, aceite humano, UI06 global ou aprovação científica. Classificação: `EVIDENCIA_IMPLEMENTACAO`. Autor real: `/root/a_harness`; a revisão não autora pertence ao PROMPT04.

O [run 41356318087/1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41356318087/attempts/1), job [UI-A 124997441839](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41356318087/job/124997441839), executou a candidata `ebf7e9707d5beba949ae932cdffeb3f9068f8a73`, tree `9b3f6d39c89a35e90bf357e058f3fb037907e125`. A referência real é o starter fixado em `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`, tree `7620e01ca64cd218f55f789b447a3121e44ea815`. Fixtures são sintéticas e owned; as capturas são dos aplicativos executados, `REAL_APPLICATION_RUNTIME`, `fullPage:false`. O coordenador forneceu o log terminal:22:21:42.809 Running17tests;22:25:16.136,17passed(3.6m), sem usar o smoke SSR como prova de produto.

O [artefato 13103164262](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41356318087/artifacts/13103164262) foi conferido pelo autor A: SHA256 ZIP `d993e92fae9b8dd3e3c70e2683422fba63301bab70c9c74a87c0ba9fe01e0382`, 347 entradas, CRC ZIP íntegro, 172 PNGs com 3328 chunks CRC verificados, 172 JSONs, hashes de todas as referências e dimensões corretos. As 86 linhas case do journal concordam com os quatro eixos do índice. Os 172 samples têm fonte-raiz exata 16/32px e a proveniência esperada. [Recibo completo e manifesto por arquivo](close02-r3-final.json). Cópia verificada preservada no diretório relativo `.accounts-validation/close02/round3/` do coordenador; retenção remota contratual de 14 dias.

| Eixo do índice final | Resultado observado |
|---|---|
| Execução | 86 PASS |
| Completude | 86 COMPLETE, zero incompletos |
| Comparabilidade | 79 NON_EQUIVALENT, 7 COMPARABLE |
| Requisito | 86 HUMAN_DECISION_PENDING |
| Capturas | 86 FullStack + 86 starter, viewport, sem fullPage |

São 320, 375, 390, 768 e 1440px, paisagens 667×375 e 844×390, textos100/200 e insets0/34 nos casos pertinentes. Conta aberta/Escape, navegação, Back/Forward, foco e reload mantêm classes planejadas; não se afirma produto cartesiano de todos os estados em todos os layouts. `COMPARABLE` é resultado instrumental do par, sem aprovação visual automática.

## Imagens e comportamento observados

A abriu 32 PNGs finais, discriminados e vinculados a hashes no recibo; os demais foram verificados estruturalmente, sem afirmar inspeção visual de cada um. No FullStack, Conta em320/text100 e200,390/text200 e1440/text200 mostra o nome e ambas as ações inteiros. Escape390/text100 mostra menu fechado e foco no disclosure. O reparo de containing block é observável na foto real; nenhum texto ou dimensão foi reduzido nesta etapa.

Workspace375/text100 mostra máscara magenta restrita à parte visível do input: x33, y795.90625, largura309, altura28.09375; ela termina antes da barra. Workspace375/text200/inset34 preserva a barra inferior. Tablet768/text100 e desktop1440/text200 mostram trilho lateral contextual, cards e contexto;390/667 usam barra inferior,844 usa trilho. A referência mantém banner de protótipo, toast, breadcrumb, proporções e navegação próprios. Os estados sem laboratório mantêm escolha explícita e ingresso indisponível, com formulário real no FullStack e CTA/modal na referência. São diferenças observadas, sem transportar lógica de demonstração.

Os seis últimos controles FullStack testados têm `focused:true`, `viewportRatio:1`, `centerHit:true`. Em667/text200, o botão44×44 está em x583/y136.75 (inset0) ou y119.75 (inset34), abaixo do header74 e acima do rail298.5/264.5. Na referência, o link269.5×304 em x349.5/y35 possui `centerHit:false`, header bottom290 e rail top246; `REFERENCE_FOCUS_OBSCURED` e `DEFECT_FOUND` permanecem por fonte. Não foi concedido PASS de acessibilidade à referência, nem relaxado ratio/hit do produto.

Achado visual pendente de geometria **A-R3-RAIL-LABEL-1440-200 (candidato P2)**: nas imagens FullStack1440/text200 laboratório aberto/fechado, o link Laboratórios ultrapassa a largura desenhada do trilho e aproxima seu rótulo do card adjacente. Não há retângulo individual desse rótulo no artefato: não afirmar interseção de glyphs nem causa CSS comprovada. Largura desktop/min-width como causa é **INFERENCIA**. Mantido como ressalva visual para julgamento, sem reparo ou nova execução após a terceira rodada.

## Fontes, ausência regional e reload

CDP observou glyphs Poppins, Poppins SemiBold/Medium/ExtraBold e Segoe UI Emoji. Face/peso diferente gera comparações NON_EQ em vários casos; isso não prova fallback nem aprova tipografia humana. A medida é limitada a até oito donos de TextNode visíveis por região, após scan DOM escopado; não é inventário de toda a página.

Exatos seis `main` da referência permanecem **UNOBSERVED**:667×375/text200, laboratório fechado/Áreas/Forward, insets0/34. Main top459 está fora do viewport375; header tem observação real. Os JSONs preservam `regionalFindings.evidence:INSUFFICIENT_EVIDENCE` e `FONT_COMPARISON_NOT_ASSESSABLE_FOR_OCCLUDED_REFERENCE_REGION`. A exceção restrita permite coleta completa e NON_EQ do par; não transforma ausência em fontPASS. Nenhum main do FullStack está ausente. Nas seis imagens starter320/text200, o metadado registra overflow horizontal; a imagem confirma recorte de conteúdo da referência, sem alteração para ocultá-lo.

Nos seis reloads da referência, `nativeReloadState:NATIVE_LAB_LOADING` foi observado **antes de configure**. Em375/text100 a foto também mostra Carregando laboratório. Em667/text200/insets0 e34, a foto posterior mostra apenas banner/header/nav, sem main legível. Antes dela, CDP amostrou DIV status com glyphs Poppins e header bottom306; a foto tem header mais alto. **CDP OBSERVED no instante da amostragem não prova legibilidade na foto posterior.** Não afirmar estado terminal, not-found, persistência perdida ou igualdade temporal dessas observações.

Os 12 readbacks reais (seis por fonte) registram fonte16→16 nos casos100% e32→16 nos200%, com inline style removido no reload. Só depois a instrumentação reaplica16/32 exatos para capturar. Isso é reset da instrumentação inline, não teste de persistência de preferência do usuário. No FullStack, a foto de reload mantém o contexto de Áreas. Capturas preservam o indicador de desenvolvimento Next; algumas mostram o badge1Issue no canto inferior esquerdo, sem diagnóstico desse badge ou alegação de ambiente de produção.

## Handoff e limites finais

Esta etapa altera somente documentos035, após três SHAs de QA consumirem o orçamento. Não houve novo código, execução, push do worker, timeout maior, mudança científica, merge ou deploy. Produto A: CSS `97204d7` e teste035 com nome de artefato corrigido em `236f824`; instrumentação final QA `86b6fd0` + `58440f7` pertence à candidata e requer contrato/config do coordenador. A publicação funcional consolidada transporta somente CSS, E2E próprio035 e documentação A, sem copiar B.

`HUMAN_TYPOGRAPHY_REVIEW_PENDING` e `HUMAN_ACCEPTANCE_PENDING` permanecem. O coordenador informa UI06_B bloqueada (9PASS/3FAIL/63NOT_RUN); por isso A completo não fecha UI06 global. A regressão completa informada é R2/d62fb08, run41353270282/1,15 gates PASS/241 E2E/6 IHFR; **RC R3 NOT_RUN**, sem transferir o PASS integral ao SHA R3. A CI de A isolada deve ser descrita separadamente e mantém a dependência ScientificNotice/IHFR de B; A não copia B nem afrouxa assertions. Parecer não autor e publicação/PRs são responsabilidade coordenada.

Preservados: `GEOCODER_OPERATIONAL_PENDING`, `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`. Histórico anterior continua histórico: o presente run não reexecuta nem converte falhas antigas em PASS.
