import axios from 'axios'
import { isFunction, isObject } from 'lodash'
import {useAuth} from '@scbd/angular-vue/src/index.js';

let sitePrefixUrl = 'https://api.cbd.int';

if(/\.cbd\.int$/i   .test(window.location.hostname)) sitePrefixUrl= 'https://api.cbd.int';
if(/\.cbddev\.xyz$/i.test(window.location.hostname)) sitePrefixUrl= 'https://api.cbddev.xyz';
if(/\localhost$/i   .test(window.location.hostname)) sitePrefixUrl= '/';

const cache          = new Map()
const defaultOptions = { prefixUrl: sitePrefixUrl, timeout  : 30 * 1000 }

const HttpStatusApiCode = {
  400: "invalidParameter",
  401: "unauthorized",
  403: "forbidden",
  404: "notFound",
  500: "internalServerError",
  501: "notImplemented",
}
export default class ApiBase
{
  constructor(options) { //{ tokenReader, prefixUrl, timeout, tokenType }

    options = options || {};
    // ToDo: weill find a better way to handle tokenReader
    // if(isFunction(options.tokenReader)) options = { tokenReader : options }
    if(isFunction(options)) options = { tokenReader : options }

    const { tokenReader, realm, prefixUrl, timeout, tokenType } = { ...defaultOptions, ...options }


    const baseConfig = {
      baseURL : prefixUrl,
      timeout,
      tokenType,
      tokenReader,
      realm
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

  const { tokenReader, realm, tokenType, ...config } = baseConfig || {}

  const headers = { ...(config.headers || {}) };
  //ToDo: we can remove await tokenReader() part
  if(tokenReader) {

    let token = '';
    if(isFunction(tokenReader)){
      const tokenDetails = await tokenReader();
      token = tokenDetails?.token ;
    }
    else {
      token = tokenReader?.token ;
    }

    if(token)
      headers.Authorization = `${tokenType||'Bearer'} ${token}`;
  }
  if(realm){
    headers.realm = realm;
  }

  return axios.create({ ...config, headers } );
}

//////////////////////////
// Helpers
////////////////////////

export function tryCastToApiError(error) {

  if(error?.response?.data?.code || error?.response?.data?.statusCode) {
      const apiError = error.response.data
      throw { cause: error, ...apiError };
  }

  if(error.response?.status && HttpStatusApiCode[error.response?.status]) {
    const { message } = error;
    const { status: statusCode } = error.response;
    const code = HttpStatusApiCode[statusCode];

    const craftedApiError = new Error(message, { cause: error });

    craftedApiError.code       = code;
    craftedApiError.statusCode = statusCode;

    throw craftedApiError;
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