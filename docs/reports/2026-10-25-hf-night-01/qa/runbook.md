# Runbook QA sob demanda

Resultado final e tentativas: [baseline.json](baseline.json). Os logs desta pasta foram movidos por privacidade: [private-log-index.json](private-log-index.json) conserva tamanho/SHA/localização ignorada; [sanitized-excerpts.md](sanitized-excerpts.md) contém somente excertos públicos. Nenhum `.log` é artefato versionado. Instrumentos têm recibos próprios.

## Bootstrap local novo

Preparação explícita em processo só de sistema/sintético, sem dotenv/provedor/SMTP. Usar o mesmo token de Windows durante instalação/execução; preservar antes o caminho do cache Chromium. Nenhuma opção CI é chamada. Exemplo no início de uma coorte nova:

```powershell
$qaWorktree = (Get-Location).Path
$qaValidation = [IO.Path]::GetFullPath((Join-Path $qaWorktree '.accounts-validation'))
$qaRuntime = [IO.Path]::GetFullPath((Join-Path $qaValidation 'fresh-cohort/localappdata'))
$qaCluster = [IO.Path]::GetFullPath((Join-Path $qaRuntime 'HidroFlorestas/accounts-postgresql'))
if (-not $qaCluster.StartsWith($qaValidation + [IO.Path]::DirectorySeparatorChar,[StringComparison]::OrdinalIgnoreCase)) { throw 'Outside own workspace.' }
if (Test-Path -LiteralPath $qaCluster) { throw 'Requires absent cluster; preserve existing material.' }
$qaAncestor = Split-Path -Parent $qaCluster
while ($qaAncestor.StartsWith($qaWorktree,[StringComparison]::OrdinalIgnoreCase)) {
  if ((Test-Path -LiteralPath $qaAncestor) -and ((Get-Item -LiteralPath $qaAncestor).Attributes -band [IO.FileAttributes]::ReparsePoint)) { throw 'Redirected ancestor.' }
  $qaAncestor = Split-Path -Parent $qaAncestor
}
New-Item -ItemType Directory -Path $qaCluster -Force | Out-Null
if ((Get-Item -LiteralPath $qaCluster).Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'Redirected directory.' }
$qaAcl = New-Object Security.AccessControl.DirectorySecurity
$qaAcl.SetAccessRuleProtection($true,$false)
$qaSid = [Security.Principal.WindowsIdentity]::GetCurrent().User
foreach ($qaPrincipal in @($qaSid,[Security.Principal.SecurityIdentifier]::new('S-1-5-18'))) {
  $qaAcl.AddAccessRule([Security.AccessControl.FileSystemAccessRule]::new($qaPrincipal,'FullControl','ContainerInherit, ObjectInherit','None','Allow'))
}
Set-Acl -LiteralPath $qaCluster -AclObject $qaAcl
if (@((Get-Acl -LiteralPath $qaCluster).Access).Count -ne 2) { throw 'Private ACL failed.' }
npm install --prefix $qaCluster --ignore-scripts --no-audit --no-fund '@embedded-postgres/windows-x64@17.10.0-beta.17'
if ($LASTEXITCODE -ne 0) { throw 'Install failed.' }
Push-Location (Join-Path $qaCluster 'node_modules/@embedded-postgres/windows-x64')
try { node scripts/hydrate-symlinks.js; if ($LASTEXITCODE -ne 0) { throw 'Preparation failed.' } }
finally { Pop-Location }
$env:LOCALAPPDATA = $qaRuntime
./scripts/accounts-local-postgresql.ps1 -Action Start
```

O script oficial cria marker/credencial e verifica ACL; não fabricar esses arquivos. Conferir hash/versão antes dos gates. O v3 observado usou somente o binário lido/hash-conferido do v2; data/credential/marker não foram copiados. Uma coorte fresca exige14 migrations,0 tabelas reference e0 usuários/labs/áreas/coletas/audit antes das fixtures. Stop preserva os dados; não limpar auditoria para obter PASS. Se qualquer ancestral do diretório escolhido for reparse point ou material de outra missão, recusar a preparação.

## Investigações manuais

Condição `react-server` é necessária para imports do servidor. Com a sessão de sistema/sintética preparada e o runtime próprio selecionado, executar serialmente:

```powershell
try {
  ./scripts/accounts-local-postgresql.ps1 -Action Run -DatabaseMode Schema -Executable node -CommandArguments @('--conditions=react-server','--import=tsx','--test','--test-concurrency=1','tests/investigations/ihfr/two-request-quota.test.ts')
} finally { ./scripts/accounts-local-postgresql.ps1 -Action Stop }
```

Custo quota: duas schedules de AreaCoverService/FakeCoverProvider, até90s por teste no guard existente, sem upload real. Exigir audit posterior de schemas no banco próprio selecionado. A primeira invocação histórica sem condição react-server falhou no import com0 schedules iniciadas; conservar SETUP_FAIL.

```powershell
$env:HF_LOCAL_READINESS_CONFIRMATION = 'HIDROFLORESTAS_LOCAL_READINESS_20261025'
try {
  ./scripts/accounts-local-postgresql.ps1 -Action Run -DatabaseMode Schema -Executable node -CommandArguments @('--conditions=react-server','--import=tsx','scripts/local-readiness.ts')
} finally { ./scripts/accounts-local-postgresql.ps1 -Action Stop }
```

Configurar também tiles loopback e attribution canônica conforme instrução abaixo. O030 recusa dotenv, destino externo, contexto herdado app/regression, CI e SMTP/Cloudinary. Cria schema efêmero,100/1000 alvo+10/100 ruído, Next em porta loopback livre e browser com requests externos/mutações bloqueados. Custo:110 GETs sequenciais,2 consultas efetivas observadas neste ensaio+EXPLAIN ANALYZE,100 seleções e2 navegações. Orçamento cooperativo5min, readiness60s/request10s; operações em curso e cleanup best-effort podem estender5min. Não é prazo máximo global. Exit0=PASS,2=GOAL_NOT_MET,1=FAIL/REFUSED; o wrapper oficial converte comando não zero em falha, então interpretar também o recibo. Nunca repetir automaticamente até verde.

O resumo informa caminho relativo privado `.../readiness/<run-id>/result.json`. Copiar somente esse JSON sanitizado e metadados de comando/UTC; server.log fica privado. Conferir fingerprint antes/depois,100 amostras e associação completa das fixtures, metas500ms/2s e cleanup. [Quickstart030](../../../../specs/030-local-readiness-instruments/quickstart.md). Tecnologia assistiva real, participantes e produção não foram medidos.

## Restore sintético observado

[Resultado](synthetic-restore.json): duas databases novas com markers próprios source/target; source derivada somente da coorte sintética v3 com um probe User/Lab/Membership/Area/Collection, target template0 com0 tabelas. Não apontar comandos para nomes/URLs de outra missão. Credencial só em env do processo filho, sem argumento/arquivo público. Dump/logs privados; nenhuma instalação no sistema.

O embedded não tinha pg_dump/pg_restore (tentativa1FAIL). Clientes EDB17.11 oficiais foram baixados separadamente:381.531.864 bytes, SHA256 `80379b2c04d51c30225532e0ae04509899141e9957ed096fe749d7fd9df8f82f`, sidecar coincidente, apenas dois EXEs e DLLs extraídos com hashes/versão registrados. Servidor17.10 intacto. [EDB Windows binaries](https://www.enterprisedb.com/download-postgresql-binaries).

Comandos reais: `pg_dump --format=custom --no-acl --file <private-dump> --dbname <owned-source>` e `pg_restore --single-transaction --exit-on-error --no-owner --no-privileges --dbname <owned-empty-target> <private-dump>`. Sem --clean/--disable-triggers. [PostgreSQL17 pg_dump](https://www.postgresql.org/docs/17/app-pgdump.html) e [pg_restore](https://www.postgresql.org/docs/17/app-pgrestore.html) fundamentam formato/atomicidade/destino vazio, sem provar ambiente hospedado.

Comparação:26 tabelas por count+digest ordenado,14 migrations/checksums/completion,47 FKs/flags e17 triggers/enabled iguais. Oito CHECKs diferiram textualmente em pg_get_expr/constraintdef no mesmo servidor; gate integral FAIL preservado, sem normalização ou novo dump para obter verde. Não extrapolar tabelas vazias como contraprova de todos os CHECKs. Source/target/dump preservados, servidor parado. Custos ferramentas: dump229ms,restore466ms; download381MB separado. Restore operacional/RTO/RPO, ownership/privileges e ciência não demonstrados.

Complemento finito autorizado: protocolo `docs/reports/2026-10-25-hf-night-01/restore-check-analysis.md`, SHA256 `e31beb00fe00d51098a5f6d138c6a7ef7d792ec63150bdf431575b464af3a6f6`, sob ownership/publicação do coordenador. Não reproduzir a partir de uma versão de hash diferente sem revisão. Primeiro bloco: apenas catálogos, BEGIN READ ONLY, timeout5s e ROLLBACK; confrontar markers,19 ocorrências de colunas, versões e as oito expressões exatas de cada lado. [Metadata observada](restore-check-metadata.json): tipos temporais timestamp(3) with time zone em ambas, NOT NULL em todos os19 campos. Tipo real observado decide fixtures sintéticas deste ensaio; não reescrever migrations/schema para alinhar proposta histórica.

Segundo bloco:94 vetores SELECT/VALUES por database source/target própria, TIMESTAMPTZ com offset+00 para os campos temporais;16 expressões originais intactas. Exigir drift guard, metadata compatível, READ ONLY/timeout5s/ROLLBACK e94 pares checkName/caseId únicos. Comparar booleans/NULL usando IS NOT DISTINCT FROM; nunca converter NULL em false/string. Publicar somente caseIds/booleans/NULL/contagens e metadados; não dados de tabelas, SQLparams ou credenciais. [Recibo](restore-check-probes.json) passou188 casos/0 divergências em172,269ms,31 TRUE/41 FALSE/22 NULL por base. Gate textual FAIL preservado; UNKNOWN aceito por CHECK não desativa NOT NULL. Nenhum INSERT/DDL/dump novo foi executado. A [primeira recusa](restore-check-probes-attempt1.json) ocorreu antes de conectar por falso positivo do scanner no literal `delete-account`; guard corrigido para diferenciar tokens de strings/comentários, protocolo inalterado. Stop oficial final foi confirmado antes da próxima janela da equipe.

`RECOMENDACAO`: usar este roteiro somente para repetir HF-NIGHT-01 em worktree própria. O resultado depende do SHA/fingerprint e ambiente registrados; nenhuma equivalência de CI/homologação é presumida. Fontes: scripts/rc-review-validation.ps1, accounts-local-postgresql.ps1 e docs/operations/rc-review-ci-runbook.md.

1. Confirmar worktree/branch/base e git status, ler instruções/fontes. Não ler dotenv nem credenciais existentes; recusar `.env`, `.env.local` e variantes de execução presentes. Node24.19/npm12, Chromium local e dependências do lockfile.
2. Executar `npm ci --no-audit --no-fund`, depois `npx prisma generate` ANTES de testes. Não aprovar todos os lifecycle scripts para contornar avisos. Se download for bloqueado, registrar a tentativa e permitir somente obtenção dos artefatos públicos pinados. Não mudar versões.
3. Rodar typecheck/lint/build/unitários com command/UTC/duração/exit/log. Scripts que dependem de tsx podem falhar no token Windows restrito antes de executar; o diagnóstico não conta como teste. Preservar FAIL e repetir sob token autorizado, com contexto de sistema/sintético.
4. Criar runtime novo dentro da própria `.accounts-validation/`, caminho absoluto verificado dentro da worktree, sem reparse point e sem material preexistente. Configurar ACL privada de currentUser+SYSTEM, FullControl e herança de filhos, exatamente dois principals; criação e instalação precisam usar o mesmo token. Não reparar ACL nem reclamar ownership de material antigo.
5. Instalar apenas `@embedded-postgres/windows-x64@17.10.0-beta.17` no prefixo do cluster novo com `--ignore-scripts --no-audit --no-fund`. Ler e executar somente `scripts/hydrate-symlinks.js` do pacote revisado. Registrar `postgres --version` e SHA256 do exe. Não usar `-InitializeCiCluster` fora de Actions nem falsificar suas flags.
6. Em processo filho exclusivo, herdar só variáveis de sistema; preservar referência ao browser cache antes de apontar LOCALAPPDATA para o runtime da QA. Definir NEXT_TELEMETRY_DISABLED=1 e PLAYWRIGHT_BROWSERS_PATH para o cache local. O runner oficial gera chaves sintéticas e remove SMTP/recipients/dotenv. Não imprimir o ambiente.
7. Executar runner abaixo. Usar somente recursos próprios e serializar PostgreSQL/Next; se porta55427/3001 ocupada por processo alheio, interromper esse recorte e identificar ownership, sem matar processo ou reutilizar servidor. Preservar guards/assertions/retries0.

```powershell
./scripts/rc-review-validation.ps1 -Gates @('RegressionSetup','Integration','Migration','Contract','R1','E2E','Https','Deletion','Ihfr','Bootstrap','SchemaAudit')
```

Junto dos quatro gates independentes Unit/Build/Typecheck/Lint, isso cobre os15gates oficiais. A primeira falha para a sequência; não atribuir PASS aos posteriores. Recibos ficam em `.accounts-validation/results.jsonl`, logs já redigidos pelo collector; copiar somente evidência sanitizada, nunca clixml, dump, cookie, dotenv ou trace bruto. O campo snapshot identifica entradas funcionais da árvore e deve ser constante no baseline; documentação não o altera. Código de instrumentos novos requer fingerprint e validação próprios.

Custo/limites: npm ci553pacotes nesta base; PostgreSQL binário pinado e migrations14 em três bancos sintéticos próprios; suíte atual unit402+mail17, integração231, migration37, contrato6, E2E220 e subconjuntos dedicados. E2E serial pode consumir dezenas de minutos. Não há carga ou upload a provedores; SMTP real de teste é somente loopback. Runtime/dados locais são preservados por Stop; Dispose só se solicitado e nunca contra cluster antigo.

A execução das investigações existentes é separada do baseline. `tests/investigations/ihfr/two-request-quota.test.ts` contém duas schedules de AreaCoverService com FakeCoverProvider; não constitui prova científica ou recuperação IHFR. Usar uma execução serial, schema owned efêmero, timeout90s por teste e audit posterior. Instrumento territorial030 tem roteiro e orçamento próprios em `specs/030-local-readiness-instruments/quickstart.md`.

Restore local sintético, se executado: somente após baseline parar, em database fresco criado nesta missão e no mesmo cluster owned; dump/credential ficam no runtime ignorado, sem publicação. Comparar migrations, cardinalidades e integridade do destino e registrar falha sem reclamar restaurabilidade operacional real. Nenhum comando usa banco/provedor hospedado.

Antes de iniciar qualquer gate com browser/Next, configurar nesta sessão sintética `NEXT_PUBLIC_MAP_TILE_URL` como template `https://127.0.0.1:1/{z}/{x}/{y}.png` e `NEXT_PUBLIC_MAP_ATTRIBUTION` como a atribuição canônica esperada (`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`). Essas duas configurações suportadas atravessam o wrapper e o `serverEnvironment` do Playwright; evitam que o fallback dev use OSM em cenários que não interceptam tiles. Não mudar assertions, retries ou timeout para obter PASS. O ensaio E2E parcial inicial foi preservado como incompleto e refeito por esse motivo.
