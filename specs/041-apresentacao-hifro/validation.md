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


## Adendo — capas estáticas e seleção regional

DECISAO_CONFIRMADA: Pedro testou o envio no navegador e forneceu print com “O serviço de imagens está indisponível”. Aceitou a alternativa estática e exigiu manter os botões. Depois apontou a inadequação regional das fotos genéricas; a nova seleção usa babaçu/cultivo identificados na fonte como Itapecuru-Mirim e rio Itapecuru em Rosário, com créditos CC BY-SA 4.0/3.0.

EVIDENCIA_IMPLEMENTACAO: somente apresentação na lista/detalhe para os três pares exatos laboratório/área. Fotos públicas ilustrativas, sem escrita no banco ou simulação de upload. Capa real prevalece, inclusive quando indisponível; erros não são escondidos pela ilustração. Handler de envio, validação de arquivo, revisão/idempotência, recarga/remoção, mensagens e condições dos controles são idênticos à base. Alteração restrita ao frontend, fotos e documentação; sem configuração, migração, dependência, roteiro ou script de gravação.

Validação desta alteração:

- Checklist existente: 16 marcados, zero pendentes; não alterado.
- Typecheck e lint focal dos três módulos: PASS.
- Build Next completo com Prisma generate: PASS. Aviso npm preexistente sobre configuração http-proxy; sem erro de build.
- Verificação local por renderização do componente real: 26 verificações PASS, cobrindo os três ativos/dimensões/ausência de EXIF, igualdade dos arquivos público/documental, rejeição de IDs/laboratórios alheios e propriedades herdadas, prévia ilustrativa com feature ligada/desligada, autoria/licença, prioridade do conteúdo privado/revisão/retry e comportamento original de outra área. Comparação exata comprovou preservação dos handlers e bloco de controles.
- Contratos existentes de capa: 2/2 testes PASS (revisões fechadas e sanitização/limites de imagem).
- Fotografias originais inspecionadas; versões 1600×900 com fontes, alterações, licenças e hashes atuais. Novos tamanhos: 299179/436435/259697 bytes. Procedência inicial permanece em selecao-inicial-substituida.json; recibos iniciais preservam suas evidências históricas.
- Revisão React focal: hooks estáveis, sem novas requisições, prioridade baseada no DTO atual, callbacks de sucesso não usados pela foto estática, dimensões/alt/créditos definidos, leitura condicionada ao fluxo autorizado existente.
- Diff sem alterações em backend, schema, autenticação, APIs ou handlers do serviço; git diff --check PASS.

Limites atuais: teste visual autenticado da nova versão e teste de upload em produção não executados nesta alteração; o teste manual anterior falhou no serviço. A seleção de arquivo estava disponível, portanto o print não demonstra ausência da feature flag. A causa específica exige investigação de configuração/logs. As imagens estáticas precisam de novo deploy para aparecerem no ambiente principal; esta validação não homologa o serviço Cloudinary. Main/development não são integradas por esta publicação na PR65.
