//fixed a bug with the comment up here ;)
import app from 'app';
import _ from 'lodash';
import Enumerable from 'linqjs';
import 'services/main';
import '~/views/forms/edit/editFormUtility';
import '~/views/forms/view/record-loader.directive';
import '~/views/forms/view/view-history-directive';
import '~/views/forms/edit/document-selector';
import '~/views/register/directives/register-top-menu';
import 'components/scbd-angularjs-services/main';
import '~/views/directives/workflow-arrow-buttons';
import './edit-header';

app.controller('editController', ["$rootScope", "$scope", "$http", "$window", "guid", "$filter", "thesaurusService", "$q", "$location", "IStorage",
                                   "authentication", "editFormUtility", "$routeParams", "$timeout", "$route", 
                                   "breadcrumbs", "appConfigService", "locale", 'ngMeta', "realm", 'solr', 'Thesaurus',
                                    function ($rootScope, $scope, $http, $window, guid, $filter, thesaurusService, $q, $location, storage,
                                              authentication, editFormUtility, $routeParams, $timeout, $route, 
                                              breadcrumbs, appConfigService, locale, ngMeta, realm, solr, Thesaurus) {

    $scope.realm = realm;
    //incase if open from dialog use the type passed by the dialog
    $scope.type = $scope.type || $route.current.$$route.documentType;
    
    if(_.includes(appConfigService.nationalSchemas, $filter('mapSchema')($scope.type)))
      $scope.schemaType = 'nationalRecords';
    else
      $scope.schemaType = 'referenceRecords';
      
    $scope.status   = "loading";
    $scope.error    = null;
    if(!$scope.tab)
      $scope.tab      = "intro";
    $scope.review   = { locale: locale };

    if(!$scope.isDialog){
      var breadcrumb = {    
          label : $filter('schemaName')($filter('mapSchema')($scope.type)),
          originalPath : "/register/:document_type",
          param:$scope.type,
          path:"/register/" + $scope.type
      }
      breadcrumbs.breadcrumbs.splice(2, 0 , breadcrumb);
    }
    
    $scope.options  = {                
      countries		: function() {
        return thesaurusService.getDomainTerms('countries').then(function(o){
          var countries = $filter("orderBy")(o, "name");
          _.forEach(countries, function(element) {
            element.__value = $filter('lstring')(element.title, locale);
          });
          return countries;
        });
      },
      libraries		: function() {
        return $http.get("/api/v2013/thesaurus/domains/cbdClearingHouses/terms", { cache: true }).then(function(o){
          return o.data;
        });
      },
      countryRegions			: function() {
        return $q.all([
          thesaurusService.getDomainTerms('regions'),
          thesaurusService.getDomainTerms('countries')
        ]).then(function(o) {
          var regions   = $filter("orderBy")(o[0], "name");
          var countries = $filter("orderBy")(o[1], "name");
          var countryRegions = _.union(regions, countries);
          return countryRegions;
        });
      },
      regions	: function() {return thesaurusService.getDomainTerms('regions').then(Thesaurus.buildTree);}
    };

    $scope.genericFilter = function($query, items) {
      if(!items)
        return;
      var matchedOptions = [];
      for(var i=0; i!=items.length; ++i)
        if(items[i].__value.toLowerCase().indexOf($query.toLowerCase()) !== -1)
          matchedOptions.push(items[i]);

      return matchedOptions;
    };

    $scope.startsWithFilter = function($query, items) {
      var matchedOptions = [];
      for(var i=0; i!=items.length; ++i)
          if(_.startsWith(items[i].__value.toLowerCase(), $query.toLowerCase()))
              matchedOptions.push(items[i]);

      return matchedOptions;
    };
    
    $scope.genericMapping = function(item) {
      return {identifier: item.identifier};
    };
    //==================================
    //
    //==================================
    
    $scope.cbdSubjects  = function() { return $http.get("/api/v2013/thesaurus/domains/CBD-SUBJECTS/terms", { cache: true }).then(function(o){
      var subjects = ['CBD-SUBJECT-BIOMES', 'CBD-SUBJECT-CROSS-CUTTING'];
      var items = [];
      _.forEach(subjects, function(subject) {
        var term = _.find(o.data, {'identifier': subject } );
        items.push(term);
        _(term.narrowerTerms).forEach(function (term) {
          items.push(_.find(o.data, {'identifier':term}));
        })
      });
      return items;
    });
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
       $scope.review.document = $scope.getCleanDocument();
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
          $scope.tab    = "intro";
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

        if(err.status == 403)
          $location.path('/help/403')
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

    $scope.sanitizeDocument = function(document){

      if(!document) return;

      document = sanitize(document);
      return document;

      function sanitize(doc){
        _.forEach(doc, function(fieldValue, key){
          
          if(_.isString(fieldValue) && _.trim(fieldValue||'') == ''){
            fieldValue = undefined;
          }
          else if(_.isArray(fieldValue)){
            fieldValue = sanitize(fieldValue);
            fieldValue = _.compact(fieldValue);
            
            if(_.isEmpty(fieldValue))
              fieldValue = undefined;
          }
          else if(_.isPlainObject(fieldValue)){
            fieldValue = sanitize(fieldValue);
            fieldValue = _.omit(fieldValue, isNullOrUndefinedOrEmpty);
          }

          doc[key] = fieldValue;

        });
        
        if(_.isArray(doc))
          doc = _.compact(doc)
        else if(_.isPlainObject(doc))
          doc = _.omit(doc, isNullOrUndefinedOrEmpty);
        
        return doc;
      }
      function isNullOrUndefinedOrEmpty(v){
        return v === undefined || v === null || (_.isObject(v) && _.isEmpty(v));
      }
    }
    //to handle console errors
    $scope.isGovernmentRequired = function(value){
      return (value != undefined && value.government != undefined && value.government.identifier != undefined);
    }

    $scope.onBuildDocumentSelectorQuery = function(options){
      var queries = {
          fieldQueries    : options.fieldQueries||[],
          query           : options.query || '*:*'
      }
      if(options.schemas)
        queries.fieldQueries.push('schema_s:(' + _.map(options.schemas, solr.escape).join(' ') + ')')
      else if(options.schema)
        queries.fieldQueries.push('schema_ss:'+solr.escape(options.schema))

      if(options.realm)
          queries.fieldQueries.push('realm_ss:'+solr.escape(options.realm))

      if(options.identifier)
        queries.fieldQueries.push("NOT identifier_s:" + solr.escape(options.identifier));

      if(options.government)
        queries.fieldQueries.push('government_s:'+solr.escape(options.government));

      if((options.searchText||'')!=''){
        var queryText
          queryText = '(' + solr.escape(options.searchText) + ')';
              
          if(options.query!='' && options.query != undefined)
            queries.query   += ' AND ('+(options.searchField||'text_EN_txt:') + queryText + ')'
          else 
            queries.query   = (options.searchField||'text_EN_txt:') + queryText;
      }

      return queries;

    } 

    function setMetaTags(){
      ngMeta.resetMeta();   
      var formOpenFor = 'New';
      var schemaName = $filter('schemaName')($filter('mapSchema')($scope.type));
      if($routeParams.identifier)   
        formOpenFor = 'Edit'
      ngMeta.setTitle(formOpenFor, ' | ' + schemaName);
    } 
    
    setMetaTags();

}]);

