<template>
    <div v-if="article.summary" class="article-summary">
        {{article.summary|lstring(locale)}}...
    </div>
</template>
    
<script>

export default {
    name: 'ArticleSummary',
    props: {
        article: {
            type: Object,
            required: true
        },
        locale: {
            type: String,
            default() { return this.$locale }
        }
    },
}
</script>
    
  
  