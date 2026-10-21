# Pesquisa e decisões de implementação

## Fontes verificadas

- C1 e plano mestre conciliados de 2026-10-21; handoff de Pedro e anexos preservados no repositório.
- Constituição, AGENTS, ADR-0001 e Spec 006 para limites normativos; Specs 022–024 como padrão incremental de frontend.
- Componentes reais e seis cenários de `ihfr-diagnosis-read/manage.spec.ts`.
- Fonte visual `src/features/ihfr/IhfrPanel.tsx` em `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`.
- Next instalado: `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` e `03-api-reference/01-directives/use-client.md`.
- Skills reais `.agents/skills/speckit-{specify,plan,tasks,analyze,implement,converge}/SKILL.md`.

## Decisões

| Tema | Decisão | Motivo / alternativa considerada |
|---|---|---|
| Aparência | Cartões brancos, verde e ocre, tipografia do app, ícones já instalados | Reaproveita a composição, sem copiar o app demonstrativo |
| Score | Imprimir `displayScore` e componentes do DTO sem cálculo | Não transportar classificação, faixas ou arredondamento do starter |
| Estados | Texto português junto ao código real | Leitura clara e rastreabilidade normativa |
| Ciência | Aviso sempre visível com os quatro qualificadores | Não ocultar em disclosure nem reduzir a uma etiqueta vaga |
| Proveniência | Lista de definições sempre visível, IDs com quebra | Preserva testes e auditoria; disclosure do starter não serve às exigências atuais |
| Gestão | Alterar JSX; preservar funções de envio, recuperação e reconciliação | Menor risco para idempotência e conflitos |
| Estilo | Tailwind local, sem CSS import no resumo | Compatível com renderToStaticMarkup nativo e sem mudança global |
| Evidência | Helper exclusivo e ampliação de cenários dedicados existentes | O runner geral ignora IHFR; não duplicar fixture ou alterar seleção |
| Incidentes históricos | Registrar sem campanha de investigação nesta frente | Apenas falha material atual exige correção causal imediata |

Nenhuma incógnita exige clarificação do mantenedor. Inspeção real de imagens e gates oficiais permanecem trabalho externo ao ambiente local Linux.

## Conferência do rótulo T

O rótulo visual “Território” foi conferido contra a fonte técnica, além do starter. `DOC-RAW-013` (`docs/raw/specificacao-do-ihfr-v0-1-mvp-contrato-matematico.md`, §2 e §3.4) nomeia T como “Território/Contexto (Terrain/Context)”. ADR-0001 §6 e matriz de decisões preservam a composição por declividade e uso da terra; o avaliador real usa `terrain.slopePercent` e `supplement.landUseType`. Portanto, o rótulo não introduz significado novo nem reduz a dimensão a topografia. Nenhuma fonte, fórmula, versão ou valor foi alterado.
