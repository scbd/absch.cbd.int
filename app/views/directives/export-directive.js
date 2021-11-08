import app from 'app';
import template from 'text!./export-directive.html';
import _ from 'lodash';
import 'services/main';
import 'ngDialog';
    app.directive('export', function () {
        return {
            restrict: 'EAC',
            template: template,
            scope: {
                exportQuery: '&',
                queryType: '&',
                helpTitle: '@',
                openDialog: '=?'
            },
            link: function ($scope, element, attrs) {
                $scope.$watch('openDialog', function(show, hide){
                    if(show===undefined)
                        return;
                    if(show)
                        $scope.showDialog(true);
                    else 
                        $scope.closeDialog();
                })
            },
            controller: ["$scope", 'solr', '$filter', '$timeout', 'commonjs', '$q', 'searchService', 'ngDialog', '$element', 'locale', 'roleService',
                function ($scope, solr, $filter, $timeout, commonjs, $q, searchService, ngDialog, $element, locale, roleService) {
                    
                    var language = (locale || 'en').toUpperCase();

                    $scope.showDialog = function(forTour){
                        var query = $scope.exportQuery();
                        var queryType = $scope.queryType();

                        ngDialog.open({
                            showClose : !forTour,
                            closeByEscape : !forTour,
                            closeByNavigation : !forTour,
                            closeByDocument : !forTour,
                            name     : 'exportDialog',
                            className : 'ngdialog-theme-default wide',
                            template : 'exportDialog',
                            controller : ['$scope', '$element', function($scope, $element){
                        
                                    $scope.isAdministrator = roleService.isAdministrator();
                                    $scope.forTour = forTour;
                                    $scope.downloadFormat = 'xlsx';
                                    $scope.downloadFormat = downloadFormat = 'xlsx';
                                    $scope.downloadData =  function(){

                                        var dowloadButton = $element.find('.' + $scope.downloadFormat)
                                        if(dowloadButton && dowloadButton.length==0){
                                            $scope.loading = true;
                                            $q.when(loadData(5000))
                                            .then(function(){
                                                require(['tableexport'], function(){
                                                    $element.find('#datatable').tableExport({
                                                        formats: ["xlsx", "xls", "csv"],
                                                        filename: "ABSCH-data",
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
                                    $scope.customFieldList=[];
                                    var fields = 'id, rec_date:updatedDate_dt, identifier_s, uniqueIdentifier_s, url_ss, schema_s, government_s, government:government_EN_t, _revision_i,' + 
                                                 'rec_title:title_EN_t, rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt';
                                    
                                    if(language!='EN')
                                        fields = fields.replace(/_EN/g, '_'+language);

                                    function loadData(rows){
                                        var localQuery = angular.copy(query);
                                        var searchOperation;

                                        localQuery.rowsPerPage = rows;
                                        localQuery.currentPage = 0;
                                        localQuery.fields = fields+','+$scope.customFieldList.join(',');

                                        searchOperation = searchService.list(localQuery);

                                        return $q.when(searchOperation)
                                                .then(function(data) {

                                                    if($scope.customFieldList.length>0){
                                                        var partyStatusOperation;
                                                        if($scope.customFieldList.indexOf('partyStatus')>=0){
                                                            partyStatusOperation = commonjs.getCountries();
                                                        }
                                                        return $q.when(partyStatusOperation)
                                                                .then(function(partyStatusData){
                                                                    console.log(partyStatusData);
                                                                    $scope.downloadDocs = data.data.response.docs;
                                                                    _.forEach($scope.downloadDocs, function(document){
                                                                        _.forEach($scope.customFieldList, function(field){
                                                                            if(field == 'thematicAreas_ss')
                                                                                document[field] = document[field] && document[field].length > 0
                                                                            else if(field == 'partyStatus'){
                                                                                var status = _.find(partyStatusData, {code: document.government_s.toUpperCase()})
                                                                                if(status.isParty)
                                                                                    document[field] =  'Party';
                                                                                else
                                                                                    document[field] =  'Non Party';
                                                                            }
                                                                            else if(document[field] instanceof Array){
                                                                                document[field] = document[field].join(', ');
                                                                            }
                                                                        })
                                                                    })
                                                                });
                                                    }

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


                                    $scope.customFields = function(){
                                        var customFields = $scope.customFieldList;
                                        var fieldsDialog = ngDialog.open({
                                            name     : 'customFields',
                                            template : 'customFieldsDialog',
                                            controller : ['$scope', '$q', '$http', 'realm', '$timeout',async function($scope, $q, $http, realm, $timeout){
                                                    $scope.fields = [
                                                        { name : 'partyStatus', title : 'Party Status',  description : '', field : 'partyStatus'},
                                                        { name : 'createdOn', title : 'Created on', description : '', field : 'createdDate_dt'},
                                                        { name : 'regionalMeasure', title : 'Is Regional Measure', description : '', field : 'virtual_b'},
                                                        { name : 'measureElements', title : 'Has elements of measure', description : '', field : 'thematicAreas_ss', type : 'length'}
                                                    ];
                                                    $scope.closeDialog = function(){
                                                        ngDialog.close(fieldsDialog.id);                                            
                                                    }

                                                    $scope.done = function(){
                                                        customFields = _.map(_.filter($scope.fields, function(field){return field.selected}), 'field');
                                                        $scope.closeDialog();
                                                        $element.find('.'+downloadFormat).remove();
                                                        
                                                    }
                                                    
                                                    const data = await import('~/views/directives/field-list')
                                                    var fields = ((data||{}).fields||{}).split(',')
                                                    $timeout(function(){
                                                        $scope.fields = _.union($scope.fields, _.map(fields, function(field){
                                                                        return {name: field, title:field, field: field}
                                                                    }));
                                                        if(customFields && customFields.length > 0){
                                                            customFields.forEach(function(f){
                                                                var field = _.find($scope.fields, {'field':f})
                                                                if(field)
                                                                    field.selected = true;
                                                            })
                                                        }
                                                    });
                                            }]
                                        })
                                        fieldsDialog.closePromise.then(function(data){
                                           $scope.customFieldList = customFields;
                                           loadData(10);
                                        });
                                    }
                            }]
                        })
                    }

                    $timeout(function(){
                        $element.find('[data-bs-toggle="tooltip"]').tooltip();
                    },50);

                    $scope.closeDialog = function(){
                        ngDialog.close();     
                    }
                }
            ]
        };
    });


