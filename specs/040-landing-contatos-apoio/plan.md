# Implementation Plan: Contatos e apoio institucional da landing

**Branch**: `codex/landing-contatos-apoio` | **Date**: 2026-11-14 | **Spec**: [spec.md](spec.md)
**Input**: `specs/040-landing-contatos-apoio/spec.md`

## Summary

Atualizar a apresentação e o rodapé público com os contatos e apoiadores solicitados. Reutilizar os estilos e incluir um ícone vetorial local do Instagram.

## Technical Context

**Language/Version**: TypeScript; Node 24; Next.js 16.3.8.
**Primary Dependencies**: React e CSS Modules existentes; sem dependências novas.
**Storage**: Conteúdo estático; sem persistência.
**Testing**: Build, lint, typecheck e oito cenários públicos Playwright existentes.
**Target Platform**: Navegadores desktop e mobile.
**Project Type**: Aplicação web Next.js.
**Performance Goals**: Sem novas requisições, pacotes ou scripts de terceiros.
**Constraints**: Preservar visual atual, seções restantes e plataforma autenticada.
**Scale/Scope**: Uma rota pública, seu CSS e atualização da verificação existente.

## Constitution Check

PASS antes e após o desenho: decisão atual registrada, branch/spec próprias, mudança pequena e rastreável, validação proporcional e documentos históricos preservados. Nenhuma alteração científica, de API, schema, dependências ou ambiente.

## Project Structure

- `src/app/page.tsx`: texto, apoiadores e contatos.
- `src/app/landing.module.css`: três colunas e alinhamento do contato com ícone.
- `tests/e2e/frontend-landing.spec.ts`: atualizar asserções existentes.
- `specs/040-landing-contatos-apoio/`: especificação, plano, tarefas e evidências desta entrega.

**Structure Decision**: Manter o Server Component da landing e CSS local. Não criar componentes globais nem serviços.

## Complemento — nome do mascote — 2026-11-15

DECISAO_CONFIRMADA: Pedro solicitou “Hifro”, preferencialmente no canto superior direito dentro da animação, na mesma branch. Incluir texto estático em `src/app/mascot-animation.tsx` e regra local em `src/app/landing.module.css`, herdando a fonte e a cor verde da landing. Posicionar acima da imagem e do vídeo; preservar a reprodução e seus estados. Reutilizar a suíte pública existente e conferir visualmente desktop/mobile, texto ampliado e movimento reduzido.
