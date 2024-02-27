<template>
    <div id="innerPage" >
        <title>{{ $t("knowledgeBase") }}</title>
            <div class="mastHead text-center pt-4 mb-4"  v-bind:class="{'bg-abs': $realm.is('ABS'),'bg-bch': $realm.is('BCH')}">
                <div class="container">
                    <div class="row justify-content-md-center">
                        <div class="col col-md-8">
                            <a href="/kb"><h1 class="text-white">{{$realm.chShortName+ " "}}<span>{{ $t("knowledgeBase") }}</span></h1></a>
                              <div class="input-group mb-3">
                                <input v-on:keyup.enter="goToSearchArticles()" class="form-control"  type="text" v-model="search" placeholder="Search the Knowledge Base..." >
                                <button @click="goToSearchArticles()" class="btn btn-secondary" type="button" id="button-addon2"><i class="fa fa-search"></i></button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import i18n from '../../app-text/components/kb.json';
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
