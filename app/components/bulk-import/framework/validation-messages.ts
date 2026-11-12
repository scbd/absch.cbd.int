import validationMessages from '~/app-text/components/scbd-angularjs-controls/form-control-directives/validation-errors.json'

interface ValidationError { code?: string; property?: string }
type Labeler = (property: string)=> string | undefined

// the build wraps the flat JSON sources per locale at runtime ({ en: {...}, ... })
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- plugin wraps JSON in locale object at runtime
const { en: MESSAGES } = validationMessages as unknown as { en: typeof validationMessages }

const CODE_MESSAGES: Record<string, string> = {
  'Error.Mandatory': MESSAGES.mandatory,
  'Error.MandatoryAnyOf': MESSAGES.mandatoryAnyOf,
  'Error.InvalidValue': MESSAGES.invalidValue,
  'Error.InvalidProperty': MESSAGES.invalidProperty,
  'Error.UnspecifiedLocale': MESSAGES.unspecifiedLocale,
  'Error.UnexpectedTerm': MESSAGES.unexpectedTerm,
  'Error.InvalidType': MESSAGES.invalidType,
  'Error.RecordExists': MESSAGES.recordExists
}

function findErrors (err: unknown): ValidationError[] | undefined {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- thrown API errors have no static type
  const e = err as { errors?: unknown; cause?: { response?: { data?: { errors?: unknown } } } } | null
  const { errors } = e ?? {}
  const { errors: nested } = e?.cause?.response?.data ?? {}
  const found = Array.isArray(errors) ? errors : nested
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- shape documented in the publish endpoint response
  return Array.isArray(found) ? found as ValidationError[] : undefined
}

function errorMessage (err: unknown): string {
  if (err instanceof Error) return err.message
  if (typeof err === 'object' && err !== null && 'message' in err) return String(err.message)
  return String(err)
}

// Turns a publish failure into a readable message; validation errors list "<field>: <problem>".
// `labelFor` resolves a property to its Excel column header (owned by the document type); the raw property is the fallback.
export function mapValidationErrors (err: unknown, labelFor: Labeler): string {
  const errors = findErrors(err)
  if (errors === undefined || errors.length === 0) return errorMessage(err)
  return errors.map(({ code = '', property = '' }) => {
    const message = CODE_MESSAGES[code] ?? code
    if (property === '') return message
    return `${labelFor(property) ?? property}: ${message}`
  }).join('; ')
}
