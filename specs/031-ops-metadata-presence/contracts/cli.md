# Contrato CLI sob demanda

`node scripts/ops-metadata-presence.mjs <inventario.json> <target> <branch>`

Argumentos posicionais obrigatórios, sem flags adicionais. Input conforme
[data-model.md](../data-model.md). Arquivo regular até1MiB. Sem env/rede.
stdout: JSON da avaliação válida com newline; nunca repete branch ou caminho.
stderr inválido: `OPS_METADATA_INVALID_INPUT`, exit1.
exit0:18 presentes; exit2:algum ausente. Ambos preservam gates BLOCKED.
Branch é exigida até em production/development; nesses targets somente globais.
Formato v1 da branch:1–200 caracteres ASCII, primeiro alfanumérico e demais
alfanuméricos ou `._/-`; nenhum espaço/controle. É um subconjunto deliberado
para este instrumento, sem pretensão de validar toda a gramática de refs Git.
