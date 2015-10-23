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

            $scope.documentsLoaded = false;

            $scope.$watch('documents', function(docs){
                if(docs && docs.length>0){
                    if(!$scope.documentsLoaded){
                        var measuresQueryList = _.map(docs, function(measure) {
                                return $scope.loadMatrix(measure);
                            });
                            $q.all(measuresQueryList)
                                .then(function() {
                                    $scope.measures = docs;
                                    $scope.documentsLoaded = true;
                                });
                    }
                    else{
                        $scope.measures = _.where(docs, {measureMatrix:true});
                        $scope.apiMeasure.reloadMatrix();
                    }
                }
            },true);

            $scope.loadMatrix = function(measure) {

                return $q.when($http.get('/api/v2013/documents/' + measure.identifier_s,{cache:true}))
                    .then(function(document) {
                        measure.document = document.data;
                        return;
                    })
                    .catch(function(error) {
                        console.log('onerror');
                        console.log(error);
                    })
                    .finally(function() {
                        measure.isLoading = false;
                    });
            };
            function sortRecords(sortBase){
                _.each(sortBase, function(item, index){                          
                    var groupedItem = _.find($scope.groupedMeasures, {jurisdiction : item.identifier});
                    if(groupedItem)
                    groupedItem.index = index;
                });
                $scope.groupedMeasures = _.sortBy($scope.groupedMeasures,'index')
            }

            $scope.showHideSection = function(elementId){
                $element.find('#'+elementId).toggle();
            }

           }]
        };
    });


});
