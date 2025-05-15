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
}