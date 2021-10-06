import app from 'app';
import _ from 'lodash';
import 'components/scbd-angularjs-services/main';
import 'services/main';
import 'components/scbd-angularjs-controls/main';
import 'views/register/directives/register-top-menu';
import 'views/directives/block-region-directive';
import 'views/forms/edit/editFormUtility';
import 'ngDialog';
import 'angular-animate';
import 'angular-joyride';
import joyRideText from '~/app-data/submit-summary-joyride-tour.json';

        export { default as template } from './record-list.html';

        export default ["$timeout", "commonjs", "$http", "IWorkflows", "IStorage", '$rootScope',
            'searchService', 'toastr', "$routeParams", "roleService", "$scope", "$q", "guid", "editFormUtility", "$filter", 
            "$element", "breadcrumbs", "localStorageService", "ngDialog", 'realm', 'ngMeta', 'solr','joyrideService',
            function ($timeout, commonjs, $http, IWorkflows, storage, $rootScope, searchService, toastr, $routeParams, roleService,
                $scope, $q, guid, editFormUtility, $filter, $element, breadcrumbs, localStorageService, ngDialog, realm, ngMeta, solr, joyrideService) {

                $scope.languages = commonjs.languages;
                $scope.amendmentDocument = {locales:['en']};

                $element.find("[data-toggle='tooltip']").tooltip({
                    trigger: 'hover'
                });
                $scope.listResult = {
                    currentPage: 1,
                    pageCount  : 0,
                    rowsPerPage: 25
                }
	             $scope.orderBy = ['-updatedOn'];
	            //  if($scope.listResult.currentPage == 1){
		        //      $scope.orderBy = ['workflowActivityStatus'];
	            //  } else {
		        //      $scope.orderBy = ['-updatedOn'];
	            //  }
                $scope.isDraftRecord = false;
                $scope.statusType = 'allRecords';
                // //ToDo: if get counts from the backend
                $scope.listCount = {
                    publish  : 0,
                    request: 0,
                    draft:0
                }

                if ($routeParams.document_type) {
                    var type =  $filter("mapSchema")($routeParams.document_type);
                    $scope.schema = type;
                    breadcrumbs.options = {
                        'document_type': $filter("schemaName")(type)
                    };
                    ngMeta.resetMeta();                       
                    ngMeta.setTitle('List | ', $filter("schemaName")(type));
                }
                $scope.tour = function(){
                    $scope.tourOn = true;
                    var joyride = joyrideService;
                    joyride.config = {
                        overlay: true,
                        onStepChange: function(){  },
                        onStart: function(){  },
                        onFinish: function(){
                            joyride.start = false;
                            $scope.tourOn = false;
                        },
                        steps : [
                            {
                                appendToBody: true,
                                title       : joyRideText.welcome.title,
                                content     : joyRideText.welcome.content
                            },
                            {
                                appendToBody: true,
                                type        : 'element',
                                selector    : "#publishedRecords",
                                title       : joyRideText.filters.title,
                                content     : joyRideText.filters.content,
                                placement   : 'top',

                            },
                            {
                                appendToBody: true,
                                type        : 'element',
                                selector    : "#searchKeyword",
                                title       : joyRideText.Keyword.title,
                                content     : joyRideText.Keyword.content,
                                placement   : 'top',
                            },
                            {
                                appendToBody: true,
                                type        : 'element',
                                selector    : "#new_button",
                                title       : joyRideText.adding.title,
                                content     : joyRideText.adding.content,
                                placement   : 'left'
                            },
                            {
                                appendToBody: true,
                                type        : 'element',
                                selector    : "#duplicateRecord",
                                title       : joyRideText.duplicate.title,
                                content     : joyRideText.duplicate.content,
                                placement   : 'left'

                            },
                            {
                                appendToBody: true,
                                type        : 'element',
                                selector    : "#editRecord",
                                title       : joyRideText.edit.title,
                                content     : joyRideText.edit.content,
                                placement   : 'left'
                            },
                            {
                                appendToBody: true,
                                type        : 'element',
                                selector    : "#deleteRecord",
                                title       : joyRideText.delete.title,
                                content     : joyRideText.delete.content,
                                placement   : 'left'
                            },
                            {
                                appendToBody:true,
                                type        : 'element',
                                selector    : "#needHelp",
                                title       : joyRideText.needHelp.title,
                                content     : joyRideText.needHelp.content,
                                placement   : 'bottom',
                                beforeStep  : gotoSectionHelp,
                                customClass : "need-help-jr"

                            },
                            {
                                appendToBody:true,
                                type        : 'element',
                                selector    : "#slaask-button-cross",
                                title       : joyRideText.needMoreHelp.title,
                                content     : joyRideText.needMoreHelp.content,
                                placement   : 'top',
                                customClass : "need-more-help-jr"
                            }
                        ]
                    };
                    joyride.start = true;
                    function gotoSectionHelp (resumeJoyride){
                        $('html,body').scrollTop(0);
                        $timeout(resumeJoyride, 100);
                    }

                }
                $scope.toggleOrderBy = function (key) {
                    if (key == $scope.orderBy[0].substr(1))
                        $scope.orderBy = (($scope.orderBy[0].substr(0, 1) == '+') ? '-' : '+') + key;
                    else
                        $scope.orderBy = ['-' + key];

                    $('.ordericon').remove();
                    var direction = (($scope.orderBy[0].substr(0, 1) == '-') ? 'down' : 'up');
                    $('#' + key.split('|')[0] + 'Header').append(' <span class="ordericon glyphicon glyphicon-chevron-' + direction + ' text-primary"></span>');
                };

                if(_.includes(realm.nationalSchemas, $filter('mapSchema')($scope.schema)))
                $scope.schemaType = 'nationalRecords';
                else
                $scope.schemaType = 'referenceRecords';

                $scope.onPageChange = function(pageNumber){
                     loadRecords(pageNumber);
                }

                $scope.onPageSizeChanged = function(size){
                   $scope.listResult.rowsPerPage = size;
                   $scope.listResult.currentPage = 1; //reset to page 1
                   $scope.onPageChange($scope.listResult.currentPage);
                }
                //============================================================
                //
                //
                //============================================================
                $scope.askDelete = function (record) {

                    if (record.type == 'absPermit' && $scope.isPublished(record)) {
                        $scope.loading = true;                        
                        $scope.isIRCC = true;
                        $q.when(storage.documents.get(record.identifier))
                        .then(function (result) {   
                            $scope.recordToDelete = record;
                            $scope.recordToDelete.document = result.data;
                            $scope.recordToDelete.document.amendmentDescription = undefined;
                        }).finally(function(){$scope.loading=false;});
                    } else {
                        $scope.recordToDelete = record;
                        $scope.isIRCC = false;
                    }

                    $q.when(storage.documents.security.canDelete(record.identifier, record.type))
                    .then(function (allowed){
                        $scope.security = {canDelete : allowed };
                    })
                    ngDialog.open({template: 'deleteRecordModal', scope : $scope});
                };

                //============================================================
                //
                //
                //============================================================
                $scope.deleteDraft = function (record) {


                    $scope.loading = true;

                    return $q.when(storage.drafts.delete(record.identifier))
                    .then(function () {

                        recordDeleted(record, true);
                        $scope.recordToDelete = null;
                        $scope.security = undefined;
                        $scope.closeDialog();
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
                            identifier : record.identifier, type: $scope.security.canDelete ? 'delete' : 'request',
                            workflowId : workflowInfo._id
                        });
                         var currentDocument = _.find($scope.records, {identifier: record.identifier})
                         currentDocument.workflowActivityStatus = 'pending';

                        $scope.recordToDelete = null;
                        $scope.security = undefined;
                        $scope.closeDialog();
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
                                $scope.amendmentDocument = {locales:['en']};
                                $scope.recordToDelete = null;

                                localStorageService.set('workflow-activity-status', {
                                    identifier : record.identifier, type:'revoke',
                                    workflowId : document._id
                                });
                                var currentDocument = _.find($scope.records, {identifier: record.identifier})
                                currentDocument.workflowActivityStatus =  'pending';
                                $scope.closeDialog();
                            }).finally(function () {
                                delete $scope.loading
                            });
                }
                //============================================================
                //
                //
                //============================================================
                $scope.askDuplicate = function (record) {

                    $scope.recordToDuplicate = record;
                    ngDialog.open({template: 'duplicateRecordModal', scope : $scope});
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

                        if(document.header.schema == 'absPermit'){
                            document.amendmentIntent = undefined;
                            document.amendmentDescription = undefined;
                        }

                        return editFormUtility.saveDraft(document);

                    }).then(function (draftInfo) {
                        $scope.records.push(draftInfo);
                        $timeout(function () {
                            highlight("#record" + draftInfo.identifier); //.effect( "shake" );
                        }, 500)

                        $scope.closeDialog();
                        return draftInfo;

                    }).catch(function (error) {
                        $scope.closeDialog();
                         var message;
                        if (error.status == 403) {
                            message = 'You are not authorized to create duplicate records.'                           
                        }
                        else
                            message = error.message||(error.data||{}).message;
                         var close = $scope.closeDialog;
                         ngDialog.open({template: 'errorModal', 
                                        controller: ['$scope', function($scope) {
                                           $scope.errorMessage = message;
                                           $scope.closeDialog = close;
                                        }]});                        

                    }).finally(function () {
                        $scope.loading = false;
                        $scope.recordToDuplicate = null;
                    });
                };

                //============================================================
                //
                //
                //============================================================
                $scope.askRecallWorkflowRequest = function (record) {
                    $scope.recordForDeleteWorkflowRequest = record;
                    ngDialog.open({template: 'recallWorkflowRequestModal', scope : $scope});
                };

                $scope.deleteWorkflowRequest = function (record) {
                    console.log(record);
                    $scope.loading = true;
                    IWorkflows.cancel(record.workingDocumentLock.lockID.replace('workflow-', ''), { 'action': 'cancel' })
                        .then(function (data) {
                            $timeout(function () {
                                highlight("#record" + record.identifier);
                            }, 500);
                            $scope.recordForDeleteWorkflowRequest = null;
                            $scope.closeDialog();
                        })
                        .finally(function () {
                            $scope.loading = false;
                        });
                };
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
                        (roleService.isPublishingAuthority() || roleService.isNationalFocalPoint());
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

                $scope.showAddButton = function () {

                    return roleService.isPublishingAuthority() ||
                        roleService.isNationalAuthorizedUser() ||
                        roleService.isNationalFocalPoint() ||
                        roleService.isIAC() ||
                        roleService.isAdministrator()|| 
                        roleService.isPublishingAuthority($scope.schema) ||
                        roleService.isNationalAuthorizedUser($scope.schema);

                }

                $scope.isIAC = function () {
                    return roleService.isIAC();
                }   

                var evtServerPushNotification = $rootScope.$on('event:server-pushNotification', function(evt,data){
                    if((data.type == 'workflowActivityStatus' || data.type == 'userNotification') &&
                      data.data && data.data.identifier){
                          
                        var document = _.find($scope.records, {identifier: data.data.identifier})
                        var updateDocument = true;
                        if(localStorageService.get('workflow-activity-status')){
                            
                            var localStorageDocument = localStorageService.get('workflow-activity-status');
                            if(localStorageDocument.identifier == data.data.identifier){ 
                                if( (data.data.workflowActivity == 'document-lock' && _.includes(['revoke', 'request'], localStorageDocument.type)) ||
                                    (data.data.workflowActivity == 'create-revision-from-draft' && _.includes(['revoke', 'publish'], localStorageDocument.type)) ||
                                    (data.data.workflowActivity == 'document-deleted' && 'delete'==localStorageDocument.type)){

                                    if(document && localStorageDocument.type == 'revoke' && data.data.workflowActivity == 'create-revision-from-draft')
                                        document.revoked = true;
                                     
                                    localStorageService.remove('workflow-activity-status');
                                }
                                else
                                    updateDocument = false;
                            }
                        }                        
                        if(document && updateDocument){
                            if(data.data.workflowActivity == 'document-deleted'){
                                recordDeleted(document);
                                //$scope.records.splice($scope.records.indexOf(document), 1);
                            }
                            else{
                                updateDocumentStatus(document.identifier, data.data.workflowActivity);
                            }
                        }
                    }
                });


                $scope.$on('$destroy', function(){
                    evtServerPushNotification();
                })

                $scope.refreshList = function (schema) {
                    loadRecords(1);
                };

                $scope.closeDialog = function(){
                    ngDialog.close();
                }


                function highlight(obj) {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 1000);
                    $(obj).toggleClass('record-highlight');
                    setTimeout(function () {
                        $(obj).toggle('fade');
                        $(obj).toggleClass('record-highlight');
                        $(obj).toggle('fade');
                    }, 2000);


                }
                $scope.changeFilter = function (type ) {
                    if($scope.loading) return;
                    $scope.recordFilter = type;
                    $scope.isDraftRecord = false;
                    if(type==''){
                        $scope.statusType = 'allRecords';
                        loadRecords(1);
                    } else if(type=='isPublished'){
                        $scope.statusType = 'my';
                        loadRecords(1);
                    }
                    else if(type=='isDraft'){
                        $scope.statusType = 'mydraft';
                        $scope.records = $scope.drafts;
                        $scope.isDraftRecord = true;
                    }
                    else if(type=='isRequest'){
                        $scope.statusType = 'mydraft';
                        $scope.records = $scope.requestsList;
                        $scope.isDraftRecord = true;
                    }
                }
                $scope.onSort = function(sortField, sortSequence){
                    $scope.listResult.sequence  = sortSequence == ' desc' ? ' asc' : ' desc';
                    $scope.listResult.sort          = sortField;
                    loadRecords(1);
                }
                $scope.searchRecord = function () {
                    loadRecords(1);
                }
                function loadRecords(pageNumebr) {
                    $scope.loading = true;
                    $scope.records = [];
                    var schema = $filter("mapSchema")($routeParams.document_type);

                    if (schema === null || schema == undefined)
                        return;

                    $("a[role*='button']").toggleClass('ui-disabled');
                    if (!$rootScope.user.isAuthenticated)
                        return $scope.records = null;

                    var qAnd = [];

                    qAnd.push("(type eq '" + schema + "')");
                    
                    var publishedParams = {
                        cache: false,
                        $top: $scope.listResult.rowsPerPage,
                        $skip: $scope.listResult.rowsPerPage*(pageNumebr-1),
                        $orderby: $scope.listResult.sort||'updatedOn desc'
                        //$sortSequence: $scope.listResult.sequence
                    };
                    if($scope.keywords){
                        publishedParams.text_EN_txt = $scope.keywords;
                    }

                    if (schema == "contact")
                        publishedParams.body = true;
                        
                    var qDocuments = storage.documents.query(qAnd.join(" and ") || undefined ,undefined, publishedParams);

                    var draftParams = {
                        cache: false,
                        $orderby: $scope.listResult.sort||'updatedOn desc'
                    };
                    if (schema == "contact")
                        draftParams.body = true;

                    let qDrafts = undefined;
                    if(pageNumebr==1 && ($scope.statusType == 'mydraft' || $scope.statusType == 'allRecords')) {
                        qDrafts = storage.drafts.query( qAnd.join( " and " ) || undefined, draftParams );
                    }

                    $q.all([qDocuments, qDrafts, getRevokedDocuments(schema), loadmyTasks(schema)])
                      .then(function (results) {
                        var documents = results[0].data.Items;
                        if(pageNumebr == 1 && results[1]?.data?.Items && ($scope.statusType == 'mydraft' || $scope.statusType == 'allRecords')) {
                            $scope.drafts = results[1].data.Items;
                            $scope.listCount.draft = results[1].data.Count;
                            $scope.requestsList = [];
                            _.forEach($scope.drafts, function(item){
                                if(item.workingDocumentLock) {
                                    $scope.requestsList.push(item)
                                }
                            });
                             $scope.listCount.request = $scope.requestsList.length;
                        }

                        var wokflowActive = localStorageService.get('workflow-activity-status');
                        var revoked = schema!='absPermit' ? [] : results[2].data.response.docs;
                        $scope.listResult.recordsFound = results[0].data.Count;
                        // TODO: count will go from here
                        $scope.listCount.all = $scope.listResult.recordsFound + $scope.listCount.draft;
                        $scope.listCount.publish = $scope.listResult.recordsFound;
                        $scope.listResult.pageCount   = Math.ceil(results[0].data.Count / $scope.listResult.rowsPerPage);
                        $scope.listResult.currentPage = pageNumebr;
                        var myTasks = results[3];


                        var map = {};
                        if($scope.statusType == 'allRecords' && pageNumebr == 1){
                            _.map($scope.drafts, function (o) {
                                map[o.identifier] = o;
                            });
                        }
                        _.map(documents, function (o) {
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

                        myTasks.forEach(function(workflow) { //tweaks

                            if(workflow.data && !_.find($scope.records, {identifier: workflow.data.identifier})){
                                $scope.records.push({
                                    identifier  : workflow.data.identifier,
                                    title       : workflow.data.title,
                                    metadata    : workflow.data.metadata,
                                    type        : workflow.data.metadata.schema
                                });
                            }
                            updateDocumentStatus(workflow.data.identifier, 'status', true)

                        });

                        return $scope.records;
                    })
                    .finally(function () {
                        $scope.loading = false;
                    });
                }
                
                function recordDeleted(doc, isDraft) {
                    if (isDraft && $scope.isPublished(doc)){
                        updateDocumentStatus(doc.identifier, 'draftDeleted')
                    }
                    else{
                        for (var i = 0; i <= $scope.records.length; ++i) {
                            if ($scope.records[i] == doc) {
                                $scope.records.splice(i, 1);
                            }
                        }
                    }
                    toastr.info('Record deleted.', {
                        allowHtml: true
                    });
                }

                function getRevokedDocuments(schema){
                    if(schema!= 'absPermit'){
                        var q = $q.defer();
                        q.resolve([]);
                        return q.promise;
                    }

                    var filter;
                    if(!$rootScope.user.government)
                        filter = '_ownership_s:("' + _.map($rootScope.user.userGroups||[], solr.escape).join('" "') + '")'
                    else
                        filter = 'government_s:'+solr.escape($rootScope.user.government);

                    var queryParameters = {
                        'query': 'amendmentIntent_i:1 AND ' + filter,
                        'rowsPerPage': 100,
                        fields: 'identifier_s'
                    };
                    return searchService.list(queryParameters, null);
                }

                function verifyWorkflowStatus(workflowId, document){

                    IWorkflows.get(workflowId)
                    .then(function(workflow){
                        var activity = _.head(workflow.activities)
                        if((activity && activity.completedBy) || !activity && workflow.state=="completed"){
                            localStorageService.remove('workflow-activity-status');
                        }

                    });
                }

                function updateDocumentStatus(identifier, workflowActivity, draft){
                  
                  var docQuery = storage.documents.get(identifier, {'info': true });
                  if(draft)
                     docQuery = storage.drafts.get(identifier, {'info': true });

                  return $q.when(docQuery)
                        .then(function (data) {

                            var currentDocument = _.find($scope.records, {identifier: identifier})
                            
                            if(data.data.deletedOn){
                                $scope.records.splice($scope.records.indexOf(currentDocument), 1);
                                return;
                            }
                            
                            currentDocument.title = data.data.title;
                            currentDocument.documentID = data.data.documentID;
                            currentDocument.workflowActivityStatus =  workflowActivity
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
                            if(currentDocument.type == 'absPermit' && !draft){
                                //delay by 2 sec for indexing to finish
                                $timeout(function(){
                                    $q.when(getRevokedDocuments(currentDocument.type))
                                    .then(function(data){
                                        if(data.data && _.some(data.data.response.docs, function(doc){ return doc.identifier_s == currentDocument.identifier})){
                                            currentDocument.revoked = true;
                                        }
                                    });
                                },2000);
                            }
                        })
                        .catch(function(error){
                            if(error.status === 404 && !draft)
                                updateDocumentStatus(identifier, workflowActivity, true);
                        });;
                }

                function loadmyTasks(schema){

                    if(!_.includes(realm.referenceSchemas, schema)){

                        var defer = $q.defer();
                        defer.resolve([]);
                        return defer.promise;
                    }

                    var myUserID = $scope.$root.user.userID;
                        var query    = {
                            $and : [
                                { "activities.assignedTo" : myUserID } ,
                                { "closedOn"             : { $exists : false } },
                                { "data.realm"           : realm.value },
                                { "data.metadata.schema" : schema }
                            ]
                        };

                    return IWorkflows.query(query);

                }

                async function loadOfflineFormatDetails(){
                    if(realm.is('BCH')){
                        const data = await import('~/app-data/bch/offline-formats.json');                        
                        $scope.offlineFormats = data.default;
                        $timeout(function(){
                            $element.find("[data-toggle='tooltip']").tooltip({
                                trigger: 'hover'
                            });
                        }, 100)
                        
                    }
                }
                loadRecords(1);
                loadOfflineFormatDetails();

            }];
