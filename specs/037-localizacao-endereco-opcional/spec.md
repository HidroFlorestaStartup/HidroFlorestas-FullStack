# Feature Specification: localização e endereço opcional

**Feature Branch**: `feat/localizacao-endereco-opcional`
**Created**: 2026-10-31
**Status**: `UI037_CODE_SYNTHETIC_CLOSED` no `CODE_SHA_TESTED=63925b3639f3eec1dd4bd737f7be7adb881c83eb`, Actions `41251980306/1` (15/15 gates PASS, 224 E2E); `GEOCODER_OPERATIONAL_PENDING`; `HUMAN_ACCEPTANCE_PENDING`. Passagens que falam de execução futura abaixo são o histórico de implementação, não o estado do SHA validado.
**Input**: UI-07 aprovada por Pedro no handoff #44; organização confirmada pela missão HF-UI-044-G0.
**Base exata**: `07755822f5dc75fe2be1d924005d30ed99f64a0b`, sem herdar A/B/setup.

## Fontes e autoridade

[Decisões completas](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030/decisoes-e-escopo.md), [critérios](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030/criterios-de-aceite.md), [plano G0](../../docs/plans/active/hf-ui044-g0/plan.md).

DECISAO_CONFIRMADA: comportamento UI-07. Escolha de provedor, debounce, cache e política de cancelamento são decisões técnicas a documentar pelo executor, não aprovações de produto atribuídas a Pedro. Preservar constituição e estados de autoridade Code-First.

## User Scenarios & Testing

### US1 — Obter sugestão de endereço pelas três entradas (P1)

**Teste independente**: fornecer coordenadas válidas pelo dispositivo, selecionar ponto no mapa e digitar latitude/longitude, separadamente.

**Aceite**: as três entradas tentam geocodificação reversa para sugerir município/UF/CEP. Campos continuam revisáveis e opcionais; coordenadas permanecem a referência espacial, sem inventar endereço para completar lacunas.

### US2 — Cadastrar sem depender do serviço de endereço (P1)

**Teste independente**: simular retorno parcial, ausência de CEP, resposta vazia, timeout, limite e falha de rede; revisar ou deixar campos vazios e concluir cadastro com coordenadas válidas.

**Aceite**: município, UF e CEP podem estar parcial ou totalmente ausentes; falta de enriquecimento não bloqueia cadastro. Validar os valores efetivamente fornecidos sem torná-los obrigatórios por acidente. Não exigir serviço pago ou chave sem decisão explícita.

### US3 — Preservar a intenção mais recente durante respostas assíncronas (P1)

**Teste independente**: disparar consultas para coordenadas A e B e resolver A por último; editar manualmente um campo antes de uma resposta pendente.

**Aceite**: resposta obsoleta não substitui endereço do ponto atual nem sobrescreve edição manual mais recente. Estados de carregamento/falha são claros e não imobilizam a jornada. Política técnica de associação do endereço às coordenadas deve ser explícita, sem usar valores anteriores como se pertencessem ao novo ponto.

### Edge Cases

Permissão de geolocalização negada, coordenada inválida/incompleta/fora de faixa, mudança rápida de ponto, texto manual alterado durante consulta, região sem CEP, resposta com somente município ou UF, recarregar/reabrir formulário e cadastro com todos os campos opcionais vazios. Não mascarar erro de coordenadas como sucesso de geocodificação.

## Requirements

- **FR-037-001**: cobrir dispositivo, mapa e entrada manual válida com a mesma semântica de enriquecimento.
- **FR-037-002**: permitir município/UF/CEP individualmente opcionais na UI, validação, DTO e persistência aplicáveis, com mudança mínima compatível quando necessária.
- **FR-037-003**: manter cadastro independente de retorno bem-sucedido do provedor.
- **FR-037-004**: impedir respostas obsoletas e perda de edição manual; testar ordem invertida de respostas.
- **FR-037-005**: usar integração técnica documentada e compatível com termos/limites do provedor; não ativar conta paga, contratar serviço ou expor chaves.

Entidades: coordenadas e campos opcionais de endereço de área existente. G0 não aprova novo modelo de domínio nem cria migration. Completar leitura das specs 003/021 e rastreabilidade Code-First antes de detalhar alterações de contrato.

## Success Criteria

**SC-037-001**: três formas de entrada exercitadas por testes próprios, com cenários de erro/retorno parcial.
**SC-037-002**: cadastro válido com zero, um, dois ou três campos opcionais preenchidos conforme validações aplicáveis; ausência de CEP não bloqueia.
**SC-037-003**: teste determinístico de resposta fora de ordem e edição manual comprova que dados atuais não são sobrescritos.
**SC-037-004**: testes focais/contrato/persistência aplicáveis e quinze gates existentes registrados por SHA/run/tentativa; sem operação de banco hospedado ou provedor real em G0.

## Assumptions and limits

Provedor atual e nulabilidade existente devem ser inspecionados; não há escolha automática por esta preparação. Novas migrations, se imprescindíveis na implementação, são versionadas/testadas apenas em banco sintético autorizado, sem Neon ou execução hospedada. B controla detalhe da área, A shell; mudanças compartilhadas passam pelo coordenador. REV-01–REV-03 e ciência excluídos. [Plano](plan.md), [tarefas](tasks.md), [evidências](implementation-evidence.md).

## Delta implementado em 2026-10-31 (versus a preparação G0)

- A mesma máquina de estados recebe: localização do dispositivo, clique no mapa e digitação válida de coordenadas; toda mudança incrementa a revisão do ponto. Debounce de 650 ms e requisição abortável de até 5 s não interferem na ação de cadastrar.
- `municipality`, `state` e `cep` são campos individualmente opcionais e editáveis no navegador. Resposta de geocodificação é apenas sugestão; ausência de informação não gera endereço sintético. Mudança de coordenadas remove sugestões anteriores, preservando entradas humanas para revisão.
- Respostas de revisão antiga são ignoradas; a revisão atual nunca substitui campo marcado como alterado manualmente. Falha, timeout ou retorno 429 não alteram a validade da localização, nem bloqueiam salvar com os campos que a API atual aceita.
- **Histórico do HEAD 53af107 (corrigido neste ciclo)**: o CEP era informativo e ainda NÃO era gravado pelo POST existente. `CollectionArea.cep` já existe e é nullable, mas a allowlist da API e DTOs o excluem por decisão histórica da spec 003. A decisão posterior UI-07 determina que volte como opcional; a integração exige writer coordenado e regressões de contrato. Ver [proposta de contrato](contracts/cep-api-extension.md). SC-037-002 permanece dependente de testes reais no SHA de implementação, embora os hunks de contrato já tenham sido criados.
- O endpoint de sugestões `/api/geocoding/reverse` exige sessão e usa provedor **desabilitado por padrão**. Sem seleção expressa de provedor, retorna 503 sanitizado e mantém o cadastro válido. Não houve contratação, chamadas reais, alteração de ambiente hospedado ou deploy.

## Casos adicionais de aceite executáveis

| Caso | Resultado pretendido | Prova planejada |
| --- | --- | --- |
| Três fontes de coordenadas | Formulário sugere município/UF/CEP quando há provedor simulado | `tests/unit/hf-ui037-geocoding.test.ts`, `tests/e2e/hf-ui037-location.spec.ts` |
| Uma/duas/três sugestões, zero CEP ou nenhum endereço | Campos faltantes permanecem vazios, cadastro com coordenadas válidas possível | unit/contract + E2E do CEP, com oito combinações e banco sintético (a executar no SHA final) |
| Autenticação, coordenadas, ausência de configuração, 429 e timeout | Nenhuma chamada externa não autorizada e falha não bloqueante | `tests/integration/hf-ui037-reverse-route.test.ts` |
| Resposta A após B, campo digitado depois do início de A | Nunca sobrescrever posição atual nem correção manual | reducer e E2E |
| Revisão e acessibilidade | Status não bloqueante com aria-live, tabulação, viewports 390/1440 | E2E/screenshot quando efetivamente executado |

A evidência real por SHA e a distinção entre teste declarado e rodado estão em [implementation-evidence.md](implementation-evidence.md).

## Contraprovas adicionais do contrato local

O teste `tests/contract/hf-ui037-address-optional.test.ts` confirma as oito combinações de `municipality`/`state`/`cep`, CEP nulo ou válido normalizado, proteção de injeções privilegiadas e consistência da extensão OpenAPI em `contracts/area-optional-address.openapi.yaml`. A spec 003 histórica continua intacta e explicitamente não é o contrato atualizado. Teste e código existem; validar runtime por run/SHA antes de declarar aceite.

## Estado da correção focal (Spec Kit analyze → plan → implement → review)

**Funcionalidade implementada em código, pendente da qualificação do SHA remoto:**

- `CEP` com 8 dígitos, com ou sem hífen, normalizado no servidor para `NNNNN-NNN`; vazio/nulo/ausente aceito e persistido como `null`. Valores malformados retornam 400. Município e UF continuam opcionais, sem criar exigência territorial.
- O formulário agora envia CEP no POST, o parser mantém allowlist segura, o serviço `AreasService.create` continua reutilizado sem alterações e a serialização de áreas expõe `cep` mesmo quando `null`; o DTO TypeScript mantém `cep?` para compatibilidade de mocks antigos, enquanto o servidor devolve sempre o campo.
- Oito combinações no contrato e no E2E (POST/GET/Prisma sintético), inclusive sem todos os campos, mais casos de CEP inválido. Capturas viewport em `TestInfo.outputPath` e attachments, com máscaras para entradas do formulário.
- **Sem migrations**: `CollectionArea.cep String?` já integra schema. Nenhuma escrita em `main`, `development`, em A/B, ou em provedores hospedados. O fornecedor de geocodificação permanece **não configurado**, e não há validação de disponibilidade real.
- O resultado global da CI continua **pendente** de run terminal por SHA. O incidente de timeout da navegação móvel pertence ao owner A e não autoriza reduzir assertions nem retirar o gate.

## Estado terminal do recorte sintético — CLOSE-C (2026-11-01)

`FR-037-001..005` e `SC-037-001..004` possuem cobertura de código/testes em Unit, Integration, Contract, E2E e Gates oficiais no SHA `63925b3639f3eec1dd4bd737f7be7adb881c83eb`, [Actions 41251980306/1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251980306), 15/15 PASS e 224 E2E. A matriz de prova individual, a separação de capturas e as falhas históricas estão em [implementation-evidence.md](implementation-evidence.md).

**Limite de aceite:** este estado comprova **código e teste sintético**, não consultas a fornecedor real, conformidade de quota/cache/atribuição/licença/privacidade, captura dedicada `hf-ui037-location` no artefato, teste em dispositivo físico, QA independente ou aprovação humana. `HF_REVERSE_GEOCODER_URL` permanece desabilitado por padrão. `GEOCODER_OPERATIONAL_PENDING` e `HUMAN_ACCEPTANCE_PENDING` não bloqueiam a classificação técnica `UI037_CODE_SYNTHETIC_CLOSED`, mas **bloqueiam alegação de aceitação/ativação operacional**. A próxima validação deve considerar a composição de #45–#48 sob os HEADs atuais e autorização do mantenedor, sem merge nesta etapa.

## CLOSE-PARALLEL-02 — evidência dedicada UI037 (2026-11-01)

`C_CAPTURE_READY_FOR_RUNTIME`: instrumentação corrigida na worktree C, sem
mudança de produto/API/CEP/schema. PNG+JSON são copiados imediatamente para
`.accounts-validation/frontend-areas/` com nomes dedicados `ui037-frontend-areas-hf-ui037-location-{mobile,desktop}-viewport`;
metadados registram escala/fontes/proveniência/máscaras e hash PNG. Contraprova
de persistência/não sobrescrita executada, 2/2 PASS, com bytes sintéticos.
`UI037_CAPTURE_PENDING` continua até runtime real e auditoria dos quatro arquivos
no ZIP final após as suítes posteriores. Captura não é aceite visual/humano.
`GEOCODER_OPERATIONAL_PENDING` e os qualificadores científicos são preservados.

## CLOSE-PARALLEL-02 — UI037_CAPTURE_VERIFIED na rodada2

Estado técnico de arquivamento: **UI037_CAPTURE_VERIFIED** na candidata
`d62fb08cf65aca5dc704231f88594030f49279cb`, [run41353270282/1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41353270282),
artifact13102479714. Os4PNG/JSON dedicados foram validados após15gatesPASS,
incluindo suítes posteriores ao E2E. T024 fechada somente nesse alcance.
Não é aceite humano, comparação bilateral UI06 ou operação de geocoder.
O SHA documental posterior e a rodada3 não recebem SUCCESS dessa run.


## Ciclo autorizado de teste real — 2026-11-06

Pedro solicitou configurar o preenchimento real de município, UF e CEP no Preview para teste manual e perguntou sobre gratuidade. Este ciclo autoriza a configuração e a adaptação mínima necessária, mantendo cadastro, contratos opcionais e correções manuais. Photon público foi selecionado tecnicamente dentro desse pedido, sem conta, chave ou contratação paga. A escolha não constitui homologação para piloto ou uso em escala.

- As três origens existentes (dispositivo, mapa e coordenadas digitadas) continuam usando o proxy autenticado.
- Aceitar GeoJSON Photon sem usar nome de ponto de interesse como município; preservar formatos anteriores e campos ausentes como null.
- Enviar somente coordenadas e headers técnicos ao provedor. Sem senha, sessão ou dados de coleta no pedido externo.
- Sugestões continuam opcionais/editáveis; falha, timeout ou limite não impede cadastro.
- Preview privado sobre banco sintético existente; sem Production, migration ou merge neste ciclo.
