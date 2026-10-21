# Contrato de preservação da UI

Este arquivo descreve o contrato existente; não redefine API nem ciência.

- Regiões nomeadas: `Diagnóstico IHFR experimental` e `Gerenciar diagnóstico IHFR experimental`.
- Leitura usa exclusivamente `PublicDiagnosis`; ausência não corresponde a score zero.
- Criação/substituição mantém `POST .../ihfr-diagnosis/diagnoses`, corpo com versões/hash, suplemento/proveniência, modo e ID vigente esperado.
- Revogação mantém endpoint específico do diagnóstico, `expectedCurrentDiagnosisId` e motivo.
- Ambas mantêm `idempotency-key`; falha técnica conserva `Attempt` integral.
- Recuperação mantém `GET .../operations/:key`; repetição usa a mesma estrutura `Attempt`.
- Respostas `ELIGIBLE`, `INSUFFICIENT_DATA`, `INCOMPATIBLE_VERSION`, conflitos e estados terminais seguem handlers atuais.
- Foco inicia em Cancelar, circula entre Cancelar/Confirmar, Escape restaura o disparador; mensagens recebem foco após resposta.
- Resumo somente leitura não contém ações de gestão. A rota continua responsável pela autorização contextual e laboratório inativo.
- Qualificadores normativos: `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

Provas: testes unitários de acessibilidade/leitura existentes e novos de apresentação; seis E2E IHFR existentes com capturas incrementais. Todos os IDs, códigos, datas e valores continuam expostos de forma auditável e sem fixture de demonstração no produto.
