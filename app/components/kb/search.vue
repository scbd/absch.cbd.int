<template>
    <div id="innerPage" >
        <title>{{ t("knowledgeBase") }}</title>
            <div class="mastHead text-center pt-4 mb-4"  v-bind:class="{'bg-abs': realm.is('ABS'),'bg-bch': realm.is('BCH'),'bg-chm': realm.is('CHM')}">>               
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

<script setup>
    import { ref } from 'vue';
    import "../kb/filters";
    import { useRealm } from '../../services/composables/realm.js';
    import {  useRoute, useRouter } from "@scbd/angular-vue/src/index.js";
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/kb.json';
    const { t } = useI18n({ messages });
    const realm = useRealm();
    const route = useRoute();
    const router = useRouter();
    const search = ref('');

    const emit = defineEmits(['changeSearch']);

    const  goToSearchArticles = function() {
                if (search.value) {
                    if (route.value?.params?.search) {
                        emit('changeSearch', search.value);
                    } else {
                        router.push({
                            path: `/kb/kbSearch/${encodeURIComponent( search.value )}`
                        });
                    }
                }
            }
</script>