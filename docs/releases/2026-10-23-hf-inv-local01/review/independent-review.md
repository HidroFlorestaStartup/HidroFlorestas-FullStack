# Revisão independente local — HF-INV-20261023-01-LOCAL01

Revisor: `agent-d-independent-review`. Classificação: `EVIDENCIA_IMPLEMENTACAO`
no alcance da inspeção descrita. **Nenhum finding P0–P2 aberto** na composição
examinada. Um P2 documental foi corrigido e reconferido. Revisão nativa local:
`PASS`; CLI final e Codex remoto: `NOT_RUN` neste recibo estático. Este parecer
não declara M0–M6 concluídos.

Base: `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. HEAD examinado:
`3b3138a29f2a03d96287af9e2ea8de586dc6959e`, árvore
`011019bf35536c48407b99fd6dbf47396cd09b12`; diff completo de 87 caminhos.
Checkpoints anteriores: `3321535` (B/coordenação) e `728d829` (A integrado).
O fechamento documental `33cbde0` e o delta corretivo de dois arquivos foram
relidos por SHA imutável. O próximo commit contém somente este parecer e seus
findings; a conferência desse delta e a CLI final terão recibo posterior.

`D-P2-001`, **tratado**: os adendos navegacionais exigidos pelo mandato §9.1
faltavam no contexto e no inventário canônicos. A coordenação corrigiu em
`3b3138a29f2a03d96287af9e2ea8de586dc6959e`: somente49 linhas acrescentadas em
`PROJECT_CONTEXT.md` e `docs/governance/DOCUMENT_REGISTER.md`, com links, base,
estado e limites honestos. D conferiu o delta e os destinos, sem modificar os
arquivos dos autores. Histórico e gates remotos NOT_RUN foram preservados.

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
  FAIL; a causa permanece INCONCLUSIVO. Os dois runs B e a prova C são
  contraprovas atuais, sem soma duplicada ou atribuição causal retrospectiva.

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

- `git diff --check base→3b3138a`: PASS. Escopo e preservação histórica lidos.
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

Os limites P3 e seu tratamento constam de [findings.json](findings.json).
Typecheck/lint/testes executados pelos autores e coordenação conservam seus
recibos próprios; D não os apresenta como testes novamente executados por si.
CLI local e Codex remoto exigem recibos próprios do SHA final. Este parecer
não transfere os quinze PASS históricos nem antecipa a CI desta candidata.
