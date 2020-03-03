define(['app', 'underscore', 'components/scbd-angularjs-services/services/locale', 'views/search/search-directive'], function(app, exportExcel) {
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
