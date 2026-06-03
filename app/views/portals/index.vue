<template>
  <div id="forums" class="forums-root px-5 py-4">

    <div class="card mb-4">
      <div class="card-body position-relative">
        <div v-if="isAdmin" class="admin-ribbon">
          <i class="fa fa-shield me-1"></i> Admin
        </div>
        <cbd-article
          :query="articleQuery"
          :show-edit="true"
          :admin-tags="articleAdminTags"
        >
          <template #missing-article>
            <h4 class="fs-4 mb-2 fw-bold">{{ t('portals') }}</h4>
          </template>
        </cbd-article>
      </div>
    </div>

    <div class="forums-layout">
      <!-- Main column -->
      <div class="forums-main">        

        <loading v-if="isLoading" :caption="t('loading')" />
        <server-error v-else-if="typeof error === 'object'" :error="error" />

        <div v-else class="portals-grid">
          <div
            v-for="portal in portals"
            :key="portal._id"
            class="portal-card"
          >
            <a :href="portal.url" class="card-cover-link">
              <img
                v-if="portal.article && portal.article.coverImage"
                :src="portal.article.coverImage.url"
                class="card-cover"
                :alt="portal.title"
              >
              <div v-else class="card-cover-placeholder">
                <i class="fa fa-globe"></i>
              </div>
            </a>
            <div class="card-body-inner">
              <h5 class="card-portal-title">
                <a :href="portal.url" class="portal-title-link">{{ portal.title }}</a>
              </h5>
              <p class="card-portal-desc">{{ lstring(portal.article && portal.article.summary) }}</p>
            </div>
            <div class="card-footer-inner">
              <span v-if="portal.forumCount > 0" class="forum-count-badge">
                <i class="fa fa-comments me-1"></i>{{ portal.forumCount }} {{ t('forumsLabel') }}
              </span>
              <a v-if="isAdmin" :href="`${portal.url}/edit`" class="card-edit-link ms-auto">
                <i class="fa fa-pencil me-1"></i>{{ t('editButton') }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="forums-sidebar">
        <div class="sidebar-widget">
          <div class="widget-header">
            <i class="fa fa-bar-chart me-2"></i>{{ t('statsTitle') }}
          </div>
          <div class="widget-body">
            <div class="stat-row">
              <span class="stat-label">{{ t('statsPortals') }}</span>
              <span class="stat-value">{{ portals.length }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">{{ t('statsForums') }}</span>
              <span class="stat-value">{{ totalForums }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">{{ t('statsActive') }}</span>
              <span class="stat-value accent">{{ portals.length }}</span>
            </div>
          </div>
        </div>

        <div class="sidebar-widget">
          <div class="widget-header">
            <i class="fa fa-tags me-2"></i>{{ t('browseLabel') }}
          </div>
          <div class="widget-body tag-cloud">
            <a
              v-for="portal in portals"
              :key="portal._id"
              :href="portal.url"
              class="tag-chip"
            >{{ portal.title }}</a>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue'
// @ts-expect-error importing js file
import { lstring } from '~/components/kb/filters'
// @ts-expect-error importing js file
import { mapObjectId, isObjectId } from '~/api/api-base.js'
// @ts-expect-error importing js file
import ArticlesApi from '../../components/kb/article-api'
// @ts-expect-error importing js file
import PortalsApi from '~/api/portals'
// @ts-expect-error importing js file
import { useAuth } from '@scbd/angular-vue/src/index.js'
// @ts-expect-error importing js file
import { useRealm } from '~/services/composables/realm.js'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
import loading from '~/components/common/loading.vue'
// @ts-expect-error importing js file
import serverError from '~/components/common/error.vue'
// @ts-expect-error importing js file
import CbdArticle from '~/components/common/cbd-article.vue';
import messages from '~/app-text/templates/bch/footer.json'
import forumMessages from '~/app-text/views/portals/forums.json'
import commonRoutesMessages from '~/app-text/routes/common-routes-labels.json'
import editPortalMessages from '~/app-text/views/portals/edit-portal.json'
import type { Portal, PortalMenu, Article } from '~/types/common/forums'

type PortalData = Portal & { forumCount: number }

const { realm } = useRealm()

const { locale, t, mergeLocaleMessage } = useI18n({ messages })

const translations = [forumMessages, commonRoutesMessages, editPortalMessages]
translations.forEach((value) => {
  Object.entries(value)
    .forEach(([key, value]) => mergeLocaleMessage(key, value))
})

const auth = useAuth()
const isAdmin = computed(() => auth.check?.(['Administrator']) ?? false)
const articlesApi = new ArticlesApi({ tokenReader: () => auth.token() })
const portalsApi = new PortalsApi()
const portals: Ref<PortalData[]> = ref([])
const articleAdminTags = ['bch', 'portals', 'home', 'introduction'];
const ag = [{ $match: { adminTags: { $all: articleAdminTags } } }];
const articleQuery = ref({ ag: JSON.stringify(ag) });

const PORTALS_URL = 'portals'

const isLoading = ref(false)
const error: Ref<Error | undefined> = ref()

function countForums(menus: PortalMenu[] | undefined): number {
  if (!menus) return 0
  return menus.reduce((n, m) => {
    const self = m.content?.forum?.forumId ? 1 : 0
    return n + self + countForums(m.menus)
  }, 0)
}

const totalForums = computed(() => portals.value.reduce((n, p) => n + p.forumCount, 0))

onMounted(async () => {

  try{
    isLoading.value = true

    const portalsData = await portalsApi.queryPortals({
        q: { realms: realm, $or : [{active: true}, {active: {$exists : false}}] },
        s: { sortOrder: 1 }
      })

    const articleOidQueries = portalsData
      .filter((portalSchema: Portal) => isObjectId(portalSchema._id))
      .map((portalSchema: Portal) => ({ $oid: mapObjectId(portalSchema.content.article.articleId) }))

    const articleFields = { _id: 1, title: 1, summary: 1, coverImage: 1 }
    const queryAg = [
      { $match: { _id: { $in: articleOidQueries } } },
      { $project: articleFields }
    ]

    const articles: Article[] = await articlesApi.queryArticles({ ag: JSON.stringify(queryAg) }, { cache: true })    

    isLoading.value = false

    portals.value = portalsData.map((p: PortalData) => {
      const portal = p
      const article: Article | undefined = articles
        .find((article: Article) => portal.content.article.articleId === article._id)
      if (article === undefined) { return portal }

      portal.article = article

      portal.title = lstring(portal.title, locale)

      portal.url = `${PORTALS_URL}/${encodeURIComponent(portal.slug)}`
      portal.forumCount = countForums(portal.menus);
      return portal
    })
    .filter((portal: Portal) => typeof portal.article === 'object')
  }
  catch(err: Error) {
    console.error(err) // eslint-disable-line no-console -- show error in console
    error.value = err
  }
  finally{
    isLoading.value = false
  }
})
</script>

<style scoped>
:root {
  --navy-900: #0b3b4d;
  --navy-800: #0e4f69;
  --orange: #e4572e;
  --card: #ffffff;
  --line: #dde4e8;
  --text-muted: #6c7a89;
}

.forums-root {
  --navy-900: #0b3b4d;
  --navy-800: #0e4f69;
  --orange: #e4572e;
  --card: #ffffff;
  --line: #dde4e8;
  --text-muted: #6c7a89;
}

/* Layout */
.forums-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 991px) {
  .forums-layout {
    grid-template-columns: 1fr;
  }
}

/* Admin ribbon */
.admin-ribbon {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--orange, #e4572e);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 0 0.375rem 0 0.375rem;
  letter-spacing: 0.04em;
  z-index: 2;
}

/* Grid */
.portals-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

@media (max-width: 767px) {
  .portals-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .portals-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.portal-card {
  background: var(--card, #fff);
  border: 1px solid var(--line, #dde4e8);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s, transform 0.2s;
  position: relative;
}

.portal-card:hover {
  box-shadow: 0 6px 20px rgba(11,59,77,0.12);
  transform: translateY(-2px);
}

.card-edit-link {
  font-size: 0.75rem;
  color: var(--navy-800, #0e4f69);
  text-decoration: none;
}

.card-edit-link:hover {
  text-decoration: underline;
}

.card-cover-link {
  display: block;
  flex-shrink: 0;
}

.card-cover {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}

.card-cover-placeholder {
  width: 100%;
  height: 160px;
  background: linear-gradient(135deg, var(--navy-900, #0b3b4d), var(--navy-800, #0e4f69));
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.35);
  font-size: 2.5rem;
}

.card-body-inner {
  padding: 0.9rem 1rem 0.5rem;
  flex: 1;
}

.card-portal-title {
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: var(--navy-900, #0b3b4d);
}

.portal-title-link {
  color: inherit;
  text-decoration: none;
}

.portal-title-link:hover {
  text-decoration: underline;
  color: var(--orange, #e4572e);
}

.card-portal-desc {
  font-size: 0.8rem;
  color: var(--text-muted, #6c7a89);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer-inner {
  padding: 0.55rem 1rem;
  border-top: 1px solid var(--line, #dde4e8);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: #fafbfc;
}

.status-label {
  font-size: 0.72rem;
  color: var(--text-muted, #6c7a89);
  font-weight: 500;
}

.forum-count-badge {
  margin-left: auto;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--navy-800, #0e4f69);
  background: #eef2f5;
  border-radius: 20px;
  padding: 0.1rem 0.5rem;
}

/* Status dot with pulse */
.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ccc;
  flex-shrink: 0;
}

.status-dot.active {
  background: #22c55e;
  box-shadow: 0 0 0 0 rgba(34,197,94,0.4);
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
  70%  { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
  100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
}

/* Sidebar */
.forums-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.sidebar-widget {
  background: #fff;
  border: 1px solid var(--line, #dde4e8);
  border-radius: 10px;
  overflow: hidden;
}

.widget-header {
  background: var(--navy-900, #0b3b4d);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.6rem 1rem;
}

.widget-body {
  padding: 0.85rem 1rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0;
  border-bottom: 1px solid var(--line, #dde4e8);
  font-size: 0.83rem;
}

.stat-row:last-child {
  border-bottom: none;
}

.stat-label {
  color: var(--text-muted, #6c7a89);
}

.stat-value {
  font-weight: 700;
  color: var(--navy-900, #0b3b4d);
}

.stat-value.accent {
  color: #22c55e;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag-chip {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  background: #eef2f5;
  border-radius: 20px;
  font-size: 0.75rem;
  color: var(--navy-900, #0b3b4d);
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
  font-weight: 500;
}

.tag-chip:hover {
  background: var(--navy-900, #0b3b4d);
  color: #fff;
}
</style>
