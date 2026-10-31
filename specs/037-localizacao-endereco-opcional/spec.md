# Feature Specification: localização e endereço opcional

**Feature Branch**: `feat/localizacao-endereco-opcional`
**Created**: 2026-10-31
**Status**: IMPLEMENTACAO_PARCIAL — código UI-07 publicado; CEP end-to-end e provedor operacional pendentes de coordenação.
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
- **Limite exposto na interface**: o CEP é informativo e ainda NÃO é gravado pelo POST existente. `CollectionArea.cep` já existe e é nullable, mas a allowlist da API e DTOs o excluem por decisão histórica da spec 003. A decisão posterior UI-07 determina que volte como opcional; a integração exige writer coordenado e regressões de contrato. Ver [proposta de contrato](contracts/cep-api-extension.md). Não declarar SC-037-002 integralmente PASS enquanto esse contrato não for integrado.
- O endpoint de sugestões `/api/geocoding/reverse` exige sessão e usa provedor **desabilitado por padrão**. Sem seleção expressa de provedor, retorna 503 sanitizado e mantém o cadastro válido. Não houve contratação, chamadas reais, alteração de ambiente hospedado ou deploy.

## Casos adicionais de aceite executáveis

| Caso | Resultado pretendido | Prova planejada |
| --- | --- | --- |
| Três fontes de coordenadas | Formulário sugere município/UF/CEP quando há provedor simulado | `tests/unit/hf-ui037-geocoding.test.ts`, `tests/e2e/hf-ui037-location.spec.ts` |
| Uma/duas/três sugestões, zero CEP ou nenhum endereço | Campos faltantes permanecem vazios, cadastro com coordenadas válidas possível | unit + E2E (API atual salva município/UF; CEP pendente) |
| Autenticação, formato de coordenadas, ausência de configuração | Nenhuma chamada externa não autorizada | `tests/integration/hf-ui037-reverse-route.test.ts` |
| Resposta A após B, campo digitado depois do início de A | Nunca sobrescrever posição atual nem correção manual | reducer e E2E |
| Revisão e acessibilidade | Status não bloqueante com aria-live, tabulação, viewports 390/1440 | E2E/screenshot quando efetivamente executado |

A evidência real por SHA e a distinção entre teste declarado e rodado estão em [implementation-evidence.md](implementation-evidence.md).
