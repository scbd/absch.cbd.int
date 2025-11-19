
import ApiBase, { tryCastToApiError } from './api-base';

const cacheKey = 'thesaurus'
const cache    = initStorage(cacheKey);
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

    if(cache[termIdentifier])
        return cache[termIdentifier];

    cache[termIdentifier]  = this.http.get(`/api/v2013/thesaurus/domains/${encodeURIComponent(termIdentifier)}/terms`,  { method:'get', params }) 
                                    .then(res =>{
                                      cache[termIdentifier] = res.data;
                                      addToStorage(cacheKey, cache)
                                      return cache[termIdentifier];
                                    })
                                    .catch(tryCastToApiError);
    
    // await cache[termIdentifier];

    return cache[termIdentifier];
  }

  async getTerm(termIdentifier, params)  {

    if(cache[termIdentifier])
      return cache[termIdentifier];

    cache[termIdentifier]  = this.http.get(`/api/v2013/thesaurus/terms/${encodeURIComponent(termIdentifier)}`,  { method:'get', params }) 
                                  .then(res =>{
                                    cache[termIdentifier] = res.data;
                                    addToStorage(cacheKey, cache)
                                    return cache[termIdentifier];
                                  })
                                  .catch(tryCastToApiError);

    return cache[termIdentifier];
  }

  async getNarrowerTerms(termCode, {immediate = false, domainCode = undefined} = {})  {

    if(cache[termCode])
        return cache[termCode];

    cache[termCode]  = this.http.get(`/api/v2013/thesaurus/terms/${encodeURIComponent(termCode)}/narrowers`,  
                                { method:'GET',   params: { immediate, domain: domainCode } }) 
                                    .then(res =>{
                                      cache[termCode] = res.data;
                                      addToStorage(cacheKey, cache)
                                      return cache[termCode];
                                    })
                                    .catch(tryCastToApiError);
    
    return cache[termCode];
  }

}

function initStorage(key){
  if (typeof(Storage) !== "undefined") {
    return JSON.parse(localStorage.getItem(key) || "{}")     
  }

  return {}
}
function addToStorage(key, cache){    
  localStorage.setItem(key, JSON.stringify(cache));
}