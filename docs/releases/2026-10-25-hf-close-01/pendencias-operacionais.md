# HF-CLOSE-01 — atos externos pendentes

Data: 2026-10-25. `G3=BLOCKED; G4=BLOCKED; G5=BLOCKED`.
`RESTORE_OPERACIONAL=NAO_HOMOLOGADO`.
`HUMAN_ASSISTIVE_ACCEPTANCE=PENDING`.

`FATO_DOCUMENTADO`: o contrato ratificado de HF-CLOSE-01 separa a integração
técnica dos atos abaixo. O [handoff operacional #35][ops] já entrega a ordem,
os critérios e os runbooks; este quadro não reinicia diagnóstico nem altera
seus recibos históricos. Responsáveis e autoridades operacionais não foram
fornecidos para este fechamento: `A_DESIGNAR`. Nenhum nome foi inferido a
partir de destinatários, contas conectadas ou autoria Git.

| Frente | Próximo ato externo necessário | Estado neste fechamento |
|---|---|---|
| Plataforma / DB / recuperação | Designar responsável e autorizar destino isolado, projeto/target/SHA, banco/papel e ambiente; definir backup, retenção, RPO/RTO e destino descartável para restore, com critérios e autoridade de aceite. Depois, executar a homologação específica e preservar seu recibo. | `A_DESIGNAR / NAO_AUTORIZADO`; G5 continua `BLOCKED`. Restore sintético e probes de expressões não homologam restauração hospedada, roles/ACL/PITR ou backups. |
| Contas / e-mail / job | Designar responsável, caixa real de teste autorizada e configuração privada do destino. Autorizar provas de verificação/reenvio/reset e envio/recebimento real; depois, validar o scheduler específico FullStack, suas execuções automáticas e pausa/retomada. | `A_DESIGNAR / NAO_AUTORIZADO`; G3 continua `BLOCKED`. Presença de nomes de env, outbox `SENT`, SMTP accepted, HTTP 200 e scheduler LOCAL com fila falsa não provam inbox ou job do destino. Não reutilizar destinatários históricos como autorização. |
| Produto / capas / piloto | A autoridade de produto deve decidir `CAPAS_OFF` ou `CAPAS_ON`, o recorte e os participantes. Se ON, autorizar operador, custos, provedor privado e cleanup. Definir suporte, substituto e janela somente quando houver responsáveis e gates próprios. | `PENDENTE_DECISAO`; G4/G5 continuam `BLOCKED`. Nenhuma opção foi ratificada ou operada neste fechamento; não há data de piloto inventada. |
| Aceite humano / assistivo | Designar autoridade de aceite, participantes, dispositivos e tecnologia assistiva, com critérios explícitos; autorizar e executar as jornadas e os aceites no destino após as dependências operacionais. | `PENDENTE`; testes automatizados locais de foco/acessibilidade e simulação de reflow não substituem dispositivo, leitor de tela ou participantes reais. |
| Ciência IHFR | Designar autoridade científica e protocolo de validação, com recorte e critério de aprovação próprios. | `PENDENTE_SEPARADO`; integração, CI e aceite operacional não aprovam ciência. |

`RECOMENDACAO`: o próximo ato humano é registrar as designações e autorizações
das frentes pertinentes, começando por plataforma/DB/restore e
contas/e-mail/job, com destino isolado e critérios de aceite. A ausência dessas
designações impede as respectivas operações, sem bloquear por si só a
integração técnica autorizada.

O FAIL histórico `CATALOG_CONSTRAINT_MISMATCH` permanece preservado. Os 188
probes finitos são evidência separada; não houve novo restore para obter PASS
nem mudança de schema ou do comparador neste fechamento. Planejamento,
preflight e preparação LOCAL estão entregues; a instrução G3–G5 continua
`RESPONSAVEIS_E_AUTORIDADE_OPERACIONAL_PENDENTES`.

A manutenção dos instrumentos e a limpeza adiada estão dispostas na
[conclusão das seis instruções](conclusao-instrucoes-alunos.md). A retomada da
limpeza ampla depende de consumidores/reruns conhecidos e autorização
específica; não é uma operação executada por este pacote.

IHFR mantém `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO` e
`NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

[ops]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/efd0bae2a3c4339373a3100717c5fe77345c4d02/docs/reports/2026-10-25-hf-night-01/ops/runbook.md
