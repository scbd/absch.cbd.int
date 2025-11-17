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

    // TODO: Remove this from here and use proper service file
    async getKeyword(identifier) {
      const url = `/api/v2013/thesaurus/domains/${identifier}/terms`
      return this.http.get(url)
    }

    // TODO: Remove this from here and use proper service file
    async getKeywords() {
      const url = `/api/v2013/thesaurus/domains`
      return this.http.get(url)
    }

    // TODO: Remove this from here and fetch this information using an existing service
    async getLanguages() {
      const url = `http://localhost:2010/api/v2013/thesaurus/domains/52AFC0EE-7A02-4EFA-9277-8B6C327CE21F/terms`
      return this.http.get(url)
    }
}
