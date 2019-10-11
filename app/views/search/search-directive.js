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
'components/scbd-angularjs-controls/form-control-directives/km-date-range', 'services/solr'

], function(app, template, _, scbdSchemas, joyRideText) {

    app.directive('searchDirective', function() {
        return {
            restrict: 'EAC',
            replace: true,
            template: template, 
            controller: ['$scope','$q', 'realm', 'searchService', 'commonjs', 'localStorageService', '$http', 'Thesaurus' ,
             'appConfigService', '$routeParams', '$location', 'ngDialog', '$attrs', '$rootScope', 'thesaurusService','$rootScope',
             'joyrideService', '$timeout', 'locale', 'solr',
            function($scope, $q, realm, searchService, commonjs, localStorageService, $http, thesaurus, 
                    appConfigService, $routeParams, $location, ngDialog, $attrs, $rootScope, thesaurusService, $rootScope, joyrideService, 
                    $timeout, locale, solr) {
                    
                        var activeFilter;
                        var base_fields = 'id, rec_date:updatedDate_dt, rec_creationDate:createdDate_dt,identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,';
                        var en_fields =  'rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:description_t, rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt';
    
                        var groupFieldMapping = [
                            {
                                field:'government', 
                                sortFields:['government_EN_s asc']
                            },
                            {
                                field:'schema', 
                                sortFields:['schema_EN_s asc']
                            },
                            {
                                field:'submissionYear', 
                                sortFields:['submissionYear_s asc']
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
                            sortFields      : [],
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

                        if ($scope.setFilters[doc.id]){
                            delete $scope.setFilters[doc.id];
                        }
                        else {
                            $scope.setFilters[doc.id] = {
                                type     : doc.type,
                                otherType: doc.otherType,
                                name     : doc.name,
                                id       : doc.id
                            };
                        }
                        if($scope.setFilters[doc.id].type == 'schema'){
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
                        console.log($scope.setFilters);
                        updateQueryResult();
                    };

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

                    $scope.saveDateFilter = function (filterID, query, dateVal) {
                        var name = dateVal.field.replace('_dt', '').replace(/[A-Z]/g, ' $&') + ' (' +
                                    dateVal.value.start + ' - ' + dateVal.value.end + ')' 
                        $scope.setFilters[filterID] = {
                            type: $scope.searchFilters[filterID].type,
                            query: query,
                            name: name,
                            id: $scope.searchFilters[filterID].id
                        };

                        updateQueryResult();
                    };

                    $scope.removeFilter = function (filterID) {

                        var id = $scope.setFilters[filterID].filterID
                        delete $scope.setFilters[filterID];

                        if($scope.searchFilters[filterID] && $scope.searchFilters[filterID].type == 'schema' && $scope.onSchemaFilterChanged){
                            var leftFilters = $scope.onSchemaFilterChanged(filterID, $scope.setFilters[filterID])
                            leftMenuFilters = leftFilters;
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
                        updateQueryString('sort',fields);
                        updateQueryResult();
                    }

                    $scope.onViewTypeChange = function(options){                        
                        $scope.searchResult.viewType = options.viewType;
                        updateQueryString('viewType',options.viewType);

                        if(options.viewType == 'group')
                            $scope.searchResult.groupByFields = options.fields;

                        if($scope.searchResult.currentTab == 'allRecords')
                            updateQueryResult();
                    }

                    $scope.isFilterOn = function (filterID) {
                        if (!filterID)
                            return false;

                        return $scope.setFilters[filterID] ? true : false;
                    };

                    $scope.switchTab = function(tab){
                        $scope.searchResult.currentTab = tab;
                        updateQueryString('tab',tab);
                        updateQueryResult();
                    }

                    $scope.clearFilter = function(){
                        $scope.setFilters = {};leftMenuFilters = []
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

                        $timeout(function(){updateQueryResult(currentpage);}, 200)
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
                                console.log($scope.searchFilters)
                                // localStorageService.set("searchFilters", $scope.searchFilters);
                            })
                        }                
                    };

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
                            if (!_.includes(['contact'], key))
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
                                'id': country.code.toLowerCase(), 'description': '', "isCBDParty": country.isCBDParty, "isNPParty": country.isNPParty, 
                                "isAppProtocolParty": country.isAppProtocolParty, "isNPSignatory": country.isNPSignatory, "isNPRatified": country.isNPRatified, 
                                "isNPInbetweenParty": country.isNPInbetweenParty, "entryIntoForce": country.entryIntoForce});
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
                        addFilter('publishedOn', { 'sort': 1, 'type': 'date', 'name': 'Published On', 'id': 'publishedOn', 
                        'description': 'Date range when the record was published' });
                    };

                    function loadBCHKeywordFilters() {
                        var promises = []
                        promises.push(focalPointTypes().then(function(keywords){loopKeywords(keywords);}));
                        promises.push(thesaurusService.getDomainTerms('decisionTypes'             ).then(function(keywords){loopKeywords(keywords, 'decisionTypes'             )}));
                        promises.push(thesaurusService.getDomainTerms('legislationAgreementTypes' ).then(function(keywords){loopKeywords(keywords, 'legislationAgreementTypes' )}));
                        promises.push(thesaurusService.getDomainTerms('subjectAreas'              ).then(function(keywords){loopKeywords(keywords, 'subjectAreas'              )}));
                        promises.push(thesaurusService.getDomainTerms('cnaJurisdictions'          ).then(function(keywords){loopKeywords(keywords, 'cnaJurisdictions'          )}));
                        promises.push(thesaurusService.getDomainTerms('riskAssessmentScope'       ).then(function(keywords){loopKeywords(keywords, 'riskAssessmentScope'       )}));
                        promises.push(thesaurusService.getDomainTerms('organizationTypes'         ).then(function(keywords){loopKeywords(keywords, 'organizationTypes'         )}));
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
                            .finally(function(){$scope.searchResult.loading = false;})
                        }, 0)
                    }

                    function buildSearchQuery(){
                        var tagQueries      = [];
                        var schemaQuery     = buildSchemaQuery();                        
                        keywordQuery        = buildFieldQuery('keyword',      'all_terms_ss')
                        countryQuery        = buildFieldQuery('country',      'government_s')
                        partyStatusQuery    = buildPartyStatusQuery();
                        regionQuery         = buildFieldQuery('region',       'government_REL_ss')
                        var queries         = _.compact([schemaQuery, keywordQuery, countryQuery, partyStatusQuery, regionQuery]);
                        var query = solr.andOr(queries, 'AND')
                        console.log(query)


                        return {
                            query      :  query,
                            tagQueries : _(tagQueries).map(function(f, t){if(f) return '{!tag='+t+'}' + f;}).compact().value()
                        };
                    }

                    function buildSchemaQuery() {
                        
                        var tab = $scope.searchResult.currentTab; 
                        
                        var tabValidation = function(item){
                            return item.otherType == 'schema'
                        }

                        var filters = getSelectedFilters('schema')
                        if (!(filters||[]).length){     
                            return "(*:* NOT schema_s:(contact organization))";
                        }

                        var query = 'schema_s:(' + _.map(filters, 'id').join(' ') + ')'
                        //since the left side filter has to apply locally to the schema only
                        // loop and add or conditions on schemas when sub filters exists else just make schema array query
                        if(!_.isEmpty(leftMenuFilters)){
                            var schemaQueries = []
                            _.each(leftMenuFilters, function(filters, key){
                                var subQueries = []
                                _.each(filters, function(filter){
                                    subQueries.push('schema_s:'+ key)
                                    if(!_.isEmpty(filter.selectedItems)){
                                        var ids = _.map(filter.selectedItems, 'identifier');
                                        subQueries.push(filter.field + ':(' + ids.join(' ') + ')') 
                                    }
                                });
                                if(subQueries.length){
                                    subQueries = _.uniq(subQueries)                                       
                                    schemaQueries.push(solr.andOr(subQueries, 'AND'))
                                }
                            })
                            if(schemaQueries.length){
                                query = solr.andOr(schemaQueries, 'OR')
                            }
                        }
                    
                        return query;
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

                        query = field + ':(' + _.map(filters, 'id').join(' ') + ')';

                        return query;
                    }

                    function getCountryList(id, list){

                        var templist = _.filter(list, function (item) {

                            if (id === 'partyToProtocol' && item.isAppProtocolParty === true)
                                return item;
                            else if (id === 'nonParty' && item.isAppProtocolParty === false)
                                return item;
                            else if (id === 'inbetween' && item.isNPInbetweenParty === true)
                                return item;
                            else if (id === 'signatoryToProtocol' && item.isNPSignatory === true)
                                return item;
                        });

                        var govs = _.pluck(templist, 'id');

                        return govs.join(" ");
                    }

                    function getSchemaFieldMapping(schema){
                        return bchSchemaFieldMapping[schema];
                    }

                    function onLeftFilterUpdate(filters){
                        leftMenuFilters = filters;
                        updateQueryResult();
                    }

                    var bchSchemaFieldMapping = {
                        authority                 : [{ type:'thesaurus', term:'subjectAreas', title:'Administrative functions', field:'functions_REL_ss'},
                                                     { type:'thesaurus', term:'typeOfOrganisms', title:'Types of LMOs under its jurisdiction' , field:'cpbOrganismTypes_REL_ss'}],
                        bchNews                   : [],
                        biosafetyDecision         : [{ type:'thesaurus', term:'decisionTypes', title:'Type of Document' , field:''},
                                                        { type:'thesaurus', term:'decisionLMOFFPSubject', title:'TODO Update Title', field:''},
                                                        { type:'thesaurus', term:'decisionResults', title:'TODO Update Title', field:''}],
                        biosafetyLaw              : [{ type:'thesaurus', term:'subjectAreas', title:'Subject Areas', field:''},
                                                        { type:'thesaurus', term:'legislationAgreementTypes', title:'Type of document', field:''}],
                        capacityBuildingActivities: [],
                        capacityBuildingNeeds     : [],
                        contact                   : [],
                        cpbNationalReport1        : [],
                        cpbNationalReport2        : [],
                        cpbNationalReport3        : [],
                        cpbNationalReport4        : [],
                        cpbNationalReportInterim  : [],
                        database                  : [],
                        dnaSequence               : [{ type:'thesaurus', term:'dnaSequenceFamily', title:'Category', field:''},
                                                        { type:'thesaurus', term:'dnaSequenceTraits', title:'Related trait(s)', field:''},],
                        expert                    : [{ type:'thesaurus', term:'organizationTypes', title:'Type of Organization', field:''},
                                                        { type:'thesaurus', term:'expertiseArea', title:'Areas of Expertise', field:''}],
                        expertAssignment          : [],
                        focalPoint                : [{ type:'customFn',  fn:'focalPointTypes', title:'Type of Focal point' , field:''}],
                        independentRiskAssessment : [{ type:'thesaurus', term:'riskAssessmentScope',title:'Scope of the risk assessment', field:''}],
                        modifiedOrganism          : [{ type:'thesaurus', term:'OrganismCommonUses', title:'Common use(s)', field:''},
                                                        { type:'thesaurus', term:'dnaSequenceTraits', title:'use(s) in biotechnology', field:''},
                                                        { type:'thesaurus', term:'techniqueUsed', title:'Techniques used for the modification', field:''}],
                        nationalRiskAssessment    : [{ type:'thesaurus', term:'riskAssessmentScope',title:'Scope of the risk assessment', field:''},],
                        organism                  : [{ type:'thesaurus', term:'typeOfOrganisms', title:'Type of organism(s)', field:''},
                                                        { type:'thesaurus', term:'domestication', title:'Organism domestication', field:''},
                                                        { type:'thesaurus', term:'OrganismCommonUses', title:'Common use(s)', field:''}],
                        organization              : [{ type:'thesaurus', term:'organizationTypes', title:'Type of Organization', field:''}],
                        resource                  : [{ type:'thesaurus', term:'resourceTypes', title:'Type of resource', field:''},
                                                        { type:'thesaurus', term:'languages', title:'Language' , field:''}],
                        submission                : [],
                        supplementaryAuthority    : []
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
