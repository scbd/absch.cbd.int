<template>
<div>
    <div class="knowledge-base">
        <search></search>
        <section class="categories">
            <div class="container p-0">
                <div class="row">
                    <div class="col-lg-8">
                        <p class="fs-5">{{ t("the") }} <b>{{realm.chShortName+ " "}}<span class="text-capitalize">{{ t("knowledgeBase") }}</span></b> {{ t("kbParagraph")}}</p>
                        <categories-group></categories-group>
                    </div>
                    <div class="col-lg-4">
                        <side-bar></side-bar>
                    </div>
                </div>
            </div>
      </section>
  </div>
</div>
</template>

<script setup>

import CategoriesGroup from '../../components/kb/article-categories.vue';
import SideBar from '../../components/kb/right-side-bar.vue';
import Search from '../../components/kb/search.vue';

import { useRealm } from '~/services/composables/realm.js';
import { useI18n } from 'vue-i18n';
import messages from '../../app-text/components/kb.json';

const realm = useRealm();
const { t } = useI18n({ messages });

</script>

<script>
export default {
    name:'kbHome',
}
</script>
