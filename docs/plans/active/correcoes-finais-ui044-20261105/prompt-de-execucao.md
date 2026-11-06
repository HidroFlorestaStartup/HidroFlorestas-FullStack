# Execução autorizada — três correções finais da UI-044

## Estado vigente — executado, aceito e integrado em 06/11/2026

Este é um mandato histórico já executado. C1, C2 e C3 foram implementadas na [PR #53](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/53), testadas manualmente e [aprovadas por Pedro](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/53#pullrequestreview-5800053435), e integradas em development no merge `865054b53e5820582d7956a29dc95fc9a2690bd8`. Não reexecutar estas instruções como trabalho pendente. O texto de 05/11 permanece preservado abaixo, com seus estados e evidências daquele corte.

A CI42157996425/1 e a revisão Codex pertencem ao head1f305fb da correção; a árvore do merge foi conferida igual à candidata. A organização das PRs é documentada no [plano de encerramento](../encerramento-prs-ui044-20261106/plano-de-execucao.md). Este registro não atribui aceite a Luciano, homologação operacional ou validação científica.

Estado: correções aprovadas por Pedro e ainda não implementadas neste handoff.
Data: 05/11/2026 (America/Fortaleza).
Repositório: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack

## Comece aqui

Leia integralmente este arquivo, o [plano de publicação](plano-de-publicacao.md), o [recibo de aceite e integração](aceite-e-integracao.json) e os [três prints originais](evidencias/readme.md). Consulte AGENTS.md, PROJECT_CONTEXT.md, TECH_DECISIONS.md, PLANS.md, a constituição e as instruções locais aplicáveis.

A PR #51 foi integrada em development pelo merge `7bae1f87cb8d6a708b7c4de0b990e82e5a503369`, com árvore idêntica à candidata `febee101aa718de5b236f99f8080621c405a1d7f`. A CI42101827226, tentativa1, teve quinze gates PASS, incluindo E2E241; Codex Review concluída nesse head sem findings. Esses resultados pertencem à integração anterior e não substituem os testes do seu novo SHA.

Este handoff está na branch `docs/handoff-ui044-correcoes-finais`. Ele pode ser lido antes do merge documental. Comece a implementação da development atual, contendo o merge #51; não use uma das antigas branches empilhadas #44–#50 como base. Se o PR documental ainda estiver aberto, consulte os documentos nesta branch sem importar código ou reaplicar commits funcionais.

## Autoridade e autorização

DECISAO_CONFIRMADA — origem: Pedro, nesta conversa, em 05/11/2026:

> São os únicos pontos que indico como necessários para correção, todo o resto me pareceu funcionar bem e está aprovado tanto em usabilidade quando em design e aparência.

Pedro confirmou a organização dos três pedidos abaixo e autorizou registrar o aceite, integrar #51 e preparar estas instruções. [Registro público do aceite e autorização](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/51#issuecomment-6671722605).

Está autorizado implementar as três correções, atualizar a documentação da entrega, validar, fazer commits, push e abrir ou atualizar uma PR para development, sem confirmação adicional para etapas normais de execução. Resolva escolhas técnicas rotineiras dentro deste escopo. Use uma única branch própria, sugerida: `fix/ui044-correcoes-finais-20261105`. Se já existir trabalho publicado com essa finalidade, inspecione-o e continue com segurança, preservando o trabalho preexistente.

O merge da futura correção fica com Pedro. A implementação não precisa esperar outra autorização inicial. O aceite atual é de Pedro e não deve ser atribuído a Luciano. Não equivale a certificação de acessibilidade, homologação operacional do piloto ou validação científica do IHFR.

## C1 — cards das coletas na página da área, desktop e mobile

Referência: [print1](evidencias/01-area-link-ihfr-redundante.png).

Remova o link avulso “IHFR” de cada card da lista de coletas. Preserve “Abrir coleta” e “Dados ambientais”, com seus destinos reais.

Preferência aprovada: usar esse espaço para exibir somente “Score registrado: [valor]” do diagnóstico vigente daquela própria coleta, quando já disponível. Não acrescentar ali classificação, proveniência ou outro botão.

EVIDENCIA_IMPLEMENTACAO: na base integrada, `src/components/areas/area-collections.tsx` já recebe `row.currentDiagnosis`; o resumo superior usa `displayScore`. Confira o tipo em `area-collections-presentation.ts` e reaproveite os dados já carregados se bastarem. Não crie endpoint, cálculo, consulta adicional por card ou alteração de contrato apenas para esse score.

Alternativa expressamente aceita: se mostrar o score exigir complexidade material adicional, deixe apenas os dois botões e registre a escolha técnica. Sem diagnóstico vigente, não invente score; zero só deve aparecer se for um valor real registrado.

O quadro superior “Último IHFR experimental disponível” e seu link “Consultar resultado e proveniência” permanecem. Um resultado de outra coleta pode continuar aparecendo nesse resumo da área, conforme a regra já aprovada; não copie esse resultado para o card de uma coleta sem diagnóstico. Preserve a ordenação por ocorrência em campo.

Aceite: nenhum link “IHFR” avulso nos cards em desktop/mobile; ambos os botões continuam funcionando; resultado, quando exibido, corresponde à própria coleta. Restante da tela preservado.

## C2 — retirar somente o aviso experimental repetido, desktop e mobile

Referência: [print2](evidencias/02-detalhe-aviso-experimental-duplicado.png).

Na página “Detalhe da coleta”, mantenha “Limites do diagnóstico experimental” somente em “LEITURA DA COLETA”. Remova sua repetição em “AÇÕES AUTORIZADAS”.

EVIDENCIA_IMPLEMENTACAO: a base usa `ScientificNotice` em `src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx`, além dos componentes de leitura. Inspecione a composição antes de alterar. Não remova o componente compartilhado globalmente: preserve o aviso na leitura com diagnóstico e no estado sem diagnóstico, inclusive para MEMBER e laboratório somente leitura.

Preserve formulários, confirmações, validações, mensagens sobre dados ambientais ausentes, proveniência, permissões, idempotência e as ações de criar/substituir/revogar. Retirar a cópia visual não altera qualquer contrato científico ou de autorização.

Aceite: fora de diálogos transitórios, a página tem uma única ocorrência desse aviso, localizada na seção de leitura; a seção de ações não contém a repetição. Verificar com e sem diagnóstico e com/sem permissão de gerenciamento.

## C3 — primeiro card de leitura, somente mobile

Referência: [print3](evidencias/03-mobile-prioridade-leitura-da-coleta.png).

Após o título e o retorno à área, a sequência mobile deve ser:

1. LEITURA DA COLETA / Diagnóstico IHFR experimental.
2. Registro.
3. Dados ambientais.
4. AÇÕES AUTORIZADAS, quando permitidas.

Mova somente a leitura para o início, e não o grupo inteiro de leitura e ações. A disposição desktop já aprovada permanece, incluindo suas colunas e a posição relativa dos demais cards.

Ponto de atenção: `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx` compõe `CollectionDetail` e `IHFRDiagnosisManagement`. Uma inversão simples da coluna pode arrastar as ações para antes de Registro/Dados ambientais. Ajuste a composição necessária para cumprir a ordem aprovada sem duplicar cards, formulários, IDs, chamadas de dados ou estado de gerenciamento. Preserve ordem de leitura e foco coerentes, os estados vazios/erros, o título, o retorno e a navegação contextual.

Aceite: a leitura é o primeiro card em mobile com ou sem diagnóstico; Registro e Dados ambientais vêm depois; ações continuam por último quando disponíveis. Nenhuma sobreposição com o cabeçalho ou a barra inferior.

## Execução, documentação e validação

1. Faça preflight: conta/repositório corretos, fetch, status, branches e worktrees. Preserve arquivos/commits não relacionados; use worktree isolada se necessário. Confirme que o merge #51 está na base. Não faça reset, force push ou limpeza para obter uma árvore limpa.
2. Use o fluxo Plan → Execute → Review e as skills Spec Kit efetivamente instaladas. São correções da entrega `specs/036-ajustes-area-coletas-ihfr/`: acrescente um ciclo identificado de correção ao spec/plano/tarefas/evidências, preservando resultados e históricos anteriores. Não reabra o redesenho das outras telas ou toda a incorporação.
3. Antes do primeiro push, mantenha o deploy Git automático dessa branch bloqueado em vercel.json. Inclua somente o nome exato da branch nos filtros push e if do workflow RC existente quando necessário, preservando runners, ações, permissões, timeouts, guards, quinze gates e condições históricas. Não enfraqueça checks para obter verde.
4. Implemente as três correções com o menor diff coerente. Inspecione os guias de Next.js indicados no AGENTS.md antes de escrever código. Preserve componentes e rotas reais; o FullStack continua Next.js.
5. Valide focos concretos: ausência do link redundante; associação correta de score/ausência; aviso único na leitura; ordem dos cards; navegação dos dois botões; desktop preservado. Adapte os testes de apresentação existentes às mudanças aprovadas, mantendo assertions de domínio/permissões. Acrescente regressão significativa quando a cobertura atual não provar o comportamento novo.
6. Use o ambiente sintético e os guards oficiais. Consulte `tests/e2e/hf-ui036-area-collections.spec.ts`, testes E2E `ihfr-diagnosis-read`/`ihfr-diagnosis-manage`, testes unitários de apresentação/acessibilidade, `tests/e2e/support/frontend-ihfr-evidence.ts` e os scripts oficiais. Não execute fixtures contra bancos hospedados por inferência.
7. Capture a aplicação Next.js real nos estados alterados: desktop1440px; mobile375/390px; 320px com texto200%. Confira ordem visível, leitura/foco e controles alcançáveis, sem overflow nem obstrução pela barra inferior. Teste diagnóstico presente/ausente e ações autorizadas/ausentes. O estado com score zero, se incluído, deve vir de fixture sintética coerente e não de resultado científico fabricado.
8. Rode as verificações locais pertinentes e a CI oficial dos quinze gates no head final da PR. Registre SHA, run, tentativa, contagens por grupo, warnings e PASS/FAIL/NOT_RUN reais. Não some grupos sobrepostos nem transfira PASS anterior para novo commit.
9. Obtenha revisão de código do head final. Se usar o Codex do GitHub, confira primeiro se há execução válida para esse SHA; acompanhe a existente ou solicite uma única revisão quando necessária. Recupere o recibo conclusivo e trate findings materiais. Não duplique solicitações nem trate silêncio ou findings null como aprovação.
10. Publique commits e uma única PR para development, com os três critérios de aceite, arquivos alterados, capturas antes/depois, resultados e limites. Entregue link/SHA, checks/review e pendências reais. Pare antes do merge e do deploy. Não acrescente um commit de “recibo final” após congelar o head sem reconferir o que esse novo SHA exige; recibos posteriores podem ficar na descrição/comentários da PR.

## Limites e conclusão

Os únicos ajustes indicados por Pedro são C1–C3. Preserve o restante aprovado de usabilidade, design e aparência. Este mandato não inclui nova landing page, novos fluxos, cálculo automático, alterações em API/schema/migrations/autenticação/dependências, limpeza de branches, mudanças em provedores ou deploy. Se um defeito concreto exigir mudança material além do escopo, documente-o e suspenda apenas a parte afetada; não peça confirmação para escolhas rotineiras já autorizadas.

Geocodificador externo, SMTP/scheduler, Cloudinary e homologação operacional seguem suas decisões e provas próprias. Nenhum bloqueio operacional anterior é reclassificado como resolvido por estes ajustes. Não há nova investigação geral de falhas históricas nesta entrega.

IHFR permanece: CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO, NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

A conclusão esperada é uma PR pequena, revisável, com as três correções implementadas e verificadas, preservando a base já aceita. O aceite das novas correções e o merge serão do mantenedor.
