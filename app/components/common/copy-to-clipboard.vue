<template>
    <i class="bi bi-clipboard" @click="copy(source)" style="cursor: pointer;" v-if="source"></i>

    <div class="position-fixed bottom-0 top-0 end-0 p-3" style="z-index: 100000">
      <div ref="clipboardToast" class="toast hide align-items-center text-white bg-success  border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header float-end bg-success">
            <button type="button" class="btn-close float-end bg-success" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            <strong class="me-auto">{{t('clipboardSuccess')}}</strong>
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
        source : {type:String, required:true}
    })

    let toast = null;
    let clipboardToast = shallowRef(null);

    const { t } = useI18n({ messages });
    const { toClipboard } = useClipboard();


    const copy = async (source) => {
        let element = null;
        if(source instanceof HTMLElement)
            element = source;
        else
            element = document.getElementById(source);

        //if element is not found, just copy the source to clipboard
        if(element != null){
            if(element.innerText?.trim()!=''){
                await toClipboard(element.innerText);                
            }
        }
        else
            await toClipboard(source?.toString());

        toast.show();
    };

    onMounted(()=>{
      toast = new Toast(clipboardToast.value);
    })
</script>
