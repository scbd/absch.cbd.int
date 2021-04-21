define(['app', 'text!views/search/search-directive.html','lodash', 'json!app-data/schema-name-plural.json', 'json!app-data/search-tour.json',
'js/common',
'services/search-service',
'views/search/search-filters/keyword-filter',
'views/search/search-filters/national-filter',
'views/search/search-filters/reference-filter',
'views/search/search-filters/scbd-filter',
'views/search/search-filters/country-filter',
'views/search/search-filters/region-filter',
'views/search/search-filters/date-filter',
'views/search/search-results/result-default',
'views/search/search-results/national-records-country',
'services/app-config-service', 'ngDialog',
'views/register/user-preferences/user-alerts',
'views/directives/export-directive',
'services/thesaurus-service', 'angular-animate', 'angular-joyride',
'components/scbd-angularjs-services/services/locale',
'components/scbd-angularjs-controls/form-control-directives/pagination'
], function(app, template, _, schemaNames, joyRideText) {

    app.directive('searchDirective', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            template: template, 
            controller: ['$scope','$q', 'realm', 'searchService', 'commonjs', 'localStorageService', '$http', 'Thesaurus' ,
             'appConfigService', '$routeParams', '$location', 'ngDialog', '$attrs', '$rootScope', 'thesaurusService','$rootScope',
             'joyrideService', '$timeout', 'locale',
            function($scope, $q, realm, searchService, commonjs, localStorageService, $http, thesaurus, 
                    appConfigService, $routeParams, $location, ngDialog, $attrs, $rootScope, thesaurusService, $rootScope, joyrideService, $timeout, locale) {
                    
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
                    $scope.recordCount = [{count:0},{count:0},{count:0}];
                    $scope.skipResults          = $attrs.skipResults;
                    $scope.skipDateFilter       = $attrs.skipDateFilter;
                    $scope.skipSaveFilter       = $attrs.skipSaveFilter;
                    $scope.skipTextFilter       = $attrs.skipTextFilter;
                    $scope.skipKeywordsFilter   = $attrs.skipKeywordsFilter;

                    var base_fields = 'id, rec_date:updatedDate_dt, rec_creationDate:createdDate_dt,identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,';
                    var en_fields =  'rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:description_t, rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt';

                    var queryCanceler = null;
                    $scope.searchResult = {
                        rawDocs  : [],
                        refDocs  : [],
                        scbdDocs : []
                    }

                    var natSchemas = _.without(appConfigService.nationalSchemas, "contact");                   
                    var refSchemas = _.without(appConfigService.referenceSchemas, "organization");
                    var scbdSchemas = appConfigService.scbdSchemas;
                    
                    $scope.currentTab = "nationalRecords";
                    $scope.refresh = false;
                    var refresh_nat = true;
                    var refresh_ref = true;
                    var refresh_scbd = true;

                    $scope.searchFilters = {};
                    $scope.countriesFilters = {};
                    $scope.regionsFilter = {};
                    $scope.searchKeyword = '';

                    $scope.setFilters = {};
                    $scope.test = '';
                    $scope.itemsPerPage = 25;
                    $scope.nationalLoading = false;
                    $scope.referenceLoading = false;
                    $scope.scbdLoading = false;
                    // $scope.currentPage = 0;
                    var nationalCurrentPage = 0;
                    var referenceCurrentPage = 0;
                    var scbdCurrentPage = 0;

                    $scope.relatedKeywords = {};

                    $scope.tabs = {
                        nationalRecords : {currentPage : 0, pageCount   : 0},
                        referenceRecords : {currentPage : 0, pageCount   : 0},
                        scbdRecords : {currentPage : 0, pageCount   : 0}
                    }

                    //===============================================================================================================================
                    $scope.isFreeTextFilterOn = function(filterID) {
                          return false;
                    };

                    //===============================================================================================================================
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
                    //===============================================================================================================================
                    $scope.saveCustomFilter = function(filter) {
                        
                        if(!filter)
                            return;

                        var fid = 'custom_' + filter.id;

                        if($scope.setFilters[fid] )
                            delete $scope.setFilters[fid];
                        else{
                            $scope.setFilters[fid] = {'type':filter.type, 'query': filter.query, 'id':fid, name:filter.name};
                        }

                        $scope.refresh = true;
                    };
                    //===============================================================================================================================
                    function getFilter(id) {
                         //console.log($scope.searchFilters[id]);
                         return $scope.searchFilters[id];

                    };
                    //===============================================================================================================================
                    $scope.updateCurrentTab = function(tabname) {
                           $scope.currentTab = tabname;
                           $scope.showFilters= false;

                        //  if(tabname=='nationalRecords')
                        //     nationalCurrentPage = 0;
                        //  if(tabname=='referenceRecords')
                        //     referenceCurrentPage = 0;
                        //  if(tabname=='scbdRecords')
                        //     scbdCurrentPage = 0;
                    };


                    //===============================================================================================================================
                    function addFilter(filterID, filterInfo ) {

                            //if(!$scope.searchFilters[filterID])
                            $scope.searchFilters[filterID] = filterInfo;
                            //console.log(filterID);
                    };

                    //===============================================================================================================================
                    function getSearchFilters(type) {
                            if(!type)
                                return $scope.searchFilters;

                            return _.filter($scope.searchFilters, function(item){if(item.type === type) return item;});
                    };

                    function setSearchFilters(filters) {
                        $scope.setFilters = {};
                        _.map(filters, function(query){
                            if(query.type == 'text'){
                                $scope.saveFreeTextFilter(query);
                            }
                            else if(query.type == 'custom'){
                                $scope.saveCustomFilter(query);
                            }
                            else{
                                $scope.saveFilter(query);
                            }
                        });

                    };

                    //===============================================================================================================================
                    function getSearchFiltersByParent(parent) {
                            if(!parent)
                                return $scope.searchFilters;

                            return _.filter($scope.searchFilters, function(item){if(item.parent === parent) return item;});
                    };

                    //===============================================================================================================================
                    function getSetFilters() {
                            return $scope.setFilters;
                    };

                   //===============================================================================================================================
                   // function getSearchKeyWord() {
                   //       return $scope.searchKeyword;
                   // };

                   //===============================================================================================================================
                    $scope.removeFilter = function(filterID) {
                            delete $scope.setFilters[filterID];

                            //remove children
                            var dels={};
                            var toDelete =  _.each($scope.setFilters, function(filter){
                                 if(filter.broader === filterID){
                                     $scope.removeFilter(filter.id);
                                 }
                             });

                            $scope.refresh=true;
                    };

                  //===============================================================================================================================
                    $scope.isFilterOn  = function(filterID) {
                          if(!filterID)
                                return false;

                          return $scope.setFilters[filterID] ? true : false;
                    };

                  //===============================================================================================================================
                    $scope.saveFilter = function(doc) {

                        //TODO: if free text check to see if there is a UID and convert to indenifier
                        console.debug("addfilter:" + doc);

                        var filterID = doc.id;
                        var termID = doc.id;
                        var broader = null;

                        if(doc.filterID){
                            filterID = doc.filterID;
                            termID = $scope.searchFilters[filterID].id;
                            var broader =  $scope.searchFilters[filterID].broader ;
                         }
                        if(typeof doc ==='string') {
                            filterID = doc;
                            termID = $scope.searchFilters[filterID].id;
                            var broader =  $scope.searchFilters[filterID].broader ;
                         }

                        if($scope.setFilters[termID])
                           delete $scope.setFilters[termID];
                        else{
                           $scope.setFilters[termID] = {type:$scope.searchFilters[filterID].type, name:$scope.searchFilters[filterID].name, id:termID, broader: broader,  filterID:filterID};
                        }

                        $scope.refresh = true;
                    };

                    //===============================================================================================================================
                    $scope.saveDateFilter = function(filterID, query) {

                        $scope.setFilters[filterID] = {type:$scope.searchFilters[filterID].type, query:query, name:$scope.searchFilters[filterID].name, id:$scope.searchFilters[filterID].id};

                        $scope.refresh = true;
                    };


                  //===============================================================================================================================
                    function nationalQuery(currentPage, itemsPerPage) {

                        var searchOperation;

                        if (queryCanceler) {
                            queryCanceler.resolve(true);
                        }

                        var q = queryFilterBuilder("national");

                        queryCanceler = $q.defer();

                        var groupQuery = {
                            query       : q,
                            sort: 'government_EN_s asc, schemaSort_i asc, sort1_i asc, sort2_i asc, sort3_i asc, sort4_i asc, updatedDate_dt desc',
                            currentPage     : currentPage   || $scope.tabs['nationalRecords'].currentPage,
                            rowsPerPage     : itemsPerPage  || $scope.itemsPerPage,
                            groupField      : 'governmentSchemaIdentifier_s',
                            groupLimit      : 10
                        };
                        $scope.exportNationalQuery = groupQuery;
                        $scope.nationalLoading = true;
                        searchOperation = searchService.group(groupQuery, queryCanceler);

                        if(!$scope.skipResults){
                            $q.when(searchOperation)
                                .then(function(data) {
                                    queryCanceler = null;

                                    $scope.recordCount[0].count = data.data.grouped.governmentSchemaIdentifier_s.matches;
                                    $scope.tabs['nationalRecords'].pageCount = Math.ceil(data.data.grouped.governmentSchemaIdentifier_s.ngroups / $scope.itemsPerPage);
                                    
                                    $scope.searchResult.rawDocs = []; 
                                    $scope.searchResult.groupQuery = groupQuery;
                                    var countryRecords = {}
                                    _.each(data.data.grouped.governmentSchemaIdentifier_s.groups, function(record){

                                        var gpDetails = (record.groupValue||'').split('_');
                                        if(!gpDetails.length)
                                            return;
                                        var schema              = gpDetails[1];
                                        var country             = gpDetails[0];
                                        if(!countryRecords[country])
                                            countryRecords[country] = { schemas : angular.copy(schemaTemplate) };
                                        countryRecords[country].country = country;

                                        countryRecords[country].schemas[schema]     = _.extend(countryRecords[country].schemas[schema], record.doclist);

                                    });
                                    $scope.searchResult.rawDocs = _.values(countryRecords);

                                }).catch(function(error) {
                                    console.log('ERROR: ' + error);
                                })
                                .finally(function(){
                                    $scope.nationalLoading = false;
                                });
                        }

                    };

                  //===============================================================================================================================
                    function referenceQuery() {

                        var searchOperation;

                        if (queryCanceler) {
                            console.log('trying to abort pending request...');
                            queryCanceler.resolve(true);
                        }
                        var fields = base_fields + en_fields + 
                        ', implementingAgencies_EN_txt, executingAgencies_EN_txt, collaboratingPartners_EN_txt, authors_t, organizations_EN_txt, publicationYear_i';
                        

                        var q = queryFilterBuilder("reference");

                        queryCanceler = $q.defer();

                        var listQuery = {
                            fields      : fields,
                            query       : q,
                            sort        : _.isEmpty($scope.setFilters) ? 'updatedDate_dt desc' : undefined,
                            currentPage     : $scope.tabs['referenceRecords'].currentPage,
                            rowsPerPage     : $scope.itemsPerPage,
                        };

                        $scope.exportReferenceQuery = listQuery;
                        searchOperation = searchService.list(listQuery, queryCanceler);

                        if(!$scope.skipResults){
                            $q.when(searchOperation)
                            .then(function(data) {
                                queryCanceler = null;

                                $scope.tabs['referenceRecords'].pageCount = Math.ceil(data.data.response.numFound / $scope.itemsPerPage);
                                $scope.searchResult.refDocs = data.data.response;
                                $scope.recordCount[1].count = data.data.response.numFound;

                            }).catch(function(error) {
                                referenceCurrentPage -= 1;
                                console.log('ERROR: ' + error);
                            })
                            .finally(function(){
                                $scope.referenceLoading = false;
                            });
                        }
                    };
                  //===============================================================================================================================
                    function scbdQuery() {

                        var searchOperation;

                        if (queryCanceler) {
                            console.log('trying to abort pending request...');
                            queryCanceler.resolve(true);
                        }
                        var fields = base_fields + en_fields + ', startDate_dt,endDate_dt,url_ss, uniqueIdentifier_s, eventCity_s, eventCountry_EN_t';
                        var q = queryFilterBuilder("scbd");

                        queryCanceler = $q.defer();

                        var listQuery = {
                            query       : q,
                            fields      : fields,
                            sort        : _.isEmpty($scope.setFilters) ? 'sort1_dt desc, updatedDate_dt desc' : undefined,
                            currentPage     : $scope.tabs['scbdRecords'].currentPage,
                            rowsPerPage     : $scope.itemsPerPage,
                        };

                        $scope.exportScbdQuery = listQuery;
                        searchOperation = searchService.list(listQuery, queryCanceler);

                        if(!$scope.skipResults){
                            $q.when(searchOperation)
                            .then(function(data) {
                                queryCanceler = null;
                                
                                $scope.tabs['scbdRecords'].pageCount = Math.ceil(data.data.response.numFound / $scope.itemsPerPage);
                                $scope.searchResult.scbdDocs = data.data.response;
                                $scope.recordCount[2].count = data.data.response.numFound;
                               
                            }).catch(function(error) {
                                scbdCurrentPage -= 1;
                                console.log('ERROR: ' + error);
                            })
                            .finally(function(){
                                $scope.scbdLoading = false;
                            });;
                        }
                    };

                  //===============================================================================================================================
                    function queryFilterBuilder(queryType){
                        var qAnd=[];
                        var qOr =[];
                        var q   ='';
                        var q1   ='';



                        if(queryType === 'national'){
                              qAnd.push(buildFieldQuery('schema_s', 'national', natSchemas.join(' ')));
                              qAnd.push(buildFieldQuery('government_s', 'country', "*"));
                              qAnd.push(buildCountryQuery('government_s'    ,'partyStatus', null));
                              qOr.push(buildTextQuery('text_EN_txt'      ,'freeText'  , null));
                              qOr.push(buildFieldQuery('government_REL_ss','region'  , null));
                              //qOr.push(buildTextQuery('text_EN_txt'    ,'reference', null));
                             // qOr.push(buildFieldQuery('all_terms_ss'    ,'reference', null));
                              qOr.push(buildTextQuery('text_EN_txt'    ,'scbd', null));
                              qOr.push(buildFieldQuery('all_terms_ss'    ,'scbd', null));
                              qOr.push(buildTextQuery('text_EN_txt'    ,'keyword', null));
                              qOr.push(buildFieldQuery('all_terms_ss'    ,'keyword', null));

                        }

                        if(queryType === 'reference'){
                               qAnd.push(buildFieldQuery('schema_s','reference', refSchemas.join(' ')));
                              // qOr.push(buildTextQuery('text_EN_txt'    ,'scbd', null));
                               //qOr.push(buildFieldQuery('all_terms_ss'  ,'scbd', null));
                              // qOr.push(buildTextQuery('text_EN_txt'     ,'national', null));
                              // qOr.push(buildFieldQuery('all_terms_ss'   ,'national', null));
                               qOr.push(buildTextQuery('text_EN_txt'    ,'country', null));
                               qOr.push(buildFieldQuery('all_terms_ss'  ,'country', null));
                               qOr.push(buildTextQuery('text_EN_txt'    ,'freeText', null));
                               qOr.push(buildTextQuery('all_terms_ss'  ,'freeText', null));
                               qOr.push(buildTextQuery('text_EN_txt'    ,'region', null));
                               qOr.push(buildFieldQuery('all_terms_ss'  ,'region', null));
                               qOr.push(buildFieldQuery('regions_REL_ss','country', null));
                               qOr.push(buildFieldQuery('regions_REL_ss','region', null));
                               qOr.push(buildTextQuery('text_EN_txt'    ,'keyword', null));
                               qOr.push(buildFieldQuery('all_terms_ss'    ,'keyword', null));

                        }

                        if(queryType === 'scbd'){
                               qAnd.push(buildFieldQuery('schema_s','scbd', scbdSchemas.join(' ')));
                               //qOr.push(buildTextQuery('text_EN_txt'      ,'national'  , null));
                               //qOr.push(buildTextQuery('text_EN_txt'      ,'reference' , null));
                               qOr.push(buildTextQuery('text_EN_txt'      ,'country'   , null));
                               qOr.push(buildTextQuery('text_EN_txt'      ,'region', null));
                               qOr.push(buildTextQuery('text_EN_txt'      ,'freeText'   , null));
                               qOr.push(buildTextQuery('text_EN_txt'    ,'keyword', null));
                               qOr.push(buildTextQuery('text_EN_txt'    ,'partyStatus', null));
                        }
                        //custom queries
                        _.map(_.filter($scope.setFilters, {type:'custom'}), function(custom){
                            if(custom.query)
                                qAnd.push(custom.query)
                        });

                        qAnd.push(buildDateFieldQuery('updatedDate_dt','publishedOn'));

                        q = combineQuery(qAnd, "AND");
                        q1 = combineQuery(qOr, "OR");

                        return q1 ? q + " AND (" + q1 + ")" : q;
                     };

                  //===============================================================================================================================
                    function checkSetFilters(type){
                       return  _.find($scope.setFilters, function(item){if(item.type === type) return true;});
                    }

                     //===============================================================================================================================
                    function buildTextQuery(field, type, boost){
                        var q = '';
                        var values = [];

                        if($scope.setFilters){
                            _.each($scope.setFilters, function(item){

                                if(item.type == type){
                                    values.push($scope.setFilters[item.id].name.toLowerCase());
                                }

                            });
                            if(values.length)
                                q = addORCondition(field, values, boost)
                        }
                       return  q ? q : null;
                    }

                    //===============================================================================================================================
                    function buildCustomQuery(field, type, boost){
                        var q = '';
                        var values = [];

                        if($scope.setFilters){
                            _.each($scope.setFilters, function(item){

                                if(item.type == type){
                                    values.push($scope.setFilters[item.id].name.toLowerCase());
                                }

                            });
                            if(values.length)
                                q = addORCondition(field, values, boost)
                        }
                    return  q ? q : null;
                    }
                  //===============================================================================================================================
                    function buildCountryQuery(field, type, boost){
                        var q = '';
                        var values = '';
                        var countries = getSearchFilters("country");

                        if($scope.setFilters){
                            _.each($scope.setFilters, function(item){
                               if(item.type === type){
                                    values = values + " " + getCountryList(item.id, countries);
                               }
                            });

                             if(values.length)
                                 q = addANDConditionText(field, values, boost)
                        }

                       return  q ? q : null;
                    }
                      //===============================================================================================================================
                    function getCountryList(id, list){

                        var templist = _.filter(list, function(item){

                             if(id ==='npParty' && item.isNPParty===true)
                                return item;
                             if(id ==='npNonParty' && item.isNPParty===false)
                                return item;
                             if(id ==='npInbetween' && item.isNPInbetweenParty===true)
                                return item;
                             if(id ==='npSignatory' && item.isNPSignatory===true)
                                return item;
                        });

                        var govs  =  _.pluck(templist, 'id');
                        //console.log(govs);

                        return govs.join(" ");
                    }

                  //===============================================================================================================================
                    function buildFieldQuery(field, type, allFilters){
                        var q = '';
                        var capacityBuildingResource;
                        if($scope.setFilters[type]){
                            q = field + ":(" + allFilters + ")"
                        }
                        else{
                            _.each($scope.setFilters, function(item){
                                if(item.type == type){
                                    if(customKeywords[item.id] && item.id == 'capacityBuildingResource'){
                                        capacityBuildingResource = true;
                                        q =  q + 'resource' + ' '
                                    }
                                    else if(customKeywords[item.id] && item.id != 'capacityBuildingResource')
                                        q =  q + customKeywords[item.id].identifiers.join(' ') + ' ';
                                    else
                                        q =  q + item.id + ' ';
                                    
                                }
                            });
                        }

                        if(q){
                             var newQuery = field + ":(" + q + ")";
                             if(capacityBuildingResource)
                                newQuery += ' AND all_terms_ss:(' +  customKeywords['capacityBuildingResource'].identifiers.join(' ') + ') ';
                             return newQuery;
                        }
                        else if(allFilters)
                             return field + ":(" + allFilters + ")";
                        else
                             return null;
                    }
                    function buildDateFieldQuery(field, type){

                        if($scope.setFilters[type] && $scope.setFilters[type].query != '*:*'){
                            return field + ":" + $scope.setFilters[type].query;
                        }
                        return null;
                    }

                  //===============================================================================================================================
                    function addORCondition(field, values, boost){
                        var q ="";
                        var conditions = [];
                        _.each(values, function (val){conditions.push(""+field+":\"*"+val + "*\"" + (boost ? "^" + boost : ""))});
                        _.each(conditions, function (condition) { q = q + (q=='' ? '(' : ' OR ') + condition; });
                        q = q +")";
                        return q;
                    }

                    //===============================================================================================================================
                    function addANDConditionText(field, values, boost){
                        var q ="";
                        var conditions = [];

                        q = "(" + field +":("+ values +"))";
                        return q;
                    }

                  //===============================================================================================================================
                    function combineQuery(qCondition, op1 ){
                        var q ='';
                        _.each(qCondition, function (val){ if(val) q = q + (q ? op1 : "") + "(" + val + ")" } );
                        return q ? q : '';
                    }

                  //===============================================================================================================================
                    function loadFilters() {

                         //console.log('load filters');

                        if( _.isEmpty($scope.searchFilters) ){
                            $scope.searchFilters = {};
                            $scope.searchFilters = localStorageService.get("searchFilters");
                            //console.log('getting filters from local storage');
                        }
                        if( _.isEmpty($scope.searchFilters) ){
                            $scope.searchFilters = {};
                            loadSchemaFilters();
                            loadCountryFilters();
                            if(isABS)
                                loadABSKeywordFilters();
                            else if(isBCH)
                                loadBCHKeywordFilters();
                            loadRegionsFilters();
                            loadDateFilters();
                            localStorageService.set("searchFilters", $scope.searchFilters);
                            //console.log('getting new filters');
                       }

                        $scope.test = $scope.searchFilters.length;
                    };

                  //===============================================================================================================================
                    function loadCountryFilters() {

                        $q.when(commonjs.getCountries(), function(data) {
                                var countries = data;

                                _.each(countries, function(country, index){
                                    addFilter(country.code.toLowerCase(), {'sort': index, 'type':'country', 'name':country.name[locale||en], 'id':country.code.toLowerCase(), 'description':'', "isCBDParty": country.isCBDParty,"isNPParty":country.isNPParty,
                                        "isAppProtocolParty": country.isAppProtocolParty, "isNPSignatory": country.isNPSignatory,"isNPRatified": country.isNPRatified ,"isNPInbetweenParty":country.isNPInbetweenParty,"entryIntoForce": country.entryIntoForce});
                                });
                        });
                    };

                  //===============================================================================================================================
                    function loadABSKeywordFilters() {

                        //IRCC filters
                        addKeywordFilter(customKeywords.commercial, 'absPermit', 'IRCC usages');
                        addKeywordFilter(customKeywords.nonCommercial, 'absPermit', 'IRCC usages');
                                             
                        $q.when(thesaurusService.getDomainTerms('keywords'), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword, 'absPermit', 'IRCC keywords');
                                });
                        });

                        //CP
                         $q.when(thesaurusService.getDomainTerms('cpJurisdictions'), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword, 'absCheckpoint', 'Checkpoint jurisdiction');
                                });
                        });
                        //CPC
                         $q.when(thesaurusService.getDomainTerms('keywords'), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword, 'absCheckpointCommunique', 'Checkpoint communique keywords');
                                });
                        });
                        ///////////////
                         $q.when(commonjs.getThematicAreas(), function(keywords) {
                                 var levels = [];
                                 var parents = [];
                                 var level=0;

                                 _.each(keywords, function(keyword, index){

                                   levels[keyword.identifier] = 1;
                                   parents[keyword.identifier] = '';

                                   if(keyword.broaderTerms.length === 0)
                                        levels[keyword.identifier] = 0;

                                    if(keyword.broaderTerms.length > 0){
                                       levels[keyword.identifier] =  levels[keyword.broaderTerms] + 1;
                                        parents[keyword.identifier] = keyword.broaderTerms.join();
                                    }

                                });

                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword, '', 'ABS Thematic Areas', levels[keyword.identifier], parents[keyword.identifier] );
                                });

                        });


                        $q.when(commonjs.getKeyAreas(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword, '', '');
                                });
                        });

                        $q.when(commonjs.getCBI_audience(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword, 'capacitybuildinginitiative resource capacitybuildingresource', 'Target Audience');
                                });
                        });

                        $q.when(commonjs.getMSR_types(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword, 'measure', 'Type');
                                });
                        });

                        $q.when(commonjs.getMSR_status(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword, 'measure', 'Legal Status');
                                });
                        });

                         $q.when(commonjs.getMSR_elements(), function(keywords) {
                                 var levels = [];
                                 var parents = [];
                                 var level=0;

                                 _.each(keywords, function(keyword, index){

                                   levels[keyword.identifier] = 1;
                                   parents[keyword.identifier] = '';

                                   if(keyword.broaderTerms.length === 0)
                                        levels[keyword.identifier] = 0;

                                    if(keyword.broaderTerms.length > 0){
                                       levels[keyword.identifier] =  levels[keyword.broaderTerms] + 1;
                                        parents[keyword.identifier] = keyword.broaderTerms.join();
                                    }

                                });

                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword, 'measure', 'Key elements', levels[keyword.identifier], parents[keyword.identifier] );
                                });

                        });

                        //use term filter instead.
                        $q.when(commonjs.getMSR_modelcontract(), function(keyword) {
                              //  _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword, 'measure', 'Contains model contractual clause');
                               // });
                        });

                        $q.when(commonjs.getCNA_scope(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword, 'authority', 'Scope of responsibilities');
                                });
                        });

                         $q.when(commonjs.getMSR_jurisdictions(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword,  'measure', 'Jurisdiction');
                                });
                        });

                         $q.when(commonjs.getCNA_jurisdictions(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword,  'authority', 'Jurisdiction');
                                });
                        });

                        $q.when(commonjs.getMCC_keywords(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword,  'modelcontractualclause', 'Keyword');
                                });
                        });

                        $q.when(commonjs.getMCC_types(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword,  'modelcontractualclause', 'Type');
                                });
                        });

                        $q.when(commonjs.getCBI_cats(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword,  'capacitybuildinginitiative', 'Category');
                                });
                        });

                        $q.when(commonjs.getCBI_types(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword,  'capacitybuildinginitiative', 'Type');
                                });
                        });
                        $q.when(commonjs.getCBI_fundingsrc(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword,  'capacitybuildinginitiative', 'Funding Source');
                                });
                        });

                        $q.when(commonjs.getCBI_status(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword,  'capacitybuildinginitiative', 'Status');
                                });
                        });

                        $q.when(commonjs.getCBI_status(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword, 'capacitybuildinginitiative', 'Status');
                                });
                        });

                        $q.when(commonjs.getCBR_level(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword,  'resource capacitybuildingresource', 'Level');
                                });
                        });

                        $q.when(commonjs.getCBR_purpose(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword,  'resource capacitybuildingresource', 'Purpose');
                                });
                        });

                         $q.when(commonjs.getCBR_formats(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword, 'resource capacitybuildingresource', 'Format');
                                });
                        });

                        $q.when(commonjs.getCPP_types(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword,  'communityprotocol', 'Type');
                                });
                        });

                         $q.when(commonjs.getAichiTargets(), function(keywords) {
                                _.each(keywords, function(keyword, index){
                                    addKeywordFilter(keyword, '', 'Aichi Targets');
                                });
                        });

                    };

                    function loadBCHKeywordFilters(){

                        var bchTerms = [
                            'decisionTypes',            
                            'decisionLMOFFPSubject',    
                            'decisionResults',          
                            'riskAssessmentScope',      
                            'dnaSequenceFamily',        
                            'dnaSequenceTraits',        
                            'legislationAgreementTypes',
                            'subjectAreas',             
                            'typeOfOrganisms',          
                            'domestication',            
                            'OrganismCommonUses',       
                            'techniqueUsed',            
                            'cnaJurisdictions',
                        ]

                        $q.all(_.map(bchTerms, thesaurusService.getDomainTerms))
                        .then(function(results){
                            console.log(results);
                            _.each(results, function(terms){
                                _.each(terms, function(term){
                                    addKeywordFilter(term, 'bchTerm', "ABS Thematic Areas");
                                })
                            })
                            console.log($scope.searchFilters)
                        })
                        

                    }

                    function isIdentifierDuplicate(keyword){                      
                        var duplicate;
                        _.reduce(customKeywords, function(memo, value, key){
                            if(_.contains(value.identifiers, keyword.identifier)){
                                duplicate = value;
                            }
                        },{})
                        return duplicate;
                    }
                    //===============================================================================================================================
                     function addKeywordFilter(keyword, related, parent, level, broader){
                        if(!level)
                            level=0;
                        
                         var dupIdentifier = isIdentifierDuplicate(keyword);
                         if(dupIdentifier)
                             addFilter(dupIdentifier.identifier + "@" +  related, {'type':'keyword', 'name':dupIdentifier.title[locale||'en'], 'id':dupIdentifier.identifier,
                            'description':'',  'parent' : parent, 'related' : related, filterID: dupIdentifier.identifier + "@" +  related, 'level':level, 'broader': broader, isDuplicate : true});
                         else
                            addFilter(keyword.identifier + "@" +  related, {'type':'keyword', 'name':keyword.title[locale||'en'], 'id':keyword.identifier,
                            'description':'',  'parent' : parent, 'related' : related, filterID: keyword.identifier + "@" +  related, 'level':level, 'broader': broader});

                         //_.each(keyword.narrowerTerms,function(narrower){
                        //    addKeywordFilter(narrower, keyword.identifier);
                        //});
                    }
                    // //===============================================================================================================================
                    //  function addThematicAreaFilter(keyword,related, parent){

                    //     addFilter(keyword.identifier, {'type':'keyword', 'name':keyword.title[locale||en], 'id':keyword.identifier,
                    //         'description':'', 'parent' : parent, 'related' : related});

                    //     //_.each(keyword.narrowerTerms,function(narrower){
                    //     //    addThematicAreaFilter(narrower, related, parent);
                    //     //});
                    // }


                  //===============================================================================================================================
                    function loadRegionsFilters(){

                        $q.when(commonjs.getRegions(), function(regions) {
                                //console.log(regions);
                                _.each(regions, function(region, index){
                                    //console.log(region);
                                    addRegionFilter(region);
                                });
                        });
                    };
                    //===============================================================================================================================
                    function addRegionFilter(region, parent){

                        addFilter(region.identifier, {'type':'region', 'name':region.title[locale||en], 'id':region.identifier,
                            'description':'', 'parent' : parent});

                        _.each(region.narrowerTerms,function(narrower){
                            addRegionFilter(narrower, region.identifier);
                        });
                    }
                    //===============================================================================================================================
                    function loadDateFilters(){
                        addFilter('publishedOn',  {'sort': 1,'type':'date',  'name':'Published On', 'id':'publishedOn', 'description':'Date range when the record was published'});
                    };

                  //===============================================================================================================================
                    function loadSchemaFilters() {
                       
                        
                        _.each(realm.schemas, function(schema, key){
                            if(!_.includes(['contact'], key)){
                                addFilter(key,  {'sort': schema.sort,'type':schema.type,  'name':schema.title.en, 
                                    'id':key, 'description':(schema.description||{}).en}); 
                            }
                        })                        

                        addFilter('npParty',  {'sort': 1,'type':'partyStatus','name':'Party to the Protocol', 'id':'npParty', 'description':''});
                        addFilter('npInbetween',  {'sort': 2,'type':'partyStatus','name':'Ratified, not yet Party to the Protocol', 'id':'npInbetween', 'description':''});
                        addFilter('npNonParty',  {'sort': 3,'type':'partyStatus','name':'Not a Party to the Protocol ', 'id':'npNonParty', 'description':''});
                        addFilter('npSignatory',  {'sort': 4,'type':'partyStatus','name':'Signatory to the Protocol', 'id':'npSignatory', 'description':''});


                        //TODO get from scbd.json
                        //SCBD
                        addFilter('news',  {'sort': 1,'type':'scbd', 'name':schemaNames.news, 'id':'news', 'description':'ABS related news'});
                        addFilter('notification',  {'sort': 2,'type':'scbd',  'name':schemaNames.notification, 'id':'notification', 'description':'ABS related notifications'});

                        addFilter('new',  {'sort': 3,'type':'scbd', 'name':schemaNames.new, 'id':'new', 'description':'What\'s new'});
                        addFilter('meeting',  {'sort': 4,'type':'scbd',  'name':schemaNames.meeting, 'id':'meeting', 'description':'ABS related meetings'});

                        addFilter('statement',  {'sort': 3,'type':'scbd', 'name':schemaNames.statement, 'id':'statement', 'description':'ABS related statements'});
                        addFilter('pressRelease',  {'sort': 4,'type':'scbd',  'name':schemaNames.pressrelease, 'id':'pressRelease', 'description':'ABS related press release'});
                    };

                  ///////////////
                  ////===============================================================================================================================
                  /////////

                    function load(){
                        //console.log("loading queries");
                        switch ($scope.currentTab) {
                            case "nationalRecords":
                                if(refresh_nat)
                                    nationalQuery();
                                    refresh_nat = false;
                                break;
                           case "referenceRecords":
                                if(refresh_ref)
                                    referenceQuery();
                                    refresh_ref = false;
                                break;
                           case "scbdRecords":
                                if(refresh_scbd){
                                    scbdQuery();
                                    refresh_scbd = false;
                                }
                                break;
                            default:
                                nationalQuery();
                                referenceQuery();
                                scbdQuery();
                                refresh_nat = false;
                                refresh_ref = false;
                                refresh_scbd = false;
                                break;
                        }
                    };

                    //===============================================================================================================================
                    function loadTabFacets(){
                            var qNational  = queryFilterBuilder("national");
                            var qReference = queryFilterBuilder("reference");
                            var qSCBD      = queryFilterBuilder("scbd");

                            var query = {
                                fields      : '_latest_s',
                                currentPage : 0,
                                rowsPerPage : 0
                            };

                            $q.all([searchService.list(_.extend({query : qNational  }, query), queryCanceler),
                                    searchService.list(_.extend({query : qReference }, query), queryCanceler),
                                    searchService.list(_.extend({query : qSCBD      }, query), queryCanceler)
                            ])
                            .then(function(results){
                                //console.log(results);
                                $scope.recordCount = _.map(results, function(data, index){
                                                        return {
                                                            //type : index == 1 ? 'national' : (index == 2 ? 'reference' : 'scbd'),
                                                            count : data.data.response.numFound
                                                        };
                                                    });
                            });
                    }

                    this.addFilter = addFilter;
                    this.nationalQuery = nationalQuery;
                    this.referenceQuery = referenceQuery;
                    this.scbdQuery = scbdQuery;
                    this.getSearchFilters = getSearchFilters;
                    $scope.getSearchFilters = getSearchFilters;
                    this.setSearchFilters = setSearchFilters;
                    $scope.setSearchFilters = setSearchFilters;

                    this.getFilter = getFilter;
                    this.getSearchFiltersByParent = getSearchFiltersByParent;

                   //===============================================================================================================================
                   if(!$scope.skipResults){
                     $scope.$watch('currentTab', function(newVal, oldVal){
                       if(newVal != oldVal)
                            load();
				      });
                   }

                    //===============================================================================================================================
                    $scope.$watch('searchKeyword', function(){
                        this.searchKeyword = $scope.searchKeyword;
				    });


                  //===============================================================================================================================
                  if(!$scope.skipResults){
                        $scope.$watch('refresh', function(newVal, oldVal){
                            if(newVal && newVal !== oldVal){
                                refreshResult();                                
                                $scope.getRelatedKeywords();
                            }
                        });
                  }

                  function refreshResult(){
                    refresh_nat = true;
                    refresh_ref = true;
                    refresh_scbd = true;
                    nationalCurrentPage = 0;
                    referenceCurrentPage = 0;
                    scbdCurrentPage = 0;
                    
                    $scope.tabs['nationalRecords'].currentPage = 0;
                    $scope.tabs['referenceRecords'].currentPage = 0;
                    $scope.tabs['scbdRecords'].currentPage = 0;
                    load();
                    loadTabFacets();
                    $scope.refresh = false;
                  }

                    //===============================================================================================================================
                    $scope.getRelatedKeywords = function() {
                       $scope.relatedKeywords ={};
                       var relatedKeywords = {};
                       var setIds = {};
                       var keywords = getSearchFilters("keyword");

                       if($scope.setFilters){

                         _.each($scope.setFilters, function(set){

                            relatedKeywords  =  _.filter(keywords, function(item){

                                if(item.related.toLowerCase().indexOf(set.id.toLowerCase()) >= 0)
                                    return item;
                                else
                                    return null;
                             });
                             if(!_.isEmpty(relatedKeywords))
                                $scope.relatedKeywords[set.id] = relatedKeywords;
                         });
                       }



                    }

                    //===============================================================================================================================
                    $scope.updateScrollPage = function() {

                        if($scope.currentTab == 'nationalRecords'){
                            var documents = _.pluck($scope.searchResult.rawDocs.groups, 'doclist');
                            var docCount = getRecordCount(documents);
                            
                            //nationalCurrentPage cannot be more than 200 as No. parties are 196 to CBD
                            if(nationalCurrentPage > 200 || $scope.nationalLoading || !$scope.recordCount || docCount == $scope.recordCount[0].count)
                                return;

                            $scope.nationalLoading = true;
                            nationalCurrentPage += 1;
                            nationalQuery();
                        }
                        else if($scope.currentTab == 'referenceRecords'){
                            if(referenceCurrentPage > 1000 && $scope.referenceLoading || !$scope.recordCount || ($scope.searchResult.refDocs.docs||[]).length == $scope.recordCount[1].count)
                                return;
                            $scope.referenceLoading = true;
                            referenceCurrentPage += 1;
                            referenceQuery();
                        }
                        else if($scope.currentTab == 'scbdRecords'){
                            if(referenceCurrentPage > 1000 && $scope.scbdLoading || !$scope.recordCount || ($scope.searchResult.scbdDocs.docs||[]).length == $scope.recordCount[2].count)
                                return;

                            $scope.scbdLoading = true;
                            scbdCurrentPage += 1;
                            scbdQuery();
                        }

                    };

                    //===============================================================================================================================
                    function getRecordCount(documents){
                        return _.reduce(_.pluck(documents, 'numFound'), function(mem,d){ return mem + d;},0);
                    }

                    //===============================================================================================================================
                    loadFilters();


                    if(!$scope.skipResults && $routeParams.recordType){
                        if($routeParams.recordType == 'run-query'){
                            var queryFilter = localStorageService.get("run-query");                            
                            setSearchFilters(queryFilter);
                            $scope.refresh = false;
                        }
                        else{
                            $scope.currentTab = $routeParams.recordType;

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
                                $scope.refresh = false;
                            }
                        }
                    }

                    $scope.canShowSaveFilter = function(){
                        return !$scope.skipSaveFilter && !_.isEmpty($scope.setFilters);
                    }

                    $scope.isUserAuthenticated = function() {
                        //console.log("user = " + $rootScope.user.isAuthenticated);
                        return $rootScope.user && $rootScope.user.isAuthenticated;
                    }

                    $scope.showSaveFilter = function(existingFilter){
                        if($rootScope.user && !$rootScope.user.isAuthenticated){
                            var signIn = $scope.$on('signIn', function(evt, data){
                                 $scope.showSaveFilter();
                                 signIn();
                            });
                            $('#loginDialog').modal("show");
                        }
                        else{

                            var filters = $scope.setFilters;

                            ngDialog.open({
                                className : 'ngdialog-theme-default wide',
                                template : 'saveFilterDialog',
                                controller : ['$scope', '$http','realm', function($scope, $http, realm){
                                        if(existingFilter)
                                            $scope.record = existingFilter;
                                        else
                                            $scope.record = {filters : _.values(filters) }
                                        
                                        $scope.record.realm = realm.value;
                                        $scope.record.isSystemAlert = false;

                                        $scope.saveFilter = function(){
                                            $scope.loading = true;                                            
                                            var operation = $http.post('/api/v2016/me/subscriptions', $scope.record);
                                            if($scope.record._id)
                                                operation = $http.put('/api/v2016/me/subscriptions/' + $scope.record._id, $scope.record);
                                            operation.then(function (data) {
                                                record = data.data;
                                                $scope.closeDialog();
                                            });
                                        }
                                        $scope.closeDialog = function(){
                                            ngDialog.close();                                            
                                        }

                                }]
                            })
                        }
                    } 

                    $scope.runFilter = function(filter){

                        if(filter.filters){
                            setSearchFilters(filter.filters);
                        }
                    }

                    $scope.clearFilter = function(){
                        $scope.setFilters = {};
                        // $scope.refresh = !$scope.refresh;
                        refreshResult();
                    };
                    
                    if(!$scope.skipResults){ 
                        load();
                        loadTabFacets();
                    }

                    $scope.getExportQuery = function(){
                       
                       if($scope.currentTab =='nationalRecords')
                            return $scope.exportNationalQuery;
                       if($scope.currentTab =='referenceRecords')
                            return $scope.exportReferenceQuery;
                       if($scope.currentTab =='scbdRecords')
                            return $scope.exportScbdQuery;
                    
                    }
                    $scope.getRecordType = function(){
                        return $scope.currentTab==='nationalRecords' ? 'group' : 'list';
                    }
                   
                    
                    $scope.tour = function(){
                        $scope.tourOn = true;
                        var joyride = joyrideService;
                        
                        joyride.config = {
                            onStepChange: function(){  },
                            onStart: function(){  },
                            onFinish: function(){ 
                                joyride.start = false;
                                $scope.tourOn = false; 
                                $scope.showFilters = false;                                
                                $scope.showDownloadDialog = false;                                
                                $('#recordsContent').removeClass('active jr_target'); 
                                // $timeout(function(){
                                // // $scope.updateCurrentTab('nationalRecords');
                                // }, 100)
                            },
                            steps : [
                                
                                  {   appendToBody:true,
                                      title: joyRideText.step1.title,
                                      content: joyRideText.step1.content,
                                  },
                                 
                                  {
                                      type: 'element',
                                      selector: "#freeText",
                                      title: joyRideText.step2.title,
                                      content: joyRideText.step2.title
                                  },
                                  {   appendToBody:true,
                                      type: 'element',
                                      selector: "#recordTypesFilterTab",
                                      title: joyRideText.step3.title,
                                      content: joyRideText.step3.content,
                                      placement: 'top',
                                      beforeStep: openFilterTab
                                  },
                                  {
                                      appendToBody:true,
                                      type: 'element',
                                      selector: "#keywordsFilterTab",
                                      title: joyRideText.step4.title,
                                      content: joyRideText.step4.content,
                                      placement: 'top',
                                      beforeStep: openFilterTab
                                  },
                                  {
                                      appendToBody:true,
                                      type: 'element',
                                      selector: "#referenceRecordsTab",
                                      title: joyRideText.step5.title,
                                      content: joyRideText.step5.content,
                                      placement: 'top',
                                      beforeStep: openRecordsTab
                                  },
                                  {
                                      appendToBody:true,
                                      type: 'element',
                                      selector: "#exportRecords",
                                      title: joyRideText.step6.title,
                                      content: joyRideText.step6.content,
                                      placement: 'left'
                                  },
                                  {
                                       appendToBody:true,
                                      type: 'element',
                                      selector: "#record1",
                                      title: joyRideText.step7.title,
                                      content: joyRideText.step7.content,
                                      placement: 'top',
                                      beforeStep: gotoFirstRefRecord
                                  }
                              ]
                        };
                        joyride.start = true;

                        function openFilterTab(resumeJoyride){
                            var step = joyride.config.steps[joyride.current];
                            $scope.showFilters = step.selector.replace('#','').replace('Tab', '');
                            resumeJoyride();
                        }

                        function openRecordsTab(resumeJoyride){
                            var step = joyride.config.steps[joyride.current];
                            $scope.updateCurrentTab(step.selector.replace('#','').replace('Tab', ''));
                            $('#recordsContent').addClass('active jr_target');
                            resumeJoyride();
                        }

                        function gotoFirstRefRecord(resumeJoyride){
                            var step = joyride.config.steps[joyride.current];
                            $scope.updateCurrentTab("referenceRecords");
                            $('#record1').addClass('active jr_target');
                            resumeJoyride();
                        }

                        function openExportDialog(resumeJoyride){
                            var step = joyride.config.steps[joyride.current];
                            $scope.showDownloadDialog = true;   
                            $timeout(function(){
                                resumeJoyride();
                            }, 200);
                            $timeout(function(){
                                $('.jr_container').css('z-index', 10000); 
                            }, 500);
                            
                        }                        
                    }

                    $scope.onPageChange = function(page){
                        $scope.tabs[$scope.currentTab].currentPage = page;
                        if($scope.currentTab==='nationalRecords'){
                            nationalQuery()
                        }
                        else if($scope.currentTab==='referenceRecords'){
                            referenceQuery()
                        }
                        else if($scope.currentTab==='scbdRecords'){
                            scbdQuery()
                        }
                        

                    }



            }]//controller
        };
    });
});
