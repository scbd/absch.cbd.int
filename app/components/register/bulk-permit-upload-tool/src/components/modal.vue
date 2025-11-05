<template>
  <div
    ref="modalRef"
    class="modal fade"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-xl"
    >
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header">
            <h5
              id="staticBackdropLabel"
              class="modal-title"
            >
              {{ title }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </slot>
        </div>
        <div class="modal-body">
          <slot name="default" />
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <div class="row w-100">
              <div class="col" />
              <div class="col-auto">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  {{ $t("closeButton") }}
                </button>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { shallowRef, onMounted, watch } from 'vue'
import { Modal } from 'bootstrap'
const modalRef = shallowRef(null)
let modal = null

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  isShown: {
    type: Boolean,
    default: true,
  }
})

const show = () => {
  modal.show('static')
}

const close = () => {
  modal.hide()
}

watch(() => props.isShown, (newValue) => {
  if (newValue) { return show() }
  close()
})

onMounted(() => {
  modal = new Modal(modalRef.value)
  if (props.isShown) { show() }
})

defineExpose({ show, close })
</script>
