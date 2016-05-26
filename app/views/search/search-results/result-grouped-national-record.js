define(['app', 'underscore', '/app/js/common.js',
'/app/views/forms/view/record-loader.directive.html.js'
], function(app, _) {

    app.directive('resultGroupedNationalRecord', ["$timeout", function($timeout) {
        return {
            restrict: 'EAC',
            replace: true,
            templateUrl: '/app/views/search/search-results/result-grouped-national-record.html',
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
