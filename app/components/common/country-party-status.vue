<template>
    <div v-if="country">
        <!-- Party to the Convention -->
        <div v-if="country.isChmParty" class="mb-2 text-chm">
            <strong>{{ t("partyToConvention") }}</strong><br>
            <span v-if="country.partyToChmDate">
              ({{ t("since") }} {{ formatDate(country.partyToChmDate , 'DD MMM YYYY') }})
            </span>
        </div>
        <div v-else class="mb-2 color-non-party">
            <strong>{{ t("notPartyToConvention") }}</strong>
        </div>

        <!-- Party to the Nagoya Protocol -->
        <div v-if="country.isNagoyaParty" class="mb-2 text-abs">
            <strong>{{ t("partyToNagoya") }}</strong><br>
            <span v-if="country.partyToNagoyaDate">
              ({{ t("since") }} {{ formatDate(country.partyToNagoyaDate, 'DD MMM YYYY') }})
            </span>
        </div>
        <div v-else class="mb-2 color-non-party">
            <strong>{{ t("notPartyToNagoya") }}</strong>
        </div>

        <!-- Party to the Cartagena Protocol -->
        <div v-if="country.isCartagenaParty" class="mb-2 text-bch">
            <strong>{{ t("partyToCartagena") }}</strong><br>
            <span v-if="country.partyToCartagenaDate">
              ({{ t("since") }} {{ formatDate(country.partyToCartagenaDate, 'DD MMM YYYY') }})
            </span>
        </div>
        <div v-else class="mb-2 color-non-party">
            <strong>{{ t("notPartyToCartagena") }}</strong>
        </div>

        <!-- Party to the Cartagena Protocol -->
        <div v-if="country.isNKLSParty" class="mb-2 color-NKLSP">
            <strong>{{ t("partyToSuppProtocol") }}</strong><br>
            <span v-if="country.partyToNKLSPDate">
              ({{ t("since") }} {{ formatDate(country.partyToNKLSPDate, 'DD MMM YYYY') }})
            </span>
        </div>
        <div v-else class="mb-2 color-non-party">
            <strong>{{ t("notPartyToSuppProtocol") }}</strong>
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
    }
  })

</script>
