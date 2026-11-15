# Decisões técnicas

- **Decisão**: Usar um SVG local do Instagram e um link HTML com nome textual.
  **Motivo**: A versão instalada de lucide-react não exporta Instagram. O SVG local dispensa pacote, requisição externa e rastreamento.
  **Alternativa**: Não adicionar pacote, embed ou logotipo externo.
- **Decisão**: Remover o parâmetro de compartilhamento do endereço do Instagram.
  **Motivo**: O caminho identifica o mesmo perfil; o texto visível é somente o @ solicitado.
- **Decisão**: Manter três colunas no desktop e as quebras responsivas existentes.
  **Motivo**: A remoção de Projeto não deve deixar uma coluna vazia.
- **Evidência**: Guias instalados do Next sobre CSS Modules e fronteira servidor/cliente consultados; conteúdo estático não precisa de novo Client Component. Sem dúvidas materiais pendentes.
