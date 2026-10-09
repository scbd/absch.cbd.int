declare module '~/api/solr.js' {
  interface SolrQueryOptions {
    searchField?: string
    fieldQueries?: string[]
    query?: string
    sort?: string
    fields?: string
    start?: number
    rowsPerPage?: number
    facetFields?: string
    facetPivot?: string
    facetLimit?: number
    facetMinCount?: number
    facetSort?: string
  }

  interface SolrQueryResponse {
    response: {
      numFound: number
    }
    facet_counts?: {
      facet_fields?: Record<string, unknown>
      facet_pivot?: Record<string, unknown>
    }
  }

  export default class SolrApi {
    query (
      options?: SolrQueryOptions
    ): Promise<SolrQueryResponse>
  }
}

declare module '~/services/composables/commonjs.js' {
  interface ExploreCommonjsService {
    getCountries: ()=> unknown
    getRegions: ()=> unknown
  }

  export function useCommonjs (): ExploreCommonjsService
}
