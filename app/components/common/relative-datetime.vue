<template>

    <span style="cursor: help" :title="`${absoluteTime} ${title||''}`" @click="showFullDateTime = !showFullDateTime">{{ showFullDateTime ? absoluteTime : relativeTime }}</span>
</template>
    
<script setup>
    import moment from 'moment';
    import { ref } from 'vue';
    const showFullDateTime = ref(false);

    const props = defineProps({
        date: { type: [String, Date] },
        title: { type: String, default: '' }
    });
    const showFullDateTimeComputed = computed({
        get: () => showFullDateTime.value,
        set: (newValue) => {
            showFullDateTime.value = newValue;
        }
    });

    const absoluteTime = computed(() => {
        return props.date ? moment(props.date).format('D MMM YYYY HH:mm') : '';
    });

    const relativeTime = computed(() => {
        return props.date ? moment(props.date).fromNow() : '';
    });

    // const showFullDateTime = computed(() => {
    //         get()  { return showFullDateTime.value; }, 
    //         set(v) { showFullDateTime.value = v; }
    // });


</script>
