# Plano: proposta da startup na landing

**Branch**: codex/landing-proposta-startup | **Data**: 2026-11-14 | **Spec**: [spec.md](spec.md)

## Resumo

Revisar somente apresentação pública: textos institucionais e ordem das seções, painel IHFR ilustrativo junto da plataforma, ODS e contato. Preservar mascote e equipe por bytes. Base limpa 2e51c40, isolada do worktree anterior.

## Contexto técnico

TypeScript/React 19.2.4, Next 16.3.8 e CSS Modules existentes. Ícones Lucide já instalados. Server Component da landing mantido; nenhum novo estado cliente, fetch, biblioteca, banco ou mídia. Build/TypeScript/lint e suíte existente da landing, mais inspeção visual. Componentes autenticados preservados e regressão de apresentação existente reutilizada.

## Constituição

PASS antes e depois do desenho: decisão atual de Pedro governa o texto público; fórmulas, contratos e qualificadores da UI interna permanecem vigentes. Uma feature/branch; alterações em page.tsx, landing.module.css, teste afetado e specs/039. Nenhuma decisão científica nova, integração de IA, acesso de banco ou publicação de produção.

## Estrutura e etapas

1. Consolidar decisões em specs/039-landing-proposta-startup/ e verificar o estado Git.
2. Atualizar src/app/page.tsx e estilos locais src/app/landing.module.css.
3. Atualizar as expectativas antigas de tests/e2e/frontend-landing.spec.ts para a composição aprovada, preservando os testes de teclado, legibilidade e navegação.
4. Build, lint e TypeScript; navegador público real de produção local em 320/375/768/960/1440 px, texto a 200%, sem JavaScript e movimento reduzido; verificar invariância da equipe e da UI interna.
5. Registrar resultados/limites em validation.md e preparar commit/PR para revisão. Merge e produção aguardam pedido próprio.

## Decisões de composição

Paleta verde/ocre, Poppins, espaços e bordas atuais. Título completo da versão 1 com escala local ajustável; nenhum corte ou quebra dentro de palavras. A informação implementada da plataforma fica separada das propostas de kit/SBN e da integração futura com IA. O painel apresenta categorias de registros reais, sem reproduzir classificações de risco ou manejo que não existem hoje. Alcance social descrito como proposta/público potencial.
