
import axios from 'axios'
import { isFunction, isEmpty, cloneDeep } from 'lodash'

let sitePrefixUrl = 'https://api.cbd.int';

if(/\.cbd\.int$/i   .test(window.location.hostname)) sitePrefixUrl= 'https://api.cbd.int';
if(/\.cbddev\.xyz$/i.test(window.location.hostname)) sitePrefixUrl= 'https://api.cbddev.xyz';
if(/\localhost$/i   .test(window.location.hostname)) sitePrefixUrl= '/';

const cache          = new Map()
const defaultOptions = { prefixUrl: sitePrefixUrl, timeout  : 30 * 1000 }

export default class ArticlesApi
{
  constructor(options) {

    options = options || {};

    if(isFunction(options)) options = { tokenReader : options }

    const { tokenReader, prefixUrl, timeout, tokenType } = { ...defaultOptions, ...options }


    const baseConfig = {
      baseURL : prefixUrl,
      timeout,
      tokenReader
    }

    const http = async function (...args) {
      return (await loadAsyncHeaders(baseConfig))(...args);
    }

    http.get     = async (...args)=> (await loadAsyncHeaders(baseConfig)).get    (...args);
    http.head    = async (...args)=> (await loadAsyncHeaders(baseConfig)).head   (...args);
    http.post    = async (...args)=> (await loadAsyncHeaders(baseConfig)).post   (...args);
    http.put     = async (...args)=> (await loadAsyncHeaders(baseConfig)).put    (...args);
    http.patch   = async (...args)=> (await loadAsyncHeaders(baseConfig)).patch  (...args);
    http.delete  = async (...args)=> (await loadAsyncHeaders(baseConfig)).delete (...args);
    http.options = async (...args)=> (await loadAsyncHeaders(baseConfig)).options(...args);
    http.request = async (...args)=> (await loadAsyncHeaders(baseConfig)).request(...args);

    this.http = http;
  }

  async queryArticleGroup(groupKey, params)  {
    return this.http.get(`api/v2017/articles/grouping/${groupKey}`, { params }).then(res => res.data).catch(tryCastToApiError);
  }

  async queryArticles(params)  {
    return this.http.get(`api/v2017/articles`, { params }).then(res => res.data).catch(tryCastToApiError);
  }

  async getArticleById(id)  {

    return this.http.get(`api/v2017/articles/${id}`).then(res => res.data).catch(tryCastToApiError);
  }

  async getArticlesByTag(tag, options={})  {

    const q = { tag : tag };

    return this.queryArticles({...options, q, fo: 1 });
  }

  async getArticleAdminTags(params){

    const tags = await this.http.get(`api/v2021/article-admin-tags`, { params }).then(res => res.data).catch(tryCastToApiError);

    return tags
  }

}

async function loadAsyncHeaders(baseConfig) {

  const { tokenReader, tokenType, ...config } = { ...baseConfig };

  const headers = { ...(config.headers || {}) };

  if(tokenReader) {
    const token = await tokenReader();
    headers.Authorization = `${tokenType||'Token'} ${token}`;
  }

  return axios.create({ ...config, headers } );
}


//////////////////////////
// Helpers
////////////////////////

export function tryCastToApiError(error) {

  if(error && error.response && error.response.data && error.response.data.code) {
      const apiError = error.response.data
      throw error.response.data;
  }

  throw error
}
