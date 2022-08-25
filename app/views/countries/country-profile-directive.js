import app from '~/app';
import template from 'text!./country-profile-directive.html';
import _ from 'lodash';
import '~/views/search/search-results/result-default'

import '~/views/search/search-results/result-default';
import '~/services/main';
import '~/views/directives/export-directive';
import { iconFields } from '~/views/forms/view/bch/icons';
import countryProfileDirectiveT from '~/app-text/views/countries/country-profile-directive.json';

app.directive('countryProfile', function() {
    return {
        restrict: 'EAC',
        template: template,
        replace: true,
        scope: {
            api : '=?',
            code : '='
        },
        controller: ["$scope", "$routeParams",  "realm", '$element', '$timeout','searchService', '$filter', 'solr','thesaurusService', 'translationService',
            function($scope, $routeParams, realm, $element, $timeout, searchService, $filter, solr, thesaurusService, translationService) {
                translationService.set('countryProfileDirectiveT', countryProfileDirectiveT);
                $scope.api = {
                    loadCountryDetails : loadCountryRecords
                }
                $scope.loadRecords  = loadRecords;
                $scope.sortMeasure  = "[jurisdiction_sort, type_sort, status_sort, createdDate_dt, title_t]";
                var countryRecords  = {};
                var nationalSchemas = []
                var eUSchemas = [];
                var index=0;

                async function init(){
                    
                    _(realm.schemas).map(function(schema, key){
                        if(schema.type=='national' && key!= 'contact' && key!= 'countryProfile'){
                            countryRecords[key] = { title : schema.title, shortCode : schema.shortCode, index: index++, docs:[], numFound:0};
                            nationalSchemas.push(key);
                        }
                    }).value();

                    if(realm.is('ABS'))
                        await import('~/views/measure-matrix/measure-matrix-countries-directive')
                }

                $scope.$watch('code', function(newVal){
                    if(newVal){
                        loadCountryRecords(newVal.toLowerCase());
                    }
                })
                $scope.showHideRecords = function(schema){
                    schema.display = !schema.display;
                    if(schema.key == 'measure' && schema.display){ //for measure load all remaining records to build the measure matrix
                        loadRecords(schema)
                    }

                }
                $scope.getExportQuery = function(){
                    return $scope.exportQuery;
                
                }

                function loadCountryRecords(code){
                    const groupField = 'grp_government_schema_s';
                    var searchQuery = $scope.exportQuery = {
                        fields  : 'id, rec_date:updatedDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:summary_t,rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt, entryIntoForce_dt,adoption_dt,retired_dt,limitedApplication_dt',
                        fieldQuery     : [`schema_s:(${nationalSchemas.map(solr.escape).join(' ')})`],
                        rowsPerPage    : 500,
                        sort           : 'updatedDate_dt desc',
                        groupField     : groupField,
                        groupLimit     : 10
                    };
                    if(realm.is('BCH')){
                        searchQuery.additionalFields = `${iconFields.lmo},${iconFields.decision},${iconFields.organisms}`;
                    }
                    searchQuery.query = [`government_s:${solr.escape(code)} OR (countryRegions_REL_ss:${solr.escape(code)} AND schema_s:(biosafetyLaw biosafetyDecision))`]
                    //TODO: not sure why this query existed here // OR (countryRegions_REL_ss:${solr.escape(code)} AND schema_s:(biosafetyLaw biosafetyDecision))
                    searchService.group(searchQuery)
                    .then(function(result){

                        var countryResult   = result.data.grouped[groupField];
                        var totalCount      = countryResult.ngroups;

                        _.forEach(countryResult.groups, function(group){

                            var gpDetails = (group.groupValue||'').split('_');
                            if(!gpDetails.length)
                                return;
                            var schema      = gpDetails[1];
                            if(schema=='measure'){
                                formatting(group.doclist.docs);
                            }
                            if(gpDetails[0]!= code){
                                schema += `${gpDetails[0]}`;
                                if(!countryRecords[schema])
                                    countryRecords[schema] = {docs:[], index:0, numFound:0, ...countryRecords[gpDetails[1]] };
                                countryRecords[schema].isRegional = true;
                                if(group.doclist.numFound){
                                    countryRecords[schema].numFound = group.doclist.numFound
                                    countryRecords[schema].code = group.doclist.docs[0].government_s
                                    countryRecords[schema].government = group.doclist.docs[0].government_EN_t
                                }
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
                        $scope.countryRecords = [];
                        Object.keys(countryRecords).forEach((key)=>{
                            $scope.countryRecords.push({
                                key, ...countryRecords[key]
                            })
                        });
                    });
                }

                function loadRecords(schema, number){
                    let key = schema.key;
                    if(schema.isRegional)
                        key = key.replace(new RegExp(`${schema.code}$`), '');
                    schema.isLoading = true;
                    schema.start = schema.start||10;
                    var query = {
                        fields  : 'id, rec_date:updatedDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:summary_t,rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt, entryIntoForce_dt,adoption_dt,retired_dt,limitedApplication_dt',
                        query   : 'schema_s:(' + key +') AND government_s:' + solr.escape(schema.code || $scope.code.toLowerCase()),
                        rowsPerPage    : number||5000,
                        sort           : 'updatedDate_dt desc',
                        start          : schema.start,
                        currentPage    : Math.ceil(schema.start/10)
                    }
                    if(realm.is('BCH')){
                        query.additionalFields = `${iconFields.lmo},${iconFields.decision},${iconFields.organisms}`;
                    }
                    return searchService.list(query)
                    .then(function(result){
                        schema.start = (query.currentPage+1)*10
                        
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

                init();
            }]

    };
});

