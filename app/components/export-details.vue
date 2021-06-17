<template>
     <div class="searchfield bg-hed-six">
        <div class="container" style="padding-top: 20px; padding-bottom: 20px;">
          <form style="text-align: left" v-on:submit.prevent="exportedData">
            <div class="form-group clear">
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
        </div>
    </div>
</template>

<script>
export default {
    data:  () => {
        return {            
        }
    },
	methods: {
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
}
</script> 
