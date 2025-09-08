import ApiBase, { tryCastToApiError } from './api-base';
import KmDocumentAttachmentApi from './km-document-attachment';
import _ from 'lodash';

const serviceUrls = {
    documentQueryUrl: () => `/api/v2013/documents/`,
    documentUrl: (identifier) => `/api/v2013/documents/${encodeURIComponent(identifier)}`,
    validateUrl: () => `/api/v2013/documents/x/validate`,
    draftUrl: (identifier) => `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft`,
    attachmentUrl: (identifier, filename) => `/api/v2013/documents/${encodeURIComponent(identifier)}/attachments/${encodeURIComponent(filename)}`,
    temporaryAttachmentUrl: () => `/api/v2015/temporary-files`,
    persistAttachmentUrl: (identifier, guid) => `/api/v2013/documents/${encodeURIComponent(identifier)}/attachments/persist-temporary/${encodeURIComponent(guid)}`,
    securityUrl: (identifier, operation) => `/api/v2013/documents/${encodeURIComponent(identifier)}/securities/${encodeURIComponent(operation)}`,
    draftSecurityUrl: (identifier, operation) => `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft/securities/${encodeURIComponent(operation)}`,
    draftLockUrl: (identifier, lockID) => `/api/v2013/documents/${encodeURIComponent(identifier)}/versions/draft/locks/${encodeURIComponent(lockID)}`,
    documentVersionUrl: (identifier) => `/api/v2013/documents/${encodeURIComponent(identifier)}/versions`,
    saveDraftVersionUrl: (identifier) => `/api/v2018/temporary-documents/${encodeURIComponent(identifier)}`,
    publishDraftUrl: (schema, identifier) => `/api/v2023/documents/schemas/${encodeURIComponent(schema)}/${encodeURIComponent(identifier || '')}`,
    documentBodyQueryUrl: () => `/api/v2013/documents/query/body`,
    documentFacetsQueryUrl: () => `/api/v2013/documents/query/facets`,
};

export default class KmDocumentApi extends ApiBase
{
    constructor(options) {
        super(options);
    }

    //
    //  Document Methods
    //
    async queryDocuments(params) {
        return this.http.get(serviceUrls.documentQueryUrl(), { params })
                       .then(res => res.data)
                       .catch(tryCastToApiError);
    }
    
    async getDocument(identifier, params) {
        return this.http.get(serviceUrls.documentUrl(identifier), { params })
                       .then(res => res.data)
                       .catch(tryCastToApiError);
    }

    async getVersions(identifier, params) {
        return this.http.get(serviceUrls.documentVersionUrl(identifier), { params })
                       .then(res => res.data)
                       .catch(tryCastToApiError);
    }

    async exists(identifier, params) {
        return this.http.head(serviceUrls.documentUrl(identifier), { method:'head', params })
                       .then(() => true)
                       .catch(err => {
                           if (err.status === 404) return false;
                           throw err;
                       });
    }

    async put(identifier, body, params) {
        return this.http.put(serviceUrls.documentUrl(identifier), body, { params })
                       .then(res => res.data)
                       .catch(tryCastToApiError);
    }

    async delete(identifier, params) {
        return this.http.delete(serviceUrls.documentUrl(identifier), { method:'delete', params })
                       .then(res => res.data)
                       .catch(tryCastToApiError);
    }

    async validate(body, { collection, schema, identifier, validationSection } = {}) {
        const params = {
            collection,
            schema: schema || body?.header?.schema,
            identifier: identifier || body?.header?.identifier,
            'validation-section': validationSection
        };
        return this.http.put(serviceUrls.validateUrl(), body, { params })
                       .then(res => res.data)
                       .catch(tryCastToApiError);
    }

    //
    // Draft Document Methods
    //
    async getDraft(identifier, params) {
        return this.http.get(serviceUrls.draftUrl(identifier), { params })
                       .then(res => res.data)
                       .catch(tryCastToApiError);
    }

    async existsDraft(identifier, params) {
        return this.http.head(serviceUrls.draftUrl(identifier), { method:'head', params })
                       .then(() => true)
                       .catch(err => {
                           if (err.status === 404) return false;
                           throw err;
                       });
    }

    async putDraft(identifier, body, params){
        const requestParams = _.clone(params || {});
        if (!requestParams.schema && body?.header?.schema) {
            requestParams.schema = body.header.schema;
        }

        return this.http.put( serviceUrls.draftUrl(identifier), body, { params: requestParams })
                       .then(res => res.data)
                       .catch(tryCastToApiError);
    }

    async deleteDraft(identifier, params) {
        return this.http.delete(serviceUrls.draftUrl(identifier), { params })
                       .then(res => res.data)
                       .catch(tryCastToApiError);
    }

    //
    // Document Security Methods
    //
    async canCreate(identifier, params) {
        return this.http.get(serviceUrls.securityUrl(identifier, 'create'), { params })
                       .then(res => res.data.isAllowed)
                       .catch(tryCastToApiError);
    }

    async canUpdate(identifier, params) {
        return this.http.get(serviceUrls.securityUrl(identifier, 'update'), { params })
                       .then(res => res.data.isAllowed)
                       .catch(tryCastToApiError);
    }

    async canDelete(identifier, params) {
        return this.http.get(serviceUrls.securityUrl(identifier, 'delete'), { params })
                       .then(res => res.data.isAllowed)
                       .catch(tryCastToApiError);
    }
    
    //
    // Draft Security Methods
    //
    async canCreateDraft(identifier, params) {
        return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'create'), { method:'get', params })
                       .then(res => res.data.isAllowed)
                       .catch(tryCastToApiError);
    }

    async canUpdateDraft(identifier, params) {
        return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'update'), { method:'get', params })
                       .then(res => res.data.isAllowed)
                       .catch(tryCastToApiError);
    }

    async canDeleteDraft(identifier, params) {
        return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'delete'), { params })
                       .then(res => res.data.isAllowed)
                       .catch(tryCastToApiError);
    }
    
    //
    // Draft Lock Methods
    //
    async getLock(identifier, params) {
        return this.http.get(serviceUrls.draftLockUrl(identifier), { params })
                       .then(res => res.data)
                       .catch(tryCastToApiError);
    }

    async putLock(identifier, params) {
        return this.http.put(serviceUrls.draftLockUrl(identifier), null, { params })
                       .then(res => res.data)
                       .catch(tryCastToApiError);
    }

    async deleteLock(identifier, lockID, params) {
        return this.http.delete(serviceUrls.draftLockUrl(identifier, lockID), { params })
                       .then(res => res.data)
                       .catch(tryCastToApiError);
    }

    //
    // Document Query Methods
    //
    async getQueryBody(filter, query, params) {
        const queryParams = _.clone(params || {});
        queryParams.query = query;
        queryParams.$filter = filter;
        return this.http.get(serviceUrls.documentBodyQueryUrl(), { params: queryParams })
                       .then(res => res.data)
                       .catch(tryCastToApiError);
    }
    
    async getQueryFacets(filter, params) {
        const queryParams = _.clone(params || {});
        queryParams.$filter = filter;
        return this.http.get(serviceUrls.documentFacetsQueryUrl(), { params: queryParams })
                       .then(res => res.data)
                       .catch(tryCastToApiError);
    }

    //
    // Attachment Methods
    //
    async uploadAttachment(documentId, file, options) {
        if (!documentId) {
            throw new Error("Missing document identifier.");
        }
        if (!file?.name) {
            throw new Error("Invalid file provided.");
        }

        const kmDocumentAttApi = new KmDocumentAttachmentApi(this.options);
        const fileName = file.name;
        const mimeType = this.getMimeType(file);

        try {
            // Step 1: Request temporary upload slot
            const tempSlotResponse = await kmDocumentAttApi.createTempAttachmentSlot(fileName, mimeType);

            if (!tempSlotResponse?.url || !tempSlotResponse?.uid || !tempSlotResponse?.contentType) {
                throw new Error("Failed to create temporary attachment slot.");
            }
            // Step 2: Upload file to temporary slot
            await kmDocumentAttApi.uploadToTempSlot(tempSlotResponse.url, file, tempSlotResponse.contentType);

            // Step 3: Persist the uploaded file
            const persistResponse = await kmDocumentAttApi.persistTemporaryAttachment(documentId, tempSlotResponse.uid, fileName);

            if (!persistResponse?.url) {
                throw new Error("Failed to persist attachment.");
            }

            return persistResponse;
        } catch (error) {
            console.error("Upload failed:", error);
            throw new Error(error.message || "An unexpected error occurred during upload.");
        }
    }

    // Helper to get MIME type from a file, similar to the original service
    getMimeType(file) {
        const filename = file.name;
        let sMimeType = file.type || "application/octet-stream";

        if (filename && ["application/octet-stream", "application/geo+json"].includes(sMimeType)) {
            const iIndex = filename.lastIndexOf(".");
            if (iIndex >= 0) {
                const sExt = filename.substring(iIndex).toLowerCase();
                if (sExt === ".json" || sExt === ".geojson") {
                    sMimeType = "application/json";
                } else if (sExt === ".xml") {
                    sMimeType = "application/xml";
                }
            }
        }
        return sMimeType;
    }
}
