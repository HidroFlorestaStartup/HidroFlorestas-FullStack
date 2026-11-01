# Comparação UI06 B — CLOSE-PARALLEL-02

Estado: NOT_RUN neste corte de implementação. Não é análise de PNG executado.
Fonte da intenção: decisões UI02/03/04/06 confirmadas por Pedro em972f9b00.
Fonte do produto: candidata composta6c61056f como base; novo CODE_SHA_TESTED ainda não existe.
Referência: startercbb954a, somente leitura. Capturas a obter no job ui-b do coordenador.

| ID | Classificação estática / fonte | Impacto esperado e tratamento |
|---|---|---|
| EQ-B1 | EVIDENCIA_IMPLEMENTACAO; route área do starter ordena confirmedAt | NON_EQUIVALENT no caso área povoada; FullStack deve obedecer ocorrência/offset e mostrar origem CURRENT anterior. Não copiar ordenação antiga. |
| EQ-B2 | EVIDENCIA_IMPLEMENTACAO; adapter/mock.ts declara fixtures predefinidas | NON_EQUIVALENT nos resultados numéricos/decomposição; comparar hierarquia, densidade, tipografia, navegação e acesso às ações, sem recalibrar ciência. |
| EQ-B3 | EVIDENCIA_IMPLEMENTACAO; arrays/maps do adapter são de memória | Reload perde fixture criada; registrar observação real antes de reconfigurar escala e marcar NON_EQUIVALENT. |

Análise visual obrigatória após runtime: selecionar imagens dos dois projetos por SHA/run/attempt/case;
descrever hierarquia, tipografia, densidade, navegação e ações; identificar cada diferença com arquivo,
caso, severidade e owner. Inspecionar todos os findings bloqueantes e imagens representativas de todas
as classes de viewport/estado. Nenhuma diferença de imagem foi declarada observada por esta tabela.

Aceite humano: HUMAN_ACCEPTANCE_PENDING. Quatro qualificadores IHFR permanecem obrigatórios;
comparação técnica não é validação científica definitiva ou homologação de provedor.
