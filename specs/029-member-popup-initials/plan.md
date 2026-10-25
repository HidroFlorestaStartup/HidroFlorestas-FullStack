# Implementation Plan: Iniciais dos membros no popup geral

**Branch**: `fix/hf-night-fr015-20261025` | **Date**: 2026-10-25 | **Spec**: [spec.md](spec.md)

**Input**: `specs/029-member-popup-initials/spec.md`; missão HF-NIGHT-01.

## Summary

`RECOMENDACAO`: corrigir somente a apresentação da lista em `LaboratoryWorkspace`, usando `LaboratoryDetailsDto.members[].initials` junto de `name`. Aplicar CSS local para avatar circular neutro e nomes extensos. Manter `SettingsDialog`, fetch, parser, serviço e contratos sem alteração. Provar o delta com navegador isolado e respostas sintéticas, sem banco ou servidor Next.

## Technical Context

**Language/Version**: TypeScript 5, Node >=24.19 <25 conforme package.json.

**Primary Dependencies**: Next 16.3.8, React 19.2.4, CSS Modules existentes; sem nova dependência.

**Storage**: sem alteração ou acesso.

**Testing**: Playwright Chromium com esbuild para montar o componente real e CSS Modules; node:test nos contratos/serviço existentes; ESLint focal e TypeScript quando Prisma gerado estiver disponível.

**Target Platform**: navegador desktop/móvel, 320px e 1280px, com teclado.

**Project Type**: aplicação web Next App Router existente.

**Performance Goals**: nenhuma chamada extra para avatar; lista continua linear sobre os membros recebidos.

**Constraints**: não alterar rede, schema, autenticação, membership, vercel.json ou docs/raw; nenhum serviço externo/SMTP real; dados exclusivamente sintéticos.

**Scale/Scope**: uma lista no popup geral; dados nome/iniciais já permitidos.

## Constitution Check

Pré-pesquisa: PASS nos sete princípios. I: missão atual e C1 distinguem intenção/evidência; II: pequeno resultado verificável; III: artefatos somente na spec029; IV: FR-015 da spec002 ligado a C02/IMP-002 e CF-PRD-FR-003, sem confundir CF-PRD-FR-015; V: somente DTO público/testes sintéticos; VI: fontes históricas preservadas e evidência local nesta spec; VII: worktree/branch exclusiva sem arquivos globais compartilhados.

Pós-design: PASS. Não há entidade, endpoint, privilégio ou decisão científica novos. Fallback e avatar decorativo são recomendações técnicas no escopo autorizado. Homologação humana, operação real e ciência continuam independentes.

## Project Structure

### Documentation (this feature)

```text
specs/029-member-popup-initials/
  spec.md
  plan.md
  research.md
  data-model.md
  contracts/member-popup.md
  quickstart.md
  checklists/requirements.md
  checklists/ux.md
  tasks.md
  implementation-evidence.md
```

### Source Code (repository root)

```text
src/components/workspace/laboratory-workspace.tsx  # única apresentação alterada
src/components/workspace/workspace.module.css     # estilos locais da lista
tests/ui/member-popup.spec.ts                      # navegador/fixtures sintéticas
tests/ui/member-popup.config.ts                    # runner isolado sem servidor/banco
```

**Structure Decision**: reutilizar os componentes existentes sem extrair abstração ou mudar a lista OWNER. Harness de navegador segue o padrão offline já presente em tests/ui/pre-lovable.spec.ts; config própria evita modificar o runner existente.

## Phase 0: Research

[research.md](research.md) registra fontes, alternativas e decisões locais recomendadas. Sem esclarecimentos materiais pendentes. Guias Next de Client Components/CSS devem ser lidos da instalação local antes de escrever código.

## Phase 1: Design & Contracts

[data-model.md](data-model.md) delimita a projeção existente; [contracts/member-popup.md](contracts/member-popup.md) define a apresentação; [quickstart.md](quickstart.md) descreve a execução sintética. Avatar circular 36px, não interativo, mesmas cores para todos. Nome com min-width:0/quebra de palavra e linha limitada ao popup. Campos usam trim e fallback sem recomputar iniciais.

## Implementation and validation order

Spec → plan → checklist de requisitos UX → tasks → analyze somente leitura → revisão explícita do checklist pelo coordenador → implement. Escrever regressão, demonstrar falha no baseline, aplicar dois arquivos de apresentação, obter PASS e executar converge após implementar. Registrar comandos, contagens, limites e verificações não executadas. Nenhum commit/push/PR pelo autor antes da revisão independente.
