# Revisão independente local — HF-INV-20261023-01-LOCAL01

Revisor: `agent-d-independent-review`. Classificação: `EVIDENCIA_IMPLEMENTACAO`
no alcance da inspeção descrita. **Nenhum finding P0–P2 aberto** na composição
examinada. Dois P2 documentais foram corrigidos e reconferidos. Revisão nativa
local: `PASS`. A CLI1 de `52cdf6e` terminou com um P2, portanto não foi aprovação;
CLI2 e Codex remoto do próximo SHA final: `NOT_RUN` neste recibo estático.
Este parecer não declara M0–M6 concluídos.

Base: `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. HEAD examinado:
`70660f330881513028ac42961b0fb729dcb089a2`, árvore
`5968c52ac9b5a3318d9f44997517bbce6470c3fb`; diff completo de 91 caminhos.
Checkpoints anteriores: `3321535` (B/coordenação) e `728d829` (A integrado).
Os fechamentos e os deltas corretivos `3b3138a` e `70660f3` foram relidos por
SHA imutável. O próximo commit contém somente este parecer e seus findings;
a conferência desse delta e a CLI2 terão recibo posterior.

`D-P2-001`, **tratado**: os adendos navegacionais exigidos pelo mandato §9.1
faltavam no contexto e no inventário canônicos. A coordenação corrigiu em
`3b3138a29f2a03d96287af9e2ea8de586dc6959e`: somente49 linhas acrescentadas em
`PROJECT_CONTEXT.md` e `docs/governance/DOCUMENT_REGISTER.md`, com links, base,
estado e limites honestos. D conferiu o delta e os destinos, sem modificar os
arquivos dos autores. Histórico e gates remotos NOT_RUN foram preservados.

`CLI-D-P2-002`, **tratado**: a CLI1 demonstrou que GETs do log Next não
comprovam quinze documentos principais. A coordenação corrigiu em `70660f3`:
[errata obrigatória](http-classification-errata.md), sínteses e manifesto,
sem alterar os recibos originais. D reconferiu os três blobs/digests de origem,
as oito entradas do manifesto B e as contagens. A prova B permanece seis casos
UI PASS por rodada e GETs de rota documento-ou-RSC; C observou dois documentos
no browser. Os seis documentos404 históricos têm listener de navegação principal
na fonte imutável, não a classificação derivada do log atual. O remoto sem
findings de `52cdf6e` não refuta esse P2 nem cobre a composição corrigida.

## Independência e limites

D não escreveu nem corrigiu código do produto, runners, probes ou provas A/B/C.
Trabalhou em worktree própria, sem iniciar serviços, PostgreSQL ou testes
pesados; não leu env, credenciais, sessões reais ou diretórios de demonstração.
Seus únicos arquivos são este parecer, [findings](findings.json) e a
[recuperação histórica INV-005](inv005-historical.json). A recuperação foi
produzida por D durante a revisão e deve ser conferida pela coordenação; D não
a apresenta como prova própria revisada por outro autor independente.

## Conclusões da inspeção

- A comprova o mecanismo de origem na reprodução atual autenticada: A/B/A,
  recusas externas preservadas, sessão comprovada antes do logout e quatro
  cenários originais no ingresso suportado. Os11 FAILs da sonda v3 e a errata
  v4 continuam preservados. Back12/12 não explica retroativamente os três
  FAILs de URL do outro contexto. Cookies removidos/me401 não são apresentados
  como revogação server-side além do contrato.
- B usa exatamente duas chamadas novas por espelho, após nove preparatórias.
  Barreiras reais antes do INSERT permitem o commit do vencedor antes de
  liberar o perdedor. Os traces registram um40001 real e depois RATE_LIMITED,
  com9/36→10/40. Não são os três conflitos históricos nem o schedule022.
  O finally libera as barreiras e observa ambas as promises antes do teardown.
- C preserva dois bloqueios de setup, três FAILs de ambiente contaminado e a
  rodada positiva. Os13 casos autenticados são11 originais e2 adicionais.
  Documento200/API404 continuam distintos e os jars não são copiados. A
  observação de caret ocorre no formulário hidratado; não prova a causa do
  aviso histórico. O ajuste posterior de outputDir está declarado e o config
  executado foi preservado por hash.
- INV-005 foi recuperada do ZIP original: seis documentos404 em duas famílias
  de rota, associados aos mesmos seis casos IHFR atuais. O digest/API e os519
  CRCs foram conferidos em memória antes da projeção. O histórico permanece
  FAIL; a causa permanece INCONCLUSIVO. O predicado histórico exige navegação
  no frame principal. Os dois runs B e a prova C são contraprovas atuais nos
  alcances distintos da errata, sem soma duplicada ou atribuição causal
  retrospectiva. A primeira projeção D também deve ser lida com essa errata.

`EVIDENCIA_IMPLEMENTACAO`: o diff não modifica produto, schema, migrations,
fórmula, quotas, OCC, idempotência, CSRF ou contratos do runner oficial. CI e
Vercel acrescentam somente a branch candidata e preservam as regras anteriores.
Os scripts investigativos e seus ajustes versionados não criam funcionalidade
de produto nem alteram o contrato oficial da prova. No recorte inspecionado,
não há correção funcional que exija inventar Spec029; eventual patch material
continua sujeito ao Spec Kit instalado. Constituição, políticas e a skill local
de análise foram consultadas sem alegar execução de etapas de
uma feature inexistente.

Os quatro qualificadores IHFR foram preservados: `CONTRATO_EXPERIMENTAL`,
`VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO` e
`NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`. Não se concede aceite humano,
científico, operacional, de acessibilidade ou liberação do piloto.

## Verificações realizadas

- `git diff --check base→70660f3`: PASS. Escopo e preservação histórica lidos.
- Verificador NAV4 em modo somente leitura:20 arquivos,9 snapshots, JSON,
  links e scan fechado PASS. Não foi usado `--write-manifest`.
- Manifestos A/B:28 entradas conferidas pelos bytes dos blobs Git; hash do
  teste novo B conferido separadamente. Manifesto C:15 recibos/imagens e o
  snapshot do protocolo público conferidos por blob, sem discrepância.
- Sete fontes do recibo C autenticado conferidas: quatro blobs/snapshot e três
  checkouts CRLF das fontes originais inalteradas. Isso preserva a diferença
  entre bytes de execução e normalização Git; nenhum hash foi recalculado para
  encobrir diferença de EOL.
- Sete imagens únicas abertas: uma pública e seis autenticadas. As outras
  três cópias públicas têm hash idêntico ao PNG inspecionado. Nenhuma conclusão
  abrange pixels mascarados, os19 PNGs de mapa não selecionados ou todas as
  capturas NAV4 privadas. Não foram vistos dados reais ou segredos nas amostras.
- ZIP INV-005: digest/tamanho da API e dos bytes coincidem,519 CRCs/caminhos
  verificados; nenhum membro extraído ou executado. O job agregado foi lido
  separadamente e não substitui o log IHFR detalhado do artifact.
- JSON e links locais da composição foram conferidos; árvores dos três commits
  de autoria A/B/C correspondem ao ledger. Nenhum teste pesado foi repetido
  apenas para preencher um campo retrospectivo ausente.
- CLI1 sobre o diff integral base→`52cdf6e`: concluída, exit0, um P2 documental.
  Modelo observado `gpt-6.1-sol`, esforço `ultra`, sandbox `read-only` e aprovação
  `never`. O [recibo na PR29](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/29#issuecomment-6375354310)
  preserva o finding. Nenhum exit0 com finding é tratado como aprovação.

Os limites P3 e seu tratamento constam de [findings.json](findings.json).
Typecheck/lint/testes executados pelos autores e coordenação conservam seus
recibos próprios; D não os apresenta como testes novamente executados por si.
CLI2 incremental desde `52cdf6e` e Codex remoto integral exigem recibos próprios
do SHA final. Este parecer não transfere os quinze PASS históricos nem antecipa
a CI desta candidata.
