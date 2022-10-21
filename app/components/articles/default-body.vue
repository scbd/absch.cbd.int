<template>
    <div v-if="article.content" class="full-details ck ck-content ck-rounded-corners ck-blurred"
        v-html="$options.filters.lstring(article.content, locale)"></div>
</template>
    
<script>

export default {
    name: 'ArticleBody',
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
    
  
  