<template>
    <div class="forum-post p-3">
        <a v-if="!showLinkToSelf" :name="`${post.postId}`"></a>

        <div class="header mt-2 mb-2">

            <div class="user">
                <span class="username">{{ post.createdBy }} </span>
                <span class="organization">{{ post.createdByOrganization }} </span>
                <span class="text-muted" >#{{post.postId}}</span> 
            </div>

            <div class="post-info">
                <span class="date" :title="formatDateTime(post.createdOn)" @click="showFullDateTime = !showFullDateTime">{{ showFullDateTime ? formatDateTime(post.createdOn) : fromNow(post.createdOn)  }}</span>
                <span v-if="post.createdOn!=post.updatedOn" class="date" :title="`${formatDateTime(post.updatedOn)} by ${post.updatedBy}`" @click="showFullDateTime = !showFullDateTime"> <i class="fa fa-edit"></i> {{ showFullDateTime ? formatDateTime(post.updatedOn) : fromNow(post.updatedOn)  }}</span>
                <a v-if="showLinkToParent" :href="`#${post.parentId}`" @click="jumpToAnchor()" :title="`reply to #${post.parentId}`"><i class="fa fa-arrow-up"></i></a>
                <a v-if="showLinkToSelf" :href="`#${post.postId}`" @click="jumpToAnchor()"><i class="fa fa-arrow-down"></i></a>
            </div>

        </div>

        <p ref="body" class="body" v-html="post.htmlMessage"></p>

        <div class="attachments" v-if="post.attachmentCount">
            <h6 class="card-subtitle mb-2 text-muted">File(s)</h6>
            <ul class="list-unstyled">
                <li v-for="attachment in post.attachments" :key="attachment.attachmentId">
                    <a target="_blank" :href="`/api/v2014/discussions/attachments/${attachment.attachmentId}?stream`" class="card-link">
                        {{ attachment.name }}
                    </a>
                </li>
            </ul>
        </div>
        <div class="footer">
            <div class="replies">
                <button class="btn btn-light btn-sm" @click.prevent="toggleReplies()" v-if="post.replies">
                    <span v-if="post.replies == 1">{{ post.replies }} reply</span>
                    <span v-if="post.replies > 1">{{ post.replies }} replies</span>
                    <i class="fa" :class="{ 'fa-caret-up' : !!posts, 'fa-caret-down' : !posts }"></i>
                </button>
            </div>
            <div class="action">
                <div v-if="canEdit" class="btn-group">
                    <button type="button" class="btn btn-light btn-sm" @click.prevent="edit = { postId: post.postId }">
                        <i class="fa fa-edit"></i> Edit
                    </button>
                    <button type="button" class="btn btn-light btn-sm dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" @click.prevent="edit = { postId: post.postId }">
                            <i class="fa fa-edit"></i> Edit</a>
                        </li>
                        <li v-if="canDelete && !post.replies"><hr class="dropdown-divider"></li>
                        <li v-if="canDelete && !post.replies"><a class="dropdown-item text-danger" href="#" @click.prevent="deletePost()">
                            <i class="fa fa-times"></i> Delete</a>
                        </li>
                    </ul>
                </div>



                <div class="dropdown d-inline-block" >
                    <button class="btn btn-primary btn-sm dropdown-toggle" :disabled="!loggedIn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa fa-reply"></i> 
                        Reply
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" @click.prevent="edit = { parentId: post.threadId, quote: getSelection() }"> <i class="fa fa-reply"></i> Reply to the main topic</a></li>
                        <li><a class="dropdown-item" href="#" @click.prevent="edit = { parentId: post.postId,   quote: getSelection() }"> <i class="fa fa-reply-all"></i> Reply to {{post.createdBy}}</a></li>
                    </ul>
                </div>              
          </div>
        </div>

        <edit-post v-if="edit" v-bind="edit" @close="edit=false; refresh()"></edit-post>

        <div v-if="posts" class="replies ms-4 mt-2">
            <post v-for="reply in posts" :key="reply.postId" :post="reply" @refresh="refresh()" />
        </div>
    </div>
</template>
    
<script>
import moment from 'moment';
import ForumsApi from '~/api/forums';
import jumpToAnchor from '~/services/jump-to-anchor.js';
import EditPost from './edit-post.vue';
import rangy from 'rangy';
import { convert as htmlToText } from 'html-to-text';


export default {
    name: 'Post',
    components: { EditPost },
    props: {
        post: Object,
    },
    emits: ['refresh'],
    data() {
        return {
            posts: this?.post?.posts || null,
            showFullDateTime: false,
            edit: false
        }
    },
    computed: {
        showLinkToParent() {
            const { parentId : postParentId } = this.post;
            const { postId   : parentPostId } = this.$parent.post || this.$parent.thread || {};

            return parentPostId && parentPostId != postParentId;
        },
        showLinkToSelf() {
            const { parentId : postParentId } = this.post;
            const { postId   : parentPostId } = this.$parent.post || {};

            return parentPostId && parentPostId == postParentId;
        },
        loggedIn()   { return this.$auth.loggedIn; },
        canPost()    { return this?.post?.security?.canPost    || false; },
        canEdit()    { return this?.post?.security?.canEdit    || false; },
        canDelete()  { return this?.post?.security?.canDelete  || false; },
        canApprove() { return this?.post?.security?.canApprove || false; },
    },
    methods: {
        toggleReplies,
        jumpToAnchor() { this.$nextTick(jumpToAnchor)},
        fromNow(datetime) { return moment(datetime).fromNow(); },
        formatDateTime(datetime) { return moment(datetime).format('D MMM YYYY HH:mm'); },
        refresh,
        deletePost,
        getSelection() { 

            // get the selection
            var sel = rangy.getSelection();
            
            if (!sel.toString())
                return "";

            const ranges = sel.getAllRanges();

            // create range for element, where selection is allowed

            const cutRange = rangy.createRange();  
            cutRange.selectNode(this.$refs.body);

            // make an array of intersections of current selection ranges and the cutRange
            const goodRanges = [];

            ranges.map(r=>cutRange.intersection(r))
                  .filter(r=>r)
                  .forEach(r=>goodRanges.push(r));

            sel.setRanges(goodRanges);            

            const html = sel.toHtml();
            const text = htmlToText(html);

            return text;
        },
    }
}

async function deletePost() {


    const { post } = this;
    const { postId, createdBy } = post;

    const msg = `You are about to delete message #${postId} from ${createdBy}.\n\nAre you sure you want to continue?`;

    if(!confirm(msg)) return;

    const forumsApi = new ForumsApi();

    await forumsApi.deletePost(postId);

    this.refresh();
}

async function toggleReplies() {

    if(this.posts) {
        this.posts = null;
        return;
    }

    const { post } = this;
    const { postId } = post;
    const forumsApi = new ForumsApi();

    const posts = await forumsApi.getPosts(postId);

    this.posts = posts;
}

function refresh() {

    if(this.posts) {
        this.toggleReplies();
        this.toggleReplies();
    }

    this.$emit('refresh');
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