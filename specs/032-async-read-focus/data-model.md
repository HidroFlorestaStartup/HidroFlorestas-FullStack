# Dados existentes e estado de foco

`EVIDENCIA_IMPLEMENTACAO`: DashboardSummary, DashboardHistoryPage e TerritorialMapResponse continuam sendo as projeções atuais. Nenhum campo, endpoint, entidade ou persistência é introduzido.

`RECOMENDACAO`: cada leitor mantém apenas uma ref transitória para sua região DOM existente. O helper não armazena foco, contexto ou dados. A ação transfere foco antes do clearData; o foco corrente depois pertence ao navegador/usuário. Dados e abort/contexto continuam geridos pelo código atual.
