# Homologação operacional e entrega da candidata

Estado deste documento: preparação técnica para C3/C4; não é GO de publicação, homologação concluída ou comunicado enviado aos usuários.

## Identificação necessária para operar

| Campo | Evidência disponível nesta rodada | Situação |
|---|---|---|
| Repositório | `HidroFlorestaStartup/HidroFlorestas-FullStack` | Confirmado por API/Git |
| Candidata de integração | Branch reservada `release/frontend-rc-20261021`; SHA/parents/árvore constarão no recibo agregado | Validar o HEAD exato após composição |
| Projeto existente | Histórico identifica `hidro-florestas-full-stack`, equipe `hidrofloresta-8598` | Revalidar por operador com acesso; conector atual retorna 403 |
| Domínio do piloto/produção | Histórico declara `https://hidro-florestas.vercel.app` | Não presumir alias, versão ou autorização atual |
| Banco produtivo e backup | Identidade/restore não demonstrados nesta rodada | Operador deve identificar destino e ensaiar recuperação |
| Aplicação de homologação de contas | Projeto separado já documentado no runbook de contas | Não tratar target chamado production desse projeto como produção do produto |
| Operador, janela e aprovador | Não especificados para esta publicação | Designação e GO explícitos antes da operação |

A integração de Git pode disparar deploy. Conferir o destino e as automações antes de promover uma branch. Não usar defaults de CLI que criem outro projeto, não copiar variáveis/contas e não operar o banco produtivo a partir do runner sintético.

## Matriz de aceite por marco

| Marco | Critério observável | Evidência a vincular | Responsável/estado |
|---|---|---|---|
| M0 | Recorte do piloto, copy, limites experimentais e features ativas definidos | Decisão de produto/coordenação; proposta de copy na Spec028 | Aceite humano pendente |
| M1 | Jornadas frontend implementadas, reais, responsivas e acessíveis | PRs Specs025–028, testes, capturas inspecionadas, limitações | Execução técnica em andamento; aceite manual separado |
| M2 | PRs revisadas e integração autorizada com parents/diff coerentes | Recibo Git e decisão de merge do mantenedor | Candidata pode ser preparada; merge humano não presumido |
| M3 | 15/15 gates no SHA agregado e revisão independente efetiva | Run/attempt/job, results.jsonl, digest do artefato, resposta Codex, achados tratados | Não herdar verde das branches |
| M4 | Contas/e-mail, exclusão, drafts/capas, operação e recuperação reais | Jornadas controladas e recibos sem PII/segredos, aceite humano | Depende de acesso/operador/ambiente |
| M5 | SHA aprovado publicado no destino identificado e smoke concluído | URL, deployment, UTC, versão, rollback e canal de suporte | Bloqueado até M4/GO/acesso; não entregar URL histórica como release nova |

## Roteiro operacional reutilizado

Usar o [runbook da aplicação existente](../2026-10-10-cri-rc/production-update-runbook.md), o [runbook de migrations](../2026-10-10-cri-rc/migration-runbook.md) e os runbooks funcionais. Esta candidata visual não acrescenta migration; a promoção de main antigo para development atual exige considerar a cadeia acumulada completa e ensaiada.

1. Confirmar projeto/equipe/domínio/branch/root/Node/build, banco e configuração por operador habilitado. Registrar somente nomes/IDs não secretos e a origem da autorização.
2. Identificar deployment anterior, backup e prova de restauração. Conferir compatibilidade antes de definir reversão; não regredir para binário que remova verificação/revogação de contas.
3. Executar as jornadas reais do [runbook de contas](../../operations/account-homologation-runbook.md). Gate B permanece distinto de testes com transporte injetado: reset por link recebido, consumo e revogação; reenvio com código anterior recusado; prova de recebimento humano não é substituída por leitura do banco ou SMTP aceito.
4. Verificar scheduler/outbox/recuperação conforme [mail-runbook](../../operations/mail-runbook.md), no destino e com os destinatários autorizados; não reutilizar cron de homologação como produção por suposição.
5. Executar exclusão com contas/dados descartáveis autorizados, impedimentos e confirmação; preservar dados do piloto.
6. Homologar drafts conforme [runbook](../../operations/environmental-drafts-runbook.md) nos navegadores alvo. Para capas, aplicar o [runbook](../../operations/area-covers-runbook.md): provedor real homologado ou decisão explícita de rollout com `CLOUDINARY_IMAGE_ENABLED=0`. Feature-off não significa que Cloudinary foi homologado.
7. Obter aceites humanos de navegação, texto 200%, teclado e dispositivo/leitor de tela pertinente. A emulação Chromium não os substitui.
8. Confirmar GO, janela e plano de reversão; publicar exatamente o SHA aprovado no projeto existente. Conferir READY, alias/SHA e executar smoke por jornada, além de HTTP 200.
9. Registrar versão, URL, deployment, UTC, evidências de smoke, operador e limites. Entregar aos participantes somente depois desses resultados.

## Material de entrega aos participantes

O [roteiro de testes de uso](../../code-first-prd/testing/roteiro-de-testes-de-uso.md) permanece a base da jornada: acesso/conta, laboratório, áreas, coletas/medições, IHFR e mapa; administração é reservada ao papel global autorizado. Preservar as quatro qualificações científicas.

O comunicado final deve conter versão e URL confirmadas, público autorizado, funções habilitadas, limites do IHFR, instruções de acesso, canal de suporte designado e coleta de feedback. Não incluir e-mails de participantes, senhas, provas, banco ou URLs assinadas no recibo público. Nenhum comunicado foi enviado nesta preparação.

## Desbloqueios concretos

- Conceder à conexão Vercel acesso ao escopo correto `hidrofloresta-8598`, sem trocar/criar projeto para contornar o 403.
- Mantenedor decidir revisão/merge dos PRs concretos, e coordenação aceitar a copy/recorte do piloto.
- Operador identificar ambiente/banco/janela e completar os gates reais acima, com acesso e destinatários autorizados. Autorizações de políticas já confirmadas não precisam ser repetidas; sua configuração/execução ainda precisam de prova atual.
