<template>
  <div
    ref="modalRef"
    class="modal fade"
    aria-hidden="true"
    @click.self="close"
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
              @click="close"
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

<script setup>
// , type ShallowRef
import { shallowRef, onMounted, watch } from 'vue'
import { Modal } from 'bootstrap'
// const modalRef: ShallowRef<Element> = shallowRef(new Element())
let modalRef = shallowRef(null)

// type ModalType = {
//   show: Function,
//   hide: Function,
// }
// 
// let modal :ModalType = { show: () => {}, hide: () => {} } 
let modal = { show: () => {}, hide: () => {} } 

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  isShown: {
    type: Boolean,
    default: true,
  },
})

const $emit = defineEmits(['onClose'])

const show = () => {
  modal.show('static')
}

const close = () => {
  modal.hide()
  $emit('onClose')
}

watch(() => props.isShown, (newValue) => {
  if (newValue) { return show() }
  close()
})

onMounted(() => {
  const value = modalRef.value
  console.log(value)
  console.log('modal', props.isShown)

  modal = new Modal(value)
  console.log('ok')
  if (props.isShown) {
    console.log('show')
    show()
  }
})

defineExpose({ show, close })
</script>

<style>
</style>
