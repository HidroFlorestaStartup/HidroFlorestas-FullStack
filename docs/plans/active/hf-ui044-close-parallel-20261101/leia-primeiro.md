# Início da missão paralela HF-UI-044-CLOSE-PARALLEL-02

**Pacote preparado, não executado.** Repositório exclusivo `HidroFlorestaStartup/HidroFlorestas-FullStack`.

## Caminho recomendado

Abra uma conversa no Codex Local com o repositório correto. Envie o mandato de execução do **PROMPT00**. O coordenador lê [prompts-de-execucao.md](prompts-de-execucao.md), aplica o contrato comum, delega três workers reais, integra seus commits e executa a validação. Use [01](prompts-de-execucao.md#prompt-01--hf-ui044-close-a-harness), [02](prompts-de-execucao.md#prompt-02--hf-ui044-close-b-visual), [03](prompts-de-execucao.md#prompt-03--hf-ui044-close-c-capture-git) em chats separados somente como alternativa à delegação nativa; não duplicar workers já ativos. [04](prompts-de-execucao.md#prompt-04--hf-ui044-close-qa-final) é revisão não autora após congelar a entrega.

| Papel | Resultado obrigatório | Pode começar |
|---|---|---|
| 00 Coordenador | worktrees/contrato, CI compartilhada, publicação e handoff final | Primeiro |
| 01 A/harness | escala/fontes/reload confiáveis e comparação do shell | Após receber worktree/contrato; paralelo com02/03 |
| 02 B/visual | comparação área/coleta/IHFR, fixtures e análise de diferenças | Após receber worktree/contrato; não precisa aguardar o helper para ler fontes/escrever casos |
| 03 C/capturas/Git | PNG+JSON UI037 preservados e conciliação documental quando ainda necessária | Paralelo com01/02 |
| 04 QA | revisão não autora da árvore e dos artefatos finais | Inspeção antecipada; conclusão após execução |

## Precisão dos limites — aplicar junto do contrato comum

1. **Host versus runner:** a proibição de alterar permissões/ACL refere-se ao computador do operador, contas reais e infraestrutura existente. O entrypoint oficial ESTÁ autorizado a criar e verificar as ACLs do PostgreSQL sintético exclusivamente no runner GitHub-hosted descartável, como já faz. Não editar o helper de proteção nem reaproveitar marker/credencial/banco do host. Esta precisão elimina uma leitura contraditória da regra geral; não é liberação de administração do host.
2. **Publicação de evidências:** somente PNG/JSON/logs sintéticos sanitizados, allowlist explícita, retenção14dias e digest/CRC. Dados reais, .env, tokens, cookies, banco e respostas brutas de conectores nunca entram nos artifacts. Conservar cópia local verificada das provas finais pertinentes; não expor paths privados no recibo público.
3. **Orçamento explícito:** até três novos SHAs/rodadas na branch QA indicada, uma tentativa por SHA, quatro jobs no máximo (5+35+35+35min), até330 runner-minutes configurados. CI automática decorrente de publicação material em A/B/C deve ser registrada separadamente; limite adicional nesta missão de uma publicação consolidada por owner e três jobs oficiais de35min no máximo. Teto combinado445 runner-minutes configurados, não estimativa nem compromisso de gasto. Não abrir um ciclo adicional quando faltar orçamento; preservar resultado parcial e devolver bloqueio específico. Não pedir permissão para pequenos reparos já incluídos nesses limites.
4. **Skills e remediação:** `$speckit-analyze` continua somente leitura. A remediação das falhas técnicas descritas está explicitamente autorizada na fase PLAN/IMPLEMENT deste mandato. A confirmação para prosseguir com checklist aberto referente ao trabalho desta missão já está contida no envio do prompt; isso não aprova o checklist nem remove conflitos normativos. Não mudar constituição/governança para obter PASS.
5. **Contexto e privacidade:** tags XML servem para separar papel, escopo e saída. Não elevam privilégios, não garantem ferramentas e não dão autoridade científica. Ferramentas de aprovação nativas continuam vinculantes. Pesquisa web usa fontes primárias e queries sem conteúdo privado. Nenhum trabalho Atlas/R4/AP04 pertence a este pacote.
6. **Relatório final:** a lista oficial possui15 gates; a frase retórica da seção04 não indica um gate adicional. Informar execução, comparabilidade, requisito e completude como eixos distintos. Há diferença entre um teste que rodou com FAIL e um requisito aprovado.

## Fontes já persistidas

- [Contrato comum e cinco prompts completos](prompts-de-execucao.md).
- [Patch técnico de partida, inerte](ui06-fix-scale-fonts-reload.patch), SHA256 `5e38263d27e2297daac8a7d87fb54a12a17c267ea23d7cb57623fbf6c3911939`, blob Git `c27466ab2585c79f4c042cd1e8c62a1d5af63fc9`.

O coordenador deve consultar os arquivos pelo mesmo SHA do pacote, não precisar de anexos deste chat nem de um path C:/Users/… de outra sessão. Os arquivos de produto e as fontes históricas possuem pins próprios no contrato e precisam de reconfirmação por HEAD antes de alterações.

**Entrega desta preparação:** documentação e patch inerte. Nenhum teste, workflow novo, runtime, merge ou deploy foi executado ao publicar este pacote.
