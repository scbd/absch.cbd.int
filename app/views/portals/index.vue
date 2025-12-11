<template>
  <div
    id="forums"
    class="px-5 py-4"
  >
    <h4 class="fs-4 mb-4 fw-bold">
      Forums
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


const { realm } = useRealm()

const { locale } = useI18n()

type ContentSchema = {
  article: { articleId: string }
}
type PortalSchema = {
  [key: string]: string | boolean | number | ContentSchema
}
type Image = { position: string, size: string, url: string }

type Article = {
  _id: string
  coverImage: Image
  summary: { en: string }
  title: { en: string }
  content: { en: string }
  meta: { createdOn: string }
  adminTags?: string[]
  url?: string
}
type URLS_LIST = {
  [key: string]: 'bch-iac' | 'capacity-building'
}

const auth = useAuth();
const articlesApi = new ArticlesApi({tokenReader:()=>auth.token()});
const portalsApi = new PortalsApi();
const articles :Ref<Article[]> = ref([])

// TODO: Set article adminTag values for the below bch portal articles in the database to avoid
// hard-coding these URLs.
const FORUM_URLS :URLS_LIST = {
  '64d54b6b8e4a59a51e799916': 'bch-iac', // Set article.adminTags = [portal:bch-iac] in the DB
  '6866bc79b7c31f956fd986b9': 'capacity-building' // Set article.adminTags = [portal:capacity-building] in the DB
}
const PORTAL_TAGS_STRING = 'portal:'
const PORTALS_URL = 'portals'

onMounted(async () => {
  // http://localhost:2030/api/v2023/portals?q={"realms": "realm"}
  const portals = await portalsApi.queryPortals({ q: { realms: realm } })

  const articleOidQueries = portals
    .filter((article: PortalSchema) => isObjectId(article['_id']))
    .map((portalSchema: PortalSchema) => ({ $oid: mapObjectId((portalSchema['content'] as ContentSchema).article.articleId) }))

  const query = [{ $match: {_id: { $in: articleOidQueries } } }]

  const articleData = await articlesApi.queryArticles({ ag: JSON.stringify(query) })

  articles.value = articleData.map((article: Article) => {
    article.content = sanitizeHtml(lstring(article.content, locale))
    if (!article.adminTags) {
      article.url = `${PORTALS_URL}/${FORUM_URLS[article._id]}`
      return article
    }

    const portalTag = (article.adminTags || [])
      .find(tag => tag.includes(PORTAL_TAGS_STRING)) || ''
    article.url = `${PORTALS_URL}/${portalTag.replace(PORTAL_TAGS_STRING, '')}`
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
