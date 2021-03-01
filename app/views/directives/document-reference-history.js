define(['app', 'text!./document-reference-history.html',
'views/search/search-results/result-default', 'services/main'
], function (app, template) {
    app.directive('documentReferenceHistory', function ($http) {
        return {
            restrict: 'EAC',
            replace: true,
            template: template, 
            scope: {
                'identifier': '@'
            },
            controller: ['$scope', 'solr', 'searchService', '$q', function ($scope, solr, searchService, $q) {

                $scope.loadRecordReferenceHistory = function (identifier) {
                    var searchOperation;
                    $scope.isLoading = true;
                    var q = " (identifier_s:" + solr.escape($scope.identifier) + ")";

                    var queryParameters = {
                        'query': q,
                        fields : 'uniqueIdentifier_s'
                    };

                    searchOperation = searchService.list(queryParameters, null);

                    $q.when(searchOperation)
                    .then(function (data) {

                        var searchOperation;
                        $scope.isLoading = true;
                        var q = "text_AR_txt:" + solr.escape(data.uniqueIdentifier_s);
                        q = q + " AND NOT (identifier_s:" + solr.escape($scope.identifier) + ")";

                        var queryParameters = {
                            'query': q,
                            'currentPage': 0,
                            'rowsPerPage': 1000
                        };

                        searchOperation = searchService.list(queryParameters, null);

                       return $q.when(searchOperation)
                                .then(function (data) {
                                    $scope.rawDocuments = data.data.response;
                                })
                    })
                    .finally(function () {
                        $scope.isLoading = false;
                    });
                }

                $scope.loadRecordReferenceHistory($scope.identifier);

            }]
        };

    });
});
