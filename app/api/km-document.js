import ApiBase, { tryCastToApiError } from './api-base';

export default class KmDocumentApi extends ApiBase
{
    async queryDocuments(params)  {
        return this.http.get(`api/v2013/documents/`, { params }).then(res => res.data).catch(tryCastToApiError);
    }

    async getDocument(identifier)  {
        return this.http.get(`api/v2013/documents/${identifier}`).then(res => res.data).catch(tryCastToApiError);
    }

    // TODO: All for the creation of both draft and published documents
    async createDocument(documentJson) {
      const { identifier, schema} = documentJson.header
      const url = `api/v2013/documents/${identifier}/versions/draft`
      return this.http.put(url, documentJson, { params: { schema } })
    }
}
