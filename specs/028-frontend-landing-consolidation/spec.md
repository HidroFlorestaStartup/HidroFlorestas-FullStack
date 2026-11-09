# Especificação: landing e consolidação visual

**Branch**: `feat/frontend-landing-consolidation`

**Criada**: 2026-10-21

**Estado**: implementação candidata; aceite institucional e publicação pendentes

**Entrada**: executar C2 do plano mestre conciliado v2, preservando as fontes técnicas de Pedro e a separação entre implementação, ciência e homologação.

## Fontes e autoridade

- `DECISAO_CONFIRMADA`: solicitação do usuário nesta execução para executar o plano conciliado e consultar os quatro artefatos de 21/10/2026. Não é aceite em nome dos revisores humanos.
- `EVIDENCIA_IMPLEMENTACAO`: `development@1ea3cc2552c244e1004f4f733f838e0f9ea62993`, após PRs #17–#19; seed compartilhada `b3f65f2ccd8a4b08cf53a1bebf16e3ba33db09a6`.
- `FATO_DOCUMENTADO`: handoff de Pedro, branch `docs/handoff-frontend-fases-8-9@e057105f4532b28662249735608e869e3814ef8c`, em `docs/plans/active/preparacao-incorporacao-frontend-20261018/`.
- `PROPOSTA` (referência visual): `hidroflorestas-frontend-starter@cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`; composição, hierarquia e espaçamento. Não autoriza mocks, novo domínio ou novas dependências.
- Intenção de produto: `docs/code-first-prd/README.md`, `specifications/use-cases.md` e `specifications/user-stories.md`; apresentar as jornadas implementadas IMP-002/003/004/005/006/008, sem estender seus contratos.
- Fonte científica: `docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md`.

## Cenários de uso e testes

### US1 — Compreender a plataforma e iniciar o acesso (P1)

Uma pessoa visitante identifica a marca, entende a organização por laboratório e encontra o acesso e o cadastro reais.

**Teste independente**: abrir `/`, percorrer a página pelo teclado e acessar `/login` e `/register` sem sessão, dados sintéticos exibidos como resultados ou âncoras inexistentes.

1. Dada a página pública, ao acionar “Entrar”, a pessoa chega à rota de login existente.
2. Dada a página pública, ao acionar “Criar conta”, a pessoa chega ao cadastro existente; a landing não modifica a política de participação no laboratório.
3. Dada navegação por teclado, o primeiro atalho permite ir ao conteúdo principal; todas as âncoras apontam a seções presentes.

### US2 — Entender limites e contexto institucional (P1)

Uma pessoa distingue funções implementadas, o IHFR experimental e os objetivos do projeto.

**Teste independente**: verificar as quatro qualificações científicas e a ausência de números de impacto sem fonte, diagnósticos fictícios e promessa de LLM/integradores ainda não implementados.

1. Ao ler a seção IHFR, a pessoa encontra contrato experimental, validação científica pendente, possibilidade de recalibração e ausência de aprovação como contrato científico definitivo.
2. Informações de equipe, apoio, edital e contato existentes são preservadas como contexto institucional, sem acrescentar resultados ou nova aprovação.
3. Kit de campo e restauração são apresentados como frentes do projeto, sem sugerir que o sistema já prescreve intervenção ou que houve impacto comprovado.

### US3 — Usar a página em telas pequenas e com ampliação (P2)

Uma pessoa usa os links e lê o conteúdo a 320, 375, 768 e 1440 px, com texto ampliado a 200% e em paisagem, sem sobreposição nem rolagem horizontal da página.

**Teste independente**: navegador real servindo a aplicação, geometria dos controles e capturas de viewport. Simulação Chromium não substitui aceite humano ou dispositivo físico.

### Casos de borda

- JavaScript indisponível: o conteúdo público e os links nativos continuam acessíveis.
- Texto ampliado e palavras longas: cartões e navegação reorganizam-se; conteúdo não é recortado.
- Preferência de movimento reduzido: a página não exige animações para leitura/interação.
- Acesso institucional sem sessão: não há consulta de diagnóstico privado, métricas de usuários ou dados operacionais na landing.

## Requisitos funcionais

- **FR-001**: usar a marca existente, um `main`, hierarquia de títulos, links nomeados e foco visível.
- **FR-002**: conectar CTAs a `/login` e `/register`; cada âncora deve existir e ter destino legível.
- **FR-003**: descrever áreas-ponto, coletas/medições e IHFR com proveniência conforme comportamento existente, sem acrescentar capacidade científica.
- **FR-004**: exibir as quatro qualificações do ADR-0001 em linguagem compreensível e rastreá-las nesta spec.
- **FR-005**: preservar equipe, apoio, edital, período e contato já publicados no código; alterações de redação são propostas para revisão do mantenedor.
- **FR-006**: usar estilos locais, imagens existentes e dependências travadas; não alterar auth, contratos, schema, motor IHFR ou configuração global de layout.
- **FR-007**: validar viewport, reflow e controles reais; artefatos devem conter somente conteúdo público, geometria e identificação sanitizada do cenário/HEAD.
- **FR-008**: proteger a branch da landing e a futura candidata agregada contra Preview desde a primeira referência remota; preservar os 15 gates oficiais.
- **FR-009**: registrar triagem INV001–005 e OBS001–002 com evidência, prioridade, condição de investigação e estado explícito; CI verde não prova causa histórica.

## Critérios de sucesso

- **SC-001**: todos os links de acesso e âncoras têm destino válido; navegação por teclado comprovada em navegador real.
- **SC-002**: não há overflow horizontal a 320/375/768/1440 px, 200% de texto e paisagem; alvos de ação permanecem operáveis.
- **SC-003**: as quatro qualificações científicas aparecem visivelmente; nenhum cartão representa diagnóstico/impacto inventado.
- **SC-004**: gates oficiais e revisão independente são vinculados ao HEAD publicado, com pendências externas explicitadas e sem marcar testes não executados como PASS.

## Premissas e limites

- Não há nova entidade ou persistência. A landing é pública e não envia mensagens.
- Copy institucional final e aceite humano permanecem com o mantenedor/coordenação. A candidata pode ser implementada e testada antes desse aceite.
- Acesso Vercel ao escopo do projeto está bloqueado por 403 nesta execução; proteção no Git não comprova estado do provedor.
- `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO` são preservados.
