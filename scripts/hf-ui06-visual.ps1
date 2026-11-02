param(
  [Parameter(Mandatory=$true)][ValidateSet('shell','domain')][string]$Suite,
  [ValidateSet('focal-3','complete-75')][string]$CaseSet
)
$ErrorActionPreference='Stop'
& node (Join-Path $PSScriptRoot 'hf-ui044-pr50-contract.mjs') --runner
if ($LASTEXITCODE) { throw 'UI06 requires its exact authorized hosted Windows push and first attempt.' }
if ($Suite -ne 'domain' -or -not $CaseSet) { throw 'PR50 requires an explicit domain case set.' }
$env:HF_UI044_PUSH_GUARD='PASS'
$env:HF_UI044_CASE_SET=$CaseSet
if ((& node --version).Trim() -ne 'v24.19.0' -or $LASTEXITCODE) { throw 'Expected runner Node 24.19.0.' }
$ui06GlobalModules=(& npm root --global).Trim()
if ($LASTEXITCODE) { throw 'Cannot resolve runner-only Bun package.' }
$ui06BunPackage=Join-Path $ui06GlobalModules 'bun'
$ui06BunManifest=Get-Content -LiteralPath (Join-Path $ui06BunPackage 'package.json') -Raw | ConvertFrom-Json
if ($ui06BunManifest.version -ne '1.3.11') { throw 'Expected runner Bun package 1.3.11.' }
# npm exposes command shims on Windows; launch the package's actual PE binary.
# bun-v1.3.11/packages/bun-release/src/npm/install.ts installs bin/bun.exe.
$ui06Bun=Join-Path $ui06BunPackage 'bin/bun.exe'
if (-not (Test-Path -LiteralPath $ui06Bun -PathType Leaf)) { throw 'Runner Bun executable missing.' }
if ((& $ui06Bun --version).Trim() -ne '1.3.11' -or $LASTEXITCODE) { throw 'Expected runner Bun 1.3.11.' }
$ui06Starter=Join-Path (Split-Path (Get-Location) -Parent) 'starter'
$ui06Archive=Join-Path (Get-Location) ('.accounts-validation/ui06-b-'+$CaseSet)
if (Test-Path -LiteralPath $ui06Archive) { throw 'UI06 archive already exists; no evidence may be reused.' }
$env:HF_UI044_SUITE=$Suite
$env:HF_UI044_ARCHIVE=$ui06Archive
$ui06Process=$null
$ui06Provisioned=$false
$ui06PrimaryFailed=$false
$ui06CleanupFailed=$false
$ui06Environment=@{}
$ui06Receipt=@{node='24.19.0';bun='1.3.11';caseSet=$CaseSet;sourceSha=$env:GITHUB_SHA;
  tree=(& git rev-parse 'HEAD^{tree}').Trim();run=$env:GITHUB_RUN_ID;attempt=$env:GITHUB_RUN_ATTEMPT;
  setup='NOT_RUN';capture='NOT_RUN';stop='NOT_RUN';starterStop='NOT_RUN'}
# Same ephemeral application-protection recipe as the official RC runner.
# PostgreSQL/JWT/session credentials and ownership come only from its wrapper.
function New-Ui06SyntheticKey {
  $ui06Bytes=New-Object byte[] 32
  $ui06Random=[Security.Cryptography.RandomNumberGenerator]::Create()
  try { $ui06Random.GetBytes($ui06Bytes); [Convert]::ToBase64String($ui06Bytes) }
  finally { $ui06Random.Dispose(); [Array]::Clear($ui06Bytes,0,$ui06Bytes.Length) }
}
try {
  $ui06Provisioned=$true # Stop owned cluster even if provisioning fails after startup.
  & ./scripts/rc-review-validation.ps1 -InitializeCiCluster -Gates RegressionSetup
  if ($LASTEXITCODE) { throw 'Official synthetic regression setup failed.' }
  # The official runner has already stopped the cluster in its finally.
  $ui06Provisioned=$true
  $ui06Receipt.setup='PASS'
  $ui06Values=@{
    ACCOUNT_POLICY_ENABLED='1'; ACCOUNT_PROOF_ACTIVE_KEY_ID='synthetic'
    ACCOUNT_PROOF_KEYS=(@{synthetic=(New-Ui06SyntheticKey)} | ConvertTo-Json -Compress)
    MAIL_PAYLOAD_ACTIVE_KEY_ID='synthetic'
    MAIL_PAYLOAD_ENCRYPTION_KEYS=(@{synthetic=(New-Ui06SyntheticKey)} | ConvertTo-Json -Compress)
    MAIL_IDEMPOTENCY_KEY=(New-Ui06SyntheticKey); MAIL_WORKER_SECRET=(New-Ui06SyntheticKey)
    APP_PUBLIC_URL='https://synthetic.example.invalid'; ACCOUNT_TRUSTED_INGRESS='local'
  }
  foreach ($ui06Name in $ui06Values.Keys) {
    $ui06Previous=Get-Item -LiteralPath "Env:$ui06Name" -ErrorAction SilentlyContinue
    $ui06Environment[$ui06Name]=@{present=($null -ne $ui06Previous);value=if($ui06Previous){$ui06Previous.Value}else{$null}}
    Set-Item -LiteralPath "Env:$ui06Name" -Value $ui06Values[$ui06Name]
  }
  $ui06Process=Start-Process -FilePath $ui06Bun -ArgumentList @('run','dev','--host','127.0.0.1','--port','4173') -WorkingDirectory $ui06Starter -PassThru -WindowStyle Hidden -RedirectStandardOutput (Join-Path $env:RUNNER_TEMP 'ui06-starter.stdout') -RedirectStandardError (Join-Path $env:RUNNER_TEMP 'ui06-starter.stderr')
  $ui06Watch=[Diagnostics.Stopwatch]::StartNew()
  $ui06Ready=$false
  while ($ui06Watch.Elapsed.TotalSeconds -lt 90) {
    if ($ui06Process.HasExited) { throw 'Starter exited before readiness.' }
    try { if ((Invoke-WebRequest 'http://127.0.0.1:4173/login' -TimeoutSec 2).StatusCode -eq 200) { $ui06Ready=$true; break } } catch {}
    Start-Sleep -Milliseconds 250
  }
  if (-not $ui06Ready) { throw 'Starter readiness exceeded 90 seconds.' }
  # Run starts/verifies the owned cluster and supplies the guarded Regression
  # context, synthetic login password/JWT/request key. No explicit Start needed.
  $ui06Receipt.capture='FAIL'
  $ui06Timeout=if($CaseSet -eq 'focal-3'){'600000'}else{'1440000'}
  & ./scripts/accounts-local-postgresql.ps1 -Action Run -DatabaseMode Regression -Executable node -CommandArguments @('node_modules/@playwright/test/cli.js','test','--config=qa/hf-ui044/playwright.visual.config.ts','--workers=1','--retries=0',"--global-timeout=$ui06Timeout")
  if ($LASTEXITCODE) { throw 'UI06 focal capture failed; no bilateral acceptance inferred.' }
  $ui06Receipt.capture='PASS'
  & git diff --exit-code --quiet
  if ($LASTEXITCODE) { throw 'FullStack tracked source drifted during capture.' }
  & git -C $ui06Starter diff --exit-code --quiet
  if ($LASTEXITCODE) { throw 'Starter tracked source drifted during capture.' }
} catch { $ui06PrimaryFailed=$true; throw }
finally {
  if ($ui06Process) {
    try {
      if (-not $ui06Process.HasExited) { & taskkill.exe /PID $ui06Process.Id /T /F | Out-Null; if ($LASTEXITCODE) { throw 'Starter process cleanup failed.' } }
      $ui06Receipt.starterStop='PASS'
    } catch { $ui06CleanupFailed=$true; $ui06Receipt.starterStop='FAIL' }
  }
  if ($ui06Provisioned) {
    try { & ./scripts/accounts-local-postgresql.ps1 -Action Stop; if ($LASTEXITCODE) { throw 'Owned cluster stop failed.' }; $ui06Receipt.stop='PASS' }
    catch { $ui06CleanupFailed=$true; $ui06Receipt.stop='FAIL' }
  }
  foreach ($ui06Name in $ui06Environment.Keys) {
    if ($ui06Environment[$ui06Name].present) { Set-Item -LiteralPath "Env:$ui06Name" -Value $ui06Environment[$ui06Name].value }
    else { Remove-Item -LiteralPath "Env:$ui06Name" -ErrorAction SilentlyContinue }
  }
  $ui06Values=$null; $ui06Environment=$null
  New-Item -ItemType Directory -Force -Path $ui06Archive | Out-Null
  if (Test-Path -LiteralPath (Join-Path $ui06Archive 'runner.json')) { throw 'Runner receipt collision; preserve first receipt.' }
  $ui06Receipt | ConvertTo-Json | Set-Content -Encoding utf8 (Join-Path $ui06Archive 'runner.json')
  if ($ui06CleanupFailed -and -not $ui06PrimaryFailed) { throw 'UI06 cleanup failed.' }
}
