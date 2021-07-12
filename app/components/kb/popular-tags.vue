<template>
    <div class="widget fix widget_categories mt-2">
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> loading...</div>
        <span class="icon icon-folder"></span>
        <h4>Popular Tags</h4>
        <div v-if="!loading">
            <div class="tagcloud" v-for="tag in tags">
                <a href="#" class="btn btn-mini" @click="goToTag(tag.title)">{{tag.title}}</a>
            </div>
        </div>
    </div>
</template>

<script>

    import i18n from '../../locales/en/components/kb/categories-group';
    import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js';
    export default {
        props:{
            locale:String,
            location:String
        },
        data:  () => {
            return {
                tags: [],
                loading: true

            }
        },
        mounted() {
            let self = this;
            const qs= '{"title":1}&l=20&sk=0&s={"meta.updatedOn":-1}';
            return axios.get('/api/v2021/article-admin-tags?f='+qs).then(function (results) {
                if ((results || {}).data) {
                    self.tags =  results.data;
                    self.loading = false;
                }
            });
        },
        methods: {
            goToTag(tag){
                this.location.path("/kb/tags/"+tag);
            }
        },
        i18n: { messages:{ en: i18n }} //will be used for locales language
    }
</script>

