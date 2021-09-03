import app from 'app';
import template from 'text!./list-view.html';
import _ from 'lodash';
import 'services/main';
import '~/views/directives/party-status';
import './result-default';
import { iconFields } from '~/views/forms/view/bch/icons';

    app.directive('searchResultListView', ['searchService', 'realm', '$timeout', '$location', function(searchService, realm, $timeout, $location) {
        return {
            restrict: 'EA',
            replace: true,
            require:'^searchDirective',
            template: template, 
            scope: {
                api:'='
            },
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
                
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


                function onExport(options){

                    if($scope.loading)
                        return;
                    
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

                        const result = await searchService.list(lQuery)
                        let    { docs:newDocs, numFound } = result.data.response; 
                        docs    = [...docs, ...newDocs];

                        if(loadAll && docs.length < numFound){
                            ({ docs, numFound } = await executeExportQuery(true,1000, pageNumber+1, docs));
                        }
                        
                        return  { docs, numFound };
                    }
                }
            },
        };
    }]);

