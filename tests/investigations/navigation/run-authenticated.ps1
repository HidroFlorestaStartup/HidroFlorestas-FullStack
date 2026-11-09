param([Parameter(Mandatory=$true)][ValidateSet('Stage','Prepare','Run','Audit','Stop')][string]$Phase)
$ErrorActionPreference='Stop'
$taskRepository=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../../..'))
if ([IO.Path]::GetFullPath((Get-Location).Path) -ne $taskRepository) { throw 'Run from the isolated C worktree root.' }
$taskRuntime=[IO.Path]::GetFullPath((Join-Path $taskRepository '.accounts-validation/navigation-runtime'))
if (-not $taskRuntime.StartsWith($taskRepository+[IO.Path]::DirectorySeparatorChar,[StringComparison]::OrdinalIgnoreCase)) { throw 'Runtime path refused.' }
foreach ($taskDotenv in @('.env','.env.local','.env.development','.env.development.local','.env.test','.env.test.local','.env.production','.env.production.local')) {
  if(Test-Path -LiteralPath (Join-Path $taskRepository $taskDotenv)){ throw 'Preexisting dotenv refused without reading contents.' }
}
$taskMarkerPath=Join-Path $taskRuntime 'mission-owner.json'
if (-not (Test-Path -LiteralPath $taskRuntime)) {
  [void](New-Item -ItemType Directory -Path $taskRuntime)
  @{ mission='HF-INV-20261023-01-LOCAL01'; owner='agent-c-navigation'; root=$taskRuntime } | ConvertTo-Json | Set-Content -LiteralPath $taskMarkerPath -Encoding utf8
}
if ((Get-Item -LiteralPath $taskRuntime).Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'Runtime redirection refused.' }
if (-not (Test-Path -LiteralPath $taskMarkerPath -PathType Leaf)) { throw 'Mission marker required.' }
$taskMarker=Get-Content -LiteralPath $taskMarkerPath -Raw | ConvertFrom-Json
if ($taskMarker.mission -ne 'HF-INV-20261023-01-LOCAL01' -or $taskMarker.owner -ne 'agent-c-navigation' -or $taskMarker.root -ne $taskRuntime) { throw 'Mission marker mismatch.' }
$taskSid=[Security.Principal.WindowsIdentity]::GetCurrent().User.Value
& icacls $taskRuntime /grant:r ('*'+$taskSid+':(OI)(CI)F') '*S-1-5-18:(OI)(CI)F' *> $null
if ($LASTEXITCODE -ne 0) { throw 'Private directory access grant failed.' }
& icacls $taskRuntime /inheritance:r *> $null
if ($LASTEXITCODE -ne 0) { throw 'Private directory inheritance removal failed.' }
$taskBrowserCache=Join-Path $env:LOCALAPPDATA 'ms-playwright'
$taskAllowed=@('PATH','SystemRoot','SystemDrive','ProgramData','ProgramFiles','ProgramFiles(x86)','WINDIR','COMSPEC','PATHEXT','TEMP','TMP','USERPROFILE','APPDATA','USERNAME','USERDOMAIN','HOMEDRIVE','HOMEPATH','OS','PROCESSOR_ARCHITECTURE','NUMBER_OF_PROCESSORS','PSModulePath')
foreach($taskName in @(Get-ChildItem Env: | Select-Object -ExpandProperty Name)){if($taskAllowed -notcontains $taskName){Remove-Item -LiteralPath ('Env:'+$taskName)}}
$env:LOCALAPPDATA=Join-Path $taskRuntime 'localappdata'
$env:PLAYWRIGHT_BROWSERS_PATH=$taskBrowserCache
$env:NEXT_TELEMETRY_DISABLED='1'
$env:GIT_CONFIG_COUNT='1'
$env:GIT_CONFIG_KEY_0='safe.directory'
$env:GIT_CONFIG_VALUE_0=$taskRepository.Replace('\','/')
function New-TaskKey {
  $taskBytes=New-Object byte[] 32; $taskRandom=[Security.Cryptography.RandomNumberGenerator]::Create()
  try {$taskRandom.GetBytes($taskBytes); [Convert]::ToBase64String($taskBytes)}
  finally {$taskRandom.Dispose(); [Array]::Clear($taskBytes,0,$taskBytes.Length)}
}
$env:ACCOUNT_POLICY_ENABLED='1'
$env:ACCOUNT_PROOF_ACTIVE_KEY_ID='synthetic'
$env:ACCOUNT_PROOF_KEYS=(@{synthetic=(New-TaskKey)} | ConvertTo-Json -Compress)
$env:ACCOUNT_REQUEST_KEY=New-TaskKey
$env:MAIL_PAYLOAD_ACTIVE_KEY_ID='synthetic'
$env:MAIL_PAYLOAD_ENCRYPTION_KEYS=(@{synthetic=(New-TaskKey)} | ConvertTo-Json -Compress)
$env:MAIL_IDEMPOTENCY_KEY=New-TaskKey
$env:MAIL_WORKER_SECRET=New-TaskKey
$env:JWT_SECRET=New-TaskKey
$env:APP_PUBLIC_URL='https://synthetic.example.invalid'
$env:ACCOUNT_TRUSTED_INGRESS='local'
$taskId=(Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssfffZ')
$taskLog=Join-Path $taskRuntime ($Phase+'-'+$taskId+'.log')
$taskScripts=Join-Path $taskRepository 'scripts'
$taskExit=1
try {
  switch($Phase){
    'Stage' { $global:LASTEXITCODE=0 }
    'Prepare' { & (Join-Path $taskScripts 'accounts-validation.ps1') -Gate RegressionSetup *> $taskLog }
    'Run' { & (Join-Path $taskScripts 'accounts-local-postgresql.ps1') -Action Run -DatabaseMode Regression -Executable node -CommandArguments @('node_modules/@playwright/test/cli.js','test','--config=tests/investigations/navigation/authenticated.config.ts') *> $taskLog }
    'Audit' { & (Join-Path $taskScripts 'accounts-validation.ps1') -Gate SchemaAudit *> $taskLog }
    'Stop' { & (Join-Path $taskScripts 'accounts-local-postgresql.ps1') -Action Stop *> $taskLog }
  }
  $taskExit=$LASTEXITCODE
} catch { [IO.File]::AppendAllText($taskLog, $_.Exception.ToString()); $taskExit=1 }
@{phase=$Phase;id=$taskId;exitCode=$taskExit;rawLogPublished=$false;owner='agent-c-navigation'} | ConvertTo-Json -Compress | Write-Output
exit $taskExit
