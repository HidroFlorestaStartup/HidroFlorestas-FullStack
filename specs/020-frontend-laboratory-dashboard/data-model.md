# Modelo observado
EVIDENCIA_IMPLEMENTACAO: DashboardSummary contém context,totals.areas,totals.confirmedCollections,links.areas. DashboardHistoryPage contém items,page.nextCursor;eventos id,type,label,area,eventAt,destination. MembershipDto contém id,name,initials,role;context com membershipRole/readOnly. Nenhum schema/DTO/projeção novo.
Estado client: leitura pendente/sucesso/erro,abort;histórico stack/index/attempt;mutação de membro busy/inFlight,expectedRole. Mudança de laboratório deve invalidar leituras/cursores antigos.
