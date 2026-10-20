# Verificação do limite do logger novo

EVIDENCIA_IMPLEMENTACAO — 19/10/2026: revisão adicional do logger introduzido nesta missão encontrou descarte incompleto de uma linha maior que1MiB quando recebida em chunks. Após zerar o buffer, o código inicial podia imprimir a continuação da mesma linha. A reprodução usa somente segredo sintético e stream em memória; não usa credenciais reais ou aplicação.

O teste `IMP-006 Next output discards an oversized line through its final continuation` foi executado antes da correção: **RED1FAIL**. A saída continha o marcador de limite, a continuação sintética indevida e a próxima linha segura. A expectativa exige somente o marcador e a próxima linha segura.

Correção: após exceder o limite, descartar os chunks até o próximo newline, inclusive a continuação. Depois retomar a linha seguinte. O marcador não repete a linha descartada. Não muda logger de produção preexistente nem regras de aplicação; trata o código diagnóstico novo desta missão.

GREEN: **8/8 testes de diagnóstico PASS**, incluindo o novo teste com a mesma expectativa, segredo dividido entre chunks, cookie, última linha parcial e demais garantias existentes. Comando: `node --import=tsx --test tests/unit/imp006-gate-diagnostics.test.ts`.
