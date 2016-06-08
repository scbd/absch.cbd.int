define(['app', '/app/services/search-service.js',
'/app/views/search/search-results/result-default.js',
], function (app) {
    app.directive('documentReferenceHistory', function ($http) {
        return {
            restrict: 'EAC',
            replace: true,
            templateUrl: '/app/views/directives/document-reference-history.html',
            scope: {
                'identifier': '@'
            },
            controller: ['$scope', '$filter', 'searchService', '$q', function ($scope, $filter, searchService, $q) {

                $scope.loadRecordReferenceHistory = function (identifier) {
                    var searchOperation;
                    $scope.isLoading = true;
                    var q = " (identifier_s:" + $scope.identifier + ")";

                    var queryParameters = {
                        'query': q,
                        fields : 'uniqueIdentifier_s'
                    };

                    searchOperation = searchService.list(queryParameters, null);

                    $q.when(searchOperation)
                    .then(function (data) {

                        var searchOperation;
                        $scope.isLoading = true;
                        var q = "text_AR_txt:" + data.uniqueIdentifier_s;
                        q = q + " AND NOT (identifier_s:" + $scope.identifier + ")";

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
