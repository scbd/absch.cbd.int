import ApiBase, { tryCastToApiError } from './api-base';

export default class KmDocumentApi extends ApiBase
{
    constructor(options) {
        super(options);
    }

    //ToDo: will update as per API requirement.
    async saveTags(UID, params)  {
        return this.http.put(`api/v2025/tagging/documents/${UID}/tags`, params)
                .then(res => res.data).catch(tryCastToApiError);

        /*
        GET     /path/to/documents/:id/tags // list of tags
        PUT     /path/to/documents/:id/tags/:tagName //ADD
        DELETE  /path/to/documents/:id/tags/:tagName //remove
        
        */
    }
    async getDocumentTags(identifier)  {
        return ["finding-information", "submitting-information", "monitoring"]; // for testing only, will remove 
        // return this.http.get(`api/v2025/tagging/km-documents/${identifier}`).then(res => res.data).catch(tryCastToApiError);
    }

    // this is already in articles.js, and article-api.js do we need it, or use from there
    async getAdminTags(params){
        return await this.http.get(`api/v2021/article-admin-tags`, { params }).then(res => res.data).catch(tryCastToApiError);
    }

    async getDocumentsWithTags(params){
        return [
            { "identifier": "xyz-abc-123", "title": "Test CNA Title 1", "schema":"cna",  "adminTags": ["Submit", "Home", "Info", "Intro", "CHM", "BCH", "ABSCH", "ZYX", "TEST", "HUMPTY", "DUMPTY"] },
            { "identifier": "xyz-abc-123", "title": "Test CNA Title 2", "schema":"cna",  "adminTags": [ "Intro", "CHM", "BCH", "ABSCH", "ZYX", "TEST", "HUMPTY", "DUMPTY"] },
            { "identifier": "xyz-abc-123", "title": "Test CNA Title 3", "schema":"cna",  "adminTags": [ "CHM", "BCH", "ABSCH", "ZYX", "TEST", "HUMPTY", "DUMPTY"] },
            { "identifier": "xyz-abc-123", "title": "Test CNA Title 4", "schema":"cna",  "adminTags": ["Submit", "Home", "Info", "Intro", "CHM", "BCH", "ABSCH", "ZYX", "TEST", "HUMPTY", "DUMPTY"] },
            { "identifier": "xyz-abc-123", "title": "Test CNA Title 5", "schema":"cna",  "adminTags": [ "Intro", "CHM", "BCH", "ABSCH", "ZYX", "TEST", "HUMPTY", "DUMPTY"] },
            { "identifier": "xyz-abc-123", "title": "Test CNA Title 6", "schema":"cna",  "adminTags": [ "CHM", "BCH", "ABSCH", "ZYX", "TEST", "HUMPTY", "DUMPTY"] },
            
            { "identifier": "xyz-abc-123", "title": "LAW Title 1", "schema":"law",  "adminTags": ["Submit", "Home", "Info", "Intro", "CHM", "BCH", "ABSCH", "ZYX", "TEST", "HUMPTY", "DUMPTY"] },
            { "identifier": "xyz-abc-123", "title": "LAW Title 2", "schema":"law", "adminTags": ["Info", "Intro"] },
            { "identifier": "xyz-abc-123", "title": "LAW Title 3", "schema":"law", "adminTags": ["BCH", "CHM"] },{ "identifier": "xyz-abc-123", "title": "LAW Title 1", "schema":"law",  "adminTags": ["Submit", "Home", "Info", "Intro", "CHM", "BCH", "ABSCH", "ZYX", "TEST", "HUMPTY", "DUMPTY"] },
            { "identifier": "xyz-abc-123", "title": "LAW Title 4", "schema":"law", "adminTags": ["Info", "Intro"] },
            { "identifier": "xyz-abc-123", "title": "LAW Title 5", "schema":"law", "adminTags": ["BCH", "CHM"] },

            { "identifier": "xyz-abc-123", "title": "Sample Title 1", "schema":"Capacity Development Initiatives (CDI)",  "adminTags": ["Submit", "Home", "Info", "Intro", "CHM", "BCH", "ABSCH", "ZYX", "TEST", "HUMPTY", "DUMPTY"] },
            { "identifier": "xyz-abc-123", "title": "Sample Title 2", "schema":"Capacity Development Initiatives (CDI)", "adminTags": ["Info", "Intro"] },
            { "identifier": "xyz-abc-123", "title": "Sample Title 3", "schema":"Capacity Development Initiatives (CDI)", "adminTags": ["BCH", "CHM"] },
            { "identifier": "xyz-abc-123", "title": "Sample Title 4", "schema":"Capacity Development Initiatives (CDI)",  "adminTags": ["Submit", "Home", "Info", "Intro", "CHM", "BCH", "ABSCH", "ZYX", "TEST", "HUMPTY", "DUMPTY"] },
            { "identifier": "xyz-abc-123", "title": "Sample Title 5", "schema":"Capacity Development Initiatives (CDI)", "adminTags": ["Info", "Intro"] },
            { "identifier": "xyz-abc-123", "title": "Sample Title 6", "schema":"Capacity Development Initiatives (CDI)", "adminTags": ["BCH", "CHM"] },


            { "identifier": "xyz-abc-123", "title": "DEC Title 1", "schema":"Countries' Decisions or any other Communications (DEC)",  "adminTags": ["Submit", "Home", "Info", "Intro", "CHM", "BCH", "ABSCH", "ZYX", "TEST", "HUMPTY", "DUMPTY"] },
            { "identifier": "xyz-abc-123", "title": "DEC Title 2", "schema":"CCountries' Decisions or any other Communications (DEC)", "adminTags": ["Info", "Intro"] },
            { "identifier": "xyz-abc-123", "title": "DEC Title 3", "schema":"Countries' Decisions or any other Communications (DEC)", "adminTags": ["BCH", "CHM"] },
            { "identifier": "xyz-abc-123", "title": "DEC Title 4", "schema":"Countries' Decisions or any other Communications (DEC)",  "adminTags": ["Submit", "Home", "Info", "Intro", "CHM", "BCH", "ABSCH", "ZYX", "TEST", "HUMPTY", "DUMPTY"] },
            { "identifier": "xyz-abc-123", "title": "DEC Title 5", "schema":"CCountries' Decisions or any other Communications (DEC)", "adminTags": ["Info", "Intro"] },
            { "identifier": "xyz-abc-123", "title": "DEC Title 6", "schema":"Countries' Decisions or any other Communications (DEC)", "adminTags": ["BCH", "CHM"] },

            { "identifier": "xyz-abc-123", "title": "RA Title 1", "schema":"Risk Assessments generated by a regulatory process (RA)",  "adminTags": ["Submit", "Home", "Info", "Intro", "CHM", "BCH", "ABSCH", "ZYX", "TEST", "HUMPTY", "DUMPTY"] },
            { "identifier": "xyz-abc-123", "title": "RA Title 2", "schema":"Risk Assessments generated by a regulatory process (RA)", "adminTags": ["Info", "Intro"] },
            { "identifier": "xyz-abc-123", "title": "RA Title 3", "schema":"Risk Assessments generated by a regulatory process (RA)", "adminTags": ["BCH", "CHM"] },
            { "identifier": "xyz-abc-123", "title": "RA Title 4", "schema":"Risk Assessments generated by a regulatory process (RA)",  "adminTags": ["Submit", "Home", "Info", "Intro", "CHM", "BCH", "ABSCH", "ZYX", "TEST", "HUMPTY", "DUMPTY"] },
            { "identifier": "xyz-abc-123", "title": "RA Title 5", "schema":"Risk Assessments generated by a regulatory process (RA)", "adminTags": ["Info", "Intro"] },
            { "identifier": "xyz-abc-123", "title": "RA Title 36", "schema":"Risk Assessments generated by a regulatory process (RA)", "adminTags": ["BCH", "CHM"] }
          ]        
        // return await this.http.get(`api/v2021/article-admin-tags`, { params }).then(res => res.data).catch(tryCastToApiError);
    }

}