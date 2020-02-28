define(['app', 'underscore',
    'views/search/search-directive'
], function(app, exportExcel) {
    "use strict";
    app.controller("SearchPageController", ["$scope", '$sce', 'ngMeta', 'realm', function($scope, $sce, ngMeta, realm) {

            
            $('[role="tooltip"]').hide();
            
            ngMeta.resetMeta();  
            var url   = realm.originalObject.baseURL + '/search'
            ngMeta.setTitle('Search')
            ngMeta.setTag('canonical', $sce.trustAsResourceUrl(url))
        }
    ]);
});
