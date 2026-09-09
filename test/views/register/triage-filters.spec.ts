import { describe, expect, it } from 'vitest';
import { buildFilterClauses, buildStatusClauses, emptyTriageFilterSelection } from '~/views/register/triage-filters';

describe('buildFilterClauses', () => {
  it('returns no clauses when no filters are selected', () => {
    expect(buildFilterClauses(emptyTriageFilterSelection())).toEqual([]);
  });

  it('builds one $in clause per non-empty filter dimension', () => {
    const selection = {
      notifications: ['2024-100'],
      organizations: [],
      government: ['BR', 'IN']
    };

    expect(buildFilterClauses(selection)).toEqual([
      { 'data.notifications': { $in: ['2024-100'] } },
      { 'data.government': { $in: ['BR', 'IN'] } }
    ]);
  });

  it('omits excludeField even when it has a selection', () => {
    const selection = {
      notifications: ['2024-100'],
      organizations: [],
      government: ['BR', 'IN']
    };

    expect(buildFilterClauses(selection, 'notifications')).toEqual([
      { 'data.government': { $in: ['BR', 'IN'] } }
    ]);
  });
});

describe('buildStatusClauses', () => {
  it('builds the Pending bucket with the running state and expiry cutoff', () => {
    expect(buildStatusClauses('Pending', '2026-05-01T00:00:00.000Z')).toEqual([
      { state: 'running' },
      { createdOn: { $gte: '2026-05-01T00:00:00.000Z' } }
    ]);
  });

  it('builds the Expired bucket as not-completed/not-canceled and past the cutoff', () => {
    expect(buildStatusClauses('Expired', '2026-05-01T00:00:00.000Z')).toEqual([
      { state: { $ne: 'completed' } },
      { state: { $ne: 'canceled' } },
      { createdOn: { $lt: '2026-05-01T00:00:00.000Z' } }
    ]);
  });

  it('returns no clauses for the All tab', () => {
    expect(buildStatusClauses('All', '2026-05-01T00:00:00.000Z')).toEqual([]);
  });
});
