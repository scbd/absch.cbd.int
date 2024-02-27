<template>
  <div>
    <h1>{{ $t("title") }}</h1>
    <forum-participants :forumId="forumId" ></forum-participants>
  </div>
</template>

<script>
import ForumParticipants from '~/components/forums/list-of-participants.vue';
import i18n from '../../app-text/views/portals/forum-lop-id.json';

export default {
  name:'forumLop',
  components:{ ForumParticipants  },
  props: { 
    forumId: Number,
  },
  data() {
    return {
    }
  },
  i18n: {
      messages: {
          en: i18n
      }
  }
}
</script>