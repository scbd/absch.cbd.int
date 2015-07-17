define(['app', 'underscore',
        '/app/views/search/measure-matrix-elements-derective.html.js'], function(app, _) {

    app.controller('countryMatrixController', ['$scope', '$http', 'realm', '$q', '$filter', '$routeParams','$filter',
        function($scope, $http, realm, $q, $filter, $routeParams, $filter) {



            $scope.currentPage = 0;
            $scope.itemsPerPage = 1000;
            if ($routeParams.code) {
                var queryParameters = {
                    'q': 'realm_ss:' + realm.value.toLowerCase() + ' AND schema_s:measure AND government_s:' + $routeParams.code.toLowerCase(),
                    'sort': 'government_EN_t asc',
                    'fl': 'id,identifier_s,title_t,createdDate_dt,description_t,government_EN_t,status_EN_t,type_EN_t,jurisdiction_EN_t,adoption_dt,entryIntoForce_dt,retired_dt,limitedApplication_dt',
                    'wt': 'json',
                    'start': $scope.currentPage * $scope.itemsPerPage,
                    'rows': $scope.itemsPerPage
                };

                $http.get('/api/v2013/index/select', {
                        params: queryParameters
                    })
                    .success(function(data) {

                        $scope.measures = [];
                        var measuresData = data.response.docs;
                        $scope.documentCount = data.response.numFound;

                        var measuresQueryList = _.map(measuresData, function(measure) {
                            return $scope.loadMatrix(measure);
                        });
                        $q.all(measuresQueryList)
                            .then(function() {
                                //measure.isLoading=false;
                                console.log('done');
                                $scope.measures = measuresData;

                                var grpMeasures = _.groupBy($scope.measures, function(measure){
                                    return measure.document.jurisdiction.identifier +  (measure.document.jurisdictionName ? '#' + $filter('lstring')(measure.document.jurisdictionName) : '');
                                });
                                $scope.groupedMeasures = _.map(grpMeasures, function(group,key){
                                    //console.log(key);
                                    return {
                                            jurisdiction:key,
                                            measures:group
                                            };
                                });
                                console.log(($scope.groupedMeasures));

                            });

                    }).error(function(error) {
                        console.log('onerror');
                        console.log(error);
                    });
            }
            var measuresCache = {};
            $scope.loadMatrix = function(measure) {

                return $q.when($http.get('/api/v2013/documents/' + measure.identifier_s,{cache:true}))
                    .then(function(document) {
                        measure.document = document.data;

                        console.log('measure');

                        var amendedMeasuresQuery = _.map(measure.document.amendedMeasures, function(amended) {
                            return $http.get('/api/v2013/documents/' + amended.identifier,{cache:true});
                        });

                        return $q.all(amendedMeasuresQuery)
                            .then(function(amendedMeasures) {
                                amendedMeasures.forEach(function(amendedMeasureData) {
                                    var amended = _.findWhere(measure.document.amendedMeasures, {
                                        identifier: amendedMeasureData.data.header.identifier
                                    });
                                    amended.measure = amendedMeasureData.data;
                                });
                                return measure.document;
                            });
                    })
                    // .then(function(data) {
                    //
                    //
                    // })
                    .catch(function(error) {
                        console.log('onerror');
                        console.log(error);
                    })
                    .finally(function() {
                        measure.isLoading = false;
                    });
            };

            function getMeasure(identifier){

                var promise = $q.defer();

                var measure = _.find(measuresCache, function(measure){
                                    return measure.header.identifier == identifier;
                              });
                if(measure){
                    return measure;
                }
                return promise;$http.get('/api/v2013/documents/' + linked.identifier);

            }

            function  jurisdictions() {
                return $q.all([
                  $http.get("/api/v2013/thesaurus/domains/7A56954F-7430-4B8B-B733-54B8A5E7FF40/terms", { cache: true }),
                  $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",   { cache: true })
                ]).then(function(o) {
                  $scope.jurisdictions = o[0].data;
                  $scope.jurisdictions.push(o[1].data);
                  return jurisdictions;
                });
            }
            jurisdictions();
        }
    ]);

});

// var linkedMeasuresQuery = _.map(data.linkedMeasures, function(linked) {
//     return $http.get('/api/v2013/documents/' + linked.identifier,{cache:true});
// });
// return $q.all(linkedMeasuresQuery)
//     .then(function(linkedMeasures) {
//         linkedMeasures.forEach(function(linkedMeasureData) {
//             var amended = _.findWhere(data.linkedMeasures, {
//                 identifier: linkedMeasureData.data.header.identifier
//             });
//             amended.measure = linkedMeasureData.data;
//         });
//         return data;
//     });
