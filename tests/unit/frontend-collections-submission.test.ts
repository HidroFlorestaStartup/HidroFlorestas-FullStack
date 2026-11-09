import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  beginCollectionSubmission, completeCollectionSubmission, createCollectionAttempt,
  editCollectionAttempt, failCollectionSubmission, reviewCollectionAttempt,
  startNewCollectionAttempt, updateCollectionOccurrence,
} from '../../src/components/collections/collection-form-state';
import { CollectionSubmissionError, collectionSubmissionFailure, readCollectionConfirmation } from '../../src/components/collections/collection-submission';

const context = { laboratory: { id: 'lab', name: 'Lab', status: 'ACTIVE' as const }, area: { id: 'area', name: 'Área' }, readOnly: false };
const api = '/api/laboratories/lab/areas/area/collections';
const id = '40000000-0000-4000-8000-000000000433';
function reviewed(value = '2026-09-15T09:00:00.123-03:00') {
  return reviewCollectionAttempt(updateCollectionOccurrence(createCollectionAttempt(context, () => 'stable-key'), value), () => new Date('2026-10-20T12:00:00Z'));
}
function response(status: number, body: unknown, location?: string) {
  return Response.json(body, { status, headers: location ? { Location: location } : undefined });
}

describe('phase 6: submitted snapshot and result classification', () => {
  it('freezes the exact original body, key and contextual endpoint', () => {
    const submitted = beginCollectionSubmission(reviewed());
    assert.ok(Object.isFrozen(submitted.submission));
    assert.equal(submitted.submission?.body, '{"occurredAt":"2026-09-15T09:00:00.123-03:00"}');
    assert.equal(submitted.submission?.apiPath, api);
    assert.equal(submitted.submission?.idempotencyKey, 'stable-key');
    const failed = failCollectionSubmission(submitted, 'network');
    const retried = beginCollectionSubmission(failed);
    assert.equal(retried.submission, submitted.submission);
  });
  for (const kind of ['invalid', 'access', 'read-only', 'conflict'] as const) {
    it(`keeps an earlier uncertain result locked after a later ${kind} response`, () => {
      const first = failCollectionSubmission(beginCollectionSubmission(reviewed()), 'network');
      const later = failCollectionSubmission(beginCollectionSubmission(first), 'later rejection', kind);
      assert.equal(later.recoveryPending, true);
      assert.equal(later.submission, first.submission);
      assert.equal(editCollectionAttempt(later), later);
      assert.throws(() => startNewCollectionAttempt(later), /UNRESOLVED/);
    });
  }
  it('allows correction after a definitive first invalid request, without previous uncertainty', () => {
    const rejected = failCollectionSubmission(beginCollectionSubmission(reviewed()), 'invalid', 'invalid');
    assert.equal(rejected.recoveryPending, false);
    assert.equal(rejected.submission, undefined);
    const corrected = updateCollectionOccurrence(editCollectionAttempt(rejected), '2026-09-15T07:00:00.456+05:45');
    const sent = beginCollectionSubmission(reviewCollectionAttempt(corrected));
    assert.equal(sent.submission?.body, '{"occurredAt":"2026-09-15T07:00:00.456+05:45"}');
  });
  it('locks a confirmed record while navigation completes', () => {
    const confirmed = completeCollectionSubmission(beginCollectionSubmission(reviewed()));
    assert.equal(confirmed.phase, 'confirmed');
    assert.equal(editCollectionAttempt(confirmed), confirmed);
    assert.throws(() => beginCollectionSubmission(confirmed), /REVIEW_REQUIRED/);
  });
  for (const value of ['2026-09-15T00:00:00.001+14:00', '2026-09-15T23:59:59.999-14:00', '2026-09-15T09:00:00.123+05:45', '2026-09-15T12:00:00.123Z']) {
    it(`preserves declared time through edit/review/retry: ${value}`, () => {
      const first = reviewed(value);
      const second = reviewCollectionAttempt(editCollectionAttempt(first));
      const sent = beginCollectionSubmission(second);
      const retry = beginCollectionSubmission(failCollectionSubmission(sent, 'network'));
      assert.equal(retry.occurredAt, value);
      assert.equal(retry.submission?.body, JSON.stringify({ occurredAt: value }));
    });
  }
  for (const status of [200, 201]) it(`accepts a valid ${status} response and exact Location`, async () => {
    assert.equal(await readCollectionConfirmation(response(status, { collection: { id } }, `${api}/${id}`), api), id);
  });
  const errors = [
    [400, 'INVALID_REQUEST', 'invalid'], [401, 'UNAUTHENTICATED', 'access'],
    [403, 'FORBIDDEN', 'access'], [404, 'NOT_FOUND', 'access'],
    [409, 'READ_ONLY', 'read-only'], [409, 'CONFLICT', 'conflict'],
    [500, 'INTERNAL_ERROR', 'unknown'], [502, 'INVALID_REQUEST', 'unknown'],
    [400, 'unrecognized', 'unknown'],
  ] as const;
  for (const [status, code, kind] of errors) it(`classifies ${status}/${code} without reflecting server text`, async () => {
    await assert.rejects(() => readCollectionConfirmation(response(status, { error: { code, message: 'DO_NOT_REFLECT' } }), api), (error: unknown) => {
      assert.ok(error instanceof CollectionSubmissionError);
      assert.equal(error.kind, kind);
      assert.ok(!error.message.includes('DO_NOT_REFLECT'));
      return true;
    });
  });
  it('treats malformed success, invalid ID and mismatched Location as unknown', async () => {
    for (const result of [response(200, null), response(200, { collection: { id: '../bad' } }), response(200, { collection: { id } }, '/unexpected'), new Response('not json'), response(202, { collection: { id } }, `${api}/${id}`)]) {
      await assert.rejects(() => readCollectionConfirmation(result, api), (e: unknown) => e instanceof CollectionSubmissionError && e.kind === 'unknown');
    }
  });
  it('sanitizes unexpected network exceptions', () => {
    const result = collectionSubmissionFailure(new Error('internal-token-like-detail'));
    assert.equal(result.kind, 'unknown');
    assert.ok(!result.message.includes('internal-token'));
  });
});
