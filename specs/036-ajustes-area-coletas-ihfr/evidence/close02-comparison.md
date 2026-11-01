# Comparação UI06 B — CLOSE-PARALLEL-02

Estado: NOT_RUN neste corte de implementação. Não é análise de PNG executado.
Fonte da intenção: decisões UI02/03/04/06 confirmadas por Pedro em972f9b00.
Fonte do produto: candidata composta6c61056f como base; novo CODE_SHA_TESTED ainda não existe.
Referência: startercbb954a, somente leitura. Capturas a obter no job ui-b do coordenador.

| ID | Classificação estática / fonte | Impacto esperado e tratamento |
|---|---|---|
| EQ-B1 | EVIDENCIA_IMPLEMENTACAO; route área do starter ordena confirmedAt | NON_EQUIVALENT no caso área povoada; FullStack deve obedecer ocorrência/offset e mostrar origem CURRENT anterior. Não copiar ordenação antiga. |
| EQ-B2 | EVIDENCIA_IMPLEMENTACAO; adapter/mock.ts declara fixtures predefinidas | NON_EQUIVALENT nos resultados numéricos/decomposição; comparar hierarquia, densidade, tipografia, navegação e acesso às ações, sem recalibrar ciência. |
| EQ-B3 | EVIDENCIA_IMPLEMENTACAO; arrays/maps do adapter são de memória | Reload perde fixture criada; registrar observação real antes de reconfigurar escala e marcar NON_EQUIVALENT. |

Análise visual obrigatória após runtime: selecionar imagens dos dois projetos por SHA/run/attempt/case;
descrever hierarquia, tipografia, densidade, navegação e ações; identificar cada diferença com arquivo,
caso, severidade e owner. Inspecionar todos os findings bloqueantes e imagens representativas de todas
as classes de viewport/estado. Nenhuma diferença de imagem foi declarada observada por esta tabela.

Aceite humano: HUMAN_ACCEPTANCE_PENDING. Quatro qualificadores IHFR permanecem obrigatórios;
comparação técnica não é validação científica definitiva ou homologação de provedor.

## R1 — evidência terminal sem capturas bilaterais

Run41351237110/1/source194e9afa: setup UI-B FAIL,75NOT_RUN,0PNG no artifact13101154606.
Digest fc05f5e8fcfb36a77a834a08a1cc978d273c69a49c9c3e0c3dd1d4177cb85643,CRC PASS.
Não há PNGs para análise de hierarquia/tipografia/densidade nesta rodada. A falha
é técnica do seletor required-label no setup da referência, reproduzida em Chromium
sintético; não é defeito visual de produto nem NON_EQUIVALENT aprovado.
Reparo aguardando runtime corretivo do coordenador. Os registros estáticos anteriores
continuam classificados como fontes, não como inspeção visual executada.

## R2 — comparação real parcial; não fecha UI06-B

Run41353270282/1/source d62fb08cf65aca5dc704231f88594030f49279cb/artifact13102906085.
ZIP099d491c57c473222065b4ce8f3b51630f19652840a48fc46289837c8d969548 eCRCverificados.
Foram inspecionadas imagens reais dos dois projetos no único par completo
`domain-area-empty-320-900-100` e capturas unilaterais dos qualificadores0/320 e0/667inset34.

| Caso/arquivos | Observação visual real | Classificação e limite |
|---|---|---|
| fullstack-domain-area-empty-320-900-100.png / starter-domain-area-empty-320-900-100.png | Ambos mostram nome da área, CTARegistrarcoleta e navegação contextualÁreasativa. FullStack traz contexto emcard, ID e cardCapa da área; referência usa faixa compacta, breadcrumbs e mapa, além do bannerDemonstração. CTAFullStack ocupa largura disponível, referência é compacto. | Diferenças de hierarquia/densidade observadas; existência de capa e bannerdemo é de modelos existentes. Sem redesign ou aprovação humana inferida. |
| Mesmo par | Poppins observado em regiões textuais das duas fontes viaCDP. FullStack usaSemiBold noheader; referência incluiExtraBold/Medium e LucidaConsole nos controlesdomapa. | Fonte textual principal observada; LucidaConsole localizado não prova fallback global. Pesos/densidade diferem, sem igualdadepixelapixel exigida. |
| Mesmo par | NavegaçãoFullStack incluiTrocar/Resumo/Áreas/Mapa/Membros; referência Resumo/Áreas/Mapa/Membros/Sair. FullStack mantémConta/Sair noheader. | Diferença de ações/organização visível, preservando contratos autorizados. Aceitehumano pendente. |
| fullstack-domain-qualifier-667-375-34-0.png / JSON | QualificadorContratoexperimental visível; o foco noSUMMARY de proveniência temretângulo top884.8/bottom972.8 fora da viewport375. | Evidência unilateral compatível com foco retido após abrir details; não prova retrospectivamente a causa exata dos5failures sem suas geometrias. |

HashesPNG: FullStackempty `04fd673c8faf1af2d13f801e5cbd47236b821f8646f2f59e304295c831732156`;
starterempty `9f90ab2714550fdd0ce375780891d489248e58d3944545c573ff424696d4b9b4`;
qualifier667index0 `5e1ed211ee237de45d1f94776958bbed20ed77a53345ec7697a02b8442babb07`.

Findings técnicos: B-R2-NAVHIGH (74capturasstarter ausentes por navegaçãoambígua, source+contraprova);
B-R2-FOCUSMEDIUM (readiness de foco antes de scroll, mecanismo reproduzido; atribuiçãoR2INFERENCIA).
Os reparos foram devolvidos ao próprio ownerB e aguardamR3. Restante da comparação de estados/viewports
permanecePARTIAL/MISSING. Capturas isoladas não fecham UI06 nemaceitehumano/científico.

## R3 — comparação final executada, cobertura incompleta

**Estado atual: BLOCKED_WITH_EXACT_FINDINGS / UI06_B_EVIDENCE_INCOMPLETE.** O NOT_RUN do primeiro corte acima é histórico. Run 41356318087/1/source `ebf7e9707d5beba949ae932cdffeb3f9068f8a73`, artifact 13104015300, digest `2e1911a57327e38267c0ec36016514272a00727cc4943f55d72b32f91d4f0f33`; bytes/CRC verificados por B. Nove pares completos, três falhos, 63 NOT_RUN. B inspecionou todos os 24 PNGs disponíveis; faltam os recortes dos demais estados. A lista por arquivo/hash está em [close02-final-runtime.json](close02-final-runtime.json), e causas/limites/propostas em [close02-final-findings.md](close02-final-findings.md).

| Caso / arquivos no artifact | Inspeção real de hierarquia, tipografia, densidade, navegação e ações | Severidade / owner / limite |
| --- | --- | --- |
| `domain-area-empty-{320,375}-900-100`, `domain-area-empty-390-844-100`; pares `fullstack-*.png` / `starter-*.png` | FullStack mostra histórico/ordem de ocorrência, badge 0 coletas, aviso de ausência IHFR com orientação de não representar score zero e mensagem vazia. Starter concentra ícone/título/convite em card, mapa/demo acima e informações abaixo. Ambas fontes mantêm Áreas ativa e mensagem alvo inteira. Densidades e quantidades de informação diferem. | Diferença de hierarquia existente, não defeito demonstrado ou equivalência pixel. UI02 rege produto; nenhum redesenho copiado da referência. Os PNGs são do estado de leitura após scroll, e não provam CTA Registrar coleta visível em todo recorte. |
| `domain-area-empty-{375}-900-200`, `domain-area-empty-390-844-200` | FullStack reserva quase toda a faixa ao texto da mensagem vazia com palavras inteiras e nav que quebra em duas linhas. Starter tem header de 290px; título fragmenta “Nenhuma” e “confirmada” dentro de coluna estreita; instrução abaixo fica parcialmente fora do frame/nav. O alvo registrado é o título, não toda a instrução. | B-R3-VISUAL-REF-TEXT200 / MEDIUM / referência. PASS técnico COMPARABLE não significa legibilidade global ou aceite. Hashes integrais no manifesto. |
| `fullstack-domain-area-empty-320-900-200.png` e `diagnostic-starter-domain-area-empty-320-900-200.png` | Mensagem vazia nativa permanece inteira; fragmento superior do aviso IHFR quebra “automaticamente” como “automaticame”/“nte.”. Starter fragmenta título e brand; assert de overflow da referência falha. | B-R3-VISUAL-NATIVE-WORD320 / MEDIUM / produto B para futura triagem; observação limitada à palavra visível no aviso de ausência, não aos quatro qualificadores NOT_RUN. B-R3-REF-OVERFLOW-320 / HIGH / comparador: par incompleto. Sem patch ou revisão humana concluída. |
| `domain-area-empty-768-900-{100,200}` | Em 100%, ambas fontes usam nav lateral e mensagem inteira; FullStack mantém aviso IHFR e seção de histórico, starter usa card vazio e informações extensas. Em 200%, FullStack trunca nome/subtítulo no header com reticências e usa texto grande no conteúdo; starter sobrepõe brand/Sair/nome no header e concentra mensagem em coluna estreita. | B-R3-VISUAL-REF-TEXT200 / MEDIUM / referência. Não confundir alvo semanticamente visível com header aprovado. Truncamento nativo e organização de ações são observações para aceite, sem defeito de contrato demonstrado. |
| `domain-area-empty-1440-900-{100,200}` | Nav lateral persistente nas duas fontes. FullStack usa conteúdo mais largo, badge 0 coletas e aviso IHFR acima da mensagem; starter usa card de coletas à esquerda e informações à direita. Em 200% starter quebra vários valores da coluna de informações, enquanto a mensagem vazia permanece legível. Header FullStack separa Conta/Sair, starter tem seletor de laboratório/Sair/identidade. | Diferenças de densidade/ações observadas. Os gestos centrados no alvo deixam cabeçalho de página/CTA fora do quadro em parte dos recortes; não declarar ausência funcional por isso. Navegação/teclado e demais estados não foram executados. |
| `diagnostic-fullstack-domain-area-empty-667-375-200.png`, `starter-domain-area-empty-667-375-200{,-initial-occluded}.png` | FullStack apresenta texto de ausência legível, mas a caixa alvo começa atrás do header e falha ratio 1. Referência tem header/nav ocupando toda a altura útil, inclusive após scroll; centro do alvo acerta SPAN de outra camada. Inicial main.top 459 e fonte UNOBSERVED preservados sem mascarar a limitação. | HIGH / comparador e limitação referência, conforme findings. Diagnósticos não são pares PASS nem cobertura adicional. A fonte observada por CDP no pós-scroll não prova legibilidade. |
| `fullstack-domain-area-empty-844-390-200.png` | Mensagem nativa inteira, nav lateral, header e alvo expostos; índice registra gap 268.671875/ratio 1/hit true. Não existe PNG válido da referência neste caso porque houve timeout e falha de captura. | HIGH / B fixtures: insuficiente para comparação bilateral. Não preencher lacuna com PNG de 667px ou com inferência. |

Poppins e seus pesos foram observados por CDP em regiões reais dos samples completos; fonte observada não garante cada palavra inteira, alinhamento, contraste ou ausência de oclusão. Indicadores de desenvolvimento do runtime estão presentes em alguns PNGs nativos, inclusive sobre parte da região inferior; os arquivos foram preservados e não retocados. A intenção normativa, a inspeção real e as inferências do parecer permanecem separadas.

Nenhuma imagem de área povoada, registro/coleta, ausência ambiental, resultado CURRENT, quatro qualificadores, teclado ou reload foi obtida em R3. Essas classes continuam sem comparação qualificada. A ordem por ocorrência, a origem CURRENT anterior e EQ-B1/EQ-B2/EQ-B3 não recebem PASS desta rodada. Aceite humano e revisão não autora consolidada ficam com o coordenador.
