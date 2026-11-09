# Pesquisa focal

RECOMENDACAO técnica: incluir account-deletion.spec.ts nas exclusões da configuração
geral, conforme o padrão existente de full-ui/ihfr. Mantê-lo em
playwright.account-deletion.config.ts e scripts/account-deletion-e2e.ts.
Alternativa rejeitada: skips condicionais/assertions mais fracas ocultariam cobertura.
Fontes locais fecham essa escolha; nenhuma pesquisa tecnológica desconhecida.
Sem hooks .specify/extensions.yml. Pesquisa delegada do programa transversal já
realizada, mas não apresentada como teste/revisão deste recorte.

## Investigação adicional e revisão

EVIDENCIA_IMPLEMENTACAO: cluster próprio tinha onze migrations concluídas, nove
CRLF e duas LF; faltava ownership do outbox. Comparação com Git confirmou diferença
exclusiva de fins de linha. RECOMENDACAO técnica adotada: aceitar bytes exatos e
variantes LF/CRLF, preservando checksums persistidos; deploy aditivo. Não alegar
equivalência semântica universal de SQL. SQL/comentários/BOM/espaços protegidos.
Revisão independente somente leitura /root/draft_research apontou fallback UTF-8
permissivo (P2); teste reproduziu 2 PASS/1 FAIL e correção exigiu roundtrip antes
de normalizar: 3 PASS. P3 documental corrigido nesta pesquisa/quickstart. Sem P1.
SQL histórico intacto; aplicação runtime adicionou somente a migration pendente.
