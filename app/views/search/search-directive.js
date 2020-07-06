define(['app', 'text!views/search/search-directive.html','lodash', 'json!components/scbd-angularjs-services/filters/schema-name.json', 
'json!app-data/search-tour.json','js/common','services/search-service','views/search/search-filters/keyword-filter',
'views/search/search-filters/national-filter','views/search/search-filters/reference-filter','views/search/search-filters/scbd-filter',
'views/search/search-filters/country-filter','views/search/search-filters/region-filter','views/search/search-filters/date-filter',
'views/search/search-results/result-default','views/search/search-results/national-records-country','services/app-config-service',
'ngDialog','views/register/user-preferences/user-alerts','views/directives/export-directive','services/thesaurus-service', 'angular-animate', 
'angular-joyride','components/scbd-angularjs-services/services/locale',
'components/scbd-angularjs-controls/form-control-directives/pagination',
'views/search/directives/result-view-options', 'views/search/search-filters/left-side-filter',
'views/search/search-results/list-view','views/search/search-results/group-view', 
'components/scbd-angularjs-controls/form-control-directives/km-date-range', 'services/solr', 'toastr'

], function(app, template, _, scbdSchemas, joyRideText) {

    app.directive('searchDirective', function() {
        return {
            restrict: 'EAC',
            replace: true,
            template: template, 
            controller: ['$scope','$q', 'realm', 'searchService', 'commonjs', 'localStorageService', '$http', 'Thesaurus' ,
             'appConfigService', '$routeParams', '$location', 'ngDialog', '$attrs', '$rootScope', 'thesaurusService','$rootScope',
             'joyrideService', '$timeout', 'locale', 'solr', 'toastr','$log',
            function($scope, $q, realm, searchService, commonjs, localStorageService, $http, thesaurus, 
                    appConfigService, $routeParams, $location, ngDialog, $attrs, $rootScope, thesaurusService, $rootScope, joyrideService, 
                    $timeout, locale, solr, toastr, $log) {
                        var customQueryFn = {
                            buildExpiredPermitQuery : buildExpiredPermitQuery,
                            buildContactsUserCountryfn : buildContactsUserCountryfn
                        }
                        var lefteMenuSchemaFieldMapping;
                        var activeFilter;
                        var base_fields = 'id, rec_date:updatedDate_dt, rec_creationDate:createdDate_dt,identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,';
                        var en_fields =  'rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:description_t,summary_t, rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt';
    
                        var groupFieldMapping = [
                            {
                                field:'government', 
                                sortFields:['government_EN_s asc'],
                                tabs: ['nationalRecords', 'allRecords'],
                                solrField:'government_s',
                                titleField:'government_'+locale.toUpperCase()+'_s'
                            },
                            {
                                field:'schema', 
                                sortFields:['schema_EN_s asc'],
                                solrField:'schema_s',
                                titleField:'schema_'+locale.toUpperCase()+'_s'
                            },
                            {
                                field:'submissionYear', 
                                sortFields:['submissionYear_s asc'],
                                solrField:'submissionYear_s',
                                titleField:'submissionYear_s'
                            }
                        ];    
                        var queryCanceler = null;                        
                        var isABS = realm.is('ABS');
                        var isBCH = realm.is('BCH');   
                        leftMenuFilters      = [];
                        $scope.realm         = realm
                        $scope.searchFilters = {};
                        $scope.setFilters    = {};
                        $scope.relatedKeywords = {};
                        $scope.searchResult = {
                            sortFields      : ['updatedDate_dt desc'],
                            currentTab      : 'allRecords',
                            currentPage     : 1,
                            rowsPerPage     : 25,
                            groupByFields   : ['government', 'schema'],
                            viewType        : 'default',
    
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
                    ////// scope functions
                    ////////////////////////////////////////////

                    $scope.saveFilter = function (doc) {

                        // if(!$scope.searchResult.data.facets[doc.id])
                        //     return;
                        //TODO: if free text check to see if there is a UID and convert to identifier                    
                        
                        // if (typeof doc === 'string') {
                        //     filterID = doc;
                        //     termID = $scope.searchFilters[filterID].id;
                        //     var broader = $scope.searchFilters[filterID].broader;
                        // }
                        var filter = $scope.setFilters[doc.id];
                        if ($scope.setFilters[doc.id]){
                            delete $scope.setFilters[doc.id];
                        }
                        else {
                            $scope.setFilters[doc.id] = filter = {
                                type     : doc.type,
                                otherType: doc.otherType,
                                name     : doc.name,
                                id       : doc.id
                            };
                        }
                        if((filter||{}).type == 'schema'){
                            $scope.leftMenuEnabled = true;
                            if($scope.onSchemaFilterChanged){
                                var leftFilters = $scope.onSchemaFilterChanged(doc.id, $scope.setFilters[doc.id])
                                leftMenuFilters = leftFilters
                            }
                        }
                        
                        // if(!_.isEmpty($scope.setFilters)){ 
                        //     //if not empty and the default sort is not set by the user then remove sort to default to relevance
                        //     if($scope.searchResult.sortFields.length == 1 && $scope.searchResult.sortFields[0]=='updatedDate_dt')
                        //         $scope.searchResult.sortFields = [];
                        // }
                        updateQueryResult();
                    };

                    $scope.saveFreeTextFilter = function(text) {

                        if(!text && text.length <= 0)
                            return;

                        var fid = text;
                        var id = undefined;

                         if($scope.setFilters[fid] )
                           delete $scope.setFilters[fid];
                        else{
                           $scope.setFilters[fid] = {'type':'freeText', 'name': text, 'id':fid};

                           $scope.searchKeyword = "";
                        }

                        updateQueryResult();
                    };

                    $scope.saveDateFilter = function (filterID, query, dateVal) {
                        var name = dateVal.field.replace('_dt', '').replace(/[A-Z]/g, ' $&') + ' (' +
                                    dateVal.value.start + ' - ' + dateVal.value.end + ')' 
                        $scope.setFilters[filterID] = {
                            type: $scope.searchFilters[filterID].type,
                            query: query,
                            name: name,
                            id: $scope.searchFilters[filterID].id,
                            dateField:dateVal.field
                        };

                        updateQueryResult();
                    };

                    $scope.removeFilter = function (filter) {
                        var filterID = filter.id;
                        if(filter.type == 'rawQuery'){
                            filterID='rawQuery';
                            updateQueryString('raw-query',undefined);
                        }

                        var id = $scope.setFilters[filterID].filterID
                        delete $scope.setFilters[filterID];

                        if($scope.searchFilters[filterID] && $scope.searchFilters[filterID].type == 'schema' && $scope.onSchemaFilterChanged){
                            var leftFilters = $scope.onSchemaFilterChanged(filterID, $scope.setFilters[filterID]);                            
                            leftMenuFilters = leftFilters;
                            updateQueryString('schema');
                        }
                        //remove children
                        var dels = {};
                        var toDelete = _.each($scope.setFilters, function (filter) {
                            if (filter.broader === filterID) {
                                $scope.removeFilter(filter);
                            }
                        });

                        updateQueryResult();
                    };

                    $scope.onSortByChange = function(fields){
                        $scope.searchResult.sortFields = fields;
                        $scope.searchResult.sortFields = fields;
                        updateQueryString('sort',fields);
                        updateQueryResult();
                    }

                    $scope.onViewTypeChange = function(options){                        
                        $scope.searchResult.viewType = options.viewType;
                        updateQueryString('viewType',options.viewType);

                        if(options.viewType == 'group')
                            $scope.searchResult.groupByFields = options.fields;

                        updateQueryResult();
                    }

                    $scope.isFilterOn = function (filterID) {
                        if (!filterID)
                            return false;

                        return $scope.setFilters[filterID] ? true : false;
                    };

                    $scope.switchTab = function(tab){
                        if($scope.searchResult.currentTab == tab)
                            return;

                        $scope.searchResult.currentTab = tab;
                        updateQueryString('tab',tab);
                        updateQueryResult();
                    }

                    $scope.clearFilter = function(){
                        updateQueryString('schema');
                        $scope.setFilters = {};
                        leftMenuFilters = [];
                        $scope.RemoveLeftMenuFilters()
                        updateQueryResult();
                    };

                    ////////////////////////////////////////////
                    ////// end $scope functions
                    ////////////////////////////////////////////

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    
                    ////////////////////////////////////////////
                    ////// internal functions
                    ////////////////////////////////////////////

                    function init(){

                        loadFilters();

                        var query =  $location.search();
                        var currentpage = query.currentPage||1;
                        if(query.currentpage)
                            $scope.searchResult.currentpage = currentpage;
                        if(query.rowsPerPage)
                            $scope.searchResult.rowsPerPage = query.rowsPerPage;
                        if(query.tab)
                            $scope.searchResult.currentTab = query.tab;
                        if(query.group){
                            if(typeof query.group == 'string')
                                query.group = [query.group]
                            $scope.searchResult.groupByFields = query.group;
                        }
                        if(query.sort){
                            if(typeof query.sort == 'string')
                                query.sort = [query.sort]
                            $scope.searchResult.sortFields = query.sort;
                        }
                        if(query.viewType)
                            $scope.searchResult.viewType = query.viewType;

                        if($routeParams.recordType){
                            if($routeParams.recordType == 'run-query'){
                                var queryFilter = localStorageService.get("run-query");                            
                                setSearchFilters(queryFilter);
                            }
                            else{
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
                        if(query["raw-query"]){
                            saveRawQueryFilter(query["raw-query"]);
                        }

                        $timeout(function(){updateQueryResult(currentpage);}, 200)

                        loadleftMenuFieldMapping();
                    }

                    
                    function loadFilters() {
                
                        if (_.isEmpty($scope.searchFilters)) {
                            $scope.searchFilters = {};
                            $scope.searchFilters = localStorageService.get("searchFilters");
                        }
                        if (_.isEmpty($scope.searchFilters)) {
                            $scope.searchFilters = {};
                            
                            var chKeywordsFilter;
                            if (isABS)
                                chKeywordsFilter = loadABSKeywordFilters();
                            else if (isBCH)
                                chKeywordsFilter = loadBCHKeywordFilters();

                            $q.all([loadSchemaFilters(), loadCountryFilters(), loadRegionsFilters(), loadDateFilters(), chKeywordsFilter])
                            .then(function(){
                                var query =  $location.search();
                                if(query.schema){
                                    schemaFilters = getSearchFilters('schema')
                                    if(!_.isArray(query.schema))
                                        query.schema = [query.schema];

                                    _.each(query.schema, function(s){
                                        var sch = _.find(schemaFilters, {id:s});
                                        $scope.saveFilter(sch)
                                    })
                                }
                                // console.log($scope.searchFilters)
                                // localStorageService.set("searchFilters", $scope.searchFilters);
                            })
                        }                
                    };

                    function saveRawQueryFilter(query){
                        $scope.setFilters['rawQuery'] = {
                            type     : 'rawQuery',
                            name     : 'Custom query',
                            id       : query
                        };
                    }

                    function addFilter(filterKey, filterInfo) {                        
                        $scope.searchFilters[filterKey] = filterInfo;
                    };

                    function getSearchFilters(type, fn) {
                        if (!type)
                            return $scope.searchFilters;

                        return _.filter($scope.searchFilters, function (item) {
                            if (item.type === type && (fn==undefined || fn(item)))  return item;
                        });
                    };
                    
                    function getSelectedFilters(type, fn) {
                        if (!type)
                            return $scope.setFilters;

                        return _.filter($scope.setFilters, function (item) {
                            if (item.type === type && (fn==undefined || fn(item)))  return item;
                        });
                    };

                    function getFilter(id) {
                        return $scope.searchFilters[id];
                    };


                    function loadSchemaFilters() {

                        _.each(realm.schemas, function (schema, key) {                           
                                addFilter(key, { 'sort': schema.sort, 'type': 'schema', 'name': schema.title.en, 'id': key, 
                                        'description': (schema.description || {}).en, otherType:schema.type });
                        })

                        addFilter('partyToProtocol'     , { 'sort': 1, 'type': 'partyStatus', 'name': 'Party to the Protocol'                   , 'id': 'partyToProtocol'     , 'description': '' });
                        addFilter('inbetween'           , { 'sort': 2, 'type': 'partyStatus', 'name': 'Ratified, not yet Party to the Protocol' , 'id': 'inbetween'           , 'description': '' });
                        addFilter('nonParty'            , { 'sort': 3, 'type': 'partyStatus', 'name': 'Not a Party to the Protocol '            , 'id': 'nonParty'            , 'description': '' });
                        addFilter('signatoryToProtocol' , { 'sort': 4, 'type': 'partyStatus', 'name': 'Signatory to the Protocol'               , 'id': 'signatoryToProtocol' , 'description': '' });

                        //SCBD
                        _.each(scbdSchemas, function (schema, key) {
                            addFilter(key, { 'sort': schema.sort, 'type': 'schema', 'name': schema.title, 'id': key, 
                                    'description': (schema.description || {}), otherType:'scbd' });
                        });
                    };

                    function loadCountryFilters() {

                        return $q.when(commonjs.getCountries(), function (data) {
                            var countries = data;

                            _.each(countries, function (country, index) {
                                addFilter(country.code.toLowerCase(), { 'sort': index, 'type': 'country', 'name': country.name, 
                                'id': country.code.toLowerCase(), 'description': '', "isCBDParty": country.isCBDParty, "isParty": country.isParty, 
                                "isParty": country.isParty, "isSignatory": country.isSignatory, "isRatified": country.isRatified, 
                                "isInbetweenParty": country.isInbetweenParty, "entryIntoForce": country.entryIntoForce});
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

                        addFilter(region.identifier, { 'type': 'region', 'name': region.title, 'id': region.identifier, 
                        'description': '', 'parent': parent });

                        _.each(region.narrowerTerms, function (narrower) {
                            addRegionFilter(narrower, region.identifier);
                        });
                    }
                    
                    function loadDateFilters() {
                        addFilter('updatedDate_dt', { 'sort': 1, 'type': 'date', 'name': 'Published On', 'id': 'updatedDate_dt', 
                        'description': 'Date range when the record was published' });
                        addFilter('createdDate_dt', { 'sort': 1, 'type': 'date', 'name': 'Created On', 'id': 'createdDate_dt', 
                        'description': 'Date range when the record was created' });
                    };

                    function loadBCHKeywordFilters() {
                        var promises = []
                        promises.push(focalPointTypes().then(function(keywords){loopKeywords(keywords);}));
                        promises.push(thesaurusService.getDomainTerms('decisionTypes'             ).then(function(keywords){loopKeywords(keywords, 'decisionTypes'             )}));
                        promises.push(thesaurusService.getDomainTerms('legislationAgreementTypes' ).then(function(keywords){loopKeywords(keywords, 'legislationAgreementTypes' )}));
                        promises.push(thesaurusService.getDomainTerms('subjectAreas'              ).then(function(keywords){loopKeywords(keywords, 'subjectAreas'              )}));
                        promises.push(thesaurusService.getDomainTerms('cnaJurisdictions'          ).then(function(keywords){loopKeywords(keywords, 'cnaJurisdictions'          )}));
                        promises.push(thesaurusService.getDomainTerms('riskAssessmentScope'       ).then(function(keywords){loopKeywords(keywords, 'riskAssessmentScope'       )}));
                        promises.push(thesaurusService.getDomainTerms('expertiseArea'             ).then(function(keywords){loopKeywords(keywords, 'expertiseArea'             )}));
                        promises.push(thesaurusService.getDomainTerms('resourceTypes'             ).then(function(keywords){loopKeywords(keywords, 'resourceTypes'             )}));
                        promises.push(thesaurusService.getDomainTerms('languages'                 ).then(function(keywords){loopKeywords(keywords, 'languages'                 )}));
                        promises.push(thesaurusService.getDomainTerms('typeOfOrganisms'           ).then(function(keywords){loopKeywords(keywords, 'typeOfOrganisms'           )}));
                        promises.push(thesaurusService.getDomainTerms('domestication'             ).then(function(keywords){loopKeywords(keywords, 'domestication'             )}));
                        promises.push(thesaurusService.getDomainTerms('OrganismCommonUses'        ).then(function(keywords){loopKeywords(keywords, 'OrganismCommonUses'        )}));
                        promises.push(thesaurusService.getDomainTerms('dnaSequenceFamily'         ).then(function(keywords){loopKeywords(keywords, 'dnaSequenceFamily'         )})); 
                        promises.push(thesaurusService.getDomainTerms('dnaSequenceTraits'         ).then(function(keywords){loopKeywords(keywords, 'dnaSequenceTraits'         )}));
                        promises.push(thesaurusService.getDomainTerms('techniqueUsed'             ).then(function(keywords){loopKeywords(keywords, 'techniqueUsed'             )}));
                        promises.push(thesaurusService.getDomainTerms('decisionLMOFFPSubject'     ).then(function(keywords){loopKeywords(keywords, 'decisionLMOFFPSubject'     )}));
                        promises.push(thesaurusService.getDomainTerms('decisionResults'           ).then(function(keywords){loopKeywords(keywords, 'decisionResults'           )}));
                        promises.push(thesaurusService.getDomainTerms('organizationTypes'         ).then(function(types){ return _.filter(types, function(type){return type.identifier!='B3699A74-EF2E-467A-A82F-EF2149A2EFC5'}); })
                                                      .then(function(keywords){loopKeywords(keywords, 'organizationTypes'         )}));
                        
                        
                        
                        return $q.all(promises);
                    
                    }

                    function loadABSKeywordFilters() {
                        var promises = []
                        promises.push(thesaurusService.getDomainTerms('keywords'            ).then(function(keywords){loopKeywords(keywords, 'keywords'             )}));
                        promises.push(thesaurusService.getDomainTerms('thematicAreas'       ).then(function(keywords){loopKeywords(keywords, 'thematicAreas'        )}));
                        promises.push(thesaurusService.getDomainTerms('keyAreas'            ).then(function(keywords){loopKeywords(keywords, 'keyAreas'             )}));
                        promises.push(thesaurusService.getDomainTerms('cnaJurisdictions'    ).then(function(keywords){loopKeywords(keywords, 'cnaJurisdictions'     )}));
                        promises.push(thesaurusService.getDomainTerms('aBSkeyareas'         ).then(function(keywords){loopKeywords(keywords, 'aBSkeyareas'          )}));
                        promises.push(thesaurusService.getDomainTerms('allKeywords'         ).then(function(keywords){loopKeywords(keywords, 'allKeywords'          )}));


                        promises.push(thesaurusService.getDomainTerms('mSR_elements'         ).then(function(keywords){loopKeywords(keywords, 'mSR_elements'          )}));
                                                                        
                        return $q.all(promises);
                    
                    }

                    function focalPointTypes(){
                        return loadJsonFile('/app/app-data/bch/focalpoint-category.json')
                                .then(function(keywords){
                                    return _.map(keywords, function (title, key) {
                                        var keyword = { identifier:key };
                                        keyword.title = {};
                                        keyword.title[locale] = title;
                                        return keyword;
                                    });
                                })
                    }
                    function loadJsonFile(filePath){
                        var deferred = $q.defer();                        
                        require(['json!'+filePath], function(res){
                            deferred.resolve(res);
                        });

                        return deferred.promise;
                    }

                    function loopKeywords(keywords, schemaFieldKey){
                        if((keywords||[]).length){
                            _.each(keywords, function (keyword, index) {
                                addKeywordFilter(keyword, schemaFieldKey, keyword.broader||keyword.broaderTerms);
                            });
                        }
                    }

                    function addKeywordFilter(keyword, schemaFieldKey, broader) {
                        // for future lookup
                        // https://github.com/scbd/absch.cbd.int/commit/0823ab3e6a9aaa68dd59fca379b8158b83a348ba#diff-a8418aa523a6be485d60f93925c4c38dL975

                        // var schemaFieldMap = _.cloneDeep(bchSchemaFieldMapping[schemaFieldKey]);

                        var existingFilter = _.find($scope.searchFilters, function(fil){
                            return fil.name.en == keyword.title.en
                        })
                        if(existingFilter){                           
                            // _.each(schemaFieldMap, function(field){
                            //     field.identifier = keyword.identifier
                            // })
                            existingFilter.identifiers  = _([existingFilter.id]).union([keyword.identifier], existingFilter.identifiers||[]).compact().uniq().value()
                            // existingFilter.schemaFields = _.union(schemaFieldMap, existingFilter.schemaFields||[])                            
                        }
                        else{
                            var filter = {  'type': 'keyword', 'name': keyword.title, 'id': keyword.identifier, 'description': '', 'broader': broader };
                            addFilter(keyword.identifier, filter);
                        }

                    }


                    function updateQueryString(field, values){
                        if(field!='sort'){
                            $location.search('currentPage', 1);
                            $scope.searchResult.currentPage = 1;
                        }
                        $location.search(field, values)

                    }

                    function groupByFields(){
                        return groupFieldMapping;
                    }

                    function groupingCombination(mappings){
                        var combinations = []
                        mappings = mappings || groupFieldMapping;

                        _.each(mappings, function(group){                            
                            var groupField = group.field
                            var others = _.without(mappings, group)

                            var otherComb = _.map(others, function(field){
                                                var lfield = field.field
                                                combinations.push(groupField + '_' + lfield)
                                                return lfield
                                            }).join('_');
                                            
                            combinations.push(group.field)
                            combinations.push(groupField + '_' + otherComb)
                            combinations = _.union(combinations, otherComb);
                        })   
                        return combinations
                    }

                    function combinationField(fields){      
                        fields = _.filter(fields, function(f){
                            var groupMap = _.find(groupFieldMapping, {field:f})
                            return groupMap && (!groupMap.tabs || ~groupMap.tabs.indexOf($scope.searchResult.currentTab))
                        })
                        var map = {
                            groupField : fields.join('_') + '_s',
                            sortFields:[]
                        };
                        _.each(fields, function(field){
                            var group = _.find(groupFieldMapping, {field:field})
                            map.sortFields.push(group.sortFields)
                        })
                        map.sortFields = _.flatten(map.sortFields);
                        return map
                    }

                    function sanitizeFacets(facets){
                        var schemaTypes = {all:0}
                        _.each((facets.facet_fields['schemaType_s']||[]), function(facet, key){
                            schemaTypes[key] = facet;
                            schemaTypes.all = schemaTypes.all + (schemaTypes[key]||0);
                        });
                        
                        return {
                                    schemaTypes: schemaTypes, 
                                    schemas   : facets.facet_fields['schema_s'], 
                                    keywords  : facets.facet_fields['all_terms_ss'],
                                    countries : facets.facet_fields['government_s'], 
                                    regions   : facets.facet_fields['government_REL_ss']
                                };
                    }

                    function updateQueryResult(pageNumber){
                        $timeout(function(){//call digest cycle to update the directive api params
                            $scope.searchResult.loading = true;
                            var queryOptions = buildSearchQuery()
                            var sortFields = ''
                            var resultQuery;
                            if(($scope.searchResult.sortFields||[]).length > 0)
                                sortFields = $scope.searchResult.sortFields.join(', ');

                            var viewType = $scope.searchResult.viewType;
                            if(viewType=='default' && $scope.searchResult.currentTab == 'allRecords')
                                viewType = 'list'
                            else if(viewType=='default' && $scope.searchResult.currentTab == 'nationalRecords')
                                viewType = 'group'
                            else if(viewType=='default' && ($scope.searchResult.currentTab == 'referenceRecords' || $scope.searchResult.currentTab == 'scbdRecords'))
                                viewType = 'list'

                            if(viewType == 'list'){
                                resultQuery = $scope.searchResult.listViewApi.updateResult(queryOptions, sortFields, pageNumber||1);
                            }
                            else if(viewType == 'group'){
                                queryOptions.groupByFields = $scope.searchResult.groupByFields;                                
                                updateQueryString('group', queryOptions.groupByFields);
                                resultQuery = $scope.searchResult.groupViewApi.updateResult(queryOptions, sortFields, pageNumber||1);
                            }
                            else if($scope.searchResult.viewType == 'matrix'){
                                
                            }
                            resultQuery.then(function(data){
                                $scope.searchResult.data = data;
                            })
                            .catch(function(e){
                                toastr.error('There was an error running search query.')
                                var exception = {
                                    data :  e.data||e.message, status:e.status,
                                    url : (e.config||{}).url, params: (e.config||{}).params
                                }                                
                                $log.error(JSON.stringify(exception))
                            })
                            .finally(function(){$scope.searchResult.loading = false;})
                        }, 0)
                    }

                    function buildSearchQuery(){
                        var tagQueries          = {};
                        var tabQuery            = buildTabQuery();
                        var schemaQuery         = buildSchemaQuery();                        
                        var schemaSubQuery      = buildSchemaSubQuery()||{};                        
                        var keywordQuery        = buildFieldQuery('keyword',  'all_terms_ss')
                        var countryQuery        = _.compact([buildFieldQuery('country',  'government_s'), buildFieldQuery('country',   'country_s')]).join(' OR ');
                        var partyStatusQuery    = buildPartyStatusQuery();
                        var regionQuery         = _.compact([buildFieldQuery('region',   'government_REL_ss'), buildFieldQuery('region',   'country_REL_ss')]).join(' OR ');
                        var textQuery           = buildFieldQuery('freeText', 'text_EN_txt');
                        var rawQuery            = buildRawQuery();

                        var dateQuery           = buildDateQuery();

                        if(schemaSubQuery.freeTextQuery){ //append subquery freeText query to general query to benefit highlighting
                            textQuery = solr.andOr(_.compact([textQuery, schemaSubQuery.freeTextQuery]), 'AND')
                        }
                        var queries             = _.compact([dateQuery, textQuery, rawQuery]);
                        var query               = '';
                        if(queries.length)
                            query               = solr.andOr(queries, 'AND')
                        // console.log(query)
                        if(schemaQuery != '(*:*)')
                            tagQueries.schema      =  schemaQuery;
                        tagQueries.version     =  'NOT version_s:*'
                        tagQueries.schemaSub   =  schemaSubQuery.query;
                        tagQueries.schemaType  =  tabQuery;
                        tagQueries.partyStatus =  partyStatusQuery;
                        tagQueries.keywords    =  keywordQuery;
                        tagQueries.government  =  countryQuery;
                        tagQueries.region      =  regionQuery;
                        //special query for Contact as only records which have reference contact are searchable.
                        tagQueries.contact     =  '(*:* NOT schema_s:contact) OR (schema_s:contact AND (refReferenceRecords_ss:* OR refNationalRecords_ss:*))';
                       

                        return {
                            query      :  query||'',
                            tagQueries : _(tagQueries).map(function(f, t){if(f) return '{!tag='+t+'}' + f;}).compact().value(),
                            facetFields : ['{!ex=schemaType}schemaType_s', '{!ex=schema,schemaType,schemaSub}schema_s', 
                                           '{!ex=government}government_s', '{!ex=keywords}all_terms_ss', '{!ex=region}government_REL_ss'],
                            pivotFacetFields : 'schema_s, all_Terms_ss',
                            highlight:textQuery ? true : false,
                            highlightFields:'text_EN_txt'
                        };
                    }

                    function buildSchemaQuery() {
                        
                        var filters = getSelectedFilters('schema')
                        if (!(filters||[]).length){  
                            return "(*:*)";
                        }
                        var selectedSchemas = _.map(filters, 'id')
                        var query = 'schema_s:(' + selectedSchemas.join(' ') + ')'
                        updateQueryString('schema', selectedSchemas);

                        return query;
                    }

                    function buildSchemaSubQuery(){
                        //since the left side filter has to apply locally to the schema only
                        // loop and add or conditions on schemas when sub filters exists else just make schema array query
                        if(!_.isEmpty(leftMenuFilters)){
                            var schemaQueries = []
                            var freeTexQueries = []    
                            _.each(leftMenuFilters, function(filters, key){
                                var subQueries = [];                            
                                subQueries.push('schema_s:'+ key)
                                _.each(filters, function(filter){
                                    var subQuery;
                                    if(filter.disabled)
                                        return;
                                    if(filter.fieldfn!=undefined){ //custom function                                            
                                        var q = customQueryFn[filter.fieldfn](filter);
                                        if(q)
                                            subQuery = q;
                                    }
                                    else if(!_.isEmpty(filter.selectedItems)){
                                        var ids = _.map(filter.selectedItems, 'identifier');
                                        if(filter.type == 'freeText'){                                          
                                            ids = _.map(filter.selectedItems,  function(filter){ 
                                                // || _.trim(filter.title).split(' ').length>1
                                                if(filter.title.indexOf('-')>0) 
                                                    return '"' + _.trim(filter.title) + '"'; 
                                                return _.trim(filter.title)
                                            });
                                            subQuery = '(' + filter.field + ':' + ids.join(' AND ' + filter.field + ':') + ')';
                                            freeTexQueries.push(subQuery)
                                        }
                                        else{
                                            var field = filter.field;
                                            if(filter.searchRelated && filter.relatedField)
                                                field = filter.relatedField;
                                            subQuery = field + ':(' + ids.join(' ') + ')';
                                        }
                                    }
                                    else if(filter.type == 'date' && filter.filterValue){
                                        subQuery = buildDateFieldQuery(filter.field, filter.filterValue);
                                    }
                                    else if(filter.type == 'yesNo' && filter.filterValue!== undefined){
                                        subQuery = filter.field + ':' + filter.filterValue;
                                    }
                                    if(subQuery){
                                        if(filter.excludeResult)
                                            subQuery = '(*:* NOT (' + subQuery + '))'
                                        subQueries.push(subQuery);
                                    }
                                });
                                if(subQueries.length>1){
                                    subQueries = _.uniq(subQueries)                                       
                                    schemaQueries.push(solr.andOr(subQueries, 'AND'))
                                }
                            })
                            if(schemaQueries.length){
                                return {
                                    query          : solr.andOr(schemaQueries,  'OR'),
                                    freeTextQuery  : freeTexQueries.length ? solr.andOr(freeTexQueries, 'OR') : undefined
                                }
                            }
                        }
                    }

                    function buildTabQuery(){
                        var tab = $scope.searchResult.currentTab; 
                        if(tab == 'nationalRecords')
                            return 'schemaType_s:national'
                        if(tab == 'referenceRecords')
                            return 'schemaType_s:reference'
                        if(tab == 'scbdRecords')
                            return 'schemaType_s:scbd'
                    }

                    function buildDateQuery(){
                        var filters = getSelectedFilters('date')
                        if (!(filters||[]).length){     
                            return;
                        }
                        var values = [];
                        _.each(filters, function (item) {
                            values.push(item.dateField+':' + item.query)
                        });
                        if(values.length)
                            return solr.andOr(values, 'AND')
                    }

                    function buildDateFieldQuery(field, date) {

                        if(date.start || date.end) {
                            var start   = date.start ? date.start   + 'T00:00:00.000Z' : '*';
                            var end     = date.end   ? date.end     + 'T23:59:59.999Z' : '*';
    
                            return  field + ':[ ' + start + ' TO ' + end + ' ]';
                        } 
                    }

                    function buildPartyStatusQuery() {                        
                        
                        var filters = getSelectedFilters('partyStatus')
                        if (!(filters||[]).length){     
                            return;
                        }
                        var values;
                        var countries = getSearchFilters('country')
                        _.each(filters, function (item) {
                            values = (values||'') + " " + getCountryList(item.id, countries);
                        });
                        if(values)
                            return 'government_s:(' + values + ')';
                    }

                    function buildFieldQuery(filterType, field) {
                        
                        var filters = getSelectedFilters(filterType)
                        if (!(filters||[]).length){     
                            return;
                        }
                        if(filterType == 'freeText'){
                            var freeTextVals = _.map(filters, function(filter){ 
                                    if(filter.id.indexOf('-')>0) 
                                        return '"' + _.trim(filter.id) + '"'; 
                                    return _.trim(filter.id)
                                })
                            query = '(' + field + ':' + freeTextVals.join(' AND ' + field + ':') + ')';
                        }
                        else
                            query = field + ':(' + _.map(filters, function(filter){ return _.trim(filter.id)}).join(' ') + ')';

                        return query;
                    }

                    function buildExpiredPermitQuery(filter){
                        if(filter.filterValue == true){
                            return 'dateOfExpiry_dt:[* TO NOW]'
                        }
                        else if(filter.filterValue == false)
                            return 'dateOfExpiry_dt:[NOW TO *]'
                        
                    }
                    function buildContactsUserCountryfn(filter){
                        var countries =  _.map(filter.selectedItems, 'identifier') 
                        if(countries.length){
                            return 'country_s:(' + countries.join(' ') + ') AND referencedPermits_ss:*';
                        }
                    }

                    function buildRawQuery(){
                        return ($scope.setFilters['rawQuery']||{}).id;
                    }

                    function getCountryList(id, list){

                        var templist = _.filter(list, function (item) {

                            if (id === 'partyToProtocol' && item.isParty === true)
                                return item;
                            else if (id === 'nonParty' && item.isParty === false)
                                return item;
                            else if (id === 'inbetween' && item.isInbetweenParty === true)
                                return item;
                            else if (id === 'signatoryToProtocol' && item.isSignatory === true)
                                return item;
                        });

                        var govs = _.pluck(templist, 'id');

                        return govs.join(" ");
                    }

                    function getSchemaFieldMapping(schema){
                        return lefteMenuSchemaFieldMapping[schema];
                    }

                    function onLeftFilterUpdate(filters){
                        leftMenuFilters = filters;
                        updateQueryResult();
                    }

                    function loadleftMenuFieldMapping(){
                        var file = 'views/search/search-filters/bch-left-menu-filters.json';
                        if(isABS)
                            file = 'views/search/search-filters/abs-left-menu-filters.json';

                        $q.when(loadJsonFile(file)).then(function(mapping){
                            lefteMenuSchemaFieldMapping = mapping;
                        })
                    }


                    init();

                    this.getSearchFilters         = getSearchFilters        ;
                    this.addFilter                = addFilter               ;
                    this.getFilter                = getFilter               ;
                    this.getSchemaFieldMapping    = getSchemaFieldMapping   ;
                    this.onLeftFilterUpdate       = onLeftFilterUpdate      ;

                    this.groupByFields            = groupByFields           ;
                    this.groupingCombination      = groupingCombination     ;
                    this.combinationField         = combinationField        ;
                    this.sanitizeFacets           = sanitizeFacets          ;

                    this.focalPointTypes          = focalPointTypes
            }]//controller
        };
    });
});
