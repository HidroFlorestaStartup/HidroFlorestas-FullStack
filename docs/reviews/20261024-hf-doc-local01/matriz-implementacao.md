# Matriz técnica Code-First — HF-DOC-20261024-LOCAL01

Base development: `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`; candidata separada: `00477e961e36416d8d602d36f7e0ee195c487148`; alunos: `d2168c840937a6120e32467f24cb46383e8dcd29`.

Inspeção estática própria; execução funcional própria NOT_RUN. Cada bloco json-row contém integralmente o mesmo registro do JSON agregado. O resumo não declara todos os critérios de uma IMP concluídos; fronteiras, ausência/parcialidade e aceites permanecem separados.

| Subcapacidade | IMP/fronteira | Recorte | Development | Candidata | Estado técnico |
|---|---|---|---|---|---|
| IMP-001-F01 | IMP-001 | Fronteira de sessão exigida pelos fluxos 002–005: identidade corrente, conta ACTIVE, verificação quando exigida e credentialVersion. | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-002-C01 | IMP-002 | Criar laboratório por nome e listar apenas vínculos atuais, com limite de cinco, criação atômica e DTO público. | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-002-C02 | IMP-002 | Consultar informações/membros mínimos e desativar ou excluir laboratório com confirmação textual e restrição a dados dependentes. | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-002-F03 | IMP-002 | Fronteira de ingresso/convite por código: não confundir criação/listagem conectadas com gestão de ingresso implementada. | false | false | NAO_LOCALIZADO |
| IMP-003-C01 | IMP-003 | Selecionar laboratório explicitamente e preservar o contexto na URL/navegação com revalidação de vínculo e inativo somente leitura. | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-003-C02 | IMP-003 | Papéis contextuais OWNER/ADMIN/MEMBER, proprietário único e alteração concorrente de papel por OWNER. | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-003-C03 | IMP-003 | Criar área-ponto por entrada manual/mapa/localização opcional, validar e persistir apenas ponto final e autoria contextual. | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-003-C04 | IMP-003 | Listar e detalhar áreas reais do laboratório, com ponto, opcionais, privacidade e somente leitura. | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-004-C01 | IMP-004 | Iniciar coleta na área, informar ocorrência RFC3339/offset/milissegundos e revisar em memória antes de confirmar. | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-004-C02 | IMP-004 | Confirmar coleta atomicamente, recuperar resposta perdida sem duplicação e preservar a identidade que iniciou a tentativa. | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-004-C03 | IMP-004 | Consultar coleta confirmada e preservar associação, autoria interna, precisão temporal e imutabilidade. | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-005-C01 | IMP-005 | Contrato de captura ambiental v1: quatro grupos, unidades/regras explícitas, ausência distinta de zero/false e separação da matemática IHFR. | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-005-C02 | IMP-005 | Confirmar conjunto integral imutável por coleta, idempotência própria e consumo transacional do draft pessoal quando fornecido. | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-005-C03 | IMP-005 | Consultar valores ambientais efetivamente persistidos, ausência explícita e contexto somente leitura sem autoria/chaves/diagnóstico no DTO. | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-005-I04 | IMP-005 | Incremento015/024: salvar, retomar e descartar draft ambiental pessoal por titular/coleta confirmada, com revisão otimista, replay e isolamento. | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-005-I05 | IMP-005 | Incremento024: prontidão/hidratação, representações fiéis e recuperação sem trocar titular ou liberar tentativa incerta. | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-006-01 | IMP-006 | Manifestos, parser fechado e avaliador determinístico | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-006-02 | IMP-006 | Elegibilidade, ausência conhecida e incompatibilidade versionada | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-006-03 | IMP-006 | Consulta CURRENT e detalhe imutável com DTO mínimo | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-006-04 | IMP-006 | CREATE/REPLACE transacional, suplemento 1:N e vigência única | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-006-05 | IMP-006 | Revogação justificada sem apagar diagnóstico | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-006-06 | IMP-006 | Recuperação por chave, projeção terminal e fronteira da investigação29 | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-007-01 | IMP-007 | Resumo persistido contextual | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-007-02 | IMP-007 | Histórico derivado paginado e navegação à origem | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-008-01 | IMP-008 | Projeção territorial privada de áreas-ponto/coletas | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-008-02 | IMP-008 | Leaflet, lista equivalente e recuperação visual | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-008-03 | IMP-008 | Fronteira: Plotly e análises territoriais futuras | false | false | NAO_LOCALIZADO |
| IMP-009-01 | IMP-009 | Leitura global, filtros, detalhe e DTO mínimo | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-009-02 | IMP-009 | Alteração de estado com justificativa/OCC | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-009-03 | IMP-009 | Alteração de papel global e proteção do último administrador | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-009-04 | IMP-009 | Auditoria funcional administrativa, retenção imutável | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| IMP-010-01 | IMP-010 | Validação humana de UX de acesso: SC-006/SC-007 | false | false | NAO_APLICAVEL |
| FRONTEIRA-SPEC-010 | FRONTEIRA-SPEC-010 | Spec010 cadastro ACTIVE é entrega distinta da IMP-010 de UX | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| CRI-MAIL-01 | CRI-MAIL | Fundação mail: outbox, worker e transporte | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| CRI-012-01 | CRI-012 | Verificação e reenvio de e-mail | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| CRI-012-02 | CRI-012 | Reset/troca de senha e revogação de sessões | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| CRI-013-01 | CRI-013 | Exclusão pessoal condicionada e preservação de ciência | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| CRI-014-01 | CRI-014 | Runners de contas: seleção e fixtures próprias | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| CRI-016-01 | CRI-016 | Capa authenticated com proxy contextual e edição OCC | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |
| CRI-016-02 | CRI-016 | Cleanup por identidade imutável, leases e rollout operacional | true | true | IMPLEMENTADO_VERIFICADO_ESTATICAMENTE |

## Registros completos

As fontes são snapshots. Presença técnica não substitui intenção, homologação, ciência ou aceite humano. Adendos recomendados são orientações para CHAT, não mudanças já aplicadas.

IHFR: CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO, NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

## Contrato comum de recomendação e validação histórica

```json
{
  "recommendationContract": {
    "classification": "RECOMENDACAO",
    "appliesTo": "oldClaim.recommendedAddendum e nextAction de todas as linhas: atualização documental e encaminhamento de lacunas; nenhuma operação autorizada por este contrato",
    "primaryOption": "CHAT produzir adendo datado de estado conciliado, ancorado nas subcapacidades demonstradas, preservando cortes históricos e listando os atos humanos/técnicos ainda necessários.",
    "rationale": "Evitar reimplementação de capacidades presentes e impedir que provas estáticas sejam tomadas como homologação ou intenção científica.",
    "alternative": "Manter somente a matriz LOCAL como anexo de consulta e adiar o adendo canônico até decisão editorial humana; isso mantém o risco de leitores usarem o backlog antigo isoladamente.",
    "conditions": [
      "CHAT confere base e hashes do handoff e respeita seu ownership.",
      "Só afirmar o recorte coberto por rota/autorização/serviço/persistência/UI e as ausências delimitadas.",
      "Decisões de produto/ciência, owners, aceites e ensaios operacionais exigem fonte e autorização específicas.",
      "Qualquer nova implementação ou validação funcional será missão separada; NOT_RUN permanece nesta."
    ],
    "effects": "Adendo corrige a leitura do baseline sem reescrever contratos/histórico ou declarar IMP integralmente concluída; lacunas seguem como pendências.",
    "reversal": "Se referência ou interpretação for refutada, registrar errata e corrigir/reverter o adendo por commit normal, preservando a matriz original e a nova evidência."
  },
  "historicalValidation": {
    "classification": "FATO_DOCUMENTADO",
    "kind": "HISTORICAL_CI_CONSULTED_NOT_EXECUTED_HERE",
    "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
    "runId": 40030207450,
    "attempt": 1,
    "jobId": 120676307853,
    "environment": "Windows/Node24.19.0/npm11.17.0/PostgreSQL sintético próprio",
    "recordedResult": "15 gates únicos PASS/exit0 no recibo consultado",
    "source": "https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/29#issuecomment-6375857925",
    "scope": "Resultado agregado da candidata histórica; não atribui PASS individual a todas as linhas nem transfere validação à base ou a este commit. Etapas do job consultadas nesta missão; artifact não baixado novamente."
  }
}
```

### IMP-001-F01 — IMP-001

Fontes: [specs/001-authenticated-access/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/001-authenticated-access/spec.md>), [specs/012-account-verification-recovery/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/012-account-verification-recovery/spec.md>), [src/app/api/server/middlewares/auth.middleware.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/middlewares/auth.middleware.ts>), [src/app/api/server/middlewares/auth.middleware.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/middlewares/auth.middleware.ts>), [src/app/api/server/auth/auth.core.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/auth/auth.core.ts>), [src/app/api/server/auth/auth.core.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/auth/auth.core.ts>), [src/app/api/server/auth/session.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/auth/session.ts>), [src/app/api/server/auth/session.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/auth/session.ts>), [src/app/(private)/layout.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/layout.tsx>), [src/app/(private)/layout.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/(private)/layout.tsx>), [src/app/api/auth/me/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/me/route.ts>), [src/app/api/auth/me/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/auth/me/route.ts>), [tests/unit/auth-core.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/auth-core.test.ts>), [tests/unit/auth-core.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/auth-core.test.ts>), [tests/unit/session.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/session.test.ts>), [tests/unit/session.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/session.test.ts>), [tests/integration/auth-me.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/auth-me.test.ts>), [tests/integration/auth-me.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/auth-me.test.ts>), [tests/integration/auth-guard.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/auth-guard.test.ts>), [tests/integration/auth-guard.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/auth-guard.test.ts>), [tests/e2e/authenticated-access.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/authenticated-access.spec.ts>), [tests/e2e/authenticated-access.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/authenticated-access.spec.ts>).

<!-- json-row: IMP-001-F01 -->
```json
{
  "id": "IMP-001-F01",
  "imp": "IMP-001",
  "scope": "Fronteira de sessão exigida pelos fluxos 002–005: identidade corrente, conta ACTIVE, verificação quando exigida e credentialVersion.",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/001-authenticated-access/spec.md",
      "symbol": "Evidence and Code-First Traceability"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/012-account-verification-recovery/spec.md",
      "symbol": "política de sessão"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/middlewares/auth.middleware.ts",
      "symbol": "requireAuth / requireAuthWithAdapters"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/middlewares/auth.middleware.ts",
      "symbol": "requireAuth / requireAuthWithAdapters"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/auth/auth.core.ts",
      "symbol": "authenticateSession"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/auth/auth.core.ts",
      "symbol": "authenticateSession"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/auth/session.ts",
      "symbol": "verifySessionToken"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/auth/session.ts",
      "symbol": "verifySessionToken"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/(private)/layout.tsx",
      "symbol": "LayoutPrivate"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/(private)/layout.tsx",
      "symbol": "LayoutPrivate"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/auth/me/route.ts",
      "symbol": "GET"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/auth/me/route.ts",
      "symbol": "GET"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/auth-core.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/auth-core.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/session.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/session.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/auth-me.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/auth-me.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/auth-guard.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/auth-guard.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/authenticated-access.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/authenticated-access.spec.ts"
    }
  ],
  "chain": {
    "route": "GET /api/auth/me e entradas privadas; handlers de 002–005 chamam requireAuth.",
    "authorization": "authenticateSession valida token, consulta identidade atual e exige ACTIVE; se verificationRequired, exige emailVerifiedAt; compara propósito e credentialVersion, com regra explícita para sessão legada.",
    "service": "users.service.getCurrentIdentityById é adapter de identidade atual; requireAuth lança AuthBoundaryError.",
    "persistence": "User.status, verificationRequired, emailVerifiedAt e credentialVersion; nenhuma operação de banco executada.",
    "ui": "Layout privado e workspace dependem do guard atual. Proxy isolado não foi tratado como autorização suficiente."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/auth-core.test.ts",
      "tests/unit/session.test.ts",
      "tests/integration/auth-me.test.ts",
      "tests/integration/auth-guard.test.ts",
      "tests/e2e/authenticated-access.spec.ts"
    ],
    "selection": "Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.",
    "execution": "NOT_RUN",
    "consultedEvidence": [
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/019-frontend-workspace-shell/spec.md",
        "location": "Status; US2",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Registra implementação técnica e aceite humano pendente do shell; não constitui execução desta missão.",
        "execution": "NOT_RUN"
      }
    ]
  },
  "humanAcceptance": "SC-006/SC-007 de IMP-001 permanecem NAO_VERIFICADO; pertencem ao follow-up IMP-010, não encerrado por este fragmento.",
  "scientificValidation": "NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.",
  "oldClaim": {
    "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "Itens > linha IMP-001 > Resultado de produto",
    "text": "Usuário `ACTIVE` previamente cadastrado faz login, restaura a sessão, acessa rotas protegidas e encerra a sessão sem exposição de senha ou campos privilegiados.",
    "recommendedAddendum": "RECOMENDACAO: Preservar o corte histórico e acrescentar que a fronteira atual de sessão incorpora verificação quando exigida e versão de credencial; não reclassificar IMP-010 como concluída."
  },
  "gap": "Fronteira inspecionada; não é reauditoria de cadastro/recuperação/exclusão, cookie em produção, provedor de e-mail ou logout global.",
  "nextAction": "RECOMENDACAO: Adendar o baseline de identidade com as restrições atuais e manter os gates humanos/operacionais próprios.",
  "classification": [
    "EVIDENCIA_IMPLEMENTACAO",
    "FATO_DOCUMENTADO",
    "RECOMENDACAO"
  ],
  "evidenceLimit": "Inspeção estática nos dois snapshots. As referências duplicadas development/candidata identificam bytes equivalentes nestes caminhos; não transportam runtime, CI, homologação ou aceite humano entre SHAs."
}
```

### IMP-002-C01 — IMP-002

Fontes: [specs/002-criar-laboratorio/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/002-criar-laboratorio/spec.md>), [specs/002-criar-laboratorio/contracts/laboratories-api.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/002-criar-laboratorio/contracts/laboratories-api.openapi.yaml>), [specs/019-frontend-workspace-shell/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/019-frontend-workspace-shell/spec.md>), [src/app/api/laboratories/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/route.ts>), [src/app/api/laboratories/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/route.ts>), [src/app/api/laboratories/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/route.handlers.ts>), [src/app/api/laboratories/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/route.handlers.ts>), [src/app/api/server/middlewares/auth.middleware.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/middlewares/auth.middleware.ts>), [src/app/api/server/middlewares/auth.middleware.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/middlewares/auth.middleware.ts>), [src/app/api/server/services/laboratories.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/laboratories.service.ts>), [src/app/api/server/services/laboratories.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/laboratories.service.ts>), [src/app/api/server/laboratories/laboratory.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/laboratories/laboratory.contracts.ts>), [src/app/api/server/laboratories/laboratory.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/laboratories/laboratory.contracts.ts>), [prisma/schema.prisma](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/schema.prisma>), [prisma/schema.prisma](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/schema.prisma>), [prisma/migrations/20260907120000_unique_laboratory_access_code/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260907120000_unique_laboratory_access_code/migration.sql>), [prisma/migrations/20260907120000_unique_laboratory_access_code/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20260907120000_unique_laboratory_access_code/migration.sql>), [prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql>), [prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql>), [src/components/workspace/laboratory-workspace.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/workspace/laboratory-workspace.tsx>), [src/components/workspace/laboratory-workspace.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/workspace/laboratory-workspace.tsx>), [tests/unit/laboratory-contracts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/laboratory-contracts.test.ts>), [tests/unit/laboratory-contracts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/laboratory-contracts.test.ts>), [tests/unit/laboratories-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/laboratories-service.test.ts>), [tests/unit/laboratories-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/laboratories-service.test.ts>), [tests/integration/laboratories-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/laboratories-route.test.ts>), [tests/integration/laboratories-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/laboratories-route.test.ts>), [tests/e2e/create-laboratory.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/create-laboratory.spec.ts>), [tests/e2e/create-laboratory.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/create-laboratory.spec.ts>), [tests/e2e/frontend-workspace.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-workspace.spec.ts>), [tests/e2e/frontend-workspace.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-workspace.spec.ts>).

<!-- json-row: IMP-002-C01 -->
```json
{
  "id": "IMP-002-C01",
  "imp": "IMP-002",
  "scope": "Criar laboratório por nome e listar apenas vínculos atuais, com limite de cinco, criação atômica e DTO público.",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/002-criar-laboratorio/spec.md",
      "symbol": "FR-001–FR-013"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/002-criar-laboratorio/contracts/laboratories-api.openapi.yaml",
      "symbol": "GET/POST laboratories"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/019-frontend-workspace-shell/spec.md",
      "symbol": "US1"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/route.ts",
      "symbol": "exports GET/POST"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/route.ts",
      "symbol": "exports GET/POST"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/route.handlers.ts",
      "symbol": "createLaboratoriesHandlers"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/route.handlers.ts",
      "symbol": "createLaboratoriesHandlers"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/middlewares/auth.middleware.ts",
      "symbol": "requireAuth"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/middlewares/auth.middleware.ts",
      "symbol": "requireAuth"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/laboratories.service.ts",
      "symbol": "createAtomic / create / listAccessible"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/services/laboratories.service.ts",
      "symbol": "createAtomic / create / listAccessible"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/laboratories/laboratory.contracts.ts",
      "symbol": "parseCreateLaboratoryInput / serializePublicLaboratory"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/laboratories/laboratory.contracts.ts",
      "symbol": "parseCreateLaboratoryInput / serializePublicLaboratory"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/schema.prisma",
      "symbol": "LaboratoryRoom / ResearchersLinked"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "prisma/schema.prisma",
      "symbol": "LaboratoryRoom / ResearchersLinked"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20260907120000_unique_laboratory_access_code/migration.sql",
      "symbol": "índice accessCode"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "prisma/migrations/20260907120000_unique_laboratory_access_code/migration.sql",
      "symbol": "índice accessCode"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql",
      "symbol": "OWNER"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql",
      "symbol": "OWNER"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/workspace/laboratory-workspace.tsx",
      "symbol": "load / creationForm"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/workspace/laboratory-workspace.tsx",
      "symbol": "load / creationForm"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/laboratory-contracts.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/laboratory-contracts.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/laboratories-service.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/laboratories-service.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/laboratories-route.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/laboratories-route.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/create-laboratory.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/create-laboratory.spec.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/frontend-workspace.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/frontend-workspace.spec.ts"
    }
  ],
  "chain": {
    "route": "GET/POST /api/laboratories delegam principal.id; parser de nome rejeita campos não previstos; respostas no-store.",
    "authorization": "requireAuth valida sessão/identidade corrente; listagem é filtrada por ResearchersLinked.userId. Criar recebe o usuário do principal, não do body.",
    "service": "Prisma repository conta vínculos e cria LaboratoryRoom + ResearchersLinked OWNER em Serializable; MAX_LABORATORIES=5 e MAX_RETRIES=4 para P2002/P2034.",
    "persistence": "LaboratoryRoom, ResearchersLinked e accessCode único. Nome repetido permitido; limite inclui todos os vínculos, inclusive inativos. Nenhuma migration foi aplicada.",
    "ui": "LaboratoryWorkspace faz GET/POST reais, mantém loading/erro/vazio, trava envio e recarrega lista; criação não seleciona automaticamente laboratório."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/laboratory-contracts.test.ts",
      "tests/unit/laboratories-service.test.ts",
      "tests/integration/laboratories-route.test.ts",
      "tests/e2e/create-laboratory.spec.ts",
      "tests/e2e/frontend-workspace.spec.ts"
    ],
    "selection": "Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.",
    "execution": "NOT_RUN",
    "consultedEvidence": [
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/002-criar-laboratorio/spec.md",
        "location": "Reconciliation with development — 2026-09-13",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Registra testes focais e limitação histórica de E2E por persistência; não converter em execução atual.",
        "execution": "NOT_RUN"
      },
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/019-frontend-workspace-shell/implementation-evidence.md",
        "location": "arquivo de evidência",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Evidência histórica da incorporação do workspace consultada; validade limitada ao corte que o documento nomeia.",
        "execution": "NOT_RUN"
      }
    ]
  },
  "humanAcceptance": "NAO_VERIFICADO nesta missão. SC-005/SC-006/SC-010 da 002 exigem evidência de uso/teclado/rolagem compatível; specs019/020 mantêm aceite humano pendente. Automação histórica não prova participação humana.",
  "scientificValidation": "NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.",
  "oldClaim": {
    "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "Itens > linha IMP-002 > Estado atual / Evidência",
    "text": "`PROXIMO_CANDIDATO`; schema e interface parcial/mockada, sem API conectada.",
    "recommendedAddendum": "RECOMENDACAO: Adicionar estado por subcapacidade: criar/listar têm cadeia HTTP→sessão→serviço→Prisma→workspace nos dois snapshots; ingresso continua separado e indisponível."
  },
  "gap": "Não há evidência produzida nesta missão sobre concorrência real, aplicação remota da migration, latência ou uso humano.",
  "nextAction": "RECOMENDACAO: Atualizar a linha com fontes imutáveis, mantendo histórico e testes atuais NOT_RUN.",
  "classification": [
    "EVIDENCIA_IMPLEMENTACAO",
    "FATO_DOCUMENTADO",
    "RECOMENDACAO"
  ],
  "evidenceLimit": "Inspeção estática nos dois snapshots. As referências duplicadas development/candidata identificam bytes equivalentes nestes caminhos; não transportam runtime, CI, homologação ou aceite humano entre SHAs."
}
```

### IMP-002-C02 — IMP-002

Fontes: [specs/002-criar-laboratorio/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/002-criar-laboratorio/spec.md>), [specs/019-frontend-workspace-shell/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/019-frontend-workspace-shell/spec.md>), [src/app/api/laboratories/[laboratoryId]/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/route.ts>), [src/app/api/laboratories/[laboratoryId]/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/route.ts>), [src/app/api/laboratories/[laboratoryId]/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/route.handlers.ts>), [src/app/api/laboratories/[laboratoryId]/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/route.handlers.ts>), [src/app/api/server/middlewares/auth.middleware.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/middlewares/auth.middleware.ts>), [src/app/api/server/middlewares/auth.middleware.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/middlewares/auth.middleware.ts>), [src/app/api/server/services/laboratories.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/laboratories.service.ts>), [src/app/api/server/services/laboratories.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/laboratories.service.ts>), [src/app/api/server/laboratories/laboratory.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/laboratories/laboratory.contracts.ts>), [src/app/api/server/laboratories/laboratory.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/laboratories/laboratory.contracts.ts>), [prisma/schema.prisma](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/schema.prisma>), [prisma/schema.prisma](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/schema.prisma>), [prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql>), [prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql>), [src/components/workspace/laboratory-workspace.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/workspace/laboratory-workspace.tsx>), [src/components/workspace/laboratory-workspace.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/workspace/laboratory-workspace.tsx>), [tests/unit/laboratories-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/laboratories-service.test.ts>), [tests/unit/laboratories-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/laboratories-service.test.ts>), [tests/integration/laboratory-settings-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/laboratory-settings-route.test.ts>), [tests/integration/laboratory-settings-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/laboratory-settings-route.test.ts>), [tests/migration/area-registration-migration.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/migration/area-registration-migration.test.ts>), [tests/migration/area-registration-migration.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/migration/area-registration-migration.test.ts>), [tests/e2e/frontend-workspace.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-workspace.spec.ts>), [tests/e2e/frontend-workspace.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-workspace.spec.ts>).

<!-- json-row: IMP-002-C02 -->
```json
{
  "id": "IMP-002-C02",
  "imp": "IMP-002",
  "scope": "Consultar informações/membros mínimos e desativar ou excluir laboratório com confirmação textual e restrição a dados dependentes.",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/002-criar-laboratorio/spec.md",
      "symbol": "FR-015–FR-019; Amendment — Configurações do laboratório"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/019-frontend-workspace-shell/spec.md",
      "symbol": "US1 cenário 4"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/route.ts",
      "symbol": "GET/PATCH/DELETE"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/[laboratoryId]/route.ts",
      "symbol": "GET/PATCH/DELETE"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/route.handlers.ts",
      "symbol": "createLaboratorySettingsHandlers"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/[laboratoryId]/route.handlers.ts",
      "symbol": "createLaboratorySettingsHandlers"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/middlewares/auth.middleware.ts",
      "symbol": "requireAuth"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/middlewares/auth.middleware.ts",
      "symbol": "requireAuth"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/laboratories.service.ts",
      "symbol": "getDetails / deactivate / delete"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/services/laboratories.service.ts",
      "symbol": "getDetails / deactivate / delete"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/laboratories/laboratory.contracts.ts",
      "symbol": "parseRiskActionInput"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/laboratories/laboratory.contracts.ts",
      "symbol": "parseRiskActionInput"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/schema.prisma",
      "symbol": "LaboratoryRoom / ResearchersLinked / CollectionArea"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "prisma/schema.prisma",
      "symbol": "LaboratoryRoom / ResearchersLinked / CollectionArea"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql",
      "symbol": "triggers OWNER diferíveis"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql",
      "symbol": "triggers OWNER diferíveis"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/workspace/laboratory-workspace.tsx",
      "symbol": "openSettings / executeRiskAction"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/workspace/laboratory-workspace.tsx",
      "symbol": "openSettings / executeRiskAction"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/laboratories-service.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/laboratories-service.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/laboratory-settings-route.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/laboratory-settings-route.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/migration/area-registration-migration.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/migration/area-registration-migration.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/frontend-workspace.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/frontend-workspace.spec.ts"
    }
  ],
  "chain": {
    "route": "GET/PATCH/DELETE /api/laboratories/{laboratoryId}, com resposta no-store e envelope de conflito preservado.",
    "authorization": "requireAuth; consulta inicial filtra vínculo. Mutações comparam laboratory.userId com principal.id e nome atual com confirmationName no servidor.",
    "service": "getDetails projeta somente nome/iniciais dos membros; deactivate marca isActive=false; delete recusa áreas dependentes e remove vínculos/laboratório em transação.",
    "persistence": "Dados subordinados e FKs impedem perda da cadeia; trigger diferível OWNER permite a exclusão administrativa ao final da transação. Não há reativação nesta superfície.",
    "ui": "Diálogo real do workspace exige nome exato; loading/erro e cancelamento/foco; membros aparecem com nome e iniciais."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/laboratories-service.test.ts",
      "tests/integration/laboratory-settings-route.test.ts",
      "tests/migration/area-registration-migration.test.ts",
      "tests/e2e/frontend-workspace.spec.ts"
    ],
    "selection": "Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.",
    "execution": "NOT_RUN",
    "consultedEvidence": [
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/003-area-registration-and-viewing/implementation-evidence.md",
        "location": "Encerramento do bloqueio E2E em 2026-09-15",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Relata teste de migration para commit da exclusão administrativa e trigger OWNER; histórico consultado sem repetição.",
        "execution": "NOT_RUN"
      }
    ]
  },
  "humanAcceptance": "NAO_VERIFICADO nesta missão. SC-005/SC-006/SC-010 da 002 exigem evidência de uso/teclado/rolagem compatível; specs019/020 mantêm aceite humano pendente. Automação histórica não prova participação humana.",
  "scientificValidation": "NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.",
  "oldClaim": {
    "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
    "path": "docs/code-first-prd/implementation/implementation-plan.md",
    "location": "Módulos identificados > Laboratórios e workspace",
    "text": "Models e interface existem, mas a tela usa estado e conteúdo fixos e não há API de domínio conectada.",
    "recommendedAddendum": "RECOMENDACAO: Registrar consulta/configurações reais, confirmação pelo nome e recusa da exclusão com dados; não confundir desativação do laboratório com exclusão de conta nem afirmar teste remoto novo."
  },
  "gap": "Inspeção do guard e transações não demonstra execução de exclusão, integridade de base existente ou comportamento físico/assistivo.",
  "nextAction": "RECOMENDACAO: Adendar o plano com configuração conectada e preservar os limites humanos e remotos.",
  "classification": [
    "EVIDENCIA_IMPLEMENTACAO",
    "FATO_DOCUMENTADO",
    "RECOMENDACAO"
  ],
  "evidenceLimit": "Inspeção estática nos dois snapshots. As referências duplicadas development/candidata identificam bytes equivalentes nestes caminhos; não transportam runtime, CI, homologação ou aceite humano entre SHAs."
}
```

### IMP-002-F03 — IMP-002

Fontes: [specs/002-criar-laboratorio/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/002-criar-laboratorio/spec.md>), [specs/019-frontend-workspace-shell/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/019-frontend-workspace-shell/spec.md>), [src/components/workspace/laboratory-workspace.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/workspace/laboratory-workspace.tsx>), [src/components/workspace/laboratory-workspace.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/workspace/laboratory-workspace.tsx>), [src/app/api/laboratories/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/route.handlers.ts>), [src/app/api/laboratories/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/route.handlers.ts>), [src/app/api/server/services/laboratories.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/laboratories.service.ts>), [src/app/api/server/services/laboratories.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/laboratories.service.ts>), [src/app/api/server/services/laboratory-memberships.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/laboratory-memberships.service.ts>), [src/app/api/server/services/laboratory-memberships.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/laboratory-memberships.service.ts>), [tests/e2e/frontend-workspace.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-workspace.spec.ts>), [tests/e2e/frontend-workspace.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-workspace.spec.ts>), [tests/e2e/create-laboratory.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/create-laboratory.spec.ts>), [tests/e2e/create-laboratory.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/create-laboratory.spec.ts>).

<!-- json-row: IMP-002-F03 -->
```json
{
  "id": "IMP-002-F03",
  "imp": "IMP-002",
  "scope": "Fronteira de ingresso/convite por código: não confundir criação/listagem conectadas com gestão de ingresso implementada.",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/002-criar-laboratorio/spec.md",
      "symbol": "FR-014"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/019-frontend-workspace-shell/spec.md",
      "symbol": "US1 cenário 1"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/workspace/laboratory-workspace.tsx",
      "symbol": "bloco Entrar em um laboratório"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/workspace/laboratory-workspace.tsx",
      "symbol": "bloco Entrar em um laboratório"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/route.handlers.ts",
      "symbol": "superfície GET/POST"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/route.handlers.ts",
      "symbol": "superfície GET/POST"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/laboratories.service.ts",
      "symbol": "superfície de serviço"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/services/laboratories.service.ts",
      "symbol": "superfície de serviço"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/laboratory-memberships.service.ts",
      "symbol": "list / change"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/services/laboratory-memberships.service.ts",
      "symbol": "list / change"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/frontend-workspace.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/frontend-workspace.spec.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/create-laboratory.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/create-laboratory.spec.ts"
    }
  ],
  "chain": {
    "route": "Na superfície inspecionada, /api/laboratories oferece criar/listar; memberships lista/altera papéis, sem endpoint de ingresso localizado.",
    "authorization": "Não há ação de ingresso autorizada localizada; código de acesso gerado não concede autorização por si.",
    "service": "Nenhum join/invite/add-member localizado no conjunto de serviços/rotas inspecionado; ausência limitada a esse escopo.",
    "persistence": "accessCode persistido/único é infraestrutura, não prova fluxo de ingresso.",
    "ui": "Bloco Entrar em um laboratório informa Disponível em uma próxima etapa e não envia pedido de ingresso."
  },
  "presentInDevelopment": false,
  "presentInCandidate": false,
  "implementationState": "NAO_LOCALIZADO",
  "tests": {
    "paths": [
      "tests/e2e/frontend-workspace.spec.ts",
      "tests/e2e/create-laboratory.spec.ts"
    ],
    "selection": "Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO nesta missão. SC-005/SC-006/SC-010 da 002 exigem evidência de uso/teclado/rolagem compatível; specs019/020 mantêm aceite humano pendente. Automação histórica não prova participação humana.",
  "scientificValidation": "NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.",
  "oldClaim": {
    "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "Itens > linha IMP-002 > Riscos decisórios",
    "text": "`CF-PD-002` e `CF-PD-006` mantêm abertas criação, responsabilidade, ingresso, cardinalidade e permissões além do mínimo.",
    "recommendedAddendum": "RECOMENDACAO: Separar as regras mínimas já especificadas e conectadas das políticas de ingresso/convite ainda fora do recorte. Não encerrar pendências amplas por extrapolação."
  },
  "gap": "NAO_LOCALIZADO é ausência na busca delimitada e coerente com FR-014, não prova de inexistência em qualquer branch nem aprovação de política futura.",
  "nextAction": "RECOMENDACAO: Manter ingresso indisponível; encaminhar intenção e autoridade em feature própria se houver decisão humana.",
  "classification": [
    "EVIDENCIA_IMPLEMENTACAO",
    "FATO_DOCUMENTADO",
    "RECOMENDACAO"
  ],
  "evidenceLimit": "Inspeção estática nos dois snapshots. As referências duplicadas development/candidata identificam bytes equivalentes nestes caminhos; não transportam runtime, CI, homologação ou aceite humano entre SHAs."
}
```

### IMP-003-C01 — IMP-003

Fontes: [specs/003-area-registration-and-viewing/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/003-area-registration-and-viewing/spec.md>), [specs/019-frontend-workspace-shell/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/019-frontend-workspace-shell/spec.md>), [src/app/(private)/workspace/page.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/workspace/page.tsx>), [src/app/(private)/workspace/page.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/(private)/workspace/page.tsx>), [src/components/workspace/laboratory-workspace.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/workspace/laboratory-workspace.tsx>), [src/components/workspace/laboratory-workspace.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/workspace/laboratory-workspace.tsx>), [src/components/shell/laboratory-navigation.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/shell/laboratory-navigation.tsx>), [src/components/shell/laboratory-navigation.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/shell/laboratory-navigation.tsx>), [src/app/(private)/dashboard/laboratories/[laboratoryId]/layout.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/dashboard/laboratories/[laboratoryId]/layout.tsx>), [src/app/(private)/dashboard/laboratories/[laboratoryId]/layout.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/(private)/dashboard/laboratories/[laboratoryId]/layout.tsx>), [src/app/api/server/areas/area.authorization.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts>), [src/app/api/server/areas/area.authorization.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/areas/area.authorization.ts>), [prisma/schema.prisma](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/schema.prisma>), [prisma/schema.prisma](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/schema.prisma>), [src/app/api/server/services/areas.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/areas.service.ts>), [src/app/api/server/services/areas.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/areas.service.ts>), [tests/integration/laboratory-context-access.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/laboratory-context-access.test.ts>), [tests/integration/laboratory-context-access.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/laboratory-context-access.test.ts>), [tests/e2e/laboratory-context.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/laboratory-context.spec.ts>), [tests/e2e/laboratory-context.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/laboratory-context.spec.ts>), [tests/e2e/frontend-workspace.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-workspace.spec.ts>), [tests/e2e/frontend-workspace.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-workspace.spec.ts>), [tests/unit/area-authorization.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/area-authorization.test.ts>), [tests/unit/area-authorization.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/area-authorization.test.ts>).

<!-- json-row: IMP-003-C01 -->
```json
{
  "id": "IMP-003-C01",
  "imp": "IMP-003",
  "scope": "Selecionar laboratório explicitamente e preservar o contexto na URL/navegação com revalidação de vínculo e inativo somente leitura.",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/003-area-registration-and-viewing/spec.md",
      "symbol": "FR-008–FR-015"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/019-frontend-workspace-shell/spec.md",
      "symbol": "US1–US2"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/(private)/workspace/page.tsx",
      "symbol": "Workspace"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/(private)/workspace/page.tsx",
      "symbol": "Workspace"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/workspace/laboratory-workspace.tsx",
      "symbol": "link Acessar"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/workspace/laboratory-workspace.tsx",
      "symbol": "link Acessar"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/shell/laboratory-navigation.tsx",
      "symbol": "LaboratoryNavigation"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/shell/laboratory-navigation.tsx",
      "symbol": "LaboratoryNavigation"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/(private)/dashboard/laboratories/[laboratoryId]/layout.tsx",
      "symbol": "LaboratoryLayout"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/(private)/dashboard/laboratories/[laboratoryId]/layout.tsx",
      "symbol": "LaboratoryLayout"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/areas/area.authorization.ts",
      "symbol": "authorizeLaboratoryAccess / assertLaboratoryPermission"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/areas/area.authorization.ts",
      "symbol": "authorizeLaboratoryAccess / assertLaboratoryPermission"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/schema.prisma",
      "symbol": "ResearchersLinked"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "prisma/schema.prisma",
      "symbol": "ResearchersLinked"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/areas.service.ts",
      "symbol": "list / detail"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/services/areas.service.ts",
      "symbol": "list / detail"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/laboratory-context-access.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/laboratory-context-access.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/laboratory-context.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/laboratory-context.spec.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/frontend-workspace.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/frontend-workspace.spec.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/area-authorization.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/area-authorization.test.ts"
    }
  ],
  "chain": {
    "route": "Páginas /dashboard/laboratories/{laboratoryId}/... e APIs com laboratoryId explícito; criação/listagem não elegem contexto automaticamente.",
    "authorization": "requireAuth e authorizeLaboratoryAccess consultam conta/vínculo atual; UUID não é credencial; permissão e isActive reavaliados. Recurso inacessível resulta NOT_FOUND.",
    "service": "Consumers usam laboratório do caminho e não estado local como autoridade. Mutate=true recusa inativo; leituras mantêm readOnly=true.",
    "persistence": "ResearchersLinked composto userId+laboratoryRoomId e LaboratoryRoom.isActive governam contexto atual.",
    "ui": "Escolha no workspace; links do shell conservam laboratoryId e navegação/reload; inativo identificado e controles de escrita condicionados."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/integration/laboratory-context-access.test.ts",
      "tests/e2e/laboratory-context.spec.ts",
      "tests/e2e/frontend-workspace.spec.ts",
      "tests/unit/area-authorization.test.ts"
    ],
    "selection": "Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.",
    "execution": "NOT_RUN",
    "consultedEvidence": [
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/003-area-registration-and-viewing/implementation-evidence.md",
        "location": "Encerramento do bloqueio E2E em 2026-09-15",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Relata E2E de contexto, revogação, cruzamento e inatividade; não prova execução no snapshot desta missão.",
        "execution": "NOT_RUN"
      }
    ]
  },
  "humanAcceptance": "SC-009 e SC-010 = NAO_VERIFICADO, conforme spec003. Nova inspeção estática não mede conclusão sem assistência nem compreensão do contexto/ponto/somente leitura; aceite visual posterior continua separado.",
  "scientificValidation": "NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.",
  "oldClaim": {
    "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "Itens > linha IMP-003 > Estado atual",
    "text": "`DEPENDENTE_DE_AUTENTICACAO_E_LABORATORIO`; schema parcial, lista mockada e ação placeholder.",
    "recommendedAddendum": "RECOMENDACAO: Registrar contexto explícito e revalidação atuais como subcapacidade implementada estaticamente; manter SC-009/SC-010 sem medida humana."
  },
  "gap": "Nenhuma sessão ou navegação foi exercitada nesta missão; autorização foi seguida no código como dados.",
  "nextAction": "RECOMENDACAO: Adendar dependências já materializadas, evitando conservar estado histórico de placeholder como estado atual.",
  "classification": [
    "EVIDENCIA_IMPLEMENTACAO",
    "FATO_DOCUMENTADO",
    "RECOMENDACAO"
  ],
  "evidenceLimit": "Inspeção estática nos dois snapshots. As referências duplicadas development/candidata identificam bytes equivalentes nestes caminhos; não transportam runtime, CI, homologação ou aceite humano entre SHAs."
}
```

### IMP-003-C02 — IMP-003

Fontes: [specs/003-area-registration-and-viewing/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/003-area-registration-and-viewing/spec.md>), [specs/020-frontend-laboratory-dashboard/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/020-frontend-laboratory-dashboard/spec.md>), [src/app/api/laboratories/[laboratoryId]/memberships/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/memberships/route.handlers.ts>), [src/app/api/laboratories/[laboratoryId]/memberships/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/memberships/route.handlers.ts>), [src/app/api/laboratories/[laboratoryId]/memberships/[membershipId]/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/memberships/[membershipId]/route.handlers.ts>), [src/app/api/laboratories/[laboratoryId]/memberships/[membershipId]/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/memberships/[membershipId]/route.handlers.ts>), [src/app/api/server/areas/area.authorization.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts>), [src/app/api/server/areas/area.authorization.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/areas/area.authorization.ts>), [src/app/api/server/services/laboratory-memberships.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/laboratory-memberships.service.ts>), [src/app/api/server/services/laboratory-memberships.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/laboratory-memberships.service.ts>), [src/app/api/server/laboratories/laboratory-membership.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/laboratories/laboratory-membership.contracts.ts>), [src/app/api/server/laboratories/laboratory-membership.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/laboratories/laboratory-membership.contracts.ts>), [prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql>), [prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql>), [src/components/laboratories/laboratory-memberships.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/laboratories/laboratory-memberships.tsx>), [src/components/laboratories/laboratory-memberships.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/laboratories/laboratory-memberships.tsx>), [tests/unit/laboratory-membership-contracts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/laboratory-membership-contracts.test.ts>), [tests/unit/laboratory-membership-contracts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/laboratory-membership-contracts.test.ts>), [tests/unit/laboratory-memberships-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/laboratory-memberships-service.test.ts>), [tests/unit/laboratory-memberships-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/laboratory-memberships-service.test.ts>), [tests/integration/laboratory-memberships-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/laboratory-memberships-route.test.ts>), [tests/integration/laboratory-memberships-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/laboratory-memberships-route.test.ts>), [tests/migration/area-registration-migration.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/migration/area-registration-migration.test.ts>), [tests/migration/area-registration-migration.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/migration/area-registration-migration.test.ts>), [tests/e2e/laboratory-membership-roles.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/laboratory-membership-roles.spec.ts>), [tests/e2e/laboratory-membership-roles.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/laboratory-membership-roles.spec.ts>).

<!-- json-row: IMP-003-C02 -->
```json
{
  "id": "IMP-003-C02",
  "imp": "IMP-003",
  "scope": "Papéis contextuais OWNER/ADMIN/MEMBER, proprietário único e alteração concorrente de papel por OWNER.",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/003-area-registration-and-viewing/spec.md",
      "symbol": "FR-001–FR-007; FR-038"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/020-frontend-laboratory-dashboard/spec.md",
      "symbol": "US3; FR-006/FR-007"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/memberships/route.handlers.ts",
      "symbol": "GET"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/[laboratoryId]/memberships/route.handlers.ts",
      "symbol": "GET"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/memberships/[membershipId]/route.handlers.ts",
      "symbol": "PATCH"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/[laboratoryId]/memberships/[membershipId]/route.handlers.ts",
      "symbol": "PATCH"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/areas/area.authorization.ts",
      "symbol": "assertLaboratoryPermission"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/areas/area.authorization.ts",
      "symbol": "assertLaboratoryPermission"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/laboratory-memberships.service.ts",
      "symbol": "list / change"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/services/laboratory-memberships.service.ts",
      "symbol": "list / change"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/laboratories/laboratory-membership.contracts.ts",
      "symbol": "parseMembershipChange"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/laboratories/laboratory-membership.contracts.ts",
      "symbol": "parseMembershipChange"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql",
      "symbol": "ResearchersLinked_one_owner; imp003_check_owner"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql",
      "symbol": "ResearchersLinked_one_owner; imp003_check_owner"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/laboratories/laboratory-memberships.tsx",
      "symbol": "LaboratoryMemberships"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/laboratories/laboratory-memberships.tsx",
      "symbol": "LaboratoryMemberships"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/laboratory-membership-contracts.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/laboratory-membership-contracts.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/laboratory-memberships-service.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/laboratory-memberships-service.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/laboratory-memberships-route.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/laboratory-memberships-route.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/migration/area-registration-migration.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/migration/area-registration-migration.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/laboratory-membership-roles.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/laboratory-membership-roles.spec.ts"
    }
  ],
  "chain": {
    "route": "GET memberships e PATCH memberships/{membershipId}; parser allowlist recebe role/expectedRole.",
    "authorization": "Somente OWNER contextual passa MANAGE_ROLES; papel global não substitui vínculo. Mutação em laboratório inativo é recusada.",
    "service": "change recusa mutação de OWNER; updateMany condiciona expectedRole e devolve CONFLICT se não alterar exatamente um vínculo; Serializable.",
    "persistence": "Enum contextual, índice único parcial de OWNER e triggers diferíveis garantem relação do OWNER com criador no SQL versionado; backfill não promove ADMIN.",
    "ui": "LaboratoryMemberships carrega lista real, trava envio, mantém expectedRole e recarrega após conflito; layout/links de membros respeitam papel contextual."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/laboratory-membership-contracts.test.ts",
      "tests/unit/laboratory-memberships-service.test.ts",
      "tests/integration/laboratory-memberships-route.test.ts",
      "tests/migration/area-registration-migration.test.ts",
      "tests/e2e/laboratory-membership-roles.spec.ts"
    ],
    "selection": "Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.",
    "execution": "NOT_RUN",
    "consultedEvidence": [
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/003-area-registration-and-viewing/implementation-evidence.md",
        "location": "Implementação observada; Encerramento do bloqueio E2E",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Relata OWNER único, gestão de papéis e ensaios de migration/E2E no corte histórico.",
        "execution": "NOT_RUN"
      },
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/020-frontend-laboratory-dashboard/implementation-evidence.md",
        "location": "arquivo de evidência",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Evidência histórica da apresentação de membros e concorrência; sem execução atual.",
        "execution": "NOT_RUN"
      }
    ]
  },
  "humanAcceptance": "SC-009 e SC-010 = NAO_VERIFICADO, conforme spec003. Nova inspeção estática não mede conclusão sem assistência nem compreensão do contexto/ponto/somente leitura; aceite visual posterior continua separado.",
  "scientificValidation": "NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.",
  "oldClaim": {
    "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
    "path": "docs/code-first-prd/implementation/implementation-plan.md",
    "location": "Módulos identificados > Laboratórios e workspace",
    "text": "Models e interface existem, mas a tela usa estado e conteúdo fixos e não há API de domínio conectada.",
    "recommendedAddendum": "RECOMENDACAO: Acrescentar contexto/papéis da spec003 e apresentação020: alteração de papel existe sob OWNER, sem autorizar ingresso, remoção, transferência ou administração global."
  },
  "gap": "Não foi executado backfill nem verificada integridade da instância remota; existência da migration não prova aplicação.",
  "nextAction": "RECOMENDACAO: Usar rastreabilidade por capacidade e registrar validação histórica separada de estado estático atual.",
  "classification": [
    "EVIDENCIA_IMPLEMENTACAO",
    "FATO_DOCUMENTADO",
    "RECOMENDACAO"
  ],
  "evidenceLimit": "Inspeção estática nos dois snapshots. As referências duplicadas development/candidata identificam bytes equivalentes nestes caminhos; não transportam runtime, CI, homologação ou aceite humano entre SHAs."
}
```

### IMP-003-C03 — IMP-003

Fontes: [specs/003-area-registration-and-viewing/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/003-area-registration-and-viewing/spec.md>), [specs/003-area-registration-and-viewing/contracts/area-registration-api.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/003-area-registration-and-viewing/contracts/area-registration-api.openapi.yaml>), [specs/021-frontend-areas-cover/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/021-frontend-areas-cover/spec.md>), [src/app/api/laboratories/[laboratoryId]/areas/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/route.ts>), [src/app/api/laboratories/[laboratoryId]/areas/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/route.ts>), [src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts>), [src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts>), [src/app/api/server/areas/area.authorization.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts>), [src/app/api/server/areas/area.authorization.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/areas/area.authorization.ts>), [src/app/api/server/services/areas.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/areas.service.ts>), [src/app/api/server/services/areas.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/areas.service.ts>), [src/app/api/server/areas/area.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.contracts.ts>), [src/app/api/server/areas/area.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/areas/area.contracts.ts>), [prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql>), [prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql>), [src/components/areas/area-form.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/areas/area-form.tsx>), [src/components/areas/area-form.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/areas/area-form.tsx>), [src/components/areas/area-form-state.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/areas/area-form-state.ts>), [src/components/areas/area-form-state.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/areas/area-form-state.ts>), [src/components/areas/area-map.client.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/areas/area-map.client.tsx>), [src/components/areas/area-map.client.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/areas/area-map.client.tsx>), [tests/unit/area-contracts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/area-contracts.test.ts>), [tests/unit/area-contracts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/area-contracts.test.ts>), [tests/unit/area-form-state.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/area-form-state.test.ts>), [tests/unit/area-form-state.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/area-form-state.test.ts>), [tests/unit/areas-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/areas-service.test.ts>), [tests/unit/areas-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/areas-service.test.ts>), [tests/integration/areas-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/areas-route.test.ts>), [tests/integration/areas-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/areas-route.test.ts>), [tests/migration/area-registration-migration.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/migration/area-registration-migration.test.ts>), [tests/migration/area-registration-migration.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/migration/area-registration-migration.test.ts>), [tests/e2e/area-registration.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/area-registration.spec.ts>), [tests/e2e/area-registration.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/area-registration.spec.ts>), [tests/e2e/frontend-areas.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-areas.spec.ts>), [tests/e2e/frontend-areas.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-areas.spec.ts>).

<!-- json-row: IMP-003-C03 -->
```json
{
  "id": "IMP-003-C03",
  "imp": "IMP-003",
  "scope": "Criar área-ponto por entrada manual/mapa/localização opcional, validar e persistir apenas ponto final e autoria contextual.",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/003-area-registration-and-viewing/spec.md",
      "symbol": "FR-016–FR-029"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/003-area-registration-and-viewing/contracts/area-registration-api.openapi.yaml",
      "symbol": "POST áreas"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/021-frontend-areas-cover/spec.md",
      "symbol": "áreas"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/route.ts",
      "symbol": "GET/POST"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/route.ts",
      "symbol": "GET/POST"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts",
      "symbol": "createAreaHandlers"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts",
      "symbol": "createAreaHandlers"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/areas/area.authorization.ts",
      "symbol": "CREATE_AREA"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/areas/area.authorization.ts",
      "symbol": "CREATE_AREA"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/areas.service.ts",
      "symbol": "create"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/services/areas.service.ts",
      "symbol": "create"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/areas/area.contracts.ts",
      "symbol": "parseAreaInput"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/areas/area.contracts.ts",
      "symbol": "parseAreaInput"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql",
      "symbol": "DECIMAL; checks coordenadas; migração Coordinates"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "prisma/migrations/20260914000100_area_registration_and_membership_roles/migration.sql",
      "symbol": "DECIMAL; checks coordenadas; migração Coordinates"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/areas/area-form.tsx",
      "symbol": "AreaForm"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/areas/area-form.tsx",
      "symbol": "AreaForm"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/areas/area-form-state.ts",
      "symbol": "estado de geolocalização"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/areas/area-form-state.ts",
      "symbol": "estado de geolocalização"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/areas/area-map.client.tsx",
      "symbol": "Point"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/areas/area-map.client.tsx",
      "symbol": "Point"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/area-contracts.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/area-contracts.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/area-form-state.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/area-form-state.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/areas-service.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/areas-service.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/areas-route.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/areas-route.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/migration/area-registration-migration.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/migration/area-registration-migration.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/area-registration.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/area-registration.spec.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/frontend-areas.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/frontend-areas.spec.ts"
    }
  ],
  "chain": {
    "route": "POST /api/laboratories/{laboratoryId}/areas; body allowlisted, Location contextual para detalhe.",
    "authorization": "requireAuth; CREATE_AREA permite OWNER/ADMIN em laboratório ativo; userId e laboratoryRoomId derivados do servidor.",
    "service": "AreasService.create parseia entrada e cria área em Serializable; coordenadas Decimal com seis casas. Nomes/opcionais normalizados e limitados.",
    "persistence": "CollectionArea guarda latitude/longitude com checks; migration transporta ponto legado, verifica referências antes de remover Coordinates. Não é polígono nem histórico GPS.",
    "ui": "AreaForm sincroniza campos e marcador; localização é explícita/opcional, preserva edição diante de resposta tardia/erro e faz POST ao confirmar. Base cartográfica é opcional; manual continua disponível."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/area-contracts.test.ts",
      "tests/unit/area-form-state.test.ts",
      "tests/unit/areas-service.test.ts",
      "tests/integration/areas-route.test.ts",
      "tests/migration/area-registration-migration.test.ts",
      "tests/e2e/area-registration.spec.ts",
      "tests/e2e/frontend-areas.spec.ts"
    ],
    "selection": "Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.",
    "execution": "NOT_RUN",
    "consultedEvidence": [
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/003-area-registration-and-viewing/implementation-evidence.md",
        "location": "Retomada final; Encerramento do bloqueio E2E; Correção dos gates finais",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Relata criação, fallback geolocalização, migration5/5 e E2E12/12 no pai histórico nomeado; execução atual NOT_RUN.",
        "execution": "NOT_RUN"
      }
    ]
  },
  "humanAcceptance": "SC-009 e SC-010 = NAO_VERIFICADO, conforme spec003. Nova inspeção estática não mede conclusão sem assistência nem compreensão do contexto/ponto/somente leitura; aceite visual posterior continua separado.",
  "scientificValidation": "NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.",
  "oldClaim": {
    "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "Itens > linha IMP-003 > Evidência / Estado atual",
    "text": "`CollectionArea` e `Coordinates` em `prisma/schema.prisma`; ... schema parcial, lista mockada e ação placeholder.",
    "recommendedAddendum": "RECOMENDACAO: Acrescentar que o modelo atual localiza coordenadas na CollectionArea e há POST contextual, form/mapa local e persistência; preservar Coordinates como baseline histórico, não tabela atual."
  },
  "gap": "Não há prova nova de funcionamento do GPS, tiles externos, coordenadas de uma base existente ou migration remota.",
  "nextAction": "RECOMENDACAO: Adendar área-ponto conectada e sua precisão; manter mapa territorial/ciência em capacidades distintas.",
  "classification": [
    "EVIDENCIA_IMPLEMENTACAO",
    "FATO_DOCUMENTADO",
    "RECOMENDACAO"
  ],
  "evidenceLimit": "Inspeção estática nos dois snapshots. As referências duplicadas development/candidata identificam bytes equivalentes nestes caminhos; não transportam runtime, CI, homologação ou aceite humano entre SHAs."
}
```

### IMP-003-C04 — IMP-003

Fontes: [specs/003-area-registration-and-viewing/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/003-area-registration-and-viewing/spec.md>), [specs/021-frontend-areas-cover/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/021-frontend-areas-cover/spec.md>), [src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts>), [src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/route.handlers.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/route.handlers.ts>), [src/app/api/server/areas/area.authorization.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts>), [src/app/api/server/areas/area.authorization.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/areas/area.authorization.ts>), [src/app/api/server/services/areas.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/areas.service.ts>), [src/app/api/server/services/areas.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/areas.service.ts>), [src/app/api/server/areas/area.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.contracts.ts>), [src/app/api/server/areas/area.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/areas/area.contracts.ts>), [src/components/areas/area-list.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/areas/area-list.tsx>), [src/components/areas/area-list.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/areas/area-list.tsx>), [src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx>), [src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx>), [src/components/areas/area-map.client.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/areas/area-map.client.tsx>), [src/components/areas/area-map.client.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/areas/area-map.client.tsx>), [prisma/schema.prisma](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/schema.prisma>), [prisma/schema.prisma](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/schema.prisma>), [tests/unit/areas-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/areas-service.test.ts>), [tests/unit/areas-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/areas-service.test.ts>), [tests/unit/area-openapi-contract.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/area-openapi-contract.test.ts>), [tests/unit/area-openapi-contract.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/area-openapi-contract.test.ts>), [tests/unit/area-openapi-parity.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/area-openapi-parity.test.ts>), [tests/unit/area-openapi-parity.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/area-openapi-parity.test.ts>), [tests/integration/areas-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/areas-route.test.ts>), [tests/integration/areas-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/areas-route.test.ts>), [tests/e2e/area-registration.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/area-registration.spec.ts>), [tests/e2e/area-registration.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/area-registration.spec.ts>), [tests/e2e/frontend-areas.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-areas.spec.ts>), [tests/e2e/frontend-areas.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-areas.spec.ts>).

<!-- json-row: IMP-003-C04 -->
```json
{
  "id": "IMP-003-C04",
  "imp": "IMP-003",
  "scope": "Listar e detalhar áreas reais do laboratório, com ponto, opcionais, privacidade e somente leitura.",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/003-area-registration-and-viewing/spec.md",
      "symbol": "FR-030–FR-037"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/021-frontend-areas-cover/spec.md",
      "symbol": "listagem/detalhe"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts",
      "symbol": "GET"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/route.handlers.ts",
      "symbol": "GET"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/route.handlers.ts",
      "symbol": "GET"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/route.handlers.ts",
      "symbol": "GET"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/areas/area.authorization.ts",
      "symbol": "READ_AREAS"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/areas/area.authorization.ts",
      "symbol": "READ_AREAS"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/areas.service.ts",
      "symbol": "list / detail"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/services/areas.service.ts",
      "symbol": "list / detail"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/areas/area.contracts.ts",
      "symbol": "serializeAreaSummary / serializeAreaDetail"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/areas/area.contracts.ts",
      "symbol": "serializeAreaSummary / serializeAreaDetail"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/areas/area-list.tsx",
      "symbol": "AreaList"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/areas/area-list.tsx",
      "symbol": "AreaList"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx",
      "symbol": "AreaDetail"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx",
      "symbol": "AreaDetail"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/areas/area-map.client.tsx",
      "symbol": "AreaMapClient"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/areas/area-map.client.tsx",
      "symbol": "AreaMapClient"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/schema.prisma",
      "symbol": "CollectionArea"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "prisma/schema.prisma",
      "symbol": "CollectionArea"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/areas-service.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/areas-service.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/area-openapi-contract.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/area-openapi-contract.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/area-openapi-parity.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/area-openapi-parity.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/areas-route.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/areas-route.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/area-registration.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/area-registration.spec.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/frontend-areas.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/frontend-areas.spec.ts"
    }
  ],
  "chain": {
    "route": "GET coleção e GET /areas/{areaId}; página de detalhe também usa serviço no servidor.",
    "authorization": "Vínculo atual e laboratório autorizados antes da área; findFirst vincula id a laboratoryRoomId; três papéis leem, inclusive inativo.",
    "service": "List ordena createdAt/id, detail projeta allowlist; sem nome/id do criador, código de acesso ou estado funcional legado como filtro.",
    "persistence": "CollectionArea real; list inclui metadados de cover versionados quando existentes. Capa016/021 é incremento independente, não requisito original da003.",
    "ui": "AreaList faz fetch real; detalhe apresenta coordenadas, mapa de um ponto, opcionais/data e readOnly. AreaCoverEditor é consumidor integrado; operação Cloudinary não foi validada aqui."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/areas-service.test.ts",
      "tests/unit/area-openapi-contract.test.ts",
      "tests/unit/area-openapi-parity.test.ts",
      "tests/integration/areas-route.test.ts",
      "tests/e2e/area-registration.spec.ts",
      "tests/e2e/frontend-areas.spec.ts"
    ],
    "selection": "Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.",
    "execution": "NOT_RUN",
    "consultedEvidence": [
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/003-area-registration-and-viewing/implementation-evidence.md",
        "location": "Paridade final; E2E final conjunto",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Documenta allowlists, somente leitura e cenários históricos.",
        "execution": "NOT_RUN"
      },
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/021-frontend-areas-cover/implementation-evidence.md",
        "location": "arquivo de evidência",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Registro posterior consultado como histórico; cenários de capa sintética não são homologação de provedor.",
        "execution": "NOT_RUN"
      }
    ]
  },
  "humanAcceptance": "SC-009 e SC-010 = NAO_VERIFICADO, conforme spec003. Nova inspeção estática não mede conclusão sem assistência nem compreensão do contexto/ponto/somente leitura; aceite visual posterior continua separado.",
  "scientificValidation": "NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.",
  "oldClaim": {
    "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
    "path": "docs/code-first-prd/implementation/implementation-plan.md",
    "location": "Módulos identificados > Áreas e coordenadas",
    "text": "Models e lista visual existem; a lista é mockada, a criação é placeholder e não há API conectada.",
    "recommendedAddendum": "RECOMENDACAO: Acrescentar GET/lista/detalhe reais e privacidade; mapa local da área não equivale a análise territorial nem validação de capa em provedor real."
  },
  "gap": "Testes frontend-areas incluem cenários UI fake de capa; sua presença não prova upload/Cloudinary real. Não foi executada lista/detalhe nesta missão.",
  "nextAction": "RECOMENDACAO: Atualizar visão global por subcapacidade e remeter capa a016/021 com gate operacional próprio.",
  "classification": [
    "EVIDENCIA_IMPLEMENTACAO",
    "FATO_DOCUMENTADO",
    "RECOMENDACAO"
  ],
  "evidenceLimit": "Inspeção estática nos dois snapshots. As referências duplicadas development/candidata identificam bytes equivalentes nestes caminhos; não transportam runtime, CI, homologação ou aceite humano entre SHAs."
}
```

### IMP-004-C01 — IMP-004

Fontes: [specs/004-environmental-collection-registration/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/004-environmental-collection-registration/spec.md>), [specs/004-environmental-collection-registration/contracts/collection-registration-api.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/004-environmental-collection-registration/contracts/collection-registration-api.openapi.yaml>), [specs/023-frontend-collections/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/023-frontend-collections/spec.md>), [src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/new/page.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/new/page.tsx>), [src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/new/page.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/new/page.tsx>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts>), [src/app/api/server/collections/collection.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/collections/collection.contracts.ts>), [src/app/api/server/collections/collection.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/collections/collection.contracts.ts>), [src/app/api/server/areas/area.authorization.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts>), [src/app/api/server/areas/area.authorization.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/areas/area.authorization.ts>), [src/app/api/server/services/collections.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/collections.service.ts>), [src/app/api/server/services/collections.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/collections.service.ts>), [src/components/collections/collection-form.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/collections/collection-form.tsx>), [src/components/collections/collection-form.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/collections/collection-form.tsx>), [src/components/collections/collection-form-state.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/collections/collection-form-state.ts>), [src/components/collections/collection-form-state.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/collections/collection-form-state.ts>), [src/lib/collection-date-time.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/lib/collection-date-time.ts>), [src/lib/collection-date-time.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/lib/collection-date-time.ts>), [tests/unit/collection-contracts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collection-contracts.test.ts>), [tests/unit/collection-contracts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collection-contracts.test.ts>), [tests/unit/collection-date-time.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collection-date-time.test.ts>), [tests/unit/collection-date-time.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collection-date-time.test.ts>), [tests/unit/collection-form-state.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collection-form-state.test.ts>), [tests/unit/collection-form-state.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collection-form-state.test.ts>), [tests/unit/collections-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collections-service.test.ts>), [tests/unit/collections-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collections-service.test.ts>), [tests/integration/collections-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/collections-route.test.ts>), [tests/integration/collections-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/collections-route.test.ts>), [tests/e2e/collection-registration.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/collection-registration.spec.ts>), [tests/e2e/collection-registration.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/collection-registration.spec.ts>), [tests/e2e/frontend-collections.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-collections.spec.ts>), [tests/e2e/frontend-collections.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-collections.spec.ts>).

<!-- json-row: IMP-004-C01 -->
```json
{
  "id": "IMP-004-C01",
  "imp": "IMP-004",
  "scope": "Iniciar coleta na área, informar ocorrência RFC3339/offset/milissegundos e revisar em memória antes de confirmar.",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/004-environmental-collection-registration/spec.md",
      "symbol": "FR-001–FR-018; FR-023"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/004-environmental-collection-registration/contracts/collection-registration-api.openapi.yaml",
      "symbol": "POST collections"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/023-frontend-collections/spec.md",
      "symbol": "US2"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/new/page.tsx",
      "symbol": "NewCollectionPage"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/new/page.tsx",
      "symbol": "NewCollectionPage"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts",
      "symbol": "createCollectionHandlers"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts",
      "symbol": "createCollectionHandlers"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/collections/collection.contracts.ts",
      "symbol": "parseCollectionInput / parseIdempotencyKey"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/collections/collection.contracts.ts",
      "symbol": "parseCollectionInput / parseIdempotencyKey"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/areas/area.authorization.ts",
      "symbol": "CREATE_COLLECTION"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/areas/area.authorization.ts",
      "symbol": "CREATE_COLLECTION"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/collections.service.ts",
      "symbol": "create"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/services/collections.service.ts",
      "symbol": "create"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/collections/collection-form.tsx",
      "symbol": "CollectionForm"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/collections/collection-form.tsx",
      "symbol": "CollectionForm"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/collections/collection-form-state.ts",
      "symbol": "estado/revisão"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/collections/collection-form-state.ts",
      "symbol": "estado/revisão"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/lib/collection-date-time.ts",
      "symbol": "conversão de apresentação"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/lib/collection-date-time.ts",
      "symbol": "conversão de apresentação"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/collection-contracts.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/collection-contracts.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/collection-date-time.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/collection-date-time.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/collection-form-state.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/collection-form-state.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/collections-service.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/collections-service.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/collections-route.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/collections-route.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/collection-registration.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/collection-registration.spec.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/frontend-collections.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/frontend-collections.spec.ts"
    }
  ],
  "chain": {
    "route": "Página /collections/new lê área autorizada; POST /api/laboratories/{laboratoryId}/areas/{areaId}/collections recebe apenas occurredAt e Idempotency-Key.",
    "authorization": "requireAuth e autorização contextual; OWNER/ADMIN/MEMBER podem CREATE_COLLECTION em laboratório ativo; confirmação reavalia área subordinada.",
    "service": "parseCollectionInput valida data civil, offset explícito Z ou numérico, precisão até milissegundos e ocorrência não futura; CollectionsService fixa UUID, autoria e confirmedAt.",
    "persistence": "Nenhuma gravação antes da confirmação; somente a operação create posterior persiste CollectionData. Data de campo não é substituída por createdAt/confirmedAt.",
    "ui": "Form e review preservam contexto/instante/offset e valores corrigíveis antes de confirmar; não há draft persistido da criação de coleta. Draft015 aplica-se a medições em coleta já confirmada."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/collection-contracts.test.ts",
      "tests/unit/collection-date-time.test.ts",
      "tests/unit/collection-form-state.test.ts",
      "tests/unit/collections-service.test.ts",
      "tests/integration/collections-route.test.ts",
      "tests/e2e/collection-registration.spec.ts",
      "tests/e2e/frontend-collections.spec.ts"
    ],
    "selection": "Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.",
    "execution": "NOT_RUN",
    "consultedEvidence": [
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/004-environmental-collection-registration/implementation-evidence.md",
        "location": "T052–T053; T081–T084; T109",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Registra validação temporal, consulta e reconciliação técnicas históricas; SC-002/SC-007 permanecem não verificadas.",
        "execution": "NOT_RUN"
      }
    ]
  },
  "humanAcceptance": "SC-002 e SC-007 = NAO_VERIFICADO, conforme Human evaluation status da spec004; metas de 90% e compreensão não foram medidas nesta missão. Aceite humano da incorporação visual permanece pendente.",
  "scientificValidation": "NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.",
  "oldClaim": {
    "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "Itens > linha IMP-004 > Estado atual / Evidência",
    "text": "`AGUARDANDO_DEPENDENCIAS`; estrutura sem consumidor conectado.",
    "recommendedAddendum": "RECOMENDACAO: Registrar início/revisão/validação de ocorrência e POST atuais; distinguir coleta sem rascunho persistido de draft ambiental015."
  },
  "gap": "Inspeção não demonstra data de campo de usuários reais nem cumprimento das metas humanas.",
  "nextAction": "RECOMENDACAO: Adendar o fluxo conectado sem modificar os limites de edição, exclusão, offline e ciência.",
  "classification": [
    "EVIDENCIA_IMPLEMENTACAO",
    "FATO_DOCUMENTADO",
    "RECOMENDACAO"
  ],
  "evidenceLimit": "Inspeção estática nos dois snapshots. As referências duplicadas development/candidata identificam bytes equivalentes nestes caminhos; não transportam runtime, CI, homologação ou aceite humano entre SHAs."
}
```

### IMP-004-C02 — IMP-004

Fontes: [specs/004-environmental-collection-registration/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/004-environmental-collection-registration/spec.md>), [specs/023-frontend-collections/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/023-frontend-collections/spec.md>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts>), [src/app/api/server/collections/collection-initiation.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/collections/collection-initiation.ts>), [src/app/api/server/collections/collection-initiation.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/collections/collection-initiation.ts>), [src/app/api/server/services/collections.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/collections.service.ts>), [src/app/api/server/services/collections.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/collections.service.ts>), [prisma/migrations/20260915000100_collection_registration_metadata/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260915000100_collection_registration_metadata/migration.sql>), [prisma/migrations/20260915000100_collection_registration_metadata/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20260915000100_collection_registration_metadata/migration.sql>), [src/components/collections/collection-form-state.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/collections/collection-form-state.ts>), [src/components/collections/collection-form-state.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/collections/collection-form-state.ts>), [src/components/collections/collection-form.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/collections/collection-form.tsx>), [src/components/collections/collection-form.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/collections/collection-form.tsx>), [src/components/collections/collection-submission.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/collections/collection-submission.ts>), [src/components/collections/collection-submission.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/collections/collection-submission.ts>), [tests/unit/collection-initiation.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collection-initiation.test.ts>), [tests/unit/collection-initiation.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collection-initiation.test.ts>), [tests/unit/collection-form-state.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collection-form-state.test.ts>), [tests/unit/collection-form-state.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collection-form-state.test.ts>), [tests/unit/frontend-collections-recovery.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/frontend-collections-recovery.test.ts>), [tests/unit/frontend-collections-recovery.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/frontend-collections-recovery.test.ts>), [tests/unit/frontend-collections-submission.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/frontend-collections-submission.test.ts>), [tests/unit/frontend-collections-submission.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/frontend-collections-submission.test.ts>), [tests/unit/collections-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collections-service.test.ts>), [tests/unit/collections-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collections-service.test.ts>), [tests/integration/collections-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/collections-route.test.ts>), [tests/integration/collections-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/collections-route.test.ts>), [tests/e2e/frontend-collections.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-collections.spec.ts>), [tests/e2e/frontend-collections.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-collections.spec.ts>).

<!-- json-row: IMP-004-C02 -->
```json
{
  "id": "IMP-004-C02",
  "imp": "IMP-004",
  "scope": "Confirmar coleta atomicamente, recuperar resposta perdida sem duplicação e preservar a identidade que iniciou a tentativa.",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/004-environmental-collection-registration/spec.md",
      "symbol": "FR-019–FR-022"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/023-frontend-collections/spec.md",
      "symbol": "US1; FR-004–FR-006"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts",
      "symbol": "POST; X-Collection-Initiator-Proof"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/route.handlers.ts",
      "symbol": "POST; X-Collection-Initiator-Proof"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/collections/collection-initiation.ts",
      "symbol": "makeCollectionInitiatorProof / matchesCollectionInitiatorProof"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/collections/collection-initiation.ts",
      "symbol": "makeCollectionInitiatorProof / matchesCollectionInitiatorProof"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/collections.service.ts",
      "symbol": "create / sameTuple / PrismaCollectionStore"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/services/collections.service.ts",
      "symbol": "create / sameTuple / PrismaCollectionStore"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20260915000100_collection_registration_metadata/migration.sql",
      "symbol": "unicidade userId+confirmationKey"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "prisma/migrations/20260915000100_collection_registration_metadata/migration.sql",
      "symbol": "unicidade userId+confirmationKey"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/collections/collection-form-state.ts",
      "symbol": "snapshot e incerteza"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/collections/collection-form-state.ts",
      "symbol": "snapshot e incerteza"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/collections/collection-form.tsx",
      "symbol": "confirm"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/collections/collection-form.tsx",
      "symbol": "confirm"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/collections/collection-submission.ts",
      "symbol": "readCollectionConfirmation"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/collections/collection-submission.ts",
      "symbol": "readCollectionConfirmation"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/collection-initiation.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/collection-initiation.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/collection-form-state.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/collection-form-state.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/frontend-collections-recovery.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/frontend-collections-recovery.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/frontend-collections-submission.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/frontend-collections-submission.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/collections-service.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/collections-service.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/collections-route.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/collections-route.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/frontend-collections.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/frontend-collections.spec.ts"
    }
  ],
  "chain": {
    "route": "POST usa Idempotency-Key UUID; prova de iniciador opcional para compatibilidade de cliente legado, mas conferida se presente; resposta201/200 com Location canônica.",
    "authorization": "requireAuth antes do envio; prova HMAC enviada pelo browser vincula principal corrente à identidade inicial. Serviço revalida contexto antes de consultar replay.",
    "service": "Transação Serializable: busca mesma chave por autor, compara laboratório/área/instante/offset; igual recupera mesmo ID, divergência CONFLICT; retry limitado para P2002/P2034.",
    "persistence": "Unicidade composta userId+confirmationKey e tuple de metadados; create completo em transação.",
    "ui": "Snapshot estável de contexto/chave/body/prova; envio único; incerteza mantém bloqueio de edição e permite reenvio original; rejeição posterior não resolve automaticamente a primeira tentativa."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/collection-initiation.test.ts",
      "tests/unit/collection-form-state.test.ts",
      "tests/unit/frontend-collections-recovery.test.ts",
      "tests/unit/frontend-collections-submission.test.ts",
      "tests/unit/collections-service.test.ts",
      "tests/integration/collections-route.test.ts",
      "tests/e2e/frontend-collections.spec.ts"
    ],
    "selection": "Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.",
    "execution": "NOT_RUN",
    "consultedEvidence": [
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/023-frontend-collections/implementation-evidence.md",
        "location": "Fechamento da candidata funcional e gate do HEAD publicado; Regra de encerramento por SHA",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Relata15 gates e182 E2E da candidata funcional5f5d8719e25856b59e84c053cb13d2516dbeac49; exige validação do HEAD publicado separadamente. Números históricos, não execução desta missão.",
        "execution": "NOT_RUN"
      }
    ]
  },
  "humanAcceptance": "SC-002 e SC-007 = NAO_VERIFICADO, conforme Human evaluation status da spec004; metas de 90% e compreensão não foram medidas nesta missão. Aceite humano da incorporação visual permanece pendente.",
  "scientificValidation": "NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.",
  "oldClaim": {
    "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
    "path": "docs/code-first-prd/implementation/implementation-plan.md",
    "location": "Módulos identificados > Coletas",
    "text": "Model e ação visual existem, sem fluxo persistido conectado.",
    "recommendedAddendum": "RECOMENDACAO: Registrar confirmação atômica/idempotente e recuperação segura023 já conectadas; relatar prova de iniciador no browser sem afirmar obrigatoriedade para todo cliente da API."
  },
  "gap": "Transações e cenários A→B→A foram inspecionados como dados; não houve corrida, POST ou recuperação em runtime nesta missão.",
  "nextAction": "RECOMENDACAO: Atualizar o estado técnico estático e citar evidência023 pelo SHA próprio, sem transportar resultados para a base ou candidata atuais.",
  "classification": [
    "EVIDENCIA_IMPLEMENTACAO",
    "FATO_DOCUMENTADO",
    "RECOMENDACAO"
  ],
  "evidenceLimit": "Inspeção estática nos dois snapshots. As referências duplicadas development/candidata identificam bytes equivalentes nestes caminhos; não transportam runtime, CI, homologação ou aceite humano entre SHAs."
}
```

### IMP-004-C03 — IMP-004

Fontes: [specs/004-environmental-collection-registration/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/004-environmental-collection-registration/spec.md>), [specs/023-frontend-collections/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/023-frontend-collections/spec.md>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.handlers.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.handlers.ts>), [src/app/api/server/services/collections.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/collections.service.ts>), [src/app/api/server/services/collections.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/collections.service.ts>), [src/app/api/server/collections/collection.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/collections/collection.contracts.ts>), [src/app/api/server/collections/collection.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/collections/collection.contracts.ts>), [prisma/schema.prisma](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/schema.prisma>), [prisma/schema.prisma](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/schema.prisma>), [prisma/migrations/20260915000100_collection_registration_metadata/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260915000100_collection_registration_metadata/migration.sql>), [prisma/migrations/20260915000100_collection_registration_metadata/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20260915000100_collection_registration_metadata/migration.sql>), [src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx>), [src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx>), [src/components/collections/collection-detail.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/collections/collection-detail.tsx>), [src/components/collections/collection-detail.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/collections/collection-detail.tsx>), [tests/unit/collections-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collections-service.test.ts>), [tests/unit/collections-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collections-service.test.ts>), [tests/unit/collection-openapi-contract.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/collection-openapi-contract.test.ts>), [tests/unit/collection-openapi-contract.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/collection-openapi-contract.test.ts>), [tests/integration/collections-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/collections-route.test.ts>), [tests/integration/collections-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/collections-route.test.ts>), [tests/migration/collection-registration-migration.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/migration/collection-registration-migration.test.ts>), [tests/migration/collection-registration-migration.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/migration/collection-registration-migration.test.ts>), [tests/e2e/collection-registration.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/collection-registration.spec.ts>), [tests/e2e/collection-registration.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/collection-registration.spec.ts>), [tests/e2e/frontend-collections.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-collections.spec.ts>), [tests/e2e/frontend-collections.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-collections.spec.ts>).

<!-- json-row: IMP-004-C03 -->
```json
{
  "id": "IMP-004-C03",
  "imp": "IMP-004",
  "scope": "Consultar coleta confirmada e preservar associação, autoria interna, precisão temporal e imutabilidade.",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/004-environmental-collection-registration/spec.md",
      "symbol": "FR-024–FR-032"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/023-frontend-collections/spec.md",
      "symbol": "US3"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.ts",
      "symbol": "GET"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.ts",
      "symbol": "GET"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.handlers.ts",
      "symbol": "GET"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/route.handlers.ts",
      "symbol": "GET"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/collections.service.ts",
      "symbol": "detail / completeRecord / toDetail"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/services/collections.service.ts",
      "symbol": "detail / completeRecord / toDetail"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/collections/collection.contracts.ts",
      "symbol": "serializeCollectionDetail"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/collections/collection.contracts.ts",
      "symbol": "serializeCollectionDetail"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/schema.prisma",
      "symbol": "CollectionData"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "prisma/schema.prisma",
      "symbol": "CollectionData"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20260915000100_collection_registration_metadata/migration.sql",
      "symbol": "FK composta e trigger imp004_collection_immutable"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "prisma/migrations/20260915000100_collection_registration_metadata/migration.sql",
      "symbol": "FK composta e trigger imp004_collection_immutable"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx",
      "symbol": "CollectionDetailPage"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx",
      "symbol": "CollectionDetailPage"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/collections/collection-detail.tsx",
      "symbol": "CollectionDetail"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/collections/collection-detail.tsx",
      "symbol": "CollectionDetail"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/collections-service.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/collections-service.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/collection-openapi-contract.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/collection-openapi-contract.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/collections-route.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/collections-route.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/migration/collection-registration-migration.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/migration/collection-registration-migration.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/collection-registration.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/collection-registration.spec.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/frontend-collections.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/frontend-collections.spec.ts"
    }
  ],
  "chain": {
    "route": "GET /collections/{collectionId}; detalhe server-side em caminho com laboratório e área explícitos.",
    "authorization": "Vínculo atual e READ_AREAS; findDetail restringe simultaneamente id/areaId/laboratoryId e tuple confirmado. Inativo continua legível com readOnly.",
    "service": "DTO fechado contém id, occurredAt com offset original, confirmedAt, área/laboratório públicos e readOnly; não inclui userId nem confirmationKey.",
    "persistence": "FK composta para CollectionArea/laboratório e FK restritiva; trigger impede UPDATE/DELETE de coleta confirmada, inclusive fora da UI. Legado sem tuple completo não é projetado como coleta confirmada nova.",
    "ui": "CollectionDetail distingue ocorrência e confirmação; não oferece editar/excluir. Página tem consumidores IHFR posteriores, que não integram criação004 nem autorizam ciência nova."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/collections-service.test.ts",
      "tests/unit/collection-openapi-contract.test.ts",
      "tests/integration/collections-route.test.ts",
      "tests/migration/collection-registration-migration.test.ts",
      "tests/e2e/collection-registration.spec.ts",
      "tests/e2e/frontend-collections.spec.ts"
    ],
    "selection": "Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.",
    "execution": "NOT_RUN",
    "consultedEvidence": [
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/004-environmental-collection-registration/implementation-evidence.md",
        "location": "T094–T106; T109",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Relata migration, integração e E2E históricos; reconhece critérios humanos não medidos.",
        "execution": "NOT_RUN"
      }
    ]
  },
  "humanAcceptance": "SC-002 e SC-007 = NAO_VERIFICADO, conforme Human evaluation status da spec004; metas de 90% e compreensão não foram medidas nesta missão. Aceite humano da incorporação visual permanece pendente.",
  "scientificValidation": "NAO_APLICAVEL ao recorte de engenharia; nenhum resultado científico ou validação do IHFR é inferido.",
  "oldClaim": {
    "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "Itens > linha IMP-004 > Riscos decisórios",
    "text": "Data de campo, revisão, edição, exclusão e permissões estão abertas.",
    "recommendedAddendum": "RECOMENDACAO: Adicionar que ocorrência/revisão/permissões mínimas e consulta foram especificadas e conectadas na004; edição e exclusão continuam fora do recorte, sem encerrar políticas futuras."
  },
  "gap": "Não se conclui integridade de uma instância remota nem sucesso de trigger executada neste snapshot. Listagem/histórico pertencem a007, não são lacuna da consulta mínima004.",
  "nextAction": "RECOMENDACAO: Adendar os recortes resolvidos e preservar fronteiras com007 e006.",
  "classification": [
    "EVIDENCIA_IMPLEMENTACAO",
    "FATO_DOCUMENTADO",
    "RECOMENDACAO"
  ],
  "evidenceLimit": "Inspeção estática nos dois snapshots. As referências duplicadas development/candidata identificam bytes equivalentes nestes caminhos; não transportam runtime, CI, homologação ou aceite humano entre SHAs."
}
```

### IMP-005-C01 — IMP-005

Fontes: [specs/005-environmental-collection-data/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/005-environmental-collection-data/spec.md>), [specs/005-environmental-collection-data/contracts/measurement-contract-v1.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/005-environmental-collection-data/contracts/measurement-contract-v1.md>), [specs/005-environmental-collection-data/contracts/math-contract-v1.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/005-environmental-collection-data/contracts/math-contract-v1.md>), [src/types/environmental-data.type.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/types/environmental-data.type.ts>), [src/types/environmental-data.type.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/types/environmental-data.type.ts>), [src/types/environmental-data.validation.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/types/environmental-data.validation.ts>), [src/types/environmental-data.validation.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/types/environmental-data.validation.ts>), [src/app/api/server/environmental-data/environmental-data.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/environmental-data.contracts.ts>), [src/app/api/server/environmental-data/environmental-data.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/environmental-data.contracts.ts>), [src/app/api/server/environmental-data/environmental-data.http.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/environmental-data.http.ts>), [src/app/api/server/environmental-data/environmental-data.http.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/environmental-data.http.ts>), [src/components/environmental-data/environmental-data-form-state.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-data-form-state.ts>), [src/components/environmental-data/environmental-data-form-state.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-data-form-state.ts>), [src/components/environmental-data/environmental-data-review.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-data-review.tsx>), [src/components/environmental-data/environmental-data-review.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-data-review.tsx>), [src/components/environmental-data/environmental-data-detail.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-data-detail.tsx>), [src/components/environmental-data/environmental-data-detail.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-data-detail.tsx>), [tests/unit/environmental-data-contracts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/environmental-data-contracts.test.ts>), [tests/unit/environmental-data-contracts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/environmental-data-contracts.test.ts>), [tests/unit/environmental-data-form-state.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/environmental-data-form-state.test.ts>), [tests/unit/environmental-data-form-state.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/environmental-data-form-state.test.ts>), [tests/unit/environmental-data-openapi-contract.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/environmental-data-openapi-contract.test.ts>), [tests/unit/environmental-data-openapi-contract.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/environmental-data-openapi-contract.test.ts>), [tests/unit/frontend-environmental-preservation.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/frontend-environmental-preservation.test.ts>), [tests/unit/frontend-environmental-preservation.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/frontend-environmental-preservation.test.ts>).

<!-- json-row: IMP-005-C01 -->
```json
{
  "id": "IMP-005-C01",
  "imp": "IMP-005",
  "scope": "Contrato de captura ambiental v1: quatro grupos, unidades/regras explícitas, ausência distinta de zero/false e separação da matemática IHFR.",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/005-environmental-collection-data/spec.md",
      "symbol": "Authority and Scope; FR-003–FR-005; FR-014–FR-019; G2/G3"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/005-environmental-collection-data/contracts/measurement-contract-v1.md",
      "symbol": "Contrato de medição"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/005-environmental-collection-data/contracts/math-contract-v1.md",
      "symbol": "Separação de versões; Condição de ativação"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/types/environmental-data.type.ts",
      "symbol": "MEASUREMENT_CONTRACT_VERSION / ENVIRONMENTAL_FIELDS"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/types/environmental-data.type.ts",
      "symbol": "MEASUREMENT_CONTRACT_VERSION / ENVIRONMENTAL_FIELDS"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/types/environmental-data.validation.ts",
      "symbol": "validação compartilhada"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/types/environmental-data.validation.ts",
      "symbol": "validação compartilhada"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/environmental-data/environmental-data.contracts.ts",
      "symbol": "parseEnvironmentalInput / hashPayload"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/environmental-data/environmental-data.contracts.ts",
      "symbol": "parseEnvironmentalInput / hashPayload"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/environmental-data/environmental-data.http.ts",
      "symbol": "POST"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/environmental-data/environmental-data.http.ts",
      "symbol": "POST"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/environmental-data/environmental-data-form-state.ts",
      "symbol": "formToPayload"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/environmental-data/environmental-data-form-state.ts",
      "symbol": "formToPayload"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/environmental-data/environmental-data-review.tsx",
      "symbol": "EnvironmentalReview"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/environmental-data/environmental-data-review.tsx",
      "symbol": "EnvironmentalReview"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/environmental-data/environmental-data-detail.tsx",
      "symbol": "EnvironmentalValues"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/environmental-data/environmental-data-detail.tsx",
      "symbol": "EnvironmentalValues"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/environmental-data-contracts.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/environmental-data-contracts.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/environmental-data-form-state.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/environmental-data-form-state.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/environmental-data-openapi-contract.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/environmental-data-openapi-contract.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/frontend-environmental-preservation.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/frontend-environmental-preservation.test.ts"
    }
  ],
  "chain": {
    "route": "POST environmental-data valida envelope fechado water/soil/vegetation/terrain e Content-Type JSON; campos/valores inválidos resultam400.",
    "authorization": "O contrato de captura não substitui sessão/autorização; handler usa requireAuth e serviço aplica contexto atual.",
    "service": "Parser canônico rejeita extras/legado, enums/faixas/números não finitos e preserva zero/false/null opcionais. Hash/versionamento são do conjunto confirmado.",
    "persistence": "Payload v1 em EnvironmentalMeasurementSet separado dos models legados WaterData/SoilData/VegetationData/TerrainData. Contrato de medição não é mathContractVersion/algorithmVersion.",
    "ui": "Form/review mostram quatro grupos, labels/unidades e campos opcionais; nenhuma fórmula IHFR é executada por esse parser/formulário."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/environmental-data-contracts.test.ts",
      "tests/unit/environmental-data-form-state.test.ts",
      "tests/unit/environmental-data-openapi-contract.test.ts",
      "tests/unit/frontend-environmental-preservation.test.ts"
    ],
    "selection": "Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.",
    "execution": "NOT_RUN",
    "consultedEvidence": [
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/005-environmental-collection-data/implementation-evidence.md",
        "location": "Aceite humano e governança; Exclusões científicas verificadas — T036",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Registra separação de captura/diagnóstico e ausência de promoção científica; histórico consultado sem execução.",
        "execution": "NOT_RUN"
      }
    ]
  },
  "humanAcceptance": "SC-006/T037 = NAO_VERIFICADO, conforme implementation-evidence da spec005; identificação humana de origem, ausência e somente leitura não decorre dos testes. Aceite humano posterior permanece separado.",
  "scientificValidation": "Contrato de captura ihfr-measurement-v1 registrado como DECISAO_CONFIRMADA na spec005/contrato, com origem técnica de 2026-09-17. Isso não aprova cálculo nem valida ciência IHFR. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO para consumidores IHFR.",
  "oldClaim": {
    "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "Itens > linha IMP-005 > Estado atual / Dependências",
    "text": "`AGUARDANDO_DECISAO_CIENTIFICA`; models sem consumidor. ... contrato científico validado e versionado no nível aplicável.",
    "recommendedAddendum": "RECOMENDACAO: Distinguir captura técnica v1 aprovada para005 de validação científica do IHFR: parser/formulário/contrato estão conectados; G2/G3 fechados apenas no recorte técnico explicitado em2026-09-17."
  },
  "gap": "A formulação antiga não pode ser corrigida declarando ciência IHFR validada. Legado e schema isolado continuam sem autoridade científica.",
  "nextAction": "RECOMENDACAO: Adendar contrato técnico, versão e limites de aprovação; encaminhar qualquer mudança científica à autoridade competente.",
  "classification": [
    "EVIDENCIA_IMPLEMENTACAO",
    "FATO_DOCUMENTADO",
    "RECOMENDACAO"
  ],
  "evidenceLimit": "Inspeção estática nos dois snapshots. As referências duplicadas development/candidata identificam bytes equivalentes nestes caminhos; não transportam runtime, CI, homologação ou aceite humano entre SHAs."
}
```

### IMP-005-C02 — IMP-005

Fontes: [specs/005-environmental-collection-data/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/005-environmental-collection-data/spec.md>), [specs/005-environmental-collection-data/contracts/environmental-data-boundary.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/005-environmental-collection-data/contracts/environmental-data-boundary.md>), [specs/015-environmental-drafts/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/015-environmental-drafts/spec.md>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts>), [src/app/api/server/environmental-data/environmental-data.http.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/environmental-data.http.ts>), [src/app/api/server/environmental-data/environmental-data.http.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/environmental-data.http.ts>), [src/app/api/server/services/environmental-data.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/environmental-data.service.ts>), [src/app/api/server/services/environmental-data.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/environmental-data.service.ts>), [src/app/api/server/areas/area.authorization.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts>), [src/app/api/server/areas/area.authorization.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/areas/area.authorization.ts>), [prisma/migrations/20260917000100_environmental_measurement_set/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260917000100_environmental_measurement_set/migration.sql>), [prisma/migrations/20260917000100_environmental_measurement_set/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20260917000100_environmental_measurement_set/migration.sql>), [prisma/migrations/20261010000100_environmental_drafts/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20261010000100_environmental_drafts/migration.sql>), [prisma/migrations/20261010000100_environmental_drafts/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20261010000100_environmental_drafts/migration.sql>), [src/components/environmental-data/environmental-data-form.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-data-form.tsx>), [src/components/environmental-data/environmental-data-form.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-data-form.tsx>), [tests/unit/environmental-data-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/environmental-data-service.test.ts>), [tests/unit/environmental-data-service.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/environmental-data-service.test.ts>), [tests/integration/environmental-data-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/environmental-data-route.test.ts>), [tests/integration/environmental-data-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/environmental-data-route.test.ts>), [tests/integration/environmental-data-concurrency.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/environmental-data-concurrency.test.ts>), [tests/integration/environmental-data-concurrency.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/environmental-data-concurrency.test.ts>), [tests/integration/environmental-drafts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/environmental-drafts.test.ts>), [tests/integration/environmental-drafts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/environmental-drafts.test.ts>), [tests/migration/environmental-data-migration.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/migration/environmental-data-migration.test.ts>), [tests/migration/environmental-data-migration.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/migration/environmental-data-migration.test.ts>), [tests/e2e/environmental-data-registration.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/environmental-data-registration.spec.ts>), [tests/e2e/environmental-data-registration.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/environmental-data-registration.spec.ts>), [tests/e2e/frontend-environmental-drafts.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-environmental-drafts.spec.ts>), [tests/e2e/frontend-environmental-drafts.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-environmental-drafts.spec.ts>).

<!-- json-row: IMP-005-C02 -->
```json
{
  "id": "IMP-005-C02",
  "imp": "IMP-005",
  "scope": "Confirmar conjunto integral imutável por coleta, idempotência própria e consumo transacional do draft pessoal quando fornecido.",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/005-environmental-collection-data/spec.md",
      "symbol": "FR-006–FR-009; FR-014–FR-018"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/005-environmental-collection-data/contracts/environmental-data-boundary.md",
      "symbol": "C-002/C-004"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/015-environmental-drafts/spec.md",
      "symbol": "consumo na confirmação"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts",
      "symbol": "POST"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts",
      "symbol": "POST"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/environmental-data/environmental-data.http.ts",
      "symbol": "createEnvironmentalHandlers"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/environmental-data/environmental-data.http.ts",
      "symbol": "createEnvironmentalHandlers"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/environmental-data.service.ts",
      "symbol": "create / PrismaMeasurementStore / measurementAuthorization"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/services/environmental-data.service.ts",
      "symbol": "create / PrismaMeasurementStore / measurementAuthorization"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/areas/area.authorization.ts",
      "symbol": "CREATE_ENVIRONMENTAL_DATA"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/areas/area.authorization.ts",
      "symbol": "CREATE_ENVIRONMENTAL_DATA"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20260917000100_environmental_measurement_set/migration.sql",
      "symbol": "unicidades; trigger imutabilidade"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "prisma/migrations/20260917000100_environmental_measurement_set/migration.sql",
      "symbol": "unicidades; trigger imutabilidade"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20261010000100_environmental_drafts/migration.sql",
      "symbol": "EnvironmentalDraft"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "prisma/migrations/20261010000100_environmental_drafts/migration.sql",
      "symbol": "EnvironmentalDraft"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/environmental-data/environmental-data-form.tsx",
      "symbol": "confirm"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/environmental-data/environmental-data-form.tsx",
      "symbol": "confirm"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/environmental-data-service.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/environmental-data-service.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/environmental-data-route.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/environmental-data-route.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/environmental-data-concurrency.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/environmental-data-concurrency.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/environmental-drafts.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/environmental-drafts.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/migration/environmental-data-migration.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/migration/environmental-data-migration.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/environmental-data-registration.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/environmental-data-registration.spec.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/frontend-environmental-drafts.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/frontend-environmental-drafts.spec.ts"
    }
  ],
  "chain": {
    "route": "POST environmental-data recebe Idempotency-Key próprio; Draft-Id/Draft-Revision opcionais são validados juntos. Prova de iniciador enviada pelo browser é verificada se presente.",
    "authorization": "requireAuth, identidade ACTIVE, vínculo e CREATE_ENVIRONMENTAL_DATA; três papéis podem gravar em ativo; área/coleta/tuple confirmado subordinados são revalidados antes do replay.",
    "service": "Serializable: compara autor/chave/coleta/hash/measurementContractVersion; mesma ação retorna200, divergência/segundo conjunto409. Se há draft próprio, exige referência atual; consumo e create ocorrem na mesma transação.",
    "persistence": "CollectionData único por EnvironmentalMeasurementSet; userId+confirmationKey único; payload JSON/versionado e confirmedAt; trigger rejeita UPDATE/DELETE de conjunto confirmado.",
    "ui": "Revisão em memória e POST final; sucesso após resposta válida; resultado incerto conserva snapshot e bloqueio. Conjunto confirmado permanece distinto de draft e metadados da coleta."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/environmental-data-service.test.ts",
      "tests/integration/environmental-data-route.test.ts",
      "tests/integration/environmental-data-concurrency.test.ts",
      "tests/integration/environmental-drafts.test.ts",
      "tests/migration/environmental-data-migration.test.ts",
      "tests/e2e/environmental-data-registration.spec.ts",
      "tests/e2e/frontend-environmental-drafts.spec.ts"
    ],
    "selection": "Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.",
    "execution": "NOT_RUN",
    "consultedEvidence": [
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/005-environmental-collection-data/implementation-evidence.md",
        "location": "Validação incremental; Preparação final do PR — 2026-09-18",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Registra resultados próprios do commit de produto e regressão completa histórica incompleta; não somar nem promover as execuções.",
        "execution": "NOT_RUN"
      },
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/015-environmental-drafts/implementation-evidence.md",
        "location": "Evidências de implementação015",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Relata consumo/rollback/save-versus-confirm e limitações; sem nova execução.",
        "execution": "NOT_RUN"
      }
    ]
  },
  "humanAcceptance": "SC-006/T037 = NAO_VERIFICADO, conforme implementation-evidence da spec005; identificação humana de origem, ausência e somente leitura não decorre dos testes. Aceite humano posterior permanece separado.",
  "scientificValidation": "Contrato de captura ihfr-measurement-v1 registrado como DECISAO_CONFIRMADA na spec005/contrato, com origem técnica de 2026-09-17. Isso não aprova cálculo nem valida ciência IHFR. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO para consumidores IHFR.",
  "oldClaim": {
    "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
    "path": "docs/code-first-prd/implementation/implementation-plan.md",
    "location": "Módulos identificados > Dados ambientais",
    "text": "Models de água, solo, vegetação e terreno existem sem consumidor; não representam contrato científico aprovado.",
    "recommendedAddendum": "RECOMENDACAO: Acrescentar conjunto EnvironmentalMeasurementSet v1 conectado, integral/idempotente/imutável, separado dos quatro models legados; não transformar esse incremento em aprovação da matemática IHFR."
  },
  "gap": "Migration/teste versionado não prova aplicação em banco remoto; concorrência/rollback/identidade foram lidos, não exercitados.",
  "nextAction": "RECOMENDACAO: Atualizar a cadeia persistida e citar contratos005/015 em vez de resumir tudo como models legados sem consumidor.",
  "classification": [
    "EVIDENCIA_IMPLEMENTACAO",
    "FATO_DOCUMENTADO",
    "RECOMENDACAO"
  ],
  "evidenceLimit": "Inspeção estática nos dois snapshots. As referências duplicadas development/candidata identificam bytes equivalentes nestes caminhos; não transportam runtime, CI, homologação ou aceite humano entre SHAs."
}
```

### IMP-005-C03 — IMP-005

Fontes: [specs/005-environmental-collection-data/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/005-environmental-collection-data/spec.md>), [specs/005-environmental-collection-data/contracts/environmental-data-boundary.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/005-environmental-collection-data/contracts/environmental-data-boundary.md>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts>), [src/app/api/server/environmental-data/environmental-data.http.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/environmental-data.http.ts>), [src/app/api/server/environmental-data/environmental-data.http.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/environmental-data.http.ts>), [src/app/api/server/services/environmental-data.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/environmental-data.service.ts>), [src/app/api/server/services/environmental-data.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/environmental-data.service.ts>), [src/components/environmental-data/environmental-data-page.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-data-page.tsx>), [src/components/environmental-data/environmental-data-page.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-data-page.tsx>), [src/components/environmental-data/environmental-data-detail.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-data-detail.tsx>), [src/components/environmental-data/environmental-data-detail.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-data-detail.tsx>), [src/types/environmental-data.type.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/types/environmental-data.type.ts>), [src/types/environmental-data.type.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/types/environmental-data.type.ts>), [prisma/schema.prisma](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/schema.prisma>), [prisma/schema.prisma](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/schema.prisma>), [tests/unit/environmental-data-service-read.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/environmental-data-service-read.test.ts>), [tests/unit/environmental-data-service-read.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/environmental-data-service-read.test.ts>), [tests/integration/environmental-data-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/environmental-data-route.test.ts>), [tests/integration/environmental-data-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/environmental-data-route.test.ts>), [tests/e2e/environmental-data-read.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/environmental-data-read.spec.ts>), [tests/e2e/environmental-data-read.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/environmental-data-read.spec.ts>), [tests/e2e/frontend-environmental-drafts.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-environmental-drafts.spec.ts>), [tests/e2e/frontend-environmental-drafts.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-environmental-drafts.spec.ts>).

<!-- json-row: IMP-005-C03 -->
```json
{
  "id": "IMP-005-C03",
  "imp": "IMP-005",
  "scope": "Consultar valores ambientais efetivamente persistidos, ausência explícita e contexto somente leitura sem autoria/chaves/diagnóstico no DTO.",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/005-environmental-collection-data/spec.md",
      "symbol": "FR-008; FR-010–FR-013"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/005-environmental-collection-data/contracts/environmental-data-boundary.md",
      "symbol": "C-003/C-005"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts",
      "symbol": "GET"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/route.ts",
      "symbol": "GET"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/environmental-data/environmental-data.http.ts",
      "symbol": "GET"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/environmental-data/environmental-data.http.ts",
      "symbol": "GET"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/environmental-data.service.ts",
      "symbol": "detail / project / assertContext"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/services/environmental-data.service.ts",
      "symbol": "detail / project / assertContext"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/environmental-data/environmental-data-page.tsx",
      "symbol": "EnvironmentalDataPage"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/environmental-data/environmental-data-page.tsx",
      "symbol": "EnvironmentalDataPage"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/environmental-data/environmental-data-detail.tsx",
      "symbol": "EnvironmentalDetail / EnvironmentalValues"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/environmental-data/environmental-data-detail.tsx",
      "symbol": "EnvironmentalDetail / EnvironmentalValues"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/types/environmental-data.type.ts",
      "symbol": "PublicEnvironmentalData"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/types/environmental-data.type.ts",
      "symbol": "PublicEnvironmentalData"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/schema.prisma",
      "symbol": "EnvironmentalMeasurementSet"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "prisma/schema.prisma",
      "symbol": "EnvironmentalMeasurementSet"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/environmental-data-service-read.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/environmental-data-service-read.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/environmental-data-route.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/environmental-data-route.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/environmental-data-read.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/environmental-data-read.spec.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/frontend-environmental-drafts.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/frontend-environmental-drafts.spec.ts"
    }
  ],
  "chain": {
    "route": "GET environmental-data devolve environmentalData:null para coleta acessível sem conjunto; ausência não se confunde com recurso inexistente.",
    "authorization": "requireAuth e READ_ENVIRONMENTAL_DATA; laboratório→área→coleta revalidados; inativo pode ler e retorna readOnly.",
    "service": "project exige versão conhecida e revalida payload persistido; somente id/collectionId/versão/confirmedAt/readOnly e quatro grupos, sem userId/chave/hash.",
    "persistence": "Leitura de EnvironmentalMeasurementSet da coleta confirmada; não adapta nem preenche dados a partir de WaterData/SoilData/VegetationData/TerrainData legados.",
    "ui": "EnvironmentalDataPage usa serviços no servidor e diferencia ausência, form, leitura e inativo; EnvironmentalValues mostra valores aceitos/ausência sem inferir qualidade científica."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/environmental-data-service-read.test.ts",
      "tests/integration/environmental-data-route.test.ts",
      "tests/e2e/environmental-data-read.spec.ts",
      "tests/e2e/frontend-environmental-drafts.spec.ts"
    ],
    "selection": "Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.",
    "execution": "NOT_RUN",
    "consultedEvidence": [
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/005-environmental-collection-data/implementation-evidence.md",
        "location": "Aceite humano e governança",
        "classification": "FATO_DOCUMENTADO",
        "summary": "SC-006/T037 segue NAO_VERIFICADO.",
        "execution": "NOT_RUN"
      },
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/024-frontend-environmental-drafts/implementation-evidence.md",
        "location": "Fechamento da candidata funcional e gate do HEAD publicado",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Explicita que as seis configurações visuais cobrem formulário/draft/revisão; leitura confirmada é verificada separadamente, não seis capturas de leitura.",
        "execution": "NOT_RUN"
      }
    ]
  },
  "humanAcceptance": "SC-006/T037 = NAO_VERIFICADO, conforme implementation-evidence da spec005; identificação humana de origem, ausência e somente leitura não decorre dos testes. Aceite humano posterior permanece separado.",
  "scientificValidation": "Contrato de captura ihfr-measurement-v1 registrado como DECISAO_CONFIRMADA na spec005/contrato, com origem técnica de 2026-09-17. Isso não aprova cálculo nem valida ciência IHFR. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO para consumidores IHFR.",
  "oldClaim": {
    "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "Itens > linha IMP-005 > Evidência",
    "text": "`WaterData`, `SoilData`, `VegetationData` e `TerrainData` em `prisma/schema.prisma`; `CF-PRD-FR-007`.",
    "recommendedAddendum": "RECOMENDACAO: Adicionar leitura do conjunto confirmado v1 e allowlist/ausência/readOnly; citar schema atual e serviço, mantendo models legados como legado e não contrato vigente."
  },
  "gap": "SC-006 continua humano. Leitura confirmada tem testes distintos de pixels/capturas da tela em edição; não inferir todas as telas pela matriz visual do formulário.",
  "nextAction": "RECOMENDACAO: Adendar leitura real com aceites separados e limite científico explícito.",
  "classification": [
    "EVIDENCIA_IMPLEMENTACAO",
    "FATO_DOCUMENTADO",
    "RECOMENDACAO"
  ],
  "evidenceLimit": "Inspeção estática nos dois snapshots. As referências duplicadas development/candidata identificam bytes equivalentes nestes caminhos; não transportam runtime, CI, homologação ou aceite humano entre SHAs."
}
```

### IMP-005-I04 — IMP-005

Fontes: [specs/015-environmental-drafts/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/015-environmental-drafts/spec.md>), [specs/015-environmental-drafts/contracts/drafts.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/015-environmental-drafts/contracts/drafts.md>), [specs/024-frontend-environmental-drafts/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/024-frontend-environmental-drafts/spec.md>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/draft/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/draft/route.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/draft/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/draft/route.ts>), [src/app/api/server/environmental-data/draft.http.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/draft.http.ts>), [src/app/api/server/environmental-data/draft.http.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/draft.http.ts>), [src/app/api/server/environmental-data/draft.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/draft.service.ts>), [src/app/api/server/environmental-data/draft.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/draft.service.ts>), [src/types/environmental-draft.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/types/environmental-draft.ts>), [src/types/environmental-draft.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/types/environmental-draft.ts>), [prisma/migrations/20261010000100_environmental_drafts/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20261010000100_environmental_drafts/migration.sql>), [prisma/migrations/20261010000100_environmental_drafts/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/prisma/migrations/20261010000100_environmental_drafts/migration.sql>), [src/components/environmental-data/environmental-draft-actions.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-draft-actions.tsx>), [src/components/environmental-data/environmental-draft-actions.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-draft-actions.tsx>), [src/components/environmental-data/environmental-data-form.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-data-form.tsx>), [src/components/environmental-data/environmental-data-form.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-data-form.tsx>), [tests/unit/environmental-draft-contracts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/environmental-draft-contracts.test.ts>), [tests/unit/environmental-draft-contracts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/environmental-draft-contracts.test.ts>), [tests/integration/environmental-draft-http.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/environmental-draft-http.test.ts>), [tests/integration/environmental-draft-http.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/environmental-draft-http.test.ts>), [tests/integration/environmental-drafts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/environmental-drafts.test.ts>), [tests/integration/environmental-drafts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/environmental-drafts.test.ts>), [tests/migration/environmental-drafts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/migration/environmental-drafts.test.ts>), [tests/migration/environmental-drafts.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/migration/environmental-drafts.test.ts>), [tests/e2e/environmental-drafts.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/environmental-drafts.spec.ts>), [tests/e2e/environmental-drafts.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/environmental-drafts.spec.ts>), [tests/e2e/frontend-environmental-drafts.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-environmental-drafts.spec.ts>), [tests/e2e/frontend-environmental-drafts.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-environmental-drafts.spec.ts>).

<!-- json-row: IMP-005-I04 -->
```json
{
  "id": "IMP-005-I04",
  "imp": "IMP-005",
  "scope": "Incremento015/024: salvar, retomar e descartar draft ambiental pessoal por titular/coleta confirmada, com revisão otimista, replay e isolamento.",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/015-environmental-drafts/spec.md",
      "symbol": "draft pessoal e salvamento explícito"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/015-environmental-drafts/contracts/drafts.md",
      "symbol": "contrato de draft"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/024-frontend-environmental-drafts/spec.md",
      "symbol": "US1/US2; FR-001–FR-006"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/draft/route.ts",
      "symbol": "GET/PUT/DELETE"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/environmental-data/draft/route.ts",
      "symbol": "GET/PUT/DELETE"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/environmental-data/draft.http.ts",
      "symbol": "createDraftHandlers"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/environmental-data/draft.http.ts",
      "symbol": "createDraftHandlers"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/environmental-data/draft.service.ts",
      "symbol": "detail / save / discard / context"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/environmental-data/draft.service.ts",
      "symbol": "detail / save / discard / context"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/types/environmental-draft.ts",
      "symbol": "parseDraftSave / parseDraftReference / parseDraftFields"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/types/environmental-draft.ts",
      "symbol": "parseDraftSave / parseDraftReference / parseDraftFields"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20261010000100_environmental_drafts/migration.sql",
      "symbol": "unicidade e checks"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "prisma/migrations/20261010000100_environmental_drafts/migration.sql",
      "symbol": "unicidade e checks"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/environmental-data/environmental-draft-actions.tsx",
      "symbol": "useEnvironmentalDraft / EnvironmentalDraftActions"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/environmental-data/environmental-draft-actions.tsx",
      "symbol": "useEnvironmentalDraft / EnvironmentalDraftActions"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/environmental-data/environmental-data-form.tsx",
      "symbol": "saveDraft / reloadDraft / discardDraft"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/environmental-data/environmental-data-form.tsx",
      "symbol": "saveDraft / reloadDraft / discardDraft"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/environmental-draft-contracts.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/environmental-draft-contracts.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/environmental-draft-http.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/environmental-draft-http.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/environmental-drafts.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/environmental-drafts.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/migration/environmental-drafts.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/migration/environmental-drafts.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/environmental-drafts.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/environmental-drafts.spec.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/frontend-environmental-drafts.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/frontend-environmental-drafts.spec.ts"
    }
  ],
  "chain": {
    "route": "GET/PUT/DELETE /environmental-data/draft; PUT/DELETE conferem CSRF; limite de body32768 bytes; private,no-store.",
    "authorization": "requireAuth, prova de iniciador quando presente e contexto atual antes de cada ação; chave de leitura userId+collectionDataId separa titulares.",
    "service": "Serializable com retry limitado; saveKey/hash e expectedRevision+draftId impedem sobrescrita silenciosa; discard condiciona identidade/revisão e não remove draft recriado.",
    "persistence": "EnvironmentalDraft separado de ciência confirmada, unique(userId,collectionDataId), versão environmental-draft-v1, revisão positiva; sem TTL automático. Conta excluída pode ter cleanup pessoal em fluxo013, que não foi reauditado aqui.",
    "ui": "Save/reload/discard explícitos, conflito/retry com tentativa original e bloqueio em resultado incerto; nenhuma política de autosave, colaboração ou offline foi localizada neste recorte."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/environmental-draft-contracts.test.ts",
      "tests/integration/environmental-draft-http.test.ts",
      "tests/integration/environmental-drafts.test.ts",
      "tests/migration/environmental-drafts.test.ts",
      "tests/e2e/environmental-drafts.spec.ts",
      "tests/e2e/frontend-environmental-drafts.spec.ts"
    ],
    "selection": "Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.",
    "execution": "NOT_RUN",
    "consultedEvidence": [
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/015-environmental-drafts/implementation-evidence.md",
        "location": "Remediação posterior — RC-DRAFT-001; Revisão focal posterior",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Relata hidratação, OCC, consumo/rollback e limite Chromium; consulta histórica sem repetição.",
        "execution": "NOT_RUN"
      },
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/024-frontend-environmental-drafts/implementation-evidence.md",
        "location": "Fechamento da candidata funcional e gate do HEAD publicado",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Relata candidataec4b06e4b27059b1077904e0b67fde498c28b053 com15 gates/190 E2E e revisão no mesmo SHA; não é execução deste fragmento.",
        "execution": "NOT_RUN"
      }
    ]
  },
  "humanAcceptance": "SC-006/T037 = NAO_VERIFICADO, conforme implementation-evidence da spec005; identificação humana de origem, ausência e somente leitura não decorre dos testes. Aceite humano posterior permanece separado.",
  "scientificValidation": "Contrato de captura ihfr-measurement-v1 registrado como DECISAO_CONFIRMADA na spec005/contrato, com origem técnica de 2026-09-17. Isso não aprova cálculo nem valida ciência IHFR. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO para consumidores IHFR.",
  "oldClaim": {
    "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "Itens > linha IMP-005 > Estado atual, lida com Entrega de rascunhos015 — 2026-10-10",
    "text": "`AGUARDANDO_DECISAO_CIENTIFICA`; models sem consumidor.",
    "recommendedAddendum": "RECOMENDACAO: O adendo015 já informa implementação, mas a tabela principal segue no corte antigo. Acrescentar mapa explícito IMP005→005/015/024 e manter os estados históricos e de homologação separados."
  },
  "gap": "Bloqueio de histórico SPA fora de Navigation API cancelável não é garantia universal; estudo humano, dispositivo físico e operação externa não foram executados.",
  "nextAction": "RECOMENDACAO: Integrar a rastreabilidade do incremento no adendo Code-First e manter limitações de browser e aceites.",
  "classification": [
    "EVIDENCIA_IMPLEMENTACAO",
    "FATO_DOCUMENTADO",
    "RECOMENDACAO"
  ],
  "evidenceLimit": "Inspeção estática nos dois snapshots. As referências duplicadas development/candidata identificam bytes equivalentes nestes caminhos; não transportam runtime, CI, homologação ou aceite humano entre SHAs."
}
```

### IMP-005-I05 — IMP-005

Fontes: [specs/024-frontend-environmental-drafts/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/024-frontend-environmental-drafts/spec.md>), [specs/015-environmental-drafts/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/015-environmental-drafts/spec.md>), [src/components/environmental-data/environmental-data-form.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-data-form.tsx>), [src/components/environmental-data/environmental-data-form.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-data-form.tsx>), [src/components/environmental-data/environmental-draft-actions.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-draft-actions.tsx>), [src/components/environmental-data/environmental-draft-actions.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-draft-actions.tsx>), [src/types/environmental-draft.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/types/environmental-draft.ts>), [src/types/environmental-draft.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/types/environmental-draft.ts>), [src/components/environmental-data/environmental-presentation.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-presentation.ts>), [src/components/environmental-data/environmental-presentation.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-presentation.ts>), [src/components/environmental-data/environmental-outcome.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/environmental-data/environmental-outcome.ts>), [src/components/environmental-data/environmental-outcome.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/components/environmental-data/environmental-outcome.ts>), [src/app/api/server/environmental-data/environmental-initiation.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/environmental-initiation.ts>), [src/app/api/server/environmental-data/environmental-initiation.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/environmental-initiation.ts>), [src/app/api/server/environmental-data/environmental-data.http.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/environmental-data.http.ts>), [src/app/api/server/environmental-data/environmental-data.http.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/environmental-data.http.ts>), [src/app/api/server/environmental-data/draft.http.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/environmental-data/draft.http.ts>), [src/app/api/server/environmental-data/draft.http.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/environmental-data/draft.http.ts>), [src/app/api/server/services/environmental-data.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/environmental-data.service.ts>), [src/app/api/server/services/environmental-data.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/src/app/api/server/services/environmental-data.service.ts>), [tests/unit/frontend-environmental-preservation.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/frontend-environmental-preservation.test.ts>), [tests/unit/frontend-environmental-preservation.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/frontend-environmental-preservation.test.ts>), [tests/unit/frontend-environmental-presentation.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/frontend-environmental-presentation.test.ts>), [tests/unit/frontend-environmental-presentation.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/frontend-environmental-presentation.test.ts>), [tests/unit/environmental-initiation.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/unit/environmental-initiation.test.ts>), [tests/unit/environmental-initiation.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/unit/environmental-initiation.test.ts>), [tests/integration/environmental-draft-http.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/environmental-draft-http.test.ts>), [tests/integration/environmental-draft-http.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/environmental-draft-http.test.ts>), [tests/integration/environmental-data-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/integration/environmental-data-route.test.ts>), [tests/integration/environmental-data-route.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/integration/environmental-data-route.test.ts>), [tests/e2e/frontend-environmental-drafts.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/tests/e2e/frontend-environmental-drafts.spec.ts>), [tests/e2e/frontend-environmental-drafts.spec.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/e2e/frontend-environmental-drafts.spec.ts>).

<!-- json-row: IMP-005-I05 -->
```json
{
  "id": "IMP-005-I05",
  "imp": "IMP-005",
  "scope": "Incremento024: prontidão/hidratação, representações fiéis e recuperação sem trocar titular ou liberar tentativa incerta.",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/024-frontend-environmental-drafts/spec.md",
      "symbol": "US1–US3; FR-002/FR-003/FR-005/FR-007/FR-008/FR-010/FR-011"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/015-environmental-drafts/spec.md",
      "symbol": "representações e limites"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/environmental-data/environmental-data-form.tsx",
      "symbol": "hydrated / touched / savedForm / confirm"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/environmental-data/environmental-data-form.tsx",
      "symbol": "hydrated / touched / savedForm / confirm"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/environmental-data/environmental-draft-actions.tsx",
      "symbol": "useEnvironmentalDraft"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/environmental-data/environmental-draft-actions.tsx",
      "symbol": "useEnvironmentalDraft"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/types/environmental-draft.ts",
      "symbol": "formToDraftFields / draftFieldsToForm"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/types/environmental-draft.ts",
      "symbol": "formToDraftFields / draftFieldsToForm"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/environmental-data/environmental-presentation.ts",
      "symbol": "formatEnvironmentalNumber / focusEnvironmentalTarget"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/environmental-data/environmental-presentation.ts",
      "symbol": "formatEnvironmentalNumber / focusEnvironmentalTarget"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/environmental-data/environmental-outcome.ts",
      "symbol": "keepEnvironmentalUncertainty"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/components/environmental-data/environmental-outcome.ts",
      "symbol": "keepEnvironmentalUncertainty"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/environmental-data/environmental-initiation.ts",
      "symbol": "prova de principal"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/environmental-data/environmental-initiation.ts",
      "symbol": "prova de principal"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/environmental-data/environmental-data.http.ts",
      "symbol": "X-Environmental-Initiator-Proof"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/environmental-data/environmental-data.http.ts",
      "symbol": "X-Environmental-Initiator-Proof"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/environmental-data/draft.http.ts",
      "symbol": "assertInitialPrincipal"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/environmental-data/draft.http.ts",
      "symbol": "assertInitialPrincipal"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/environmental-data.service.ts",
      "symbol": "create"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "src/app/api/server/services/environmental-data.service.ts",
      "symbol": "create"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/frontend-environmental-preservation.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/frontend-environmental-preservation.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/frontend-environmental-presentation.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/frontend-environmental-presentation.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/unit/environmental-initiation.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/unit/environmental-initiation.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/environmental-draft-http.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/environmental-draft-http.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/integration/environmental-data-route.test.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/integration/environmental-data-route.test.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "tests/e2e/frontend-environmental-drafts.spec.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "tests/e2e/frontend-environmental-drafts.spec.ts"
    }
  ],
  "chain": {
    "route": "Mesmos GET/PUT/DELETE de draft e POST ambiental; prova de iniciador e snapshot acompanham novas tentativas do browser.",
    "authorization": "Servidor compara prova presente com principal corrente; APIs seguem compatibilidade de clientes sem esse header. Prova não substitui revalidação de vínculo/papel/estado.",
    "service": "Parser definitivo só na confirmação; células de draft diferenciam ausente/editing/value. Reenvio preserva revisão/chave/corpo e contexto; incerteza anterior persiste após400/401/403/404/409/422/429/5xx.",
    "persistence": "Mesmo EnvironmentalDraft e EnvironmentalMeasurementSet; apresentação não altera schema, contrato de medição, payload confirmado ou cálculo.",
    "ui": "Controles dependem de hidratação; baseline/touched preservam false/zero/vazio/texto parcial; formatEnvironmentalNumber preserva magnitude não nula e focusEnvironmentalTarget abre grupos antes de focar. Sem alimentação de IHFR por draft."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/frontend-environmental-preservation.test.ts",
      "tests/unit/frontend-environmental-presentation.test.ts",
      "tests/unit/environmental-initiation.test.ts",
      "tests/integration/environmental-draft-http.test.ts",
      "tests/integration/environmental-data-route.test.ts",
      "tests/e2e/frontend-environmental-drafts.spec.ts"
    ],
    "selection": "Seleção documental por aderência direta à subcapacidade; arquivos inspecionados como dados. Não é seleção executada nem resultado de teste.",
    "execution": "NOT_RUN",
    "consultedEvidence": [
      {
        "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
        "path": "specs/024-frontend-environmental-drafts/implementation-evidence.md",
        "location": "Fechamento da candidata funcional e gate do HEAD publicado",
        "classification": "FATO_DOCUMENTADO",
        "summary": "Histórico distingue resultados oficiais, mocks/Pg, leitura/capturas e causas históricas inconclusivas; não atribuir nova execução ou causa resolvida.",
        "execution": "NOT_RUN"
      }
    ]
  },
  "humanAcceptance": "SC-006/T037 = NAO_VERIFICADO, conforme implementation-evidence da spec005; identificação humana de origem, ausência e somente leitura não decorre dos testes. Aceite humano posterior permanece separado.",
  "scientificValidation": "Contrato de captura ihfr-measurement-v1 registrado como DECISAO_CONFIRMADA na spec005/contrato, com origem técnica de 2026-09-17. Isso não aprova cálculo nem valida ciência IHFR. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO para consumidores IHFR.",
  "oldClaim": {
    "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
    "path": "docs/code-first-prd/implementation/implementation-plan.md",
    "location": "Módulos identificados > Dados ambientais",
    "text": "Models de água, solo, vegetação e terreno existem sem consumidor; não representam contrato científico aprovado.",
    "recommendedAddendum": "RECOMENDACAO: Acrescentar apresentação/recuperação024 sobre contratos005/015; separar preservação de valores/identidade da validade científica e do aceite humano."
  },
  "gap": "Testes nomeiam cenários A→B→A e tiny numbers, mas permanecem NOT_RUN nesta missão. Pixels e asserts unitários não provam todos os dispositivos/leitores de tela.",
  "nextAction": "RECOMENDACAO: Adendar capacidades atuais com evidência por SHA e registrar validações ausentes sem ampliar ciência ou suporte.",
  "classification": [
    "EVIDENCIA_IMPLEMENTACAO",
    "FATO_DOCUMENTADO",
    "RECOMENDACAO"
  ],
  "evidenceLimit": "Inspeção estática nos dois snapshots. As referências duplicadas development/candidata identificam bytes equivalentes nestes caminhos; não transportam runtime, CI, homologação ou aceite humano entre SHAs."
}
```

### IMP-006-01 — IMP-006

Fontes: [specs/006-ihfr-diagnosis/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/spec.md>), [specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml>), [docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md>), [src/app/api/server/ihfr-diagnosis/manifest-loader.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/ihfr-diagnosis/manifest-loader.ts>), [src/app/api/server/ihfr-diagnosis/evaluator.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/ihfr-diagnosis/evaluator.ts>), [src/app/api/server/ihfr-diagnosis/ihfr-diagnosis.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/ihfr-diagnosis/ihfr-diagnosis.contracts.ts>), [src/app/api/server/ihfr-diagnosis/ihfr-diagnosis.constants.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/ihfr-diagnosis/ihfr-diagnosis.constants.ts>), [specs/006-ihfr-diagnosis/contracts/ihfr-math-experimental-v0.1.1.json](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/contracts/ihfr-math-experimental-v0.1.1.json>).

<!-- json-row: IMP-006-01 -->
```json
{
  "id": "IMP-006-01",
  "imp": "IMP-006",
  "scope": "Manifestos, parser fechado e avaliador determinístico",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/006-ihfr-diagnosis/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/ihfr-diagnosis/manifest-loader.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/ihfr-diagnosis/evaluator.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/ihfr-diagnosis/ihfr-diagnosis.contracts.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/ihfr-diagnosis/ihfr-diagnosis.constants.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/006-ihfr-diagnosis/contracts/ihfr-math-experimental-v0.1.1.json"
    }
  ],
  "chain": {
    "route": "POST /api/laboratories/{laboratoryId}/areas/{areaId}/collections/{collectionId}/ihfr-diagnosis/diagnoses invoca handler e serviço; avaliador não tem endpoint público independente.",
    "authorization": "requireAuth; authorizeWrite/authorizeLaboratoryAccess MANAGE_IHFR_DIAGNOSIS, OWNER/ADMIN contextual e laboratório ativo.",
    "service": "loadActiveIHFRManifest verifica hash e congela manifesto; parseIHFRDiagnosisRequest fecha campos; evaluator calcula determinística e explicitamente a versão v0.1.1.",
    "persistence": "Leitura EnvironmentalMeasurementSet ihfr-measurement-v1; novo suplemento fechado deduplicado e diagnóstico versionado no ciclo transacional (006-04).",
    "ui": "IHFRDiagnosisManagement informa uso da terra/origem/observedAt; ScientificNotice mostra quatro qualificadores."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/ihfr-diagnosis-manifest-loader.test.ts",
      "tests/unit/ihfr-diagnosis-evaluator.test.ts",
      "tests/unit/ihfr-diagnosis-input-policy.test.ts",
      "tests/contract/ihfr-diagnosis-api.test.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual.",
  "scientificValidation": "CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "tabela Itens, linha IMP-006",
    "text": "AGUARDANDO_DECISOES; model sem API, cálculo ou interface conectada.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO em c4adfb3 e 00477e9: manifestos históricos/ativo com hash verificável, parser fechado e avaliador TypeScript determinístico estão conectados ao serviço experimental; fórmula, scores e pesos não são cientificamente homologados. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO"
  },
  "gap": "Vetores de engenharia não substituem vetores científicos/testes de campo; G2-SCI permanece pendente.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### IMP-006-02 — IMP-006

Fontes: [specs/006-ihfr-diagnosis/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/spec.md>), [specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml>), [docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md>), [src/app/api/server/services/ihfr-diagnosis.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/ihfr-diagnosis.service.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/eligibility/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/eligibility/route.ts>), [src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-eligibility.handler.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-eligibility.handler.ts>), [src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx>).

<!-- json-row: IMP-006-02 -->
```json
{
  "id": "IMP-006-02",
  "imp": "IMP-006",
  "scope": "Elegibilidade, ausência conhecida e incompatibilidade versionada",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/006-ihfr-diagnosis/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/ihfr-diagnosis.service.ts",
      "symbol": "IHFRDiagnosisService.eligibility"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/eligibility/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-eligibility.handler.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx"
    }
  ],
  "chain": {
    "route": "GET .../ihfr-diagnosis/eligibility: outcomes controlados (inclusive INCOMPATIBLE_VERSION) retornam 200; query inválida retorna 400. O terminal idempotente422 pertence ao POST .../diagnoses.",
    "authorization": "requireAuth; READ_IHFR_DIAGNOSIS; vínculo atual e cadeia laboratório→área→coleta.",
    "service": "eligibility distingue coleta não confirmada, ausência do measurement set/slope/landUseType, incompatibilidade e currentDiagnosisId; desconhecidos são inválidos.",
    "persistence": "Consulta CollectionData e EnvironmentalMeasurementSet e ponteiro vigente; nenhuma escrita na elegibilidade.",
    "ui": "Gerência solicita elegibilidade e distingue insuficiência; GET não gera diagnóstico."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/integration/ihfr-diagnosis-eligibility-route.test.ts",
      "tests/unit/ihfr-diagnosis-input-policy.test.ts",
      "tests/integration/ihfr-diagnosis-persisted-insufficiency.test.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual.",
  "scientificValidation": "CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "tabela Itens, linha IMP-006",
    "text": "AGUARDANDO_DECISOES; model sem API, cálculo ou interface conectada.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: elegibilidade contextual e insuficiência estão implementadas; ausência não vira zero nem score fabricado. GET /eligibility retorna HTTP 200 com outcome INCOMPATIBLE_VERSION para incompatibilidade controlada e HTTP 400 para query inválida; POST /diagnoses distingue falha estrutural/sintática 400 de seleção bem formada incompatível com terminal idempotente 422 conforme PD-018. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO"
  },
  "gap": "Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### IMP-006-03 — IMP-006

Fontes: [specs/006-ihfr-diagnosis/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/spec.md>), [specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml>), [docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md>), [src/app/api/server/services/ihfr-diagnosis.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/ihfr-diagnosis.service.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/current/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/current/route.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/diagnoses/[diagnosisId]/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/diagnoses/[diagnosisId]/route.ts>), [src/app/api/server/areas/area.authorization.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts>), [src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx>), [src/components/ihfr-diagnosis/experimental-diagnosis-summary.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/ihfr-diagnosis/experimental-diagnosis-summary.tsx>), [src/components/ihfr-diagnosis/scientific-notice.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/ihfr-diagnosis/scientific-notice.tsx>).

<!-- json-row: IMP-006-03 -->
```json
{
  "id": "IMP-006-03",
  "imp": "IMP-006",
  "scope": "Consulta CURRENT e detalhe imutável com DTO mínimo",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/006-ihfr-diagnosis/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/ihfr-diagnosis.service.ts",
      "symbol": "IHFRDiagnosisService.readCurrent/readDetail"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/current/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/diagnoses/[diagnosisId]/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/areas/area.authorization.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/ihfr-diagnosis/experimental-diagnosis-summary.tsx"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/ihfr-diagnosis/scientific-notice.tsx"
    }
  ],
  "chain": {
    "route": "GET .../current e GET .../diagnoses/{diagnosisId}; seis operações HTTP no contrato, incluindo as demais linhas006.",
    "authorization": "requireAuth; READ_IHFR_DIAGNOSIS, OWNER/ADMIN/MEMBER vinculados; IDs/contexto resolvidos; leitura permitida em laboratório inativo.",
    "service": "readCurrent/readDetail e project derivam área, ciclo, score, classe, qualidade, versões/hash e proveniência permitida.",
    "persistence": "ExperimentalIHFRDiagnosis, CurrentExperimentalIHFRDiagnosis, IHFRDiagnosisLifecycleEvent; legado não é promovido.",
    "ui": "Página de detalhe da coleta chama readCurrent; ExperimentalDiagnosisSummary/NoCurrentDiagnosis/ScientificNotice."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/integration/ihfr-diagnosis-current-route.test.ts",
      "tests/integration/ihfr-diagnosis-detail-route.test.ts",
      "tests/integration/ihfr-diagnosis-read-authorization.test.ts",
      "tests/unit/ihfr-diagnosis-public-dto.test.ts",
      "tests/e2e/ihfr-diagnosis-read.spec.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual.",
  "scientificValidation": "CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "tabela Itens, linha IMP-006",
    "text": "AGUARDANDO_DECISOES; model sem API, cálculo ou interface conectada.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: consulta experimental vigente e detalhe estão conectados ao serviço/persistência e à página da coleta, com DTO público e ausência explícita; não há interpretação científica definitiva nem promoção de legado. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO"
  },
  "gap": "Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### IMP-006-04 — IMP-006

Fontes: [specs/006-ihfr-diagnosis/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/spec.md>), [specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml>), [docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md>), [src/app/api/server/services/ihfr-diagnosis.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/ihfr-diagnosis.service.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/diagnoses/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/diagnoses/route.ts>), [src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-write.handler.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-write.handler.ts>), [prisma/migrations/20260920000100_ihfr_experimental_diagnosis/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260920000100_ihfr_experimental_diagnosis/migration.sql>), [prisma/migrations/20260926000100_ihfr_lifecycle_reference_integrity/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260926000100_ihfr_lifecycle_reference_integrity/migration.sql>), [src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx>).

<!-- json-row: IMP-006-04 -->
```json
{
  "id": "IMP-006-04",
  "imp": "IMP-006",
  "scope": "CREATE/REPLACE transacional, suplemento 1:N e vigência única",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/006-ihfr-diagnosis/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/ihfr-diagnosis.service.ts",
      "symbol": "IHFRDiagnosisService.createOrReplace/writeWithRetry"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/diagnoses/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-write.handler.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20260920000100_ihfr_experimental_diagnosis/migration.sql"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20260926000100_ihfr_lifecycle_reference_integrity/migration.sql"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx"
    }
  ],
  "chain": {
    "route": "POST .../diagnoses com mode CREATE ou REPLACE, versões/hash e Idempotency-Key próprios.",
    "authorization": "requireAuth/authorizeWrite antes do parsing; MANAGE_IHFR_DIAGNOSIS revalidada na transação, OWNER/ADMIN em contexto ativo.",
    "service": "createOrReplace→writeWithRetry; hash do request, expectedCurrentDiagnosisId, lock por coleta e retry de transação; avaliação e resultado terminal atômicos.",
    "persistence": "Suplemento UNIQUE(collectionDataId,payloadHash) reutilizável 1:N; diagnóstico/ledger/eventos imutáveis, ponteiro único; migrations 20260920 e integridade cruzada20260926.",
    "ui": "IHFRDiagnosisManagement confirma criação/substituição e gerencia estado incerto; resultado reabre na coleta."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/integration/ihfr-diagnosis-write-route.test.ts",
      "tests/integration/ihfr-diagnosis-service-lifecycle.test.ts",
      "tests/integration/ihfr-diagnosis-concurrency.test.ts",
      "tests/integration/ihfr-diagnosis-supplement-cardinality.test.ts",
      "tests/migration/ihfr-diagnosis-cross-record-integrity.test.ts",
      "tests/e2e/ihfr-diagnosis-manage.spec.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual.",
  "scientificValidation": "CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "tabela Itens, linha IMP-006",
    "text": "AGUARDANDO_DECISOES; model sem API, cálculo ou interface conectada.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: CREATE/REPLACE, suplemento deduplicado 1:N, imutabilidade, idempotência e vigência única estão implementados em cadeia; o novo diagnóstico substitui o anterior por evento, sem reescrevê-lo. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO"
  },
  "gap": "Concorrência técnica IHFR observada em código/testes; INV-002 é incidente de quota/emissão de tickets de CAPAS e não prova nem refuta concorrência/recuperação do diagnóstico. Seu controle específico não integra a evidência desta linha.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### IMP-006-05 — IMP-006

Fontes: [specs/006-ihfr-diagnosis/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/spec.md>), [specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml>), [docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md>), [src/app/api/server/services/ihfr-diagnosis.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/ihfr-diagnosis.service.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/diagnoses/[diagnosisId]/revocations/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/diagnoses/[diagnosisId]/revocations/route.ts>), [src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-revocation.handler.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-revocation.handler.ts>), [prisma/migrations/20260920000100_ihfr_experimental_diagnosis/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260920000100_ihfr_experimental_diagnosis/migration.sql>), [src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx>).

<!-- json-row: IMP-006-05 -->
```json
{
  "id": "IMP-006-05",
  "imp": "IMP-006",
  "scope": "Revogação justificada sem apagar diagnóstico",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/006-ihfr-diagnosis/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/ihfr-diagnosis.service.ts",
      "symbol": "IHFRDiagnosisService.revoke"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/diagnoses/[diagnosisId]/revocations/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-revocation.handler.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20260920000100_ihfr_experimental_diagnosis/migration.sql"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx"
    }
  ],
  "chain": {
    "route": "POST .../diagnoses/{diagnosisId}/revocations.",
    "authorization": "requireAuth/authorizeWrite; OWNER/ADMIN contextual ativo; diagnóstico e vigente esperado devem pertencer à coleta.",
    "service": "revoke valida motivo fechado/limite, expectedCurrentDiagnosisId, operação e replay; disputa produz conflito.",
    "persistence": "Remove só ponteiro CURRENT; grava evento REVOKED e ledger imutáveis, preserva diagnóstico/suplemento.",
    "ui": "Gerência confirma motivo e reflete ausência de vigente; histórico técnico mantém proveniência."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/integration/ihfr-diagnosis-revocation.test.ts",
      "tests/migration/ihfr-diagnosis-immutability.test.ts",
      "tests/e2e/ihfr-diagnosis-manage.spec.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual.",
  "scientificValidation": "CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "tabela Itens, linha IMP-006",
    "text": "AGUARDANDO_DECISOES; model sem API, cálculo ou interface conectada.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: revogação autorizada, justificada e idempotente remove vigência e preserva evidências imutáveis; não edita nem exclui o diagnóstico. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO"
  },
  "gap": "Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### IMP-006-06 — IMP-006

Fontes: [specs/006-ihfr-diagnosis/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/spec.md>), [specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml>), [docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md>), [src/app/api/server/services/ihfr-diagnosis.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/ihfr-diagnosis.service.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/operations/[idempotencyKey]/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/operations/[idempotencyKey]/route.ts>), [src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-operation.handler.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-operation.handler.ts>), [docs/releases/2026-10-23-hf-inv-local01/ihfr/results.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/docs/releases/2026-10-23-hf-inv-local01/ihfr/results.md>).

<!-- json-row: IMP-006-06 -->
```json
{
  "id": "IMP-006-06",
  "imp": "IMP-006",
  "scope": "Recuperação por chave, projeção terminal e fronteira da investigação29",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/006-ihfr-diagnosis/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/006-ihfr-diagnosis/contracts/ihfr-diagnosis-api.openapi.yaml"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/ihfr-diagnosis.service.ts",
      "symbol": "IHFRDiagnosisService.operation"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/ihfr-diagnosis/operations/[idempotencyKey]/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/ihfr-diagnosis/ihfr-diagnosis-operation.handler.ts"
    },
    {
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148",
      "path": "docs/releases/2026-10-23-hf-inv-local01/ihfr/results.md",
      "symbol": "Contexto investigativo INV-001; INV-002 é CAPAS, sem prova de recuperação IHFR"
    }
  ],
  "chain": {
    "route": "GET .../operations/{idempotencyKey}.",
    "authorization": "requireAuth; READ_IHFR_DIAGNOSIS e chave escopada ao ator/cadeia; não expõe ledger de terceiros.",
    "service": "operation consulta resultado terminal, diferencia replay/ausência e não repete cálculo.",
    "persistence": "IHFRDiagnosisOperation UNIQUE(actorUserId,idempotencyKey), hash e response persistidos; sem nova escrita na recuperação.",
    "ui": "IHFRDiagnosisManagement mantém chave estável e recupera resultado incerto antes de alegar sucesso."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/integration/ihfr-diagnosis-idempotency.test.ts",
      "tests/unit/ihfr-diagnosis-write-response.test.ts",
      "tests/e2e/ihfr-diagnosis-manage.spec.ts"
    ],
    "selection": "Integração via tests/integration/*.test.ts; unit via tests/unit/*.test.ts; IHFR E2E só runner/config dedicados. O controle investigativo de quota de CAPAS, embora sob investigations/ihfr, está vinculado à CRI-016-01 e não integra a prova desta recuperação.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual.",
  "scientificValidation": "CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "tabela Itens, linha IMP-006",
    "text": "AGUARDANDO_DECISOES; model sem API, cálculo ou interface conectada.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: recuperação terminal por chave própria está implementada. A #29 acrescenta evidência investigativa, sem patch de produto: INV-001 continua causalmente limitado; INV-002 e o teste two-request-quota referem emissão de tickets de CAPAS, não recuperação IHFR. CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO"
  },
  "gap": "Recuperação IHFR é sustentada pelos testes dedicados de idempotência/gerência. O diretório investigations/ihfr contém também controle de quota de capas; nome do diretório não cria equivalência funcional nem evidência de recuperação IHFR.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### IMP-007-01 — IMP-007

Fontes: [specs/007-dashboard-history/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/007-dashboard-history/spec.md>), [specs/007-dashboard-history/contracts/dashboard-api.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/007-dashboard-history/contracts/dashboard-api.openapi.yaml>), [specs/020-frontend-laboratory-dashboard/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/020-frontend-laboratory-dashboard/spec.md>), [src/app/api/laboratories/[laboratoryId]/dashboard/summary/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/dashboard/summary/route.handlers.ts>), [src/app/api/server/services/dashboard.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/dashboard.service.ts>), [src/app/api/server/areas/area.authorization.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts>), [src/app/(private)/dashboard/laboratories/[laboratoryId]/page.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/dashboard/laboratories/[laboratoryId]/page.tsx>), [src/components/dashboard/dashboard-summary.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/dashboard/dashboard-summary.tsx>).

<!-- json-row: IMP-007-01 -->
```json
{
  "id": "IMP-007-01",
  "imp": "IMP-007",
  "scope": "Resumo persistido contextual",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/007-dashboard-history/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/007-dashboard-history/contracts/dashboard-api.openapi.yaml"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/020-frontend-laboratory-dashboard/spec.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/dashboard/summary/route.handlers.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/dashboard.service.ts",
      "symbol": "DashboardService.summary"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/areas/area.authorization.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/(private)/dashboard/laboratories/[laboratoryId]/page.tsx"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/dashboard/dashboard-summary.tsx"
    }
  ],
  "chain": {
    "route": "GET /api/laboratories/{laboratoryId}/dashboard/summary.",
    "authorization": "requireAuth→authorizeLaboratoryAccess READ_AREAS; conta ACTIVE e vínculo atual; laboratório inativo legível.",
    "service": "DashboardService.summary calcula totais reais de áreas e coletas com campos de confirmação completos.",
    "persistence": "CollectionArea.count e CollectionData.count na transação; sem tabela de resumo ou dados ambientais/IHFR.",
    "ui": "DashboardSummary é montado na página contextual e distingue carregamento/vazio/erro/retry."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/dashboard-service.test.ts",
      "tests/integration/dashboard-routes.test.ts",
      "tests/e2e/dashboard-history.spec.ts",
      "tests/e2e/frontend-dashboard.spec.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO: SC-008 na parcela de tecnologia assistiva e SC-009 (estudo moderado com participantes representativos, meta de90%) permanecem pendentes segundo specs/007-dashboard-history/spec.md; teclado/foco/ARIA automáticos não os substituem.",
  "scientificValidation": "NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "tabela Itens, linha IMP-007",
    "text": "PARCIAL_MOCKADO; composição visual e dados fixos sem fonte persistida.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: o dashboard contextual consulta totais persistidos de áreas e coletas confirmadas, com autorização e estados de interface; não agrega resultados IHFR, dados ambientais, drafts ou capas."
  },
  "gap": "Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação. SC-008 (tecnologia assistiva) e SC-009 (estudo moderado,90%) continuam NAO_VERIFICADO; nenhuma sessão humana foi executada nesta missão.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### IMP-007-02 — IMP-007

Fontes: [specs/007-dashboard-history/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/007-dashboard-history/spec.md>), [specs/007-dashboard-history/contracts/dashboard-api.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/007-dashboard-history/contracts/dashboard-api.openapi.yaml>), [specs/020-frontend-laboratory-dashboard/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/020-frontend-laboratory-dashboard/spec.md>), [src/app/api/laboratories/[laboratoryId]/dashboard/history/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/dashboard/history/route.handlers.ts>), [src/app/api/server/services/dashboard.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/dashboard.service.ts>), [src/app/api/server/dashboard/dashboard.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/dashboard/dashboard.contracts.ts>), [src/components/dashboard/dashboard-history.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/dashboard/dashboard-history.tsx>).

<!-- json-row: IMP-007-02 -->
```json
{
  "id": "IMP-007-02",
  "imp": "IMP-007",
  "scope": "Histórico derivado paginado e navegação à origem",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/007-dashboard-history/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/007-dashboard-history/contracts/dashboard-api.openapi.yaml"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/020-frontend-laboratory-dashboard/spec.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/dashboard/history/route.handlers.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/dashboard.service.ts",
      "symbol": "DashboardService.history"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/dashboard/dashboard.contracts.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/dashboard/dashboard-history.tsx"
    }
  ],
  "chain": {
    "route": "GET /api/laboratories/{laboratoryId}/dashboard/history?cursor=...",
    "authorization": "requireAuth; READ_AREAS antes de validar cursor/consultar fontes; escopo do laboratório atual.",
    "service": "history combina AREA_CREATED e COLLECTION_CONFIRMED, ordenação determinística e página20/cursor; consulta21 de cada fonte.",
    "persistence": "Deriva de CollectionArea.createdAt e CollectionData.confirmedAt; nenhum event store/auditoria nova.",
    "ui": "DashboardHistory pagina, limpa estado por contexto e abre destinos de área/coleta."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/dashboard-contracts.test.ts",
      "tests/unit/dashboard-service.test.ts",
      "tests/integration/dashboard-routes.test.ts",
      "tests/e2e/dashboard-history.spec.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO: SC-008 na parcela de tecnologia assistiva e SC-009 (estudo moderado com participantes representativos, meta de90%) permanecem pendentes segundo specs/007-dashboard-history/spec.md; teclado/foco/ARIA automáticos não os substituem.",
  "scientificValidation": "NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "tabela Itens, linha IMP-007",
    "text": "PARCIAL_MOCKADO; composição visual e dados fixos sem fonte persistida.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: histórico básico é projeção persistida paginada de criação de área e confirmação de coleta, com links para origem; não equivale a auditoria universal nem histórico científico."
  },
  "gap": "Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação. SC-008 (tecnologia assistiva) e SC-009 (estudo moderado,90%) continuam NAO_VERIFICADO; nenhuma sessão humana foi executada nesta missão.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### IMP-008-01 — IMP-008

Fontes: [specs/008-territorial-map/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/008-territorial-map/spec.md>), [specs/008-territorial-map/contracts/territorial-map-api.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/008-territorial-map/contracts/territorial-map-api.openapi.yaml>), [specs/026-frontend-territorial-map/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/026-frontend-territorial-map/spec.md>), [src/app/api/laboratories/[laboratoryId]/territorial-map/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/territorial-map/route.handlers.ts>), [src/app/api/server/services/territorial-map.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/territorial-map.service.ts>), [src/app/api/server/territorial-map/territorial-map.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/territorial-map/territorial-map.contracts.ts>), [src/app/api/server/areas/area.authorization.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/areas/area.authorization.ts>), [src/app/(private)/dashboard/laboratories/[laboratoryId]/map/page.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/(private)/dashboard/laboratories/[laboratoryId]/map/page.tsx>), [specs/008-territorial-map/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/008-territorial-map/implementation-evidence.md>).

<!-- json-row: IMP-008-01 -->
```json
{
  "id": "IMP-008-01",
  "imp": "IMP-008",
  "scope": "Projeção territorial privada de áreas-ponto/coletas",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/008-territorial-map/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/008-territorial-map/contracts/territorial-map-api.openapi.yaml"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/026-frontend-territorial-map/spec.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/territorial-map/route.handlers.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/territorial-map.service.ts",
      "symbol": "TerritorialMapService.read"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/territorial-map/territorial-map.contracts.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/areas/area.authorization.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/(private)/dashboard/laboratories/[laboratoryId]/map/page.tsx"
    },
    {
      "path": "specs/008-territorial-map/implementation-evidence.md",
      "symbol": "limites p95/EXPLAIN, tecnologia assistiva e estudo moderado",
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9"
    }
  ],
  "chain": {
    "route": "GET /api/laboratories/{laboratoryId}/territorial-map.",
    "authorization": "requireAuth; READ_AREAS, conta ACTIVE/vínculo atual; leitura em laboratório inativo.",
    "service": "read seleciona somente id/nome/coordenadas de área e coletas confirmadas em uma query contextual.",
    "persistence": "CollectionArea latitude/longitude e CollectionData confirmada; nenhuma migration própria008; não consulta EnvironmentalMeasurementSet/ExperimentalIHFRDiagnosis.",
    "ui": "Página map monta TerritorialMapView; lista/contagem/destinos de coletas vinculados à área."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/territorial-map-service.test.ts",
      "tests/unit/territorial-map-contracts.test.ts",
      "tests/integration/territorial-map-route.test.ts",
      "tests/e2e/territorial-map.spec.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO: tecnologia assistiva real e estudo moderado com participantes permanecem pendentes conforme specs/008-territorial-map/implementation-evidence.md; teclado/overflow automatizados não os substituem.",
  "scientificValidation": "NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "tabela Itens, linha IMP-008",
    "text": "ESPECIFICADO_E_PLANEJADO_DOCUMENTALMENTE; T001–T055 aguardam nova análise independente e a implementação permanece adiada.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: o mapa mínimo privado já projeta áreas-ponto e coletas confirmadas do laboratório, com endpoint real e navegação à origem; sem localização própria da coleta, polígonos, camada ambiental ou IHFR."
  },
  "gap": "Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação. p95 de 100 leituras, EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) e interação sem tiles permanecem NAO_VERIFICADO no registro da008; nenhuma medição própria nesta missão.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### IMP-008-02 — IMP-008

Fontes: [specs/008-territorial-map/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/008-territorial-map/spec.md>), [specs/008-territorial-map/contracts/territorial-map-api.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/008-territorial-map/contracts/territorial-map-api.openapi.yaml>), [specs/026-frontend-territorial-map/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/026-frontend-territorial-map/spec.md>), [src/components/territorial-map/territorial-map-view.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/territorial-map/territorial-map-view.tsx>), [src/components/territorial-map/territorial-map.client.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/territorial-map/territorial-map.client.tsx>), [src/components/territorial-map/territorial-map.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/territorial-map/territorial-map.tsx>), [src/components/territorial-map/territorial-map-state.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/territorial-map/territorial-map-state.ts>), [src/components/territorial-map/territorial-map.module.css](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/territorial-map/territorial-map.module.css>), [specs/008-territorial-map/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/008-territorial-map/implementation-evidence.md>).

<!-- json-row: IMP-008-02 -->
```json
{
  "id": "IMP-008-02",
  "imp": "IMP-008",
  "scope": "Leaflet, lista equivalente e recuperação visual",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/008-territorial-map/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/008-territorial-map/contracts/territorial-map-api.openapi.yaml"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/026-frontend-territorial-map/spec.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/territorial-map/territorial-map-view.tsx"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/territorial-map/territorial-map.client.tsx"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/territorial-map/territorial-map.tsx"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/territorial-map/territorial-map-state.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/territorial-map/territorial-map.module.css"
    },
    {
      "path": "specs/008-territorial-map/implementation-evidence.md",
      "symbol": "limites p95/EXPLAIN, tecnologia assistiva e estudo moderado",
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9"
    }
  ],
  "chain": {
    "route": "Mesma GET territorial-map; não há endpoint/cartografia paralelo criado pela UI.",
    "authorization": "Página getLaboratoryContext + API server-authorized; estados não concedem acesso por frontend.",
    "service": "TerritorialMapService.read e serializeTerritorialArea alimentam mapa/lista.",
    "persistence": "Projeção transitória de fontes existentes; tiles externos não são fonte de registros científicos.",
    "ui": "Leaflet/React-Leaflet, lista textual e markers com teclado; estado de tiles/erro de transporte, retry e foco conforme026."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/territorial-map-state.test.ts",
      "tests/e2e/territorial-map.spec.ts",
      "tests/e2e/frontend-territorial-map.spec.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO: tecnologia assistiva real e estudo moderado com participantes permanecem pendentes conforme specs/008-territorial-map/implementation-evidence.md; teclado/overflow automatizados não os substituem.",
  "scientificValidation": "NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "tabela Itens, linha IMP-008",
    "text": "ESPECIFICADO_E_PLANEJADO_DOCUMENTALMENTE; implementação permanece adiada.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: Leaflet/React-Leaflet, lista textual, seleção por teclado e recuperação de erro já existem no mapa mínimo; a inspeção atual não homologa dispositivos, leitor de tela nem aceite visual humano."
  },
  "gap": "INV-003/NAV-SETTLE e OBS não têm causa histórica encerrada pelos protocolos atuais; capturas não substituem homologação. p95 de 100 leituras, EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) e interação sem tiles permanecem NAO_VERIFICADO no registro da008; nenhuma medição própria nesta missão.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### IMP-008-03 — IMP-008

Fontes: [TECH_DECISIONS.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/TECH_DECISIONS.md>), [specs/008-territorial-map/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/008-territorial-map/spec.md>), [docs/code-first-prd/analysis/gaps-and-open-questions.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/analysis/gaps-and-open-questions.md>), [package.json](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/package.json>), [src/app/api/server/services/territorial-map.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/territorial-map.service.ts>).

<!-- json-row: IMP-008-03 -->
```json
{
  "id": "IMP-008-03",
  "imp": "IMP-008",
  "scope": "Fronteira: Plotly e análises territoriais futuras",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "TECH_DECISIONS.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/008-territorial-map/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "docs/code-first-prd/analysis/gaps-and-open-questions.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "package.json"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/territorial-map.service.ts"
    }
  ],
  "chain": {
    "route": "NAO_IMPLEMENTADO no recorte observado: nenhum endpoint Plotly/analítico identificado.",
    "authorization": "Contrato futuro a definir; autorização do mapa não concede análise científica nova.",
    "service": "TerritorialMapService não calcula nem consulta IHFR ou medidas.",
    "persistence": "Nenhuma tabela/migration Plotly específica; entradas futuras a definir.",
    "ui": "Não há componente Plotly; Leaflet não comprova gráficos analíticos."
  },
  "presentInDevelopment": false,
  "presentInCandidate": false,
  "implementationState": "NAO_LOCALIZADO",
  "tests": {
    "paths": [],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_APLICAVEL: entrega futura.",
  "scientificValidation": "NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.",
  "oldClaim": {
    "path": "TECH_DECISIONS.md",
    "location": "TD-010, decisões confirmadas ainda não implementadas",
    "text": "Adotar Plotly ... em entrega posterior à IMP-009. ... NAO_IMPLEMENTADO.",
    "recommendedAddendum": "FATO_DOCUMENTADO: a direção Plotly e suas pendências permanecem atuais no recorte observado; mapa mínimo entregue não satisfaz gráficos analíticos futuros."
  },
  "gap": "Decisões de integração/dados/gráficos e ciência aplicável ainda abertas; não confundir mapa mínimo entregue com toda a visão territorial.",
  "nextAction": "RECOMENDACAO: preservar como entrega futura dependente de contratos e decisões próprias; não atribuir novo IMP por inferência.",
  "classification": "FATO_DOCUMENTADO"
}
```

### IMP-009-01 — IMP-009

Fontes: [specs/009-user-administration/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/spec.md>), [specs/009-user-administration/contracts/admin-users.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/contracts/admin-users.openapi.yaml>), [specs/027-frontend-user-administration/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/027-frontend-user-administration/spec.md>), [src/app/api/admin/users/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/admin/users/route.handlers.ts>), [src/app/api/admin/users/[userId]/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/admin/users/[userId]/route.handlers.ts>), [prisma/migrations/20260920000100_remove_legacy_is_admin/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260920000100_remove_legacy_is_admin/migration.sql>), [src/app/api/server/services/user-administration.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/user-administration.service.ts>), [src/app/api/server/user-administration/global-authority.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/user-administration/global-authority.ts>), [src/app/api/server/middlewares/admin.middleware.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/middlewares/admin.middleware.ts>), [src/components/user-administration/user-administration-page.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/user-administration/user-administration-page.tsx>), [specs/009-user-administration/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/implementation-evidence.md>).

<!-- json-row: IMP-009-01 -->
```json
{
  "id": "IMP-009-01",
  "imp": "IMP-009",
  "scope": "Leitura global, filtros, detalhe e DTO mínimo",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/009-user-administration/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/009-user-administration/contracts/admin-users.openapi.yaml"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/027-frontend-user-administration/spec.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/admin/users/route.handlers.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/admin/users/[userId]/route.handlers.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20260920000100_remove_legacy_is_admin/migration.sql"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/user-administration.service.ts",
      "symbol": "UserAdministrationService.list/detail"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/user-administration/global-authority.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/middlewares/admin.middleware.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/user-administration/user-administration-page.tsx"
    },
    {
      "path": "specs/009-user-administration/implementation-evidence.md",
      "symbol": "limite de revisão humana assistiva",
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9"
    }
  ],
  "chain": {
    "route": "GET /api/admin/users e GET /api/admin/users/{userId}.",
    "authorization": "requireAdmin→requireAuth→requireGlobalAdmin(role ADMIN); serviço reconsulta ator ACTIVE/ADMIN na transação. ADMIN global difere de ADMIN contextual.",
    "service": "list/detail revalidam autoridade global, fecham query, filtram estado/papel/busca, paginam e projetam campos públicos administrativos sem senha/hash.",
    "persistence": "User selecionado por allowlist e filtros/cursor; User.isAdmin legado removido por migration20260920000100.",
    "ui": "/admin/users monta UserAdministrationPage; alias /dashboard/admin/users preservado; lista/detalhe/filtros/diálogos e erros de versão conforme027."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/user-administration-read-service.test.ts",
      "tests/integration/user-administration-routes.test.ts",
      "tests/e2e/user-administration-read.spec.ts",
      "tests/e2e/frontend-user-administration.spec.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO: revisão humana com leitor de tela/tecnologia assistiva permanece pendente conforme specs/009-user-administration/implementation-evidence.md; Playwright/DOM/build não substituem esse gate.",
  "scientificValidation": "NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "tabela Itens, linha IMP-009",
    "text": "FORA_DO_RECORTE_INICIAL; infraestrutura parcial e sem interface conectada.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: administração global tem lista/filtros/detalhe e UI conectada, restrita a ADMIN global ACTIVE; role governa autoridade, e isAdmin legado foi removido."
  },
  "gap": "Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### IMP-009-02 — IMP-009

Fontes: [specs/009-user-administration/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/spec.md>), [specs/009-user-administration/contracts/admin-users.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/contracts/admin-users.openapi.yaml>), [specs/027-frontend-user-administration/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/027-frontend-user-administration/spec.md>), [src/app/api/admin/users/[userId]/status/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/admin/users/[userId]/status/route.handlers.ts>), [prisma/migrations/20260919000100_user_administration/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260919000100_user_administration/migration.sql>), [src/app/api/server/services/user-administration.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/user-administration.service.ts>), [src/app/api/server/user-administration/global-authority.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/user-administration/global-authority.ts>), [src/app/api/server/middlewares/admin.middleware.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/middlewares/admin.middleware.ts>), [src/components/user-administration/user-administration-page.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/user-administration/user-administration-page.tsx>), [specs/009-user-administration/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/implementation-evidence.md>).

<!-- json-row: IMP-009-02 -->
```json
{
  "id": "IMP-009-02",
  "imp": "IMP-009",
  "scope": "Alteração de estado com justificativa/OCC",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/009-user-administration/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/009-user-administration/contracts/admin-users.openapi.yaml"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/027-frontend-user-administration/spec.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/admin/users/[userId]/status/route.handlers.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20260919000100_user_administration/migration.sql"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/user-administration.service.ts",
      "symbol": "UserAdministrationService.changeStatus"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/user-administration/global-authority.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/middlewares/admin.middleware.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/user-administration/user-administration-page.tsx"
    },
    {
      "path": "specs/009-user-administration/implementation-evidence.md",
      "symbol": "limite de revisão humana assistiva",
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9"
    }
  ],
  "chain": {
    "route": "PATCH /api/admin/users/{userId}/status.",
    "authorization": "requireAdmin→requireAuth→requireGlobalAdmin(role ADMIN); serviço reconsulta ator ACTIVE/ADMIN na transação. ADMIN global difere de ADMIN contextual.",
    "service": "changeStatus proíbe autoalteração, compara expectedRevision/expectedStatus, protege último ADMIN ACTIVE, incrementa revision e audita atomicamente.",
    "persistence": "User.revision e AdministrativeAuditEvent; migration20260919000100 define checks e imutabilidade de auditoria; escrita serializable.",
    "ui": "/admin/users monta UserAdministrationPage; alias /dashboard/admin/users preservado; lista/detalhe/filtros/diálogos e erros de versão conforme027."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/user-administration-status-service.test.ts",
      "tests/integration/user-administration-concurrency.test.ts",
      "tests/integration/user-administration-last-admin.test.ts",
      "tests/e2e/user-administration-status.spec.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO: revisão humana com leitor de tela/tecnologia assistiva permanece pendente conforme specs/009-user-administration/implementation-evidence.md; Playwright/DOM/build não substituem esse gate.",
  "scientificValidation": "NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "tabela Itens, linha IMP-009",
    "text": "FORA_DO_RECORTE_INICIAL; infraestrutura parcial e sem interface conectada.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: estado de outra conta pode ser alterado por ADMIN global com justificativa e versão esperada; autoalteração e remoção do último ADMIN ACTIVE são protegidas. Não é aprovação manual obrigatória de cadastro."
  },
  "gap": "Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação. Retorno de conta previamente ativada a PENDING permanece PENDENCIA_DE_DECISAO (spec009 e implementation-evidence); o código conserva o contrato atual que admite essa transição, sem aprovar a recomendação de restringi-la à pré-ativação.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### IMP-009-03 — IMP-009

Fontes: [specs/009-user-administration/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/spec.md>), [specs/009-user-administration/contracts/admin-users.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/contracts/admin-users.openapi.yaml>), [specs/027-frontend-user-administration/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/027-frontend-user-administration/spec.md>), [src/app/api/admin/users/[userId]/role/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/admin/users/[userId]/role/route.handlers.ts>), [prisma/migrations/20260919000100_user_administration/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260919000100_user_administration/migration.sql>), [src/app/api/server/services/user-administration.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/user-administration.service.ts>), [src/app/api/server/user-administration/global-authority.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/user-administration/global-authority.ts>), [src/app/api/server/middlewares/admin.middleware.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/middlewares/admin.middleware.ts>), [src/components/user-administration/user-administration-page.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/user-administration/user-administration-page.tsx>), [specs/009-user-administration/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/implementation-evidence.md>).

<!-- json-row: IMP-009-03 -->
```json
{
  "id": "IMP-009-03",
  "imp": "IMP-009",
  "scope": "Alteração de papel global e proteção do último administrador",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/009-user-administration/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/009-user-administration/contracts/admin-users.openapi.yaml"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/027-frontend-user-administration/spec.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/admin/users/[userId]/role/route.handlers.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20260919000100_user_administration/migration.sql"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/user-administration.service.ts",
      "symbol": "UserAdministrationService.changeRole"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/user-administration/global-authority.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/middlewares/admin.middleware.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/user-administration/user-administration-page.tsx"
    },
    {
      "path": "specs/009-user-administration/implementation-evidence.md",
      "symbol": "limite de revisão humana assistiva",
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9"
    }
  ],
  "chain": {
    "route": "PATCH /api/admin/users/{userId}/role.",
    "authorization": "requireAdmin→requireAuth→requireGlobalAdmin(role ADMIN); serviço reconsulta ator ACTIVE/ADMIN na transação. ADMIN global difere de ADMIN contextual.",
    "service": "changeRole verifica expectedRevision/expectedRole, proíbe autoalteração, protege último administrador ativo e persiste papel+evento na mesma transação.",
    "persistence": "User.revision e AdministrativeAuditEvent; migration20260919000100 define checks e imutabilidade de auditoria; escrita serializable.",
    "ui": "/admin/users monta UserAdministrationPage; alias /dashboard/admin/users preservado; lista/detalhe/filtros/diálogos e erros de versão conforme027."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/user-administration-role-service.test.ts",
      "tests/integration/user-administration-last-admin.test.ts",
      "tests/integration/user-administration-concurrency.test.ts",
      "tests/e2e/user-administration-role.spec.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO: revisão humana com leitor de tela/tecnologia assistiva permanece pendente conforme specs/009-user-administration/implementation-evidence.md; Playwright/DOM/build não substituem esse gate.",
  "scientificValidation": "NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "tabela Itens, linha IMP-009",
    "text": "FORA_DO_RECORTE_INICIAL; infraestrutura parcial e sem interface conectada.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: papel global de outra conta é mutável com OCC/justificativa/auditoria; isso não muda papéis OWNER/ADMIN/MEMBER do laboratório nem autoriza implicitamente o ADMIN global ao território."
  },
  "gap": "Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### IMP-009-04 — IMP-009

Fontes: [specs/009-user-administration/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/spec.md>), [specs/009-user-administration/contracts/admin-users.openapi.yaml](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/contracts/admin-users.openapi.yaml>), [specs/027-frontend-user-administration/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/027-frontend-user-administration/spec.md>), [src/app/api/admin/users/[userId]/audit/route.handlers.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/admin/users/[userId]/audit/route.handlers.ts>), [prisma/migrations/20260919000100_user_administration/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20260919000100_user_administration/migration.sql>), [src/app/api/server/services/user-administration.service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/services/user-administration.service.ts>), [src/app/api/server/user-administration/global-authority.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/user-administration/global-authority.ts>), [src/app/api/server/middlewares/admin.middleware.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/middlewares/admin.middleware.ts>), [src/components/user-administration/user-administration-page.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/user-administration/user-administration-page.tsx>), [specs/009-user-administration/implementation-evidence.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/009-user-administration/implementation-evidence.md>).

<!-- json-row: IMP-009-04 -->
```json
{
  "id": "IMP-009-04",
  "imp": "IMP-009",
  "scope": "Auditoria funcional administrativa, retenção imutável",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/009-user-administration/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/009-user-administration/contracts/admin-users.openapi.yaml"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/027-frontend-user-administration/spec.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/admin/users/[userId]/audit/route.handlers.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20260919000100_user_administration/migration.sql"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/services/user-administration.service.ts",
      "symbol": "UserAdministrationService.audit"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/user-administration/global-authority.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/middlewares/admin.middleware.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/user-administration/user-administration-page.tsx"
    },
    {
      "path": "specs/009-user-administration/implementation-evidence.md",
      "symbol": "limite de revisão humana assistiva",
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9"
    }
  ],
  "chain": {
    "route": "GET /api/admin/users/{userId}/audit.",
    "authorization": "requireAdmin→requireAuth→requireGlobalAdmin(role ADMIN); serviço reconsulta ator ACTIVE/ADMIN na transação. ADMIN global difere de ADMIN contextual.",
    "service": "audit valida alvo/filtro/cursor e pagina eventos permitidos; eventos before/after/motivo/revision têm trigger de imutabilidade.",
    "persistence": "User.revision e AdministrativeAuditEvent; migration20260919000100 define checks e imutabilidade de auditoria; escrita serializable.",
    "ui": "/admin/users monta UserAdministrationPage; alias /dashboard/admin/users preservado; lista/detalhe/filtros/diálogos e erros de versão conforme027."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/user-administration-audit-service.test.ts",
      "tests/migration/user-administration-migration.test.ts",
      "tests/e2e/user-administration-audit.spec.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO: revisão humana com leitor de tela/tecnologia assistiva permanece pendente conforme specs/009-user-administration/implementation-evidence.md; Playwright/DOM/build não substituem esse gate.",
  "scientificValidation": "NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "tabela Itens, linha IMP-009",
    "text": "FORA_DO_RECORTE_INICIAL; infraestrutura parcial e sem interface conectada.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: auditoria administrativa paginada e imutável registra mudanças de estado/papel; não equivale ao histórico básico do dashboard nem à auditoria científica IHFR."
  },
  "gap": "Divergência documental do baseline; inspeção estática não reproduziu runtime nem homologação.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### IMP-010-01 — IMP-010

Fontes: [specs/001-authenticated-access/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/001-authenticated-access/spec.md>), [specs/001-authenticated-access/quickstart.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/001-authenticated-access/quickstart.md>), [docs/code-first-prd/implementation/backlog.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/backlog.md>).

<!-- json-row: IMP-010-01 -->
```json
{
  "id": "IMP-010-01",
  "imp": "IMP-010",
  "scope": "Validação humana de UX de acesso: SC-006/SC-007",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/001-authenticated-access/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/001-authenticated-access/quickstart.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "docs/code-first-prd/implementation/backlog.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/001-authenticated-access/spec.md"
    }
  ],
  "chain": {
    "route": "Acesso autenticado é pré-condição; endpoints técnicos não medem tempo/compreensão de participantes.",
    "authorization": "Protocolo humano deve usar participantes/ambiente autorizados e minimizar dados.",
    "service": "NAO_APLICAVEL: estudo de usabilidade, não serviço de produto.",
    "persistence": "Amostra, tempos sem assistência e compreensão devem ser registrados por protocolo humano; não encontrados como aceite atual.",
    "ui": "Fluxos de login e falha são objeto de avaliação; automação de teclado/layout não mede90% de participantes."
  },
  "presentInDevelopment": false,
  "presentInCandidate": false,
  "implementationState": "NAO_APLICAVEL",
  "tests": {
    "paths": [],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO: nenhum estudo de participantes executado ou inferido nesta missão.",
  "scientificValidation": "NAO_APLICAVEL à UX do acesso.",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "tabela Itens, linha IMP-010",
    "text": "ADIADO_PARA_UX_PRODUTO; SC-006 e SC-007 estão NAO_VERIFICADO.",
    "recommendedAddendum": "FATO_DOCUMENTADO: IMP-010 continua follow-up humano não bloqueante da IMP-001: metas originais de90% (entrada em até2min e compreensão de falhas) estão NAO_VERIFICADO; ausência de aceite não é ausência de autenticação implementada."
  },
  "gap": "Participantes/protocolo/amostra/tempos/compreensão e autoridade de aceite continuam pendentes. Estado de implementação NAO_APLICAVEL porque IMP-010 é avaliação humana, não capacidade de software a implementar; realização do estudo continua não verificada.",
  "nextAction": "RECOMENDACAO: manter IMP-010 como pesquisa/aceite de UX e designar responsável/protocolo; nenhum teste automático substitui SC-006/007.",
  "classification": "FATO_DOCUMENTADO"
}
```

### FRONTEIRA-SPEC-010 — FRONTEIRA-SPEC-010

Fontes: [specs/010-active-public-signup/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/010-active-public-signup/spec.md>), [specs/012-account-verification-recovery/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/012-account-verification-recovery/spec.md>), [TECH_DECISIONS.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/TECH_DECISIONS.md>), [src/app/api/auth/sign-up/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/sign-up/route.ts>), [src/app/api/server/accounts/service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/accounts/service.ts>), [src/app/api/server/accounts/http.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/accounts/http.ts>), [prisma/schema.prisma](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/schema.prisma>).

<!-- json-row: FRONTEIRA-SPEC-010 -->
```json
{
  "id": "FRONTEIRA-SPEC-010",
  "imp": "FRONTEIRA-SPEC-010",
  "scope": "Spec010 cadastro ACTIVE é entrega distinta da IMP-010 de UX",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/010-active-public-signup/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/012-account-verification-recovery/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "TECH_DECISIONS.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/auth/sign-up/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/accounts/service.ts",
      "symbol": "AccountService.signup/login"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/accounts/http.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/schema.prisma"
    }
  ],
  "chain": {
    "route": "POST /api/auth/sign-up (e sign-in para retomada).",
    "authorization": "Cadastro público com política/CSRF/idempotência; estado ACTIVE não dispensa emailVerifiedAt quando verificationRequired.",
    "service": "Rota atual delega AccountService.signup; cria ACTIVE com verificationRequired:true e sessão email-verification até confirmação. AuthService da entrega010 é evidência histórica, não a cadeia atual isolada.",
    "persistence": "User, AccountEmailChallenge, AccountRequest e outbox; 012 refina sessão sem revogar origem histórica TD-017.",
    "ui": "Cadastro→/verify-email; login retoma verificação quando necessário."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/auth-service.test.ts",
      "tests/integration/account-verification-recovery.test.ts",
      "tests/e2e/account-verification-recovery.spec.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual.",
  "scientificValidation": "NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.",
  "oldClaim": {
    "path": "specs/010-active-public-signup/spec.md",
    "location": "US1 e FR-001/FR-002; refinamento posterior em012",
    "text": "Criar conta e entrar imediatamente ... conta nasce ACTIVE.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: o cadastro continua ACTIVE; a cadeia atual passa por AccountService e sessão restrita até verificação segundo012. Esta spec não é a IMP-010 de validação humana de UX."
  },
  "gap": "Risco de equivalência numérica entre IMP, spec e fase frontend; preservação de TD-017 e refinamento012 precisam aparecer juntos.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### CRI-MAIL-01 — CRI-MAIL

Fontes: [specs/mail-foundation/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/mail-foundation/spec.md>), [docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md>), [src/app/api/internal/mail/process/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/internal/mail/process/route.ts>), [src/app/api/server/mail/trigger.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/mail/trigger.ts>), [src/app/api/server/mail/outbox.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/mail/outbox.ts>), [src/app/api/server/mail/worker.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/mail/worker.ts>), [src/app/api/server/mail/transport.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/mail/transport.ts>), [prisma/migrations/20261004000100_mail_foundation/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20261004000100_mail_foundation/migration.sql>).

<!-- json-row: CRI-MAIL-01 -->
```json
{
  "id": "CRI-MAIL-01",
  "imp": "CRI-MAIL",
  "scope": "Fundação mail: outbox, worker e transporte",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/mail-foundation/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/internal/mail/process/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/mail/trigger.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/mail/outbox.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/mail/worker.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/mail/transport.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20261004000100_mail_foundation/migration.sql"
    }
  ],
  "chain": {
    "route": "GET/POST /api/internal/mail/process.",
    "authorization": "Guard de configuração e Bearer do worker; não é endpoint público de envio nem depende de sessão de participante.",
    "service": "enqueueMail/outbox/worker, leases e fencing; transporte/SMTP validado de forma lazy; recibo SENT/accepted não prova recebimento.",
    "persistence": "MailOutbox e tentativas/locks de envio; payload protegido conforme contrato.",
    "ui": "Sem UI própria; e-mails de verificação/reset/aviso são efeitos das jornadas012/013."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/integration/mail-outbox.test.ts",
      "tests/mail/mail-smtp.test.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual.",
  "scientificValidation": "NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "Estado corrente do recorte CRI / Incrementos CRI",
    "text": "Mail-foundation/012/013 já têm código integrado ... Gate B de contas e aceite humano de exclusão continuam abertos.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: fundação mail está integrada com outbox/worker/leases/fencing; envio real, recebimento da caixa e scheduler do FullStack exigem provas próprias. Run histórico de outra homologação não comprova o destino atual."
  },
  "gap": "Gate B/SMTP/recebimento/scheduler/operação hospedada pendentes; sem contato a provedor nesta missão.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### CRI-012-01 — CRI-012

Fontes: [specs/012-account-verification-recovery/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/012-account-verification-recovery/spec.md>), [specs/018-frontend-account/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/018-frontend-account/spec.md>), [docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md>), [src/app/api/auth/email-verification/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/email-verification/route.ts>), [src/app/api/auth/email-verification/confirm/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/email-verification/confirm/route.ts>), [src/app/api/auth/email-verification/resend/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/email-verification/resend/route.ts>), [src/app/api/server/accounts/service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/accounts/service.ts>), [src/app/api/server/auth/session.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/auth/session.ts>), [src/components/account/email-verification-form.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/account/email-verification-form.tsx>), [prisma/migrations/20261004000200_account_verification_recovery/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20261004000200_account_verification_recovery/migration.sql>).

<!-- json-row: CRI-012-01 -->
```json
{
  "id": "CRI-012-01",
  "imp": "CRI-012",
  "scope": "Verificação e reenvio de e-mail",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/012-account-verification-recovery/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/018-frontend-account/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/auth/email-verification/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/auth/email-verification/confirm/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/auth/email-verification/resend/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/accounts/service.ts",
      "symbol": "signup/verificationState/resend/confirmVerification"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/auth/session.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/account/email-verification-form.tsx"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20261004000200_account_verification_recovery/migration.sql"
    }
  ],
  "chain": {
    "route": "POST sign-up; GET email-verification; POST confirm/resend.",
    "authorization": "Cookie com propósito email-verification, challenge ligado a usuário/versão, CSRF, política e rate limit; privado só após confirmação.",
    "service": "Conta ACTIVE + desafio/outbox atômicos, código protegido/uso único/expiração/reenvio que invalida anterior e retomada legítima.",
    "persistence": "User.emailVerifiedAt/verificationRequired/credentialVersion, AccountEmailChallenge, AccountRequest, rate limits e outbox.",
    "ui": "EmailVerificationForm permite confirmar/reenvio/logout e erros; frontend018 não substitui contrato012."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/contract/account-api.test.ts",
      "tests/integration/account-verification-recovery.test.ts",
      "tests/e2e/account-verification-recovery.spec.ts",
      "tests/e2e/frontend-account.spec.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual.",
  "scientificValidation": "NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "Estado corrente do recorte CRI / Incrementos CRI",
    "text": "Mail-foundation/012/013 já têm código integrado ... Gate B de contas ... continuam abertos.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: verificação/reenvio/sessão restrita/retomada estão implementados; Gate B de recebimento e jornadas humanas no destino não está encerrado. ACTIVE administrativo e autorização de sessão são eixos distintos."
  },
  "gap": "Spec012 conserva cabeçalho histórico 'implementação em andamento'; código não é homologação remota nem aceite humano.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### CRI-012-02 — CRI-012

Fontes: [specs/012-account-verification-recovery/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/012-account-verification-recovery/spec.md>), [specs/018-frontend-account/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/018-frontend-account/spec.md>), [docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md>), [src/app/api/auth/password-reset/request/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/password-reset/request/route.ts>), [src/app/api/auth/password-reset/confirm/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/password-reset/confirm/route.ts>), [src/app/api/auth/change-password/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/change-password/route.ts>), [src/app/api/server/accounts/service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/accounts/service.ts>), [src/app/api/server/auth/session.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/auth/session.ts>), [src/components/account/password-reset-form.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/account/password-reset-form.tsx>), [src/components/account/forgot-password-form.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/account/forgot-password-form.tsx>).

<!-- json-row: CRI-012-02 -->
```json
{
  "id": "CRI-012-02",
  "imp": "CRI-012",
  "scope": "Reset/troca de senha e revogação de sessões",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/012-account-verification-recovery/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/018-frontend-account/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/auth/password-reset/request/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/auth/password-reset/confirm/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/auth/change-password/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/accounts/service.ts",
      "symbol": "requestReset/confirmReset/changePassword/passwordChanged"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/auth/session.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/account/password-reset-form.tsx"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/account/forgot-password-form.tsx"
    }
  ],
  "chain": {
    "route": "POST password-reset/request, password-reset/confirm e change-password.",
    "authorization": "CSRF/política/rate limits; request genérico sem enumerar conta; proof fechado e uso único; troca requer sessão e senha atual.",
    "service": "requestReset enfileira sem divulgar identidade; confirmReset consome prova e passwordChanged atualiza credentialVersion, invalida desafios/sessões.",
    "persistence": "AccountEmailChallenge/AccountRequest, hash de senha/User.credentialVersion e outbox de aviso.",
    "ui": "ForgotPasswordForm/PasswordResetForm; token em fragmento conforme contrato, sem exigir sessão original para reset."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/integration/account-verification-recovery.test.ts",
      "tests/e2e/account-verification-recovery.spec.ts",
      "tests/e2e/frontend-account.spec.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual.",
  "scientificValidation": "NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "Estado corrente do recorte CRI / Incrementos CRI",
    "text": "reset por link real pendente.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: solicitação/reset/troca e revogação por credentialVersion estão implementados; recebimento, consumo do link em jornada humana e SMTP do destino seguem separados dos testes sintéticos."
  },
  "gap": "Gate B operacional/humano permanece; não promover relato de recebimento sem consumo a aceite de reset.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### CRI-013-01 — CRI-013

Fontes: [specs/013-account-deletion/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/013-account-deletion/spec.md>), [docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md>), [src/app/api/auth/account-deletion/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/auth/account-deletion/route.ts>), [src/app/api/server/accounts/deletion.http.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/accounts/deletion.http.ts>), [src/app/api/server/accounts/service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/accounts/service.ts>), [src/app/api/server/accounts/deletion.contracts.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/accounts/deletion.contracts.ts>), [src/components/account/account-deletion-form.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/account/account-deletion-form.tsx>), [prisma/migrations/20261005000100_account_deletion_mail_ownership/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20261005000100_account_deletion_mail_ownership/migration.sql>).

<!-- json-row: CRI-013-01 -->
```json
{
  "id": "CRI-013-01",
  "imp": "CRI-013",
  "scope": "Exclusão pessoal condicionada e preservação de ciência",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/013-account-deletion/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/auth/account-deletion/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/accounts/deletion.http.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/accounts/service.ts",
      "symbol": "deletionState/deletionBlockers/deleteAccount"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/accounts/deletion.contracts.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/account/account-deletion-form.tsx"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20261005000100_account_deletion_mail_ownership/migration.sql"
    }
  ],
  "chain": {
    "route": "GET/DELETE /api/auth/account-deletion.",
    "authorization": "Sessão própria elegível/restrita conforme contrato; CSRF, confirmação e senha atual; revalidação sob lock.",
    "service": "deletionBlockers impede apagar vínculos/autorias científicas; deleteAccount limpa dados pessoais permitidos/draft pessoal e invalida acesso.",
    "persistence": "Transação de User/desafios/requests/mail ownership; restrições de FK preservam domínio e ciência; capa da área não é apagada pela conta.",
    "ui": "AccountDeletionForm mostra bloqueios/consequências e confirma senha; não é exclusão administrativa009."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/account-deletion-contracts.test.ts",
      "tests/integration/account-deletion.test.ts",
      "tests/migration/account-deletion.test.ts",
      "tests/e2e/account-deletion.spec.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual.",
  "scientificValidation": "NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "Estado corrente do recorte CRI / Incrementos CRI",
    "text": "aceite humano de exclusão ... continua aberto.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: exclusão da própria conta existe com senha/confirmacão, bloqueios de vínculos/autorias e limpeza pessoal permitida, sem excluir ciência ou capa de área; aceite humano013 segue pendente."
  },
  "gap": "Homologação humana e operação do destino permanecem pendentes; não usar implementação como decisão de apagar dados reais.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### CRI-014-01 — CRI-014

Fontes: [specs/014-account-test-runners/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/014-account-test-runners/spec.md>), [docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md>), [playwright.config.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/playwright.config.ts>), [playwright.account-deletion.config.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/playwright.account-deletion.config.ts>), [scripts/account-deletion-e2e.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/scripts/account-deletion-e2e.ts>), [scripts/accounts-local-postgresql.ps1](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/scripts/accounts-local-postgresql.ps1>).

<!-- json-row: CRI-014-01 -->
```json
{
  "id": "CRI-014-01",
  "imp": "CRI-014",
  "scope": "Runners de contas: seleção e fixtures próprias",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/014-account-test-runners/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "playwright.config.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "playwright.account-deletion.config.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "scripts/account-deletion-e2e.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "scripts/accounts-local-postgresql.ps1"
    }
  ],
  "chain": {
    "route": "NAO_APLICAVEL: infraestrutura de verificação, sem capacidade de produto nova.",
    "authorization": "Guards de loopback/banco sintético e fixtures dos runners; nenhuma autorização operacional hospedada.",
    "service": "Suíte geral exclui account-deletion; runner dedicado cria fixtures e mantém cenários/assertions. Preparador compara SQL LF/CRLF sem aceitar alteração de conteúdo.",
    "persistence": "Somente PostgreSQL sintético autorizado quando runner é executado; nada executado nesta missão.",
    "ui": "Playwright próprio; não acrescenta fluxo de usuário."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/e2e/account-deletion.spec.ts",
      "tests/unit/accounts-local-postgresql.test.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual.",
  "scientificValidation": "NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "Estado corrente do recorte CRI / Incrementos CRI",
    "text": "funcionalidades aprovadas014/015/016 têm evidências locais em runtime.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO:014 corrige seleção/preparação dos testes de contas, preservando fixtures/guards e a suíte dedicada de exclusão; número014 não é novo requisito funcional nem aceite externo."
  },
  "gap": "Seleção atual foi inspecionada, não executada; ausência de caso na suíte geral não significa ausência de cobertura dedicada.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### CRI-016-01 — CRI-016

Fontes: [specs/016-area-covers/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/016-area-covers/spec.md>), [specs/021-frontend-areas-cover/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/021-frontend-areas-cover/spec.md>), [docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/image/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/image/route.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/image/content/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/image/content/route.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/image/uploads/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/image/uploads/route.ts>), [src/app/api/laboratories/[laboratoryId]/areas/[areaId]/image/uploads/[attemptId]/confirm/route.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/laboratories/[laboratoryId]/areas/[areaId]/image/uploads/[attemptId]/confirm/route.ts>), [src/app/api/server/images/service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/images/service.ts>), [src/app/api/server/images/cloudinary.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/images/cloudinary.ts>), [src/app/api/server/images/sanitize.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/images/sanitize.ts>), [src/components/areas/area-cover.tsx](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/components/areas/area-cover.tsx>), [prisma/migrations/20261010000200_area_covers/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20261010000200_area_covers/migration.sql>), [tests/investigations/ihfr/two-request-quota.test.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/tests/investigations/ihfr/two-request-quota.test.ts>).

<!-- json-row: CRI-016-01 -->
```json
{
  "id": "CRI-016-01",
  "imp": "CRI-016",
  "scope": "Capa authenticated com proxy contextual e edição OCC",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/016-area-covers/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/021-frontend-areas-cover/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/image/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/image/content/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/image/uploads/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/laboratories/[laboratoryId]/areas/[areaId]/image/uploads/[attemptId]/confirm/route.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/images/service.ts",
      "symbol": "AreaCoverService.initiate/confirm/content/remove"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/images/cloudinary.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/images/sanitize.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/components/areas/area-cover.tsx"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20261010000200_area_covers/migration.sql"
    },
    {
      "path": "tests/investigations/ihfr/two-request-quota.test.ts",
      "symbol": "INV-002: AreaCoverService.initiate/FakeCoverProvider; não é IHFR",
      "sha": "00477e961e36416d8d602d36f7e0ee195c487148"
    }
  ],
  "chain": {
    "route": "GET/DELETE image, GET image/content, POST uploads e POST uploads/{attemptId}/confirm.",
    "authorization": "requireAuth/CSRF; READ_AREAS leitura; MANAGE_AREA_IMAGE OWNER/ADMIN contextual ativo para mutações; reautoriza após download.",
    "service": "Uma capa privada; tickets/attempt antes de I/O, quota de 3 tentativas ativas e 10 por hora, expectedRevision/CAS, Sharp reencode sem metadados e provider authenticated.",
    "persistence": "AreaCover/CoverUploadAttempt; revisão/asset identity; cadeia de migrations016 não substitui registro legado CollectionArea.image.",
    "ui": "AreaCover: upload/confirmação/remover/retry e fallback;021 consome016 sem converter URL CDN em dado público."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/unit/area-cover-contracts.test.ts",
      "tests/integration/area-cover-http.test.ts",
      "tests/integration/area-cover-provider.test.ts",
      "tests/integration/area-cover-transactions.test.ts",
      "tests/migration/area-covers.test.ts",
      "tests/e2e/area-covers.spec.ts",
      "tests/investigations/ihfr/two-request-quota.test.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução. Exceção documental: tests/investigations/ihfr/two-request-quota.test.ts verifica CAPAS (AreaCoverService.initiate), é instrumento sob demanda fora dos globs usuais.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual.",
  "scientificValidation": "NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "Estado corrente do recorte CRI / Incrementos CRI",
    "text": "Corte inicial beba96f: DTO/serviço/UI não fazem upload ... Cloudinary não é dependência.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: o recorte016 posterior implementa capa Cloudinary authenticated com proxy autorizado, revisão/OCC, validação e reencode; a linha inicial da matriz é histórica e já tem adendo corrente. Não é galeria, upload público nem provedor homologado."
  },
  "gap": "Configuração/feature off e fallback devem ser decididos por destino; nenhum Cloudinary real ou teste foi acionado nesta missão. INV-002 é concorrência de emissão de tickets de CAPAS; controle de duas chamadas em00477e9 não demonstra retrospectivamente a causa histórica e não é teste de recuperação IHFR.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```

### CRI-016-02 — CRI-016

Fontes: [specs/016-area-covers/spec.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/specs/016-area-covers/spec.md>), [docs/operations/area-covers-runbook.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/operations/area-covers-runbook.md>), [docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md>), [src/app/api/server/images/service.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/images/service.ts>), [src/app/api/server/images/provider.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/images/provider.ts>), [src/app/api/server/images/cloudinary.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/images/cloudinary.ts>), [src/app/api/server/images/settings.ts](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/src/app/api/server/images/settings.ts>), [prisma/migrations/20261010000200_area_covers/migration.sql](<https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/prisma/migrations/20261010000200_area_covers/migration.sql>).

<!-- json-row: CRI-016-02 -->
```json
{
  "id": "CRI-016-02",
  "imp": "CRI-016",
  "scope": "Cleanup por identidade imutável, leases e rollout operacional",
  "intentSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "specs/016-area-covers/spec.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "docs/operations/area-covers-runbook.md"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "docs/plans/active/contas-rascunhos-imagens/matriz-de-estado.md"
    }
  ],
  "implementationSources": [
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/images/service.ts",
      "symbol": "AreaCoverService.cleanup"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/images/provider.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/images/cloudinary.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "src/app/api/server/images/settings.ts"
    },
    {
      "sha": "c4adfb379e5dc78f27f31b91edbd13f43228d9f9",
      "path": "prisma/migrations/20261010000200_area_covers/migration.sql"
    }
  ],
  "chain": {
    "route": "Cleanup é operação interna/runner, não concessão por UI de participante.",
    "authorization": "Ownership de asset_id/publicId/contexto comprovado, feature flag/config válidas e leases; sem exclusão por URL/prefixo presumido.",
    "service": "cleanup seleciona jobs e revalida identidade/fencing antes de destruir; mismatch fica RECONCILE; não há expiração automática de tombstone.",
    "persistence": "CoverCleanupJob com lease/CAS/retry; area cover persiste independentemente da conta criadora.",
    "ui": "Fallback e indisponibilidade preservam metadados/antiga; operador/monitoramento de créditos não têm aceite humano automático."
  },
  "presentInDevelopment": true,
  "presentInCandidate": true,
  "implementationState": "IMPLEMENTADO_VERIFICADO_ESTATICAMENTE",
  "tests": {
    "paths": [
      "tests/integration/area-covers.test.ts",
      "tests/integration/area-covers-contention.test.ts",
      "tests/integration/area-cover-provider.test.ts"
    ],
    "selection": "package.json: test:unit seleciona tests/unit/*.test.ts e *.test.tsx; scripts/imp006-test-runner.ts seleciona tests/integration/*.test.ts, tests/contract/*.test.ts e tests/migration/*.test.ts; playwright.config.ts seleciona tests/e2e e exclui ihfr-diagnosis-*.spec.ts, full-ui-flow.spec.ts, account-deletion.spec.ts (HTTPS tem exclusão própria). IHFR usa playwright.imp006.config.ts, testMatch ihfr-diagnosis-*.spec.ts; exclusão usa playwright.account-deletion.config.ts. Seleção é inspeção, não execução.",
    "execution": "NOT_RUN",
    "consultedEvidence": []
  },
  "humanAcceptance": "NAO_VERIFICADO nesta missão; testes/código e recibos anteriores não constituem aceite humano atual.",
  "scientificValidation": "NAO_APLICAVEL ao mecanismo técnico; não confere validação científica de dados ou IHFR.",
  "oldClaim": {
    "path": "docs/code-first-prd/implementation/backlog.md",
    "location": "Estado corrente do recorte CRI / Incrementos CRI",
    "text": "operação real pendente.",
    "recommendedAddendum": "EVIDENCIA_IMPLEMENTACAO: cleanup016 opera somente sobre identidade imutável comprovada, com leases/reconciliação, sem apagar capa na exclusão da conta. RECOMENDACAO: conservar decisão de rollout/fallback/operador como pendência operacional separada."
  },
  "gap": "Cloudinary, créditos/cleanup real e decisão explícita de capas off/on no piloto permanecem pendentes; G3–G5 não herdam PASS técnico.",
  "nextAction": "RECOMENDACAO: acrescentar adendo datado no CHAT com estes limites e fontes, preservando o texto histórico; não reimplementar esta subcapacidade.",
  "classification": "EVIDENCIA_IMPLEMENTACAO"
}
```
