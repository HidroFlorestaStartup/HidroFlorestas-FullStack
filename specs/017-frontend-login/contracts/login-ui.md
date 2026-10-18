# Contrato de apresentação — login

Nenhum contrato HTTP novo. `useAuth().signIn` é a única porta de autenticação.

- O formulário envia exatamente `{email, password}` recebidos, sem normalizar a senha.
- A validação de vazio preserva `!email.trim() || !password.trim()` do baseline; não redefine requisitos de senha.
- A resolução de destinos, cookies e sessão permanece em src/contexts/auth.context.tsx. O login não implementa router.push ou armazenamento próprio.
- Rótulos E-mail/Senha e heading FAÇA SEU LOGIN permanecem; botões ENTRAR/ENTRANDO... e links Cadastrar-se/Esqueceu sua senha? preservam destinos reais.
- O olho e checkbox refletem o mesmo estado mostrar/ocultar; aria-pressed no botão; password/current-password por padrão.
- Estado inicial SSR/hidratação: controles inertes, mensagem Preparando formulário…; após readiness habilitar. Durante envio: bloquear controles, busy/status; repetição síncrona recusada por ref.
- Erro do contexto exibido em role=alert e associado aos campos sem distinguir conta inexistente/bloqueada localmente.

Revisão visual: fonte Poppins do root, logo-hf.png existente; composição/cores/raio/espaçamento do starter adaptados ao destino. Sem mock/demo/painel de personas, links # ou substituição da marca. Estado disabled e foco devem ser visualmente claros; reduced-motion local.

Evidência exigida: reais no Next para UI/hidratação e nos testes de auth existentes para login/credenciais/cookies/verify-email/HTTPS. Interceptação 401 do novo teste serve apenas para busy/payload/mensagem e deve ser identificada como tal.
