const flattenedFields = computed(() => {
  const flatten = (obj, path = []) =>
    Object.entries(obj).reduce(
      (acc, [key, value]) =>
        typeof value === 'object' && !Array.isArray(value)
          ? [...acc, ...flatten(value, path.concat(key))]
          : [...acc, path.concat(key).join('.')],
      []
    )
  return flatten(importDataIRCC?.fields)
})

const mainHeaders = computed(() => {
  const flattenHeaders = (obj) => {
    const headers = []
    for (const key in obj) {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        headers.push({ label: key, colspan: Object.keys(obj[key]).length })
      } else {
        headers.push({ label: key, rowspan: 2 })
      }
    }
    return headers
  }
  return flattenHeaders(importDataIRCC?.fields)
})

const subHeaders = computed(() => {
  const flattenSubHeaders = (obj) => {
    const headers = []
    for (const key in obj) {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        for (const subKey in obj[key]) {
          headers.push({ label: subKey })
        }
      }
    }
    return headers
  }
  return flattenSubHeaders(importDataIRCC?.fields)
})
