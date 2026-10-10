# Rascunhos pessoais de medições

DECISAO_CONFIRMADA: usuário desta conversa, 2026-10-10, aprovou PD-CRI-005/006
com registro documental. [Proveniência](../plans/active/contas-rascunhos-imagens/decisoes-e-pendencias.md).
[Spec e contratos](../../specs/015-environmental-drafts/spec.md).

Um rascunho por usuário/coleta confirmada; nenhuma leitura de draft alheio. Abrir
registro ambiental e escolher registrar; salvar explicitamente, retomar na mesma
conta e recarregar deliberadamente quando houver conflito em outra aba. Após falha
de conexão, repetir o salvamento com os mesmos campos; a chave conservada evita
duplicação. Se houver conflito, o preenchimento local continua na página até o
usuário aceitar recarregar. Descartar exige confirmação e elimina definitivamente
o rascunho pessoal. Não existe prazo de expiração nem rotina de limpeza automática.

Ao confirmar medições, versão própria vigente é consumida na mesma transação da
medição; rollback conserva o rascunho. Confirmação por outro usuário não apaga
drafts pessoais alheios. Consulta remanescente permite leitura/descarte; não altera
medições imutáveis. Exclusão de conta só remove drafts próprios após os bloqueios
013 terem sido satisfeitos e dentro da transação de exclusão. Lab inativo lê sem
mutar; vínculo/sessão atuais são sempre necessários.

Medição exige todos os critérios científicos existentes; salvar incompletos não
afrouxa a confirmação. UI distingue zero, Não, ausência e texto em edição. Salvar
aceita JSON <=32KiB e raw <=1000 caracteres por campo. Não enviar dados pessoais
desnecessários nos campos. Sem backup/ledger de drafts descartados.

Aviso de saída: beforeunload depende das regras do navegador; links internos são
interceptados. Voltar/Avançar cancelados foram verificados em Chromium via Navigation
API cancelável; outros navegadores sem essa API não têm essa garantia. Salve antes
de navegar. Fechar processo/dispositivo não garante disparo do aviso.

Validação local usa Pg loopback próprio/synthetic fixtures e fake de e-mail. Migração
aditiva 20261010000100_environmental_drafts; rollback da aplicação conserva tabela,
nunca remove ciência ou migrations históricas. Nenhuma migration remota executada.
IHFR continua CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
