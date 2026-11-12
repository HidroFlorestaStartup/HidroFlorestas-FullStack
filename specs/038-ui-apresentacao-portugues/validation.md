# Validação da apresentação em português

Data: 12/11/2026. Base: `development@bfc4e272165170e605096aa502b054184c76e86e`. Branch: `codex/ui-apresentacao-portugues-20261112`.

## Resultado

Implementação concluída e validada localmente para revisão visual. Mudanças restritas a apresentação, testes de apresentação e documentação desta spec. Sem alteração de fórmulas, DTOs, nomes internos existentes, permissões, schema, migrations, dependências ou configurações de infraestrutura. A branch independente da landing e as branches main/development foram preservadas.

| Verificação | Resultado |
| --- | --- |
| `npm ci` | Instalação pelo lockfile, sem mudança de dependências |
| `npm run test:unit` | 434/434 testes gerais + 17/17 de e-mail aprovados |
| `npm run lint` | Zero erros; dois avisos preexistentes em user-profile e white-box |
| `npx prisma generate` e `npx next typegen` | Aprovados; sem conexão com banco hospedado |
| `npx tsc --noEmit --incremental false` | Aprovado |
| `npm run build` | Aprovado; TypeScript e 33 páginas estáticas |
| `npx playwright test --config tests/ui/ui-presentation.config.ts --max-failures=1` | 12/12 cenários aprovados em 7,6 s |
| `git diff --check` | Aprovado |

## O que foi verificado

- Mapa: confirmação antes da ocorrência, rótulo e horário em negrito, texto amigável até minutos, atributos `datetime` integrais e controles de aproximação/afastamento em português.
- Resumo: título preservado, painel verde esmeralda, escore grande à esquerda no desktop, informações uniformes à direita e empilhamento em telas estreitas. Seleção do diagnóstico, origem, ausência e escore zero continuam cobertos pelos testes existentes.
- Detalhe: Dados ambientais antes de Registro; no mobile, Leitura → Dados ambientais → Registro → Ações. Um único formulário/controlador; valores, foco e seção expandida preservados ao redimensionar. Ações ausentes na composição de leitura.
- Resultados: duas casas decimais, vírgula pt-BR, classe Moderado sem quebra interna, sem alterar dados de origem, classe ou precisão usada nos cálculos.
- Tempo: hora civil da ocorrência preservada; confirmação no mesmo fuso declarado, inclusive cruzamento de data e UTC+05:45, independente do fuso da máquina. Proveniência explicitamente UTC continua UTC.
- Português: inventário de 119 arquivos de interface/apoio e 476 fragmentos JSX; rótulos, estados, papéis de laboratório, mensagens de falha e textos acessíveis revisados. Login, nomes próprios, unidades, entradas do usuário e identificadores técnicos de proveniência preservados. Códigos como OWNER permanecem internos e recebem rótulos públicos em português.
- Qualificadores experimentais, ressalvas científicas, versões, identificadores e hashes preservados.

O navegador usa os componentes reais com dados sintéticos e adaptadores isolados do Next, CSS da aplicação e a fonte Poppins do build. A matriz cobre 320/375/768/1024/1440 px com tamanho de texto em 100% e 200%; verifica ordem do DOM, ausência de transbordamento horizontal e palavra inteira. Ampliação de texto é uma verificação específica e não equivale a testar todos os modos de zoom de todos os navegadores. As capturas de 375 e 1440 px foram inspecionadas visualmente. Requisições externas e escritas são bloqueadas pelo harness.

## Limites e ocorrências da execução

Não foram executados E2E autenticados contra banco, integrações PostgreSQL ou homologação do deploy hospedado. Não havia credenciais de aplicação nesta sessão. Nenhuma alteração em Production, Preview de testes, variáveis de ambiente ou banco. O erro de tipos em logout relatado anteriormente não ocorreu nesta base.

A primeira execução de navegador parou antes de carregar a aplicação por restrição de socket no Chromium do sistema. A revisão automática bloqueou a alternativa de ambiente remoto; nenhum sandbox foi criado. A validação foi concluída localmente com o Chromium headless oficial do Playwright. O download opcional de FFmpeg falhou, mas o navegador necessário foi instalado; os cenários não gravam vídeo. Uma ambiguidade no seletor de título do harness foi corrigida com correspondência exata; a rodada final passou integralmente.

O aceite visual do usuário e a decisão de integração permanecem pendentes. Publicação em branch própria e abertura de PR não autorizam merge ou promoção de ambiente.

A primeira tentativa de criar a árvore Git no GitHub foi bloqueada pela revisão automática por exigir autorização explícita para publicação externa das alterações; nessa tentativa, não foi criada branch remota nem PR. Em 12/11/2026, Pedro autorizou explicitamente publicar esta branch no repositório HidroFlorestaStartup/HidroFlorestas-FullStack e abrir PR para development, reservando o merge para sua aprovação. O recibo de publicação e o estado dos checks ficam na descrição do PR e no GitHub.

## Correções após teste manual — 12/11/2026

Base incremental: PR56/head 69e19de. Pedro solicitou manter os limites experimentais recolhidos também sem diagnóstico e adotar IHFR nos rótulos do resultado. Alterados somente quatro componentes de apresentação, expectativas de testes e a documentação desta spec. O aviso conserva seus quatro qualificadores em uma única seção, agora recolhida por padrão também no estado ausente. Ausência continua diferente de IHFR igual a zero.

Validação desta rodada: 434/434 testes gerais + 17/17 de e-mail; 14/14 cenários de navegador com componentes reais (incluindo dois novos casos de abertura/fechamento por teclado sem diagnóstico); build e TypeScript aprovados. Lint sem erros e com os dois avisos preexistentes. Nenhuma ocorrência de Escore/Score como texto público remanescente nos componentes JSX revisados. Valores e nomes internos preservados.

O Preview usa a configuração de teste já autorizada, banco sintético separado e a mesma conta de teste, sem novo seed ou alteração de dados. A conferência hospedada do novo deploy e o aceite manual de Pedro têm recibo separado; a integração Vercel aponta o deploy do head publicado. Nenhum merge ou promoção de produção autorizado.
