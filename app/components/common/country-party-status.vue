<template>
  <div v-if="country">
    <div v-for="realm in partyStatuses" :key="realm.key">

      <!-- Party -->
      <div v-if="realm.isParty" :class="[realm.class]">
        <strong>{{ realm.label }}</strong><br>
      </div>

      <!-- Not a party, don't show in chm -->
      <div v-else-if="!realm.isInbetweenParty && !realm.isParty && realm.realm=='chm'" class="mb-2 color-non-party">
        <strong>{{ realm.notLabel }}</strong>
      </div>

      <!-- In-between / Entry date -->
      <div v-if="realm.isParty || realm.isInbetweenParty">
        <span 
          class="bold"
          :class="[
            realm.isParty ? realm.class : '',
            realm.isInbetweenParty ? 'color-inbetween' : ''
          ]"
        >
          (
            <span v-if="realm.isInbetweenParty">{{ t('entry') }} {{ formatDate(realm.entryIntoForce, 'DD MMM YYYY') }}</span>
            <span v-else>{{ t('since') }} {{ formatDate(realm.partyToDate, 'DD MMM YYYY') }}</span>
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

const { t } = useI18n({ messages });

const props = defineProps({
  country: { type: Object, required: true },
  visiblePartyRealms: { type: Array, default: () => [] }
});

const partyStatuses = [
  {
    key: 'isCBDParty', realm: 'chm', label: t("partyToConvention"), notLabel: t("notPartyToConvention"),
    ...props.country.chm, class: 'text-chm'
  },
  {
    key: 'isNagoyaParty', realm: 'abs', label: t("partyToNagoya"), notLabel: t("notPartyToNagoya"),
    ...props.country.abs, class: 'text-abs'
  },
  {
    key: 'isCartagenaParty', realm: 'bch', label: t("partyToCartagena"), notLabel: t("notPartyToCartagena"),
    ...props.country.bch, class: 'text-bch'
  },
  {
    key: 'isNKLSParty', realm: 'bch', label: t("partyToSuppProtocol"), notLabel: t("notPartyToSuppProtocol"),
    isParty: props.country.isNKLSParty, partyToDate: props.country.partyToNKLSPDate, class: 'color-NKLSP'
  }
].filter(p => props.visiblePartyRealms.length === 0 || props.visiblePartyRealms.includes(p.realm))
 .sort((a, b) => {
    if (!a.entryIntoForce) return 1;
    if (!b.entryIntoForce) return -1;
    return new Date(b.entryIntoForce) - new Date(a.entryIntoForce);
 });
</script>
