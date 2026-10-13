# RC-UI-001 — publicação e propagação preparada

DECISAO_CONFIRMADA: solicitação do usuário em 2026-10-13 autoriza a correção
e push fast-forward somente da branch existente `review/016-area-covers` após
gates. A instrução posterior proíbe qualquer merge e exige execução exclusiva
no worktree dessa branch. Este documento prepara os descendentes, sem mover
suas refs nem integrar PRs. main/development e arquivos locais são preservados.

## Identidades verificadas

| PR | Head existente | HEAD anterior à correção | Base preservada |
|---|---|---|---|
| [#4](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/4) | review/016-area-covers | dace407e51b5034e69e22055658c651147a7caa3 | review/015-environmental-drafts |
| [#5](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/5) | review/cri-audit-20261010 | bbd0efccd447632497895780141b62516bc7b7bf | review/016-area-covers |
| [#6](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/6) | release/cri-rc-20261010 | ca80376e6e0f60aac9b94ec598e8e4a7c937d17c | review/cri-audit-20261010 |
| [#7](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/7) | review/cri-rc-validation-20261012 | b20143adcd5d36fbde381c28ba220881f3f2d53d | release/cri-rc-20261010 |

Os PRs estavam abertos e não draft. #4/#6 têm CHANGES_REQUESTED de PedroVitor237;
não dispensar reviews, resolver o thread em nome do revisor ou promover parecer.
O PR #7 conserva o relatório independente e os resultados históricos, inclusive
65 PASS/1 FAIL/1 não executado. Não retargetar nem integrar nesta execução.

## Ordem futura não destrutiva

RECOMENDACAO para a equipe após autorização própria: conferir os heads atuais,
integrar o novo head de #4 na branch existente de #5 por merge commit, validar
conflitos documentais preservando erratas e histórico; integrar #5 em #6; integrar
#6 em #7. Cada publicação requer fast-forward, branch já existente com seu nome
exato desabilitado em vercel.json, reconferência remota de CI/deploy e gates da
árvore resultante. Não force-push, rebase, squash, cherry-pick ou apagar branches.

Conferir em cada árvore que o componente/teste da correção não voltou ao preimage
antigo; conservar os 11 commits originais e o encadeamento #1→#2→#3→#4→#5→#6.
O SHA 99d8363 das dependências já pertence a #7: preservar sua autoria e identidade.
Sua promoção ao candidato deve ocorrer por integração autorizada que preserve
essa ancestralidade, com revisão/testes e avaliação do diff final. Copiar o patch
para #4 criaria uma duplicação desnecessária da etapa separada de #7.

Após a propagação, atualizar o guia existente em
`docs/releases/2026-10-10-cri-rc/integration-guide.md` na branch que o contém.
Esse caminho não existe no head original de #4; não criar uma cópia parcial aqui.
O fluxo posterior para development continua sujeito à aprovação dos estudantes,
merge commits/retarget conforme estado real; nenhuma autorização nesta sessão.

## Dependências e falha de rascunhos

EVIDENCIA_IMPLEMENTACAO: commit separado
[99d8363](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/commit/99d8363fba4d13a8a02937be1ff2e606d35b3fa6)
altera somente package.json/package-lock.json. Revisão de versões e origens no
lockfile não encontrou registro fora de registry.npmjs.org. Next/config-next
16.3.6→16.3.8, sharp 0.35.4→0.35.5/libvips 1.3.4, source-map-js 1.2.1→1.2.2,
brace-expansion 1.1.18→1.1.21 e 5.0.9→5.0.12. Sem major ou audit fix force.
Teste local temporário não equivale à integração do PR #7 na RC.

Verificação local do fix+patch: Unit291+Mail17, Integration187,
typecheck/lint/build, E2E68, HTTPS2, bootstrap14, exclusão3 e SchemaAudit zero PASS.
Audit13high→5high na cadeia dev; omit=dev zero. O patch temporário foi revertido
com hashes exatos de package.json/lockfile; seu SHA original continua somente
na etapa #7, aguardando a integração autorizada da pilha. Evidências em
[registro focal](rc-ui-001-evidence.md).

EVIDENCIA_IMPLEMENTACAO: diagnóstico separado com scripts retardados permite
selecionar false no HTML sem handler React, mas a hidratação/alteração seguinte
volta o campo a vazio; PUT inicial omite water.hasSpring e reload mantém vazio.
Asserts originais foram preservados. INFERENCIA: esse mecanismo é compatível com
a intermitência histórica; não prova a cronologia do teste perdido do PR #7.
RECOMENDACAO: planejar correção própria de prontidão do formulário, impedindo
interação enquanto o handler não está pronto, com teste de hidratação lenta e
repetição da suíte original. Não aumentar timeout nem aguardar artificialmente
no teste original para esconder perda do primeiro valor. Implementação desse
recorte adicional e aceite em navegadores alvo permanecem pendentes.

## Aprovação ainda necessária

Re-review #4 e parecer sobre a árvore cumulativa #6 após futura propagação;
validação da hidratação/drafts; integração autorizada das dependências; Gate
B012/T025/T028 e e-mail real; aceite humano013; cloud/preset/hash congelado,
privacidade/EXIF/raw/late uploads/cleanup/custos e operadores PD-CRI-004/010;
inventário/backup restaurado/ensaio de atualização e autorização operacional.
Testes locais com fake não fecham esses gates. IHFR continua
CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e
NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

## Estado de publicação desta sessão

Planejamento commitado: 366432acf8a0134e2c1142b64a4d5f6588b3fa42.
Correção/evidências em validação local; push/re-review ainda não executados neste
corte documental. Registrar os resultados efetivos no fechamento, sem presumir
permissão de escrita a partir de consultas somente leitura.
