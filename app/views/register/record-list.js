import app from '~/app';
import _ from 'lodash';
import '~/components/scbd-angularjs-services/main';
import '~/services/main';
import '~/components/scbd-angularjs-controls/main';
import '~/views/register/directives/register-top-menu';
import '~/views/directives/block-region-directive';
import '~/views/forms/edit/editFormUtility';
import recordLists from './record-list.vue';
import { provide } from 'vue'; 
import { safeDelegate } from '~/services/common';

import 'ngDialog';
import 'angular-animate';
import 'angular-joyride';
import joyRideTextTranslations from '~/app-text/views/register/submit-summary-joyride-tour.json';
import recordListT from '~/app-text/views/register/record-list.json'; 
import { mergeTranslationKeys } from '../../services/translation-merge';
const joyRideText = mergeTranslationKeys(joyRideTextTranslations);
const recordListError = mergeTranslationKeys(recordListT);
        export { default as template } from './record-list.html';

        export default ["$timeout", "commonjs", "$http", "IWorkflows", "IStorage", '$rootScope',
            'searchService', 'toastr', "$routeParams", "roleService", "$scope", "$q", "guid", "editFormUtility", "$filter", 
    "$element", "breadcrumbs", "localStorageService", "ngDialog", 'realm', 'ngMeta', 'solr', 'joyrideService', 'translationService',
            function ($timeout, commonjs, $http, IWorkflows, storage, $rootScope, searchService, toastr, $routeParams, roleService,
                $scope, $q, guid, editFormUtility, $filter, $element, breadcrumbs, localStorageService, ngDialog, realm, ngMeta, solr, joyrideService, translationService) {
                translationService.set('recordListT', recordListT);
                $scope.languages = commonjs.languages;
                $scope.amendmentDocument = {locales:['en']};
                $scope.canDeletePublished = true;
                $scope.recordsUpdated = false;
                 $scope.recordListsVueComponent = {
                    components: { recordLists },
                    setup: componentSetup
                }

                function getUniqueId(record){
                    return $filter("uniqueID")(record);
                }
                function componentSetup () {
                    provide('askDelete', safeDelegate($scope, (record)=>{
                        record = record || {}
                        return $scope.askDelete(record)
                    }));

                    provide('askDuplicate', safeDelegate($scope, (record)=>{
                        record = record || {}
                        return $scope.askDuplicate(record)
                    }));

                    provide('getUniqueId', safeDelegate($scope, (record)=>{
                        record = record || {}
                        return getUniqueId(record);
                    }));
                }

                $scope.schemaName = $filter("mapSchema")($routeParams.document_type);
                $element.find("[data-bs-toggle='tooltip']").tooltip({
                    trigger: 'hover'
                });
                $scope.listResult = {
                    currentPage: 1,
                    pageCount  : 0,
                    rowsPerPage: 25
                }
	            $scope.orderBy = ['-updatedOn'];
                $scope.isDraftRecord = false;
                $scope.statusType = 'allRecords';
                //ToDo: if get counts from the backend
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
                                title       : joyRideText.welcomeTitle,
                                content     : joyRideText.welcomeContent
                            },
                            {
                                appendToBody: true,
                                type        : 'element',
                                selector    : "#publishedRecords",
                                title       : joyRideText.filtersTitle,
                                content     : joyRideText.filtersContent,
                                placement   : 'top',

                            },
                            {
                                appendToBody: true,
                                type        : 'element',
                                selector    : "#searchKeyword",
                                title       : joyRideText.KeywordTitle,
                                content     : joyRideText.KeywordContent,
                                placement   : 'top',
                            },
                            {
                                appendToBody: true,
                                type        : 'element',
                                selector    : "#add-new-btn",
                                title       : joyRideText.addingTitle,
                                content     : joyRideText.addingContent,
                                placement   : 'left'
                            },
                            {
                                appendToBody: true,
                                type        : 'element',
                                selector    : "#duplicateRecord",
                                title       : joyRideText.duplicateTitle,
                                content     : joyRideText.duplicateContent,
                                placement   : 'left'

                            },
                            {
                                appendToBody: true,
                                type        : 'element',
                                selector    : "#editRecord",
                                title       : joyRideText.editTitle,
                                content     : joyRideText.editContent,
                                placement   : 'left'
                            },
                            {
                                appendToBody: true,
                                type        : 'element',
                                selector    : "#deleteRecord",
                                title       : joyRideText.deleteTitle,
                                content     : joyRideText.deleteContent,
                                placement   : 'left'
                            },
                            {
                                appendToBody:true,
                                type        : 'element',
                                selector    : "#needHelp",
                                title       : joyRideText.needHelpTitle,
                                content     : joyRideText.needHelpContent,
                                placement   : 'bottom',
                                beforeStep  : gotoSectionHelp,
                                customClass : "need-help-jr"

                            },
                            {
                                appendToBody:true,
                                type        : 'element',
                                selector    : "#slaask-button-cross",
                                title       : joyRideText.needMoreHelpTitle,
                                content     : joyRideText.needMoreHelpContent,
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


                if(_.includes(realm.nationalSchemas, $filter('mapSchema')($scope.schema)))
                $scope.schemaType = 'nationalRecords';
                else
                $scope.schemaType = 'referenceRecords';



                //============================================================
                //
                //
                //============================================================
                $scope.askDelete = function (record) {
                    console.log("askDelete", record)
                    $scope.canDeletePublished = true;
                    if($scope.isPublished(record) && $scope.isDraft(record)){
                        $scope.canDeletePublished = false;
                    }
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
                    .then(function (response) {
                        if(response?.status === 200){
                            recordDeleted(record, true);
                            if($scope.isPublished(record)){
                                $scope.canDeletePublished = true;
                            } else{
                                $scope.recordToDelete = null;
                                $scope.security = undefined;
                                $scope.closeDialog();
                            }
                        } else {
                          toastr.error(recordListError.errorDeletingDraft);  
                        }
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
                        // if come here then refresh that function
                        $scope.closeDialog();
                        $scope.recordsUpdated = true;

                        //remove this code
                        // $scope.records.push(draftInfo);
                        // $timeout(function () {
                        //     highlight("#record" + draftInfo.identifier); //.effect( "shake" );
                        // }, 500)

                        // $scope.closeDialog();
                        // return draftInfo;

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
                // toDo: 
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



                $scope.isAdditionDisabled = function (schema){
                    return  realm.schemas[schema].disableAdd;
                }
                // no need , need to remove
                
                function recordDeleted(doc, isDraft) {
                    if (isDraft && $scope.isPublished(doc)){
                        updateDocumentStatus(doc.identifier, 'draftDeleted')
                    }
                    else{
                        $scope.recordsUpdated = true;
                        // for (var i = 0; i <= $scope.records.length; ++i) {
                        //     if ($scope.records[i] == doc) {
                        //         $scope.records.splice(i, 1);
                        //     }
                        // }
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
                    // use solr service to get revoked documents
                    return searchService.list(queryParameters, null);
                }

                function verifyWorkflowStatus(workflowId, document){
                    // use get method  of api/workflows.js 
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
                $scope.isDisableEdit = function (schema){
                    return  realm.schemas[schema].disableEdit;
                }
                // toDo: need to remove
                function loadmyTasks(schema){

                    if(!_.includes(realm.referenceSchemas, schema)){

                        var defer = $q.defer();
                        defer.resolve([]);
                        return defer.promise;
                    }
                   //here we are getting my tasks
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
                //Todo: ove to vue component
                async function loadOfflineFormatDetails(){
                    if(realm.is('BCH')){
                        const data = await import('~/app-data/bch/offline-formats.json');                        
                        $scope.offlineFormats = data.default;
                        $timeout(function(){
                            $element.find("[data-bs-toggle='tooltip']").tooltip({
                                trigger: 'hover'
                            });
                        }, 100)
                        
                    }
                }

            }];
