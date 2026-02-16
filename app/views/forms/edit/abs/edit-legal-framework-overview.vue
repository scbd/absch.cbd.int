<template>
  <div v-if="legalFrameworkDocument?.header">
    <section>
      <legend>{{ t("generalInformation") }}</legend>

      <div class="row">
        <div class="col-xs-12">
          <ng
            v-vue-ng:km-control-group
            name="languages"
            required
            :caption="t('languageToPublish')"
          >
            <ng
              v-model:ng-model="legalFrameworkDocument.header.languages"
              v-vue-ng:km-form-languages
              multiple
              required
              html
            />
          </ng>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <ng
            v-vue-ng:km-control-group
            name="countries"
            :required="true"
            :caption="t('country')"
          >
            <ng
              v-model:ng-model="legalFrameworkDocument.countries"
              v-vue-ng:km-select
              name="countries"
              class="d-block"
              multiple
              required
              :placeholder="t('selectCountry')"
              watch-items
              @items="()=>options.countries"
            />
          </ng>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { inject, type ModelRef } from 'vue'
import '~/components/scbd-angularjs-controls/form-control-directives/km-form-languages.js'
// @ts-expect-error importing js file
import { sanitizeDocument } from '~/services/filters/common'
// @ts-expect-error importing js file
import { THESAURUS } from '~/services/filters/constant'
// @ts-expect-error importing js file
import ThesaurusApi from '~/api/thesaurus'
// @ts-expect-error importing js file
import { useAuth } from '@scbd/angular-vue/src/index.js'
// @ts-expect-error importing js file
import { useI18n } from 'vue-i18n'
// TODO: Create use existing translations files if there are any
import messages from '~/app-text/views/forms/edit/abs/edit-legal-framework-overview.json'
import type { Inject, LegalFrameworkDocument } from '~/types/components/legal-framework-overview'

// Constants
const thesaurusApi = new ThesaurusApi({ tokenReader: () => auth.token() })
const auth = useAuth()
const angularGetCleanDocument: Inject = (inject('getCleanDocument') ?? (() => undefined))
const { t } = useI18n({ messages })

const options = {
  countries: thesaurusApi.getDomainTerms(THESAURUS.COUNTRIES)
}

// Model
const legalFrameworkDocument: ModelRef<LegalFrameworkDocument | undefined> = defineModel<LegalFrameworkDocument>()

// Methods
function getCleanDocument (doc: LegalFrameworkDocument | undefined): LegalFrameworkDocument | undefined {
  // TODO: Determine what needs to be done here.
  const lDocument = doc ?? legalFrameworkDocument.value
  if (typeof lDocument !== 'object') { return undefined }

  if (lDocument.notes !== undefined) {
    if (/^\s*$/g.test(lDocument.notes)) { lDocument.notes = undefined }
  }

  return sanitizeDocument(lDocument)
}

angularGetCleanDocument({
  getCleanDocument
})
</script>
