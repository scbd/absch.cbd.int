define(['app', 'text!views/search/search-results/list-view.html','lodash',
'views/search/search-results/result-grouped-national-record','services/search-service','views/directives/party-status',
], function(app, template, _) {

    app.directive('searchResultListView', ['searchService', 'realm', '$timeout', '$location', function(searchService, realm, $timeout, $location) {
        return {
            restrict: 'EAC',
            replace: true,
            require:'^searchDirective',
            template: template, 
            scope: {
                api:'='
            },
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
                var queryCanceler;
                
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
                function updateResult(query, sort, pageNumber){
                   
                    $scope.loading = true;
                    if(pageNumber==undefined)
                        pageNumber = $scope.searchResult.currentPage;

                    var lQuery = {
                        query   : query,
                        rowsPerPage    : $scope.searchResult.rowsPerPage,
                        currentPage    : pageNumber - 1,
                        facet:true,
                        facetFields : ['all_terms_ss', 'government_REL_ss'],
                        groupField: 'governmentSchemaIdentifier_s',
                        groupLimit: 10
                    }
                    //'schema_s', 'government_s', 
                    if(sort)
                        lQuery.sort    = $scope.searchResult.sort = sort;

                    queryCanceler = $q.defer();
        
                    searchService.group(lQuery, queryCanceler)
                        .then(function (data) {
                            queryCanceler = null;
    
                            $scope.recordCount[0].count = data.data.grouped.governmentSchemaIdentifier_s.matches;
                            $scope.tabs['nationalRecords'].pageCount = Math.ceil(data.data.grouped.governmentSchemaIdentifier_s.ngroups / $scope.itemsPerPage);
    
                            $scope.searchResult.rawDocs = [];
    
                            var countryRecords = {}
                            _.each(data.data.grouped.governmentSchemaIdentifier_s.groups, function (record) {
    
                                var gpDetails = (record.groupValue || '').split('_');
                                if (!gpDetails.length)
                                    return;
                                var schema = gpDetails[1];
                                var country = gpDetails[0];
                                if (!countryRecords[country])
                                    countryRecords[country] = {
                                        schemas: angular.copy(schemaTemplate)
                                    };
                                countryRecords[country].country = country;
    
                                countryRecords[country].schemas[schema] = _.extend(countryRecords[country].schemas[schema], record.doclist);
    
                            });
                            $scope.searchResult.rawDocs = _.values(countryRecords);
    
                        })
                        .finally(function(){
                            $scope.loading = false;
                        })
                }

                $scope.onPageChange = function(pageNumber){
                    updateResult($scope.searchResult.query, $scope.searchResult.sort, pageNumber);
                    $location.search({
                        currentPage:pageNumber
                    })
                }

                $scope.onPageSizeChanged = function(size){
                    $scope.searchResult.rowsPerPage = size;
                    $scope.onPageChange();
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
