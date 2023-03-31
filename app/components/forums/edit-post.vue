<template>
    <div ref="modal" class="modal fade" style="display: block;" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
                Modal title
                <i v-if="loading" class="fa fa-cog fa-spin"></i> 
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div v-if="post">

                <input type="text" class="form-control mb-2"  v-model="subject">

                <textarea ref="body" class="form-control mb-2" rows="10" v-model="message"></textarea> 

<!--                     
                <div ref="body" class="body p-2 border" 
                    contenteditable="true" 
                    v-html="post.htmlMessage" 
                    @blur="post.htmlMessage = $event.target.innerHTML"></div> -->
                

                <div class="attachments" v-if="post.attachmentCount">
                    <h6 class="card-subtitle text-muted">File(s)</h6>
                    <ul class="list-unstyled">
                        <li v-for="attachment in post.attachments" :key="attachment.attachmentId">
                            <a :href="`/api/v2014/discussions/attachments/${attachment.attachmentId}`" class="card-link">
                                {{ attachment.filename }}
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
        <div class="modal-footer">
            <AttachmentUpload @file="fileUploaded($event)"></AttachmentUpload>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" :disabled="saving" class="btn btn-primary" @click="save()">
                Save <i v-if="saving" class="fa fa-cog fa-spin"></i> 
            </button>
        </div>
        </div>
    </div>
    </div>

</template>
    
<script>
import bootstrap from 'bootstrap'
import ForumsApi from '~/api/forums';
import pending   from '~/services/pending-call'
import AttachmentUpload from '~/components/forums/attachment-upload.vue';

export default {
    name: 'EditPost',
    components: { AttachmentUpload },
    emits: ['show', 'close'],
    props: {
        postId:   { type:  Number },
        parentId: { type:  Number },
        forumId:  { type:  Number },
        quote:    { type:  String },
    },
    data() {
        return {
            post: null,
            parent: null,
            loading: false,
            saving: false
        }
    },
    computed: {
        subject: { get() { return this?.post?.subject }, set(value) { return this.post.subject = value } },
        message: { get() { return this?.post?.message }, set(value) { return this.post.message = value } }
    },
    methods: {
        load: pending(load, function(on) { this.loading = on }),
        save: pending(save, function(on) { this.saving  = on }),
        close,
        fileUploaded,
    },
    created() { this.load() },
    mounted() {

        const el = this.$refs.modal
        const modal = bootstrap.Modal.getOrCreateInstance(el)

        el.addEventListener('shown.bs.modal',  ()=>this.$emit('show'));
        el.addEventListener('hidden.bs.modal', ()=>this.$emit('close', this.post));

        modal.show();

        this.modal = modal;
    }
}

async function load() {

    const { postId, parentId, forumId, quote } = this;

    const forumsApi = new ForumsApi();
    this.forumsApi = forumsApi;

    if(postId) { 
        const post   = await forumsApi.getPost(postId);
        const parent = await forumsApi.getPost(post.parentId);

        this.post = post;
        this.parent = parent;
    }
    else if(parentId) { 
        const parent = await forumsApi.getPost(parentId);

        this.parent = parent;
        this.post = { 
            postId: null, 
            parentId : parent.postId,
            forumId  : parent.forumId,
            subject  : parent.subject,
            message  : quote ? `> ${quote}`.replace(/\n/g, '\n> ') : ''
        };
    }
    else if(forumId) { 
        const forum = await forumsApi.getForum(forumId);

        this.post = { 
            postId: null, 
            parentId : null,
            forumId  : forum.forumId,
            subject  : '',
            message  : ''
        };
        this.parent = null;
    }
    else throw new Error("Unsupported control path");
}

async function save() {

    const { forumsApi, postId, parentId, forumId, subject, message } = this;

    const data = {
        subject, 
        message
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

function fileUploaded(attachmentInfo) {

    console.log(attachmentInfo)
    this.post.attachments.push(attachmentInfo);
}

function close() {
    const { modal } = this;
    modal.hide();
}

</script>

<style scoped>



</style>