# Pesquisa — contas

EVIDENCIA_IMPLEMENTACAO, baseline afef5db, 2026-10-18.

- Escolha técnica (RECOMENDACAO implementável): CSS Module compartilhado e delimitado por AccountShell; variante split somente no cadastro. Motivo: composição starter sem impacto em globals/login. Alternativas: copiar primitives rejeitado por imports transitivos de adapter/TanStack; trocar globals rejeitado por impacto transversal.
- Cadastro chama useAuth().signUp, endpoint /api/auth/sign-up, Idempotency-Key retida após erro/rede e descartada na edição do payload. Preservar exatamente essa fronteira, sem normalizar senha. Sessão ACTIVE continua restrita até verificar.
- Verificação mantém state/challengeId/code textual e resendKey; reset captura fragmento e apaga endereço; troca usa PasswordResetForm autenticado; exclusão usa blockers e confirmação real.
- RECOMENDACAO: fieldset de prontidão somente onde SSR permite interação antes da hidratação, ref síncrona para bloquear submits antes do rerender. Não inferir aria-invalid a partir de resposta geral. Campos com validação nativa mantêm required/pattern/type.
- Harness pesquisado em leitura por agente de apoio conforme speckit-plan: runtime24.19.0, dependências, Chromium e cluster sintético pré-provisionados; usar rc-review-validation.ps1 sem InitializeCiCluster. Nenhum banco real, env produtivo ou provedor será usado.
- Guias Next instalados confirmam CSS Modules locais e fronteiras Client Components para hooks/eventos. Link/Image permanecem Next, arquitetura e lockfile intactos.

Sem NEEDS CLARIFICATION material: escopo e limites fornecidos pelo usuário/handoff. Estas escolhas de engenharia não são decisões de domínio da equipe.
