# Modelo de dados do instrumento

Não há entidade persistente nova da aplicação. RunRecord: versão do instrumento, SHA/fingerprint funcional, Node/Windows/PostgreSQL, modo dev, UTC, duração, resultado e limites. FixtureRecord: IDs aleatórios somente em memória, lab alvo100/1000 e ruído10/100. MeasurementRecord: warmups10, amostras100, p95NearestRankMs, payloadBytes e metas técnicas. QueryEvidence: hash SQL, parameterCount e plano reduzido a nomes estruturais/cardinalidades/tempos/buffers. BrowserEvidence: áreas100, navegação por teclado, hrefs válidos, requests externos abortados e latência de lista. CleanupRecord: servidor encerrado e schema removido pelo lifecycle; falha impede PASS.

Sem emails, nomes pessoais, credenciais, cookies, connection strings, parâmetros SQL ou payloads científicos no recibo. IDs sintéticos não serão tratados como dados reais.
