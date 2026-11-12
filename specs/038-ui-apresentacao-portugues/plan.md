# Plano de implementação: apresentação em português

**Branch**: `codex/ui-apresentacao-portugues-20261112` · **Data**: 12/11/2026 · **Estado**: IMPLEMENTADO — AGUARDANDO REVISÃO
**Spec**: [spec.md](spec.md)

## Summary

Aplicar FR-001–007 exclusivamente na apresentação: datas, escores, rótulos e composição responsiva. Base limpa `development@bfc4e272165170e605096aa502b054184c76e86e`, árvore `67abd5f53939693ebc681d5948ae6eac21aeb319`. Main tem a mesma árvore. Landing em branch independente, preservada.

## Technical Context

TypeScript, React 19.2.4, Next.js 16.3.8, CSS Modules e Tailwind existentes. Nenhuma dependência nova. Formatação pt-BR determinística; hora civil da ocorrência preservada. Componente de layout continua com um controlador e um formulário, preservando foco e estado ao redimensionar.

Validação: testes existentes de apresentação, conversão temporal, cards, UI044; lint/typecheck/build; browser sintético dos componentes reais, sem banco ou credenciais, com geometrias e navegação. Campos editáveis e números científicos não passam pelo formatador de resultado.

## Constitution Check

PASS antes e após desenho: decisão atual de Pedro rege somente UX; ADR-0001 e qualificadores preservados; sem mudança de domínio, APIs, schema, migrations, autenticação, fórmulas, permissões, variáveis persistidas ou ambientes. Spec própria 038 após maior número 037 existente. Sem hooks em `.specify/extensions.yml`. Nenhuma dúvida material ou pesquisa externa necessária; decisões locais documentadas em research.md.

## Project Structure

- `src/lib/ui-presentation.ts`: formatação de escores e rótulos públicos.
- `src/lib/collection-date-time.ts`: apresentação temporal amigável, adaptadores de entrada intactos.
- `src/components/territorial-map/territorial-map-view.tsx`: confirmação prioritária.
- `src/components/areas/area-collections.tsx`: resumo com escore à esquerda.
- `src/components/collections/collection-detail*.tsx`: dados ambientais antes do registro.
- `src/components/ihfr-diagnosis/**`: precisão, classe inteira e rótulos públicos.
- Demais componentes/páginas: somente traduções de textos efetivamente visíveis.
- `tests/unit/**` e `tests/e2e/support/ui044-final-corrections.ts`: atualização das expectativas afetadas; validação preserva ausência/zero, UTC e identidade do resultado.
- Documentação desta entrega somente em `specs/038-ui-apresentacao-portugues/**`.

## Etapas

1. Inventariar textos e adaptar formatadores sem mudar dados.
2. Implementar mapa, resumo, detalhe e leitura.
3. Traduzir textos editoriais e enums visíveis; manter nomes próprios, dados do usuário, contratos, IDs e hashes.
4. Validar apresentação e invariantes; revisar diff e registrar evidências.
5. Publicar branch e PR para revisão, sem merge ou promoção de ambiente.

## Riscos, limites e pontos de parada

Build global aprovado; o erro de tipos anteriormente relatado na rota de logout não foi reproduzido nesta base. Não há envs nem banco nesta sessão. Nenhuma ação sobre Production/Preview de testes e nenhum uso de dados hospedados. Revisão humana fica para aceite visual final. O resumo usa duas colunas a partir de 640 px e empilha em telas estreitas para preservar leitura e acomodar ampliação de texto.

## Histórico

- 12/11/2026: baseline confirmado, anexos inspecionados, dependências instaladas pelo lockfile e implementação iniciada.
- 12/11/2026: implementação e revisão visual concluídas; 434 + 17 testes unitários e 12 cenários de navegador aprovados. Lint sem erros, typecheck e build aprovados. Evidências e limites em [validation.md](validation.md).
