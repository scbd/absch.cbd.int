define(['app', 'lodash', 'js/common', 'moment', 
    'views/register/directives/register-top-menu','chart-js',
    'services/search-service','services/app-config-service',
], function (app) {

        "use strict";
        app.controller("healthCheck", ["$scope", "$timeout", "searchService", "realm", "commonjs", "$q", "appConfigService", "$http", "$filter",
            function ($scope, $timeout, searchService, realm, commonjs, $q, appConfigService, $http, $filter) {

                $scope.isLoadingNMCC = false;
                $scope.records = [];


                //----------------------------------------------------------------------------------------
                $scope.checkNMCC = function () {
                    var searchOperation;
                    $scope.isLoadingNMCC = true;
                    var q = " (schema_s:measure)";

                    var queryParameters = {
                        'query': q,
                        fields : 'uniqueIdentifier_s, text_EN_txt',
                    };

                    searchOperation = searchService.list(queryParameters, null);

                    $q.when(searchOperation)
                    .then(function (data) {

                      $scope.rawDocuments = data.data.response;

                        _.each( $scope.rawDocuments.docs, function(record){
                            $scope.records.push(parseRecords(record));
                        });

                    })
                    .finally(function () {
                        $scope.isLoadingNMCC = false;
                    });
                }

                $scope.checkNMCC();

                //----------------------------------------------------------------------------------------
                function parseRecords(record){
                    var rec = record.text_EN_txt;
                    var header = JSON.parse(rec.find(getHeader));
                    console.log(header)
                    return header;
                }
                //----------------------------------------------------------------------------------------
                function getHeader(str) {
                    if(str.startsWith('{\"header\"') )
                        return str;
                  }


            }]);
    });
