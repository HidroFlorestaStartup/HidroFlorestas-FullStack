# Parecer documental CHAT — C1 / HF-DOC-20261024-CHAT02

**C1 concluído com limites explícitos e revisão independente documental apta.** C0 original preservado. Os arquivos LOCAL realmente anexados foram lidos e verificados. A publicação Git permanece bloqueada e não condiciona o fechamento documental.

## Resultado principal

A matriz agora contém **40 registros com oito eixos cada**:30 subcapacidades de IMP-002–009 e10 fronteiras. Um resumo de oito IMPs conserva64 células separadas de implementação, validação local, CI, revisão técnica, homologação, aceite humano, ciência e integração. Código material observado em development não vira ausência de implementação por falta de homologação; tampouco vira aceite por existir ou ter testes históricos.

A revisão independente tratou um P2 de apresentação (32 células antes vazias) e dois P3, de estado de proveniência e link no parecer; zero P0–P2 documental aberto. Três divergências LOCAL foram tratadas com fonte primária: avatar de iniciais ausente no popup geral de membros; tentativa/jobs de capas precedem upload do asset, após validação do preset; mismatch de ownership em cleanup resulta BLOCKED. Os arquivos originais LOCAL permanecem intactos. A primeira diferença refina IMP-002-C02 para PARCIALMENTE_IMPLEMENTADO no critério FR-015; as operações de laboratório presentes continuam reconhecidas.

As fontes de produto examinadas estão na base **c4adfb379e5dc78f27f31b91edbd13f43228d9f9** e conservam identidade nas fontes correspondentes da candidata **00477e961e36416d8d602d36f7e0ee195c487148**. O delta próprio da #29 tem 91 caminhos e não modifica src/prisma/package. Não atribuir a essa PR a primeira implementação dessas capacidades; ela entrega investigação, evidências, instrumentos e configurações no recorte próprio.

## Provas e limites

| Dimensão | Resultado |
|---|---|
| C0 | ZIP, relatório, manifesto e20 arquivos originais reconferidos; preservados. |
| LOCAL | ZIP 234.461 bytes, recibo 7.684 bytes,16 documentos,17 entradas, CRC/hashes PASS; JSON/Markdown dos 40 registros equivalentes. |
| Proveniência LOCAL | PARTIAL: commit 6f24cb3 anunciado e verificado no ambiente LOCAL segundo relato; objetos Git não vieram no ZIP. Hash não comprova autoria ou intenção. |
| Fontes |500 metadados LOCAL comparados com árvores congeladas; 247 pares SHA/caminho materializados e rehashados pela equipe, com leitura integral/dirigida discriminada. Não alegado rehash de500 blobs ou auditoria universal. |
| C1 | Confronto, validação e revisão documental concluídos com limites;28 documentos propostos, dois patches e manifesto no pacote. |
| Testes/CI/build desta missão | NOT_RUN. Quinze PASS da #29 conservam SHA 00477e9 e alcance histórico agregado. |
| Publicação Git | PUBLICACAO_BLOQUEADA_POR_GATILHO; sem branch/ref/PR/push novo. |
| Codex remoto próprio | NAO_SOLICITADO_PUBLICACAO_BLOQUEADA. |
| Operação/aceites | Nenhum provedor operado; configuração, merge, deploy, e-mail, piloto e aprovação humana/científica não realizados. |

## Oito recomendações para ratificação

| ID | Tema | Recomendação principal |
|---|---|---|
| DOC-D01 | #29 | Decidir primeiro a candidata 00477e9, com parecer técnico favorável com ressalvas; mantenedor confere HEAD no ato. Nenhum APPROVED/merge por CHAT. |
| DOC-D02 | Code-First | Adotar o adendo C1 e os quatro apontadores após revisão, com as três erratas e lacunas explícitas; preservar todos os cortes antigos. |
| DOC-D03 | #28 | Recomendar supersessão da finalidade preparatória e futuro fechamento sem merge integral, preservando3 documentos novos,2 adendos exclusivos e3 apontadores por fonte. |
| DOC-D04 | #27 | Preservar/referenciar206 caminhos documentais e recomendar composição focal; separar as 2 configurações conflitantes para outro recorte. Documentar G3–G5 não exige PASS desses gates. |
| DOC-D05 | Instrumentos | Manter sob demanda; eventual promoção exige owner/custo/casos determinísticos e autorização própria. INV-002 quota é de capas. |
| DOC-D06 | Publicação | Concluir C1 sem remover regras false; eventual publicação de arquivos exige contenção comprovada e autorização específica posterior. |
| DOC-D07 | G3–G5 | Designar papéis e provar destino/isolamento/recuperação, contas/inbox/scheduler e jornadas; propor capas desligadas no primeiro piloto, com ratificação do recorte. Ciência permanece separada. |
| DOC-D08 | Alunos | Preservar4 documentos autorais e2 apontadores em d2168c8; síntese creditada sem importar ancestralidade inteira. |

O [quadro completo](decisoes-e-recomendacoes.md) e seu [JSON](decisoes-c1.json) conservam os onze campos, inclusive alternativa, efeito, dependência, risco, reversão, autoridade e estado. O [inventário exato](inventario-prs-c1.json) lista os caminhos e fontes;197 evidências da #27 estão enumeradas, sem alegação de revalidação visual integral.

## Documentos vigentes e históricos

| Documento | Uso |
|---|---|
| [Plano CHAT](../../plans/active/hf-doc-20261024/chat/plano.md) | Histórico C0, continuidade C1, equipe, escopo e término. |
| [Estado Code-First](../../code-first-prd/implementation/estado-conciliado-20261024.md) | Resumo oito IMPs e oito eixos. |
| [Conciliação](conciliacao-local-chat.md) | 40 linhas C0→LOCAL→primária→tratamento→decisão e320 células. |
| [Matriz C1](matriz-imp-c1.json) | Fonte estruturada vigente de classificações, evidências e limites. |
| [Decisões](decisoes-e-recomendacoes.md) | Oito recomendações completas; contraparte em decisoes-c1.json. |
| [Inventário das PRs](inventario-prs-c1.json) | 206+2 caminhos #27;8 #28;6 alunos; conflitos e limites. |
| [Consumo LOCAL](consumo-local-c1.json) | Identidade dos anexos,16 documentos, proveniência parcial e preservação. |
| [Fontes confrontadas](fontes-confrontadas-c1.json) | Pares SHA/caminho, hashes e alcance da leitura. |
| [Autoridade](mapa-fontes-autoridade.md) | Decisões de origem e mandato C1. |
| [RTH-P2-001](diagnostico-rth-p2-001.md) | Tratamento na proposta, sem declarar correção já integrada. |
| [G3–G5](matriz-prontidao-g3-g5.md) | Inventário histórico reutilizado sem mudança de bytes; não é consulta atual. |
| [Instrumentos](instrumentos-sob-demanda.md) | Seleção sob demanda e precisão CAPAS/IHFR. |
| [Publicação](gate-publicacao.md) | Bloqueio separado do fechamento C1. |
| [Revisão C1](revisao-independente-c1.md) | Parecer independente sobre os bytes próprios C1. |
| [Validação C1](validacao-documental-c1.json) | Verificações documentais proporcionais. |
| [Inventário para publicação](inventario-publicacao-c1.json) | Lista fechada do pacote de documentos, base e preservação. |
| [Handoff](handoff-final.md) | Atos humanos pendentes e contrato final. |
| [Matriz C0 histórica](matriz-imp-c0.json) | Snapshot imutável do checkpoint anterior. |
| [Revisão C0 histórica](revisao-independente.md) | Parecer dos bytes C0; não se transfere a deltas C1. |
| [Validação C0 histórica](validacao-documental.json) | Recibo do pacote C0; não validar arquivos C1 com seus hashes. |

PROJECT_CONTEXT.md, backlog.md, implementation-plan.md e DOCUMENT_REGISTER.md recebem apenas os quatro blocos propostos; seus corpos de origem c4adfb3 permanecem byte a byte. Evidencias-autoridade.json e fontes-operacao.json são recibos históricos C0 preservados. O pacote final contém patch contra a base identificada e delta C0→C1, sem código ou configuração.

## Equipe, método e lacunas

Três subagentes nativos reais: C-I (matriz002–005/sessão), C-D (decisões/topologia/fronteiras CRI) e C-R (revisão independente, sem autoria dos documentos revisados). Coordenação compôs006–010 e foi a única escritora dos apontadores. O nível nominal Ultra/xhigh não é exposto por recibo; foi usado o maior esforço disponível sem alteração global. Spec Kit instalado foi consultado no método transversal de consistência/checklist; nenhum pipeline de feature, spec funcional ou IMP novo foi criado.

Permanecem: lacuna FR-015, ingresso não localizado, Plotly futuro, decisão sobre PENDING, aceites humanos de módulos e IMP-010, homologação de destino/contas/e-mail/capas, responsáveis a designar e validação científica. São limites substantivos do produto/aceite, não impedimentos ocultos da documentação. O [handoff](handoff-final.md) descreve perguntas fechadas e critérios futuros; não pede os anexos já consumidos.

IHFR: CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO, NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
