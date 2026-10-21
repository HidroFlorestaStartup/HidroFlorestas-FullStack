# Verificação da landing candidata

1. Instalar exclusivamente as dependências travadas com Node 24.19.0; gerar Prisma quando necessário ao typecheck do projeto.
2. Executar lint/typecheck focais. Para inspeção pública isolada, servir Next em loopback e abrir `/` com Chromium real; isto não equivale ao runner oficial nem realiza preparação de banco.
3. Verificar logo, título, três jornadas, qualificações do IHFR, contexto institucional, destinos de todas as âncoras e links de acesso/cadastro.
4. Conferir 320/375/768/1440 px, 200% de texto e paisagem; capturar viewport e geometria, inspecionar as imagens. Não desabilitar animações/overlays para esconder obstrução.
5. Publicar somente com a branch protegida em vercel.json. O workflow `RC review checks` executa o runner oficial Windows e preserva evidências sanitizadas.
6. Vincular PR, SHA, run/attempt, 15 resultados, revisão independente e imagens ao registro final. Marcar cada gate como pendente até evidência real.

O runner `rc-review-validation.ps1 -InitializeCiCluster` é exclusivo do ambiente CI sintético e não deve ser executado nesta máquina Linux ou em banco de usuário. Aceite manual, copy institucional e homologação operacional são etapas separadas.
