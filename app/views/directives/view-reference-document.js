define(['app', 'text!./view-reference-document.html', 'components/scbd-angularjs-services/main',
 'views/search/search-results/result-default', 'views/forms/view/record-loader.directive'],
 function(app, template) {

    app.directive('viewReferenceDocument', ['IStorage', '$q', function(storageService, $q) {

            return {
                restrict: 'EAC',
                replace: false,
                template: template,
                scope: {
                    identifier: '='
                },
                link: function($scope, $element) {
                    if($scope.identifier){

                        $q.when(storageService.documents.get($scope.identifier, {info:true}))
                        .then(function(results){
                            
                            if(results.data){
                                $scope.document = results.data.body;
                                $scope.document.info = results.data;
                                delete $scope.document.info.body;
                                if($scope.document.header.schema == 'authority'){
                                    $scope.document.title = $scope.document.name;
                                }
                            }
                        })
                    }
                }
            };

        }
    ]);
});
