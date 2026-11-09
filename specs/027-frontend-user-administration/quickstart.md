# Validação — Spec 027

## Pré-requisitos

Node 24.19.0 e dependências do lockfile; Prisma Client gerado. Banco real, secrets e provedor externo não são utilizados por esta frente. O runner Windows oficial prepara PostgreSQL sintético protegido; não executar InitializeCiCluster fora dele.

## Verificações focais

```bash
node --import=tsx --test tests/unit/frontend-user-administration.test.ts tests/unit/user-list-state.test.ts
npx eslint src/components/user-administration src/components/admin-shell 'src/app/(private)/admin/page.tsx' tests/unit/frontend-user-administration.test.ts tests/e2e/frontend-user-administration.spec.ts
npm run typecheck
```

No runner sintético, executar `tests/e2e/frontend-user-administration.spec.ts` e regressões `user-administration-{read,role,status,audit}.spec.ts`; o CI integral verifica também auth, concorrência e último ADMIN.

## Cenários

1. Busca e filtros, próximo/anterior/reset, vazio/erro/retry.
2. Troca de A para B com resposta de auditoria atrasada: A nunca aparece em B.
3. Conflito real por PATCH concorrente: atualizar detalhe, conferir revisão, confirmar novamente.
4. Cancelar/Escape sem PATCH, Tab/Shift-Tab, foco restaurado e sucesso anunciado.
5. 320/375/768/1440, texto 200%, paisagem e controle final desobstruído; capturas fullPage:false.

Arquivos sanitizados em `.accounts-validation/frontend-user-administration/`. Abertura e inspeção real das imagens são registradas em implementation-evidence.md quando o artefato estiver disponível. Não chamar NOT_RUN ou SKIP de PASS. Leitor de tela e aceite humano permanecem separados.
