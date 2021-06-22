<template>
          <form style="text-align: left" v-on:submit.prevent="exportedData">
              <button  >
                <strong>  export Angular !</strong>
              </button>
              <slot/>
          </form>
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
				$('#resultTitle').tableExport({
					formats: ['xlsx'],
					filename: 'registry',
				});
				$('.xlsx').click();
				$('.xlsx').remove();
			});
		}
	},
}
</script> 
