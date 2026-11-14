# Especificação: proposta da startup na landing

**Branch**: `codex/landing-proposta-startup`
**Data**: 2026-11-14
**Estado**: implementado e validado para revisão visual
**Entrada**: indicações de Pedro nesta conversa de 14/11/2026, versões 0 (atual) e 1 (legada), e três capturas de referência.

## Fontes e decisões

- `DECISAO_CONFIRMADA`: Pedro autorizou conciliar as duas versões e executar a revisão somente da landing, mantendo a identidade visual da versão 0, o mascote e a equipe.
- `DECISAO_CONFIRMADA`: manter o rótulo inicial, aproveitar o título da versão 1 se couber, reformular a descrição sem anunciar IA disponível, inserir o Paradoxo Hídrico, unir projeto e soluções, depois plataforma, impacto/ODS, equipe e footer.
- `DECISAO_CONFIRMADA`: preservar literalmente os dois parágrafos sobre o projeto e a frase do kit; retirar a seção de limites científicos da landing e as referências públicas a IHFR experimental. A apresentação interna do diagnóstico permanece vigente.
- `DECISAO_CONFIRMADA`: footer com a descrição da startup e contato hidrofloresta@gmail.com.
- `RECOMENDACAO`: painel territorial ao lado do fluxo da plataforma no desktop e abaixo dele no mobile; conteúdo ilustrativo sem classes de risco ou recomendações inventadas. IA identificada como integração futura.
- `EVIDENCIA_IMPLEMENTACAO`: base development `2e51c40cf87e71780724473484f63afcafd7cc22`, mesma árvore da main `b21d43e`; referências legadas em PedroVitor237/HidroFlorestas, src/app/page.tsx, e https://hidro-florestas.vercel.app/ consultadas em 14/11.
- O texto legado orienta a redação institucional; não prova capacidades disponíveis nem impacto já realizado. As quantidades de comunidades/público são apresentadas como alcance proposto, não atendimento concluído.

## Cenários e testes

### US1 — Entender a proposta (P1)

Visitantes entendem o desafio hídrico e as frentes da startup antes de conhecer o fluxo operacional.

**Teste independente**: ler abertura, desafio e projeto em sequência e distinguir plataforma atual de propostas de pesquisa.

1. A abertura mantém o rótulo e o mascote, com título sobre segurança hídrica/restauração e descrição sem IA atual.
2. Paradoxo, projeto/soluções e plataforma seguem nessa ordem, com os dois parágrafos aprovados preservados.
3. Kit, restauração e IA futura usam linguagem de proposta/pesquisa, sem alegar satélites, recomendações automáticas ou serviços inexistentes.

### US2 — Conhecer a plataforma e o território (P1)

Visitantes encontram o fluxo de áreas/coletas/IHFR e um painel territorial compatível com essa apresentação.

**Teste independente**: conferir os três passos e o painel, incluindo os links de Login/cadastro.

1. O terceiro passo é Consulte o IHFR e explica resultado, medições e histórico.
2. O painel é ilustrativo e a camada assistiva de IA é explicitamente futura.
3. A landing não contém a antiga seção Ciência em desenvolvimento ou avisos de validação científica; a UI autenticada e seus qualificadores permanecem inalterados.

### US3 — Conhecer impacto, equipe e contato (P2)

Visitantes identificam o público proposto, os ODS 6/13/15/10, os mesmos 11 integrantes e o novo contato.

**Teste independente**: navegar por âncoras e mailto em desktop e mobile, com texto ampliado.

1. ODS aparecem depois da plataforma, seguidos pela equipe da versão 0 sem mudanças.
2. Footer contém a descrição solicitada e o mailto correto.

### Casos de borda

- Telas de 320 px e texto a 200% sem overflow ou fragmentação de palavras.
- Sem JavaScript ou com movimento reduzido, o poster do mascote e os links continuam utilizáveis.
- Toda âncora do menu corresponde a uma seção existente; um único título principal.

## Requisitos funcionais

- **FR-001**: preservar identidade visual, mascote, rótulo inicial e ações de acesso.
- **FR-002**: apresentar abertura → Paradoxo → projeto/soluções → plataforma/painel → impacto/ODS → equipe → footer.
- **FR-003**: manter literalmente os dois parágrafos institucionais aprovados e Proposta de kit simplificado para apoiar o trabalho de coleta.
- **FR-004**: descrever iniciativas futuras como propostas e IA apenas como integração futura.
- **FR-005**: retirar a seção científica da landing sem alterar diagnósticos, fórmulas ou textos internos.
- **FR-006**: preservar todos os nomes, grupos, ordem e aparência da equipe.
- **FR-007**: atualizar footer e contato; manter navegação e legibilidade responsivas.

## Critérios de sucesso

- **SC-001**: sete blocos principais na ordem aprovada, sem âncoras inválidas.
- **SC-002**: 11 integrantes e quatro ODS identificáveis, com conteúdo institucional aprovado preservado.
- **SC-003**: página legível a 320/375/768/960/1440 px e texto a 200%, com teclado e sem rolagem horizontal.
- **SC-004**: Login/cadastro mantêm seus destinos e contato abre o endereço solicitado.

## Premissas

- Dados de alcance da versão 1 são objetivos do projeto; não comprovação de beneficiários atendidos.
- O painel é apresentação visual, sem dados pessoais, cálculo ou consulta nova.
- Esta entrega não autoriza merge em main/development ou promoção de produção.

## Revisão após primeira prévia — 14/11/2026

`DECISAO_CONFIRMADA`: Pedro aprovou a seção Nossa solução e o posicionamento do painel, solicitando três ajustes: textos de O desafio exatamente iguais à versão 1; parágrafos institucionais abaixo dos cards; nome e redação do painel mais coerentes, com maior reaproveitamento da referência 1 e nova redação da IA sem está prevista.

- **FR-008**: preservar literalmente título/subtítulo, três títulos e três descrições de O desafio da versão 1, normalizando somente espaços do JSX.
- **FR-009**: preservar os dois parágrafos institucionais por texto e posicioná-los após os três cards de soluções, antes do link da equipe.
- **FR-010**: apresentar o painel como conexão entre diagnóstico e frentes do projeto, sem sugerir índice calculado. Reutilizar salinização/recarga, SAFs/florestas de infiltração/manejo regenerativo e ciclo hidrológico/resiliência. IA continua explicitamente futura, com redação direta.

`RECOMENDACAO`: título Do diagnóstico à restauração, rótulos Conexão com o território e Frentes do projeto, uma introdução conectando IHFR/registros aos objetivos e três descrições completas. Substitui a apresentação anterior de palavras soltas e Visão ilustrativa. O painel permanece no local aprovado.
