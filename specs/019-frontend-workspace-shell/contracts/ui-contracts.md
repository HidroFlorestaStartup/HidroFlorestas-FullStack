# Contratos de interação e consumidores
## Matriz antes da alteração
| Componente/consumidor | Escopo da apresentação | Contrato/regressão |
|---|---|---|
| TopBar → workspace/layout, dashboard/layout | Marca, conta/logout, menu móvel | Links reais; sem #; um Sair visível; conta pelo menu em mobile |
| Sidebar → dashboard/layout; novo workspace/layout | Trilho desktop/rodapé mobile | Laboratórios/workspace; Áreas no laboratoryId atual ou workspace sem seleção; Admin somente canAdmin server; Sair móvel |
| ApplicationShell → dois layouts | Composição, skip/foco, espaçamento | Não adicionar main; conteúdo min-width0; rolagem/foco sem ocultação |
| workspace/page + LaboratoryWorkspace | Hierarquia, opções, cartões, estados | Saudação, li/h3 e ACESSAR LABORATÓRIO conservados; criar não seleciona; convite indisponível |
| dashboard/[lab]/layout | Identidade e navegação contextual | Mesmo getLaboratoryContext; Resumo/Áreas/Mapa; Membros somente OWNER; inativo/readOnly |
| dashboard resumo/histórico | Somente chrome externo | Testes dashboard-summary/history, um main; sem redesenho |
| áreas/lista/new/detalhe e coletas | Somente chrome externo | area-registration/viewing, environmental-collection-registration |
| ambientais/drafts/capas | Somente chrome externo | environmental-data-*, area-covers; sem alteração de fluxos |
| mapa | Somente chrome externo | territorial-map; seleção/links/teclado preservados |
| admin/layout/AdminShell e legado dashboard/admin/users | Nenhum redesenho | global ADMIN e redirecionamento canônico; suites user-administration |
| layout privado pai | Nenhuma alteração funcional | requireAuth/redirect e AuthSessionRestorer/histórico |
| logout | Harmonização por AccountShell018 | Mesmo logout(), erro/retry/POST/cookies |
| conta/cadastro/login | Somente acesso pelo shell | Todas as suites anteriores; login intacto |

## Estados e foco
Workspace: loading/status → vazio ou lista; falha/alert → retry real. Criação mantém payload e validação1–100;5/5 desabilita campos/submit. Mesmo turno não pode duplicar requests se RED comprovar.
Configurações: selected → detalhes/loading/erro interno; retry repete GET. Tab/ShiftTab contidos, Escape/cancel devolve foco; busy recusa fechamento. OWNER inicia DEACTIVATE/DELETE e digita nome exato; confirmação incompleta não envia; server blocker mantém diálogo e laboratório. Após ação, recarregar lista, continuar workspace e foco em título existente se trigger removido.
Menu de conta: disclosure por teclado, links só quando aberto; Escape devolve ao acionador; fecha ao navegar, foco sair, clique fora e transição a desktop. Alvos>=44px.
Contexto: nunca selecionar outro automaticamente; status/papel/nome vêm do DTO autorizado. Navegação principal e contextual têm rótulos distintos. GlobalADMIN e contextualADMIN não equivalem a OWNER.
Saída: um link Sair acessível por viewport, POST/logout real, loading/erro/retry e nenhuma restauração de contexto após revogação.

## Matriz de validação
Quatro larguras375/768/1440/320(texto200): vazio, lista, contexto, áreas/mapa/membros antigos e diálogo; loading/erro/foco adicionais. Assert reflow próprio e chrome, não redesenhar páginas antigas para simular nova fase.
Reusar suites reais de criação/limite/cross-user, contexto/roles, sessão/HTTPS/contas, áreas/coletas/ambientais/drafts/capas/mapa/admin/IHFR. Novos cenários em tests/e2e/frontend-workspace.spec.ts: transportes transitórios explicitamente mockados só para UI/loading/duplo envio; lifecycle/roles/contexto/logout usam API/banco sintético reais.
