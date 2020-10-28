define(['app', 'text!views/reports/bch/registries/view-registry.directive.html','services/role-service'], function(app, template) {

    app.directive('registry', function() {
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
            controller: [ '$scope','searchService', function($scope,searchService) {  
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
                          $scope.data = [];
                          result.data.response.docs.forEach(function(item) {
                            Object.entries(item).forEach(([k,v]) => {  
                                    if(Array.isArray(v)){
                                        if(k != $scope.url){
                                            item[k]= v.join(', ')
                                        }
                                    }
                            }) 
                            $scope.data.push(item);
                          });

                        })
                        .finally(function(){
                            $scope.isLoading = false;
                        })
    
                }
            }]

        }
    });

});