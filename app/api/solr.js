import ApiBase, { tryCastToApiError } from './api-base';

export default class SolrApi extends ApiBase
{
    constructor(options) {
        super(options);
    }
    async query(params){
  
      const tags = await this.http.post(`api/v2013/index/select`, params)
                            .then(res => res.data)
                            .catch(tryCastToApiError);  
      return tags;
    }
}