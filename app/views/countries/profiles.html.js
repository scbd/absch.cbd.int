 define(['app','underscore','linqjs', 'ngMaterial','ngAria','angular-animate',
   '/app/views/forms/view/record-loader.directive.html.js',
   '/app/views/forms/view/view-abs-checkpoint.directive.js',
   '/app/views/forms/view/view-abs-checkpoint-communique.directive.js',
   '/app/views/forms/view/view-abs-permit.directive.js',
   '/app/views/forms/view/view-authority.directive.js',
   '/app/views/forms/view/view-authority-reference.directive.js',
   '/app/views/forms/view/view-contact.directive.js',
   '/app/views/forms/view/view-contact-reference.directive.js',
   '/app/views/forms/view/view-database.directive.js',
   '/app/views/forms/view/view-measure.directive.js',
   '/app/views/forms/view/view-organization.directive.js',
   '/app/views/forms/view/view-organization-reference.directive.js',
   '/app/views/forms/view/view-resource.directive.js',
   '/app/js/directives/angucomplete-extended.js',
   '/app/views/countries/countries-left-menu-directive.html.js',
   '/app/views/search/measure-matrix-countries-directive.html.js',
   '/app/js/common.js'
 ], function(app, _, linqjs) {

   app.controller("ProfileController", ["$scope", "$http", "$routeParams", "linqjs", "$filter", "realm",
                "commonjs", "$q", '$element', '$timeout','commonjs','IStorage','$rootScope','$mdSidenav', '$mdUtil', '$mdMedia','schemaTypes','breadcrumbs','smoothScroll',
     function($scope, $http, $routeParams, linqjs, $filter, realm, commonjs, $q,
                $element, $timeout, countriescommonjs, IStorage,$rootScope, $mdSidenav, $mdUtil, $mdMedia, schemaTypes, breadcrumbs,smoothScroll) {


    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    //**********************************************************
    $scope.close = function () {
          $mdSidenav('left').close()
            .then(function () {
              $log.debug("close LEFT is done");
            });
        };

    //**********************************************************
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },300);
      return debounceFn;
    }


    //**********************************************************
    function loadCountries() {

        commonjs.getCountries()
            .then(function(countries) {

                $scope.ratifications = 0;
                $scope.signatures = 0;
                $scope.parties = 0;
                $scope.countriesforAutocomplete = [];
                $scope.inbetweenParties = 0;
                $scope.nonCBDParties = 0
                var countryColors = {};
                $scope.countries = countries;

                getCountriesFacets();

            });
        //$scope.countries = $filter("orderBy")(response[1].data, "name.en");
    }
    loadCountries();






    //**********************************************************
    function resetList(){
            $scope.showCPC = false;
            $scope.showIRCC = false;
            $scope.showMSR = false;
            $scope.showNFP = true;
            $scope.showNDB = false;
            $scope.showCNA = false;
            $scope.showCP = false;
            $scope.showCPCRecv = false;

            $scope.sortMeasure='title_t';
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



        $scope.gotoSchema = $routeParams.schema;
        
        if($scope.gotoSchema)
        {
            $scope.showCPC = false;
            $scope.showIRCC = false;
            $scope.showMSR = false;
            $scope.showNFP = false;
            $scope.showNDB = false;
            $scope.showCNA = false;
            $scope.showCP = false;
            $scope.showCPCRecv = false;
            
            if($scope.gotoSchema == 'CPC')
                 $scope.showCPC = true;
            if($scope.gotoSchema == 'IRCC')
                $scope.showIRCC = true;
            if($scope.gotoSchema == 'MSR')
                $scope.showMSR = true;
            if($scope.gotoSchema == 'NFP')
                $scope.showNFP = true;
            if($scope.gotoSchema == 'NDB')
                $scope.showNDB = true;
            if($scope.gotoSchema == 'CNA')
                $scope.showCNA = true;
            if($scope.gotoSchema == 'CP')
                $scope.showCP = true;
            if($scope.gotoSchema == 'CPCRecv')
                $scope.showCPCRecv = true;
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
         //fix for EU
         if($scope.code.toLowerCase() == 'eu')
            $scope.code = 'eur';
          // $scope.show('profile');
           $http.get('/api/v2013/countries/' + $scope.code.toUpperCase(), {
             cache: true
           }).then(function(response) {
             $scope.country = response.data;

            breadcrumbs.options = {'Country Profile':$scope.country.name.en};
             $scope.searchText = '';
             $scope.autocompleteData = [];

            $scope.country.isCBDParty = countriescommonjs.isPartyToCBD($scope.country ) || $scope.country.code == 'EU';
            $scope.country.isNPParty = countriescommonjs.isNPParty($scope.country ) || $scope.country.code == 'EU';
            $scope.country.isNPSignatory = countriescommonjs.isSignatory($scope.country ) || $scope.country.code == 'EU';
            $scope.country.isNPRatified = countriescommonjs.isRatified($scope.country ) || $scope.country.code == 'EU';
            $scope.country.isNPInbetweenParty = moment().diff(moment($scope.country.treaties.XXVII8b.deposit), 'days') < 90;

            if ($scope.country.isNPInbetweenParty)
                $scope.country.entryIntoForceDate = moment($scope.country.treaties.XXVII8b.deposit).add(90, 'day');
            else if ($scope.country.isNPParty)
                $scope.country.entryIntoForceDate = $scope.country.treaties.XXVII8b.party;

           });
           //*******************************************************
           var schema = [ "absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database"]
           var schemQuery = ' (schema_s:' + schema.join(' OR schema_s:') + ' OR (schema_s:focalPoint AND (type_ss:NP-FP OR type_ss:ABS-IC OR type_ss:ABS-FP)))';
           var queryURL = '/api/v2013/index/select?fl=id,identifier_s,title_t,description_t,url_ss,schema_EN_t,date_dt,' +
                            'government_s,government_EN_t,schema_s,number_d,aichiTarget_ss,reference_s,sender_s,meeting_ss,recipient_ss,' +
                            'symbol_s,eventCity_EN_t,eventCountry_EN_t,startDate_s,endDate_s,body_s,code_s,meeting_s,group_s,function_t,' +
                            'department_t,organization_t,summary_EN_t,reportType_EN_t,completion_EN_t,jurisdiction_s,jurisdiction_EN_t,development_EN_t' +
                            ',type_ss,email_ss,fax_ss,telephone_s,government_CEN_s,type_EN_t,status_EN_t,entryIntoForce_dt, usage_CEN_ss,keywords_CEN_ss,'+
                            'date_s,informedConsents_s,permit_ss,originCountries_CEN_ss,checkpoint_CEN_ss,createdDate_dt,geneticRessourceUsers_s,authority_s'+
                            '' +
                            '&q=(realm_ss:' + realm.value.toLowerCase() + ' OR realm_ss:absch) AND ((' + schemQuery +
                            ' AND government_s:' + $scope.code.toLowerCase() + ') OR (originCountries_ss:'+
                            $scope.code.toLowerCase() + ' OR permitSourceCountry_ss:' + $scope.code.toLowerCase() + 
                            ') OR (jurisdictionRegions_REL_ss:'+ $scope.code.toLowerCase() + ' OR jurisdictionRegions_ss:' + $scope.code.toLowerCase() + '))' +
                            '&rows=100&sort=createdDate_dt+desc,+title_t+asc&start=0&wt=json';
            var queryCPCRevURL = '/api/v2013/index/select?fl=id,identifier_s,title_t,keywords_CEN_ss'+
                             'checkpoint_CEN_ss,createdDate_dt,geneticRessourceUsers_s,government_s,permit_ss,' +
                             '&q=(realm_ss:' + realm.value.toLowerCase() + ' OR realm_ss:absch) AND schema_s:absCheckpointCommunique AND (originCountries_ss:'+
                             $scope.code.toLowerCase() + ' OR permitSourceCountry_ss:' + $scope.code.toLowerCase() + ')' +
                             '&rows=100&sort=createdDate_dt+desc,+title_t+asc&start=0&wt=json';
           var queryProfile = $http.get(queryURL, {cache: true})
           var queryCPCRecv = $http.get(queryCPCRevURL, {cache: true})

           $q.all([queryProfile,queryCPCRecv])
            .then(function(results) {
             
             $scope.absch_nfp = results[0].data.response.docs;
             $scope.cpcReceived = results[1].data.response.docs;              
             var measureMatrixDocuments = [];
             
              $scope.absch_nfp.forEach(function(document){
                  document.identifier = document.identifier_s
                  document.government = {identifier:document.government_s};
                  if(document.schema_s == "focalPoint" ){
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

                      if(document.geneticRessourceUsers_s){
                        document.geneticRessourceUsers = $scope.parseJSON(document.geneticRessourceUsers_s);
                      }
                  }
                  //create seprate collection for measure matrix
                  if(document.schema_s=='measure'){
                      measureMatrixDocuments.push(document);
                  }

              });
              $scope.measureMatrixDocuments = measureMatrixDocuments;
              
              $scope.cpcReceived.forEach(function(document){
                  if(document.geneticRessourceUsers_s){
                    document.geneticRessourceUsers = $scope.parseJSON(document.geneticRessourceUsers_s);
                  }
                  $scope.cpcReceivedCount++;
              });
              $scope.getFacets($scope.absch_nfp);
              $('[data-toggle="tooltip"]').tooltip()
           });
         }
       }
       $scope.loadCountryDetails();


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
       }

    //    $scope.$watch('searchText.$', function(value) {
       //
    //      if (undefined == value || value == null || $scope.absch_nfp == null) return;
    //      $scope.getFacets($filter('filter')($scope.absch_nfp.response.docs, value));
       //
       //
    //    });

       $scope.showlist = false;

    //    $scope.$on('mapDetailsLoad', function(evt, data){
    //        $scope.mapDetails = data.mapDetails;
    //        $scope.type = 'party';
    //       if ($routeParams.code && $routeParams.code.toUpperCase() != 'RAT')
    //         $scope.show('profile');
    //       else
    //         $scope.show('map');
    //    })

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
          && (entity.originCountries_ss==$scope.code  || entity.permitSourceCountry_ss==$scope.code);
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
                    return 'CBD National Focal Point';
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

       function getCountriesFacets(){
           var schema = _.clone(schemaTypes);
           schema.push('focalPoint');
               var queryFacetsParameters = {
                   'q': 'realm_ss:' + realm.value.toLowerCase() + ' AND NOT version_s:* AND schema_s:(' + schema.toString().replace(/,/g, ' ') + ')',
                   'fl': '', 		//fields for results.
                   'wt': 'json',
                   'rows': 0,		//limit
                   'facet': true,	//get counts back
                   'facet.field': ['government_s'],
                   'facet.mincount':1,
                   'facet.limit': 512
               };

               $http.get('/api/v2013/index/select', { params: queryFacetsParameters }).success(function (data) {
                  var solrArray = data.facet_counts.facet_fields.government_s;
                  for (var i = 0; i < solrArray.length; i += 2) {
                      var country = _.findWhere($scope.countries, {code:solrArray[i].toUpperCase()});
                      if(country){
                        country.facetCount =  solrArray[i + 1];
                      }
                      else {
                            console.log(solrArray[i]);
                        }

                  }

               }).error(function (error) {
                   console.log('onerror');
                   console.log(error);
               });
       }
     }
   ]);

 });
