define(['app', '/app/js/common.js',
    '/app/views/forms/view/record-loader.directive.html.js',
    '/app/views/register/directives/register-top-menu.js'
], function (app) {
    app.controller('adminReportedRecordsCtrl', ['$scope', '$http', '$timeout', '$element',
        function ($scope, $http, $timeout, $element) {
            
            
            $http.get('/api/v2015/report-records')
                .then(function (data) {
                    $scope.reportRecords = data.data
                });

            $scope.api = {};
            
            $scope.loadDocumentDetails = function (showDoc, record) {
                if (showDoc) {
                    $timeout(function () {
                        $scope.api.recordLoaderApi.loadDocument(record.schema, record.identifier);
                    }, 10);
                }
            };
        }]
    );

});
