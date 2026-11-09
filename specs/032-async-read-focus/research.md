# Pesquisa — foco nas leituras

Data2026-10-25. Escolhas abaixo são `RECOMENDACAO` técnica dentro do incremento autorizado.

## Momento da transferência

- Decision: focar sincronamente a região da consulta no handler explícito, apenas quando o acionador está focado.
- Rationale: não depende de rede, resposta ou efeitos posteriores; usuário pode mover foco durante await e nada o disputa. Carga inicial, abort e resposta antiga não executam foco.
- Alternatives considered: preservar dados/controles antigos cria risco de contexto obsoleto; restaurar no finally exigiria token/contexto/listeners e poderia roubar foco; ambos dispensáveis.

## Região estável

- Decision: reutilizar SECTION raiz sem key em todos os retornos de summary/history; ref/tabIndex e outline na raiz. Mapa usa DIV persistente com role=region e aria-labelledby do h1 persistente.
- Rationale: React preserva nó do mesmo tipo/posição; teste de identidade comprovará o comportamento efetivo. Nome acessível existe durante cada estado. O shell já revela foco existente e não precisa mudar.
- Alternatives considered: heading persistente exigiria reorganizar mais markup nos leitores com earlyreturn; permanece alternativa se a geometria não atender aos critérios. Foco BODY não conserva orientação.

## Helper e padrões locais

- Decision: função pura curta recebe trigger e região; se trigger é activeElement, chama região.focus; não mantém estado.
- Rationale: evita repetir o guard em três componentes, sem hook assíncrono genérico. Workspace/collection-review/admin já usam heading como alvo; o padrão workspace de foco posterior sozinho não protege intenção posterior.
- Alternatives considered: hook com listeners de focusin/Tab/pointer/blur é desproporcional à estratégia síncrona.

## Crítica independente

`FATO_DOCUMENTADO`: /root/fr015/focus_review revisou fontes/recibos, executando0 cenários próprios, e considerou a estratégia proporcional. Ressalvas incorporadas ao plano: identidade do mesmo root, nome em todos os estados, outline no root e teste de região longa320/texto200. A investigação do autor executou12 cenários próprios antes deste incremento; testes novos terão recibos próprios no baseline032.
