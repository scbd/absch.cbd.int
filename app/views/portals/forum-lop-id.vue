<template>
  <div>
    <h1>Forum List of Participants</h1>
    <forum-participants :forumId="forumId" ></forum-participants>
  </div>
</template>

<script>
import ForumParticipants from '~/components/forums/list-of-participants.vue';

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
}
</script>