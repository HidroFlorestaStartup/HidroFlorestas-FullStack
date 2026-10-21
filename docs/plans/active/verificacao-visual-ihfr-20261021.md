# Verificação focal das capturas IHFR — 2026-10-21

## Origem, objetivo e estado

Estado: EM_ANDAMENTO. A coordenação executa as fases C1–C4 autorizadas pelo usuário. O objetivo concreto deste recorte é inspecionar o reparo visual IHFR no HEAD atual, cujo CI geral parou antes do gate dedicado por uma falha herdada de navegação. Essa investigação de navegação prossegue separadamente; a inspeção visual pode descobrir um defeito independente sem aguardar sua conclusão.

As instruções AGENTS.md, PLANS.md, contexto, decisões técnicas e política de fontes foram consultadas. O plano conciliado e as fontes técnicas de Pedro permanecem as referências; nenhum aceite humano é inferido.

## Estado inicial e evidência

- Produto: `feat/frontend-ihfr@dfd78f695d855c4d0f0e8e4a68e9e92467cd11f4`, árvore `5f3b15b53b4405322b6f495d456da628b6291667`.
- [CI geral 39587983294](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39587983294): nove gates PASS, E2E geral FAIL por timeout herdado em navegação 375/200, cinco gates posteriores NOT_RUN. Não há capturas IHFR desse run.
- O reparo atual altera área útil e quebra de palavras em quatro componentes, conservando handlers, cálculos, contratos e qualificadores experimentais. São esperadas 43 capturas da família IHFR no runner dedicado.
- [Codex efetivo](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/23#issuecomment-6314265873): revisão concluída do HEAD atual sem findings. Isso não substitui teste ou inspeção visual.

## Escopo e preservação

Somente a branch diagnóstica `review/frontend-rc-artifact-triage-20261021`, já protegida por `git.deploymentEnabled=false`, recebe o workflow e este plano. Não há alteração em branch funcional, candidata agregada, development ou main.

O checkout fixa o SHA e árvore IHFR, verifica o blob do runner oficial e ausência de alterações rastreadas. Instala Node 24.19.0, lockfile e Chromium pelo mesmo procedimento do CI. Executa o runner original com o parâmetro suportado `-Gates @('RegressionSetup','Ihfr')`. O código desse runner não é adaptado: Windows, ACL, fresh cluster, marker, segredos sintéticos, ausência de SMTP real, fixtures, timeouts, limpeza e teardown são preservados.

O gate Ihfr dedicado usa o mecanismo oficial que prepara seus contextos e executa os casos da família IHFR. Este recorte possui dois gates; os outros treze não são executados nem declarados aprovados. O CI completo do HEAD final continuará necessário.

## Proveniência das capturas

O helper existente grava `process.env.GITHUB_SHA` no campo head das metadatas. Em um checkout explícito de outro SHA, essa variável identifica o workflow diagnóstico. Ela permanece intacta: não substituímos variáveis reservadas nem alteramos o helper.

O arquivo `.accounts-validation/ihfr-focal-source.json` registra separadamente workflowHead, productHead, productTree, gates e verificação do checkout. A inspeção deverá conferir essa dupla identidade: metadatas com o SHA diagnóstico e código executado com o SHA IHFR exato. Essa evidência focal não será apresentada como CI completo da branch nem transferida à futura candidata.

## Passos e divisão

1. Coordenação prepara e revisa os dois arquivos, verifica escopo, conteúdo remoto e lease da branch diagnóstica.
2. CI Windows executa os dois gates originais e publica somente logs redigidos, journal, recibo de origem, PNGs originais e metadatas da família IHFR.
3. Investigador confere run/attempt/job, duas identidades, tamanho/digest/CRC, nomes e dimensões; abre as capturas originais produzidas.
4. Achados materiais recebem reparo focal na frente IHFR e futura regressão própria. Se houver falha, preservá-la e investigar o ponto concreto.
5. Coordenação vincula o recibo na PR #23, preserva o histórico e prossegue com os 15 gates do HEAD final após resolver a navegação.

## Riscos, validação e critérios de término

Riscos concretos: a execução pode revelar falhas próprias do gate IHFR; a identidade GITHUB_SHA das metadatas difere do código por desenho do checkout; captura Chromium emulada não comprova aceite humano, leitor de tela ou dispositivo físico. Esses limites acompanham o recibo.

Não há conexão a banco remoto, SMTP, Cloudinary, Vercel ou outro provedor operacional; todos os recursos de execução pertencem ao runner sintético guardado. Não se alteram assertions, fixture, timeout ou código de domínio.

Antes de publicar: análise do runner, parser YAML e revisão independente do escopo. Runtime desta nova execução: NOT_RUN. Conclusão deste plano: recibo dos dois gates e imagens inspecionadas, ou bloqueio concreto documentado; a release permanece sujeita aos 15 gates completos e C4.

## Histórico

2026-10-21 — EM_ANDAMENTO: verificação focal preparada após o CI geral não alcançar a família IHFR. Esta execução complementa a investigação corrente sem converter falha anterior em PASS.
