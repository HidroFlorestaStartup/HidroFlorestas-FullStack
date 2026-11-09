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
