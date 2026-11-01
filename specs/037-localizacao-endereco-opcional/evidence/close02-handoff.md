# CLOSE-PARALLEL-02 — handoff C

Estado: C_CAPTURE_READY_FOR_RUNTIME. Agente nativo real `/root/c_capture`.
Branch local `codex/hf044-c-local-20261101`; worktree `hf044-c` (path absoluto
no registro privado do coordenador). Base funcional6c61056f; setup `1b6a2d349a527ac6153d027a21e521c88b691e7b`.
Commit exclusivo de código/docs `6d1a019f723b3be563965c3201872f4c9846ce35`; árvore `6408ae4c7d63ffcb69562867ceb374cf5d58d71e`.
SHA256 do patch binário setup→commit: `6e53567438c40ec0966a20c450f4043cfc8ea646f311146e50a7e87ea1ccd02f`.

Alterações: somente teste037 (cópia durável exclusiva e metadados), docs037,
contraprova executável e4 docs sanitizados33d. Nenhum arquivo de produto,
schema, API, workflow, guard, script oficial ou dependência alterado.
O JSON irmão enumera paths e requisitos/tarefas/estados, comandos e limites.

Preservação: docs33d idênticos a c7b já estavam na C local; foram copiados para
a composição sem importar outro delta. DOC_RECONCILIATION_APPLIED na cópia;
ALREADY_PRESENT na C local. Nenhum dos21 originais foi lido/transportado/removido.
Branches e commits de origem preservados; principal não foi editado por C.

Verificações PASS: contraprova do helper real2/2 (sobrevive limpeza simulada da
saída e rejeita sobrescrita), parser completo, typecheck estrito focal dos
helpers/loop, lint2 arquivos, whitespace, JSON, globs e4 blobs. Runtime local
Node24.14 só inspeção/contraprova; não se declara CI24.19/Windows executada.
Não há RED de navegador alegado. Skill Spec Kit adaptada manualmente; paths-only
e contexto por processo preservaram análise read-only; nenhum hook/checklist037.

Coordenador: integrar somente `6d1a019f723b3be563965c3201872f4c9846ce35` e o commit documental deste handoff,
sem transportar setup ou a árvore composta para A/B/C. Executar15 gates oficiais
na candidata; após suítes posteriores auditar4 arquivos exatos em
`.accounts-validation/frontend-areas/ui037-frontend-areas-hf-ui037-location-{mobile,desktop}-viewport.{png,json}`.
Verificar390×844/1440×900, fullPage:false, metadados sourceSha/sourceTree/runId/attempt,
digest/CRC/hash PNG/JSON e imagens reais. T024 permanece aberta até essa prova.
Comando da contraprova: `node --test specs/037-localizacao-endereco-opcional/evidence/close02-preservation-check.mjs`.

UI037_CAPTURE_PENDING; runtime UI037/15 gates/ZIP final NOT_RUN pelo worker.
Autorrevisão, sem review independente. Publicação exclusivamente coordenador.
HUMAN_ACCEPTANCE_PENDING; GEOCODER_OPERATIONAL_PENDING. Sem merge/deploy/ciência.
