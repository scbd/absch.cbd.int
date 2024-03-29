
import ApiBase, { tryCastToApiError, stringifyUrlParams } from './api-base';

export default class PortalApi extends ApiBase
{
  constructor(options) {
    super(options);
  }
  
  async queryPortals(params)  {

    params = stringifyUrlParams(params);

    return this.http.get(`api/v2023/portals`, { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async getPortalByCode(realm, slug) { 

    const q = { 
      slug, 
      realms: realm 
    };

    const [ portal ] = await this.queryPortals({ q })

    if(!portal) throw { code:'notFound', statusCode: 404, message: "not found" };

    return portal;
  }  

}
