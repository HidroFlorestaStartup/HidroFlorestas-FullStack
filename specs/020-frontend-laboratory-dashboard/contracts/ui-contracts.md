# Contratos e matriz de consumidores
## Autoridade e transporte
Preservar requireAuth/getLaboratoryContext e MANAGE_ROLES no servidor. GET summary/history/memberships reais;PATCH memberships/{id} com expectedRole/role,trava síncrona;OWNER imutável,readOnly sem mutação,globalADMIN não confere OWNER. Sem filtros/convites/métricas novos.
## Matriz de consumidores
| Superfície | Consumidores e contrato | Verificação |
|---|---|---|
| Shell | workspace,resumo,áreas/mapa/membros,coletas/ambientais/drafts/IHFR,conta/logoff | suites existentes e375/320 texto100/200%,768/1440;skip/menu/foco/retorno |
| Workspace | vazio/lista/criar/acessar/configurações,3/4 atalhos | viewport início/meio/fim,clique/toque/Tab/ShiftTab,resize/safe-area |
| Resumo | dashboard contextual;totals/links/readOnly | APIs reais e captura4 larguras |
| Histórico | dashboard contextual;cursor/stack/refresh/destinos | primeira/próxima/retorno/vazio/erro/troca/tardia |
| Membros | rota OWNER;roles/revisão/inativo/perda de vínculo | APIs reais,expectedRole,conflito/duplo envio |
| Redirects | /dashboard,/dashboard/collects | continuam /workspace sem contexto implícito |
## Evidência
Viewport fullPage:false para visibilidade;fullPage histórico é composição identificada. Registrar largura/altura/escala/scroll e geometria. Transporte retido/falhado prova estado visual;APIs reais provam autorização/dados. Nenhum trace,cookie,senha/prova/env publicado;inputs preenchidos mascarados.
