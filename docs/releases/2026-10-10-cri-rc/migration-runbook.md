# Migrations em banco já existente

RECOMENDACAO operacional futura. Preparação da RC não aplicou migration remota
nem consultou dados produtivos. Operador de banco/aprovador: não especificado.
Executar com autorização própria, destino identificado e backup restaurável.

## Histórico e impacto do recorte

EVIDENCIA_IMPLEMENTACAO: há14 diretórios SQL versionados; os12 anteriores à RC
continuam byte a byte iguais nos blobs Git. As duas novidades são:

| Migration | Objetos/efeitos | Impacto em dados antigos |
|---|---|---|
| 20261010000100_environmental_drafts | EnvironmentalDraft, JSONB, revisão>0, versão fixa, unique(userId,collectionDataId), FKs para User/CollectionData RESTRICT | Nenhum backfill/UPDATE/DELETE; começa vazia. Draft futuro impede exclusão direta de User/CollectionData; serviço novo remove próprios drafts na exclusão permitida |
| 20261010000200_area_covers | CoverUploadAttempt, AreaCover, CoverCleanupJob, índices/constraints, leases, refs; User FK SET NULL na tentativa; área/attempt FKs RESTRICT | Nenhum backfill/UPDATE/DELETE. CollectionArea.image permanece intacto, não convertido em capa. Novas refs podem impedir exclusões antigas sem tratamento |

Ler os SQL reais em [drafts](../../../prisma/migrations/20261010000100_environmental_drafts/migration.sql)
e [capas](../../../prisma/migrations/20261010000200_area_covers/migration.sql).
Criação de tabelas/índices e validação de FKs adquire locks, inclusive nas tabelas
referenciadas. Não garantir ausência de downtime nem duração antes do ensaio.
Nenhum campo científico ou medição confirmada é modificado por estas duas migrations.

O banco hospedado pode estar atrás de beba96f. Nesse caso `migrate deploy` aplica
TODAS as pendentes, não somente as duas novas: revisão completa é obrigatória.
Exemplos materiais anteriores: canonicalização de email da012 aborta se há colisões
lower(trim(email)), backfill da coorte legada define verificationRequired=false sem
inventar emailVerifiedAt;013 acrescenta ownership a mail e altera constraint de ações.
Não resolver colisões mesclando contas nem assumir que produção já tem12 migrations.

## Preflight — antes de qualquer escrita

1. Conferir [mapa do destino](production-update-runbook.md): project/branch/database/
   role/endpoint/schema public e vínculo aplicação→banco. Dupla conferência humana.
   DATABASE_URL deve ser injetada privadamente no processo da CLI; prisma.config.ts
   usa esta variável. Um endpoint pooler e um direto só podem ser tratados como o
   mesmo destino após prova pelo painel/API Neon, não por semelhança de nome.
2. Obter checkout limpo no SHA aprovado; Node/Prisma e lockfile exatos. Executar
   `npm ci` e `npx --no-install prisma generate` fora da aplicação que atende tráfego.
   Registrar checksums SHA256 dos blobs Git e bytes efetivos dos SQL; Windows LF/CRLF
   podem mudar checksum. Helper014 tolera representação somente no harness local;
   não é autorização para editar `_prisma_migrations` no banco hospedado.
3. Obter inventário read-only e `npx --no-install prisma migrate status` no destino
   confirmado. Status com exit não zero por pendências deve ser interpretado pela
   saída; migration failed/divergente/extra/ausência de histórico impede deploy.
   `migrate status` não prova ausência de drift de schema: comparar estruturas,
   índices, FKs, constraints e enums com migration/schema e clone restaurado.
4. Identificar pending exatas, tamanho de tabelas/filas e tráfego/locks ativos.
   Se forem mais que as duas novas, revisar TODO SQL extra e seus preflights.
   Se User/CollectionData/CollectionArea faltarem, parar: não fazer bootstrap no
   banco já usado. Histórico ausente ou banco vazio exige procedimento separado.
5. Backup, teste de restore e ensaio completo descritos abaixo. Conferir espaço,
   privilégios DDL e tempo disponível, versão do PostgreSQL/extensões no destino.
   Não abrir conexões paralelas de migration nem testar locks com escrita em produção.
6. Aprovar janela, manutenção/congelamento de escrita, RPO/RTO e rollback anterior.
   RPO/RTO ainda não definidos pela equipe; registrar antes da janela.

Exemplo de inventário somente leitura via psql: configurar privadamente um serviço
libpq `hfr-release` com endpoint DIRETO do destino confirmado, SSL e arquivo de
senha fora do repositório; não colocar URLs/senhas em argumentos/histórico. O alias
é local proposto, não recurso de provedor. Configuração da CLI Prisma é independente
desse serviço e deve ser conferida para o mesmo alvo.

```powershell
psql 'service=hfr-release' -X -v ON_ERROR_STOP=1
```

Na sessão SQL, sem copiar PII para evidências públicas:

```sql
BEGIN READ ONLY;
SELECT current_database(), current_user, current_schema(), version();
SELECT to_regclass('public._prisma_migrations')::text AS history,
       to_regclass('public."User"')::text AS users,
       to_regclass('public."CollectionData"')::text AS collections,
       to_regclass('public."CollectionArea"')::text AS areas;
-- Executar a consulta seguinte somente se history existir:
SELECT migration_name, checksum, finished_at IS NOT NULL AS finished,
       rolled_back_at IS NOT NULL AS rolled_back, applied_steps_count
FROM public._prisma_migrations ORDER BY started_at, migration_name;
-- Se as tabelas legadas existirem, preservar estas contagens pré/pós:
SELECT (SELECT count(*) FROM "User") AS users,
       (SELECT count(*) FROM "LaboratoryRoom") AS laboratories,
       (SELECT count(*) FROM "CollectionArea") AS areas,
       (SELECT count(*) FROM "CollectionData") AS collections;
SELECT count(*) AS canonical_collision_groups
FROM (SELECT 1 FROM "User" GROUP BY lower(btrim("email")) HAVING count(*) > 1) c;
SELECT count(*) AS active_sessions, count(*) FILTER (WHERE wait_event_type='Lock') AS lock_waits
FROM pg_stat_activity WHERE datname=current_database() AND pid<>pg_backend_pid();
ROLLBACK;
```

Não executar a query de tabela ausente; finalizar a transação e investigar.
Adicionar contagens de EnvironmentalMeasurementSet, diagnósticos/lifecycle e mail
quando existirem, sem payloads/endereço. Guardar inventário redigido com candidato,
UTC, migrations/checksums, fingerprint e contagens; não logs Prisma crus se contêm
connection strings. Não usar script de inventory E2E com defaults para produção:
ele lê .env.e2e.local e exige guards específicos do destino de teste.

## Backup e ensaio de recuperação

1. Owner confirma restore window/PITR real do plano Neon e mecanismo vigente. Não
   presumir PITR, retenção ou backup gratuito disponível. Selecionar ponto/backup
   anterior e procedimento suportado. Branch de restauração, se necessária, exige
   autorização própria; nenhuma criação de projeto é requisito automático.
2. RECOMENDACAO: dump lógico adicional do banco inteiro, com pg_dump de versão
   compatível, incluindo `_prisma_migrations` e todas as tabelas/constraints.
   Usar local privado com ACL/cifra/retention aprovado fora do checkout/sync público.
   DB contém PII/ciphertext; backup não pode ir para GitHub nem para `.accounts-validation`.

```powershell
# Exemplo: diretório privado aprovado já existe; não há senha na linha de comando.
pg_dump --dbname='service=hfr-release' --format=custom --no-owner --no-privileges --file='C:/backup-privado-aprovado/hfr-pre-rc.dump'
if ($LASTEXITCODE -ne 0) { throw 'Backup falhou; parar a atualização' }
Get-FileHash -Algorithm SHA256 -LiteralPath 'C:/backup-privado-aprovado/hfr-pre-rc.dump'
pg_restore --list 'C:/backup-privado-aprovado/hfr-pre-rc.dump'
if ($LASTEXITCODE -ne 0) { throw 'Inventário do backup falhou' }
```

3. Listagem/hash não provam restore. Restaurar em destino ISOLADO/Vazio autorizado,
   com segundo serviço libpq `hfr-restore-rehearsal`, endpoint conferido e sem acesso
   aos schedulers/provedores de produção. Confirmar role/privilégios separadamente,
   pois --no-owner/--no-privileges não recompõe ACLs. Não usar --clean no banco existente.

```powershell
pg_restore --dbname='service=hfr-restore-rehearsal' --no-owner --no-privileges --exit-on-error 'C:/backup-privado-aprovado/hfr-pre-rc.dump'
if ($LASTEXITCODE -ne 0) { throw 'Restore falhou; backup ainda não aprovado' }
```

4. Conferir schema,14/pending reais e contagens vs backup. Aplicar migrations
   no clone com env próprio, medir duração/locks, validar constraints, testar nova
   aplicação e artefato anterior. O clone com dados reais exige tratamento privado;
   e-mails/uploads/schedulers permanecem desligados. Para ensaio funcional, preferir
   dados anonimizados autorizados; não deixar fake do teste assumir recursos reais.
5. Backup PostgreSQL não inclui arquivos Cloudinary nem valores do secret store.
   Preservar chaves necessárias à decifra/provas, versão de config e referências de
   assets existentes privadamente. Não apagar assets para economizar durante ensaio.

## Aplicação na janela futura

Pré-requisitos acima e aprovação registrada são obrigatórios. A sequência abaixo
é DOCUMENTAÇÃO, não comando executado pelo agente.

1. Congelar mutações e coordenação dos workers com mecanismo aprovado. Backup
   final; comparar mapa do alvo novamente. Registrar snapshot do inventário atual.
2. Em um único processo com DATABASE_URL direta/privada e SHA aprovado:

```powershell
npx --no-install prisma migrate status
# Só após conferir a saída/status com o inventário e ter autorização do operador:
npx --no-install prisma migrate deploy
if ($LASTEXITCODE -ne 0) { throw 'Migration falhou; não publicar a nova aplicação' }
npx --no-install prisma migrate status
if ($LASTEXITCODE -ne 0) { throw 'Histórico não está consistente; parar' }
```

3. Esperado:14 migrations concluídas, zero failed/inacabadas, zero pendentes e sem
   divergências não resolvidas. Conferir presença/constraints/índices das quatro
   novas tabelas e checksums. Antes de abrir a versão nova, tabelas novas vazias e
   contagens de dados legados/medições/diagnósticos iguais com escrita congelada.
   Não remover linhas extras de `_prisma_migrations` para forçar o número14.
4. Confirmar aplicação anterior ainda funciona nesse schema; novas tabelas são
   aditivas, mas isso não garante todas as mutações antigas após haver drafts/capas.
5. Só então continuar deploy do [guia operacional](production-update-runbook.md).

Não usar migrate dev/reset, db push/--accept-data-loss, baseline legado,
seed/fixtures/clean bootstrap nem editar SQL histórico/checksums em produção.
Build apenas gera client e compila; migrations não rodam automaticamente no build.

## Falha de migration e recuperação

Estas duas migrations não têm BEGIN/COMMIT explícitos. Não presumir atomicidade
da cadeia: falha pode deixar parte dos objetos e histórico incompleto. Preservar
erro redigido, migration, passos concluídos, catálogo e janela/backup; não repetir
deploy sem entender o estado. Não disponibilizar aplicação nova com schema parcial.

| Situação | Procedimento seguro |
|---|---|
| Falha antes de DDL | Conferir inventário, causa e ausência de efeito; operador resolve causa e aprova nova tentativa |
| DDL parcialmente aplicado | Escolher recuperação ensaiada: desfazer SOMENTE objetos novos comprovadamente vazios, sem CASCADE, ou completar DDL revisado. SQL específico exige revisão pelo owner; não há down-migration automática |
| Histórico failed, rollback físico completo comprovado | `prisma migrate resolve --rolled-back NOME_EXATO` somente após aprovação, para permitir reaplicar o SQL intacto |
| SQL completado manualmente e equivalente integralmente ao versionado | `prisma migrate resolve --applied NOME_EXATO` somente após owner comprovar catálogo/dados/checksum esperado; não marcar para ocultar falha |
| Dados já escritos na nova versão ou inconsistência desconhecida | Suspender escrita, preservar o banco atual, avaliar roll-forward como primeira alternativa. Restore pode perder dados posteriores: aprovação explícita de RPO e plano de reconciliação |

Prisma documenta [recuperação de migrations falhas](https://www.prisma.io/docs/orm/v7/prisma-migrate/workflows/patching-and-hotfixing).
Essa referência não autoriza executar resolve nem modificar histórico nesta sessão.

Rollback da APLICAÇÃO mantém schema/tabelas/histórico/jobs. Depois que drafts
existirem, exclusão de conta pelo código anterior pode ser impedida por FK RESTRICT;
testar e restringir essa ação ou preferir correção forward aprovada. Leitura antiga
pode ignorar capas/drafts, mas o rollback não limpa os ativos nem a fila. Operador
mantém reconciliação de staging/final abandonados com prova exata de ownership.

Restore do BANCO é último recurso: preferir recuperação isolada/revisada em branch
existente ou destino autorizado; owner escolhe troca segura do endpoint ou método
de restore suportado. Registrar perda/reconciliação de alterações após backup.
Só retomar após histórico, contagens, auth/mail/chaves e referências Cloudinary
compatíveis e aprovação humana. Não restaurar destrutivamente por comando genérico.
