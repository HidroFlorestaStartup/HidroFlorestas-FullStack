# Pesquisa focal

RECOMENDACAO técnica: incluir account-deletion.spec.ts nas exclusões da configuração
geral, conforme o padrão existente de full-ui/ihfr. Mantê-lo em
playwright.account-deletion.config.ts e scripts/account-deletion-e2e.ts.
Alternativa rejeitada: skips condicionais/assertions mais fracas ocultariam cobertura.
Fontes locais fecham essa escolha; nenhuma pesquisa tecnológica desconhecida.
Sem hooks .specify/extensions.yml. Pesquisa delegada do programa transversal já
realizada, mas não apresentada como teste/revisão deste recorte.
