# CLOSE-PARALLEL-02 — A harness handoff

Estado: **A_HARNESS_READY_FOR_RUNTIME**. Autor real `/root/a_harness`, worktree managed
`hf044-a/HidroFlorestas-FullStack`, branch `codex/hf044-a-local-20261101`.
Base funcional6c61056f; setup7704d98. Manifesto e resultados exatos no [JSON](close02-handoff.json).

Código: helpers compartilhados, smoke semDB, contraprova de escala e shell particionado.
Nenhum arquivo de produto, workflow, config, API, schema ou ciência foi alterado.
Patch publicado5e38263d usado como partida; A6 restaurado porblobs deff5db4f
(sete deltas documentais; sem copiarB paraA). Skills lidas e ciclo adaptado,
ANALYZE read-only antes dePLAN/IMPLEMENT; scripts mutantes não alegados comoCLI.

Contraprova Chromium: antigo doisframes observou16.2348px emvez32/assert exit1.
Smoke novo3/3PASS:100→200→100/320/1440, TextNode CDP real, reload32→16 antes
da reconfiguração, ausência de fonte=INSUFFICIENT_EVIDENCE, diagnóstico persistido
antes do FAIL e rethrow. [Inventário com hashes](close02-local-smoke.json).
Node24.14 local/Playwright1.55.1/Chromium153 existente; nenhuma instalação global,
nenhum banco/servidor FullStack/starter. Isso **não é runtime oficial da CI**.
Capturas sintéticas identificadas SYNTHETIC_SMOKE_NOT_PRODUCT; UTF8 corrigido após inspeção.

Typecheck completo local e lint dos quatro arquivos PASS após repararTS2783.
O código final requer typecheck Node24.19 na candidata do coordenador.

Shell:16layouts independentes,86pares planejados/172PNGs;17testes com sumário.
Workspace/laboratório em320/375/390/768/1440/667×375/844×390,100/200;
Conta aberta/Escape em320/390/1440; safe-area0/34 em375 e667×375;
foco/ratio1/hit-testing e Back/Forward/reload nas classes relevantes.
Índice incluiNOT_RUN; PNG/JSON e JSONL persistem fora deoutputDir.
Cada layout cria/limpa seus recursos reais owned; Conta inexistente no starter
e laboratório perdido no reload sãoNON_EQUIVALENT sem simular funcionalidade.
Fonte vazia não vira fallback; sumário falha em cobertura/erro/fonte insuficiente.

Comandos do coordenador: smoke config independente; shell via wrapper owned oficial,
`playwright test --config qa/hf-ui044/playwright.config.ts shell.spec.ts --workers=1 --retries=0`.
Variáveis de arquivo:HF_UI044_SUITE=shell, HF_UI044_ARCHIVE opcional;
HF_UI044_STARTER_PATH aponta à cópia fixada; CI não usaHF_UI044_CHROMIUM local.
Configs e provisioning são propriedade exclusiva do coordenador.

UI06_A_EVIDENCE_COMPLETE permaneceNOT_RUN até execução e inspeção bilateral reais.
Recorte de nome/menu320 é candidato; geometria adicionada, sem correção de produto inferida.
A isolada continua dependente deB paraIHFR; nenhum ratio alterado.
Sem push ou publicação worker. Revisão própria não é revisão independente.
HUMAN_ACCEPTANCE_PENDING; GEOCODER_OPERATIONAL_PENDING e quatro qualificadores preservados.
