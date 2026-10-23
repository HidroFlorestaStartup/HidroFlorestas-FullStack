# Contexto do projeto HidroFlorestas

## Entrega para revisão dos estudantes — 2026-10-10

FATO_DOCUMENTADO: o usuário autorizou publicar a RC no GitHub, preservando os11
commits até539f38d, sem merge em development/main, deploy ou migrations remotas.
[Pacote operacional e PRs](docs/releases/2026-10-10-cri-rc/readme.md).
As homologações GateB012/aceite013/Cloudinary e operadores seguem pendentes.
Esta entrega não altera o estado científico nem transforma o fork de revisão
em repositório produtivo; confirmar o vínculo Git e os recursos existentes.

## Identidade e propósito

- `FATO_DOCUMENTADO` — O HidroFlorestas é uma plataforma web desenvolvida no contexto de uma iniciativa de extensão e startup. Fonte: contexto fornecido pela equipe para a governança e identidade básica apresentada no `README.md`.
- `FATO_DOCUMENTADO` — O Índice HidroFlorestal (IHFR) constitui o núcleo científico da plataforma. Fonte: contexto fornecido pela equipe para a governança.
- `FATO_DOCUMENTADO` — O projeto está em uma fase de auditoria e realinhamento documental. A governança mínima precede a análise, a reconciliação e a atualização dos documentos. Fonte: mandato de governança fornecido pela equipe.

Este contexto é navegacional. Ele não valida requisitos, fórmulas, arquitetura nem estado de implementação.

## Camadas documentais

As camadas devem permanecer distinguíveis e rastreáveis:

- **Ciência:** regras científicas, variáveis, protocolos e cálculo do IHFR, sujeitos à validação dos responsáveis científicos.
- **Produto:** objetivos, escopo, requisitos e regras de negócio aprovados pela autoridade competente.
- **UX:** fluxos, wireframes e telas, com estado de aprovação explícito.
- **Arquitetura:** intenção técnica confirmada, propostas e ADRs aceitos.
- **Implementação:** evidências observáveis em código, configurações, migrations, testes e comportamento executável; não equivale automaticamente à intenção aprovada.
- **PRD:** futuro documento normativo de produto, a ser elaborado ou atualizado somente após a consolidação das fontes e as aprovações necessárias.

## Evidências históricas

`docs/raw/` é um conjunto de evidências históricas imutáveis. Seus documentos podem registrar escopo, conhecimento científico, requisitos, propostas ou estados anteriores, mas não constituem automaticamente a versão normativa atual. A autoridade de cada fonte depende do assunto e do estado de aprovação, conforme [docs/governance/SOURCE_AUTHORITY.md](docs/governance/SOURCE_AUTHORITY.md).

## Documentos canônicos de governança

| Documento | Função |
|---|---|
| [AGENTS.md](AGENTS.md) | Instruções estáveis para agentes e mantenedores. |
| [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) | Contexto mínimo e mapa navegacional do projeto. |
| [TECH_DECISIONS.md](TECH_DECISIONS.md) | Registro vivo de decisões, alternativas e seus estados decisório e de implementação. |
| [PLANS.md](PLANS.md) | Política para planejar e acompanhar trabalhos extensos. |
| [docs/governance/SOURCE_AUTHORITY.md](docs/governance/SOURCE_AUTHORITY.md) | Autoridade das fontes, classificações e protocolo de conflitos. |
| [docs/governance/DOCUMENT_REGISTER.md](docs/governance/DOCUMENT_REGISTER.md) | Estrutura do inventário e estado dos documentos. |
| [docs/governance/PENDING_DECISIONS.md](docs/governance/PENDING_DECISIONS.md) | Questões que ainda dependem de decisão ou designação da equipe. |
| [docs/governance/TRACEABILITY_MATRIX.md](docs/governance/TRACEABILITY_MATRIX.md) | Matriz canônica de rastreabilidade documental e de camadas, sem autoridade científica, funcional ou técnica. |

## Limites de validação atuais

Permanecem `NAO_ESPECIFICADO` ou não validados nesta base de contexto:

- o conteúdo e a vigência individual dos documentos de `docs/raw/`;
- a correspondência entre documentação e implementação;
- a validação das regras científicas e do cálculo do IHFR pelos responsáveis designados;
- a consolidação dos objetivos, requisitos, termos, regras de negócio e fluxos de UX;
- a arquitetura técnica definitiva e a implementação das escolhas relatadas;
- o conteúdo e a aprovação de um PRD.

Essas ausências não devem ser convertidas em requisitos, decisões, conflitos resolvidos ou evidências de implementação.


## Reconciliação funcional — 2026-10-10

A execução atual usa a [matriz única](docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md) e o [plano transversal](docs/plans/active/reconciliacao-e-evolucao-contas-rascunhos-imagens.md). `EVIDENCIA_IMPLEMENTACAO`: o corte beba96f já contém mail-foundation, verificação/recuperação 012 e exclusão 013. O pacote de 2026-10-03 é histórico; Gate B de contas e aceite humano de exclusão permanecem pendentes. Recortes pessoais de drafts e capa autenticada foram aprovados nesta conversa; implementação não equivale a homologação ou validação científica.


## Entrega de rascunhos 015 — 2026-10-10

EVIDENCIA_IMPLEMENTACAO: rascunhos pessoais 015 implementados com tabela separada, save explícito, OCC/idempotência, consumo transacional e cleanup pessoal na exclusão permitida. Sem expiração automática. Decisão PD-CRI-005/006 aprovada pelo usuário nesta conversa. Artefatos em specs/015-environmental-drafts/ e docs/operations/environmental-drafts-runbook.md; evidências finais registradas na spec.


## Entrega de capas 016 — 2026-10-10

EVIDENCIA_IMPLEMENTACAO: uma capa privada por área com Cloudinary authenticated,
edição OWNER/ADMIN contextual, proxy autorizado sem URL CDN, validação/EXIF,
revisão/retry e cleanup por identidade imutável comprovada. Tentativas/jobs
persistidos antes de I/O; conta removida não remove a capa da área nem dados científicos.
Integração187, migrations37, E2E67 e Bootstrap14 PASS; operação real pendente.
Ver [spec/evidências](specs/016-area-covers/implementation-evidence.md),
[runbook](docs/operations/area-covers-runbook.md) e [matriz](docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md).
Nenhuma qualificação científica do IHFR foi alterada.

## Revisão focal posterior da entrega CRI — 2026-10-10

EVIDENCIA_IMPLEMENTACAO: branch audit/cri-local-20261010 preserva os oito commits
até41f33db, sem alteração funcional. Nova regressão completa no final5f36eb7e;
erratas documentais e limite de equivalência histórica explicitados.
RECOMENDACAO: APTO COM RESSALVAS para solicitar homologação controlada;
Gate B012/aceite013/Cloudinary/operador pendentes. [Relatório e evidências](docs/reports/audits/2026-10-10-revisao-focal-cri-pre-homologacao.md).

## Preparação da incorporação visual — 2026-10-18

`EVIDENCIA_IMPLEMENTACAO`: origin/development está em
118a3a8b6e0f38a3e1085aad9f43e3be7f3eabed, merge de beba96f e 0f669b7,
com árvore idêntica ao candidato aprovado. Runners014, drafts015, capas016,
dependências e correções posteriores estão integrados. Os registros anteriores
deste documento preservam os cortes históricos; não descrevem a ponta atual.

`INFERENCIA`: **PRONTO PARA PLANEJAR A INCORPORAÇÃO**, com validações novas e CI
equivalente delimitados no [relatório datado](docs/plans/active/preparacao-incorporacao-frontend-20261018/relatorio-de-prontidao.md).
Build local falhou por restrições de rede/porta; não é PASS local. PRs2–5 têm
heads ancestrais de development; PRs6/7 conservam conteúdo documental exclusivo,
com recomendação de preservação antes de encerramento. Nenhum PR foi modificado.

`DECISAO_CONFIRMADA`: Pedro escolheu nesta sessão de 18/10 a adaptação visual do
login preservando autenticação real como primeira entrega futura. O restante do
[plano e handoff](docs/plans/active/preparacao-incorporacao-frontend-20261018/plano-de-incorporacao.md)
é `RECOMENDACAO`, para revisão de Pedro. Starter main de referência: cbb954a;
Vite/TanStack exige adaptação ao Next/App Router. Incorporação não implementada;
sem push/merge entre branches/deploy/banco real. Serviços reais, homologações e
ciência do IHFR conservam seus gates próprios e o contrato permanece experimental.

## Conclusão autorizada dos PRs CRI — continuação de 2026-10-18

`EVIDENCIA_IMPLEMENTACAO`: PR6 redirecionado para development, APPROVED de Pedro
pela conta PedroVitor237 com registro explícito por assistente autorizado, merge
ebbd9cb707ac2db98c56ad1ba5f344802233057c. PR7 redirecionado para development e
integrado em e17f64a1a9d8bdf48edd9ca1bc9443e118a41bc8, sem autoaprovação. PRs2–5
encerrados sem novo merge, com comentários e heads ancestrais conferidos; branches
e reviews/threads históricos preservados. `FATO_DOCUMENTADO`: Pedro informou que
Luciano já revisou; não foi criado evento em nome de Luciano.

Development atual e17f64a preserva os dois documentos de6 e os26 arquivos de7;
somente28 caminhos em docs/** mudaram desde118a3a8. Código funcional continua
equivalente ao corte validado; main segue beba96f. Readiness mantida, sem nova
bateria funcional ou reclassificação do FAIL local de build. Checks dos heads e
statuses automáticos dos merges conferidos; nenhum deploy solicitado por comando/API.
[Relatório atualizado e lista de caminhos](docs/plans/active/preparacao-incorporacao-frontend-20261018/relatorio-de-prontidao.md)
e [evidência da conclusão](docs/plans/active/preparacao-incorporacao-frontend-20261018/conclusao-dos-prs.json).
Preparação/documentação conduzida por Pedro; próximo passo é sua revisão do plano.
Frontend não implementado; homologações reais e ciência mantêm os limites anteriores.
Documentação da preparação publicada em branch própria, com
[PR8 aberto para revisão](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/8),
sem merge automático.

## Login integrado e handoff das fases 2 e 3 — 2026-10-18

`DECISAO_CONFIRMADA`: Pedro, no pedido anexado “sincronização, merges #8/#9 e
handoff das fases 2 e 3” de18/10/2026, autorizou a integração #8/#9 e a preparação
publicada deste novo handoff. Autorizou o outro desenvolvedor a implementar,
validar, fazer commits, push e abrir/atualizar PRs de **cadastro e conjunto de
conta (fase2)** e **workspace e shell (fase3)**, sem confirmação adicional normal.
Substitui a proposta limitada ao cadastro e a espera de autorização depois do
login. Fases4+ continuam propostas; aceite humano e merge são do mantenedor.

`EVIDENCIA_IMPLEMENTACAO`: #8/head95463d5 foi integrado em
`cf7f086351c952be5b7cc51f9616bc68bfd84f4d`; #9/head5503082 em
`afef5db6ced1a4604a114d842bf85950ac32c69b`, ponta conferida de development.
Spec017/login concluído. Main permanece beba96f, alinhada à própria remota.
APPROVED real de Pedro no #9:
[review5564336503](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/9#pullrequestreview-5564336503),
registrado por Codex com autorização expressa, sem alegar teste manual.
CI validate5503082 SUCCESS,15 gates PASS/E2E86/login14/HTTPS2/IHFR6;
equivalência de código/testes/configuração após o merge documental conferida.
Nenhuma nova bateria funcional ou homologação real nessa integração.

Ressalva preservada e aceita para o login: CI292dd95 falhou nos seis IHFR,
causa não demonstrada; acba40d/5503082 PASS não provam correção dessa falha.
Ciência e gates operacionais externos mantêm seus estados próprios.

Execução principal: **[prompt autossuficiente das fases 2 e 3](docs/plans/active/preparacao-incorporacao-frontend-20261018/prompt-de-execucao-fases-2-3.md)**.
[Plano vigente](docs/plans/active/preparacao-incorporacao-frontend-20261018/plano-de-incorporacao.md),
[relatório e evidências](docs/plans/active/preparacao-incorporacao-frontend-20261018/relatorio-de-prontidao.md).
Branch `docs/handoff-frontend-fases-2-3`, preparada de afef5db: o executor pode
ler o handoff nessa branch antes do merge documental. Fase3 pode ser preparada
em PR empilhado sobre a fase2 validada enquanto aguarda o mantenedor, conforme
o novo prompt. Esta preparação não implementou as duas fases nem operou deploy.

Publicação deste adendo: [PR10](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/10) aberto para development,
branch docs/handoff-frontend-fases-2-3; sem merge nesta preparação.

## Contas e workspace integrados; fases 4/5 autorizadas — 2026-10-19

`DECISAO_CONFIRMADA`: Pedro, no pedido anexado “Revisão e continuação — PRs
#10/#11/#12 e fases 4/5” desta sessão em19/10/2026, autorizou concluir os três
merges e publicar handoff das duas próximas fases. O executor pode implementar,
validar, commitar, fazer push e abrir/atualizar PRs de **ambas**, sem nova
confirmação normal; merges futuros e aceite humano continuam com o mantenedor.

`EVIDENCIA_IMPLEMENTACAO`: #10/1956a3e (oito documentos), #11/f0333fd (contas,
Spec018) e #12/c33bf50 (workspace/shell, Spec019) integrados nessa ordem em
**development c33bf50b510dd7af7ad59cde039839f56519c87e**. PR12 foi redirecionado
para development antes do merge, conservando165 caminhos próprios. APPROVED de
Pedro efetivamente registrados por Codex autorizado: reviews5566561057/5566567231,
nos heads8cacfc9/d555f9e; sem autoaprovação do10 ou evento em nome de Luciano.
CI exato:15 gates PASS em ambos, E2E100/120; produto/testes/configuração final
iguais ao head validado do12, com oito diferenças só documentais do10.
Mainbeba96f, branches e trabalhos locais anteriores preservados; FF local seguro.

Novo [prompt autossuficiente das fases4/5](docs/plans/active/preparacao-incorporacao-frontend-20261018/prompt-de-execucao-fases-4-5.md):
laboratório/dashboard/histórico/membros, depois áreas/capa. Pode ser usado na
branch docs/handoff-frontend-fases-4-5 antes do merge documental. Fases1–3
entregues; fases6+ fora desta autorização. Fonte visual continua startercbb954a,
com adaptação TanStack→Next. [Evidências e limites](docs/plans/active/preparacao-incorporacao-frontend-20261018/integracao-contas-workspace-e-handoff-fases-4-5.json)
registram merges/reviews/CI/equivalência. Sem nova suíte local ou aceite visual
manual; FAIL histórico de navegação12 e IHFR conservados, causas não comprovadas.
Status automáticos de provedor não são homologação; nenhum deploy manual.
Homologações reais e qualificadores experimentais do IHFR permanecem separados.

Publicação confirmada: [PR documental13](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/13) aberto para development,
branch docs/handoff-frontend-fases-4-5; prompt pode ser usado sem aguardar merge.

## Fases4/5 e correção 022 integradas; fases 6/7 autorizadas — 2026-10-20

`DECISAO_CONFIRMADA`: Pedro, no pedido anexado “Integração dos PRs 13–16 e
handoff das fases 6 e 7”, de 20/10/2026, autorizou esta integração/publicação e o
executor a implementar **ambas as fases 6/7 completas**, validar, fazer commits,
push e abrir/atualizar os dois PRs sem confirmação adicional de rotina. Futuros
merges e aceite humano continuam com o mantenedor. Fases8–10 seguem fora do recorte.

`EVIDENCIA_IMPLEMENTACAO`: #13/28d4459, #14/16aa443, #15/1491d82 e #16/24be57f
integrados nessa ordem, por merge commits, em **development `24be57fa0ddeb9d3da72ae80606850d428e29fbb`**.
#15/#16 redirecionados para development após integrar as dependências; branches
preservadas. Reviews APPROVED técnicos assistidos de PedroVitor237:
5581872118/5581887397/5581901183, nos heads exatos c076ec1/3f1eba5/b85edd8;
nenhuma autoaprovação13 ou review atribuída a terceiro.

CI dos heads14/15/16:15 gates únicos PASS/exit0 por journal oficial conferido;
runs39295724999(tentativa1)/39300023357(tentativa2)/39343103206(tentativa1),
E2E136/154/154, HTTPS2/IHFR6. Não é CI dos merges. Produto/testes/dependências/
configuração final idênticos ao head b85edd8; somente nove diferenças documentais
do13. Main `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054` e trabalhos preexistentes preservados;
development local/remota alinhadas por FF seguro.

Sem nova suíte funcional local, dispositivo físico, leitor de tela, aceite visual
humano ou homologação real. Capturas selecionadas não são auditoria visual
integral; transporte fake de capa não prova provedor real. Falhas históricas
IHFR/duas chamadas permanecem inconclusivas; reprodução022 de quatro operações/
três ondas não prova causa retrospectiva. C01/C02 e os qualificadores
CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e
NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO preservados. Sem deploy solicitado,
operação externa, banco real ou promoção para main.

Próxima execução: **[prompt autossuficiente6/7](docs/plans/active/preparacao-incorporacao-frontend-20261018/prompt-de-execucao-fases-6-7.md)**,
Coletas e Dados ambientais/drafts. Branch docs/handoff-frontend-fases-6-7, criada
da development final; pode ser lida antes do merge documental. Uma spec/branch/PR
por fase; fase7 pode ser empilhada na6 validada sem aguardar merge do mantenedor.
Não implementar fase8 pelo painel IHFR existente no detalhe. [Recibo completo](docs/plans/active/preparacao-incorporacao-frontend-20261018/integracao-fases-4-5-correcao-022-e-handoff-fases-6-7.json).

Publicação deste handoff: [PR documental17](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/17) aberto para development,
branch docs/handoff-frontend-fases-6-7, sem autoaprovação ou auto-merge.
Preparação concluída; documentação aguarda revisão do mantenedor.


## Adendo vigente — fase6 integrada, fase7 pronta e handoff8/9 — 21/10/2026

DECISAO_CONFIRMADA: Pedro, no pedido desta continuação em21/10/2026, autorizou revisão/integração, reservando o último merge funcional ao seu clique; autorizou próximas duas fases e investigação dos históricos após fase10/consolidação visual.

EVIDENCIA_IMPLEMENTACAO: #17 mergeafde5b0; #18 fase6/Spec023 mergeb7401f1, review técnico assistido5595140337 porPedro. **#19 fase7/Spec024 permanece aberto, Ready, base development, head9e11eca, review técnico assistido5595147901 e estado clean; merge não executado.** Development remota b7401f1; main remota beba96f. Estado local não verificado.

CI dos heads18/19:15gates PASS por head, runs39477040095/39478339091 (tentativa1), E2E182/190, Integration229/231, HTTPS2 e IHFR6. Logs conferidos;25testes focais de apresentação/foco/incerteza passaram com transformação temporária TypeScript→.mjs. Sem nova suíte local completa, aceite humano de produto/acessibilidade, dispositivo físico ou validação científica. Merge18 difere do head18 validado só nos nove documentos herdados de17.

Prompt autoriza executar **fase8 IHFR e fase9 mapa/administração**, validar/commitar/push/abrir todos os PRs sem confirmação de rotina; futuros merges ficam com o mantenedor. O início da8 depende da confirmação do merge manual19. Handoff pode ser lido na branch docs/handoff-frontend-fases-8-9 antes do merge documental. Não tratar7 como integrada nem executar10 nesta rodada.

Históricos inconclusivos ficam **agendados após fase10 e consolidação visual**, com evidências preservadas; regressão material atual não é adiada. Sem declaração de causa/resolução definitiva, deploy, operação real de banco/provedores ou promoção para main.

Referências: [prompt8/9](docs/plans/active/preparacao-incorporacao-frontend-20261018/prompt-de-execucao-fases-8-9.md), [plano](docs/plans/active/preparacao-incorporacao-frontend-20261018/plano-de-continuacao-fases-8-9.md), [investigações](docs/plans/active/preparacao-incorporacao-frontend-20261018/investigacoes-pos-consolidacao-visual.md) e [recibo](docs/plans/active/preparacao-incorporacao-frontend-20261018/integracao-fase-6-e-prontidao-fase-7-handoff-fases-8-9.json).


## Atualização vigente — integração verificada e continuação pós-consolidação — 21/10/2026

DECISAO_CONFIRMADA: pedido atual de Pedro nesta conversa autoriza integrar20, conferir brevemente os merges recentes e preparar próximas duas etapas, incluindo correções necessárias.

EVIDENCIA_IMPLEMENTACAO: #20 integrado em b1f83cfa8e52dd25c6246c584a576553c5e9e131, sem autoaprovação. #19 e frentes21–24 já constam integradas; a RC25 e44711d foi incorporada por5f6266b com árvore idêntica à candidata validada. Os heads21–24 são ancestrais da RC. Após20, apenas dez diferenças documentais; produto/testes/configuração equivalentes à RC. Development remotab1f83cf, mainremotabeba96f; máquina local não verificada.

Logs do run39600889091/tentativa1/job119224780858 conferidos:15gates únicos PASS/exit0, E2E220, Integration231, HTTPS2 e IHFR6; resposta Codex do head sem achados. Checagem breve de integração, sem nova suíte local, nova auditoria completa ou aceite humano/científico. Não foi encontrado bloqueio técnico novo nesse escopo.

RECOMENDACAO materializada no novo prompt: A—investigação/correções de defeitos demonstrados; B—homologação/preparação da entrega. As dez fases visuais têm implementação integrada; não há novas fases visuais11/12. Históricos inconclusivos continuam sem encerramento causal. O relatório25 registra403Vercel e aceites humanos/operacionais pendentes; o provedor não foi reconsultado nesta preparação. A autorização operacional relatada na RC deve ter origem/escopo comprovados no contexto que a executar, sem reabrir consentimento de rotina já comprovado nem fabricar autoridade.

O handoff prepara execução técnica posterior à consolidação e não declara aceite humano da copy/produto/acessibilidade. Não houve deploy solicitado, alteração de main, banco/provedor real ou comunicação a participantes nesta preparação. Merges futuros ficam com o mantenedor; texto anterior preservado como histórico.

Próxima execução: [prompt pós-consolidação](docs/releases/2026-10-21-frontend-rc/prompt-pos-consolidacao.md) e [recibo da conferência](docs/releases/2026-10-21-frontend-rc/verificacao-integracao-e-handoff-pos-consolidacao.json).

## Adendo vigente — investigação local HF-INV — 23/10/2026

`DECISAO_CONFIRMADA`: o pedido explícito do usuário nesta sessão autorizou a
missão `HF-INV-20261023-01-LOCAL01`, incluindo experimentos, commits/push, PR e
CI/review. Merge, deploy, provedores e banco hospedado continuam fora do escopo.

`EVIDENCIA_IMPLEMENTACAO`: execução local sobre development
`c4adfb379e5dc78f27f31b91edbd13f43228d9f9`, na branch própria
`fix/investigacoes-intermitentes-20261023-local01`; #27/223839c9 e #28/f56f73f
reconciliadas por fonte imutável, sem importar suas branches ou fazer merge.
Quatro subagentes nativos reais, worktrees e recursos isolados; NAV4 autenticado
e protocolos dos nove IDs executados. Há causa de ingresso demonstrada no NAV4
atual; causas históricas e limitações permanecem individualizadas, sem patch
especulativo de produto ou encerramento causal por PASS posterior.

Estado: `AGUARDANDO_REVISAO`. [Plano da execução](docs/plans/active/investigacoes-intermitentes-20261023/execucao-local-multiagente.md)
e [índice do pacote](docs/releases/2026-10-23-hf-inv-local01/readme.md) substituem
o apontador operacional anterior para esta investigação. No fechamento estático,
quinze gates oficiais e Codex remoto do HEAD final estão NOT_RUN; seus recibos
posteriores identificados por SHA pertencem à conversa da PR nova. A revisão
independente não equivale a aceite humano. Main e trabalho preexistente preservados;
G3–G5 e homologação do piloto dependem de provas/decisões próprias.

IHFR: `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
