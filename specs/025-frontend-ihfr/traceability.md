# Rastreabilidade da apresentação IHFR

Fonte funcional: Spec 006, ADR-0001 e aplicação vigente em D/S. A composição visual deriva de `IhfrPanel.tsx` no starter em `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`. Nenhum score, mock, contrato ou camada de dados do starter é transportado.

**Atualização de evidência:** a matriz abaixo descreve a preparação local inicial. A primeira rodada externa em `a724bf7` tem 15/15 gates PASS e 40 imagens abertas, com FAIL visual em FR-009. O reparo acrescenta Range por palavra humana e capturas finais de qualificadores/recuperação. Identidade, contagens, indisponibilidade do executor e limitação das máscaras estão em [ci-review-2026-10-21.md](ci-review-2026-10-21.md); o novo HEAD aguarda T016.

| Requisito | Implementação | Prova | Estado local / externo |
|---|---|---|---|
| FR-001 regiões/teclado | Resumo, ausência e gestão mantêm IDs/títulos; diálogo mantém refs/handlers | Unitário de acessibilidade existente; E2E read/manage, Shift-Tab adicional | Unitário PASS; E2E NOT_RUN |
| FR-002 valores/códigos | Summary + `ihfr-presentation.ts`; valores impressos diretamente | Unitário com score e componentes não arredondados e classe propositalmente independente | PASS local |
| FR-003 qualificadores | `ScientificNotice`, lista completa visível e mapeamento textual com fallback | Unitários existentes/novos e leitura E2E | Unitários PASS; E2E NOT_RUN |
| FR-004 proveniência | `Detail`, lista de definições, UTC e quebra de hashes | Unitário de leitura existente; capturas de proveniência | Unitário PASS; capturas NOT_RUN |
| FR-005 ausência | `NoCurrentDiagnosis`, sem métrica artificial | Unitário novo; E2E absence/inactive/revoked | Unitário PASS; E2E NOT_RUN |
| FR-006 protocolo | Estados/hooks/handlers preservados literalmente; campos indisponíveis durante tentativa | Comparação byte a byte com S; E2E mantém chave e acrescenta corpo+endpoint | Comparação PASS; E2E NOT_RUN |
| FR-007 feedback/confirmação | JSX da gestão e modal com altura limitada/scroll; ciclo de foco original | Seis E2E mantidos, matriz de diálogos e recuperação | NOT_RUN externo |
| FR-008 composição mínima | Componentes locais e Tailwind/lucide existentes | Diff, typecheck e lint; fonte visual em research | PASS local; inspeção visual pendente |
| FR-009 responsividade | Grids adaptativos, min-width, quebra e modal responsivo | Capturas em 320/375/768/1440, 200%, paisagem e safe-area 34px; hit-test existente reutilizado | NOT_RUN externo |
| FR-010 preservação/prova | Dois arquivos E2E dedicados ampliados, helper específico | Mesmos seis cenários, nenhuma assertion retirada; artifact com HEAD/metadados | Auditoria PASS; execução NOT_RUN |

## Relação com CodeFirst e limites científicos

O recorte dá apresentação a `CF-PRD-FR-008`, `CF-PRD-FR-009`, `CF-PRD-NFR-006`, `CF-UC-012`, `CF-UC-013`, `CF-PFLOW-006` conforme rastreabilidade da Spec 006. A matriz não promove requisitos candidatos nem EVIDENCIA_IMPLEMENTACAO a autoridade científica. Os qualificadores experimentais, regras de elegibilidade, cálculo, versões/hash e imutabilidade continuam definidos nas fontes anteriores e no servidor.
