import ApiBase, { tryCastToApiError } from './api-base';

export default class KmDocumentApi extends ApiBase
{
    async queryDocuments(params)  {
        return this.http.get(`api/v2013/documents/`, { params }).then(res => res.data).catch(tryCastToApiError);
    }

    async getDocument(identifier)  {
        return this.http.get(`api/v2013/documents/${identifier}`).then(res => res.data).catch(tryCastToApiError);
    }

    async createDoc(documentJson, isDraft) {
      const { identifier, schema} = documentJson.header
      let url = `api/v2013/documents/${identifier}`
      if (isDraft) {
        url = `${url}/versions/draft`
      }

      return this.http.put(url, documentJson, { params: { schema } })
    }

    async createDocumentDraft(documentJson) {
      return this.createDoc(documentJson, true)
    }

    async createDocument(documentJson) {
      return this.createDoc(documentJson, false)
    }
}
