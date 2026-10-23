# Revisão e tratamento de findings

[Parecer independente D](review/independent-review.md) e
[findings estruturados](review/findings.json) identificam o SHA examinado e o
escopo. A revisão nativa não é apresentada como execução da CLI ou parecer remoto.
O recibo da CLI e o Codex do HEAD final ficam na conversa da PR, depois da
publicação; running/null/reação não são aprovação.

Antes das execuções, C exigiu em A autenticação real comprovada por
workspace200/heading e/api/auth/me200, além de ordem monotônica resposta→rota
no login (`RV-C-A-001/002`). A corrigiu antes da primeira jornada. A exigiu em C
assertions dos controles coletados, hash do diff por bytes sem trim e limites
do servidor aquecido; as correções precederam o runtime. Esses autores não são
apresentados como revisores independentes dos próprios scripts.

O locator de alerta da sonda A/v3 e o erro de status do novo runner C foram
falhas da instrumentação, com negativos preservados e novas hipóteses/rodadas
identificadas. Nenhum guard/assertion oficial foi relaxado e nenhum patch de
produto foi inventado para obter verde. A errata do label v4 permanece ao lado
da fonte executada, sem editar retrospectivamente o recibo.

Limites P3 identificados pela revisão, sem aceite de risco pelo mantenedor:

- B preserva SHA/fonte executável e hashes verificáveis, mas não capturou todos
  os campos de árvore exata/diff do estado inicial não commitado. Não se cria
  hash retroativo nem se atribui execução a uma worktree limpa fictícia.
- Contadores HTTP de B têm filtros distintos:15GETs de rota/dashboard200 excluem
  /login; `httpTotalLogged` não é a extensão do array de projeção fechado. A CLI
  identificou ainda o P2 de classificação documento/RSC, tratado na errata abaixo.
- As fontes das duas primeiras tentativas BLOCKED de C não foram preservadas.
  As fontes do FAIL de browser/PASS e o protocolo executado são verificáveis;
  os bloqueios de setup não são prova de defeito do produto.
- No controle de coleta C, a fonte/geom estava em transição; a comparação não
  certifica geometria A/B pura. Máscaras/19PNG não inspecionados e ausência de
  aceite humano continuam limites explícitos.
- Os primeiros logs de falha do launcher unitário da coordenação foram
  sobrescritos antes do arquivamento. Os resultados permanecem no preflight;
  uma contraprova mínima posterior confirmou o erro de contexto OS. Não se
  publica digest de bytes ausentes como integridade comprovada.

A revisão recuperou [INV-005 original](review/inv005-historical.json): artifact
12287280647, digest/tamanho iguais à API,519membros/CRC/caminhos conferidos.
Seis404 de documento, em duas famílias de rota, permanecem distintos de lookup
API404. A coordenação reconferiu independentemente metadados atuais da API e
significado da projeção; não afirma ter reaberto o ZIP bruto. Essa projeção foi
produzida por D e é excluída de sua própria alegação de independência. Os seis
casos já têm contraprovas atuais nas duas rodadas B; não se repetiram testes
verdes apenas para preencher metadados. C descreve o checkpoint anterior à
recuperação, não um bloqueio atual de acesso ao artifact.

`CLI-D-P2-002`, procedente: a revisão CLI de52cdf6e demonstrou que os GETs de
rota no servidor não distinguem documentos de RSC. A [errata vinculada aos
recibos originais](review/http-classification-errata.md) restringe a prova atual B
a seis casos UI PASS/rodada e GETs de rota200, sem afirmar15documentos capturados.
Os dois documentos200 de C têm observação de browser própria. Os seis404
históricos têm listener de navegação principal comprovado na fonte imutável.
O recibo JSON e a primeira projeção D foram preservados byte a byte; suas
interpretações precisam ser lidas com a errata. O Codex remoto sem findings
de52cdf6e não substitui o tratamento deste finding nem revisa o novo HEAD.

Nenhuma destas revisões concede merge, aceite científico/visual ou homologação
do piloto. Findings materiais do Codex final, se houver, exigem tratamento e
nova validação do SHA resultante antes da entrega.
