define(['app', 'text!views/search/search-directive.html','lodash', 'json!components/scbd-angularjs-services/filters/schema-name.json', 
'json!app-data/search-tour.json','js/common','services/search-service','views/search/search-filters/keyword-filter',
'views/search/search-filters/national-filter','views/search/search-filters/reference-filter','views/search/search-filters/scbd-filter',
'views/search/search-filters/country-filter','views/search/search-filters/region-filter','views/search/search-filters/date-filter',
'views/search/search-results/result-default','views/search/search-results/national-records-country','services/app-config-service',
 'ngDialog','views/register/user-preferences/user-alerts','views/directives/export-directive','services/thesaurus-service', 'angular-animate', 
 'angular-joyride','components/scbd-angularjs-services/services/locale',
 'components/scbd-angularjs-controls/form-control-directives/pagination','views/search/search-results/list-view',
 'views/search/directives/result-view-options', 'views/search/search-filters/left-side-filter'
], function(app, template, _, scbdSchemas, joyRideText) {

    app.directive('searchDirective', function() {
        return {
            restrict: 'EAC',
            replace: true,
            template: template, 
            controller: ['$scope','$q', 'realm', 'searchService', 'commonjs', 'localStorageService', '$http', 'Thesaurus' ,
             'appConfigService', '$routeParams', '$location', 'ngDialog', '$attrs', '$rootScope', 'thesaurusService','$rootScope',
             'joyrideService', '$timeout', 'locale',
            function($scope, $q, realm, searchService, commonjs, localStorageService, $http, thesaurus, 
                    appConfigService, $routeParams, $location, ngDialog, $attrs, $rootScope, thesaurusService, $rootScope, joyrideService, $timeout, locale) {
                   
                    var base_fields = 'id, rec_date:updatedDate_dt, rec_creationDate:createdDate_dt,identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,';
                    var en_fields =  'rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:description_t, rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt';

                    var queryCanceler = null;
                    var customKeywords = {
                        commercial : {
                            identifier  : 'commercial',
                            "title": {
                                "en": "Commercial",
                                "es": "Comercial",
                                "fr": "Commercial",
                                "ar": "تجاري",
                                "ru": "Коммерческое",
                                "zh": "商业"
                            },
                            identifiers : [ 'A50D6E64BC6042428FF79C23E8FA3CF2', '7CAC5B93-7E27-441F-BFEB-9E416D48B1BE',
                                            '3AC68883-4DD9-4F07-A941-30F7B910D24C']
                        },
                        nonCommercial : {
                            identifier  : 'nonCommercial',
                            "title":{
                                "en":"Non-Commercial",
                                "es":"No comercial",
                                "fr":"Non-commercial",
                                "ar":"غير تجاري",
                                "ru":"Некоммерческое",
                                "zh":"非商业"
                            },
                            identifiers : [ 'A7769659-17DB-4ED4-B1CA-A3ADD9CBD3A4',
                                            '7E3ECD30-1972-487B-A920-DDB439DC2DF6', '71E387A85A644CCCB1C2D6DDFA8493DD']
                        },
                        capacityBuildingResource : {
                            identifier  : 'capacityBuildingResource',
                            title : {en:'Capacity building resource'},
                            identifiers : [ 'A5C5ADE8-2061-4AB8-8E2D-1E6CFF5DD793', '3813BA1A-2DE7-4DD5-8415-3B2C6737E567',
                                           '9F48AEA0-EE28-4B6F-AB91-E0E088A8C6B7', '05FA6F66-F942-4713-BB4C-DA032C111188', 
                                           '5831C357-95CA-4F09-963B-DF9E8AFD8C88', '5054AC52-E738-4694-A403-6490FE7D4CF4']
                        }
                    }
                    var isABS = realm.is('ABS');
                    var isBCH = realm.is('BCH');
                    var schemaTemplate = {};
                    var index=0;        
                    _(realm.schemas).map(function(schema, key){ 
                        if(schema.type=='national' && key!= 'contact'){
                            schemaTemplate[key] = { title : schema.title, shortCode : schema.shortCode, index: index++, docs:[], numFound:0};
                        }
                    }).value();

                    $scope.realm         = realm
                    $scope.searchFilters = {};
                    $scope.setFilters    = {};
                    $scope.relatedKeywords = {};
                    $scope.searchResult = {
                        viewType  : 'list',
                        sortFields: ['updatedDate_dt desc'],

                        skipResults       : $attrs.skipResults,
                        skipDateFilter    : $attrs.skipDateFilter,
                        skipSaveFilter    : $attrs.skipSaveFilter,
                        skipTextFilter    : $attrs.skipTextFilter,
                        skipKeywordsFilter: $attrs.skipKeywordsFilter,

                        searchFilters   : {},
                        countriesFilters: {},
                        regionsFilter   : {},
                        searchKeyword   : ''
                    }                    


                    ////////////////////////////////////////////
                    ////// $scope functions
                    ////////////////////////////////////////////
                    $scope.saveFreeTextFilter = function(text) {

                        if(!text && text.length <= 0)
                            return;

                        var fid = 'freeText_' + text;
                        var id = undefined;

                         if($scope.setFilters[fid] )
                           delete $scope.setFilters[fid];
                        else{
                           $scope.setFilters[fid] = {'type':'freeText', 'name': ""+text+"", 'id':fid};

                           $scope.searchKeyword = "";
                        }

                        $scope.refresh = true;
                    };

                    $scope.isFilterOn = function (filterID) {
                        if (!filterID)
                            return false;

                        return $scope.setFilters[filterID] ? true : false;
                    };

                    $scope.saveFilter = function (doc) {

                        
                        // if(!$scope.searchResult.data.facets[doc.id])
                        //     return;
                        //TODO: if free text check to see if there is a UID and convert to identifier
                        console.debug("addfilter:" + doc);

                        var filterID = doc.id;
                        var termID = doc.id;
                        var broader = null;

                        if (doc.filterID) {
                            filterID = doc.filterID;
                            termID = $scope.searchFilters[filterID].id;
                            var broader = $scope.searchFilters[filterID].broader;
                        }
                        if (typeof doc === 'string') {
                            filterID = doc;
                            termID = $scope.searchFilters[filterID].id;
                            var broader = $scope.searchFilters[filterID].broader;
                        }

                        if ($scope.setFilters[termID]){
                            delete $scope.setFilters[termID];
                        }
                        else {
                            $scope.setFilters[termID] = {
                                type     : $scope  .searchFilters[filterID].type,
                                otherType: $scope  .searchFilters[filterID].otherType,
                                name     : $scope  .searchFilters[filterID].name,
                                id       : termID  ,
                                broader  : broader ,
                                filterID : filterID
                            };
                        }
                        if($scope .searchFilters[filterID].otherType == 'schema'){
                            $scope.getRelatedKeywords();
                            $scope.leftMenuEnabled = true;
                            if($scope.onSchemaFilterChanged)
                                $scope.onSchemaFilterChanged(termID, $scope.setFilters[termID])
                        }
                        else if($scope .searchFilters[filterID].type == 'keyword'){
                            $scope.updateLeftFilterStatus(termID, $scope.setFilters[termID])
                        }
                        
                        // if(!_.isEmpty($scope.setFilters)){ 
                        //     //if not empty and the default sort is not set by the user then remove sort to default to relevance
                        //     if($scope.searchResult.sortFields.length == 1 && $scope.searchResult.sortFields[0]=='updatedDate_dt')
                        //         $scope.searchResult.sortFields = [];
                        // }
                        updateQueryResult();
                    };


                    $scope.saveDateFilter = function (filterID, query) {

                        $scope.setFilters[filterID] = {
                            type: $scope.searchFilters[filterID].type,
                            query: query,
                            name: $scope.searchFilters[filterID].name,
                            id: $scope.searchFilters[filterID].id
                        };

                        updateQueryResult();
                    };

                    $scope.removeFilter = function (filterID) {

                        var id = $scope.setFilters[filterID].filterID
                        delete $scope.setFilters[filterID];

                        if($scope.searchFilters[filterID] && $scope.searchFilters[filterID].otherType == 'schema' && $scope.onSchemaFilterChanged){
                            $scope.onSchemaFilterChanged(filterID, $scope.setFilters[filterID]);
                            $scope.getRelatedKeywords();
                        }
                        else if($scope.searchFilters[id].type == 'keyword'){
                            $scope.updateLeftFilterStatus(filterID, $scope.setFilters[filterID])
                        }
                        //remove children
                        var dels = {};
                        var toDelete = _.each($scope.setFilters, function (filter) {
                            if (filter.broader === filterID) {
                                $scope.removeFilter(filter.id);
                            }
                        });

                        updateQueryResult();
                    };

                    $scope.onSortByChange = function(fields){
                        $scope.searchResult.sortFields = fields;
                        $scope.searchResult.sortFields = fields;
                        updateQueryResult();
                    }

                    $scope.getRelatedKeywords = function () {
                        
                        var relatedKeywords = $scope.relatedKeywords = {};
                        var setIds = {};
                        var keywords = getSearchFilters("keyword");

                        if ($scope.setFilters) {

                            _.each($scope.setFilters, function (set) {

                                relatedKeywords = _.filter(keywords, function (item) {

                                    if (item.related.toLowerCase().indexOf(set.id.toLowerCase()) >= 0)
                                        return item;
                                    else
                                        return null;
                                });
                                if (!_.isEmpty(relatedKeywords))
                                    $scope.relatedKeywords[set.id] = relatedKeywords;
                            });
                        }



                    }


                    ////////////////////////////////////////////
                    ////// end $scope functions
                    ////////////////////////////////////////////

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    
                    ////////////////////////////////////////////
                    ////// internal functions
                    ////////////////////////////////////////////

                    function init(){

                        loadGlobalFacets();
                        loadFilters();

                        if(!$scope.skipResults && $routeParams.recordType){
                            if($routeParams.recordType == 'run-query'){
                                var queryFilter = localStorageService.get("run-query");                            
                                setSearchFilters(queryFilter);
                            }
                            else{

                                var query =  $location.search();
                                if(query){
                                    if(query.text){
                                        $scope.saveFreeTextFilter(query.text);
                                    }
                                    if(query.country){
                                        $scope.saveFilter(query.country);
                                    }
                                    if(query.schema){
                                        $scope.saveFilter(query.schema);
                                    }
                                }
                            }
                        }

                        $timeout(function(){
                            if(!$scope.skipResults)updateQueryResult();

                        }, 200)

                        // if(!$scope.skipResults){
                        //     $scope.$watch('refresh', function(newVal, oldVal){
                        //         if(newVal && newVal !== oldVal){
                        //             refreshResult();                                
                        //             $scope.getRelatedKeywords();
                        //         }
                        //     });
                        // }
                    }

                    function loadGlobalFacets(){
                        searchService.facets({fields: ['all_terms_ss', 'government_REL_ss']}).then(function(result){
                            
                            var facets = _.extend(result['all_terms_ss'], 
                                                  result['government_REL_ss']);
                            $scope.searchResult.globalFacets = facets;
                        })
                    }

                    function loadFilters() {
                
                        if (_.isEmpty($scope.searchFilters)) {
                            $scope.searchFilters = {};
                            $scope.searchFilters = localStorageService.get("searchFilters");
                        }
                        if (_.isEmpty($scope.searchFilters)) {
                            $scope.searchFilters = {};
                            loadSchemaFilters();
                            loadCountryFilters();
                            loadRegionsFilters();
                            loadDateFilters();

                            if (isABS)
                                loadABSKeywordFilters();
                            else if (isBCH)
                                loadBCHKeywordFilters();
                                
                            localStorageService.set("searchFilters", $scope.searchFilters);
                        }                
                    };


                    function addFilter(filterID, filterInfo) {                        
                        $scope.searchFilters[filterID] = filterInfo;
                    };

                    function loadSchemaFilters() {

                        _.each(realm.schemas, function (schema, key) {
                            if (!_.includes(['contact'], key))
                                addFilter(key, { 'sort': schema.sort, 'type': schema.type, 'name': schema.title.en, 'id': key, 
                                        'description': (schema.description || {}).en, otherType:'schema' });
                        })

                        addFilter('npParty'    , { 'sort': 1, 'type': 'partyStatus', 'name': 'Party to the Protocol'                  , 'id': 'npParty'    , 'description': '' });
                        addFilter('npInbetween', { 'sort': 2, 'type': 'partyStatus', 'name': 'Ratified, not yet Party to the Protocol', 'id': 'npInbetween', 'description': '' });
                        addFilter('npNonParty' , { 'sort': 3, 'type': 'partyStatus', 'name': 'Not a Party to the Protocol '           , 'id': 'npNonParty' , 'description': '' });
                        addFilter('npSignatory', { 'sort': 4, 'type': 'partyStatus', 'name': 'Signatory to the Protocol'              , 'id': 'npSignatory', 'description': '' });

                        //SCBD
                        _.each(scbdSchemas, function (schema, key) {
                            addFilter(key, { 'sort': schema.sort, 'type': 'scbd', 'name': schema.title, 'id': key, 
                                    'description': (schema.description || {}), otherType:'schema' });
                        });
                    };


                    function loadCountryFilters() {

                        return $q.when(commonjs.getCountries(), function (data) {
                            var countries = data;

                            _.each(countries, function (country, index) {
                                addFilter(country.code.toLowerCase(), { 'sort': index, 'type': 'country', 'name': country.name[locale || en], 
                                'id': country.code.toLowerCase(), 'description': '', "isCBDParty": country.isCBDParty, "isNPParty": country.isNPParty, 
                                "isAppProtocolParty": country.isAppProtocolParty, "isNPSignatory": country.isNPSignatory, "isNPRatified": country.isNPRatified, 
                                "isNPInbetweenParty": country.isNPInbetweenParty, "entryIntoForce": country.entryIntoForce });
                            });
                        });
                    };

                    function loadRegionsFilters() {

                        return $q.when(commonjs.getRegions(), function (regions) {
                            _.each(regions, function (region, index) {
                                addRegionFilter(region);
                            });
                        });
                    };

                    function addRegionFilter(region, parent) {

                        addFilter(region.identifier, { 'type': 'region', 'name': region.title[locale || en], 'id': region.identifier, 
                        'description': '', 'parent': parent });

                        _.each(region.narrowerTerms, function (narrower) {
                            addRegionFilter(narrower, region.identifier);
                        });
                    }
                    
                    function loadDateFilters() {
                        addFilter('publishedOn', { 'sort': 1, 'type': 'date', 'name': 'Published On', 'id': 'publishedOn', 
                        'description': 'Date range when the record was published' });
                    };

                    function loadABSKeywordFilters() {

                        //IRCC filters
                        addKeywordFilter(customKeywords.commercial, 'absPermit', 'IRCC usages');
                        addKeywordFilter(customKeywords.nonCommercial, 'absPermit', 'IRCC usages');
                    
                        $q.when(thesaurusService.getDomainTerms('keywords'), function (keywords) {
                            _.each(keywords, function (keyword, index) {
                                addKeywordFilter(keyword, 'absPermit', 'IRCC keywords');
                            });
                        });
                    
                        //CP
                        $q.when(thesaurusService.getDomainTerms('cpJurisdictions'), function (keywords) {
                            _.each(keywords, function (keyword, index) {
                                addKeywordFilter(keyword, 'absCheckpoint', 'Checkpoint jurisdiction');
                            });
                        });
                        //CPC
                        $q.when(thesaurusService.getDomainTerms('keywords'), function (keywords) {
                            _.each(keywords, function (keyword, index) {
                                addKeywordFilter(keyword, 'absCheckpointCommunique', 'Checkpoint communique keywords');
                            });
                        });

                        $q.when(commonjs.getThematicAreas(), function (keywords) {
                            var levels = [];
                            var parents = [];
                            var level = 0;
                    
                            _.each(keywords, function (keyword, index) {
                    
                                levels[keyword.identifier] = 1;
                                parents[keyword.identifier] = '';
                    
                                if (keyword.broaderTerms.length === 0)
                                    levels[keyword.identifier] = 0;
                    
                                if (keyword.broaderTerms.length > 0) {
                                    levels[keyword.identifier] = levels[keyword.broaderTerms] + 1;
                                    parents[keyword.identifier] = keyword.broaderTerms.join();
                                }
                    
                            });
                    
                            _.each(keywords, function (keyword, index) {
                                addKeywordFilter(keyword, '', 'ABS Thematic Areas', levels[keyword.identifier], parents[keyword.identifier]);
                            });
                    
                        });                                        
                    
                        $q.when(commonjs.getMSR_elements(), function (keywords) {
                            var levels = [];
                            var parents = [];
                            var level = 0;
                    
                            _.each(keywords, function (keyword, index) {
                    
                                levels[keyword.identifier] = 1;
                                parents[keyword.identifier] = '';
                    
                                if (keyword.broaderTerms.length === 0)
                                    levels[keyword.identifier] = 0;
                    
                                if (keyword.broaderTerms.length > 0) {
                                    levels[keyword.identifier] = levels[keyword.broaderTerms] + 1;
                                    parents[keyword.identifier] = keyword.broaderTerms.join();
                                }
                    
                            });
                    
                            _.each(keywords, function (keyword, index) {
                                addKeywordFilter(keyword, 'measure', 'Key elements', levels[keyword.identifier], parents[keyword.identifier]);
                            });
                    
                        });
                    
                        commonjs.getKeyAreas          ().then(function(keywords){loopKeywords(keywords, ''                                                             , ''                                  )});
                        commonjs.getCBI_audience      ().then(function(keywords){loopKeywords(keywords, 'capacitybuildinginitiative resource capacitybuildingresource' , 'Target Audience'                   )});
                        commonjs.getMSR_types         ().then(function(keywords){loopKeywords(keywords, 'measure'                                                      , 'Type'                              )});
                        commonjs.getMSR_status        ().then(function(keywords){loopKeywords(keywords, 'measure'                                                      , 'Legal Status'                      )});
                        commonjs.getMSR_modelcontract ().then(function(keywords){loopKeywords(keywords, 'measure'                                                      , 'Contains model contractual clause' )});
                        commonjs.getCNA_scope         ().then(function(keywords){loopKeywords(keywords, 'authority'                                                    , 'Scope of responsibilities'         )});
                        commonjs.getMSR_jurisdictions ().then(function(keywords){loopKeywords(keywords, 'measure'                                                      , 'Jurisdiction'                      )});
                        commonjs.getCNA_jurisdictions ().then(function(keywords){loopKeywords(keywords, 'authority'                                                    , 'Jurisdiction'                      )});
                        commonjs.getMCC_keywords      ().then(function(keywords){loopKeywords(keywords, 'modelcontractualclause'                                       , 'Keyword'                           )});
                        commonjs.getMCC_types         ().then(function(keywords){loopKeywords(keywords, 'modelcontractualclause'                                       , 'Type'                              )});
                        commonjs.getCBI_cats          ().then(function(keywords){loopKeywords(keywords, 'capacitybuildinginitiative'                                   , 'Category'                          )});
                        commonjs.getCBI_types         ().then(function(keywords){loopKeywords(keywords, 'capacitybuildinginitiative'                                   , 'Type'                              )});
                        commonjs.getCBI_fundingsrc    ().then(function(keywords){loopKeywords(keywords, 'capacitybuildinginitiative'                                   , 'Funding Source'                    )});
                        commonjs.getCBI_status        ().then(function(keywords){loopKeywords(keywords, 'capacitybuildinginitiative'                                   , 'Status'                            )});
                        commonjs.getCBI_status        ().then(function(keywords){loopKeywords(keywords, 'capacitybuildinginitiative'                                   , 'Status'                            )});
                        commonjs.getCBR_level         ().then(function(keywords){loopKeywords(keywords, 'resource capacitybuildingresource'                            , 'Level'                             )});
                        commonjs.getCBR_purpose       ().then(function(keywords){loopKeywords(keywords, 'resource capacitybuildingresource'                            , 'Purpose'                           )});
                        commonjs.getCBR_formats       ().then(function(keywords){loopKeywords(keywords, 'resource capacitybuildingresource'                            , 'Format'                            )});
                        commonjs.getCPP_types         ().then(function(keywords){loopKeywords(keywords, 'communityprotocol'                                            , 'Type'                              )});
                        commonjs.getAichiTargets      ().then(function(keywords){loopKeywords(keywords, ''                                                             , 'Aichi Targets'                     )});
                    
                    };
                    
                    function loadBCHKeywordFilters() {
                    

                        thesaurusService.getDomainTerms('decisionTypes'            ).then(function(keywords){loopKeywords(keywords, 'biosafetyLaw' , 'Type of Document')});
                        thesaurusService.getDomainTerms('subjectAreas'            ).then(function(keywords){loopKeywords(keywords, 'biosafetyLaw' , 'Subject area')});
                        thesaurusService.getDomainTerms('decisionLMOFFPSubject'    ).then(function(keywords){loopKeywords(keywords, 'relatedschema' , 'Title')});
                        thesaurusService.getDomainTerms('decisionResults'          ).then(function(keywords){loopKeywords(keywords, 'relatedschema' , 'Title')});
                        thesaurusService.getDomainTerms('riskAssessmentScope'      ).then(function(keywords){loopKeywords(keywords, 'relatedschema' , 'Title')});
                        thesaurusService.getDomainTerms('dnaSequenceFamily'        ).then(function(keywords){loopKeywords(keywords, 'relatedschema' , 'Title')});
                        thesaurusService.getDomainTerms('dnaSequenceTraits'        ).then(function(keywords){loopKeywords(keywords, 'relatedschema' , 'Title')});
                        thesaurusService.getDomainTerms('legislationAgreementTypes').then(function(keywords){loopKeywords(keywords, 'relatedschema' , 'Title')});
                        thesaurusService.getDomainTerms('subjectAreas'             ).then(function(keywords){loopKeywords(keywords, 'relatedschema' , 'Title')});
                        thesaurusService.getDomainTerms('typeOfOrganisms'          ).then(function(keywords){loopKeywords(keywords, 'relatedschema' , 'Title')});
                        thesaurusService.getDomainTerms('domestication'            ).then(function(keywords){loopKeywords(keywords, 'relatedschema' , 'Title')});
                        thesaurusService.getDomainTerms('OrganismCommonUses'       ).then(function(keywords){loopKeywords(keywords, 'relatedschema' , 'Title')});
                        thesaurusService.getDomainTerms('techniqueUsed'            ).then(function(keywords){loopKeywords(keywords, 'relatedschema' , 'Title')});
                        thesaurusService.getDomainTerms('cnaJurisdictions'         ).then(function(keywords){loopKeywords(keywords, 'authority' , 'Title')});
                        
                        // var bchTerms = [
                        //     'decisionTypes', 'decisionLMOFFPSubject', 'decisionResults', 'riskAssessmentScope', 'dnaSequenceFamily',
                        //     'dnaSequenceTraits', 'legislationAgreementTypes', 'subjectAreas', 'typeOfOrganisms', 'domestication', 'OrganismCommonUses',
                        //     'techniqueUsed', 'cnaJurisdictions'
                        // ]
                    
                        // $q.all(_.map(bchTerms, thesaurusService.getDomainTerms))
                        //     .then(function (results) {
                        //         _.each(results, function (terms) {
                        //             _.each(terms, function (term) {
                        //                 addKeywordFilter(term, 'bchTerm', "ABS Thematic Areas");
                        //             })
                        //         });
                        //     })
                    
                    }

                    function loopKeywords(keywords, related, parent, level, broader){
                        if((keywords||[]).length){
                            _.each(keywords, function (keyword, index) {
                                addKeywordFilter(keyword, related, parent, level, broader||keyword.broader);
                            });
                        }
                    }

                    function addKeywordFilter(keyword, related, parent, level, broader) {
                        if (!level)
                            level = 0;

                        var dupIdentifier = isIdentifierDuplicate(keyword);
                        if (dupIdentifier)
                            addFilter(dupIdentifier.identifier + "@" + related, { 'type': 'keyword', 'name': dupIdentifier.title[locale || 'en'], 'id': dupIdentifier.identifier, 'description': '', 'parent': parent, 'related': related, filterID: dupIdentifier.identifier + "@" + related, 'level': level, 'broader': broader, isDuplicate: true });
                        else
                            addFilter(keyword.identifier + "@" + related, { 'type': 'keyword', 'name': keyword.title[locale || 'en'], 'id': keyword.identifier, 'description': '', 'parent': parent, 'related': related, filterID: keyword.identifier + "@" + related, 'level': level, 'broader': broader });

                    }

                    function isIdentifierDuplicate(keyword) {
                        var duplicate;
                        _.reduce(customKeywords, function (memo, value, key) {
                            if (_.contains(value.identifiers, keyword.identifier)) {
                                duplicate = value;
                            }
                        }, {})
                        return duplicate;
                    }


                    function getSearchFilters(type) {
                        if (!type)
                            return $scope.searchFilters;

                        return _.filter($scope.searchFilters, function (item) {
                            if (item.type === type) return item;
                        });
                    };


                    function getSearchFiltersByParent(parent) {
                        if (!parent)
                            return $scope.searchFilters;

                        return _.filter($scope.searchFilters, function (item) {
                            if (item.parent === parent) return item;
                        });
                    };

                    function setSearchFilters(filters) {
                        $scope.setFilters = {};
                        _.map(filters, function (query) {
                            if (query.type == 'text') {
                                $scope.saveFreeTextFilter(query);
                            } else if (query.type == 'custom') {
                                $scope.saveCustomFilter(query);
                            } else {
                                $scope.saveFilter(query);
                            }
                        });
                    };

                    function getSetFilters() {
                        return $scope.setFilters;
                    };

                    function getFilter(id) {
                        return $scope.searchFilters[id];
                    };

                    function updateQueryResult(pageNumber){

                        var query = buildSearchQuery()
                        var sortFields = ''
                        var resultQuery;
                        if(($scope.searchResult.sortFields||[]).length > 0)
                            sortFields = $scope.searchResult.sortFields.join(', ');

                        if($scope.searchResult.viewType == 'list'){
                           resultQuery = $scope.searchResult.listViewApi.updateResult(query, sortFields, pageNumber||1);
                        }
                        else if($scope.searchResult.viewType == 'group'){
                            
                        }
                        else if($scope.searchResult.viewType == 'matrix'){
                            
                        }
                        resultQuery.then(function(data){
                            $scope.searchResult.data = data;
                        })
 
                    }

                    function buildSearchQuery(){
                        var qAnd = [];
                        var qOr  = [];
                        var q    = '';
                        var q1   = '';

                        qAnd .push(buildSchemaQuery());
                        qAnd .push(buildFieldQuery   ('government_s'      , 'country'     , null                 ));
                        qAnd .push(buildCountryQuery ('government_s'      , 'partyStatus' , null                ));
                        qAnd .push(buildFieldQuery   ('government_REL_ss' , 'region'      , null                ));
                        qOr  .push(buildFieldQuery   ('all_terms_ss'      , 'keyword'     , null                ));
                        qOr  .push(buildTextQuery    ('text_EN_txt'       , 'keyword'     , null                ));
                        qOr  .push(buildTextQuery    ('text_EN_txt'       , 'freeText'    , null                ));

                        _.map(_.filter($scope.setFilters, {type:'custom'}), function(custom){
                            if(custom.query)
                                qAnd.push(custom.query)
                        });

                        qAnd.push(buildDateFieldQuery('updatedDate_dt','publishedOn'));

                        q = combineQuery(qAnd, "AND");
                        q1 = combineQuery(qOr, "OR");

                        return q1 ? q + " AND (" + q1 + ")" : q;
                    }

                    function buildTextQuery(field, type, boost) {
                        var q = '';
                        var values = [];

                        if ($scope.setFilters) {
                            _.each($scope.setFilters, function (item) {

                                if (item.type == type) {
                                    values.push($scope.setFilters[item.id].name.toLowerCase());
                                }

                            });
                            if (values.length)
                                q = addORCondition(field, values, boost)
                        }
                        return q ? q : null;
                    }

                    function buildCustomQuery(field, type, boost) {
                        var q = '';
                        var values = [];

                        if ($scope.setFilters) {
                            _.each($scope.setFilters, function (item) {

                                if (item.type == type) {
                                    values.push($scope.setFilters[item.id].name.toLowerCase());
                                }

                            });
                            if (values.length)
                                q = addORCondition(field, values, boost)
                        }
                        return q ? q : null;
                    }

                    function buildCountryQuery(field, type, boost) {
                        var q = '';
                        var values = '';
                        var countries = getSearchFilters("country");

                        if ($scope.setFilters) {
                            _.each($scope.setFilters, function (item) {
                                if (item.type === type) {
                                    values = values + " " + getCountryList(item.id, countries);
                                }
                            });

                            if (values.length)
                                q = addANDConditionText(field, values, boost)
                        }

                        return q ? q : null;
                    }

                    function getCountryList(id, list) {

                        var templist = _.filter(list, function (item) {

                            if (id === 'party' && item.isAppProtocolParty === true)
                                return item;
                            else if (id === 'nonParty' && item.isAppProtocolParty === false)
                                return item;
                            else if (id === 'inbetween' && item.isNPInbetweenParty === true)
                                return item;
                            else if (id === 'signatory' && item.isNPSignatory === true)
                                return item;
                        });

                        var govs = _.pluck(templist, 'id');

                        return govs.join(" ");
                    }

                    function buildSchemaQuery() {
                    
                        var query = buildFieldQuery('schema_s', 'schema')
                        if (query == null) {
                            query = "schema_s:* AND NOT schema_s:(contact organization)"
                        }
                    
                        return query;
                    }

                    function buildFieldQuery(field, type, allFilters) {
                        var q = '';
                        var capacityBuildingResource;
                        if ($scope.setFilters[type]) {
                            q = field + ":(" + encodeURIComponent(allFilters) + ")"
                        } else {
                            _.each($scope.setFilters, function (item) {
                                if (item.type == type || item.otherType==type) {
                                    if (customKeywords[item.id] && item.id == 'capacityBuildingResource') {
                                        capacityBuildingResource = true;
                                        q = q + 'resource' + ' '
                                    } 
                                    else if (customKeywords[item.id] && item.id != 'capacityBuildingResource')
                                        q = q + encodeURIComponent(customKeywords[item.id].identifiers.join(' ')) + ' ';
                                    else
                                        q = q + encodeURIComponent(item.id) + ' ';

                                }
                            });
                        }

                        if (q) {
                            var newQuery = field + ":(" + q + ")";
                            if (capacityBuildingResource)
                                newQuery += ' AND all_terms_ss:(' + encodeURIComponent(customKeywords['capacityBuildingResource'].identifiers.join(' ')) + ') ';
                            return newQuery;
                        } else if (allFilters)
                            return field + ":(" + encodeURIComponent(allFilters) + ")";
                        else
                            return null;
                    }

                    function buildDateFieldQuery(field, type) {

                        if ($scope.setFilters[type] && $scope.setFilters[type].query != '*:*') {
                            return field + ":" + $scope.setFilters[type].query;
                        }
                        return null;
                    }

                    function addORCondition(field, values, boost) {
                        var q = "";
                        var conditions = [];
                        _.each(values, function (val) {
                            conditions.push("" + field + ":\"*" + val + "*\"" + (boost ? "^" + boost : ""))
                        });
                        _.each(conditions, function (condition) {
                            q = q + (q == '' ? '(' : ' OR ') + condition;
                        });
                        q = q + ")";
                        return q;
                    }

                    function addANDConditionText(field, values, boost) {
                        var q = "";
                        var conditions = [];

                        q = "(" + field + ":(" + values + "))";
                        return q;
                    }


                    function combineQuery(qCondition, op1) {
                        var q = '';
                        _.each(qCondition, function (val) {
                            if (val) q = q + (q ? op1 : "") + "(" + val + ")"
                        });
                        return q ? q : '';
                    }

                    // function onSchemaFilterChanged(schema)

                    ////////////////////////////////////////////
                    ////// end internal functions
                    ////////////////////////////////////////////
                    init();
                    
                    this.getSearchFilters         = getSearchFilters        ;
                    this.getSearchFiltersByParent = getSearchFiltersByParent;
                    this.addFilter                = addFilter               ;
                    this.getSearchFilters         = getSearchFilters        ;
                    this.setSearchFilters         = setSearchFilters        ;
                    this.getFilter                = getFilter               ;

            }]//controller
        };
    });
});
