<template>
  <div>
    <template v-if="generating || cached || readyUrl || failedUrl">
      <div class="modal fade show d-block" tabindex="-1" role="dialog" aria-modal="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ failedUrl ? t('failedTitle') : cached ? t('cachedTitle') : readyUrl ? t('readyTitle') : t('title') }}
              </h5>
            </div>
            <div v-if="failedUrl" class="modal-body">
              <p>
                {{ t('failedMessage') }}
              </p>
              <p class="mb-0 text-muted">
                {{ t(`failedReason_${failedReason}`) }}
              </p>
            </div>
            <div v-else-if="cached" class="modal-body">
              <p class="mb-0">
                {{ t('cachedMessage') }}
              </p>
            </div>
            <div v-else-if="readyUrl" class="modal-body">
              <p>
                {{ t('readyMessage') }}
              </p>
              <a :href="readyUrl" target="_blank" rel="noopener" class="text-break" @click="emit('onClose')">{{ fullUrl }}</a>
            </div>
            <div v-else class="modal-body">
              <div class="d-flex align-items-center">
                <i class="fa fa-cog fa-spin fa-2x me-3" />
                <span>{{ t('message') }}</span>
              </div>
              <p v-if="slow" class="mt-3 mb-0 text-muted">
                {{ t('backgroundHint') }}
              </p>
            </div>
            <div v-if="failedUrl" class="modal-footer">
              <a class="btn btn-primary" :href="failedUrl" target="_blank" rel="noopener" @click="emit('onClose')">
                {{ t('openPdfPage') }}
              </a>
              <button type="button" class="btn btn-secondary" @click="emit('onClose')">
                {{ t('cancel') }}
              </button>
            </div>
            <div v-else-if="slow && !readyUrl && !cached" class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="emit('onBackground')">
                {{ t('background') }}
              </button>
            </div>
            <div v-else-if="readyUrl" class="modal-footer">
              <a class="btn btn-primary" :href="readyUrl" target="_blank" rel="noopener" @click="emit('onClose')">
                {{ t('openPdf') }}
              </a>
              <button type="button" class="btn btn-outline-secondary" @click="copyLink">
                <i class="fa" :class="copied ? 'fa-check' : 'fa-clipboard'" /> {{ copied ? t('copied') : t('copyLink') }}
              </button>
              <button type="button" class="btn btn-secondary" @click="emit('onClose')">
                {{ t('cancel') }}
              </button>
            </div>
            <div v-else-if="cached" class="modal-footer">
              <button type="button" class="btn btn-primary" @click="emit('onOpenCached')">
                {{ t('openNow') }}
              </button>
              <button type="button" class="btn btn-secondary" @click="emit('onGenerateFresh')">
                {{ t('generateFresh') }}
              </button>
              <button type="button" class="btn btn-link" @click="emit('onClose')">
                {{ t('cancel') }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" />
    </template>
    <button v-if="background" type="button" class="btn btn-primary shadow position-fixed bottom-0 end-0 m-3" style="z-index: 1060" @click="emit('onShow')">
      <i class="fa fa-spinner fa-spin me-2" />{{ t('preparingBackground') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
// @ts-expect-error importing js file
import { useClipboard } from '~/services/composables/clipboard.js'
import messages from '~/app-text/components/common/pdf-progress-dialog.json'

const props = defineProps({
  generating: { type: Boolean, default: false },
  cached: { type: Boolean, default: false },
  background: { type: Boolean, default: false },
  slow: { type: Boolean, default: false },
  readyUrl: { type: String, default: '' },
  failedUrl: { type: String, default: '' },
  failedReason: { type: String, default: 'generic' }
})

const emit = defineEmits(['onOpenCached', 'onGenerateFresh', 'onBackground', 'onShow', 'onClose'])

const { t } = useI18n({ messages })
const { toClipboard } = useClipboard()

const copied = ref(false)
const fullUrl = computed(() => new URL(props.readyUrl || '/', window.location.origin).href)

const copyLink = async () => {
  await toClipboard(fullUrl.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>
