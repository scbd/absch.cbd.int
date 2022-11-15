import _ from 'lodash';
import saveAs from 'file-saverjs'

let downloadSchemas;

export const exportRecords = async(options, realm, searchService, searchResult, $http)=>{
    
    if(!downloadSchemas){
        if(realm.is('ABS')){
            downloadSchemas = (await import('~/app-data/abs/download-schemas')).downloadSchemas;
        }
        else if(realm.is('BCH')){
            downloadSchemas = (await import('~/app-data/bch/download-schemas')).downloadSchemas;
        }
    }

    if(options.listType == 'initial'){
        return executeExportQuery(false, 25, 0);
    }
    else if(options.listType == 'all'){
        return executeExportQuery(true, 1000, 0);
    }
    
    async function executeExportQuery(loadAll, rowsPerPage, pageNumber, docs){
        loadAll     = loadAll     || false
        rowsPerPage = rowsPerPage || 25
        pageNumber  = pageNumber  || 0
        docs        = docs        || []

        const queryOptions = searchResult.queryOptions;
        const lQuery = {
            fields         : options.fields.join(','),
            fieldQuery     : _.uniq(queryOptions.tagQueries),
            query          : queryOptions.query||undefined,
            rowsPerPage    : rowsPerPage||1000,
            currentPage    : pageNumber
        }

        if(searchResult?.sort != 'relevance asc')
            lQuery.sort    = searchResult.sort;

        // if its single schema and transformed for download user new api else fallback to client side excel                        
        if(!options.isGeneric){

            if(downloadSchemas[options.schema]){
                return schemaDownload({
                    query : lQuery, 
                    fields : downloadSchemas[options.schema], 
                    loadAll, 
                    schema : options.schema,
                    format : options.format,
                    fileName : options.fileName,
                    searchService,
                    realm, $http
                });    
            }
        }

        const result = await searchService.list(lQuery)
        let    { docs:newDocs, numFound } = result.data.response; 
        docs    = [...docs, ...newDocs];

        if(loadAll && docs.length < numFound){
            ({ docs, numFound } = await executeExportQuery(true,1000, pageNumber+1, docs));
        }
        
        return  { docs, numFound, isGeneric:true };
    }
}

async function schemaDownload({query, fields, loadAll, schema, format, fileName, searchService, realm, $http}){
    const mimeTypes = {
        xls : 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        json: 'application/json',
        csv : 'text/csv',
    }
    let headers = {
        'accept': mimeTypes[format || 'json'] 
    }; 
    let config = {};
    const searchQuery = {
            df    : searchService.localizeFields(query.df||'text_EN_txt'),
            fq    : _([query.fieldQuery]).flatten().compact().uniq().value(),
            q     : query.query,
            sort  : searchService.localizeFields(query.sort),
            start : 0,
            rows  : !loadAll ? 20 : 10000,
    }

    if(!_.find(searchQuery.fq, function(q){ return ~q.indexOf('realm_ss:')})){
        searchQuery.fq.push('realm_ss:' + realm.value.toLowerCase())
    }

    if(loadAll){
        config.responseType = "arraybuffer"
    }
    // since the download api does not provide numFound, query index
    const downloadRecordsPromise  = $http.post(`/api/v2022/documents/schemas/${encodeURIComponent(schema)}/download`, 
                                                {query:searchQuery, fields }, 
                                                {...config, headers });

    if(loadAll){
        
        const response = await downloadRecordsPromise;
        const blob = new Blob([response.data], { type: response.headers('content-type') });
        const file = new File([blob], fileName, { type: response.headers('content-type') });
        saveAs(file);
        return
    }

    const recordCountPromise      = searchService.list({...query, rowsPerPage : 1, currentPage : 1, fl: 'id'})

    const result = await Promise.all([downloadRecordsPromise, recordCountPromise]);
    const docs = result[0].data;
    const numFound = result[1].data.response.numFound
        
    return { docs, numFound, isGeneric:false, schema, schemaFields : fields };
}