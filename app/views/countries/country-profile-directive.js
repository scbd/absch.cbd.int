 define(['app', 'text!views/countries/country-profile-directive.html', 'lodash', 
   'views/measure-matrix/measure-matrix-countries-directive',
   'js/common', 'services/solr',
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
            controller: ["$scope", "$routeParams",  "realm", '$element', '$timeout','searchService', '$filter', 'solr',
                function($scope, $routeParams, realm, $element, $timeout, searchService, $filter, solr) {

                $scope.api = {
                    loadCountryDetails : loadCountryRecords
                }
                $scope.loadRecords  = loadRecords;
                $scope.sortMeasure  = "[jurisdiction_sort, type_sort, status_sort, createdDate_dt, title_t]";

                var countryRecords  = {};
                var nationalSchemas = []
                var index=0;
                _(realm.schemas).map(function(schema, key){ 
                    if(schema.type=='national' && key!= 'contact' && key!= 'countryProfile'){
                        countryRecords[key] = { title : schema.title, shortCode : schema.shortCode, index: index++, docs:[], numFound:0};
                        nationalSchemas.push(key);
                    }
                }).value();


                $scope.$watch('code', function(newVal){
                    if(newVal){
                        loadCountryRecords(newVal.toLowerCase());
                    }
                })
                $scope.showHideRecords = function(key, schema){
                    schema.display = !schema.display;
                    if(key == 'measure'){ //for measure load all remaining records to build the measure matrix
                        loadRecords(key, schema)
                    }

                }
                $scope.getExportQuery = function(){
                    return $scope.exportQuery;
                
                }

                function loadCountryRecords(code){

                    var searchQuery = $scope.exportQuery = {
                        fields  : 'id, rec_date:updatedDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:description_t,summary_t,rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt, entryIntoForce_dt,adoption_dt,retired_dt,limitedApplication_dt',
                        query   : 'schema_s:(' +_.map(nationalSchemas, solr.escape).join(' ') +') AND government_s:' + solr.escape(code),
                        rowsPerPage    : 500,
                        sort           : 'updatedDate_dt desc',
                        groupField     : 'government_schema_s',
                        groupLimit     : 10
                    };

                    searchService.group(searchQuery)
                    .then(function(result){

                        var countryResult   = result.data.grouped.government_schema_s;
                        var totalCount      = countryResult.ngroups;

                        _.forEach(countryResult.groups, function(group){

                            var gpDetails = (group.groupValue||'').split('_');
                            if(!gpDetails.length)
                                return;
                            var schema      = gpDetails[1];
                            if(schema=='measure'){
                                formatting(group.doclist.docs);
                            }
                            countryRecords[schema]     = _.extend(countryRecords[schema], group.doclist);

                        });
                        var schemaName = $filter('mapSchema')($routeParams.schema);
                        if($routeParams.code && $routeParams.schema && $routeParams.schema == countryRecords[schemaName].shortCode){                            
                            countryRecords[schemaName].display = true;

                            $timeout(function(){                    
                                var div = $element.find('#div'+$routeParams.schema.toUpperCase());
                                if(div.length>0){
                                    $('html, body').animate({scrollTop: div.offset().top}, 800);
                                }
                            }, 500)
                        }
                        $scope.countryRecords = countryRecords;
                    });
                }

                function loadRecords(key, schema, number){

                    schema.isLoading = true;
                    var query = {
                        fields  : 'id, rec_date:updatedDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:description_t,summary_t,rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt, entryIntoForce_dt,adoption_dt,retired_dt,limitedApplication_dt',
                        query   : 'schema_s:(' + key +') AND government_s:' + $scope.code.toLowerCase(),
                        rowsPerPage    : number||5000,
                        sort           : 'updatedDate_dt desc',
                        start          : number ? undefined : (schema.start==0 ? 10 : schema.start),
                        currentPage    : schema.start==0 ? 1 : Math.ceil((schema.start+number)/10)
                    }
                    return searchService.list(query)
                    .then(function(result){
                        schema.start = query.currentPage*10

                        if(key=='measure'){
                            formatting(result.data.response.docs);
                        }
                        schema.docs = schema.docs.concat(result.data.response.docs)
                    })
                    .finally(function(){
                        schema.isLoading = false;
                    })

                }

                function formatting(docs){
                    _.forEach(docs, function(document){
                        if(!document.retired_dt || moment.utc() <= moment.utc(document.retired_dt)){
                            document.measureMatrix = true;
                        }
                    });
                }
                // loadCountryRecords($scope.code.toLowerCase());

            }]

        };
    });
});
