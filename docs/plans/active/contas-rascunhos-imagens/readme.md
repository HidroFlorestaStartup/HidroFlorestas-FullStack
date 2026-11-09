# Contas, rascunhos ambientais e imagens de áreas

## Revisão focal posterior — 2026-10-10

EVIDENCIA_IMPLEMENTACAO: oito commits preservados, correções documentais focais
e nova regressão completa no corte final5f36eb7e. RECOMENDACAO: APTO COM
RESSALVAS; equivalência histórica 7f→5f não demonstrada, homologação externa e
aceites humanos pendentes. Consultar primeiro o [relatório focal](../../../reports/audits/2026-10-10-revisao-focal-cri-pre-homologacao.md)
e a [matriz vigente](matriz-de-estado.md); seções seguintes preservam a entrega anterior.

## Estado corrente após entrega local — 2026-10-10

EVIDENCIA_IMPLEMENTACAO: correção focal de runners 014, drafts pessoais 015 e
capas privadas 016 implementados e validados localmente. Contas/mail existentes
foram preservados e revalidados. [Matriz única](matriz-de-estado.md) concentra
requisitos, decisões, cenários, snapshots e pendências; [evidências 016](../../../../specs/016-area-covers/implementation-evidence.md)
registram a regressão integrada. Gate B012, aceite humano013 e operação/créditos
Cloudinary continuam pendentes. Estado global AGUARDANDO_REVISAO; entrega local
não equivale a homologação externa. Seções seguintes preservam os cortes anteriores.

## Reconciliação de 2026-10-10

Estado atual: `EM_ANDAMENTO`. Fundação de e-mail, verificação/recuperação e exclusão de conta estão presentes no HEAD auditado. Rascunhos e capas autenticadas tiveram recorte aprovado nesta execução; implementação será entregue em specs próprias. Gate B de contas e aceite humano de exclusão permanecem pendentes.

Fonte única de estado/evidências: [matriz de estado](matriz-de-estado.md). Coordenação: [PLAN-CRI-002](../reconciliacao-e-evolucao-contas-rascunhos-imagens.md). Contratos de contas: [spec 012](../../../../specs/012-account-verification-recovery/contracts/accounts.md).

## Registro histórico preservado — 2026-10-03

**Estado:** `AGUARDANDO_REVISAO` — pacote documental, sem implementação.
**Data de corte:** 2026-10-03, America/Fortaleza.
**Branch documental:** `docs/contas-rascunhos-imagens`.
**Base confirmada:** `origin/development` em `cfda9dfb65cc13186c76e69fbb2b385eb85783d6`, após `git fetch origin development` em 2026-10-03.

## Objetivo e autoridade

Este pacote prepara cinco frentes futuras: infraestrutura de e-mail, verificação de e-mail no cadastro, recuperação de senha, rascunhos de dados ambientais e imagens de áreas. É material para criar ou reconciliar futuras specs por funcionalidade; não substitui `spec.md`, `plan.md` e `tasks.md` do Spec Kit e não autoriza implementação.

`DECISAO_CONFIRMADA` pelo pedido desta rodada:

- Nodemailer no servidor, SMTP Gmail e senha de aplicativo;
- verificação do cadastro por código numérico textual de exatamente seis dígitos;
- upload e gestão de imagens pela API do Cloudinary, inicialmente no plano gratuito;
- entrega desta rodada exclusivamente documental.

Prazos, retenção, limites, política de acesso pré-verificação, tratamento de contas existentes, galeria versus capa e parâmetros do plano Cloudinary não foram confirmados. Este pacote fornece recomendações concretas e mantém essas escolhas como `PENDENCIA_DE_DECISAO`.

## Ordem recomendada de leitura

1. [Baseline e fontes](baseline-e-fontes.md)
2. [Requisitos e critérios](requisitos-e-criterios.md)
3. [Decisões e pendências](decisoes-e-pendencias.md)
4. [Arquitetura e contratos](arquitetura-e-contratos.md)
5. [Modelo de dados e migrations](modelo-de-dados-e-migracoes.md)
6. [Envio de e-mails](envio-de-emails.md)
7. [Verificação de e-mail](verificacao-de-email.md)
8. [Recuperação de senha](recuperacao-de-senha.md)
9. [Rascunhos ambientais](rascunhos-ambientais.md)
10. [Imagens de áreas](imagens-de-areas.md)
11. [Estratégia de testes](estrategia-de-testes.md)
12. [Plano de execução](plano-de-execucao.md)
13. [Handoff](handoff.md)

## Mapa de autoridade

| Regra | Local autoritativo neste pacote |
|---|---|
| Estado atual e evidências | `baseline-e-fontes.md` |
| Requisitos e critérios de aceite | `requisitos-e-criterios.md` |
| Confirmações, recomendações e bloqueios | `decisoes-e-pendencias.md` |
| Endpoints, DTOs, erros e fronteiras | `arquitetura-e-contratos.md` |
| Persistência, índices e rollout | `modelo-de-dados-e-migracoes.md` |
| Regras específicas por frente | arquivo temático correspondente |
| Matriz de validação | `estrategia-de-testes.md` |
| Ordem implementável | `plano-de-execucao.md` |

## Limites

- Nenhuma funcionalidade, teste executável, dependência, migration, variável, envio, upload, banco, deploy, push ou PR foi criado nesta rodada.
- Exemplos e nomes de modelos/endpoints são `PROPOSTA`, não API vigente.
- `docs/raw/**`, specs existentes, documentos Lovable e governança global permanecem inalterados.
- A integração visual futura deve preservar os contratos server-side; a proposta visual externa não é fonte de autorização, persistência ou domínio.
- O IHFR permanece `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO` e `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

## Estado inicial preservado

O checkout de origem estava em `007-ihfr-evolution`, HEAD `9bbece041b6f69903c949be98ba75115c4156f47`, upstream `origin/007-ihfr-evolution`, com `specs/005-environmental-collection-data/coverage-review.md` não rastreado. Foi criado worktree separado; esse arquivo não foi copiado, alterado ou incluído.
