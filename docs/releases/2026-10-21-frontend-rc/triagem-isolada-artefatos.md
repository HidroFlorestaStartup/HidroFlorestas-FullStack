# Leitura isolada de evidências da RC

Esta branch existe porque o executor compartilhado ficou indisponível durante a triagem de falhas reais do CI. O job lê somente três artefatos já conhecidos no repositório oficial, confirma run, SHA de origem, digest SHA-256, tamanho e CRC e expõe trechos dos logs já redigidos pelo harness.

Não instala dependências, não executa a aplicação, não acessa banco ou serviços, não publica código e não altera os quinze gates oficiais. O token do job tem somente permissão de leitura de Actions; é retirado de redirecionamentos para o armazenamento de artefatos. URLs assinadas e tokens não são impressos. Preview está explicitamente desabilitado para esta branch antes da primeira referência remota.

A conclusão deste job indica apenas leitura de evidências. Não é PASS da RC, não substitui inspeção das imagens e não autoriza merge ou deploy. O workflow e esta branch de diagnóstico não integram a candidata de produto.

Artefatos: 12337845919 (run 39580505165, HEAD c014442cd6fbfcda47ff4366a5c7acd24bf0b007); 12338417029 (run 39581586760, HEAD f472d5910322837ad9cf9a942a99581a7ffff3f1); 12337396304 (run 39579990722, HEAD 6a5e80804f46b49658dad3c1a804cf5033d2cfc3).
