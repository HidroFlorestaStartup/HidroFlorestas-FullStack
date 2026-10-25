# HF-NIGHT-01 — preservação e continuidade da revisão para estudantes

`EVIDENCIA_IMPLEMENTACAO`: os quatro originais da revisão destinada a Thales
foram restaurados, sem alteração de bytes, a partir de
`d2168c840937a6120e32467f24cb46383e8dcd29`. Estavam ausentes da base
`08262dc57c1ad365244f9ec6902b1e4be39e2d7d`. O
[recibo](evidencias.json) registra identidades, comparação e verificações; o
[plano](../../../plans/active/hf-night-students-20261025.md) contém as tarefas.

## Origem e crédito preservados

| Original restaurado | Papel histórico |
|---|---|
| [Relatório de revisão](../../../reviews/20261024-revisao-thales/relatorio-de-revisao.md) | Parecer técnico, quatro achados RTH e limites em 24/10/2026. |
| [Próximos passos](../../../reviews/20261024-revisao-thales/proximos-passos.md) | Recomendações de continuidade destinadas a Thales naquele corte. |
| [Evidências](../../../reviews/20261024-revisao-thales/evidencias.json) | SHAs, execuções e consultas históricas da revisão. |
| [Plano original](../../../plans/active/revisao-thales-20261024.md) | Identifica execução por Codex, por solicitação direta do usuário. |

`FATO_DOCUMENTADO`: os títulos, a destinação a Thales e a atribuição do plano
original foram preservados. Este adendo é autoria do agente C da missão atual;
não atribui a Thales ou a outro integrante a escrita, aprovação ou identidade
de uma conta Git. Igualdade de blob comprova integridade, sem autenticar autoria.
Não foram importados os dois apontadores antigos nem a branch completa.

## Checklist atual dos achados

Os estados abaixo são o resultado desta análise documental, com alcance
explícito. Os originais conservam seus estados históricos e não foram corrigidos
retroativamente. A [conciliação C1](../../../reviews/20261024-hf-doc-chat01/readme.md)
e sua [matriz](../../../reviews/20261024-hf-doc-chat01/matriz-imp-c1.json) continuam
sendo a fonte da conciliação; não há matriz concorrente neste pacote.

| Achado | Estado no recorte atual | Evidência e limite |
|---|---|---|
| `RTH-P2-001` | `RESOLVIDO_DOCUMENTALMENTE` | `INFERENCIA`: adendo C1, matriz de 40 registros e os quatro apontadores existem na base integrada. As tabelas antigas conservam o corte e remetem ao adendo. Resolve desatualização navegacional/documental, sem aceitar cada IMP nem corrigir lacunas funcionais. |
| `RTH-P2-002` | `TRATADO_POR_COMPOSICAO_FOCAL` | `INFERENCIA`: #29–#32 integraram investigação, LOCAL, C1 e os 206 caminhos documentais próprios da #27 por composição focal, sem integrar #27/#28 inteiras. O inventário C1 preserva a fonte #28 por SHA. Estado restrito a esse tratamento: três documentos novos #28 estão ausentes; dois paths de adendos preexistem com blobs distintos. Nenhum dos cinco conteúdos foi importado nesta frente, nem sua disposição encerrada. |
| `RTH-P3-001` | `DOCUMENTADO_SOB_DEMANDA` | `EVIDENCIA_IMPLEMENTACAO`: os globs usuais continuam fora de `tests/investigations/**`. Entradas e limites abaixo; nenhuma promoção a gate ou execução nesta frente. |
| `RTH-P3-002` | `PROPOSTA_DE_LIMPEZA_FASEADA` | `PROPOSTA`: inventariar consumidores, separar filtro de CI de bloqueio Git de deploy e só então propor mudança delimitada. Nenhuma entrada removida ou generalizada. |

`EVIDENCIA_IMPLEMENTACAO`: o histórico Git local identifica os merges #29,
#30, #31 e #32 em `df0ac5a`, `2795c29`, `3b5e0ba` e `08262dc`.
`FATO_DOCUMENTADO`: o coordenador informou a consulta remota desta missão:
[#29](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/29),
[#30](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/30),
[#31](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/31) e
[#32](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/32)
`MERGED`; [#27](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/27)
e [#28](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/28)
`OPEN`. Esta autoria não repetiu a consulta nem alterou essas PRs.

`RECOMENDACAO`: preparar futuro encerramento da #28 como preparação sucedida,
após reconferir dependentes e os três documentos novos/dois adendos exclusivos
enumerados no [inventário C1](../../../reviews/20261024-hf-doc-chat01/inventario-prs-c1.json).
Referenciar a execução #29, a conciliação C1 e o conteúdo único por SHA no ato
que vier a ser autorizado. A proposta não fecha/recria/reaplica #27/#28.

## RTH-P3-001 — entradas sob demanda

`RECOMENDACAO`: começar pelo
[índice de reprodução existente](../../../releases/2026-10-23-hf-inv-local01/environment-and-protocols.md)
e pela [seleção C1](../../../reviews/20261024-hf-doc-chat01/instrumentos-sob-demanda.md).
Os comandos seguintes são entradas documentadas, sujeitos ao protocolo e a
recursos exclusivos. Não constituem uma ordem para executá-los nesta entrega.

| Seleção | Entrada existente | Pré-condição e limite |
|---|---|---|
| NAV4/origem/login | `./scripts/hf-inv-nav4-local.ps1 -Phase Prepare`, depois as fases `Origin`, `Navigation`, `Back`, `Audit`, `Stop` conforme [readme](../../../releases/2026-10-23-hf-inv-local01/nav4/readme.md). | Raiz privada/marker da missão, portas e cluster próprios; o wrapper recusa dotenv preexistente. `Probe` é rodada exploratória própria. Controle de origem atual não explica retrospectivamente FAIL Linux. |
| Navegação pública | `node tests/investigations/navigation/run-public.mjs`, conforme [protocolo C](../../../releases/2026-10-23-hf-inv-local01/navigation/protocol.md). | Contexto público sem sessão/banco, servidor/browser próprios; manter distinção documento/RSC/API e controles sintéticos. |
| Navegação autenticada/mapa | `./tests/investigations/navigation/run-authenticated.ps1 -Phase Stage`; fases `Prepare`, `Run`, `Audit`, `Stop` no protocolo C. | Worktree isolada, cluster/fixtures descartáveis e marker próprios; serializar recursos. Não copiar sessão ou credencial. |
| INV-001/IHFR e INV-002/capas | [Protocolo B](../../../releases/2026-10-23-hf-inv-local01/ihfr/protocol.md) e [comandos/argumentos registrados](../../../releases/2026-10-23-hf-inv-local01/ihfr/run-evidence.json). | Seleção explícita dos cenários e bootstrap isolado. `tests/investigations/ihfr/two-request-quota.test.ts` usa AreaCoverService/FakeCoverProvider: é quota de **capas**, sem provar recuperação IHFR. |

`EVIDENCIA_IMPLEMENTACAO`: `package.json` seleciona `tests/unit`, o runner
`scripts/imp006-test-runner.ts` seleciona `tests/integration`, `tests/contract` e
`tests/migration`, e `playwright.config.ts` usa `tests/e2e`. Nenhum desses
seletores coleta automaticamente o diretório investigativo. Os instrumentos
possuem guards e contexto de missão; sua reutilização exige preflight atual.

`RECOMENDACAO`: preservar FAILs e hipóteses inconclusivas, com número de rodadas,
controles, timeouts e assertions originais. Uma eventual promoção exige owner,
custo, fixtures e casos determinísticos definidos. QA prepara a documentação
detalhada da missão em frente própria; não se declara esse protocolo entregue
nem se cria link para arquivo ainda inexistente.

## RTH-P3-002 — proposta de limpeza faseada

`EVIDENCIA_IMPLEMENTACAO`: a base tem 19 branches no gatilho `push` do workflow,
as mesmas 19 no predicado do job `validate`, e 27 entradas `false` em
`git.deploymentEnabled`. O [recibo](evidencias.json) contém as listas exatas,
hashes dos dois arquivos e consumidores localizados por busca estática. A busca
não inventaria webhooks/CLI/API externos ou necessidade humana de rerun.

| Fase proposta | Entrega revisável | Risco e condição |
|---|---|---|
| 1 — inventário | `PROPOSTA`: associar cada branch aos PRs/SHAs, reruns pendentes e operador responsável; consultar consumidores externos somente com autorização própria. | Ausência de ref local não prova desuso. Preservar todos os `false`, incluindo `development:false`. |
| 2 — CI | `PROPOSTA`: quando não houver rerun dependente, propor diff próprio dos filtros temporários de `push` e do predicado do job, validando sua equivalência e o dispatch. | Remover só um dos seletores pode impedir um job esperado; ampliar pode executar CI custosa. Revisão/validação no novo SHA. |
| 3 — contenção de deploy | `PROPOSTA`: avaliar qualquer mudança em Vercel separadamente, depois de mapear branch reutilizável, triggers e autorização específica. | Remover/generalizar `false` pode habilitar deploy automático. “Limpeza” e encerramento de PR não autorizam retirar bloqueios. Conservar as guardas é opção válida. |
| 4 — fechamento | `PROPOSTA`: registrar consumidores e resultados, confirmar ausência de alteração operacional e manter os recibos antigos por SHA. | Reversão de um commit de configuração não desfaz deploy ou efeito externo já ocorrido. |

Nenhuma fase desta proposta foi executada pelo agente C. O workflow permanece
igual à base. O coordenador adicionou à worktree a guarda exata
`docs/hf-night-students-20261025: false`, preservada nesta frente e discriminada
no recibo; as 27 regras anteriores continuam iguais. Não equivale a limpeza ou
remoção de guarda, nem demonstra ausência universal de gatilhos externos.

## Limites e validação

`EVIDENCIA_IMPLEMENTACAO`: FR-015 ainda exige avatar neutro de iniciais no popup
geral em `specs/002-criar-laboratorio/spec.md:113`; na base examinada,
`src/components/workspace/laboratory-workspace.tsx:237` renderiza somente o nome.
A tela OWNER de gestão exibe iniciais e é outra superfície. Este documento não
declara essa lacuna corrigida; a frente funcional será revisada no próprio SHA.

`FATO_DOCUMENTADO`: resultados funcionais e CI dos originais são históricos,
atribuídos aos SHAs neles registrados. Nesta frente: testes funcionais, build,
typecheck, lint, browser e provedores `NOT_RUN`; somente validação documental.
Não há aceite de produto/UX/acessibilidade, homologação, piloto ou ciência nova.
TECH_DECISIONS, DOCUMENT_REGISTER e PENDING_DECISIONS não precisam de nova decisão
normativa neste recorte; origens e inventário estão preservados neste pacote.

Validação documental: igualdade binária dos quatro originais PASS; 206/206 blobs
documentais próprios #27 iguais à fonte; 64 links relativos existentes; três
JSONs válidos; whitelist de nove caminhos e busca por padrões de segredos PASS.
O corpo histórico de PROJECT_CONTEXT conserva os bytes do checkout da base;
as 27 guardas anteriores de Vercel continuam iguais. Diff/whitespace conferidos.
A [revisão independente do delta](independent-review.md) foi concluída por
`/root`, com PASS_DOCUMENTAL_COM_LIMITES antes de commit/publicação. O recibo
anterior de whitelist de nove paths precede este parecer adicional.

IHFR permanece `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO` e `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
