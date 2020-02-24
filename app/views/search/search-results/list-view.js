define(['app', 'text!views/search/search-results/list-view.html','lodash',
'views/search/search-results/result-grouped-national-record','services/search-service','views/directives/party-status',
'views/search/search-results/result-default'
], function(app, template, _) {

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
                    updateResult : updateResult
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
                        pivotFacetFields : queryOptions.pivotFacetFields
                    }
                    // if(lQuery=='*:*' || lQuery) TODO: add this fields only when req
                        lQuery.additionalFields  = 'diseasesResistance_b,herbicidesResistance_b,physiologyChanges_b,qualityChanges_b,medicalProduction_b,traitsOther_b'
                        lQuery.additionalFields += ',scopeRelease_b,scopeFood_b,scopeFeed_b,scopeProcessing_b,scopeConfined_b'
                        //'schema_s', 'government_s', 
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
                        $scope.searchResult.sortBy      = lQuery.sort;
                        $scope.searchResult.currentPage = pageNumber;
                        
                        $scope.searchResult.facets   = searchDirectiveCtrl.sanitizeFacets(result.data.facet_counts)
                        
                        return $scope.searchResult;
                    })
                    .finally(function(){
                        $scope.loading = false;
                    })
                }

                $scope.onPageChange = function(pageNumber){
                    updateResult($scope.searchResult, $scope.searchResult.sort, pageNumber);
                    $location.search('currentPage', pageNumber)
                    $location.search('rowsPerPage', $scope.searchResult.rowsPerPage)
                }

                $scope.onPageSizeChanged = function(size){
                    $scope.searchResult.rowsPerPage = size;                    
                    $scope.onPageChange($scope.searchResult.currentPage);
                }

                $scope.loadDocument = function(doc){
                    doc.showDoc =!doc.showDoc;
                    $timeout(function(){
                        $scope.recordLoader.api.loadDocument(doc.schema_s, doc.identifier_s);
                    },10)
                };
            },
        };
    }]);
});
