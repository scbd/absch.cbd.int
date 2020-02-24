define(['app', 'text!views/search/search-results/result-default.html','lodash', 'js/common',
'views/forms/view/record-loader.directive'
], function(app, template, _) {

    app.directive('resultDefault', ["$timeout", function($timeout) {
        return {
            restrict: 'EAC',
            replace: true,
            template: template, 
            scope: {
                doc:'=',
                type:'@'
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

                $scope.canShowIcons = function(schema){
                    return _.includes(['modifiedOrganism', 'nationalRiskAssessment', 'independentRiskAssessment'], schema);
                }

                
            },
        };
    }]);
});
