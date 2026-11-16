# Validação — preparação Hifro — 16/11/2026

## Autoridade e base

DECISAO_CONFIRMADA: Pedro autorizou criação de conta/equipe/áreas/coletas e preparação de capas para apresentação pública, sem roteiro/Playwright e sem upload das capas até confirmação. Identificou Universo IF como branch do banco da produção e escolheu hifro@hf.example como identificador fictício, sem caixa postal.

Base Git main c007f17759f9936ab3139d2ac77192050ae2534c, incluindo o mascote do cabeçalho integrado por outro desenvolvedor. Worktree próprio inicialmente limpo. Não foram alterados arquivos de produto, dependências, schema, autenticação ou configurações.

## Preparação e resolução de impedimentos

- Inventário inicial do destino: três usuários, dois laboratórios, três áreas e cinco coletas; nenhum dos cinco e-mails pretendidos existia.
- Primeiro plano tentou espelhos em tabelas legadas e falhou por enum SUSPERCTED. Rollback confirmado pelos totais iniciais. A inspeção do serviço atual comprovou uso exclusivo de EnvironmentalMeasurementSet; os espelhos legados foram retirados do gerador.
- A revisão automática bloqueou duas tentativas seguintes ao interpretar SUSPECTED dentro do JSONB como valor do enum legado. A diferença entre JSONB e enum foi inspecionada sem escrita. Para uma alternativa inequívoca e igualmente apropriada ao cenário fictício, adotou-se NONE, válido nos dois contratos, recalculando os resultados e todos os hashes pelo código existente.
- Universo IF tem expiração e o Neon não permite branches filhas desse tipo; a cópia isolada foi criada da branch base ui038-teste-20261112. Uma configuração explícita de suspend timeout foi recusada pelo plano; foram mantidos os padrões do provedor. Somente uma branch de validação foi criada com sucesso.
- Comparação do schema da validação com Universo IF: diff vazio. Plano corrigido aplicado na cópia e depois em produção, ambos com sucesso.

## Verificações

- `npm ci`: lockfile preservado, 562 pacotes instalados. Prisma generate e Next typegen locais para conferir tipos; sem migration.
- `npx tsc --noEmit`: PASS após corrigir a tipagem literal do uso do terreno.
- `npx eslint scripts/prepare-hifro-presentation.ts`: PASS sem avisos.
- Medições: parseEnvironmentalInput e hashPayload vigentes; onze payloads aceitos.
- IHFR: manifesto verificado, nove avaliações suficientes e projeções públicas aceitas. Todas as versões, hashes, decomposições e resultados provêm do código ativo. Classes alta/moderada/baixa; estado EXPERIMENTAL preservado.
- Plano final: 85 statements, dos quais 82 INSERTs; sem comandos destrutivos, sem tabelas de capas ou legadas. Guards contra banco errado e identidades preexistentes; aplicação atômica.
- Conferência Neon: cinco contas ACTIVE com acesso liberado, cinco vínculos nos papéis corretos, três áreas/quatro coletas cada, onze medições e nove ponteiros/diagnósticos. Totais anteriores preservados por inserção exclusiva.
- Login real no endereço principal: HTTP200, success=true, destino /workspace. Leituras autenticadas de perfil/laboratórios/equipe/áreas/mapa, detalhes das três áreas, medição e IHFR: HTTP200. Consulta incorreta GET no endpoint POST de criação de coletas retornou405; o detalhe das áreas foi conferido pelo GET correto, e as contagens de históricos pelo banco.
- API do mapa: três áreas e quatro confirmedCollections em cada; API de equipe: cinco vínculos, conferidos nas respostas HTTP reais.
- Fotos: três arquivos CC0, 1600×900 JPEG, sem EXIF, 294152/386784/101732 bytes; fontes, autores, mudanças e SHA-256 registrados e imagens inspecionadas.
- `git diff --check`: PASS; segredos e código de ingresso excluídos do pacote público.

## Limites

Sem testes destrutivos, fluxos de exclusão, gravação ou suite Playwright. Sem novas suítes gerais ou build da aplicação, pois só foram adicionados gerador operacional/documentação/ativos; o produto não mudou. Capas aguardam a confirmação solicitada. Endereços .example são identificadores fictícios de login e não recebem recuperação por e-mail. Credenciais e plano SQL com hashes/código de ingresso permanecem fora de Git.

[Recibo estruturado](../../docs/demonstracao-hifro/recibo.json) e [inventário](../../docs/demonstracao-hifro/inventario.json) identificam os registros criados, sem senhas.
