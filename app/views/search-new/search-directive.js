define(['app', 'underscore', '/app/js/common.js',
'/app/services/search-service.js',
'/app/views/search-new/search-filters/schema-filters.js',
'/app/views/search-new/search-results/result-default.js',
'/app/views/search-new/search-results/national-records-country.js',
], function(app, _) {

    app.directive('searchDirective', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            templateUrl: '/app/views/search-new/search-directive.html',
            controller: ['$scope','$q', 'realm', 'searchService',function($scope, $q, realm, searchService) {
    
                    var queryCanceler = null;
                    $scope.rawDocs = [];
                    $scope.refresh = false;
                    
                    $scope.searchFilters = [];
                   
                    //*************************************************************************************************************************************
                    function addFilter(filterID, filterInfo ) {
                           $scope.searchFilters.push(filterID);
                           $scope.searchFilters[filterID] = filterInfo; 
                    };
                    
                    //*************************************************************************************************************************************         
                    function load(){
                         nationalQuery();
                    }
                                        
                    //*************************************************************************************************************************************
                    $scope.removeFilter = function(filter) {
                            $scope.searchFilters[filter].value = false; 
                            $scope.refresh = true;
                    };
                    
                     //*************************************************************************************************************************************
                    function isFilterOn(filter) {
                           return $scope.searchFilters[filter].value;
                    };
                    
                    //*************************************************************************************************************************************
                    function saveFilter(filter) {
                        $scope.searchFilters[filter].value = !$scope.searchFilters[filter].value;
                        $scope.refresh = true;
                    };

                    //*************************************************************************************************************************************
                    function nationalQuery() {

                        var searchOperation;

                        if (queryCanceler) {
                            console.log('trying to abort pending request...');
                            queryCanceler.resolve(true);
                        }
                        
                        var base_fields = 'id, rec_date:updatedDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s,'; // rec_category, groupSort, sort1, sort2, sort3
                        var en_fields =  'rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:description_t, rec_type:type_EN_t,' // meta1_EN_t, meta2_EN_t, meta3_EN_t
                        
                        var q = '(realm_ss:' + realm.value.toLowerCase() + ') AND NOT version_s:*';
                        
                        if($scope.searchFilters.nationalRecords){
                            if($scope.searchFilters.nationalRecords.value)
                                q += '(' + 'schema_s:measure' + ')';
                        }
                       else
                            q += '(' + '*:*' + ')';

                        queryCanceler = $q.defer();

                        if($scope.currentPage===0){
                            $scope.rawDocs = undefined;
                        }
                        
                        var groupQuery = {
                            query       : q + ' AND government_s:*',
                            sort        : 'government_EN_s asc, updatedDate_dt desc',
                            fields      : base_fields + en_fields,
                            groupField  : 'government_s',
                            groupSort   : 'schema_s desc', // groupSort, sort1, sort2, sort3
                            currentPage : $scope.currentPage,
                            itemsPerPage: $scope.itemsPerPage
                        };
                        
                        searchOperation = searchService.group(groupQuery, queryCanceler);

                        $q.when(searchOperation)
                            .then(function(data) {
                                queryCanceler = null;
                                $scope.rawDocs = data;

                            }).catch(function(error) {
                                console.log('ERROR: ' + error);
                            });

                    };
                    
                    this.load = load;
                    this.addFilter = addFilter;
                    this.saveFilter = saveFilter;
                    this.nationalQuery = nationalQuery;
                    this.isFilterOn = isFilterOn;
                    
                  
                    
                    //*************************************************************************************************************************************
                    $scope.$watch('refresh', function(){
                       nationalQuery();
                       $scope.refresh = false;
				    });

            }]//controller
        };
    });
});