<template>
<div class="home-page-records">
  <ul class="bs5 mx-lg-3 nav nav-pills">
    <li class="bs5 nav-item">
      <a class="bs5 nav-link active">Recently published</a>
    </li>
  </ul>
  <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
  <div class="bs5 row row-cols-1 row-cols-md-2 ">
  <div class="bs5 d-block row-cols-1 row-cols-md-1 ">
    <div class="bs5 col" v-for="record in recordList.slice(0,4)">
      <div class="bs5 position-relative new-css-callout new-css-callout-national shadow" v-bind:class="{ 'new-css-callout-reference': type == 'reference' }">
        <span class="bs5 badge position-absolute top-0 end-0">{{record.rec_date|formatDate('DD MMM YYYY')}}</span>
        <h4><a :href="recordUrl(record)" class="bs5 fw-bold text-dark text-decoration-none stretched-link cursor-pointer">{{record.rec_title}}</a></h4>
        <p class="new-css-summary-text" v-if="record.rec_summary">{{record.rec_summary}}</p>
        
        <div style="position:absolute;bottom:5px; width:95%">
          <a class="meta-links" :href="`/${$locale}/search?currentPage=1&schema=${encodeURIComponent(record.schema_s)}`"><span class="bs5 badge bg-light text-uppercase new-css-text-national new-css-rectype-national">{{record.schema_EN_t}}</span></a>
          <a class="meta-links" v-if="record.government_s" :href="`/${$locale}/countries/${encodeURIComponent(record.government_s)}`">
          <span class="bs5 badge bg-light text-uppercase new-css-text-national-country new-css-rectype-national">{{record.rec_countryName}}</span></a>
          <span class="bs5 bg-light text-uppercase badge text-dark new-css-rectype-national">{{record.uniqueIdentifier_s}}</span>
        </div>
      </div>
    </div>
  </div>  
   <div class="bs5 d-none d-lg-block row-cols-1 row-cols-md-1">
    <div class="bs5 col" v-for="record in recordList.slice(4,8)">
      <div class="bs5 position-relative new-css-callout new-css-callout-national shadow" v-bind:class="{ 'new-css-callout-reference': type == 'reference' }">
        <span class="bs5 badge position-absolute top-0 end-0">{{record.rec_date|formatDate('DD MMM YYYY')}}</span>
        <h4 class="fw-bold"><a :href="recordUrl(record)" class="bs5 text-dark text-decoration-none stretched-link cursor-pointer">{{record.rec_title}}</a></h4>
        <p class="bs5 fs-5 new-css-summary-text" v-if="record.rec_summary">{{record.rec_summary}}</p>
        
        <div class="new-css-records-sub-options">
          <a class="meta-links" :href="`/${$locale}/search?currentPage=1&schema=${encodeURIComponent(record.schema_s)}`"><span class="bs5 badge bg-light text-uppercase new-css-text-national new-css-rectype-national">{{record.schema_EN_t}}</span></a>
          <a class="meta-links" v-if="record.government_s" :href="`/${$locale}/countries/${encodeURIComponent(record.government_s)}`">
          <span class="bs5 badge bg-light text-uppercase new-css-text-national-country new-css-rectype-national">{{record.rec_countryName}}</span></a>
          <span class="bs5 bg-light text-uppercase badge text-dark new-css-rectype-national">{{record.uniqueIdentifier_s}}</span>
        </div>
      </div>
    </div>
  </div>  
  </div>

  <div class="bs5 text-end mt-4 new-css-down-margin">
    <a class="bs5 nav-link fs-4 text-muted text-uppercase cursor-pointer"  @click="seeMore()">See more 
      <i class="fa fa-arrow-right"></i> </a>
  </div>
</div>
</template>

<script>
    import ArticlesApi  from '../kb/article-api';
	  import i18n from '../../locales/en/components/export.json';
    import "../kb/filters";

	export default {
    props:{
        type:String,
        rows: Number
    },
		data:  () => {
			return {
                recordList: [],
                loading: true,
                sort: 'updatedDate_dt desc'
			}
		},
		created(){
			this.articlesApi = new ArticlesApi();
		},
    mounted() {
        this.records();
    },
    methods:{

      async records()
      {

          const query = {
              "fq": [
                  "{!tag=version}(*:* NOT version_s:*)",
                  "{!tag=schemaType}schemaType_s:"+this.type, 
                  "{!tag=contact}(*:* NOT schema_s:contact) OR (schema_s:contact AND (refReferenceRecords_ss:* OR refNationalRecords_ss:*))", 
                  "realm_ss:"+this.$realm.value],
              "q": "''",
              "sort": this.sort,
              "fl": "id, schema_EN_t, rec_date:updatedDate_dt, rec_creationDate:createdDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:summary_t, rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt",
              "wt": "json",
              "start": 0,
              "rows": this.rows
          };
          const responseList = await this.articlesApi.getRecords(query);
          if ((responseList?.response?.docs || []).length) {
              this.recordList = responseList?.response?.docs;
          }
          this.loading = false;
      },
      seeMore(){
           
           if(this.type == 'reference') 
              this.$router.push({path: '/search', query: { currentPage: '1', tab: 'referenceRecords' }});
           else this.$router.push({path: '/search', query: { currentPage: '1', tab: 'nationalRecords', group: 'government', group: 'schema' }});
      },
      recordUrl(record){
        const newUid = record.uniqueIdentifier_s.replace(/-(trg|dev)/i, '')
        const shortCode = encodeURIComponent(newUid.split('-')[1]).toUpperCase()
        const uid       = encodeURIComponent(record.uniqueIdentifier_s).toUpperCase()
        return `/${this.$locale}/database/${shortCode}/${uid}`;
      }
  },
		i18n: { messages:{ en: i18n }} 
	}
</script>
<style>
  .loading{text-align: center;
    margin: 100px auto;
  }
  .home-page-records .meta-links:hover{
    text-decoration: dotted;
    background: #eee;
  }
</style>
