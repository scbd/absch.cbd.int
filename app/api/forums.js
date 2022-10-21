
import ApiBase, { tryCastToApiError, stringifyUrlParams } from './api-base';

export default class ForumsApi extends ApiBase
{
  constructor(options) {
    super(options);
  }
  
  async queryForums(params)  {

    params = stringifyUrlParams(params);

    return this.http.get(`api/v2014/discussions/forums`, { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
  async getForum(id)  {

    return this.http.get(`api/v2014/discussions/forums/${encodeURIComponent(id)}`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
}
