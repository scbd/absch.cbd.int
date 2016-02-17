define(['app', 'underscore', '/app/js/common.js',
], function(app, _, $http) {

    app.directive('schemaFilters', function($http) {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            templateUrl: '/app/views/search-new/search-filters/schema-filters.html',
            scope: {},
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
                
                //49480203-B4EF-4ABC-B0F6-037CD7C59C23
                $http.get("/api/v2013/thesaurus/domains/49480203-B4EF-4ABC-B0F6-037CD7C59C23/terms", {
                    cache: true
                 }).then(function(o) {
                    $scope.filters = o.data;
                });
                
                $scope.saveFilter = searchDirectiveCtrl.saveFilter;
                $scope.isFilterOn = searchDirectiveCtrl.isFilterOn;
                
                searchDirectiveCtrl.addFilter('nationalRecords', {'value':false, 'type':'schema', 'name':'national records', 'id':'nationalRecords'});
                searchDirectiveCtrl.addFilter('referenceRecords',{'value':false, 'type':'schema', 'name':'reference records', 'id':'referenceRecords'});
                searchDirectiveCtrl.load();

            }//link
        };
    });
});
