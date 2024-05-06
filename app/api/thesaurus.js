
import ApiBase, { tryCastToApiError } from './api-base';

export default class ThesaurusApi extends ApiBase
{
  
  constructor(options) {
    super(options);
  }

  async getDomains(domainIdentifier, params)  {
    const data  =  await this.http.get(`/api/v2013/thesaurus/domains/${encodeURIComponent(domainIdentifier)}`,  { method:'get', params }) .then(res => res.data)
    .catch(tryCastToApiError);
                  
    return data;
  }

  async getDomainTerms(termIdentifier, params)  {
    const data  =  await this.http.get(`/api/v2013/thesaurus/domains/${encodeURIComponent(termIdentifier)}/terms`,  { method:'get', params }) .then(res => res.data)
    .catch(tryCastToApiError);
                  
    return data;
  }

  async getTerm(termIdentifier, params)  {
    const data  =  await this.http.get(`/api/v2013/thesaurus/terms/${encodeURIComponent(termIdentifier)}`,  { method:'get', params })
          .then(res => res.data)
          .catch(tryCastToApiError);
                  
    return data;
  }
}