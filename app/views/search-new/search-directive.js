define(['app', 'underscore', '/app/js/common.js',
'/app/services/search-service.js',
'/app/views/directives/infinite-scroll-directive.js',
'/app/views/search-new/search-filters/thematic-filter.js',
'/app/views/search-new/search-filters/national-filter.js',
'/app/views/search-new/search-filters/reference-filter.js',
'/app/views/search-new/search-filters/scbd-filter.js',
'/app/views/search-new/search-filters/country-filter.js',
'/app/views/search-new/search-results/result-default.js',
'/app/views/search-new/search-results/national-records-country.js',
], function(app, _) {

    app.directive('searchDirective', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            templateUrl: '/app/views/search-new/search-directive.html',
            controller: ['$scope','$q', 'realm', 'searchService', 'commonjs', 'localStorageService', '$http', 'Thesaurus' ,function($scope, $q, realm, searchService, commonjs, localStorageService, $http, thesaurus) {

                    var queryCanceler = null;
                    $scope.rawDocs = [];
                    $scope.refDocs = [];
                    $scope.scbdDocs = [];
                    var natSchemas = ["absPermit absCheckpoint absCheckpointCommunique authority measure database focalPoint"];
                    var refSchemas = ["modelContractualClause communityProtocol capacityBuildingInitiative capacityBuildingResource"];
                    var scbdSchemas = ["meeting notification pressRelease statement news"];
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
                    $scope.currentPage = 0;

                    //===============================================================================================================================
                    $scope.isFreeTextFilterOn = function(filterID) {
                          return false;
                    };

                    //===============================================================================================================================
                    $scope.saveFreeTextFilter = function(text) {
                        if(!text && text.length <= 0)
                            return;

                        var id = 'freeText_' + text;

                         if($scope.setFilters[id] )
                           delete $scope.setFilters[id];
                        else{
                           $scope.setFilters[id] = {'type':'freeText', 'name': ""+text+"", 'id':id};
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
                    };


                  //===============================================================================================================================
                    function addFilter(filterID, filterInfo ) {
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
                   // function getSearchKeyWord() {
                   //       return $scope.searchKeyword;
                   // };

                  //===============================================================================================================================
                    $scope.removeFilter = function(filterID) {
                            delete $scope.setFilters[filterID];
                            $scope.refresh=true;
                    };

                  //===============================================================================================================================
                    $scope.isFilterOn  = function(filterID) {
                          if(!filterID)
                                return false;

                          return $scope.setFilters[filterID] ? true : false;
                    };

                  //===============================================================================================================================
                    $scope.saveFilter = function(filterID) {

                        if($scope.setFilters[filterID])
                           delete $scope.setFilters[filterID];
                        else{
                           $scope.setFilters[filterID] = {type:$scope.searchFilters[filterID].type, name:$scope.searchFilters[filterID].name, id:$scope.searchFilters[filterID].id};
                        }

                        $scope.refresh = true;
                    };

                  //===============================================================================================================================
                    function nationalQuery(currentPage, itemsPerPage) {

                        var searchOperation;

                        if (queryCanceler) {
                            console.log('trying to abort pending request...');
                            queryCanceler.resolve(true);
                        }

                        var base_fields = 'id, rec_date:updatedDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s,'; // rec_category, groupSort, sort1, sort2, sort3
                        var en_fields =  'rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:description_t, rec_type:type_EN_t,' // meta1_EN_t, meta2_EN_t, meta3_EN_t

                        var q = queryFilterBuilder("national");

                        queryCanceler = $q.defer();

                        if($scope.currentPage===0){
                            $scope.rawDocs = undefined;
                        }
                        if(currentPage)
                            $scope.currentPage = currentPage;
                        if(itemsPerPage)
                            $scope.itemsPerPage = itemsPerPage;


                        var groupQuery = {
                            query       : q,
                            sort        : 'government_EN_s asc, updatedDate_dt desc',
                            fields      : base_fields + en_fields,
                            groupField  : 'government_s',
                            groupSort   : 'schema_s desc', // groupSort, sort1, sort2, sort3
                            currentPage : $scope.currentPage,
                            itemsPerPage: $scope.itemsPerPage
                        };
                        $scope.loading = true;
                        searchOperation = searchService.group(groupQuery, queryCanceler);

                        $q.when(searchOperation)
                            .then(function(data) {
                                queryCanceler = null;

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
                                $scope.loading = false;
                            });


                    };

                  //===============================================================================================================================
                    function referenceQuery() {

                        var searchOperation;

                        if (queryCanceler) {
                            console.log('trying to abort pending request...');
                            queryCanceler.resolve(true);
                        }

                        var base_fields = 'id, rec_date:updatedDate_dt, identifier_s, uniqueIdentifier_s, url_ss, schema_s,'; // rec_category, groupSort, sort1, sort2, sort3
                        var en_fields =  'rec_title:title_EN_t, rec_summary:description_t, rec_type:type_EN_t,' // meta1_EN_t, meta2_EN_t, meta3_EN_t

                        var q = queryFilterBuilder("reference");

                        queryCanceler = $q.defer();

                        if($scope.currentPage===0){
                            $scope.refDocs = undefined;
                        }

                        var listQuery = {
                            query       : q,
                            sort        : _.isEmpty($scope.setFilters) ? 'updatedDate_dt desc' : '',
                            fields      : base_fields + en_fields,
                            currentPage : $scope.currentPage,
                            itemsPerPage: $scope.itemsPerPage
                        };

                        searchOperation = searchService.list(listQuery, queryCanceler);

                        $q.when(searchOperation)
                            .then(function(data) {
                                queryCanceler = null;
                                $scope.refDocs = data;

                            }).catch(function(error) {
                                console.log('ERROR: ' + error);
                            });

                    };
                  //===============================================================================================================================
                    function scbdQuery() {

                        var searchOperation;

                        if (queryCanceler) {
                            console.log('trying to abort pending request...');
                            queryCanceler.resolve(true);
                        }

                        var base_fields = 'id, rec_date:updatedDate_dt, identifier_s, uniqueIdentifier_s, url_ss, schema_s,'; // rec_category, groupSort, sort1, sort2, sort3
                        var en_fields =  'rec_title:title_EN_t, rec_summary:description_t, rec_type:type_EN_t,' // meta1_EN_t, meta2_EN_t, meta3_EN_t

                        var q = queryFilterBuilder("scbd");

                        queryCanceler = $q.defer();

                        if($scope.currentPage===0){
                            $scope.scbdDocs = undefined;
                        }

                        var listQuery = {
                            query       : q,
                            sort        : 'updatedDate_dt desc',
                            fields      : base_fields + en_fields,
                            currentPage : $scope.currentPage,
                            itemsPerPage: $scope.itemsPerPage
                        };

                        searchOperation = searchService.list(listQuery, queryCanceler);

                        $q.when(searchOperation)
                            .then(function(data) {
                                queryCanceler = null;
                                $scope.scbdDocs = data;

                            }).catch(function(error) {
                                console.log('ERROR: ' + error);
                            });
                    };

                  //===============================================================================================================================
                    function queryFilterBuilder(queryType){
                        var qAnd=[];
                        var qOr =[];
                        var q   ='';
                        var q1   ='';

                        if(queryType === 'national'){
                              //schema
                              qAnd.push(buildFieldQuery('schema_s', 'national', natSchemas));
                              qAnd.push(buildFieldQuery('government_s', 'country', "*"));

                              qOr.push(buildTextQuery('title_t'      ,'freeText'  , null));
                              qOr.push(buildTextQuery('description_t','freeText'  , null));

                        }

                        if(queryType === 'reference'){
                               //schema
                               qAnd.push(buildFieldQuery('schema_s','reference', refSchemas));

                               qOr.push(buildTextQuery('text_EN_txt'    ,'national', null));
                               qOr.push(buildTextQuery('text_EN_txt'    ,'country', null));
                               qOr.push(buildTextQuery('text_EN_txt'    ,'freeText', null));
                               qOr.push(buildFieldQuery('regions_REL_ss','country', null));
                        }

                        if(queryType === 'scbd'){
                               //schema
                               qAnd.push(buildFieldQuery('schema_s','scbd', scbdSchemas));

                               qOr.push(buildTextQuery('title_t'      ,'national'  , null));
                               qOr.push(buildTextQuery('description_t','national'  , null));
                               qOr.push(buildTextQuery('title_t'      ,'reference' , null));
                               qOr.push(buildTextQuery('description_t','reference' , null));
                               qOr.push(buildTextQuery('title_t'      ,'country'   , null));
                               qOr.push(buildTextQuery('description_t','country'   , null));
                               qOr.push(buildTextQuery('title_t'      ,'freeText'   , null));
                               qOr.push(buildTextQuery('description_t','freeText'   , null));
                        }

                        q = combineQuery(qAnd, "AND");
                        q1 = combineQuery(qOr, "OR");
                        $scope.test = q1 ? q + " AND (" + q1 + ")" : q;
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
                                    values.push($scope.setFilters[item.id].name);
                                }
                            });
                            if(values.length)
                                q = addORCondition(field, values, boost)
                        }
                       return  q ? q : null;
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

                  //===============================================================================================================================
                    function addORCondition(field, values, boost){
                        var q ="";
                        var conditions = [];
                        _.each(values, function (val){conditions.push(""+field+":*"+val + "*" + (boost ? "^" + boost : ""))});
                        _.each(conditions, function (condition) { q = q + (q=='' ? '(' : ' OR ') + condition; });
                        q = q +")";
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

                         console.log('load filters');

                        if( _.isEmpty($scope.searchFilters) ){
                            $scope.searchFilters = {};
                            $scope.searchFilters = localStorageService.get("searchFilters");
                            console.log('getting filters from local storage');
                        }
                        if( _.isEmpty($scope.searchFilters) ){
                            $scope.searchFilters = {};
                            loadSchemaFilters();
                            loadCountryFilters();
                            loadThematicFilters();
                            loadRegionsFilters();
                            localStorageService.set("searchFilters", $scope.searchFilters);
                            console.log('getting new filters');
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
                    function loadThematicFilters() {

                        //national record applicable keywords


                    };

                  //===============================================================================================================================
                    function loadRegionsFilters(){

                        // if(!$scope.regions)
                        // {
                        //     $http.get('/api/v2013/thesaurus/domains/regions/terms', { cache:true }).then(function (response) {

                        //         var termsTree = thesaurus.buildTree(response.data);
                        //         //var termsMap = flatten(termsTree, {});
                        //         //var classes   = _.filter(termsTree, function where (o) { return !!o.narrowerTerms && o.identifier!='1796f3f3-13ae-4c71-a5d2-0df261e4f218'; });
                        //         var termsMap ={};
                        //         _.values(termsTree).forEach(function (term) {

                        //             console.log();

                        //             term.name = term.name.replace('CBD Regional Groups - ', '');
                        //             term.name = term.name.replace('Inland water ecosystems - ', '');
                        //             term.name = term.name.replace('Large marine ecosystems - ', '');

                        //             term.name = term.name.replace('Mountains - All countries', 'Mountains');
                        //             term.name = term.name.replace('Global - All countries', 'Global');
                        //             term.name = term.name.replace('Americas - All countries', 'Americas');
                        //             term.name = term.name.replace('Africa - All countries', 'Africa');
                        //             term.name = term.name.replace('Asia - All countries', 'Asia');
                        //             term.name = term.name.replace('Europe - All countries', 'Europe');
                        //             term.name = term.name.replace('Oceania - All countries', 'Oceania');

                        //             term.name = term.name.replace('Mountains - ', '');
                        //             term.name = term.name.replace('Global - ', '');
                        //             term.name = term.name.replace('Americas - ', '');
                        //             term.name = term.name.replace('Africa - ', '');
                        //             term.name = term.name.replace('Asia - ', '');
                        //             term.name = term.name.replace('Europe - ', '');
                        //             term.name = term.name.replace('Oceania - ', '');
                        //         });


                        //     });//http
                        // }


                    };

                   //===============================================================================================================================
                    function flatten(items, collection) {
                        items.forEach(function (item) {
                            item.selected = false;
                            collection[item.identifier] = item;
                            if(item.narrowerTerms)
                                flatten(item.narrowerTerms, collection);
                        });
                        return collection;
                    }

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


                        //reference
                        addFilter('resource', {'sort': 1,'value':false, type:'reference', 'name':'Virtual Library Records ', 'id':'resource', 'description':'The virtual library in the ABS Clearing-House general literature submitted by any registered user of the ABS Clearing-House.'});

                        addFilter('modelContractualClause', {'sort': 2, type:'reference', 'name':'Model Contractual Clauses, Codes of Conduct, Guidelines, Best Practices and/or Standard', 'id':'modelContractualClause', 'description':'Model contractual clauses are addressed in Article 19 of the Protocol. They can assist in the development of agreements that are consistent with ABS requirements and may reduce transaction costs while promoting legal certainty and transparency. Codes of Conduct, Guidelines, Best Practices and/or Standards are addressed in Article 20 of the Protocol.They may assist users to undertake their activities in a manner that is consistent with ABS requirements while also taking into account the practices of different sectors.'});

                        addFilter('communityProtocol', {'sort': 3, type:'reference', 'name':'Community Protocols and Procedures and Customary Laws', 'id':'communityProtocol', 'description':'Community protocols and procedures and customary laws are addressed in Article 12 of the Protocol. They can help other actors to understand and respect the community’s procedures and values with respect to access and benefit-sharing.'});
                        addFilter('capacityBuildingInitiative', {'sort': 4, type:'reference', 'name':'Capacity Building Initiatives', 'id':'capacityBuildingInitiative', 'description':''});
                        addFilter('capacityBuildingResource', {'sort': 5, type:'reference', 'name':'Capacity Building Resources', 'id':'capacityBuildingResource', 'description':''});

                        //SCBD
                        addFilter('news',  {'sort': 1,'type':'scbd', 'name':'News', 'id':'news', 'description':'ABS related news'});
                        addFilter('notifications',  {'sort': 2,'type':'scbd',  'name':'Notifications', 'id':'notifications', 'description':'ABS related notifcations'});
                    };

                  //===============================================================================================================================
                    function load(){
                        console.log("loading queries");
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

                    this.addFilter = addFilter;
                    this.nationalQuery = nationalQuery;
                    this.referenceQuery = referenceQuery;
                    this.scbdQuery = scbdQuery;
                    this.getSearchFilters = getSearchFilters;
                    this.getFilter = getFilter;


                    loadFilters();
                    load();

                  //===============================================================================================================================
                    $scope.$watch('currentTab', function(newVal, oldVal){
                       if(newVal != oldVal)
                            load();
				    });

                    //===============================================================================================================================
                    $scope.$watch('searchKeyword', function(){
                        this.searchKeyword = $scope.searchKeyword;
				    });


                  //===============================================================================================================================
                    $scope.$watch('refresh', function(newVal){
                        if(newVal === true){
                            refresh_nat = true;
                            refresh_ref = true;
                            refresh_scbd = true;
                            load();
                            $scope.refresh = false;
                        }
				    });


                    $scope.updateScrollPage = function() {
                        if($scope.loading)//|| $scope.docs.length == $scope.numFound
                            return;
                        $scope.loading = true;
                        $scope.currentPage = $scope.currentPage + 1;
                        console.log($scope.currentPage);
                        nationalQuery();
                    };

            }]//controller
        };
    });
});
