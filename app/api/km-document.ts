import ApiBase, { tryCastToApiError } from './api-base';

interface DocumentHeader {
    identifier: string;
    schema:     string;
}

interface DocumentJson {
    header: DocumentHeader;
    [key: string]: unknown;
}

interface QueryOptions {
    $filter?:  string;
    $top?:     number;
    $skip?:    number;
    $orderby?: string;
}

interface GetOptions {
    info?:   string;
    body?:   string;
}

interface SecurityOptions {
    government?: string;
}

//TODO delete this class and use KmDocumentsApi instead, which has more complete functionalities for documents management (drafts, securities, validation...)
export default class KmDocumentApi extends ApiBase
{
    async queryDocuments(params: Record<string, unknown>): Promise<any> {
        return this.http.get(`api/v2013/documents/`, { params }).then(res => res.data).catch(tryCastToApiError);
    }

    async getDocument(identifier: string): Promise<any> {
        return this.http.get(`api/v2013/documents/${identifier}`).then(res => res.data).catch(tryCastToApiError);
    }

    async createDoc(documentJson: DocumentJson, isDraft: boolean): Promise<any> {
      const { identifier, schema} = documentJson.header
      let url = `api/v2013/documents/${identifier}`
      if (isDraft) {
        url = `${url}/versions/draft`
      }

      return this.http.put(url, documentJson, { params: { schema } })
    }

    async createDocumentDraft(documentJson: DocumentJson): Promise<any> {
      return this.createDoc(documentJson, true)
    }

    async createDocument(documentJson: DocumentJson): Promise<any> {
      return this.createDoc(documentJson, false)
    }
}


const serviceUrls = {
    documentQueryUrl  ()                                    { return `api/v2013/documents/` },
    documentUrl       (identifier: string)                  { return `api/v2013/documents/${encodeURIComponent(identifier)}` },
    validateUrl       ()                                    { return `api/v2013/documents/x/validate` },
    draftUrl          (identifier: string)                  { return `api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft` },
    securityUrl       (identifier: string, operation: string) { return `api/v2013/documents/${encodeURIComponent(identifier)}/securities/${encodeURIComponent(operation)}` },
    draftSecurityUrl  (identifier: string, operation: string) { return `api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft/securities/${encodeURIComponent(operation)}` },
    publishDraftUrl   (schema: string,     identifier: string) { return `/api/v2023/documents/schemas/${encodeURIComponent(schema)}/${encodeURIComponent(identifier||'')}` },
}

export class KmDocumentsApi extends ApiBase
{
    async query(collection: string, { $filter, $top, $skip, $orderby }: QueryOptions = {}): Promise<any> {
        const params = { collection: collection || 'my', $filter, $top, $skip, $orderby };
        return this.http.get(serviceUrls.documentQueryUrl(), { params })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async get(identifier: string, { info, body, includeDeleted }: GetOptions & { includeDeleted?: boolean } = {}): Promise<any> {
        const params = { info, body, 'include-deleted': includeDeleted };
        return this.http.get(serviceUrls.documentUrl(identifier), { params })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async exists(identifier: string): Promise<boolean> {
        await this.http.head(serviceUrls.documentUrl(identifier))
                       .catch(tryCastToApiError);
        return true;
    }

    async put(identifier: string, body: object, schema: string): Promise<any> {
        return this.http.put(serviceUrls.documentUrl(identifier), body, { params: { schema } })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async delete(identifier: string): Promise<any> {
        return this.http.delete(serviceUrls.documentUrl(identifier))
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async validate(body: DocumentJson, schema?: string): Promise<any> {
        const params = { schema: schema || body?.header?.schema, identifier: body?.header?.identifier };
        return this.http.put(serviceUrls.validateUrl(), body, { params })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async canCreate(identifier: string, schema: string, { government }: SecurityOptions = {}): Promise<any> {
        const params = { metadata: JSON.stringify({ schema, government }) };
        return this.http.get(serviceUrls.securityUrl(identifier, 'create'), { params })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async canUpdate(identifier: string, schema: string, { government }: SecurityOptions = {}): Promise<any> {
        const params = { metadata: JSON.stringify({ schema, government }) };
        return this.http.get(serviceUrls.securityUrl(identifier, 'update'), { params })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async canDelete(identifier: string, schema: string, { government }: SecurityOptions = {}): Promise<any> {
        const params = { metadata: JSON.stringify({ schema, government }) };
        return this.http.get(serviceUrls.securityUrl(identifier, 'delete'), { params })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }
}

export class KmDraftsApi extends ApiBase
{
    async query(collection: string, { $filter, $top, $skip, $orderby, info, body }: QueryOptions & GetOptions = {}): Promise<any> {
        const params = { collection: collection || 'mydraft', $filter, $top, $skip, $orderby, info, body };
        return this.http.get(serviceUrls.documentQueryUrl(), { params })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async get(identifier: string, { info, body }: GetOptions = {}): Promise<any> {
        const params = { info, body };
        return this.http.get(serviceUrls.draftUrl(identifier), { params })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async exists(identifier: string): Promise<boolean> {
        await this.http.head(serviceUrls.draftUrl(identifier))
                       .catch(tryCastToApiError);
        return true;
    }

    async publishDraft(schema: string, identifier: string, document: object, additionalInfo: string, isNew = false): Promise<any> {
        const body = { document, additionalInfo };
        const url  = serviceUrls.publishDraftUrl(schema, identifier);
        return (isNew ? this.http.post(url, body) : this.http.put(url, body))
                        .then((res: any) => res.data)
                        .catch(tryCastToApiError);
    }

    async saveDraftVersion(identifier: string, body: object, schema: string): Promise<any> {
        return this.http.put(serviceUrls.draftUrl(identifier), body, { params: { schema } })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async delete(identifier: string): Promise<any> {
        return this.http.delete(serviceUrls.draftUrl(identifier))
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async canCreate(identifier: string, schema: string, { government }: SecurityOptions = {}): Promise<any> {
        const params = { metadata: JSON.stringify({ schema, government }) };
        return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'create'), { params })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async canUpdate(identifier: string, schema: string, { government }: SecurityOptions = {}): Promise<any> {
        const params = { metadata: JSON.stringify({ schema, government }) };
        return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'update'), { params })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async canDelete(identifier: string, schema: string, { government }: SecurityOptions = {}): Promise<any> {
        const params = { metadata: JSON.stringify({ schema, government }) };
        return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'delete'), { params })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }
}
