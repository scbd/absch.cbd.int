<template>
    <span>
        <button :disabled="disabled" class="btn btn-light" @click="$refs.files.click()">
            <i class="fa fa-upload"></i>
            {{ $t('buttonUploadDocuments') }}
        </button>
        <input v-if="!disabled" ref="files" type="file" multiple @change="uploadFile($event)" style="display:none">
    </span>
</template>
    
<script>
import ForumsApi from '~/api/forums';
import pending   from '~/services/pending-call'
import i18n from '../../app-text/components/forums/edit-post.json';


export default {
    name: 'AttachmentUpload',
    i18n: { messages: { en: i18n } },
    components: {  },
    props: {
        forumId : { type:Number, required: true },
    },
    emits: ['file'],
    data() {
        return {
            disabled : false
        }
    },
    computed: {
    },
    methods: {
        uploadFile: pending(uploadFile, function(on) { this.disabled = on })
    }
}

async function uploadFile({ target }) {

    const forumsApi = new ForumsApi();
    const files = [ ...target.files ]; //convert to array;
    const { forumId } = this;

    var qUploads = files.map(async(file)=>{
        const resFile = await forumsApi.uploadAttachment(forumId, file);
        this.$emit('file', resFile);
    });

    await Promise.all(qUploads);
}

</script>

<style scoped>

</style>