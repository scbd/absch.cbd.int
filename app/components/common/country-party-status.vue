<template>
  <div v-if="country">

    <div v-for="party in partyStatuses" :key="party.key">

      <!-- Party -->
      <div v-if="party.isParty" :class="[party.class]">
        <strong>{{ party.label }}</strong><br>
      </div>
      <!-- In-between party, Only for ABS -->
      <div v-if="party.isInbetweenParty && party.realm=='ABS'" class="color-inbetween">
        <strong>{{ ratified }}</strong>
      </div>

      <!-- Not a party, don't show in chm, && (currentRealm!='CHM' && realm.realm=='CHM') -->
      <div v-else-if="!party.isInbetweenParty && !party.isParty" class="mb-2 color-non-party">
        <strong>{{ party.notLabel }}</strong>
      </div>

      <!-- In-between / Entry date -->
      <div v-if="party.isParty || party.isInbetweenParty">
        <span 
          class="bold"
          :class="[party.isParty ? party.class : '', party.isInbetweenParty ? 'color-inbetween' : '']"
        >
          (
            <span v-if="party.isInbetweenParty">{{ t('entry') }} {{ formatDate(party.entryIntoForce, 'DD MMM YYYY') }}</span>
            <span v-else>{{ t('since') }} {{ formatDate(party.partyToDate, 'DD MMM YYYY') }}</span>
          )
        </span>
      </div>

    </div>
  </div>
</template>

<script setup>
  import { formatDate } from '~/components/kb/filters';
  import { useI18n } from 'vue-i18n';
  import messages from '../../app-text/views/countries/country-profile.json';
  import { useRealm } from '../../services/composables/realm.js';

  const { t } = useI18n({ messages });
  const realm = useRealm();
  const currentRealm = realm.realm || 'CHM'; // Default to 'chm' if realm is not set

  const props = defineProps({
    country: { type: Object, required: true },
    visiblePartyRealms: { type: Array, default: () => [] }
  });

  const partyStatuses = [
    {
      key: 'isCBDParty', realm: 'CHM', label: t("partyToConvention"), notLabel: t("notPartyToConvention"),
      ...props.country.CHM, class: 'text-chm'
    },
    {
      key: 'isNagoyaParty', realm: 'ABS', label: t("partyToNagoya"), notLabel: t("notPartyToNagoya"),
      ...props.country.ABS, class: 'text-abs'
    },
    {
      key: 'isCartagenaParty', realm: 'BCH', label: t("partyToCartagena"), notLabel: t("notPartyToCartagena"),
      ...props.country.BCH, class: 'text-bch'
    },
    {
      key: 'isNKLSParty', realm: 'BCH', label: t("partyToSuppProtocol"), notLabel: t("notPartyToSuppProtocol"),
      isParty: props.country.isNKLSParty, partyToDate: props.country.partyToNKLSPDate, class: 'color-NKLSP'
    }
  ].filter(p => props.visiblePartyRealms.length === 0 || props.visiblePartyRealms.includes(p.realm))
  .sort((a, b) => {
      if (!a.entryIntoForce) return 1;
      if (!b.entryIntoForce) return -1;
      return new Date(b.entryIntoForce) - new Date(a.entryIntoForce);
  });
</script>
