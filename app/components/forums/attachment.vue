<template>
    <span :class="{ deleted: deleted }">
        <a :href="url" target="_blank" class="card-link">
            {{ attachment.filename }}
        </a>
        - {{sizeText}}
    </span>
</template>
    
<script>
import ForumsApi from '~/api/forums';
import pending   from '~/services/pending-call'

export default {
    name: 'Attachment',
    props: {
        attachment:  { type:  Object, required: true },
    },
    data() { 
        return { 
            loading: false,
            directUrl: null,
        }
    },
    computed: {
        sizeText,
        deleted() { 
            return !!this.attachment.deletedBy 
        },
        url() { 
            const { directUrl, attachment } = this;
            return directUrl || `/api/v2014/discussions/attachments/${encodeURIComponent(attachment.attachmentId)}?stream`;
        },
    },
    methods: {
        initDownloadLink: pending(initDownloadLink, (on)=>this.loading=on)
    },
}

async function initDownloadLink() {

    throw Error("NotImplements")
}

function sizeText() {

    const { size } = this.attachment;

    if(size<1024)       return `${size} B` 
    if(size/1024 <1024) return `${(size/1024).toFixed(1)} kB` 
    
    return `${(size/1024/1024).toFixed(1)} MB` 
}

</script>

<style scoped>

.deleted {
    text-decoration: line-through;
}

</style>