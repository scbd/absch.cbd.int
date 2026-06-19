import ApiBase, { tryCastToApiError } from './api-base'
import type { EHeader } from '~/types/api/EHeader'

interface DocumentJson {
  header: EHeader;
  [key: string]: unknown;
}

interface QueryOptions {
  $filter?: string;
  $top?: number;
  $skip?: number;
  $orderby?: string;
}

interface GetOptions {
  info?: string;
  body?: string;
}

interface SecurityOptions {
  government?: string;
}

// TODO delete this class and use KmDocumentsApi instead, which has more complete functionalities for documents management (drafts, securities, validation...)
export default class KmDocumentApi extends ApiBase {
  async queryDocuments (params: Record<string, unknown>): Promise<unknown> {
    return await this.http.get('api/v2013/documents/', { params }).then(res => res.data as unknown).catch(tryCastToApiError)
  }

  async getDocument (identifier: string): Promise<unknown> {
    return await this.http.get(`api/v2013/documents/${identifier}`).then(res => res.data as unknown).catch(tryCastToApiError)
  }

  async createDoc (documentJson: DocumentJson, isDraft: boolean): Promise<unknown> {
    const { header: { identifier, schema } } = documentJson
    let url = `api/v2013/documents/${identifier}`
    if (isDraft) {
      url = `${url}/versions/draft`
    }

    return await this.http.put(url, documentJson, { params: { schema } })
  }

  async createDocumentDraft (documentJson: DocumentJson): Promise<unknown> {
    return await this.createDoc(documentJson, true)
  }

  async createDocument (documentJson: DocumentJson): Promise<unknown> {
    return await this.createDoc(documentJson, false)
  }
}

const serviceUrls = {
  documentQueryUrl  () { return 'api/v2013/documents/' },
  documentUrl       (identifier: string) { return `api/v2013/documents/${encodeURIComponent(identifier)}` },
  validateUrl       () { return 'api/v2013/documents/x/validate' },
  draftUrl          (identifier: string) { return `api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft` },
  securityUrl       (identifier: string, operation: string) { return `api/v2013/documents/${encodeURIComponent(identifier)}/securities/${encodeURIComponent(operation)}` },
  draftSecurityUrl  (identifier: string, operation: string) { return `api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft/securities/${encodeURIComponent(operation)}` },
  publishDraftUrl   (schema: string, identifier: string) { return `/api/v2023/documents/schemas/${encodeURIComponent(schema)}/${encodeURIComponent(identifier)}` }
}

export class KmDocumentsApi extends ApiBase {
  async query (collection: string, { $filter, $top, $skip, $orderby }: QueryOptions = {}): Promise<unknown> {
    const params = { collection: collection === '' ? 'my' : collection, $filter, $top, $skip, $orderby }
    return await this.http.get(serviceUrls.documentQueryUrl(), { params })
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }

  async get (identifier: string, { info, body, includeDeleted }: GetOptions & { includeDeleted?: boolean } = {}): Promise<unknown> {
    const params = { info, body, 'include-deleted': includeDeleted }
    return await this.http.get(serviceUrls.documentUrl(identifier), { params })
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }

  async exists (identifier: string): Promise<boolean> {
    await this.http.head(serviceUrls.documentUrl(identifier))
      .catch(tryCastToApiError)
    return true
  }

  async put (identifier: string, body: object, schema: string): Promise<unknown> {
    return await this.http.put(serviceUrls.documentUrl(identifier), body, { params: { schema } })
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }

  async delete (identifier: string): Promise<unknown> {
    return await this.http.delete(serviceUrls.documentUrl(identifier))
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }

  async validate (body: DocumentJson, schema?: string): Promise<unknown> {
    const params = { schema: schema !== '' && schema !== undefined ? schema : body.header.schema, identifier: body.header.identifier }
    return await this.http.put(serviceUrls.validateUrl(), body, { params })
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }

  async canCreate (identifier: string, schema: string, { government }: SecurityOptions = {}): Promise<unknown> {
    const params = { metadata: JSON.stringify({ schema, government }) }
    return await this.http.get(serviceUrls.securityUrl(identifier, 'create'), { params })
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }

  async canUpdate (identifier: string, schema: string, { government }: SecurityOptions = {}): Promise<unknown> {
    const params = { metadata: JSON.stringify({ schema, government }) }
    return await this.http.get(serviceUrls.securityUrl(identifier, 'update'), { params })
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }

  async canDelete (identifier: string, schema: string, { government }: SecurityOptions = {}): Promise<unknown> {
    const params = { metadata: JSON.stringify({ schema, government }) }
    return await this.http.get(serviceUrls.securityUrl(identifier, 'delete'), { params })
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }
}

export class KmDraftsApi extends ApiBase {
  async query (collection: string, { $filter, $top, $skip, $orderby, info, body }: QueryOptions & GetOptions = {}): Promise<unknown> {
    const params = { collection: collection === '' ? 'mydraft' : collection, $filter, $top, $skip, $orderby, info, body }
    return await this.http.get(serviceUrls.documentQueryUrl(), { params })
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }

  async get (identifier: string, { info, body }: GetOptions = {}): Promise<unknown> {
    const params = { info, body }
    return await this.http.get(serviceUrls.draftUrl(identifier), { params })
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }

  async exists (identifier: string): Promise<boolean> {
    await this.http.head(serviceUrls.draftUrl(identifier))
      .catch(tryCastToApiError)
    return true
  }

  async validate (body: DocumentJson, schema?: string): Promise<unknown> {
    const params = { schema: schema !== '' && schema !== undefined ? schema : body.header.schema, identifier: body.header.identifier }
    return await this.http.put(serviceUrls.validateUrl(), body, { params })
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }

  async publishDraft (schema: string, identifier: string, document: object,
    options: { additionalInfo: string; isNew?: boolean } = { additionalInfo: '' }): Promise<unknown> {
    const body = { document, additionalInfo: options.additionalInfo }
    const url = serviceUrls.publishDraftUrl(schema, identifier)
    return await (options.isNew === true ? this.http.post(url, body) : this.http.put(url, body))
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }

  async saveDraft (identifier: string, body: object, schema: string): Promise<unknown> {
    return await this.http.put(serviceUrls.draftUrl(identifier), body, { params: { schema } })
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }

  //   async createDocumentDraft (documentJson: DocumentJson): Promise<unknown> {
  //     const { header: { identifier, schema } } = documentJson
  //     return await this.saveDraft(identifier, documentJson, schema)
  //   }

  async getDocument (identifier: string): Promise<unknown> {
    return await this.http.get(serviceUrls.documentUrl(identifier))
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }

  async delete (identifier: string): Promise<unknown> {
    return await this.http.delete(serviceUrls.draftUrl(identifier))
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }

  async canCreate (identifier: string, schema: string, { government }: SecurityOptions = {}): Promise<unknown> {
    const params = { metadata: JSON.stringify({ schema, government }) }
    return await this.http.get(serviceUrls.draftSecurityUrl(identifier, 'create'), { params })
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }

  async canUpdate (identifier: string, schema: string, { government }: SecurityOptions = {}): Promise<unknown> {
    const params = { metadata: JSON.stringify({ schema, government }) }
    return await this.http.get(serviceUrls.draftSecurityUrl(identifier, 'update'), { params })
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }

  async canDelete (identifier: string, schema: string, { government }: SecurityOptions = {}): Promise<unknown> {
    const params = { metadata: JSON.stringify({ schema, government }) }
    return await this.http.get(serviceUrls.draftSecurityUrl(identifier, 'delete'), { params })
      .then(res => res.data as unknown)
      .catch(tryCastToApiError)
  }
}
