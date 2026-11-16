# Contrato operacional

- Inserir somente as identidades constantes no inventário público do pacote.
- Recusar banco diverso de hf_ui038_test e exigir uso explícito do destino Universo IF confirmado pelo usuário.
- Senhas apenas como bcrypt no plano privado; nenhuma credencial no inventário público ou Git.
- Medições passam por parseEnvironmentalInput/hashPayload; IHFR usa loadActiveIHFRManifest/evaluateIHFR e projeção pública existentes.
- Suplemento com proveniência AUTHORIZED_RECORD; observações indicam cenário fictício.
- Sem escrita em AreaCover, CoverUploadAttempt ou CoverCleanupJob.
