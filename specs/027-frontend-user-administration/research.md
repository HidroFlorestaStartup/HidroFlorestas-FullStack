# Pesquisa — Spec 027

**EVIDENCIA_IMPLEMENTACAO**: base D `1ea3cc2552c244e1004f4f733f838e0f9ea62993`, semente S `b3f65f2ccd8a4b08cf53a1bebf16e3ba33db09a6`; branch exclusiva e inicialmente limpa. Fonte visual `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`.

## Decisões de implementação

1. **Decisão**: adaptar cards, rótulos visíveis, separação de consulta/detalhe e revisão do starter ao React/Next existentes. **Razão**: permite incorporar a apresentação sem TanStack/adapters/dados de demonstração. **Alternativa rejeitada**: portar roteador e dependências do starter.
2. **Decisão**: manter a proteção em layout/APIs de servidor sem alteração. **Razão**: papel contextual nunca é autoridade global. Guias Next instalados `01-app/01-getting-started/05-server-and-client-components.md` e `03-api-reference/04-functions/use-pathname.md` foram consultados; componentes interativos continuam client e overview continua server.
3. **Decisão**: usar requisições canceláveis e geração corrente para leituras de lista/detalhe/auditoria. **Razão**: na base, loadAudit reutiliza respostas sem verificar seleção e mantém eventos anteriores durante troca. **Alternativa rejeitada**: deixar o usuário atribuir audit de A a B até a resposta seguinte.
4. **Decisão**: GET do detalhe no conflito atualiza selected.revision. **Razão**: na base, Atualizar dados recarrega lista/audit, mas mantém a versão usada no PATCH antigo. Não é alteração de regra de concorrência.
5. **Decisão**: diálogo modal nativo com limite de altura e rolagem; shell móvel sem offset fixo entre header/nav. **Razão**: topo e controles podem crescer com texto ampliado; conteúdo deve continuar alcançável.

Não há ambiguidade material nova de produto. O retorno para PENDING continua uma decisão histórica pendente, sem modificação nesta spec. Infra/CI e publicação ficam exclusivamente com a coordenação.
