import ApiBase, { tryCastToApiError } from './api-base';

export default class KmDocumentApi extends ApiBase
{
    constructor(options) {
        super(options);
    }

    async queryDocuments(params)  {
        return this.http.get(`api/v2013/documents/`, { params }).then(res => res.data).catch(tryCastToApiError);
    }
  
    async getDocument(identifier)  {
        return this.http.get(`api/v2013/documents/${identifier}`).then(res => res.data).catch(tryCastToApiError);
    }

    async getDocument(identifier)  {
        return this.http.get(`api/v2013/documents/${identifier}`).then(res => res.data).catch(tryCastToApiError);
    }

    async createTempAttachmentSlot(params){
        return this.http.post(`api/v2015/temporary-files`,params).then(res => res.data).catch(tryCastToApiError);
    }

    async uploadToTempSlot(slotUrl, file, contentType)  { 
        return this.http.put(slotUrl, file, {headers: { 'Content-Type': contentType }})
                        .then(res => res.data).catch(tryCastToApiError);
    }

    async persistTemporaryAttachment(identifier, guid, fileName)  {
        return this.http.post(`/api/v2013/documents/${encodeURIComponent(identifier)}/attachments/persist-temporary/${encodeURIComponent(guid)}`, {fileName})
            .then(res => res.data).catch(tryCastToApiError);
    }

}