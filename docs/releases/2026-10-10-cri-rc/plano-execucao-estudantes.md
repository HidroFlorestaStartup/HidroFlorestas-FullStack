# Plano de execução dos estudantes — HidroFloresta

Identificador: EST-CRI-20261013. Versão documental: 1.1. Data: 2026-10-13.
Estado da execução: **NAO_INICIADO**. O roteiro principal tem **seis entregas**.
Nomes, calendário e autoridade dos aprovadores: **não especificado**, a preencher
pelo responsável pelo projeto com a equipe.

## Objetivo e responsabilidades

**DECISAO_CONFIRMADA:** a solicitação do usuário nesta conversa de 2026-10-13
revisa o plano publicado: separar trabalho dos estudantes, operação e aprovação,
reaproveitar evidências e remover dependências artificiais. Este mandato atualiza
a distribuição de trabalho da versão 1.0, preservada no histórico Git.
A revisão e sua publicação alteram somente documentação.

O HidroFloresta já está hospedado. Os estudantes entregam revisão, testes
pertinentes, tratamento de achados, preparação/participação na integração,
acompanhamento da atualização e registro final. O projeto designa os operadores
dos serviços e quem aprova mudanças, acesso, uso de dados, custos e produção.
O resultado desejado continua sendo a atualização segura da aplicação existente.

**RECOMENDACAO:** usar este roteiro como acordo de entregas. Um estudante só
assume função operacional por designação explícita do projeto, com escopo,
acesso e supervisão confirmados. Participar da equipe ou testar a aplicação não
atribui administração de Vercel/Neon/Cloudinary, titularidade dos dados, custódia
de segredos, responsabilidade financeira ou autoridade para aceitar riscos.

| Papel | Quem executa e limite | Quem designa/aprova | Principal / substituto |
|---|---|---|---|
| Coordenação dos estudantes | Organiza entregas, dúvidas e evidências | Responsável pelo projeto | ______ / ______ |
| Revisão, testes e correções | Estudantes designados; autor não aprova sua própria mudança | Revisor independente designado pelo projeto, que pode ser estudante | ______ / ______ |
| Integração Git/GitHub | Estudantes preparam; mantenedor com permissão realiza merges, ou delega expressamente | Mantenedor/revisor independente conforme política do repositório | ______ / ______ |
| Operação Vercel e serviços | Operadores do projeto confirmam configuração, executam atualização e monitoram | Responsável pelo projeto e aprovador da janela | ______ / ______ |
| Banco, backup e recuperação | Operador autorizado administra banco e artefatos privados | Responsável pelos dados e aprovador da mudança de banco | ______ / ______ |
| SMTP, agendadores e Cloudinary | Operadores do projeto configuram/operam filas, preset, limpeza e alertas | Responsável pelo projeto; custos com autoridade financeira designada | ______ / ______ |
| Aceite de uso e recorte | Testadores autorizados observam jornadas; autoridade aceita limitações/recorte | Responsável pelo aceite funcional designado | ______ / ______ |
| Produção, custos e dados | Autoridades do projeto decidem GO/NO-GO, orçamento, dados e reabertura | Responsável pelo projeto identifica essas autoridades | ______ / ______ |

Aprovação técnica de PR, aceite de uso, autorização de banco e GO produtivo são
registros distintos. Nenhum papel é atribuído pelo agente a uma pessoa específica.
Se faltar operador/acesso, os estudantes encaminham a necessidade e continuam as
frentes independentes; não coletam credenciais nem criam recursos para contornar.

## Roteiro principal — seis entregas

| Entrega | Execução dos estudantes | Execução operacional, quando necessária | Quem aprova |
|---|---|---|---|
| ENT-01 — Revisão | Examinar PRs, contratos e provas; registrar parecer/achados | Mantenedor fornece informações de refs/checks inacessíveis | Revisor independente designado |
| ENT-02 — Testes | Selecionar lacunas, executar cenários autorizados e organizar resultados | Operador prepara alvo e executa ações que exigem privilégio | Revisor técnico e responsável pelo aceite funcional |
| ENT-03 — Tratamento de achados | Investigar, planejar correções no Spec Kit, produzir PR e revalidar impacto | Operador contém incidentes/atua em serviços; autoridade decide dados/custos/risco | Revisor independente; autoridade do assunto para exceções |
| ENT-04 — Integração | Preparar sequência, conferir retarget/diffs/SHAs e equivalência | Mantenedor autorizado realiza merges controlados | Mantenedor e revisor independente do candidato |
| ENT-05 — Atualização acompanhada | Entregar candidato/evidências, acompanhar janela e conferir uso autorizado | Operadores executam backup, migrations, configuração, deploy e recuperação | Aprovadores de banco/produção; responsável pelo aceite pós-deploy |
| ENT-06 — Registro final | Consolidar o realizado, resultados, limites e pendências | Operadores fornecem registros sanitizados e assumem operação contínua | Coordenador/responsável pelo projeto aceita o relatório |

Marcar as seis caixas somente com evidência e aceite. As 43 referências EST no
[anexo técnico](#anexo-técnico--referências-condicionais) são consultas selecionáveis:
não representam 43 obrigações adicionais dos estudantes. Todos os aceites
continuam pendentes; esta revisão não aprova PRs, homologa serviços ou libera GO.

- [ ] **ENT-01 — Revisão**
  - **Objetivo:** avaliar os sete PRs e identificar impedimentos reais.
  - **Pré-requisitos/dependências:** candidato/ref e acesso de leitura ao código ou pacote equivalente fornecido pelo mantenedor; não depende de inventário administrativo completo.
  - **Quem executa:** estudantes revisores; mantenedor apoia consultas indisponíveis.
  - **Quem aprova:** revisor independente designado pelo projeto, conforme política dos PRs; autor não aprova a própria mudança.
  - **Procedimento:** revisar diffs por etapa e contratos/specs; ler prontidão, reviews e evidências já existentes. Distinguir correção implementada de CHANGES_REQUESTED ainda não revisto. Podem começar PRs/frentes independentes em paralelo.
  - **Entregáveis/evidências:** parecer por PR, SHA, links de checks/reviews e achados com severidade, reprodução e impacto.
  - **Critério de aceite:** pareceres registrados e bloqueios identificados; a aprovação para merge de cada head fica explícita, sem equivaler CI a aceite humano.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** indisponibilidade de uma consulta ou achado de uma frente bloqueia apenas o recorte afetado; impedimentos de segurança/dados precisam de tratamento antes de seu merge.
  - **Referências:** [EST-003](#est-003) a [EST-011](#est-011); [integração](integration-guide.md) e [checklist](review-checklist.md).

- [ ] **ENT-02 — Testes**
  - **Objetivo:** obter as provas faltantes do recorte e avaliar o impacto de mudanças.
  - **Pré-requisitos/dependências:** cenário/candidato definido, evidência aplicável inventariada e alvo/participantes autorizados para cada cenário; pode ocorrer durante ENT-01 e ser atualizado após ENT-03/04.
  - **Quem executa:** estudantes/testadores em acesso de uso ou harness local próprio; operador do projeto prepara os serviços e faz ações privilegiadas.
  - **Quem aprova:** revisor técnico aceita cobertura/reuso; responsável pelo aceite funcional registra resultado humano e limitações dos fluxos ativos.
  - **Procedimento:** aplicar a matriz de reaproveitamento abaixo; testar lacunas, novos defeitos e fluxos afetados. Contas, exclusão, drafts e capas avançam em paralelo quando seus próprios dados/configurações estão prontos. Ensaios de backup produtivo não são pré-requisito para regressão local ou uso de homologação isolada.
  - **Entregáveis/evidências:** matriz automatizado/local-CI, provedor real e aceite humano, com candidato/ambiente/UTC, links reutilizados e justificativa de testes adicionais ou não repetidos.
  - **Critério de aceite:** cobertura pertinente aprovada, lacunas explicitadas e gates humanos/provedores do recorte atendidos antes de ativá-lo; ausência de teste não recebe PASS.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** sem alvo/conta/cloud autorizados, pausar esse cenário; não usar produção, extrair prova do banco ou solicitar segredo para substituir recebimento humano.
  - **Referências:** [EST-009](#est-009), [EST-014](#est-014) e [EST-026](#est-026) a [EST-034](#est-034); [contas](../../operations/account-homologation-runbook.md), [drafts](../../operations/environmental-drafts-runbook.md), [capas](../../operations/area-covers-runbook.md).

- [ ] **ENT-03 — Tratamento de achados**
  - **Objetivo:** dar destino verificável a defeitos, dúvidas e riscos materiais.
  - **Pré-requisitos/dependências:** achado em qualquer entrega; não exige concluir todos os testes nem esperar atualização produtiva.
  - **Quem executa:** estudantes investigam/corrigem o recorte autorizado; operadores tratam incidentes de serviços; autoridades do projeto decidem risco, custos e dados.
  - **Quem aprova:** revisor independente aprova correção; autoridade do assunto confirma exceção, recorte ou decisão pendente.
  - **Procedimento:** registrar issue/PR com ID, SHA, passos e impacto; antes de código funcional usar spec/plan/tasks do Spec Kit. Revalidar cenários afetados, pedir re-review de #4/#6 e resolução pertinente da thread. Preservar FAIL e causa inconclusiva; não afrouxar asserts/guards/timeouts para encerrar achado.
  - **Entregáveis/evidências:** registro de correções/PRs e testes focais, ou decisão explícita de adiar/aceitar risco com responsável/prazo; informar se nenhum achado novo surgiu.
  - **Critério de aceite:** achados bloqueantes do candidato tratados antes da integração/ativação afetadas; pendências aceitas têm autoridade e alcance registrados.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** estudante não aceita risco financeiro/científico ou alteração de dados por conta própria; dúvida material vira PENDENCIA_DE_DECISAO.
  - **Referências:** [EST-010](#est-010), [EST-011](#est-011) e [EST-042](#est-042); [constituição](../../../.specify/memory/constitution.md).

- [ ] **ENT-04 — Integração**
  - **Objetivo:** incorporar alterações aprovadas preservando história e candidato verificável.
  - **Pré-requisitos/dependências:** parecer/achados pertinentes ao PR que será integrado e gatilhos confirmados pelo operador; ensaio de backup e homologação Cloudinary não condicionam merge sem efeito produtivo.
  - **Quem executa:** estudantes preparam/conferem; mantenedor com permissão de escrita integra ou delega expressamente o ato.
  - **Quem aprova:** mantenedor e revisor independente, segundo política do repositório; promoção produtiva exige aprovação separada na ENT-05.
  - **Procedimento:** respeitar a dependência Git #1→#2→#3→#4→#5→#6→#7 com merge commits, retarget para development após o anterior e diff conferido a cada etapa; sincronizar avanço documental da RC em #7 sem absorver sua revisão na base. Não duplicar 99d8363. Avaliar árvore integrada pela equivalência e testes pertinentes da ENT-02.
  - **Entregáveis/evidências:** tabela PR/base/head/merge-SHA, ancestrais/diffs, SHA integrado e justificativa de cobertura/reuso.
  - **Critério de aceite:** somente alterações aprovadas e histórico preservado; nenhuma publicação produtiva antecipada; SHA novo associado às provas pelo escopo equivalente, sem atribuir execução inexistente.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** se o merge dispara produção ou Preview com banco produtivo, o operador resolve o controle antes; não presumir acesso de mantenedor nem ativar auto-merge.
  - **Referências:** [EST-012](#est-012) a [EST-014](#est-014); [guia](integration-guide.md), [CI](../../operations/rc-review-ci-runbook.md).

- [ ] **ENT-05 — Atualização acompanhada**
  - **Objetivo:** apoiar a atualização autorizada da aplicação existente e registrar seu resultado.
  - **Pré-requisitos/dependências:** candidato integrado/revisado, cobertura do recorte aceita e prontidão operacional pertinente confirmada pelos operadores; GO explícito para alvo/SHA/recorte/janela.
  - **Quem executa:** estudantes preparam pacote de entrega, acompanham os operadores e conferem uso autorizado; operadores do projeto executam configuração, backup/restore, migrations, deploy, recuperação e retomada de schedulers.
  - **Quem aprova:** autoridade de dados/banco autoriza mudança de banco, aprovador produtivo decide GO/NO-GO/reabertura e responsável pelo aceite confirma verificações de uso.
  - **Procedimento:** seguir os runbooks no projeto Vercel existente. Operadores confirmam identidades/backup/ensaio/recuperação, aplicam somente migrations reais pendentes antes de servir código incompatível e registram deployment. Estudantes conferem SHA, domínio e smoke autorizado de uso/leitura, sem harnesses ou dados sintéticos em produção.
  - **Entregáveis/evidências:** pacote candidato, registro sanitizado da janela/GO e verificações acompanhadas; se NO-GO, registrar causa/owner e manter atualização aguardando operação, sem responsabilizar estudantes por acesso/custos/dados.
  - **Critério de aceite:** atualização realmente realizada e pós-deploy aceito; NO-GO ou pacote preparado não são deploy concluído. Recorte parcial com Cloudinary desabilitado exige aprovação e mantém homologação016 pendente.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** alvo incerto, backup sem recuperação comprovada, schema incompatível, erro material ou autorização ausente impede a ação produtiva; demais entregas podem continuar.
  - **Referências:** [EST-015](#est-015) a [EST-025](#est-025), [EST-034](#est-034) a [EST-041](#est-041); [produção](production-update-runbook.md), [migrations](migration-runbook.md).

- [ ] **ENT-06 — Registro final**
  - **Objetivo:** entregar relato fiel do trabalho e das responsabilidades que permanecem com o projeto.
  - **Pré-requisitos/dependências:** registros das entregas realizadas e informações sanitizadas dos operadores disponíveis; coletar desde o início, inclusive em NO-GO ou operação ainda pendente.
  - **Quem executa:** estudantes consolidam relatório; operadores fornecem versão/deployment/estado de banco e operação contínua sem expor dados privados.
  - **Quem aprova:** coordenador/responsável pelo projeto aceita o relatório; aceites técnicos/produtivos são citados com sua autoridade original.
  - **Procedimento:** registrar PRs/SHAs, provas reutilizadas/adicionais, decisões/achados, versão/deployment efetivamente publicados ou última versão mantida, limitações e pendências com owner do projeto. Atualizar documentação afetada somente no escopo autorizado e entregar a operação aos responsáveis designados.
  - **Entregáveis/evidências:** relatório compartilhável e índice de provas/aceites; formato sugerido YYYY-MM-DD-relatorio-execucao-estudantes.md, referências privadas opacas para backups/configuração.
  - **Critério de aceite:** situação real e responsabilidades confirmadas, sem gate fictício; relatório aceito não transforma produção pendente em concluída nem transfere manutenção/custos aos estudantes.
  - **Estado inicial:** PENDENTE.
  - **Riscos/bloqueio:** informação administrativa faltante é lacuna atribuída ao operador, sem exportar segredo para preenchê-la; qualificação experimental IHFR preservada.
  - **Referências:** [EST-040](#est-040) a [EST-043](#est-043) e registros das seis entregas.

## Reaproveitamento de evidências e escolha dos testes

**FATO_DOCUMENTADO:** a [prontidão](rc-readiness-20261013.md) registra 15 gates,
70/70 E2E e as correções RC-DRAFT-001/RC-UI-001; o patch original99d8363 já
pertence à RC. O [CI da publicação anterior](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/38470655392)
concluiu SUCCESS no SHA981eb9d8c102fd282229bbb36c3b81a268e0ca24, confirmado por
API nesta revisão. Essas provas são insumos existentes, não tarefas de repetição.

| Situação | Prova que pode ser aproveitada | O que acrescentar |
|---|---|---|
| Apenas documentação ou merge com inputs funcionais/configuração equivalentes | Logs/manifestos e CI anteriores, mantendo SHA/ambiente originais | Conferir diff/inputs e registrar equivalência ao candidato; validar documento/links. Sem bateria completa local adicional por mudança de SHA |
| Correção funcional localizada | Gates anteriores dos trechos não afetados | Reproduzir defeito e executar cenário/regressão das dependências afetadas; re-review |
| Mudança em auth/schema/serviços/lockfile/runners ou conflitos materiais | Apenas provas cuja aplicabilidade foi demonstrada | Definir cobertura proporcional com revisor; ampliar regressão se o impacto atravessar a aplicação ou equivalência não for demonstrável |
| Configuração/provedor/browser ou ambiente diferente | Evidências técnicas/humanas ainda válidas para o mesmo contrato e contexto comprovado | Homologar somente lacunas/configuração/contexto afetados, em alvo isolado autorizado |
| Falha intermitente ou causa desconhecida | Preservar FAIL, reruns e limites registrados | Investigar quando material ao aceite; rerun verde não prova correção da causa nem exige repetir tudo sem justificativa |

Cada linha da matriz de testes identifica cenário, SHA original, candidato atual,
ambiente/fingerprint, configuração relevante, data, resultado, link e justificativa
de reuso ou nova execução. Conferir código, tests/fixtures, scripts, schema/SQL,
dependências e versão/configuração aplicáveis; igualdade de código sozinha não
prova equivalência de ambiente. Preservar falhas anteriores e limitações.
Regressão completa requer justificativa de impacto/cobertura do revisor.

O workflow existente inicia 15 gates a cada push da RC, inclusive documental.
Esse comportamento não é alterado aqui e não obriga os estudantes a duplicar a
mesma bateria local. Conferir a run do novo head separadamente; SUCCESS anterior
não é resultado de execução do novo SHA. R1 é subconjunto, sem somar casos novos.
Em development/main o workflow atual não executa/dispatch não aceita essas refs;
usar cobertura pertinente documentada e equivalência do integrado, ou validação
local focada quando necessária.

Separar **automatizado**, **provedor real** e **aceite humano**. Provas existentes
podem ser reaproveitadas se seu alcance/contexto forem confirmados; permanecem
pendentes o reset/reenvio Gate B012, aceite humano013, browsers e Cloudinary real
sem evidência de fechamento. Teste fake/SMTP accepted não substitui inbox real.
Nova configuração/defeito ou dado incompatível pode exigir novo cenário.

Compartilhar somente evidências redigidas: não publicar códigos de verificação,
links/tokens de reset, senhas, cookies, bearer, connection strings, dotenvs
privados, backups, PII ou URLs assinadas. Operadores guardam detalhes privados e
fornecem ao relatório somente referência opaca e resultado sanitizado.

## Frentes independentes e dependências materiais

| Frente | Pode avançar com | Não precisa esperar |
|---|---|---|
| Review dos PRs/contratos | Código e diff da etapa; parecer final depende de seus achados | Inventário completo dos provedores ou todos os testes das demais frentes |
| Contas/reset/exclusão | Alvo isolado, conta elegível e autorização específica | Aceite de drafts, Cloudinary ou ensaio do banco produtivo |
| Drafts/concorrência/hidratação | Sessão/vínculo/coleta de teste e schema da frente | Teste de exclusão de conta ou Cloudinary |
| Capas/provedor/cleanup | Cloud/preset/alvo/ativos próprios autorizados pelo operador | Teste de drafts ou aceite de contas inteiro |
| Inventário/backup/recuperação | Operadores e destinos autorizados; contexto da mudança real | Integração prévia ou homologação de outra frente |
| Correção/registro de achado | Achado identificado e recorte autorizado | Fim da homologação ou deploy |
| Merge da pilha | PR aprovado, predecessor Git integrado e gatilho seguro | Backup produtivo/Cloudinary, se não houver efeito produtivo |
| Atualização produtiva | Revisão/aceites do recorte e prontidão operacional | Feature expressamente excluída/desativada, com decisão registrada |

A ordem da pilha Git preserva ancestrais; não cria dependência de produto entre
drafts e capas. No uso de um mesmo banco/porta/.next, serializar harnesses que
disputam esses recursos. Não editar schema/auth/config compartilhados em paralelo.
Um bloqueio fica na frente ou ação dependente; não suspende o trabalho seguro
restante. Entregas ENT-01/02/03 interagem, não formam barreira para começar testes.

## Cuidados que continuam obrigatórios para produção

Responsáveis pelo projeto, dados e custos confirmam quem decide/executa, fornecem
o inventário sanitizado e autorizam recursos/alvos. Estudantes não têm de obter
acesso administrativo para produzir suas entregas. Antes da janela, operadores:

- Confirmam projeto Vercel existente, repo/branch/triggers/domínio/deployment,
  banco/role/endpoint reais e configuração por presença, sem revelar valores.
- Inventariam migrations aplicadas/pending/checksum/drift. Há 14 versionadas e
  duas novas na RC; isso não informa quantas faltam no banco hospedado.
- Comprovam backup restaurável, ensaio da cadeia real pendente/compatibilidade,
  recuperação, RPO/RTO e autorização de uso/restauração dos dados; reaproveitam
  provas de ensaio aplicáveis em vez de exigir reprodução por estudante.
- Confirmam SMTP/agendadores/monitoramento, operadores contínuos e orçamento
  aprovado. Cloudinary só é ativado após preset/privacy/cleanup real e owner.
- Registram GO/NO-GO, SHA/recorte/janela/limiares, autorização de banco/deploy e
  reabertura. Aplicam migrations pertinentes antes do código que delas depende.
- Preservam histórico, dados científicos, segredos, ativos alheios/correntes e
  rollback compatível; param por falha material e seguem recuperação aprovada.

Não executar operações destrutivas genéricas, alterações artificiais de histórico
de migrations, seeds/fixtures/harnesses contra produção ou criação de recursos
por suposição. Backup/configuração/PII não entram em GitHub. O aceite produtivo
continua humano; CI ou entrega dos estudantes não concede permissão operacional.
Não usar migrate dev/reset, db push/--accept-data-loss ou baseline artificial no
banco existente; exceções formais de recuperação do histórico exigem efeito
físico comprovado e aprovação do responsável, conforme o runbook de migrations.

A publicação parcial **CLOUDINARY_IMAGE_ENABLED=0** exige decisão explícita do
projeto, fallback aceito, uploads indisponíveis e registro das pendências de016.
Não declara capas homologadas, nem dispensa gates dos fluxos que seguem ativos.
Operação contínua, custos/créditos, dados e incidentes de infraestrutura ficam
com responsáveis do projeto; os estudantes registram/encaminham achados e podem
apoiar durante o período acordado, sem assumir disponibilidade permanente.

IHFR permanece **CONTRATO_EXPERIMENTAL**, **VALIDACAO_CIENTIFICA_PENDENTE**,
**SUJEITO_A_RECALIBRACAO** e **NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO**.
O [ADR-0001](../../governance/ADR-0001-contrato-experimental-ihfr-v0-1.md) governa
esse limite; aprovação de testes/produção não valida ciência.

## Referências técnicas e autoridade

| Assunto | Documento a seguir |
|---|---|
| Instruções e fluxo por feature | [AGENTS.md](../../../AGENTS.md), [PLANS.md](../../../PLANS.md), [constituição](../../../.specify/memory/constitution.md) |
| Produto, classificação e evidência | [PRD Code-First](../../code-first-prd/README.md), [política](../../code-first-prd/governance/source-policy.md), [autoridade](../../governance/SOURCE_AUTHORITY.md) |
| Situação da RC | [Pacote](readme.md), [prontidão atual](rc-readiness-20261013.md), [checklist](review-checklist.md) |
| Git/GitHub | [Guia de integração](integration-guide.md), [runbook CI](../../operations/rc-review-ci-runbook.md), [workflow](../../../.github/workflows/rc-review.yml) |
| Projeto existente/variáveis/deploy | [Atualização de produção](production-update-runbook.md) |
| Banco, backup, restore e recuperação | [Migrations](migration-runbook.md) |
| Contas e recebimento real | [Homologação de contas](../../operations/account-homologation-runbook.md), [mail](../../operations/mail-runbook.md) |
| Rascunhos | [Runbook drafts](../../operations/environmental-drafts-runbook.md), [hidratação](../../../specs/015-environmental-drafts/hydration-evidence.md) |
| Capas | [Runbook Cloudinary](../../operations/area-covers-runbook.md), [recarga](../../../specs/016-area-covers/rc-ui-001-evidence.md) |

As continuações datadas dos runbooks atualizam os registros históricos, sem
apagar falhas anteriores. Código/configuração comprovam implementação; os
runbooks não aprovam ações externas. Não editar `docs/raw/**`.

## Anexo técnico — referências condicionais

As referências EST preservam os cenários e cuidados da versão1.0. Consultá-las
conforme ENT-01–06 e recorte; não exigir execução de todas para uma entrega.
As dependências abaixo são materiais ao cenário; responsáveis operacionais e
aprovações são distintos. Estado PENDENTE registra ausência de fechamento;
consulta/reuso pode alimentar a entrega sem criar uma execução nova fictícia.

### Organização e revisão

#### EST-001

**Designar equipe e calendário**

- **Objetivo:** tornar cada entrega executável por pessoas identificadas.
- **Pré-requisitos/dependências:** Acordo das seis entregas; o responsável pelo projeto designa autoridades/operadores, sem exigir acessos administrativos dos estudantes.
- **Quem executa:** Coordenação dos estudantes organiza; responsável pelo projeto designa operadores e aprovadores.
- **Quem aprova:** Responsável pelo projeto confirma designações/autoridades.
- **Procedimento:** preencher papéis/principal/substituto e calendário das seis entregas; projeto confirma operadores/aprovadores/acessos estritamente necessários. Não exigir a cada estudante todas as funções administrativas.
- **Entregáveis:** tabela preenchida e calendário com dependências.
- **Evidências:** registro da designação/autoridade e confirmação de acesso, sem valores secretos.
- **Critério de aceite:** todas as funções cobertas e independência de revisão definida.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** falta de owner ou de autoridade impede sua operação correspondente.

#### EST-002

**Abrir registro de execução e limites**

- **Objetivo:** acompanhar trabalho e proteger ambientes/dados.
- **Pré-requisitos/dependências:** Referência EST-001 apenas para coordenação e limites; abrir registro desde o início, em paralelo às frentes.
- **Quem executa:** Estudantes coordenadores/testadores registram; projeto define tratamento privado dos dados.
- **Quem aprova:** Coordenação aceita registro; responsável pelos dados autoriza tratamento privado quando necessário.
- **Procedimento:** criar registro no formato acima, atribuir EST a responsáveis, registrar alvos autorizados e limites de leitura/escrita; separar provas locais, reais e humanas.
- **Entregáveis:** índice de evidências/achados e matriz de autorizações.
- **Evidências:** links, responsáveis e aprovação do tratamento privado de dados.
- **Critério de aceite:** acordo de papéis/limites registrado; nenhum teste sintético ou harness aponta à produção.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** evidência com segredos deve ser contida/redigida; destino incerto bloqueia acesso operacional.

#### EST-003

**Atualizar snapshot da pilha e dos checks**

- **Objetivo:** revisar o candidato remoto vigente.
- **Pré-requisitos/dependências:** Candidato/ref de leitura disponível e registro de execução; sem inventário administrativo completo.
- **Quem executa:** Estudantes/revisores consultam leitura disponível; mantenedor fornece dados inacessíveis.
- **Quem aprova:** Revisor/coordenação confirma snapshot e alcance das provas.
- **Procedimento:** fetch em checkout isolado; registrar bases/heads completos de #1–#7, main/development, reviews, threads abertas e runs no SHA; confirmar proteção Vercel e diferenças do novo plano.
- **Entregáveis:** tabela atualizada da pilha e mapa de ancestrais.
- **Evidências:** URLs dos PRs, SHA completo, check-runs/conclusão e UTC da consulta.
- **Critério de aceite:** snapshot atual, sem confundir checks antigos, status vazio ou mergeability com aprovação.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** mudança de head invalida parecer ainda não confrontado com o novo diff.

#### EST-004

**Revisar reconciliação e runners (#1/#2)**

- **Objetivo:** validar base documental, proteção Git e segurança dos runners014.
- **Pré-requisitos/dependências:** Snapshot/diff de #1/#2 (EST-003); revisão independente das outras frentes.
- **Quem executa:** Estudantes revisores da etapa; operador de banco fornece apoio técnico autorizado.
- **Quem aprova:** Revisor independente designado conforme política do PR.
- **Procedimento:** abrir #1/#2; conferir decisões e diff, guards de loopback/ownership/ACL, runner dedicado de exclusão e tratamento de bytes LF/CRLF; comparar SQL antigo pelos blobs, conforme guia/checklist.
- **Entregáveis:** parecer individual por PR e achados vinculados.
- **Evidências:** linhas/diffs e comandos de conferência redigidos.
- **Critério de aceite:** nenhuma tolerância do harness014 usada para mascarar SQL alterado ou corrigir histórico remoto.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** guard enfraquecido ou migration histórica alterada impede aceite técnico.

#### EST-005

**Revisar drafts e RC-DRAFT-001 (#3)**

- **Objetivo:** confirmar integridade pessoal, semântica dos campos e primeira gravação.
- **Pré-requisitos/dependências:** Snapshot/diff de #3 (EST-003), spec015 e contratos; não exige concluir EST-004.
- **Quem executa:** Estudantes revisores/testadores de drafts.
- **Quem aprova:** Revisor independente designado conforme política do PR.
- **Procedimento:** seguir spec015/runbook/hydration-evidence; revisar autorização contextual, OCC/idempotência, isolamento, rollback/consumo transacional e hidratação lenta antes do primeiro PUT; distinguir false/0/vazio/ausência.
- **Entregáveis:** parecer #3 e rastreio dos cenários relevantes.
- **Evidências:** RED/GREEN existentes confrontados com código atual, payloads sintéticos e diff.
- **Critério de aceite:** rascunho não alimenta IHFR confirmado e falha/conflito não perde edição nem consome draft alheio.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** perda da primeira seleção ou alteração científica exige correção planejada antes de integrar.

#### EST-006

**Revisar capas e RC-UI-001 (#4)**

- **Objetivo:** avaliar privacidade, recuperação e integridade das referências.
- **Pré-requisitos/dependências:** Snapshot/diff de #4 (EST-003), spec016 e contratos; não depende de aceite de drafts EST-005.
- **Quem executa:** Estudantes revisores/testadores; operador Cloudinary fornece contexto sanitizado.
- **Quem aprova:** Revisor independente designado, incluindo re-review de #4.
- **Procedimento:** seguir spec016/runbook/rc-ui-001-evidence; revisar preset/hash, decoder/EXIF, proxy reautorizado, leases/CAS e cleanup por asset_id; conferir GET503→200 na mesma revision1 e nova falha recuperável.
- **Entregáveis:** parecer #4 e resposta técnica à thread aberta.
- **Evidências:** novo GET/naturalWidth>0 e revisão persistida intacta; linhas de autorização/ownership.
- **Critério de aceite:** revisão funcional independente concluída, sem declarar Cloudinary real homologado pelo fake.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** CHANGES_REQUESTED persiste até novo parecer; asset alheio/atual elegível para delete impede aceite técnico.

#### EST-007

**Revisar auditoria, pacote e revisão independente (#5/#6/#7)**

- **Objetivo:** aceitar documentação/evidências sem apagar falhas históricas.
- **Pré-requisitos/dependências:** Snapshots/diffs de #5/#6/#7 (EST-003); revisar suas evidências sem esperar todos os outros pareceres.
- **Quem executa:** Estudantes revisores/Git organizam evidências das três etapas.
- **Quem aprova:** Revisor independente de cada PR; #6 exige re-review e #7 preserva revisão própria.
- **Procedimento:** revisar cada diff e registro datado nos três PRs; confrontar prontidão com comentários históricos; conferir patch99d8363 já ancestral da RC e diff restante #7 documental; preservar sua revisão independente.
- **Entregáveis:** três pareceres, lista de erratas/ressalvas e ações de re-review.
- **Evidências:** links dos relatos originais, correções posteriores, runs e comparação Git.
- **Critério de aceite:** nenhum FAIL reclassificado retroativamente e nenhuma dependência aplicada duas vezes.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** CHANGES_REQUESTED em #6 ou falta de parecer #7 impede aceite técnico.

#### EST-008

**Revisar segurança, concorrência e migrations em conjunto**

- **Objetivo:** detectar riscos que atravessam a pilha.
- **Pré-requisitos/dependências:** Diff/contratos/SQL da frente afetada; reunir pareceres de EST-004–007 quando pertinentes, sem série obrigatória.
- **Quem executa:** Estudantes revisores analisam; operador/revisor SQL apoia assuntos de banco.
- **Quem aprova:** Revisor independente; responsável pelo assunto decide divergências de domínio/dados.
- **Procedimento:** usar seções de segurança do checklist; verificar conta/vínculo/lab atuais, OWNER/ADMIN/MEMBER, CSRF/origin, DTOs/cache, idempotência e revogação durante I/O; ler as duas migrations aditivas e FKs/locks/rollback.
- **Entregáveis:** matriz de autorização/concorrência e parecer SQL.
- **Evidências:** testes negativos existentes, constraints e invariantes transacionais apontados por linha.
- **Critério de aceite:** integridade dos dados e ausência de acesso cruzado demonstradas no recorte; 12 SQL antigos intactos.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** exposição, bypass ou perda de dados bloqueia aceite técnico até correção.

#### EST-009

**Conferir regressão e investigar intermitências**

- **Objetivo:** avaliar CI/local e as falhas de contas, IHFR e conexões.
- **Pré-requisitos/dependências:** Candidato e evidências existentes/achados da frente; cobertura escolhida pelo impacto na ENT-02.
- **Quem executa:** Estudantes/testadores analisam provas e executam cenários adicionais autorizados quando necessários.
- **Quem aprova:** Revisor técnico aceita cobertura, reuso e tratamento da intermitência.
- **Procedimento:** seguir runbook CI e follow-up: ler resultados/reruns de contas no #5, locator/DOM de IHFR no #7 e ECONNRESET histórico. Selecionar reprodução adicional se necessária ao parecer; preservar asserts/guards/timeouts e FAIL, sem executar15 gates por padrão.
- **Entregáveis:** matriz de provas aplicáveis por SHA/ambiente, intermitências e cobertura adicional justificada.
- **Evidências:** run/attempt, UTC, logs redigidos, resultado original e rerun separado; arquivos de follow-up no PR #7.
- **Critério de aceite:** evidências relevantes aceitas, causa inconclusiva explicitada; cobertura proporcional e monitoramento aceitos pelo revisor.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** falha recorrente sem avaliação impede aceite técnico; repetição verde não prova causa histórica.

#### EST-010

**Avaliar dependências e risco residual**

- **Objetivo:** decidir tratamento dos cinco achados high na cadeia de desenvolvimento.
- **Pré-requisitos/dependências:** Lockfile/audits existentes e contexto de uso; consulta adicional se mudança/alerta material justificar.
- **Quem executa:** Estudantes/revisores analisam dependências; autoridade do projeto decide risco residual.
- **Quem aprova:** Autoridade do projeto designada para aceitação de risco; revisor técnico aceita a correção.
- **Procedimento:** reaproveitar audits versionados do lockfile; avaliar cadeia/uso em build/CI e exposição. Consultar audit atualizado quando lockfile/alerta relevante mudar; remediação focal ou aceite por autoridade com prazo, sem npm audit fix --force.
- **Entregáveis:** análise de exposição e decisão registrada por autoridade, com owner/prazo.
- **Evidências:** audit redigido, SHA/lockfile e justificativa; baseline reporta dev5 high/prod0, não promessa permanente.
- **Critério de aceite:** risco residual tratado/aceito explicitamente; nova vulnerabilidade de runtime avaliada antes de aceite técnico.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** risco material não aceito bloqueia integração; correção funcional segue Spec Kit.

#### EST-011

**Encerrar revisão humana e registrar aceite técnico**

- **Objetivo:** liberar integração somente do candidato revisado.
- **Pré-requisitos/dependências:** Pareceres e achados aplicáveis ao PR/candidato; demais frentes não bloqueiam início da revisão.
- **Quem executa:** Revisores independentes registram parecer; estudantes coordenam achados/solicitações.
- **Quem aprova:** Revisores independentes dos PRs; mantenedor aplica política de integração.
- **Procedimento:** registrar achados no PR/issue com ID, SHA, arquivo/linha, severidade, passos, esperado/obtido e aceite; correções exigem spec/plan/tasks antes do código, novo diff e re-review. Solicitar aos revisores #4/#6 novo parecer e resolução explícita da thread quando aceito.
- **Entregáveis:** parecer por cada um dos sete PRs e registro aceite técnico.
- **Evidências:** reviews APPROVED no head aplicável ou aceite formal equivalente conforme política dos mantenedores, sem CHANGES_REQUESTED pendente; decisões de risco e links dos achados.
- **Critério de aceite:** aceite técnico assinado após revisões independentes; nenhum achado bloqueante aberto, sem auto-merge e sem aprovar pelo autor.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** CI verde, mergeable=true e thread outdated não substituem revisores.

### Integração e equivalência

#### EST-012

**Preparar integração, gatilhos e sincronização de #7**

- **Objetivo:** impedir publicação acidental e congelar heads revisados.
- **Pré-requisitos/dependências:** Heads pertinentes aprovados e controle de gatilhos confirmado pelo mantenedor/operador antes do merge.
- **Quem executa:** Estudantes preparam e conferem; mantenedor sincroniza refs com permissão de escrita; operador Vercel confirma gatilhos.
- **Quem aprova:** Mantenedor autoriza sincronização; operador Vercel confirma segurança dos gatilhos.
- **Procedimento:** reconferir repo conectado, branches que disparam deploy e isolamento de development/Preview antes de qualquer merge; usar guia de integração. Sincronizar o avanço documental da RC em #7 por merge commit da base no head protegido, conferir diff e novos checks/re-review.
- **Entregáveis:** autorização da integração, mapa mínimo de triggers e SHA final de cada PR.
- **Evidências:** config/consulta sem secrets, comparação antes/depois #7 e ancestry de 99d8363 original.
- **Critério de aceite:** integração não aciona atualização produtiva nem Preview com dados produtivos; #7 preserva apenas sua etapa adicional e todos os SHAs.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** se development aciona deploy inseguro, parar e obter controle explícito do gatilho antes do merge; branch nova precisa bloquear deployment antes do push.

#### EST-013

**Integrar os sete PRs com merge commits**

- **Objetivo:** preservar histórico e incorporar apenas diffs aprovados.
- **Pré-requisitos/dependências:** EST-012 e aprovação do PR da etapa; predecessor Git já integrado antes de retargetar o próximo.
- **Quem executa:** Mantenedor autorizado executa merges; estudantes acompanham/conferem ou recebem delegação expressa de escrita.
- **Quem aprova:** Mantenedor/revisor independente confirma cada head/diff aprovado.
- **Procedimento:** executar sequência do guia: #1 em development; confirmar merge, mudar base de #2 para development, conferir Files changed/commits/ancestry e integrar; repetir até #7. Em conflito, preservar evidências e revisar resolução; não usar squash/rebase/cherry-pick/force nem ours/theirs global.
- **Entregáveis:** tabela PR/base/head/merge-SHA e HEAD integrado de development.
- **Evidências:** URLs de merge e diffs após cada retarget; 11 commits originais e 99d8363 encontrados como ancestrais.
- **Critério de aceite:** só merges aprovados, nenhuma duplicação de patch e main preservada até a janela autorizada.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** política do destino exigir squash, diff cumulativo inesperado ou alteração não revisada exige decisão/revisão antes de prosseguir.

#### EST-014

**Avaliar evidências e cobertura do SHA integrado**

- **Objetivo:** avaliar cobertura do integrado e demonstrar a aplicabilidade das evidências.
- **Pré-requisitos/dependências:** SHA integrado disponível (EST-013), provas anteriores e diff/inputs relevantes para avaliar equivalência.
- **Quem executa:** Estudantes/testadores demonstram equivalência e executam cobertura selecionada; mantenedor fornece evidências quando acesso indisponível.
- **Quem aprova:** Revisor técnico do integrado aceita equivalência e cobertura.
- **Procedimento:** checkout isolado no SHA integrado; comparar Git/manifesto de código, testes, scripts, schema/SQL, lockfile/configuração com provas existentes. Se apenas merges/docs equivalentes, registrar reuso sem bateria local extra. Para lacunas/impacto, selecionar gates focais com Node24.19.0, npm ci/Prisma/Chromium e cluster próprio quando necessário; serializar harnesses. Não usar -InitializeCiCluster fora de Actions.
- **Entregáveis:** SHA integrado, comparação de inputs, matriz de provas aproveitadas e testes adicionais justificados.
- **Evidências:** SHAs originais e integrado, diff/manifesto, ambiente/configuração relevantes e logs dos cenários realmente executados; se houver harness, registrar teardown/estado do cluster.
- **Critério de aceite:** equivalência/cobertura pertinente aceitas pelo revisor. Workflow atual não dispara/aceita dispatch em development/main; não atribuir SUCCESS antigo ao novo SHA. Quinze gates locais somente se impacto/lacuna justificar; R1 não duplica contagem.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** falha interrompe gates seguintes; adaptação de CI exige entrega revisada, não renomear branch/push de validação para contornar guards.

### Inventários dos operadores do projeto

#### EST-015

**Confirmar Vercel, Git, domínio e versão publicada**

- **Objetivo:** identificar exatamente a aplicação em funcionamento.
- **Pré-requisitos/dependências:** Acesso de leitura autorizado ao operador Vercel ou inventário sanitizado por ele fornecido; não depende de integração prévia.
- **Quem executa:** Operador Vercel do projeto confirma inventário; estudantes recebem resumo sanitizado.
- **Quem aprova:** Operador Vercel confirma inventário; responsável pelo projeto confirma destino de atualização.
- **Procedimento:** conferir equipe/projeto, Settings→Git, repo, branch produtiva, root, Node/build/install, targets, hooks/integradores, domínio/alias e deployment atendendo tráfego; registrar versão/SHA anterior e proteção das branches de revisão.
- **Entregáveis:** mapa do projeto existente e de triggers/promotions/recuperação.
- **Evidências:** painel/API redigido e deployment/SHA/UTC, conferidos por segundo operador.
- **Critério de aceite:** repo/branch/domínio/deployment reconciliados; homologação de contas não confundida com produção pelo nome do target.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** divergência entre domínio e projeto ou vínculo Git não confirmado impede promoção.

#### EST-016

**Confirmar Neon/PostgreSQL e recuperação existente**

- **Objetivo:** identificar o banco efetivamente usado pela aplicação.
- **Pré-requisitos/dependências:** Operador de banco autorizado e vínculo aplicação→banco confirmado; inventário pode avançar em paralelo a EST-015.
- **Quem executa:** Operador de banco do projeto confirma identidades/recuperação; estudantes registram resumo, sem acesso administrativo presumido.
- **Quem aprova:** Operador de banco e autoridade de dados confirmam destino/privilégios/recuperação.
- **Procedimento:** inventariar organização/projeto/branch/database/role/schema/endpoint direto e pooler, região/versão/extensões/privilégios, limites do plano, backups/PITR/retention e monitoramento existente; confirmar vínculo sem revelar URLs ou senhas.
- **Entregáveis:** inventário privado de identidades e resumo público com fingerprint/referência opaca.
- **Evidências:** painel/API e leitura de identidade do banco; conferência por dois operadores.
- **Critério de aceite:** destino produtivo distinto do isolado e método real de recuperação confirmado, sem presumir recursos/gratuidade.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** identidade incerta, role inadequada ou retenção desconhecida impede backup/migration.

#### EST-017

**Inventariar variáveis e credenciais por ambiente**

- **Objetivo:** preparar comparação segura da configuração atual com a RC.
- **Pré-requisitos/dependências:** Operadores dos ambientes/grupos de configuração disponíveis; cada grupo pode ser conferido independentemente.
- **Quem executa:** Operadores responsáveis conferem secret store/configuração; estudantes acompanham somente nomes/presença e compatibilidade sanitizada.
- **Quem aprova:** Operadores confirmam grupos; aprovador do projeto autoriza qualquer mudança futura.
- **Procedimento:** comparar apenas nomes/presença/escopo/finalidade/versão no secret store com tabela do runbook produtivo e exemplos; preservar JWT, keyrings/provas/cifra antigos e APP_PUBLIC_URL por ambiente. Confirmar ACCOUNT_TRUSTED_INGRESS e ausência de env dos harnesses na produção.
- **Entregáveis:** matriz de presença/compatibilidade e mudanças futuras propostas com owner/aprovação.
- **Evidências:** checklist redigido, sem exportação de valores; lista de diferenças por target.
- **Critério de aceite:** nenhum segredo público/NEXT_PUBLIC e nenhum valor de homologação copiado automaticamente para produção.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** chave antiga perdida pode impedir decifra/consumo; não rotacionar por suposição nem registrar valores no Git.

#### EST-018

**Inventariar SMTP, fila e todos os agendadores**

- **Objetivo:** esclarecer como mensagens e jobs rodam continuamente hoje.
- **Pré-requisitos/dependências:** Alvo/mailbox/scheduler autorizado ao operador; não depende de inventariar Cloudinary ou todas as variáveis.
- **Quem executa:** Operador SMTP/agendamento do projeto inventaria; estudantes registram resultados sanitizados.
- **Quem aprova:** Responsável pelo projeto designa operação mail; operador SMTP confirma serviço; orçamento com autoridade financeira.
- **Procedimento:** usar runbooks contas/mail; identificar caixa/remetente autorizado, método Gmail SMTP/senha de app, elegibilidade e TLS sem coletar valores; mapear scheduler, URL/target, header via secret store, frequência/timeout, owner, últimas execuções, fila/alertas e outros jobs existentes. Designar PD-CRI-004.
- **Entregáveis:** inventário de schedulers e plano de operação mail aprovado pela equipe.
- **Evidências:** horários/status/contagens redigidos; histórico60s da homologação identificado como histórico, sem atestar produção.
- **Critério de aceite:** destino/cadência dentro da validade das provas e plano/custo real conhecidos; execução automática será comprovada na EST-028.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** terminal aberto/setInterval ou envio manual não substitui scheduler; SMTP aceito não prova recebimento.

#### EST-019

**Inventariar Cloudinary, custos e observabilidade do recorte**

- **Objetivo:** identificar recursos existentes e sua viabilidade operacional.
- **Pré-requisitos/dependências:** Operador/cloud e acesso de leitura autorizados, se capas no recorte; custos decididos pelo responsável financeiro.
- **Quem executa:** Operador Cloudinary/monitoramento do projeto inventaria; autoridade financeira decide orçamento, sem atribuí-lo aos estudantes.
- **Quem aprova:** Responsável pelo projeto/operador confirma recorte; autoridade financeira aprova custos.
- **Procedimento:** operador consulta cloud/conta/preset, plano/limites/créditos/ativos/jobs e observabilidade existente; informa resumo sanitizado. Responsável financeiro decide orçamento; confirmação limita-se a serviços do recorte, com lacunas explícitas se capas excluídas.
- **Entregáveis:** inventário Cloudinary/observabilidade pertinente e decisão financeira quando necessária.
- **Evidências:** consultas somente leitura redigidas e aceites dos owners, sem API secret nem URLs delivery.
- **Critério de aceite:** operadores confirmam recursos de seu serviço; falta de Cloudinary impede ativação, mas pode fundamentar decisão parcial na EST-034/035 sem bloquear as outras frentes.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** não contratar, criar preset/projeto, ativar cobrança ou excluir ativos como parte do inventário.

### Banco, backup e recuperação

EVIDENCIA_IMPLEMENTACAO no corte reconciliado: 14 migrations versionadas, com
12 SQL históricos preservados e duas novidades aditivas:
[20261010000100_environmental_drafts](../../../prisma/migrations/20261010000100_environmental_drafts/migration.sql)
e [20261010000200_area_covers](../../../prisma/migrations/20261010000200_area_covers/migration.sql).
Não concluir quantas estão pendentes no banco real por essa contagem. As FKs,
constraints/índices e compatibilidade com dados novos são conferidos no
[runbook de migrations](migration-runbook.md); histórico remoto não é corrigido
pela tolerância LF/CRLF do harness014.

#### EST-020

**Inventariar migrations aplicadas, pendências e drift**

- **Objetivo:** determinar a mudança real necessária no banco hospedado.
- **Pré-requisitos/dependências:** Alvo de banco confirmado na EST-016 e autorização de leitura; não depende de inventário Cloudinary.
- **Quem executa:** Operador de banco autorizado faz leitura/inventário; revisor SQL confere e estudantes recebem resultado sanitizado.
- **Quem aprova:** Revisor SQL/operador valida inventário; autoridade de dados decide divergências materiais.
- **Procedimento:** executar preflight somente leitura do runbook: _prisma_migrations, checksums/failed/rolled-back, migrate status, catálogo/índices/FKs/enums e contagens agregadas; comparar SQL Git/bytes efetivos LF/CRLF. Identificar colisões de email se houver migrations anteriores pendentes, sem listar PII.
- **Entregáveis:** tabela applied/pending/failed/extra e relatório de divergências de schema/checksum.
- **Evidências:** SHA/candidato/UTC/fingerprint e consultas/status redigidos com exit codes interpretados.
- **Critério de aceite:** pending exatas conhecidas e todo SQL extra revisado; nenhum drift ou checksum divergente sem tratamento aprovado.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** histórico ausente/failed, objetos inesperados ou colisões exigem análise/decisão; não resolver alterando dados/histórico para fechar gate.

#### EST-021

**Gerar backup autorizado e preservar recuperação**

- **Objetivo:** obter cópia verificável anterior à atualização.
- **Pré-requisitos/dependências:** Inventário do banco EST-020, autorização de dados/backup e destino privado aprovado.
- **Quem executa:** Operador de banco autorizado gera/preserva backup; estudantes não custodiam dump ou chaves por padrão.
- **Quem aprova:** Responsável pelos dados autoriza backup/local de guarda.
- **Procedimento:** seguir backup do runbook com ferramenta compatível, incluindo histórico/tabelas/constraints; conferir backup/PITR efetivo e armazenar com ACL/cifra/retention fora de Git/sync público. Preservar configuração, chaves necessárias e referências de ativos privadamente.
- **Entregáveis:** backup identificável e inventário de recuperação/retention.
- **Evidências:** exit code, hash/listagem, horário e referência privada; dump não inclui mídia Cloudinary ou secret store.
- **Critério de aceite:** artefato íntegro e recuperável para o ensaio; aprovação definitiva só após restore.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** dump contém PII/ciphertext; falha/inventário incompleto impede EST-022.

#### EST-022

**Restaurar backup em destino isolado autorizado**

- **Objetivo:** provar restauração antes de confiar no backup.
- **Pré-requisitos/dependências:** Backup da EST-021 ou backup vigente equivalente; alvo isolado vazio autorizado e endpoint conferido.
- **Quem executa:** Operador de banco autorizado restaura; estudantes apoiam comparação somente com dados sanitizados/autorizados.
- **Quem aprova:** Responsável pelos dados autoriza restore; operador confirma integridade.
- **Procedimento:** reaproveitar prova de restore se backup/método/destino e cadeia/contexto ainda aplicáveis e confirmados pelo operador; caso contrário restaurar conforme runbook em alvo isolado, sem --clean no banco existente. Conferir histórico/contagens/ACL e desligar serviços produtivos; dados reais ficam privados.
- **Entregáveis:** relatório de restore com duração e comparação.
- **Evidências:** identidade/fingerprint do destino, exit codes, catálogo/contagens e permissões, sem payload/PII.
- **Critério de aceite:** restore real PASS e dados/estrutura conferidos; hash/listagem sozinhos não fecham tarefa.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** identidade ambígua, restore parcial ou provedor produtivo acessível bloqueia ensaio.

#### EST-023

**Ensaiar pendências e compatibilidade antiga/nova**

- **Objetivo:** prever locks, duração e riscos da atualização/retorno.
- **Pré-requisitos/dependências:** Cadeia real pendente EST-020 e restore comprovado EST-022; reutilizar ensaio aplicável se cadeia/contexto mantidos.
- **Quem executa:** Operadores de banco/aplicação ensaiam; estudantes/testadores apoiam cenários isolados autorizados.
- **Quem aprova:** Operador/revisor SQL aceita ensaio; revisor técnico aceita compatibilidade da aplicação.
- **Procedimento:** avaliar aplicabilidade do ensaio existente à cadeia real pending e ambiente; ensaiar diferenças/lacunas no clone autorizado. Medir locks/duração e conferir constraints/contagens/histórico; exercitar artefato antigo/novo, inclusive com drafts/capas, sem serviços produtivos.
- **Entregáveis:** ensaio de migration e matriz de compatibilidade/limitações.
- **Evidências:** logs redigidos, antes/depois agregado, SHA antigo/novo, tempos e casos de retorno.
- **Critério de aceite:** provas de ensaio da cadeia real e compatibilidade aceitas pelo operador/revisor; FK RESTRICT pode impedir exclusão pelo código antigo, sem rollback universal.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** migrations sem transação explícita podem deixar DDL parcial; não assumir atomicidade nem remover tabela como rollback.

#### EST-024

**Ensaiar recuperação e aprovar RPO/RTO**

- **Objetivo:** definir retorno seguro para falha de migration/aplicação.
- **Pré-requisitos/dependências:** Evidências pertinentes de compatibilidade/recuperação da EST-023 e autorização de dados; reutilizar provas aplicáveis.
- **Quem executa:** Operadores de banco/Vercel ensaiam; autoridades do projeto/dados decidem perda tolerável e recuperação.
- **Quem aprova:** Autoridades do projeto/dados aprovam RPO/RTO e recuperação.
- **Procedimento:** seguir recuperação dos dois runbooks; ensaiar contenção, rollback compatível e alternativa roll-forward; definir RPO/RTO com owner, considerar dados após backup e efeitos SMTP/Cloudinary irreversíveis pelo restore SQL; registrar quem decide e para quando.
- **Entregáveis:** plano de recuperação, contatos, limiares e tempos ensaiados.
- **Evidências:** ensaio isolado, deployment anterior recuperável e aceite de RPO/RTO.
- **Critério de aceite:** recuperação compatível com política de contas, schema/jobs e dados novos; restore destrutivo não é procedimento genérico autorizado.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** versão antiga que restaura bypass de verificação/revogação é proibida; incompatibilidade sem alternativa impede janela.

#### EST-025

**Consolidar a prontidão de banco para a janela**

- **Objetivo:** entregar plano de janela executável ao aprovador.
- **Pré-requisitos/dependências:** Prontidão de banco do recorte, com evidências aplicáveis EST-020–024; apenas pré-requisito da mudança produtiva correspondente.
- **Quem executa:** Operadores de banco/Vercel consolidam prontidão; estudantes anexam resumo à entrega.
- **Quem aprova:** Aprovadores de banco/produção aceitam prontidão pertinente.
- **Procedimento:** registrar sequência backup final→migrations→verificação→deploy→smoke→reabertura; definir janela, operadores/substitutos, congelamento de escrita/workers, comunicação, duração máxima de locks e critérios de parada/recuperação.
- **Entregáveis:** registro da prontidão de banco e proposta de janela, sem executar produção.
- **Evidências:** restore/ensaio aceitos, pending exatas, compatibilidade e recuperação revisadas.
- **Critério de aceite:** prontidão de banco assinada pelos responsáveis; qualquer limite numérico de parada definido pela equipe antes da janela.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** falta de backup restaurado, owner ou critério de parada impede GO.

### Cenários independentes de homologação

#### EST-026

**Preparar o candidato isolado para aceite**

- **Objetivo:** disponibilizar candidato definido para cada cenário isolado autorizado.
- **Pré-requisitos/dependências:** Candidato definido (RC ou integrado), alvo/configuração isolados e dados/participantes autorizados; não exige backup produtivo ou integração prévia.
- **Quem executa:** Operadores de homologação disponibilizam candidato/alvo/configuração; estudantes definem cenários e conferem contexto de uso.
- **Quem aprova:** Responsável pela homologação autoriza alvo/candidato; responsável pelos dados autoriza dados utilizados.
- **Procedimento:** operadores confirmam projeto de homologação existente, banco próprio, origem/configuração e dados de teste. Reutilizar deployment candidato compatível; atualizar SHA/configuração somente quando necessário e aprovado. Estudantes registram cenário e isolamento; integração final e ensaio produtivo não condicionam iniciar testes de uso.
- **Entregáveis:** candidato/deployment isolado, matriz de cenários e autorização dos participantes/caixas.
- **Evidências:** SHA/fingerprint/URL não secreta, configuração por presença e gate de entrada assinado.
- **Critério de aceite:** alvo/candidato conferidos por segundo operador; nenhuma conta real/dado produtivo usado como descartável.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** aprovação antiga da homologação não autoriza mudanças atuais; reprodução local fake não substitui o candidato real autorizado.

#### EST-027

**Homologar cadastro, verificação, login e logout**

- **Objetivo:** comprovar jornada de conta com recebimento efetivo.
- **Pré-requisitos/dependências:** EST-026 para este cenário, caixa/conta sintética e SMTP/scheduler autorizados; reaproveitar parte já comprovada.
- **Quem executa:** Estudantes/testador humano autorizado usam a aplicação; operador SMTP cuida do serviço/configuração.
- **Quem aprova:** Responsável pelo aceite funcional registra resultado humano.
- **Procedimento:** seguir contas/mail: visitante cadastra conta sintética autorizada, observa chegada real do código na caixa, verifica, acessa o que sua sessão permite, faz logout/login; confirmar restrição pré-verificação e recusa de estados indevidos.
- **Entregáveis:** matriz da jornada com registro humano de recebimento e uso.
- **Evidências:** timestamps/estados redigidos e confirmação do testador, sem código/senha/screenshot de inbox com PII.
- **Critério de aceite:** cadastro→recebimento→verificação→login/logout comprovados no candidato, separando aceitação SMTP e observação humana.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** prova extraída do banco ou envio manual não substitui entrega automática.

#### EST-028

**Homologar reenvio, reset e revogação; fechar Gate B012**

- **Objetivo:** concluir T025/T028 e validar operação mail contínua.
- **Pré-requisitos/dependências:** EST-026, conta elegível/sessão A e contexto B autorizados, SMTP/scheduler pronto; não exige repetir EST-027 integralmente.
- **Quem executa:** Estudantes/testadores fazem jornada autorizada; operador SMTP/agendamento comprova execução automática/configuração.
- **Quem aprova:** Responsável pelo aceite funcional fecha Gate B012 somente com evidência pertinente; operador confirma scheduler.
- **Procedimento:** após cooldown, reenviar e demonstrar código anterior recusado/novo aceito. Manter sessão A; solicitar reset em B/outro contexto, receber link real, consumir uma vez, trocar senha, negar sessão A/senha antiga e aceitar nova; observar aviso. Demonstrar duas invocações automáticas distintas e recuperação de backlog/interrupção no alvo isolado, considerando timeout30s versus runtime60s.
- **Entregáveis:** aceite explícito Gate B012/T025/T028 e registro de operação do scheduler.
- **Evidências:** confirmação humana de recebimento/jornada, HTTP/estados/horários redigidos, histórico automático e duração/backlog, sem link/token.
- **Critério de aceite:** invalidação, consumo único e revogação observados; atraso/cadência/retry dentro da validade e PD-CRI-004 com owner.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** relato histórico de recuperação divergiu dos logs; usar evidência pertinente confirmada para fechar a lacuna. Timeout do scheduler não prova ausência de aceitação SMTP.

#### EST-029

**Homologar exclusão de conta sintética autorizada**

- **Objetivo:** obter o aceite humano013 sem atingir contas reais ou ciência.
- **Pré-requisitos/dependências:** EST-026, conta sintética elegível e autorização de remoção; independente do teste de reset EST-028.
- **Quem executa:** Estudantes/testador humano usam apenas conta sintética cuja remoção foi autorizada; operador fornece observação sanitizada de efeitos.
- **Quem aprova:** Responsável pelo aceite funcional registra013; remoção sintética tem autorização específica.
- **Procedimento:** seguir checklist/spec013: cancelar, fornecer senha incorreta, verificar blockers com dados próprios isolados, concluir somente exclusão permitida com senha correta e testar revogação. Conferir drafts pessoais removidos, drafts alheios/dados científicos/capas de área preservados.
- **Entregáveis:** aceite humano013 e inventário redigido dos efeitos.
- **Evidências:** passos/status/contagens e confirmação humana, confrontados com testes automatizados dedicados.
- **Critério de aceite:** blockers/cancelamento/revogação/limpeza pessoal corretos e nenhuma exclusão de conta real.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** automatizado3/3 não fecha aceite; não apagar dependências científicas para tornar conta removível.

#### EST-030

**Homologar rascunhos, conflitos e conexão lenta**

- **Objetivo:** validar edição parcial e recuperação nos browsers alvo.
- **Pré-requisitos/dependências:** EST-026, sessão/vínculo e coleta confirmada de teste; não depende do aceite de exclusão EST-029.
- **Quem executa:** Estudantes/testadores de drafts em uso/harness isolado autorizado.
- **Quem aprova:** Responsável pelo aceite funcional/revisor técnico aceita resultados e limites de browsers.
- **Procedimento:** seguir runbook015/hydration-evidence: salvar parcial com false,0,texto em edição,vazio explícito,campo omitido e ausência; recuperar após reload; editar em duas abas, rejeitar conflito sem perder local; interromper/repetir request com mesma key; atrasar scripts e conferir primeiro PUT/GET/reload; cancelar/confirmar descarte e confirmar medições, inclusive rollback.
- **Entregáveis:** matriz dos cenários por browser/dispositivo e limites do aviso de saída.
- **Evidências:** payloads sintéticos redigidos, revisões/status, primeiro save e retomada; aceite humano de uso/teclado/mobile.
- **Critério de aceite:** edição/persistência corretas, consumo apenas do próprio draft e dados confirmados intactos; sem promessa de beforeunload universal.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** perda de edição ou semântica false/0/ausência bloqueia aceite funcional do recorte; não afrouxar parser científico nem aumentar timeout como correção presumida.

#### EST-031

**Homologar Cloudinary real, privacidade e recuperação**

- **Objetivo:** validar a capa final com o provedor real antes de ativá-la.
- **Pré-requisitos/dependências:** EST-026, cloud/preset/credenciais e smoke isolado autorizados para capas; independente de EST-030.
- **Quem executa:** Estudantes/testadores exercitam upload/uso isolados autorizados; operador Cloudinary configura/inspeciona privilégios e provedor.
- **Quem aprova:** Responsável pelo aceite/projeto aceita privacidade e uso; operador confirma configuração do provedor.
- **Procedimento:** seguir runbook016: configuração server-side segura, preset assinado versionado/revisado/frozen e hash; upload sintético próprio, staging/final authenticated, final sem EXIF/ICC/XMP/IPTC, delivery público recusado, proxy/headers; OWNER/ADMIN/MEMBER/externo e revogação; substituição, erro preservando antiga, perda de resposta/replay e remoção autorizada.
- **Entregáveis:** relatório do smoke real, configuração por presença e aceite de permissões/privacidade.
- **Evidências:** metadados sanitizados da imagem final, resultados negativos de leitura/escrita, revisões e custos/créditos, sem credenciais/URLs assinadas.
- **Critério de aceite:** provedor real e aceites humanos comprovados; EXIF apenas no staging privado não deve ser confundido com imagem final entregue.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** cloud/preset/segredo incerto, leitura pública ou operação sem autorização impede habilitar; rollout parcial conserva tarefa PENDENTE fora do recorte aprovado.

#### EST-032

**Homologar cleanup próprio e operação de capas**

- **Objetivo:** comprovar limpeza restrita, recuperação tardia e sustentabilidade.
- **Pré-requisitos/dependências:** Cloud/alvo/ativos próprios comprovados e autorização específica de cleanup; EST-031 quando seus uploads fornecerem o ativo do cenário.
- **Quem executa:** Operador Cloudinary/limpeza do projeto executa CLI/jobs/delete autorizados; estudantes acompanham provas redigidas.
- **Quem aprova:** Responsável pelo projeto confirma PD-CRI-010; operador aceita prova de ownership; autoridade financeira aceita orçamento.
- **Procedimento:** seguir cleanup016: começar dry-run, revisar identities/leases/refs, executar somente por asset_ids próprios comprovados; testar imagem/raw, uploads tardios e RECONCILE/BLOCKED; provar preservação do ativo corrente/alheio. Definir operador/substituto/scheduler/cadência, orçamento/limiares e alertas, observando execuções contínuas.
- **Entregáveis:** aceite real de cleanup e decisão de operação/créditos PD-CRI-010.
- **Evidências:** contagens/horários/créditos antes/depois e jobs reconciliados, sem IDs sensíveis desnecessários.
- **Critério de aceite:** nenhuma remoção por prefix/tag/all; ownership imutável comprovado e execução contínua com owner antes de ativar capas.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** eligible no dry-run não autoriza delete; TTL10min não revoga assinatura1h e rotina parada não garante limpeza/custo zero. Parcial mantém pendência aberta.

#### EST-033

**Homologar jornada completa e plataformas alvo**

- **Objetivo:** comprovar uso integrado do produto disponível.
- **Pré-requisitos/dependências:** Candidato/ambiente isolado e dados preparados para a jornada; provas pertinentes de contas/drafts/capas podem vir de frentes paralelas.
- **Quem executa:** Estudantes/testadores humanos em acesso de uso autorizado.
- **Quem aprova:** Responsável pelo aceite funcional aceita jornada e browsers alvo.
- **Procedimento:** cadastro→criação/acesso autorizado a laboratório→área→upload/capa ou fallback aprovado→coleta→draft→confirmação→consulta/histórico→mapas/informações disponíveis; testar mobile, navegadores/versões escolhidos pela equipe, teclado/foco e revogação. Acesso por vínculo atual; não pressupor fluxo de ingresso por código ainda indisponível.
- **Entregáveis:** matriz da jornada por plataforma, limitações e feedback humano.
- **Evidências:** resultados/reproduções redigidos e aceites; IHFR identificado como experimental, mapa sem capacidades futuras presumidas.
- **Critério de aceite:** jornada do recorte concluída sem perda/bypass; diferenças de browsers aceitas ou corrigidas com planejamento prévio.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** 70 E2E em Chromium não provam Safari/Firefox/mobile nem validam ciência; regressão material bloqueia aceite funcional do recorte.

#### EST-034

**Consolidar aceites e recorte; registrar aceite funcional do recorte**

- **Objetivo:** decidir se o candidato pode ser proposto para produção.
- **Pré-requisitos/dependências:** Evidências automatizadas/provedores/aceites humanos dos fluxos ativos; EST-031/032 somente para ativar capas.
- **Quem executa:** Estudantes consolidam matriz; responsável pelo aceite/projeto decide recorte e limitações.
- **Quem aprova:** Responsável pelo projeto/aceite funcional aprova recorte; aprovação produtiva fica separada na EST-035.
- **Procedimento:** consolidar as três colunas com provas existentes aplicáveis e lacunas complementadas; autoridade funcional/projeto aceita browsers/limitações. Se capas não prontas, projeto decide publicação parcial com CLOUDINARY_IMAGE_ENABLED=0, fallback aceito e owner/prazo de retomada; sem declarar016 homologada.
- **Entregáveis:** aceite funcional do recorte do recorte exato, lista de pendências e decisão completo/parcial.
- **Evidências:** aceites humanos/Gate B012/013, provider real dos fluxos ativos e decisão com autoridade/data/origem.
- **Critério de aceite:** nenhum gate obrigatório de fluxo ativo aberto; parcial não declara016 homologada nem dispensa mail/contas/backup/ensaio.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** sem decisão parcial, ausência de Cloudinary bloqueia rollout completo; aceite técnico não altera estado científico IHFR.

### Atualização acompanhada e aprovações

#### EST-035

**Aprovar GO/NO-GO e janela**

- **Objetivo:** autorizar atualização somente com pré-requisitos demonstrados.
- **Pré-requisitos/dependências:** Candidato revisado/integrado, cobertura/recorte aceitos e confirmação operacional de banco/serviços envolvidos; autorizações produtivas explícitas.
- **Quem executa:** Aprovadores de produção/dados decidem; operadores confirmam prontidão; estudantes apresentam pacote candidato.
- **Quem aprova:** Aprovador produtivo e autoridade de dados/banco, cada um no próprio escopo.
- **Procedimento:** preencher tabela, revisar triggers e plano de promoção/recuperação; confirmar custos/riscos e rollout parcial com flag0 se escolhido; conceder escopo explícito a cada operador e comunicar janela à equipe/usuários pelo canal autorizado.
- **Entregáveis:** decisão GO/NO-GO, janela e autorizações rastreáveis.
- **Evidências:** aprovações/UTC/origem e links dos aceites técnicos/funcionais e da prontidão operacional do recorte; operador confirma deployment anterior e alvo.
- **Critério de aceite:** GO humano válido para SHA/recorte/janela concretos, sem auto-merge/promover por CI sozinho.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** NO-GO mantém produção existente; não ativar capas para fechar gate ficticiamente.

#### EST-036

**Congelar escrita, fazer backup final e aplicar migrations**

- **Objetivo:** preparar schema real com recuperação pronta antes da versão nova.
- **Pré-requisitos/dependências:** GO EST-035 vigente, prontidão EST-025 e owners presentes com autorização de banco/backup.
- **Quem executa:** Operador de banco autorizado executa; operadores de aplicação/mail coordenam tráfego/workers; estudantes acompanham.
- **Quem aprova:** Autoridade de dados/banco e aprovador da janela confirmam mudança.
- **Procedimento:** pelo mecanismo existente aprovado, controlar mutações/workers; reconferir identidades/pending e backup final compatível com método restaurado; executar migrate status→migrate deploy→status conforme runbook, em um único processo/endpoint direto privado. Conferir constraints/checksums/contagens e aplicação anterior antes de liberar deploy.
- **Entregáveis:** registro da janela, backup final e migrations realmente aplicadas.
- **Evidências:** UTC/duração/exit codes redigidos, inventário pré/pós e contagens preservadas durante congelamento.
- **Critério de aceite:** cadeia aprovada íntegra, sem pending/failed/drift não resolvido; 14 versionadas reconciliadas sem apagar linhas extras para forçar contagem.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** erro/lock além do limiar ou DDL parcial interrompe sequência; não deployar, não repetir cegamente e seguir recuperação aprovada.

#### EST-037

**Publicar o artefato aprovado no mesmo projeto Vercel**

- **Objetivo:** atualizar a aplicação atendida pelo domínio existente.
- **Pré-requisitos/dependências:** EST-036 aceita quando há mudança de schema, ou schema existente confirmado compatível; GO e autorização de promoção/configuração/deploy.
- **Quem executa:** Operador Vercel e mantenedor Git autorizados publicam/promovem; estudantes conferem informações e uso permitido.
- **Quem aprova:** Aprovador produtivo autoriza deploy; mantenedor/revisor aceita promoção.
- **Procedimento:** operadores seguem fluxo Git/CLI existente no projeto/equipe atuais; promoção development→main apenas com GO e schema compatível. Conferir diff/árvore/SHA final e justificar reuso ou cobertura adicional pelo impacto antes de atender tráfego; mudança de SHA por merge/documentação não exige repetição integral. Confirmar READY, targets/env, domínio e flag antes de alias/reabertura.
- **Entregáveis:** versão/SHA/deployment/URL produtivos e vínculo à aprovação.
- **Evidências:** PR de promoção/commit, validação do artefato final, Vercel READY e conferência de destino por dois operadores.
- **Critério de aceite:** projeto/banco/domínio existentes preservados e artefato validado servido; parcial mantém CLOUDINARY_IMAGE_ENABLED=0 e upload indisponível.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** main pode disparar deploy imediato: preparar/validar a árvore final antes de promover, ou usar controle de tráfego aprovado. Não executar CLI com defaults que criem/linkem outro projeto nem migrate deploy no build de cada Preview.

#### EST-038

**Conferir pós-deploy e gate de reabertura**

- **Objetivo:** verificar versão, saúde e autorização no destino real.
- **Pré-requisitos/dependências:** Deployment candidato efetivamente publicado (EST-037); smoke de uso autorizado com escopo limitado.
- **Quem executa:** Estudantes/testadores verificam uso/leitura autorizados; operadores conferem banco/configuração/métricas.
- **Quem aprova:** Responsável pelo aceite pós-deploy e aprovador produtivo.
- **Procedimento:** usar seção pós-deploy do checklist: domínio/READY/SHA, headers/cache, login/logout com testador autorizado e leituras existentes de laboratórios/áreas/coletas/histórico/mapas, isolamento e filas/contagens; verificar fallback se parcial. Não rodar harness/fixtures/seed nem criar/excluir contas/medições/imagens sintéticas na produção; cenários de escrita e falha ficam na homologação isolada.
- **Entregáveis:** smoke produtivo limitado e parecer de reabertura ou recuperação.
- **Evidências:** checks de leitura/status/métricas agregadas e testemunho humano, sem PII; identidade do banco/candidato intacta.
- **Critério de aceite:** checks essenciais e contagens aceitos, sem falha de segurança; recorte parcial identificado corretamente.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** divergência de SHA/alvo, erro de autenticação/integridade ou exposição exige manter contenção e acionar plano aprovado.

#### EST-039

**Reabrir, observar schedulers e registrar aceite pós-deploy**

- **Objetivo:** retomar serviço com operação verificável ou recuperar com controle.
- **Pré-requisitos/dependências:** Verificações essenciais EST-038 aceitas e autorização de reabertura/retomada ou recuperação.
- **Quem executa:** Operadores executam retomada/recuperação aprovada; estudantes registram verificações acompanhadas.
- **Quem aprova:** Aprovador produtivo autoriza reabertura; recuperação de dados requer autoridade correspondente.
- **Procedimento:** autorizar reabertura/retomada dos schedulers e observar execução automática/fila/latência/erros; usar limites definidos na EST-025/035. Em falha, conter mutações, preservar evidência e executar recuperação previamente aprovada; não apagar tabelas/jobs/ativos ou retornar política de contas insegura.
- **Entregáveis:** aceite pós-deploy, horários e decisão reabertura/recuperação com incidentes/pendências.
- **Evidências:** primeiras execuções automáticas, métricas e aprovação humana; se recuperação, seu SHA/deployment/estado real.
- **Critério de aceite:** serviço do recorte estável e recuperação disponível; nenhum BLOCKED sem owner nem fila fora da validade sem tratamento.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** rollback de aplicação mantém schema/jobs; restore pode perder escritas posteriores e exige RPO/reconciliação aprovados.

### Acompanhamento e registro

#### EST-040

**Monitorar erros e desempenho após a atualização**

- **Objetivo:** detectar regressões de uso, autorização e disponibilidade.
- **Pré-requisitos/dependências:** Serviço/candidato a observar e métricas fornecidas pelo operador; observar baseline antes e depois da janela, sem aguardar reabertura para começar.
- **Quem executa:** Operador do projeto monitora infraestrutura; estudantes observam uso/relatos e registram achados no período acordado.
- **Quem aprova:** Responsável pelo projeto/operador aceita acompanhamento de infraestrutura.
- **Procedimento:** observar 5xx/401/403, latência/locks/banco, jornadas/relatos dos usuários e execução nos browsers alvo; comparar baseline e limiares/cadência/período acordados, tratando sinais de conta/IHFR/conexão sem atribuir causa não demonstrada.
- **Entregáveis:** registro de uso dos estudantes no período acordado e monitoramento contínuo do projeto, com owners distintos.
- **Evidências:** métricas agregadas/UTC/SHA/deployment e achados redigidos.
- **Critério de aceite:** período acordado concluído sem incidente material sem tratamento; IHFR continua experimental.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** reincidência de intermitência exige investigação com evidência; não silenciar erro para fechar período.

#### EST-041

**Acompanhar filas, agendadores, cleanup e créditos**

- **Objetivo:** manter operação contínua dentro dos limites reais dos provedores.
- **Pré-requisitos/dependências:** Serviços/jobs existentes e operador autorizado; observar em paralelo; EST-032 quando capas ativadas e execução de limpeza real for necessária.
- **Quem executa:** Operadores SMTP/Cloudinary do projeto acompanham filas/custos/jobs continuamente; estudantes recebem extratos sanitizados.
- **Quem aprova:** Responsável pelo projeto confirma operação contínua; autoridade financeira decide orçamento.
- **Procedimento:** seguir runbooks: idade/backlog/PENDING/PROCESSING/DEAD/EXPIRED/recoveredLeases, histórico/duração do scheduler; jobs PROCESSING/RECONCILE/BLOCKED, ativos próprios tardios e créditos/armazenamento/transformações; revisar orçamento/alertas e reconciliar só ownership comprovado. Se parcial, manter pendências e flag0 até nova homologação/GO.
- **Entregáveis:** registro operacional e consumo fornecidos pelos operadores; estudantes anexam extratos sanitizados, sem assumir orçamento/plantão.
- **Evidências:** timestamps/contagens/créditos e execuções automáticas; sem recipient/payload/URLs/segredos.
- **Critério de aceite:** owners/cadência comprovados, filas saudáveis e BLOCKED com tratamento humano; custo do plano conhecido.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** não alongar provas, truncar outbox, reabrir DEAD ou apagar assets em massa para esconder falha/custo.

#### EST-042

**Registrar incidentes e planejar correções no Spec Kit**

- **Objetivo:** corrigir defeitos sem perder rastreabilidade ou alterar intenção silenciosamente.
- **Pré-requisitos/dependências:** Achado em qualquer entrega; não depende de deploy ou fim da homologação.
- **Quem executa:** Estudantes/autores designados tratam defeitos no escopo autorizado; operadores contêm incidentes de serviços.
- **Quem aprova:** Revisor independente da correção; autoridade do assunto aprova exceções/recorte.
- **Procedimento:** abrir issue com EST/cenário/SHA/severidade/impacto/evidência redigida; conter pelo plano aprovado. Antes de código, usar skills instaladas speckit-specify→clarify quando material→plan→tasks→implement, em specs/<feature>; consultar constituição/PRD, revisar PR e repetir gates afetados/GO se houver nova publicação. Consultar guides Next locais antes de alterar código Next.
- **Entregáveis:** registro de incidentes; specs/plan/tasks e PRs de correção quando necessários, ou declaração de nenhum incidente observado.
- **Evidências:** links da investigação/decisões/testes/reviews e versões antes/depois.
- **Critério de aceite:** defeito resolvido com evidência ou pendência aceita com owner/prazo/impacto; causa desconhecida continua rotulada.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** decisão científica/domínio conflitante vira PENDENCIA_DE_DECISAO; não modificar fórmula para obter teste verde.

#### EST-043

**Atualizar documentação, relatório final e registrar aceite do relatório**

- **Objetivo:** registrar o realizado e as pendências com responsabilidade do projeto.
- **Pré-requisitos/dependências:** Registros das entregas e dados sanitizados fornecidos pelos operadores; pode documentar bloqueio/NO-GO sem declarar atualização concluída.
- **Quem executa:** Estudantes consolidam relatório; operadores fornecem registros e assumem operação contínua.
- **Quem aprova:** Coordenador/responsável pelo projeto aceita relatório; aprovações operacionais conservam sua origem.
- **Procedimento:** estudantes produzem relatório do trabalho/provas/achados; operadores informam SHA/deployment/domínio/UTC, estado real de banco/backup/jobs/custos/recuperação de forma sanitizada. Atualizar docs autorizadas preservando história; registrar NO-GO/espera quando aplicável e operação contínua com owners do projeto.
- **Entregáveis:** relatório final compartilhável, documentação/evidências atualizadas e aceite do relatório.
- **Evidências:** aprovação de encerramento, links válidos e conferência de secrets/diff/terminologia; referências privadas opacas para backups/configuração.
- **Critério de aceite:** relatório fiel aceito, com situação real de cada entrega, reuso de provas e pendências atribuídas ao projeto; NÃO declarar atualização ou gate concluído se ainda aguarda operação/aceite.
- **Estado inicial:** PENDENTE.
- **Riscos/bloqueio:** publicar plano/CI não encerra execução; funcionalidade desabilitada continua não homologada.

### Ficha operacional de GO/NO-GO

Ficha preenchida pelos aprovadores e operadores do projeto; estudantes recebem
somente extrato sanitizado. Campos do recorte e evidências aplicáveis são suficientes;
features desativadas mantêm pendências e não recebem homologação presumida.

| Item obrigatório | Evidência/decisão |
|---|---|
| Aprovador e autoridade designada; operadores/substitutos presentes | ______ |
| SHA integrado validado, SHA de promoção e artefato/deployment candidato | ______ |
| PRs/achados/riscos dev/intermitências aceitos | ______ |
| Recorte completo ou parcial; estado real de cada feature/gate | ______ |
| Vercel/repo/branch/root/domínio/banco confirmados por dois operadores | ______ |
| Configuração mínima e schedulers/monitoramento/owners prontos | ______ |
| Backup restaurado/ensaio, pending SQL, compatibilidade, RPO/RTO | ______ |
| Janela/início/fim, congelamento, lock máximo e critérios de parada | ______ |
| Deployment anterior/recuperação/roll-forward e comunicação | ______ |
| GO ou NO-GO, data/hora UTC, origem da aprovação e condições | ______ |

NO-GO se faltar um requisito material ao recorte, houver alvo incerto, falha sem
tratamento aceito, backup não restaurado, risco de perda/exposição ou operador
ausente. Qualquer mudança de candidato após aceite exige novo diff e validação
proporcional; registrar qual SHA foi homologado e qual será realmente servido.


## Rastreabilidade e histórico

A tabela abaixo é o snapshot anterior à publicação1.0, preservado como referência
histórica; os heads atuais devem ser conferidos na ENT-01/04. A RC documental
avança o head de #6; #7 exige a conferência/sincronização pelo mantenedor autorizado.
A evidência posterior de CI981eb9d consta na seção de reaproveitamento.
Esta revisão não resolve reviews ou modifica as bases/heads de outras branches.

### Snapshot anterior à primeira publicação — 2026-10-13

`EVIDENCIA_IMPLEMENTACAO`: consultas autenticadas de metadados/reviews/threads e
API de check-runs confirmaram a tabela. Todos os sete PRs estão OPEN e sem merge.
Nenhuma aprovação foi encontrada. Os nomes de revisores citados nas discussões
são evidência da revisão, não designações para os papéis da equipe deste plano.

| PR e conteúdo | Base → head | HEAD antes deste plano | Checks desse HEAD | Parecer/pendência |
|---|---|---|---|---|
| [#1: reconciliação](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/1) | development → review/cri-reconciliation-20261010 | a88d846 | Sem check-runs | Sem review registrado |
| [#2: runners014](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/2) | review/cri-reconciliation-20261010 → review/014-account-test-runners | 7180209 | Sem check-runs | Sem review registrado |
| [#3: drafts015](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/3) | review/014-account-test-runners → review/015-environmental-drafts | 65516f6 | validate SUCCESS | Re-review solicitado; sem aprovação |
| [#4: capas016](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/4) | review/015-environmental-drafts → review/016-area-covers | 8f18398 | validate SUCCESS | CHANGES_REQUESTED; 1 thread aberta/outdated |
| [#5: auditoria](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/5) | review/016-area-covers → review/cri-audit-20261010 | 52f612f | validate SUCCESS | Re-review solicitado; sem aprovação |
| [#6: RC](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/6) | review/cri-audit-20261010 → release/cri-rc-20261010 | 2995cff | validate SUCCESS | CHANGES_REQUESTED; discussão de propagação histórica |
| [#7: revisão independente](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/7) | release/cri-rc-20261010 → review/cri-rc-validation-20261012 | 59baff4 | validate SUCCESS | Sem aprovação; conferir base após este plano |

Em #1/#2 não há execução automática configurada nesses nomes; validar dentro da
árvore integrada e registrar a lacuna, sem chamar ausência de check de PASS.
O combined status REST retorna `pending` sem contextos mesmo nos heads com
check-run SUCCESS; examinar check-runs e workflow runs, além dos status legados.

A [thread de RC-UI-001](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/4#discussion_r4255042102)
permanece não resolvida; `outdated` não significa aceite. A
[review de #6](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/6#pullrequestreview-5499467293)
e seu [comentário de propagação](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/6#issuecomment-6151817393)
descrevem snapshots anteriores. As correções posteriores e o patch integrado
estão documentados na prontidão atual; somente o revisor pode registrar novo
parecer/resolução. **CI positivo não equivale a aprovação humana.**

O [follow-up independente de CI](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/59baff4f5cbe44164014aaf760a0651604177abb/docs/reports/audits/2026-10-13-cri-rc-ci-followup.md)
registra, no PR #5, timeout de navegação da verificação de conta; no #7, locator
IHFR em strict mode diante de duas mensagens no DOM. Reruns nos mesmos SHAs
passaram, sem causa demonstrada. ECONNRESET em admin-read e o FAIL histórico de
drafts também permanecem nas evidências da prontidão. Não atribuir o timeout de
contas à hidratação de drafts nem o locator duplicado a erro científico de IHFR.

### Erratas, limitações e efeito desta publicação

`EVIDENCIA_IMPLEMENTACAO`: o readme e o primeiro item do checklist ainda citavam
seis PRs em instruções executáveis; esta entrega os corrige para sete. As tabelas
originais de seis etapas no guia de integração são histórico de 2026-10-10;
aplicar sua atualização de 2026-10-13 e a cadeia completa acima. O runbook de
produção também conserva a ausência histórica de consulta autenticada Vercel;
a continuação posterior confirma o vínculo Git, sem fechar o inventário restante.

A RC remota possui `git.deploymentEnabled["release/cri-rc-20261010"]=false` no
[vercel.json](../../../vercel.json), verificado pela API antes da escrita.
Não há alteração desse arquivo nesta publicação. O workflow inicia CI em push
documental, sem deploy. A consulta Vercel já registrada na prontidão confirmou
projeto `hidro-florestas-full-stack`, fork atual e produção `main`; os operadores do projeto
devem reconfirmar o destino/domínio/banco antes de operar.

O novo commit muda o HEAD do PR #6 e a base de #7. A branch de #7 contém a RC
anterior, mas precisará receber este avanço documental antes da integração final.
**Estudantes preparam a sincronização de #7; mantenedor autorizado a executa
(EST-012), por merge da base na branch
de revisão, seguido de conferência de diff e checks.** Não incorporar o head de
#7 na RC para eliminar sua revisão independente; não duplicar/cherry-pick 99d8363.


### Histórico do roteiro

| Data | Versão/estado | Evento/origem |
|---|---|---|
| 2026-10-13 | 1.0 / NAO_INICIADO | Plano publicado com43 tarefas PENDENTE; preservado no Git, sem execução dos estudantes |
| 2026-10-13 | 1.1 / NAO_INICIADO | Pedido atual do usuário: seis entregas, responsabilidades separadas,43 referências condicionais, reuso e dependências materiais |

Ao iniciar uma entrega registrar EM_ANDAMENTO; para aceite usar AGUARDANDO_REVISAO.
Uma frente sem operador/autorização fica aguardando seu responsável do projeto;
continuar partes independentes. O relatório pode registrar pendências/NO-GO,
mas a atualização permanece pendente até execução e aceite reais.
Preservar versão, autoridade e origem de cada aprovação; não transformar orientação
do agente em decisão da equipe. Catalogação documental e registros canônicos
só são atualizados no escopo expressamente autorizado; docs/raw é imutável.
