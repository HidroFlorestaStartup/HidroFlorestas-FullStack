# Pesquisa focal

`EVIDENCIA_IMPLEMENTACAO`: Node24 suporta ESM e node:test sem instalar pacotes.
Escolha de implementação do agente: .mjs evita importar dotenv/server-only
ou iniciar serviços. Alternativa rejeitada: CLI Vercel embutida exigiria rede e
poderia ler valores. Conector autorizado consulta nomes, fora do instrumento.

`FATO_DOCUMENTADO`:18 nomes em evidencias-preflight.json do objeto943e21d;
policy.ts e mail/config.ts separam presença de validade. Allowlist é opcional
no parser atual; inventário histórico é material ao recorte de teste controlado,
sem requisito universal novo. ACCOUNT_TRUSTED_INGRESS depende da integração HTTP.
Numéricos com defaults não viram blockers por ausência.

Segurança: whitelist de campos e nomes conhecidos. Campos inesperados recusados
(inclusive value). Custom environments e snapshot do deployment não modelados.
