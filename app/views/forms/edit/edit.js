//fixed a bug with the comment up here ;)
define([
    'app', 'lodash', 'linqjs', 'js/services', 'services/app-config-service',
    'views/forms/edit/editFormUtility',
    'views/forms/view/record-loader.directive',
    'views/forms/view/view-history-directive',
    'views/forms/edit/document-selector',
    'views/register/directives/register-top-menu',
    'components/scbd-angularjs-services/services/locale',
    'views/directives/workflow-arrow-buttons', 'services/app-config-service'
], function (app, _, Enumerable) {
  
  app.controller("editController", ["$rootScope", "$scope", "$http", "$window", "guid", "$filter", "Thesaurus", "$q", "$location", "IStorage",
                                   "authentication", "editFormUtility", "$routeParams", "$timeout", "$route", 
                                   "breadcrumbs", "appConfigService", "locale", "realm", 
                                    function ($rootScope, $scope, $http, $window, guid, $filter, thesaurus, $q, $location, storage,
                                              authentication, editFormUtility, $routeParams, $timeout, $route, 
                                              breadcrumbs, appConfigService, locale, realm) {
                                   
    $scope.realm = realm;
    $scope.type = $route.current.$$route.documentType;
    
    if(_.includes(appConfigService.nationalSchemas, $filter('mapSchema')($scope.type)))
      $scope.schemaType = 'nationalRecords';
    else
      $scope.schemaType = 'referenceRecords';
      
    $scope.status   = "loading";
    $scope.error    = null;
    if(!$scope.tab)
      $scope.tab      = "edit";
    $scope.review   = { locale: locale };

    var breadcrumb = {    
        label : $filter('schemaName')($filter('mapSchema')($scope.type)),
        originalPath : "/register/:document_type",
        param:$scope.type,
        path:"/register/" + $scope.type
    }
    breadcrumbs.breadcrumbs.splice(2, 0 , breadcrumb);

    $scope.options  = {
      countries		: function() {
        return $http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }).then(function(o){
          var countries = $filter("orderBy")(o.data, "name");
          _.each(countries, function(element) {
            element.__value = element.name;
          });
          return countries;
        });
      },
      libraries		: function() {
        return $http.get("/api/v2013/thesaurus/domains/cbdClearingHouses/terms", { cache: true }).then(function(o){
          return o.data;
        });
      },
      regions			: function() {
        return $q.all([
          $http.get("/api/v2013/thesaurus/domains/regions/terms", { cache: true }),
          $http.get("/api/v2013/thesaurus/domains/countries/terms",   { cache: true })
        ]).then(function(o) {
          return Enumerable.from($filter("orderBy")(o[0].data, "name")).union(
            Enumerable.from($filter("orderBy")(o[1].data, "name"))
          ).toArray();
        });
      },
    };

    $scope.ac_countries = function() {
      return $scope.options.countries();
    };

    $scope.genericFilter = function($query, items) {
      var matchedOptions = [];
      for(var i=0; i!=items.length; ++i)
        if(items[i].__value.toLowerCase().indexOf($query.toLowerCase()) !== -1)
          matchedOptions.push(items[i]);

      return matchedOptions;
    };

    $scope.genericMapping = function(item) {
      return {identifier: item.identifier};
    };

    //==================================
    //
    //==================================
    $scope.scrollToTop = function() {
          $("body, html").animate({scrollTop: 0}, "slow");
        };

    //==================================
    //
    //==================================
    $scope.isDefined = function(obj) {
      return angular.isDefined(obj);
    };

    //==================================
    //
    //==================================
    $scope.$watch("tab", function(tab) {
      if(tab == "review" || tab=='publish')
       $scope.reviewDocument = $scope.getCleanDocument();
    });


    $scope.isOtherSelected = function(document){

       return document &&  Enumerable.from(document).any(function(type){
              return type.identifier == "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED";
            });
    };


    //==================================
    //
    //==================================
    $scope.isInLibrary = function(name, document) {
      document = document || $scope.document;

      if (!document || !document.libraries)
        return false;

      var qLibraries = Enumerable.from(document.libraries);

      if(name=="chm"  ) return qLibraries.any(function(o){ return o.identifier == "cbdLibrary:chm";    });
      if(name=="absch") return qLibraries.any(function(o){ return o.identifier == "cbdLibrary:abs-ch"; });
      if(name=="bch"  ) return qLibraries.any(function(o){ return o.identifier == "cbdLibrary:bch";    });
      if(name=="ebsa" ) return qLibraries.any(function(o){ return o.identifier == "cbdLibrary:ebsa";   });

      return false;
    };

    //==================================
    //
    //==================================
    $scope.canAddRegionalMeasure = function(document) {
      document = document || $scope.document;

      if (!document)
        return false;
      var allowedRegionalMeasuresMapping = {
        "pe"    : "9C5E1A4D-E8EE-4C74-B9C9-5C7BCDF6B84A",
        "eu"    : "bd12d7fb-91f7-4b2d-996c-e70f18a51f0e",
        "eur"   : "bd12d7fb-91f7-4b2d-996c-e70f18a51f0e" 
      }
      if(document.jurisdiction.identifier == '528B1187-F1BD-4479-9FB3-ADBD9076D361' && allowedRegionalMeasuresMapping[document.government.identifier]){
         document.jurisdictionRegions = [{"identifier":allowedRegionalMeasuresMapping[document.government.identifier]}];
         return true;
      }

      document.jurisdictionRegions = null;
        return false;

     };

    //==================================
    //
    //==================================
    $scope.isJurisdictionRegional = function(document) {
      document = document || $scope.document;

      if (!document || !document.jurisdiction)
        return false;

      var qJurisdiction = Enumerable.from([document.jurisdiction]);

      return qJurisdiction.any(function (o) { return o.identifier == "528B1187-F1BD-4479-9FB3-ADBD9076D361"; });
    };

    //==================================
    //
    //==================================
    $scope.isJurisdictionSubNationalOrCommunity = function (document) {
      document = document || $scope.document;

      if (!document || !document.jurisdiction)
        return false;

      var qJurisdiction = Enumerable.from([document.jurisdiction]);

      var response  = qJurisdiction.any(function (o) { return o.identifier == "DEBB019D-8647-40EC-8AE5-10CA88572F6E"; });
          response |= qJurisdiction.any(function (o) { return o.identifier == "9627DF2B-FFAC-4F85-B075-AF783FF2A0B5"; });
          response |= qJurisdiction.any(function (o) { return o.identifier == "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED"; });

      return response;
    }

    //==================================
    //
    //==================================
    $scope.isNotLegallyBinded = function (document) {
      document = document || $scope.document;

      if (!document || !document.status)
        return false;

      var qStatus = Enumerable.from([document.status]);

      return qStatus.any(function (o) { return o.identifier == "C9E33B71-D92A-4AC1-96E3-A136A1FDF135" });
    }

    //==================================
    //
    //==================================
    $scope.isLegallyBinded = function (document) {
      document = document || $scope.document;

      if (!document || !document.status)
        return false;

      var qStatus = Enumerable.from([document.status]);

      return qStatus.any(function (o) { return o.identifier == "97D6C7E6-5EAD-48B2-BD8D-DAB77153FF9C" });
    }

    //==================================
    //
    //==================================
    $scope.isRetired = function (document) {
      document = document || $scope.document;

      if (!document || !document.status)
        return false;

      var qStatus = Enumerable.from([document.status]);

      return qStatus.any(function (o) { return o.identifier == "0F8F3A6D-1BF7-4468-8BFC-8DD52F7F6E50" });
    }

    //==================================
    //
    //==================================
    $scope.isLoading = function() {
      return $scope.status=="loading";
    }

    //==================================
    //
    //==================================
    $scope.hasError = function() {
      return $scope.error!=null;
    }

    //==================================
    //
    //==================================
    $scope.userGovernment = function() {
      return $scope.$root.user.government;
    };

    //==================================
    //
    //==================================
    $scope.isFieldValid = function(field) {
      if (field && $scope.validationReport && $scope.validationReport.errors)
        return !Enumerable.from($scope.validationReport.errors).any(function(x){return x.property==field})

      return true;
    }

    //==================================
    //
    //==================================
    $scope.onError = function(error, status)
    {
      $scope.status = "error";

      if (status == "notAuthorized") {
        $scope.status = "hidden";
        $scope.error  = "You are not authorized to modify this record";
      }
      else if (status == 404) {
        $scope.status = "hidden";
        $scope.error  = "Record not found.";
      }
      else if (status == "badSchema") {
        $scope.status = "hidden";
        $scope.error  = "Record type is invalid.";
      }
      else if (error.Message)
        $scope.error = error.Message
      else
        $scope.error = error;
    }

    //==================================
    //
    //==================================
    $scope.loadRecords = function(identifier, schema, cache) {

      if(cache == undefined) cache = true;

      if (identifier) { //lookup single record
        var deferred = $q.defer();

        storage.documents.get(identifier, { info: "", cache: cache })
          .then(function(r) {
            deferred.resolve(r.data);
          }, function(e) {
            // if (e.status == 404) {
            //   storage.drafts.get(identifier, { info: "" })
            //     .then(function(r) { deferred.resolve(r.data)},
            //         function(e) { deferred.reject (e)});
            // }
            // else {
              deferred.reject (e)
            // }
          });
        return deferred.promise;
      }

      //Load all record of specified schema;

      var sQuery = "type eq '" + encodeURI(schema) + "'";
      //,storage.drafts   .query(sQuery, null, { cache: true })
      return $q.all([storage.documents.query(sQuery, null, { cache: cache })])
        .then(function(results) {
          var qResult = Enumerable.from (results[0].data.Items)
                     //.union(results[1].data.Items, "$.identifier");
          return qResult.toArray();
        });
    }

    $scope.setDocument = function(additionalParams, excludeGovernment) {
      
      $scope.status = "loading";

      var qDocument = {};
      $scope.document = {};
      if(!$scope.isDialog && $routeParams.identifier)
        qDocument = editFormUtility.load($routeParams.identifier, $filter("mapSchema")($scope.type));
      else {
        qDocument = {
          header: {
            identifier: guid(),
            schema   : $filter("mapSchema")($scope.type),
            languages: [locale]
          },
          government: $scope.userGovernment() ? { identifier: $scope.userGovernment() } : undefined,
        };
        for(var key in additionalParams)
          qDocument[key] = additionalParams[key];
        if(excludeGovernment)
          delete qDocument['government'];

        // canCreate(qDocument);
      }
      /*
      console.log('doc, ', qDocument);
      console.log('languages: ', qDocument.header.languages);
      console.log('id, ', qDocument.header.identifier);
      */

      return $q.when(qDocument).then(function(doc) {
        if(!$scope.tab)
          $scope.tab    = "edit";
        $scope.document = doc;

        $scope.origanalDocument = angular.copy(doc);

        if(!$scope.isDialog && $routeParams.tour)
        {
            $scope.startTour=true;
            $location.search("tour", null);
        }
        
        $scope.$emit("loadDocument", {identifier:doc.header.identifier,schema:doc.header.schema, document:doc});

        $scope.status = "ready";
        return $scope.document;

      }).catch(function(err) {

        $scope.onError(err.data, err.status)
        throw err;

      });
    };

    $scope.onReviewLanguageChange = function(lang){
      $scope.review.locale = lang;
    }

    $scope.onPostPublishOrRequest = function(documentInfo){
      if($scope.onPostSubmitFn)
        $scope.onPostSubmitFn({ data: documentInfo });
    };

  }]);
});
