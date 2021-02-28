define(['app', 'lodash', 'components/scbd-angularjs-services/main', 'views/search/search-directive',
'css!/app/css/search.css'], function(app, exportExcel) {
    "use strict";
    app.controller("SearchPageController", ["$scope", '$sce', 'ngMeta', 'realm', 'locale', function($scope, $sce, ngMeta, realm, locale) {

            
            $('[role="tooltip"]').hide();
            
            ngMeta.resetMeta();  
            var url   = realm.originalObject.baseURL + '/' + locale + '/search'
            ngMeta.setTitle('Search')
            ngMeta.setTag('canonical', $sce.trustAsResourceUrl(url))
        }
    ]);
});
