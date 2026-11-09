# Revisões independentes da frente C

Missão `HF-INV-20261023-01-LOCAL01`. Owner deste registro:
`agent-c-navigation`; classificações conforme `SOURCE_AUTHORITY.md`.
Nenhuma revisão concede aceite científico, humano ou operacional.

## Revisão pré-runtime de C por A

`EVIDENCIA_IMPLEMENTACAO`: `agent-a-nav4-accounts` leu somente o protocolo e
os scripts públicos de C antes do browser, sem ler env ou runtime privado.
Apontou três lacunas: exigir os estados de controle coletados como assertions;
hash do diff em bytes brutos, sem trim; calor do servidor é confundidor do
contraste entre contexts. C incorporou as três antes da primeira execução que
alcançasse browser. A confirmou o tratamento em mensagem da mesma missão.
Esta é revisão de código observacional de autoria C, independente de A.

## Revisão de A por C

- `RV-C-A-001`, P2, `scripts/hf-inv-nav4-probe.ts`, `originProbe`:
  `page.goto('/workspace')` descartava a resposta; URL e cookie sozinhos
  permitem falso baseline autenticado se o documento responder500. Exigir
  documento200 mais prontidão privada ou `/api/auth/me`200 no mesmo jar.
  C comunicou a A e à coordenação antes de qualquer conclusão de jornada.
  Resolvido por A antes da v3: `workspace.status()===200`, heading privado
  real e `/api/auth/me`200/success passam a ser exigidos. C releu o código
  atualizado e a projeção pública: 12 baselines satisfazem documento200,
  sessão200 e heading autenticado. Estado: tratado com contraprova.
- `RV-C-A-002`, lacuna de prova temporal, `loginProbe`:
  `responseObserved > 0 && responseObserved <= Date.now()` comprova somente
  listener observado antes da assertion, não a ordem real resposta→rota.
  Capturar evento temporal da navegação ou restringir explicitamente o claim.
  Resolvido por A antes da v3: listeners `response` e `framenavigated` usam
  relógio monotônico antes do clique e assertion de ordem. C releu código e
  três registros de login com deltas resposta→destino368/189/195ms, todos
  não negativos. Estado: tratado com contraprova; isso não resolve a causa
  histórica de INV-004.

Os guards de dotenv, allowlist de ambiente, schema próprio, origem externa
recusada, login real sem mock e cleanup do PID criado foram inspecionados.
Este parecer não examinou resultados ainda não produzidos nem autoriza
substituir a revisão final da candidata integrada.

## Revisão de B por C

`EVIDENCIA_IMPLEMENTACAO`: revisão estática do protocolo B e
`tests/investigations/ihfr/two-request-quota.test.ts`, commit informado
`6ddb1e4`. Nenhum P0–P2 estático identificado. Duas chamadas novas,
barreiras pré-INSERT, commit do vencedor antes da liberação do perdedor,
provedor fake explícito, projeção sem SQL/parâmetros e invariantes finais
9/36→10/40 estão presentes. O `finally` libera gates e observa promises.

`RECOMENDACAO`: verificar em runtime ambas as chegadas à barreira; a fase2
numérica e o `areaCover.upsert` anterior poderiam tornar a sincronização
inviável sob outro schedule. Falha da barreira não seria diagnóstico do
produto. B respondeu que ambos os espelhos atingiram `before-insert` com
snapshot comum, commit observado e um conflito40001 seguido de quota,
2/2PASS. C depois leu a projeção pública `ihfr/run-evidence.json`: comandos,
proveniência/contagens e schedule vencedor A com9/36→10/40, dois eventos
pré-INSERT e resultado `RATE_LIMITED` estão efetivamente registrados.
Não se afirma inspeção integral dos artifacts brutos de B neste parecer.
