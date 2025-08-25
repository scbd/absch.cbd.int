<template>
  <div v-if="isRunning" class="jr_container" :id="`jr_step_${currentStep}`">
    <div class="jr_step">
      <!-- Title -->
      <h4 v-if="step.title" class="jr_title">{{ step.title }}</h4>

      <!-- Content -->
      <div v-if="step.content" class="jr_content" v-html="step.content"></div>
    </div>

    <!-- Buttons -->
    <div class="jr_buttons">
      <div class="jr_left_buttons">
        <a class="jr_button jr_skip bg-white" @click="finish">{{ config.close || 'Close' }}</a>
      </div>

      <div class="jr_right_buttons">
        <a
          class="jr_button jr_prev"
          :class="{ disabled: currentStep === 0 }"
          @click="prevStep"
        >
          {{ config.prev || 'Prev' }}
        </a>

        <a
          class="jr_button jr_next"
          v-if="isLastStep"
          @click="finish"
        >
          {{ config.finish || 'Finish' }}
        </a>

        <a
          class="jr_button jr_next"
          v-else
          @click="nextStep"
        >
          {{ config.next || 'Next' }}
        </a>
      </div>
    </div>
  </div>

  <!-- Overlay -->
  <div v-if="config.overlay && isRunning" class="jr_overlay"></div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
});

const isRunning = ref(false);
const currentStep = ref(0);

const step = computed(() => props.config.steps?.[currentStep.value] || {});
const isLastStep = computed(() => currentStep.value === props.config.steps?.length - 1);

function start() {
  isRunning.value = true;
  currentStep.value = 0;
  props.config.onStart?.();
}

function nextStep() {
  props.config.onStepChange?.(currentStep.value, step.value);
  if (!isLastStep.value) currentStep.value++;
}

function prevStep() {
  if (currentStep.value > 0) currentStep.value--;
}

function finish() {
  isRunning.value = false;
  props.config.onFinish?.();
}

// Expose API for parent
defineExpose({ start, finish, nextStep, prevStep });
</script>

<style scoped>
.jr_container {
  position: absolute;
  background: #fff;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  z-index: 1001;
}
.jr_overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
}
.jr_buttons {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
}
.jr_button {
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  background: #eee;
}
.jr_button.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
