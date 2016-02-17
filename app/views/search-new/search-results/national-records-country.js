define(['app', '/app/js/common.js',
'/app/views/search-new/search-results/result-grouped-national-record.js',
], function(app, _) {

    app.directive('nationalRecordsCountry', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            templateUrl: '/app/views/search-new/search-results/national-records-country.html',
            scope: {
                group:'='
            },
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
                
                   if(!$scope.group)
                        $scope.norecords = true;

                   $scope.name     = $scope.group.groupValue;
                   $scope.numFound = $scope.group.doclist.numFound;
                   $scope.docs     = $scope.group.doclist.docs;
                   
                  
            }
        };
    });
});
