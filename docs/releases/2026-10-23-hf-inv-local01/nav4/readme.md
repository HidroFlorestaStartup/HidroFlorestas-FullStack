# NAV4-LOCAL e INV-004 — resultado local

Missão `HF-INV-20261023-01-LOCAL01`, owner lógico `agent-a-nav4-accounts`.
Base executada `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`, árvore
`24baec02321084fc1abedddd6355896a0b81eaa1`; mudanças de aplicação: nenhuma.
Os scripts experimentais não alteraram runners, guards, origem aceita ou produto.

EVIDENCIA_IMPLEMENTACAO: NAV4-LOCAL tem mecanismo de ambiente/harness comprovado
na reprodução atual autenticada, seguido de **4/4 NAV4 originais PASS** no
contexto suportado de contas. INV-004 foi **NAO_REPRODUZIDO** em três logins
reais, incluindo latência sintética controlada. Não houve defeito de produto
material demonstrado que justificasse patch funcional. Spec029 não utilizada:
nenhum contrato do produto ou runner oficial foi alterado.

## Resultados e limites

| Prova | Resultado real | Alcance |
|---|---|---|
| Preparação inicial | BLOCKED antes do servidor próprio: porta ocupada; depois collector Git recusado por identidade de processo | Impedimentos de infraestrutura preservados; somente o processo preexistente foi encerrado pela coordenação após nova autorização explícita do usuário |
| RegressionSetup | PASS, 14 migrations formais, banco de referência vazio | Cluster novo, credencial/ACL/markers próprios; nenhum dado importado |
| Sonda v3, A1/B/A2 autenticada | FAIL global: 8/8 respostas403 em127, 4/4 respostas200 emlocalhost; locator genérico falhou em8controles e Back falhou em3/4 casoslocalhost | Não converter o FAIL em PASS: a instrumentação de alertas resolveu também o announcer doNext; Back capturou somente URL e não comprova acesso a dados |
| INV-004 dentro da v3 | 3/3 PASS, HTTP200, sessão presente, heading autenticado e resposta antes do destino | Durações700/575/1456ms; latência artificial500ms na terceira; causa histórica permanece INCONCLUSIVO |
| Quatro NAV4 originais | 4/4 PASS, exit0, zero retry, 1,7min | 375/320px × texto100/200; assertions originais, timeout90s/assertion5s; runner accounts127.0.0.1:3001 com ingresso local |
| Sonda Back v4 | 12/12 PASS e12reloads PASS | Dois fluxos reais de logout (documento direto/linkSair), Back imediato/apósnetworkidle, três contextos novos por combinação; todosme401, cookie ausente, DOM privado ausente e menu privado inativo |
| Contraprova de origem v5 | 3/3 PASS esperados, A1/B/A2 | Mesma instância/schema:127→403+cookie preservado; localhost→200+/login+cookie removido; retorno127→403. Origem externa recusada403 nos três contextos |
| SchemaAudit e Stop | PASS, zero schemas gerenciados; encerramento ordenado exit0 | Banco próprio parado, arquivos preservados; portas liberadas à frenteC |

Estes números são grupos distintos de investigação; não são somados como gates
oficiais ou como casos da CI. Os15gates da composição final pertencem à coordenação.
Backv3localhost/schema continua INCONCLUSIVO; o contraste com v4 muda contexto de
schema, origem/porta e ingresso, logo não atribui causalidade a uma única dimensão.
Os resultados oficiais atuais não demonstram uma falha de concessão de acesso.

FATO_DOCUMENTADO: os [quatro FAIL históricos](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/evidence/frontend-nav4/nav4-result.json)
ocorreram no produto b1f83cf, Linux/PostgreSQL16.15/IMP006/3000, sem códigoHTTP
ou cookie capturado na execução original. Permanecem FAIL. O experimento atual
Windows/PostgreSQL17.10 não reconstitui retroativamente aqueles pedidos.
INV-004 mantém a [fonte histórica de sincronização do login](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/18#issuecomment-6298927257),
cuja espera pela resposta não provou a causa antiga.

## Mecanismo observado e contexto suportado

EVIDENCIA_IMPLEMENTACAO: no fallback de origem, o requestURL normalizado peloNext
usa localhost, conforme o [controle da versão instalada](next-normalization.json).
O browser em127 envia uma origem diferente e o CSRF recusa oPOST.
No MESMO servidor, somente a origem do browser foi alterada emA1/B/A2. Antes de
cada logout a sessão emitida pelo serviço foi comprovada por documento200,
heading autenticado e `/api/auth/me`200. O bootstrap de sessão da sonda usou
loginHTTP com Originlocalhost confiável; osPOST de logout vieram do browser real.
Não houve token simulado, mock de sucesso ou header de logout alterado.

O runner de contas seleciona ingresso local explicitamente, valida Host/loopback,
exige banco/contexto próprios e usa127.0.0.1:3001. Nele os quatro testes originais
passaram, mantendo o produto e as proteções. RECOMENDACAO: usar esse runner para
testes de contas/logout; não presumir que o contexto IMP006/3000 constitui o mesmo
contrato de ingresso. O [runbook existente](../../../operations/account-homologation-runbook.md)
continua sendo a entrada operacional; este pacote registra investigação local.

## Evidências e reprodução

- [Protocolo e adendos definidos antes das respectivas rodadas](protocol.md).
- [v3 preservada, incluindo FAILs](probe-results.json), [v4 Back](back-results.json),
  [v5 origem](origin-results.json), [quatro testes originais](navigation-results.json).
- [Setup, auditoria e limpeza](setup-results.json), [identidade dos testes originais](navigation-identity.json)
  e [versão do navegador realmente lançado](browser-version.json).
- [Manifesto de arquivos/hash](manifest.json) e fontes executadas em `executed-sources/`.

Pré-condições da reprodução: worktree isolada e dependências do lockfile;
runtime privado `agent-a` com marker da missão e pacote nativo pinado conforme
protocolo; mesma identidade de processo para ACL, PostgreSQL e browser. Nunca
copiar dotenv, credenciais ou cluster preexistente. A wrapper injeta somente
chaves sintéticas e configuraçãoSO permitida, com safe.directory exato no
processo; nenhuma configuração global é modificada.

```powershell
./scripts/hf-inv-nav4-local.ps1 -Phase Prepare
./scripts/hf-inv-nav4-local.ps1 -Phase Origin
./scripts/hf-inv-nav4-local.ps1 -Phase Navigation
./scripts/hf-inv-nav4-local.ps1 -Phase Back
./scripts/hf-inv-nav4-local.ps1 -Phase Audit
./scripts/hf-inv-nav4-local.ps1 -Phase Stop
```

`Probe` conserva a rodada exploratória completa; não é retry automático das
rodadas posteriores. Nenhum comando inicia banco externo ouSMTP. A wrapper
exige a raiz e o marker exclusivos preparados durante o preflight. O package
PostgreSQL17.10.0-beta.17 possui postgres17.10, hash registrado no setup.

As projeções fechadas excluem env/config, headers, payloads, cookies/tokens,
stacks e caminhos internos. Logs ePNG originais ficaram privados; este agente
não alega ter inspecionado os pixels de todas as capturasNAV4. As assertions
geométricas originais foram executadas. As fontesv4 foram copiadas antes dos
ajustes seguintes; v3 foi recuperada por inversão das mudanças e conferida contra
os três hashes capturados emruntime; v5 foi preservada contra os mesmos campos.
Todos os nove snapshots correspondem byte a byte aos hashes dos recibos.
Atributos locais deste diretório desativam a conversão de EOL para preservar
esses bytes em checkouts Windows. O verificador estático confere os hashes sem
modificar arquivos; `--write-manifest` atualiza somente o manifesto quando uma
alteração documental é deliberada. Ele não regenera recibos nem atribui estes
resultados a outro HEAD.

Errata preservada: `readiness.trustedIngress` emv4 diz fallback por erro fixo do
reporter; a fonte executada configura local. O recibo não foi editado. O protocolo
e a fontev4 já continham os12contextos ANTES do início21:00:23UTC, ver hashes da
identidade. O label foi corrigido somente para execuções seguintes.

## Revisão e validação

Revisão independente pré-runtime do agenteC encontrou dois problemas da prova:
URL/cookie isolados não bastavam para autenticação; e o primeiro timestamp não
demonstrava ordem resposta→rota. Ambos foram corrigidos antes dav3 e comprovados
pelos campos do recibo. O locator de alerta foi diagnosticado após o FAILv3 e
corrigido somente na instrumentação, com v5 predefinida. TSC e lint focais são
registrados no setup; a revisão final da composição permanece com a coordenação.

Não houve alteração de ciência, contratoIHFR ou aceite humano. Permanecem
CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e
NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO. A investigação não libera o piloto.
