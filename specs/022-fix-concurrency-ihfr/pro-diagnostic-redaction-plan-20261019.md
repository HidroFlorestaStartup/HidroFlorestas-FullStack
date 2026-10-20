# Adendo focal — proteção dos diagnósticos da Spec022

Data:19/10/2026. Estado: CANDIDATA_LOCAL; validação Node24/Windows e publicação pendentes. Base:6ad909806736e768f3acc432e1e621eb75508e8d. Autorização: execução da missão Pro pedida pelo usuário, sem merge, retarget, deploy ou operações produtivas.

## PLAN

C01/P2: o sanitizador admite formatos escalares estruturados e segredos JSON-escapados que os controles sintéticos demonstram preservar. C02/P2: o attach de runImp006Gate limpa uma linha acima do limite, solicita término e aceita a continuação restante. O novo forwardImp006Diagnostics já conserva descarte; o outro caminho é anterior e permanece vulnerável ao controle de saída tardia.

Escopo: scripts/imp006-gate-diagnostics.ts e novo arquivo tests/unit/imp006-gate-diagnostics-structured.test.ts. Não alterar serviço de capas, APIs, AuthContext, quotas/retries/OCC, ciência, demo ou PRs14/15. Não interpretar como vazamento real: somente sentinelas sintéticas sem validade de autenticação foram utilizadas, e a inspeção dirigida dos artefatos não identificou os padrões de credenciais pesquisados.

## EXECUTE e limites

Ensaios do ChatGPT: Node22.16/Linux, cópia do blobGit6420aa3833d3e4e964c6f56fdb970bfc97c6944a, não Next/PG oficial. Nova suíte22: base9PASS/13FAIL; candidata22PASS. Oito testes preexistentes:8PASS na base e candidata, corpos preservados. Typecheck isolado TS5.8.3 PASS. Controle de processo Linux real confirmou o segundo ponto; teste portável controla explicitamente o pedido kill, sem afirmar equivalência de sinais Windows.

## REVIEW / critérios de conclusão pelo executor local

1. Preflight no checkout isolado022 e reconciliação do blob, sem tocar na demo ou em trabalho preexistente.
2. Commit deste plano antes dos novos testes; executar RED no runtime oficial, preservando saídas sem sentinelas brutas.
3. Aplicar correção mínima e obter GREEN; conservar as oito regressões existentes, limite1MiB, término e status de erro.
4. Conferir typecheck/lint e15gates do novoSHA pelo CI oficial. Não executar accounts55427 enquanto ele pertencer à demo e não relaxar guards do cluster022.
5. Revisão independente do delta e recibo no PR16 com limites. Sem aprovações de terceiros nem mudanças no Draft/na base.

As causas históricas IHFR e concorrência de duas chamadas permanecem INCONCLUSIVAS. O ajuste de logging não é sua correção causal. Não refazer fases anteriores nem fabricar falhas/recibos.

## Continuação autorizada — execução na nuvem

O usuário pediu nesta sessão aplicar a missão Pro cloud-first. Este adendo preserva
os resultados anteriores como históricos, não como testes repetidos. A execução
usa uma cópia focal no container e objetos Git verificados da base 6ad9098, não um
checkout completo do aplicativo. O conector de escrita recusou create_file com403;
o Git direto não resolve github.com e não há credencial cloud configurada.
Delegação real de subagentes não está disponível; passes A/B/C/D serão do mesmo
executor, explicitamente assim identificados.

Ordem: commit deste PLAN; aplicação dos testes; RED; commit dos testes; aplicação
do código; GREEN/regressão/adversarial; commits de correção e recibo. Validar hashes
e diffs sobre a árvore Git real. Entregar bundle incremental verificável para
publicação autenticada caso persista o403. Não exigir Node/PG no Windows particular:
os15gates do novoSHA devem rodar no GitHub Actions. Não modificar demo/PR14/15,
serviço de capas, quotas, ciência, base doPR16 ou Draft.

Critérios C01/C02: mesma suíte na base e candidata; regressões anteriores verdes;
checks adicionais deUnicode/CRLF/limites/saída tardia; nenhum segredo real em
artefatos. Intermitências históricas seguem inconclusivas sem nova evidência.
