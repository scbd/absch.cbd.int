<template>
    <i class="bi bi-clipboard" @click="copy(clipboardId)" style="cursor: pointer;" v-if="clipboardId"></i>

    <div class="position-fixed bottom-0 top-0 end-0 p-3" style="z-index: 100000">
      <div ref="clipboardToast" class="toast hide align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">{{t('clipboardSuccess')}}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
</template>

<script setup>
    import { Toast } from "bootstrap";
    import { onMounted, shallowRef } from "vue";
    import { useI18n } from 'vue-i18n';
    import messages from '~/app-text/components/common/copy-to-clipboard.json';
    import { useClipboard } from '~/services/composables/clipboard.js'


    const props = defineProps({
        clipboardId : {type:String, required:true}
    })

    let toast = null;
    let clipboardToast = shallowRef(null);

    const { t } = useI18n({ messages });
    const { toClipboard } = useClipboard()


    const copy = async (id) => {
        const element = document.getElementById(id);
        if(element.innerText?.trim()!=''){
            await toClipboard(element.innerText)
            toast.show();
        }
    };

    onMounted(()=>{
      toast = new Toast(clipboardToast.value);
    })
</script>
