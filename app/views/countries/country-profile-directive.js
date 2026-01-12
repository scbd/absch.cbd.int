import app from '~/app';
import { reactive } from 'vue'
import template from 'text!./country-profile-directive.html';
import _ from 'lodash';
import '~/views/search/search-results/result-default'
import '~/views/search/search-results/result-default';
import '~/services/main';
import '~/views/directives/export-directive';
import { iconFields } from '~/views/forms/view/bch/icons';
import countryProfileDirectiveT from '~/app-text/views/countries/country-profile-directive.json';
import InformationFromNr1 from '~/components/common/document-report/information-from-nr1.vue';
import FirstNationalReportApi from '~/api/first-national-report'

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
                    loadCountryDetails: loadCountryRecords
                }
               
                $scope.loadRecords  = loadRecords;
                $scope.sortMeasure  = "[jurisdiction_sort, type_sort, status_sort, createdDate_dt, title_t]";
                $scope.firstNationalReportData = {} 
                $scope.firstNationalReportRecord = {} 
                // Determines what information will be shown from the NR1 if
                // the country is missing document data.
                $scope.relatedQuestionsFromNR1 = {
                  focalPoint: ['Q003'],
                  authority: ['Q004', 'Q004_a', 'Q004_b', 'Q011'],
                  absCheckpoint: ['Q005', 'Q005_a', 'Q005_b'],
                  measure: ['Q007', 'Q007_a'],
                  absCheckpointCommunique: ['Q010', 'Q010_a', 'Q021a', 'Q021_b', 'Q021_c'],
                  absPermit: ['Q012', 'Q012_a', 'Q012_b'],
                  absNationalModelContractualClause: ['Q013', 'Q013_a']
                }
                const countryRecords  = {};
                const nationalSchemas = []
                let index = 0

                async function init(){
                    _(realm.schemas).map(function(schema, key){
                        if(schema.type=='national' && key!= 'contact' && key!= 'countryProfile'){
                            countryRecords[key] = { title : schema.title, shortCode : schema.shortCode, index: index++, docs:[], numFound:0};
                            nationalSchemas.push(key);
                        }
                    }).value();

                    if(realm.is('ABS')) {
                        await import('~/views/measure-matrix/measure-matrix-countries-directive')
                        $scope.vueComponent = {
                          components: { InformationFromNr1 }
                        }
                    }
                }

                $scope.$watch('code', async function(newVal){
                    if(newVal){
                      console.log('newVal', newVal)
                      const records = await loadCountryRecords(newVal.toLowerCase())
                      if(realm.is('ABS')) {
                        await loadRelatedInformationFromNationalReport(records)
                      }
                    }
                })

                $scope.showHideRecords = function(schema){
                    schema.display = !schema.display;
                    if(schema.key === 'measure' && schema.display){ //for measure load all remaining records to build the measure matrix
                        loadRecords(schema)
                    }
                }

                $scope.getExportQuery = function(){
                    return $scope.exportQuery;
                }

                $scope.reactive = reactive

                async function loadRelatedInformationFromNationalReport (countryRecords) {
                  const getCountryRecord = (key) => countryRecords
                    .find(countryRecord => countryRecord.key === key)

                  // Get question keys that will be displayed from the NR1 based on the documents
                  // missing from the current country's report.
                  const relevantQuestionsList = Object.entries($scope.relatedQuestionsFromNR1)
                    .filter(([key]) => (getCountryRecord(key)?.docs ?? []).length < 1)
                    .map(entry => entry[1])
                    .flat()

                  const api = new FirstNationalReportApi()
                  // Fetch all questions relevant to the country profile from the NR
                  const nr1 = await api.fetchReportData($scope.code, realm, relevantQuestionsList)
                    .catch(error => console.error(error))

                  const [nrData] = nr1 

                  if (nrData === undefined) { return }

                  $scope.firstNationalReportData = nrData

                  $scope.firstNationalReportRecord = $scope.countryRecords
                    .find(countryRecord => countryRecord.shortCode === 'NR1')
                }

                async function loadCountryRecords(code){
                    const groupField = 'grp_government_schema_s';
                    var searchQuery = $scope.exportQuery = {
                        fields  : 'id, rec_date:updatedDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:summary_t,rec_type:type_EN_t, jurisdiction_s, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt, entryIntoForce_dt,adoption_dt,retired_dt,limitedApplication_dt',
                        fieldQuery     : [`schema_s:(${nationalSchemas.map(solr.escape).join(' ')})`],
                        rowsPerPage    : 500,
                        sort           : 'updatedDate_dt desc',
                        groupField     : groupField,
                        groupLimit     : 10
                    };
                    if(realm.is('BCH')){
                        searchQuery.additionalFields = `${iconFields.lmo},${iconFields.decision},${iconFields.organisms}`;
                    }
                    
                    const isEUMemberState = await isEuMember(code);
                    if(isEUMemberState && realm.is('BCH')){
                        searchQuery.query = [`government_s:${solr.escape(code)} OR (countryRegions_REL_ss:${solr.escape(code)} AND schema_s:(biosafetyLaw biosafetyDecision))`];
                    }
                    else{
                        searchQuery.query = [`government_s:${solr.escape(code)}`];
                    }
                    return await searchService.group(searchQuery)
                    .then(function(result){

                        var countryResult   = result.data.grouped[groupField];
                        var totalCount      = countryResult.ngroups;

                        _.forEach(countryResult.groups, function(group){
                            var gpDetails = (group.groupValue||'').split('_');
                            if(!gpDetails.length)
                                return
                            var schema      = gpDetails[1];
                            if(schema=='measure'){
                                formatting(group.doclist.docs);
                            }

                            if(gpDetails[0] != code){
                                schema += `${gpDetails[0]}`;
                                if(!countryRecords[schema]) {
                                    countryRecords[schema] = {docs:[], index:0, numFound:0, ...countryRecords[gpDetails[1]] };
                                }

                                countryRecords[schema].isRegional = true;

                                if (group.doclist.numFound) {
                                    countryRecords[schema].numFound = group.doclist.numFound
                                    countryRecords[schema].code = group.doclist.docs[0].government_s
                                    countryRecords[schema].government = group.doclist.docs[0].government_EN_t
                                }

                                console.log('schema', schema)
                                console.log('group', group)

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
                            // If related information from the NR1 exists set the number of documenst to 1
                            const relatedQuestions = $scope.relatedQuestionsFromNR1[key]
                            if (Array.isArray(relatedQuestions) && (relatedQuestions || []).length > 0 && countryRecords[key].numFound === 0) {
                                countryRecords[key].numFound = 1
                            }

                            $scope.countryRecords.push({
                                key, ...countryRecords[key]
                            })
                        });
                        return $scope.countryRecords
                    });
                }

                function loadRecords(schema, number){
                    let key = schema.key;
                    if(schema.isRegional)
                        key = key.replace(new RegExp(`${schema.code}$`), '');
                    schema.isLoading = true;
                    schema.start = schema.start||10;
                    var query = {
                        fields  : 'id, rec_date:updatedDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:summary_t,rec_type:type_EN_t, jurisdiction_s, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt, entryIntoForce_dt,adoption_dt,retired_dt,limitedApplication_dt',
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

               async function isEuMember(code){
                    const euTerms = await thesaurusService.getTerms(solr.escape('eu'), { relations: true });
                    if (euTerms) {
                        return (euTerms.narrowerTerms.indexOf(code) !== -1) ? true : false;
                    }
                }
                init();
            }]

    };
});

