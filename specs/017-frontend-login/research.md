# Pesquisa e reconciliação — login 017

EVIDENCIA_IMPLEMENTACAO, 2026-10-18: o AuthContext existente realiza POST /api/auth/sign-in, interpreta o envelope, conserva credentials=include e usa o destino do servidor, incluindo /verify-email. A página deve continuar apenas consumindo signIn; nenhum contrato novo.

Decisão do recorte autorizado: reutilizar a candidata do pacote e CSS Module local. Razão: composição do starter sem transportar mocks, dependências e arquitetura TanStack. Alternativas descartadas: importar styles.css/global ou os componentes acoplados ao adapter; isso ampliaria o escopo e afetaria outras telas.

EVIDENCIA_IMPLEMENTACAO: guias instalados Next16.3.8 (`01-app/01-getting-started/05-server-and-client-components.md`, `11-css.md`, `12-images.md`, `13-fonts.md` e referência de Image) sustentam client component interativo, CSS Module local, import estático da logo e fonte do root. `priority` está deprecado; usar `preload` somente na nova página.

EVIDENCIA_IMPLEMENTACAO: os runners accounts/rc usam PostgreSQL sintético local com marcador, ACL e guards. Cluster dedicado já instalado e inicialmente parado; nenhuma URL ou credencial real é necessária. Não alterar guards, lifecycle policy, lockfile ou serviços externos.

Não há NEEDS CLARIFICATION material ao recorte. Revisão humana final não equivale a decisão técnica pendente para implementar o login.
