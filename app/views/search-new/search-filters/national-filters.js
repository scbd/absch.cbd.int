define(['app', 'underscore', '/app/js/common.js', '/app/views/search-new/search-filters/search-filter.js',
], function(app, _, $http) {

    app.directive('nationalFilters', function($http) {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            templateUrl: '/app/views/search-new/search-filters/national-filters.html',
            scope: {},
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
                
                $scope.saveFilter = searchDirectiveCtrl.saveFilter;
                $scope.isFilterOn = searchDirectiveCtrl.isFilterOn;
                
                searchDirectiveCtrl.addFilter('nationalRecords', {'type':'national', 'value':false, 'all': true,  'name':'National Records', 'id':'nationalRecords'});
                searchDirectiveCtrl.addFilter('nfp',  {'type':'national', 'value':false, 'name':'ABS National Focal Point', 'id':'nfp'});
                searchDirectiveCtrl.addFilter('cna',  {'type':'national', 'value':false, 'name':'Competent National Authorities', 'id':'cna'});
                searchDirectiveCtrl.addFilter('msr',  {'type':'national', 'value':false, 'name':'Legislative, administrative or policy measures', 'id':'msr'});
                searchDirectiveCtrl.addFilter('ndb',  {'type':'national', 'value':false, 'name':'National Websites and Databases', 'id':'ndb'});
                searchDirectiveCtrl.addFilter('ircc', {'type':'national', 'value':false, 'name':'Internationally Recognized Certificate of Compliance', 'id':'ircc'});
                searchDirectiveCtrl.addFilter('cp',   {'type':'national', 'value':false, 'name':'Checkpoints', 'id':'cp'});
                searchDirectiveCtrl.addFilter('cpc',  {'type':'national', 'value':false, 'name':'Checkpoint Communiqués ', 'id':'cpc'});
                
                //searchDirectiveCtrl.load();

            }//link
            
        };
    });
});
