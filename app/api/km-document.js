import ApiBase, { tryCastToApiError } from './api-base';

export default class KmDocumentApi extends ApiBase
{
    constructor(options) {
        super(options);
    }

    async queryDocuments(params)  {
        return this.http.get(`api/v2013/documents/`, { params }).then(res => res.data).catch(tryCastToApiError);
    }

    async paramDocuments(params){
        return this.http.get(`api/v2013/documents/${params}`).then(res => res.data).catch(tryCastToApiError);
    }

    async queryCountries()  {
        return this.http.get(`https://accounts.cbd.int/api/v2013/countries`).then(res => res.data).catch(tryCastToApiError);
    }

}