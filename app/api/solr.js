import ApiBase, { tryCastToApiError ,stringifyUrlParams} from './api-base';

export default class SolrApi extends ApiBase
{
    constructor(options) {
        super(options);
    }
    //ToDo: rename to postQuery as we can't use two methods with the same name
    async query(params){
  
      const tags = await this.http.post(`api/v2013/index/select`, params)
                            .then(res => res.data)
                            .catch(tryCastToApiError);  
      return tags;
    }



    async query({ searchField, fieldQueries, query, sort, fields, start, rowsPerPage } = {}) {

      const params = stringifyUrlParams( { 
          df: searchField? searchField:'text_EN_txt',
          fq: fieldQueries,
          q: query,
          sort: this.localizeFields(sort),
          fl: this.localizeFields(fields),
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

    async getOwnerRealm(identifier){

        var queryListParameters = {
            fq    : ["_state_s:public", "realm_ss:*"],
            q     : `identifier_s:${identifier}`,
            fl    : 'ownerRealm_s'
        };

        return this.http.post(`api/v2013/index/select`, queryListParameters)
               .then(response => {
                  return response?.data?.response?.docs?.[0]?.ownerRealm_s;
                })  
                .catch(tryCastToApiError);
    }
  
}