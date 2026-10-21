# Recibo local e entrega ao coordenador — Spec 026

**Data**: 2026-10-21. **Branch**: `feat/frontend-territorial-map`.

Base `development`: `1ea3cc2552c244e1004f4f733f838e0f9ea62993`. Parent planejado da candidata local: seed `b3f65f2ccd8a4b08cf53a1bebf16e3ba33db09a6`. O SHA da candidata será informado após o commit; resultados posteriores de CI/review devem ficar vinculados ao HEAD em recibo externo, sem mudar o código/documentação apenas para transportar um verde antigo.

## Mudança entregue

- Cabeçalho contextual, cartões e hierarquia coerentes com a frente de áreas incorporada e a referência do starter.
- Lista completa com nomes sem truncamento, seleção explícita, painel com localização/instantes e links reais.
- CSS Module local para reflow, foco e controles de zoom; atribuição e avisos de tiles preservados.
- Oito E2E novos: seis combinações de viewport/texto, transporte loading/erro/retry e estados/contexto/back/forward/reload. Fixture com nome de 97 caracteres persistido no banco sintético pelo harness autorizado.
- Helper próprio de captura, reutilizando as funções de geometria/readiness existentes sem alterar o helper compartilhado.
- Nenhuma mudança em DTO, API, backend, schema, rota servidor, algoritmo cartográfico, testes territoriais herdados, CSS global, shell, dependências, CI ou proteção de Preview.

## Execuções locais reais

| Verificação | Resultado | Observação |
|---|---|---|
| Spec Kit setup-plan/setup-tasks/check-prerequisites | PASS | Diretório explícito; metadata local não versionada |
| Primeira execução unitária | FAIL de pré-requisito | Cliente Prisma gerado ausente; arquivo de serviço não iniciou; outros três arquivos passaram |
| Primeiro typecheck | FAIL de pré-requisito | Erros de módulo Prisma ausente e derivados; nenhum erro TS identificado na nova frente |
| `npx prisma generate` | PASS | Cliente 7.4.2 gerado localmente, sem conexão a banco nem alteração de schema/lockfile |
| Unit territorial focal, repetido | PASS | Quatro arquivos passam sob node --test; execução direta confirma 11 casos (3 estado + 3 contratos + 1 OpenAPI + 4 serviço) |
| `npm run typecheck`, após geração | PASS | Exit 0, sem diagnóstico |
| ESLint dos componentes/teste/helper | PASS | Exit 0, sem diagnóstico |
| `git diff --check` | PASS | Sem erro de whitespace |
| E2E territorial existente/novo | NOT_RUN local | Runner oficial Windows/PostgreSQL não executado em Linux |
| CI de 15 gates no HEAD | NOT_RUN nesta frente | Responsabilidade do coordenador após publicação protegida |
| Capturas reais/inspeção | NOT_RUN local | Nenhum PNG demonstrativo ou resultado visual fabricado |
| Codex review independente do HEAD | NOT_RUN nesta frente | Responsabilidade do coordenador após publicar candidata |

O aviso de configuração `http-proxy` do npm foi observado sem impedir geração, typecheck ou lint. Nenhum valor de ambiente, token ou dado real foi registrado.

## Evidências esperadas no CI

`.accounts-validation/frontend-territorial-map/*-frontend-territorial-map-*-viewport.png` e `*-viewport.json`, também anexados ao resultado do Playwright. Nomes incluem identificador de cenário/repetição para não sobrescrever tentativas. Capturas `fullPage:false`, animações observadas, campos de formulário mascarados, sem trace/vídeo, geometria sem texto/URLs/valores.

Matriz: 320×760, 375×900, 768×900, 1440×900, 320×760 com fonte raiz a 200% e 844×390 paisagem. A escala de fonte é registrada como tal, sem alegar zoom nativo. Capturas cobrem mapa, último item focado e última ação focada, além de loading/erro/retry/vazio/inativo. Um controle obstruído gera evidência diagnóstica e falha o teste.

## Próximos passos e limites

1. Coordenador publica somente um HEAD descendente do seed protegido; cria PR Draft contra development.
2. Executa 15 gates/E2E e inspeciona PNG/JSON da candidata; trata FAIL com logs e causalidade, sem reclassificar cancelamento/skip como PASS.
3. Obtém review efetivo do HEAD publicado, corrige achados e revalida cada novo SHA; aceite de mantenedor não é simulado.
4. Registra no recibo externo SHA/parent/tree, run/attempt/job, artifact/digest, resultados individuais, capturas e review.

Leitor de tela, equipamento físico, UX humano e homologação operacional continuam não verificados. Históricos inconclusivos de reset/navegação não são declarados resolvidos. Nenhum merge, push remoto ou deploy foi realizado por esta frente.
