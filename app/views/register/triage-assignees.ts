export interface AssignedTo {
  firstName?: string
  lastName?: string
}

export interface Activity {
  createdOn: string
  assignedTo_info?: AssignedTo[]
  result?: { action?: string }
}

export const MAX_VISIBLE_ASSIGNEES = 5

export function latestActivity (activities: Activity[] | undefined): Activity | undefined {
  const list = activities ?? []
  if (list.length === 0) return undefined
  return list.reduce((a, b) => (a.createdOn > b.createdOn ? a : b))
}

export function assignees (activities: Activity[] | undefined): AssignedTo[] {
  return latestActivity(activities)?.assignedTo_info ?? []
}

export function assigneeFullName (assignee: AssignedTo): string {
  return [assignee.firstName, assignee.lastName].filter(Boolean).join(' ')
}

export function assigneeInitials (assignee: AssignedTo): string {
  return [assignee.firstName?.[0], assignee.lastName?.[0]].filter(Boolean).join('').toUpperCase()
}

export function personLabel (person: AssignedTo & { email?: string }): string {
  const name = assigneeFullName(person)
  return name === '' ? (person.email ?? '') : name
}
