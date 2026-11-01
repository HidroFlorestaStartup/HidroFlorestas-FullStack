# Contratos de interação — Spec 035

- **Sem laboratório**: `Navegação principal` com Laboratórios e, se `canAdmin` definido no servidor, Administração. **Sem Áreas**. Conta é disclosure acessível que expõe senha/exclusão somente ao abrir; Sair segue `/logout`.
- **Com laboratório validado pelo servidor**: `Laboratório` com Laboratórios (retorno), Resumo, Áreas, Mapa e Membros apenas para `OWNER`. `aria-current` respeita rota base exata e subrotas. Não criar bypass para `/members` ou acesso a outro laboratório.
- **Desktop ≥768**: coluna lateral contextual única e cabeçalho compacto com identidade/avatar, Conta e Sair; nenhum conjunto de links horizontais superior.
- **Mobile <768**: barra contextual inferior, safe area, alvos ≥44px; conteúdo final, foco, Escape da Conta, Back/Forward/reload permanecem utilizáveis. Último controle dentro do scrollport precisa estar acima da barra fixa.
- **Código imutável pelo recorte**: serviços/session/logout/PasswordResetForm/AccountDeletionForm, guardas, schemas, ciência, páginas de B/C e providers. Arquivos da própria A não definem nova permissão.
- **Validação**: `tests/unit/hf-ui035-navigation.test.ts`, `tests/e2e/hf-ui035-navigation.spec.ts`, regressões `frontend-workspace`/`frontend-dashboard`/`frontend-mobile-navigation`/`frontend-account`, 15 gates CI sintéticos. Nenhum PASS sem SHA do run.
