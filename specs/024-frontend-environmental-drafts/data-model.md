# Modelo de estado e fronteiras

Nenhum modelo persistido novo. DraftCell permanece absent/ editing.raw / value; null pertence somente aos opcionais do conjunto conforme contrato vigente. O hook pendente mantém canonical/body e registra se a operação já ficou incerta, preservando saveKey/revisão. Sucesso ou recarga explícita resolve essa pendência; um4xx posterior não a apaga. O conjunto confirmado e o consumo do draft continuam nos serviços existentes. Formatação é somente leitura; raw não é convertido ao salvar draft.
