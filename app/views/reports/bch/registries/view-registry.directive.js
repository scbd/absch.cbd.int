define(['app', 'text!views/reports/bch/registries/view-registry.directive.html','services/role-service'], function(app, template, searchService) {

    app.directive('registryDirective', function() {
        return {
            restrict: 'EA',
            template: template,
            scope: {
                schema: '@',
                fields: '@', 
                caption:"@",
                url:"@",
                rowsPerPage:"@"
            },
            controller: ['$q', '$scope','$http','searchService', function($q, $scope, $http, searchService) { 
                $scope.isArray = angular.isArray;
                loadRecords();
                function loadRecords( ){
                    $scope.isLoading = true;
                    var searchQuery = {
                        fields:  $scope.fields,
                        query:  'schema_s:'+$scope.schema,
                        rowsPerPage:$scope.rowsPerPage
                    };
                    return searchService.list(searchQuery)
                        .then(function(result){
                            $scope.data =result.data.response.docs; 
                            console.log($scope.data);
                        })
                        .finally(function(){
                            $scope.isLoading = false;
                        })
    
                }
            }]

        }
    });

});
