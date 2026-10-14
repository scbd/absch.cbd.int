import TotalRecordsWidget from './components/widgets/total-records.vue'
import PublicationTimelineWidget from './components/widgets/publication-timeline.vue'
import ActiveIrccWidget from './components/widgets/active-ircc.vue'
import InternalExternalIrccWidget from './components/widgets/internal-external-ircc.vue'
import TopPublishingCountriesWidget from './components/widgets/top-publishing-countries.vue'
import UsageTypeIrccWidget from './components/widgets/usage-type-ircc.vue'
import TopUserCountriesWidget from './components/widgets/top-user-countries.vue'
import UserRegionsIrccWidget from './components/widgets/user-regions-ircc.vue'
import RecentPublicationsWidget from './components/widgets/recent-publications.vue'
import PartyParticipationWidget from './components/widgets/party-participation.vue'
import TopSourceCountriesCpcWidget from './components/widgets/top-source-countries-cpc.vue'
import InternalExternalCpcWidget from './components/widgets/internal-external-cpc.vue'
import IrccAvailabilityCpcWidget from './components/widgets/ircc-availability-cpc.vue'
import CpcsReceivedWidget from './components/widgets/cpcs-received.vue'
import PublishingRegionsWidget from './components/widgets/publishing-regions.vue'
import RecordSubjectmatterWidget from './components/widgets/record-subjectmatter.vue'
import type { Component } from 'vue'
import type { ExploreWidgetId } from './widget-registry'

export const widgetComponents: Record<ExploreWidgetId, Component> = {
  'total-records': TotalRecordsWidget,
  'publication-timeline': PublicationTimelineWidget,
  'active-ircc': ActiveIrccWidget,
  'internal-external-ircc': InternalExternalIrccWidget,
  'top-publishing-countries': TopPublishingCountriesWidget,
  'usage-type-ircc': UsageTypeIrccWidget,
  'top-user-countries': TopUserCountriesWidget,
  'user-regions-ircc': UserRegionsIrccWidget,
  'recent-publications': RecentPublicationsWidget,
  'party-participation': PartyParticipationWidget,
  'top-source-countries-cpc': TopSourceCountriesCpcWidget,
  'internal-external-cpc': InternalExternalCpcWidget,
  'ircc-availability-cpc': IrccAvailabilityCpcWidget,
  'cpcs-received': CpcsReceivedWidget,
  'publishing-regions': PublishingRegionsWidget,
  'record-subjectmatter': RecordSubjectmatterWidget
}
