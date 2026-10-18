# Validação e continuação — login 017

## Alvo e segurança

Usar checkout do FullStack, origin oficial, Node24.19.0 e lockfile existente. Reutilizar um checkout limpo disponível e criar `feat/frontend-login` de origin/development verificada. Nunca escrever diretamente nas principais. Não é necessário manter a antiga pilha #4–#7 para esta feature.

O pacote entregue nesta conversa é parcial e possui aplicador por etapas. `--check-only` verifica sem editar. Antes da implementação no checkout completo: scripts Spec Kit e leitura dos guias Next instalados, commit do plano, aplicação do teste e RED real da hidratação. Depois aplicar página/CSS e configuração focal.

## Gates oficiais

No Windows e somente após conferir o cluster sintético já autorizado:

```powershell
# Exemplo de seleção suportada pelo runner, não autorização de banco remoto.
./scripts/rc-review-validation.ps1 -Gates RegressionSetup,Unit,Build,Typecheck,Lint,E2E,Https,SchemaAudit
```

O conjunto E2E inclui os testes de login real existentes e os novos testes de UI. O pipeline completo da branch continuará reutilizando os 15 gates, sem mudar o runner. Para o RED focal, usar a entrada oficial `accounts-local-postgresql.ps1` conforme seu help/contrato e ambiente preparado pelo runner; não inventar variáveis de confirmação ou reduzir guards. Não usar `-InitializeCiCluster` na máquina normal: essa opção é restrita ao Windows Actions.

Capturas reais: antes/depois 375/768/1440px, estados de erro/loading, reflow/zoom, foco/teclado. Os PNGs estáticos do pacote não substituem essas capturas. Testar primeiro preenchimento com scripts atrasados e a autenticação real (ACTIVE, bloqueada, credenciais inválidas, verify-email, cookie/HTTPS).

## Publicação

Antes de qualquer push, confirmar no commit a exclusão `feat/frontend-login=false` e a presença da branch no trigger E na condição do job de rc-review.yml. Não criar ref remoto apontando ao baseline sem a exclusão. Checks vêm do push no HEAD da feature, não de um check antigo da RC. Se outra branch for necessária, rever ambas as configurações antes de publicar.

Commits cronológicos: plano → testes/implementação com RED/GREEN registrado → revisão/evidências. Publicar somente a branch, abrir PR para development e pedir revisão independente. Não fazer merge, deploy, operações Cloudinary/Gmail/Neon reais ou continuar para cadastro.
