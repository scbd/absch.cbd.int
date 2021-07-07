<template>

    <div class="col-lg-12">
            <section class="categories">
                <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> loading...</div>
                <div class="categories-list mt-0 single">
                    <header>
                        <h2 >{{articles.title[locale]}}</h2>
                    </header>
                    <!--TODO:this section will be used for future-->
                    <!--                <ul class="meta">-->
                    <!--                    <li><span>Created :</span> Feb, 04, 2016</li>-->
                    <!--                    <li><span>Last Updated:</span> April, 15, 2016</li>-->
                    <!--                </ul>-->

                    <!--                <div class="col-xs-12 alert alert-info">-->
                    <!--                    <i class="fa fa-info-circle fa-3" aria-hidden="true"></i>-->
                    <!--                    <div>My message here. Lots of text for several lines! My message here. Lots of text for several lines! My message here. Lots of text for several lines! My message here. Lots of text for several lines!</div>-->
                    <!--                </div>-->
                    <div class="full-details" v-html="articles.content[locale]"></div>
                </div>
            </section>
            <button class="btn btn-primary pull-right" href="#" @click="back()">Back</button>

    </div>
</template>

<script>
    import i18n from '../../locales/en/components/kb/categories-group';
    import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js';
    export default {
        props:{
            ngVue: {}
        },
        data:  () => {
            return {
                articles: [],
                loading: true

            }
        },
        mounted() {
        	  this.locale = this.ngVue.locale;
            if(this.$root.route.params == undefined) return;
            let id =   JSON.stringify(this.$root.route.params.id).replace(/"/g, "");
            let self = this;
            return axios.get('/api/v2017/articles/'+id).then(function (results) {
                if ((results || {}).data) {
                    self.articles =  results.data;
                    self.loading = false;
                }
            });
        },
        methods: {
            back(){
                window.history.back();
            }
        },
        i18n: { messages:{ en: i18n }} //will be used for locales language
    }
</script>
