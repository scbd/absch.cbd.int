define([
    'app',
    '/app/views/forms/edit/km-form-buttons.js',
    '/app/views/forms/edit/editFormUtility.js',
    '/app/views/forms/edit/field-embed-contact.directive.js',
    '/app/views/forms/edit/edit-contact-base.directive.js',
    '/app/js/directives/forms/form-controls.js',
    '/app/views/forms/view/view-contact-reference.directive.js',
    '/app/views/forms/view/view-organization-reference.directive.js',
    '/app/views/forms/view/record-loader.directive.html.js',
    '/app/views/forms/view/view-organization.directive.js',
    '/app/views/forms/view/view-organization-reference.directive.js',
    '/app/views/forms/view/view-certificate-directive.html.js',
  ], function (app) {

  app.controller("editController", ["$rootScope", "$scope", "authHttp", "$window", "guid", "$filter", "Thesaurus", "$q", "$location", "IStorage", "authentication", "Enumerable", "editFormUtility", "$routeParams", "$timeout", function ($rootScope, $scope, $http, $window, guid, $filter, thesaurus, $q, $location, storage, authentication, Enumerable, editFormUtility, $routeParams, $timeout) {

    $scope.type = $rootScope.document_types[$routeParams.document_type];

    $scope.status   = "";
    $scope.error    = null;

    $scope.tab      = "edit";
    $scope.review   = { locale: "en" };

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
    $scope.$on("documentInvalid", function(){
      $scope.tab = "review";
    });

    //==================================
    //
    //==================================
    $scope.$watch("tab", function(tab) {
      if(tab == "review") 
        validate();
    });
    
    
    $scope.isOtherSelected = function(document){
      
       return document &&  Enumerable.from(document).any(function(type){
              return type.identifier == "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED";
            });
    }


    //==================================
    //
    //==================================
    $scope.isInLibrary = function(name, document) {
      document = document || $scope.document;

      if (!document || !document.libraries)
        return false;

      var qLibraries = Enumerable.from(document.libraries);

      if(name=="chm"  ) return qLibraries.any(function(o){ return o.identifier == "cbdLibrary:chm"    });
      if(name=="absch") return qLibraries.any(function(o){ return o.identifier == "cbdLibrary:abs-ch" });
      if(name=="bch"  ) return qLibraries.any(function(o){ return o.identifier == "cbdLibrary:bch"    });
      if(name=="ebsa" ) return qLibraries.any(function(o){ return o.identifier == "cbdLibrary:ebsa"   });

      return false;
    }

    
    //==================================
    //
    //==================================
    $scope.isJurisdictionRegional = function(document) {
      document = document || $scope.document;

      if (!document || !document.jurisdiction)
        return false;

      var qJurisdiction = Enumerable.from([document.jurisdiction]);

      return qJurisdiction.any(function (o) { return o.identifier == "528B1187-F1BD-4479-9FB3-ADBD9076D361" });
    }

    //==================================
    //
    //==================================
    $scope.isJurisdictionSubNationalOrCommunity = function (document) {
      document = document || $scope.document;

      if (!document || !document.jurisdiction)
        return false;

      var qJurisdiction = Enumerable.from([document.jurisdiction]);

      var response  = qJurisdiction.any(function (o) { return o.identifier == "DEBB019D-8647-40EC-8AE5-10CA88572F6E" });
          response |= qJurisdiction.any(function (o) { return o.identifier == "9627DF2B-FFAC-4F85-B075-AF783FF2A0B5" });
          response |= qJurisdiction.any(function (o) { return o.identifier == "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED" });

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
    function validate() {

      $scope.validationReport = null;

      var oDocument = $scope.reviewDocument = $scope.getCleanDocument();

      return storage.documents.validate(oDocument).then(function(success) {
      
        $scope.validationReport = success.data;
        return !!(success.data && success.data.errors && success.data.errors.length);

      }).catch(function(error) {

        $scope.onError(error.data);
        return true;

      });
    }

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
    $scope.loadRecords = function(identifier, schema) {

      if (identifier) { //lookup single record
        var deferred = $q.defer();

        storage.documents.get(identifier, { info: "" })
          .then(function(r) {
            deferred.resolve(r.data);
          }, function(e) {
            if (e.status == 404) {
              storage.drafts.get(identifier, { info: "" })
                .then(function(r) { deferred.resolve(r.data)},
                    function(e) { deferred.reject (e)});
            }
            else {
              deferred.reject (e)
            }
          });
        return deferred.promise;
      }

      //Load all record of specified schema;

      var sQuery = "type eq '" + encodeURI(schema) + "'";

      return $q.all([storage.documents.query(sQuery, null, { cache: true }), 
               storage.drafts   .query(sQuery, null, { cache: true })])
        .then(function(results) {
          var qResult = Enumerable.from (results[0].data.Items)
                      .union(results[1].data.Items, "$.identifier");
          return qResult.toArray();
        });
    }

    $scope.setDocument = function(additionalParams, excludeGovernment) {
      var qDocument;
      if($routeParams.identifier)
        qDocument = editFormUtility.load($routeParams.identifier, $routeParams.document_type);
      else {
        qDocument = {
          header: {
            identifier: guid(),
            schema   : $routeParams.document_type,
            languages: ["en"]
          },
          government: $scope.userGovernment() ? { identifier: $scope.userGovernment() } : undefined,
        };
        for(var key in additionalParams)
          qDocument[key] = additionalParams[key];
        if(excludeGovernment)
          delete qDocument['government'];
      }


      $q.when(qDocument).then(function(doc) {
        console.log('the doc: ', doc);

        $scope.tab    = "edit";
        $scope.status = "ready";
        $scope.document = doc;
        
        $scope.$emit("loadDocument", {identifier:doc.header.identifier,schema:doc.header.schema});

      }).catch(function(err) {

        $scope.onError(err.data, err.status)
        throw err;

      });
    };

    var consideringClosing = false;
    //TODO: burn angular... essentially the issue is that this function is called once the ng-include finished with the form html, but that form html still needs to be parsed and the directives still need to load THEIR templates, so those inputs aren't in the form yet... hence while change isn't triggering.
    var attachEvents = _.once(function() {
      $timeout(function() {
        $('input').change(function() {
          $(this).closest('form').addClass('dirty');
        });
        $('#dialogCancel').find('.closeWithoutSaving').click(function() {
          consideringClosing = true;
        });
        $('.cancelClose').click(function() {
          consideringClosing = false;
        });
        $('#dialogSave').on('shown.bs.modal', function() {
          consideringClosing = true;
        });
        $('#dialogDuplicate').on('shown.bs.modal', function() {
          consideringClosing = true;
        });
      }, 2000);
    });
    $rootScope.$on('$includeContentLoaded', function(event) {
      if($('#dialogCancel').length != 0)
        attachEvents();
    });
    function confirmLeaving(evt, next, current) {
      if(consideringClosing || $('form').filter('.dirty').length == 0)
        return;

      evt.preventDefault();

      $('#dialogCancel').modal('show');
      $rootScope.next_url = next;
      consideringClosing = true;
    }

    $scope.$on('$locationChangeStart', confirmLeaving);
  }]);
});
