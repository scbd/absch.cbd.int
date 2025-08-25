<template>
    <div id="innerPage"class="card card-1-notrans bg-white mx-1 mx-lg-3 mt-3 mb-5">
        <!-- Header -->
        <div class="p-0 mb-1" :class="headerClass">
            <div class="d-flex align-items-center justify-content-between p-1 w-100">
                <!-- Slot for header title -->
                <slot name="header-title"></slot>

                <!-- Slot for right button group -->
                <slot name="right-buttons"></slot>
            </div>
        </div>
        <!-- Content -->
        <div class="register-content-content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script setup>

  const props = defineProps({
    headerClass: { type: String, default: "bg-primary" },
  });
  
</script>