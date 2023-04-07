<template>
    <span ref="tooltip" :class="{ deleted: deleted }" data-bs-toggle="tooltip" data-bs-placement="top">
        <loading v-if="loading" />
        <i v-if="!loading && !isPublic" class="fa" :class="{ 'fa-lock' : locked, 'fa-unlock': !locked }" aria-hidden="true"></i>
        <a :href="url" :class="{ disabled: loading }" target="_blank" class="card-link" @click="unlock($event)">
            {{ attachment.filename }}
        </a>
        - {{sizeText}}
    </span>
</template>
    
<script>
import ForumsApi from '~/api/forums';
import pending   from '~/services/pending-call'
import Loading   from '~/components/common/loading.vue'
import bootstrap from  'bootstrap';

export default {
    name: 'Attachment',
    components: {
        Loading
    },
    props: {
        attachment:  { type:  Object, required: true },
        autoUnlock:  { type:  Boolean, default: false },
    },
    data() { 
        return { 
            loading: false,
            directUrl: null,
        }
    },
    computed: {
        sizeText,
        tooltipMessageHtml,
        deleted() { 
            return !!this.attachment.deletedBy 
        },
        isPublic() {
            const { attachment } = this;
            const { isPublic } = attachment;
            return isPublic;
        },
        locked() {
            const { isPublic, directUrl } = this;
            return !isPublic && !directUrl;
        },
        url() { 
            const { attachment, directUrl } = this;
            const { attachmentId } = attachment;
            return directUrl || `/api/v2014/discussions/attachments/${encodeURIComponent(attachmentId)}?stream`;
        },
    },
    watch: {
        tooltipMessageHtml(msg) {
            if(!this.$refs.tooltip) return;

            bootstrap.Tooltip.getOrCreateInstance(this.$refs.tooltip).show();
        }
    },
    methods: {
        unlock,
        
    },
    mounted() {

        const { locked, autoUnlock } = this;

        if(locked && autoUnlock)
            this.unlock();

        this.tooltip = new bootstrap.Tooltip(this.$refs.tooltip, {
            html:true,
            title: ()=>{ return this.tooltipMessageHtml; }
        });

    }
}

async function unlock($event) {

    let { attachment, locked, loading } = this;
    let { attachmentId } = attachment;

    if(!locked) return;
    if($event) $event.preventDefault();
    if(loading) return;

    const delegate = pending(async ()=>{
        const forumsApi = new ForumsApi();
        const { url, expire } = await forumsApi.getAttachmentDirectUrl(attachmentId);
        this.directUrl = url
    }, 'loading');

    delegate.call(this);
}

function sizeText() {

    const { size } = this.attachment;

    if(size<1024)       return `${size} B` 
    if(size/1024 <1024) return `${(size/1024).toFixed(1)} kB` 

    return `${(size/1024/1024).toFixed(1)} MB` 
}
function tooltipMessageHtml() {

    const { isPublic, locked, loading } = this;

    if(isPublic) return '';
    if(loading)  return '<i class="fa fa-cog fa-spin"></i>The attachment is unlocking. Please wait...';
    if(locked)   return '<i class="fa fa-lock"></i> Attachment is locked.<br>Please click the attachment file link to unlock...';

    return '<i class="fa fa-check"></i> Attachment is ready to download.<br>Please click the attachment to access the file.';
}

</script>

<style scoped>

.deleted {
    text-decoration: line-through;
}

</style>