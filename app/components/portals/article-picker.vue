<template>
  <div ref="modalEl" class="modal fade" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Select article
          </h5>
          <button type="button" class="btn-close" @click="close" />
        </div>

        <div class="modal-body">
          <div class="row g-2 mb-3">
            <div class="col">
              <input
                ref="searchInputEl"
                v-model="query"
                type="text"
                class="form-control"
                placeholder="Search title and content…"
                @input="onInput"
              >
            </div>
            <div class="col-auto" style="min-width:200px">
              <input
                v-model="tagsInput"
                type="text"
                class="form-control"
                placeholder="Admin tags (comma separated)"
                @input="onInput"
              >
            </div>
          </div>

          <div v-if="isLoading" class="text-center py-4 text-muted">
            <i class="fa fa-cog fa-spin me-1" /> Searching…
          </div>

          <div v-else-if="error" class="alert alert-danger mb-0">
            {{ error }}
          </div>

          <div v-else-if="!articles.length && hasSearched" class="text-muted fst-italic small py-2">
            No articles found.
          </div>

          <div v-else-if="articles.length" class="list-group">
            <button
              v-for="article in articles"
              :key="article._id"
              type="button"
              class="list-group-item list-group-item-action d-flex align-items-center gap-3 py-2"
              @click="pick(article)"
            >
              <div class="flex-grow-1 text-start">
                <div class="fw-semibold">
                  {{ displayTitle(article.title) }}
                </div>
                <div v-if="article.adminTags?.length" class="mt-1">
                  <span v-for="tag in article.adminTags" :key="tag" class="badge bg-secondary me-1 fw-normal">{{ tag }}</span>
                </div>
                <div class="text-muted small font-monospace">
                  {{ article._id }}
                </div>
              </div>
              <i class="fa fa-chevron-right text-muted" />
            </button>
          </div>

          <div v-else class="text-muted fst-italic small py-2">
            Type to search articles.
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="close">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// @ts-expect-error importing js file
import { Modal } from 'bootstrap'
// @ts-expect-error importing js file
import SolrApi from '~/api/solr'
import { useAuth } from '@scbd/angular-vue/src/index.js'
// @ts-expect-error importing js file
import { lstring } from '~/services/filters/lstring'
// @ts-expect-error importing js file
import { escape as escapeSolr } from '~/services/solr/queries.js'
// @ts-expect-error no types
import { debounce } from 'lodash'

interface Article { _id: string; title?: unknown; adminTags?: string[] }
interface SolrArticleDoc { id: string; title_EN_t?: string; adminTags_ss?: string[] }

const emit = defineEmits<(e: 'onSelect', article: { _id: string; title: unknown })=> void>()

const auth = useAuth()
const solrApi = new SolrApi({ tokenReader: async () => await auth.token() })

const modalEl = ref<HTMLElement | null>(null)
const searchInputEl = ref<HTMLInputElement | null>(null)
let bsModal: { show: ()=> void; hide: ()=> void } | null = null

const query = ref('')
const tagsInput = ref('')
const articles = ref<Article[]>([])
const isLoading = ref(false)
const error = ref('')
const hasSearched = ref(false)

onMounted(() => {
  if (modalEl.value) bsModal = new Modal(modalEl.value)
})

function displayTitle (title: unknown): string {
  const text: unknown = lstring(title, 'en')
  if (typeof text === 'string' && text) return text
  return '(untitled)'
}

function parsedTags (): { tags: string[]; anyTag: boolean } {
  const { value: raw } = tagsInput
  const byComma = raw.split(',').map(s => s.trim()).filter(Boolean)
  if (byComma.length > 1) return { tags: byComma, anyTag: false }
  const bySpace = raw.split(/[\s,]+/).filter(Boolean)
  return { tags: bySpace, anyTag: bySpace.length > 1 }
}

// Each tag matches partially; comma-separated tags must all match, space-separated match any
function buildTagFilters (tags: string[], anyTag: boolean): string[] {
  const patterns = tags.map(tag => `adminTags_ss:*${escapeSolr(tag.toLowerCase())}*`)
  if (anyTag && patterns.length > 1) {
    return [`(${patterns.join(' OR ')})`]
  }
  return patterns
}

function searchErrorMessage (err: unknown): string {
  if (err instanceof Error && err.message) return err.message
  return 'Failed to search articles.'
}

async function search () {
  const term = query.value.trim()
  const { tags, anyTag } = parsedTags()

  if (!term && !tags.length) {
    articles.value = []
    hasSearched.value = false
    return
  }

  isLoading.value = true
  error.value = ''
  hasSearched.value = true

  try {
    const result = await solrApi.query({
      query: term ? `text_EN_txt: ${escapeSolr(term)}` : '*:*',
      fieldQueries: ['schema_s:oasis-article', ...buildTagFilters(tags, anyTag)],
      fields: 'id, title_EN_t, adminTags_ss',
      sort: term ? undefined : 'updatedDate_dt desc',
      rowsPerPage: 20
    })
    const docs: SolrArticleDoc[] = result?.response?.docs ?? []
    articles.value = docs.map(d => ({ _id: d.id, title: d.title_EN_t, adminTags: d.adminTags_ss }))
  } catch (err) {
    error.value = searchErrorMessage(err)
    articles.value = []
  } finally {
    isLoading.value = false
  }
}

const onInput = debounce(search, 300)

function pick (article: Article) {
  emit('onSelect', { _id: article._id, title: article.title })
  close()
}

function show () {
  query.value = ''
  tagsInput.value = ''
  articles.value = []
  error.value = ''
  hasSearched.value = false
  bsModal?.show()
  setTimeout(() => searchInputEl.value?.focus(), 300)
}

function close () {
  bsModal?.hide()
}

defineExpose({ show, close })
</script>
