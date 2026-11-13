# Especificação: mascote animado no herói da landing

**Branch**: `codex/landing-mascote-animado`
**Criada**: 2026-11-11
**Estado**: implementado localmente; build global pendente por erro fora do escopo
**Entrada**: pedido do usuário nesta conversa para substituir a árvore ao lado de “Conhecer o território começa com bons registros.” pelo vídeo transparente do mascote, em loop e sem player convencional.

**Atualização para teste**: pedido posterior do usuário nesta conversa para experimentar o vídeo com fundo, mantendo a apresentação vertical do mascote e a possibilidade de voltar à versão transparente.

**Atualização da landing**: pedido posterior do usuário nesta conversa para substituir os dois blocos da seção Equipe pelos nomes e competências da imagem fornecida, respeitando o layout existente.

## Fontes e autoridade

- `DECISAO_CONFIRMADA`: pedido explícito do usuário nesta conversa, limitado à apresentação visual do herói.
- `EVIDENCIA_IMPLEMENTACAO`: `src/app/page.tsx` e `src/app/landing.module.css` na base `origin/development@bfc4e272165170e605096aa502b054184c76e86e`; a árvore ocupa a ilustração do herói.
- `FATO_DOCUMENTADO`: `specs/028-frontend-landing-consolidation/spec.md` delimita a landing pública, seus links e os qualificadores do IHFR experimental. `docs/code-first-prd/README.md` permanece em revisão e não é alterado nesta entrega.
- `FATO_DOCUMENTADO`: arquivo de vídeo fornecido pelo usuário em Downloads; a transcodificação e escolha de trecho são decisões de implementação desta entrega, não decisões científicas ou de produto.

## Cenários de uso e testes

### US1 — Ver o mascote no herói (P1)

Uma pessoa visitante vê Hifro ao lado do título principal, com movimento contínuo e aparência integrada à página, sem controles de reprodução.

**Teste independente**: abrir `/` em navegador compatível e observar o herói por mais de um ciclo, em tela larga e estreita.

1. Dada a landing aberta, quando o herói aparece, então Hifro substitui a árvore no mesmo bloco visual.
2. Dado o herói visível, quando a animação chega ao fim, então ela recomeça sem interação da pessoa.
3. Dada a animação, então não há barra de reprodução, áudio ou botão de tela cheia.

### US2 — Acessar o herói sem movimento obrigatório (P2)

Uma pessoa com preferência por movimento reduzido, economia de dados ou navegador sem suporte ao vídeo continua vendo Hifro parado e o conteúdo da landing.

**Teste independente**: ativar movimento reduzido e simular ausência de suporte ao vídeo; conferir a imagem, texto e links.

1. Dada preferência por movimento reduzido, quando a página abre, então a animação não inicia e Hifro permanece visível.
2. Dada falha de reprodução, quando o vídeo não puder carregar, então a imagem estática permanece visível.

### US3 — Conhecer equipe e competências (P2)

Uma pessoa visitante encontra os integrantes agrupados por coordenação de desenvolvimento, coordenação científica e dados e funcionalidades.

**Teste independente**: abrir a seção Equipe e conferir os 11 nomes, os três grupos e as descrições da imagem, em tela larga e estreita.

1. Dada a landing aberta, quando a pessoa chega à seção Equipe, então os nomes completos fornecidos aparecem nos grupos correspondentes.
2. Em tela pequena, os grupos permanecem legíveis e sem rolagem horizontal.

### Casos de borda

- Sem JavaScript, a imagem estática e os links públicos permanecem no HTML.
- Fora da área visível ou com a aba oculta, a animação não deve consumir reprodução contínua.
- Em telas pequenas, Hifro cabe no cartão do herói sem sobrepor texto ou gerar rolagem horizontal.

## Requisitos funcionais

- **FR-001**: substituir a imagem da árvore no herói pelo mascote fornecido, preservando título, texto principal, links e demais seções.
- **FR-002**: exibir movimento em loop, sem interface de player convencional e sem áudio.
- **FR-003**: oferecer imagem estática de Hifro quando a animação não estiver disponível ou não for desejada.
- **FR-004**: adaptar a apresentação a telas pequenas e reservar o espaço visual antes do carregamento.
- **FR-005**: manter o carregamento e a reprodução proporcionais ao tamanho exibido, sem baixar o arquivo original de cinco minutos na landing.
- **FR-006**: remover as frases “Água, solo e vegetação” e “O território é o ponto de partida.” do herói e ampliar o mascote dentro da coluna disponível, conforme pedido posterior do usuário nesta conversa.
- **FR-007**: testar o vídeo com fundo fornecido pelo usuário, recortado verticalmente ao redor do personagem; manter os derivados transparentes disponíveis para reversão.
- **FR-008**: substituir os dois blocos antigos da seção Equipe pelos três grupos e 11 nomes da imagem fornecida, mantendo as descrições de competências e o estilo visual da landing.
- **FR-009**: apresentar coordenação científica, coordenação de desenvolvimento e dados e funcionalidades nessa ordem, em três colunas lado a lado no desktop e em sequência legível nas telas menores.

## Critérios de sucesso

- **SC-001**: em navegador compatível, Hifro anima e repete ao menos dois ciclos sem controles visíveis e sem áudio.
- **SC-002**: em movimento reduzido, economia de dados e falha de vídeo, Hifro continua identificável por imagem estática.
- **SC-003**: a abertura da página não desloca o conteúdo do herói quando a animação começa.
- **SC-004**: a landing continua navegável a 375 e 1440 px sem rolagem horizontal causada pelo mascote.
- **SC-005**: todos os 11 nomes e as três competências são legíveis a 375 e 1440 px sem rolagem horizontal.

## Premissas

- O vídeo fornecido é a origem autorizada para a aparência de Hifro nesta página.
- A animação é decorativa; a identificação textual de Hifro fica na imagem de fallback.
- A entrega não altera autenticação, dados, ciência, deployment ou outras seções da landing.
