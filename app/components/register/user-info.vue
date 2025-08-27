<template>
        <a class="text-decoration-none" :href="`mailto:${user.email}`">
            <strong>{{ user.firstName }} {{ user.lastName }}</strong>
        </a>
</template>

<script setup>

    const props = defineProps({
        user: {
            type: Object,
            required: true,
            validator: (u) =>
            typeof u.userID === "number" &&
            typeof u.firstName === "string" &&
            typeof u.lastName === "string" &&
            typeof u.email === "string"
        }
    })

</script>
