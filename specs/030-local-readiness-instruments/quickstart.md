# Execução sob demanda

Pré-requisitos: baseline npm ci/Prisma, PostgreSQL accounts owned próprio com env sintético preparado pelo contexto oficial e Chromium local. Usar somente runtime QA fresco de HF-NIGHT-01, sem cluster de outra missão. Ler o runbook datado da QA para criação segura do runtime; `-InitializeCiCluster` permanece exclusivo Actions e não será simulado.

Executar pelo wrapper owned, com env só sistema/sintético e SMTP/provedores ausentes:

```powershell
./scripts/accounts-local-postgresql.ps1 -Action Run -DatabaseMode Schema -Executable node -CommandArguments @('--unhandled-rejections=strict','--conditions=react-server','--import=tsx','scripts/local-readiness.ts')
```

A invocação exige `HF_LOCAL_READINESS_CONFIRMATION=HIDROFLORESTAS_LOCAL_READINESS_20261025`; o recibo fica em `<LOCALAPPDATA próprio>/HidroFlorestas/accounts-postgresql/readiness/<run-id>/result.json`, sob ACL privada e Git ignore; o resumo stdout informa somente o caminho relativo. Testes puros sob demanda:

```powershell
node --unhandled-rejections=strict --import=tsx --test --test-reporter=tap --test-concurrency=1 tests/investigations/readiness/local-readiness-policy.test.ts tests/investigations/readiness/local-readiness-navigation.test.ts
```

Após o P2 da PR39, esse comando cobre18 testes:9 de política e9 de coordenação. Dois controles negativos reproduzem a sequência antiga em subprocessos strict e esperam exit1 antes do cleanup/recibo; seis casos do helper real exigem erro causal preservado, remoção de marcador de arquivo próprio e escrita de recibo FAIL, além de um caso de ordem/retorno feliz. É um lifecycle sintético sem DB/browser/servidor, com timeout5s por child, sem listener global de rejeições. Não atribuir a ele teste de falha real de PostgreSQL ou navegação. Custo observado da bateria corrigida2,253s; até oito subprocessos curtos, execução serial.

Custo planejado: 110 leituras sequenciais do endpoint, projeção/EXPLAINs, 100 áreas/1000 coletas alvo e10/100 de ruído no schema efêmero, um servidor/browser sob orçamento cooperativo de5min, com operações em curso e cleanup potencialmente além desse orçamento. Readiness tem deadline60s e requests HTTP10s; o budget5min é cooperativo e aborta HTTP/verifica entre passos. Browser/Prisma/lifecycle têm cleanup best-effort, que pode estender o orçamento e impede PASS quando não verificado. Sem SMTP/upload externo; requests externos do navegador abortados, sem custo de tiles. Não instalar nem acionar instrumento em CI automaticamente.

Sucesso exige cardinalidades integrais, associação exata área/coleta, hrefs distintos, limpeza e recibo completo. Exit0=PASS;exit2=GOAL_NOT_MET;exit1=FAIL/REFUSED. Metas500ms/2s são técnicas, sem SLA; desempenho pode variar por cache/CPU/dev. Falha permanece registrada, sem retry automático. Nunca converter execução em aceite humano/acessibilidade assistiva, readiness operacional ou validação científica IHFR.
