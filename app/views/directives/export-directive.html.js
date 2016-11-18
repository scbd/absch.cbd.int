define(['app',
'/app/services/search-service.js', 'ngDialog',
], function (app, ExcellentExport) {
    app.directive('export', function () {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/directives/export-directive.html',
            scope: {
                exportQuery: '&',
                queryType: '&',
                helpTitle: '@'
            },
            link: function ($scope, element, attrs) {
                
            },
            controller: ["$scope", '$rootScope', '$filter', '$timeout', 'commonjs', '$q', 'searchService', 'ngDialog', '$element',
                function ($scope, $rootScope, $filter, $timeout, commonjs, $q, searchService, ngDialog, $element) {

                    $scope.showDialog = function(){
                        var query = $scope.exportQuery();
                        var queryType = $scope.queryType();

                        ngDialog.open({
                            className : 'ngdialog-theme-default wide',
                            template : 'exportDialog',
                            controller : ['$scope', '$element', function($scope, $element){
                                    
                                    $scope.downloadFormat = 'xls';
                                    $scope.downloadData =  function(){

                                        var dowloadButton = $element.find('.' + $scope.downloadFormat)
                                        if(dowloadButton && dowloadButton.length==0){
                                            $scope.loading = true;
                                            $q.when(loadData(1000))
                                            .then(function(){
                                                require([//'xlsx-core', //'xlsx'  ,
                                                        'file-saver'  ,
                                                        'tableexport'], function(){
                                                            //, "xlsx"
                                                                $element.find('#datatable').tableExport({
                                                                    formats: ["xls", "csv"],
                                                                    fileName: "ABSCH-data",
                                                                });
                                                                $element.find('.' + $scope.downloadFormat).click();
                                                        });     
                                            })
                                            .finally(function(){
                                                $scope.loading = false;
                                            });                
                                        }
                                        else
                                            dowloadButton.click();                        
                                    };

                                    $scope.closeDialog = function(){
                                        ngDialog.close();                                            
                                    }

                                    var fields = 'id, rec_date:updatedDate_dt, identifier_s, uniqueIdentifier_s, url_ss, schema_s, government_EN_t, _revision_i,' + 
                                    'rec_title:title_EN_t, rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt';
                                    function loadData(rows){
                                        var localQuery = angular.copy(query);
                                        var searchOperation;

                                        localQuery.rowsPerPage = rows;
                                        localQuery.currentPage = 0;
                                        localQuery.fields = fields;

                                        if(queryType == 'group')
                                            searchOperation = searchService.group(localQuery);
                                        else
                                            searchOperation = searchService.list(localQuery);

                                        return $q.when(searchOperation)
                                                .then(function(data) {

                                                        var documents = [];

                                                        if(queryType == 'group'){
                                                            _.each(data.data.grouped.government_s.groups, function(country){
                                                                _.each(country.doclist.docs, function(doc){
                                                                documents.push(doc);     
                                                                });
                                                            });
                                                        }
                                                        else if(data.data.response.docs)
                                                            documents = data.data.response.docs;

                                                        $scope.downloadDocs = documents;                               
                                                });

                                    }

                                    $scope.getMeta = function(meta){
                                        if(angular.isArray(meta))
                                            return meta.join('; ');
                                        else 
                                            return meta;
                                    }

                                    loadData(10);
                            }]
                        })
                    }

                     $timeout(function(){
                        $element.find('[data-toggle="tooltip"]').tooltip();
                    },50);
                }
            ]
        };
    });
});

