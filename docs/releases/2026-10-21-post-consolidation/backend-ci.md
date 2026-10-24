# CI oficial da primeira entrega pós-consolidação

## Resultado

**G2: PASS no SHA `131ade347258c7820c7a89989ab851769197b486`: quinze gates executados, quinze PASS, todos com código de saída zero, na primeira tentativa.** O journal do artifact é a fonte primária. Seus quinze registros também coincidem integralmente com os registros recuperados do log do job.

Este adendo foi preparado pelo agente real `/root/backend_historicos`, em sua worktree exclusiva, depois da publicação da PR #27. Nenhum rerun foi solicitado. O resultado atual não modifica os FAILs locais preservados ou a classificação causal dos incidentes históricos.

Recibo estruturado e projeção fechada: [backend-ci-131ade3.json](evidence/backend-ci-131ade3.json). O arquivo contém identidade do run/job, quinze registros, comandos, horários, códigos de saída, contagens dos reporters, digests individuais dos logs, ambiente observado, fonte do workflow e comparação de fingerprints.

## Identidade e horários

| Campo | Valor confirmado |
|---|---|
| Pull request | [PR #27](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/27) |
| Run | [39699435699](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39699435699), número 114, evento `push` |
| Tentativa / job | Attempt **1**, job **119564787181**, `validate`, `completed/success` |
| Branch | `docs/pilot-readiness-20261021` |
| SHA testado | `131ade347258c7820c7a89989ab851769197b486` |
| Árvore | `646d6385669d85c28e78bdaee59cc8d815e9262e` |
| Início do run | 22/10/2026 **00:23:51 UTC** |
| Job | **00:23:54–00:45:58 UTC** |
| Último gate | SchemaAudit terminou em **00:45:47.901 UTC** |
| Workflow | `.github/workflows/rc-review.yml`; Git blob `65e6555d084268bd434cf737aad99aa3e74ffe50` |

O SHA coincide nos metadados do run, do job e do artifact. O workflow no SHA publicado foi relido pelo conector: mantém os quinze gates, `windows-latest`, Node 24.19.0 e a inclusão focal da branch desta entrega. A coordenação registra separadamente o guard de Preview e a revisão Codex.

## Quinze gates e contagens reais

| Gate | Resultado | Contagem ou observação do log correspondente |
|---|---|---|
| RegressionSetup | **PASS**, exit 0 | Preparação dos bancos sintéticos próprios |
| Unit | **PASS**, exit 0 | **402/402** testes centrais e **17/17** de e-mail, em dois grupos distintos |
| Integration | **PASS**, exit 0 | **231/231** |
| Migration | **PASS**, exit 0 | **37/37** |
| Contract | **PASS**, exit 0 | **6/6** |
| R1 | **PASS**, exit 0 | **17/17** |
| Build | **PASS**, exit 0 | Comando de build concluído |
| Typecheck | **PASS**, exit 0 | Verificação de tipos concluída |
| Lint | **PASS**, exit 0 | **0 erros, 2 advertências** de variáveis não utilizadas |
| E2E | **PASS**, exit 0 | **220 passed**, duração reportada 13,1 min |
| Https | **PASS**, exit 0 | **2 passed** |
| Deletion | **PASS**, exit 0 | **3 passed** |
| Ihfr | **PASS**, exit 0 | **6 passed** |
| Bootstrap | **PASS**, exit 0 | Bootstrap formal concluído no escopo descartável |
| SchemaAudit | **PASS**, exit 0 | **0 schemas candidatos de teste gerenciados** restantes |

Os grupos Node com resumos apresentaram zero falhas, cancelamentos, skips e TODOs. As contagens acima pertencem a cada gate. Não se calculou um total de testes únicos somando suítes, nem se adicionaram subconjuntos visuais novamente ao total E2E 220.

As duas advertências do lint estão em `src/components/user-profile/index.tsx` (`useAuth`) e `src/components/white-box/index.tsx` (`className`). Elas não foram convertidas em erros nem omitidas do recibo.

No log IHFR desta CI foram identificadas 15 linhas de resposta 200 de páginas `/dashboard/...`, zero linhas de página 404 e duas linhas 404 de API. Essa distinção preserva a investigação INV-005: a ausência de reprodução atual não explica os seis 404 de página do run histórico.

## Ambiente comprovado e seu alcance

O log do job registra **Node 24.19.0**, **npm 11.17.0**, **Microsoft Windows Server 2025**, build `10.0.26100`, imagem `windows-2025-vs2026` versão `20261018.275.1` e runner `2.338.0`. A API identifica o runner `GitHub Actions 1000000134`, label `windows-latest`.

Para PostgreSQL, a evidência é a combinação do código exato do harness, sua execução com `-InitializeCiCluster`, seus guards e o ambiente declarado pelo journal. O harness instala `@embedded-postgres/windows-x64@17.10.0-beta.17` em diretório próprio inicialmente inexistente, exige o runner Windows isolado, verifica ownership/ACL e usa a porta loopback **55427**, role `accounts_owner`. Trata-se da execução oficial com **PostgreSQL 17 sintético próprio**, distinta do ensaio complementar Linux/PostgreSQL 16.15 registrado anteriormente.

O log não fornece uma saída independente de `SELECT version()` ou `postgres --version`; não se atribui ao servidor uma versão completa de patch observada separadamente. O recibo inclui os hashes dos scripts que fixam o pacote e aplicam os guards. A mensagem de encerramento do cluster próprio, com dados preservados, também foi observada no log do job.

## Integridade do artifact e do journal

Artifact **12392364807**, nome `rc-validation-131ade347258c7820c7a89989ab851769197b486`, recuperado pelo conector GitHub depois de o job concluir:

- **26.854.109 bytes**, iguais ao tamanho declarado pela API.
- SHA-256 **`b4fe1d31a3f59d3c4c329d6099dfc95d887c9c09a8c4349119d86bd1e2c0225e`**, igual ao digest da API.
- **735 arquivos**: 15 logs, 451 arquivos PNG, 268 JSONs e um JSONL. Esses números descrevem arquivos, sem afirmar que cópias de imagens sejam capturas únicas.
- CRC de todos os membros verificado; caminhos absolutos, travessia de diretório e links simbólicos ausentes.
- Journal `.accounts-validation/results.jsonl`: **6.244 bytes**, SHA-256 **`dbadeb88ea55e4995388cf104904f76fbeefaba02258990e70a1ba046aa5b5b5`**.
- Quinze gates únicos, ordem exigida preservada, nenhum gate ausente e um único snapshot em todos os registros.

O texto do job recuperado pelo conector possui 65.925 bytes quando codificado em UTF-8 e SHA-256 `b5e9371b11cef9d3250cdb6a3049bd880c03a04d15847111425a1e98cf63fae8`. Esse digest identifica o texto decodificado, sem ser apresentado como hash de um ZIP bruto do job.

Os arquivos brutos ficaram em scratch para inspeção. A frente frontend recebeu a extração validada para revisar as imagens e geometrias originais; sua revisão tem recibo próprio. A evidência versionada contém somente a projeção fechada, sem URL temporária de download, configuração completa, env herdado, credenciais ou logs completos.

## Conferência independente do fingerprint

**Fonte primária:** os quinze registros do journal contêm:

```text
47acca4bbc5b2f71368e8b2dfe1d66a5d12e6ff9ca13720e954d3fa0a876aee5
```

A conferência independente reproduziu o método de `scripts/mail-validation-diagnostics.ts`: seleção de `git ls-files --cached --others --exclude-standard`, filtro `isMailSnapshotPath`, ordenação equivalente à ordem UTF-16 do JavaScript, SHA-256 dos bytes de cada arquivo e SHA-256 do JSON compacto do array de pares `path`/`sha256`. Foram selecionados **579 arquivos** do checkout limpo do SHA publicado.

O checkout Linux com LF produziu `c996ed6f09b06329a3d50f4b8591bdf5e66ec8e0a958110e799c91076a177480`. Para resolver a diferença, criou-se um **índice Git temporário separado**, contendo o mesmo commit, e materializaram-se somente os arquivos selecionados com `git -c core.autocrlf=true checkout-index`. Não se executou código nem se alterou a worktree de integração.

Nessa materialização, **553 arquivos diferiram somente por LF → CRLF**. Aplicado o mesmo algoritmo aos bytes resultantes, o fingerprint foi exatamente **`47acca4b…876aee5`**, igual aos quinze registros do journal. A comparação demonstra a correspondência sob a conversão de finais de linha do Git. A configuração `core.autocrlf` do runner encerrado não foi consultada ou despejada separadamente; a evidência é a reprodução exata dos bytes e do digest.

## Limites e continuidade

Este resultado valida o **SHA `131ade347258c7820c7a89989ab851769197b486`**. Um commit documental posterior deve registrar esse vínculo, sem substituir o SHA testado pelo próprio SHA novo.

Os incidentes históricos INV-001/002/004/005 mantêm os limites causais do [relatório de backend e banco](backend-database.md). A execução móvel Linux anterior permanece registrada como 0 PASS/4 FAIL; o resultado oficial e a triagem de origem/configuração são evidências adicionais, sem apagar a primeira execução.

**G3–G5 operacionais continuam sujeitos aos bloqueios próprios.** A CI usa dados descartáveis e configuração sintética; não comprova recebimento real de e-mail, scheduler operacional, identidade/isolamento/backup de banco hospedado, Cloudinary homologado, aceite científico, dispositivo físico ou aprovação humana. Não houve implantação, promoção ou operação de banco hospedado por esta frente.

## Recuperação documental — 22/10/2026

Após a reinicialização da sessão e a perda dos arquivos temporários, o usuário
autorizou a continuação. O artefato e o log do job foram recuperados novamente
pelo conector GitHub em 22/10/2026, a partir das 14:17 UTC. Tamanho, SHA-256, CRC,
caminhos e os quinze registros foram reconferidos; o ZIP, o journal e o texto
decodificado do job mantiveram exatamente os digests registrados acima.
Nenhuma suíte, aplicação ou banco foi iniciado nessa recuperação.

O Markdown original foi recuperado integralmente pelo Git Data: 9.052 bytes,
blob `78171a5447ac446e68ae73e38870eb455e52cf96`, SHA-256
`43613145e0cb711df7adb6f5a202e5182dd85246776099f973b5fa1eb6967dc4`.
Esta versão acrescenta a presente nota e usa o rótulo literal da imagem observado
no log, `windows-2025-vs2026`, em vez da abreviação anterior `windows-2025`.

O blob esperado do JSON anterior,
`b7f9cb2151591771911a24e710ed0f77c1ddd649`, retornou `NOT_FOUND`.
O recibo JSON foi reconstruído como uma nova projeção fechada, datada e conferida
contra as fontes primárias reobtidas; não se afirma identidade de bytes com o
JSON anterior de 23.088 bytes. A comparação independente de fingerprints descrita
acima é um resultado concluído na sessão anterior, preservado pelo Markdown
recuperado e pelo contexto da sessão; não foi repetida após a reinicialização.
