interface FilterItem {
  __value: string;
  [key: string]: any;
}

interface MappingItem {
  identifier: any;
  [key: string]: any;
}

export function genericFilter ($query: string, items: FilterItem[] | undefined): FilterItem[] | undefined {
  if (!items) {
    return
  }
  const lowerCaseQuery = $query.toLowerCase()
  return items.filter(item => item.__value.toLowerCase().indexOf(lowerCaseQuery) !== -1)
}

export function genericMapping (item: MappingItem) {
  return { identifier: item.identifier }
}
