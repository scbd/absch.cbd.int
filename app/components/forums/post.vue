<template>
    <div class="forum-post p-3">
        <a v-if="!showLinkToSelf" :name="`${post.postId}`"></a>

        <div class="header mt-2 mb-2">

            <div class="user">
                <span class="username">{{ post.createdBy }} </span>
                <span class="organization">{{ post.createdByOrganization }} </span>
            </div>

            <div class="post-info">
                <span class="date" :title="formatDateTime(post.createdOn)" @click="showFullDateTime = !showFullDateTime">{{ showFullDateTime ? formatDateTime(post.createdOn) : fromNow(post.createdOn)  }}</span>
                <a v-if="showLinkToParent" :href="`#${post.parentId}`" @click="jumpToAnchor()"><i class="fa fa-arrow-up"></i></a>
                <a v-if="showLinkToSelf" :href="`#${post.postId}`" @click="jumpToAnchor()"><i class="fa fa-arrow-down"></i></a>
            </div>

        </div>

        <p class="body" v-html="post.htmlMessage"></p>

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
        <div class="footer">
            <div class="replies">
                <button class="btn btn-light btn-sm" @click.prevent="toggleReplies()" v-if="post.replies">
                    <span v-if="post.replies == 1">{{ post.replies }} reply</span>
                    <span v-if="post.replies > 1">{{ post.replies }} replies</span>
                    <i class="fa" :class="{ 'fa-caret-up' : !!posts, 'fa-caret-down' : !posts }"></i>
                </button>
            </div>
            <div class="action">
                <button class="btn btn-primary btn-sm" @click.prevent="toggleReplies()">
                    <i class="fa fa-reply"></i> 
                    Reply
                </button>
                <button class="btn btn-light btn-sm" @click.prevent="edit=!edit">
                    <i class="fa fa-edit"></i> 
                    Edit
                </button>
            </div>
        </div>

        <edit-post v-if="edit" :post-id="post.postId" @close="edit=false"></edit-post>

        <div v-if="posts" class="replies ms-4 mt-2">
            <post v-for="reply in posts" :key="reply.postId" :post="reply" />
        </div>
    </div>
</template>
    
<script>
import moment from 'moment';
import ForumsApi from '~/api/forums';
import jumpToAnchor from '~/services/jump-to-anchor.js';
import EditPost from './edit-post.vue';

export default {
    name: 'Post',
    components: { EditPost },
    props: {
        post: Object,
    },
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
        }
    },
    methods: {
        toggleReplies,
        jumpToAnchor() { this.$nextTick(jumpToAnchor)},
        fromNow(datetime) { return moment(datetime).fromNow(); },
        formatDateTime(datetime) { return moment(datetime).format('D MMM YYYY HH:mm'); }
    }
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