import ApiBase from './api-base'

const { http } = new ApiBase()

export async function getCountries (sort, locale) {
  const sortField = sort || 'name.' + (locale ?? 'en')
  const sortBy = {}

  sortBy[sortField] = 1
  return await http.get('/api/v2013/countries', {
    cache: true, params: { s: sortBy }
  }).then((response) => response.data)
}

export async function getCountry (code) {
  return await http.get(`/api/v2013/countries/${code.toUpperCase()}`, { cache: true })
    .then((response) => response.data)
}
