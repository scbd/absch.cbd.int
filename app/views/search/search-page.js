define(['app', 'lodash', 'components/scbd-angularjs-services/main', 'views/search/search-directive',
'css!/app/css/search.css'], function(app, exportExcel) {
    "use strict";
    return ["$scope", '$sce', 'ngMeta', 'realm', 'locale', 'testResolve',
     function($scope, $sce, ngMeta, realm, locale, testResolve) {

        console.log(testResolve)
            
            $('[role="tooltip"]').hide();
            
            ngMeta.resetMeta();  
            var url   = realm.originalObject.baseURL + '/' + locale + '/search'
            ngMeta.setTitle('Search')
            ngMeta.setTag('canonical', $sce.trustAsResourceUrl(url))
        }
    ];
});
