# Implementation Plan: localização/endereço opcional — preparação C

**Branch**: `feat/localizacao-endereco-opcional` | **Date**: 2026-10-31 | **Spec**: [spec.md](spec.md)
**Estado**: EM_ANDAMENTO; plano inicial G0, sem alegar execução concluída do Spec Kit.

## Summary and technical context

UI-07 nas três entradas de coordenadas e nos campos de endereço opcionais. Base `07755822f5dc75fe2be1d924005d30ed99f64a0b`; development de origem `9b8595d232842d401ce81bbc92c54dd543aa2829`; guards #45 são dependência de integração.

Reutilizar Next.js/TypeScript, formulários, DTOs e persistência existentes. Provedor e arquitetura de geocodificação: a selecionar/confirmar por leitura do código e documentação primária atual de termos, limites, atribuição e privacidade. Não pressupor Nominatim ou qualquer outro serviço. Não executar chamadas externas em G0. Testes devem poder controlar respostas deterministicamente, sem depender de rede externa.

CI Windows/Node 24.19.0/PowerShell, quinze gates e banco sintético próprios preservados. Sem alteração de dependências por conveniência; sem banco hospedado. Novo objetivo quantitativo de performance: não especificado; consultas não devem bloquear o cadastro.

## Constitution Check

UI-07 confirmada; spec/branch/PR próprios; optionalidade e coordenadas preservadas; sem ciência, histórico ou domínio inventado. Gate técnico de contratos e nulabilidade a concluir na implementação; revisão independente pendente.

## Project Structure and ownership

Documentação exclusiva: `specs/037-localizacao-endereco-opcional/`.
C é writer do formulário de localização/cadastro da área e da lógica de obtenção/edição do endereço. O executor deverá enumerar os arquivos reais em `src/`, seguir os imports de UI/DTO/API/repositório e conferir `prisma/schema.prisma` sem editar até demonstrar necessidade. Ler AGENTS aplicáveis e registrar o mapa exato antes de produto.

B não edita o formulário C; C não reorganiza o detalhe da área B nem o shell A. DTO/repositório de área e schema podem ser compartilhados: enviar patch/contrato/testes ao coordenador para alocação de writer. Vercel/workflow, dependências, fixtures e configuração de testes não são livres para edição concorrente.

Testes propostos ainda não criados: `tests/unit/hf-ui037-geocoding.test.ts`, `tests/contract/hf-ui037-address-optional.test.ts` e `tests/e2e/hf-ui037-location.spec.ts`, adaptados ao harness existente.

## Sequência técnica recomendada

1. Preflight por SHA/guardas/refs/PR/ambiente local; completar Spec Kit, rastreabilidade e mapa de arquivos na reserva 037.
2. Inspecionar optionalidade de ponta a ponta e integração atual; documentar decisão técnica do provedor e limites. Não inventar escolha ou autorização paga. Planejar contratos mínimos.
3. Testar US1/US2 com adaptador controlável: todas as entradas, retornos completos/parciais/vazios, timeout/limite/rede e cadastro sem endereço.
4. Testar US3 antes da correção: respostas A/B invertidas e edição manual pendente. Definir controle de versão/cancelamento e semântica de limpeza/revisão ao trocar coordenadas, preservando intenção atual.
5. Implementar mínimo necessário; somente se demonstrado, alterar contrato/schema com coordenação e migration versionada/sintética, nunca executada em hosted DB.
6. Executar testes focais/contrato/persistência/E2E e quinze gates preservados; registrar falhas e NOT_RUN com SHA/run/tentativa. Atualizar docs e PR.

## Handoff Git e integração

Usar branch existente com pai dos guards, sem recriar de development desprotegida. Diff exclusivo `git diff 07755822f5dc75fe2be1d924005d30ed99f64a0b...HEAD`; acumulado inicial `git diff 9b8595d232842d401ce81bbc92c54dd543aa2829...HEAD`. Destino final development; #45 integra primeiro sob autorização futura. Não aguardar implementação A/B para trabalho independente; qualquer interface comum passa pelo coordenador.

Se #45 integrar por squash/rebase, transportar somente os commits exclusivos após o guard congelado e revalidar a união de configurações e contratos. Não executar esse merge/rebase de integração agora nem importar setup.

## Riscos e parada focal

Optionalidade somente visual mas ainda obrigatória no DTO, endereço antigo associado ao novo ponto, sobrescrita de edição manual e dependência síncrona de serviço externo são riscos focais. Decisão técnica pendente não autoriza contratar serviço. Bloquear somente o recorte dependente e avançar com contratos/testes independentes. Sem deploy, Neon, hosted migrations, SMTP, Cloudinary, REV-01–REV-03 ou ciência.

## Projeto executado — recorte C e mapa concreto de paths

**Git/ownership:** PR Draft #48, branch `feat/localizacao-endereco-opcional`, base imutável `07755822f5dc75fe2be1d924005d30ed99f64a0b`. G0 `e1ec632d60b22f2ddef93f1dbec0116d214d30f1`. Na inspeção inicial, A #46 e B #47 tinham apenas seus documentos, sem arquivos de contrato/área alterados. Revisar novamente antes da integração compartilhada. Arquivo `AGENTS.md` na raiz rege os paths observados; não havia `AGENTS.md` mais específico nos diretórios inspecionados.

| Arquivo/camada | Writer/alocação | Implementação |
| --- | --- | --- |
| `src/components/areas/area-form.tsx` | C | Inputs controlados, busca assíncrona, revisão/falha/CEP informativo, submissão legada segura |
| `src/components/areas/area-geocoding-state.ts` | C | Máquina pura de revisões, proteção manual, invalidação de sugestões |
| `src/components/areas/reverse-address.ts` | C | Leitura robusta e normalização estrita de município/UF/CEP |
| `src/app/api/geocoding/reverse/route.ts`, `src/app/api/geocoding/reverse/route.handlers.ts` | C | Integração de autenticação com route handler puro, proxy opt-in HTTPS e timeout sintético testável |
| `src/components/areas/area-form-state.ts` | C (leitura) | Reutilizado sem alterar semântica antiga de geolocalização |
| `src/components/areas/area-map.client.tsx` | C (leitura) | Clique já fornece coordenadas; nenhuma edição requerida |
| `src/app/api/server/areas/area.contracts.ts`, `src/types/area.type.ts` | **Compartilhados/coordenador** | Somente leitura; permitir CEP mínimo após atribuição de writer |
| `src/app/api/server/services/areas.service.ts`, `prisma/schema.prisma` | **Compartilhados/coordenador** | Somente leitura: `cep String?` e `...parsed` já existentes; **sem migration** |
| `tests/unit/hf-ui037-geocoding.test.ts`, `tests/integration/hf-ui037-reverse-route.test.ts`, `tests/contract/hf-ui037-address-optional.test.ts`, `tests/e2e/hf-ui037-location.spec.ts` | C | Testes novos, sem editar fixtures, runners ou config; contrato atual de CEP permanece explicitamente NÃO IMPLEMENTADO |
| `tests/unit/area-contracts.test.ts`, `tests/unit/area-openapi-contract.test.ts`, `tests/e2e/area-registration.spec.ts` | **Compartilhados/coordenador** | Assertivas da spec 003 precisam ser reconciliadas com decisão posterior UI-07 |

**Autoridade:** DECISAO_CONFIRMADA UI-07 em #44 supera apenas a antiga exclusão de CEP do contrato mínimo da spec 003. Código/schema existentes continuam baseline, não aprovação de nova taxonomia ou ciência. Constituição/spec kit v1.0.0; nenhuma alteração histórica da 003 ou docs/raw.

### Adaptação de geocodificação (RECOMENDACAO técnica, não seleção de fornecedor)

`HF_REVERSE_GEOCODER_URL` é um endpoint HTTPS externo configurado **somente se o operador aprovar um fornecedor e seus termos**. O servidor faz GET com `lat`/`lon`, envia Accept JSON, não encaminha sessão/cookies, aborta após 5 segundos, retorna somente `{address:{municipality,state,cep}}` ou 503. Não armazena coordenadas no cache. As respostas podem incluir `address.city/town/municipality/village/state/postcode` ou campos normalizados, e só passam CEP brasileiro com 8 dígitos e UF reconhecida. API própria exige autenticação; não permite que o cliente defina a URL do fornecedor. Chaves de fornecedor não são introduzidas nem expostas.

**O endpoint público Nominatim NÃO foi escolhido/ativado.** A política oficial acessada em 31/10/2026: https://operations.osmfoundation.org/policies/nominatim/ impõe máximo agregado de 1 requisição/s, User-Agent/Referer identificável, atribuição e regras ODbL, cache e capacidade de substituição; geocodificação automática/bulk é proibida em determinados contextos. Não existe neste recorte limitador global/distribuído ou cache operacional aprovado. Apontar o env para esse host sem aprovação, implementação desses controles e revisão de privacidade/termos **não é permitido por este plano**. Documentação de API reversa: https://nominatim.org/release-docs/latest/api/Reverse/. O retorno reverso pode ser do objeto próximo e não representar endereço exato; revisão humana permanece obrigatória.

**Privacidade:** latitude/longitude descrevem pontos potencialmente sensíveis. Antes de ativar fornecedor externo, decidir retenção/logs, base legal/aviso, país, limites, atribuição e revogação de acesso; nenhum dado pessoal ou coordenada real foi enviado nesta execução. Sem provedor, os fluxos de cadastro existentes continuam funcionais.

### Validação e integração

Os testes unitários exercitam o reducer e parsing/normalização, os de integração exercitam autenticação/contrato do endpoint com fetch simulado, e E2E usa fixtures sintéticas existentes e interceptação de rede (sem provedor público). Nenhum arquivo de execução de CI foi editado. Consultar `implementation-evidence.md` para resultados reais, run e tentativa específicos; status NÃO deve ser inferido de criação de teste ou do G0.

Patch compartilhado proposto ao coordenador da #45 (comentário #6547701906): [contracts/cep-api-extension.md](contracts/cep-api-extension.md). Não existe writer delegado nesta execução, portanto não aplicar a atualização de DTO/API nesta branch sem alocação. Se alocado, os testes de contrato e E2E devem verificar CEP persistido em PostgreSQL sintético e todas as antigas assertivas conflitantes antes de encerrar UI-07.
