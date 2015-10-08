define(['app',
    ,'underscore','/app/js/common.js',
        'introjs','scbd-angularjs-services', 'scbd-angularjs-filters', 'scbd-angularjs-controls',
        '/app/views/forms/view/record-loader.directive.html.js',
        '/app/views/search/find_schemas.partial.html.js',
        '/app/views/search/find_countries.partial.html.js',
        '/app/views/search/search-filter-regions.js',
        '/app/views/search/find_facets.partial.html.js',
        '/app/views/search/find_themes.partial.html.js',
        '/app/views/directives/search-filter-dates.partial.html.js',
        '/app/views/directives/document-list.partial.html.js', 'bootstrap-datepicker','moment',
        '/app/views/directives/help-directive.html.js',
        '/app/views/countries/country-map-list-directive.html.js', '/app/services/search-service.js',
        '/app/services/thesaurus-service.js',
        '/app/views/search/search-directives/search-directive.html.js'
], function(app, _) {

    app.controller('testController', ['$scope', '$http', '$filter', 'commonjs', '$location',
        function($scope, $http, $filter, commonjs, $location) {

            //**********************************************************


    }]);

});
