# Contratos e matriz de consumidores

| Rota | Componente | Contrato preservado | Regressão |
|---|---|---|---|
| /register | RegisterPage + AccountShell split + PasswordField | signUp(payload,chave), sem destino mock | cadastro real/zero POST duplicado/retry/hidratação |
| /verify-email | EmailVerificationForm + AccountShell | código texto, expiração, tentativas, resendKey, fetchUserData, logout | zero inicial/cooldown/expiração/confirmar/reenvio |
| /forgot-password | ForgotPasswordForm + AccountShell | resposta neutra, requestKey | teclado/retry/loading |
| /reset-password | PasswordResetForm + PasswordField | fragmento limpo, prova memória, geração, INVALID_PROOF | prova válida/inválida/reload/confirmação |
| /change-password | PasswordResetForm authenticated + PasswordField | senha atual, política15 caracteres/72 bytes, revogação | sessão/logout/login novo |
| /delete-account | AccountDeletionForm + PasswordField | GET seguro, blockers, canDelete, confirmação, returnTo | bloqueada/permitida/restrita |
| /login | código e CSS existentes | signIn e destinos reais | suite frontend-login inalterada |

FR-001–FR-006: preservar endpoints e estados existentes, sem alterar auth.context/account-client/serviços. FR-007: inércia SSR, bloqueio síncrono de envios, feedback visível. FR-008: foco visível, senha com aria-pressed, alvos44 e reflow. FR-009: painel do cadastro e cartão harmonizado nas cinco outras telas.

Erros gerais permanecem role=alert; apenas erro específico local pode marcar campo. Status de prontidão/envio não deve gerar anúncios de sucesso falsos. Exclusão mantém tom vermelho e botão desabilitado sem confirmação. Estado sem prova nunca deve expor formulário de reset utilizável.

Evidências: screenshots explícitos com mask de todos os inputs; trace/video/screenshot automático desligados para novas jornadas. Sem token/fragmento no nome/legenda de captura. UI interceptada será descrita como tal, separada de E2E com serviços reais sintéticos.
