# Plano: landing e consolidação visual

**Branch**: `feat/frontend-landing-consolidation` | **Data**: 2026-10-21 | **Spec**: [spec.md](spec.md)

## Resumo

Consolidar a página pública com a marca e os recursos existentes, navegação válida, conteúdo científico qualificado e contexto institucional separado das funções disponíveis. Registrar a triagem focal dos históricos e preparar a candidata para regressão oficial.

## Contexto técnico

- TypeScript, React 19.2.4, Next 16.3.8, Node 24.19.0; versões lidas no lock/package instalado.
- Página Server Component, `next/link`, `next/image`, CSS Module local e ícones já instalados. Sem dependência adicional ou estado persistido.
- Alvo: navegador desktop/mobile, 320/375/768/1440 px, paisagem e texto 200%.
- Testes: Playwright da aplicação para links, semântica, reflow e capturas; lint/typecheck locais; 15 gates oficiais Windows no HEAD publicado. Nenhum runner ou limite será relaxado.
- Proteção: acrescentar exatamente a branch desta feature e `release/frontend-rc-20261021` aos allowlists existentes de CI e aos `deploymentEnabled: false`, antes de sua primeira publicação.
- Evidências públicas em `.accounts-validation/frontend-landing/`, com geometria e cenário sanitizados; não guardar sessão, dados privados ou arquivos de ambiente.

## Verificação da constituição

Antes e após o desenho: conforme I–VII. Fontes distinguidas, entrega por spec/branch, docs/raw intocados, zero mudança de domínio/science/auth, trilha de evidências e trabalho isolado dos três agentes C1. Copy é candidata para aceite institucional. Nenhuma exceção de constituição necessária.

## Estrutura e decisões

- `src/app/page.tsx`: página pública com metadados, navegação, jornadas reais, limites IHFR, contexto institucional/equipe/contato.
- `src/app/landing.module.css`: composição e responsividade locais; sem alterar globals/layout compartilhados.
- `tests/e2e/frontend-landing.spec.ts`: cenários públicos reais e helper sanitizado local.
- `.github/workflows/rc-review.yml` e `vercel.json`: allowlists restritos e preservação de evidência da fase 10.
- `docs/releases/2026-10-21-frontend-rc/`: estado reconciliado, triagem e critérios de integração/homologação.
- `specs/028-frontend-landing-consolidation/`: spec, plano, pesquisa, contratos de navegação, tarefas e resultados reais.

## Sequência

1. Especificar, executar setup-plan/setup-tasks, analisar consistência e requisitos.
2. Escrever o cenário de navegação/qualificação/reflow e comprovar a falha inicial pertinente quando o navegador local estiver disponível.
3. Implementar a landing; inspecionar em navegador real, sem presumir screenshot manual ou acesso a banco.
4. Validar código alterado e publicar branch protegida/PR; pedir revisão efetiva e aguardar o CI oficial.
5. Tratar falhas materiais e atualizar evidência do HEAD final.
6. Com C1 estável, compor candidata agregada em branch própria e executar o gate completo; merges em development/main e aceite institucional permanecem com as autoridades indicadas no plano conciliado.

## Riscos e limites

- `PENDENCIA_DE_DECISAO`: mantenedor/coordenação revisam copy institucional e recorte final do piloto.
- `EVIDENCIA_IMPLEMENTACAO`: consulta Vercel nesta execução devolveu 403 para o escopo do projeto. Não comprova ausência de deployments e não autoriza outro destino.
- Incidentes históricos inconclusivos não serão declarados resolvidos sem prova causal. Falha reproduzida na candidata recebe tratamento atual.
