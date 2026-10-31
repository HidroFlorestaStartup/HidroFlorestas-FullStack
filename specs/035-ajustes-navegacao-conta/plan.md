# Implementation Plan: navegação e conta — preparação A

**Branch**: `feat/ajustes-navegacao-conta` | **Date**: 2026-10-31 | **Spec**: [spec.md](spec.md)
**Estado**: EM_ANDAMENTO; plano inicial G0 a detalhar antes de produto. Não se alega execução dos comandos Spec Kit.

## Summary and technical context

Implementar UI-01/UI-05/UI-06 no shell e conta. Base `07755822f5dc75fe2be1d924005d30ed99f64a0b`, pai development `9b8595d232842d401ce81bbc92c54dd543aa2829`. PR de guards #45 é dependência de integração, não bloqueia trabalho isolado.

Aplicação Next.js/App Router e TypeScript existente; preservar dependências e contratos. CI Windows/Node 24.19.0/PowerShell com quinze gates sintéticos. Ler package/lockfile e documentação local da versão Next antes de codificar. Não instalar ou mudar dependências por inferência do G0. Metas quantitativas de desempenho além do aceite: não especificadas.

## Constitution Check

Decisões atuais e recorte aprovados; spec/branch/PR próprios; documentação histórica imutável; auth e dados existentes preservados. Verificação de aderência em código pendente. Revisão atual do mesmo coordenador não é revisão independente.

## Project Structure and ownership

Documentos exclusivamente em `specs/035-ajustes-navegacao-conta/`. O executor deve enumerar e congelar os arquivos concretos de shell, layouts privados, workspace e conta em `src/` antes de editar, após ler AGENTS aplicáveis. G0 não inspecionou cada componente para fechar esse mapa e não autoriza refatoração global.

A é writer do shell/layout; B/C não editam esses arquivos em paralelo. Estilos globais, UI compartilhada, fixtures, configuração, dependências e autenticação exigem coordenação. Configurações de deploy e workflow são somente leitura. Nenhum novo schema previsto por este recorte.

Testes próprios propostos: `tests/unit/hf-ui035-navigation.test.ts` e `tests/e2e/hf-ui035-navigation.spec.ts`, adaptando localização ao harness realmente existente sem duplicar runner. São nomes reservados/propostos, ainda sem arquivo executável criado.

## Sequência

1. Revalidar refs, ancestralidade, PRs, guardas, ambiente local e exclusividade de arquivos; preservar alterações existentes.
2. Completar specify → plan → tasks com skills `.agents/skills/speckit-*`, reutilizando esta reserva, sem criar outra branch/spec. Confirmar rastreabilidade Code-First e arquivos reais.
3. Implementar e testar US1; depois US2; comparar US3. Novos testes devem demonstrar a regressão antes da correção quando reproduzível.
4. Executar testes focais, Typecheck/Lint/Build e o runner completo quando ambiente permitir; registrar cada resultado real por SHA, run e tentativa. Não enfraquecer gates.
5. Atualizar documentos e PR próprio, revisão independente quando disponível; sem aprovação humana simulada, merge ou deploy.

## Integração e handoff exato

Trabalhar na branch existente derivada dos guards. Diff exclusivo: `git diff 07755822f5dc75fe2be1d924005d30ed99f64a0b...HEAD`; acumulado inicial: `git diff 9b8595d232842d401ce81bbc92c54dd543aa2829...HEAD`. Recalcular a base de development antes da integração futura. PR final sempre para development, mantendo dependência #45 explícita.

Nenhuma necessidade de aguardar implementação de B/C. Mudança necessária em contrato compartilhado deve ser proposta com hunks e testes ao coordenador, sem absorver suas branches. Guards devem integrar primeiro em autorização posterior; squash/rebase requer transportar apenas commits exclusivos após a base dos guards e revalidar o diff. Não executar essa integração agora.

## Riscos e pontos de parada

Sobreposição da barra mobile, foco perdido, rotas reais alteradas e concorrência em layout são riscos focais. Conflito não resolvível para somente o arquivo afetado. Sem merge/deploy/main/development/provedores, REV-01–REV-03 ou ciência. Testes/aceite final pendentes em [implementation-evidence.md](implementation-evidence.md).
