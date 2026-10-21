# Pesquisa e decisões técnicas

## Fontes consultadas

- Página pública e assets em development: há marca e ilustração próprias, rotas `/login` e `/register`, equipe/apoio/edital/contato; a página contém âncoras ausentes e demonstrações sem ligação a resultados reais.
- Starter visual no SHA registrado na spec: organização por laboratório e três etapas claras; não transportar mocks, componentes TanStack ou dependências.
- Documentação instalada de Next: `01-app/01-getting-started/11-css.md`, `12-images.md`, `14-metadata-and-og-images.md`, `01-app/03-api-reference/02-components/link.md`. CSS Module isola a página; metadados ficam no Server Component; imagem estática preserva dimensões e links usam rotas existentes.
- Handoff fase 10 e ADR-0001: copy institucional exige revisão e as quatro qualificações científicas são obrigatórias.
- Helper de evidência existente cobre apenas collections/environmental. Esta feature usa captura própria pública com o mesmo princípio de viewport e arquivo durável, sem ampliar por regex genérica o upload de artefatos.

## Escolhas

`RECOMENDACAO`: composição clara com logo autêntico, fundo neutro, texto escuro, acentos de verde/ocre e ilustração já existente. Remover diagnósticos fictícios, números de impacto sem fonte e promessas de LLM/integração geológica não implementada. Preservar informações institucionais já presentes, indicando objetivos do projeto como objetivos.

`EVIDENCIA_IMPLEMENTACAO`: não há necessidade de nova API, alteração do IHFR, dependência, migration ou configuração de autenticação. Nenhuma incerteza técnica impede a implementação candidata.
