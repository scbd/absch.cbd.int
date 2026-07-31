<template>
  <div class="ep-wrap">
    <loading v-if="isLoading" :caption="t('loading')" />
    <server-error v-else-if="loadError" :error="loadError" />

    <template v-else>
      <div class="ep-shell">
        <!-- ─── Section nav ───────────────────────── -->
        <nav class="ep-secnav">
          <div class="ep-secnav-title">
            {{ portalId ? t('editPortal') : t('newPortal') }}
          </div>
          <ul>
            <li v-for="sec in SECTIONS" :key="sec.id">
              <a :class="{ active: activeSection === sec.id }" @click="scrollToSection(sec.id)">
                <i :class="['fa', sec.icon, 'ep-ic']" />
                {{ sec.label }}
                <span v-if="sec.count" class="ep-nav-count">{{ sec.count }}</span>
              </a>
            </li>
          </ul>
        </nav>

        <!-- ─── Main ─────────────────────────────── -->
        <div class="ep-main">
          <div class="ep-page-head">
            <div>
              <h1>{{ portalId ? t('editPortal') : t('newPortal') }}</h1>
              <p>Configure the portal's details, content, access and menu structure.</p>
            </div>
            <span v-if="portal.slug" class="ep-portal-badge">
              <span class="ep-av">{{ portal.slug.slice(0, 2).toUpperCase() }}</span>
              {{ portal.title['en'] || portal.slug }}
            </span>
          </div>

          <div v-if="saveError" class="ep-alert-danger">
            <i class="fa fa-exclamation-triangle" />
            {{ t('errorSaving') }}: {{ saveErrorMessage }}
          </div>

          <!-- ─── Details ──────────────────────────── -->
          <section id="sec-details" class="ep-card">
            <div class="ep-card-head">
              <h2><i class="fa fa-info-circle ep-ic-accent" /> {{ t('portalDetails') }}</h2>
            </div>
            <div class="ep-card-body">
              <div class="ep-field">
                <label>{{ t('slug') }} <span class="ep-req">*</span></label>
                <div class="ep-field-ctrl">
                  <input v-model="portal.slug" class="ep-inp ep-mono" :placeholder="t('slugPlaceholder')">
                  <div class="ep-hint">
                    {{ t('slugHelp') }}
                  </div>
                </div>
              </div>

              <div class="ep-field">
                <label>{{ t('title') }} <span class="ep-req">*</span></label>
                <div class="ep-field-ctrl">
                  <div class="ep-lang-inp">
                    <span class="ep-lang-prefix" @click="showAllTitleLangs = !showAllTitleLangs">EN</span>
                    <input v-model="portal.title['en']" placeholder="English title">
                    <button
                      class="ep-lang-more" :title="showAllTitleLangs ? 'Hide languages' : 'Add translation'"
                      @click="showAllTitleLangs = !showAllTitleLangs"
                    >
                      <i class="fa" :class="showAllTitleLangs ? 'fa-chevron-up' : 'fa-plus'" />
                    </button>
                  </div>
                  <template v-if="showAllTitleLangs">
                    <div v-for="lang in OTHER_LANGUAGES" :key="lang" class="ep-lang-inp mt-1">
                      <span class="ep-lang-prefix">{{ lang.toUpperCase() }}</span>
                      <input v-model="portal.title[lang]" :placeholder="lang">
                    </div>
                  </template>
                </div>
              </div>

              <div class="ep-field">
                <label>{{ t('sortOrder') }}</label>
                <div class="ep-field-ctrl" style="max-width:140px">
                  <input v-model.number="portal.sortOrder" class="ep-inp" type="number">
                </div>
              </div>

              <div class="ep-field">
                <label>{{ t('realms') }}</label>
                <div class="ep-field-ctrl" style="max-width:280px">
                  <select v-model="selectedRealm" class="ep-inp">
                    <option v-for="o in realmOptions" :key="o.realm" :value="o.realm">
                      {{ o.label }}
                    </option>
                  </select>
                  <div class="ep-hint">
                    A portal belongs to a single realm.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- ─── Content ──────────────────────────── -->
          <section id="sec-content" class="ep-card">
            <div class="ep-card-head">
              <h2><i class="fa fa-file-text-o ep-ic-accent" /> {{ t('content') }}</h2>
            </div>
            <div class="ep-card-body">
              <div class="ep-field ep-field-first">
                <label>{{ t('articleId') }}</label>
                <div class="ep-field-ctrl">
                  <div v-if="portal.content.article.articleId" class="ep-article-chip">
                    <code class="ep-article-id">{{ portal.content.article.articleId }}</code>
                    <span v-if="selectedArticleTitle" class="ep-article-meta">
                      <b>{{ selectedArticleTitle }}</b>
                    </span>
                    <div class="ep-article-actions">
                      <button class="ep-btn-ghost-sm" type="button" @click="articlePickerRef?.show()">
                        <i class="fa fa-search" /> Change article
                      </button>
                      <button class="ep-btn-ghost-sm" type="button" @click="clearArticle">
                        <i class="fa fa-times" /> Remove
                      </button>
                    </div>
                  </div>
                  <button v-else class="ep-btn-ghost-sm" type="button" @click="articlePickerRef?.show()">
                    <i class="fa fa-search" /> Choose article
                  </button>
                </div>
              </div>

              <div class="ep-field">
                <label>Display</label>
                <div class="ep-field-ctrl">
                  <label class="ep-check">
                    <input v-model="portal.content.article.showCoverImage" type="checkbox">
                    {{ t('showCoverImage') }}
                  </label>
                </div>
              </div>
            </div>
          </section>

          <!-- ─── Access control ───────────────────── -->
          <section id="sec-access" class="ep-card">
            <div class="ep-card-head">
              <h2><i class="fa fa-lock ep-ic-accent" /> Access control</h2>
              <span class="ep-card-hint">Leave empty to inherit from parent / public</span>
            </div>
            <div class="ep-card-body">
              <acl-editor v-model="portal.acl" />
            </div>
          </section>

          <!-- ─── Menus ─────────────────────────────── -->
          <section id="sec-menus" class="ep-card">
            <div class="ep-card-head">
              <h2>
                <i class="fa fa-bars ep-ic-accent" /> {{ t('menus') }}
                <span v-if="portal.menus.length" class="ep-nav-count" style="margin-left:4px">{{ portal.menus.length }}</span>
              </h2>
              <button class="ep-btn-primary-sm" type="button" @click="addMenu">
                <i class="fa fa-plus" /> {{ t('addMenu') }}
              </button>
            </div>
            <div class="ep-card-body">
              <div class="ep-menus-grid">
                <div class="ep-menus-editor">
                  <div v-if="!portal.menus.length" class="ep-empty-state">
                    No menu items yet. Click "Add menu item" to get started.
                  </div>
                  <menu-item-editor
                    v-for="(menu, i) in portal.menus"
                    :key="i"
                    :item="menu"
                    :can-move-up="i > 0"
                    :can-move-down="i < portal.menus.length - 1"
                    @on-delete="removeMenu(i)"
                    @on-move-up="moveMenu(i, -1)"
                    @on-move-down="moveMenu(i, 1)"
                  />
                </div>
                <div class="ep-menus-preview">
                  <div class="ep-preview-label">
                    Preview
                  </div>
                  <!-- capture prevents link navigation while still letting Bootstrap collapse fire -->
                  <div style="user-select:none;opacity:.85" @click.capture.prevent>
                    <side-menu :menu="previewMenu" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- ─── Actions ─────────────────────────── -->
          <div class="ep-actions">
            <div class="ep-status" :class="isDirty ? 'ep-unsaved' : 'ep-saved'">
              <span class="ep-dot" />
              {{ isDirty ? 'Unsaved changes' : 'All changes saved' }}
            </div>
            <a href="/portals" class="ep-btn-ghost">Cancel</a>
            <button class="ep-btn-primary" type="button" :disabled="isSaving || isLoading" @click="save">
              <i v-if="isSaving" class="fa fa-cog fa-spin" />
              {{ isSaving ? t('saving') : t('save') }}
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- Article picker (modal, lives outside scroll area) -->
    <article-picker ref="articlePickerRef" @on-select="onArticleSelect" />

    <!-- Save success toast -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index:100000">
      <div ref="savedToast" class="toast hide align-items-center text-white bg-success border-0" role="status" aria-live="polite" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            <i class="fa fa-check-circle" /> {{ t('savedSuccessfully') }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuth, useRoute } from '@scbd/angular-vue/src/index.js'
// @ts-expect-error importing js file
import { Toast } from 'bootstrap'
import { useRealm } from '~/services/composables/realm.js'
// @ts-expect-error importing js file
import PortalsApi from '~/api/portals'
// @ts-expect-error importing js file
import RealmsApi from '~/api/realms'
// @ts-expect-error importing js file
import { lstring } from '~/services/filters/lstring'
import Loading from '~/components/common/loading.vue'
// @ts-expect-error importing js file
import ServerError from '~/components/common/error.vue'
import MenuItemEditor from '~/components/portals/menu-item-editor.vue'
// @ts-expect-error no types
import SideMenu from '~/components/menus/side-menu.vue'
import ArticlePicker from '~/components/portals/article-picker.vue'
import AclEditor from '~/components/portals/acl-editor.vue'
import { toPortalDraft } from '~/views/portals/portal-draft'
import messages from '~/app-text/views/portals/edit-portal.json'
import type { LanguageCode } from '~/types/languages'
import type { PortalMenuItem, PortalDraft, PreviewMenu } from '~/types/portals'

const { t } = useI18n({ messages })
const auth = useAuth()
const route = useRoute()
const realm = useRealm()
const portalsApi = new PortalsApi({ tokenReader: async () => await auth.token() })
const realmsApi = new RealmsApi({})

const portalId = computed(() => route.value.params['portalId'])
const portalDbId = ref<string | undefined>(undefined)

const OTHER_LANGUAGES: LanguageCode[] = ['ar', 'es', 'fr', 'ru', 'zh']
const showAllTitleLangs = ref(false)

const isLoading = ref(false)
const isSaving = ref(false)
const loadError = ref<unknown>(null)
const saveError = ref<unknown>(null)

const saveErrorMessage = computed(() => {
  const { value: err } = saveError
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  return JSON.stringify(err)
})

// ── Dirty tracking ───────────────────────────────────────
const isDirty = ref(false)
let cleanSnapshot = ''

function snapshot () { return JSON.stringify(portal.value) }

// ── Realm selection ──────────────────────────────────────
interface RealmOption { realm: string; displayName?: string }

const availableRealms = ref<RealmOption[]>([])

const selectedRealm = computed({
  get () {
    const { value: draft } = portal
    const { realms } = draft
    const [first] = realms
    return first ?? ''
  },
  set (val: string) {
    portal.value.realms = val ? [val] : []
  }
})

const realmOptions = computed(() => {
  const options = [...availableRealms.value]
  const { value: current } = selectedRealm
  if (current && !options.some(o => o.realm === current)) {
    options.push({ realm: current })
  }
  return options
    .map(o => ({ realm: o.realm, label: o.displayName ? `${o.displayName} (${o.realm})` : o.realm }))
    .sort((a, b) => a.realm.localeCompare(b.realm))
})

async function loadRealms () {
  try {
    const configs: Array<{ realm?: string; displayName?: string }> = await realmsApi.getRealmConfigurations(realm.environment, { displayName: 1, realm: 1 })
    const byCode = new Map<string, RealmOption>()
    for (const { realm: code, displayName } of configs) {
      if (code && !byCode.has(code)) byCode.set(code, { realm: code, displayName })
    }
    availableRealms.value = [...byCode.values()]
  } catch {
    availableRealms.value = []
  }
}

// ── Save toast ───────────────────────────────────────────
const savedToast = ref<HTMLElement | null>(null)

// ── Article picker ───────────────────────────────────────
const articlePickerRef = ref<{ show: ()=> void } | null>(null)
const selectedArticleTitle = ref('')

function onArticleSelect (article: { _id: string; title: unknown }) {
  const { _id: articleId, title } = article
  portal.value.content.article.articleId = articleId
  selectedArticleTitle.value = lstring(title, 'en')
}

function clearArticle () {
  portal.value.content.article.articleId = ''
  selectedArticleTitle.value = ''
}

// ── Portal state ─────────────────────────────────────────
const portal = ref<PortalDraft>({
  slug: '',
  title: {},
  sortOrder: 0,
  realms: [realm.value],
  content: { article: { articleId: '', showCoverImage: false } },
  menus: [],
  acl: { enabled: false, read: [], update: [] }
})

watch(portal, () => { isDirty.value = snapshot() !== cleanSnapshot }, { deep: true })

// ── Preview ───────────────────────────────────────────────
function toPreviewMenu (item: PortalMenuItem, basePath: string): PreviewMenu {
  const path = [basePath, item.slug].filter(Boolean).join('/')
  const { url, target } = item.url ?? {}
  return {
    url: url ?? path,
    title: item.title,
    isExpanded: item.isExpanded ?? false,
    hasContent: !!item.content,
    target: url ? target : undefined,
    menus: item.menus.map(c => toPreviewMenu(c, path))
  }
}

const previewMenu = computed(() => ({
  url: `portals/${portal.value.slug}`,
  title: portal.value.title,
  menus: portal.value.menus.map(m => toPreviewMenu(m, `portals/${portal.value.slug}`))
}))

// ── Section nav scroll-spy ────────────────────────────────
const SECTION_IDS = ['sec-details', 'sec-content', 'sec-access', 'sec-menus']
const activeSection = ref('sec-details')

const SECTIONS = computed(() => [
  { id: 'sec-details', icon: 'fa-info-circle', label: t('portalDetails') },
  { id: 'sec-content', icon: 'fa-file-text-o', label: t('content') },
  { id: 'sec-access', icon: 'fa-lock', label: 'Access' },
  {
    id: 'sec-menus',
    icon: 'fa-bars',
    label: t('menus'),
    count: portal.value.menus.length || undefined
  }
])

let observer: IntersectionObserver | null = null

function scrollToSection (id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(async () => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const { target } = e
        const { id } = target
        activeSection.value = id
      }
    })
  }, { rootMargin: '-20% 0px -70% 0px' })
  observer = obs

  SECTION_IDS.forEach(id => {
    const el = document.getElementById(id)
    if (el) obs.observe(el)
  })

  await loadRealms()

  if (!portalId.value) return
  isLoading.value = true
  try {
    const data = await portalsApi.getPortalForEdit(portalId.value)
    const { _id } = data
    portalDbId.value = _id
    portal.value = toPortalDraft(data)
    cleanSnapshot = snapshot()
    isDirty.value = false
  } catch (err) {
    loadError.value = err
  } finally {
    isLoading.value = false
  }
})

onUnmounted(() => observer?.disconnect())

// ── CRUD ─────────────────────────────────────────────────
function addMenu () {
  portal.value.menus.push({ slug: '', title: {}, menus: [], acl: { enabled: false, read: [], update: [] } })
}
function removeMenu (i: number) { portal.value.menus.splice(i, 1) }
function moveMenu (i: number, dir: number) {
  const { value: draft } = portal
  const { menus } = draft
  const { [i]: a } = menus
  const { [i + dir]: b } = menus
  if (!a || !b) return
  menus[i] = b
  menus[i + dir] = a
}

async function save () {
  saveError.value = null
  isSaving.value = true
  try {
    const payload = { ...portal.value }
    if (portalDbId.value) {
      await portalsApi.updatePortal(portalDbId.value, payload)
    } else {
      const created = await portalsApi.createPortal(payload)
      const { _id } = created
      portalDbId.value = _id
    }
    cleanSnapshot = snapshot()
    isDirty.value = false
    if (savedToast.value) Toast.getOrCreateInstance(savedToast.value).show()
  } catch (err) {
    saveError.value = err
  } finally {
    isSaving.value = false
  }
}

</script>

<style scoped src="./edit-portal.css"></style>
