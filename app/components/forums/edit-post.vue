<template>

    <div ref="modal" class="modal fade" style="display: block;" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div v-if="post" class="forum-post p-3">

                <div class="header mt-2 mb-2">

                    <!-- <div class="user">
                        <span class="username">{{ post.createdBy }} </span>
                        <span class="organization">{{ post.createdByOrganization }} </span>
                    </div>

                    <div class="post-info">
                        <span class="date" :title="formatDateTime(post.createdOn)" @click="showFullDateTime = !showFullDateTime">{{ showFullDateTime ? formatDateTime(post.createdOn) : fromNow(post.createdOn)  }}</span>
                        <a v-if="showLinkToParent" :href="`#${post.parentId}`" @click="jumpToAnchor()"><i class="fa fa-arrow-up"></i></a>
                        <a v-if="showLinkToSelf" :href="`#${post.postId}`" @click="jumpToAnchor()"><i class="fa fa-arrow-down"></i></a>
                    </div> -->

                </div>

                <div ref="body" class="body p-2 border" 
                    contenteditable="true" 
                    v-html="post.htmlMessage" 
                    @blur="post.htmlMessage = $event.target.innerHTML"></div>

                <div class="attachments" v-if="post.attachmentCount">
                    <h6 class="card-subtitle mb-2 text-muted">File(s)</h6>
                    <ul class="list-unstyled">
                        <li v-for="attachment in post.attachments" :key="attachment.attachmentId">
                            <a :href="`/api/v2014/discussions/attachments/${attachment.attachmentId}`" class="card-link">
                                {{ attachment.name }}
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="save()">Save</button>
        </div>
        </div>
    </div>
    </div>

</template>
    
<script>
import bootstrap from 'bootstrap'
import moment from 'moment';
import ForumsApi from '~/api/forums';
import jumpToAnchor from '~/services/jump-to-anchor.js';

export default {
    name: 'EditPost',
    components: {},
    emits: ['show', 'close'],
    props: {
        postId:   { type:  Number },
        parentId: { type:  Number },
        forumId:  { type:  Number },
        forumId:  { type:  Number },
    },
    data() {
        return {
            post: null,
            parent: null
        }
    },
    computed: {
    },
    methods: {
        load,
        save,
        close,
    },
    created : load,
    mounted() {

        const el = this.$refs.modal
        const modal = bootstrap.Modal.getOrCreateInstance(el)
        
        el.addEventListener('shown.bs.modal',  ()=>this.$emit('show'));
        el.addEventListener('hidden.bs.modal', ()=>this.$emit('close'));

        modal.show();

        this.modal = modal;
    }
}

async function load() {

    const { postId, parentId, forumId } = this;

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
            htmlMessage: '<p></p>'
        };
    }
    else if(forumId) { 
        const forum = await forumsApi.getForum(forumId);

        this.post = { 
            postId: null, 
            parentId : null,
            forumId  : forum.forumId,
            subject  : '',
            htmlMessage: '<p></p>'
        };
        this.parent = null;
    }
    else throw new Error("Unsupported control path");
}

async function save() {

    const { forumsApi, postId, parentId, forumId } = this;

    if(postId) { 
        const subject = this.post.subject;
        const message = this.post.htmlMessage;

        await forumsApi.updatePost(postId, { subject, message });
    }
    else if(parentId) { 
        const parent = await forumsApi.getPost(parentId);

        this.parent = parent;
        this.post = { 
            postId: null, 
            parentId : parent.postId,
            forumId  : parent.forumId,
            subject  : parent.subject,
            htmlMessage: '<p></p>'
        };
    }
    else if(forumId) { 
        const forum = await forumsApi.getForum(forumId);

        this.post = { 
            postId: null, 
            parentId : null,
            forumId  : forum.forumId,
            subject  : '',
            htmlMessage: '<p></p>'
        };
        this.parent = null;
    }
    else throw new Error("Unsupported control path");

    this.close();
}

function close() {
    const { modal } = this;
    modal.hide();
}

</script>

<style scoped>

.forum-post {
    border-top: solid 1px #c0c0c0;
}
.forum-post > .header {
    display: flex;
    flex-direction: row;
    align-content: center;
}
.forum-post > .header > .user {
    flex-grow: 1;
}
.forum-post > .header > .user > .username {
    font-weight: bold;
}

.forum-post > .header > .post-info {
    flex-grow: 0;
    white-space: nowrap;
}

.forum-post > .header > .post-info > .date {
    font-size: 90%;
}

.forum-post > .footer {
    display: flex;
    flex-direction: row;
    align-content: center;
}

.forum-post > .footer > .replies {
    flex-grow: 1;
}
.forum-post > .footer > .actions {
    flex-grow: 0;
}


.forum-post > .replies {
    border: solid 1px #c0c0c0;
    border-top: none;
}

</style>