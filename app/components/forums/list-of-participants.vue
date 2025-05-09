<template >
  <div>
    <error-pane v-if="error" :error="error" />
    <div v-else-if="loading"><loading :caption="t('loading')"/></div>
    <div v-else-if="participants">

      <div v-if="participants.length==0">{{ t("listIsEmpty") }}</div>

      <div v-if="parties.length">
        <h3>{{ t("parties") }}</h3>
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{{ t("name") }}</th>
              <th scope="col">{{ t("government") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(participant, index) in parties" :key="index">
              <td scope="row">{{index+1}}</td>
              <td>{{participant.title}} {{ participant.firstName }} {{ participant.lastName }}</td>
              <td>{{ lstring(participant.country.name, locale) }} </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="nonParties.length">
        <h3>{{ t("non-parties") }}</h3>
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{{ t("name") }}</th>
              <th scope="col">{{ t("government") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(participant, index) in nonParties" :key="index">
              <td scope="row">{{parties.length + index + 1}}</td>
              <td>{{participant.title}} {{ participant.firstName }} {{ participant.lastName }}</td>
              <td>{{ lstring(participant.country.name, locale) }} </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="organizations.length">
        <h3>{{ t("organizations") }}</h3>
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{{ t("name") }}</th>
              <th scope="col">{{ t("organization") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(participant, index) in organizations" :key="index">
              <td scope="row">{{parties.length + nonParties.length + index + 1}}</td>
              <td>{{participant.title}} {{ participant.firstName }} {{ participant.lastName }}</td>
              <td>{{ lstring(participant.organization, locale) }} </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="members.length">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{{ t("name") }}</th>
              <th scope="col">{{  t("government_organization") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(participant, index) in members" :key="index">
              <td scope="row">{{ index + 1}}</td>
              <td>{{participant.title}} {{ participant.firstName }} {{ participant.lastName }}</td>
              <td v-if="participant.country">{{ lstring(participant.country.name, locale) }} </td>
              <td v-else>{{ lstring(participant.organization, locale) }} </td>
            </tr>
          </tbody>
        </table>
      </div> 
    </div>  
  </div>  
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import messages from '../../app-text/components/forums/list-of-participants.json';

const { t, locale } = useI18n({ messages });
</script>

<script>
import ForumsApi from '~/api/forums';
import Loading  from '~/components/common/loading.vue'
import pending  from '~/services/pending-call'
import { lstring } from '../kb/filters';
import ErrorPane from '~/components/common/error.vue';


export default {
  name:'ForumParticipants',
  components:{ Loading, ErrorPane  },
  props: { 
    forumId: Number,
  },
  data() {
    return {
      participants: [],
      loading: false,
      error: null
    }
  },
  computed: {
    parties()       { return this.participants.filter(({ type }) =>  type == 'party'); },
    nonParties()    { return this.participants.filter(({ type }) =>  type == 'non-party'); },
    organizations() { return this.participants.filter(({ type }) =>  type == 'observer'); },
    members()       { return this.participants.filter(({ type }) =>  type == 'member') ; }
  },
  methods: {
    lstring,
    load: pending(load, 'loading')
  },
  created() {
    this.load();
  }
}

async function load() {

  this.error = null;

  try {

    const { $locale } = this;
    const forumsApi     = new ForumsApi();
    const qParticipants = forumsApi.getForumParticipants(this.forumId);

    let participants = await qParticipants;

    participants = participants.sort((a, b)=>{

      const strA = `${a.country ? 0 : 1 } | ${lstring(a.country?.name || a.organization, $locale)} | ${a.lastName || ''} | ${a.firstName || ''}`;
      const strB = `${b.country ? 0 : 1 } | ${lstring(b.country?.name || b.organization, $locale)} | ${b.lastName || ''} | ${b.firstName || ''}`;

      return strA.localeCompare(strB);
    });

    this.participants = participants;

  }
  catch(err) {
    this.error = err;
  }
}


</script>
