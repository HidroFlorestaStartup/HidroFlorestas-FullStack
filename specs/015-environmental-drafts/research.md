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

## RC-DRAFT-001

EVIDENCIA_IMPLEMENTACAO: diagnóstico anterior diferencia DOM editável de handler
React pronto. RECOMENDACAO adotada: controles disabled desde SSR, liberados por
snapshot cliente após hidratação, sem alterar valores/conversor/persistência.
React documenta getServerSnapshot durante SSR e hidratação inicial;
Playwright documenta perda de interações em controles habilitados sem listeners.
Fontes técnicas primárias consultadas em2026-10-13:
[React](https://react.dev/reference/react/useSyncExternalStore#adding-support-for-server-rendering) e
[Playwright](https://playwright.dev/docs/navigations#hydration), além dos guias Next
locais da versão instalada. Essas fontes não aprovam ciência/produto.
Teste por barreira de rede é determinístico; timeout/sleep maior no teste original
é alternativa rejeitada porque esconderia a janela de perda de preenchimento.
