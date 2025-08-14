<template>
    <div>
        <slot name="title">
            <h4>
            {{ t("relevantArticles") }}
                <hr/>
            </h4>
        </slot>
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ t("loading") }}...</div>
        <ul>
            <li v-for="article in articles" class="mb-1">
                <a class="link-dark fs-6" :href="`${articleUrl(article)}`">{{article.title}}</a>
            </li>
        </ul>
        <div v-if="articles.length<1 && !loading" class="alert alert-light">
            <strong>{{ t("noResultFound") }}</strong>
        </div>
    </div>
  </template>
  
<script setup>
    import { ref, onMounted } from "vue";
    import { getUrl, shuffleArray } from '../../services/composables/articles.js';
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/kb.json';
    import { getRealmArticleTag } from "../../services/composables/articles.js";
    import SolrApi from "~/api/solr.js";
    import { ARTICLES_REALM } from '~/services/filters/constant';
    
    const { t, locale } = useI18n({ messages });
    const articleRealmTag = getRealmArticleTag();
    const solrAPI = new SolrApi(); 

    const props = defineProps({
        tag: { type: String, required: false },
        type:{ type: String, required: false },
        sort: {
                type: Boolean,
                required: false,
                default: false
            }
    });

    const articles = ref([]);
    const loading = ref(true);
    

    onMounted( async () => {
        const localeKey = locale.value.toUpperCase();
        const query = `realm_ss:${ARTICLES_REALM} AND adminTags_ss:${props.tag} AND adminTags_ss:${articleRealmTag}`;
    try {
        const result = await solrAPI.query({
              query, 
              fields: [
                `title:title_${localeKey}_s`, 
                'id'
              ].join(','),
              rowsPerPage:6,
              ...(props.sort && { sort: 'createdDate_dt desc' }),
              start: 0,
            });

        const articlesList = result?.response?.docs || [];
        if ((articlesList || []).length) {
        if (props.sort) articles.value = articlesList;
        else articles.value = shuffleArray(articlesList);
        }
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
    });

    const articleUrl = (article) => {
        return getUrl(article.title, article.id, props.tag);
    };
 
</script>
