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
    async saveTags(UID, params)  {
        return this.http.put(`api/v2025/tagging/documents/${UID}/tags`, params)
                .then(res => res.data).catch(tryCastToApiError);

        /*
        GET     /path/to/documents/:id/tags // list of tags
        PUT     /path/to/documents/:id/tags/:tagName //ADD
        DELETE  /path/to/documents/:id/tags/:tagName //remove
        
        */
    }
    async getDocumentTags(identifier)  {
        return ["finding-information", "submitting-information", "monitoring"]; // for testing only, will remove 
        // return this.http.get(`api/v2025/tagging/km-documents/${identifier}`).then(res => res.data).catch(tryCastToApiError);
    }

    // this is already in articles.js, and article-api.js do we need it, or use from there
    async getAdminTags(params){
        return await this.http.get(`api/v2021/article-admin-tags`, { params }).then(res => res.data).catch(tryCastToApiError);
    }

    async getDocumentsWithTags(params){
        return [
            { "identifier": "xyz-abc-123", "title": "Sample Title 1", "schema":"Capacity Development Initiatives (CDI)",  "adminTags": ["Submit", "Home", "Info", "Intro", "CHM", "BCH", "ABSCH", "ZYX", "TEST", "HUMPTY", "DUMPTY"] },
            { "identifier": "xyz-abc-123", "title": "Sample Title 2", "schema":"Capacity Development Initiatives (CDI)", "adminTags": ["Info", "Intro"] },
            { "identifier": "xyz-abc-123", "title": "Sample Title 3", "schema":"Capacity Development Initiatives (CDI)", "adminTags": ["BCH", "CHM"] }
          ]        
        // return await this.http.get(`api/v2021/article-admin-tags`, { params }).then(res => res.data).catch(tryCastToApiError);
    }

}