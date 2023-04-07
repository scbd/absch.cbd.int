<template>
    <div class="forum-post" :class="highlightPostClasses(post.postId)">
        <a v-if="!showLinkToSelf" class="anchor-margin"  :name="`${post.postId}`"></a>

        <div class="header mt-2 mb-2">
            <div class="row">
                <div class="col align-self-center">
                    <div class="user">
                        <span class="username">{{ post.createdBy }} </span>
                        <span class="organization">{{ post.createdByOrganization }} </span>
                        <span class="text-muted" >#{{post.postId}}</span> 
                    </div>
                </div>
                <div class="col-auto align-self-center">
                    <div class="post-info">
                        <relative-datetime class="date" :date="post.createdOn"></relative-datetime>
                        <span v-if="post.createdOn!=post.updatedOn">
                            <i class="fa fa-edit"></i>
                            <relative-datetime class="date" :title="`| by ${post.updatedBy}`" :date="post.updatedOn"></relative-datetime>
                        </span>
                        <a v-if="showLinkToParent" :href="`#${post.parentId}`" @click="jumpToAnchor()" :title="`This is a reply to #${post.parentId}`"><i class="fa fa-arrow-up"></i></a>
                        <!-- <a v-if="showLinkToSelf" :href="`#${post.postId}`" @click="jumpToAnchor()"><i class="fa fa-arrow-down"></i></a> -->
                    </div>
                </div>
            </div>
        </div>

        <div ref="body" class="body mb-2" v-html="post.htmlMessage"></div>

        <div class="attachments" v-if="post.attachmentCount">
            <h6 class="card-subtitle mb-2 text-muted">Attachment(s)</h6>
            <ul class="list-unstyled">
                <li v-for="attachment in post.attachments" :key="attachment.attachmentId">
                    <attachment :attachment="attachment"/>
                </li>
            </ul>
        </div>
        <div class="footer">
            <div class="row">
                <div class="col align-self-center">

                    <slot name="showReplies" v-bind:replies="post.replies" v-bind:posts="posts">
                        <button class="btn btn-light btn-sm" @click.prevent="toggleReplies()" v-if="post.replies">
                            <span v-if="post.replies == 1">{{ post.replies }} reply</span>
                            <span v-if="post.replies > 1">{{ post.replies }} replies</span>
                            <i class="fa" :class="{ 'fa-caret-up' : !!posts, 'fa-caret-down' : !posts }"></i>
                        </button>
                    </slot>

                </div>
                <div class="col-auto align-self-center">
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

                    <button v-if="post.postId == post.threadId" class="btn btn-primary btn-sm" :disabled="!loggedIn || !canPost" type="button" 
                        @click="edit = { parentId: post.threadId, quote: getSelection() }">
                        <i class="fa fa-reply"></i> Reply
                    </button>

                    <div  v-else class="dropdown d-inline-block" >
                        <button class="btn btn-outline-primary btn-sm dropdown-toggle" :disabled="!loggedIn || !canPost" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
        </div>


        <edit-post v-if="edit" class="p-2" v-bind="edit" @close="edit=null; refresh($event)"></edit-post>

        <slot name="replies">
            <div v-if="posts" class="replies mt-2 border-start border-bottom">
                <post v-for="reply in posts" class="border-top ps-3 mb-2" :key="reply.postId" :post="reply" @refresh="refresh($event)" />
            </div>
        </slot>
    </div>
</template>
    
<script>
import ForumsApi from '~/api/forums';
import jumpToAnchor from '~/services/jump-to-anchor.js';
import EditPost from './edit-post.vue';
import rangy from 'rangy';
import { convert as htmlToText } from 'html-to-text';
import Attachment from './attachment.vue';
import RelativeDatetime from '~/components/common/relative-datetime.vue';


export default {
    name: 'Post',
    components: { EditPost, Attachment, RelativeDatetime },
    props: {
        post: Object,
    },
    emits: ['refresh'],
    data() {
        return {
            posts: this?.post?.posts || null,
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
        refresh,
        deletePost,
        highlightPostClasses,
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

    this.refresh(post);
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

function highlightPostClasses(postId) {

if(this.$route.hash == `#${postId}`)
  return ['bg-info', 'bg-opacity-25', 'p-2'];

return [];
}

function refresh($event) {

    if(this.posts) {
        this.toggleReplies();
        this.toggleReplies();
    }

    this.$emit('refresh', $event);
}


</script>

<style scoped>

.forum-post {
    /* border-top: solid 1px #c0c0c0; */
}

.anchor-margin {
  scroll-margin-top:50px;
}

.forum-post > .header .user > .username {
    font-weight: bold;
}

.forum-post > .header .post-info {
    flex-grow: 0;
    white-space: nowrap;
}

.forum-post > .header .post-info > .date {
    font-size: 90%;
}


.forum-post > .replies {
    /* border: solid 1px #c0c0c0; */
}

</style>