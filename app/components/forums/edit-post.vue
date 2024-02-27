<template>
    <div ref="modal" class="modal fade" style="display: block;" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
                <span v-if="postId">{{ $t('titleEditPost') }}</span>
                <span v-else-if="parentId">{{ $t('titlePostReply') }}</span>
                <span v-else-if="forumId">{{ $t('titleCreateThread') }}</span>
                <i v-if="loading" class="fa fa-cog fa-spin"></i> 
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div v-if="post">

                <input v-if="forumId || postId" type="text" class="form-control mb-2"  v-model="subject" :placeholder="$t('placeholderSubject')">
                <h3 v-else>{{subject}}</h3>
                <div v-if="parent && parent.postId!=post.postId" class="mb-2">
                    <div v-if="parent.postId==parent.threadId">
                        <a href="#parentBody" data-bs-toggle="collapse"> {{ $t('inReplyToMainThread') }}</a>
                    </div>
                    <div v-else>
                        <a href="#parentBody" data-bs-toggle="collapse"> {{ $t('inReplyToPost', { name: parent.createdBy, postId: parent.postId }) }}</a>
                    </div>
                    <blockquote class="border-start border-4 p-2 collapse mt-2" id="parentBody" ref="parentBody" v-html="parent.htmlMessage"></blockquote>
                </div>

                <textarea ref="body" class="form-control mb-2" rows="10" v-model="message" :placeholder="$t('placeholderMessage')"></textarea> 

<!--                     
                <div ref="body" class="body p-2 border" 
                    contenteditable="true" 
                    v-html="post.htmlMessage" 
                    @blur="post.htmlMessage = $event.target.innerHTML"></div> -->
                

                <div class="attachments" v-if="forum.allowAttachments || attachments.length">
                    <h6 class="card-subtitle text-muted">{{ $t('attachments') }}</h6>

                    <div class="container">
                        <div class="row g-1">
                            <div class="col-12 col-md-6 col-lg-4" v-for="attachment in attachments" :key="attachment.attachmentId">

                                <div class=" p-1">
                                    <button class="btn btn-sm "  type="button"
                                    :class="{ 'btn-outline-danger' : !attachment.deletedBy, 'btn-outline-dark': attachment.deletedBy }"  
                                    @click="toggleDeleted(attachment.attachmentId)" 
                                    :title="attachment.deletedBy ? $t('buttonUndeleteAttachement') : $t('buttonDeleteAttachement')"
                                    >
                                        <i class="fa" :class="{ 'fa-times' : !attachment.deletedBy, 'fa-undo': attachment.deletedBy }"></i>
                                    </button>
                                    <attachment :attachment="attachment" :auto-unlock="true"/>
                                </div>
                            </div>

                            <div class="col-12" >
                                <div class=" p-1">
                                    <attachment-upload :forum-id="forum.forumId" @file="fileUploaded($event)"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="row w-100">
                <div class="col">
                </div>
                <div class="col-auto">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('buttonClose') }}</button>
                    <button type="button" :disabled="saving" class="btn btn-primary" @click="save()">
                        {{ $t('buttonSave') }} <i v-if="saving" class="fa fa-cog fa-spin"></i> 
                    </button>
                </div>
            </div>
        </div>
        </div>
    </div>
    </div>

</template>
    
<script>
import bootstrap from 'bootstrap'
import ForumsApi from '~/api/forums';
import pending   from '~/services/pending-call'
import Attachment from './attachment.vue';
import AttachmentUpload from './attachment-upload.vue';
import i18n from '../../app-text/components/forums/edit-post.json';

export default {
    name: 'EditPost',
    i18n: { messages: { en: i18n } },
    components: { AttachmentUpload, Attachment},
    emits: ['show', 'close'],
    props: {
        postId:   { type:  Number },
        parentId: { type:  Number },
        forumId:  { type:  Number },
        quote:    { type:  String },
    },
    data() {
        return {
            forum: null,
            parent: null,
            post: null,
            loading: false,
            saving: false
        }
    },
    computed: {
        subject: { get() { return this?.post?.subject }, set(value) { return this.post.subject = value } },
        message: { get() { return this?.post?.message }, set(value) { return this.post.message = value } },
        attachments: { get() { return this?.post?.attachments }, set(value) { return this.post.attachments = value } }
    },
    methods: {
        load: pending(load, function(on) { this.loading = on }),
        save: pending(save, function(on) { this.saving  = on }),
        close,
        fileUploaded,
        toggleDeleted,
        sizeText,
    },
    created() { this.ready = this.load() },
    async mounted() {

        const { postId, parentId } = this;
        const el = this.$refs.modal;
        const modal = bootstrap.Modal.getOrCreateInstance(el);

        el.addEventListener('shown.bs.modal',  ()=>this.$emit('show'));
        el.addEventListener('hidden.bs.modal', ()=>this.$emit('close', this.post));

        modal.show();

        this.modal = modal;

        await this.ready;

        if(!postId && parentId) { // Preview parent post
            this.$nextTick(()=>{
                const { parentBody } = this.$refs;
                const parentPostBodyPreview = bootstrap.Collapse.getOrCreateInstance(parentBody);
                parentPostBodyPreview.show();
            })
        }
    }
}

async function load() {

    const { postId, parentId, forumId, quote } = this;

    const forumsApi = new ForumsApi();
    this.forumsApi = forumsApi;

    if(postId) { 
        const post   = await forumsApi.getPost(postId);
        const parent = await forumsApi.getPost(post.parentId);
        const forum  = await forumsApi.getForum(post.forumId);

        this.forum  = forum;
        this.parent = parent;
        this.post   = post;
    }
    else if(parentId) { 
        const parent = await forumsApi.getPost(parentId);
        const forum  = await forumsApi.getForum(parent.forumId);

        this.forum  = forum;
        this.parent = parent;
        this.post   = { 
            postId: null, 
            parentId : parent.postId,
            forumId  : parent.forumId,
            subject  : parent.subject,
            message  : quote ? `> ${quote}`.replace(/\n/g, '\n> ') : '',
            attachments: []
        };
    }
    else if(forumId) { 
        const forum = await forumsApi.getForum(forumId);

        this.forum  = forum;
        this.parent = null;
        this.post   = { 
            postId: null, 
            parentId : null,
            forumId  : forum.forumId,
            subject  : '',
            message  : '',
            attachments: []
        };
    }
    else throw new Error("Unsupported control path");
}

async function save() {

    const { forumsApi, postId, parentId, forumId, subject, message, attachments } = this;

    const data = {
        subject, 
        message,
        attachments
    };

    if(postId) { 
        this.post = await forumsApi.updatePost(postId, data);
    }
    else if(parentId) { 
        this.post = await forumsApi.createPost(parentId, data);
    }
    else if(forumId) { 
        this.post = await forumsApi.createThread(forumId, data);
    }
    else throw new Error("Unsupported control path");

    this.close(true);
}

function toggleDeleted(attachmentId) {

    const { attachments, $auth }  = this;
    const index = attachments.findIndex(a=>a.attachmentId == attachmentId);

    if(index<0) return;

    var attachment = attachments[index];

    if(attachment.deletedBy) attachment = { ...attachment, deletedBy : null };
    else                     attachment = { ...attachment, deletedBy : $auth.user.name || 'me' };

    attachments[index] = attachment;

    this.attachments = [...attachments]; //Force refresh
}

function sizeText(size) {

    if(size<1024)       return `${size} B` 
    if(size/1024 <1024) return `${(size/1024).toFixed(1)} kB` 
    
    return `${(size/1024/1024).toFixed(1)} MB` 
}

function fileUploaded(attachmentInfo) {
    this.attachments.push(attachmentInfo);
}

function close() {
    const { modal } = this;
    modal.hide();
}



</script>

<style scoped>

blockquote {
    max-height: 200px;
    overflow-y: scroll;
}

</style>