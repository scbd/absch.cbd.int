<template>
    <a
        v-if="user"
        class="text-decoration-none"
        :href="`mailto:${user.email}`"
    >
        <strong>{{ user.firstName }} {{ user.lastName }}</strong>
    </a>
</template>

<script setup>

    const props = defineProps({
        user: {
            type: Object,
            required: true
        }
    })
    
</script>
