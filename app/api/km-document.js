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

    async queryCountries()  {
        return this.http.get(`https://accounts.cbd.int/api/v2013/countries`).then(res => res.data).catch(tryCastToApiError);
    }

    validateDocument(element){
        return this.http.put(`api/v2013/documents/x/validate`, {schema: element.header.schema, data: element})
            .then(res => res.data).catch(tryCastToApiError);
    }

    createNationalRecord(identifier, schema, isDraft){
        const url = isDraft ? `api/v2013/documents/${identifier}/versions/draft` : `api/v2013/documents/${identifier}`;
        return this.http.put(url, {schema}).then(res => res.data).catch(tryCastToApiError);;
    }

}