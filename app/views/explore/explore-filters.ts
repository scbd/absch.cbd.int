export type ExploreFilterValue =
  | string
  | number
  | boolean

export interface ExploreFilter {
  id: string
  label: string
  fieldQuery: string
  value: ExploreFilterValue
}

export interface ExploreFilterChange {
  id: string
  filter: ExploreFilter | null
}

export function buildExploreFieldQueries (
  filters: readonly ExploreFilter[],
  excludedFilterIds: readonly string[] = []
): string[] {
  return filters
    .filter(({ id }) =>
      !excludedFilterIds.includes(id)
    )
    .map(({ fieldQuery }) => fieldQuery)
}
