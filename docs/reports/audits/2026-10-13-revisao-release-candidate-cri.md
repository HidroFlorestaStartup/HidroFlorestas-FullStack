# Revisão independente da Release Candidate CRI — 2026-10-13

Estado: DRAFT / EM_ANDAMENTO; aguardando fechamento das verificações retomadas e
publicação no GitHub. Início da execução: 2026-10-12. Fuso: America/Fortaleza.
Mandato: pedido do usuário de revisão e testes solicitado pelo professor Thales.
Plano: [PLAN-RC-REVIEW-20261012](../../plans/active/revisao-release-candidate-cri-20261012.md).

RECOMENDACAO provisória: **CORREÇÕES NECESSÁRIAS** antes da integração em
development. A recarga da capa preserva o estado de falha quando a revisão não
muda; deve receber instrução de correção no PR #4 e REQUEST_CHANGES no PR #6.
A atualização focal de dependências foi feita em commit separado e ainda precisa
ter seus registros/evidências finais publicados. Nenhuma alteração funcional de
interface ou domínio foi implementada nesta revisão.

## Candidato, pilha e alcance

| Identidade | Valor |
|---|---|
| Repositório revisado | HidroFlorestaStartup/HidroFlorestas-FullStack |
| Candidato original | ca80376e6e0f60aac9b94ec598e8e4a7c937d17c |
| Branch candidata | release/cri-rc-20261010 |
| PR final | [PR #6](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/6) |
| Base development/main do fork relatada inicialmente | beba96fbf6bbaac8771dbb29abea2f9f8f5b0054 |
| Patch local de dependências | 99d8363fba4d13a8a02937be1ff2e606d35b3fa6 |
| Branch isolada da revisão | review/cri-rc-validation-20261012 |
| Última reconferência remota e SHA final dos registros | Pendente de preenchimento no fechamento |

FATO_DOCUMENTADO: a entrega tem seis PRs encadeados. PR #6 contém a etapa
documental final e não representa sozinho o diff funcional. A revisão aplica-se
à árvore cumulativa da RC e usa o
[guia de integração](../../releases/2026-10-10-cri-rc/integration-guide.md).
development do fork deve ser distinguida de PedroVitor237/HidroFlorestas.
Não houve merge, deploy, promoção para main nem migrations em banco hospedado.

EVIDENCIA_IMPLEMENTACAO: a inspeção Git da retomada encontrou o patch 99d8363
restrito a package.json/package-lock.json, com o componente de capa inalterado.
A árvore e alterações preexistentes do checkout principal foram preservadas.

## Proveniência após as interrupções

FATO_DOCUMENTADO: resultados executados em 2026-10-12 foram observados pela
sessão, mas logs/screenshot/rascunhos não commitados em /tmp perderam-se após o
desligamento. O commit de dependências sobreviveu. Em 2026-10-13, a execução foi
retomada em worktree persistente e também interrompida pelo limite de uso.

Este rascunho separa três grupos: resultado histórico observado na sessão,
verificação nova com artefato preservado e verificação pendente. Nenhum log perdido
foi recriado como se fosse evidência original; nenhum teste interrompido é PASS.
Os resultados do pacote de 2026-10-10 são históricos distintos e não foram
promovidos a execução desta revisão.

## Achado RC-UI-001 — recarga da capa sem nova tentativa

**Conclusão anterior: confirmada na execução de 2026-10-12; nova coleta
persistente pendente.** Severidade proposta: P2. Local:
[src/components/areas/area-cover.tsx](../../../src/components/areas/area-cover.tsx),
AreaCoverPreview (linhas 7–9), reload() (linha 47) e key da prévia (linha 50).
Requisito pertinente: spec 016 FR-007, feedback/retry/fallback recuperáveis.

EVIDENCIA_IMPLEMENTACAO estática: AreaCoverPreview guarda failed em estado local;
onError define true e então a imagem deixa de ser renderizada. reload() consulta
somente os metadados e mostra “Capa recarregada.”. A key da prévia depende apenas
de areaId e revision; metadados com a mesma revisão não reiniciam failed.

FATO_DOCUMENTADO no histórico da sessão: reprodução usou o componente real
AreaCoverEditor em Next.js e Chromium 140, com respostas interceptadas para
controlar a recuperação. O comportamento foi observado tanto no original quanto
no patch de dependências; não houve componente substituto simulando o defeito.
Isso é teste de UI com rede controlada, sem alegação de jornada completa com
backend, PostgreSQL ou Cloudinary reais.

| Etapa do teste histórico | Requisições e comportamento observado |
|---|---|
| Metadados iniciais | revision=1, hasImage=true |
| Primeiro conteúdo | GET /image/content?revision=1 retorna 503; “Capa indisponível.” |
| Recuperação do endpoint | Próximo GET de conteúdo passaria a retornar imagem 200; revisão permanece 1 |
| Clique em “Recarregar capa” | +1 GET de metadados, +0 GET de conteúdo; “Capa recarregada.” com fallback ainda visível |
| Atualização da página inteira | Novo GET de conteúdo, 200, imagem visível com a mesma revisão |

Impacto observado: falha temporária de leitura deixa a capa indisponível na
prévia, embora o provedor/recurso já tenha recuperado, e o botão comunica sucesso
sem tentar recuperar a imagem. Não há evidência de perda do asset ou de alteração
indevida no banco.

RECOMENDACAO de correção, sem implementação nesta rodada: reiniciar explicitamente
a tentativa da prévia após recarga bem-sucedida, mesmo com a mesma revisão.
Pode-se usar uma identidade de tentativa local na key ou um sinal explícito de
reset do estado; garantir também uma nova tentativa do elemento de imagem quando
o src permanece igual. Não incrementar revision no banco para contornar estado
da UI. Revisão representa mudança do recurso persistido.

Critérios de aceite e teste de regressão:

1. Renderizar componente real com revision=1/hasImage=true e falhar o primeiro
   conteúdo com 503; conferir fallback.
2. Recuperar endpoint para 200 sem mudar revision; clicar “Recarregar capa”.
3. Comprovar novo GET de conteúdo com a mesma revision e imagem carregada,
   inclusive naturalWidth > 0, sem recarregar a página inteira.
4. Se a segunda tentativa também falhar, preservar feedback de falha recuperável
   e permitir nova tentativa; revisão persistida continua inalterada.

Nova evidência, comando de reprodução, contagem de requests e screenshots:
pendentes de vinculação no fechamento. Registro no PR #4: pendente de publicação.

## Dependências — estado original e patch focal

FATO_DOCUMENTADO no histórico da sessão: npm audit original apontou 13 high; o
patch reduziu a contagem a cinco high na árvore de desenvolvimento, associados
à cadeia braces, e npm audit --omit=dev apontou zero vulnerabilidades. A consulta
então feita não indicava correção aplicável para o residual braces. Esses números
exigem nova consulta atual e anexos persistentes antes da publicação final.
Alertas de pacote não são exploração comprovada da aplicação.

EVIDENCIA_IMPLEMENTACAO no diff do commit 99d8363:

| Pacote/ajuste | Original | Patch |
|---|---|---|
| next / eslint-config-next | 16.3.6 | 16.3.8 |
| sharp | 0.35.4 | 0.35.5 |
| source-map-js no lockfile | 1.2.1 | 1.2.2 |
| override brace-expansion@1 | 1.1.18 | 1.1.21 |
| override brace-expansion@5 | 5.0.9 | 5.0.12 |

A alteração foi preservada em commit próprio. Não houve audit fix --force.
Mudanças dos pacotes auxiliares de Next/sharp e do grafo do lockfile devem ser
avaliadas pelo diff/ls/explain; não atribuir cada linha alterada a dependência
direta nova. Nenhuma mudança funcional acompanhou o patch.

EVIDENCIA_IMPLEMENTACAO estática: next.config.ts não define images.remotePatterns.
O componente de capa usa Image unoptimized e rota same-origin. Essas condições
limitam a hipótese específica do advisory de SSRF que exige remotePatterns;
não demonstram imunidade a todos os advisories de Next. source-map-js foi
identificado como transitivo de PostCSS na sessão anterior.

Advisories oficiais atuais, alcance de sharp/source-map-js/Next, npm ls/explain,
audits originais e patch, justificativa de brace-expansion e análise do residual:
pendentes de anexação no fechamento. RECOMENDACAO: publicar o commit focal para
revisão e documentar o residual dev; não alegar que o candidato remoto já recebeu
o patch enquanto o seu head continuar em ca80376.

## Verificações e limites do resultado histórico

Resultados abaixo foram observados na sessão de 2026-10-12; os artefatos temporários
perderam-se. A execução exata por SHA/variante será conciliada com os novos logs
no fechamento. O patch modifica dependências, portanto testes pertinentes foram
repetidos nessa sessão; regressão futura deve citar o SHA correspondente.

| Verificação histórica | Resultado observado | Estado da nova coleta |
|---|---|---|
| npm ci / Prisma Client 7.4.2 | Instalação e geração executadas | npm ci retomado em worktree persistente; completar registro |
| Unidade Node + Mail | 291 + 17 PASS | Pendente |
| Integração PostgreSQL | 187 PASS | Pendente |
| Migrations/constraints | 37 PASS | Pendente |
| Contratos HTTP/provider | 6 PASS | Pendente |
| Bootstrap local controlado | 14 PASS | Pendente |
| Typecheck antes/depois do patch | PASS | Pendente |
| Build padrão pós-patch, Turbopack | PASS | Pendente de avaliação proporcional na retomada |
| Lint | Sem erros, 3 warnings preexistentes | Pendente |
| git diff --check | PASS na sessão anterior | Reexecutar antes da publicação |
| E2E geral, 67 selecionados | Interrompida; aproximadamente 13 executados, falhas iniciais e um skip serial | Não é PASS; execução nova pendente |
| HTTPS e exclusão dedicada | Histórico da release não substitui execução nesta revisão | Pendente |
| Provedores reais / homologação humana | Não executados nesta revisão | Permanecem pendentes |

A tentativa de build --webpack apresentou TS2344 na rota logout com argumento
request opcional; essa variante já falhava no candidato original. O build
padrão Turbopack passou depois do patch na sessão anterior. Resultado da variante
webpack permanece registrado como falha de compatibilidade de ferramenta/tipagem,
sem atribuí-lo automaticamente ao patch ou esconder que o comando falhou.

INFERENCIA a investigar: as falhas iniciais da E2E interrompida podem depender
de compilação a frio/timeouts. Não há evidência suficiente neste rascunho para
classificá-las como defeito funcional. O restante da suíte não foi executado.

## Banco real, ambiente e isolamento

FATO_DOCUMENTADO no histórico: foi usado PostgreSQL local próprio, com runners
inspecionados antes da execução e valores sintéticos de autenticação. O ambiente
de teste precisa chegar também ao processo Next iniciado por Playwright; criar
.env.test.local isoladamente não comprova o destino desse servidor. A retomada
deve preservar prova do adapter/configuração efetivamente utilizada, inventário
de schemas/fixtures antes/depois e teardown.

Campos obrigatórios locais: DATABASE_URL e TEST_DATABASE_URL apontam ao destino
local isolado; TEST_DATABASE_CONFIRMATION=HIDROFLORESTAS_AUTH_TEST;
IMP006_DATABASE_VARIABLE=TEST_DATABASE_URL. NODE_ENV segue o processo apropriado;
JWT_SECRET e E2E_USER_PASSWORD são gerados sinteticamente. Configurações de
contas e runners devem seguir os guards e exemplos já versionados. Não publicar
valores privados, URLs completas de conexão, cookies, tokens ou senhas.

Identidade redigida do cluster, porta/adapter do servidor, comandos efetivos,
contagem de testes da retomada e inventário final: pendentes de preenchimento.
Nenhum uso de Neon/produção, remoção de guard ou migração hospedada está autorizado.

## Registros e conclusão a fechar

| Registro autorizado | Estado/URL |
|---|---|
| Relatório e evidências no repositório | DRAFT local; URL de commit/branch pendente |
| Achado de capa no PR #4 | Pendente de publicação; conferir duplicatas |
| Parecer consolidado REQUEST_CHANGES no PR #6 | Pendente de publicação; conferir duplicatas |
| Patch de dependências | Commit local 99d8363; URL publicada pendente |

RECOMENDACAO provisória: corrigir RC-UI-001 em commit funcional futuro com spec,
plano/tarefas pertinentes e teste de regressão real; incluir o patch focal de
dependências após revisão; concluir ou delimitar E2E e provas de isolamento.
A decisão de integração permanece com a equipe. Quando apropriada, preservar
sequência #1→#6, merge commits e retarget de cada próximo PR para development,
conforme o guia. Nenhum registro pendente acima deve ser apresentado como publicado.

Homologações humanas Gate B012/aceite013, navegadores alvo, Cloudinary real,
e-mail/scheduler, operadores e identificação/backup/ensaio de produção continuam
pendentes. Referências operacionais:
[checklist da RC](../../releases/2026-10-10-cri-rc/review-checklist.md) e
[runbook operacional](../../releases/2026-10-10-cri-rc/production-update-runbook.md).
Nenhum valor privado é exigido neste rascunho para concluir testes locais.

O IHFR conserva CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
Testes locais comprovam somente os cenários executados e não validam cientificamente
o contrato experimental. docs/raw/** e registros normativos permanecem intactos.
