<template>
    <div class="knowledge-base">
        <search></search>
        <section class="categories">
            <div class="container p-0">
                <div class="row">
                    <div class="col-lg-8">
                        <faqs></faqs>
                    </div>
                    <div class="col-lg-4">
                        <side-bar></side-bar>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>

    import Faqs from '../../components/kb/faqs.vue';
    import sideBar from '../../components/kb/right-side-bar.vue';
    import search from '../../components/kb/search.vue';

</script>
