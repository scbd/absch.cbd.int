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

        /*
        GET     /path/to/documents/:id/tags // list of tags
        PUT     /path/to/documents/:id/tags/:tagName //ADD
        DELETE  /path/to/documents/:id/tags/:tagName //remove
        
        */
    }
    async getDocumentTags(UID)  { 
        const adminTags = ["finding-information", "submitting-information", "monitoring"];
        return adminTags ;
        // return this.http.get(`api/v2025/tagging/km-documents/UID`, {params}).then(res => res.data).catch(tryCastToApiError);
    }

    async getAdminTags(params)  { // getAdminTags, 
        // f: {"title":1}
        // l: 100
        // q: {"title":{"$$startsWith":"a"}}
        // sk: 0
        return this.http.get(`api/v2021/article-admin-tags`, {params}).then(res => res.data).catch(tryCastToApiError);
    }
}