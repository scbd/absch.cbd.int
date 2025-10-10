import ApiBase, { tryCastToApiError } from './api-base';

export default class KmDocumentApi extends ApiBase
{
    constructor(options) {
        super(options);
    }

    async queryDocuments(params)  {
        return this.http.get(`api/v2013/documents/`, { params }).then(res => res.data).catch(tryCastToApiError);
    }
  
    async getDocument(identifier, {includeDeleted, info, body})  {
        const params = { info, body };
        if(includeDeleted)
            params['include-deleted'] = includeDeleted;

        return this.http.get(`api/v2013/documents/${identifier}`, { params })
                .then(res => res.data)
                .catch(tryCastToApiError);
    }

}