# HF-UI-044 — índice persistente para execução móvel

**Propósito:** permitir que um executor em outra conversa do ChatGPT consulte os artefatos publicados no GitHub sem anexos locais. Este índice é um suplemento documental da PR Draft #45, sem alterar o commit compartilhado `07755822f5dc75fe2be1d924005d30ed99f64a0b` de guardas/CI. O HEAD desta branch pode conter commits documentais posteriores; o SHA antigo continua sendo a base imutável A/B/C.

## Primeiro, leia estas fontes

- [Handoff G0 integral](handoff-de-execucao.md) — cópia exata do arquivo fornecido; SHA-256 `b37a056be30090ca1f1aba77df7cb9fae02c657a45b44c1635db7a1c153b0a09`.
- [Preparação — plano e ownership](plan.md), [preflight/validação](preflight-and-validation.json), [validador de guards](validate-guards.py) — já versionados no GUARD_SHA.
- [PR #45](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/45) — recibo G0, deltas e dependências.
- [PR documental #44](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/44), fonte normativa de UI-01–UI-07 **no SHA `972f9b00189bf09117883913d8c4fa63e69f4d2f`**. Não editar a #44.

## Prompts autossuficientes para copiar

- [Frente A — UI-01/05/06](prompts/implementar-frente-a.md) → [PR #46](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/46), `specs/035-ajustes-navegacao-conta/`.
- [Frente B — UI-02/03/04/06](prompts/implementar-frente-b.md) → [PR #47](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/47), `specs/036-ajustes-area-coletas-ihfr/`.
- [Frente C — UI-07](prompts/implementar-frente-c.md) → [PR #48](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/48), `specs/037-localizacao-endereco-opcional/`.

Use **uma conversa por frente**, com o respectivo prompt copiado. Cada executor deve ler o handoff G0, as decisões #44 e os arquivos da sua spec no GitHub, conferir HEADs/diffs atuais e só então implementar. Não precisa receber ZIP ou Markdown por upload do celular. Documentos de evidência são snapshots e não substituem código/CI atuais. Não inferir que `PASS_G0_READY` significa implementação concluída ou aprovação da CI. Preservar `development`, `main`, #44 e `feature/automated-setup`.

## Evidência compactada

O pacote local original `HF-UI-044-G0-EVIDENCIAS.zip` contém 14 entradas (handoff, recibo, base/preparado, patch, validador, verificações estáticas e checksums), SHA-256 `f45b968716695682bfb864210876bde0232293df59d3bc4fa8ad9981e58c122a`. Os arquivos canônicos necessários ao trabalho estão disponíveis em texto neste diretório e nos commits de referência; caso o arquivo ZIP seja adicionado, é uma cópia auxiliar histórica, **não um novo contrato**.

## Segurança e integração

GUARD_SHA continua fixo; a publicação posterior deste índice não é requisito de ancestralidade das frentes. Sem merge, deploy, mudança em main/development, banco hospedado, SMTP, Cloudinary ou ciência. `REV-01`–`REV-03` seguem fora do escopo.
