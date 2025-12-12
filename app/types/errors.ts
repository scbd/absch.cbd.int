export type ErrorLevel = 'warning' | 'error' | 'info'

export type StandardError = {
  reason: string
  level?: ErrorLevel 
}
