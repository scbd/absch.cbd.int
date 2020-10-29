define(['app', 'text!views/reports/bch/registries/view-registry.directive.html', 'services/role-service'], function (app, template) {
    app.directive('registry', function () {
        return {
            restrict: 'EA',
            template: template,
            scope: {
                schema: '@',
                fields: '@',
                caption: "@",
                url: "@",
               //rowsPerPage: "@"
            }, 
            controller: ['$scope', 'searchService', '$element', '$timeout', function ($scope, searchService, $element, $timeout) {
                loadRecords();
                function loadRecords() {
                    $scope.isLoading = true;
                    var searchQuery = {
                        fields: $scope.fields,
                        query: 'schema_s:' + $scope.schema,
                       //rowsPerPage: $scope.rowsPerPage
                    };
                    return searchService.list(searchQuery)
                        .then(function (result) {
                            $scope.data = [];
                            $scope.numFound = result.data.response.numFound;
                            result.data.response.docs.forEach(function (item) {
                                for (var prop in item) {
                                    if (Array.isArray(item[prop])) {
                                        if (prop != $scope.url) {
                                            item[prop] = item[prop].join(', ')
                                        }
                                    }
                                }
                                $scope.data.push(item);
                            });

                        })
                        .finally(function () {
                            $scope.isLoading = false;
                        })

                }
                $scope.export = function () {
                    $scope.dataToExport = $scope.data;
                    $scope.readyForExport = true;
                    require(['tableexport'], function () {
                        $element.find('#forExport').tableExport({
                            formats: ['xlsx'],
                            filename: $scope.schema + '-registry',
                        });
                        $element.find('.xlsx').click();
                        $timeout(function () {
                            $scope.readyForExport = false;
                        }, 200)
                    });
                }

            }]

        }
    });

}); 