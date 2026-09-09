export interface TriageFilterSelection {
  notifications: string[]
  organizations: string[]
  government: string[]
}

export function emptyTriageFilterSelection (): TriageFilterSelection {
  return { notifications: [], organizations: [], government: [] }
}

// The record snapshot (ADR-0003) lands directly on `data.<field>`, not under
// a `data.recordFields.*` wrapper — and fields may be a single value (e.g.
// `government: "in"`) or an array (e.g. `notifications: ["2025-144"]`).
const RECORD_FIELDS_PATH: Record<keyof TriageFilterSelection, string> = {
  notifications: 'data.notifications',
  organizations: 'data.organizations',
  government: 'data.government'
}

export const TRIAGE_FILTER_FIELDS: Array<keyof TriageFilterSelection> = ['notifications', 'organizations', 'government']

// excludeField omits that field's own filter — used when computing a field's
// facet options, so selecting a value doesn't hide its siblings (a record
// can't match two different notifications at once, so filtering the facet
// query by the field being faceted collapses it to just the selected value).
export function buildFilterClauses (selection: TriageFilterSelection, excludeField?: keyof TriageFilterSelection): Array<Record<string, unknown>> {
  return TRIAGE_FILTER_FIELDS
    .filter((field) => field !== excludeField && selection[field].length > 0)
    .map((field) => ({ [RECORD_FIELDS_PATH[field]]: { $in: selection[field] } }))
}

export function toRecordFieldArray (value: string | string[] | undefined): string[] {
  if (value === undefined) return []
  return Array.isArray(value) ? value : [value]
}

export type TriageStatusTab = 'Pending' | 'Approved' | 'Rejected' | 'Expired' | 'Canceled' | 'All'

export const TRIAGE_STATUS_TABS: TriageStatusTab[] = ['Pending', 'Approved', 'Rejected', 'Expired', 'Canceled', 'All']

// Ports the status-bucket logic from the legacy app/views/register/requests.js buildQuery().
export function buildStatusClauses (status: TriageStatusTab, notExpiredSince: string): Array<Record<string, unknown>> {
  switch (status) {
    case 'Pending':
      return [{ state: 'running' }, { createdOn: { $gte: notExpiredSince } }]
    case 'Approved':
      return [{ state: 'completed' }, { $or: [{ 'activities.result.action': 'approve' }, { 'activities.result.action': 'approved' }] }]
    case 'Rejected':
      return [{ state: 'completed' }, { $or: [{ 'activities.result.action': 'reject' }, { 'activities.result.action': 'rejected' }] }]
    case 'Expired':
      return [{ state: { $ne: 'completed' } }, { state: { $ne: 'canceled' } }, { createdOn: { $lt: notExpiredSince } }]
    case 'Canceled':
      return [{ state: 'canceled' }]
    case 'All':
      return []
  }
}
