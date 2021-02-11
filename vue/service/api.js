
import ky from 'ky'
//

const globals = { http: undefined }
const defaultOptions = { prefixUrl: 'https://api.cbd.int', timeout  : 30 * 1000 } //https://api.cbd.int 'https://api.cbddev.xyz' 'http://localhost:8000'
export const addApiOptions = (options = {}) => {
  const { tokenReader, prefixUrl, timeout } = { ...defaultOptions, ...options }
  const   hooks                             = tokenReader? { beforeRequest: [ async (request) => { request.headers.set('Authorization', `Token ${await tokenReader()}`); }, ], } : ''
  const   kyOptions                         = hooks? { prefixUrl, timeout, hooks } : { prefixUrl, timeout }

  globals.http    = ky.create(kyOptions)

  return globals.http
}

addApiOptions()

function toURLSearchParams(params) {
  if (!params) return undefined;

  const urlEncodedUrlParams = {};
  const paramKeys           = Object.keys(params);

  paramKeys.forEach((key) => {
    let value = params[key];

    if (value instanceof Object) value = JSON.stringify(value, null, '');
    else if (value instanceof Date) value = value.toISOString();

    urlEncodedUrlParams[key] = value;
  });

  return new URLSearchParams(urlEncodedUrlParams);
}