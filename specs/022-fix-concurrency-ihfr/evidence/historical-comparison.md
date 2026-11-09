# Comparação histórica independente

EVIDENCIA_IMPLEMENTACAO: ZIPs originais baixados do GitHub em19/10/2026. Logs/journals comparados por Codex principal e revisor independente `/root/review_ihfr`, sem nova interpretação normativa.

| Artefato | Origem | SHA256 do ZIP conferido |
|---|---|---|
|12212173104|[run39300023357, tentativa1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39300023357/attempts/1)|9f13f31eb53c7aae476e3e77246c988c142f742c4b20aa671b601350f0154fde|
|12213157147|[mesmo run, tentativa2](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39300023357/attempts/2)|aace111409eabf2e11352d2aaed8801edee40d602c8a53efe215a8f55214d008|
|12192554979|[run39267705060, tentativa1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39267705060/attempts/1)|18f1bec27a42ae84c049d69ee634c402a61b53d041f706acfbf60c7fbe886566|

## IHFR

SHA comum3f1eba566a1f4f01e469f75a6c174fd2e602a9d2; snapshot comum2cb2e33ec7ac72e97b1ab695353375a3d5ea501135355a7c7459ca19798d902d. Ambos declaram Windows/Node24.19/PostgreSQL17; preflight target3ca357615da4/public PASS, schema próprio e1worker.

- FAIL: `ihfr-1792434156233.log`; seis falhas,250.656ms no gate. Journal12PASS+IhfrFAIL; Bootstrap/SchemaAudit ausentes.
- PASS: `ihfr-1792435561035.log`; mesmos seis cenários passam38,2s;54.325ms no gate. Journal15PASS.
- FAIL L20: Fuso da coleta120s; L53/78: ausência/região IHFR; L93: Uso predominante90s; L123/148: região/ausência. Error-context referidos em L35/60/85/105/130/155 não foram incluídos no artefato.
- Ambos seguem Https/Deletion PASS,211ms/267ms até IHFR. E2E e Deletion foram mais lentos no PASS; tempos não provam falha por lentidão geral.
- URL final, status, DOM, console e logs Next ausentes no par. Nenhuma comparação científica é alcançada nos FAIL.

Conclusão: intermitência comprovada, causa histórica INCONCLUSIVA. Controle artificial posterior sem JavaScript não pode ser promovido a causa desse CI.

## Concorrência

SHA7b8d9c0c8894d4e3e86d35d90b4d1b3d2eab003d; snapshot9a5dd074aa94a9072903714135ca946991ce80526ec61ef6276953b72b9ba7c6. `integration-1792419611023.log`:217/218PASS, falha no cenário original de duas solicitações/quota horária. Diagnóstico agrega um DriverAdapterError/40001 e doisP2034/40001; asserção esperavaRATE_LIMITED e recebeuINTERNAL_ERROR. Contagens posteriores não foram executadas.

Esses fontes de transação/quota/teste relevantes são iguais no baselineSHA15. A origem exata dos três conflitos com duas chamadas continua INCONCLUSIVA após30repetições locais PASS. O reprodutor novo usa quatro operações em três ondas; não declara equivalência histórica.
