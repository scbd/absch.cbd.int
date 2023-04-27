<template >
  <div>
    <div v-if="!participants.length"><loading caption="Loading..."/></div>
    <div v-else>
      <div v-if="parties.length">
        <h3>Parties</h3>
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Government</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(participant, index) in parties" :key="index">
              <td scope="row">{{index+1}}</td>
              <td>{{ participant.firstName }} {{ participant.lastName }}</td>
              <td>{{ participant.country | lstring($locale) }} </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="nonparties.length">
        <h3>Non-Parties</h3>
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Government</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(participant, index) in nonparties" :key="index">
              <td scope="row">{{index+1}}</td>
              <td>{{ participant.firstName }} {{ participant.lastName }}</td>
              <td>{{ participant.country | lstring($locale) }} </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="organizations.length">
        <h3>Observers</h3>
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Organization</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(participant, index) in organizations" :key="index">
              <td scope="row">{{index+1}}</td>
              <td>{{ participant.firstName }} {{ participant.lastName }}</td>
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
import ForumParticipants from '~/components/forums/list-of-participants.vue';
import Loading  from '~/components/common/loading.vue'
import '../kb/filters';

export default {
  name:'ForumParticipants',
  components:{ ForumParticipants, Loading  },
  props: { 
    forumId: Number,
  },
  data() {
    return {
      participants: [],      
    }
  },
  computed: {
    parties() {
      return this.participants.filter(function(p) { return p.type == 'party'; })
                              .sort((a, b) => (a.country[this.$locale].localeCompare(b.country[this.$locale]) || a.lastName.localeCompare(b.lastName)));
                       
    },
    nonparties() {
      return this.participants.filter(function(p) { return p.type == 'non-party'; })
                              .sort((a, b) => (a.country[this.$locale].localeCompare(b.country[this.$locale]) || a.lastName.localeCompare(b.lastName)));
    },
    organizations() {
      return this.participants.filter(function(p) { return p.type == 'observer'; })
                              .sort((a, b) => {
                                if(a.organization[this.$locale] > b.organization[this.$locale]) return 1;
                                if(a.organization[this.$locale] < b.organization[this.$locale]) return -1;
                                return Number(a.lastName.localeCompare(b.lastName));
                              });
    }    
  },
  async created() {
 
    const forumsApi     = new ForumsApi();
    const qParticipants = forumsApi.getForumParticipants(this.forumId);

    this.participants = await qParticipants;
  }
}
</script>
