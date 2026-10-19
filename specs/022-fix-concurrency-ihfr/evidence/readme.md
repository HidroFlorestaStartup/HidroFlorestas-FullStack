# Evidências e representação

Os arquivos `.txt` são cópias dos logs locais sanitizados, convertidas do UTF-16 gerado pelo PowerShell5 para UTF-8, com finaisLF, códigosANSI e espaços finais removidos para revisão. Nenhum resultado, erro, contagem ou ordem de eventos foi alterado.

`local-log-hashes.json` identifica os logs locais originais, antes dessa conversão. Eles permanecem em `.accounts-validation/`, ignorados. `original-two-request-repetitions.json` registra resultado/hash das30repetições originais. Logs originais de CI são identificados por run/artefato/digest em [historical-comparison.md](historical-comparison.md).

`red-covers.txt` e `green-covers.txt` usam as mesmas expectativas contra serviço original e corrigido. `cover-regressions.txt`:47PASS. `ihfr-official.txt`:6PASS. `ihfr-controls.txt`: **2FAIL deliberados por JavaScript desabilitado e2PASS**; experimento separado, sem causalidade histórica nem aprovação do gate por esse resultado.
