define(['app', "text!./measure-matrix-countries-directive.html",
        'lodash','components/scbd-angularjs-services/main', 'components/scbd-angularjs-controls/main',
        'views/measure-matrix/measure-matrix-elements-derective',
        'views/forms/view/record-loader.directive'], function(app, template, _) {

    app.directive("measureMatrixCountriesDirective", function() {
        return {
            restrict: "EAC",
            template: template, 
            replace: true,
            transclude: false,
            scope: {
                documents: "="
            },
            link:{},
            controller: ['$scope', '$http', 'realm', '$q', '$filter', '$routeParams', '$element',
                            function($scope, $http, realm, $q, $filter, $routeParams, $element) {

            $scope.documentsLoaded = false;
            
             $scope.isSelected = function(docID) {
                 return;
             }

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
                        $scope.measures = _.filter(docs, {measureMatrix:true});
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
                _.forEach(sortBase, function(item, index){
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
