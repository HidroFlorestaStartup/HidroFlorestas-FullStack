# Research: Áreas e capa
## Sources and Authority
FATO_DOCUMENTADO: missão atual autoriza fases4/5 e estabelece restrições; handoff docs/handoff-frontend-fases-4-5@4144e12 incorpora adendo móvel. Starter oficialcbb954a somente leitura. Spec003 e Spec016 descrevem contratos integrados; Code-First fornece rastreabilidade EM_REVISAO.
EVIDENCIA_IMPLEMENTACAO: inspeção de area-list/form/form-state/map/client/map-config/cover, detalheSSR, DTOs, images/contracts.ts/service/http, OpenAPI003 e testes de áreas/capas.

## Decisions Within the Authorized UI Scope
RECOMENDACAO: CSS Module local compartilhado apenas por áreas/capa, superfícies20px, verde/azul/ochre da fase4, inputs/ações44px, grid minmax0 e foco visível. Alternativa de alterar globals/dependências rejeitada pelo escopo.
RECOMENDACAO: preservar reducer do ponto, refs/lock/locate/timeout10s e guardsSSR; somente apresentação. Não copiar geocoding/parser/mocks/Router do starter.
RECOMENDACAO: detalhe omite opcionais ausentes como comportamento atual; não copiar placeholder informativo diferente do starter.
RECOMENDACAO: Image unoptimized continua necessário para leitura same-origin autenticada; otimização não encaminha headers, conforme guia Next instalado. Map dynamic ssr:false permanece na fronteira client e OSM/atribuição/config são preservados.

## Unknowns Resolved by Evidence or Tests
Matriz8 é alcançável: canEdit de contexto ativo OWNER/ADMIN ou MEMBER/readOnly, flag independente e hasImage persistido inclusive com flagoff; ausência pode ter revision>0 após remoção.
Projeção da lista contém cover{revision,hasImage,featureEnabled}; detalhe de área não exige cover e editor obtém CoverDto real incluindo canEdit.
Candidato por inspeção: upload confirma metadados e anuncia Capa salva antes de onLoad; reload já usa tentativa local. Teste com bytes novos retidos decidirá se há RED funcional; não alterar backend para ajustar mensagem.
Fakes oficiais são para transporte/provedor no teste, com canEdit originado no GET real, sem privilégio fictício. Operação remota e homologação de provedor fora da missão.
Nenhuma NEEDS CLARIFICATION material: os limites atuais bastam ao recorte visual.

Candidatos adicionais por inspeção, ainda não defeitos demonstrados: reload de metadados troca incondicionalmente a chave/ticket e pending não guarda expectedRevision original; uma resposta incerta seguida de reload pode alterar tentativa ou comando. Testar primeiro. Separar invalidação do status local de preview da tentativa de upload. EXPIRED e STALE_REVISION autoritativos são distintos de perda de resposta; nova seleção, envio confirmado e remoção conservam os resets explícitos atuais.
Candidato de evento anterior testável sem imagem desmontada: preview de reload ainda montado, bytes retidos, nova seleção ou upload pendente, depois liberação real dos bytes. O onLoad anterior não pode sobrescrever a mensagem da operação atual. Não usar callback artificial nem hook de produção.

Revisão de domínio independente (somente leitura, antes do PLAN): código de conflito é STALE_REVISION; IN_PROGRESS/UNAVAILABLE/rede/JSON incerto não autorizam trocar tentativa. Replay compatível antecede revisão atual no servidor. Confirm replay devolve DTO atual, inclusive ausência com revisão positiva após remoção posterior: não aguardar onLoad impossível, nem negar persistência já confirmada. Remoção cancelada conserva tentativa. Fontes Spec016 FR005/007/010–014 e images/service.ts eligibleUpload/confirm/remove. 'Capa salva' e conteúdo pronto são fatos distintos; mensagem intermediária registra confirmação e carregamento sem falso sucesso de visualização.
