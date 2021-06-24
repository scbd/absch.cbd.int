<template>
    <a rel="noopener" :target="targert"  :href="url" @click="popup()"><i class="fa fa-code" aria-hidden="true"></i> Embed</a>        
</template>

<script>
export default {
    name:'embBtn',
    props: {
        url:String,
        target: String
    }, 
    data:  () => {
        return {            
        }
    },
	methods: {
        popup() {
            alert('hi its popup element '+this.url+'='+this.target);
        }
 	},
    mounted() {
        alert("called mounted button.");
    },
}
</script> 
