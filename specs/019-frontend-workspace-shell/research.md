# Pesquisa — workspace e shell
Classificação: EVIDENCIA_IMPLEMENTACAO para código observado; RECOMENDACAO para desenho local, autorizado pelo pedido/handoff.

## Composição
Escolha: ApplicationShell compartilhado pelos dois layouts, com TopBar/Sidebar existentes, CSS Module local e alvo de skip link em div. Justificativa: manter páginas com main próprio e evitar duplicação. Alternativas: copiar TanStack/AppShell (rejeitado: arquitetura/mocks), redesenhar todas as páginas (fora do escopo), repetir chrome em cada layout (duplicação).

## Autoridade e sessão
Escolha: canAdmin do requireAuth no servidor; contexto continua getLaboratoryContext/authorizeLaboratoryAccess, Membros somente OWNER. Public user não contém papel; PublicLaboratoryDto só isOwner. Não derivar papel de nome, persona ou mock. AuthSessionRestorer preservado no pai privado.
Alternativa rejeitada: ler suposto role do AuthContext ou tornar ADMIN global dono contextual.

## Foco e risco
Observado: modal atual tem role/aria-modal sem foco inicial/trap/Escape/restauração; erros fora dele. RECOMENDACAO: provar RED e usar dialog nativo, erro interno, cancel guard durante busy, restauração ao acionador ou título existente após mutação. Disclosure móvel não é modal: Tab natural, Escape/fechamento/restauração, links fechados inertes.
Não usar form method=dialog nas ações. Preservar nome exato/payloads/servidor. Corrigir travas síncronas somente se RED demonstrar duplicação.

## Consumidores/testes
Pesquisa independente somente leitura confirmou matriz em contracts/ui-contracts.md e armadilhas: um único main, um Sair visível, saudação exata, li/headings/link ACESSAR LABORATÓRIO. Exclusão de conta móvel precisa abrir o novo menu antes do link; manter integralmente assertions de revogação/segurança. Não trocar seletores por first() para esconder duplicação.
Fixtures reais AREA301–304 e auth001–004, cleanup exato; laboratórios extras usam prefixo do cleanup existente. Evitar helper global que cria54 usuários sem teardown próprio. Roles sintéticos no banco permitido do harness, nunca permissões mock de apresentação.

## Guias e evidência
Next instalado16.3.8: CSS Modules, Server/Client Components, Linking and Navigating e Layouts consultados. Starter oficial workspace.tsx/AppShell.tsx lidos por git show cbb954a. Referência apenas de hierarquia/espaçamento/cor/cartões/navegação, sem métricas ou funcionalidades novas. Pesquisa sem desconhecidos materiais remanescentes.
