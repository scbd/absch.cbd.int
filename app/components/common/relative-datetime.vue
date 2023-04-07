<template>

    <span style="cursor: help" :title="`${absoluteTime} ${title||''}`" @click="showFullDateTime = !showFullDateTime">{{ showFullDateTime ? absoluteTime : relativeTime }}</span>
</template>
    
<script>

import moment from 'moment';

const globalState = Vue.observable({
    showFullDateTime : false
})

export default {
    name: 'Loading',
    props: {
        date:  { type:  [String, Date] },
        title: { type:  String, default:'' }
    },

    computed: {
        showFullDateTime: {
            get()  { return globalState.showFullDateTime; }, 
            set(v) { globalState.showFullDateTime = v; }
        },
        absoluteTime() {
            const { date } = this;
            return date ? moment(date).format('D MMM YYYY HH:mm') : '';
        },
        relativeTime() {
            const { date } = this;
            return date ? moment(date).fromNow() : '';
        }
    }
}
</script>
