# Método de verificação documental

As rotinas desta missão usam somente leitura de arquivos documentais e objetos Git, JSON, SHA-256 e comparação de paths. Node do sistema é usado com módulos nativos `node:fs`, `node:crypto`, `node:path` e `node:child_process` para essa finalidade; não importa código da aplicação, dependências, configurações executáveis, fixtures ou scripts do projeto. Nenhum teste funcional é executado.

## Reproduzir a integridade da passagem

No diretório raiz do pacote recebido (a estrutura relativa abaixo deve ser preservada):

1. Parsear `handoff.json`, `manifesto.json`, `matriz-implementacao.json`, `fontes-observadas.json`, `validacao.json` e fragmentos com parser JSON.
2. Para cada item em `handoff.documents`, resolver `path` contra a raiz do repositório entregue, exigir que permaneça nos dois prefixos LOCAL, ler bytes brutos, conferir `bytes` e SHA-256. Os hashes referem-se aos bytes UTF-8/LF entregues; checkout com autocrlf pode traduzir finais de linha. Preservar os bytes do ZIP ou conferir blobs Git brutos, sem alterar configuração para obter igualdade.
3. Para cada item em `manifesto.sources`, obter o blob de `sha:path` com `git cat-file blob`, conferir tamanho, SHA-256 e blob Git. Isso requer os objetos fonte locais; falta de acesso é limite, não igualdade presumida.
4. Conferir que `handoff.json` não aponta seu próprio hash; manifesto não inclui si mesmo nem handoff. Fontes são snapshots e não dependem do pacote gerado. `validacao.json` não contém hashes futuros ou seu próprio hash.
5. Na matriz Markdown, cada subcapacidade tem um bloco JSON completo `json-row` equivalente ao registro correspondente no JSON agregado. Parsear cada bloco e comparar serialização estrutural; conferir IDs únicos e os dez IDs IMP existentes, sem converter fronteiras em cobertura integral.
6. Para cada `intentSources`, `implementationSources` e `tests.paths`, exigir caminho real no SHA citado. Verificar URLs `/blob/<SHA integral>/<path>` com `git cat-file --batch-check`; decodificar escapes da URL e desconsiderar somente fragmentos de linha/âncora. Links locais novos devem resolver na entrega; nenhum link para docs de outra PR pode depender de branch mutável.
7. Conferir o diff completo e whitelist dos dois prefixos; código, testes, configuração, deps, schema, migrations e `docs/raw/**` devem ter delta zero. `git diff --check` deve passar após staging explícito, para incluir arquivos novos.
8. Procurar padrões de segredos/sessões, dados pessoais desnecessários e caminhos absolutos nos novos documentos; uma busca automatizada é complementar à inspeção do conteúdo. Não reproduzir valores encontrados.
9. Conferir `git status` no checkout principal e na worktree própria. A existência do diretório da própria worktree dentro de um diretório já não rastreado não é mudança de produto.

## Comandos Git usados como dados

- `git status --short`, `git worktree list --porcelain`, `git remote -v`, `git rev-parse`, `git log`, `git ls-tree`, `git show`, `git diff`, `git merge-base`, `git rev-list`.
- `git fetch --no-tags origin development docs/revisao-20261024 refs/pull/27/head refs/pull/28/head refs/pull/29/head`: fetch sem prune/push; trouxe os objetos, sem integração.
- `git worktree add -b docs/hf-doc-local01-20261024 <worktree-local> c4adfb379e5dc78f27f31b91edbd13f43228d9f9`: ramo local na base observada.
- `git merge-tree --write-tree <sha-esquerda> <sha-direita>`: simulações registradas na topologia, somente objetos temporários; exit1 só foi tratado como conflito quando acompanhado da saída Git que o demonstra. Erro de acesso ao object store não é conflito.
- `git diff --cached --check` e inspeção integral do diff staged dos paths explícitos; commit em PT-BR somente desses paths.

Metadados Git compartilhados ficam fora da raiz gravável do checkout corrente; fetch/worktree/merge-tree/commit podem requerer escalada específica. Aprovação de acesso ao metadado local não autoriza publicação remota ou contorno de contenção.

## Critérios do recibo

`validacao.json` registra resultados **próprios** e contagens verificadas; referências históricas de CI/review ficam em `fontes-observadas.json` e na matriz. A revisão independente lista seu alcance e tratamentos. O SHA final do commit local e o hash de handoff só podem ser fornecidos no recibo posterior da sessão; não entram de modo autorreferente no próprio commit.

Ausências deliberadas: instalação, geração Prisma, comandos npm, typecheck/lint/build da aplicação, testes funcionais, banco/browser, rede contra aplicação/provedores, deploy, merge e e-mail. CI funcional própria: `NOT_RUN`.
