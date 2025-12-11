<template>
  <div
    id="forums"
    class="px-5 py-4"
  >
    <h4 class="fs-4 mb-4 fw-bold">
      {{ t('forums') }}
    </h4>
    <div class="row">
      <div
        v-for="(article, index) in articles"
        :key="index"
        class="col-md-4 mb-4"
      >
        <div
          class="card h-100 position-relative visited-background"
        >
          <a
            class="m-0 text-dark  stretched-link text-decoration-none card-title"
            :href="article.url"
          />
          <img
            v-if="article.coverImage"
            :src="article.coverImage.url"
            class="card-img-top cover-image"
            alt="Article Cover"
          >

          <div class="card-body">
            <h5
              v-if="article.title"
              class="card-title"
            >
              {{ lstring(article.title, locale) }}
            </h5>

            <div
              class="card-text article-text w-100 overflow-hidden"
              v-html="article.content"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
// @ts-expect-error importing js file
import { lstring } from '~/components/kb/filters';
// @ts-expect-error importing js file
import { mapObjectId, isObjectId } from '~/api/api-base.js';
// @ts-expect-error importing js file
import ArticlesApi from '../../components/kb/article-api';
// @ts-expect-error importing js file
import PortalsApi from '~/api/portals'
// @ts-expect-error importing js file
import { useAuth } from '@scbd/angular-vue/src/index.js';
// @ts-expect-error importing js file
import { useRealm  } from '~/services/composables/realm.js';
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
// @ts-expect-error importing js file
import { sanitizeHtml } from '~/services/html.sanitize'
import messages from '~/app-text/templates/bch/footer.json'

const { realm } = useRealm()
const { locale, t } = useI18n({ messages })

type LocalizedValue = { en: string }
type PortalSchema = {
  _id: string
  title: LocalizedValue
  slug: string
  content: { article: { articleId: string } }
}
type Image = { position: string, size: string, url: string }

type Article = {
  _id: string
  coverImage: Image
  summary: LocalizedValue
  title: LocalizedValue
  content: LocalizedValue
  meta: { createdOn: string }
  adminTags?: string[]
  url?: string
}

const auth = useAuth();
const articlesApi = new ArticlesApi({tokenReader:()=>auth.token()});
const portalsApi = new PortalsApi();
const articles :Ref<Article[]> = ref([])

const PORTALS_URL = 'portals'

onMounted(async () => {
  // http://localhost:2030/api/v2023/portals?q={"realms": "realm"}
  const portals = await portalsApi.queryPortals({ q: { realms: realm } })

  const articleOidQueries = portals
    .filter((portalSchema: PortalSchema) => isObjectId(portalSchema['_id']))
    .map((portalSchema: PortalSchema) => ({ $oid: mapObjectId(portalSchema.content.article.articleId) }))

  const query = [{ $match: {_id: { $in: articleOidQueries } } }]

  const articleData = await articlesApi.queryArticles({ ag: JSON.stringify(query) })

  articles.value = articleData.map((article: Article) => {
    article.content = sanitizeHtml(lstring(article.content, locale))
    const portalSlug = portals
      .find((portalSchema: PortalSchema) => portalSchema.content.article.articleId === article._id)
      .slug

    article.url = `${PORTALS_URL}/${encodeURIComponent(portalSlug)}`
    return article
  })
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
