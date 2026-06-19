import readExcelFile from 'read-excel-file'
import type { RawRow, AttributesMap, SheetError } from './types'

export interface ReadSheetResult {
  rows: RawRow[]
  errors: SheetError[]
}

// Flatten a nested AttributesMap into the schema format read-excel-file expects:
//   { propName: { column: '0', required?: boolean } }
// Nested groups are inlined with dot-key prop names (e.g. 'provider.type').
function flattenAttributesMap (map: AttributesMap): Record<string, { column: string; required?: boolean }> {
  const flat: Record<string, { column: string; required?: boolean }> = {}

  for (const [key, entry] of Object.entries(map)) {
    if ('column' in entry) {
      flat[key] = { column: entry.column, required: entry.required }
    } else if ('schema' in entry) {
      for (const [subKey, subEntry] of Object.entries(entry.schema)) {
        flat[`${key}.${subKey}`] = { column: subEntry.column, required: subEntry.required }
      }
    }
  }

  return flat
}

export async function readSheet (
  file: File,
  attributesMap: AttributesMap,
  headerRows: number[]
): Promise<ReadSheetResult> {
  const schema = flattenAttributesMap(attributesMap)

  // Reverse map: column index string → prop name (e.g. '6' → 'provider.type')
  const indexToKey: Record<string, string> = {}
  for (const [key, entry] of Object.entries(schema)) {
    indexToKey[entry.column] = key
  }

  // @ts-expect-error read-excel-file lacks TS declarations
  const { rows, errors: rawErrors } = await readExcelFile(file, {
    schema,
    transformData (allRows: unknown[][]) {
      const dataRows = allRows.filter((_row, i) => !headerRows.includes(i))
      const firstRow = Array.isArray(dataRows[0]) ? dataRows[0] : []
      const indices = Array.from(firstRow.keys())
      dataRows.unshift(indices.map(String))
      return dataRows
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- read-excel-file has no TS declarations
  const errors: SheetError[] = (rawErrors as unknown as Array<{
    row: number
    column: string | number
    reason: unknown
    error: string
    value?: string
  }>).map(e => {
    const colStr = String(e.column)
    return {
      row: e.row - headerRows.length,
      // Resolve column index to prop name so build-preview can match it to cells
      column: indexToKey[colStr] ?? colStr,
      level: 'warning' as const,
      // FIX: was `e.reason === 'string'` — always false. Use typeof check.
      message: typeof e.reason === 'string' ? e.reason : e.error,
      value: e.value
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- read-excel-file has no TS declarations
  return { rows: rows as unknown as RawRow[], errors }
}
