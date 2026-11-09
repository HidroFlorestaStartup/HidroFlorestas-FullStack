# Validação sintética — iniciais no popup

Pré-requisitos: Node24.19+, dependências do lock instaladas por `npm ci`, Chromium disponível para Playwright. Se necessário, definir `PLAYWRIGHT_CHROMIUM_EXECUTABLE` com o caminho local do navegador. Não carregar `.env`, banco ou SMTP.

1. Executar `npx playwright test --config tests/ui/member-popup.config.ts` no worktree029. O teste compila o componente real e seus estilos; toda resposta HTTP é interceptada. Esperado: seis testes aprovados, cobrindo nomes/iniciais, dados vazios/acentos, nomes repetidos/longos, rolagem, teclado/foco a 320px/1280px e reflow equivalente a 200% (viewport físico 640px,320px CSS, escala2). É emulação de reflow, não interação com o zoom real do navegador; nenhuma comunicação externa.
2. Após gerar Prisma localmente, configurar nesta sessão uma DATABASE_URL sintética loopback com porta fechada, sem ler configurações reais, e executar `node --import=tsx --test tests/unit/laboratory-contracts.test.ts tests/unit/laboratories-service.test.ts` para o contrato atual de leitura. Usa mocks sintéticos, sem conexão de banco.
3. Executar `npx eslint src/components/workspace/laboratory-workspace.tsx tests/ui/member-popup.spec.ts tests/ui/member-popup.config.ts`.
4. Executar `npm run typecheck` após geração Prisma local se os tipos gerados estiverem ausentes. Geração não é migration nem conexão de banco. Registrar bloqueio sem acessar banco remoto se a instalação impedir o passo.

O teste de navegador deve falhar no baseline pela ausência do avatar antes da alteração e passar depois. Não representa execução Next completa, homologação humana ou validação científica. Resultado e comandos efetivos ficam em [implementation-evidence.md](implementation-evidence.md).
