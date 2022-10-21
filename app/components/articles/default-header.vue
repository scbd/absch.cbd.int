<template>
    <header>
        <h1>{{article.title|lstring(locale)}}</h1>
    </header>
</template>
    
<script>

export default {
    name: 'ArticleHeader',
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
    
  
  