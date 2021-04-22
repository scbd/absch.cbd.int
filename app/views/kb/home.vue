<template>
    <div class="knowledge-base">
        <auto-complete-search></auto-complete-search>
        <div class="container featured-area-default padding-30">
            <div class="row">
                <div class="col-md-8 padding-20">
                    <categories-group></categories-group>
                </div>
                <div class="col-md-4 padding-20">
                    <right-menu></right-menu>        
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    @import url('app/css/vue/kb/style.css');
</style>

<script>

import CategoriesGroup from '../../components/kb/categories-group.vue';
import RightMenu from '../../components/kb/right-menu.vue';
import AutoCompleteSearch from '../../components/kb/auto-complete-search.vue';


export default {
    name:'kbHome',
    components:{
        CategoriesGroup,
        RightMenu,
        AutoCompleteSearch
    },
    props:{
        tokenReader: { type: Function, required: false },
    },
    data:  () => {
        return {            
        }
    },
    watch: { 
        tokenReader: function(tokenReader) {  
        // if(tokenReader) addApiOptions({ tokenReader }) 
        }
    }
}
</script> 