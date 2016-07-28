 define(['app','underscore','linqjs', 'ngMaterial','ngAria','angular-animate',
   '/app/views/measure-matrix/measure-matrix-countries-directive.html.js',
   '/app/js/common.js',
   '/app/views/search/search-results/result-grouped-national-record.js',
   '/app/services/search-service.js', '/app/services/app-config-service.js'
 ], function(app, _, linqjs) {

    app.directive('countryProfile', function() {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/countries/country-profile-directive.html',
            replace: true,
            scope: {
                api : '=?',
                code : '='
            },
            controller: ["$scope", "$http", "$routeParams", "linqjs", "$filter", "realm",
                "commonjs", "$q", '$element', '$timeout','commonjs','IStorage','$rootScope',
                'breadcrumbs','smoothScroll','$location', 'searchService', 'appConfigService',
                function($scope, $http, $routeParams, linqjs, $filter, realm, commonjs, $q,
                            $element, $timeout, countriescommonjs, IStorage,$rootScope,
                            breadcrumbs,smoothScroll,$location, searchService, appConfigService) {

                $scope.api = {
                    loadCountryDetails : $scope.loadCountryDetails
                }
                $scope.$watch('code', function(newVal){
                    if(newVal){
                        $scope.loadCountryDetails(newVal);
                    }
                })
                //**********************************************************
                function resetList(){
                        $scope.showCPC = false;
                        $scope.showIRCC = false;
                        $scope.showMSR = false;
                        $scope.showNFP = false;
                        $scope.showNDB = false;
                        $scope.showCNA = false;
                        $scope.showCP = false;
                        $scope.showCPCRecv = false;
                        $scope.showNR = false;

                        $scope.sortMeasure="[jurisdiction_sort, type_sort, status_sort, createdDate_dt, title_t]";
                        $scope.reverseMeasure=false;
                        $scope.sortPermit='title_t';
                        $scope.reversePermit=false;
                        $scope.sortCPC='title_t';
                        $scope.reverseCPC=false;
                        $scope.sortCPCReceived='title_t'
                        $scope.reverseCPCReceived=false;
                        $scope.filterSchema=null;
                }

                    resetList();

                    //facet counts
                    $scope.cpcReceivedCount = 0;
                    $scope.nfpCount= 0;
                    $scope.nationalMeasure= 0;
                    $scope.Permit= 0;
                    $scope.absCheckpoint= 0;
                    $scope.absCheckpointCommunique = 0;
                    $scope.database= 0;
                    $scope.showMatrix = false;
                    $scope.absNationalReport = 0;

                    if ($location.absUrl().toLowerCase().indexOf("://absch.cbddev.xyz") > 0 || $location.absUrl().toLowerCase().indexOf("localhost:2010") > 0 ||
                        $location.absUrl().toLowerCase().indexOf("://training-absch.cbd.int") > 0) {
                        $scope.showMatrix = true;
                    }

                    //**********************************************************
                    $scope.loadCountryDetails = function(countryCode) {

                    $scope.code = countryCode || $routeParams.code;

                    $scope.documentCount = 0;
                    $scope.currentPage = 0;
                    $scope.searchText = '';
                    $scope.autocompleteData = [];
                    $scope.absch_nfp = null;

                    if ($scope.code) {

                    $q.when(commonjs.getCountry($scope.code.toUpperCase()))
                    .then(function(country) {
                        $scope.country = country;
                    });

                    //*******************************************************
                        // var queryCPCRevURL = '/api/v2013/index/select?fl=id,identifier_s,title_t,keywords_CEN_ss'+
                        //                 'checkpoint_CEN_ss,createdDate_dt,personsAtCheckpoint_s,government_s,permit_ss,' +
                        //                 '&q=(realm_ss:' + realm.value.toLowerCase() + ' OR realm_ss:absch) AND schema_s:absCheckpointCommunique AND (sourceCountries_ss:'+
                        //                 $scope.code.toLowerCase() + ' OR permitSourceCountry_ss:' + $scope.code.toLowerCase() + ')' +
                        //                 '&rows=100&sort=createdDate_dt+desc,+title_t+asc&start=0&wt=json';

                    var searchQuery = {
                        fields  : 'id, rec_date:updatedDate_dt, identifier_s, uniqueIdentifier_s, url_ss, government_s, schema_s, government_EN_t, schemaSort_i, sort1_i, sort2_i, sort3_i, sort4_i, _revision_i,rec_countryName:government_EN_t, rec_title:title_EN_t, rec_summary:description_t,rec_type:type_EN_t, rec_meta1:meta1_EN_txt, rec_meta2:meta2_EN_txt, rec_meta3:meta3_EN_txt,rec_meta4:meta4_EN_txt,rec_meta5:meta5_EN_txt, entryIntoForce_dt,adoption_dt,retired_dt,limitedApplication_dt',
                        query   : 'schema_s:(' + appConfigService.nationalSchemas.join(' ') +') AND (government_s:' + $scope.code.toLowerCase() + ' OR (sourceCountries_ss:' +
                                   $scope.code.toLowerCase() + ' OR permitSourceCountry_ss:' + $scope.code.toLowerCase() + '))',
                        rowsPerPage    : 500
                    };
                    //
                    // var queryCPCRecv = $http.get(queryCPCRevURL, {cache: true})

                    $q.all([searchService.list(searchQuery)])//,queryCPCRecv
                        .then(function(results) {

                        $scope.absch_nfp = results[0].data.response.docs;
                        // $scope.cpcReceived = results[1].data.response.docs;
                        var measureMatrixDocuments = [];

                        $scope.absch_nfp.forEach(function(document){
                            document.identifier = document.identifier_s;

                            if(document.ownerGovernment_s)
                                document.ownerGovernment = {identifier:document.ownerGovernment_s};

                            if(document.schema_s == "focalPoint" ){
                                if(document.description_t)
                                    document.description_t = document.description_t.replace(/\n/g, '<br/>');
                                document.documentId = commonjs.hexToInteger(document.identifier_s);
                            }
                            else if(document.schema_s == "authority" || document.schema_s == "database" ||
                                document.schema_s == "absCheckpoint"){
                                    document.description_t = '';
                                    $q.when(IStorage.documents.get(document.identifier_s,{info:""}))
                                    .then(function(data) {
                                        var doc = data.data.body;
                                        var details = '';
                                        if(doc.address)
                                            details += $filter("lstring")(doc.address) + '<br/>';
                                        if(doc.city)
                                            details += $filter("lstring")(doc.city)  + '<br/>';
                                        if(doc.postalCode)
                                            details += $filter("lstring")(doc.postalCode)  + '<br/>';
                                        if(document.government_CEN_s)
                                            details += $filter("lstring")(JSON.parse(document.government_CEN_s));

                                        document.description_t = details;
                                        document.telephones = doc.phones;
                                        document.emails = doc.emails;
                                        document.doc = data.data;
                                    });
                            }
                            else if(document.schema_s=="absCheckpointCommunique"){

                                if(document.personsAtCheckpoint_s){
                                    document.personsAtCheckpoint = $scope.parseJSON(document.personsAtCheckpoint_s);
                                }
                            }
                            //create seprate collection for measure matrix
                            if(document.schema_s=='measure'){

                                if(!document.retired_dt || moment() <= moment(document.retired_dt)){
                                    document.measureMatrix = true;
                                }
                                else
                                    document.measureMatrix = false;

                                measureMatrixDocuments.push(document);

                            }

                        });
                        $scope.measureMatrixDocuments = measureMatrixDocuments;
                        $scope.measureMatrixDocuments.selectAll = true;
                        // $scope.cpcReceived.forEach(function(document){
                        //     if(document.personsAtCheckpoint_s){
                        //         document.personsAtCheckpoint = $scope.parseJSON(document.personsAtCheckpoint_s);
                        //     }
                        //     $scope.cpcReceivedCount++;
                        // });
                        $scope.getFacets($scope.absch_nfp);
                        $('[data-toggle="tooltip"]').tooltip()

                        if($routeParams.countryCode && $routeParams.documentType){
                            if($routeParams.documentType.toLowerCase()=='measure-matrix'){
                                $scope.showMSR = true;
                            }else{
                                $scope['show' + $routeParams.documentType.toUpperCase()] = true;
                            }
                        }
                    });
                    }
                }

                //**********************************************************
                $scope.$watch('absch_nfp', function(value) {
                    if (!value) return;
                    $scope.getFacets(value);
                });


                //**********************************************************
                $scope.getFacets = function(data) {

                    var linqObj = linqjs.from(data);
                    $scope.nationalAuthority = linqObj.count(function(schema) {

                    return schema.schema_s.toLowerCase() == 'authority';
                    });
                    //console.log(response.data.response.docs);
                    $scope.nfpCount = linqObj.count(function(schema) {
                    // console.log(schema.schema_EN_t.toLowerCase() + ' ' + 'national focal point'.toLowerCase());
                    return schema.schema_s.toLowerCase() == 'focalpoint'.toLowerCase();
                    });

                    $scope.nationalMeasure = linqObj.count(function(schema) {
                    return schema.schema_s.toLowerCase() == 'measure';
                    });

                    $scope.Permit = linqObj.count(function(schema) {
                    return schema.schema_s.toLowerCase() == 'abspermit';
                    });

                    $scope.absCheckpoint = linqObj.count(function(schema) {
                    return schema.schema_s.toLowerCase() == 'abscheckpoint';
                    });

                    $scope.absCheckpointCommunique = linqObj.count(function(schema) {
                    return schema.schema_s.toLowerCase() == 'abscheckpointcommunique';
                    });

                    $scope.database = linqObj.count(function(schema) {
                    return schema.schema_s.toLowerCase() == 'database';
                    });
                    $scope.resource = linqObj.count(function(schema) {
                    return schema.schema_s.toLowerCase() == 'resource';
                    });

                    $scope.absNationalReport = linqObj.count(function(schema) {
                    return schema.schema_s.toLowerCase() == 'absnationalreport';
                    });
                }

                $scope.showlist = false;

                //**********************************************************
                $scope.countriescommonjs = countriescommonjs;
                $scope.$on('loadCountryProfile', function(evt, evtData){
                    $scope.loadCountryDetails(evtData.data.countryCode);
                })


                $scope.isContactInformation = function(entity){

                    return entity && (entity.schema_s == "focalPoint" ||
                                entity.schema_s == "authority" || entity.schema_s == "database" ||
                                entity.schema_s == "absCheckpoint")
                }

                $scope.isMeasure = function(entity){

                    return entity && entity.schema_s == "measure";
                }
                $scope.isCheckpointCommunique = function(entity){

                    return entity && entity.schema_s == "absCheckpointCommunique";
                }

                $scope.isPermit = function(entity){

                    return entity && entity.schema_s == "absPermit";
                }

                $scope.isCheckpointCommuniqueReceived = function(entity){
                    return entity && entity.schema_s == "absCheckpointCommunique"
                    && (entity.sourceCountries_ss==$scope.code  || entity.permitSourceCountry_ss==$scope.code);
                }

                $scope.isCheckpoint = function(entity){

                    return entity && entity.schema_s == "absCheckpoint";
                }
                $scope.isFocalpoint = function(entity){

                    return entity && entity.schema_s == "focalPoint";
                }
                $scope.isDatabase = function(entity){

                    return entity && entity.schema_s == "database";
                }
                $scope.isCNA = function(entity){

                    return entity && entity.schema_s == "authority";
                }

                $scope.isNationalReport = function(entity){

                    return entity && entity.schema_s == "absNationalReport";
                }


                $scope.showDetails = function(document){
                    //$scope.currentDocument = documentId;
                    if(!document.data){
                            var doc = IStorage.documents.get(document.identifier_s);
                            var docInfo = IStorage.documents.get(document.identifier_s,{ info: true});
                            $q.all([doc,docInfo])
                            .then(function(result){
                                document.data = result[0].data;
                                document.data.info = result[1].data;
                            });
                        }
                };

                //**********************************************************
                $scope.getTitle = function(schema,type, schemaFull){
                    if(schema == 'focalPoint'){

                            if(_.contains(type,'NP-FP') || _.contains(type,'ABS-FP'))
                                return 'ABS National Focal Point';
                            // else if(_.contains(type,'ABS-IC'))
                            //     return 'ABS ICNP Focal Point';
                            else if(_.contains(type,'CBD-FP1') ||  _.contains(type,'CBD-FP2'))
                                return 'CBD Primart Focal Point';
                            else
                                return 'National Focal Point';
                    }
                    else
                        return schemaFull;

                }

                //**********************************************************
                $scope.parseJSON = function(value){
                    if(value)
                        return JSON.parse(value);
                }

                $scope.isForMeasureMatrix = function(measure){
                    return measure.measureMatrix;
                }

                // $scope.selectAllForMatrix = function(){
                //     _.map($scope.measureMatrixDocuments,function(item){
                //         item.measureMatrix = !$scope.measureMatrixDocuments.selectAll;
                //     })
                // }
            }]

        };
    });
});
