<template>
     <div class="searchfield bg-hed-six">
        <div class="container-fluid" style="padding-top: 20px; padding-bottom: 20px;">
          <form style="text-align: left" v-on:submit.prevent ="exportedData">
            <div class="form-group clear">
              <button type="button" @click="add_frame"><strong>Add Listing</strong></button>
              <button  >
                <strong>  export static !</strong>
              </button>
            </div>
            <table class="table" id="lmoExport">
              <thead>
              <tr>
                <th class="display-18">Record ID</th>
                <th class="display-17">Unique identification</th>
                <th class="display-18 hidden-xs">Identity & transformation event</th>
                <th class="display-17 hidden-xs">Organism</th>
                <th class="display-30 hidden-xs">Description</th>
              </tr>
              </thead>
              <tbody>
              <tr  >
                <td class="tableexport-string">
                  xxxxx
                </td>
                <td class="tableexport-string">xxxxx</td>
                <td class="tableexport-string hidden-xs">
                  xxxxx
                </td>
                <td class="tableexport-string hidden-xs">
                  xxxxx
                </td>
                <td class="tableexport-string truncate-description hidden-xs">
                  xxxxx
                </td>
              </tr>
              </tbody>
            </table>
          </form>
          <!--- embed frame --------->
          <div class="panel panel-success" v-show="toggle">
            <div class="panel-heading"><h3 class="panel-title">Cope and Paste this below code into your website</h3></div>
            <div class="panel-body">
              
              <h3>
                <code>
                  &lt;div data-pym-src="{{loc.url}}" id="scbdcontent" data-pym-allowfullscreen &gt;Loading...&lt;/div&gt;
                  &lt;script type="text/javascript" src="{{loc.js}}" async &gt;&lt;/script&gt; 
                </code>
              </h3>
            </div>
          </div>
          <div id="sampletest" v-show="toggle" v-bind:data-pym-src="loc.url"></div>
          <EmbedBtn  :url="loc.url" :target="loc.ele" />
          <div v-show="toggle"><EmbedExternal  :url="loc.url" :target="loc.ele" /></div>
        <!--- embed frame --------->
        </div>
    </div>
</template>

<script>
//-------------------------------------------------------- add template here
import EmbedExternal from './embed/emb-frame.vue';
import EmbedBtn from './embed/emb-button.vue';
import py from 'pym.js';
//--------------------------------------------------------
export default {
  components: {
    EmbedExternal, EmbedBtn    
  },
  data:  () => {
    return {   
      toggle: false,
      loc: {
        //ele : '#recordContent',
        ele: '.page-content',
        //url: 'http://localhost:2010/en/database/CDI/BCH-CDI-SCBD-255748-1',
        url: 'http://localhost:2010/en/search',
        //url: window.location.href,
        js : 'https://pym.nprapps.org/pym.v1.min.js'
      },    
      //element : 'test sample'          
    }
  },
	methods: {
    async add_frame(){
      this.toggle   = !this.toggle;
      //this.element  = '<b>new element added</b>';
    },
		async exportedData(){ 
			require(['tableexport'], function () {
				$('#lmoExport').tableExport({
					formats: ['xlsx'],
					filename: 'LMO-registry',
				});
				$('.xlsx').click();
				$('.xlsx').remove();
			});
		}
	},
  mounted() {
      if (document.getElementById('sampletest')) return; // was already loaded
      alert("script added");
      var scriptTag = document.createElement("script");
      scriptTag.src = this.loc.js;
      scriptTag.id = "scbdcontent";
      document.getElementsByTagName('head')[0].appendChild(scriptTag);
    }
}
</script> 
