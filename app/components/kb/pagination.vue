<template>
<div v-if="totalPages>1">
<!--        <p>Current page: {{ currentPage }}</p>-->
        <v-pagination v-model="currentPage"
                      :page-count="totalPages"
                      :click="setPage()"
                      :classes="bootstrapPaginationClasses"
                      :labels="paginationAnchorTexts"></v-pagination>
</div>
</template>

<script>
    import vPagination from 'https://unpkg.com/vue-plain-pagination';

    export default {
        components: { vPagination },
        props:{
            tagCount: Number
        },
        data() {
            return {
                currentPage: 1,
                totalPages:0,
                bootstrapPaginationClasses: {
                    ul: 'pagination',
                    li: 'page-item',
                    liActive: 'active',
                    liDisable: 'disabled',
                    button: 'page-link'
                },
                paginationAnchorTexts: {
                    first: 'First',
                    prev: 'Previous',
                    next: 'Next',
                    last: 'Last'
                }
            }
        },
        mounted() {
            this.totalPages = Math.ceil(this.tagCount / 10);
        },
        methods: {
            setPage() {
                    if(this.currentPage>0) {
                       this.$emit('changePage', this.currentPage);
                    }
            }
        }
    }
</script>
