import ApiBase, { tryCastToApiError } from './api-base';

export default class DocumentShareApi extends ApiBase
{
    constructor(options) {
        super(options);
    }

    async querySharedDocuments(params)  {
        return this.http.get(`api/v2018/document-sharing`, { params }).then(res => res.data).catch(tryCastToApiError);
    }

    async getSharedDocument(id, params)  {
        return this.http.get(`api/v2018/document-sharing/${id}`, {params}).then(res => res.data).catch(tryCastToApiError);
    }

    async shareDocument(params, grecaptchaToken)  {
        return this.http.post(`api/v2018/document-sharing`,params, { headers: {'x-captcha-v2-badge-token':grecaptchaToken}})
                   .then(res => res.data).catch(tryCastToApiError);
    }

    async anonShareDocument(params, grecaptchaToken)  {
        return this.http.post(`api/v2018/document-sharing/anon-sharing`, params,{ headers: {'x-captcha-v2-badge-token':grecaptchaToken}})
                   .then(res => res.data).catch(tryCastToApiError);
    }
    
}