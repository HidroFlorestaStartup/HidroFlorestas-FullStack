# HF-DOC-20261024-LOCAL01 — evidências Code-First

Pacote documental LOCAL para a frente CHAT. Base examinada `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`; candidata separada `00477e961e36416d8d602d36f7e0ee195c487148`; revisão dos alunos `d2168c840937a6120e32467f24cb46383e8dcd29`. Não é adendo canônico de produto nem execução do escopo CHAT.

## Conteúdo e leitura

- [Matriz técnica](matriz-implementacao.md) e [mesmos registros em JSON](matriz-implementacao.json): IMP-002–009 por subcapacidade e fronteiras IMP-001/010/CRI.
- [Topologia e conteúdo exclusivo](topologia-e-conteudo-exclusivo.md): grupos/paths próprios, ancestralidade, simulações e recomendações de composição.
- [Instrumentos e configuração](instrumentos-e-configuracao.md): seleção real, pré-condições e contenção de deployment.
- [Fontes observadas](fontes-observadas.json): PRs, reviews formais e excertos dos comentários, com data/URL; comentários mutáveis não são tratados como commits.
- [Revisão independente](revisao-independente.md), [validação documental](validacao.json), [manifesto de fontes](manifesto.json) e [handoff](handoff.json).
- [Plano transversal](../../plans/active/hf-doc-20261024/local/plano.md) e fragmentos autorais preservados em `fragmentos/`.

## Conclusões delimitadas

`EVIDENCIA_IMPLEMENTACAO`: o diff development→#29 em `src/**`, `prisma/**`, `package.json` e `package-lock.json` é vazio. Os fluxos técnicos examinados na matriz já estão na base development; não dependem de merge da #29 para serem lidos. A #29 inclui 91 paths de documentação/investigação/configuração focal; não é PR exclusivamente documental.

`FATO_DOCUMENTADO`: backlog linhas20–27 e plano Code-First linhas25–32 conservam estados anteriores de API/telas mockadas ou ausentes. Os adendos CRI ali presentes não atualizam integralmente IMP-002–009. A matriz recomenda ao CHAT um adendo datado e focal, preservando essas fontes. Cada linha informa recorte demonstrado e limites; não há declaração global de todos os critérios concluídos.

`RECOMENDACAO`: usar este pacote para fechar a síntese técnica do CHAT sem aguardar merge das fontes. A integração da #29 exige decisão humana própria; #28 pode ser reconhecida como preparação sucedida, preservando os cinco arquivos de delta exclusivo identificados e sua autoria; #27 deve receber decisão independente e composição focal de evidências/configuração. A topologia explicita alternativa, condições, efeitos e reversão. Nenhuma PR foi integrada ou fechada.

`PENDENCIA_DE_DECISAO`: homologação G3–G5, responsáveis, ciência e aceites humanos continuam em seus eixos próprios. A evidência de testes consultada é histórica e vinculada ao SHA/run/ambiente da fonte. CI funcional **desta missão**: `NOT_RUN`.

## Síntese por IMP

O [registro completo de cada linha](matriz-implementacao.md) contém fontes e limites; este quadro resume o recorte estático e não concede conclusão integral.

| IMP | Implementação localizada | Limite/próximo ato preservado |
|---|---|---|
| IMP-002 | Criação/listagem e configurações mínimas reais de laboratório | Ingresso/convite por código não localizado no recorte; não deduzir gestão completa |
| IMP-003 | Contexto explícito, papéis atuais, criação/lista/detalhe de área-ponto | SC-009/SC-010 humanos permanecem próprios; capa é incremento separado |
| IMP-004 | Coleta, ocorrência temporal, confirmação/idempotência e consulta persistida | Critérios humanos SC-002/SC-007 não são encerrados pela inspeção |
| IMP-005 | Captura/consulta ambiental e draft pessoal015/024 com isolamento e consumo | Captura técnica não valida matemática IHFR; SC-006/T037 humano pendente |
| IMP-006 | Manifesto/avaliador, elegibilidade, leitura, escrita/revogação e recuperação versionadas | Contrato experimental; vetores científicos, campo e aceites humanos pendentes |
| IMP-007 | Resumo e histórico derivados de fontes persistidas | SC-008/SC-009 de tecnologia assistiva e estudo moderado permanecem próprios |
| IMP-008 | Mapa mínimo Leaflet/React-Leaflet, lista/fallback/contexto e navegação | Gráficos Plotly futuros ausentes; p95/EXPLAIN, tecnologia assistiva e estudo moderado não verificados |
| IMP-009 | Administração global conectada, concorrência otimista e auditoria | Tecnologia assistiva e política de retorno de conta ativada a PENDING pendentes |

Fronteiras: IMP-001 registra somente a sessão necessária aos fluxos; IMP-010 continua UX humana, distinta da spec010 de cadastro. CRI inclui mail/012/013/014/015/016; presença de código não homologa SMTP, scheduler, exclusão ou Cloudinary reais. O pacote contém40 registros:37 cadeias estáticas localizadas,2 ausências delimitadas e1 recorte de aceite humano sem estado técnico aplicável. Nenhuma dessas contagens mede cobertura percentual de requisitos.

## Publicação e passagem ao CHAT

`PUBLICACAO_BLOQUEADA_POR_GATILHO`: a branch `docs/hf-doc-local01-20261024` não tem contenção de deployment comprovada. O mandato proíbe alterar configuração para publicar. A entrega permanece em arquivos/commit **locais**, sem push/ref remoto/PR ou comentário nas PRs27–29. Permissão GitHub admin observada não afasta essa restrição. Revisão remota desta missão não foi solicitada: `NOT_REQUESTED_PUBLICATION_BLOCKED`; nenhum parecer remoto foi herdado.

O CHAT deve receber os documentos integrais deste diretório, o plano e o recibo final da sessão; ler `handoff.json`, recalcular os hashes dos arquivos e conferir os SHAs de base/candidata/alunos. Se sua base divergir, comparar paths e delimitar novamente o snapshot quando houver deriva executável. Não interpretar o SHA do commit local como publicação remota. Manifesto não inclui seu próprio hash ou o handoff; handoff referencia o manifesto e as evidências, sem ciclo. O recibo posterior informa o SHA local final, fora do próprio commit.

## Ledger sanitizado e método

| ID lógico | Tarefa exclusiva | Evidência operacional sanitizada |
|---|---|---|
| L-C | preflight/plano/agregação/instrumentos/fontes/manifestos/handoff/validação | coordenador desta sessão, ownership definido antes da delegação |
| L-A | IMP-002–005 e fronteira001, fragmentos próprios | criação nativa confirmada; resultado nos dois fragmentos exclusivos |
| L-B | IMP-006–009, fronteiras010/CRI e topologia | criação nativa confirmada; resultado nos dois fragmentos e topologia |
| L-R | revisão independente de todas as linhas e recomendações | criação nativa confirmada; parecer próprio sem editar autores |

Três subagentes reais por `collaboration.spawn_agent`; ledger privado em diretório temporário registra os nomes operacionais retornados, correspondência de ownership e esforço `ultra` solicitado/aceito pelo delegador. Não publicar IDs internos desnecessários ou caminhos locais absolutos. O runtime raiz e seu esforço efetivo não estão expostos por ferramenta; não se afirma configuração Ultra da raiz. Não houve rotação de modelo.

A skill instalada `speckit-analyze` foi lida; exige feature com `tasks.md` gerado e não se aplica integralmente a missão transversal. Foi usado método documental equivalente: constituição, autoridade, inventário por subcapacidade, rastreabilidade e revisão independente. Não foram executados comandos de feature, hooks, instalação/atualização Spec Kit, scripts de aplicação ou testes. Não se criou IMP novo, TASKS global ou OpenSpec.

## Limites e preservação

O checkout inicial, suas nove entradas não rastreadas e seis worktrees preexistentes foram preservados. Não se leu o arquivo privado de demonstração, env ou credenciais. Apenas os dois prefixos LOCAL autorizados recebem mudanças. Registros canônicos permanecem para o CHAT; a eventual necessidade de apontadores não autoriza LOCAL a editá-los.

Sem aplicação, build, browser, banco, SMTP, Cloudinary, deploy, merge, e-mail, nova investigação HF-INV ou configuração. Verificação automatizada própria é somente documental (JSON/links/hashes/escopo/whitespace). Não houve aceite humano ou científico.

IHFR permanece `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
