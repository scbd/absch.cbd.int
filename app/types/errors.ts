export type ErrorLevel = 'warning' | 'error' | 'info'

export interface StandardError {
  reason: string
  level?: ErrorLevel
}
