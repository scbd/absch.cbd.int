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
                <a class="link-dark fs-6" :href="`${articleUrl(article)}`">{{lstring(article.title, locale)}}</a>
            </li>
        </ul>
        <div v-if="articles.length<1 && !loading" class="alert alert-light">
            <strong>{{ t("noResultFound") }}</strong>
        </div>
    </div>
  </template>
  
<script setup>
    import { ref, onMounted } from "vue";
    import ArticlesApi from "./article-api";
    import { getUrl, shuffleArray } from '../../services/composables/articles.js';
    import { lstring } from "./filters";
    import { useRealm } from '../../services/composables/realm.js';
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/kb.json';
    const { t, locale } = useI18n({ messages });
    const realm = useRealm();

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
    const articlesApi = new ArticlesApi();

    onMounted(async () => {
    let ag = [];
    ag.push({"$match":{"$and":[{"adminTags": { $all : [realm.is('BCH') ? 'bch' : 'abs' ]}}]}});
        ag.push({"$match":{"$and":[{"adminTags":props.tag}]}});
        ag.push({"$project" : {[`title`]:1}});
        ag.push({"$limit" : 6});
        if(props.sort)
            ag.push({"$sort" : {"meta.modifiedOn":-1}});

        const query = {
            "ag" : JSON.stringify(ag)
        };
    try {
        const articlesList = await articlesApi.queryArticles(query);
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
        return getUrl(lstring(article.title), article._id, props.tag);
    };
 
</script>
