# Recibo local — C1 / Fase 8 / Spec 025

**Data**: 2026-10-21. **Branch**: `feat/frontend-ihfr`. **Estado inicial deste recibo**: candidato local implementado; CI, review externo e inspeção visual pendentes.

**Atualização após publicação:** o HEAD `a724bf7` passou nos 15 gates e recebeu revisão Codex sem findings; as 40 imagens foram abertas e reprovaram visualmente por fragmentação de palavras em 320/200%. Identidade completa, digest, contagens, achado e reparo estão em [ci-review-2026-10-21.md](ci-review-2026-10-21.md). O reparo tem unitários/typecheck/lint locais PASS, fechamento local interrompido por indisponibilidade do executor e contingência autorizada por API. Aguarda nova rodada oficial. As tabelas abaixo preservam o estado da preparação local inicial.

## Identidade e propriedade

- D observado: `1ea3cc2552c244e1004f4f733f838e0f9ea62993`.
- Base protegida S e parent previsto do commit funcional: `b3f65f2ccd8a4b08cf53a1bebf16e3ba33db09a6`.
- Fonte visual somente leitura: `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`.
- HEAD/tree final devem ser obtidos do commit que contém este recibo e registrados externamente pelo coordenador, sem criar commit documental posterior só para autodeclarar SHA.
- Escritor exclusivo em componentes IHFR, teste unitário novo, helper de captura próprio, dois testes IHFR existentes e Spec 025. Nenhum arquivo compartilhado de backend, ciência, schema, contrato, pacote, layout ou infraestrutura alterado.
- `.specify/feature.json` é locator local gerado pelos scripts, sem publicação no diff. Prisma gerado e node_modules são artefatos locais ignorados.

## Implementação

Resultado, classe, qualidade, estado, W/S/V/T, explicação pública, proveniência e versões recebem hierarquia visual adaptada ao starter. Os quatro qualificadores estão visíveis e acompanhados de rótulos legíveis. Ausência é honesta. Gestão agrupa observação, elegibilidade, revogação, feedback e recuperação. O modal possui rolagem interna limitada à viewport, foco visível e descrição acessível.

O bloco de estado, hooks e funções da gestão, de `export function IHFRDiagnosisManagement` até antes do retorno JSX, foi comparado byte a byte com S e permaneceu idêntico. A UI desabilita edição de campos durante envio/tentativa pendente, sem alterar o objeto `Attempt` ou as funções. E2E fortalece a prova de repetição com comparação de chave, corpo e endpoint.

## Verificações executadas neste ambiente

| Verificação | Resultado | Observação |
|---|---|---|
| Scripts Spec Kit setup-plan/setup-tasks/check-prerequisites | PASS | Spec 025 resolvida; checklist 8/8 |
| RED prévio do teste novo | Falha esperada | Módulo de apresentação ainda não criado; seguida de implementação |
| Unitários focais com runner normal | PASS | Dois arquivos; reporter agrega por arquivo |
| Unitários focais com `--test-isolation=none` | PASS | Cinco casos explícitos, zero falhas/skip/cancel |
| `npx prisma generate` | PASS | Apenas geração local; sem acesso a banco |
| `npm run typecheck` | PASS | Projeto completo, `tsc --noEmit` |
| ESLint componentes IHFR e testes alterados | PASS | Sem erro ou warning de lint |
| `git diff --check` | PASS | Sem whitespace inválido |
| Comparação dos handlers com S | PASS | Preservação literal de estado/hooks/funções |
| Contagem/seleção de E2E dedicados | PASS estático | Seis testes preservados; config/runner intocados |
| Execução E2E/DB/runner Windows | NOT_RUN | Delegada ao CI oficial; não executada no Linux |
| Abertura de screenshots reais | NOT_RUN | Nenhuma imagem produzida ou homologação simulada localmente |

Comando para os cinco casos explícitos:

```sh
node --import=tsx --test --test-isolation=none --test-reporter=spec tests/unit/ihfr-diagnosis-read-accessibility.test.tsx tests/unit/frontend-ihfr-presentation.test.tsx
```

Typecheck/lint usam versões instaladas do lock (Node 24.19.0, Next 16.3.8). Aviso npm de configuração de proxy do ambiente não foi warning de aplicação nem motivo para alterar o projeto.

## Evidência visual preparada

O helper exclusivo mantém `fullPage:false`, aguarda transições existentes sem terminá-las artificialmente, mascara inputs/selects/textareas e não registra URL, tokens, headers, corpos, IDs dinâmicos de elementos ou nomes pessoais. Requer o schema sintético `imp006_test_*`. Arquivos têm identificador hash de cenário, repetição e retry:

`.accounts-validation/frontend-ihfr/*-frontend-ihfr-*.png` e `*-viewport.json`.

Matriz: leitura/proveniência em 320/375/390/768/1280/1440; qualificadores/proveniência a 200% em 320×900 e 667×375; ausência/inativo 375; campos/ações/modal em 320/375/768/1440, 320 texto 200% e paisagem 667×375 texto 200%; safe-area inferior CDP 34px; recuperação incerta, revogação e incompatibilidade. As dimensões antigas 390/1280 foram preservadas. Os limites de tempo originais também foram preservados: 90 segundos no cenário OWNER/ADMIN e sem override adicional no cenário de leitura. Nenhuma assertion, retry ou seleção de cenário foi afrouxada.

O helper reutiliza apenas `waitForMissionRender` e `readControlGeometry` já existentes, sem editar o arquivo compartilhado. Capturas de falha usam a mesma família IHFR. Encontrar arquivos não equivale a inspecioná-los; estes são registros emulados, sem alegação de aceite humano ou dispositivo físico.

## Gates oficiais no HEAD publicado

Todos os gates abaixo estão **NOT_RUN neste recibo local**. Resultado local focal não substitui gate oficial. O coordenador deve vincular run/tentativa/job, HEAD, artifact/digest e revisão Codex efetiva em recibo externo após congelar o candidato.

| Gate | Estado |
|---|---|
| RegressionSetup | NOT_RUN |
| Unit | NOT_RUN |
| Integration | NOT_RUN |
| Migration | NOT_RUN |
| Contract | NOT_RUN |
| R1 | NOT_RUN |
| Build | NOT_RUN |
| Typecheck | NOT_RUN |
| Lint | NOT_RUN |
| E2E | NOT_RUN |
| Https | NOT_RUN |
| Deletion | NOT_RUN |
| Ihfr | NOT_RUN |
| Bootstrap | NOT_RUN |
| SchemaAudit | NOT_RUN |

## Limites e próxima ação

Sem merge, deploy, Preview, publicação de ref, banco real, edição de fontes de Pedro ou uso de Codex local por este agente. Incidentes históricos IHFR seguem a triagem pós-fase 10; qualquer FAIL oficial atual exige análise causal proporcional. Próxima ação: coordenador publicar candidato protegido, abrir/atualizar Draft PR, rodar CI, abrir as imagens e obter revisão Codex no HEAD final. Risco residual principal: geometria/renderização real só será confirmada no navegador do CI.
