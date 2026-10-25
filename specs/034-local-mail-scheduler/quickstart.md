# Executar somente em localhost

Na raiz da worktree, Node24.19.0:

```powershell
node --experimental-strip-types --test tests/investigations/mail/local-scheduler.test.mjs
```

Sem npmci, .env, DB ou SMTP. Não executar scripts mail:worker/mail:smoke ou
scheduler de outro projeto. O teste cria/fecha servidor de porta efêmera própria,
gera bearer em memória e usa callback falso; nenhum segredo é impresso.
Tempo esperado de segundos, limite10s por teste. Não é CI ou cron novo.

PASS não fecha G3/G4/G5. Outbox/claims/leases são cobertos separadamente pelos
testes SQL; accepted aqui é fake, sem SMTP ou inbox humana.
