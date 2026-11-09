# Modelo de apresentação
Nenhuma migration, schema ou persistência nova.

- PublicLaboratoryDto: id, name, createdAt, status ACTIVE/INACTIVE, isOwner; GET/api/laboratories.
- LaboratoryDetailsDto: DTO público mais members{name,initials}; GET/api/laboratories/:id.
- LaboratoryContextDto autorizado no servidor: id/name/status/membershipRole OWNER|ADMIN|MEMBER/readOnly. Sem acesso cross-lab ou substituição automática.
- Principal: requireAuth fornece role global usado para navegação; autoridade final permanece no backend.
- Estados locais: loading/error/retry/lista/vazio, criação em andamento, selected/details/settingsLoading/riskAction/confirmationName e menu aberto/fechado. Nenhum laboratório selecionado é persistido fora da URL.
- POST{name}, PATCH/DELETE{confirmationName}; mensagens e parser existentes. Limite5 inclui inativos/participações.
- Sessão/logout: AuthContext/AuthSessionRestorer existentes, cookies/POST reais; sem armazenamento de tokens ou alteração de geração/revogação.
