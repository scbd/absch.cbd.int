<template>
    <div ref="refModal" class="modal fade" style="display: block;" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
                <span v-if="postId">{{ t('titleEditPost') }}</span>
                <span v-else-if="parentId">{{ t('titlePostReply') }}</span>
                <span v-else-if="forumId">{{ t('titleCreateThread') }}</span>
                <i v-if="loading" class="fa fa-cog fa-spin"></i> 
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="post">

                <input v-if="forumId || postId" type="text" class="form-control mb-2"  v-model="subject" :placeholder="t('placeholderSubject')">
                <h3 v-else>{{subject}}</h3>
                <div v-if="parent && parent.postId!=post.postId" class="mb-2">
                    <div v-if="parent.postId==parent.threadId">
                        <a href="#parentBody" data-bs-toggle="collapse"> {{ t('inReplyToMainThread') }}</a>
                    </div>
                    <div v-else>
                        <a href="#parentBody" data-bs-toggle="collapse"> {{ t('inReplyToPost', { name: parent.createdBy, postId: parent.postId }) }}</a>
                    </div>
                    <blockquote class="border-start border-4 p-2 collapse mt-2" id="parentBody" ref="refParentBody" v-html="parent.htmlMessage"></blockquote>
                </div>

                <textarea ref="body" class="form-control mb-2" rows="10" v-model="message" :placeholder="t('placeholderMessage')"></textarea> 

<!--                     
                <div ref="body" class="body p-2 border" 
                    contenteditable="true" 
                    v-html="post.htmlMessage" 
                    @blur="post.htmlMessage = $event.target.innerHTML"></div> -->
                

                <div class="attachments" v-if="forum?.allowAttachments || attachments?.length">
                    <h6 class="card-subtitle text-muted">{{ t('attachments') }}</h6>

                    <div class="container">
                        <div class="row g-1">
                            <div class="col-12 col-md-6 col-lg-4" v-for="attachment in attachments" :key="attachment.attachmentId">

                                <div class=" p-1">
                                    <button class="btn btn-sm "  type="button"
                                    :class="{ 'btn-outline-danger' : !attachment.deletedBy, 'btn-outline-dark': attachment.deletedBy }"  
                                    @click="toggleDeleted(attachment.attachmentId)" 
                                    :title="attachment.deletedBy ? t('buttonUndeleteAttachement') : t('buttonDeleteAttachement')"
                                    >
                                        <i class="fa" :class="{ 'fa-times' : !attachment.deletedBy, 'fa-undo': attachment.deletedBy }"></i>
                                    </button>
                                    <attachment :attachment="attachment" :auto-unlock="true"/>
                                </div>
                            </div>

                            <div class="col-12" >
                                <div class=" p-1">
                                    <attachment-upload :forum-id="forum?.forumId" @file="fileUploaded($event)"/>
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
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ t('buttonClose') }}</button>
                    <button type="button" :disabled="saving" class="btn btn-primary" @click="save()">
                        {{ t('buttonSave') }} <i v-if="saving" class="fa fa-cog fa-spin"></i> 
                    </button>
                </div>
            </div>
        </div>
        </div>
    </div>
    </div>

</template>
    
<script setup>
  import { ref, onMounted, computed, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Modal, Collapse } from "bootstrap";
  import { useAuth } from "@scbd/angular-vue/src/index.js";
  import ForumsApi from '~/api/forums';
  import pending from '~/services/pending-call';
  import Attachment from './attachment.vue';
  import AttachmentUpload from './attachment-upload.vue';
  import messages from '../../app-text/components/forums/edit-post.json';

  const props = defineProps({
    postId: Number,
    parentId: Number,
    forumId: Number,
    quote: String,
  });

  const emit = defineEmits(['show', 'close']);
  const { t } = useI18n({ messages });
  const auth = useAuth();
  const forumsApi = new ForumsApi({ tokenReader: () => auth.token() });

  const forum = ref(null);
  const parent = ref(null);
  const post = ref({});
  const loading = ref(false);
  const saving = ref(false);
  const refModal = ref();
  const refParentBody = ref();
  const modal = ref(null);

const subject = computed({
  get() { return post.value?.subject ?? ''; },
  set(value) {
    if (post.value) post.value.subject = value;
  }
});

const message = computed({
  get() { return post.value?.message ?? ''; },
  set(value) {
    if (post.value) post.value.message = value;
  }
});
  const attachments = computed({
    get() { return post.value?.attachments ?? []; },
    set(value) { post.value.attachments = value; },
  });

  onMounted(async () => {
    const el = refModal.value;
    modal.value = Modal.getOrCreateInstance(el);

    el.addEventListener('shown.bs.modal', () => emit('show'));
    el.addEventListener('hidden.bs.modal', () => emit('close', post.value));

    modal.value.show();

    // await pending(load, function(on) { loading.value = on });
    await load();

    if (!props.postId && props.parentId) {
      nextTick(() => {
        const parentPostBodyPreview = Collapse.getOrCreateInstance(refParentBody.value);
        parentPostBodyPreview.show();
      });
    }
  });

  const load = async () => {
    if (props.postId) { 
      post.value = await forumsApi.getPost(props.postId);
      parent.value = await forumsApi.getPost(post.value.parentId);
      forum.value = await forumsApi.getForum(post.value.forumId);
    } else if (props.parentId) { 
      parent.value = await forumsApi.getPost(props.parentId);
      forum.value = await forumsApi.getForum(parent.value.forumId);
      post.value = { 
        postId: null, 
        parentId: parent.value.postId,
        forumId: parent.value.forumId,
        subject: parent.value.subject,
        message: props.quote ? `> ${props.quote}`.replace(/\n/g, '\n> ') : '',
        attachments: []
      };
    } else if (props.forumId) { 
      forum.value = await forumsApi.getForum(props.forumId);
      post.value = { 
        postId: null, 
        parentId: null,
        forumId: forum.value.forumId,
        subject: '',
        message: '',
        attachments: []
      };
    } else { 
      throw new Error('Unsupported control path'); 
    }
  };

  const save = async () => {
    saving.value = true;
  
    const data = {
      subject: subject.value,
      message: message.value,
      attachments: attachments.value,
    };
  
    if (props.postId) {
      post.value = await forumsApi.updatePost(props.postId, data);
    } else if (props.parentId) {
      post.value = await forumsApi.createPost(props.parentId, data);
    } else if (props.forumId) {
      post.value = await forumsApi.createThread(props.forumId, data);
    } else {
      throw new Error('Unsupported control path');
    }
  
    close(true);
    saving.value = false;
  };

  const toggleDeleted = (attachmentId) => {
    const index = attachments.value.findIndex(a => a.attachmentId == attachmentId);
    if (index < 0) return;

    attachments.value[index] = {
      ...attachments.value[index],
      deletedBy: attachments.value[index].deletedBy ? null : auth.user.name || 'me'
    };

    attachments.value = [...attachments.value]; // Force refresh
  };

  const sizeText = (size) => {
    if (size < 1024) return `${size} B`;
    if (size / 1024 < 1024) return `${(size / 1024).toFixed(1)} kB`;
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  }

  function fileUploaded(attachmentInfo) {
    attachments.value.push(attachmentInfo);
  }

  function close() {
    if (modal.value) {
      modal.value.hide();
    }
  }
</script>

<style scoped>

blockquote {
    max-height: 200px;
    overflow-y: scroll;
}

</style>