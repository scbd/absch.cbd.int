<template>
<div class="home-page-records">
  <h6 class="card-title ps-1">{{ t("recentlyPublished") }}</h6>
  <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ t("loading") }}...</div>
  <div class="row row-cols-1 " v-bind:class="{ 'row-cols-md-1': rows == 4, 'row-cols-md-2': rows == 8}">
  <div class="d-block row-cols-1 row-cols-md-1 p-0">
    <div class="col" v-for="record in recordList.slice(0,4)">
      <div class="position-relative record-callout record-callout-national shadow m-3 p-3 visited-background" v-bind:class="{ 'record-callout-reference': type == 'reference' }">
        <span class="badge position-absolute top-0 end-0 date-badge">{{formatDate(record.rec_date, 'DD MMM YYYY')}}</span>
        <span><a :href="recordUrl(record)" class="fw-bold text-secondary text-decoration-none stretched-link cursor-pointer">{{record.rec_title}}</a></span>
        <p class="record-summary-text"><span v-if="record.rec_summary">{{record.rec_summary}}</span></p>
        <div style="bottom:5px;" class="w-100 position-absolute">
          <a class="meta-links" :href="`search?currentPage=1&schema=${encodeURIComponent(record.schema_s)}`"><span class="badge text-uppercase float-start record-text-national">{{record.schema_EN_t}}</span></a>
          <a class="meta-links" v-if="record.government_s" :href="`countries/${encodeURIComponent(record.government_s)}`">
          <span class="badge text-uppercase record-text-national-country">{{record.rec_countryName}}</span></a>
          <span class="text-uppercase badge text-secondary">{{record.uniqueIdentifier_s}}</span>
        </div>
      </div>
    </div>
  </div>  


   <div class="d-none d-lg-block row-cols-1 row-cols-md-1 p-0">
    <div class="col" v-for="record in recordList.slice(4,8)">
      <div class="position-relative record-callout record-callout-national shadow m-3 p-3 visited-background" v-bind:class="{ 'record-callout-reference': type == 'reference' }">
        <span class="badge position-absolute top-0 end-0 date-badge">{{formatDate(record.rec_date, 'DD MMM YYYY')}}</span>
        <span><a :href="recordUrl(record)" class="fw-bold text-secondary text-decoration-none stretched-link cursor-pointer">{{record.rec_title}}</a></span>
        <p class="record-summary-text"><span v-if="record.rec_summary">{{record.rec_summary}}</span></p>
        
        <div class="country-records-sub-options">
          <a class="meta-links" :href="`search?currentPage=1&schema=${encodeURIComponent(record.schema_s)}`"><span class="badge text-uppercase float-start record-text-national">{{record.schema_EN_t}}</span></a>
          <a class="meta-links" v-if="record.government_s" :href="`countries/${encodeURIComponent(record.government_s)}`">
          <span class="badge text-uppercase record-text-national-country">{{record.rec_countryName}}</span></a>
          <span class="text-uppercase badge text-secondary">{{record.uniqueIdentifier_s}}</span>
        </div>
      </div>
    </div>
  </div>  
  </div>

  <div class="text-end mt-2 card-down-margin">
    <a class="nav-link fs-6 text-muted text-uppercase fw-bold cursor-pointer"  @click="seeMore()">{{ t("seeMore") }} 
      <i class="bi bi-arrow-right-short fw-bolder fs-3 lh-1 align-bottom"></i> </a>
  </div>
</div>
</template>
    
<script setup>
  import { ref, onMounted } from 'vue';
  import ArticlesApi  from '../kb/article-api';
  import "../kb/filters";
  import messages from '../../app-text/components/homepage-records.json';
  import { formatDate } from '~/components/kb/filters';
  import { useI18n } from 'vue-i18n';
  import { useRealm } from '../../services/composables/realm.js';
  import {  useRouter, useAuth } from "@scbd/angular-vue/src/index.js";
  const { t } = useI18n({ messages }); 
  const auth = useAuth();
  const router = useRouter();
  const realm = useRealm();

  const recordList = ref([]);
  const loading = ref(true);
  const sort = 'updatedDate_dt desc';

  const { type, rows } = defineProps ({
      type: { type: String, required: true },
      rows: { type: Number, required: false },
  })

  const articlesApi = new ArticlesApi({tokenReader:()=>auth.token()});
      
  onMounted(() => {
    records();
  });

  const records = async () => {
    const query = {
      "fq": [
        "{!tag=version}(*:* NOT version_s:*)",
        "{!tag=schemaType}schemaType_s:" + type,
        "{!tag=contact}(*:* NOT schema_s:contact)",
        "realm_ss:" + realm.value
      ],
      "q": "''",
      "sort": sort,
      "fl": "id, schema_EN_t, rec_date:updatedDate_dt, rec_creationDate:createdDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:summary_t, rec_type:type_EN_t",
      "wt": "json",
      "start": 0,
      "rows": rows
    };
    const responseList = await articlesApi.getRecords(query);
    if ((responseList?.response?.docs || []).length) {
            recordList.value = responseList?.response?.docs;
        }
    loading.value = false;
  }
  const seeMore = () => {
      if(type == 'reference') 
          router.push({path: 'search', query: { currentPage: '1', tab: 'referenceRecords' }});
      else router.push({path: 'search', query: { currentPage: '1', tab: 'nationalRecords', group: 'government', group: 'schema' }});
  };
  const recordUrl = (record) => {
      if(!record.uniqueIdentifier_s)
        return;
      const newUid = record.uniqueIdentifier_s.replace(/-(trg|dev)/i, '')
      const shortCode = encodeURIComponent(newUid.split('-')[1]).toUpperCase()
      const uid       = encodeURIComponent(record.uniqueIdentifier_s).toUpperCase()
      return `database/${shortCode}/${uid}`;
  }
</script>
    
<style scoped>
  .loading {
    text-align: center;
    margin: 100px auto;
  }
  .home-page-records .meta-links:hover{
    text-decoration: dotted;
    background: #eee;
  }
</style>