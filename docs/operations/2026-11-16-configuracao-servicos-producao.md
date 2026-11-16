# Configuração dos serviços e congelamento para apresentação — 16/11/2026

## Escopo, origem e aprovação

`FATO_DOCUMENTADO`: este registro consolida o trabalho de configuração e
verificação realizado na sessão de 16/11/2026 para o repositório
`HidroFlorestaStartup/HidroFlorestas-FullStack`. Os fluxos já existiam no código;
as correções operacionais foram feitas nos serviços e ambientes correspondentes.
Este documento não implementa funcionalidades.

`DECISAO_CONFIRMADA`: após executar os testes, Pedro Vítor informou nesta
conversa: **“Tudo funcionando e aprovado!”**. Em seguida, autorizou uma branch
e/ou PR documental, determinou **“Não faça merge hoje”** e solicitou congelar o
estado para a apresentação de **17/11/2026**. Datas neste registro seguem o
horário de Fortaleza.

A autorização desta entrega limita-se a registrar o trabalho em uma branch
separada e abrir um PR para `development`, mantido como rascunho. Não autoriza
merge, atualização de `main`/`development`, novo deploy, mudança de configuração,
rotação de credenciais, alteração do agendamento ou operação no banco.
Não foi configurado merge automático nem agendamento de merge futuro.

## Referência do estado aprovado

`EVIDENCIA_IMPLEMENTACAO`: os heads remotos foram conferidos novamente ao
iniciar a publicação documental e permaneciam nos commits abaixo.

| Referência | Commit |
|---|---|
| `main` | `142cf879cd3ba0f022c1a687ce6c765f7da085c8` |
| `development`, base da branch documental | `0bfdd2634fb4fb8d92c36895b978314a324d996a` |

Os deploys abaixo foram conferidos como `READY` durante a configuração dos
serviços, antes deste pedido documental. Identificam o ponto operacional
aprovado; não representam novos deploys feitos para publicar este registro.

| Ambiente | Deploy conferido | Acesso |
|---|---|---|
| Production | `dpl_HKZsbseoYuzK5MTPRZhpgw6jMawq` | [Link principal](https://hidro-florestas.vercel.app/) |
| Preview da branch `development` | `dpl_6VuS5G1PHD94XjnViU6jqHWT72VF` | [Alias de development](https://hidro-florestas-git-development-hidrofloresta-8598.vercel.app/) |

O Preview de `development` conserva sua proteção de acesso. Credenciais,
cabeçalhos de acesso e configurações privadas não integram este documento.

## Resultado por serviço

| Serviço | Trabalho realizado na sessão | Evidência e estado ao final |
|---|---|---|
| Photon | Configurada a geocodificação reversa existente por meio de `HF_REVERSE_GEOCODER_URL` em Production, Preview e Development. | Requisição autenticada ao endpoint da aplicação retornou HTTP 200 e preencheu município, UF e CEP para a localização utilizada em Itapecuru-Mirim. Pedro confirmou o funcionamento. |
| Cloudinary | Corrigida a divergência entre o fingerprint do preset assinado existente e `CLOUDINARY_COVER_PRESET_SHA256`, em Production e Preview. Preset, credenciais e contrato de acesso privado foram preservados. | Fluxo real de envio, confirmação, metadados e leitura autenticada aprovado; Pedro posteriormente confirmou o funcionamento e aprovou o resultado. |
| Gmail SMTP | Corrigido `MAIL_FROM` para corresponder a `SMTP_USER`, conforme a validação já implementada. Credenciais SMTP e chaves existentes foram preservadas. A configuração foi aplicada em Production e Preview e incorporada aos deploys conferidos acima. | Diagnóstico executado na Vercel confirmou conexão e autenticação, sem enviar mensagem de teste. O recebimento real foi posteriormente confirmado pelo aceite de Pedro. |
| cron-job.org | Reutilizado o agendamento existente `8586345`, substituindo o destino antigo pelo endpoint de e-mails da aplicação principal. | Pedro executou o configurador no notebook; o histórico retornou duas execuções automáticas com HTTP 200. Agendamento ativo a cada minuto. |

As demais configurações existentes, incluindo banco Neon, autenticação e base
cartográfica OpenStreetMap, foram preservadas. Durante a análise anterior ao
congelamento, login, consulta de laboratórios e acesso a tile cartográfico
retornaram HTTP 200. Não houve mudança de schema ou migration nessa configuração.
Pedro informou que Production utiliza a branch **“universo IF”** do Neon;
essa associação é um relato do responsável, não uma nova auditoria da topologia
do banco realizada para esta publicação documental.

### Photon: resultado e limites do recorte

`EVIDENCIA_IMPLEMENTACAO`: o fluxo foi conferido pelo endpoint autenticado
`/api/geocoding/reverse` em Production e no Preview de `development`. O resultado
observado incluiu Itapecuru-Mirim, MA e o CEP correspondente à consulta utilizada.

O teste comprova a consulta exercitada. A cobertura dos dados do provedor e a
disponibilidade de endereço/CEP para outras coordenadas não foram auditadas por
esse teste. O tratamento de ausência de resultados permanece o já implementado.

### Cloudinary: correção e teste real

`EVIDENCIA_IMPLEMENTACAO`: o preset existente foi consultado e aceito pelo
validador da aplicação. A configuração esperada de fingerprint estava divergente;
a correção atualizou somente a referência de hash, sem alterar o preset, torná-lo
unsigned ou publicar credenciais.

O teste utilizou uma imagem de capa já aprovada para a demonstração e percorreu:

1. Início da tentativa pela API da aplicação: HTTP 200.
2. Upload assinado para o provedor: HTTP 200.
3. Confirmação da capa pela aplicação: HTTP 200.
4. Consulta de metadados e leitura do conteúdo privado: HTTP 200.
5. Leitura também conferida no Preview de `development`.

A aplicação entregou o conteúdo final em WebP sanitizado. Ao encerrar o teste,
somente a capa criada nessa verificação foi removida pelo fluxo normal da
aplicação, com HTTP 204, restabelecendo o fallback de demonstração que já existia.
Os controles de selecionar, enviar e recarregar capa permaneceram disponíveis.

O teste técnico completo foi feito pelas APIs reais; não equivale a uma nova
rodada automatizada de todos os controles da interface. O aceite posterior de
Pedro registra a confirmação do funcionamento no uso da plataforma.

**Limite preservado:** o acionamento periódico da limpeza de imagens não foi
ativado nesta frente. A geração normal de trabalhos de limpeza não comprova sua
execução no provedor. Essa pendência fica registrada para análise futura, sem
mudança adicional antes da apresentação. O agendamento de e-mails descrito abaixo
não executa a limpeza do Cloudinary.

### E-mails: remetente, fila e processamento automático

`EVIDENCIA_IMPLEMENTACAO`: a configuração inicial falhava na regra já existente
que exige correspondência entre `MAIL_FROM` e `SMTP_USER`. Após a correção,
`npm run mail:verify` foi executado em um build diagnóstico isolado na Vercel e
retornou:

```text
SMTP connection/authentication verified; no message sent.
```

Esse diagnóstico não enviou mensagem. Os deploys finais de Production e
`development` usaram o comando normal de build; a configuração global do comando
de build foi preservada. A origem pública da aplicação foi alinhada por ambiente,
mantendo o alias próprio de `development` para os fluxos desse Preview.

Antes de acionar manualmente o processamento em Production, a consulta agregada
da fila indicava duas mensagens pendentes já vencidas e nenhuma elegível para
envio. O endpoint retornou HTTP 200 com o seguinte resultado resumido:

| Contador | Resultado |
|---|---|
| Mensagens aceitas para envio nessa chamada | 0 |
| Mensagens vencidas encerradas pelo fluxo normal | 2 |
| Mensagens pendentes ao final | 0 |

Essa chamada não enviou mensagens antigas. Não foi feita edição direta de dados
para contornar a validade das mensagens.

O agendador antigo apontava para outro deploy, que deixou de atender esse fluxo.
O worker já existe na aplicação atual; não foi necessário criar um servidor ou
projeto Vercel separado para o cron.

| Item | Configuração operacional conferida |
|---|---|
| Serviço de agendamento | cron-job.org |
| Identificador reutilizado | `8586345` |
| Destino atual | `https://hidro-florestas.vercel.app/api/internal/mail/process` |
| Frequência | Uma execução por minuto |
| Requisição | GET, sem parâmetros de consulta e sem corpo |
| Autenticação | Bearer com `MAIL_WORKER_SECRET`; valor omitido |
| Histórico | Duas execuções automáticas com HTTP 200, posteriores à ativação |

`FATO_DOCUMENTADO`: Pedro executou o configurador local com as variáveis de
Production fornecidas pelo Vercel CLI e informou o resultado no terminal:

```text
Agendamento 8586345 ativado: uma execução por minuto.
Concluído: duas execuções automáticas confirmadas com HTTP 200.
```

A chave administrativa do cron-job.org foi informada de forma oculta no terminal
e não foi incluída no chat ou neste PR. O configurador conferiu o agendamento
desativado antes de ativá-lo e aguardou o histórico das chamadas automáticas.
Seu código não é adicionado a este PR, que permanece exclusivamente documental.

`DECISAO_CONFIRMADA`: após a orientação de testar a entrega pela recuperação de
senha de uma conta com caixa de e-mail real, Pedro informou **“Tudo funcionando
e aprovado!”**. Essa é a origem do aceite de recebimento. Não foram coletados
código de confirmação, senha, destinatário ou conteúdo de caixa de entrada para
publicação. O aceite não representa teste individual de todos os modelos de
mensagem nem garantia de disponibilidade permanente dos provedores.

## Rastreabilidade técnica

As referências abaixo apontam para a implementação e os procedimentos já
existentes. Nenhum desses arquivos é alterado por esta entrega.

- [Endpoint de geocodificação reversa](../../src/app/api/geocoding/reverse/route.ts).
- [Integração Cloudinary](../../src/app/api/server/images/cloudinary.ts) e
  [operação de capas](area-covers-runbook.md).
- [Validação de configuração SMTP](../../src/app/api/server/mail/config.ts),
  [diagnóstico SMTP](../../scripts/mail-verify.ts) e
  [operação de e-mails](mail-runbook.md).
- [Endpoint do worker de e-mails](../../src/app/api/internal/mail/process/route.ts)
  e [autorização do acionamento](../../src/app/api/server/mail/trigger.ts).
- [Procedimento histórico de homologação de contas](account-homologation-runbook.md).

Menções a operação pendente nos procedimentos históricos conservam seu contexto
e data. Este adendo registra somente o recorte operacional verificado e aprovado
em 16/11/2026; não reclassifica todas as auditorias, gates ou homologações antigas.

## Entrega documental e preservação do estado

- Apenas este arquivo Markdown é acrescentado na branch documental.
- Código, estilos, imagens, scripts, testes, dependências, workflows,
  `vercel.json`, schema e migrations são preservados.
- Não há nova alteração de variáveis, credenciais, banco ou agendamento nesta
  publicação; as configurações anteriores aprovadas continuam em uso.
- O PR fica em rascunho para consulta e decisão futura de Pedro, sem merge.
- O congelamento não desliga o site nem interrompe o processamento de e-mails
  já aprovado; impede novas mudanças pela presente tarefa.

As verificações desta entrega são documentais: escopo do diff, links locais,
ausência de valores sensíveis e comparação dos commits das branches principais.
As evidências funcionais acima pertencem ao trabalho anterior desta sessão e ao
aceite humano informado; não são apresentadas como testes reexecutados agora.
