
import axios from 'axios'
import { isFunction } from 'lodash'

import ApiBase, { tryCastToApiError } from '../../api/api-base';
let sitePrefixUrl = 'https://api.cbd.int';

if(/\.cbd\.int$/i   .test(window.location.hostname)) sitePrefixUrl= 'https://api.cbd.int';
if(/\.cbddev\.xyz$/i.test(window.location.hostname)) sitePrefixUrl= 'https://api.cbddev.xyz';
if(/\localhost$/i   .test(window.location.hostname)) sitePrefixUrl= '/';

const cache          = new Map()
const defaultOptions = { prefixUrl: sitePrefixUrl, timeout  : 30 * 1000 }

export default class ArticlesApi extends ApiBase
{
   constructor(options) {
    super(options);
  }

  async queryArticleGroup(groupKey, params)  {
    return this.http.get(`api/v2017/articles/grouping/${groupKey}`, { params }).then(res => res.data).catch(tryCastToApiError);
  }

  async queryArticles(params, options)  {
    options = options || {};
    return this.http.get(`api/v2017/articles`, { params, ...options }).then(res => res.data).catch(tryCastToApiError);
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

  async getRecords(params){

    const tags = await this.http.post(`api/v2013/index/select`, params).then(res => res.data).catch(tryCastToApiError);

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


 
