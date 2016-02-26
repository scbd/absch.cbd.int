define(['app', 'underscore', '/app/js/common.js',
'/app/services/search-service.js',
'/app/views/search-new/search-filters/schema-filter.js',
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
            controller: ['$scope','$q', 'realm', 'searchService', 'commonjs' ,function($scope, $q, realm, searchService, commonjs) {
    
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
                    $scope.countries = [];
                    $scope.searchKeyword = '';
                    $scope.searchFilters = {};
                    $scope.setFilters = {};
                    $scope.test = '';
                    
                    
                    //*************************************************************************************************************************************
                    $scope.updateCurrentTab = function(tabname) {
                           $scope.currentTab = tabname;
                    };
                   
                    //*************************************************************************************************************************************
                    function addFilter(filterID, filterInfo ) {
                          $scope.searchFilters[filterID] = filterInfo; 
                          //console.log(filterID);
                    };
                    
                    //*************************************************************************************************************************************
                    function getSearchFilters(type) {
                          if(!type)
                              return $scope.searchFilters;
                              
                           return _.filter($scope.searchFilters, function(item){if(item.type === type) return item;});
                    };
                    
                     //*************************************************************************************************************************************
                   // function getSearchKeyWord() {
                   //       return $scope.searchKeyword;
                   // };
                                        
                    //*************************************************************************************************************************************
                    $scope.removeFilter = function(filter) {
                            $scope.searchFilters[filter].value = false;
                            delete $scope.setFilters[$scope.searchFilters[filter].id];

                            $scope.refresh=true;
                    };
                    
                     //*************************************************************************************************************************************
                    function isFilterOn(filter) {
                          if(filter == undefined) 
                            return false;
                           return $scope.searchFilters[filter].value;
                    };
                    
                    //*************************************************************************************************************************************
                    function saveFilter(filter) {
                        $scope.searchFilters[filter].value = !$scope.searchFilters[filter].value;
                        
                        if($scope.setFilters[$scope.searchFilters[filter].id] )
                           delete $scope.setFilters[$scope.searchFilters[filter].id];
                        else{
                           $scope.setFilters[$scope.searchFilters[filter].id] = {type: $scope.searchFilters[filter].type, id:$scope.searchFilters[filter].id};
                        }
                        
                        $scope.refresh = true;
                    };

                    //*************************************************************************************************************************************
                    function nationalQuery() {
                  
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
                        
                        var groupQuery = {
                            query       : q + ' AND government_s:*',
                            sort        : 'government_EN_s asc, updatedDate_dt desc',
                            fields      : base_fields + en_fields,
                            groupField  : 'government_s',
                            groupSort   : 'schema_s desc', // groupSort, sort1, sort2, sort3
                            currentPage : $scope.currentPage,
                            itemsPerPage: $scope.itemsPerPage
                        };
                        
                        searchOperation = searchService.group(groupQuery, queryCanceler);

                        $q.when(searchOperation)
                            .then(function(data) {
                                queryCanceler = null;
                                $scope.rawDocs = data;

                            }).catch(function(error) {
                                console.log('ERROR: ' + error);
                            });

                    };
                    
                    //*************************************************************************************************************************************
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
                    //*************************************************************************************************************************************
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
                            sort        : _.isEmpty($scope.setFilters) ? 'updatedDate_dt desc' : '',
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
                    
                     
                    //*****************************************************************************************************************
                    function queryFilterBuilder(queryType){
                        var q ="";
                        
                        if(queryType === 'national'){
                              //schema
                              q = q + buildFieldQuery('schema_s', 'national', natSchemas, "AND");
                              q = q + buildFieldQuery('government_s', 'country', "*", "AND");
                        }
                        
                        if(queryType === 'reference'){
                               //schema
                               q = q + buildFieldQuery('schema_s','reference', refSchemas, "AND");
                               
                               q = q + buildTextQuery('text_EN_txt','country', "10", "AND (", null);
                               q = q + buildTextQuery('text_EN_txt','national', "10", "AND (", null);
                               q = q + buildFieldQuery('regions_REL_ss','country', null, "OR", ")");
                        }
                        
                        if(queryType === 'scbd'){
                               //schema
                               q = q + buildFieldQuery('schema_s','scbd', scbdSchemas,  "AND");
                               q = q + buildTextQuery('title_t','country', "10", "AND (", null);
                               q = q + buildTextQuery('description_t','country',"5", "OR", ")") ;
                        }

                        console.log(q);
                        $scope.test = q;
                        
                        return q;
                     };
                     
                     //*****************************************************************************************************************
                    function checkSetFilters(type){
                       return  _.find($scope.setFilters, function(item){if(item.type === type) return true;});
                    }
                    
                    //*****************************************************************************************************************
                    function buildTextQuery(field, type, boost, before, after){
                        
                        var q = '';
                        var values = [];
                        
                        if($scope.setFilters){
                            _.each($scope.setFilters, function(item){
                                if(item.type == type){
                                    values.push("'" + $scope.searchFilters[item.id].name + "'");
                                } 
                            });
                            if(values.length)
                                q = addORCondition(field, values, boost)
                        }    
                       if(q)
                            return (before ? " " + before + " " : " ") + q + (after ? " " + after + " " : " ");
                       else 
                            return '';
                        
                    }

                    //*****************************************************************************************************************
                    function buildFieldQuery(field, type, allFilters, before, after){
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
                             return (before ? " " + before + " " : " ") + (field + ":(" + q + ")") + (after ? " " + after + " " : " ");
                        else if(allFilters)
                             return (before ? " " + before + " " : " ") + field + ":(" + allFilters + ")" + (after ? " " + after + " " : " ");
                        else 
                             return '';
                      
                    }
                            
                    //*****************************************************************************************************************
                    function addORCondition(field, values, boost){
                        var q ="";
                        var conditions = [];
                        _.each(values, function (val){conditions.push("("+field+":"+val + ")" + (boost ? "^" + boost : ""))});
                        _.each(conditions, function (condition) { q = q + (q=='' ? '( ' : ' OR ') + condition; });
                        q = q +")";
                        console.log(q);
                        return q;
                    }
                    
                    //*************************************************************************************************************************************
                    function loadFilters() {
                        loadSchemaFilters();
                        loadCountryFilters();
                    };
                    
                    //*************************************************************************************************************************************
                    function loadCountryFilters() {
                        var i=1;
                        if($scope.countries.length === 0){
                            $q.when(commonjs.getCountries(), function(data) {
                                $scope.countries = data;
                                 
                                 _.each($scope.countries, function(country, index){
                                    addFilter(country.code.toLowerCase(), {'filterSort':4, 'sort': index, 'type':'country', 'value':false,  'name':country.name.en, 'id':country.code.toLowerCase(), 'description':'', "isCBDParty": country.isCBDParty,"isNPParty":country.isNPParty,"isNPSignatory": country.isNPSignatory,"isNPRatified": country.isNPRatified ,"isNPInbetweenParty":country.isNPInbetweenParty,"entryIntoForce": country.entryIntoForce});
                                 }); 
                           
                            });
                        }
                            
                    };
                    //*************************************************************************************************************************************
                    function loadSchemaFilters() {
                       //national
                        addFilter('national', {'filterSort':1, 'sort': 0, 'type':'national', 'value':false,  'name':'National Records', 'id':'national', 'description':'National records are published by Governments and include national information relevant for the implementation of the Nagoya Protocol as well as information Parties are obliged to provide in accordance with the Protocol.'});
                        
                        addFilter('focalPoint',  {'filterSort':1,'sort': 1,'type':'national', 'value':false, 'name':'ABS National Focal Point', 'id':'focalPoint', 'description':'Institution designated to liaise with the Secretariat and make available information on procedures for accessing genetic resources and establishing mutually agreed terms, including information on competent national authorities, relevant indigenous and local communities and relevant stakeholders (Article 13.1).'});
                        
                        addFilter('authority',  {'filterSort':1,'sort': 2,'type':'national', 'value':false, 'name':'Competent National Authorities', 'id':'authority', 'description':'Entities designated to, in accordance with applicable national legislative, administrative or policy measures, be responsible for granting access or, as applicable, issuing written evidence that access requirements have been met and be responsible for advising on applicable procedures and requirements for obtaining prior informed consent and entering into mutually agreed terms (Article 13.2)'});
                        
                        addFilter('measure',  {'filterSort':1,'sort': 3,'type':'national', 'value':false, 'name':'Legislative, administrative or policy measures', 'id':'measure', 'description':'Measures adopted at domestic level to implement the access and benefit-sharing obligations of the Convention or/and the Nagoya Protocol.'});
                        
                        addFilter('database',  {'filterSort':1,'sort': 4,'type':'national', 'value':false, 'name':'National Websites and Databases', 'id':'database', 'description':'Information and links to national websites or databases which are relevant for ABS.'});
                        
                        addFilter('absPermit', {'filterSort':1,'sort': 5,'type':'national', 'value':false, 'name':'Internationally Recognized Certificate of Compliance', 'id':'absPermit', 'description':'Certificate constituted from the information on the permit or its equivalent registered in the ABS Clearing-House, serving as evidence that the genetic resource which it covers has been accessed in accordance with prior informed consent and that mutually agreed terms have been established. It contains the minimum necessary information to allow monitoring the utilization of genetic resources by users throughout the value chain (Article 17).'});
                        
                        addFilter('absCheckpoint',   {'filterSort':1,'sort': 6,'type':'national', 'value':false, 'name':'Checkpoints', 'id':'absCheckpoint', 'description':'Entities designated by Parties to effectively collect or receive relevant information related to prior informed consent, to the source of the genetic resource, to the establishment of mutually agreed terms and/or to the utilization of genetic resources, as appropriate (Article 17, 1(a) (i)).'});
                        
                        addFilter('absCheckpointCommunique',  {'filterSort':1,'sort': 7,'type':'national', 'value':false, 'name':'Checkpoint Communiqués ', 'id':'absCheckpointCommunique', 'description':'A summary of the information collected or received by a checkpoint related to prior informed consent, to the source of the genetic resource, to the establishment  utilization of genetic resources and registered in the ABS Clearing-House (Article 17.1 (a)).'});
                        
                        
                        //reference
                        addFilter('reference', {'filterSort':2, 'sort': 0,'value':false, type:'reference', 'name':'Reference Records', 'id':'reference', 'description':'Reference records include a number of ABS relevant resources and information. They can be submitted by any registered user of the ABS Clearing-House (Parties, Non-Parties, governments, international organizations, indigenous and local communities, and relevant stakeholders.' });
                        addFilter('resource', {'filterSort':2,'sort': 1,'value':false, type:'reference', 'name':'Virtual Library Records ', 'id':'resource', 'description':'The virtual library in the ABS Clearing-House general literature submitted by any registered user of the ABS Clearing-House.'});
                        
                        addFilter('modelContractualClause', {'filterSort':2,'sort': 2,'value':false, type:'reference', 'name':'Model Contractual Clauses, Codes of Conduct, Guidelines, Best Practices and/or Standard', 'id':'modelContractualClause', 'description':'Model contractual clauses are addressed in Article 19 of the Protocol. They can assist in the development of agreements that are consistent with ABS requirements and may reduce transaction costs while promoting legal certainty and transparency. Codes of Conduct, Guidelines, Best Practices and/or Standards are addressed in Article 20 of the Protocol.They may assist users to undertake their activities in a manner that is consistent with ABS requirements while also taking into account the practices of different sectors.'});
                        
                        addFilter('communityProtocol', {'filterSort':2,'sort': 3,'value':false, type:'reference', 'name':'Community Protocols and Procedures and Customary Laws', 'id':'communityProtocol', 'description':'Community protocols and procedures and customary laws are addressed in Article 12 of the Protocol. They can help other actors to understand and respect the community’s procedures and values with respect to access and benefit-sharing.'});
                        addFilter('capacityBuildingInitiative', {'filterSort':2,'sort': 4,'value':false, type:'reference', 'name':'Capacity Building Initiatives', 'id':'capacityBuildingInitiative', 'description':''});
                        addFilter('capacityBuildingResource', {'filterSort':2,'sort': 5,'value':false, type:'reference', 'name':'Capacity Building Resources', 'id':'capacityBuildingResource', 'description':''});
                        
                        //SCBD
                        addFilter('scbd', {'filterSort':3,'sort': 0,'type':'scbd', 'value':false, 'name':'SCBD Managed Records', 'id':'scbd', 'description':''});
                        addFilter('news',  {'filterSort':3,'sort': 1,'type':'scbd', 'value':false, 'name':'News', 'id':'news', 'description':'ABS related news'});
                        addFilter('notifications',  {'filterSort':3,'sort': 2,'type':'scbd', 'value':false, 'name':'Notifications', 'id':'notifications', 'description':'ABS related notifcations'});
                    };
                    
                  //*************************************************************************************************************************************         
                    function load(){
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
                    
                    //this.load = load;
                    this.addFilter = addFilter;
                    this.saveFilter = saveFilter;
                    this.nationalQuery = nationalQuery;
                    this.referenceQuery = referenceQuery;
                    this.scbdQuery = scbdQuery;
                    this.isFilterOn = isFilterOn;
                    this.getSearchFilters = getSearchFilters;
                   
                    
                    loadFilters();
                    
                     //*************************************************************************************************************************************
                    $scope.$watch('currentTab', function(){
                       load();
				    });
                    
                    //*************************************************************************************************************************************
                    $scope.$watch('searchKeyword', function(){
                        this.searchKeyword = $scope.searchKeyword;
				    });
                    
                    
                    //*************************************************************************************************************************************
                    $scope.$watch('refresh', function(){
                       $scope.refresh = false;
                       refresh_nat = true;
                       refresh_ref = true;
                       refresh_scbd = true;
                       load();
				    });

            }]//controller
        };
    });
});