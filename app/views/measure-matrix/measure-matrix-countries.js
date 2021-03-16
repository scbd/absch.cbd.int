import app from 'app';
import _ from 'lodash';
import 'components/scbd-angularjs-services/main';
import 'components/scbd-angularjs-controls/main';
import 'views/measure-matrix/measure-matrix-elements-directive';
import 'views/forms/view/record-loader.directive';

    export { default as template } from './measure-matrix-countries.html';
export default ['$scope', '$http', 'realm', '$q', '$filter', '$routeParams', '$element',
        function($scope, $http, realm, $q, $filter, $routeParams, $element) {

            $scope.options  = {
               jurisdiction             : function () { return $http.get("/api/v2013/thesaurus/domains/7A56954F-7430-4B8B-B733-54B8A5E7FF40/terms",  { cache: true })
                                                                    .then(function(o){ return $scope.updateFacets($scope.measure, 'jurisdiction_s',o.data); }); },
               status                   : function () { return $http.get("/api/v2013/thesaurus/domains/ED7CDBD8-7762-4A84-82DD-30C01458A799/terms",  { cache: true })
                                                                    .then(function(o){ return $scope.updateFacets($scope.measure,'status_s',o.data) }); },
               typeOfDocuments          : function () { return $http.get("/api/v2013/thesaurus/domains/144CF550-7629-43F3-817E-CACDED34837E/terms",  { cache: true })
                                                                    .then(function(o){ return $scope.updateFacets($scope.measure,'type_s',o.data) }); }
            };

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
                    .then(function(res){return res.data}).then(function (data) {

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
                                $scope.matrixGroupBy = 'jurisdiction';

                            });

                    }).catch(function(error) {
                        console.log('onerror');
                        console.log(error);
                    });
            }
            var measuresCache = {};
            $scope.loadMatrix = function(measure) {

                return $q.when($http.get('/api/v2013/documents/' + measure.identifier_s,{cache:true}))
                    .then(function(document) {
                        measure.document = document.data;

                        // console.log('measure');

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
                    return measure.document.jurisdiction.identifier +  (measure.document.jurisdictionName ? '#' + $filter('lstring')(measure.document.jurisdictionName) : '');
                });
                $scope.groupedMeasures = _.map(grpMeasures, function(group,key){
                    //console.log(key);
                    return {
                            jurisdiction:key,
                            measures:group
                            };
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
                   var item =  _.filter(data,{identifier:facets[i]});

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
                        .then(function(res){return res.data}).then(function (data) {
                            $scope.facets = data.facet_counts.facet_fields;
                            console.log(($scope.facets));
                        });
            }
            loadSchemaFacets();
            jurisdictions();
            
            $scope.showHideSection = function(elementId){
                $element.find('#'+elementId).toggle();                
            }

        }
    ];



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
