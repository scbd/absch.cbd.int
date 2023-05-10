<template >
  <div>
    <error-pane v-if="error" :error="error" />
    <div v-else-if="loading"><loading :caption="$t('loading')"/></div>
    <div v-else-if="participants">

      <div v-if="participants.length==0">{{ $t("listIsEmpty") }}</div>

      <div v-if="parties.length">
        <h3>{{ $t("parties") }}</h3>
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{{ $t("name") }}</th>
              <th scope="col">{{ $t("government") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(participant, index) in parties" :key="index">
              <td scope="row">{{index+1}}</td>
              <td>{{participant.title}} {{ participant.firstName }} {{ participant.lastName }}</td>
              <td>{{ participant.country.name | lstring($locale) }} </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="nonParties.length">
        <h3>{{ $t("non-parties") }}</h3>
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{{ $t("name") }}</th>
              <th scope="col">{{ $t("government") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(participant, index) in nonParties" :key="index">
              <td scope="row">{{parties.length + index + 1}}</td>
              <td>{{participant.title}} {{ participant.firstName }} {{ participant.lastName }}</td>
              <td>{{ participant.country.name | lstring($locale) }} </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="organizations.length">
        <h3>{{ $t("organizations") }}</h3>
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{{ $t("name") }}</th>
              <th scope="col">{{ $t("organization") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(participant, index) in organizations" :key="index">
              <td scope="row">{{parties.length + nonParties.length + index + 1}}</td>
              <td>{{participant.title}} {{ participant.firstName }} {{ participant.lastName }}</td>
              <td>{{ participant.organization | lstring($locale) }} </td>
            </tr>
          </tbody>
        </table>
      </div>      
    </div>  
  </div>  
</template>

<script>
import ForumsApi from '~/api/forums';
import i18n from '../../app-text/components/forums/list-of-participants.json';
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
  },
  methods: {
    load: pending(load, 'loading')
  },
  created() {
    this.load();
  },
  i18n: {
      messages: {
          en: i18n
      }
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

      const strA = `${lstring(a.country?.name || a.organization, $locale)} | ${a.lastName || ''} | ${a.firstName || ''}`;
      const strB = `${lstring(b.country?.name || b.organization, $locale)} | ${b.lastName || ''} | ${b.firstName || ''}`;

      return strA.localeCompare(strB);
    });

    this.participants = participants;

  }
  catch(err) {
    this.error = err;
  }
}


</script>
