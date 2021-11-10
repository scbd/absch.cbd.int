import ApiBase, { tryCastToApiError } from './api-base';

export default class ArticlesApi extends ApiBase
{
    async getRecords(params){
  
      const tags = await this.http.post(`api/v2013/index/select`, params)
                            .then(res => res.data)
                            .catch(tryCastToApiError);
  
      return tags
    }
}