<template>
    <span>
        <i class="fa fa-cog fa-spin"></i>
        {{  caption || '' }}
    </span>
</template>

<script setup lang="ts">
    const { caption } = defineProps({
        caption: {
        type: String,
        default : null
        }
    });
</script>
