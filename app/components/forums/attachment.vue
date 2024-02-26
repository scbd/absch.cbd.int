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
import i18n from '~/app-text/components/forums/edit-post.json';
import { encode as encodeHtml } from '~/services/html.js'

export default {
    name: 'Attachment',
    i18n: { messages: { en: i18n } },
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
            expiresOn: null
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

            if(this?.tooltip?._popper) // if tooltip visible
                this.tooltip.show();   // refresh display
        }
    },
    methods: {
        unlock,
        resetLock
    },
    beforeDestroy : resetLock,
    mounted() {

        const { locked, autoUnlock } = this;

        if(locked && autoUnlock)
            this.unlock();

        this.tooltip = new bootstrap.Tooltip(this.$refs.tooltip, {
            html:true,
            title: ()=>{ return this.tooltipMessageHtml; }
        });

    },
}

async function unlock($event) {

    let { attachment, locked, loading } = this;
    let { attachmentId } = attachment;

    if(!locked) return;
    if($event) $event.preventDefault();
    if(loading) return;

    this.resetLock();

    const delegate = pending(async ()=>{
        const forumsApi = new ForumsApi();
        const { url, expire } = await forumsApi.getAttachmentDirectUrl(attachmentId);

        this.directUrl = url;
        this.expiresOn = expire;

        if(expire) {
            const expiresOn = new Date(expire);
            const expiresMs = Math.max(expiresOn.getTime() - Date.now(), 0); // total ms
            
            if(expiresMs)
                this.timer = setTimeout(() => this.resetLock(), expiresMs);
        }

    }, 'loading');

    delegate.call(this);
}

function resetLock() {

    const { timer } = this;

    if(timer) clearTimeout(timer);

    this.timer = null;
    this.directUrl = null;
}

function sizeText() {

    const { size } = this.attachment;

    if(size<1024)       return this.$t('sizeB',  {size : size }); 
    if(size/1024 <1024) return this.$t('sizeKB', {size : (size/1024).toFixed(1)}); 

    return this.$t('sizeMB', {size : (size/1024/1024).toFixed(1)});
}
function tooltipMessageHtml() {

    const { isPublic, locked, loading } = this;

    if(isPublic) return '';
    if(loading)  return `<i class="fa fa-cog fa-spin"></i>${ encodeTextToHtml(this.$t('attachmentUnlocking')) }`;
    if(locked)   return `<i class="fa fa-lock"></i>${ encodeTextToHtml(this.$t('attachmentLocked')) }`;

    return `<i class="fa fa-check"></i>${ encodeTextToHtml(this.$t('attachmentUnlocked')) }`;
}

function encodeTextToHtml(text) {
    return encodeHtml(text).replace('/\n/g', "<br>\n");
}

</script>

<style scoped>

.deleted {
    text-decoration: line-through;
}

</style>