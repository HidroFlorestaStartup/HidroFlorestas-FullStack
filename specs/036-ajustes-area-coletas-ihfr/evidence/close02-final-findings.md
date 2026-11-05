# Parecer terminal B — terceira rodada autorizada

**BLOCKED_WITH_EXACT_FINDINGS / UI06_B_EVIDENCE_INCOMPLETE.** Há nove pares completos, três casos falhos e 63 não iniciados. Não há qualificação bilateral da matriz, aceite humano ou conclusão científica. Este parecer preserva o código executado; depois de esgotado o limite de três rodadas, B fez apenas leitura dos artefatos/fontes e documentação. Nenhum reparo futuro abaixo foi implementado ou testado.

## Proveniência e cobertura

[Run 41356318087/1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41356318087), [job 124997441830](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41356318087/job/124997441830), artifact 13104015300, código `ebf7e9707d5beba949ae932cdffeb3f9068f8a73`, árvore `9b3f6d39c89a35e90bf357e058f3fb037907e125`. Referência somente leitura `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`.

SHA256 do ZIP `2e1911a57327e38267c0ec36016514272a00727cc4943f55d72b32f91d4f0f33`, conferido por B nos bytes locais; ZIP CRC PASS. São 55 entradas e 24 PNGs distintos. A auditoria do coordenador conferiu 434 chunks/CRC de PNG e 22 metadados de samples. B inspecionou os 24 PNGs disponíveis: 18 dos nove pares PASS, três amostras unilaterais, um diagnóstico inicial e dois frames de falha. O terceiro diagnóstico de falha registra captura impossível; não existe PNG substituto. Manifesto por arquivo/hash e os 75 estados individuais: [close02-final-runtime.json](close02-final-runtime.json). Os nomes abaixo são caminhos internos relativos à raiz do artifact, não arquivos versionados neste diretório.

| Classe | Resultado R3 |
| --- | --- |
| area-empty / 12 layouts | 9 PASS / 3 FAIL |
| area-populated, collection-record, collection-missing, collection-current / 48 | 48 NOT_RUN |
| Quatro qualificadores individuais / 12 | 12 NOT_RUN |
| Teclado/Back/Forward / 2 | 2 NOT_RUN |
| Reload / 1 | 1 NOT_RUN |
| Sumário final obrigatório | NOT_RUN por interrupção da suíte; job FAIL |

Os nove casos completos são empty 320/100; empty 375/100 e 200; empty 390/100 e 200; empty 768/100 e 200; empty 1440/100 e 200. Todos têm duas amostras, execução PASS, comparabilidade COMPARABLE e completude COMPLETE no índice; `requirement=HUMAN_DECISION_PENDING`. Seu alvo semântico pós-scroll tem ratio 1 e centro atingível nas duas fontes. Isso não qualifica todas as palavras, ações, estados ou páginas fora do enquadramento. Os 11 wrappers Playwright PASS incluem dois casos capturados como FAIL internamente; não equivalem a 11 pares PASS. Dois wrappers falharam e 63 não rodaram.

## Findings de execução

| ID / severidade / owner | Evidência observada | Causa e limite |
| --- | --- | --- |
| B-R3-REF-OVERFLOW-320 / HIGH / B comparador + limitação referência | `domain-area-empty-320-900-200`: FullStack sample existe; starter falha em `domain.spec.ts:257:97`, assert `document.documentElement.scrollWidth<=innerWidth`. `diagnostic-starter-domain-area-empty-320-900-200.png` preservado. | **EVIDENCIA_IMPLEMENTACAO:** assert retornou false. Largura numérica não foi arquivada. No PNG, brand cortada/sobreposta e palavras fragmentadas. **INFERENCIA:** header/min-width/texto 200% contribuem para overflow; causa exata não reproduzida. Não é prova de defeito FullStack. |
| B-R3-NATIVE-TARGET-667 / HIGH / B comparador, produto somente se reproduzido | `domain-area-empty-667-375-200`: FullStack falha ratio 1 em `domain.spec.ts:226:46`; alvo com altura 218px, top 49.671875, bottom 267.671875, ratio 0.8884031176567078, hit true. Header termina em 74px; main com altura 301px; nav começa em 298.5px; faixa real de 224.5px. PNG diagnóstico preservado. | **EVIDENCIA_IMPLEMENTACAO:** caixa alvo começa sob o header, embora seu centro e mensagem sejam visíveis. Fonte `src/components/shell/shell.module.css:19,93` usa scroll-padding início 8px/fim 140px. **INFERENCIA:** centro ótimo de scroll =74+8+(301-8-140)/2=158.5, próximo do observado 158.671875; o cálculo do comparador usou nav real de 76.5px e classificou altura 218px como cabível. Não é causa de produto demonstrada nem licença para reduzir ratio 1. |
| B-R3-REF-OCCLUSION-667 / HIGH / limitação da referência | Inicial starter: main.top 459>viewport375, gap 0, `main` UNOBSERVED. Wrapper `initial-obstruction-starter-domain-area-empty-667-375-200.json` mantém `DIAGNOSTIC_NOT_PLANNED_COVERAGE`, hashes e `coverageContribution=false`. Após scroll: header 0..290, nav 246..375, gap 0, target 131..243/ratio 1, hit SPAN false. | **EVIDENCIA_IMPLEMENTACAO:** header/nav ocluem o conteúdo real. A amostra final carrega NON_EQUIVALENT e motivo literal; glifos CDP observados não demonstram legibilidade. O caso pareado continua INSUFFICIENT_EVIDENCE pela falta do sample nativo, e o diagnóstico inicial não substitui cobertura. Nenhuma exceção de fonte foi adicionada. |
| B-R3-NAV-TIMEOUT-844 / HIGH / B fixtures | `domain-area-empty-844-390-200`: FullStack sample existe com gap 268.671875/ratio 1/hit true; starter excede 90000ms no link da área em `domain-fixtures.ts:161:70`. JSON de falha tem geometry indisponível e frame `CAPTURE_FAILED_WITH_ORIGINAL_CASE_FAIL_PRESERVED`. | **INFERENCIA:** `ready` navega antes de `configure`, podendo herdar 667×375/texto 200% da captura anterior cuja referência tem gap 0. Sem frame/DOM do timeout não se prova o oclusor exato nem perda de fixture. A falha ocorreu antes de reload; reload não foi executado. |
| B-R3-WORKER-LIFECYCLE / HIGH / B fixtures/cleanup | Após hard timeout, novo worker tenta beforeAll de area-populated 320/100; guard `domain-fixtures.ts:49:52` esperava 0 usuários de fixture e recebeu 4. afterAll tenta `domain-cleanup.json` com flagwx e recebe EEXIST em `domain.spec.ts:348:3`. | **EVIDENCIA_IMPLEMENTACAO:** guard de frescor recusou o banco já semeado pela mesma tentativa; recibo original foi preservado. A cascata impediu 63 casos e o sumário. Não enfraquecer guard, apagar dados imutáveis ou sobrescrever recibo. |

Hashes dos frames de falha: starter 320px `301a73aa305d3ab6f831cca0fa3d6f1812b888a4f8de0ed551a799dcd5aafb7c`; FullStack 667px `9c3fb21e4ace9026676c3f61c952462a9424ac66a5edb2bf6dac1331e6a46886`. Diagnóstico inicial starter 667px PNG `f56e4dc12cc896273e381dddedee474eb3d1245c0a8c779f187b6d40c1badca2`, JSON `3e75055daa3bee5ebd9761532b8942c782e694ede3d5d11c4cc2ddea1950ae5a`; wrapper `ccc77f8780f07c2a0b027ee8f61996c98cd9c89636c699fd84d30b69bf3f18ac`.

## RECOMENDACAO — recorte futuro, não executado

1. Registrar overflow da referência com largura/culpados e amostra íntegra como diferença factual NON_EQUIVALENT/DEFECT_FOUND, mantendo assert nativo e requisito humano. Não converter fonte falha em PASS de UX ou herdar captura de outro layout.
2. Contraprovar o alinhamento pré-medição no scrollport real, incluindo scroll-padding de 8/140px e as duas classes de paisagem. Fazer um único gesto de leitura que coloque o alvo na faixa efetiva antes da única medição; preservar ratio 1, gap/hit, frame inicial e falha real. Sem retry após medição nem patch de CSS sem defeito de produto reproduzido.
3. Contraprovar navegação de preparação da referência em viewport/escala canônicos antes de configurar o recorte solicitado; não recarregar o adapter em memória. Jornadas de navegação/teclado devem continuar sendo testadas no layout solicitado. A hipótese de oclusão no timeout 844px segue INFERENCIA.
4. Separar reinício autenticado do mesmo SHA/run/attempt de banco externo preexistente, com comprovação owned e isolamento explícitos, ou redesenhar o coletor para preservar a independência dos casos sem reiniciar setup global. Criar recibos de cleanup por worker/append com proveniência, mantendo frescor, imutabilidade e não sobrescrita.
5. Revisar os achados visuais da comparação e só propor patch B se o contrato e uma reprodução demonstrarem defeito do produto. Depois, executar a matriz inteira em novo escopo autorizado, com revisão não autora. **Estes testes e reparos são NOT_RUN/NOT_IMPLEMENTED; não há quarta rodada nesta missão.**

## Cleanup e entrega

O primeiro `domain-cleanup.json` registra browserCleanup PASS e teardown lógico NOT_APPLICABLE porque os dados sintéticos imutáveis ficam no runner owned. O reinício produziu EEXIST, não um segundo recibo válido. O log do job em 22:24:16 UTC confirma PostgreSQL parado e dados preservados. Stop não prova remoção lógica/física; descarte da máquina GitHub-hosted é responsabilidade do coordenador/plataforma. Não houve provedor real, banco local, ferramenta global, alteração científica ou patch de produto por B.

T008/T016/T027/T028 permanecem abertos: runtime e inspeção agora são PARTIAL/FAIL, não NOT_RUN total nem evidência completa. T030 preserva reconciliação/publicação e revisão final sob coordenação. Artefatos históricos R1/R2 e seus recibos continuam válidos apenas para seus próprios SHAs. Aceite humano permanece pendente. Mantidos CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
