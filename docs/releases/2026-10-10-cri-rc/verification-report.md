# Evidências da preparação e publicação

Atualização2026-10-13: [prontidão atual](rc-readiness-20261013.md) registra nova
regressão da combinação corrigida, dependências originais e checks automatizados.
O restante deste documento e publication-evidence.json preservam o snapshot
histórico da publicação inicial; ausência de CI naquele snapshot não descreve
as novas runs e seus resultados. Merges internos autorizados foram usados para
sincronização; nenhuma branch principal foi integrada.

EVIDENCIA_IMPLEMENTACAO de2026-10-10. Corte funcional auditado539f38d; branch
de revisão completa release/cri-rc-20261010. Manifesto legível por máquina:
[publication-evidence.json](publication-evidence.json). Seu localCheckpoint é o
HEAD observado antes do commit do próprio registro; o SHA final publicado será
identificado pelo HEAD remoto/PR6, sem autorreferência circular.

## Validação focal desta preparação

| Verificação | Resultado |
|---|---|
| Fetch/ls-remote origin | main e development em beba96f; sem divergência com a base da série |
| Série original |11 commits, pais lineares e datas crescentes; SHAs/pais/metadata preservados |
| Branches originais | Seis refs locais intactas; checkout original main e audit worktree preservados |
| Ancestralidade da pilha | Cada base é ancestral do próximo head; original539f38d ancestral da RC |
| Diff dos cinco heads de revisão contra checkpoints originais | Somente vercel.json; um guard e quatro merges auxiliares, sem duplicar código/commits |
| Identidade do runtime | Git blobs de src/tests/scripts/prisma/dependências/configuração iguais aos auditados, exceto proteção de publicação vercel.json |
| Manifesto histórico520 arquivos |49 diferenças no novo worktree comprovadas individualmente como LF/CRLF; uma diferença deliberada no guard Git. Não atribuir fingerprint5f aos novos bytes |
| Banco |14 migrations rastreadas;12 antigas byte a byte iguais; duas novas aditivas, hashes Git/worktree no JSON |
| Specs/tarefas |014:6/6;015:18/18;016:20/20 concluídas; aceites externos permanecem separados |
| Links relativos |113 na primeira coleta e119 no fechamento, zero alvo ausente |
| Git diff --check | PASS para as alterações da preparação; diff completo da série conferido também |
| Push --dry-run --atomic | PASS para somente as seis refs protegidas; main/development fora do refspec |
| Push e inspeção remota | PASS: seis refs e PRs#1–6 abertos; heads/bases/arquivos/commits correspondem ao Git;17 commits nos ranges,11 originais presentes exatamente uma vez |
| Checks dos heads no GitHub | Zero statuses e zero check-runs no snapshot; ausência não é PASS de CI nem inventário autenticado de provedores |
| Segredos/escopo | Diff documental e exemplos revistos; somente nomes de variáveis/IDs não secretos, sem valores de credenciais/PII/tokens |
| Provedores | Homepage declarada HTTP200; metadados/status GitHub somente leitura. Nenhuma consulta autenticada Vercel/Neon/Cloudinary |

Primeira tentativa do coletor de manifesto local FAIL ao supor mesmos bytes
entre worktrees. A investigação comprovou as49 diferenças de representação
LF/CRLF por comparação com os bytes do worktree auditado e hashes do manifesto;
o coletor foi corrigido e passou, sem editar código/SQL nem normalizar arquivos
preexistentes. Isso não reabre a equivalência histórica7f→5f, que segue NÃO VERIFICADA.
Nova proteção modifica configuração de publicação Git, não serviços da aplicação.

Os conectores Vercel/Neon foram encontrados, mas não estão conectados; já haviam
sido sugeridos, sem nova solicitação ou instalação nesta tarefa. A conferência
nos painéis é um pré-requisito operacional registrado, não bloqueio da revisão GitHub.
Consulta GitHub actions/workflows pelo conector foi recusada por rota não suportada;
nenhum workflow foi executado por essa consulta. Ausência de .github no checkout
não prova ausência de integrações externas.

Não foi necessário repetir suites funcionais: runtime Git idêntico e diferenças
de bytes explicadas por finais de linha, sem mudança de lógica. Typecheck/build/
testes/Pg nesta preparação: NÃO REEXECUTADOS. A evidência funcional continua a
[regressão focal anterior](../../reports/audits/2026-10-10-cri-local-validation.json):
291+17 unit/mail,187 integração,37 migrations,6 contrato,67 E2E,2 HTTPS,3 exclusão,
14 bootstrap, typecheck/build PASS, lint3warnings, zero schemas. R1 é repetição.
Esses resultados não são homologação real nem validação do ambiente produtivo.

## Publicação e limites

PRs#1–6 criados abertos, sem draft/merge/auto-merge. As bases seguem a cadeia
descrita no integration-guide; heads conferidos contra as refs Git publicadas.
Push atômico publicou somente seis refs protegidas. Commit documental inicial
832e7c9cd67917c75d4a3010454832e13d075e78; fechamento posterior só documenta
publicação/evidência. O JSON registra snapshot imediatamente anterior a esse
commit final; HEAD remoto/PR6 identifica o fechamento sem autorreferência.

O conector GitHub recusou create_pull_request com403 Resource not accessible by
integration. Alternativa autorizada: REST GitHub usando autenticação Git local
já válida para o push, carregada só em memória, sem copiar token para arquivos/
argumentos/logs. Os seis PRs e descrições foram criados/atualizados com essa
autenticação; ausência de gh não bloqueou a entrega. Não houve bypass de rejeição
de aprovação automática: o erro era permissão do conector.

Links/estados/bases/SHAs reais e diferenças de cada PR estão registrados
em integration-guide e JSON. Verificar heads remotos e evitar interpretar
status antigo herdado como deploy desta RC. Ausência de checks não é PASS de CI.
Nenhum merge em development/main, deploy ou escrita em banco remoto foi executado.
Nenhuma configuração/credencial/recurso existente de provedor foi alterado.
docs/raw, constituição, artefatos científicos e SQL históricos permanecem intactos.

Pendências e fechamento: [checklist](review-checklist.md). Processo de atualização:
[runbook operacional](production-update-runbook.md) e [migrations](migration-runbook.md).
O parecer mantém APTO COM RESSALVAS; homologações humanas/Cloudinary/operação
e identificação/backup/ensaio/aprovação produtiva continuam pendentes.
