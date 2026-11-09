# Checklist de revisão, homologação e pós-deploy

RECOMENDACAO compartilhada por estudantes, revisores e operadores do projeto.
Selecionar itens pelo recorte; marcar com evidência pertinente e aceite do responsável.
Uma prova existente aplicável pode fechar a conferência sem repetir sua execução.

Usar o [plano de execução dos estudantes](plano-execucao-estudantes.md) para
seis entregas, executores/aprovadores e regras de reuso; este checklist é referência
técnica, não uma bateria obrigatória adicional. Reviews/testes são dos estudantes
designados; ações de provedor/banco/deploy/cleanup são dos operadores autorizados;
custos/dados/GO são decisões das autoridades do projeto.

## Bloqueios encontrados em 2026-10-15

Parecer atual: **CORREÇÕES NECESSÁRIAS — NÃO INTEGRAR EM `development` ainda**.
Consultar os [achados](achados-revisao-2026-10-15.md) e seguir o
[guia de correção](guia-correcao-achados-2026-10-15.md).

- [ ] CRI-REV-001: representar o estado desabilitado das capas no contrato e na UI.
- [ ] CRI-REV-002: rejeitar stale/replay/quota antes de consultar a Admin API.
- [ ] CRI-REV-003: sincronizar e revalidar o PR 7 no head atual da RC.
- [ ] CRI-REV-004: resolver `CHANGES_REQUESTED` e obter nova aprovação.

Não marcar esses itens apenas por haver CI verde; cada fechamento exige o critério
e a evidência definidos nos documentos vinculados.

Atualização2026-10-13: revisar as sete etapas e os heads atuais na
[prontidão](rc-readiness-20261013.md). A regressão cumulativa agora inclui os
dois baselines de hidratação e retry da capa revision1, sem substituir o aceite
humano/browser/provedor. Conferir primeiro PUT/GET/reload de false/0/ausência,
novo GET503→200/naturalWidth e retentativa após outra falha. O patch99d8363 já
pertence à RC6; PR7 conserva a revisão independente, sem duplicação do commit.
Os checks atuais e seu runner estão no [runbook CI](../../operations/rc-review-ci-runbook.md).
As caixas humanas abaixo continuam abertas; o agente não aprovou nenhum PR.
PASS histórico local está separado em seção própria. Para cada evidência registrar
UTC, SHA, ambiente/fingerprint redigido, comando/cenário, resultado e revisor.
Não registrar PII, provas, bearer, connection string, cookies ou URLs de delivery.

## Code review e rastreabilidade

- [ ] Revisar PR1→7 pelo diff da etapa; confirmar base/head/dependência, specs,
  contratos, tasks e implementação. Não comparar todos com main simultaneamente.
- [ ] Conferir11 SHAs originais/ordem e branches preservadas; proteção Git limitada
  aos nomes review/release e nenhum deploy automático dessas refs.
- [ ] Confirmar014 mantém exclusão no runner próprio e não aceita SQL alterado.
- [ ] Revisar015: ownership pessoal, revisão/idempotência, save/reload/discard,
  consumo na mesma transação e rollback; draft nunca alimenta IHFR confirmado.
- [ ] Revisar016: assinaturas de IDs controlados, hash do preset, decoder real,
  limite/multiframe, EXIF removido, proxy privado e cleanup por assetId próprio.
- [ ] Confirmar14 migrations rastreadas;12 antigas intactas, só duas novas aditivas.
  Revisar locks/FKs e compatibilidade de exclusão/rollback com dados novos.
- [ ] Verificar documentação/links, sem segredos em diff/env/logs/bundle; exceções
  do gitignore permitem somente exemplos sintéticos, nunca .env privado.

## Segurança e autorização

- [ ] Requisições sem sessão, conta inativa/bloqueada, usuário externo e vínculo
  revogado recusam sem expor recurso/asset/draft alheio.
- [ ] MEMBER lê capa autorizada e não muta; OWNER/ADMIN só no laboratório correto
  e ativo; papel global não dá bypass. Laboratório inativo permite leitura prevista
  e impede todas as mutações. Revalidar após operações externas/na transação.
- [ ] CSRF/origin, ingress Vercel, limites JSON, quotas, DTO allowlist e erros
  sanitizados; não depender de papel/IDs enviados pelo navegador.
- [ ] Hash/senha/credenciais/prova/email de terceiros não aparecem nos DTOs,
  URLs públicas, caches compartilhados, logs nem respostas de upload.
- [ ] Conteúdo de capa servido private/no-store/nosniff e sem redirect/delivery
  público; cópia baixada e cache externo não têm revogação instantânea prometida.
- [ ] Replay/OCC/corrida de revogação/substituição mantém referência vigente;
  cleanup nunca remove asset corrente/alheio e BLOCKED exige revisão humana.

## Testes e regressão local

Escolher cobertura pelo diff, risco e lacunas: conservar SHA/ambiente originais
das provas aproveitadas e documentar equivalência ao candidato. Mudança apenas
documental/merge equivalente não exige repetir toda a suíte. Ampliar testes quando
impacto material/cobertura insuficiente justificar, com aceite do revisor.

- [ ] Conferir Node/lockfile/client e usar PostgreSQL próprio/loopback com marcadores
  de ownership. Não configurar TEST_DATABASE_URL ou PLAYWRIGHT_BASE_URL produtivos.
- [ ] Conferir provas existentes e executar apenas gates adicionais necessários
  ao diff/contexto; schema/auth/serviços exigem cobertura pertinente. Registrar
  justificativa de reuso/seleção, sem recontar subconjuntos R1.
- [ ] Confirmar draft após reload/duas abas/conflito/conexão perdida; confirmar
  medição e rollback; preservação de draft alheio, descarte/cancelamento e ciência.
- [ ] Testar capas: ausência/fallback, inválido/oversize/multiframe, substituir,
  erro mantendo antiga, remoção/cancelamento, replay e referência/revisão correta.
- [ ] Regressão de login/logout/sessão, verificação/reset/exclusão, laboratórios,
  áreas/coletas/medições, dashboard/histórico/mapa e IHFR experimental.
- [ ] Conferir acessibilidade/teclado/foco/mobile e aviso de navegação nos browsers
  alvo. Chromium67 local não prova comportamento Firefox/Safari nem WCAG geral.
- [ ] Teardown de fixtures/zero schemas e estado do cluster restaurado; não remover
  recursos preexistentes para fechar o gate.

Catálogo de comandos do harness para os gates escolhidos, sem obrigação de rodar
a lista inteira. Windows, destino LOCAL com ownership: instalar dependências/
gerar Prisma quando necessário. RegressionSetup inicializa somente bancos próprios.
Não executar esses wrappers no banco hospedado. Consultar guard e output redigido.

```powershell
./scripts/accounts-local-postgresql.ps1 -Action Status
./scripts/accounts-validation.ps1 -Gate RegressionSetup
./scripts/accounts-validation.ps1 -Gate Unit
./scripts/accounts-validation.ps1 -Gate Integration
./scripts/accounts-validation.ps1 -Gate Migration
./scripts/accounts-validation.ps1 -Gate Contract
./scripts/accounts-validation.ps1 -Gate R1
./scripts/accounts-validation.ps1 -Gate E2E
./scripts/accounts-validation.ps1 -Gate Https
# O runner de exclusão exige o mesmo env/guard do alvo de regressão próprio:
./scripts/accounts-local-postgresql.ps1 -Action Run -DatabaseMode Regression -Executable node -CommandArguments @('--import=tsx','scripts/account-deletion-e2e.ts')
./scripts/accounts-validation.ps1 -Gate Typecheck
./scripts/accounts-validation.ps1 -Gate Lint
./scripts/accounts-validation.ps1 -Gate Build
./scripts/accounts-validation.ps1 -Gate Bootstrap
./scripts/accounts-validation.ps1 -Gate SchemaAudit
```

Se o cluster estava STOPPED, restaurar STOPPED ao terminar; confirmar status e
resíduos. Smoke/cleanup reais não pertencem à regressão comum.

## Pendências reais e condição de fechamento

| Gate/pendência atual | Ação necessária | Evidência que fecha e alcance |
|---|---|---|
| Revisão/integração humana | Estudantes revisam/preparam; revisor independente designado aprova, mantenedor autorizado integra e operador confirma repo produtivo | Aprovações/links/SHA e ordem de merges; revisão não é deploy |
| Mapa produção/backup/ensaio | Owner confirma Vercel→repo→Neon, snapshot, restore e schema compatível | IDs/fingerprint/UTC privados, backup/restore PASS, ensaio e aprovação da janela |
| GateB012, T025/T028 | Em candidato autorizado, navegadorB recebe reset real, consome uma vez e revogaA; depois do cooldown, reenvio invalida código antigo e aceita novo | Humano confirma recebimento e jornadas com candidato/UTC, sem tokens; SMTP aceito não basta. [Runbook](../../operations/account-homologation-runbook.md) |
| Aceite humano013 | Conta sintética removível autorizada: cancelamento, senha errada/correta, blockers e revogação | Registro humano do fluxo; 3 testes automáticos locais não encerram aceite |
| Drafts em browsers alvo | Exercitar save/retomar/OCC/descarte/confirmar/saída, teclado e mobile | Matriz browser/versão/candidato e limitações aceitas; não ampliar promessa do aviso |
| Cloudinary016 real | Confirmar cloud/preset frozen/hash; synthetic upload authenticated, EXIF removido, delivery público recusado; revogar vínculo; substituir/perda resposta/remover/raw/tardio/cleanup próprio | Registro do provedor, custo/créditos/privacidade e reconciliação, sem IDs/URLs sensíveis desnecessários; [runbook](../../operations/area-covers-runbook.md) |
| PD-CRI-010 cleanup/créditos | Projeto designa operador/scheduler/alertas e autoridade financeira decide orçamento; estudantes acompanham provas sanitizadas | Nome/função/aprovação e execução contínua observada; necessária antes de ativar capas |
| PD-CRI-004 mail contínuo | Designar owner; validar scheduler produtivo existente com bearer/destino/frequência e alertas | Execuções automáticas após atualização e fila dentro da validade; histórico homologação60s não prova produção |
| Ciência IHFR | Autoridade científica executa validação/calibração/campo próprios | Parecer científico futuro; não bloqueia automaticamente review técnico desta RC e não é fechado por software |

PENDENCIA_DE_DECISAO: responsáveis e aprovações acima não especificados. Rollout
parcial de capas desabilitadas só pode ser aprovado/registrado pela equipe; não
fecha016 real nem dispensa GateB/aceite de exclusão quando esses fluxos estiverem ativos.

## Antes da janela produtiva

Operadores e aprovadores do projeto confirmam os itens abaixo e entregam registro
sanitizado à equipe. Inventários/ensaios podem ocorrer em paralelo ao review e aos
testes isolados. Prontidão operacional condiciona a ação produtiva correspondente;
não bloqueia automaticamente merge sem efeito produtivo ou teste de outra frente.

- [ ] Repo/branch/root/Node/projeto/domínio/banco confirmados por dois operadores.
- [ ] Política de merge preserva SHAs; gatilhos Git/deploy conhecidos antes da promoção.
- [ ] Backup final restaurável, ensaio/compatibilidade, RPO/RTO e deployment anterior.
- [ ] Pending/checksums/drift/colisões examinados, janela/locks/mutações planejados;
  autorização de banco/deploy registrada separadamente.
- [ ] Configuração mínima mail/contas preservada; Cloudinary só habilitado com gates
  fechados; schedulers/operadores/alertas prontos. Sem uso de projeto novo presumido.

## Pós-deploy — acompanhamento e operação do projeto

Estudantes acompanham uso/leitura autorizados e consolidam o relatório; operadores
verificam banco, serviços e filas, executam ações privilegiadas e mantêm operação
contínua. Cenários sintéticos/destrutivos, falhas e cleanup de teste ficam no alvo
isolado; aproveitar as provas pertinentes anteriores sem repeti-los na produção.

- [ ] Deployment READY, SHA aprovado, alias/domínio correto e mesmas identidades
  de banco/cloud;14 migrations sem falhas/pendências e constraints presentes.
- [ ] Contagens legadas/ciência preservadas no congelamento de escrita; nenhuma
  fixture ou dado sintético de teste integrado ao domínio produtivo por engano.
- [ ] Login/logout e autorização de leitura funcionam no smoke de uso permitido;
  provas de reset/reenvio/revogação/exclusão permanecem no candidato isolado aceito.
- [ ] UI de drafts, consulta/histórico/diagnóstico/mapa coerentes; aproveitar prova
  isolada de reload/conflito/consumo próprio, sem gerar medições sintéticas produtivas.
- [ ] Leitura de capa/fallback e autorização funcionam; quando ativada, evidências
  isoladas de EXIF/substituição/raw/tardio/cleanup aceitas pelo projeto. Sem smoke
  sintético de upload/delete em produção ou remoção de asset corrente/alheio.
- [ ] Regressão mínima de labs/áreas/coletas/medições/admin e headers de segurança.
- [ ] Schedulers retomados com execução automática observada, filas saudáveis,
  nenhum BLOCKED sem owner, créditos/custos monitorados; observar erros/latência.
- [ ] Estudantes registram aprovações, URL/deployment/SHA/UTC e extratos operacionais
  sanitizados; projeto aceita relatório e mantém pendências com owners. Encerrar
  cada gate apenas com evidência correspondente, sem transferir custos/dados/plantão.

## PASS histórico local — referência, não execução deste checklist

[Revisão focal](../../reports/audits/2026-10-10-revisao-focal-cri-pre-homologacao.md):
291 Node +17 Mail;187 integração;37 migrations;6 contrato;67 E2E Chromium;
2 HTTPS;3 exclusão;14 migrations bootstrap; typecheck/build PASS; lint0erros/
3warnings prévios; zero schemas. R1 repete14 integração+3Mail. Fingerprint funcional
5f36eb7e, manifesto520 arquivos. Comparação com snapshot7f histórico permanece
NÃO VERIFICADA; nova regressão5f é a evidência do candidato auditado.

IHFR: CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO, NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
