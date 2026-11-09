# Errata — referências de hash da revisão terminal R3

**Natureza:** retificação documental aditiva, não republicação da execução.

O arquivo histórico `docs/plans/active/hf-ui044-close-parallel-20261101/round-3.json` contém referências SHA-256 de uma versão anterior dos dois pareceres QA:

| Arquivo | SHA-256 citado no round-3.json | SHA-256 dos bytes finais em delivery-final.zip |
|---|---|---|
| `docs/reviews/hf-ui044-close-parallel-20261101/qa-final.md` | `a435eac7ba8ed92f7be33c38b991e7c42300443662b74a93dffc820812f01890` | `bff8f7b4b033aeeb13b88e2c8d98c78df9484e8f701fdcd09d372c04a7a6bd64` |
| `docs/reviews/hf-ui044-close-parallel-20261101/qa-final.json` | `b1adb35f6edc041422a261615e928eaf922d69eb5e9e61d9d4a90171790c720a` | `d826afad54d86c6e9189b7427297e9ee41d6200e01c2e614bca5c0b36e836a90` |

A origem precisa dos hashes antigos não foi verificada em árvore git correspondente; hipótese de estágio intermediário é apenas **INFERENCIA**. O manifesto final do ZIP passou nos 94/94 arquivos. Não alterar `round-3.json`, `qa-final.*` ou a interpretação do R3; esta errata vincula os bytes finais efetivamente recebidos, não prova aceite ou integridade de outros ambientes.
