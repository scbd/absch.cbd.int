import app from '~/app';
import template from 'text!./list-view.html';
import _ from 'lodash';
import '~/services/main';
import '~/views/directives/party-status';
import './result-default';
import { iconFields } from '~/views/forms/view/bch/icons';
import viewResultT from '~/app-text/views/search/search-results/view-result.json';
import saveAs from 'file-saverjs'

app.directive('searchResultListView', ['searchService', 'realm', '$timeout', '$location', 'translationService', '$http',
    function (searchService, realm, $timeout, $location, translationService, $http) {
        return {
            restrict: 'EA',
            replace: true,
            require:'^searchDirective',
            template: template, 
            scope: {
                api:'='
            },
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
                let downloadSchemas;
                translationService.set('viewResultT', viewResultT);
                $scope.recordLoader = {};
                $scope.api = {
                    updateResult : updateResult,
                    onExport     : onExport,
                    isBusy       : false
                };
                $scope.searchResult = {
                    schemas    : realm.schemas,
                    currentPage: 1,
                    pageCount  : 0,
                    rowsPerPage: 25
                } 
                // ,                    sortBy     : 'updatedDate_dt desc'
                function updateResult(queryOptions, sort, pageNumber){
                   
                    $scope.loading = true;
                    if(pageNumber==undefined)
                        pageNumber = $scope.searchResult.currentPage;

                    var lQuery = {
                        fieldQuery     : _.uniq(queryOptions.tagQueries),
                        query          : queryOptions.query||undefined,
                        rowsPerPage    : $scope.searchResult.rowsPerPage,
                        currentPage    : pageNumber - 1,
                        facet          : true,
                        facetFields    : queryOptions.facetFields,
                        pivotFacetFields    : queryOptions.pivotFacetFields,
                        highlight           : queryOptions.highlight,
                        highlightFields     : queryOptions.highlightFields
                    }
                    // if(lQuery=='*:*' || lQuery) TODO: add this fields only when req
                    if(realm.is('BCH')){
                        lQuery.additionalFields = `${iconFields.lmo},${iconFields.decision},${iconFields.organisms}`;
                    }

                    if(sort && sort != 'relevance asc')
                        lQuery.sort    = $scope.searchResult.sort = sort;

                    return searchService.list(lQuery)
                    .then(function(result){            

                        $scope.searchResult.docs        = result.data.response.docs;
                        $scope.searchResult.numFound    = result.data.response.numFound;
                        $scope.searchResult.pageCount   = Math.ceil(result.data.response.numFound / $scope.searchResult.rowsPerPage);
                        
                        $scope.searchResult.query       = queryOptions.tagQueries.query;
                        $scope.searchResult.tagQueries  = queryOptions.tagQueries;
                        $scope.searchResult.facetFields = queryOptions.facetFields;
                        $scope.searchResult.queryOptions = queryOptions;

                        $scope.searchResult.sortBy      = lQuery.sort;
                        $scope.searchResult.currentPage = pageNumber;
                        $scope.searchResult.facets   = searchDirectiveCtrl.sanitizeFacets(result.data.facet_counts);

                        if(result.data.highlighting){
                            _.forEach($scope.searchResult.docs, function(doc){
                                if(!_.isEmpty(result.data.highlighting[doc.id]))
                                    doc.highlight = result.data.highlighting[doc.id];
                            });
                        }
                        return $scope.searchResult;
                    })
                    .catch(function(e){
                        $scope.searchResult.docs     = []
                        $scope.searchResult.numFound = 0
                        $scope.searchResult.pageCount= 0
                        $scope.searchResult.facets   = undefined;
                        $scope.searchResult.highlighting = undefined;
                        throw e;
                    })
                    .finally(function(){
                        $scope.loading = false;
                    })
                }

                $scope.onPageChange = function(pageNumber){
                    updateResult($scope.searchResult.queryOptions, $scope.searchResult.sort, pageNumber);
                    $location.search('currentPage', pageNumber)
                    $location.search('rowsPerPage', $scope.searchResult.rowsPerPage)
                }

                $scope.onPageSizeChanged = function(size){
                    $scope.searchResult.rowsPerPage = size;  
                    $scope.searchResult.currentPage = 1; //reset to page 1                   
                    $scope.onPageChange($scope.searchResult.currentPage);
                }

                $scope.loadDocument = function(doc){
                    doc.showDoc =!doc.showDoc;
                    $timeout(function(){
                        $scope.recordLoader.api.loadDocument(doc.schema_s, doc.identifier_s);
                    },10)
                };


                async function onExport(options){

                    if($scope.loading)
                        return;
                    
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

                        const queryOptions = $scope.searchResult.queryOptions;
                        const lQuery = {
                            fields         : options.fields.join(','),
                            fieldQuery     : _.uniq(queryOptions.tagQueries),
                            query          : queryOptions.query||undefined,
                            rowsPerPage    : rowsPerPage||1000,
                            currentPage    : pageNumber
                        }

                        if($scope.searchResult?.sort != 'relevance asc')
                            lQuery.sort    = $scope.searchResult.sort;

                        // if its single schema and transformed for download user new api else fallback to client side excel                        
                        if(!options.isGeneric){
    
                            if(downloadSchemas[options.schema]){
                                return schemaDownload({
                                    query : lQuery, 
                                    fields : downloadSchemas[options.schema], 
                                    loadAll, 
                                    schema : options.schema,
                                    format : options.format,
                                    fileName : options.fileName
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

                async function schemaDownload({query, fields, loadAll, schema, format, fileName}){
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

            },
        };
    }]);

