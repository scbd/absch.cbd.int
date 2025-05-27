import ApiBase, { tryCastToApiError, stringifyUrlParams } from './api-base';
export default class RealmsApi extends ApiBase
{
  constructor(options) {
    super(options);
  }

  async getRealmConfigurations(realmEnvironment)  {
    const params = stringifyUrlParams({
      q : {
        environment:realmEnvironment
      }
    })
    
    return this.http.get(`api/v2018/realm-configurations`,{ params }).then(res => res.data).catch(tryCastToApiError);
  }

  async getRealmConfiguration(realm)  {
    const params = stringifyUrlParams({
      q : { realm:realm?.toUpperCase() },
    })
    //TODO: implement fo:1 on realm configurations api!
    return this.http.get(`api/v2018/realm-configurations`, { params })
               .then(res => {
                  if(res.data?.length== 1)
                    return res.data[0]
                })  
               .catch(tryCastToApiError);
  }

}