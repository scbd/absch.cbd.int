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

}