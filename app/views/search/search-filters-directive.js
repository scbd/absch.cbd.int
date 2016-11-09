define(['app', 'underscore', '/app/js/common.js',
'/app/views/search/search-filters/keyword-filter.js',
'/app/views/search/search-filters/national-filter.js',
'/app/views/search/search-filters/reference-filter.js',
'/app/views/search/search-filters/scbd-filter.js',
'/app/views/search/search-filters/country-filter.js',
'/app/views/search/search-filters/region-filter.js',
'/app/views/search/search-filters/date-filter.js',
'/app/services/app-config-service.js',
'/app/views/register/user-preferences/user-search-filter.js'
], function(app, _) {

    app.directive('searchFiltersDirective', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            templateUrl: '/app/views/search/search-filters-directive.html',
            controller: ['$scope','$q', 'realm', 'searchService', 'commonjs', 'localStorageService', '$http', 'Thesaurus' ,
             'appConfigService', '$routeParams', '$location', 'ngDialog',
            function($scope, $q, realm, searchService, commonjs, localStorageService,
                $http, thesaurus, appConfigService, $routeParams, $location, ngDialog) {
    
                    var base_fields = 'id, rec_date:updatedDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,';
                    var en_fields =  'rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:description_t, rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt';

                    var queryCanceler = null;
                    $scope.rawDocs = [];
                    $scope.refDocs = [];
                    $scope.scbdDocs = [];
                    var natSchemas = _.clone(appConfigService.nationalSchemas);
                    //remove contact from national schema list for search
                    if(natSchemas.indexOf('contact')>=0){
                        natSchemas.splice(natSchemas.indexOf('contact'), 1);
                    }
                    var refSchemas = appConfigService.referenceSchemas;
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
                    function getFilter(id) {
                         //console.log($scope.searchFilters[id]);
                         return $scope.searchFilters[id];

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
                        console.log("addfilter:" + doc);

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
                            console.log('trying to abort pending request...');
                            queryCanceler.resolve(true);
                        }

                        var q = queryFilterBuilder("national");

                        queryCanceler = $q.defer();

                        var groupQuery = {
                            query       : q,
                            sort: 'government_EN_s asc, schemaSort_i asc, sort1_i asc, sort2_i asc, sort3_i asc, sort4_i asc, updatedDate_dt desc',
                            currentPage : nationalCurrentPage,
                            rowsPerPage: $scope.itemsPerPage
                        };
                        $scope.exportNationalQuery = groupQuery;
                        $scope.nationalLoading = true;
                        searchOperation = searchService.group(groupQuery, queryCanceler);

                        $q.when(searchOperation)
                            .then(function(data) {
                                queryCanceler = null;

                                if(nationalCurrentPage===0){
                                    $scope.rawDocs = undefined;
                                }
                                if(!$scope.rawDocs || $scope.rawDocs.length == 0)
                                    $scope.rawDocs = data.data.grouped.government_s;
                                    //$scope.rawDocs = _.union($scope.rawDocs||{}, data.data.grouped.government_s);
                                else {
                                    _.each(data.data.grouped.government_s.groups, function(record){
                                        $scope.rawDocs.groups.push(record);
                                    });
                                }

                            }).catch(function(error) {
                                console.log('ERROR: ' + error);
                            })
                            .finally(function(){
                                $scope.nationalLoading = false;
                            });


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
                            currentPage : referenceCurrentPage,
                            rowsPerPage: $scope.itemsPerPage
                        };

                        $scope.exportReferenceQuery = listQuery;
                        searchOperation = searchService.list(listQuery, queryCanceler);

                        $q.when(searchOperation)
                            .then(function(data) {
                                queryCanceler = null;
                                if(referenceCurrentPage===0){
                                    $scope.refDocs = undefined;
                                }

                                if(!$scope.refDocs || ($scope.refDocs.docs||[]).length == 0)
                                    $scope.refDocs = data.data.response;
                                else {
                                    _.each(data.data.response.docs, function(record){
                                        $scope.refDocs.docs.push(record);
                                    });
                                }
                            }).catch(function(error) {
                                console.log('ERROR: ' + error);
                            })
                            .finally(function(){
                                $scope.referenceLoading = false;
                            });

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
                            currentPage : scbdCurrentPage,
                            rowsPerPage : $scope.itemsPerPage
                        };

                        $scope.exportScbdQuery = listQuery;
                        searchOperation = searchService.list(listQuery, queryCanceler);

                        $q.when(searchOperation)
                            .then(function(data) {
                                queryCanceler = null;
                                if(scbdCurrentPage===0){
                                    $scope.scbdDocs = undefined;
                                }

                                if(!$scope.scbdDocs || ($scope.scbdDocs.docs||[]).length == 0)
                                    $scope.scbdDocs = data.data.response;
                                else {
                                    _.each(data.data.response.docs, function(record){
                                        $scope.scbdDocs.docs.push(record);
                                    });
                                }
                            }).catch(function(error) {
                                console.log('ERROR: ' + error);
                            })
                            .finally(function(){
                                $scope.scbdLoading = false;
                            });;
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
                        console.log(q);

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

                        if($scope.setFilters[type])
                            q = field + ":(" + allFilters + ")"
                        else{
                            _.each($scope.setFilters, function(item){
                                if(item.type == type){
                                    q =  q + item.id + ' ';
                                }
                            });
                        }
                        if(q)
                             return field + ":(" + q + ")";
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
                            loadKeywordFilters();
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
                                addFilter(country.code.toLowerCase(), {'sort': index, 'type':'country', 'name':country.name.en, 'id':country.code.toLowerCase(), 'description':'', "isCBDParty": country.isCBDParty,"isNPParty":country.isNPParty,"isNPSignatory": country.isNPSignatory,"isNPRatified": country.isNPRatified ,"isNPInbetweenParty":country.isNPInbetweenParty,"entryIntoForce": country.entryIntoForce});
                                });
                        });
                    };

                  //===============================================================================================================================
                    function loadKeywordFilters() {

                    //   $q.when(commonjs.getThematicAreas(), function(keywords) {
                    //             _.each(keywords, function(keyword, index){
                    //                 addKeywordFilter(keyword, '', 'ABS Thematic Areas');
                    //             });
                    //     });


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

                    //===============================================================================================================================
                     function addKeywordFilter(keyword, related, parent, level, broader){
                        if(!level)
                            level=0;

                        addFilter(keyword.identifier + "@" +  related, {'type':'keyword', 'name':keyword.title.en, 'id':keyword.identifier,
                            'description':'',  'parent' : parent, 'related' : related, filterID: keyword.identifier + "@" +  related, 'level':level, 'broader': broader});

                         //_.each(keyword.narrowerTerms,function(narrower){
                        //    addKeywordFilter(narrower, keyword.identifier);
                        //});
                    }
                    // //===============================================================================================================================
                    //  function addThematicAreaFilter(keyword,related, parent){

                    //     addFilter(keyword.identifier, {'type':'keyword', 'name':keyword.title.en, 'id':keyword.identifier,
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

                        addFilter(region.identifier, {'type':'region', 'name':region.title.en, 'id':region.identifier,
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
                       //national

                        addFilter('focalPoint',  {'sort': 1,'type':'national',  'name':'ABS National Focal Point', 'id':'focalPoint', 'description':'Institution designated to liaise with the Secretariat and make available information on procedures for accessing genetic resources and establishing mutually agreed terms, including information on competent national authorities, relevant indigenous and local communities and relevant stakeholders (Article 13.1).'});

                        addFilter('authority',  {'sort': 2,'type':'national',  'name':'Competent National Authorities', 'id':'authority', 'description':'Entities designated to, in accordance with applicable national legislative, administrative or policy measures, be responsible for granting access or, as applicable, issuing written evidence that access requirements have been met and be responsible for advising on applicable procedures and requirements for obtaining prior informed consent and entering into mutually agreed terms (Article 13.2)'});

                        addFilter('measure',  {'sort': 3,'type':'national', 'name':'Legislative, administrative or policy measures', 'id':'measure', 'description':'Measures adopted at domestic level to implement the access and benefit-sharing obligations of the Convention or/and the Nagoya Protocol.'});

                        addFilter('database',  {'sort': 4,'type':'national','name':'National Websites and Databases', 'id':'database', 'description':'Information and links to national websites or databases which are relevant for ABS.'});

                        addFilter('absPermit', {'sort': 5,'type':'national',  'name':'Internationally Recognized Certificate of Compliance', 'id':'absPermit', 'description':'Certificate constituted from the information on the permit or its equivalent registered in the ABS Clearing-House, serving as evidence that the genetic resource which it covers has been accessed in accordance with prior informed consent and that mutually agreed terms have been established. It contains the minimum necessary information to allow monitoring the utilization of genetic resources by users throughout the value chain (Article 17).'});

                        addFilter('absCheckpoint',   {'sort': 6,'type':'national',  'name':'Checkpoints', 'id':'absCheckpoint', 'description':'Entities designated by Parties to effectively collect or receive relevant information related to prior informed consent, to the source of the genetic resource, to the establishment of mutually agreed terms and/or to the utilization of genetic resources, as appropriate (Article 17, 1(a) (i)).'});

                        addFilter('absCheckpointCommunique',  {'sort': 7,'type':'national','name':'Checkpoint Communiqués ', 'id':'absCheckpointCommunique', 'description':'A summary of the information collected or received by a checkpoint related to prior informed consent, to the source of the genetic resource, to the establishment  utilization of genetic resources and registered in the ABS Clearing-House (Article 17.1 (a)).'});

                        addFilter('absNationalReport',  {'sort': 8,'type':'national','name':'Interim National Report on the Implementation of the Nagoya Protocol', 'id':'absNationalReport', 'description':'Interim National Report on the Implementation of the Nagoya Protocol'});


                        addFilter('npParty',  {'sort': 1,'type':'partyStatus','name':'Party to the Nagoya Protocol', 'id':'npParty', 'description':''});
                        addFilter('npInbetween',  {'sort': 2,'type':'partyStatus','name':'Ratified, not yet Party to the Nagoya Protocol', 'id':'npInbetween', 'description':''});
                        addFilter('npNonParty',  {'sort': 3,'type':'partyStatus','name':'Not a Party to the Nagoya Protocol ', 'id':'npNonParty', 'description':''});
                        addFilter('npSignatory',  {'sort': 4,'type':'partyStatus','name':'Signatory to the Nagoya Protocol', 'id':'npSignatory', 'description':''});


                        //reference
                        addFilter('resource', {'sort': 1,'value':false, type:'reference', 'name':'Virtual Library Resources ', 'id':'resource', 'description':'The virtual library in the ABS Clearing-House hosts a number of ABS relevant resources submitted by any registered user of the ABS Clearing-House. This includes, among others, general literature on ABS, awareness-raising materials, case studies, videos, capacity-building resources, etc.'});

                        addFilter('modelContractualClause', {'sort': 2, type:'reference', 'name':'Model Contractual Clauses, Codes of Conduct, Guidelines, Best Practices and/or Standard', 'id':'modelContractualClause', 'description':'Model contractual clauses are addressed in Article 19 of the Protocol. They can assist in the development of agreements that are consistent with ABS requirements and may reduce transaction costs while promoting legal certainty and transparency. Codes of Conduct, Guidelines, Best Practices and/or Standards are addressed in Article 20 of the Protocol.They may assist users to undertake their activities in a manner that is consistent with ABS requirements while also taking into account the practices of different sectors.'});

                        addFilter('communityProtocol', {'sort': 3, type:'reference', 'name':'Community Protocols and Procedures and Customary Laws', 'id':'communityProtocol', 'description':'Community protocols and procedures and customary laws are addressed in Article 12 of the Protocol. They can help other actors to understand and respect the community’s procedures and values with respect to access and benefit-sharing.'});
                        addFilter('capacityBuildingInitiative', {'sort': 4, type:'reference', 'name':'Capacity-building Initiatives', 'id':'capacityBuildingInitiative', 'description':''});

                        //SCBD
                        addFilter('news',  {'sort': 1,'type':'scbd', 'name':'News', 'id':'news', 'description':'ABS related news'});
                        addFilter('notification',  {'sort': 2,'type':'scbd',  'name':'Notifications', 'id':'notification', 'description':'ABS related notifcations'});

                        addFilter('new',  {'sort': 3,'type':'scbd', 'name':'What\'s New', 'id':'new', 'description':'What\'s new'});
                        addFilter('meeting',  {'sort': 4,'type':'scbd',  'name':'Meetings', 'id':'meeting', 'description':'ABS related meetings'});

                        addFilter('statement',  {'sort': 3,'type':'scbd', 'name':'Statements', 'id':'statement', 'description':'ABS related statements'});
                        addFilter('pressRelease',  {'sort': 4,'type':'scbd',  'name':'Press Releases', 'id':'pressRelease', 'description':'ABS related press release'});
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
                    this.getFilter = getFilter;
                    this.getSearchFiltersByParent = getSearchFiltersByParent;

                    //===============================================================================================================================
                    $scope.$watch('searchKeyword', function(){
                        this.searchKeyword = $scope.searchKeyword;
				    });

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

                    $scope.canShowSaveFilter = function(){
                        return !_.isEmpty($scope.setFilters);
                    }
                    $scope.showSaveFilter = function(existingFilter){
                                                            
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

                                    $scope.saveFilter = function(){
                                        $scope.loading = true;                                            
                                        var operation = $http.post('/api/v2016/user-search-queries', $scope.record);
                                        if($scope.record._id)
                                            operation = $http.put('/api/v2016/user-search-queries/' + $scope.record._id, $scope.record);
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

                    $scope.runFilter = function(filter){

                        if(filter.filters){
                            $scope.setFilters = {};
                            _.map(filter.filters, function(query){
                                if(query.type == 'text'){
                                    $scope.saveFreeTextFilter(query);
                                }
                                else{
                                    $scope.saveFilter(query);
                                }
                            });
                            $scope.refresh = !!$scope.refresh;
                        }
                    }

                    $scope.clearFilter = function(){
                        $scope.setFilters = {};
                        $scope.refresh = !!$scope.refresh;
                    };

                   
            }]//controller
        };
    });
});
