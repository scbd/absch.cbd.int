<template>
  <!-- eslint-disable vue/no-mutating-props -- recursive editor edits the shared portal draft in place by design -->
  <div class="menu-item-editor border rounded mb-2">
    <div class="d-flex align-items-center gap-2 p-2 bg-light rounded-top" role="button" @click="expanded = !expanded">
      <i class="fa fa-fw small text-secondary" :class="expanded ? 'fa-chevron-down' : 'fa-chevron-right'" />
      <span class="flex-grow-1 fw-semibold text-truncate small">
        {{ item.title?.en || item.slug || t('unnamed') }}
        <span v-if="contentType" class="badge bg-secondary ms-1 fw-normal">{{ contentType }}</span>
      </span>
      <div class="btn-group btn-group-sm" @click.stop>
        <button type="button" class="btn btn-outline-secondary" :disabled="!canMoveUp" :title="t('moveUp')" @click="$emit('onMoveUp')">
          <i class="fa fa-arrow-up" />
        </button>
        <button type="button" class="btn btn-outline-secondary" :disabled="!canMoveDown" :title="t('moveDown')" @click="$emit('onMoveDown')">
          <i class="fa fa-arrow-down" />
        </button>
      </div>
      <button type="button" class="btn btn-sm btn-outline-danger" :title="t('deleteItem')" @click.stop="$emit('onDelete')">
        <i class="fa fa-trash" />
      </button>
    </div>

    <div v-if="expanded" class="p-3">
      <!-- Slug -->
      <div class="mb-3 row">
        <label class="col-sm-3 col-form-label col-form-label-sm">{{ t('slug') }}</label>
        <div class="col-sm-9">
          <input v-model="item.slug" type="text" class="form-control form-control-sm" :placeholder="t('slugPlaceholder')">
        </div>
      </div>

      <!-- Title per language -->
      <div class="mb-3 row">
        <label class="col-sm-3 col-form-label col-form-label-sm">{{ t('title') }}</label>
        <div class="col-sm-9">
          <div class="input-group input-group-sm mb-1">
            <span class="input-group-text" style="width:44px">EN</span>
            <input v-model="item.title['en']" type="text" class="form-control" placeholder="en">
            <button type="button" class="btn btn-outline-secondary" :title="showAllLangs ? 'Hide languages' : 'Show all languages'" @click="showAllLangs = !showAllLangs">
              <i class="fa" :class="showAllLangs ? 'fa-chevron-up' : 'fa-chevron-down'" />
            </button>
          </div>
          <template v-if="showAllLangs">
            <div v-for="lang in OTHER_LANGUAGES" :key="lang" class="input-group input-group-sm mb-1">
              <span class="input-group-text" style="width:44px">{{ lang.toUpperCase() }}</span>
              <input v-model="item.title[lang]" type="text" class="form-control" :placeholder="lang">
            </div>
          </template>
        </div>
      </div>

      <!-- Content type + sub-fields -->
      <div class="rounded border bg-light px-3 pt-2 pb-1 mb-3">
        <div class="mb-2 row">
          <label class="col-sm-3 col-form-label col-form-label-sm">{{ t('contentType') }}</label>
          <div class="col-sm-9">
            <select v-model="contentType" class="form-select form-select-sm">
              <option value="">
                {{ t('contentTypeNone') }}
              </option>
              <option value="article">
                {{ t('contentTypeArticle') }}
              </option>
              <option value="forum">
                {{ t('contentTypeForum') }}
              </option>
              <option value="forumLoP">
                {{ t('contentTypeForumLoP') }}
              </option>
              <option value="link">
                Link
              </option>
            </select>
          </div>
        </div>

        <!-- Article fields -->
        <template v-if="articleContent">
          <div class="mb-2 row">
            <label class="col-sm-3 col-form-label col-form-label-sm">{{ t('articleId') }}</label>
            <div class="col-sm-9">
              <div class="d-flex align-items-center gap-2">
                <span v-if="selectedArticleTitle" class="flex-grow-1 small">
                  <span class="fw-semibold">{{ selectedArticleTitle }}</span>
                  <span class="text-muted font-monospace ms-2">{{ articleContent.articleId }}</span>
                </span>
                <span v-else-if="articleContent.articleId" class="text-muted small font-monospace flex-grow-1">
                  {{ articleContent.articleId }}
                </span>
                <span v-else class="text-muted fst-italic small flex-grow-1">No article selected</span>
                <button type="button" class="btn btn-sm btn-outline-primary" @click="articlePickerRef?.show()">
                  <i class="fa fa-search me-1" />{{ articleContent.articleId ? 'Change' : 'Choose article' }}
                </button>
                <button v-if="articleContent.articleId" type="button" class="btn btn-sm btn-outline-secondary" @click="clearArticle">
                  <i class="fa fa-times" />
                </button>
              </div>
              <article-picker ref="articlePickerRef" @on-select="onArticleSelect" />
            </div>
          </div>
          <div class="mb-2 row">
            <div class="col-sm-9 offset-sm-3">
              <div class="form-check form-check-sm">
                <input :id="`cover-${uid}`" v-model="articleContent.showCoverImage" class="form-check-input" type="checkbox">
                <label class="form-check-label" :for="`cover-${uid}`">{{ t('showCoverImage') }}</label>
              </div>
            </div>
          </div>
        </template>

        <!-- Forum / ForumLoP fields -->
        <template v-if="forumContent">
          <div class="mb-2 row">
            <label class="col-sm-3 col-form-label col-form-label-sm">{{ t('forumId') }}</label>
            <div class="col-sm-9">
              <input v-model.number="forumContent.forumId" type="number" class="form-control form-control-sm">
            </div>
          </div>
        </template>

        <!-- Link fields -->
        <template v-if="contentType === 'link'">
          <div class="mb-2 row">
            <label class="col-sm-3 col-form-label col-form-label-sm">{{ t('url') }}</label>
            <div class="col-sm-9">
              <div class="input-group input-group-sm">
                <input v-model="urlHref" type="text" class="form-control" :placeholder="t('urlPlaceholder')">
                <select v-model="urlTarget" class="form-select" style="max-width:160px">
                  <option value="">
                    {{ t('urlTargetSelf') }}
                  </option>
                  <option value="_blank">
                    {{ t('urlTargetBlank') }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- isExpanded -->
      <div class="mb-3 row">
        <div class="col-sm-9 offset-sm-3">
          <div class="form-check form-check-sm">
            <input :id="`expanded-${uid}`" v-model="item.isExpanded" class="form-check-input" type="checkbox">
            <label class="form-check-label" :for="`expanded-${uid}`">{{ t('isExpanded') }}</label>
          </div>
        </div>
      </div>

      <!-- ACL -->
      <div class="rounded border bg-light px-3 pt-2 pb-3 mb-3">
        <div class="small fw-semibold text-muted mb-2">
          Access control
        </div>
        <acl-editor v-model="item.acl" />
      </div>

      <!-- Sub-menus -->
      <div class="border-top pt-3">
        <div class="d-flex align-items-center mb-2">
          <span class="small fw-semibold text-muted flex-grow-1">{{ t('subMenus') }}</span>
          <button type="button" class="btn btn-sm btn-outline-primary" @click="addSubMenu">
            <i class="fa fa-plus me-1" />{{ t('addSubMenu') }}
          </button>
        </div>
        <div v-if="item.menus.length" class="ps-3">
          <menu-item-editor
            v-for="(sub, i) in item.menus"
            :key="i"
            :item="sub"
            :can-move-up="i > 0"
            :can-move-down="i < item.menus.length - 1"
            @on-delete="removeSubMenu(i)"
            @on-move-up="moveSubMenu(i, -1)"
            @on-move-down="moveSubMenu(i, 1)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable vue/no-mutating-props -- recursive editor edits the shared portal draft in place by design */
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
// @ts-expect-error importing js file
import { lstring } from '~/services/filters/lstring'
import messages from '~/app-text/views/portals/edit-portal.json'
import ArticlePicker from '~/components/portals/article-picker.vue'
import AclEditor from '~/components/portals/acl-editor.vue'
import type { LanguageCode } from '~/types/languages'
import type { MenuContent, PortalMenuItem } from '~/types/portals'

const props = defineProps<{ item: PortalMenuItem; canMoveUp?: boolean; canMoveDown?: boolean }>()

defineEmits(['onDelete', 'onMoveUp', 'onMoveDown'])

defineOptions({ name: 'MenuItemEditor' })

const { t } = useI18n({ messages })

const OTHER_LANGUAGES: LanguageCode[] = ['ar', 'es', 'fr', 'ru', 'zh']
const showAllLangs = ref(false)

const uid = Math.random().toString(36).slice(2, 8)
const expanded = ref(false)
const articlePickerRef = ref<{ show: ()=> void } | null>(null)
const selectedArticleTitle = ref('')

const contentType = computed({
  get () {
    const { item } = props
    const { content } = item
    if (!content) return ''
    if (content.article) return 'article'
    if (content.forum) return 'forum'
    if (content.forumLoP) return 'forumLoP'
    if (content.link) return 'link'
    return ''
  },
  set (newType) {
    if (newType === 'article') {
      props.item.content = buildArticleContent()
    } else if (newType === 'forum' || newType === 'forumLoP') {
      props.item.content = buildForumContent(newType)
    } else if (newType === 'link') {
      props.item.content = { link: {} }
    } else {
      delete props.item.content
    }
  }
})

const articleContent = computed(() => props.item.content?.article)

const forumContent = computed(() => {
  const { item } = props
  const { content } = item
  return content?.forum ?? content?.forumLoP
})

const urlHref = computed({
  get () { return props.item.url?.url ?? '' },
  set (val) {
    if (val) {
      props.item.url = { ...props.item.url, url: val }
    } else {
      delete props.item.url
    }
  }
})

const urlTarget = computed({
  get () { return props.item.url?.target ?? '' },
  set (val) {
    if (!props.item.url) return
    if (val) {
      props.item.url.target = val
    } else {
      delete props.item.url.target
    }
  }
})

function onArticleSelect (article: { _id: string; title: unknown }) {
  const { _id: articleId, title } = article
  if (props.item.content?.article) {
    props.item.content.article.articleId = articleId
  }
  selectedArticleTitle.value = lstring(title, 'en')
}

function clearArticle () {
  if (props.item.content?.article) {
    props.item.content.article.articleId = ''
  }
  selectedArticleTitle.value = ''
}

function buildArticleContent (): MenuContent {
  const prev = props.item.content?.article
  return { article: { articleId: prev?.articleId ?? '', showCoverImage: prev?.showCoverImage ?? false } }
}

function buildForumContent (key: 'forum' | 'forumLoP'): MenuContent {
  const prev = props.item.content?.[key]
  const forum = { forumId: prev?.forumId ?? null }
  if (key === 'forum') return { forum }
  return { forumLoP: forum }
}

function addSubMenu () {
  props.item.menus.push({ slug: '', title: {}, menus: [], acl: { enabled: false, read: [], update: [] } })
}

function removeSubMenu (i: number) {
  props.item.menus.splice(i, 1)
}

function moveSubMenu (i: number, dir: number) {
  const { item } = props
  const { menus } = item
  const { [i]: a } = menus
  const { [i + dir]: b } = menus
  if (!a || !b) return
  menus[i] = b
  menus[i + dir] = a
}
</script>
