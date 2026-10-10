# Pesquisa e decisões técnicas

DECISAO_CONFIRMADA de produto: política/recorte na spec e pacote CRI.
RECOMENDACAO técnica adotada: nova tabela isolada; FKs Restrict e cleanup explícito
na exclusão da conta; Serializable/retry da IMP-005 para promoção. Evita sequência
confirmar/apagar não atômica e mantém parser científico inalterado.
Alternativas consideradas: localStorage (rejeitada, não server-side), tabela de
medição parcial (rejeitada, mistura confirmação), autosave/colaboração (fora).
Pesquisa delegada read-only confirmou que listas manuais de migrations do harness
precisam incluir a nova tabela e que membership continua blocker de exclusão.
Escolha de envelope evita colapso de raw `12.`, zero/false/vazio/ausência.
Nenhuma política de 30 dias adotada. Guias Next locais route/cookies consultados.
