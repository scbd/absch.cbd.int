define(['app','text!views/directives/export-directive.html',
'/app/services/search-service.js', 'ngDialog',
], function (app, template) {
    app.directive('export', function () {
        return {
            restrict: 'EAC',
            template: template,
            scope: {
                exportQuery: '&',
                queryType: '&',
                helpTitle: '@'
            },
            link: function ($scope, element, attrs) {
                
            },
            controller: ["$scope", '$rootScope', '$filter', '$timeout', 'commonjs', '$q', 'searchService', 'ngDialog', '$element', 'locale',
                function ($scope, $rootScope, $filter, $timeout, commonjs, $q, searchService, ngDialog, $element, locale) {
                    
                    var language = (locale || 'en').toUpperCase();

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
                                            $q.when(loadData(5000))
                                            .then(function(){
                                                require(['tableexport'], function(){
                                                    $element.find('#datatable').tableExport({
                                                        formats: ["xlsx", "xls", "csv"],
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

                                    var fields = 'id, rec_date:updatedDate_dt, identifier_s, uniqueIdentifier_s, url_ss, schema_s, government:government_EN_t, _revision_i,' + 
                                    'rec_title:title_EN_t, rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt';
                                    if(language!='EN')
                                        fields = fields.replace(/_EN/g, '_'+language);
                                    function loadData(rows){
                                        var localQuery = angular.copy(query);
                                        var searchOperation;

                                        localQuery.rowsPerPage = rows;
                                        localQuery.currentPage = 0;
                                        localQuery.fields = fields;

                                        searchOperation = searchService.list(localQuery);

                                        return $q.when(searchOperation)
                                                .then(function(data) {
                                                    $scope.downloadDocs = data.data.response.docs;                               
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

