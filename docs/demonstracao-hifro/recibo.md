# Recibo operacional — 16/11/2026

## Aplicação

Destino confirmado por Pedro: Universo IF (`br-green-firefly-b65qnqxd`), projeto Neon `hidden-art-76143033`, banco `hf_ui038_test`. Nome técnico do banco mantido; é o destino de produção informado pelo usuário.

A transação final contém 82 inserções, um lock, um guard e uma consulta de conferência. Primeiro aplicada com sucesso em `validacao-hifro-20261116` (`br-falling-moon-b6idu15g`), cujo schema foi comparado ao da produção e não apresentou diferenças. Depois aplicada de forma atômica na Universo IF. Nenhum UPDATE, DELETE, DROP, ALTER ou migration.

| Registro | Antes | Acrescentados | Depois |
| --- | ---: | ---: | ---: |
| Usuários | 3 | 5 | 8 |
| Laboratórios | 2 | 1 | 3 |
| Áreas | 3 | 3 | 6 |
| Coletas | 5 | 12 | 17 |

Novo laboratório: cinco vínculos (OWNER/ADMIN/ADMIN/MEMBER/MEMBER), onze medições, nove suplementos, nove diagnósticos vigentes, nove operações e nove eventos de criação. As três áreas têm quatro coletas cada. Contas ACTIVE, emailVerifiedAt preenchido e papel global USER.

## Conferência do acesso

O endereço anterior `hidro-florestas-full-stack.vercel.app` retornou 404. O endereço [hidro-florestas.vercel.app](https://hidro-florestas.vercel.app/) apresentou a landing atual e foi confirmado pelas consultas autenticadas aos novos dados.

Login Hifro: HTTP200, success=true, destino /workspace, sem etapa de confirmação de e-mail. Leituras HTTP200: perfil, laboratório, equipe, áreas, mapa, detalhe das três áreas, uma medição e um IHFR. Os totais e papéis também foram conferidos diretamente no banco. O endpoint de criação de coleta aceita POST; os detalhes de área usam seu GET próprio. A resposta do mapa confirmou quatro coletas em cada uma das três áreas; as contagens também foram conferidas no banco, sem alterar a aplicação.

## Capas e limites

Três JPEGs preparados, fontes/CC0 verificadas e arquivos inspecionados visualmente. Nenhuma linha nova em AreaCover/CoverUploadAttempt/CoverCleanupJob pelo plano. Upload aguarda confirmação do desenvolvedor, conforme pedido.

Não foi feita gravação, roteiro ou script Playwright de apresentação. Nenhuma mudança no código do produto, autenticação, ciência, schema ou configuração dos ambientes. A branch de validação fica conservada como evidência; não foi conectada à produção. Dados fictícios não certificam campo nem validação científica.

[Recibo estruturado](recibo.json) · [Inventário](inventario.json) · [Validação detalhada](../../specs/041-apresentacao-hifro/validation.md).
