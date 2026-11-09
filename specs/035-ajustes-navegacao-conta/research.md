# Research e decisões de implementação — Spec 035

Estado: implementação preparada, validação de runtime pendente.

| Pergunta | Conclusão técnica | Autoridade |
| --- | --- | --- |
| Onde determinar papel para Membros? | Reutilizar `getLaboratoryContext` em layout servidor e `context.membershipRole === "OWNER"`. O cliente só apresenta o resultado, não concede acesso. | Contrato existente Spec019 e código |
| Como evitar links de Áreas antes de escolher laboratório? | Global rail exibe apenas Laboratórios e, se permitido pelo servidor, Administração; contexto de laboratório oferece destinos locais. | DECISAO_CONFIRMADA #44 |
| Como manter as rotas reais? | Next `Link`, `usePathname`; `/workspace`, `/dashboard/laboratories/[id]`, `/areas`, `/map`, `/members`, `/change-password`, `/delete-account`, `/logout`. | Código implementado |
| Como respeitar barra móvel e último controle? | `position:fixed`/safe-area com padding de conteúdo e correção da rolagem de foco para limitar à borda superior da barra. | RECOMENDACAO de engenharia implementada, teste E2E necessário |
| Como validar a adaptação Lovable? | Runtime com mesmo estado/viewport é requisito; capturas históricas não provam. Starter é TanStack, não transportar dados nem router. | DECISAO_CONFIRMADA #44; execução NOT_RUN |

Nenhum novo modelo de dados, endpoint, migração, dependência ou API de provedores foi necessário. Scripts do Spec Kit e docs locais em `node_modules/next/dist/docs` não puderam ser executados/lidos na sessão GitHub API-only; Next 16.3.8 e API utilizadas identificadas em `package.json` e na base existente. O resultado não equivale a validação do runtime.
