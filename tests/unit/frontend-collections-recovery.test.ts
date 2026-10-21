import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  beginCollectionSubmission, createCollectionAttempt, editCollectionAttempt,
  failCollectionSubmission, reviewCollectionAttempt, startNewCollectionAttempt,
  updateCollectionLocalOccurrence, updateCollectionOccurrence,
} from '../../src/components/collections/collection-form-state';

const context = {
  laboratory: { id: 'lab', name: 'Laboratório sintético', status: 'ACTIVE' as const },
  area: { id: 'area', name: 'Área sintética' }, readOnly: false,
};
const clock = () => new Date('2026-10-20T12:00:00Z');
const occurrence = '2026-09-15T09:00:00.123-03:00';
function reviewed() {
  return reviewCollectionAttempt(updateCollectionOccurrence(
    createCollectionAttempt(context, () => 'stable-key', clock), occurrence,
  ), clock);
}
function unknown() {
  return failCollectionSubmission(beginCollectionSubmission(reviewed()), 'Resposta perdida.');
}

describe('phase 6: unresolved collection confirmation', () => {
  it('keeps editing available before the first submission', () => {
    assert.equal(editCollectionAttempt(reviewed()).phase, 'editing');
  });
  it('does not reopen editing after an unknown result', () => {
    const attempt = unknown();
    assert.equal(editCollectionAttempt(attempt), attempt);
  });
  it('does not replace the original occurrence after an unknown result', () => {
    assert.equal(updateCollectionOccurrence(unknown(), '2026-09-15T10:00:00.456+02:30').occurredAt, occurrence);
  });
  it('does not replace the original device/manual civil time after an unknown result', () => {
    assert.equal(updateCollectionLocalOccurrence(unknown(), '2026-09-15T10:00:00.456', '+02:30', false).occurredAt, occurrence);
  });
  it('does not rotate the key of an unresolved intentional attempt', () => {
    assert.throws(() => startNewCollectionAttempt(unknown(), () => 'another-key'), /CONFIRMATION_UNRESOLVED/);
  });
  it('does not mutate metadata while the request is in flight', () => {
    const attempt = beginCollectionSubmission(reviewed());
    assert.equal(updateCollectionOccurrence(attempt, '2026-09-15T10:00:00-03:00'), attempt);
  });
  it('keeps occurrence and key on a direct retry', () => {
    const retry = beginCollectionSubmission(unknown());
    assert.equal(retry.occurredAt, occurrence);
    assert.equal(retry.idempotencyKey, 'stable-key');
    assert.equal(retry.phase, 'submitting');
  });
});
