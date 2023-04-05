<template>
    <span>
        <i class="fa fa-cog fa-spin"></i>
        {{  caption || '' }}
    </span>
</template>
    
<script>

export default {
    name: 'Loading',
    props: {
        caption:  { 
            type:  String, 
            default : null },
    },
}


</script>