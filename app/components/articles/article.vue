<template>
    <div>
        <slot name="header" v-if="showHeader"  :article="article" :locale="locale">
            <default-header v-if="article.title" :article="article" :locale="locale"></default-header>
        </slot>

        <slot name="summary" v-if="showSummary" :article="article" :locale="locale">
            <default-summary v-if="article.summary" :article="article" :locale="locale"></default-summary>
        </slot>

        <slot name="body" v-if="showContent" :article="article" :locale="locale">
            <default-body v-if="article.summary" :article="article" :locale="locale"></default-body>
        </slot>

        <slot name="footer" v-if="showFooter" :article="article" :locale="locale">
        </slot>
    </div>
</template>
    
<script>

import DefaultHeader from './default-header.vue'
import DefaultSummary from './default-summary.vue'
import DefaultBody from './default-body.vue'

export default {
    name: 'Article',
    components: {
        DefaultHeader,
        DefaultSummary,
        DefaultBody
    },
    props: {
        article: {
            type: Object,
            required: true
        },
        locale: {
            type: String,
            default() { return this.$locale }
        },
        showHeader: {
            type: Boolean,
            default : true
        },
        showSummary: {
            type: Boolean,
            default : false
        },
        showContent: {
            type: Boolean,
            default : true
        },
        showFooter: {
            type: Boolean,
            default : true
        },
    },
}
</script>
    
  
  