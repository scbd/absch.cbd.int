import type {
  RawRow, AttributesMap, SheetError,
  PreviewRow, PreviewData, CellPrimitive, CellError
} from './types'

type Resolver = (value: string) => Promise<string>

function getColumnKeys(attributesMap: AttributesMap): string[] {
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

function formatCell(value: CellPrimitive): string {
  if (value === null || value === undefined) return ''
  if (value instanceof Date) return value.toLocaleDateString('fr-CA')
  return String(value)
}

function rowStatus(cellErrors: CellError[]): PreviewRow['status'] {
  if (cellErrors.some(e => e.level === 'error')) return 'error'
  if (cellErrors.some(e => e.level === 'warning')) return 'warn'
  return 'ready'
}

export async function buildPreview(
  rows: RawRow[],
  attributesMap: AttributesMap,
  sheetErrors: SheetError[],
  resolvers: Record<string, Resolver> = {},
  onProgress?: (event: 'building') => void
): Promise<PreviewData> {
  const columnKeys = getColumnKeys(attributesMap)

  // Deduplicate resolver calls: collect all unique values per field first
  const resolverCache: Record<string, Map<string, string>> = {}

  if (Object.keys(resolvers).length > 0) {
    const pendingByField: Record<string, Set<string>> = {}
    for (const row of rows) {
      for (const key of Object.keys(resolvers)) {
        const raw = row[key]
        if (typeof raw === 'string' && raw.trim() !== '') {
          if (!pendingByField[key]) pendingByField[key] = new Set()
          pendingByField[key].add(raw)
        }
      }
    }

    await Promise.all(
      Object.entries(pendingByField).map(async ([field, values]) => {
        const resolver = resolvers[field]
        const map = new Map<string, string>()
        await Promise.all(
          Array.from(values).map(async v => {
            try { map.set(v, await resolver(v)) } catch { map.set(v, v) }
          })
        )
        resolverCache[field] = map
      })
    )
  }

  onProgress?.('building')

  // Index sheet errors by row
  const errorsByRow = new Map<number, SheetError[]>()
  for (const e of sheetErrors) {
    if (!errorsByRow.has(e.row)) errorsByRow.set(e.row, [])
    errorsByRow.get(e.row)!.push(e)
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

      let display: string
      const cache = resolverCache[key]
      if (cache && typeof raw === 'string') {
        display = cache.get(raw) ?? formatCell(raw)
      } else {
        display = formatCell(raw)
      }

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
