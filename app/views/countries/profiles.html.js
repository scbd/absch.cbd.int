 define(['app','underscore','linqjs',
   '/app/views/forms/view/record-loader.directive.html.js',
   '/app/views/directives/document-list.partial.html.js',
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
   '/app/js/common.js', 'jqvmap', 'jqvmapworld',
   '/app/views/countries/country-map-list-directive.html.js',
   './countries-commonJS.js'
 ], function(app, _, linqjs) {

   app.controller("ProfileController", ["$scope", "authHttp", "$routeParams", "linqjs", "$filter", "realm",
                "commonjs", "$q", '$element', '$timeout','countriescommonjs','IStorage',
     function($scope, $http, $routeParams, linqjs, $filter, realm, commonjs, $q,
                $element, $timeout, countriescommonjs, IStorage) {


       function resetList(){
            $scope.showCPCSent = true;
            $scope.showIRCC = true;
            $scope.showMSR = true;
            $scope.showContacts = true;
            $scope.showCPCRecv = true;

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

       $scope.show = function(type) {
         if (type=='map' || type=='list') {
           $element.find('#countryDetails').slideUp('slow');
           $element.find('#worldMap').slideDown('slow');

         } else {
           $element.find('#worldMap').slideUp('slow');
           $element.find('#countryDetails').slideDown('slow');
           resetList()
         }

         $scope.$broadcast('showDetails', {data:type});
       }

       $scope.loadCountryDetails = function(countryCode) {

         $scope.code = countryCode || $routeParams.code;

         $scope.documentCount = 0;
         $scope.currentPage = 0;
         $scope.searchText = '';
         $scope.autocompleteData = [];
         $scope.absch_nfp = null;
         //*******************************************************
         if ($scope.code) {
         //fix for EU
         if($scope.code.toLowerCase() == 'eu')
            $scope.code = 'eur';
           $scope.show('profile');
           $http.get('/api/v2013/countries/' + $scope.code.toUpperCase(), {
             cache: true
           }).then(function(response) {
             $scope.country = response.data;
             $scope.searchText = '';
             $scope.autocompleteData = [];
             $scope.entryIntoForceDate = moment($scope.country.treaties.XXVII8b.deposit).add(90, 'days');
           });
           //*******************************************************
           var schema = [ "absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database"]
           var schemQuery = ' (schema_s:' + schema.join(' OR schema_s:') + ' OR (schema_s:focalPoint AND (type_ss:NP-FP OR type_ss:ABS-IC)))';
           var queryURL = '/api/v2013/index/select?cb=1394816088237&fl=id,identifier_s,title_t,description_t,url_ss,schema_EN_t,date_dt,' +
                            'government_s,government_EN_t,schema_s,number_d,aichiTarget_ss,reference_s,sender_s,meeting_ss,recipient_ss,' +
                            'symbol_s,eventCity_EN_t,eventCountry_EN_t,startDate_s,endDate_s,body_s,code_s,meeting_s,group_s,function_t,' +
                            'department_t,organization_t,summary_EN_t,reportType_EN_t,completion_EN_t,jurisdiction_EN_t,development_EN_t' +
                            ',type_ss,email_ss,fax_ss,telephone_s,government_CEN_s,type_EN_t,status_EN_t,entryIntoForce_dt, usage_CEN_ss,keywords_CEN_ss,'+
                            'date_s,informedConsents_s,permit_ss,originCountries_CEN_ss,checkpoint_CEN_ss,createdDate_dt,geneticRessourceUsers_s,authority_s'+
                            '' +
                            '&q=(realm_ss:' + realm.value.toLowerCase() + ' OR realm_ss:absch) AND ((' + schemQuery +
                            ' AND government_s:' + $scope.code.toLowerCase() + ') OR (originCountries_ss:'+
                            $scope.code.toLowerCase() + ' OR permitSourceCountry_ss:' + $scope.code.toLowerCase() + '))' +
                            '&rows=100&sort=createdDate_dt+desc,+title_t+asc&start=0&wt=json';
            var queryCPCRevURL = '/api/v2013/index/select?cb=1394816088237&fl=id,identifier_s,title_t,keywords_CEN_ss'+
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
              //console.log($scope.absch_nfp);
              $scope.absch_nfp.forEach(function(document){

                  if(document.schema_s == "focalPoint" ){
                      document.description_t = document.description_t.replace(/\n/g, '<br/>');
                  }
                  else if(document.schema_s == "authority" || document.schema_s == "database" ||
                     document.schema_s == "absCheckpoint"){
                         document.description_t = '';
                         $q.when(IStorage.documents.get(document.identifier_s))
                         .then(function(data) {
                             var doc = data.data
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
                            document.telephones = doc.phones
                            document.emails = doc.emails

                         });
                  }
                  else if(document.schema_s=="absCheckpointCommunique"){

                      if(document.geneticRessourceUsers_s){
                        document.geneticRessourceUsers = $scope.parseJSON(document.geneticRessourceUsers_s);
                      }
                    //   if(document.permit_ss){
                    //       document.permit = [];
                    //       _.each(document.permit_ss, function(permit){
                    //           $q.when(IStorage.documents.get(permit))
                    //               .then(function(data) {
                    //                   document.permit.push(data.data);
                    //            });
                      //
                    //       });
                    //   }
                  }

              });

              $scope.cpcReceived.forEach(function(document){
                  if(document.geneticRessourceUsers_s){
                    document.geneticRessourceUsers = $scope.parseJSON(document.geneticRessourceUsers_s);
                  }
              });
              $scope.getFacets($scope.absch_nfp);

           });
         }
       }
       $scope.loadCountryDetails();

       $scope.$watch('absch_nfp', function(value) {

         if (!value) return;

         $scope.getFacets(value);


       });

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

       $scope.$watch('searchText.$', function(value) {

         if (undefined == value || value == null || $scope.absch_nfp == null) return;
         $scope.getFacets($filter('filter')($scope.absch_nfp.response.docs, value));


       });

       $scope.showlist = false;

       $scope.$on('mapDetailsLoad', function(evt, data){
           $scope.mapDetails = data.mapDetails;
           $scope.type = 'party';
          if ($routeParams.code && $routeParams.code.toUpperCase() != 'RAT')
            $scope.show('profile');
          else
            $scope.show('map');
       })

       $scope.updateMap = function(type){

            $scope.type = type;
            if(type=='ratified')
                $scope.searchFilter=(countriescommonjs.isNPParty);
            else if(type=='inbetweenParty')
                $scope.searchFilter=countriescommonjs.isInbetweenParty;
            else if(type=='signatory')
                $scope.searchFilter=countriescommonjs.isSignatory;
            else if(type=='nonParties')
                $scope.searchFilter=countriescommonjs.isNonParties;
            else if(type=='party')
                $scope.searchFilter=countriescommonjs.isPartyToCBD;

            $scope.$broadcast('updateMap', {data:{'type':type,'searchFilter':$scope.searchFilter}});

       }
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


       $scope.getTitle = function(schema,type, schemaFull){
           if(schema == 'focalPoint'){

                if(_.contains(type,'NP-FP'))
                    return 'Nagoya Protocol Focal Point';
                else if(_.contains(type,'ABS-IC'))
                    return 'Nagoya Protocol ICNP Focal Point';
                else if(_.contains(type,'CBD-FP1') ||  _.contains(type,'CBD-FP2'))
                    return 'CBD National Focal Point';
                else
                    return 'National Focal Point';
           }
           else
            return schemaFull;

       }

       $scope.parseJSON = function(value){
           if(value)
            return JSON.parse(value);
       }
     }
   ]);

 })
