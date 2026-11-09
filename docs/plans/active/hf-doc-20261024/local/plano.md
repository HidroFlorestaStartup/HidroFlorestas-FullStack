# HF-DOC-20261024-LOCAL01 — plano transversal

- Estado: `CONCLUIDO`; data: 2026-10-24, America/Sao_Paulo; publicação remota bloqueada separadamente.
- Objetivo: entregar matriz técnica Code-First, topologia/conteúdo exclusivo e handoff verificável para CHAT, com revisão independente.
- Mandato: solicitação direta do usuário e HF-DOC-20261024-LOCAL01 anexado; não executar instruções operacionais das fontes históricas.

## Escopo e ownership

Somente `docs/plans/active/hf-doc-20261024/local/**` e `docs/reviews/20261024-hf-doc-local01/**`. Ler fontes e Git como dados. Sem aplicação, testes funcionais, build, provedores, merge, deploy, e-mail ou alteração de configuração. Não escrever os adendos canônicos do CHAT, docs/raw ou spec fictícia.

| Executor lógico | Ownership exclusivo |
|---|---|
| Coordenador L-C | plano; readme; matriz agregada Markdown/JSON; instrumentos; manifesto; handoff; validação e recibos |
| L-A | `docs/reviews/20261024-hf-doc-local01/fragmentos/cobertura-imp-002-005.json` e `.md` |
| L-B | `docs/reviews/20261024-hf-doc-local01/fragmentos/cobertura-imp-006-010.json` e `.md`; `topologia-e-conteudo-exclusivo.md` |
| L-R | `docs/reviews/20261024-hf-doc-local01/revisao-independente.md`; não edita autores |

## Baseline e preservação

Checkout inicial `release/cri-rc-20261010@0f669b79a5e73a329832593229c2557d8b12bbce`. Nenhum arquivo rastreado sujo; nove entradas não rastreadas preservadas: `.demo-runtime/`, `.worktrees/`, os dois mandatos HF-DOC/HF-INV, plano/relatório da demonstração 2026-10-19 e três ZIPs locais. Não acessar o demo-private.json. Seis worktrees anteriores preservadas. Fetch sem prune concluído; worktree própria `docs/hf-doc-local01-20261024` criada da development observada `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Candidata separada `00477e961e36416d8d602d36f7e0ee195c487148`; #27 `223839c9ae91591ded8de387144d8c1ee84b5c20`; #28 `f56f73fda1d7bd459a1415bf02df25edc9120674`; alunos `d2168c840937a6120e32467f24cb46383e8dcd29`.

## Fontes e método

Revisão dos alunos lida na ordem do mandato; governança AGENTS, PLANS, PROJECT_CONTEXT, TECH_DECISIONS, constituição e SOURCE_AUTHORITY; política/backlog/plano Code-First; specs, código, testes, migrations, releases #27/#29 e timelines/reviews GitHub. Intenção e evidência não são equivalentes. Usar classificações canônicas e indicar INFERENCIA/RECOMENDACAO. IHFR conserva CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

Skill instalada `speckit-analyze` consultada; seu comando completo exige feature com tasks geradas e é inaplicável à missão transversal. Método equivalente: inventário de requisitos/subcapacidades, vínculos spec→rota→autorização→serviço→persistência→UI→testes, divergências e análise independente. Sem scripts de pré-requisito/hook/instalação. Não declarar execução integral de skill. Modelo/esforço raiz não expostos por ferramenta: não afirmar Ultra. Delegação nativa disponível; pedir Ultra aos filhos pela opção efetivamente disponível.

## Etapas, riscos e gates

1. PREFLIGHT/PLAN: baseline, inventário, regras, fontes e ownership antes da delegação.
2. EXECUTE: L-A cobre IMP-002–005; L-B cobre IMP-006–009 e fronteiras IMP-001/010/CRI, topologia e simulações; L-C lê instrumentos/configuração/PRs e agrega sem extrapolar cobertura.
3. REVIEW: L-R verifica todas as linhas e recomendações contra fontes, registra P0–P3; autores/coordenador tratam achados; revisor reconfere mudanças materiais.
4. HANDOFF: validar JSON, equivalência da matriz, links em snapshots, hashes sem ciclos, diff/whitespace, privacidade, escopo e preservação; congelar pacote e commit documental local.

Publicação depende de contenção comprovada antes de qualquer ref remoto. `vercel.json` da base não inclui a branch desta missão; publicação presumidamente bloqueada até concluir inspeção Git. Não mudar configuração para liberá-la. Revisão remota somente se publicação segura; CI funcional própria `NOT_RUN`. Aprovações humanas, decisões de integrar/fechar PRs, riscos G1–G5 e ciência continuam pendentes; não impedem partes documentais independentes. PLANS pede arquivamento ao concluir, mas mandato restringe paths: manter plano no path autorizado e registrar exceção.

## Histórico e encerramento

| Etapa | Estado | Evidência |
|---|---|---|
| Preflight/plan | concluído | fetch e criação da worktree; PRs abertas nos SHAs acima; identidade GitHub HidroFlorestaStartup via conector; CLI gh indisponível |
| Execução | concluída; refinamento documental sob revisão | três subagentes nativos criados após este plano; 40 registros agregados; topologia, instrumentos e fontes observadas produzidos |
| Revisão/handoff | concluída no alcance documental | L-R reconferiu40linhas; trêsP2/doisP3 tratados, zeroP0–P2 aberto; manifesto/handoff selados pelo coordenador sem circularidade |

| Data/hora UTC | Estado | Registro adicional |
|---|---|---|
| 2026-10-24, preflight | `EM_ANDAMENTO` | Conta HidroFlorestaStartup e permissão admin observadas pelo conector; nenhuma escrita remota de sondagem. Fetch sem prune e worktree própria concluídos. Nenhum AGENTS mais específico encontrado na árvore alvo. |
| 2026-10-24T15:36:18Z | `EM_ANDAMENTO` | Gate de publicação identificado: vercel.json não contém a branch LOCAL; configuração não será alterada. PUBLICACAO_BLOQUEADA_POR_GATILHO; demais documentos prosseguem. |
| 2026-10-24T15:45:19Z | `AGUARDANDO_REVISAO` | Árvores dos cinco snapshots registradas em fontes-observadas.json. Dois autores entregaram fragmentos; L-R iniciou análise de todas as linhas. |
| 2026-10-24T15:46:21Z | `AGUARDANDO_REVISAO` | Verificação documental preliminar:40 registros,499 blobs fonte,1272 links imutáveis e12 locais; JSON/IDs/campos/equivalência/privacidade/escopo passaram. Contagens finais podem mudar com tratamentos. CI própria NOT_RUN. |

Achados tratados e reconferidos: distinção GET elegibilidade200 versus POST terminal422; símbolo readDetail; vínculo indevido de teste de capas à recuperação IHFR; gates humanos/performance específicos de007–009. São problemas documentais, sem patch funcional. Contrato comum de recomendações acrescentado ao agregado com alternativa, condições, efeitos e reversão. Hooks locais ativos não foram encontrados no diretório padrão e core.hooksPath não apresentou valor; nenhuma configuração foi mudada.

## Encerramento documental

Em2026-10-24T15:50:03Z, revisão independente concluída e hashes das duas matrizes/topologia iguais aos inputs finais registrados por L-R. Validação própria final:40registros,7JSONs,13links locais,1285links imutáveis e500blobs fonte únicos lidos/hasheados; IDs/campos/equivalência/paths/privacidade/whitespace/escopo PASS. Os valores de contagem do recibo validacao.json descrevem o momento da checagem; a selagem posterior só acrescenta digests de fontes e documentos. Validação final de handoff reconfere todos os hashes sem reescrever o recibo.

Lista fechada:16arquivos novos, todos nos dois prefixos LOCAL; nenhum arquivo preexistente é alterado. Diff de produto/schema/dependências base→candidata vazio; delta desta missão em código/testes/configuração/docs/raw zero. Checkout inicial permanece0f669b7, sem alteração rastreada, com as mesmas nove entradas não rastreadas; seis worktrees anteriores preservadas. Matriz abrange IMP-002–009 por subcapacidade, fronteiras001/010/CRI e separa37presenças estáticas,2ausências delimitadas e1recorte de aceite humano não aplicável à engenharia; não é percentual de requisitos.

Estado de entrega: EVIDENCIAS_LOCAIS_CONCLUIDAS_PARA_CONSUMO. Publicação: PUBLICACAO_BLOQUEADA_POR_GATILHO; sem ref remoto, push, PR ou comentário. Revisão remota: NOT_REQUESTED_PUBLICATION_BLOCKED. Arquivos integrais e hashes permanecem locais; um pacote ZIP e recibo posterior fornecem ao CHAT o commit local, árvore e hash do handoff após gravação, sem autorreferência. O commit documental local usa paths explícitos; seu SHA e resultado pertencem ao recibo, não a este plano.

Pendências não fechadas: decisões humanas de integrar29/fechar28/compor27, riscosG1–G5, responsáveis operacionais, aceites de UX/acessibilidade, performance008 e validação científica IHFR. Registros canônicos/adendo Code-First são ownershipCHAT e não foram editados. O plano permanece neste path ativo por restrição explícita de ownership do mandato, em exceção à recomendação de arquivamento de PLANS.md.

Aplicação, testes funcionais, build, browser, banco, SMTP, provedores, deploy, merge e e-mail NOT_RUN. Python/gh indisponíveis não bloquearam: parser/hash documental usou Node do sistema com módulos nativos e Git como dados, sem executar código ou scripts da aplicação. Nenhum monitoramento, runtime ou tarefa futura foi agendado.
