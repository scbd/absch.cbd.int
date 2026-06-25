import type {
  RawRow, AttributesMap, SheetError,
  PreviewRow, PreviewData, CellPrimitive, CellError
} from './types'

// build a nested column list so that sub-columns can uniquely be identifier
// for eg. provider.type, provider.orgName, pic.type, pic.orgName, etc.
function getColumnKeys (attributesMap: AttributesMap): string[] {
  const keys: string[] = []
  for (const [key, entry] of Object.entries(attributesMap)) {
    if ('column' in entry) {
      keys.push(key)
    } else if ('schema' in entry) {
      for (const subKey of Object.keys(entry.schema)) {
        keys.push(`${key}.${subKey}`)
      }
    }
  }
  return keys
}

function formatCell (value: CellPrimitive): string {
  if (value === null) return ''
  // fr-CA produces YYYY-MM-DD
  if (value instanceof Date) return value.toLocaleDateString('fr-CA', { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC' })
  return String(value)
}

function rowStatus (cellErrors: CellError[]): PreviewRow['status'] {
  if (cellErrors.some(e => e.level === 'error')) return 'error'
  if (cellErrors.some(e => e.level === 'warning')) return 'warn'
  return 'ready'
}

export function buildPreview (
  rows: RawRow[],
  attributesMap: AttributesMap,
  sheetErrors: SheetError[]
): PreviewData {
  const columnKeys = getColumnKeys(attributesMap)

  // Any errors when reading the excel
  const errorsByRow = new Map<number, SheetError[]>()
  for (const e of sheetErrors) {
    if (!errorsByRow.has(e.row)) errorsByRow.set(e.row, [])
    errorsByRow.get(e.row)?.push(e)
  }

  const previewRows: PreviewRow[] = rows.map((row, rowIndex) => {
    const rowErrors = errorsByRow.get(rowIndex) ?? []
    const allCellErrors: CellError[] = []

    const cells: Record<string, { raw: CellPrimitive; display: string; errors: CellError[] }> = {}

    for (const key of columnKeys) {
      const raw = row[key] ?? null
      const cellErrors: CellError[] = rowErrors
        .filter(e => String(e.column) === key)
        .map(e => ({ level: e.level, message: e.message }))

      const display = formatCell(raw)

      cells[key] = { raw, display, errors: cellErrors }
      allCellErrors.push(...cellErrors)
    }

    return {
      rowIndex,
      cells,
      status: rowStatus(allCellErrors)
    }
  })

  return { rows: previewRows, columnKeys }
}
