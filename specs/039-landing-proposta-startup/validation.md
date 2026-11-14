# Validação — 14/11/2026

## Estado e escopo

Base development 2e51c40cf87e71780724473484f63afcafd7cc22, worktree isolado e branch codex/landing-proposta-startup. A main b21d43e tem a mesma árvore de produto da base. Implementação somente da landing: src/app/page.tsx, src/app/landing.module.css, expectativas afetadas de tests/e2e/frontend-landing.spec.ts e documentação desta feature.

## Resultado

| Verificação | Resultado |
| --- | --- |
| npm ci --no-audit --no-fund | PASS, lockfile preservado |
| npm run build | PASS, build padrão Turbopack e geração Prisma; repetido após ajuste de largura |
| npm run typecheck | PASS; build final também concluiu TypeScript |
| npm run lint | PASS, zero erros e dois avisos preexistentes em user-profile e white-box |
| Landing pública real no build de produção local | 8/8 PASS: 320, 375, 768, 960, 1440 px, paisagem, texto a 200%, teclado e rotas Login/cadastro |
| Regressão existente tests/ui/ui-presentation.spec.ts | 14/14 PASS: preservação da apresentação interna de IHFR, mapas e coletas |
| Verificações complementares locais | 4/4 PASS: capturas de seções em 1440/375 px, sem JS e movimento reduzido |
| Equipe | Trecho completo idêntico por bytes à base; regras específicas de estilo preservadas |
| Texto a 200% | Largura do documento 320 px em viewport 320 px; nenhuma palavra ou caixa transbordando |
| Escopo e git diff --check | PASS; nenhum componente privado, API, fórmula, schema, dependência ou configuração alterado |

## Conferência de conteúdo e apresentação

- Rótulo inicial preservado; título completo da referência 1 cabe no herói com escala compatível e mascote intacto.
- Ordem: abertura, Paradoxo Hídrico, projeto/soluções, plataforma/painel, impacto/ODS, equipe, footer.
- Dois parágrafos institucionais e frase do kit preservados literalmente; propostas em tom de pesquisa/planejamento.
- Painel ao lado dos passos no desktop e após eles no mobile, com categorias informativas de água, solo/vegetação e IHFR. Visão ilustrativa, sem classes de salinização ou recomendações de manejo fictícias. IA explicitamente futura.
- Retirada a antiga seção científica da landing; o diagnóstico interno mantém seus qualificadores e textos existentes.
- ODS 6/13/15/10, público potencial e comunidades como alcance proposto. Mesmos 11 integrantes e grupos. Footer e mailto para hidrofloresta@gmail.com.
- Poppins, paleta verde/ocre, cartões, espaços e bordas da versão 0 mantidos; sem dependência, mídia ou cliente novo.
- Inspeção visual das capturas do herói, projeto, plataforma, impacto e equipe em desktop/mobile.

## Ocorrência corrigida

A primeira rodada teve 7 testes aprovados e um cenário de texto a 200% com overflow. A palavra longa do novo h1 e o padding relativo de cartões deixavam pouca largura. A escala mínima do título e os paddings locais em telas pequenas foram ajustados sem fragmentar palavras; build e suíte repetidos com 8/8 aprovados. Diagnóstico final: scrollWidth=innerWidth=320 e lista de caixas excedentes vazia.

## Limites

Os 14 testes de apresentação usam componentes reais com adaptadores locais; não equivalem a E2E autenticado com banco. A suíte geral unitária, integração PostgreSQL, migrations e serviços externos não foi repetida, pois não há alteração desses caminhos. Chromium emulado; sem dispositivo físico ou auditoria integral de acessibilidade. H.264 não disponível nesse navegador headless; poster e políticas sem JS/movimento reduzido foram verificados, sem mudança no componente ou vídeos do mascote.

Os números de alcance vêm do texto legado selecionado pelo usuário e são apresentados como proposta/público potencial; não foram auditados como atendimento efetivo. Esta revisão não promove recursos futuros a implementados nem valida conteúdo científico. Aceite visual e merge ficam com Pedro.

## Revisão da prévia — segunda rodada em 14/11/2026

Base incremental dd02396. Os três títulos e descrições de O desafio foram extraídos da versão 1 e restaurados literalmente, normalizando apenas espaços do JSX. Título e subtítulo já coincidiam. Os dois parágrafos institucionais foram movidos para depois dos cards, sem alterar seu texto; desktop em duas colunas e mobile em sequência.

O painel mantém a posição aprovada e passa a se chamar Do diagnóstico à restauração, com rótulos Conexão com o território e Frentes do projeto. Uma introdução e três descrições completas conectam registros/IHFR a segurança hídrica, SBN e infiltração. Reaproveita salinização de poços, recarga de aquíferos, SAFs, florestas de infiltração, manejo regenerativo e recuperação do ciclo hidrológico da versão 1. Trata de objetivos/frentes do projeto, não de um índice calculado ou dados reais. A IA segue explicitamente futura e recebeu redação direta sem está prevista.

Validação desta rodada:

- Build padrão Turbopack/Prisma, TypeScript e git diff --check aprovados.
- Lint sem erros e com os mesmos dois avisos preexistentes.
- 8/8 testes existentes da landing aprovados, incluindo 320 px/texto a 200%, teclado e rotas de acesso.
- Quatro verificações complementares aprovadas: capturas em 1440/375 px, poster sem JS e movimento reduzido. Nesta execução também se comprovou igualdade literal dos textos de O desafio com a fonte 1 e posição dos parágrafos abaixo de todos os cards, em ambas as larguras.
- Inspeção visual de Nossa solução no desktop e do painel no mobile. Diagnóstico de 320 px/texto a 200%: documento com 320 px, nenhuma caixa excedente.
- Cards de Nossa solução, equipe, footer e abertura/mascote idênticos por bytes à rodada anterior; nenhuma mudança na UI autenticada.

Os 14 testes da apresentação interna permanecem evidência da primeira rodada; não foram repetidos porque nenhum arquivo desses componentes mudou. Demais limites da primeira rodada permanecem aplicáveis. Atualização na mesma branch/PR59, sem merge ou mudança de produção.
