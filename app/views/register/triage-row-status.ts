import type { TriageStatusTab } from './triage-filters'
import { type Activity, latestActivity } from './triage-assignees'

const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60
const HOURS_PER_DAY = 24
const DAYS_PER_WEEK = 7
const MILLISECONDS_PER_SECOND = 1000

export const PENDING_MAX_AGE_WEEKS = 12
export const MILLISECONDS_PER_WEEK = DAYS_PER_WEEK * HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND
export const EXPIRY_WARNING_WEEKS = 3

export function notExpiredSince (): string {
  return new Date(Date.now() - PENDING_MAX_AGE_WEEKS * MILLISECONDS_PER_WEEK).toISOString()
}

export interface StatusableWorkflow {
  createdOn: string
  state: string
  activities?: Activity[]
}

const COMPLETED_ACTION_TABS: Record<string, TriageStatusTab> = {
  approve: 'Approved',
  approved: 'Approved',
  reject: 'Rejected',
  rejected: 'Rejected'
}

function runningRowStatus (workflow: StatusableWorkflow): TriageStatusTab {
  return workflow.createdOn < notExpiredSince() ? 'Expired' : 'Pending'
}

function completedRowStatus (workflow: StatusableWorkflow): TriageStatusTab | undefined {
  const action = latestActivity(workflow.activities)?.result?.action ?? ''
  return COMPLETED_ACTION_TABS[action]
}

// undefined = no tab maps cleanly to this row (e.g. a completed workflow with
// no recognizable approve/reject action) — falls back to the raw state.
export function rowStatus (workflow: StatusableWorkflow): TriageStatusTab | undefined {
  if (workflow.state === 'canceled') return 'Canceled'
  if (workflow.state === 'running') return runningRowStatus(workflow)
  if (workflow.state === 'completed') return completedRowStatus(workflow)
  return undefined
}

const STATUS_PILL_CLASSES: Record<TriageStatusTab, string> = {
  Pending: 'pending',
  Approved: 'approved',
  Rejected: 'rejected',
  Expired: 'expired',
  Canceled: 'canceled',
  All: 'other'
}

export function capitalize (value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function statusPillClass (workflow: StatusableWorkflow): string {
  const status = rowStatus(workflow)
  return status === undefined ? 'other' : STATUS_PILL_CLASSES[status]
}

export function rowStripeClass (workflow: StatusableWorkflow): string {
  const status = rowStatus(workflow)
  return status === undefined ? '' : `s-${STATUS_PILL_CLASSES[status]}`
}

export function ageWeeks (workflow: StatusableWorkflow): number {
  return Math.floor((Date.now() - new Date(workflow.createdOn).getTime()) / MILLISECONDS_PER_WEEK)
}

export function ageWarn (workflow: StatusableWorkflow): boolean {
  return rowStatus(workflow) === 'Pending' && PENDING_MAX_AGE_WEEKS - ageWeeks(workflow) <= EXPIRY_WARNING_WEEKS
}

export function completionDate (workflow: StatusableWorkflow): string {
  return latestActivity(workflow.activities)?.createdOn ?? workflow.createdOn
}
