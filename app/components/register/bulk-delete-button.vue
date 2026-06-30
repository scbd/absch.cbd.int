<template>
  <div
    v-if="selectedRecords.length > 1"
    class="d-inline-flex"
  >
    <button
      type="button"
      class="btn btn-danger btn-sm px-2 d-flex align-items-center gap-1"
      :disabled="loading"
      @click="showConfirm = true"
    >
      <i
        v-if="loading"
        class="fa fa-spinner fa-spin"
      />
      <i
        v-else
        class="bi bi-trash"
      />
      {{ t('bulkDelete.deleteSelected') }} ({{ selectedRecords.length }})
    </button>
  </div>

  <teleport to="body">
    <template v-if="showConfirm">
      <div style="position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1050;" />
      <div
        class="modal d-block"
        role="dialog"
        tabindex="-1"
        style="z-index:1051;"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-danger text-white">
              <h5 class="modal-title">
                {{ t('bulkDelete.deleteTitle', { count: selectedRecords.length }) }}
              </h5>
            </div>

            <div class="modal-body">
              <p class="mb-2">
                {{ t('bulkDelete.deleteWarning', { count: selectedRecords.length }) }}
              </p>
              <ul
                v-if="loading"
                class="list-unstyled mb-0"
                style="max-height: 320px; overflow-y: auto;"
              >
                <li
                  v-for="item in progress"
                  :key="item.identifier"
                  class="d-flex align-items-center gap-2 py-1 fs-small-8"
                >
                  <i
                    v-if="item.status === 'deleting'"
                    class="fa fa-spinner fa-spin text-secondary"
                    style="width:14px;"
                  />
                  <i
                    v-else-if="item.status === 'done'"
                    class="bi bi-check-circle-fill text-success"
                    style="width:14px;"
                  />
                  <i
                    v-else-if="item.status === 'failed'"
                    class="bi bi-x-circle-fill text-danger"
                    style="width:14px;"
                  />
                  <i
                    v-else
                    class="bi bi-circle text-muted"
                    style="width:14px;"
                  />
                  <span :class="{ 'text-muted': item.status === 'pending' }">{{ item.title }}</span>
                </li>
              </ul>
              <ul
                v-else
                class="list-unstyled mb-0"
                style="max-height: 320px; overflow-y: auto;"
              >
                <li
                  v-for="record in selectedRecords"
                  :key="record.identifier"
                  class="d-flex align-items-center gap-2 py-1 fs-small-8"
                >
                  <i
                    class="bi bi-circle text-muted"
                    style="width:14px;"
                  />
                  <span>{{ recordTitle(record) }}</span>
                  <span
                    v-if="isDraftOnly(record)"
                    class="badge bg-warning text-dark"
                  >{{ t('bulkDelete.draft') }}</span>
                  <span
                    v-else-if="isPublishedOnly(record)"
                    class="badge bg-success"
                  >{{ t('bulkDelete.published') }}</span>
                  <template v-else>
                    <span class="badge bg-success">{{ t('bulkDelete.published') }}</span>
                    <span class="badge bg-warning text-dark">{{ t('bulkDelete.draft') }}</span>
                  </template>
                </li>
              </ul>
            </div>

            <div
              v-if="!loading"
              class="modal-footer"
            >
              <button
                class="btn btn-secondary"
                @click="showConfirm = false"
              >
                {{ t('bulkDelete.cancel') }}
              </button>
              <button
                class="btn btn-danger"
                @click="onConfirm"
              >
                {{ t('bulkDelete.deleteSelected') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- no type declarations for this JS module
// @ts-ignore
import { lstring } from '~/components/kb/filters.js'
import messages from '~/app-text/components/register/bulk-delete-button.json'
import { useAuth, useNgVue } from '@scbd/angular-vue/src/index.js'
import { useRealm } from '~/services/composables/realm.js'
import { KmDraftsApi } from '~/api/km-document'

interface ListRecord {
  identifier: string
  workingDocumentCreatedOn?: string
  workingDocumentLock?: unknown
  documentID?: string
  title?: Record<string, string>
  workingDocumentTitle?: Record<string, string>
}

interface RecordProgress {
  identifier: string
  title: string
  status: 'pending' | 'deleting' | 'done' | 'failed'
}

interface EditFormUtility {
  deleteDocument: (record: ListRecord, additionalInfo: undefined)=> Promise<unknown>
}

interface Toastr {
  error: (msg: string)=> void
  success: (msg: string)=> void
}

const props = defineProps<{ selectedRecords: ListRecord[] }>()
const emit = defineEmits<(e: 'deleted', payload: { deletedIds: string[], pendingIds: string[] })=> void>()

const { t, locale, mergeLocaleMessage } = useI18n()

// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- rollup plugin wraps JSON in locale object at runtime
Object.entries(messages as unknown as Record<string, unknown>).forEach(([loc, msgs]) => {
  mergeLocaleMessage(loc, { bulkDelete: msgs })
})
const auth = useAuth()
const { realm } = useRealm()
const { $injector } = useNgVue()
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- AngularJS injector is untyped
const editFormUtility = $injector.get('editFormUtility') as EditFormUtility
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- AngularJS injector is untyped
const toastr = $injector.get('toastr') as Toastr
const draftsApi = new KmDraftsApi({ tokenReader: async () => await auth.token(), realm })
const showConfirm = ref(false)
const loading = ref(false)
const progress = ref<RecordProgress[]>([])

function recordTitle (record: ListRecord): string {
  const t = record.workingDocumentTitle ?? record.title
  return lstring(t, locale.value) ?? record.identifier
}

function isDraftOnly (record: ListRecord): boolean {
  return !!(record.workingDocumentCreatedOn && !record.workingDocumentLock && !record.documentID)
}

function isPublishedOnly (record: ListRecord): boolean {
  return !!(record.documentID && !record.workingDocumentCreatedOn)
}

async function onConfirm () {
  loading.value = true
  progress.value = props.selectedRecords.map(r => ({
    identifier: r.identifier,
    title: recordTitle(r),
    status: 'pending' as const
  }))

  const deletedIds: string[] = []
  const pendingIds: string[] = []

  for (const item of progress.value) {
    const record = props.selectedRecords.find(r => r.identifier === item.identifier)
    if (!record) continue
    item.status = 'deleting'
    try {
      if (isDraftOnly(record)) {
        // eslint-disable-next-line no-await-in-loop -- sequential deletion for per-item progress tracking
        await draftsApi.delete(record.identifier)
        deletedIds.push(record.identifier)
      } else if (isPublishedOnly(record)) {
        // eslint-disable-next-line no-await-in-loop -- sequential deletion for per-item progress tracking
        await editFormUtility.deleteDocument(record, undefined)
        pendingIds.push(record.identifier)
      }
      item.status = 'done'
    } catch {
      item.status = 'failed'
      toastr.error(`Failed to delete: ${item.title}`)
    }
  }

  const total = deletedIds.length + pendingIds.length
  if (total > 0) toastr.success(`${total} record(s) processed for deletion.`)

  loading.value = false
  showConfirm.value = false
  emit('deleted', { deletedIds, pendingIds })
}
</script>
