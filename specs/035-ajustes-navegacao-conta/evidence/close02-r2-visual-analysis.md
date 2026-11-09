# CLOSE02 — análise visual real de UI-A R2 e reparos R3

EVIDENCIA_IMPLEMENTACAO: run41353270282/1, SHA d62fb08, artifact13102173306,
ZIP8bf7febc... auditado CRC/digest.86casos,78PASS/8FAIL;67NON_EQUIVALENT,
12INSUFFICIENT_EVIDENCE/7COMPARABLE.14IDs no sumário são união8+12−6;
94linhas case representam86casos+8retificações, índiceigualaoúltimoregistro dosquatroeixos.
[Recibo eprovas porarquivo](close02-r2-analysis-r3-repair.json).

| Finding | Fonte/caso | Observação e implicação |
|---|---|---|
| MENU-R2, resolvido tecnicamente no recorte capturado | FullStack320/text200/Contaaberta | NomeMarcosLima eambas açõesinteiros. A foto real mostra o reparo; não éSSR nem aceitehumano. |
| REF-LANDSCAPE, MEDIUM referência | Starter667×375/text200, lab/áreas/forward,inset0/34 | Bannerdeprotótipo, header ebarra deixam mainfora do viewport. FontemainUNOBSERVED; headerPoppins observado. Não atribuirfallback nem esconderbanner/redimensionarfonte. |
| REF-FOCUS, MEDIUM referência | Starter667×375/text200, inset0/34 | Link269.5×304, centerHitfalse, headerbottom290/railtop246. FullStackBUTTON44×44 hittrue; defeito da referência não prova defeito do produto. |
| RELOAD-HARNESS, MEDIUM instrumento |6reloads | Foto375 mostraCarregandolaboratório..., embora metadado anterior dissesse not-found. Assertterminal impediaconfigure;4text200 ficaram16px e não geraramPNGstarter. Não épersistência dezoom/preferência. |
| FONT-DIV, MEDIUM instrumento | LoadingState nativo | DIVpossuiTextNode renderizado, omitido pelo seletor de tags antigo. ContraprovaREDreproduzida. |

Comparação inspecionada: workspace375/100 nosdois projetos mantém escolhaexplícita e
ingresso indisponível; FullStack expõe formulário real eConta, referência usaCTA/modal,
banner eSair. Desktop1440/100 mantém trilho, contexto, dois cards eHistórico vazio;
FullStack usa largura/própria contextualização econtroles dehistórico, referência usa
breadcrumb/trilho maisestreito e toast de criação visível. São diferenças observadas,
sem copiar texto/modelo de demonstração. Fontes header têm faces/pesos distintos de
Poppins; diferença lexical deface não é prova defallback. Capturas preservam os estados
nativos e máscaras. BarraFullStack permanece visível no320/200; nenhuma hipótese de range.

R3: reparos somente emqa/shared,shell,smoke. Fonte regional da referência permanece
UNOBSERVED/INSUFFICIENTliteral; exceção restrita ao pin/layout/estados/geomemória acima
gera NON_EQUIVALENT comFONT_COMPARISON_NOT_ASSESSABLE_FOR_OCCLUDED_REFERENCE_REGION,
nãofontPASS. FullStackausente, outro pin/layout ou ausência não explicada bloqueiam.
Foco FullStack conserva ratio1/hit. Foco referência possui avaliaçãoDEFECT_FOUND própria.
Reload lêbefore/after eestado Loading/not-found nativo antesdereaplicar16/32.
TextNodes visíveis dequalquertag sãoamostrados, max8CDP após scanDOMescopado finito.
Novo REDcom300irmãosoffscreen demonstrou porquê truncarantesdavisibilidade perderiaB.

Verificação local final:19/19smokesPASS12.9s no58440f7; typecheckcompleto/lint/diffPASS.
Node24.14/Chromium153local, semDB. RuntimehostedcorrigidoR3 aindaNOT_RUN.
ProntidãoUI06A eaceitehumano não são concedidos por este relatório deautoria.

Precisão deobservação: `nativeReloadState` éleitura anterior a`configure()`. Não
afirma estado terminal nem garante queoPNGposterior permaneceuLoading/not-found.
O revisor deve confrontaraimagemreal, preservando eventualtransição entreleituras;
não rotularimagemnova comobservationanterior semverificação. before/afterfont são
anterioresàreconfiguração. Saída local atualdos19smokes: worktreemanaged`hf044-a`,
`.accounts-validation/ui06-r3-final-green/`,47arquivoscomhashes norecibo; pastas
antigasde3smokes permanecemhistóricas.
