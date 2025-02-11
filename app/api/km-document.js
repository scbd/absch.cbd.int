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
    //ToDo: will update as per API requirement.

    async saveTags(params)  {
        return this.http.post(`api/v2025/tagging/km-documents/`, params)
                .then(res => res.data).catch(tryCastToApiError);
    }
    async getDocumentTagsById(id, params)  {
        const adminTags = ["finding-information", "submitting-information", "monitoring"];
        return adminTags ;
        // return this.http.get(`api/v2025/tagging/km-documents/`, {params}).then(res => res.data).catch(tryCastToApiError);
    }
    async getDocumentTags(params)  {
        const adminTags = ["about","getting-started", "finding-information", "submitting-information", "monitoring"];
        return adminTags ;
        // return this.http.get(`api/v2025/tagging/km-documents/`, {params}).then(res => res.data).catch(tryCastToApiError);
    }
}