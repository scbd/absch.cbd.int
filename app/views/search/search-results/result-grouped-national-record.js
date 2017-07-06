define(['app', 'text!/app/views/search/search-results/result-grouped-national-record.html','underscore', '/app/js/common.js',
'/app/views/forms/view/record-loader.directive.html.js'
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
