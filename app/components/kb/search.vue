<template>
    <div>
        <title>{{ $t("knowledgeBase") }}</title>
        <link href="css/kb-style.css" rel="stylesheet">
        <div  class="map-bg overlay">
            <div class="masthead text-center"  v-bind:class="{'bg-abs': $realm.is('ABS')}">
                <div class="container">
                    <div class="row justify-content-md-center">
                        <div class="col col-md-8">
                            <h1 class="fs-1 fw-bold">{{$realm.chShortName+ " "}}<span class="text-uppercase">{{ $t("knowledgeBase") }}</span></h1>

                              <div class="searchbar">
                                <input v-on:keyup.enter="goToSearchArticles()" class="search_input" type="text" v-model="search" placeholder="Search the knowledge base..." />
                                <a @click="goToSearchArticles()" class="search_icon cursor-pointer"><i class="fa fa-search"></i></a>
                              </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import i18n from '../../locales/en/components/kb.json';
export default {
    name: 'kbAutoCompleteSearch',
    data: () => {
        return {
            search: ''
        }
    },
    methods: {
        goToSearchArticles() {
            if (this.search) {
                if (this.$route.params.search) {
                    this.$emit('changeSearch', this.search);
                } else {
                    this.$router.push({
                        path: `/kb/kbSearch/${encodeURIComponent( this.search )}`
                    });
                }
            }
        },
    },
    i18n: {
        messages: {
            en: i18n
        }
    }
}
</script>
