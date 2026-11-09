# Protocolo INV-001 e INV-002 — HF-INV-20261023-01-LOCAL01

Versão: 1, registrada antes dos experimentos de produto desta execução.
Owner lógico: `agent-b-ihfr-concurrency`. Base: `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`;
árvore: `24baec02321084fc1abedddd6355896a0b81eaa1`.

## Autoridade e escopo

`FATO_DOCUMENTADO`: o mandato HF-INV-20261023-01-LOCAL01 autoriza investigação
sintética, correções demonstradas, validação e entrega para revisão. O
[plano dos alunos](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/f56f73fda1d7bd459a1415bf02df25edc9120674/docs/plans/active/investigacoes-intermitentes-20261023/plano-de-execucao.md)
é fonte técnica preservada. Nenhuma execução desta frente autoriza merge,
deploy, operação hospedada, aceite humano ou científico.

O IHFR permanece `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO` e `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
Fórmula, componentes, manifesto/hash, precisão, respostas públicas, quotas,
OCC, idempotência e rollback não serão alterados por hipótese inconclusiva.

## Fontes e reconciliação

- INV-001: [run 39300023357, tentativa 1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39300023357/attempts/1),
  seis FAILs IHFR; [tentativa 2](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39300023357/attempts/2),
  seis PASS, mesmo HEAD `3f1eba566a1f4f01e469f75a6c174fd2e602a9d2` e snapshot
  `2cb2e33ec7ac72e97b1ab695353375a3d5ea501135355a7c7459ca19798d902d`.
- Artifacts 12212173104 e 12213157147: digests históricos, respectivamente,
  `9f13f31eb53c7aae476e3e77246c988c142f742c4b20aa671b601350f0154fde` e
  `aace111409eabf2e11352d2aaed8801edee40d602c8a53efe215a8f55214d008`.
  Disponibilidade, acesso aos bytes e conferência local são resultados distintos.
- [Projeção da PR #27](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/evidence/backend-historical.json)
  registra logs específicos e ausência dos error-context originais; não substitui
  bytes que esta execução não tenha recuperado.
- INV-002: [run 39267705060, tentativa 1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39267705060/attempts/1),
  HEAD `7b8d9c0c8894d4e3e86d35d90b4d1b3d2eab003d`, cenário de duas chamadas
  de capa, quota horária: `RATE_LIMITED` esperado, `INTERNAL_ERROR` observado;
  diagnóstico agregado contém três conflitos `40001`.
- [Comparação histórica integrada](../../../../specs/022-fix-concurrency-ihfr/evidence/historical-comparison.md)
  e [evidência da Spec022](../../../../specs/022-fix-concurrency-ihfr/implementation-evidence.md)
  preservam 30 repetições anteriores PASS e o limite causal histórico.

`EVIDENCIA_IMPLEMENTACAO`: a base atual já contém a correção Spec022, o teste
determinístico de quatro operações/três ondas, os diagnósticos sanitizados IHFR
e os controles explícitos de inicialização. Não reimportar branches históricas.
O experimento de duas chamadas desta missão não equivale a quatro operações
em três ondas e não pretende reconstruir interleaving não registrado.

## Isolamento e preflight

Worktree e instalação npm próprias; Node 24.19.0 e lockfile preservado.
`LOCALAPPDATA` do processo aponta a diretório novo e privado da missão;
cluster IMP006 em loopback 55426, proprietário e marker próprios, sem reutilizar
cluster global ou dados alheios. O binário PostgreSQL pinado pode ser copiado
do pacote verificado da missão; o cluster, a credencial e os schemas não são
compartilhados. Nunca usar `-InitializeCiCluster` localmente.

Os testes usam `withImp006PostgresqlSchema`: schema aleatório allowlisted,
comentário de ownership, fixture explícita e descarte verificado. O runner
IHFR usa porta HTTP efêmera suportada, servidor e segredo de sessão próprios.
Não carregar `.env` preexistente. Não emitir cookies, tokens, códigos de conta,
credenciais, URLs assinadas ou corpos completos. Artefatos brutos ficam fora do
Git; publicar somente projeções revisadas e hashes dos bytes recuperados.

## INV-001: inicialização e controles

`INFERENCIA`: readiness, sessão, navegação e execução JavaScript podem produzir
ausência/ocultação de elementos antes de qualquer cálculo. O par histórico não
identifica qual mecanismo ocorreu; o experimento não atribui causa retrospectiva.

1. Executar duas invocações independentes de
   `scripts/imp006-local-e2e.ts`: novo schema, fixture e servidor a cada rodada,
   mantendo seis cenários oficiais, workers=1, retries=0 e timeouts/assertions.
   Frio significa servidor recém-iniciado e novo contexto de browser; caches
   de build não são apagados nem apresentados como equivalentes a máquina nova.
2. Executar separadamente `--initialization-controls`, já instalado. Preservar
   as duas expectativas RED deliberadas sem JavaScript, o controle positivo
   com JavaScript e os controles de sessão inválida/ator ausente.
3. Os seis cenários oficiais já incluem reload e navegação em servidor aquecido;
   diferenciá-los do primeiro acesso e não somá-los novamente como novos testes.
4. Coletar início/fim, comando sanitizado, exit code, contagens e diagnósticos
   permitidos de Next/browser. Guardar todos os FAILs e falhas de infraestrutura.

Critério: controles negativos devem preservar seu fenômeno (DOM oculto ou
redirect/login) e controles positivos devem renderizar a região experimental.
Um PASS atual não elimina a intermitência histórica. Se houver falha natural,
interromper repetição, preservar evidência e definir o experimento discriminante
antes de qualquer correção. Sem defeito demonstrado, não abrir spec fictícia.

## INV-002: exatamente duas chamadas

Preparação: nove tentativas horárias sintéticas, espaçadas pelo relógio injetado
do serviço conforme fixture existente, sem espera real; depois avanço de onze
minutos para não confundir quota ativa com horária. Os estados finais esperados
são dez tentativas persistidas e quarenta jobs. Provedor fake explícito; nenhum
I/O hospedado. As duas novas chamadas usam chaves distintas e revisão 0.

1. Executar uma vez o cenário histórico existente
   `CRI-REV-002 concurrent hourly quota is checked again after preset`.
   A barreira de preset espera as duas chamadas; liberar ambas juntas.
2. Executar dois interleavings espelhados, somente duas chamadas: A vence e B
   vence. Segurar cada primeira transação pós-preset antes da criação da
   tentativa, após ler a elegibilidade. Quando ambas alcançarem a barreira,
   liberar o vencedor e esperar seu commit; só então liberar a outra chamada.
   Retries seguem a implementação existente; nenhuma exceção é fabricada.
3. Exigir um sucesso, uma recusa `RATE_LIMITED`, nenhum `INTERNAL_ERROR`, dez
   tentativas/quarenta jobs e nenhuma duplicação/estado parcial. Registrar
   conflitos por operação, fase e SQLSTATE, sem mensagens SQL ou parâmetros.
4. Executar os controles já existentes de replay idêntico/divergente, revisão
   obsoleta e rollback, mais a concorrência OCC/idempotência IHFR pertinente.

Barreiras controlam ordem; timeout somente impede travamento e não escolhe o
vencedor. `finally` libera barreiras e observa as duas promises antes do teardown.
O teste integrado de commit e o de quatro operações/três ondas podem ser
referenciados como cobertura complementar, sem chamá-los de reprodução exata.

Critério negativo: conflito serializável real pode abortar a transação perdedora;
critério positivo: retry vê o commit vencedor e retorna quota contratual sem
duplicação. Se os três conflitos históricos não reaparecerem com duas chamadas,
registrar `NAO_REPRODUZIDO` neste protocolo e preservar a causa histórica
`INCONCLUSIVO`. Não acrescentar operações ocultas para produzir a assinatura.

## Encerramento e validação

Quantidade e ordem acima são fixadas previamente. Não repetir até verde.
Problemas de instalação/rede são `BLOCKED`/`FAIL` de infraestrutura, separados
do resultado funcional. Nova rodada exige hipótese ou impedimento identificado.
Uma correção demonstrada exige Spec Kit instalado e análise antes do patch,
RED/GREEN, revisão independente e regressões pertinentes. A CI Windows com os
quinze gates pertence à candidata final do coordenador; testes focais desta
frente não constituem esse recibo nem homologação do piloto.
