# Validação — 2026-11-14

## Base e escopo

- Base: development/main `1552348b7e9e708ffb00757a78943cc9d137dfaf`.
- Branch: `codex/landing-contatos-apoio`, worktree inicialmente limpo.
- Alterados: `src/app/page.tsx`, `src/app/landing.module.css`, duas expectativas do teste público existente e documentação desta feature.
- Checklist da especificação: 16/16 atendidos antes da implementação; sem hooks de extensão configurados.
- Nenhuma alteração da plataforma autenticada, APIs, schema, migrations, dependências, configuração ou banco.

## Resultados

- `npm ci`: 562 pacotes instalados a partir do lockfile, sem sua alteração.
- Primeiro build identificou que lucide-react instalado não exporta Instagram. Corrigido com SVG local, sem dependências adicionais.
- `npm run build`: PASS, Next.js 16.3.8/Turbopack e geração estática concluídos.
- `npm run typecheck`: PASS.
- `npm run lint`: PASS, zero erros e dois avisos preexistentes (`useAuth` e `className` em componentes não alterados).
- `tests/e2e/frontend-landing.spec.ts`: 8/8 PASS em 8,1 segundos, Chromium Headless Shell. Configuração temporária pública `/tmp/hf040-playwright.config.mjs`, build real em localhost, sem fixtures, login ou acesso a banco.
- Cobertura existente: 320/375/768/960/1440 pixels, 812×375, texto 200% em 320 pixels e navegação por teclado para Login/Criar conta.
- Revisão adicional do rodapé: capturas inspecionadas em 1440 pixels e 320 pixels/texto 200%; geometria e contatos também conferidos em 960 e 375 pixels. Sem rolagem horizontal ou erro JavaScript observado.
- Confirmados no DOM: e-mail/mailto novos, @/destino Instagram e ícone decorativo; AGiFMA/FAPEMA presentes; coluna Projeto ausente. Nova apresentação e segundo parágrafo preservado comprovados pela suíte existente.
- `git diff --check`: PASS; inspeção de escopo sem arquivos de outras frentes.

## Limites e entrega

Validação da landing pública em Chromium emulado; não equivale a aceite visual humano, validação de dispositivos físicos ou auditoria integral de acessibilidade. Não foram enviadas mensagens por e-mail/Instagram nem executados fluxos autenticados, suites de banco ou testes científicos, pois não pertencem ao recorte.

Pacote preparado para publicação em branch própria e PR para development, mantendo o merge para decisão de Pedro. O recibo da PR identifica o commit e a prévia correspondente; nenhum PASS local é atribuído automaticamente ao deploy. Main/development e a branch de capas do outro desenvolvedor não são destinos de escrita desta entrega.

## Complemento — Hifro — 2026-11-15

- Pedido de Pedro nesta conversa: nome “Hifro”, preferencialmente no canto superior direito dentro da animação, com o estilo da landing e na mesma branch.
- Base desta adição: `5c6d333e9083cd362a34e0308c5306c961ddc9c9`; PR61 continua aberta para development.
- Worktree reconstruído da branch remota, inicialmente limpo; nenhuma alteração preexistente incorporada.
- Implementação: texto estático no componente do mascote e CSS local, sem alterar vídeo, lógica de reprodução, arquivos de mídia ou dependências.
- `npm run build`: PASS, incluindo TypeScript; lint focal do componente: PASS sem avisos; `git diff --check`: PASS.
- Suíte pública existente `frontend-landing.spec.ts`: 8/8 PASS em 5,9 segundos, sem modificar seus testes nesta adição.
- Nome conferido no DOM e em capturas de 1440 pixels, 375 pixels e 320 pixels/texto 200%; contido na animação, sem rolagem horizontal e sem cobrir o rosto. Fonte Poppins igual à página, 20 pixels no desktop e 16 pixels no mobile normal; margens superior/direita de 20 e 12 pixels respectivamente.
- Movimento reduzido preserva imagem e nome. No Chromium Headless Shell desta execução, o MP4 apresentou `DEMUXER_ERROR_NO_SUPPORTED_STREAMS` e manteve o fallback; não foi comprovada reprodução do vídeo nesse navegador. Arquivo de vídeo e lógica de reprodução permanecem idênticos à base. A nova camada é estática, posicionada acima de imagem/vídeo, e não depende do estado de reprodução.
- Revisão limitada à adição editorial, sem suítes de banco, autenticação ou auditoria integral de acessibilidade. Capturas e metadados locais em `test-results/hifro-review/`, ignorados pelo Git.
