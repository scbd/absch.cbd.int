import ApiBase, { tryCastToApiError, stringifyUrlParams } from './api-base';
import solrApi from './solr';
export default class RealmsApi extends ApiBase
{
  constructor(options) {
    super(options);
    this.solrApi = new solrApi({});
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

    var solrQuery = {
      fieldQueries: ["_state_s:public", "realm_ss:*"],
      query       : `identifier_s:${identifier}`,
      fields      : 'ownerRealm_s'
    };

    const data = await this.solrApi.query(solrQuery);
    return data?.response.docs?.[0]?.ownerRealm_s;
  }

}