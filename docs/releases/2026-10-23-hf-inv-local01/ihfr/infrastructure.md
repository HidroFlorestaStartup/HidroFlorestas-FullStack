# Infraestrutura e resultados negativos de setup

Estes eventos antecedem ou cercam os testes do [recibo](run-evidence.json).
Não são falhas funcionais IHFR/concorrência e não foram convertidos em PASS.

| Etapa | Resultado e limite | Resolução aplicada |
|---|---|---|
| Instalação npm isolada | Exit 0; 553 pacotes em aproximadamente oito minutos; npm 12 bloqueou seis lifecycle scripts conforme política existente | Lockfile preservado, sem liberar scripts ou alterar configuração global |
| Prisma generate, transporte padrão | FAIL de rede no download do schema engine; nenhum banco acessado | Nova tentativa em contexto autorizado |
| Prisma generate, transporte elevado | FAIL `ECONNRESET`, Node 24.19.0; nenhum banco acessado | Reuso somente do binário existente de mesmo engine commit e hash, seguido de geração do cliente desta árvore |
| Download de artifacts | Conector retornou referências; transporte local não forneceu bytes utilizáveis | Originais locais já preservados, conferidos contra digests da API atual; nenhuma URL temporária foi publicada |
| Primeiro child PowerShell | BLOCKED pela política de execução; teste e cluster não iniciados | `RemoteSigned` restrito ao processo, sem mudar política global; erros passam a encerrar o child com código não zero |
| Primeiro init sintético em token restrito | FAIL DPAPI ao proteger credencial; sem diretório de dados ou marker de cluster | Preservação do diretório incompleto e novo runtime privado no contexto do executor |
| Tentativa de conciliar ACL dos dois tokens | FAIL por acesso/privilégio insuficiente; nenhum teste executado | Nenhum relaxamento global; novo runtime sob ACL do executor e SYSTEM |
| Cópia PowerShell do pacote PostgreSQL | FAIL em caminho longo de catálogo de locale no diretório novo | `node:fs.cpSync`, limitado ao pacote binário pinado e ao destino novo da missão, com hash conferido |
| Primeiro ensaio funcional após setup suportado | PASS 1/1, exit 0 | Cluster próprio iniciado, schema descartado e cluster parado para liberar o recurso prioritário NAV4 |
| Reporter temporário de projeção | FAIL ao tentar interpretar linha de código incidental do log negativo como JSON | Seleção ancorada nas linhas efetivamente emitidas; sem repetir testes ou omitir os dois FAIL esperados |

O launcher inicial retornou código de processo zero apesar da recusa da política
PowerShell. Esse código não foi contado como teste PASS: nenhum teste foi
executado. O launcher privado passou a usar erro terminante antes de nova rodada;
os recibos funcionais posteriores têm resumos de testes e saída efetiva.

Binário PostgreSQL: `@embedded-postgres/windows-x64@17.10.0-beta.17`, observado
`postgres --version` 17.10, SHA-256 de `native/bin/postgres.exe`
`db14ddb0efc10b72b57dc29dbce5a719e2755dcd0ae54297d0ea4bbfc75f79a0`.
O script de hidratação do pacote foi revisado/executado pela frente A; o binário
foi copiado, não o diretório de dados, marker ou credencial dessa frente.

Schema engine Prisma: commit `94a226be1cf2967af2541cca5529f0f7ba866919`, versão
do cliente gerado 7.4.2, SHA-256 do binário Windows copiado
`ea573556bf8a813f9921fdc313e7bd37cefc8e77e973bd2252f41a275c231083`.
O cliente foi gerado nesta worktree a partir do schema desta base; não houve
importação de cliente gerado de outra árvore ou ajuste do lockfile.

Na conclusão, os dois helpers de download não estavam mais em execução; somente
processos identificados por seus destinos exatos desta missão foram consultados.
Nenhum processo alheio foi encerrado pela frente B. O cluster B está parado,
com dados/marker privados preservados; zero schemas candidatos gerenciados
permaneceram após a auditoria somente leitura. Diretórios incompletos de setup
ficam preservados e ignorados, sem serem apresentados como clusters operacionais.
