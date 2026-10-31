# Implementation Plan: área/coletas/IHFR — preparação B

**Branch**: `feat/ajustes-area-coletas-ihfr` | **Date**: 2026-10-31 | **Spec**: [spec.md](spec.md)
**Estado**: EM_ANDAMENTO; preparação G0, não execução concluída do Spec Kit nem implementação.

## Summary and technical context

UI-02/UI-03/UI-04/UI-06 no conteúdo de área/coleta. Base `07755822f5dc75fe2be1d924005d30ed99f64a0b`; development de origem `9b8595d232842d401ce81bbc92c54dd543aa2829`; dependência de integração #45.

Next.js/App Router e TypeScript existentes; PostgreSQL apenas sintético nos testes autorizados. CI preservada Windows/Node 24.19.0/PowerShell. Ler versões locais e contratos reais antes de planejar alterações de consulta. Não redefinir o algoritmo IHFR, persistência confirmada ou autorização. Desempenho quantitativo novo: não especificado.

## Constitution Check

Recorte e decisões aprovados, spec/branch/PR separados, ciência e fonte histórica preservadas. Verificação de implementação e revisão independente pendentes; G0 é mesmo executor sequencial.

## Project Structure and ownership

Documentação exclusiva: `specs/036-ajustes-area-coletas-ihfr/`.
Pontos de entrada observados na árvore base:
- `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx`;
- `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/collections/[collectionId]/page.tsx`;
- subrotas `environmental-data` da coleta.

Esses caminhos orientam a leitura; o executor deve seguir imports e congelar a lista exata de componentes/leituras e AGENTS aplicáveis antes de editar. Nenhuma inspeção runtime de cada componente é alegada por G0. B controla detalhe da área/coleta; não controla o formulário de localização C nem o shell/layout A.

Testes novos propostos, ainda não criados: `tests/unit/hf-ui036-area-presentation.test.ts` e `tests/e2e/hf-ui036-area-collections.spec.ts`; adequar ao harness existente. DTO/repositórios de áreas, estilos/UI compartilhada, fixtures e configuração exigem um writer alocado pelo coordenador. Vercel/workflow somente leitura.

## Sequência e dependências

1. Preflight por SHA/PR/guardas e ambiente local; completar Spec Kit na reserva 036, rastreabilidade Code-First e mapa de arquivos.
2. Testar/implementar US1: instantes de ocorrência com offsets, desempate técnico explícito e seleção/exibição correta de resultado disponível e sua origem.
3. Testar/implementar US2 e US3, sem confundir confirmado/draft, resultado válido/revogado e prova científica.
4. Comparar starter/FullStack no mesmo estado e viewport; usar fixtures sintéticas, não mocks como produto.
5. Executar testes focais e os quinze gates existentes; registrar SHA/run/tentativa, falhas e NOT_RUN; atualizar documentação/PR.

Pode iniciar sem aguardar A/C. Quando o shell A estiver pronto, validar a composição com seu contrato antes da integração futura; mudanças compartilhadas são propostas ao coordenador, não absorvidas por merge nesta missão.

## Handoff Git

Pai exato do primeiro commit B: `07755822f5dc75fe2be1d924005d30ed99f64a0b`. Usar a branch existente; não recriar de development sem os guards. Diff exclusivo `git diff 07755822f5dc75fe2be1d924005d30ed99f64a0b...HEAD`; acumulado inicial `git diff 9b8595d232842d401ce81bbc92c54dd543aa2829...HEAD`. PR final para development, dependência #45 explícita.

Integração futura somente autorizada: guards primeiro, conciliar shell/DTO e refazer CI. Se guards sofrer squash/rebase, transportar apenas commits B posteriores à base congelada e revisar a união das configurações. Não executar merge, deploy ou alteração de branch alheia agora.

## Riscos e parada focal

Ordenação textual de datas, misturar último diagnóstico com última coleta, exibir revogado, ocultar qualificadores e alterar confirmação são riscos materiais. Bloquear somente recorte dependente de decisão não resolvida; continuar tarefas independentes. Não implementar UI-07, REV-01–REV-03, ciência ou provedores.
