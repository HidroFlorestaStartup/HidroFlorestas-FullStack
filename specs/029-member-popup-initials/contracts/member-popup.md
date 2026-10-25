# Contrato de apresentação — membros no popup geral

Origem: [spec.md](../spec.md), spec002 FR-015 e C1 C02. Classificação: `RECOMENDACAO` de implementação local autorizada.

- Entrada: `LaboratoryDetailsDto.members` já validado pelo parser atual.
- Saída por item: avatar circular neutro com `member.initials.trim() || "?"`, decorativo (`aria-hidden=true`), seguido de `member.name.trim() || "Nome não informado"` em texto.
- Nenhum membro cria controle, target de foco ou pedido de imagem/rede.
- ul/li, ordem recebida, nomes repetidos e cardinalidade são preservados. Lista vazia produz zero itens.
- CSS da linha limita largura ao popup; nome pode quebrar em qualquer ponto para conteúdo sem espaços. Avatar não encolhe. Lista longa usa a rolagem vertical existente do dialog.
- `SettingsDialog` preserva nome acessível, Tab/Shift+Tab, Escape e retorno de foco. Componente de gestão OWNER, controles destrutivos, autorização, carga e erro permanecem no contrato existente.
- Nenhum endpoint, schema, migration ou pacote novo faz parte deste contrato.
