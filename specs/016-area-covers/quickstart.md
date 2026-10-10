# Operação e validação

Somente local nesta execução: instalar pelo lockfile, generate Prisma,
RegressionSetup/Bootstrap em cluster próprio, Unit/Integration/Migration/Contract,
typecheck/lint/build/E2E, exclusão dedicada e SchemaAudit sequenciais.
Provider fake usa bytes sintéticos e falhas determinísticas; não há upload real.
Credenciais ausentes produzem indisponibilidade sanitizada sem derrubar leitura
das áreas; UI conserva fallback e capa anterior quando uma operação falha.
Configuração real, smoke, limites/créditos e operador de cleanup ficam pendentes.
CLI de cleanup real exige confirmação operacional explícita e ambiente escolhido;
nunca rodar contra cloud real durante esta tarefa. Runbook registra prova de
ownership, assinatura 1h, janela staging e custo de Admin/download/transformation.
