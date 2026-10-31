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
