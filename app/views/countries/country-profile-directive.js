 define(['app', 'text!views/countries/country-profile-directive.html', 'lodash',
   'views/measure-matrix/measure-matrix-countries-directive',
   'js/common',
   'views/search/search-results/result-grouped-national-record',
   'services/search-service', 'services/app-config-service',
    'views/directives/export-directive'
 ], function(app, template, _) {

    app.directive('countryProfile', function() {
        return {
            restrict: 'EAC',
            template: template,
            replace: true,
            scope: {
                api : '=?',
                code : '='
            },
            controller: ["$scope", "$routeParams",  "realm", '$element', '$timeout','searchService',
                function($scope, $routeParams, realm, $element, $timeout, searchService) {

                $scope.api = {
                    loadCountryDetails : loadCountryRecords
                }
                
                $scope.sortMeasure="[jurisdiction_sort, type_sort, status_sort, createdDate_dt, title_t]";

                var countryRecords  = {};
                var nationalSchemas = []
                var index=0;
                _(realm.schemas).map(function(schema, key){ 
                    if(schema.type=='national' && key!= 'contact'){
                        countryRecords[key] = { title : schema.title, shortCode : schema.shortCode, index: index++, docs:[], numFound:0};
                        nationalSchemas.push(key);
                    }
                }).value();

                function loadCountryRecords(code){

                    var searchQuery = $scope.exportQuery = {
                        fields  : 'id, rec_date:updatedDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:description_t,rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt, entryIntoForce_dt,adoption_dt,retired_dt,limitedApplication_dt',
                        query   : 'schema_s:(' + nationalSchemas.join(' ') +') AND government_s:' + code,
                        rowsPerPage    : 500,
                        groupField      : 'governmentSchemaIdentifier_s',
                        groupLimit      : 10
                    };

                    searchService.group(searchQuery)
                    .then(function(result){

                        var countryResult   = result.data.grouped.governmentSchemaIdentifier_s;
                        totalCount          = countryResult.ngroups;

                        _.each(countryResult.groups, function(group){

                            var gpDetails = group.groupValue.split('_');
                            var schema      = gpDetails[1];
                            if(schema=='measure'){
                                _.each(group.doclist.docs, function(document){
                                    if(!document.retired_dt || moment.utc() <= moment.utc(document.retired_dt)){
                                        document.measureMatrix = true;
                                    }
                                    else
                                        document.measureMatrix = false;
                                })
                            }
                            if($routeParams.code && $routeParams.schema && $routeParams.schema == countryRecords[schema].shortCode){                            
                                countryRecords[schema].display = true;

                                $timeout(function(){                    
                                    var div = $element.find('#div'+$routeParams.schema.toUpperCase());
                                    if(div.length>0){
                                        $('html, body').animate({scrollTop: div.offset().top}, 800);
                                    }
                                }, 500)
                            }
                            countryRecords[schema]     = _.extend(countryRecords[schema], group.doclist);

                        });
                        $scope.countryRecords = countryRecords;
                    });
                }

                $scope.$watch('code', function(newVal){
                    if(newVal){
                        loadCountryRecords(newVal);
                    }
                })

                $scope.getExportQuery = function(){
                    return $scope.exportQuery;
                
                }

                loadCountryRecords($scope.code.toLowerCase());

            }]

        };
    });
});
