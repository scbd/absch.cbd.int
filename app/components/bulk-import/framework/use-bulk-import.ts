import { reactive } from 'vue'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
// @ts-expect-error importing js file
import { useAuth } from '@scbd/angular-vue/src/index.js'
// @ts-expect-error importing js file
import { useRealm } from '~/services/composables/realm.js'
// @ts-expect-error importing js file
import KmDocumentApi from '~/api/km-document'
import { readSheet } from './read-sheet'
import { buildPreview } from './build-preview'
import { buildDocuments } from './build-documents'
import { submitDocuments } from './submit-documents'
import type { UploaderState, DocumentTypes, RowProgress, RawRow, AttributesMap, ParseStep } from './types'
import { registry } from '../registry'

function countColumns (map: AttributesMap): number {
  let n = 0
  for (const entry of Object.values(map)) {
    if ('column' in entry) n++
    else if ('schema' in entry) n += Object.keys(entry.schema).length
  }
  return n
}

const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms))

export function useBulkImport (documentType: DocumentTypes) {
  const { mergeLocaleMessage } = useI18n()
  const auth = useAuth()
  const { realm } = useRealm()

  const definition = registry[documentType]

  // Merge this document type's i18n strings into the active locale,
  // namespacing flat keys under bulkImport.<documentType>.
  for (const [locale, msgs] of Object.entries(definition.messages)) {
    const prefixed = Object.fromEntries(
      Object.entries(msgs as Record<string, string>).map(([k, v]) => [`bulkImport.${documentType}.${k}`, v])
    )
    mergeLocaleMessage(locale, prefixed)
  }

  const state = reactive<UploaderState>({ phase: 'empty' })

  function getApi () {
    return new KmDocumentApi({ tokenReader: () => auth.token(), realm })
  }

  async function onFileChange (file: File): Promise<void> {
    const steps: ParseStep[] = [
      { key: 'openSheet', status: 'active' },
      { key: 'mapColumns', status: 'pending' },
      { key: 'validateRows', status: 'pending' },
      { key: 'buildPreview', status: 'pending' }
    ]
    Object.assign(state, { phase: 'parsing', fileName: file.name, steps })

    function setStep (key: string, status: ParseStep['status'], detail?: string) {
      const s = state as Extract<UploaderState, { phase: 'parsing' }>
      const idx = s.steps.findIndex(st => st.key === key)
      if (idx !== -1) s.steps.splice(idx, 1, { key, status, detail })
    }

    try {
      // Steps 1+2: read the sheet (minimum 800ms so the animation is visible)
      const [{ rows, errors: sheetErrors }] = await Promise.all([
        readSheet(file, definition.attributesMap, definition.headerRows),
        delay(800)
      ])

      const columnCount = countColumns(definition.attributesMap)
      setStep('openSheet', 'done')
      setStep('mapColumns', 'done', String(columnCount))
      setStep('validateRows', 'active', String(rows.length))
      await delay(300)

      // Steps 3+4: validate & build preview
      setStep('validateRows', 'done')
      setStep('buildPreview', 'active')
      const preview = buildPreview(rows, definition.attributesMap, sheetErrors)

      setStep('buildPreview', 'done')
      await delay(400)

      Object.assign(state, { phase: 'preview', preview, rawRows: rows, errors: sheetErrors })
    } catch (err: unknown) {
      // Reset so the user can try again — don't leave stuck in 'parsing'
      Object.assign(state, { phase: 'empty' })
      throw err
    }
  }

  async function onImport (): Promise<void> {
    const current = state as Extract<UploaderState, { phase: 'confirm-import' }>
    if (current.phase !== 'confirm-import') return

    const { preview, rawRows } = current
    const progress: RowProgress[] = rawRows.map((_, i) => ({ rowIndex: i, status: 'pending' as const }))

    Object.assign(state, { phase: 'importing', preview, rawRows, progress })

    const api = getApi()

    const { documents, linkedRecords } = await buildDocuments(rawRows, definition, api)

    const { imported, failed } = await submitDocuments(
      documents,
      linkedRecords,
      api,
      (p: RowProgress) => {
        const idx = progress.findIndex(r => r.rowIndex === p.rowIndex)
        if (idx !== -1) progress[idx] = p
      }
    )

    Object.assign(state, { phase: 'done', imported, failed })
  }

  function onConfirmImport (): void {
    const current = state as Extract<UploaderState, { phase: 'preview' }>
    if (current.phase !== 'preview') return
    Object.assign(state, {
      phase: 'confirm-import',
      preview: current.preview,
      rawRows: current.rawRows,
      errors: current.errors
    })
  }

  function onClose (): void {
    const { phase } = state as UploaderState
    if (phase === 'importing') return
    if (phase === 'empty' || phase === 'done') {
      Object.assign(state, { phase: 'empty' })
    } else {
      const s = state as Extract<UploaderState, { preview: unknown; rawRows: RawRow[] }>
      const errors = (s as any).errors ?? []
      Object.assign(state, { phase: 'confirm-close', preview: s.preview, rawRows: s.rawRows, errors })
    }
  }

  function onForceClose (): void {
    Object.assign(state, { phase: 'empty' })
  }

  function onClear (): void {
    const s = state as UploaderState
    if (s.phase === 'preview' || s.phase === 'confirm-import') {
      Object.assign(state, {
        phase: 'confirm-erase',
        preview: (s as any).preview,
        rawRows: (s as any).rawRows,
        errors: (s as any).errors ?? []
      })
    }
  }

  function onConfirmErase (): void {
    Object.assign(state, { phase: 'empty' })
  }

  function onCancelConfirm (): void {
    const s = state as UploaderState
    if (s.phase === 'confirm-close' || s.phase === 'confirm-erase' || s.phase === 'confirm-import') {
      Object.assign(state, {
        phase: 'preview',
        preview: s.preview,
        rawRows: s.rawRows,
        errors: s.errors
      })
    }
  }

  return {
    state,
    onFileChange,
    onImport,
    onConfirmImport,
    onClose,
    onForceClose,
    onClear,
    onConfirmErase,
    onCancelConfirm
  }
}
