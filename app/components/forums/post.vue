<template>
    <div class="forum-post" :class="highlightPostClasses(post.postId)">
        <a v-if="!showLinkToSelf" class="anchor-margin"  :name="`${post.postId}`"></a>

        <div class="header mt-2 mb-2">
            <div class="row">
                <div class="col align-self-center">
                    <div class="user">
                        <span class="username">{{ post.createdBy }} </span>
                        <span class="organization">{{ post.createdByOrganization }} </span>
                        <span class="text-muted" :id="post.postId">#{{post.postId}}</span> 
                    </div>
                </div>
                <div class="col-auto align-self-center">
                    <div class="post-info">
                        <span class="date">
                            <relative-datetime :date="post.createdOn"></relative-datetime>
                        </span>
                        <span class="date" v-if="post.createdOn!=post.updatedOn">
                            <i class="fa fa-edit"></i>
                            <relative-datetime class="date" :title="`| by ${post.updatedBy}`" :date="post.updatedOn"></relative-datetime>
                        </span>
                    <a v-if="showLinkToParent" :href="`#${post.parentId}`" @click="jumpToAnchorHash(post.parentId)" :title="t('replyToId', { postId:post.parentId })"><i class="fa fa-arrow-up"></i></a>
                        <!-- <a v-if="showLinkToSelf" :href="`#${post.postId}`" @click="jumpToAnchor()"><i class="fa fa-arrow-down"></i></a> -->
                    </div>
                </div>
            </div>
        </div>

        <div ref="body" class="body mb-2" v-html="post.htmlMessage"></div>

        <div class="attachments" v-if="post.attachmentCount">
            <h6 class="card-subtitle mb-2 text-muted">{{ t('titleAttachments') }}</h6>
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
                            {{ t('replies', post.replies, { count: post.replies}) }}
                            <i class="fa" :class="{ 'fa-caret-up' : !!posts, 'fa-caret-down' : !posts }"></i>
                        </button>
                    </slot>

                </div>
                <div class="col-auto align-self-center">
                    <div v-if="canEdit" class="btn-group">
                        <button type="button" class="btn btn-light btn-sm" @click.prevent="edit()">
                            <i class="fa fa-edit"></i> {{ t('buttonEdit') }}
                        </button>
                        <button type="button" class="btn btn-light btn-sm dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" @click.prevent="edit()">
                                <i class="fa fa-edit"></i> {{ t('buttonEdit') }} </a>
                            </li>

                            <li v-if="canPin || canClose"><hr class="dropdown-divider"></li>

                            <li v-if="canPin">
                                <a class="dropdown-item" href="#" @click.prevent="togglePin()">
                                    <i class="fa fa-thumb-tack"></i> 
                                    <span v-if="post.isPinned">{{ t('buttonUnpinThread') }}</span>
                                    <span v-else>{{ t('buttonPinThread') }}</span>
                                </a>
                            </li>

                            <li v-if="canClose">
                                <a class="dropdown-item" href="#" @click.prevent="toggleClose()">
                                    <i class="fa fa-comments"></i>
                                    <span v-if="post.isClosed">{{ t('buttonOpenThread') }}</span>
                                    <span v-else>{{ t('buttonCloseThread') }}</span>
                                </a>
                            </li>
                            
                            <li v-if="canDelete && !post.replies"><hr class="dropdown-divider"></li>

                            <li v-if="canDelete && !post.replies"><a class="dropdown-item text-danger" href="#" @click.prevent="deletePost()">
                                <i class="fa fa-times"></i> {{ t('buttonDeletePost') }}</a>
                            </li>
                        </ul>
                    </div>

                    <div class="d-inline" v-if="isOpen">

                        <button v-if="!loggedIn" class="btn btn-outline-success btn-sm" type="button" 
                            @click="loginToReply(post.postId)">
                            <i class="fa fa-reply" aria-hidden="true"></i> {{ t('buttonSignInToReply') }}
                        </button>

                        <button v-else-if="canPost && post.postId == post.threadId" class="btn btn-primary btn-sm" :disabled="!canPost" type="button" 
                            @click="reply(post.threadId, getSelection())">
                            <i class="fa fa-reply"></i> {{ t('buttonReplyToPost') }}
                        </button>

                        <div  v-else-if="canPost" class="dropdown d-inline-block" >
                            <button class="btn btn-outline-primary btn-sm dropdown-toggle" :disabled="!canPost" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-reply"></i> 
                                {{ t('buttonReplyToPost') }}
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#" @click.prevent="reply(post.threadId)"> <i class="fa fa-reply"></i> {{ t('buttonReplyToMainThread') }} </a></li>
                                <li><a class="dropdown-item" href="#" @click.prevent="reply(post.postId, getSelection())"> <i class="fa fa-reply-all"></i> {{ t('buttonReplyToPerson', {name: post.createdBy }) }}</a></li>
                            </ul>
                        </div>
                        <div v-else>
                            <i class="text-muted"> {{ t('notAllowedToPost') }}</i>
                        </div>   
                    </div>       
                </div>              
          </div>
        </div>


        <edit-post v-if="editing" class="p-2" v-bind="editing" @close="editing=null; refresh($event)"></edit-post>

        <slot name="replies">
            <div v-if="posts" class="replies mt-2 border-start border-bottom">
                <inner-post v-for="reply in posts" class="border-top ps-3 mb-2" :key="reply.postId" :post="reply" @refresh="refresh($event)"></inner-post>
            </div>
        </slot>
    </div>
</template>
    
<script setup>
import { computed, defineEmits, nextTick, onMounted, ref } from 'vue';
import ForumsApi from '~/api/forums';
import jumpToAnchor from '~/services/jump-to-anchor.js';
import EditPost from './edit-post.vue';
import rangy from 'rangy';
import { convert as htmlToText } from 'html-to-text';
import Attachment from './attachment.vue';
import RelativeDatetime from '~/components/common/relative-datetime.vue';
import { useRoute, useRouter, useAuth } from "@scbd/angular-vue/src/index.js";
import messages from "~/app-text/components/forums/post.json";
import { useI18n } from 'vue-i18n';
import innerPost from './post.vue'
// since post is using inside post, Vue doesn’t recognize the recursive component call.
defineOptions({ name: 'innerPost' })
const router = useRouter();
const route = useRoute();
const auth = useAuth();
const { t } = useI18n({ messages });

const forumsApi = new ForumsApi({tokenReader:()=>auth.token()});

const props = defineProps({
    post: {
        type:Object
    },
    highlightOnHash: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['refresh']);
const posts = ref(null);
const editing = ref(null);
const body = ref(null);

const showLinkToParent = computed(() => {
    //ToDo: not clear on the $parent.post
            // const { parentId : postParentId } = this.post;
            // const { postId   : parentPostId } = this.$parent.post || this.$parent.thread || {};
    const {postId, parentId, threadId} = props.post;
    return postId && postId != parentId;
});

const showLinkToSelf = computed(() => {
    const {postId, parentId} = props.post || {};
    return postId && postId == parentId;
});

const loggedIn = computed(() => auth.user()?.isAuthenticated);
const isOpen = computed(() => !!props.post?.isOpen);
const canPost = computed(() => !!props.post?.security?.canPost);
const canEdit = computed(() => !!props.post?.security?.canEdit);
const canDelete = computed(() => !!props.post?.security?.canDelete);
const canApprove = computed(() => !!props.post?.security?.canApprove); // not using
const canClose = computed(() => !!props.post?.security?.canClose);
const canPin = computed(() => !!props.post?.security?.canPin);

const jumpToAnchorHash = (anchor) => {  
    // if click on the same arrow again it is not moving to that hash bcs already hash is in url
    history.replaceState(null, '', window.location.pathname + window.location.search);
    requestAnimationFrame(() => { // ensures DOM is ready before jumping
        jumpToAnchor(anchor);
        history.replaceState(null, '', window.location.pathname + window.location.search + '#'+anchor); // Optional: restore hash if needed
    });
};


    const    getSelection = ()=> { 

            // get the selection
            let sel = rangy.getSelection();
            
            if (!sel.toString())
                return "";

            const ranges = sel.getAllRanges();

            // create range for element, where selection is allowed

            const cutRange = rangy.createRange();  
            cutRange.selectNode(body.value);

            // make an array of intersections of current selection ranges and the cutRange
            const goodRanges = [];

            ranges.map(r=>cutRange.intersection(r))
                  .filter(r=>r)
                  .forEach(r=>goodRanges.push(r));

            sel.setRanges(goodRanges);            

            const html = sel.toHtml();
            const text = htmlToText(html);

            return text;
        };

        onMounted(()=>{
            const { postId } = props.post;
            const { hash } = route;

            if(hash == `#${postId}-reply`) {
            router.replace({ hash: `#${postId}` });
            reply(postId);
        }

        });


const edit = ()=> {

    if (!loggedIn.value) return;
    if (!canEdit.value) return;

    editing.value = { postId: props.post.postId }
}

const reply = (parentId, quote) => {


    if (!loggedIn.value) return;
    if (!canPost.value)  return;

    editing.value = { parentId: parentId, quote }
}

const deletePost = async()=> {

    const { postId, createdBy } = props.post;

    const msg = `You are about to delete message #${postId} from ${createdBy}.\n\nAre you sure you want to continue?`; // ToDo: need translation

    if(!confirm(msg)) return;

    await forumsApi.deletePost(postId);

    refresh(props.post);
}

 const togglePin = async ()=> {

    const { postId, isPinned } = props.post;

    const pendingCall =  isPinned 
                      ? forumsApi.unpinThread(postId)
                      : forumsApi.pinThread(postId);

    await forumsApi.pinThread(postId, isPinned); // ToDo: await pendingCall;

    refresh(props.post);

}

const toggleClose = async()  => {

    const { postId, isClosed } = props.post;

    const pendingCall = isClosed 
                      ? forumsApi. openThread(postId)
                      : forumsApi.closeThread(postId);

    await pendingCall;

    refresh(props.post);
}

const toggleReplies = async () => {

    if(posts.value) {
        posts.value = null;
        return;
    }


    const { postId } = props.post;

    const postsResponse = await forumsApi.getPosts(postId);

    posts.value = postsResponse;
}

const highlightPostClasses = (postId)=> {

    if (props.highlightOnHash && route.hash == `#${postId}`)
        return ['bg-info', 'bg-opacity-25', 'p-2'];

    return [];
}

const refresh = ($event)=> {

    if(posts.value) {
        toggleReplies();
        toggleReplies();
    }

    emit('refresh', $event);
}

const loginToReply = (replyToId)=> {

    router.push({ hash: `#${replyToId}-reply`});

    auth.login();

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