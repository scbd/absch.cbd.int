<template>
    <span>
        <button @click="$refs.files.click()">Upload</button>
        <input ref="files" type="file" multiple @change="uploadFile($event)">
        
    </span>
</template>
    
<script>
import ForumsApi from '~/api/forums';


export default {
    name: 'AttachmentUpload',
    components: {  },
    props: {
    },
    emits: ['file'],
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
        uploadFile,
    }
}

async function uploadFile({ target }) {

    const forumsApi = new ForumsApi();

    const files = [ ...target.files ]; //convert to array;

    var qUploads = files.map(async(file)=>{
        const resFile = await forumsApi.uploadAttachment(file);
        this.$emit('file', resFile);
    });

    await Promise.all(qUploads);
}


</script>

<style scoped>

</style>