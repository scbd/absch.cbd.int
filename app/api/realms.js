import ApiBase, { tryCastToApiError, stringifyUrlParams } from './api-base';
export default class RealmsApi extends ApiBase
{
  constructor(options) {
    super(options);
  }

  async getRealmConfigurations(realmEnvironment)  {
    const params = {
      q : {
        environment:realmEnvironment
      }
    }
    
    return this.http.get(`api/v2018/realm-configurations`,{ params }).then(res => res.data).catch(tryCastToApiError);
  }

  async getRealmConfiguration(realm)  {
    const params = {
      q : { realm }
    }

    return this.http.get(`api/v2018/realm-configurations`, { params })
               .then(res => {
                return res.data?.length ? res.data[0] : null
              })  
               .catch(tryCastToApiError);
  }

}