import ApiBase, { tryCastToApiError } from './api-base';

export default class KmDocumentApi extends ApiBase
{
    constructor(options) {
        super(options);
    }

    async createTempAttachmentSlot(fileName, contentType){
        return this.http.post(`api/v2015/temporary-files`,{filename: fileName,contentType: contentType}).then(res => res.data).catch(tryCastToApiError);
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