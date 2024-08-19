<template>
    <span>
        <button :disabled="disabled" class="btn btn-light" @click="refFiles.click()">
            <i class="fa fa-upload"></i>
            {{ t('buttonUploadDocuments') }}
        </button>
        <input v-if="!disabled" ref="refFiles" type="file" multiple @change="pending(uploadFile($event))" style="display:none">
    </span>
</template>
    
<script setup>
    import { defineEmits, ref } from 'vue';
    import ForumsApi from '~/api/forums';
    import pending   from '~/services/pending-call';
    import { useAuth } from "@scbd/angular-vue/src/index.js";
    import messages from '~/app-text/components/forums/edit-post.json';
    import { useI18n } from 'vue-i18n';

    const props = defineProps({
        forumId: {
            type:Number,
            required: true
        }
    });

    const emit = defineEmits(['file']);

    const { t } = useI18n({ messages });
    const auth = useAuth();

    const disabled = ref(false);
    const refFiles = ref(null);

    const forumsApi = new ForumsApi({tokenReader:()=>auth.token()});

    const uploadFile = async ({ target }) => {
        const files = [ ...target.files ]; //convert to array;

        var qUploads = files.map(async(file)=>{
            const resFile = await forumsApi.uploadAttachment(props.forumId, file);
            emit('file', resFile);
        });

        await Promise.all(qUploads);
    }

</script>