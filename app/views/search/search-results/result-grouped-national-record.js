define(['app', 'text!views/search/search-results/result-grouped-national-record.html','underscore', 'js/common',
'views/forms/view/record-loader.directive.html'
], function(app, template, _) {

    app.directive('resultGroupedNationalRecord', ["$timeout", function($timeout) {
        return {
            restrict: 'EAC',
            replace: true,
            template: template, 
            scope: {
                doc:'='
            },
            link: function($scope, $element) {
                $scope.api = {};
                $scope.$watch('showDoc', function(newVal){
                    if(newVal && $scope.doc){
                        $timeout(function(){
                            $scope.api.recordLoaderApi.loadDocument($scope.doc.schema_s, $scope.doc.identifier_s);
                        }, 10);
                    } 
                });


            },
        };
    }]);
});
