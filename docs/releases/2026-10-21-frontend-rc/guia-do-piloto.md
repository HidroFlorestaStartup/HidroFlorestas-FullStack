# Guia do piloto — HidroFlorestas

**CANDIDATA EM PREPARAÇÃO.** Este guia descreve os fluxos existentes na interface revisada. Ele não anuncia uma versão publicada, um ambiente homologado ou convites já enviados.

## Controle de entrega — uso interno do handoff

Completar este bloco com evidência antes de distribuir o guia. A referência de código usada na preparação é `499e669d4afe0d79a0fd0fdc73f687917c7d3f6d`; ela não é uma declaração de SHA publicado. Manter os recibos de publicação e homologação no [handoff operacional](homologacao-e-entrega.md).

| Campo interno | Estado desta preparação |
|---|---|
| Versão e SHA final efetivamente publicados | **PENDENTE** |
| URL de acesso confirmada, deployment e smoke por jornada | **PENDENTE**; não substituir automaticamente pela URL histórica |
| Participantes autorizados, laboratório e dados previstos para o piloto | **PENDENTE**; manter lista de pessoas em canal privado |
| Canal de suporte e responsável pelo acompanhamento | **PENDENTE** |
| Canal/formulário de feedback e responsável pelo recebimento | **PENDENTE**; formulário histórico ainda não revalidado |
| Disponibilidade de capas no ambiente | **PENDENTE**; este guia não declara Cloudinary habilitado ou homologado |
| Homologações operacionais e aceites humanos | **PENDENTE**; consultar os registros próprios, sem inferir aceite a partir deste roteiro |

As instruções abaixo serão usadas com a URL e o canal de acompanhamento informados na entrega. A administração global de usuários não faz parte da jornada geral do participante; ela é reservada ao papel global autorizado.

## 1. Criar e verificar sua conta

1. Abra a URL confirmada na entrega do piloto. Na página inicial, escolha **Criar conta**. Outra opção é **Acessar plataforma** e, na página de login, **Cadastrar-se**.
2. Informe **Nome**, **Sobrenome**, **E-mail** e **Senha**. A tela orienta usar uma frase de pelo menos 15 caracteres; a senha é preservada como digitada.
3. Clique em **CRIAR CONTA**. Uma conta nova precisa confirmar o e-mail antes de continuar para o espaço de trabalho.
4. Na tela **Confirme seu e-mail**, consulte a mensagem recebida na sua caixa e preencha **Código de verificação** com os seis dígitos, incluindo zeros no início. Clique em **Confirmar e-mail**.
5. Se precisar de outro código, aguarde o prazo exibido e use **Reenviar código**. Use o código mais recente; o código substituído deixa de ser válido. Se a tela indicar expiração ou limite de tentativas, siga a orientação para solicitar um novo.
6. Se a sessão expirar, use **Ir para o login**, entre com seu e-mail e senha e retome a verificação.

Se você já tem uma conta, escolha **Acessar plataforma**, informe suas credenciais e clique em **ENTRAR**. Uma conta ainda não verificada retorna ao fluxo de confirmação. Para recuperação de acesso, o login oferece **Esqueceu sua senha?**.

Confirme o recebimento observando a sua caixa. Não compartilhe senha, código de verificação ou link de recuperação no feedback. Se o recebimento não acontecer, registre a etapa e procure o canal de acompanhamento informado na entrega.

## 2. Abrir ou criar um laboratório

O laboratório reúne as áreas e os registros da equipe.

1. Em **Seus laboratórios**, escolha o laboratório indicado para o piloto e clique em **ACESSAR LABORATÓRIO**.
2. Se a atividade combinar a criação de um laboratório, preencha **Nome do laboratório** em **Criar laboratório** e clique no botão **Criar laboratório**. Depois, abra seu cartão com **ACESSAR LABORATÓRIO**.
3. Confira o nome e o estado do laboratório antes de registrar dados. A navegação contextual oferece **Resumo**, **Áreas** e **Mapa**; **Membros** aparece conforme a permissão.

A interface permite até cinco laboratórios acessíveis, incluindo participações e inativos. O cartão **Entrar em um laboratório** está identificado como **Disponível em uma próxima etapa**; ele não é um fluxo de solicitação já ativo. Se a participação em um laboratório existente ainda não estiver configurada, informe isso pelo canal do piloto.

Quando aparecer **Laboratório inativo — somente leitura**, consulte os registros disponíveis. A ausência de ações de cadastro ou gestão também pode decorrer do seu papel no laboratório.

## 3. Cadastrar e consultar uma área

1. No laboratório, abra **Áreas**. Se sua permissão permitir cadastro e o laboratório estiver ativo, escolha **Nova área**.
2. Preencha **Nome da área**. Defina **Latitude** e **Longitude** escolhendo um ponto no mapa ou digitando as coordenadas.
3. Se for pertinente ao local da observação, use **Usar minha localização**. Confira o ponto retornado antes de salvar. Se a localização não estiver disponível, use as coordenadas ou o mapa.
4. **Município**, **UF**, **Tipo de terreno** e **Descrição** são opcionais. Preencha somente o que souber.
5. Revise o nome e o ponto e clique em **Confirmar ponto e cadastrar**. Escolher ou mover o ponto ainda não salva a área.
6. Para consultar uma área da lista, clique em seu nome ou em **Ver detalhes**.

### Capa da área, quando disponível no ambiente

O painel **Capa da área** informa a disponibilidade do recurso. Se ele estiver desabilitado, prossiga com as demais jornadas; o espaço de capa apresenta a indicação correspondente.

Quando o recurso estiver habilitado e seu papel permitir edição, use **Selecionar capa** ou **Substituir capa**, escolha JPEG, PNG ou WebP de até 10 MiB e 4096 pixels por lado e clique em **Enviar capa**. Aguarde a confirmação. Se a interface oferecer **Tentar envio novamente** ou **Recarregar capa**, siga a mensagem apresentada. A disponibilidade desse fluxo será informada na entrega; sua descrição aqui não confirma a habilitação do provedor.

## 4. Registrar uma coleta

1. No detalhe da área, clique em **Registrar coleta**.
2. Em **Ocorrência em campo**, confira **Data e hora da coleta**. O valor inicial é uma sugestão do dispositivo; ajuste-o para a ocorrência que está registrando.
3. Confira **Fuso da coleta**. O modo **Fuso do dispositivo** preenche o **Offset UTC**. Para informar outro fuso, selecione **Fuso UTC manual** e preencha o offset no formato indicado, como `-03:00`.
4. Clique em **Revisar coleta**. Confira data, hora, fuso, laboratório e área. Essa revisão ainda não salva.
5. Use **Voltar e corrigir** se precisar ajustar. Quando estiver correto, clique em **Confirmar coleta**.
6. Aguarde **Detalhe da coleta** e confira o registro. As medições ambientais serão preenchidas separadamente.

Uma coleta confirmada não pode ser editada nem apagada por esse fluxo. Se identificar erro depois da confirmação, registre-o no acompanhamento do piloto.

Se a tela informar que a tentativa original foi preservada e o resultado está desconhecido, mantenha os mesmos dados e a página aberta; use **Tentar novamente** conforme a orientação. Uma falha de conexão, sozinha, não confirma que nada foi salvo.

## 5. Registrar e conferir as medições ambientais

1. Em **Detalhe da coleta**, clique em **Ver dados ambientais**.
2. Se a coleta ainda não tiver um conjunto confirmado e permitir registro, clique em **Registrar dados ambientais**. Aguarde o formulário ficar pronto.
3. Preencha os grupos **Água**, **Solo**, **Vegetação** e **Terreno**, respeitando unidades, opções e limites indicados em cada campo. Campos com asterisco são obrigatórios; os marcados como opcionais podem ficar sem informação.
4. Nos números, use ponto como separador decimal. Informe **0** somente quando zero for o valor observado; **Não** é uma resposta informada e não equivale a **Não informado**. Não invente valores para completar campos.
5. Se precisar interromper o preenchimento, salve um rascunho conforme a próxima seção. Para concluir, clique em **Revisar dados**.
6. Na tela **Revisar dados ambientais**, confira os quatro grupos. Use **Voltar ao formulário** para corrigir ou **Confirmar dados ambientais** para registrar.
7. Confira o conjunto apresentado em **Dados ambientais da coleta**. Ele é confirmado e imutável: esse fluxo não permite editar, complementar ou excluir o conjunto depois da confirmação.

Se a confirmação ficar com resultado desconhecido, mantenha os mesmos dados. A tela orienta repetir a confirmação e oferece **Consultar registro**. Aguarde a resolução antes de iniciar outro preenchimento para a mesma operação.

## 6. Salvar, retomar ou descartar seu rascunho

O rascunho guarda um preenchimento parcial pessoal para aquela coleta. Ele não é uma medição confirmada e não fica disponível como rascunho de outra pessoa.

- **Salvar:** no formulário ambiental, clique em **Salvar rascunho** e aguarde **Rascunho salvo.** Digitar nos campos não salva automaticamente.
- **Retomar:** entre com a mesma conta, abra a mesma coleta e acesse **Ver dados ambientais**. Se ainda for possível registrar o conjunto, abra **Registrar dados ambientais**; o rascunho pessoal existente preenche o formulário. A tela informa **Rascunho pessoal retomado.**
- **Recarregar:** use **Recarregar rascunho** para buscar a versão salva. Se houver alterações locais, a confirmação avisa que elas serão substituídas. Em conflito entre abas, confira a mensagem antes de aceitar recarregar.
- **Repetir após falha:** se aparecer **Repetir salvamento**, conserve os mesmos campos. Você também pode recarregar a versão salva conforme a orientação; não trate uma resposta perdida como certeza de que o salvamento falhou.
- **Descartar:** **Descartar rascunho** pede confirmação e elimina definitivamente o rascunho pessoal. No formulário, também limpa o preenchimento. Essa ação não apaga medições já confirmadas.

A confirmação das suas medições consome o rascunho pessoal usado na operação. Se outra pessoa confirmar as medições, um rascunho seu remanescente pode ser consultado ou descartado quando permitido; ele não altera o conjunto confirmado. Laboratório inativo permanece somente para leitura.

Salve antes de sair ou fechar a página. O aviso de alterações não salvas depende da navegação e do navegador; não conte com ele em todo fechamento de aba, processo ou dispositivo.

## 7. Consultar o mapa e a lista de áreas

1. Na navegação do laboratório, abra **Mapa**.
2. Em **Pontos das áreas**, selecione um marcador. Você também pode escolher a área em **Lista de áreas**, abaixo ou ao lado do mapa.
3. Confira **Área selecionada**, suas coordenadas e **Coletas confirmadas**.
4. Use **Abrir detalhe da área** para ir à área ou **Abrir coleta** para consultar uma coleta apresentada no painel.

A lista continua disponível quando a base cartográfica falha. Se aparecer **Base cartográfica indisponível. A lista permanece completa.**, use a lista para seguir. Áreas sem localização utilizável são mostradas em **Localização indisponível**. Isso não elimina os registros da lista.

Se toda a visão territorial falhar ao carregar, use **Tentar novamente**. Em um laboratório sem áreas, **Nenhuma área cadastrada** explica o estado; quando permitido, **Ir para áreas** abre a listagem.

Pelo teclado, use Tab e Shift+Tab para navegar. Um marcador focado pode ser selecionado com Enter ou Espaço; os botões da lista oferecem o mesmo caminho de seleção. O mapa mostra pontos de áreas e acesso a registros, sem prometer análise geográfica ou diagnóstico por satélite.

## 8. Consultar ou criar um diagnóstico IHFR experimental

O diagnóstico fica no detalhe da coleta. Em **Diagnóstico IHFR experimental**, consulte o **Score registrado**, a **Classe experimental**, a **Qualidade dos dados**, o **Estado do diagnóstico**, os componentes e a **Proveniência e contrato** apresentados.

Preserve estas quatro qualificações ao ler ou compartilhar resultados:

| Qualificação exibida | Como interpretar |
|---|---|
| `CONTRATO_EXPERIMENTAL` | O resultado segue o contrato experimental indicado na aplicação. |
| `VALIDACAO_CIENTIFICA_PENDENTE` | A validação científica continua pendente. |
| `SUJEITO_A_RECALIBRACAO` | O contrato e sua calibração podem ser revistos. |
| `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO` | O resultado não representa um contrato científico definitivo aprovado. |

Se o seu papel no laboratório ativo permitir gestão, a seção **Gerenciar diagnóstico IHFR experimental** estará disponível:

1. Em **Uso predominante da terra**, selecione a categoria observada. Se não puder determinar, mantenha **Indeterminado ou ausente**; a aplicação pode informar insuficiência de dados.
2. Informe **Origem da observação** — **Observação em campo** ou **Registro autorizado** — e **Data e hora da observação**.
3. Clique em **Verificar elegibilidade** e leia o resultado e os motivos apresentados.
4. Para uma criação prevista na atividade, clique em **Criar diagnóstico**. Leia **Confirmar criação** e escolha **Confirmar** ou **Cancelar**.
5. Confira o resultado devolvido. Insuficiência de dados ou versão incompatível são estados a registrar no feedback; não substitua ausência por valores inventados para forçar um resultado.

“Solo exposto” no uso predominante da terra é uma categoria territorial; não é o percentual de solo exposto informado nas medições ambientais.

Se já houver diagnóstico vigente, a ação passa a **Substituir diagnóstico**. **Revogar diagnóstico** exige **Motivo da revogação** e confirmação. Essas ações preservam o registro e sua proveniência; use-as apenas quando fizerem parte da atividade combinada para o piloto.

Se aparecer **Resultado ainda não confirmado**, use **Recuperar resultado** ou **Repetir com a mesma chave**. Resolva a tentativa preservada antes de iniciar outra. Participantes sem permissão de gestão podem consultar o diagnóstico disponível; não devem solicitar alteração de papel apenas para contornar essa restrição.

## 9. Registrar sua experiência e enviar feedback

Use o canal confirmado na entrega do piloto. O formulário histórico não é apresentado aqui como destino já confirmado.

Registre, sem incluir credenciais ou dados pessoais desnecessários:

| Informação | O que descrever |
|---|---|
| Etapa | Qual seção deste guia e qual ação estava executando |
| Resultado esperado | O que você esperava que a interface fizesse |
| Resultado observado | O que aconteceu e a mensagem apresentada |
| Momento | Data, hora e fuso da observação |
| Condição de uso | Navegador, dispositivo, orientação da tela, tamanho de texto/zoom e uso de teclado, quando pertinentes |
| Repetição | Se aconteceu uma vez ou se foi possível repetir com os mesmos passos |
| Evidência opcional | Captura recortada e revisada para retirar nomes, e-mails, senhas, códigos, links de recuperação e outros dados privados |

Conte também o que foi fácil ou difícil: localizar laboratório/área/coleta, distinguir rascunho de dado confirmado, compreender o fuso, usar mapa ou lista e entender os limites do IHFR. Ao terminar em dispositivo compartilhado, use **Sair**.

## Referência de navegação e fontes — uso interno do handoff

As rotas abaixo são referências da aplicação, não URLs de um deployment confirmado. Os identificadores são fornecidos pela navegação real; não precisam ser digitados pelo participante. As fontes foram conferidas no código da candidata de referência, preservando o [roteiro histórico](../../code-first-prd/testing/roteiro-de-testes-de-uso.md).

| Jornada | Rotas/pontos de entrada | Fonte dos rótulos e comportamento |
|---|---|---|
| Acesso e cadastro | `/`, `/login`, `/register` | [Landing](../../../src/app/page.tsx), [cadastro](../../../src/app/register/page.tsx), [login](../../../src/app/login/page.tsx) |
| Verificação | `/verify-email`; recuperação em `/forgot-password` | [Verificação](../../../src/components/account/email-verification-form.tsx), [serviço de contas](../../../src/app/api/server/accounts/service.ts) |
| Laboratório | `/workspace`; `/dashboard/laboratories/{laboratoryId}` | [Workspace](../../../src/components/workspace/laboratory-workspace.tsx), [navegação contextual](../../../src/components/shell/laboratory-navigation.tsx) |
| Área e capa | Acrescentar `/areas`, `/areas/new` ou `/areas/{areaId}` ao laboratório | [Lista](../../../src/components/areas/area-list.tsx), [cadastro](../../../src/components/areas/area-form.tsx), [capa](../../../src/components/areas/area-cover.tsx) |
| Coleta | Acrescentar `/collections/new` ou `/collections/{collectionId}` à área | [Formulário](../../../src/components/collections/collection-form.tsx), [revisão](../../../src/components/collections/collection-review.tsx), [detalhe](../../../src/components/collections/collection-detail.tsx) |
| Medições e rascunho | Acrescentar `/environmental-data` ou `/environmental-data/new` à coleta | [Página](../../../src/components/environmental-data/environmental-data-page.tsx), [formulário](../../../src/components/environmental-data/environmental-data-form.tsx), [rascunho](../../../src/components/environmental-data/environmental-draft-actions.tsx), [revisão](../../../src/components/environmental-data/environmental-data-review.tsx), [limites de navegação](../../operations/environmental-drafts-runbook.md) |
| Mapa | `/dashboard/laboratories/{laboratoryId}/map` | [Visão territorial e lista](../../../src/components/territorial-map/territorial-map-view.tsx), [marcadores e teclado](../../../src/components/territorial-map/territorial-map.client.tsx) |
| IHFR | Painel no detalhe da coleta; sem rota de criação independente na interface | [Gestão](../../../src/components/ihfr-diagnosis/ihfr-diagnosis-management.tsx), [resumo](../../../src/components/ihfr-diagnosis/experimental-diagnosis-summary.tsx), [qualificações](../../../src/components/ihfr-diagnosis/scientific-notice.tsx), [ADR-0001](../../governance/ADR-0001-contrato-experimental-ihfr-v0-1.md) |
