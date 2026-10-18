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
