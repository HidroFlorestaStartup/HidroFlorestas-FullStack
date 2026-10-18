# Spec 017 — Login com visual incorporado e autenticação real

Data: 2026-10-18. Estado: IMPLEMENTAÇÃO VALIDADA LOCALMENTE; publicação/CI e aceite humano pendentes.
Branch prevista: `feat/frontend-login`, derivada de `development/e17f64a1a9d8bdf48edd9ca1bc9443e118a41bc8`.

## Origem e autoridade

FATO_DOCUMENTADO (origem: spec do pacote recebido): o material relata autorização anterior, após avaliação do handoff de Pedro, para prosseguir com plan→execute→review. A autorização atual verificável está registrada abaixo. O recorte permanece somente o login real, com ajustes focais de Preview/CI antes de publicar, sem merge em development/main ou serviços reais.

Referências: prompt-de-execucao.md e plano-de-incorporacao.md em `docs/preparacao-frontend-20261018` (95463d5b0a29d75e916d2115765792444438db44); origem visual `HidroFlorestaStartup/hidroflorestas-frontend-starter`, main cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f. Sua apresentação é referência; mocks, contas demonstrativas e políticas de navegação não são requisitos do produto.

Rastreabilidade: preserva `CF-PRD-FR-001` e `CF-UC-002` do PRD Code-First (em revisão), o acesso autenticado da Spec 001 e os fluxos da Spec 012; não redefine seus contratos.

DECISAO_CONFIRMADA (origem: prompt anexado e pedido de execução do usuário em 2026-10-18): executar esta candidata em `feat/frontend-login`, publicar PR para `development` e solicitar revisão, preservando a worktree da RC. Essa autorização atual não depende de reproduzir a conversa histórica citada acima.

## Histórias e requisitos

**US1 (P1) — Entrar com as credenciais reais.** A pessoa acessa o cartão de login adaptado, informa email/senha e recebe o resultado do `useAuth().signIn` existente.

Aceite independente: credenciais válidas levam ao destino autorizado pelo servidor; inválidas, conta inelegível e falha de rede exibem mensagem sem liberar acesso. Enter envia uma única tentativa; Tab/Shift+Tab alcançam campos, visibilidade da senha e links reais.

- FR-001: manter `useAuth().signIn({email,password})`, sem transformar a senha enviada, sem chamada paralela a outro endpoint, sessão demonstrativa, armazenamento de credenciais ou navegação inventada. `auth.context.tsx` e backend permanecem byte a byte inalterados.
- FR-002: conservar a validação atual de campos vazios, mensagens retornadas pelo contexto, erro anunciado, loading e recusa de envio duplicado. Credenciais não podem aparecer nos logs/capturas.
- FR-003: manter links `/register` e `/forgot-password`, mostrar/ocultar senha, autocomplete email/current-password e uso por teclado.

**US2 (P1) — Usar em dispositivo móvel ou conexão lenta.**

Aceite independente: em 375/768/1440px e reflow320/texto200% todos os controles permanecem legíveis e sem overflow horizontal. Com scripts atrasados os campos não aceitam interação; após hidratação o primeiro preenchimento permanece.

- FR-004: layout responsivo em 375/768/1440px e reflow em 320px, com zoom/texto ampliado; preservar a logo oficial e Poppins já carregada no root, sem dependência ou fonte nova.
- FR-005: inputs e ações locais ficam desabilitados no SSR e na primeira hidratação, pelo padrão `useSyncExternalStore` já adotado no projeto. Nenhum envio é permitido antes da montagem funcional.
- FR-006: foco visível, labels associados, erros por role=alert, estado de senha anunciado, controles de toque de pelo menos 44px e animação reduzida no recorte. Isso não representa certificação WCAG integral.

**US3 (P2) — Revisar e publicar sem efeitos produtivos.**

Aceite independente: a branch publicada contém o bloqueio de Preview e gera job de validação executado no SHA exato; nenhuma tela fora do login muda de estilo.

- FR-007: CSS Module restrito a login; não modificar globals.css/layout raiz, marca/copy institucional global ou outras telas. Preservar o texto de produto “FAÇA SEU LOGIN” e os links reais, como diferenças intencionais em relação ao starter. Não copiar o cabeçalho com links `#` nem o painel demonstrativo.
- FR-008: antes do primeiro push, `vercel.json` deve conter somente a nova exclusão `feat/frontend-login: false`, preservando todas as anteriores. Publicar apenas a branch de incorporação; nenhuma operação no provedor.
- FR-009: estender o workflow de RC existente somente para push/dispatch em `feat/frontend-login`, mantendo runners, guards, Actions fixadas, permissões e branches anteriores. O check do PR será o check do seu HEAD por push; isso não institui CI global de development nem substitui revisão de merge.

## Critérios de aceite

SC-001: testes existentes comprovam login ACTIVE, conta bloqueada/credenciais inválidas, destino verify-email, cookie HttpOnly e HTTPS no código novo.
SC-002: testes da nova interface comprovam campo/senha/erro, preservação do payload, recusa de duplicidade e hidratação lenta; respostas interceptadas testam somente UI, não autenticação real.
SC-003: capturas reais do Next antes/depois nas três larguras e reflow sem overflow; revisão humana de composição/copy/contraste.
SC-004: typecheck/lint/build padrão e testes pertinentes PASS com Node24, lockfile existente e harness sintético; falhas/não executados explícitos.
SC-005: branch e PR publicados, sem merge/deploy. Somente o mantenedor aprova a integração.

Fora: telas seguintes, alterações de auth/backend/schema/dependências, migrações remotas, Cloudinary/Gmail reais, regras científicas, descarte de trabalho local e autoaprovação.
