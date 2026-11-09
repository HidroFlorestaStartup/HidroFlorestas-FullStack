import type { CollectionFailureKind } from '@/types/collection.type';

const unknownMessage = 'Não foi possível verificar a confirmação. Tente novamente com os mesmos dados.';

export class CollectionSubmissionError extends Error {
  constructor(public readonly kind: CollectionFailureKind, message: string) {
    super(message);
    this.name = 'CollectionSubmissionError';
  }
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Accept only the existing HTTP contract; never display untrusted server messages. */
export async function readCollectionConfirmation(response: Response, apiPath: string): Promise<string> {
  let payload: unknown;
  try { payload = await response.json(); }
  catch { throw new CollectionSubmissionError('unknown', unknownMessage); }
  if (!record(payload)) throw new CollectionSubmissionError('unknown', unknownMessage);
  if (!response.ok) {
    const code = record(payload.error) ? payload.error.code : undefined;
    if (response.status === 400 && code === 'INVALID_REQUEST') {
      throw new CollectionSubmissionError('invalid', 'A confirmação foi recusada por dados inválidos. Confira a ocorrência e o fuso.');
    }
    if ((response.status === 401 && code === 'UNAUTHENTICATED') ||
        (response.status === 403 && code === 'FORBIDDEN') ||
        (response.status === 404 && code === 'NOT_FOUND')) {
      throw new CollectionSubmissionError('access', 'Seu acesso não está mais disponível ou o recurso não foi encontrado.');
    }
    if (response.status === 409 && code === 'READ_ONLY') {
      throw new CollectionSubmissionError('read-only', 'Laboratório inativo — somente leitura. A confirmação foi recusada.');
    }
    if (response.status === 409 && code === 'CONFLICT') {
      throw new CollectionSubmissionError('conflict', 'Há um conflito com a tentativa enviada. Não inicie outra coleta para repetir esta operação; confira os registros da área.');
    }
    throw new CollectionSubmissionError('unknown', unknownMessage);
  }
  const id = record(payload.collection) ? payload.collection.id : undefined;
  if (![200, 201].includes(response.status) || typeof id !== 'string' ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id) ||
      response.headers.get('Location') !== `${apiPath}/${id}`) {
    throw new CollectionSubmissionError('unknown', 'Resposta inválida. Tente novamente com a tentativa original.');
  }
  return id;
}

export function collectionSubmissionFailure(error: unknown): CollectionSubmissionError {
  return error instanceof CollectionSubmissionError
    ? error
    : new CollectionSubmissionError('unknown', unknownMessage);
}
