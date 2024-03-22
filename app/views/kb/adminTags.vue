<template>
    <div class="knowledge-base">
        <search></search>
        <section class="categories">
            <div class="container p-0">
                <article-by-tag></article-by-tag>
            </div>
        </section>
    </div>
</template>


<script setup>
	import articleByTag from '../../components/kb/articles-by-tag.vue';
	import search from '../../components/kb/search.vue';
</script>
