# Estado reconciliado e decisões da candidata de frontend

Registro de execução de 2026-10-21. Não substitui o handoff de Pedro, os documentos históricos nem o aceite humano. Resultados de CI/revisão posteriores a este commit serão vinculados por recibos nas PRs, sem atribuir a um novo SHA a validação de um ancestral.

## Fontes verificadas

| Fonte | Identificação | Tratamento |
|---|---|---|
| Plano mestre conciliado v2 e prompt C1 conciliado | Artefatos de 21/10/2026 indicados pelo usuário em “Execute Release Candidate” | Referência de execução autorizada nesta conversa; limites humanos/operacionais preservados |
| Pacote conciliado ZIP | SHA-256 `e8ad42b550a0e42c7dc8a6f951567c32d512ced05abe135dd700dd9edc6abd62`; CRC íntegro; plano/prompt iguais aos arquivos lidos individualmente | Inclui registro de conciliação e versões anteriores; não é código da candidata |
| Handoff de Pedro | [PR #20](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/20), HEAD `e057105f4532b28662249735608e869e3814ef8c` | Fonte técnica lida diretamente, sem editar seu checkpoint histórico |
| Repositório oficial | `HidroFlorestaStartup/HidroFlorestas-FullStack` | Único repositório de entrega |
| Development consultado | `1ea3cc2552c244e1004f4f733f838e0f9ea62993` | PRs #17–#19 já integradas; não repetir seus merges |
| Main consultado | `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054` | Identificação do checkpoint; não recebe alteração nesta feature |
| Seed compartilhada | `b3f65f2ccd8a4b08cf53a1bebf16e3ba33db09a6`, parent development acima | Somente CI/Preview das três frentes C1, sem branch-base remota |
| Starter visual | `HidroFlorestaStartup/hidroflorestas-frontend-starter@cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f` | Referência visual somente leitura |
| Anexo antigo `01-HidroFloresta-v1.0.zip` | SHA-256 `0017dfdd150641344665c3b49abea9d5fbd5bc28f30935bd9e62cda40550db40`, HEAD interno `97d95583fa62ed1f3dc88f7a7c69e150afddb968` | Histórico preservado, não usado como baseline atual |

`EVIDENCIA_IMPLEMENTACAO`: hashes, estado Git, CRC e comparação dos arquivos foram conferidos nesta execução. O conteúdo do handoff é `FATO_DOCUMENTADO`; aprovação de uma implementação futura não decorre dessa leitura.

## Frentes e isolamento

| Missão | Branch | Spec | Responsabilidade |
|---|---|---|---|
| C1: IHFR | `feat/frontend-ihfr` | 025 | Agente real de IHFR; apresentação/qualificações, sem cálculo novo |
| C1: mapa | `feat/frontend-territorial-map` | 026 | Agente real territorial; mesmo DTO/Leaflet/lista/autorização |
| C1: administração | `feat/frontend-user-administration` | 027 | Agente real de administração; frontend, revisão/conflito e auditoria |
| C2: landing | `feat/frontend-landing-consolidation` | 028 | Coordenador; página pública, conteúdo e CSS local |
| C3: composição | `release/frontend-rc-20261021` | Recibo agregado | Coordenador; candidata isolada e regressão, sem presumir merge humano |

O coordenador é o único escritor de workflow/Preview. A seed precede as referências remotas C1; esta feature acrescenta proteção explícita de landing/agregada e caminhos restritos de evidência. YAML e JSON foram interpretados e os allowlists comparados. A restrição no repositório não demonstra estado externo da Vercel.

## Revisão da copy pública

`PROPOSTA` para aceite institucional do mantenedor/coordenação. O usuário autorizou a implementação da candidata; a aprovação final da copy não é simulada.

| Conteúdo anterior | Alteração candidata | Origem e razão |
|---|---|---|
| Marca textual improvisada | Logo autêntico existente | Asset versionado do projeto |
| Links `#solucao`/`#projeto` sem seção correspondente | Navegação com destinos existentes, acesso e cadastro reais | Falha observada por GET da aplicação antes da alteração |
| “MVP Ativo” e cartões de salinização/SAF/restrição pedológica | Ilustração institucional existente e descrição das jornadas reais | Os cartões não eram diagnósticos provenientes da aplicação |
| Capacidade corrente de IA/LLM e integração geológica/satélite | Descrição de áreas, coletas, medições e leitura experimental | Não transferir capacidade do texto comercial para contrato implementado |
| Impacto em 70 comunidades e 10 mil usuários | Objetivos do projeto sem estatística de resultado | Números sem evidência de impacto identificada nesta entrega |
| Kit/restauração como solução pronta | Frentes de pesquisa e proposta de kit | Distinguir objetivo institucional de função já entregue |
| Qualificação científica insuficiente na página pública | Quatro qualificações visíveis do ADR-0001 | Preservar o alcance experimental do IHFR v0.1 |
| Equipe, IFMA, edital, período e contato | Preservados a partir da página existente | Não foi realizada nova verificação institucional; aceite final permanece humano |

## Critérios de fechamento

- C1/C2: diffs coerentes, testes e 15 gates do HEAD final de cada PR; revisão independente efetiva; imagens de viewport abertas e analisadas.
- C3: árvore agregada sem mudanças de domínio, PRs/parents rastreados, 15 gates e revisão do SHA agregado. Verde isolado não comprova a integração.
- Históricos: [triagem focal](triagem-historicos.md); inconclusivo não significa resolvido.
- C4: [handoff operacional](homologacao-e-entrega.md), acesso e aceites reais. Não inferir homologação de serviços a partir de CI sintético.

## Limites atuais de acesso e autoridade

`EVIDENCIA_IMPLEMENTACAO`: consulta somente leitura à Vercel retornou **403** para `hidrofloresta-8598`, equipe `team_YqedIK09zOGFeZ8M84kra0oM`. Estado: `VERCEL_NOT_VERIFIED`. Nenhum outro projeto é criado como contorno. Não afirmar ausência de deployments.

`PENDENCIA_DE_DECISAO`: merges em development/main, revisão institucional, aceite humano/operacional e GO da publicação são dos responsáveis definidos no plano. A candidata e a evidência devem estar concretas antes dessa decisão. Nenhum parecer é emitido em nome de Pedro ou Luciano.

Não foi necessário acionar o Codex local L1: implementação e validações seguem no chat e no CI. Dependências, schemas, contratos e cálculo científico não são ampliados pela fase visual.
