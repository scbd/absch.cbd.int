<template>
  <div
    ref="modalRef"
    class="modal fade overflow-hidden pt-5 pb-5"
    :data-bs-backdrop="backdrop"
    aria-hidden="true"
    :data-bs-keyboard="isKeyboardClosable"
    @click.self="clickBackdrop"
  >
    <div
      class="modal-dialog"
      :class="`modal-${modalSize}`"
    >
      <div class="modal-content">
        <div
          class="modal-header"
          :class="headerClass"
        >
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
              @click="close"
            />
          </slot>
        </div>
        <div class="modal-body">
          <slot name="default" />
        </div>
        <div
          class="modal-footer"
          :class="footerClass"
        >
          <slot name="footer">
            <div class="row w-100">
              <div class="col" />
              <div class="col-auto">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  @click="close"
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

<script setup lang="ts">
import { shallowRef, onMounted } from 'vue'
// @ts-expect-error importing js file
import { Modal } from 'bootstrap'

let modal = { show: (value: string) => value, hide: () => undefined }
const modalRef = shallowRef(modal)

defineProps({
  title: {
    type: String,
    default: ''
  },
  modalSize: {
    type: String,
    default: 'xl'
  },
  headerClass: {
    type: String,
    default: ''
  },
  footerClass: {
    type: String,
    default: ''
  },
  backdrop: {
    type: String,
    default: 'default'
  },
  isKeyboardClosable: {
    type: Boolean,
    default: true
  }
})

const $emit = defineEmits(['onClose'])

const show = (): undefined => {
  modal.show('static')
}

const close = (): undefined => {
  modal.hide()
  $emit('onClose')
}

const clickBackdrop = (event: Event): undefined => {
  if (!(event.target instanceof HTMLElement)) { return }
  if (event.target.dataset['bsBackdrop'] === 'static') { return }
  close()
}

onMounted(() => {
  const { value } = modalRef

  modal = new Modal(value)
})

defineExpose({ show, close })
</script>
