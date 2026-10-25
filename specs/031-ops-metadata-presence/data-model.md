# Modelo do inventário

Objeto fechado {schemaVersion:1, records:[]}. Cada registro fechado contém
key (um dos 23 nomes enumerados na seção Key Entities da spec:18 operacionais
e5 de baseline aceitos sem contagem na saída),
target (lista não vazia de production|preview|development, sem duplicatas),
gitBranch (null ou branch de preview). Até1000 registros, sem duplicata por
key/target/gitBranch. Valores e campos adicionais são recusados.

Avaliação contém somente target, total18, presentCount, missingCount,
entries[{key,status}], gates{G3,G4,G5:BLOCKED}. Estados:
PRESENT_GLOBAL, PRESENT_BRANCH, MISSING. Presença global tem precedência de
relato se ambas existirem; relatório não escolhe nem inspeciona valores.
