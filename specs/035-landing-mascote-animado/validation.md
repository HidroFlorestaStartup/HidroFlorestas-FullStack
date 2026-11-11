# Validação local — 2026-11-11

## Escopo e estado

- Branch local `codex/landing-mascote-animado`, criada de `origin/development@bfc4e272165170e605096aa502b054184c76e86e`.
- `guia-de-uso.md` e `docs/plans/completed/guia-de-uso-do-frontend.md` já estavam não rastreados; permaneceram sem alteração. A árvore original também permanece no repositório, sem uso no herói.
- Nenhum push, deploy, alteração de banco ou dependência do projeto foi realizado.

## Mídia

- Origem fornecida: WebM VP9 alfa, 2688×1536, 24 fps, 5 min, sem áudio, cerca de 141 MB. Não foi alterada.
- Derivados: WebM VP9 alfa 960×996, 24 fps, 10 s, 1.274.865 bytes; MP4 H.264 com fundo correspondente ao cartão para WebKit, 960×996, aproximadamente 10 s, cerca de 911 KB; poster WebP transparente, 63.982 bytes.
- FFmpeg 9.0.2: decodificação integral dos dois vídeos derivados sem erros. Quadro WebM inspecionado com canal alfa; MP4 inspecionado quanto à cor de fundo. Não há trilha de áudio.

## Navegador

- Chromium local, 1440 e 375 px: herói sem overflow horizontal; vídeo carregado, reproduzindo, mudo, em loop e sem controles. Dois retornos ao início foram observados. Fora da área visível, reprodução pausou.
- Firefox local: VP9 com alfa reproduzido e composto visualmente sobre o cartão.
- WebKit local: VP9 informou suporte, mas mostrou fundo preto; a seleção de MP4 evita esse problema. O binário WebKit local não oferece codec MP4, então a imagem estática foi exibida. Safari físico não foi testado.
- Movimento reduzido: somente poster solicitado, sem vídeo. Economia de dados: nenhuma requisição de vídeo. Sem JavaScript: poster e título visíveis, sem `src` no vídeo.

## Gates

- `npm run lint`: passou com 0 erros e 2 avisos preexistentes fora do escopo (`src/components/user-profile/index.tsx` e `src/components/white-box/index.tsx`).
- TypeScript focal do herói: passou com `tsc --noEmit` sobre `page.tsx` e `mascot-animation.tsx` em configuração temporária.
- `git diff --check`: passou.
- `next build --webpack` com Node 24.19.0: compilação otimizada passou em 15,2 s; checagem global de tipos falhou em `.next/types/app/api/auth/logout/route.ts` por assinatura `Request | undefined` na rota de logout, fora dos arquivos alterados. O build completo permanece pendente desse problema de baseline.
- A primeira tentativa padrão com Turbopack ficou sem avançar na compilação e foi interrompida. O build Webpack em sandbox retornou erro ao capturar `tsc --showConfig`; com execução autorizada fora do sandbox chegou à compilação e expôs o erro de tipo acima.

## Pendências

- Testar MP4 em Safari real com codec disponível e validar o acabamento visual com a equipe.
- Resolver o erro de tipo da rota de logout em escopo próprio para obter build global verde.

## Comparação visual sem fundo — 2026-11-11

- `DECISAO_CONFIRMADA`: pedido do usuário nesta conversa para testar o mascote sem o fundo verde, com possibilidade de voltar à aparência anterior.
- A regra `.illustration` teve fundo `#eef2e5` e borda `#e0e7d8` trocados por transparência, preservando as dimensões do bloco. Valores anteriores registrados aqui para reversão pontual.
- O WebM transparente continua animado em navegadores compatíveis. Durante esta comparação, WebKit usa o poster transparente estático para evitar o fundo verde embutido no MP4; o arquivo MP4 foi preservado e pode voltar a ser selecionado se o cartão verde for restaurado.
- Chromium local em 1440 e 375 px: fundo e borda computados como transparentes, vídeo em reprodução e sem overflow horizontal. WebKit local: fundo transparente e poster estático, sem requisição de vídeo.
- ESLint focal, TypeScript focal e `git diff --check` passaram. O build global não foi repetido: a falha preexistente de tipos na rota de logout, registrada acima, não foi alterada por este teste visual.

## Mascote ampliado e textos removidos — 2026-11-11

- `DECISAO_CONFIRMADA`: pedido posterior do usuário nesta conversa para retirar “Água, solo e vegetação” e “O território é o ponto de partida.” e aumentar Hifro.
- As duas frases e o ícone associado saíram de `src/app/page.tsx`. O bloco passou a usar toda a largura de sua coluna, sem padding ou margem interna no mascote. O vídeo e seu poster não foram recodificados.
- Chromium local: largura do mascote passou de 420 para 493 px em 1440 px e de 301 para 343 px em 375 px. As frases não aparecem; não há overflow horizontal.
- O servidor já ativo em `localhost:3000` reproduziu o WebM (`readyState=4`, `paused=false`). Pela origem `127.0.0.1:3000`, o HMR falhou no handshake e a hidratação não iniciou; a verificação da reprodução usou `localhost`.

## Teste vertical com vídeo de fundo — 2026-11-11

- `DECISAO_CONFIRMADA`: pedido do usuário nesta conversa para experimentar o MP4 com fundo, sem manter o enquadramento horizontal original. A escolha definitiva entre as versões permanece com o usuário.
- MP4 derivado em `public/media/hifro-mascote-hero-com-fundo.mp4`: 10 s, 960×1152, 2.309.436 bytes; poster em `src/assets/lading-page/hifro-mascote-com-fundo-poster.webp`: 54.940 bytes. Originais em Downloads e derivados transparentes anteriores preservados.
- Chromium local pelo servidor em `localhost:3000`, 1440 e 375 px: MP4 carregado (`readyState=4`), em reprodução, sem overflow horizontal; quadro vertical com bordas arredondadas e o mascote inteiro. WebKit local não ofereceu codec MP4 e mostrou o poster estático, também sem overflow. Safari físico não foi testado.
- Decodificação integral do MP4 derivado com FFmpeg, ESLint focal, TypeScript focal e `git diff --check`: todos passaram. O build global não foi repetido por manter o bloqueio preexistente da rota de logout descrito acima.

## Equipe e competências — 2026-11-11

- `DECISAO_CONFIRMADA`: o usuário pediu nesta conversa para substituir os blocos “Coordenação do projeto” e “Corpo técnico e estudantes” pelos nomes e competências da imagem fornecida.
- `src/app/page.tsx` apresenta três grupos e 11 nomes: desenvolvimento (Pedro Vitor Silva de Brito, Ana Clara Cunha Santos, Thales Levi Azevedo Valente); ciência (Fábio Mesquita de Souza, Iolanda Souza do Carmo, Humberto Morais da Silva, Horacio Bizerra Vale Neto, Antonio Marcos da Penha Santos); dados (Luciano Mendes de Almeida, Arthur Gabryel Costa Lima, Rafael Silva Andrade). A imagem grafou `MENDESDE` sem espaço; o nome foi exibido como “Mendes de”.
- A seção mantém as descrições de competência da imagem e usa a grade, tipografia e cores existentes da landing. Capturas locais em 1440 e 375 px foram inspecionadas; em 320 e 768 px há três grupos, 11 nomes e nenhum overflow horizontal.
- ESLint focal, TypeScript focal de `page.tsx` e `mascot-animation.tsx`, e `git diff --check` passaram. O build global não foi repetido: o bloqueio preexistente da rota de logout segue registrado acima.

## Ordem e três colunas — 2026-11-11

- `DECISAO_CONFIRMADA`: pedido posterior do usuário nesta conversa para priorizar coordenação científica, depois desenvolvimento e plataforma, com as três colunas lado a lado no desktop.
- Os três artigos foram reordenados no HTML nessa sequência. A grade usa três colunas iguais acima de 959 px; em telas menores, os grupos se empilham na mesma ordem. Borda e título verdes distinguem a coordenação científica sem alterar a paleta da landing.
- Capturas em 1440 e 375 px foram inspecionadas: três colunas de cerca de 371 px no desktop, uma coluna de 343 px no celular, ordem correta e nenhum overflow horizontal.
- Na largura limite de 960 px, as três colunas medem cerca de 278 px cada e não há overflow. ESLint focal, TypeScript focal e `git diff --check` passaram; o build global não foi repetido por causa do bloqueio preexistente na rota de logout.

## Linha da coordenação científica — 2026-11-11

- `DECISAO_CONFIRMADA`: o usuário pediu para igualar a espessura da linha acima de “Pesquisa” às demais. A borda do primeiro grupo agora herda a mesma espessura de 1 px dos outros dois; somente a cor verde permanece como destaque.
- Chromium local confirmou as três bordas superiores com `1px`; `git diff --check` passou.

## Uniformização das três linhas — 2026-11-11

- `DECISAO_CONFIRMADA`: o usuário esclareceu que as três linhas devem ter a mesma cor e espessura. Foi removida a exceção de cor da primeira coluna; todas usam a mesma borda superior de `1px solid #ccd7c7`. O título verde da coordenação científica permanece.
