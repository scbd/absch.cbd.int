define(['app', 'underscore','scbd-angularjs-services', 'scbd-angularjs-filters', 'scbd-angularjs-controls',
        '/app/views/search/measure-matrix-elements-derective.html.js',
        '/app/views/forms/view/record-loader.directive.html.js'], function(app, _) {
            
    app.directive("measureMatrixCountriesDirective", function() {
        return {
            restrict: "EAC",
            templateUrl: "/app/views/search/measure-matrix-countries-directive.html",
            replace: true,
            transclude: false,
            scope: {
                documents: "="
            },
            link:{},
            controller: ['$scope', '$http', 'realm', '$q', '$filter', '$routeParams', '$element',
                            function($scope, $http, realm, $q, $filter, $routeParams, $element) {

            $scope.options  = {
               jurisdiction             : function () { return $http.get("/api/v2013/thesaurus/domains/7A56954F-7430-4B8B-B733-54B8A5E7FF40/terms",  { cache: true })
                                                                    .then(function(o){ $scope.jurisdictions = o.data; return $scope.updateFacets($scope.measure, 'jurisdiction_s',o.data); }); },
               status                   : function () { return $http.get("/api/v2013/thesaurus/domains/ED7CDBD8-7762-4A84-82DD-30C01458A799/terms",  { cache: true })
                                                                    .then(function(o){ $scope.status = o.data; return $scope.updateFacets($scope.measure,'status_s',o.data) }); },
               typeOfDocuments          : function () { return $http.get("/api/v2013/thesaurus/domains/144CF550-7629-43F3-817E-CACDED34837E/terms",  { cache: true })
                                                                    .then(function(o){ $scope.types = o.data; return $scope.updateFacets($scope.measure,'type_s',o.data) }); }
            };

            $scope.currentPage = 0;
            $scope.itemsPerPage = 1000;
            // if ($routeParams.code) {
            //     var queryParameters = {
            //         'q': 'realm_ss:' + realm.value.toLowerCase() + ' AND schema_s:measure AND government_s:' + $routeParams.code.toLowerCase(),
            //         'sort': 'government_EN_t asc',
            //         'fl': 'id,identifier_s,title_t,createdDate_dt,description_t,government_EN_t,status_EN_t,type_EN_t,jurisdiction_EN_t,adoption_dt,entryIntoForce_dt,retired_dt,limitedApplication_dt',
            //         'wt': 'json',
            //         'start': $scope.currentPage * $scope.itemsPerPage,
            //         'rows': $scope.itemsPerPage
            //     };

            //     $http.get('/api/v2013/index/select', {
            //             params: queryParameters
            //         })
            //         .success(function(data) {

            //             $scope.measures = [];
            //             var measuresData = data.response.docs;
            //             $scope.documentCount = data.response.numFound;

            //             var measuresQueryList = _.map(measuresData, function(measure) {
            //                 return $scope.loadMatrix(measure);
            //             });
            //             $q.all(measuresQueryList)
            //                 .then(function() {
            //                     //measure.isLoading=false;
            //                     console.log('done');
            //                     $scope.measures = measuresData;
            //                     $scope.matrixGroupBy = 'jurisdiction';

            //                 });

            //         }).error(function(error) {
            //             console.log('onerror');
            //             console.log(error);
            //         });
            // }
            
              $scope.$watch('documents', function(docs){
                if(docs && docs.length>0){
                    var measuresQueryList = _.map(docs, function(measure) {
                            return $scope.loadMatrix(measure);
                        });
                        $q.all(measuresQueryList)
                            .then(function() {
                                $scope.measures = docs;
                                $scope.matrixGroupBy = 'jurisdiction';

                            });

                    
                }
            });
            
            var measuresCache = {};
            $scope.loadMatrix = function(measure) {

                return $q.when($http.get('/api/v2013/documents/' + measure.identifier_s,{cache:true}))
                    .then(function(document) {
                        measure.document = document.data;
                        return;
                        // var amendedMeasuresQuery = _.map(measure.document.amendedMeasures, function(amended) {
                        //     return $http.get('/api/v2013/documents/' + amended.identifier,{cache:true});
                        // });

                        // return $q.all(amendedMeasuresQuery)
                        //     .then(function(amendedMeasures) {
                        //         amendedMeasures.forEach(function(amendedMeasureData) {
                        //             var amended = _.findWhere(measure.document.amendedMeasures, {
                        //                 identifier: amendedMeasureData.data.header.identifier
                        //             });
                        //             amended.measure = amendedMeasureData.data;
                        //         });
                        //         return measure.document;
                        //     });
                    })
                    .catch(function(error) {
                        console.log('onerror');
                        console.log(error);
                    })
                    .finally(function() {
                        measure.isLoading = false;
                    });
            };

            // function getMeasure(identifier){

            //     var promise = $q.defer();

            //     var measure = _.find(measuresCache, function(measure){
            //                         return measure.header.identifier == identifier;
            //                   });
            //     if(measure){
            //         return measure;
            //     }
            //     return promise;$http.get('/api/v2013/documents/' + linked.identifier);

            // }
            
            function groupRecords(field){

                var filteredRecords = [];

                filteredRecords = _.filter($scope.measures, function(measure){


                    return (!$scope.msrJurisdiction ||
                             _.some($scope.msrJurisdiction,function(jurisdiction){
                                    return jurisdiction ==  measure.document.jurisdiction.identifier;
                            })
                        )
                    &&
                        (!$scope.msrType ||
                             _.some($scope.msrType,function(type){
                                    return type ==  measure.document.type.identifier;
                            })
                        )
                    &&
                        (!$scope.msrStatus ||
                             _.some($scope.msrStatus,function(status){
                                    return status ==  measure.document.status.identifier;
                            })
                        );
                });

                var grpMeasures = _.groupBy(filteredRecords, function(measure){
                    if(field=='status')
                        return measure.document.status.identifier;
                    if(field=='type')
                        return measure.document.type.identifier;
                    
                    if(!measure.document)
                        return measure.jurisdiction_EN_t;
                    //user jurisdiction field for else
                    return measure.document.jurisdiction.identifier;// +  (measure.document.jurisdictionName ? '#' + $filter('lstring')(measure.document.jurisdictionName) : '');
                });
                $scope.groupedMeasures = _.map(grpMeasures, function(group,key){
                    console.log(key);
                    return {
                            jurisdiction:key,
                            measures:group
                            };
                });
                var sortData;
                if(field=='status')
                    sortData =  $scope.status || $scope.options.status();
                else if(field=='type')
                    sortData =  $scope.types || $scope.options.typeOfDocuments();
                else if(field=='jurisdiction')
                    sortData =  $scope.jurisdictions || $scope.options.jurisdiction();
                
                $q.when(sortData)
                  .then(function(data){ 
                      sortRecords(data); 
                   });
                
            }
            
            $scope.$watch('matrixGroupBy', function(newVal){
                if(newVal){
                    groupRecords(newVal);
                }
            });
            $scope.$watch('msrJurisdiction',filterRecords);
            $scope.$watch('msrType',filterRecords);
            $scope.$watch('msrStatus',filterRecords);
            function filterRecords(newVal, oldVal){
                if(!newVal && !oldVal)
                    return;
                groupRecords($scope.matrixGroupBy);
            }

            $scope.updateFacets = function(schema,fieldName,data){

                var facets = $scope.facets[fieldName];
                if(!facets)
                    return data;

                for (var i = 0; i < facets.length; i+=2) {
                   var item =  _.where(data,{identifier:facets[i]});

                   if(item.length>0){
                       item[0].metadata = {facet : facets[i+1]};
                        item[0].title.en += ' (' + facets[i+1] + ')';
                    }
                }
                return data;
            };

            function loadSchemaFacets(){

                    var queryFacetsParameters = {
                            'q': 'realm_ss:' + realm.value.toLowerCase() + ' AND NOT version_s:* AND schema_s:measure AND government_s:'+ $routeParams.code.toLowerCase(),
                            'fl': '',       //fields for results.
                            'wt': 'json',
                            'rows': 0,      //limit
                            'facet': true,  //get counts back
                            'facet.field': ['jurisdiction_s', 'type_s', 'status_s'],
                            'facet.mincount' : 1,
                            'facet.limit': 512
                        };

                        $http.get('/api/v2013/index/select', { params: queryFacetsParameters })
                        .success(function (data) {
                            $scope.facets = data.facet_counts.facet_fields;
                            console.log(($scope.facets));
                        });
            }
            function sortRecords(sortBase){
                _.each(sortBase, function(item, index){                          
                    var groupedItem = _.find($scope.groupedMeasures, {jurisdiction : item.identifier});
                    if(groupedItem)
                    groupedItem.index = index;
                });
                $scope.groupedMeasures = _.sortBy($scope.groupedMeasures,'index')
            }
            loadSchemaFacets();
            
            $scope.showHideSection = function(elementId){
                $element.find('#'+elementId).toggle();                
            }

           }]
        };
    });


});

