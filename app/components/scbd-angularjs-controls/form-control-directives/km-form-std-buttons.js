import app from '~/app';
import angular from 'angular';
import template from 'text!./km-form-std-buttons.html';
import $ from 'jquery';
  ;
  //============================================================
  //
  //
  //============================================================
  app.directive('kmFormStdButtons', ["$q", "$timeout", function($q, $timeout) {
    return {
      restrict: 'EAC',
      template: template,
      replace: true,
      transclude: true,
      scope: {
        getDocumentFn: '&document',
        hideSave: '=?'
      },
      link: function($scope, $element) {
        $scope.errors = null;
        $scope.hideSave = $scope.hideSave || false;

        //BOOTSTRAP Dialog handling

        var qSaveDialog = $element.find("#dialogSave");
        var qCancelDialog = $element.find("#dialogCancel");

        $scope.saveDialogDefered = [];
        $scope.cancelDialogDefered = [];

        $scope.showSaveDialog = function(visible) {

          var isVisible = qSaveDialog.css("display") != 'none';

          if (visible == isVisible)
            return $q.when(isVisible);

          if (visible)
            $scope.updateSecurity();

          var defered = $q.defer();

          $scope.saveDialogDefered.push(defered);

          qSaveDialog.modal(visible ? "show" : "hide");

          return defered.promise;
        }

        $scope.showCancelDialog = function(visible) {
          if ($('form').filter('.dirty').length === 0) {
            $scope.$emit("documentClosed");
            return;
          }

          var isVisible = qCancelDialog.css("display") != 'none';

          if (visible == isVisible)
            return $q.when(isVisible);

          var defered = $q.defer();

          $scope.cancelDialogDefered.push(defered);

          qCancelDialog.modal(visible ? "show" : "hide");

          return defered.promise;
        };

        qSaveDialog.on('shown.bs.modal', function() {

          $timeout(function() {

            var promise = null;
            while ((promise = $scope.saveDialogDefered.pop()))
              promise.resolve(true);
          });
        });

        qSaveDialog.on('hidden.bs.modal', function() {

          $timeout(function() {

            var promise = null;
            while ((promise = $scope.saveDialogDefered.pop()))
              promise.resolve(false);
          });
        });

        qCancelDialog.on('shown.bs.modal', function() {

          $timeout(function() {

            var promise = null;
            while ((promise = $scope.cancelDialogDefered.pop()))
              promise.resolve(true);
          });
        });

        qCancelDialog.on('hidden.bs.modal', function() {

          $timeout(function() {

            var promise = null;
            while ((promise = $scope.cancelDialogDefered.pop()))
              promise.resolve(false);
          });
        });
      },
      controller: ["$scope", "IStorage", "editFormUtility", function($scope, storage, editFormUtility) {
        //====================
        //
        //====================
        $scope.updateSecurity = function() {
          $scope.security = {};
          $scope.loading = true;

          $q.when($scope.getDocumentFn()).then(function(document) {

            if (!document || !document.header)
              return;

            var identifier = document.header.identifier;
            var schema = document.header.schema;

            var a = storage.documents.exists(identifier).then(function(exist) {

              var q = exist ? storage.documents.security.canUpdate(document.header.identifier, schema) : storage.documents.security.canCreate(document.header.identifier, schema);

              return q.then(function(allowed) {
                $scope.security.canSave = allowed;
              });
            });

            var b = storage.drafts.exists(identifier).then(function(exist) {

              var q = exist ? storage.drafts.security.canUpdate(document.header.identifier, schema) : storage.drafts.security.canCreate(document.header.identifier, schema);

              return q.then(function(allowed) {
                $scope.security.canSaveDraft = allowed;
              });
            });

            return $q.all([a, b]);

          }).finally(function() {

            $scope.loading = false;
          });
        };


        //====================
        //
        //====================
        $scope.publish = function() {
          $scope.loading = true;

          var qDocument = $scope.getDocumentFn();
          var qReport = validate(qDocument);

          return $q.all([qDocument, qReport]).then(function(results) {

            var document = results[0];
            var validationReport = results[1];

            if (!document)
              throw "Invalid document";

            //Has validation errors ?
            if (validationReport && validationReport.errors && validationReport.errors.length > 0) {

              $scope.$emit("documentInvalid", validationReport);
            } else return $q.when(editFormUtility.publish(document)).then(function(documentInfo) {

              if (documentInfo.type == 'authority') {
                //in case of authority save the CNA as a contact in drafts
                saveAuthorityInContacts(documentInfo);
              }
              $scope.$emit("documentPublished", documentInfo, document);
              return documentInfo;

            });
          }).catch(function(error) {

            $scope.$emit("documentError", {
              action: "publish",
              error: error
            });

          }).finally(function() {

            return $scope.closeDialog();

          });
        };

        //====================
        //
        //====================
        $scope.publishRequest = function() {
          $scope.loading = true;

          var qDocument = $scope.getDocumentFn();
          var qReport = validate(qDocument);

          return $q.all([qDocument, qReport]).then(function(results) {

            var document = results[0];
            var validationReport = results[1];

            if (!document)
              throw "Invalid document";

            //Has validation errors ?
            if (validationReport && validationReport.errors && validationReport.errors.length > 0) {

              $scope.$emit("documentInvalid", validationReport);
            } else return $q.when(editFormUtility.publishRequest(document)).then(function(workflowInfo) {

              if (workflowInfo.type == 'authority') {
                //in case of authority save the CNA as a contact in drafts
                saveAuthorityInContacts(workflowInfo);
              }
              $scope.$emit("documentPublishRequested", workflowInfo, document);
              return workflowInfo;

            });
          }).catch(function(error) {

            $scope.$emit("documentError", {
              action: "publishRequest",
              error: error
            });

          }).finally(function() {

            return $scope.closeDialog();

          });
        };

        //====================
        //
        //====================
        $scope.saveDraft = function() {
          $scope.loading = true;

          return $q.when($scope.getDocumentFn()).then(function(document) {
            if (!document)
              throw "Invalid document";

            return editFormUtility.saveDraft(document);

          }).then(function(draftInfo) {

            if (draftInfo.type == 'authority') {
              //in case of authority save the CNA as a contact in drafts
              saveAuthorityInContacts(draftInfo);
            }
            $scope.$emit("documentDraftSaved", draftInfo);
            return draftInfo;

          }).catch(function(error) {

            $scope.$emit("documentError", {
              action: "saveDraft",
              error: error
            });

          }).finally(function() {

            return $scope.closeDialog();

          });
        };

        var saveAuthorityInContacts = function(draftInfo) {

          var document = $scope.getDocumentFn();
          if (!document)
            document = draftInfo;

          $q.when(document).then(function(document) {
            //replace the last char of authority doc GUID with C to create a new GUID for contact
            //this will help for easy update
            var id = '';
            if (draftInfo.identifier)
              id = draftInfo.identifier;
            else if (draftInfo.data.identifier)
              id = draftInfo.data.identifier;

            if (id === '') {
              console.log('identifier not found in document info passed');
              return;
            }

            id = id.substr(0, id.length - 1) + 'C';

            var qDocument = {
              header: {
                identifier: id,
                schema: "contact",
                languages: ["en"]
              },
              type: "CNA",
              government: document.government,
              source: id,
              organization: document.name,
              organizationAcronym: {
                en: 'NA'
              },
              city: document.city,
              country: document.country,
              phones: document.phones,
              emails: document.emails
            };

            if (document.address) qDocument.address = document.address;
            if (document.state) qDocument.state = document.state;
            if (document.postalCode) qDocument.postalCode = document.postalCode;
            if (document.websites) qDocument.websites = document.websites;
            if (document.faxes) qDocument.faxes = document.faxes;

            editFormUtility.saveDraft(qDocument);
          });
        };

        //====================
        //
        //====================
        $scope.close = function() {
          return $scope.closeDialog().then(function() {

            $scope.$emit("documentClosed")

          }).catch(function(error) {

            $scope.$emit("documentError", {
              action: "close",
              error: error
            });

          }).finally(function() {

            return $scope.closeDialog();

          });
        };

        //====================
        //
        //====================
        function validate(document) {

          return $q.when(document).then(function(document) {

            if (!document)
              throw "Invalid document";

            return storage.documents.validate(document);

          }).then(function(result) {

            return result.data || result;
          });
        }

        //====================
        //
        //====================
        $scope.checkErrors = function() {
          $scope.errors = "";

          if ($scope.errors.trim() === "")
            $scope.errors = null;
        };

        //====================
        //
        //====================
        $scope.closeDialog = function() {
          return $q.all([$scope.showSaveDialog(false), $scope.showCancelDialog(false)]).finally(function() {
            $scope.loading = false;
          });
        };
      }]
    };
  }]);

