<template>
  <div class="menu-item-editor border rounded mb-2">
    <div class="d-flex align-items-center gap-2 p-2 bg-light rounded-top" style="cursor:pointer" @click="expanded = !expanded">
      <i class="fa fa-fw" :class="expanded ? 'fa-chevron-down' : 'fa-chevron-right'" style="font-size:0.8rem;color:#6c757d"></i>
      <span class="flex-grow-1 fw-semibold text-truncate small">
        {{ item.title?.en || item.slug || t('unnamed') }}
        <span v-if="contentType" class="badge bg-secondary ms-1 fw-normal">{{ contentType }}</span>
      </span>
      <div class="btn-group btn-group-sm" @click.stop>
        <button type="button" class="btn btn-outline-secondary" :disabled="!canMoveUp" @click="$emit('move-up')" :title="t('moveUp')">
          <i class="fa fa-arrow-up"></i>
        </button>
        <button type="button" class="btn btn-outline-secondary" :disabled="!canMoveDown" @click="$emit('move-down')" :title="t('moveDown')">
          <i class="fa fa-arrow-down"></i>
        </button>
      </div>
      <button type="button" class="btn btn-sm btn-outline-danger" @click.stop="$emit('delete')" :title="t('deleteItem')">
        <i class="fa fa-trash"></i>
      </button>
    </div>

    <div v-if="expanded" class="p-3">

      <!-- Slug -->
      <div class="mb-3 row">
        <label class="col-sm-3 col-form-label col-form-label-sm">{{ t('slug') }}</label>
        <div class="col-sm-9">
          <input type="text" class="form-control form-control-sm" v-model="item.slug" :placeholder="t('slugPlaceholder')" />
        </div>
      </div>

      <!-- Title per language -->
      <div class="mb-3 row">
        <label class="col-sm-3 col-form-label col-form-label-sm">{{ t('title') }}</label>
        <div class="col-sm-9">
          <div class="input-group input-group-sm mb-1">
            <span class="input-group-text" style="width:44px">EN</span>
            <input type="text" class="form-control" v-model="item.title['en']" placeholder="en" />
            <button type="button" class="btn btn-outline-secondary" @click="showAllLangs = !showAllLangs" :title="showAllLangs ? 'Hide languages' : 'Show all languages'">
              <i class="fa" :class="showAllLangs ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
            </button>
          </div>
          <template v-if="showAllLangs">
            <div v-for="lang in OTHER_LANGUAGES" :key="lang" class="input-group input-group-sm mb-1">
              <span class="input-group-text" style="width:44px">{{ lang.toUpperCase() }}</span>
              <input type="text" class="form-control" v-model="item.title[lang]" :placeholder="lang" />
            </div>
          </template>
        </div>
      </div>

      <!-- Content type + sub-fields -->
      <div class="rounded border bg-light px-3 pt-2 pb-1 mb-3">
        <div class="mb-2 row">
          <label class="col-sm-3 col-form-label col-form-label-sm">{{ t('contentType') }}</label>
          <div class="col-sm-9">
            <select class="form-select form-select-sm" v-model="contentType">
              <option value="">{{ t('contentTypeNone') }}</option>
              <option value="article">{{ t('contentTypeArticle') }}</option>
              <option value="forum">{{ t('contentTypeForum') }}</option>
              <option value="forumLoP">{{ t('contentTypeForumLoP') }}</option>
              <option value="link">Link</option>
            </select>
          </div>
        </div>

        <!-- Article fields -->
        <template v-if="contentType === 'article'">
          <div class="mb-2 row">
            <label class="col-sm-3 col-form-label col-form-label-sm">{{ t('articleId') }}</label>
            <div class="col-sm-9">
              <div class="d-flex align-items-center gap-2">
                <span v-if="selectedArticleTitle" class="flex-grow-1 small">
                  <span class="fw-semibold">{{ selectedArticleTitle }}</span>
                  <span class="text-muted font-monospace ms-2">{{ item.content.article.articleId }}</span>
                </span>
                <span v-else-if="item.content.article.articleId" class="text-muted small font-monospace flex-grow-1">
                  {{ item.content.article.articleId }}
                </span>
                <span v-else class="text-muted fst-italic small flex-grow-1">No article selected</span>
                <button type="button" class="btn btn-sm btn-outline-primary" @click="articlePickerRef?.show()">
                  <i class="fa fa-search me-1"></i>{{ item.content.article.articleId ? 'Change' : 'Choose article' }}
                </button>
                <button v-if="item.content.article.articleId" type="button" class="btn btn-sm btn-outline-secondary" @click="clearArticle">
                  <i class="fa fa-times"></i>
                </button>
              </div>
              <article-picker ref="articlePickerRef" @select="onArticleSelect" />
            </div>
          </div>
          <div class="mb-2 row">
            <div class="col-sm-9 offset-sm-3">
              <div class="form-check form-check-sm">
                <input class="form-check-input" type="checkbox" v-model="item.content.article.showCoverImage" :id="`cover-${uid}`" />
                <label class="form-check-label" :for="`cover-${uid}`">{{ t('showCoverImage') }}</label>
              </div>
            </div>
          </div>
        </template>

        <!-- Forum / ForumLoP fields -->
        <template v-if="contentType === 'forum' || contentType === 'forumLoP'">
          <div class="mb-2 row">
            <label class="col-sm-3 col-form-label col-form-label-sm">{{ t('forumId') }}</label>
            <div class="col-sm-9">
              <input type="number" class="form-control form-control-sm" v-model.number="item.content[contentType].forumId" />
            </div>
          </div>
        </template>

        <!-- Link fields -->
        <template v-if="contentType === 'link'">
          <div class="mb-2 row">
            <label class="col-sm-3 col-form-label col-form-label-sm">{{ t('url') }}</label>
            <div class="col-sm-9">
              <div class="input-group input-group-sm">
                <input type="text" class="form-control" v-model="urlHref" :placeholder="t('urlPlaceholder')" />
                <select class="form-select" style="max-width:160px" v-model="urlTarget">
                  <option value="">{{ t('urlTargetSelf') }}</option>
                  <option value="_blank">{{ t('urlTargetBlank') }}</option>
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
            <input class="form-check-input" type="checkbox" v-model="item.isExpanded" :id="`expanded-${uid}`" />
            <label class="form-check-label" :for="`expanded-${uid}`">{{ t('isExpanded') }}</label>
          </div>
        </div>
      </div>

      <!-- ACL -->
      <div class="rounded border bg-light px-3 pt-2 pb-3 mb-3">
        <div class="small fw-semibold text-muted mb-2">Access control</div>
        <acl-editor v-model="item.acl" />
      </div>

      <!-- Sub-menus -->
      <div class="border-top pt-3">
        <div class="d-flex align-items-center mb-2">
          <span class="small fw-semibold text-muted flex-grow-1">{{ t('subMenus') }}</span>
          <button type="button" class="btn btn-sm btn-outline-primary" @click="addSubMenu">
            <i class="fa fa-plus me-1"></i>{{ t('addSubMenu') }}
          </button>
        </div>
        <div v-if="item.menus?.length" class="ps-3">
          <menu-item-editor
            v-for="(sub, i) in item.menus"
            :key="i"
            :item="sub"
            :can-move-up="i > 0"
            :can-move-down="i < item.menus.length - 1"
            @delete="removeSubMenu(i)"
            @move-up="moveSubMenu(i, -1)"
            @move-down="moveSubMenu(i, 1)"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import messages from '~/app-text/views/portals/edit-portal.json';
import ArticlePicker from '~/components/portals/article-picker.vue';
import AclEditor from '~/components/portals/acl-editor.vue';

defineOptions({ name: 'MenuItemEditor' });

const props = defineProps({
  item: { type: Object, required: true },
  canMoveUp: { type: Boolean, default: false },
  canMoveDown: { type: Boolean, default: false },
});

defineEmits(['delete', 'move-up', 'move-down']);

const { t } = useI18n({ messages });

const OTHER_LANGUAGES = ['ar', 'es', 'fr', 'ru', 'zh'];
const showAllLangs = ref(false);

const uid = Math.random().toString(36).slice(2, 8);
const expanded = ref(false);
const articlePickerRef = ref(null);
const selectedArticleTitle = ref('');

if (!props.item.title) props.item.title = {};
if (!props.item.menus) props.item.menus = [];
if (!props.item.acl)   props.item.acl   = { enabled: false, read: [], update: [] };
if (!props.item.content && props.item.url?.url) props.item.content = { link: {} };

const contentType = computed({
  get() {
    if (!props.item.content) return '';
    return Object.keys(props.item.content)[0] || '';
  },
  set(newType) {
    if (!newType) {
      delete props.item.content;
    } else if (newType === 'article') {
      const prev = props.item.content?.article || {};
      props.item.content = { article: { articleId: prev.articleId || '', showCoverImage: prev.showCoverImage || false } };
    } else if (newType === 'forum') {
      const prev = props.item.content?.forum || {};
      props.item.content = { forum: { forumId: prev.forumId ?? null } };
    } else if (newType === 'forumLoP') {
      const prev = props.item.content?.forumLoP || {};
      props.item.content = { forumLoP: { forumId: prev.forumId ?? null } };
    } else if (newType === 'link') {
      props.item.content = { link: {} };
    }
  }
});

const urlHref = computed({
  get() { return props.item.url?.url || ''; },
  set(val) {
    if (!val) {
      delete props.item.url;
    } else {
      props.item.url = { ...(props.item.url || {}), url: val };
    }
  }
});

const urlTarget = computed({
  get() { return props.item.url?.target || ''; },
  set(val) {
    if (!props.item.url) return;
    if (val) {
      props.item.url.target = val;
    } else {
      delete props.item.url.target;
    }
  }
});

function onArticleSelect(article) {
  props.item.content.article.articleId = article._id;
  const t = article.title;
  if (!t) { selectedArticleTitle.value = ''; return; }
  if (typeof t === 'string') { selectedArticleTitle.value = t; return; }
  selectedArticleTitle.value = t['en'] || t['fr'] || t['es'] || Object.values(t).find(Boolean) || '';
}

function clearArticle() {
  props.item.content.article.articleId = '';
  selectedArticleTitle.value = '';
}

function addSubMenu() {
  if (!props.item.menus) props.item.menus = [];
  props.item.menus.push({ slug: '', title: {}, menus: [], acl: { enabled: false, read: [], update: [] } });
}

function removeSubMenu(i) {
  props.item.menus.splice(i, 1);
}

function moveSubMenu(i, dir) {
  const arr = props.item.menus;
  const j = i + dir;
  if (j < 0 || j >= arr.length) return;
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
</script>
