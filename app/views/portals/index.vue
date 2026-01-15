<template>
  <div
    id="forums"
    class="px-5 py-4"
  >
    <h4 class="fs-4 mb-4 fw-bold">
      {{ t('portals') }}
    </h4>
    <loading
      v-if="isLoading"
      :caption="t('loading')"
    />
    <server-error
      v-else-if="typeof error === 'object'"
      :error="error"
    />
    <div
      v-else
      class="row"
    >
      <div
        v-for="portal in portals"
        :key="portal._id"
        class="col-md-4 mb-4"
      >
        <div
          class="card h-100 position-relative visited-background"
        >
          <a
            class="m-0 text-dark  stretched-link text-decoration-none card-title"
            :href="portal.url"
          />
          <img
            v-if="portal.article.coverImage"
            :src="portal.article.coverImage.url"
            class="card-img-top cover-image"
            :alt="lstring(portal.title)"
          >

          <div class="card-body">
            <h5
              v-if="portal.title"
              class="card-title"
            >
              {{ portal.title }}
            </h5>

            <div
              class="card-text article-text w-100 overflow-hidden"
            >
              {{ lstring(portal.article.summary) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
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
// @ts-expect-error importing js file
import loading from '~/components/common/loading.vue'
// @ts-expect-error importing js file
import serverError from '~/components/common/error.vue'
import messages from '~/app-text/templates/bch/footer.json'
import forumMessages from '~/app-text/views/portals/forums.json'
import commonRoutesMessages from '~/app-text/routes/common-routes-labels.json'
import type { Portal, Article } from '~/types/common/forums'

const { realm } = useRealm()

const { locale, t, mergeLocaleMessage } = useI18n({ messages })

const translations = [forumMessages, commonRoutesMessages]
translations.forEach((value) => {
  Object.entries(value)
    .forEach(([key, value]) => mergeLocaleMessage(key, value))
})

const auth = useAuth()
const articlesApi = new ArticlesApi({ tokenReader: () => auth.token() })
const portalsApi = new PortalsApi()
const portals: Ref<Portal[]> = ref([])

const PORTALS_URL = 'portals'

const isLoading = ref(false)
const error: Ref<Error | undefined> = ref()

onMounted(async () => {
  isLoading.value = true

  const portalsData = await portalsApi.queryPortals({ q: { realms: realm } })
    .catch((err: Error) => {
      console.error(err) // eslint-disable-line no-console -- show error in console
      error.value = err
      return []
    })

  const articleOidQueries = portalsData
    .filter((portalSchema: Portal) => isObjectId(portalSchema._id))
    .map((portalSchema: Portal) => ({ $oid: mapObjectId(portalSchema.content.article.articleId) }))

  const articleFields = { _id: 1, title: 1, summary: 1, coverImage: 1 }
  const query = [
    { $match: { _id: { $in: articleOidQueries } } },
    { $project: articleFields }
  ]

  const articles: Article[] = await articlesApi.queryArticles({ ag: JSON.stringify(query) }, { cache: true })
    .catch((err: Error) => {
      console.error(err) // eslint-disable-line no-console -- show error in console
      error.value = err
      return []
    })

  isLoading.value = false

  portals.value = portalsData.map((p: Portal) => {
    const portal = p
    const article: Article | undefined = articles
      .find((article: Article) => portal.content.article.articleId === article._id)
    if (article === undefined) { return portal }

    portal.article = article

    portal.title = lstring(portal.title, locale)

    portal.url = `${PORTALS_URL}/${encodeURIComponent(portal.slug)}`
    return portal
  })
  .filter((portal: Portal) => typeof portal.article === 'object')
})
</script>
<style scoped>
img.cover-image {
  height: 200px;
  object-fit: cover;
}
</style>

<style>
#forums div.article-text:nth-child(n) {
  display: -webkit-box !important;
  max-width: calc(100%);
  line-clamp: 10;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
