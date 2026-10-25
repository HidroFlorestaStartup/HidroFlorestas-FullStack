# HF-NIGHT-01 — verificação combinada de UI

Estado: `AGUARDANDO_REVISAO`, 2026-10-25. Execução e teardown concluídos PASS; revisão independente/publicação pendentes. Executor `/root/fr015`; composição preparada pelo coordenador `/root`; revisão documental independente por `/root/students` em caminho reservado.

## Corte e finalidade

`FATO_DOCUMENTADO`: mandato do coordenador nesta sessão autoriza uma verificação local combinada das PR34/36/38, sem nova funcionalidade, merge em development/main, nova PR funcional duplicada ou operação hospedada. Root criou a branch `test/hf-night-ui-combined-20261025` na worktree `.worktrees/ui`, HEAD `840cd1b6e51d7adc2fd196d177870ff513d5ad87`. A série composta contém daebd71, ddd4e82, fb1523b e1dbe3d4; o último é documental e sozinho não inclui a correção033.

O [manifesto](source-manifest.json) reconfirma15/15blobs iguais aos HEADs fonte:9arquivos da aplicação e6arquivos das suítes UI. Os três incrementos compartilham apenas vercel.json; root resolveu a união mantendo31false=27base+3branches fonte+branch combinada. O executor não alterou código, testes, dependências, configuração ou guardas. Não houve integração de031/034/030 ou mudança de backend/schema.

As revisões independentes dos patches originais continuam nos próprios cortes; este relatório não é novo aceite dos deltas029/032 pelo seu autor. Os resultados Codex remotos pertencem aos três HEADs fonte, não ao HEAD local da composição. O baseline08262dc/e718… não é transferido à composição.

## Preparação e checks concluídos

Comandos completos/UTC/exit/duração estão em [check-results.json](check-results.json); logs ficam privados e ignorados. Todos os seguintes terminaram com exit0:

| Verificação | Resultado | Duração do wrapper |
| --- | --- | --- |
| npm ci --no-audit --no-fund |553pacotes, scripts bloqueados pela política preservados|76,959s|
| npx prisma generate |Prisma7.4.2 local|6,825s|
| npm run typecheck |PASS|8,588s|
| npm run lint |0errors/2warnings preexistentes|15,086s|
| npm run build |PASS|21,110s|
| npm run test:unit |402+mail17 PASS,0skip|14,355s|
| UI member-popup |6/6PASS,0skip/retry|5,276s|
| UI async-read-focus |27/27PASS,0skip/retry|24,659s|
| UI admin-access-focus |14/14PASS,0skip/retry|12,847s|

Os dois warnings permanecem em user-profile/useAuth e white-box/className. SMTP unitário real é somente loopback sintético. As três suítes UI montam componentes/CSS reais com respostas sintéticas, sem Next/DB e com egress bloqueado. Seus tempos Playwright internos são4,0s/23,4s/11,6s, diferentes dos wrappers acima. As contagens são execuções por fronteira, sem total global de testes únicos.

Os comandos UI existentes foram preservados:

```powershell
npx playwright test --config tests/ui/member-popup.config.ts
npx playwright test --config tests/ui/async-read-focus.config.ts
npx playwright test --config tests/ui/admin-access-focus.config.ts
```

## Coorte E2E própria

[Runtime novo](runtime-setup.json): caminho curto sob a própria `.accounts-validation`, ausente antes da criação, ACL privada currentUser+SYSTEM. Somente o pacote público `@embedded-postgres/windows-x64@17.10.0-beta.17` foi copiado; postgres.exe17.10 teve SHA256 `db14ddb0efc10b72b57dc29dbce5a719e2755dcd0ae54297d0ea4bbfc75f79a0` conferido antes/depois. Nenhum data/marker/credential de QA foi copiado. Scripts oficiais criaram o material owned novo; a QA confirmou Stop antes desta janela.

Roteiro oficial serializado:

```powershell
./scripts/rc-review-validation.ps1 -Gates @('RegressionSetup')
# Prova READ ONLY de contagens por wrapper owned, antes das fixtures.
./scripts/rc-review-validation.ps1 -Gates @('E2E')
```

A [prova anterior às fixtures](fresh-empty-proof.json),06:17:06.114Z, registrou14migrations e0usuários/laboratórios/memberships/áreas/coletas/audit; referência com0tabelas. O processo filho conserva somente ambiente de sistema/sintético, sem dotenv/SMTP/provedores reais. Tiles usam loopback indisponível e attribution canônica; workers1/retries0, assertions/timeouts intactos. Apenas os processos próprios serão encerrados; dados/runtime serão preservados.

O [fingerprint inicial](fingerprint-before.json) contém601entradas, `1f11a53ef3a5510ad35033b9000d12b6ae10b4c7e6222c425880f3d5c7ff7eac`, capturado após os checks estáticos/unitários e antes das suítes UI/runtime; git status permaneceu sem alteração funcional desde o recebimento. RegressionSetup, prova fresca, E2E e [fingerprint final](fingerprint-after.json) observam o mesmo valor;601/601paths/hashes físicos permaneceram iguais.

[Resultado E2E](e2e-results.json): **220/220PASS,0skip/retry**, um worker,06:17:07.381Z–06:26:39.050Z,571,669s no collector. O teste403 existente passou nesta composição, sem alteração de assertions, em1,1s. O [recibo de runtime](runtime-result.json) encerrou06:26:40.831Z: PostgreSQL STOPPED, Next encerrado,0listeners nas portas55427/3001; dados preservados. Não houve tentativa falha nem retry nesta rodada. Isso é evidência da composição local nova, não transferência dos resultados individuais.

Os [logs privados](private-log-index.json) conservam SHA256/tamanho/localização ignorada, sem conteúdo bruto publicado. Novos documentos/JSON do pacote são UTF8 sem BOM/LF; [public-artifacts.json](public-artifacts.json) declara hashScope físico e exclui sua própria entrada para evitar autorreferência. Os601arquivos funcionais medidos não foram normalizados ou alterados.

## Spec Kit e limites

Skills reais speckit-analyze/converge lidas da instalação local, sem extensão/hooks conhecidos. Reanálise não destrutiva das specs029/032/033, com check-prerequisites real por contexto explícito e sem persistir feature.json: [30obrigações FR/SC/31tarefas,100% cobertura,0achados](spec-analysis.json). Após os testes, o [converge](spec-convergence.json) avaliou30FR/SC,17cenários de aceite,16decisões de plano e7princípios;0missing/partial/contradicts/unrequested,0tarefas novas. As três tasks ficaram byte-idênticas. Os JSONs são recibos posteriores das skills, não comandos fictícios nem escrita delas nos artefatos históricos. O [plano desta verificação](../../../plans/active/hf-night-ui-combined-20261025.md) registra recorte e sequência, sem criar feature artificial.

Integration/Migration/Contract/HTTPS não foram repetidos: backend/schema permanecem iguais e não houve falha nova que justificasse ampliar o custo. Não se chama este recorte de15gates completos. Execução local de Next dev não é CI remota, homologação, benchmark de produção ou aceite assistivo humano. Reflow200% sintético não substitui zoom/dispositivo/tecnologia assistiva reais. Tiles bloqueados no recorte não provam egress universal nulo; build pode obter artefatos públicos de fonte, e não foi feita captura de rede universal.

G3/G4/G5, pilotos e operação de provedores permanecem sob autoridade humana. IHFR conserva CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
