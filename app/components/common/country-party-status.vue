<template>
  <div v-if="country">
    <div v-for="party in partyStatuses" :key="party.key">
      <div v-if="country[party.key]" :class="['mb-2', party.class]">
        <strong>{{ party.label }}</strong><br>
        <span v-if="party.date">
          ({{ t("since") }} {{ formatDate(party.date, 'DD MMM YYYY') }})
        </span>
      </div>
      <div v-else class="mb-2 color-non-party">
        <strong>{{ party.notLabel }}</strong>
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
    country: {
      type: Object,
      required: true
    },
    visiblePartyRealms: {
      type: Array,
      default: () => []
    }
  })

  // Define party statuses with their properties
  const partyStatuses = [
    {
      key: 'isCBDParty',
      realm: 'chm',
      label: t("partyToConvention"),
      notLabel: t("notPartyToConvention"),
      date: props.country.partyToCBDDate,
      class: 'text-chm'
    },
    {
      key: 'isNagoyaParty',
      realm: 'abs',
      label: t("partyToNagoya"),
      notLabel: t("notPartyToNagoya"),
      date: props.country.partyToNagoyaDate,
      class: 'text-abs'
    },
    {
      key: 'isCartagenaParty',
      realm: 'bch',
      label: t("partyToCartagena"),
      notLabel: t("notPartyToCartagena"),
      date: props.country.partyToCartagenaDate,
      class: 'text-bch'
    },
    {
      key: 'isNKLSParty',
      realm: 'bch',
      label: t("partyToSuppProtocol"),
      notLabel: t("notPartyToSuppProtocol"),
      date: props.country.partyToNKLSPDate,
      class: 'color-NKLSP'
    }
  ].filter(party => {
    // Filter parties based on the visiblePartyRealms prop, visible-party-realms="['chm']" for chm only
    if (props.visiblePartyRealms.length > 0) {
      return props.visiblePartyRealms.includes(party.realm);
    }
    // If no filter is applied, include all parties
    return true;
  });

  partyStatuses.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });
</script>
