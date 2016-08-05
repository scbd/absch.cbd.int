define(['app', 'underscore','scbd-angularjs-services', 'scbd-angularjs-filters', '/app/js/common.js',
    '/app/services/search-service.js', '/app/services/role-service.js','scbd-angularjs-controls',
    './directives/register-top-menu.js', '../directives/block-region-directive.js',
	'/app/views/forms/edit/editFormUtility.js', '/app/views/register/directives/record-type-header.html.js',
    '/app/services/local-storage-service.js'
],
    function (app, _) {
        "use strict";

        app.controller("registerRecordList", ["$timeout", "commonjs", "bootbox", "$http", "IWorkflows", "IStorage", '$rootScope',
            'searchService', 'toastr', "$routeParams", "roleService", "$scope", "$q", "guid", "editFormUtility", "$filter", "$element", "breadcrumbs", "localStorageService",
            function ($timeout, commonjs, bootbox, $http, IWorkflows, storage, $rootScope, searchService, toastr, $routeParams, roleService,
                $scope, $q, guid, editFormUtility, $filter, $element, breadcrumbs, localStorageService) {

                $scope.orderBy = ['-updatedOn'];

                var deleteRecordModel = $element.find("#deleteRecordModel");
                var duplicateRecordModel = $element.find("#duplicateRecordModel");
                var deleteWorkflowRequestMadal = $element.find("#deleteWorkflowRequestModal");
                $scope.amendmentDocument = {locales:['en']};

                $element.find("[data-toggle='tooltip']").tooltip({
                    trigger: 'hover'
                });

                if ($routeParams.document_type) {
                    var type =  $filter("mapSchema")($routeParams.document_type);
                    $scope.schema = type;
                    breadcrumbs.options = {
                        'document_type': $filter("schemaName")(type)
                    };
                }


                $scope.$watch("recordToDelete", function (val) {
                    if (val && !deleteRecordModel.is(":visible")) {
                        deleteRecordModel.appendTo('body').modal("show");
                    }
                    if (!val && deleteRecordModel.is(":visible")) {
                        deleteRecordModel.modal("hide");
                    }
                });

                $scope.$watch("recordToDuplicate", function (val) {
                    if (val && !duplicateRecordModel.is(":visible")) {
                        duplicateRecordModel.appendTo('body').modal("show");
                    }
                    if (!val && duplicateRecordModel.is(":visible")) {
                        duplicateRecordModel.modal("hide");
                    }
                });
                $scope.$watch("recordForDeleteWorkflowRequest", function (val) {
                    if (val && !deleteWorkflowRequestMadal.is(":visible")) {
                        deleteWorkflowRequestMadal.appendTo('body').modal("show");
                    }
                    if (!val && deleteWorkflowRequestMadal.is(":visible")) {
                        deleteWorkflowRequestMadal.modal("hide");
                    }
                });

                deleteRecordModel.on("hidden.bs.modal", function () {
                    $timeout(function () {
                        $scope.recordToDelete = null; //clear on backdrop click
                        $scope.security = undefined;
                    });
                });

                duplicateRecordModel.on("hidden.bs.modal", function () {
                    $timeout(function () {
                        $scope.recordToDuplicate = null; //clear on backdrop click
                    });
                });
                deleteWorkflowRequestMadal.on("hidden.bs.modal", function () {
                    $timeout(function () {
                        $scope.recordForDeleteWorkflowRequest = null; //clear on backdrop click
                    });
                });

                $scope.$on('$destroy', function () {
                    $('#deleteRecordModel').remove();
                    $('#duplicateRecordModel').remove();
                    $('#deleteWorkflowRequestModal').remove();
                });
                $scope.toggleOrderBy = function (key) {
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
                $scope.edit = function (record) {

                    $scope.$emit("editDocument", record.type, record.identifier);
                };

                //============================================================
                //
                //
                //============================================================
                $scope.newDoc = function () {

                    $scope.$emit("newDocument", $scope.schema);
                };

                //============================================================
                //
                //
                //============================================================
                $scope.askDelete = function (record) {

                    if (roleService.isIAC() && !roleService.isAnyOtherRoleThanIAC()) {
                        $scope.iacCantDelete = true;
                        $scope.cantDelete = false;
                        $scope.recordToDelete = "0";
                        $scope.security = undefined;

                    }
                    if (record.type == 'absPermit' && $scope.isPublished(record)) {
                        $scope.loading = true;
                        $q.when(storage.documents.get(record.identifier))
                        .then(function (result) {
                            $scope.pilotDelete = true;
                            $scope.cantDelete = true;
                            $scope.recordToDelete = record; //TODO:only for pilot phase'
                            $scope.recordToDelete.document = result.data;
                            $scope.recordToDelete.document.amendmentDescription = undefined;
                        }).finally(function(){$scope.loading=false;});
                    } else {
                        $scope.recordToDelete = record;
                        $scope.cantDelete = false;
                    }

                    $q.when(storage.documents.security.canDelete(record.identifier, record.type))
                    .then(function (allowed){
                        $scope.security = {canDelete : allowed };
                    })

                };

                //============================================================
                //
                //
                //============================================================
                $scope.deleteDraft = function (record) {


                    $scope.loading = true;

                    return $q.when(storage.drafts.delete(record)).then(function () {

                        recordDeleted(record);
                        $scope.recordToDelete = null;
                        $scope.security = undefined;

                    }).finally(function () {
                        delete $scope.loading
                    });
                };

                //============================================================
                //
                //
                //============================================================
                $scope.deleteRecord = function (record) {

                    $scope.loading = true;

                    return $q.when(editFormUtility.deleteDocument(record, $scope.additionalInfo))
                    .then(function (workflowInfo) {
                        localStorageService.set('workflow-activity-status', {
                            identifier : record.identifier, type:'delete',
                            workflowId : workflowInfo._id
                        });
                        record.workflowActivityStatus == 'pending';

                        $scope.$emit("documentDeleted", record);
                        $scope.recordToDelete = null;
                        $scope.security = undefined;

                    }).finally(function () {
                        delete $scope.loading
                    });
                };

                $scope.revokeRecord = function(record){
                    if(!record.document)
                        return;
                    if(!record.document.amendmentDescription || _.values(record.document.amendmentDescription).length == 0)
                        return record.showRevokeError = true;
                    
                    $scope.loading = true;
                    var document = record.document;
                    document.amendmentIntent = 1;
                    record.showRevokeError = false;

                    return $q.when(editFormUtility.publishRequest(document))
                            .then(function (document) { 
                                
                                $scope.$emit("documentDeleted", record);
                                $scope.amendmentDocument = {locales:['en']};
                                $scope.recordToDelete = null;

                            }).finally(function () {
                                delete $scope.loading
                            });
                }

                //============================================================
                //
                //
                //============================================================
                $scope.schemaFilter = function (entity) {

                    var ok = !!entity;

                    if ($scope.schema)
                        ok = ok && entity.type == $scope.schema;

                    return ok;
                };

                //============================================================
                //
                //
                //============================================================
                $scope.isDraft = function (entity) {
                    return entity && entity.workingDocumentCreatedOn && !entity.workingDocumentLock;
                };

                //============================================================
                //
                //
                //============================================================
                $scope.isRequest = function (entity) {
                    return entity && entity.workingDocumentLock;
                };

                $scope.isMyRecord = function (entity) {
                    return entity && entity.workingDocumentLock &&
                        entity.workingDocumentLock.lockedBy.userID == $rootScope.user.userID;
                };

                $scope.isPublishingAuthority = function (entity) {
                    return entity && entity.workingDocumentLock &&
                        (roleService.isAbsPublishingAuthority() || roleService.isAbsNationalFocalPoint());
                };
                //============================================================
                //
                //
                //============================================================
                $scope.isPublished = function (entity) {
                    return entity && entity.documentID;
                };

                if ($routeParams.status) {
                    var status = $routeParams.status;
                    if (status === 'published')
                        $scope.statusFilter = $scope.isPublished;
                    if (status === 'drafts' || status === 'draft')
                        $scope.statusFilter = $scope.isDraft;
                    if (status === 'requests' || status === 'request')
                        $scope.statusFilter = $scope.isRequest;
                }

                //============================================================
                //
                //
                //============================================================
                var workflowRE = /^workflow\-(.*)/g

                $scope.getWorkflowID = function (entity) {

                    if (entity && entity.workingDocumentLock && entity.workingDocumentLock.lockID)
                        return entity.workingDocumentLock.lockID.replace(workflowRE, "$1");

                    return "";
                };

                //============================================================
                //
                //
                //============================================================
                $scope.loadDocument = function (item) {

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
                    $http.get("/api/v2013/documents/" + item.identifier + "?info").then(function (result) {
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

                $scope.showAddButton = function () {

                    return roleService.isAbsPublishingAuthority() ||
                        roleService.isAbsNationalAuthorizedUser() ||
                        roleService.isAbsNationalFocalPoint() ||
                        roleService.isIAC() ||
                        roleService.isAbsAdministrator() ||
                        roleService.isAdministrator() ||
                        _.contains(['resource', 'modelContractualClause', 'communityProtocol', 'capacityBuildingResource', 'capacityBuildingInitiative'], $scope.schema);

                }

                $scope.isIAC = function () {
                    return roleService.isIAC();
                }

                //============================================================
                //
                //
                //============================================================
                $scope.askDuplicate = function (record) {

                    $scope.recordToDuplicate = record;

                };

                $scope.duplicate = function (entity) {
                    $scope.loading = true;
                    var document;
                    //	console.log(entity);
                    if ($scope.isDraft(entity) || $scope.isRequest(entity)) {
                        document = storage.drafts.get(entity.identifier)
                    } else if ($scope.isPublished(entity)) {
                        document = storage.documents.get(entity.identifier);
                    }

                    return $q.when(document).then(function (document) {
                        //console.log(document);
                        if (!document.data)
                            throw "Invalid document";

                        document = document.data;

                        document.header.identifier = guid();

                        return editFormUtility.saveDraft(document);

                    }).then(function (draftInfo) {
                        recordDuplicated(draftInfo)
                        //$scope.records.push(draftInfo);
                        $timeout(function () {
                            highlight("#record" + draftInfo.identifier); //.effect( "shake" );
                        }, 500)


                        return draftInfo;

                    }).catch(function (error) {
                        if (error.error.indexOf('Not authorized to save draft') >= 0) {
                            bootbox.alert('You are not authorized to create duplicate records.')
                        }
                        $scope.$emit("documentError", {
                            action: "duplicate",
                            error: error
                        })

                    }).finally(function () {
                        $scope.loading = false;
                        $scope.recordToDuplicate = null;
                    });
                };

                $scope.$on('shakeUpdatedRecord', function (evt, document) {
                    //console.log(document);
                    //$("#record" + document.identifier).toggle('toggleUpdated',1000);
                    highlight("#record" + document.identifier);
                    //$("#record" + document.identifier).toggle('explode',{},500);
                });

                $scope.askDeleteWorkflowRequest = function (record) {
                    $scope.recordForDeleteWorkflowRequest = record;
                };

                $scope.deleteWorkflowRequest = function (record) {
                    console.log(record);
                    $scope.loading = true;
                    IWorkflows.cancel(record.workingDocumentLock.lockID.replace('workflow-', ''), { 'action': 'cancel' })
                        .then(function (data) {
                            $scope.$emit("documentWorkflowRequestDeleted", record);
                            $timeout(function () {
                                highlight("#record" + record.identifier);
                            }, 500);
                            $scope.recordForDeleteWorkflowRequest = null;
                        })
                        .finally(function () {
                            $scope.loading = false;
                        });
                };

                $scope.refreshList = function (schema) {
                    loadRecords();
                    // $scope.$emit("refreshDocumentList", {document_type:schema});
                };

                function highlight(obj) {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 1000);
                    $(obj).toggleClass('highlight');
                    setTimeout(function () {
                        $(obj).toggle('fade');
                        $(obj).toggleClass('highlight');
                        $(obj).toggle('fade');
                    }, 2000);


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
                    
                    var publishedParams = {
                        cache: false
                    };
                    if (schema == "contact")
                        publishedParams.body = true;
                        
                    var qDocuments = storage.documents.query(qAnd.join(" and ") || undefined, undefined, publishedParams);

                    var draftParams = {
                        cache: false
                    };
                    if (schema == "contact")
                        draftParams.body = true;

                    var qDrafts = storage.drafts.query(qAnd.join(" and ") || undefined, draftParams);

                    $q.all([qDocuments, qDrafts, getRevokedDocuments()]).then(function (results) {
                        $scope.records = [];
                        var documents = results[0].data.Items;
                        var drafts = results[1].data.Items;

                        var wokflowActive = localStorageService.get('workflow-activity-status');
                        var revoked = results[2].data.response.docs;

                        var map = {};

                        _.map(documents, function (o) {
                            map[o.identifier] = o;
                        });
                        _.map(drafts, function (o) {
                            map[o.identifier] = o;
                        });

                        _.values(map).forEach(function (row) {
                           //waiting for workflow status from socketIO
                            if(wokflowActive && wokflowActive.identifier == row.identifier){
                                if(!row.workingDocumentLock){
                                    row.workflowActivityStatus =  'pending';
                                    verifyWorkflowStatus(wokflowActive.workflowId, row);
                                }else{
                                    localStorageService.remove('workflow-activity-status');
                                }
                            }                         
                            if(_.some(revoked, function(doc){ return doc.identifier_s == row.identifier})){
                                row.revoked = true;
                            }

                            $scope.records.push(row);
                        })
                        $("a[role*='button']").toggleClass('ui-disabled');
                        return $scope.records;
                    })
                        .finally(function () {
                            $scope.loading = false;
                        });
                }
                function recordDeleted(doc) {
                    for (var i = 0; i <= $scope.records.length; ++i) {
                        if ($scope.records[i] == doc) {
                            $scope.records.splice(i, 1);
                        }
                    }
                    toastr.info('<h1>Record deleted.</h1>', {
                        allowHtml: true
                    });
                }

                function recordDuplicated(doc) {
                    $scope.records.push(doc);
                }


                function getRevokedDocuments(){
                    var filter;
                    if(!$rootScope.user.government)
                        filter = '_ownership_s:("' + ($rootScope.user.userGroups||[]).join('" "') + '")'
                    else
                        filter = 'government_s:'+$rootScope.user.government;

                    var queryParameters = {
                        //
                        'query': 'amendmentIntent_i:1 AND ' + filter,
                        'rowsPerPage': 100,
                        fields: 'identifier_s'
                    };
                    return searchService.list(queryParameters, null);
                }

                loadRecords();


                $rootScope.$on('event:server-pushNotification', function(evt,data){
                    if((data.type == 'workflowActivityStatus' || data.type == 'userNotification') &&
                      data.data && data.data.identifier){
                        var document = _.findWhere($scope.records, {identifier: data.data.identifier})
                        if(document){

                            if(data.data.workflowActivity == 'document-deleted'){
                                $scope.records.splice($scope.records.indexOf($scope.records), 1);
                            }
                            else{
                                $q.when(updateDocumentStatus(document))
                                .then(function(){
                                    document.workflowActivityStatus =  data.data.workflowActivity;
                                });
                            }
                        }
                        if(localStorageService.get('workflow-activity-status')){
                            if(localStorageService.get('workflow-activity-status').identifier == data.data.identifier)
                                localStorageService.remove('workflow-activity-status');            
                        }                        
                        
                    }
                });

                function verifyWorkflowStatus(workflowId, document){

                    IWorkflows.get(workflowId)
                    .then(function(workflow){
                        var activity = _.first(workflow.activities)                        
                        if(activity && activity.completedBy)
                            localStorageService.remove('workflow-activity-status');

                    });
                }

                function updateDocumentStatus(document){

                  return storage.documents.get(document.identifier, {'info': true })
                    .then(function (data) {

                        document.revision = data.data.revision;
                        document.updatedBy = data.data.updatedBy;
                        document.updatedOn = data.data.updatedOn;
                        document.workingDocumentBody = data.data.workingDocumentBody;
                        document.workingDocumentCreatedBy = data.data.workingDocumentCreatedBy;
                        document.workingDocumentCreatedOn = data.data.workingDocumentCreatedOn;
                        document.workingDocumentID = data.data.workingDocumentID;
                        document.workingDocumentLock = data.data.workingDocumentLock;
                        document.workingDocumentMetadata = data.data.workingDocumentMetadata;
                        document.workingDocumentOwner = data.data.workingDocumentOwner;
                        document.workingDocumentSize = data.data.workingDocumentSize;
                        document.workingDocumentSummary = data.data.workingDocumentSummary;
                        document.workingDocumentTitle = data.data.workingDocumentTitle;
                        document.workingDocumentUpdatedBy = data.data.workingDocumentUpdatedBy;
                        document.workingDocumentUpdatedOn = data.data.workingDocumentUpdatedOn;

                    });
                }
            }]);

    });
