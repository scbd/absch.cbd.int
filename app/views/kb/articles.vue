<template>
    <div class="knowledge-base">
        <section class="categories">
            <div class="container">
                <div class="row">
                    <article-details :locale="ngVue.locale"></article-details>
                </div>
            </div>
        </section>
    </div>

</template>

<style>
    @import url('app/css/vue/kb/style.css');
</style>

<script>

    import articleDetails from '../../components/kb/article-details.vue';
    import AutoCompleteSearch from '../../components/kb/auto-complete-search.vue';


    export default {
        name:'kbHome',
        components:{
            articleDetails,
            AutoCompleteSearch
        },

        props:{
            tokenReader: { type: Function, required: false },
            ngVue: {}
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
