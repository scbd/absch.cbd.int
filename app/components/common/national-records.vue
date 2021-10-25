<template>
<div>
  <ul class="bs5 mx-lg-3 nav nav-pills">
    <li class="bs5 nav-item">
      <a class="bs5 nav-link" v-bind:class="{ active: sort == 'updatedDate_dt desc' }" aria-current="page" href="" @click="nationalSort()">Recently added</a>
    </li>
    <li class="bs5 nav-item">
      <a class="bs5 nav-link" v-bind:class="{ active: sort == 'createdDate_dt desc' }" href="" @click="nationalSort()">Recently updated</a>
    </li>
  </ul>
  <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
  <div class="bs5 row row-cols-1 row-cols-md-2 ">

    <div class="bs5 col" v-for="record in nationalRecords">
      <div class="bs5 position-relative new-css-callout new-css-callout-national shadow">
        <span class="bs5 badge position-absolute top-0 end-0">{{record.rec_date|dateFormat}}</span>
        <h4><a :href="record.url_ss" class="bs5 text-dark text-decoration-none stretched-link">{{record.rec_title}}</a></h4>
        <p class="new-css-summary-text" v-if="record.rec_summary">{{record.rec_summary}}</p>
        
        <div style="position:absolute;bottom:5px;">
          <span class="bs5 badge bg-light text-uppercase new-css-text-national new-css-rectype-national">{{record.schema_s}}</span>
          <span class="bs5 badge bg-light text-dark new-css-rectype-national"><i class="bs5 pe-1 flag-icon" v-bind:class="'flag-icon-'+record.government_s"></i> {{record.rec_countryName}}</span>
          <!-- <span class="bs5 bg-light text-uppercase badge text-dark new-css-rectype-national">{{record.uniqueIdentifier_s}}</span> -->
        </div>
      </div>
    </div>
  </div>

  <div class="bs5 text-end mt-4">
    <a class="bs5 nav-link fs-4 text-muted text-uppercase cursor-pointer"  @click="seeMore()">See more 
      <i class="fa fa-arrow-right"></i> </a>
  </div>
</div>
</template>

<script>
    import ArticlesApi  from '../kb/article-api';
	  import i18n from '../../locales/en/components/export.json';
    import {formatDateOnly} from "../kb/filters";

	export default {

		data:  () => {
			return {
                nationalRecords: [],
                loading: true,
                sort: 'updatedDate_dt desc'
			}
		},
		created(){
			this.articlesApi = new ArticlesApi();
		},
        filters: {
            dateFormat: function ( date ) {
                return formatDateOnly(date)
            }
        },
        mounted() {
            this.records();
        },
    methods:{

      nationalSort()
      {
          if (this.sort == "updatedDate_dt desc") {
              this.sort = "createdDate_dt desc"
          } else {
              this.sort = "updatedDate_dt desc"
          }
          this.loading = true;
          this.nationalRecords = [];
          this.records();
      },

      async records()
      {
          const query = {
              "fq": ["{!tag=version}(*:* NOT version_s:*)", "{!tag=schemaType}schemaType_s:national", "{!tag=contact}(*:* NOT schema_s:contact) OR (schema_s:contact AND (refReferenceRecords_ss:* OR refNationalRecords_ss:*))", "realm_ss:"+this.$realm.value],
              "q": "''",
              "sort": this.sort,
            "fl": "id, rec_date:updatedDate_dt, rec_creationDate:createdDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:summary_t, rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt",
              "wt": "json",
              "start": 0,
              "rows": 8,
              "facet": true,
              "facet.field": ["{!ex=schemaType}schemaType_s", "{!ex=schema,schemaType,schemaSub}schema_s", "{!ex=government}countryRegions_ss", "{!ex=keywords}all_terms_ss", "{!ex=region}countryRegions_REL_ss"]
          };
          const recordsList = await this.articlesApi.getRecords(query);
          console.log("recordsList",recordsList)
          if ((recordsList?.response?.docs || []).length) {
              this.nationalRecords = recordsList?.response?.docs;
          }
          this.loading = false;
      },
      seeMore(){
          this.$router.push({path: '/search', query: { currentPage: '1', tab: 'nationalRecords', group: 'government', group: 'schema' }});
      },
  },
		i18n: { messages:{ en: i18n }} 
	}
</script>
<style>
  .loading{text-align: center;
    margin: 100px auto;
  }
</style>
