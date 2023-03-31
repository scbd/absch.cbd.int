import axios from 'axios'
import { isFunction } from 'lodash'

let sitePrefixUrl = 'https://api.cbd.int';

if(/\.cbd\.int$/i   .test(window.location.hostname)) sitePrefixUrl= 'https://api.cbd.int';
if(/\.cbddev\.xyz$/i.test(window.location.hostname)) sitePrefixUrl= 'https://api.cbddev.xyz';
if(/\localhost$/i   .test(window.location.hostname)) sitePrefixUrl= '/';

const cache          = new Map()
const defaultOptions = { prefixUrl: sitePrefixUrl, timeout  : 30 * 1000, tokenReader: defaultTokenReader }

export default class ApiBase
{
  constructor(options) {

    options = options || {};

    if(isFunction(options)) options = { tokenReader : options }

    const { tokenReader, prefixUrl, timeout, tokenType } = { ...defaultOptions, ...options }


    const baseConfig = {
      baseURL : prefixUrl,
      timeout,
      tokenType,
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
}

async function loadAsyncHeaders(baseConfig) {

  const { tokenReader, tokenType, ...config } = baseConfig || {}

  const headers = { ...(config.headers || {}) };

  if(tokenReader) {
    const tokenDetails = await tokenReader();
    if(tokenDetails)
      headers.Authorization = `${tokenType||'Bearer'} ${tokenDetails.token}`;
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

export function mapObjectId(id){
  return isObjectId(id)? { $oid: id } : id
}

export function isObjectId(id){
  return /^[a-f0-9]{24}/i.test(id);
}

export function stringifyUrlParams(params){

  if(typeof(params) != 'object')
    return params;

  params = { ...params };

  const keys = Object.keys(params);

  for(let key of keys) {

    let val = params[key];

    if(val===null)      continue;
    if(val===undefined) continue;

    if(typeof(val)=='object') val = JSON.stringify(val);

    params[key] = val;
  }

  return params;
}

export function defaultTokenReader() {
  const token = window?.Vue?.prototype?.$auth?.strategy?.token?.get();
  return token;
}