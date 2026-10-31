# Coleta e recuperação do setup no Windows

`RECOMENDACAO` operacional para HF-SETUP-INCIDENT-20261030. A causa da reinicialização permanece **INCONCLUSIVA** no [relatório](../reports/2026-10-30-hf-setup-incident.md). Este guia não foi executado na máquina afetada e não atesta sua estabilidade. Não reproduza uma reinicialização para investigar.

## 1. Preservar e delimitar

Antes de retomar uma instalação, anote horário aproximado, fuso, sintoma observado, último comando e se houve tela azul, perda de energia, botão pressionado ou aviso de atualização. Não limpe logs/caches nem remova `.env`, `.venv` ou `node_modules` antes de avaliar a evidência. Não publique valores de ambiente ou históricos completos.

Os comandos de coleta abaixo apenas consultam dados existentes e mostram metadados. Execute-os no PowerShell da **máquina afetada**, sem instalar ferramentas e sem elevação automática. Acesso negado, canal desabilitado ou ausência de resultados deve ser registrado como indisponibilidade; não equivale à ausência de incidente. Não habilite novos logs, mude a política de execução ou altere configurações para obter um resultado.

Preencha uma janela explícita de até 24 horas, incluindo minutos antes e depois do reinício, com offset do local no incidente. As variáveis são específicas desta coleta; não mudam o ambiente global.

```powershell
$hfInicioTexto = Read-Host 'Início da janela ISO 8601 com offset (AAAA-MM-DDTHH:mm:ss-03:00)'
$hfFimTexto = Read-Host 'Fim da janela ISO 8601 com offset (AAAA-MM-DDTHH:mm:ss-03:00)'
if ($hfInicioTexto -notmatch '(Z|[+-]\d{2}:\d{2})$' -or
    $hfFimTexto -notmatch '(Z|[+-]\d{2}:\d{2})$') {
    throw 'Informe o offset explicitamente em ambos os horários.'
}
$hfInicio = [DateTimeOffset]::Parse($hfInicioTexto)
$hfFim = [DateTimeOffset]::Parse($hfFimTexto)
if ($hfFim -le $hfInicio -or ($hfFim - $hfInicio).TotalHours -gt 24) {
    throw 'Use uma janela crescente de no máximo 24 horas.'
}
[pscustomobject]@{
    InicioUTC = $hfInicio.UtcDateTime.ToString('o')
    FimUTC = $hfFim.UtcDateTime.ToString('o')
    FusoAtual = (Get-TimeZone).Id
}
```

O fuso atual pode diferir do fuso no incidente. Preserve o offset informado e compare em UTC. Os campos `TimeCreated` dos eventos não são necessariamente o instante da falha: 41/6008 podem ser escritos na inicialização seguinte.

## 2. Eventos do Windows, WER e atualizações

Filtre por data na origem e não imprima `Message`, nomes de máquina/usuário ou XML completo por padrão. `RecordId`, provider e horário permitem localizar detalhes privadamente depois.

```powershell
$hfConsultas = @(
    @{ LogName='System'; Id=41,1074,6005,6006,6008,1001,46 },
    @{ LogName='Application'; Id=1000,1001,1002 },
    @{ LogName='Microsoft-Windows-WindowsUpdateClient/Operational' },
    @{ LogName='Microsoft-Windows-PowerShell/Operational'; Id=4103,4104 }
)
foreach ($hfConsulta in $hfConsultas) {
    $hfConsulta.StartTime = $hfInicio.LocalDateTime
    $hfConsulta.EndTime = $hfFim.LocalDateTime
    try {
        Get-WinEvent -FilterHashtable $hfConsulta -MaxEvents 500 -ErrorAction Stop |
            Select-Object @{Name='TimeUTC';Expression={$_.TimeCreated.ToUniversalTime().ToString('o')}},
                LogName, ProviderName, Id, RecordId, LevelDisplayName
    } catch {
        Write-Output ('Consulta indisponível ou sem resultados: ' + $hfConsulta.LogName +
            '; categoria=' + $_.CategoryInfo.Category)
    }
}
```

Se atingir o limite de 500, reduza a janela e repita a consulta; não trate uma lista truncada como completa. O canal PowerShell cobre apenas eventos já habilitados/retidos; não necessariamente CMD, PowerShell 7 ou comandos anteriores à configuração de logging.

No Visualizador de Eventos, abra localmente os registros selecionados pelo `RecordId`. Para 1074/User32, anote somente o nome do executável solicitante, tipo e motivo; mascare usuário, máquina e caminhos pessoais. Para 41/Kernel-Power, anote `BugcheckCode` e `PowerButtonTimestamp`. Para 1001, verifique provider e presença de bugcheck: o mesmo ID em Application pode descrever outra falha. Consulte 46/volmgr quando a gravação de dump falhou. Não cole mensagens/XML integrais em repositórios.

Para o histórico de atualizações já instalado, consulte metadados e filtre localmente:

```powershell
try {
    Get-HotFix -ErrorAction Stop |
        Where-Object { $_.InstalledOn -and $_.InstalledOn -ge $hfInicio.LocalDateTime.Date -and
            $_.InstalledOn -le $hfFim.LocalDateTime.Date.AddDays(1) } |
        Select-Object HotFixID, Description, InstalledOn
} catch {
    Write-Output ('Histórico HotFix indisponível; categoria=' + $_.CategoryInfo.Category)
}
```

`Get-HotFix` não cobre todas as atualizações; confira também Configurações → Windows Update → Histórico de atualizações, sem iniciar busca/instalação/reinício. Uma atualização no mesmo dia não comprova que ela solicitou o reboot.

## 3. Confiabilidade, WER e dumps

Consulte registros de confiabilidade existentes, sem iniciar reparos ou testes de estresse:

```powershell
try {
    $hfInicioCim = $hfInicio.UtcDateTime.ToString('yyyyMMddHHmmss.ffffff+000')
    $hfFimCim = $hfFim.UtcDateTime.ToString('yyyyMMddHHmmss.ffffff+000')
    Get-CimInstance -ClassName Win32_ReliabilityRecords -Filter (
        "TimeGenerated >= '$hfInicioCim' AND TimeGenerated <= '$hfFimCim'"
    ) -ErrorAction Stop |
        Select-Object TimeGenerated, SourceName, EventIdentifier, ProductName
} catch {
    Write-Output ('Registros de confiabilidade indisponíveis; categoria=' + $_.CategoryInfo.Category)
}
```

O Monitor de Confiabilidade (Painel de Controle → Segurança e Manutenção → Manutenção → Exibir histórico de confiabilidade) permite conferir os mesmos períodos. Não clique em correções ou mudanças de configuração durante esta coleta.

Liste somente metadados de dumps e diretórios WER. Os dumps podem conter senhas e dados em memória: não os envie à PR nem os abra com ferramentas desconhecidas. Uma análise posterior exige canal privado e escopo próprio.

```powershell
$hfLocais = @(
    (Join-Path $env:SystemRoot 'Minidump'),
    (Join-Path $env:SystemRoot 'MEMORY.DMP'),
    (Join-Path $env:ProgramData 'Microsoft\Windows\WER\ReportArchive'),
    (Join-Path $env:ProgramData 'Microsoft\Windows\WER\ReportQueue'),
    (Join-Path $env:LOCALAPPDATA 'Microsoft\Windows\WER\ReportArchive'),
    (Join-Path $env:LOCALAPPDATA 'Microsoft\Windows\WER\ReportQueue')
)
foreach ($hfLocal in $hfLocais) {
    try {
        $hfItem = Get-Item -LiteralPath $hfLocal -ErrorAction Stop
        $hfItens = if ($hfItem.PSIsContainer) {
            Get-ChildItem -LiteralPath $hfLocal -Force -ErrorAction Stop
        } else { $hfItem }
        $hfItens | Where-Object {
            $_.LastWriteTimeUtc -ge $hfInicio.UtcDateTime -and
            $_.LastWriteTimeUtc -le $hfFim.UtcDateTime
        } | Select-Object @{Name='TipoLocal';Expression={Split-Path $hfLocal -Leaf}},
            @{Name='TipoItem';Expression={if ($_.PSIsContainer) {'diretório'} else {'arquivo'}}},
            Length, LastWriteTimeUtc
    } catch {
        Write-Output ('Local de evidência indisponível; categoria=' + $_.CategoryInfo.Category)
    }
}
```

Não há leitura de conteúdo nem recursão ampla. Datas de diretórios WER são pistas de localização, não carimbos definitivos da falha; o atraso de gravação pode ultrapassar a janela.

## 4. npm, terminal e versões sem executar wrappers

Liste logs npm no caminho padrão; se o cache foi personalizado, use somente o caminho já conhecido, sem executar `npm config` ou mostrar `.npmrc`/variáveis.

```powershell
$hfNpmLogs = Join-Path $env:LOCALAPPDATA 'npm-cache\_logs'
try {
    Get-ChildItem -LiteralPath $hfNpmLogs -File -ErrorAction Stop |
        Where-Object { $_.LastWriteTimeUtc -ge $hfInicio.UtcDateTime -and
            $_.LastWriteTimeUtc -le $hfFim.UtcDateTime } |
        Select-Object Name, Length, LastWriteTimeUtc
} catch {
    Write-Output ('Logs npm indisponíveis; categoria=' + $_.CategoryInfo.Category)
}

Get-Command node,npm,fnm,git -All -ErrorAction SilentlyContinue |
    Select-Object Name, CommandType, @{Name='Arquivo';Expression={
        if ($_.Source) { Split-Path $_.Source -Leaf } else { 'origem não informada' }
    }}
```

`Get-Command` descobre comandos, não invoca seus corpos. Revise o caminho completo apenas localmente para identificar aliases, múltiplos Nodes ou shims. Não execute scripts encontrados somente para testar sua presença.

Revise privadamente os arquivos npm selecionados e, se disponível, o histórico do terminal já existente. Compartilhe somente horário/offset, comando sem valores sensíveis, versão Node/npm, exit code, erro e nome do hook/pacote. Logs npm, ScriptBlockLogging, PSReadLine e transcrições podem conter tokens, URLs com senha e dados pessoais. Não use transcrição nova, não publique histórico completo e não leia `.env` para esta coleta. O histórico PSReadLine normalmente não fornece uma cronologia confiável por comando; não invente timestamps.

Não use `Win32_Product` para inventariar instalações: consultas podem provocar verificação/reparo MSI. A existência atual de fnm/Node/npm não prova atualização no período; registre os comandos originais de atualização e correlacione com eventos de instalador e Windows Update já retidos.

## 5. Como decidir sobre a causa

| Evidência conjunta | Interpretação permitida |
|---|---|
| 1074/User32 com solicitante e sequência de encerramento | Há solicitação de shutdown/restart; investigar a origem e vínculo com os processos, não apenas coincidência de horário. |
| 1001/WER-SystemErrorReporting e bugcheck/dump correspondente | Há evidência de bugcheck; causalidade de driver/processo requer análise adicional. |
| 41/6008 sem solicitação identificada | Encerramento não limpo; energia, hard hang, reset e bugcheck sem dump continuam possíveis. |
| WindowsUpdateClient + 1074 correspondente | Pode sustentar reinício por atualização conforme o conteúdo e os horários. |
| Apenas erro npm.cmd EINVAL | Falha de criação de processo, sem prova de reboot. |
| Nenhum registro retido/acessível | Investigação inconclusiva; não prova ausência de falha. |

Referências: [Microsoft sobre evento 41](https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/event-id-41-restart), [reboots e eventos](https://learn.microsoft.com/en-us/troubleshoot/windows-server/performance/troubleshoot-unexpected-reboots-system-event-logs) e [Get-WinEvent](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.diagnostics/get-winevent).

## 6. Retomada controlada após a avaliação local

`RECOMENDACAO`: preserve primeiro a evidência acima e confirme o patch/SHA revisado. Use terminal comum, nunca administrador. Não instale Node/fnm/compiladores, modifique PATH/perfil ou altere versão global como parte automática da recuperação. Se o runtime compatível estiver ausente, pare e use uma instalação aprovada separadamente pelo usuário; não execute pipelines baixados da rede sem revisão.

Comece pela ajuda e simulação do **setup corrigido**:

```powershell
node setup.js --help
node setup.js --dry-run --skip-migrations
```

Na base defeituosa, dry-run ainda executa probes; não use aquela versão como garantia de ausência de processos. As chamadas acima executam código do repositório com o Node selecionado: confirme sua origem antes. Nenhuma dessas etapas autoriza reinstalação ou migration.

O setup corrigido desabilita lifecycle por padrão e só gera o cliente Prisma com `--allow-scripts`. `node setup.js --skip-install --skip-migrations` preserva as dependências Node/Python e não executa Prisma sem esse consentimento: preparação parcial não significa aplicação pronta. Se as dependências já estiverem completas e confiáveis e o operador autorizar a execução da CLI/configuração local após a avaliação, a etapa de geração sem reinstalação usa `node setup.js --skip-install --skip-migrations --allow-scripts`. Se a CLI Prisma faltar ou a geração falhar, pare; não troque automaticamente por `npx prisma`, que pode baixar software ausente. `.env` existente deve permanecer intacto; preencha campos privadamente, sem reproduzi-los em logs.

Uma instalação interrompida pode deixar `node_modules` parcial. Não renomeie/remova/restaure esse diretório de forma automática e não use `--skip-install` para ocultar a incompletude. `npm ci` substitui dependências e seus hooks podem baixar/compilar/executar terceiros; avaliar primeiro numa cópia/runner descartável sem secrets. A execução completa no computador afetado continua condicionada à avaliação de risco e autorização explícita posterior do operador, incluindo hooks, downloads e eventual substituição de dependências. Scripts desabilitados podem deixar binários nativos indisponíveis; isso exige diagnóstico, não repetição indiscriminada.

O padrão corrigido usa `npm ci --ignore-scripts`; `--allow-scripts` é consentimento adicional para hooks com os privilégios da sessão e não pode ser tratado como solução genérica de recuperação. O setup não promete rollback da instalação: se houver falha ou interrupção, a próxima tentativa precisa revisar o estado parcial e a saída privada dos logs. Nunca desative a proteção CVE-2024-27980 do Node para contornar EINVAL.

Não execute `--migrate`, `prisma migrate dev`, reset ou baseline nesta recuperação. Bancos vazios têm [procedimento próprio](../../prisma/bootstrap/initial-database-bootstrap.md); conferir sintaxe de URL não comprova que o banco seja de desenvolvimento. Nenhum check de CI autoriza alteração de banco real.

Se ocorrer novo travamento/reboot durante qualquer ação manual futura, interrompa a retomada, preserve horário/evidências e encaminhe ao suporte físico. Não provoque uma nova ocorrência para tentar coletar melhor evidência.
