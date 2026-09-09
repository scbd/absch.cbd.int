declare module '~/services/datetime.js' {
  export function formatDate (date: string | number | Date): string
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

  export default class WorkflowsApi {
    constructor (options?: { tokenReader?: ()=> Promise<string | undefined>; realm?: string })
    getWorkflow (id: string): Promise<unknown>
    queryWorkflows<T> (options: WorkflowQueryOptions): Promise<T>
  }
}
