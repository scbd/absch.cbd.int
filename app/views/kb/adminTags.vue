<template>
    <div class="knowledge-base">
        <auto-complete-search></auto-complete-search>
        <section class="categories">
            <div class="container">
                <article-tags :location="ngVue.location" :locale="ngVue.locale"></article-tags>
            </div>
        </section>
    </div>

</template>

<style>
    @import url('app/css/vue/kb/style.css');
</style>

<script>

    import articleTags from '../../components/kb/article-tags.vue';
    import AutoCompleteSearch from '../../components/kb/auto-complete-search.vue';

    export default {
        name:'kbAdminTags',
        components:{
            articleTags,
            AutoCompleteSearch
        },

        props:{
            tokenReader: { type: Function, required: false },
            ngVue:{}
        },
        data:  () => {
            return {

            }
        },
        watch: {
            tokenReader: function(tokenReader) {
                // if(tokenReader) addApiOptions({ tokenReader })
            }
        }
    }
</script>
