import ApiBase, { tryCastToApiError} from './api-base';

export default class SolrApi extends ApiBase
{
    constructor(options) {
        super(options);
    }
    
    async query({ searchField, fieldQueries, query, sort, fields, start, rowsPerPage, facetFields, facetLimit, facetMinCount, facetSort } = {}) {

      const params = ( { 
          df: searchField? searchField:'text_EN_txt',
          fq: fieldQueries,
          q: query,
          sort: this.localizeFields(sort),
          fl: this.localizeFields(fields),
          facet: facetFields ? true : undefined,
          'facet.field': facetFields,
          'facet.limit': facetLimit,
          'facet.mincount': facetMinCount,
          'facet.sort': facetSort,
          wt: 'json',   
          start: start? start : 0,
          rows: rowsPerPage? rowsPerPage: 25,
      })
  
      return this.http.get(`/api/v2013/index/select`, { params })
                      .then(res => res.data)
                      .catch(tryCastToApiError);
  
    }

    localizeFields(fields, locale) {
      if (!fields)
        return;
  
      if (locale && locale != 'en') {
        return fields.replace(/_EN/ig, '_' + (locale || 'en').toUpperCase())
      }
  
      return fields;
    }
  
}