# Homologação operacional e entrega da candidata

Estado deste documento: preparação executável de C3/C4, cuja integração e publicação foram autorizadas pelo usuário nesta conversa de 21/10/2026. A autorização não é reaberta por textos históricos; homologação concluída, destino verificado, implantação e entrega aos participantes ainda exigem seus próprios registros. Nenhum aceite humano ou comunicado é presumido.

## Identificação necessária para operar

| Campo | Evidência disponível nesta rodada | Situação |
|---|---|---|
| Repositório | `HidroFlorestaStartup/HidroFlorestas-FullStack` | Confirmado por API/Git |
| Candidata de integração | [PR #25](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/25), branch `release/frontend-rc-20261021`; composição e resultados em [regressão agregada](regressao-agregada.md) | O SHA final, incluindo a guarda de integração, precisa de CI/revisão próprios |
| Projeto existente | Histórico identifica `hidro-florestas-full-stack`, equipe `hidrofloresta-8598` | Revalidar por operador com acesso; conector atual retorna 403 |
| Domínio do piloto/produção | Histórico declara `https://hidro-florestas.vercel.app` | Não presumir alias, versão ou vínculo atual |
| Banco produtivo e backup | Identidade/restore não demonstrados nesta rodada | Operador deve identificar destino e ensaiar recuperação |
| Aplicação de homologação de contas | Projeto separado já documentado no runbook de contas | Não tratar target chamado production desse projeto como produção do produto |
| Operação, janela e suporte | Responsáveis e janela não identificados para este destino | Execução autorizada; identificar quem opera/acompanha e registrar prontidão, sem atribuir aceite a terceiros |

A integração de Git pode disparar deploy. Não usar defaults de CLI que criem outro projeto, não copiar variáveis/contas e não operar o banco produtivo a partir do runner sintético.

## Integração autorizada com contenção do deploy Git

`EVIDENCIA_IMPLEMENTACAO`: na auditoria sobre `499e669d4afe0d79a0fd0fdc73f687917c7d3f6d`, as branches das frentes e da release estavam desabilitadas em `vercel.json`, mas `development` e `main` não constavam da regra. A [documentação oficial](https://vercel.com/docs/project-configuration/git-configuration) define branches não especificadas como habilitadas. O [status GitHub de development](https://api.github.com/repos/HidroFlorestaStartup/HidroFlorestas-FullStack/commits/1ea3cc2552c244e1004f4f733f838e0f9ea62993/status) registra Vercel SUCCESS, “Deployment has completed”, atualizado em 21/10/2026 às 05:18:29 UTC, com [deployment associado](https://vercel.com/hidrofloresta-8598/hidro-florestas-full-stack/FEPNkC3Rg52iaBk8hs1TtutPXJoA). Isso comprova o registro de uma implantação associada ao SHA, sem identificar por si só ambiente, alias, banco ou saúde.

`RECOMENDACAO` materializada neste delta: acrescentar somente `git.deploymentEnabled.development=false`, preservando todas as regras anteriores e sem alterar `main`. A guarda deve compor o próprio SHA agregado submetido aos gates/revisão antes do merge autorizado; não integrar primeiro frentes cujo resultado ainda não contenha essa guarda. Conferir base esperada, parents, árvore resultante e proteção do repositório; se a base avançar, reconciliar antes de integrar.

Essa regra contém o acionamento automático por Git da branch quando a configuração é aplicada pelo projeto. Não cobre deploy hooks, CLI, jobs/integrações externas ou um projeto configurado acima/fora do root inspecionado. O 403 preserva `VERCEL_NOT_VERIFIED`; ausência de status posterior não prova ausência de deployments. Não reabilitar o acionamento nem promover `main` enquanto destino e prontidão operacional não estiverem demonstrados.

O workflow atual valida as branches de revisão/release e não inclui `development`/`main` em seus gatilhos ou condição do job. Executar os 15 gates na agregada final; após merge, registrar equivalência de árvore/parents sem chamar esse recibo de CI do merge. Qualquer validação adicional do merge exige um mecanismo explícito que realmente execute, mantendo os guards do runner.

## Matriz de aceite por marco

| Marco | Critério observável | Evidência a vincular | Responsável/estado |
|---|---|---|---|
| M0 | Recorte do piloto, copy, limites experimentais e features ativas definidos | Decisão de produto/coordenação; proposta de copy na Spec028 | Aceite humano pendente |
| M1 | Jornadas frontend implementadas, reais, responsivas e acessíveis | PRs Specs025–028, testes, capturas inspecionadas, limitações | Vincular recibos dos HEADs finais; aceite manual separado |
| M2 | PRs revisadas e integração autorizada com parents/diff coerentes | Autorização vigente do usuário, recibo Git e guarda de development | Executar após gates/revisão e regras do repositório; não registrar aprovação em nome de terceiro |
| M3 | 15/15 gates no SHA agregado e revisão independente efetiva | Run/attempt/job, results.jsonl, digest do artefato, resposta Codex, achados tratados | Não herdar verde das branches |
| M4 | Contas/e-mail, exclusão, drafts/capas, operação e recuperação reais | Jornadas controladas e recibos sem PII/segredos, aceite humano | Depende de acesso/operador/ambiente |
| M5 | SHA aprovado publicado no destino identificado e smoke concluído | URL, deployment, UTC, versão, rollback e canal de suporte | Publicação autorizada; depende de M4, destino e acesso, sem entregar URL histórica como release nova |

## Ações concretas antes do acesso operacional

| Ação | Execução e resultado possível no chat/CI | Limite que permanece |
|---|---|---|
| Fechar a candidata | Consolidar SHA/parents/árvore, 15 gates, artefato/digest, revisão efetiva, capturas e pendências nos recibos das PRs | PASS de ancestral ou frente isolada não é PASS da agregada |
| Conter a integração Git | Incluir a guarda acima no próximo SHA, conferir JSON/diff e validar/revisar esse SHA antes de integrar | Não demonstra configuração externa da Vercel |
| Inventariar migrations | Comparação Git confirmou 14 SQLs: nenhum delta de Prisma sobre development `1ea3cc2`; duas migrations de drafts/capas adicionais sobre main `beba96f` | Histórico/schema do banco hospedado, backup e restore continuam não verificados |
| Preparar homologação | Usar os passos abaixo e registrar por caso candidato, ambiente, UTC, resultado observado e evidência redigida; manter execução sintética e humana distintas | Não marcar recebimento, aceite ou recuperação reais sem execução |
| Preparar entrega | [Guia do piloto](guia-do-piloto.md) autocontido preparado; completar seus campos internos e o comunicado com versão, URL, features e suporte verificados | Destinatários/canal não identificados; nenhum envio nesta preparação |
| Tratar históricos | Manter [triagem](triagem-historicos.md), recuperar recibos e tratar falhas materiais atuais em ambiente sintético | Não encerrar causas históricas com novo verde nem antecipar aceite humano da fase 10 |

## Roteiro operacional reutilizado

Usar o [runbook da aplicação existente](../2026-10-10-cri-rc/production-update-runbook.md), o [runbook de migrations](../2026-10-10-cri-rc/migration-runbook.md) e os runbooks funcionais. Esta candidata visual não acrescenta migration; a promoção de main antigo para development atual exige considerar a cadeia acumulada completa e ensaiada.

1. Confirmar projeto/equipe/domínio/branch/root/Node/build, banco e configuração por operador habilitado. Registrar somente nomes/IDs não secretos e a origem da autorização.
2. Identificar deployment anterior, backup e prova de restauração. Conferir compatibilidade antes de definir reversão; não regredir para binário que remova verificação/revogação de contas.
3. Executar as jornadas reais do [runbook de contas](../../operations/account-homologation-runbook.md). Gate B permanece distinto de testes com transporte injetado: reset por link recebido, consumo e revogação; reenvio com código anterior recusado; prova de recebimento humano não é substituída por leitura do banco ou SMTP aceito.
4. Verificar scheduler/outbox/recuperação conforme [mail-runbook](../../operations/mail-runbook.md), no destino e com os destinatários autorizados; não reutilizar cron de homologação como produção por suposição.
5. Executar exclusão com contas/dados descartáveis autorizados, impedimentos e confirmação; preservar dados do piloto.
6. Homologar drafts conforme [runbook](../../operations/environmental-drafts-runbook.md) nos navegadores alvo. Para capas, aplicar o [runbook](../../operations/area-covers-runbook.md): provedor real homologado ou decisão explícita de rollout com `CLOUDINARY_IMAGE_ENABLED=0`. Feature-off não significa que Cloudinary foi homologado.
7. Obter aceites humanos de navegação, texto 200%, teclado e dispositivo/leitor de tela pertinente. A emulação Chromium não os substitui.
8. Registrar prontidão operacional, janela e plano de reversão sob a autorização vigente; publicar exatamente o SHA aprovado no projeto existente. Conferir READY, alias/SHA e executar smoke por jornada, além de HTTP 200.
9. Registrar versão, URL, deployment, UTC, evidências de smoke, operador e limites. Entregar aos participantes somente depois desses resultados.

## Material de entrega aos participantes

O [guia do piloto desta candidata](guia-do-piloto.md) está preparado como material autocontido, com passos de acesso/verificação, laboratório, área, coleta, medições, rascunho, mapa/lista, IHFR e feedback. Seu cabeçalho identifica a candidata em preparação e mantém versão publicada, URL, participantes, suporte e disponibilidade de capas pendentes no bloco interno do handoff. O [roteiro de testes de uso anterior](../../code-first-prd/testing/roteiro-de-testes-de-uso.md) foi preservado como fonte histórica.

O guia usa os rótulos reais **Acessar plataforma**, **Criar conta** e **Confirmar e-mail**, sem prometer workspace imediato após cadastro. Inclui recuperação de resultados desconhecidos, limites de navegação dos rascunhos e consulta pela lista quando os tiles falham. Administração continua reservada ao papel global autorizado. O formulário de avaliação histórico precisa de confirmação de destino/owner antes da distribuição; nenhum destinatário foi inventado. As quatro qualificações `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO` e `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO` estão preservadas no material.

O comunicado final deve conter versão e URL confirmadas, público autorizado, funções habilitadas, limites do IHFR, instruções de acesso, canal de suporte designado e coleta de feedback. Não incluir e-mails de participantes, senhas, provas, banco ou URLs assinadas no recibo público. Nenhum comunicado foi enviado nesta preparação.

## Desbloqueios concretos

- Conceder à conexão Vercel acesso ao escopo correto `hidrofloresta-8598`, sem trocar/criar projeto para contornar o 403.
- Executar a integração já autorizada depois do fechamento técnico e da guarda de deploy Git. Registrar separadamente os aceites humanos da copy/recorte do piloto; não emitir parecer em nome do mantenedor ou da coordenação.
- Operador identificar ambiente/banco/janela e completar os gates reais acima, com acesso e destinatários autorizados. Autorizações de políticas já confirmadas não precisam ser repetidas; sua configuração/execução ainda precisam de prova atual.
