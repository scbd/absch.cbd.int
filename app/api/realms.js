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

  async getOwnerRealm(identifier){

        var queryListParameters = {
            fq    : ["_state_s:public", "realm_ss:*"],
            q     : `identifier_s:${identifier}`,
            fl    : 'ownerRealm_s'
        };

        return this.http.post(`api/v2013/index/select`, queryListParameters)
               .then(response => {
                  return response?.data?.response?.docs?.[0].ownerRealm_s;
                })  
                .catch(tryCastToApiError);
  }

  async  validateRealmEnvironment(ownerRealmName, currentRealmName, environment) {
    if (ownerRealmName && currentRealmName && environment) {
        // Get the owner realm configuration
        const ownerRealmConfig = await this.getRealmConfiguration(ownerRealmName);
        const ownerEnvironment = ownerRealmConfig.environment;
        // Verify if the owner realm has different name and same environment
        if (ownerRealmName && ownerRealmName !== currentRealmName &&	ownerEnvironment === environment) {
          return true
        }
      }
      return false
  }
}