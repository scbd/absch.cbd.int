import { describe, expect, it } from 'vitest'
import {
  buildCpcsReceivedSearchQuery,
  buildCpcTypeQuery,
  buildExploreSearchQuery,
  buildExploreFieldQueries,
  parseExploreFilters,
  getCpcTypeCountry,
  getCpcInternalCountFromPivot,
  type ExploreFilter
} from '~/views/explore/explore-filters'

describe('getCpcTypeCountry', () => {
  it('uses the shared country filter selected in Explore', () => {
    const filters: ExploreFilter[] = [
      {
        id: 'dashboard-country',
        label: 'Country: France',
        fieldQuery: 'government_s:fr',
        value: 'fr'
      }
    ]

    expect(
      getCpcTypeCountry(undefined, filters)
    ).toBe('fr')
  })

  it('ignores excluded country filters', () => {
    const filters: ExploreFilter[] = [
      {
        id: 'dashboard-country',
        label: 'Country: France',
        fieldQuery: 'government_s:fr',
        value: 'fr',
        excluded: true
      }
    ]

    expect(
      getCpcTypeCountry(undefined, filters)
    ).toBeUndefined()
  })

  it('prefers the country selector when it supplies an included country', () => {
    const filters: ExploreFilter[] = [
      {
        id: 'dashboard-country',
        label: 'Country: France',
        fieldQuery: 'government_s:fr',
        value: 'fr'
      }
    ]

    expect(
      getCpcTypeCountry('FR', filters)
    ).toBe('fr')
  })
})

describe('buildCpcTypeQuery', () => {
  it('classifies CPCs by source country when a country is selected', () => {
    expect(
      buildCpcTypeQuery('internal', 'FR')
    ).toBe('sourceCountries_ss:fr')

    expect(
      buildCpcTypeQuery('external', 'FR')
    ).toBe('-sourceCountries_ss:fr')
  })

  it('builds global type filters from matching publisher/source pairs', () => {
    const pivot = [
      {
        value: 'fr',
        pivot: [
          { value: 'fr', count: 113 },
          { value: 'de', count: 20 }
        ]
      },
      {
        value: 'de',
        pivot: [
          { value: 'fr', count: 3 }
        ]
      }
    ]

    expect(
      buildCpcTypeQuery(
        'internal',
        undefined,
        pivot
      )
    ).toBe(
      '((government_s:fr AND sourceCountries_ss:fr))'
    )

    expect(
      buildCpcTypeQuery(
        'external',
        undefined,
        pivot
      )
    ).toBe(
      '-(((government_s:fr AND sourceCountries_ss:fr)))'
    )
  })

  it('uses a match-none query when pivot data is missing', () => {
    expect(
      buildCpcTypeQuery('internal')
    ).toBe('(*:* AND -(*:*))')
  })

  it('preserves global CPC type queries when filters are serialized', () => {
    const fieldQuery = buildCpcTypeQuery(
      'internal',
      undefined,
      [
        {
          value: 'fr',
          pivot: [
            { value: 'fr', count: 113 }
          ]
        }
      ]
    )
    const filters: ExploreFilter[] = [
      {
        id: 'internal-external-cpc',
        label: 'CPC type: Internal',
        fieldQuery,
        value: 'internal'
      }
    ]

    expect(
      parseExploreFilters(
        JSON.stringify(filters)
      )
    ).toEqual(filters)
  })
})

describe('getCpcInternalCountFromPivot', () => {
  it('sums matching publisher and source country counts', () => {
    const pivot = [
      {
        value: 'fr',
        pivot: [
          { value: 'fr', count: 113 },
          { value: 'de', count: 20 }
        ]
      },
      {
        value: 'de',
        pivot: [
          { value: 'fr', count: 3 },
          { value: 'DE', count: 4 }
        ]
      }
    ]

    expect(
      getCpcInternalCountFromPivot(pivot)
    ).toBe(117)
  })

  it('returns zero for missing or malformed pivot data', () => {
    expect(
      getCpcInternalCountFromPivot(undefined)
    ).toBe(0)

    expect(
      getCpcInternalCountFromPivot([
        { value: 'fr', pivot: [{ value: 'fr' }] }
      ])
    ).toBe(0)
  })
})

describe('buildExploreFieldQueries', () => {
  it('negates excluded filter queries and preserves included queries', () => {
    const filters: ExploreFilter[] = [
      {
        id: 'dashboard-country',
        label: 'Country: Canada',
        fieldQuery: 'government_s:CAN',
        value: 'CAN'
      },
      {
        id: 'ircc-status',
        label: 'Status: Active',
        fieldQuery:
          '((*:* NOT dateOfExpiry_dt:*) OR dateOfExpiry_dt:[NOW TO *])',
        value: 'active',
        excluded: true
      }
    ]

    expect(
      buildExploreFieldQueries(filters)
    ).toEqual([
      'government_s:CAN',
      '-(((*:* NOT dateOfExpiry_dt:*) OR dateOfExpiry_dt:[NOW TO *]))'
    ])
  })

  it('continues to omit requested filter ids', () => {
    const filters: ExploreFilter[] = [
      {
        id: 'dashboard-country',
        label: 'Country: Canada',
        fieldQuery: 'government_s:CAN',
        value: 'CAN'
      }
    ]

    expect(
      buildExploreFieldQueries(
        filters,
        ['dashboard-country']
      )
    ).toEqual([])
  })

  it('keeps an excluded filter active when a widget omits its own filter', () => {
    const filters: ExploreFilter[] = [
    {
      id: 'source-country',
      label: 'Source country: Canada',
      fieldQuery: 'sourceCountries_ss:CAN',
      value: 'CAN',
      excluded: true
    }
    ]

    expect(
    buildExploreFieldQueries(
      filters,
      ['source-country']
    )
    ).toEqual([
    '-(sourceCountries_ss:CAN)'
    ])
  })
})

describe('buildExploreSearchQuery', () => {
  it('combines included and excluded filters for Search raw-query', () => {
    const filters: ExploreFilter[] = [
      {
        id: 'dashboard-country',
        label: 'Country: Canada',
        fieldQuery: 'government_s:CAN',
        value: 'CAN'
      },
      {
        id: 'ircc-status',
        label: 'Status: Active',
        fieldQuery: 'dateOfExpiry_dt:[NOW TO *]',
        value: 'active',
        excluded: true
      }
    ]

    expect(
      buildExploreSearchQuery(filters)
    ).toBe(
      '(government_s:CAN) AND ' +
      '(*:* NOT (dateOfExpiry_dt:[NOW TO *]))'
    )
  })

  it('returns an empty query when there are no filters', () => {
    expect(
      buildExploreSearchQuery([])
    ).toBe('')
  })
})

describe('buildCpcsReceivedSearchQuery', () => {
  it('targets the received country without the included dashboard country filter', () => {
    const filters: ExploreFilter[] = [
      {
        id: 'dashboard-country',
        label: 'Country: France',
        fieldQuery: 'government_s:fr',
        value: 'fr'
      },
      {
        id: 'ircc-status',
        label: 'Status: Active',
        fieldQuery: 'dateOfExpiry_dt:[NOW TO *]',
        value: 'active',
        excluded: true
      }
    ]

    expect(
      buildCpcsReceivedSearchQuery(filters, 'FR')
    ).toBe(
      '(*:* NOT (dateOfExpiry_dt:[NOW TO *])) AND ' +
      '(sourceCountries_ss:fr)'
    )
  })

  it('preserves an excluded dashboard country filter', () => {
    const filters: ExploreFilter[] = [
      {
        id: 'dashboard-country',
        label: 'Country: France',
        fieldQuery: 'government_s:fr',
        value: 'fr',
        excluded: true
      }
    ]

    expect(
      buildCpcsReceivedSearchQuery(filters, 'FR')
    ).toBe(
      '(*:* NOT (government_s:fr)) AND ' +
      '(sourceCountries_ss:fr)'
    )
  })
})

describe('parseExploreFilters', () => {
  it('restores valid filter specs including exclusion state', () => {
    const filters: ExploreFilter[] = [
      {
        id: 'source-country',
        label: 'Source country: Canada',
        fieldQuery: 'sourceCountries_ss:CAN',
        value: 'CAN',
        excluded: true
      }
    ]

    expect(
      parseExploreFilters(
        JSON.stringify(filters)
      )
    ).toEqual(filters)
  })

  it('restores country-specific CPC type filters', () => {
    const filters: ExploreFilter[] = [
      {
        id: 'internal-external-cpc',
        label: 'CPC type: Internal',
        fieldQuery: 'sourceCountries_ss:fr',
        value: 'internal'
      }
    ]

    expect(
      parseExploreFilters(
        JSON.stringify(filters)
      )
    ).toEqual(filters)
  })

  it('ignores malformed or unsafe serialized filters', () => {
    expect(
      parseExploreFilters('{invalid')
    ).toEqual([])

    expect(
      parseExploreFilters(
        JSON.stringify([
          {
            id: 'source-country',
            label: 'Unsafe',
            fieldQuery: 'secret_s:*',
            value: 'CAN'
          },
          {
            id: 'unknown-filter',
            label: 'Unknown',
            fieldQuery: 'government_s:CAN',
            value: 'CAN'
          }
        ])
      )
    ).toEqual([])
  })

  it('allows Unicode terms but rejects Solr syntax outside the query grammar', () => {
    expect(
      parseExploreFilters(
        JSON.stringify([
          {
            id: 'user-country',
            label: 'User country: Côte d’Ivoire',
            fieldQuery:
              'entitiesToWhomPICGrantedCountries_EN_ss:"Côte d’Ivoire"',
            value: 'Côte d’Ivoire'
          },
          {
            id: 'user-country',
            label: 'Unsafe query',
            fieldQuery:
              'entitiesToWhomPICGrantedCountries_EN_ss:*; DROP',
            value: 'unsafe'
          }
        ])
      )
    ).toEqual([
      {
        id: 'user-country',
        label: 'User country: Côte d’Ivoire',
        fieldQuery:
          'entitiesToWhomPICGrantedCountries_EN_ss:"Côte d’Ivoire"',
        value: 'Côte d’Ivoire'
      }
    ])
  })
})
