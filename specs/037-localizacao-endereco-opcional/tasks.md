# Tasks: 037 — localização e endereço opcional

Lista inicial G0; fonte #44 fixada em `972f9b00189bf09117883913d8c4fa63e69f4d2f`. Testes obrigatórios. Completar paths reais antes de produto.

## Preparação

- [ ] T001 Conferir branch/HEAD/base/guardas/ambiente; registrar em `specs/037-localizacao-endereco-opcional/implementation-evidence.md`, usando base `07755822f5dc75fe2be1d924005d30ed99f64a0b`.
- [ ] T002 Completar Spec Kit em `spec.md`, `plan.md` e `tasks.md`; mapear arquivos reais de formulário/DTO/API/persistência e AGENTS, rastrear Code-First e coordenar quaisquer arquivos compartilhados.
- [ ] T003 Inspecionar provedor/contratos existentes; registrar decisão técnica, termos/limites/privacidade e necessidade ou não de mudança em `prisma/schema.prisma` no `plan.md`; sem chamadas externas ou serviço pago por G0.

## US1 — três entradas

- [ ] T004 [US1] Criar testes em `tests/unit/hf-ui037-geocoding.test.ts` para coordenadas de dispositivo/mapa/manual e para entrada inválida; usar adaptador determinístico, não rede real.
- [ ] T005 [US1] Implementar enriquecimento nas três entradas nos arquivos congelados em `plan.md`; não editar detalhe B ou shell A.

## US2 — optionalidade e falhas

- [ ] T006 [US2] Criar `tests/contract/hf-ui037-address-optional.test.ts` e cenários em `tests/e2e/hf-ui037-location.spec.ts` para retorno parcial/vazio, ausência de CEP, timeout/limite/rede e cadastro com campos opcionais ausentes.
- [ ] T007 [US2] Aplicar optionalidade mínima de ponta a ponta nos paths documentados; submeter deltas compartilhados e eventual schema/migration ao coordenador, testar somente em banco sintético.

## US3 — concorrência e edição

- [ ] T008 [US3] Ampliar `tests/unit/hf-ui037-geocoding.test.ts` com respostas em ordem invertida e edição manual durante consulta; demonstrar a regressão antes de corrigir quando reproduzível.
- [ ] T009 [US3] Implementar política documentada contra respostas obsoletas e sobrescrita de edição manual; completar jornada em `tests/e2e/hf-ui037-location.spec.ts`.

## Validação e entrega

- [ ] T010 Executar testes focais/contrato/persistência aplicáveis e os quinze gates de `scripts/rc-review-validation.ps1`; registrar SHA/run/tentativa e falhas/NOT_RUN em `implementation-evidence.md`, sem enfraquecer proteção sintética.
- [ ] T011 Atualizar os quatro documentos da spec e PR Draft próprio com diffs exclusivo/acumulado, contratos compartilhados e pendências; sem merge/deploy.

G0 não concluiu tarefas de implementação/testes. A reserva 037 não autoriza editar os arquivos de A/B ou mudar providers/infraestrutura alheios ao recorte.
