<template>
    <div class="knowledge-base">
        <auto-complete-search></auto-complete-search>
        <section class="categories">
            <div class="container">
                <div class="row">
                    <faqs></faqs>
                    <side-bar></side-bar>
                </div>
            </div>
        </section>
    </div>
</template>

<style>
    @import url('app/css/vue/kb/style.css');
</style>

<script>

    import Faqs from '../../components/kb/faqs.vue';
    import sideBar from '../../components/kb/side-bar.vue';
    import AutoCompleteSearch from '../../components/kb/auto-complete-search.vue';

    export default {
        name:'kbFaqs',
        components:{
            Faqs,
            sideBar,
            AutoCompleteSearch
        },

        props:{
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
