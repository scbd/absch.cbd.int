<template>
  <div id="innerPage" class="card card-1-notrans bg-white innerPageContent mx-1 mx-lg-3 mt-3 mb-5">
    <!-- Header -->
    <div class="register-content-header" :class="headerClass">
      <div class="p-1">
        <div v-html="headerActions"></div>
        <div v-html="headerTitle"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="register-content-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  headerClass: { type: String, default: "bg-blue" },
  headerActions: { type: String, default: "" },
  headerTitle: { type: String, default: "" },
});
</script>
