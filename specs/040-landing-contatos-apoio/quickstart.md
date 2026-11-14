# Verificação

1. Instalar o lockfile com `npm ci` e executar `npm run build`, `npm run lint` e `npm run typecheck`.
2. Iniciar o build e executar somente `tests/e2e/frontend-landing.spec.ts` com configuração pública, sem login, banco ou fixtures. Os oito cenários abrangem responsividade, texto ampliado e navegação de acesso.
3. No rodapé, conferir e-mail, Instagram com ícone e os apoiadores. Conferir a ausência da coluna Projeto e a nova primeira frase em Nossa solução.
4. Revisar o diff para confirmar o recorte. Resultados e limitações em [validation.md](validation.md).
