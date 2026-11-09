param(
  [switch]$InitializeCiCluster,
  [ValidateSet('RegressionSetup','Unit','Integration','Migration','Contract','R1','Build','Typecheck','Lint','E2E','Https','Deletion','Ihfr','Bootstrap','SchemaAudit')]
  [string[]]$Gates=@('RegressionSetup','Unit','Integration','Migration','Contract','R1','Build','Typecheck','Lint','E2E','Https','Deletion','Ihfr','Bootstrap','SchemaAudit')
)
$ErrorActionPreference='Stop'
if ($env:OS -ne 'Windows_NT') { throw 'RC review runner requires Windows and the existing owned PostgreSQL harness.' }
if (-not $Gates.Count) { throw 'At least one validation gate is required.' }
if ($InitializeCiCluster) {
  if ($env:GITHUB_ACTIONS -ne 'true' -or $env:RUNNER_OS -ne 'Windows') { throw 'Fresh cluster installation is restricted to the isolated Windows Actions runner.' }
  $rcParent=[IO.Path]::GetFullPath((Join-Path $env:LOCALAPPDATA 'HidroFlorestas'))
  $rcCluster=[IO.Path]::GetFullPath((Join-Path $rcParent 'accounts-postgresql'))
  if (-not $rcCluster.StartsWith($rcParent+[IO.Path]::DirectorySeparatorChar,[StringComparison]::OrdinalIgnoreCase)) { throw 'Unexpected cluster directory.' }
  if (Test-Path -LiteralPath $rcCluster) { throw 'CI installation requires a fresh directory; existing data is preserved.' }
  New-Item -ItemType Directory -Path $rcCluster -Force | Out-Null
  # Establish the exact private ACL on this newly created CI directory before
  # npm writes any files. The existing ownership/ACL guard still verifies it.
  if ((Get-Item -LiteralPath $rcCluster).Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'Fresh CI directory is redirected.' }
  $rcAcl=New-Object Security.AccessControl.DirectorySecurity
  $rcAcl.SetAccessRuleProtection($true,$false)
  $rcCurrentSid=[Security.Principal.WindowsIdentity]::GetCurrent().User
  foreach ($rcSid in @($rcCurrentSid,[Security.Principal.SecurityIdentifier]::new('S-1-5-18'))) {
    $rcRule=[Security.AccessControl.FileSystemAccessRule]::new($rcSid,'FullControl','ContainerInherit, ObjectInherit','None','Allow')
    $rcAcl.AddAccessRule($rcRule)
  }
  Set-Acl -LiteralPath $rcCluster -AclObject $rcAcl
  $rcVerifiedAcl=Get-Acl -LiteralPath $rcCluster
  if (-not $rcVerifiedAcl.AreAccessRulesProtected -or @($rcVerifiedAcl.Access).Count -ne 2) { throw 'Fresh CI private ACL setup failed.' }
  & npm install --prefix $rcCluster --ignore-scripts --no-audit --no-fund '@embedded-postgres/windows-x64@17.10.0-beta.17'
  if ($LASTEXITCODE -ne 0) { throw 'Pinned PostgreSQL binary installation failed.' }
  # Reviewed package script only; never enable all dependency lifecycle scripts.
  Push-Location (Join-Path $rcCluster 'node_modules/@embedded-postgres/windows-x64')
  try { & node scripts/hydrate-symlinks.js; if ($LASTEXITCODE -ne 0) { throw 'Native PostgreSQL preparation failed.' } }
  finally { Pop-Location }
}
function New-RcSyntheticKey {
  $rcBytes=New-Object byte[] 32; $rcRandom=[Security.Cryptography.RandomNumberGenerator]::Create()
  try { $rcRandom.GetBytes($rcBytes); [Convert]::ToBase64String($rcBytes) }
  finally { $rcRandom.Dispose(); [Array]::Clear($rcBytes,0,$rcBytes.Length) }
}
$rcEnvironment=@{
  ACCOUNT_POLICY_ENABLED='1'; ACCOUNT_PROOF_ACTIVE_KEY_ID='synthetic';
  ACCOUNT_PROOF_KEYS=(@{synthetic=(New-RcSyntheticKey)} | ConvertTo-Json -Compress);
  ACCOUNT_REQUEST_KEY=(New-RcSyntheticKey); MAIL_PAYLOAD_ACTIVE_KEY_ID='synthetic';
  MAIL_PAYLOAD_ENCRYPTION_KEYS=(@{synthetic=(New-RcSyntheticKey)} | ConvertTo-Json -Compress);
  MAIL_IDEMPOTENCY_KEY=(New-RcSyntheticKey); MAIL_WORKER_SECRET=(New-RcSyntheticKey);
  JWT_SECRET=(New-RcSyntheticKey); APP_PUBLIC_URL='https://synthetic.example.invalid'; ACCOUNT_TRUSTED_INGRESS='local'
}
$rcAbsent=@('SMTP_USER','SMTP_APP_PASSWORD','MAIL_FROM','MAIL_SMOKE_CONFIRMATION','MAIL_SMOKE_RECIPIENT','MAIL_SMOKE_ALLOWED_RECIPIENT','DOTENV_CONFIG_PATH')
$rcPrevious=@{}
foreach ($rcKey in @($rcEnvironment.Keys)+$rcAbsent) {
  $rcValue=Get-Item -LiteralPath "Env:$rcKey" -ErrorAction SilentlyContinue
  $rcPrevious[$rcKey]=@{present=($null -ne $rcValue);value=if($rcValue){$rcValue.Value}else{$null}}
}
$rcStarted=$false
try {
  foreach ($rcKey in $rcEnvironment.Keys) { Set-Item -LiteralPath "Env:$rcKey" -Value $rcEnvironment[$rcKey] }
  foreach ($rcKey in $rcAbsent) { Remove-Item -LiteralPath "Env:$rcKey" -ErrorAction SilentlyContinue }
  & (Join-Path $PSScriptRoot 'accounts-local-postgresql.ps1') -Action Start
  $rcStarted=$true
  foreach ($rcGate in $Gates) {
    if ($rcGate -in @('Deletion','Ihfr')) {
      $rcScript=if($rcGate -eq 'Deletion'){'accounts-deletion-e2e'}else{'accounts-ihfr-e2e'}
      & (Join-Path $PSScriptRoot 'accounts-local-postgresql.ps1') -Action Run -DatabaseMode Regression -Executable node -CommandArguments @('--import=tsx','scripts/mail-gate-runner.ts',$rcGate,'.accounts-validation',$rcScript)
    } else { & (Join-Path $PSScriptRoot 'accounts-validation.ps1') -Gate $rcGate }
    if ($LASTEXITCODE -ne 0) { throw "RC gate $rcGate failed; no subsequent PASS inferred." }
  }
} finally {
  try { if ($rcStarted) { & (Join-Path $PSScriptRoot 'accounts-local-postgresql.ps1') -Action Stop } }
  finally {
    foreach ($rcKey in $rcPrevious.Keys) {
      if ($rcPrevious[$rcKey].present) { Set-Item -LiteralPath "Env:$rcKey" -Value $rcPrevious[$rcKey].value }
      else { Remove-Item -LiteralPath "Env:$rcKey" -ErrorAction SilentlyContinue }
    }
    $rcEnvironment=$null; $rcPrevious=$null
  }
}
