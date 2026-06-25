import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuth } from '@scbd/angular-vue/src/index.js'
import { useRealm } from '~/services/composables/realm.js'
import { KmDraftsApi } from '~/api/km-document'
import { readSheet } from './read-sheet'
import { buildPreview } from './build-preview'
import { buildDocuments } from './build-documents'
import { submitDocuments } from './submit-documents'
import type { UploaderState, DocumentTypes, RowProgress, RawRow, AttributesMap, ParseStep, SheetError, PreviewData } from './types'
import { registry } from '../registry'

const PARSE_MIN_DURATION_MS = 800
const VALIDATE_DELAY_MS = 300
const PREVIEW_DELAY_MS = 400

function countColumns (map: AttributesMap): number {
  let n = 0
  for (const entry of Object.values(map)) {
    if ('column' in entry) n += 1
    else if ('schema' in entry) n += Object.keys(entry.schema).length
  }
  return n
}

// eslint-disable-next-line promise/avoid-new, @typescript-eslint/promise-function-async -- wrapping setTimeout; no async needed since we return the promise directly
const delay = (ms: number): Promise<void> => new Promise<void>(resolve => { setTimeout(resolve, ms) })

type StateWithErrors = Extract<UploaderState, { errors: SheetError[] }>
type StateWithPreview = Extract<UploaderState, { preview: PreviewData; rawRows: RawRow[] }>

export function useBulkImport (documentType: DocumentTypes): {
  state: UploaderState
  onFileChange: (file: File)=> Promise<void>
  onImport: ()=> Promise<void>
  onConfirmImport: ()=> void
  onClose: ()=> void
  onForceClose: ()=> void
  onClear: ()=> void
  onConfirmErase: ()=> void
  onCancelConfirm: ()=> void
} {
  const { mergeLocaleMessage } = useI18n()
  const auth = useAuth()
  const { realm } = useRealm()

  const { [documentType]: definition } = registry

  for (const [locale, msgs] of Object.entries(definition.messages)) {
    mergeLocaleMessage(locale, msgs)
  }

  const state = reactive<UploaderState>({ phase: 'empty' })

  function getApi (): KmDraftsApi {
    return new KmDraftsApi({ tokenReader: async () => await auth.token(), realm })
  }

  async function onFileChange (file: File): Promise<void> {
    const steps: ParseStep[] = [
      { key: 'openSheet', status: 'active' },
      { key: 'mapColumns', status: 'pending' },
      { key: 'validateRows', status: 'pending' },
      { key: 'buildPreview', status: 'pending' }
    ]
    Object.assign(state, { phase: 'parsing', fileName: file.name, steps })

    function setStep (key: string, status: ParseStep['status'], detail?: string): void {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- state is always 'parsing' here
      const s = state as unknown as Extract<UploaderState, { phase: 'parsing' }>
      const idx = s.steps.findIndex(st => st.key === key)
      if (idx >= 0) s.steps.splice(idx, 1, { key, status, detail })
    }

    try {
      // Steps 1+2: read the sheet (minimum duration so the animation is visible)
      const [{ rows, errors: sheetErrors }] = await Promise.all([
        readSheet(file, definition.attributesMap, definition.headerRows),
        delay(PARSE_MIN_DURATION_MS)
      ])

      const columnCount = countColumns(definition.attributesMap)
      setStep('openSheet', 'done')
      setStep('mapColumns', 'done', String(columnCount))
      setStep('validateRows', 'active', String(rows.length))
      await delay(VALIDATE_DELAY_MS)

      // Steps 3+4: validate & build preview
      setStep('validateRows', 'done')
      setStep('buildPreview', 'active')
      const preview = buildPreview(rows, definition.attributesMap, sheetErrors)

      setStep('buildPreview', 'done')
      await delay(PREVIEW_DELAY_MS)

      Object.assign(state, { phase: 'preview', preview, rawRows: rows, errors: sheetErrors })
    } catch (err: unknown) {
      // Reset so the user can try again — don't leave stuck in 'parsing'
      Object.assign(state, { phase: 'empty' })
      throw err
    }
  }

  async function onImport (): Promise<void> {
    if (state.phase !== 'confirm-import') return
    const current = state as Extract<UploaderState, { phase: 'confirm-import' }>

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
        if (idx >= 0) progress[idx] = p
      }
    )

    Object.assign(state, { phase: 'done', imported, failed })
  }

  function onConfirmImport (): void {
    if (state.phase !== 'preview') return
    const current = state as Extract<UploaderState, { phase: 'preview' }>
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- non-importing/empty/done phases all have errors+preview
      const s = state as StateWithErrors & StateWithPreview
      const { errors } = s
      Object.assign(state, { phase: 'confirm-close', preview: s.preview, rawRows: s.rawRows, errors })
    }
  }

  function onForceClose (): void {
    Object.assign(state, { phase: 'empty' })
  }

  function onClear (): void {
    const s = state as UploaderState
    if (s.phase === 'preview' || s.phase === 'confirm-import') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- preview and confirm-import phases always have errors+preview
      const ps = state as StateWithErrors & StateWithPreview
      Object.assign(state, {
        phase: 'confirm-erase',
        preview: ps.preview,
        rawRows: ps.rawRows,
        errors: ps.errors
      })
    }
  }

  function onConfirmErase (): void {
    Object.assign(state, { phase: 'empty' })
  }

  function onCancelConfirm (): void {
    const s = state as UploaderState
    if (s.phase === 'confirm-close' || s.phase === 'confirm-erase' || s.phase === 'confirm-import') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- all confirm phases have errors+preview
      const ps = state as StateWithErrors & StateWithPreview
      Object.assign(state, {
        phase: 'preview',
        preview: ps.preview,
        rawRows: ps.rawRows,
        errors: ps.errors
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
