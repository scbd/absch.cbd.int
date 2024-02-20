<template>
    <div class="d-flex justify-content-center text-center">
        <v-pagination v-if="recordCount>recordsPerPage" v-model="internalCurrentPage" 
        :per-page="recordsPerPage" :records="recordCount" @paginate="setPage()"></v-pagination>
    </div>
</template>

<script>
import 'vue-pagination-2';

export default {
    name:'kbPagination',
    components: { vPagination : window["Pagination"] },
    props:{
        recordCount     : Number,
        recordsPerPage  : Number,
        currentPage     : Number
    },
    computed : {
        internalCurrentPage : {
            get()  { return this.currentPage },
            set(p) { this.$emit('update:currentPage', p) }
        }
    },
    data() {
        return {            
        }
    },
    mounted() {
        // this.currentPage = this.currentPage || 1;
    },
    methods: {
        setPage(page) {            
            this.$emit('changePage', this.currentPage);
        }
    }
}
</script>
