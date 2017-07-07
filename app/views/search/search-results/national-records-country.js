define(['app', 'text!views/search/search-results/national-records-country.html','/app/js/common.js',
'/app/views/search/search-results/result-grouped-national-record.js',
'/app/views/directives/party-status.js',
], function(app, template, _) {

    app.directive('nationalRecordsCountry', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            template: template, 
            scope: {
                group:'='
            },
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
                   var currentPage = 1;
                   if(!$scope.group)
                        $scope.norecords = true;

                   $scope.name      = $scope.group.groupValue;
                   $scope.numFound  = $scope.group.doclist.numFound;
                   $scope.docs      = $scope.group.doclist.docs;
                   $scope.getFilter = searchDirectiveCtrl.getFilter;
                //    $scope.loading   = $scope.group.loading;
                   //
                   //
                //    $scope.updateScrollPage = function() {
                //        if($scope.loading || $scope.docs.length == $scope.numFound)
                //            return;
                //        $scope.loading = true;
                //        currentPage = currentPage + 1;
                //        searchDirectiveCtrl.nationalQuery(currentPage);
                //    };

            },
        };
    });
});
