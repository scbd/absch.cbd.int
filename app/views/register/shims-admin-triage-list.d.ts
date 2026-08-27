declare module '~/services/datetime.js' {
  export function formatDate (date: string | number | Date): string
  export function formatDateShort (date: string | number | Date): string
}

declare module '~/services/filters/lstring.js' {
  export function lstring (value: unknown, locale?: string): string
}

// No @types/bootstrap in this project (see app/components/reports/abs/nr1-analysis.vue,
// which sidesteps this with @ts-nocheck) — minimal shim for the Tooltip surface used here.
declare module 'bootstrap' {
  export class Tooltip {
    constructor (element: Element, options?: { container?: string, boundary?: Element, trigger?: string, html?: boolean, placement?: string })
    dispose (): void
    static getInstance (element: Element): Tooltip | null
  }
}

declare module '~/services/solr/queries.js' {
  export function escape (value: unknown): string | undefined
}

declare module '~/components/common/pagination.vue' {
  import type { DefineComponent } from 'vue'
  const pagination: DefineComponent<Record<string, unknown>>
  export default pagination
}

declare module '~/api/workflows' {
  interface WorkflowQueryOptions {
    query?: unknown
    count?: boolean
    length?: number
    skip?: number
    sort?: Record<string, number>
    fields?: unknown
  }

  interface WorkflowFacetOptions {
    query?: unknown
    fields: string[]
  }

  export default class WorkflowsApi {
    constructor (options?: { tokenReader?: ()=> Promise<string | undefined>; realm?: string })
    getWorkflow (id: string): Promise<unknown>
    queryWorkflows<T> (options: WorkflowQueryOptions): Promise<T>
    getWorkflowFacets<T> (options: WorkflowFacetOptions): Promise<T>
  }
}

declare module '~/api/solr' {
  interface SolrQueryOptions {
    searchField?: string
    fieldQueries?: string[]
    query?: string
    sort?: string
    fields?: string
    start?: number
    rowsPerPage?: number
  }

  interface SolrDocument {
    identifier_s?: string
    symbol_s?: string
    title_s?: string
  }

  interface SolrQueryResult {
    response?: { docs?: SolrDocument[], numFound?: number }
  }

  export default class SolrApi {
    constructor (options?: unknown)
    query (options: SolrQueryOptions): Promise<SolrQueryResult>
  }
}

declare module '~/components/scbd-angularjs-services/services/utilities.js' {
  export function documentIdWithoutRevision (identifier: string): string
}
