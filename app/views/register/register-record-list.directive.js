define(['app', 'underscore', '/app/js/common.js',
       '/app/services/search-service.js'],
function(app, _) {
    "use strict";

    app.directive("registerRecordList", ["$timeout", "commonjs", "bootbox", "$http", "IWorkflows", "IStorage",'$rootScope', 'searchService', 'toastr',
        function($timeout, commonjs, bootbox, $http, IWorkflows, IStorage, $rootScope, searchService, toastr) {

            return {
                restrict: "EA",
                templateUrl: "/app/views/register/register-record-list.directive.html",
                replace: true,
                transclude: false,
                require :   '^^absRegister',
                scope: {
                    schema: "@schema",
                },
                link: function($scope, $element, attrs, absRegisterCtrl) {

                    var deleteRecordModel = $element.find("#deleteRecordModel");
                    var duplicateRecordModel = $element.find("#duplicateRecordModel");
                    var deleteWorkflowRequestMadal = $element.find("#deleteWorkflowRequestModal");

                    $element.find("[data-toggle='tooltip']").tooltip({
                        trigger: 'hover'
                    });


                    $scope.$watch("recordToDelete", function(val) {
                        if (val && !deleteRecordModel.is(":visible")) {
                            deleteRecordModel.modal("show");
                        }
                        if (!val && deleteRecordModel.is(":visible")) {
                            deleteRecordModel.modal("hide");
                        }
                    });

                    $scope.$watch("recordToDuplicate", function(val) {
                        if (val && !duplicateRecordModel.is(":visible")) {
                            duplicateRecordModel.modal("show");
                        }
                        if (!val && duplicateRecordModel.is(":visible")) {
                            duplicateRecordModel.modal("hide");
                        }
                    });
                    $scope.$watch("recordForDeleteWorkflowRequest", function(val) {
                        if (val && !deleteWorkflowRequestMadal.is(":visible")) {
                            deleteWorkflowRequestMadal.modal("show");
                        }
                        if (!val && deleteWorkflowRequestMadal.is(":visible")) {
                            deleteWorkflowRequestMadal.modal("hide");
                        }
                    });

                    deleteRecordModel.on("hidden.bs.modal", function() {
                        $timeout(function() {
                            $scope.recordToDelete = null; //clear on backdrop click
                        });
                    });

                    duplicateRecordModel.on("hidden.bs.modal", function() {
                        $timeout(function() {
                            $scope.recordToDuplicate = null; //clear on backdrop click
                        });
                    });
                    deleteWorkflowRequestMadal.on("hidden.bs.modal", function() {
                        $timeout(function() {
                            $scope.recordForDeleteWorkflowRequest = null; //clear on backdrop click
                        });
                    });

                    $scope.refreshFacets = function(){
                        absRegisterCtrl.refreshFacets();
                    };
                },
                controller: ["$scope", "$q", "IStorage", "$http", "guid", "editFormUtility", "$filter", "$routeParams",
                function($scope, $q, storage, $http, guid, editFormUtility, $filter, $routeParams) {
                    //use for documents reference lookup
                    var schemaFieldsMapping = {
                        contact     : [],
                        authority : ['contacts', 'absPolicyBasisForCompetencyRef']
                    };
                    var schemaReferenceMapping = {
                        contact     : [],
                        authority : ['contacts', 'absPolicyBasisForCompetencyRef']
                    };

                    $scope.orderBy = ['-updatedOn'];

                    $scope.toggleOrderBy = function(key) {
                        if (key == $scope.orderBy[0].substr(1))
                            $scope.orderBy = (($scope.orderBy[0].substr(0, 1) == '+') ? '-' : '+') + key;
                        else
                            $scope.orderBy = ['-' + key];

                        $('.ordericon').remove();
                        var direction = (($scope.orderBy[0].substr(0, 1) == '-') ? 'down' : 'up');
                        $('#' + key.split('|')[0] + 'Header').append(' <span class="ordericon glyphicon glyphicon-chevron-' + direction + ' text-primary"></span>');
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.edit = function(record) {

                        $scope.$emit("editDocument", record.type, record.identifier);
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.newDoc = function() {

                        $scope.$emit("newDocument", $scope.schema);
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.askDelete = function(record) {

                        if (commonjs.isIAC() && !commonjs.isAnyOtherRoleThenIAC()) {
                            $scope.iacCantDelete = true;
                            $scope.cantDelete = false;
                            $scope.recordToDelete = "0";

                        }
                        if (record.type == 'absPermit' && $scope.isPublished(record)) {
                            //cant delete only modify
                            $scope.pilotDelete = true;
                            $scope.cantDelete = true;
                            $scope.recordToDelete = "0"; //TODO:only for pilot phase
                        } else {
                            $scope.recordToDelete = record;
                            $scope.cantDelete = false;
                        }

                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.deleteDraft = function(record) {


                        $scope.loading = true;

                        return $q.when(storage.drafts.delete(record.identifier)).then(function() {

                            recordDeleted(record);
                            $scope.recordToDelete = null;

                        }).finally(function() {
                            delete $scope.loading
                        });
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.deleteRecord = function(record) {

                        $scope.loading = true;

                        return $q.when(storage.documents.delete(record.identifier)).then(function() {
                            //alert($("#record" + record.identifier));
                            // $("#record" + record.identifier).toggle('Explode');
                            //
                            // $timeout(function(){
                            $scope.$emit("documentDeleted", record);
                            $scope.recordToDelete = null;
                            // },1500);

                        }).finally(function() {
                            delete $scope.loading
                        });
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.schemaFilter = function(entity) {

                        var ok = !!entity;

                        if ($scope.schema)
                            ok = ok && entity.type == $scope.schema;

                        return ok;
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.isDraft = function(entity) {
                        return entity && entity.workingDocumentCreatedOn;
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.isRequest = function(entity) {
                        return entity && entity.workingDocumentLock;
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.isPublished = function(entity) {
                        return entity && entity.documentID;
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    var workflowRE = /^workflow\-(.*)/g

                    $scope.getWorkflowID = function(entity) {

                        if (entity && entity.workingDocumentLock && entity.workingDocumentLock.lockID)
                            return entity.workingDocumentLock.lockID.replace(workflowRE, "$1");

                        return "";
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.loadDocument = function(item) {

                        if (item.data)
                            return;

                        item.data = {
                            'schema': item.type,
                            'url_ss': '',
                            'data': []
                        };
                        // $http.get("/api/v2013/documents/"+item.identifier).then(function (result) {
                        //     item.data = result.data;
                        //
                        $http.get("/api/v2013/documents/" + item.identifier + "?info").then(function(result) {
                            item.data = angular.copy(result.data.body);
                            item.data.info = result.data;
                            delete item.data.info.body;
                        });
                        // 	// if(item.type='absPermit'){
                        // 	// 	console.log($scope.records);
                        // 	// }
                        //
                        // });
                        //href="/database/record?documentID={{record.documentID}}"
                    }

                    $scope.showAddButton = function() {

                        return commonjs.isUserInRole($rootScope.getRoleName('AbsPublishingAuthorities')) ||
                            commonjs.isUserInRole($rootScope.getRoleName('AbsNationalAuthorizedUser')) ||
                            commonjs.isUserInRole($rootScope.getRoleName('AbsNationalFocalPoint')) ||
                            commonjs.isUserInRole($rootScope.getRoleName('abschiac')) ||
                            commonjs.isUserInRole($rootScope.getRoleName('AbsAdministrator')) ||
                            commonjs.isUserInRole($rootScope.getRoleName('Administrator')) ||
                            _.contains(['resource', 'modelContractualClause','communityProtocol'],$scope.schema);

                    }

                    $scope.isIAC = function() {
                        return commonjs.isUserInRole($rootScope.getRoleName('abschiac'));
                    }

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.askDuplicate = function(record) {

                        $scope.recordToDuplicate = record;

                    };

                    $scope.duplicate = function(entity) {
                        $scope.loading = true;
                        var document;
                        //	console.log(entity);
                        if ($scope.isDraft(entity) || $scope.isRequest(entity)) {
                            document = storage.drafts.get(entity.identifier)
                        } else if ($scope.isPublished(entity)) {
                            document = storage.documents.get(entity.identifier);
                        }

                        return $q.when(document).then(function(document) {
                            //console.log(document);
                            if (!document.data)
                                throw "Invalid document";

                            document = document.data;

                            document.header.identifier = guid();

                            return editFormUtility.saveDraft(document);

                        }).then(function(draftInfo) {
                            recordDuplicated(draftInfo)
                                //$scope.records.push(draftInfo);
                            $timeout(function() {
                                highlight("#record" + draftInfo.identifier); //.effect( "shake" );
                            }, 500)


                            return draftInfo;

                        }).catch(function(error) {
                            if (error.error.indexOf('Not authorized to save draft') >= 0) {
                                bootbox.alert('You are not authorized to create duplicate records.')
                            }
                            $scope.$emit("documentError", {
                                action: "duplicate",
                                error: error
                            })

                        }).finally(function() {
                            $scope.loading = false;
                            $scope.recordToDuplicate = null;
                        });
                    };

                    $scope.$on('shakeUpdatedRecord', function(evt, document) {
                        //console.log(document);
                        //$("#record" + document.identifier).toggle('toggleUpdated',1000);
                        highlight("#record" + document.identifier);
                        //$("#record" + document.identifier).toggle('explode',{},500);
                    });

                    $scope.updateWorkflowList = function(document, workflowInfo) {

                        var currentDocument = _.first(_.filter($scope.records, function(doc) {
                            return doc.identifier == document.header.identifier;
                        }));

                        if (currentDocument)
                            currentDocument.isUpdating = true;

                        $scope.refreshworkflowRecord(document, workflowInfo)
                    };

                    $scope.askDeleteWorkflowRequest = function(record){
                        $scope.recordForDeleteWorkflowRequest = record;
                    };

                    $scope.deleteWorkflowRequest = function(record){
                        console.log(record);
    	                $scope.loading = true;
                        IWorkflows.cancel(record.workingDocumentLock.lockID.replace('workflow-',''), {'action':'cancel'})
                        .then(function(data){
                            $scope.$emit("documentWorkflowRequestDeleted", record);
                            $timeout(function() {
                                highlight("#record" + record.identifier);
                            }, 500);
                            $scope.recordForDeleteWorkflowRequest = null;
                        })
                        .finally(function(){
                          $scope.loading = false;
                        });
                    };

                    $scope.refreshworkflowRecord = function(document, workflowInfo) {
                        if (workflowInfo.workflowId) {
                            IWorkflows.get(workflowInfo.workflowId).then(function(data) {
                                if (data.state == 'completed') {
                                    var currentDocument = _.first(_.filter($scope.records, function(doc) {
                                        return doc.identifier == document.header.identifier;
                                    }));
                                    IStorage.documents.get(document.header.identifier, {
                                        'info': true
                                    }).then(function(data) {

                                        currentDocument.revision = data.data.revision;
                                        currentDocument.updatedBy = data.data.updatedBy;
                                        currentDocument.updatedOn = data.data.updatedOn;
                                        currentDocument.workingDocumentBody = data.data.workingDocumentBody;
                                        currentDocument.workingDocumentCreatedBy = data.data.workingDocumentCreatedBy;
                                        currentDocument.workingDocumentCreatedOn = data.data.workingDocumentCreatedOn;
                                        currentDocument.workingDocumentID = data.data.workingDocumentID;
                                        currentDocument.workingDocumentLock = data.data.workingDocumentLock;
                                        currentDocument.workingDocumentMetadata = data.data.workingDocumentMetadata;
                                        currentDocument.workingDocumentOwner = data.data.workingDocumentOwner;
                                        currentDocument.workingDocumentSize = data.data.workingDocumentSize;
                                        currentDocument.workingDocumentSummary = data.data.workingDocumentSummary;
                                        currentDocument.workingDocumentTitle = data.data.workingDocumentTitle;
                                        currentDocument.workingDocumentUpdatedBy = data.data.workingDocumentUpdatedBy;
                                        currentDocument.workingDocumentUpdatedOn = data.data.workingDocumentUpdatedOn;
                                        $scope.$emit('taskAction', {
                                            document: document,
                                            workflowAction: workflowInfo.activity
                                        });
                                    });
                                } else {
                                    $timeout(function() {
                                        $scope.refreshworkflowRecord(document, workflowInfo);
                                    }, 2000);
                                }
                            });
                        }
                    }

                    $scope.refreshList = function(schema){
                        loadRecords();
                        // $scope.$emit("refreshDocumentList", {document_type:schema});
                    };

                    $scope.showReference = function(schema){
                        //TODO: clear all fitlers

                        $scope.loading = true;


                            var qDocuments = storage.documents
                                        .query("(type eq '" + schema + "')",undefined, {body: true});

                            $q.when(qDocuments)
                              .then(function(results) {
                                  _.each(results.data.Items, function(document){

                                     var listRecord =  _.findWhere($scope.records, {identifier:document.identifier});
                                     if(listRecord){
                                          listRecord.body = document.body;
                                          var queries = [];
                                          var documentBody = listRecord.body;
                                            var fields = schemaFieldsMapping[schema];
                                            _.map(fields, function(field){
                                                if(documentBody[field]){
                                                    if(angular.isArray(documentBody[field])){
                                                        _.each(documentBody[field], function(fieldDocument){
                                                            console.log('Arrays ' + fieldDocument.identifier);
                                                            getDocument(fieldDocument, documentBody, field);
                                                        })
                                                    }
                                                    else{
                                                        console.log('object ' + documentBody[field].identifier);
                                                        getDocument(documentBody[field], documentBody, field);
                                                    }

                                                }
                                            });
                                    }
                                  });
                              })
                              .finally(function() {
                                  $scope.loading = false;
                                  $scope.displayReference = true;
                              });

                            // var filter = [];
                            // var qDocumentReference = storage.documentQuery
                            //             .body("(type eq '" + schema + "')", filter, {collection:"my"});
                            //
                            // $q.when(qDocumentReference)
                            //   .then(function(results) {
                            //         results.data.forEach(function(document) {
                            //             var lContact = contact.body;
                            //         });
                            //     })
                            //     .finally(function() {
                            //         $scope.loading = false;
                            //     });

                    };

                    function shake(div) {
                        var interval = 100,
                            distance = 20,
                            times = 10
                        $(div).css('position', 'relative');
                        for (var iter = 0; iter < (times + 1); iter++) {
                            $(div).animate({
                                left: ((iter % 2 == 0 ? distance : distance * -1))
                            }, interval);
                        } //for
                        $(div).animate({
                            left: 0
                        }, interval, function() {
                            $(div).css('position', 'inherit');
                        });

                    }

                    function highlight(obj) {
                        $('html, body').animate({
                            scrollTop: 0
                        }, 1000);
                        $(obj).toggleClass('highlight');
                        setTimeout(function() {
                            $(obj).toggle('fade');
                            $(obj).toggleClass('highlight');
                            $(obj).toggle('fade');
                        }, 2000);


                    }

                    function getDocument(fieldDocument, documentBody, field){

                        var revisionRegex =  /@([0-9]{1,3})/;
                        $q.when(storage.documents.get(fieldDocument.identifier.replace(revisionRegex,''), {info:true}))
                          .then(function(document){
                              var fieldRevision = fieldDocument.identifier.substr(fieldDocument.identifier.indexOf('@')+1,
                                                fieldDocument.identifier.length-(fieldDocument.identifier.indexOf('@')+1))
                              fieldDocument.document = document.data;
                              if(fieldDocument.document.revision > Number(fieldRevision)){
                                  if(!documentBody.badRevisions)
                                    documentBody.badRevisions = [];
                                  documentBody.badRevisions
                                  .push({'field' : field, 'currentRevision' : fieldDocument.document.revision,
                                         'fieldRevision' : Number(fieldRevision)
                                    });
                              }
                          });
                    }

                    function loadDocumentReference(){

                        var documentIds = _.pluck($scope.records,'identifier');
                        //'identifier_s, _revision_i'
                        if(documentIds.length > 0){
                            var searchQuery = {
                                fields: 'recordEReference_ss, identifier_s',
                                query : 'identifier_s :(' + documentIds.join(' ') + ')'
                            };

                            searchService.list(searchQuery)
                                .then(function(data){
                                    console.log(data);
                                });
                        }
                    }

                    function loadRecords() {
                        $scope.loading = true;
                        var schema = $filter("mapSchema")($routeParams.document_type);

                        if (schema === null || schema == undefined)
                            return;

                        $("a[role*='button']").toggleClass('ui-disabled');
                        if (!$rootScope.user.isAuthenticated)
                            return $scope.records = null;

                        var qAnd = [];
                        qAnd.push("(type eq '" + schema + "')");

                        var qDocuments = storage.documents.query(qAnd.join(" and ") || undefined, undefined, {
                            cache: false
                        });

                        var draftParams = {
                            cache: false
                        };
                        if (schema == "contact")
                            draftParams.body = true;

                        var qDrafts = storage.drafts.query(qAnd.join(" and ") || undefined, draftParams);

                        $q.all([qDocuments, qDrafts]).then(function(results) {
                                $scope.records = [];
                                var documents = results[0].data.Items;
                                var drafts = results[1].data.Items;

                                var map = {};

                                _.map(documents, function(o) {
                                    map[o.identifier] = o;
                                });
                                _.map(drafts, function(o) {
                                    map[o.identifier] = o;
                                });

                                _.values(map).forEach(function(row) {
                                        $scope.records.push(row);
                                    })
                                $("a[role*='button']").toggleClass('ui-disabled');
                                return $scope.records;
                            })
                            .finally(function(){
                                $scope.loading = false;
                            });
                    }
                    function recordDeleted(doc){
                            for (var i = 0; i <= $scope.records.length; ++i) {
                                 if ($scope.records[i] == doc) {
                                     $scope.records.splice(i, 1);
                                    $scope.refreshFacets();
                                 }
                            }
                            toastr.info('<h1>Record deleted.</h1>', {
                                allowHtml: true
                            });
                    }

                    function recordDuplicated(doc){
                        $scope.records.push(doc);
                        $scope.refreshFacets();
                    }

                    loadRecords();
                }]
            };
        }
    ]);

});
