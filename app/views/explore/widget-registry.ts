export type ExploreWidgetId =
  | 'total-records'
  | 'active-ircc'
  | 'internal-external-ircc'
  | 'publication-timeline'
  | 'top-publishing-countries'
  | 'usage-type-ircc'
  | 'top-user-countries'
  | 'user-regions-ircc'
  | 'recent-publications'
  | 'party-participation'
  | 'top-source-countries-cpc'
  | 'internal-external-cpc'
  | 'ircc-availability-cpc'
  | 'cpcs-received'
  | 'publishing-regions'
  | 'record-subjectmatter'

export type ExploreWidgetCategoryId =
  | 'overview'
  | 'characteristics'
  | 'trends'
  | 'geography'

export interface ExploreWidgetCategory {
  id: ExploreWidgetCategoryId
  title: string
}

export interface ExploreWidget {
  id: ExploreWidgetId
  title: string
  recordTypes: string[]
  scopes: string[]
  category: ExploreWidgetCategoryId
  columnClass: string
}

export const widgetCategories: ExploreWidgetCategory[] = [
  {
    id: 'overview',
    title: 'Overview'
  },
  {
    id: 'geography',
    title: 'Geographic distribution'
  },
  {
    id: 'characteristics',
    title: 'Record characteristics'
  },
  {
    id: 'trends',
    title: 'Trends'
  }
]

export const widgets: ExploreWidget[] = [
  {
    id: 'total-records',
    title: 'Total Records',
    recordTypes: [
      'absPermit',
      'absCheckpointCommunique',
      'measure',
      'absProcedure',
      'authority',
      'absCheckpoint'
    ],
    scopes: ['global', 'region', 'country'],
    category: 'overview',
    columnClass: 'col-md-4'
  },
  {
    id: 'recent-publications',
    title: 'Records published recently',
    recordTypes: [
      'absPermit',
      'absCheckpointCommunique',
      'measure',
      'absProcedure',
      'authority',
      'absCheckpoint'
    ],
    scopes: [
      'global',
      'country',
      'region'
    ],
    category: 'overview',
    columnClass: 'col-md-4'
  },
  {
    id: 'top-publishing-countries',
    title: 'Top 10 countries publishing records',
    recordTypes: [
      'absPermit',
      'absCheckpointCommunique',
      'measure',
      'absProcedure',
      'authority',
      'absCheckpoint'
    ],
    scopes: [
      'global', 'region'
    ],
    category: 'geography',
    columnClass: 'col-md-4'
  },
  {
    id: 'top-user-countries',
    title: 'Top 10 countries where users are located',
    recordTypes: [
      'absPermit'
    ],
    scopes: [
      'global', 'region'
    ],
    category: 'geography',
    columnClass: 'col-md-4'
  },
  {
    id: 'party-participation',
    title: 'Party participation',
    recordTypes: [
      'absPermit',
      'absCheckpointCommunique',
      'measure',
      'absProcedure',
      'authority',
      'absCheckpoint'
    ],
    scopes: [
      'global',
      'region'
    ],
    category: 'overview',
    columnClass: 'col-md-4'
  },
  {
    id: 'top-source-countries-cpc',
    title: 'Top 10 source countries',
    recordTypes: [
      'absCheckpointCommunique'
    ],
    scopes: [
      'global',
      'country',
      'region'
    ],
    category: 'geography',
    columnClass: 'col-md-4'
  },
  {
    id: 'internal-external-cpc',
    title: 'Internal vs external CPCs',
    recordTypes: [
      'absCheckpointCommunique'
    ],
    scopes: [
      'global',
      'country',
      'region'
    ],
    category: 'characteristics',
    columnClass: 'col-md-4'
  },
  {
    id: 'usage-type-ircc',
    title: 'Usage type',
    recordTypes: [
      'absPermit'
    ],
    scopes: [
      'global',
      'country'
    ],
    category: 'characteristics',
    columnClass: 'col-md-4'
  },
  {
    id: 'active-ircc',
    title: 'Active certificates',
    recordTypes: [
      'absPermit'
    ],
    scopes: [
      'global', 'region', 'country'
    ],
    category: 'characteristics',
    columnClass: 'col-md-4'
  },

  {
    id: 'internal-external-ircc',
    title: 'PIC Granted Country Type',
    recordTypes: [
      'absPermit'
    ],
    scopes: [
      'global',
      'region',
      'country'
    ],
    category: 'characteristics',
    columnClass: 'col-md-4'
  },
  {
    id: 'ircc-availability-cpc',
    title: 'IRCC availability',
    recordTypes: [
      'absCheckpointCommunique'
    ],
    scopes: [
      'global',
      'country',
      'region'
    ],
    category: 'characteristics',
    columnClass: 'col-md-4'
  },
  {
    id: 'user-regions-ircc',
    title: 'CBD regions where users are located',
    recordTypes: [
      'absPermit'
    ],
    scopes: [
      'global',
      'country',
      'region'
    ],
    category: 'geography',
    columnClass: 'col-md-4'
  },
  {
    id: 'publication-timeline',
    title: 'Timeline',
    recordTypes: [
      'absPermit',
      'absCheckpointCommunique',
      'measure',
      'absProcedure',
      'authority',
      'absCheckpoint'
    ],
    scopes: [
      'global',
      'country',
      'region'
    ],
    category: 'trends',
    columnClass: 'col-12'
  },
  {
    id: 'cpcs-received',
    title: 'CPCs received',
    recordTypes: [
      'absCheckpointCommunique'
    ],
    scopes: [
      'country'
    ],
    category: 'overview',
    columnClass: 'col-md-4'
  },
  {
    id: 'publishing-regions',
    title: 'CBD regions publishing records',
    recordTypes: [
      'absPermit',
      'absCheckpointCommunique',
      'measure',
      'absProcedure',
      'authority',
      'absCheckpoint'
    ],
    scopes: [
      'global'
    ],
    category: 'geography',
    columnClass: 'col-md-4'
  },
  {
    id: 'record-subjectmatter',
    title: 'Suject matter',
    recordTypes: [
      'absPermit',
      'absCheckpointCommunique'
    ],
    scopes: [
      'global',
      'country',
      'region'
    ],
    category: 'characteristics',
    columnClass: 'col-md-4'
  }

]
