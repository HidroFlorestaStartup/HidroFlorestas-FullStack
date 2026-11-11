# Plano de implementação: mascote animado no herói

**Branch**: `codex/landing-mascote-animado` | **Data**: 2026-11-11 | **Spec**: [spec.md](spec.md)

## Resumo

Substituir a árvore do herói por Hifro animado, usando uma versão curta e transparente do vídeo fornecido e um quadro estático de fallback. Manter a landing pública como Server Component; isolar o controle de reprodução em um componente cliente pequeno.

## Contexto técnico

- **Linguagem/versão**: TypeScript, React 19.2.4, Next.js 16.3.8.
- **Dependências**: bibliotecas já instaladas; nenhuma dependência de runtime nova.
- **Armazenamento**: mídia estática em `public/media/` e poster em `src/assets/lading-page/`; alternativa MP4 para WebKit.
- **Testes**: inspeção de mídia, lint/typecheck/build e verificação visual em navegador quando disponível.
- **Meta de desempenho**: arquivo servido ao navegador menor que 2 MiB; sem download do original de 141 MB; reprodução apenas quando visível, permitida e com aba ativa.
- **Escopo**: herói de `/`, sem alteração de rotas, schema, API ou demais seções.

## Checagem da constituição

- Hierarquia: pedido atual governa a troca visual; código e spec 028 informam o baseline. Não há promoção de intenção científica.
- Entrega vertical: um componente, estilos locais e mídia derivada.
- Rastreabilidade: FR-001–005 desta spec; a landing anterior permanece referida em spec 028.
- Segurança e documentação: sem dados privados ou novas integrações; vídeo fornecido permanece fora do Git e somente a derivação otimizada é versionável.

## Estrutura

```text
src/app/page.tsx
src/app/mascot-animation.tsx
src/app/landing.module.css
src/assets/lading-page/hifro-mascote-poster.webp
public/media/hifro-mascote-hero.webm
public/media/hifro-mascote-hero-fallback.mp4
specs/035-landing-mascote-animado/
```

## Etapas e validação

1. Criar branch sobre `origin/development` e preservar os dois arquivos não rastreados preexistentes.
2. Inspecionar a mídia, selecionar um ciclo curto com saudação, recortar margens transparentes e reduzir a resolução mantendo alfa.
3. Integrar poster e vídeo sem controles; carregar só quando permitido e visível; pausar fora de vista/aba.
4. Verificar dimensões, transparência, tamanho, ausência de áudio, lint, typecheck, build e comportamento visual.

## Riscos e limites

- `EVIDENCIA_IMPLEMENTACAO`: WebKit local reproduziu VP9 sem alfa, exibindo preto. A alternativa MP4 usa fundo igual ao cartão; a imagem estática cobre erro ou ausência de suporte. Teste em Safari físico não está incluído nesta execução.
- A redução de cinco minutos para um ciclo curto é uma escolha de desempenho. O original permanece intacto em Downloads.
- Não há publicação remota, deployment nem aceite de UX nesta etapa.

## Teste atual com fundo — 2026-11-11

O pedido posterior do usuário seleciona temporariamente um novo MP4 com fundo. O arquivo horizontal original fica intacto em Downloads. O herói usa um recorte central de 1280×1536, reduzido para 960×1152, e um poster WebP da mesma cena. O componente mantém carregamento condicional, pausa e fallback. Os derivados transparentes anteriores permanecem em seus caminhos para reversão; não há nova dependência.

## Equipe e competências — 2026-11-11

O pedido posterior amplia somente a seção `#equipe` da landing. A imagem fornecida orienta nomes, grupos e descrições; a composição segue a grade, cores, tipografia e separadores da página. Desenvolvimento ocupa a largura da grade; ciência e dados dividem a linha seguinte e se empilham em telas pequenas. Nenhum vínculo institucional ou título pessoal adicional é atribuído.

**Revisão de ordem e grade**: pedido seguinte do usuário determina científica primeiro, desenvolvimento segundo e plataforma terceiro. A grade atual usa três colunas iguais no desktop e uma coluna abaixo de 960 px; o primeiro grupo recebe borda e título verdes para destaque. A composição anterior permanece registrada acima como histórico.
