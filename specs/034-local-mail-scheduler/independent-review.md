# Revisão independente — substituto local de scheduler

Revisor `/root/fr015`, 2026-10-25. Autor do instrumento: `/root`.
Base `08262dc57c1ad365244f9ec6902b1e4be39e2d7d`, worktree mail,
branch `test/hf-night-local-scheduler-20261025`.

**Resultado: PASS no recorte local, sem finding residual identificado.**

O revisor não escreveu o harness, testes ou guardas. Sua participação anterior
foi o gate de requisitos em safety.md: apontou a diferença entre abortHTTP e
cancelamento do callback servidor. O autor definiu fail-stop terminal antes do
código, e os cinco critérios foram então avaliados como satisfeitos.

## Código e prova

Lidos spec/plan/tasks/contrato/modelo, evidências e os dois arquivos .mjs.
Origem aceita somente HTTP literal127.0.0.1 com porta explícita válida, sem
credenciais/path/query/fragment. Validação precede scheduling/fetch; destino é
fixo e redirects não são seguidos. Segredo permanece no closure, com origem e
bearer ausentes do snapshot. Teto máximo20 é validado, sem reinício ao retomar.

Pausa cancela o próximo timer e aguarda o voo corrente. Chamadas automáticas
são sequenciais; qualquer status não200 ou falha de transporte torna a instância
terminal, bloqueando resume e novos ticks. O teste de timeout mantém o callback
falso ativo após abort do cliente e só o libera explicitamente no teardown.
Não há tentativa de inferir cancelamento remoto a partir de AbortSignal.

`handleMailTrigger` é o guard real, importado diretamente com secret sintético
explícito; o servidor HTTP/adapter é fixture própria. Fila/callback/accepted são
falsos. Nenhuma rota Next, worker SQL, banco, SMTP, inbox, configuração real de
ambiente ou scheduler hospedado é acionado. Teardown aguarda o fake conhecido e
fecha somente o listener efêmero próprio.

## Execução independente

Comando próprio:

```powershell
node --experimental-strip-types --test tests/investigations/mail/local-scheduler.test.mjs
```

PASS:4/4,0FAIL,0skip,1378.8799ms. Observados: negativas de origem/limites,
401/400 sem callback, allowlist sem canário/bearer, cinco ticks/aceites falsos,
três itens parados durante pausa, pico1callback, e fail-stop após timeout750ms
sem resume/tick adicional enquanto o callback servidor ainda aguarda barreira.
O caminho fail-stop de HTTP não200 foi conferido no código; as negativasHTTP
executadas chamam diretamente o guard pelo servidor da fixture.

O aviso Node MODULE_TYPELESS_PACKAGE_JSON também ocorreu no rerun. Nenhum
package.json, dependência, npm/node_modules ou política foi alterado para
suprimi-lo. As verificações de sintaxe do autor foram lidas no recibo, sem
serem contadas como reexecução deste revisor. `git diff --check`: PASS.

Hashes SHA-256 antes/depois da execução, sem alteração:

| Arquivo | SHA-256 |
|---|---|
| local-scheduler-harness.mjs | `7bae3e0158f97e5e32a8acf6e88e531381d36382e4c5b0f8d7eea41a26e0b525` |
| local-scheduler.test.mjs | `2c9a216843bb8197cab746a9ae66ece542f9c9edc7241a311421333f946648ac` |

## Guarda e limites

Verificação separada da autoria do instrumento:27regras false da base
preservadas; exatamente uma regra própria adicional false, total28. Demais
valores JSON idênticos; único workflow e conjunto de paths equivalentes à base,
considerando somente normalização CRLF do checkout. Nenhuma configuração editada
pelo revisor.

Este PASS não comprova processMailBatch, claim/lease/outbox SQL, SMTP/inbox,
recuperação ou job da plataforma, e não herda resultados do baseline QA.
G3/G4/G5 continuam BLOCKED. Converge e publicação pertencem à sequência do autor;
este parecer não autoriza merge, deploy ou operação hospedada.
