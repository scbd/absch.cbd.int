import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuth } from '@scbd/angular-vue/src/index.js'
import { useRealm } from '~/services/composables/realm.js'
import { readSheet } from './read-sheet'
import { buildPreview } from './build-preview'
import { buildDocuments } from './build-documents'
import { submitDocuments } from './submit-documents'
import { PARSE_STEP_KEY, PARSE_STEP_STATUS, ROW_IMPORT_STATUS, UPLOADER_PHASE } from './types'
import type { UploaderState, DocumentTypes, RowProgress, RawRow, AttributesMap, ParseStep, SheetError, PreviewData, TokenReader, PushProgress } from './types'
import { registry } from '../registry'
import { sleep } from '~/services/composables/utils.js'

const PARSE_MIN_DURATION_MS = 800
const VALIDATE_DELAY_MS = 300
const PREVIEW_DELAY_MS = 400

// nest sub-columns under their parent column so that they can be uniquely identified
function countColumns (map: AttributesMap): number {
  let n = 0
  for (const entry of Object.values(map)) {
    if ('column' in entry) n += 1
    else if ('schema' in entry) n += Object.keys(entry.schema).length
  }
  return n
}

type StateWithErrors = Extract<UploaderState, { errors: SheetError[] }>
type StateWithPreview = Extract<UploaderState, { preview: PreviewData; rawRows: RawRow[] }>

export function useBulkImport (documentType: DocumentTypes): {
  state: UploaderState
  onFileChange: (file: File)=> Promise<void>
  onImport: ()=> Promise<void>
  onConfirmImport: ()=> Promise<void>
  onClose: ()=> void
  onForceClose: ()=> void
  onClear: ()=> void
  onConfirmErase: ()=> void
  onCancelConfirm: ()=> void
} {
  const { mergeLocaleMessage } = useI18n()
  const auth = useAuth()
  const realm = useRealm()
  const { [documentType]: definition } = registry

  // Each document type owns its translation strings; merge them in at runtime so
  // bulk-import components can call t() without knowing which type is loaded.
  for (const [locale, msgs] of Object.entries(definition.messages)) {
    mergeLocaleMessage(locale, msgs)
  }

  const state = reactive<UploaderState>({ phase: UPLOADER_PHASE.empty })

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- token is always present when the user is authenticated
  const tokenReader: TokenReader = async () => (await auth.token())!

  async function onFileChange (file: File): Promise<void> {
    const steps: ParseStep[] = [
      { key: PARSE_STEP_KEY.openSheet, status: PARSE_STEP_STATUS.active },
      { key: PARSE_STEP_KEY.mapColumns, status: PARSE_STEP_STATUS.pending },
      { key: PARSE_STEP_KEY.validateRows, status: PARSE_STEP_STATUS.pending },
      { key: PARSE_STEP_KEY.buildPreview, status: PARSE_STEP_STATUS.pending }
    ]
    Object.assign(state, { phase: UPLOADER_PHASE.parsing, fileName: file.name, steps })

    function setStep (key: ParseStep['key'], status: ParseStep['status'], detail?: string): void {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- state is always 'parsing' here
      const s = state as unknown as Extract<UploaderState, { phase: typeof UPLOADER_PHASE.parsing }>
      const idx = s.steps.findIndex(st => st.key === key)
      // use splice to keep reativity
      if (idx >= 0) s.steps.splice(idx, 1, { key, status, detail })
    }

    try {
      // faking a delay so that the animation is visible

      // Steps 1+2: read the sheet (minimum duration so the animation is visible)
      const [{ rows, errors: sheetErrors }] = await Promise.all([
        readSheet(file, definition.attributesMap, definition.headerRows),
        sleep(PARSE_MIN_DURATION_MS)
      ])

      const columnCount = countColumns(definition.attributesMap)
      setStep(PARSE_STEP_KEY.openSheet, PARSE_STEP_STATUS.done)
      setStep(PARSE_STEP_KEY.mapColumns, PARSE_STEP_STATUS.done, String(columnCount))
      setStep(PARSE_STEP_KEY.validateRows, PARSE_STEP_STATUS.active, String(rows.length))
      await sleep(VALIDATE_DELAY_MS)

      // Steps 3+4: validate & build preview
      let validationErrors: SheetError[] = []
      if (definition.validateRows !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- auth.user() shape is defined by the backend token
        const userGovernment = (auth.user() as { government?: string } | null)?.government
        validationErrors = await definition.validateRows(rows, tokenReader, realm.realm, userGovernment)
      }
      const allErrors = [...sheetErrors, ...validationErrors]
      setStep(PARSE_STEP_KEY.validateRows, PARSE_STEP_STATUS.done)
      setStep(PARSE_STEP_KEY.buildPreview, PARSE_STEP_STATUS.active)
      const preview = buildPreview(rows, definition.attributesMap, allErrors)

      setStep(PARSE_STEP_KEY.buildPreview, PARSE_STEP_STATUS.done)
      await sleep(PREVIEW_DELAY_MS)

      Object.assign(state, { phase: UPLOADER_PHASE.preview, preview, rawRows: rows, errors: allErrors })
    } catch {
      Object.assign(state, { phase: UPLOADER_PHASE.parseError })
    }
  }

  async function onImport (): Promise<void> {
    if (state.phase !== UPLOADER_PHASE.confirmImport) return
    const current = state as Extract<UploaderState, { phase: typeof UPLOADER_PHASE.confirmImport }>

    const { preview, rawRows } = current
    const progress: RowProgress[] = rawRows.map((_, i) => ({ rowIndex: i, status: ROW_IMPORT_STATUS.pending }))

    Object.assign(state, { phase: UPLOADER_PHASE.importing, preview, rawRows, progress })

    try {
      const { documents, linkedRecords, buildErrors } = current

      const { imported, failed } = await submitDocuments(
        documents,
        linkedRecords,
        { tokenReader, realm: realm.realm, buildErrors },
        {
          onProgress: (p: RowProgress) => {
            // Must mutate through the reactive proxy (state.progress) so Vue tracks the change.
            // Mutating the raw `progress` array directly bypasses the proxy and silently no-ops.
            // Cast to full union: TS narrows `state` to confirm-import above, but Object.assign changed it.
            const s = state as UploaderState
            if (s.phase !== UPLOADER_PHASE.importing) return
            const idx = s.progress.findIndex(r => r.rowIndex === p.rowIndex)
            if (idx >= 0) s.progress.splice(idx, 1, p)
          },
          onPush: (p: PushProgress) => {
            const s = state as UploaderState
            if (s.phase !== UPLOADER_PHASE.importing) return
            s.currentPush = p
          }
        }
      )

      Object.assign(state, { phase: UPLOADER_PHASE.done, imported, failed, preview, rawRows, progress })
    } catch {
      Object.assign(state, { phase: UPLOADER_PHASE.importError })
    }
  }

  async function onConfirmImport (): Promise<void> {
    if (state.phase !== UPLOADER_PHASE.preview) return
    const current = state as Extract<UploaderState, { phase: typeof UPLOADER_PHASE.preview }>
    const { documents, linkedRecords, errors: buildErrors } = await buildDocuments(current.rawRows, definition, tokenReader)
    if ((state as UploaderState).phase !== UPLOADER_PHASE.preview) return
    Object.assign(state, {
      phase: UPLOADER_PHASE.confirmImport,
      preview: current.preview,
      rawRows: current.rawRows,
      errors: current.errors,
      draftCount: current.rawRows.length,
      linkedCount: linkedRecords.length,
      documents,
      linkedRecords,
      buildErrors
    })
  }

  function onClose (): void {
    const { phase } = state as UploaderState
    if (phase === UPLOADER_PHASE.importing) return
    if (phase === UPLOADER_PHASE.empty || phase === UPLOADER_PHASE.done || phase === UPLOADER_PHASE.parseError || phase === UPLOADER_PHASE.importError) {
      Object.assign(state, { phase: UPLOADER_PHASE.empty })
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- non-importing/empty/done phases all have errors+preview
      const s = state as StateWithErrors & StateWithPreview
      const { errors } = s
      Object.assign(state, { phase: UPLOADER_PHASE.confirmClose, preview: s.preview, rawRows: s.rawRows, errors })
    }
  }

  function onForceClose (): void {
    Object.assign(state, { phase: UPLOADER_PHASE.empty })
  }

  function onClear (): void {
    const s = state as UploaderState
    if (s.phase === UPLOADER_PHASE.preview || s.phase === UPLOADER_PHASE.confirmImport) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- preview and confirm-import phases always have errors+preview
      const ps = state as StateWithErrors & StateWithPreview
      Object.assign(state, {
        phase: UPLOADER_PHASE.confirmErase,
        preview: ps.preview,
        rawRows: ps.rawRows,
        errors: ps.errors
      })
    }
  }

  function onConfirmErase (): void {
    Object.assign(state, { phase: UPLOADER_PHASE.empty })
  }

  function onCancelConfirm (): void {
    const s = state as UploaderState
    if (s.phase === UPLOADER_PHASE.confirmClose || s.phase === UPLOADER_PHASE.confirmErase || s.phase === UPLOADER_PHASE.confirmImport) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- all confirm phases have errors+preview
      const ps = state as StateWithErrors & StateWithPreview
      Object.assign(state, {
        phase: UPLOADER_PHASE.preview,
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
