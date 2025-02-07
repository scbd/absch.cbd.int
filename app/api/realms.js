import ApiBase, { tryCastToApiError, stringifyUrlParams } from './api-base';

export default class RealmsApi extends ApiBase
{
  constructor(options) {
    super(options);
  }

  async fetchRealmConfigurations()  {

    const isTraining = /\/\/[^\/]*training[^\/]*\.cbd\.int/.test(window.location.href);

    return await this.http.get(`${window.scbdApp.apiUrl}/api/v2018/realm-configurations/`)
        .then(function (response) {
            let realms = response.data;                                 
            if (isTraining) {  
                realms = realms.filter(realm => realm.environment === "training");
            } else {
                realms = realms.filter(realm => realm.environment !== "training");
            }

            return realms;
        })
        .catch(function (error) {
            console.error("Error fetching realm configuration:", error);
            return null;
        });
    };

}