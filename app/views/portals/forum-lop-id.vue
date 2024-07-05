<template>
  <div>
    <h1>{{ t("title") }}</h1>
    <forum-participants :forumId="forumId" ></forum-participants>
  </div>
</template>

<script setup>

import ForumParticipants from '~/components/forums/list-of-participants.vue';
import { useI18n } from 'vue-i18n';
import messages from '../../app-text/views/portals/forum-lop-id.json';

  const props = defineProps({ forumId: Number });

  const { t } = useI18n({ messages });

</script>

<script>

export default {
  name:'forumLop',
}
</script>