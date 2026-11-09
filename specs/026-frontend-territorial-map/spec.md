# Feature Specification: apresentação do mapa territorial

**Feature Branch**: `feat/frontend-territorial-map`

**Created**: 2026-10-21

**Status**: Draft — implementação e verificação focal; aceite final condicionado ao CI e à revisão da candidata.

**Input**: C1 conciliada, frente B/fase 9A: incorporar a composição visual aprovada como referência ao mapa real, preservando contratos, autorização, alternativa textual, Leaflet, SSR, estados e navegação.

## Fontes e estado inicial

- `DECISAO_CONFIRMADA`: solicitação de execução do usuário e atribuição do coordenador em 21/10/2026, com três frentes independentes, especificação própria e proibição de merge/deploy nesta C1.
- `EVIDENCIA_IMPLEMENTACAO`: `development` em `1ea3cc2552c244e1004f4f733f838e0f9ea62993`; esta frente deriva do commit comum `b3f65f2ccd8a4b08cf53a1bebf16e3ba33db09a6`, com proteção de CI/Preview preparada pelo coordenador. A worktree estava limpa antes da implementação.
- `EVIDENCIA_IMPLEMENTACAO`: Spec 008 e `src/components/territorial-map/**` definem a projeção territorial somente de leitura, lista equivalente e um motor Leaflet; o contrato não oferece filtros ou camadas analíticas.
- `EVIDENCIA_IMPLEMENTACAO`: starter `hidrofloresta-frontend`, commit `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`, especialmente `src/routes/dashboard.laboratories.$laboratoryId.map.tsx` e componentes de mapa. A referência contribui com composição, espaçamento e estados; seus mocks, roteador e dados demonstrativos não são fonte de domínio.
- Handoff técnico de Pedro: `docs/plans/active/preparacao-incorporacao-frontend-20261018/prompt-de-execucao-fases-8-9.md`, branch `docs/handoff-frontend-fases-8-9`; plano conciliado e prompt C1 de 21/10/2026. As investigações históricas amplas ficam para depois da fase 10, salvo defeito material atual.
- Governança: `AGENTS.md`, constituição, `docs/governance/SOURCE_AUTHORITY.md`, `docs/code-first-prd/README.md`, Spec 008 e contratos implementados prevalecem sobre escolhas visuais incompatíveis.

## User Scenarios & Testing

### User Story 1 — Ler áreas e alcançar os registros de origem (Priority: P1)

Como participante autorizado de um laboratório, quero identificar o contexto, selecionar uma área pelo mapa ou pela lista e abrir sua área/coletas confirmadas, mantendo a mesma informação e os mesmos destinos em ambos os caminhos.

**Why this priority**: a alternativa textual e a integridade do contexto são o núcleo do mapa mínimo; a nova apresentação não pode alterá-los.

**Independent Test**: abrir o mapa com a fixture oficial, comparar as áreas do endpoint real com lista e marcadores, selecionar por teclado e verificar os destinos de área/coleta.

**Acceptance Scenarios**:

1. **Given** um laboratório autorizado com áreas e coletas, **When** o mapa carrega, **Then** o cabeçalho identifica o laboratório, cada área aparece uma vez na lista e cada ponto válido aparece uma vez no mapa, com contagens derivadas da mesma resposta.
2. **Given** uma área com coleta confirmada, **When** sua seleção ocorre pela lista ou pelo marcador, **Then** o painel mostra o mesmo nome, coordenadas, contagem, instantes e destinos contextuais, com seleção anunciada textualmente.
3. **Given** áreas com ponto coincidente ou localização indisponível, **When** o participante usa a lista, **Then** cada área continua identificável e selecionável, sem inventar posição.

### User Story 2 — Usar a interface em telas estreitas e por teclado (Priority: P1)

Como participante em dispositivo pequeno ou com texto ampliado, quero ler os nomes completos, reconhecer meu foco e alcançar o último item e sua ação sem obstrução pela navegação fixa.

**Why this priority**: a apresentação deve funcionar no shell real, não apenas em imagens estáticas de desktop.

**Independent Test**: executar os percursos de lista, seleção, link final e controles em 320, 375, 768 e 1440 px, incluindo 320 px com texto a 200% e paisagem, registrando geometria e capturas do viewport.

**Acceptance Scenarios**:

1. **Given** qualquer largura da matriz, **When** a página exibe lista, mapa e detalhe, **Then** os conteúdos principais não rolam horizontalmente e nomes/coordenadas quebram sem truncamento essencial.
2. **Given** foco por teclado em item, retry ou destino, **When** o participante percorre e ativa a ação, **Then** o foco é visível e o controle pode ser trazido ao viewport sem ficar coberto pelo header/nav.
3. **Given** texto ampliado, **When** o participante seleciona o último item da lista, **Then** a seleção é mantida e a ação do painel permanece alcançável.

### User Story 3 — Entender indisponibilidade e recuperar a leitura (Priority: P1)

Como participante, quero distinguir falha de dados de falha cartográfica e tentar a leitura novamente sem perder a lista quando só os tiles falham.

**Why this priority**: estados claros impedem interpretar erro como ausência de áreas e mantêm o percurso útil sem tiles.

**Independent Test**: atrasar/falhar apenas o transporte para o endpoint real, verificar loading/erro, liberar o endpoint e ativar retry; bloquear tiles e verificar lista/destinos; abrir laboratórios reais da fixture vazio e inativo.

**Acceptance Scenarios**:

1. **Given** leitura pendente, **When** a tela é exibida, **Then** o carregamento é anunciado sem mostrar zero ou dados antigos.
2. **Given** falha de leitura, **When** “Tentar novamente” é ativado por teclado e o transporte é restaurado, **Then** uma nova leitura real é feita e somente a resposta atual aparece.
3. **Given** tiles indisponíveis, **When** os dados autorizados carregaram, **Then** o aviso cartográfico é separado do estado dos registros e lista, coordenadas e links continuam completos.
4. **Given** laboratório vazio ou inativo, **When** sua rota é aberta, **Then** o estado é explícito e as capacidades seguem o contrato real, sem ação de escrita no contexto inativo.
5. **Given** navegação entre laboratórios e retorno/reload, **When** a nova rota é carregada, **Then** nenhum marcador, seleção ou resposta tardia de outro contexto é reaproveitado.

### Edge Cases

- Nome longo com e sem espaços, coordenada negativa e texto a 200%: quebra de linha, sem truncamento do dado essencial.
- Zero coletas, várias coletas ou coleta parcial: a projeção continua mostrando somente confirmadas, sem contador visual independente.
- Zero áreas: estado vazio, sem mapa fictício; laboratório inativo conserva leitura e não recebe CTA de escrita.
- Uma área, pontos coincidentes e área sem localização: enquadramento existente e lista completa preservados.
- Falha parcial/total ou ausência de configuração de tiles: manter o classificador existente e atribuição, sem trocar de provedor silenciosamente.
- Erro do componente cartográfico: fallback da fronteira de erro permanece separado da lista.
- Resposta atrasada, contexto sem acesso e vínculo inválido: limpeza/abort e guard servidor permanecem obrigatórios.

## Requirements

### Functional Requirements

- **FR-001**: A apresentação MUST consumir exclusivamente a projeção territorial autorizada existente para o laboratório atual, usando a mesma coleção de áreas no mapa e na lista, sem nova consulta, contador ou persistência de domínio.
- **FR-002**: O cabeçalho MUST identificar o contexto e seu estado ativo/inativo; cartões, hierarquia e espaçamento MUST acompanhar a composição visual já incorporada às áreas e a referência do starter, com CSS isolado desta frente.
- **FR-003**: A lista MUST preservar todas as áreas autorizadas, coordenadas limitadas à precisão vigente, contagens reais e seleção por identidade estável, incluindo localização indisponível e pontos coincidentes.
- **FR-004**: Seleção pelo mapa ou pela lista MUST apresentar o mesmo painel de área/coletas e os mesmos links contextuais, sem mudar a ordem de domínio, destinos ou elegibilidade de coletas.
- **FR-005**: Marcadores, itens da lista, retry e destinos MUST manter nomes acessíveis, operação por teclado, foco perceptível e seleção textual; controles locais MUST ter alvo de pelo menos 44 px quando aplicável.
- **FR-006**: O conteúdo principal MUST refluír em 320, 375, 768 e 1440 px e em 320 px com texto a 200%, sem rolagem horizontal e sem obstrução das ações finais. Paisagem MUST manter a navegação possível por rolagem.
- **FR-007**: Loading, vazio, erro/retry, sucesso, localização indisponível, laboratório inativo e falha cartográfica MUST permanecer distinguíveis, com mensagens sanitizadas e sem mocks de fallback.
- **FR-008**: Configuração, atribuição e estados de tiles MUST ser preservados; indisponibilidade cartográfica MUST manter a lista, o painel e os destinos. A atribuição de terceiros MUST ser legível e alcançável.
- **FR-009**: O limite cliente do Leaflet e o guard do servidor MUST permanecer; troca de contexto, retry e desmontagem MUST conservar o descarte de resposta antiga e a seleção vazia para nova leitura.
- **FR-010**: A feature MUST preservar a Spec 008: nenhum filtro novo, camada analítica, score, legenda de risco, polígono, cluster, segundo motor, MapBiomas, Plotly, Python, schema ou contrato novo.
- **FR-011**: A prova automatizada MUST exercitar o aplicativo e o endpoint reais no ambiente sintético oficial; interceptações MUST limitar-se a atraso/falha de transporte, sem fabricar sucesso, dados ou capacidades.
- **FR-012**: Evidências MUST registrar viewport, escala de texto, geometria/foco/rolagem e capturas sanitizadas `fullPage:false` em `.accounts-validation/frontend-territorial-map/`, distinguindo observação automatizada, inspeção visual e aceite humano pendente.

### Key Entities

- **Contexto do laboratório**: identidade, nome e capacidade de leitura; já resolvido no servidor.
- **Área territorial**: identidade, nome, ponto válido ou nulo e coletas confirmadas, vindos do DTO existente.
- **Coleta territorial**: identidade e instantes de ocorrência/confirmação usados para distinguir e abrir o registro real.
- **Seleção transitória**: identidade da área dentro da resposta atual; não gera persistência, mutação ou inferência espacial.
- **Estado cartográfico**: disponibilidade dos tiles; independente da obtenção dos registros.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Na fixture real, 100% dos itens, marcadores válidos, contagens e destinos correspondem ao contexto autorizado; zero campos proibidos ou coletas parciais entram na projeção.
- **SC-002**: Nas seis combinações de viewport/texto previstas, a pessoa pode selecionar a última área e alcançar o link final, com overflow horizontal igual a zero e geometria não obstruída no momento da ação.
- **SC-003**: Em todos os cenários de dados pendentes/erro/retry, vazio, inativo e tiles bloqueados, o estado é explícito e a retomada usa os dados reais, sem sucesso fabricado.
- **SC-004**: A navegação entre dois laboratórios, retorno e reload não mantém seleção ou registros de outro contexto.
- **SC-005**: O recibo final da candidata identifica o SHA testado, os resultados efetivos, as capturas inspecionadas e as limitações; nenhum NOT_RUN é promovido a PASS.

O uso de equipamento físico, leitura por tecnologia assistiva e aceite UX humano permanecem `NAO_VERIFICADO` até registro próprio; automação não substitui essas avaliações.

## Assumptions

- O contrato da Spec 008 permanece vigente. A fase 9A é visual e não reabre decisões científicas ou espaciais.
- A marcação e os componentes de áreas já incorporados servem de referência local de estilo; nomes completos têm precedência sobre o truncamento demonstrativo do starter.
- O coordenador executa CI Windows oficial, publica branches/PRs Draft e recolhe revisão externa no HEAD final. Esta frente não executa runner de PostgreSQL Windows em Linux nem publica ref remota.
- O código não necessita de dependência nova, edição de CSS global, shell, backend ou schema.
- O histórico de navegação/reset cartográfico é preservado como hipótese de investigação pós-fase 10; um FAIL atual deve ser tratado com causalidade, sem enfraquecer assertions.

## Out of Scope

Alterações científicas, backend, autorização, contratos, persistência, filtros/camadas, SDKs novos, deploy, merge, autenticação real, dados de produção e declarações de homologação humana.
