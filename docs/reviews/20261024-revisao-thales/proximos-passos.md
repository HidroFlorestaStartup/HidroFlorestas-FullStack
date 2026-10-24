# Próximos passos para Thales

## Primeiro passo concreto

Depois de o mantenedor decidir e, se aprovado, integrar a PR #29, sincronize uma
branch nova a partir do `origin/development` atualizado e produza **somente o
adendo de reconciliação Code-First**. Não comece nova feature nem altere contrato
de produto nessa primeira mudança.

Saída mínima esperada:

1. matriz `IMP-002` a `IMP-009` com spec, rotas, serviços, páginas, testes,
   migration/evidência e pendências reais;
2. apontadores nos documentos canônicos sem apagar o corte histórico;
3. separação explícita entre `IMPLEMENTADO`, `VALIDADO_LOCALMENTE`,
   `VALIDADO_EM_CI`, `HOMOLOGACAO_PENDENTE` e `DECISAO_PENDENTE`;
4. manutenção integral dos quatro qualificadores do IHFR;
5. diff exclusivamente documental, validado e submetido à revisão humana.

Se a #29 não for integrada, use o SHA `00477e9` apenas como fonte imutável. Não
empilhe trabalho novo na branch investigativa e não replique os protocolos como
se fossem gates usuais.

## Ordem recomendada

### 1. Fechar a decisão da #29

- confirmar que base e head continuam `c4adfb3` e `00477e9`;
- registrar review humano no GitHub;
- se o SHA mudar, repetir checks e revisão aplicáveis;
- integrar antes de reconciliar #27/#28.

### 2. Reconciliar documentação Code-First

- preservar `docs/raw/**` e os textos Code-First como cortes históricos;
- adicionar um estado atual datado, sem promover evidência técnica a decisão de
  produto;
- usar código/testes/configuração como prova de implementação e documentos com
  origem explícita como autoridade de intenção;
- registrar pendências de UX, acessibilidade, operação e ciência separadamente.

### 3. Resolver a topologia das PRs antigas

- #28: tratar como preparação executada/supersedida; não fazer merge cego dos
  três arquivos conflitantes;
- #27: avaliar mérito e riscos G1–G5 separadamente; se for integrar, atualizar a
  branch sobre `development`, resolver workflow/Vercel conscientemente e validar
  o novo SHA;
- nunca usar o PASS de `131ade3` como PASS do head final `223839c9`.

### 4. Decidir o destino dos instrumentos investigativos

- se forem diagnóstico sob demanda, adicionar comando/runbook explícito;
- se virarem regressão permanente, selecionar apenas casos determinísticos,
  definir owner/custo e conectá-los a um gate suportado;
- preservar negativos e recibos; não relaxar timeouts/assertions para obter verde.

### 5. Higienizar configuração de branch

Somente após encerrar a necessidade de rerun da #29, remover ou generalizar as
entradas da branch investigativa no workflow e no Vercel. Fazer isso em commit
próprio, porque a mudança altera o SHA e precisa de validação própria.

### 6. Planejar G3–G5 com autoridade explícita

Antes de tocar em ambiente hospedado, designar owners e obter autorização para:

- contas, SMTP, recebimento e scheduler;
- isolamento e recuperação do banco hospedado;
- decisão Cloudinary/capas e fallback;
- suporte, janela do piloto e aceites humanos;
- validação científica aplicável ao IHFR.

## Checklist de segurança para a retomada

- [ ] `git fetch --prune` e refs/SHA reconfirmados.
- [ ] worktree limpa ou alterações preexistentes inventariadas e preservadas.
- [ ] branch nova criada da `development` realmente integrada.
- [ ] nenhum segredo copiado para documentação/log.
- [ ] nenhuma migration/deploy/operação hospedada sem autorização específica.
- [ ] Node compatível com `>=24.19 <25`.
- [ ] `prisma generate` antes da suíte em checkout limpo.
- [ ] unitários, typecheck, lint e build executados sequencialmente.
- [ ] typecheck repetido após o build.
- [ ] diff integral, JSON/links/whitespace e status final conferidos.
- [ ] review humano distinguido de comentários automáticos.

## Critério de parada

Pare e peça decisão humana se houver mudança de contrato, conflito entre fontes
de autoridade, operação externa, acesso a banco/provedor, merge, deploy,
aceitação de risco ou tentativa de declarar homologação científica/operacional.
