import app from '~/app';
import template from 'text!./workflow-arrow-buttons.html';
import 'lodash';
import '~/views/directives/workflow-history-directive';
import '~/services/main';
import 'ngDialog';
import 'toastr';
import '~/views/forms/directives/document-sharing';
import 'ck-editor-css';
import toasterMessagesTranslations from '~/app-text/views/directives/toaster-messages.json';
import workflowButtonsT from '~/app-text/views/directives/workflow-arrow-buttons.json';
import { mergeTranslationKeys } from '../../services/translation-merge';
import cbdAddNewViewArticle from '~/components/common/cbd-add-new-view-article.vue'
import documentDebugInfo from '~/components/km/document-debug-info.vue';
import RealmApi from '~/api/realms';
import WorkflowsApi from '~/api/workflows';

const toasterMessages = mergeTranslationKeys(toasterMessagesTranslations);
    app.directive('workflowArrowButtons',["$rootScope", "IStorage", "editFormUtility", "$route","IWorkflows",
    'toastr', '$location', '$filter', '$routeParams', 'appConfigService', 'realm', '$http','$timeout', '$q', 
    'localStorageService', 'articlesService', 'roleService', 'locale', 'commonjs', 'ngDialog', '$window', 'translationService','apiToken',
    function ($rootScope,  storage, editFormUtility, $route, IWorkflows, toastr, $location, $filter, 
            $routeParams, appConfigService, realm, $http, $timeout, $q, localStorageService, 
            articlesService, roleService, locale, commonjs, ngDialog, $window, translationService, apiToken){

    	return{
    		restrict: 'EA',
    		replace:false,
            template: template,
            transclude  : {
                introForm   : '?introForm',
                editForm    : 'editForm',
                reviewForm  : 'reviewForm',
                publishForm : '?publishForm'
            },
    		scope: {
    			getDocumentFn : '&document',
                languages     : '=languages',
                tab           : '=?',
                onPreCloseFn      : "&onPreClose",
				onPostCloseFn     : "&onPostClose",
				onPreRevertFn     : "&onPreRevert",
				onPostRevertFn    : "&onPostRevert",
				onPreSaveDraftFn  : "&onPreSaveDraft",
				onPostSaveDraftFn : "&onPostSaveDraft",
				onPreRequestFn    : "&onPreRequest",
				onPostRequestFn   : "&onPostRequest",
				onPrePublishFn    : "&onPrePublish",
				onPostPublishFn   : "&onPostPublish",
                onErrorFn         : "&onError",
				onStepChangeFn    : "&onStepChange",
                validationReport    : '=?',
				onReviewLanguageChangeFn  : "&onReviewLanguageChange",
				onPreSaveDraftVersionFn	  : "&onPreSaveDraftVersion"
    		},
            link : async function($scope, $element, $attr){
                translationService.set('workflowButtonsT', workflowButtonsT);
                let documentLoadError = false;
                var originalDocument;
                var next_fs;                
                var saveDraftVersionTimer;
                var previousDraftVersion;
                $scope.isBch = realm.is('BCH');
                //BOOTSTRAP Dialog handling
				var qCancelDialog         = $element.find("#dialogCancel");
				var qAdditionalInfoDialog = $element.find("#divAdditionalInfo");
                const realmApi            = new RealmApi({ tokenReader: () => undefined});
                const workflowsApi        = new WorkflowsApi({ tokenReader: () => apiToken.get() });
                const environmentRealms   = await realmApi.getRealmConfigurations(realm.environment);

                $scope.vueComponent = {
                    components: { cbdAddNewViewArticle }
                }
                $scope.debugInfoComponent = {
                    components:{documentDebugInfo}
                }
                
                $scope.isDialog                    = $attr.isDialog||false;
                $scope.documentType                = $filter("mapSchema")($attr.documentType||$route.current.$$route.documentType);
                $scope.container                   = $attr.container;
                $scope.cancelDialogDefered         = [];
                $scope.AdditionalInfoDialogDefered = [];
                $scope.WorkflowDraftDialogDefered  = [];
                $scope.workflowScope               = $scope;
                $scope.isAdmin                     = roleService.isUserInRoles(['Administrator', 'oasisArticleEditor']);
                $scope.locale                      = locale;
                $scope.offlineLanguages            = commonjs.languages;
                $scope.blockText                   = 'loading form...'
                if(!$scope.tab)
                    $scope.tab = 'intro';

                $attr.$observe('isDialog', function(){
                    $scope.isDialog = $attr.isDialog||false
                })
                $attr.$observe('container', function(){
                    $scope.container  = $attr.container; 
                })
                $attr.$observe('documentType', function(){
                    $scope.documentType  = $filter("mapSchema")($attr.documentType||$route.current.$$route.documentType);
                });


                
                //////////////////////////////
                $(".progressbar li button").click(function(){
                	next_fs = $(this).parent();
                    var classes = next_fs.attr("class").split(' ')

                    var selectedClass = _.find(classes, function(className){if(className.indexOf("step")>=0) return true; else return false;} );
                    next_fs = $('.' + selectedClass);
                    next_fs.nextAll().removeClass("active");
                    next_fs.prevAll().addClass("active");
                    next_fs.addClass("active");

                });

                //====================            
                $scope.goNextTab = function(currentTab)
                {
                    switch(currentTab){
                        case "intro":   $scope.switchTab("edit");
                            break;
                        case "edit":   $scope.switchTab("review");
                            break;
                        case "review":   $scope.switchTab("publish");
                            break;
                        case "publish": 
                            break;
                    }
                }
                //====================            
                $scope.previousTab = function(currentTab)
                {
                    switch(currentTab){
                        case "intro":   
                            break;
                        case "edit":   $scope.switchTab("intro");
                            break;
                        case "review":   $scope.switchTab("edit");
                            break;
                        case "publish":  $scope.switchTab("review");
                            break;
                    }
                  
                }

                ///////////////////////////////
                //// TODO: use ngDialiog
                ///////////////////////////////
				$scope.showCancelDialog = function(visible) {
        			  if($('form').filter('.dirty').length == 0) {
        				closeDocument();
        				 return;
        			  }

					var isVisible = qCancelDialog.css("display")!='none';

					if(visible == isVisible)
						return $q.when(isVisible);

					var defered = $q.defer();

					$scope.cancelDialogDefered.push(defered)

					qCancelDialog.modal(visible ? "show" : "hide");

					return defered.promise;
				}

				qCancelDialog.on('shown.bs.modal' ,function() {

					$timeout(function(){

						var promise = null;
						while((promise=$scope.cancelDialogDefered.pop()))
							promise.resolve(true);
					});
				});

				qCancelDialog.on('hidden.bs.modal' ,function() {

					$timeout(function(){

						var promise = null;
						while((promise=$scope.cancelDialogDefered.pop()))
							promise.resolve(false);
					});
				});

                $scope.showAdditionalInfoDialog = function(visible) {
                    var isVisible = qAdditionalInfoDialog.css("display")!='none';
                    if(visible == isVisible)
                        return $q.when(isVisible);
                    var defered = $q.defer();
                    $scope.AdditionalInfoDialogDefered.push(defered)
                    qAdditionalInfoDialog.modal(visible ? "show" : "hide");
                    return defered.promise;
                }

                qAdditionalInfoDialog.on('shown.bs.modal' ,function() {
                    $timeout(function(){
                        var promise = null;
                        while((promise=$scope.AdditionalInfoDialogDefered.pop()))
                            promise.resolve(true);
                    });
                });

                qAdditionalInfoDialog.on('hidden.bs.modal' ,function() {
                    $timeout(function(){
                        var promise = null;
                        while((promise=$scope.AdditionalInfoDialogDefered.pop()))
                            promise.resolve(false);
                    });
                });




                //////////////////////////////

                $scope.loadSecurity = function(){
                    $timeout(function(){$scope.updateSecurity();}, 1000);
                }
				//====================
				//
				//====================
				$scope.updateSecurity = function()
				{

                    if(documentLoadError)
                        return;

                    $scope.loading = true;
                    $scope.blockText = 'verifying user roles...'

					$scope.security = {};
                    $q.when($scope.getDocumentFn())
                    .then(function(document){

						if(!document || !document.header || !document.header.languages)
                            return $scope.loadSecurity();
                            
                        $q.when(document)
                        .then(function(document){
                            
                            $scope.languages = document.header.languages;
                            var identifier = document.header.identifier;
                            var schema     = document.header.schema;

                            var a = storage.documents.exists(identifier).then(function(exist){

                                var q = exist
                                    ? storage.documents.security.canUpdate(document.header.identifier, schema)
                                    : storage.documents.security.canCreate(document.header.identifier, schema);

                                return q.then(function(allowed) {
                                    $scope.security.canSave = allowed
                                });
                            })

                            var b = storage.drafts.exists(identifier).then(function(exist){

                                var q = exist
                                    ? storage.drafts.security.canUpdate(document.header.identifier, schema)
                                    : storage.drafts.security.canCreate(document.header.identifier, schema);

                                return q.then(function(allowed) {
                                    $scope.security.canSaveDraft = allowed
                                });
                            })

                            $scope.documentUID = document.header.identifier;

                            return $q.all([a,b]);

                        })
                        .then(function(){
                            if($scope.security.canSaveDraft==false)
                                openUnAuthorizedDialog();
                            else
                                loadReviousWorkflow($scope.documentUID);
                            $scope.loading = false;
                            $scope.blockText = undefined;
                        })
                        .catch(function(e){
                            $scope.loading = true;
                            $scope.blockText = 'Error occurred, please try again';
                        })
                        // .finally(function(){

                        //     $scope.loading = false;
                        //     $scope.blockText = undefined;
                        // });

                    })
				}

                //====================
				//
				//====================
				$scope.review = function()
				{
                    $scope.loading = true;
                    $scope.blockText = 'Analyzing your document...'
                    $scope.validationReport = undefined;                    
					$scope.validationReport = {isAnalyzing:true};
                    $scope.errorMessage              = null;
					var qReport   = validate($scope.getDocumentFn());

					return $q.when(qReport).then(function(validation) {

						var validationReport = validation;
						//Has validation errors ?
						if(validationReport && validationReport.errors && validationReport.errors.length>0) {
                            
                            $scope.switchTab("review");
                            // $scope.$emit("documentInvalid", validationReport);
                           // $scope.tab = "review";
                            $scope.validationReport = validationReport;
                        }
                        else
                            $scope.validationReport = {};
                    }).catch(function(error){
						showError(null, { action: "review", error: error });
                        $scope.validationReport = undefined;
					}).finally(function(){
                        $scope.loading = false;
                        $scope.blockText = undefined;
					});
                }
				//====================
				//
				//====================
				$scope.publish = function()
				{
                        $scope.loading          = true;
                        $scope.blockText = 'Analyzing your document...'
					    $scope.validationReport = {isAnalyzing:true};
					    $scope.errorMessage     = null;
					var qDocument               = $scope.getDocumentFn();
					var qReport                 = validate(qDocument);

					return $q.all([qDocument, qReport]).then( async function(results) {

						var document         = results[0];
						var validationReport = results[1];

						if(!document)
							throw "Invalid document";

						//Has validation errors ?
						if(validationReport && validationReport.errors && validationReport.errors.length>0) {
                            $scope.validationReport = validationReport;
                            $scope.tab = "review";
						}
						else {

					        $scope.validationReport = {isSaving:true};
                            var processRequest;
                            let workflow ;
                            // In case of edit publish-request $route.current.params.workflow is the parent record workflow
                            if ($route?.current?.params?.workflow) {
                                workflow = await workflowsApi.getWorkflow($route.current.params.workflow);
                            }
                            if(workflow?.data.identifier === document.header.identifier) {
                                var metadata = {};
                                $scope.blockText = 'unlocking workflow';
                                processRequest   =  unlockAndSaveDraft(document, metadata)
                                                    .then(function(data){
                                                        $scope.blockText        = 'Publishing document'
                                                        return IWorkflows.updateActivity($route.current.params.workflow, 'publishRecord', { action : 'approve' })
                                                    });
                            }
                            else{
                                $scope.blockText        = 'Publishing document'
                                processRequest = editFormUtility.publish(document);
                            }

                            return $q.when(processRequest)
                            .then(function(documentInfo) {

                                $('form').filter('.dirty').removeClass('dirty');
    							documentPublished(document, documentInfo._id);
                                originalDocument =  angular.copy(document);

                                $scope.onPostPublishFn({ data: documentInfo });
    							return documentInfo;

    						});
                        }
					}).catch(function(error){

                        showError(null,  { action: "publish", error: error });                        
					    $scope.validationReport = undefined;

					}).finally(function(){
                        $scope.loading = false;
                        $scope.blockText = undefined;
					});
				};

				//====================
				//
				//====================
				$scope.publishRequest = function()
				{
                    $scope.loading = true;
                    $scope.blockText = 'Analyzing your document...'					
					$scope.validationReport = {isAnalyzing:true};
                   $scope.errorMessage              = null;
					var qDocument = $scope.getDocumentFn();
					var qReport   = validate(qDocument);

					return $q.all([qDocument, qReport]).then(function(results) {

						var document         = results[0];
						var validationReport = results[1];

						if(!document)
							throw "Invalid document";

						//Has validation errors ?
						if(validationReport && validationReport.errors && validationReport.errors.length>0) {

                            $scope.$emit("documentInvalid", validationReport);
                            $scope.tab = "review";
						}
						else{

                            $element.find('#continueRequest').bind('click', function(){
					            $scope.validationReport = {isSaving:true};
                                $scope.closeAddInfoDialog(true);
                                $scope.loading = true;
                                $scope.blockText        = 'Requesting publication'
                                $q.when(editFormUtility.publishRequest(document,$scope.InfoDoc ? $scope.InfoDoc.additionalInfo:''))
                                .then(function(workflowInfo) {

                                    $('form').filter('.dirty').removeClass('dirty');
                                    documentPublishRequested(document, workflowInfo._id);
                                    originalDocument = angular.copy(document);
                                    $scope.onPostRequestFn({ data: workflowInfo });
                                    return workflowInfo;

                                }).catch(function(error){
                                    showError(null,  { action: "publishRequest", error: error })

                                }).finally(function(){
                                        $scope.loading = false;
                                        $scope.blockText        = undefined
                                });

                            });
                            return 	$scope.showAdditionalInfoDialog(true);
                        }

					}).catch(function(error){
						showError(null,  { action: "publishRequest", error: error });
                        $scope.validationReport = undefined;
					}).finally(function(){
                            $scope.loading = false;
                            $scope.blockText        = undefined;
                    });

				};

                $scope.continuePublishRequest = function(){
                    var qDocument = $scope.getDocumentFn();
                }

				//====================
				//
				//====================
				$scope.saveDraft = function()
				{
                    $scope.tab = 'edit';
                    $scope.loading = true;
                    $scope.blockText        = 'Saving draft document'
                   $scope.errorMessage              = null;
					return $q.when($scope.getDocumentFn()).then(async function(document)
					{
						if(!document)
							throw "Invalid document";
                        let workflow ;
                        if ($route?.current?.params?.workflow)
                                workflow = await workflowsApi.getWorkflow($route.current.params.workflow);

                        if(workflow?.data.identifier === document.header.identifier) {
                            var metadata = {};
                            $scope.blockText        = 'unlocking workflow';
                            
                            return unlockAndSaveDraft(document, metadata)
                            .then(function(draftInfo) {
                                showShareDocument(draftInfo); // not sure if this is needed here.
                                return afterDraftSaved(draftInfo);
                            })
                            .catch(function(error){
                                showError(null,  { action: "saveDraft", error: error })
                            }).finally(function(){
                                $scope.loading = false;
                            });
                        }
                        else{
                            return editFormUtility.saveDraft(document)
                                    .then(function(draftInfo){
                                        return afterDraftSaved(draftInfo);
                                    });
                        }                            

                        function afterDraftSaved(draftInfo){
                            toastr.info(toasterMessages.draftSaveMessage);

                            $('form').filter('.dirty').removeClass('dirty');
                            originalDocument = angular.copy($scope.getDocumentFn());
                            documentDraftSaved(draftInfo);
                            if(!$scope.isDialog)
                                $location.path($location.path().replace(/\/new/, '/'+ draftInfo.identifier + '/edit')).search({softReload:'true'});
                            return draftInfo;
                        }

					}).catch(function(error){
						showError(null,  { action: "saveDraft", error: error });
					}).finally(function(){
                            $scope.loading = false;
                            $scope.blockText        = undefined;
					});
				};				

                //====================
				//
				//====================
                
				$scope.close = function(closeDialog)
				{
                    if(!closeDialog)
                        return closeDocument(true);

					return $scope.closeDialog().then(function() {
						closeDocument();
					}).catch(function(error){

						showError(null,  { action: "close", error: error })

					}).finally(function(){

						return $scope.closeDialog();

					});
				};

				//====================
				//
				//====================
				$scope.closeDialog = function()
				{
					return $q.all([$scope.showCancelDialog(false)])
                    .finally(function(){
                        $rootScope.$emit('$locationChangeCancelled', {});
                        $scope.loading = false;
                        $scope.blockText        = undefined;
					});
				};

                $scope.closeAddInfoDialog = function(changeLoading)
                {
                    return $q.all([$scope.showAdditionalInfoDialog(false)]).finally(function(){
                        $scope.loading = changeLoading;
                        $scope.blockText        = undefined;
                    });
                };

                $scope.switchTab = function(tab, initial){
                    
                    $scope.disablePreviousBtn = false;
                    $scope.disableNextBtn = false;
                    
                    if(!initial && tab==$scope.tab)
                        return;

                    $scope.tab = tab;
                    $scope.onStepChangeFn({tab : tab})

                    if(tab == "review" || tab == "edit" || tab == "intro" || tab == "publish")
                        $scope.updateStep(tab);
                    
                    if(tab == "intro"){
                        $scope.$watch('::documentType', function(newVal) {
                            if (newVal) {
                                loadArticle();
                            }
                        });
                        $scope.disablePreviousBtn = true;
                    }

                    if(tab == "review" || tab == "publish"){
                        $scope.review();
                        updateDocumentViewLanguage();
                    }

                    if(tab == "publish")
                        $scope.disableNextBtn = true;
                }

                $scope.updateStep = function(tab){
                    $(".progressbar li").removeClass('active');
                    $(".step" + tab).addClass('active');
                    $(".step" + tab).prevAll().addClass('active');

                }
                $scope.onReviewLanguageChange = function(lang){
                    $scope.selectedLanguage=lang;
                    $scope.onReviewLanguageChangeFn({lang:lang})
                } 

                $scope.$on('$destroy', function(){
					$timeout.cancel(saveDraftVersionTimer);
					$window.onbeforeunload = undefined;
                });
                
                $scope.$on("documentError", showError);
                function showError(evt, data){

                    if(data){
                        $scope.showError = true;
                        $scope.errorMessage = 'Your action to ';
                        if(data.action=='saveDraft')
                            $scope.errorMessage += 'save draft ';
                        else if(data.action=='publish')
                            $scope.errorMessage += 'publish ';
                        else if(data.action=='publishRequest')
                            $scope.errorMessage += 'request publication ';

                        $scope.errorMessage += 'was not successful. ';

                        $('#divShowError').show('slow');

                        if(data.error && data.error.data && (data.error.data.Message||data.error.data.message))
                            $scope.errorMessage += data.error.data.Message||data.error.data.message;
                        else if(data.error && data.error.data)
                            $scope.errorMessage += data.error.data;

                        if(!$scope.validationReport)
                            $scope.validationReport = {};
                        $scope.validationReport.isSaving=false;
                    }
                }

				//====================
				//
                //====================
                
                function openUnAuthorizedDialog(){
                    ngDialog.open({
                        template: 'dialogUnauthorise',
                        closeByDocument: false, showClose:false,
                        closeByNavigation:false, closeByEscape:false,
                        className:'ngdialog ngdialog-theme-default unauthorized-access-dialog',
                        controller: function($scope){

                                $scope.closeAccessDialog = function(){
                                    ngDialog.close();
                                    closeDocument(true);
                                }
                        }
                    })
                }

                function loadReviousWorkflow(identifier){
                    if($route.current.params.workflow)
                        return;

                    var query = {'data.identifier':identifier}
                    IWorkflows.query(query, undefined, 1).then(function(workflows){
                        if(workflows.length>0){
                            var workflow = workflows[0];
                            if((workflow.result||{}).action=='rejected'){
                                $scope.rejectedWorkflow = _.find(workflow.activities, function(activity){return activity.result.action == 'reject'});
                            }
                        }
                    })
                }

				function validate(document) {
                    
					return $q.when(document).then(function(document){

						if(!document)
							throw "Invalid document";

						return storage.documents.validate(document);

					}).then(function(result) {

						return result.data || result;
					});
				}


                function closeDocument(skipToast){
                    if(!skipToast)
                        toastr.info(toasterMessages.closeWithoutSaving);

                    var environmentRealmHosts = environmentRealms.map(({ baseURL }) => baseURL+'/');
                    environmentRealmHosts.push('http://localhost:2010/');
                   $timeout(function() {
                       if($route.current.params.workflow){
                           $timeout(function() {
                               $location.url('/register/' + $filter("urlSchemaShortName")($scope.documentType)+'/' + $route.current.params.identifier + '/view');
                           }, 100);
                       }
                       else if ($rootScope.next_url) {
                           var url = $rootScope.next_url.replace($location.$$protocol + '://' +
                               $location.$$host + ($location.$$host != 'absch.cbd.int' ? ':' + $location.$$port : '') + '/', '');
                           _.forEach(environmentRealmHosts, function(host) {
                               url = url.replace(host, '');
                           });
                           url = url.replace(/^(en|ar|fr|es|ru|zh)\//, '/');
                           $timeout(function() {
                               $location.url(url);
                           }, 100)
                       } else {
                           $timeout(function() {
                               $location.url('/register/' + $filter("urlSchemaShortName")($scope.documentType));
                           }, 100);
                       }
                   }, 100);

                }

                //============================================================
                //
                // Occurs when edit-form is closed and document is saved as draft
                //
                //============================================================
                function documentDraftSaved(){
                    // evt.stopPropagation();
                    // $scope.editing = false;
                    // $rootScope.updatedRecord = draftInfo;
                };

                //============================================================
                //
                // Occurs when edit-form is closed and document is saved as draft
                // and a request for publication is sent to a FocalPoint/Admin
                //
                //============================================================
                function documentPublishRequested(documentInfo, workflowId) {

                    if(_.includes(appConfigService.referenceSchemas, documentInfo.header.schema)){
                        toastr.info(toasterMessages.publishRequestedSCBD);
                    }
                    else{
                        if($scope.isBch){
                        toastr.info(toasterMessages.publishRequestedBCH)
                       }
                       else {
                        toastr.info(toasterMessages.publishRequestedABS)  
                       }
                    }
                    localStorageService.set('workflow-activity-status', {
                        identifier : documentInfo.header.identifier, type:'request',
                        workflowId : workflowId
                    });

                    if(!$scope.isDialog){
                        $timeout(function() {
                            $location.path('/register/' + $filter("urlSchemaShortName")($scope.documentType));
                        }, 1000);
                    }

                };

                //============================================================
                //
                // Occurs when edit-form is closed and document is saved
                // and published directly to the repository
                //
                //============================================================
                function documentPublished(documentInfo, workflowId) {

                    toastr.info(toasterMessages.recordPublished); 
                    if(documentInfo.header.schema!= 'contact'){
                        localStorageService.set('workflow-activity-status', {
                            identifier : documentInfo.header.identifier, type:'publish',
                            workflowId : workflowId
                        });
                    }
                    if(!$scope.isDialog){
                        $timeout(function() {
                            $location.path('/register/' + $filter("urlSchemaShortName")($scope.documentType));
                        }, 1000);
                    }

                };

                //============================================================
                async function loadArticle(schema){
                        schema = schema || $scope.documentType;

                        if($scope.article)
                            return;

                        $scope.loading = true;
                        $scope.blockText        = 'loading Information about the form';
                        $scope.articleAdminTags = ['edit-form', realm.value.replace(/(\-[a-zA-Z]{1,5})/, ''), $filter("urlSchemaShortName")(schema)];

                        var ag = [];
                        ag.push({"$match":{"adminTags": { "$all" : $scope.articleAdminTags.map(encodeURIComponent) }}});
                        ag.push({"$project" : {"title":1, "content":1, "_id":1}});
                        
                        var qs = {
                            "ag" : JSON.stringify(ag)
                        };

                        articlesService.getArticles(qs, true).then(function(data){
                            if(data)
                                $scope.article = data[0];
                        })
                        .finally(function(){
                            $scope.loading = false;
                            $scope.blockText        = undefined;
                        });
                }

                function updateDocumentViewLanguage(){
                    $scope.selectedLanguage = locale;
                    if($scope.languages.indexOf(locale)<0)
                        $scope.selectedLanguage = $scope.languages[0]
                }


                function saveDraftVersion(){
					
					$q.when($scope.onPreSaveDraftVersionFn())
					.then(function(doc){

						doc = doc || $scope.getDocumentFn();

						$q.when(doc).then(function(document){
					
							if(document && !angular.equals(document, previousDraftVersion)){
								var userId = $rootScope.user.userID;
								var identifier = document.header.identifier;
								var schema     = document.header.schema;

								var key = schema+'_'+identifier+'_'+userId;

								$http.put('/api/v2018/temporary-documents/'+key, {data: document})
								.then(function(result){
									previousDraftVersion = angular.copy(document);
									saveDraftVersionTimer = $timeout(function(){saveDraftVersion();},100000);
								})
								.catch(function(err){
									console.log(err);
									saveDraftVersionTimer = $timeout(function(){saveDraftVersion();},5000);
								});
							}
							else{
								saveDraftVersionTimer = $timeout(function(){saveDraftVersion();},100000);
							}
						});
					});
				}

                async function loadOfflineFormatDetails(){
                    if(realm.is('BCH')){
                        const data = await import('~/app-data/bch/offline-formats.json');                        
                        $scope.offlineFormats = data.default
                        $timeout(function(){
                            $element.find("[data-bs-toggle='tooltip']").tooltip({
                                trigger: 'hover'
                            });
                        }, 100)
                    }
                }

				function showShareDocument(document){
					if(document && !$scope.documentShare){
						if(document.workingDocumentID){
							$scope.documentShare = {
								workingDocumentID : document.workingDocumentID, 
								identifier: document.identifier,
								title: document.title
							};
						}
						else{
							storage.drafts.get(document.identifier, {info:true})
							.then(function(response){
								if(response.data && response.data.workingDocumentID){
									$scope.documentShare = {
										workingDocumentID : response.data.workingDocumentID, 
										identifier: response.data.identifier,
										title: response.data.title
									};
								}
							})
							.catch(function(err){
                                if(err.status != 404)
								    console.log(err);
							});
						}
					}
				}

                async function unlockAndSaveDraft(document, metadata) {

                    $scope.blockText        = 'validating your permissions';
                    const canEdit = await storage.drafts.security.canUpdate(document.header.identifier, document.header.schema, metadata);
                    if(!canEdit)
                        throw new Error("You are not authorized to edit this document");

                    $scope.blockText        = 'getting lock information';
                    const lockInfo = await storage.drafts.locks.get(document.header.identifier,{lockID:''});
                    
                    $scope.blockText        = 'unlocking draft';
                    await storage.drafts.locks.delete(document.header.identifier, lockInfo.data[0].lockID);

                    $scope.blockText        = 'saving draft document';
                    const draftInfo = await storage.drafts.put(document.header.identifier, document);

                    $scope.blockText        = 'locking working document';
                    await storage.drafts.locks.put(document.header.identifier, {lockID:lockInfo.data[0].lockID});

                    return draftInfo;
                }

                //============================================================
                $scope.loadSecurity();
                loadOfflineFormatDetails();







                ////////////////////////////////////////////////////////////////////
                //// NEEDS CLEANUP/////////////////////////////////////////////////


                    var consideringClosing = false;
                    //TODO: burn angular... essentially the issue is that this function is called once the ng-include finished with the form html, but that form html still needs to be parsed and the directives still need to load THEIR templates, so those inputs aren't in the form yet... hence while change isn't triggering.
                    var attachEvents = _.once(function() {
                        $timeout(function() {
                            $('.editForm input').change(function() {
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

                    function canCreate(document){
                        $q.when(storage.drafts.security.canCreate(document.header.identifier, document.header.schema)).then(function(doc) {
                            if(!doc.isAllowed){
                            $scope.status = "hidden";
                            $scope.error  = "You are not authorized to modify this record";
                            }
                        }).catch(function(err) {
                            $scope.onErrorFn({ error : err.data, code : err.status})
                            throw err;
                        });
                    }
                    $rootScope.$on("loadDocument", function(event, data) {
                        originalDocument = angular.copy(data.document);

						showShareDocument({identifier:originalDocument.header.identifier});
                        $timeout(function(){
                            if(!saveDraftVersionTimer)
                                saveDraftVersion();
                        }, 5000);
                    });

                    $rootScope.$on("loadDocumentError", function(event, data) {
                        if(data?.status == 'notAuthorized'){
                            documentLoadError = true;
                            $scope.loading = false;
                            $scope.blockText = undefined;
                            openUnAuthorizedDialog();
                        }
                    });

                    $rootScope.$on('$includeContentLoaded', function(event) {

                        if($('#dialogCancel').length != 0){
                            attachEvents();
                        }
                    });
                    function confirmLeaving(evt, next, current) {
                        if(($scope.security||{}).canSaveDraft==false)
                            return;

                        var formChanged = !angular.equals($scope.getDocumentFn(), originalDocument);

                        if(formChanged)
                            $('.editForm').closest('form').addClass('dirty');

                        if(consideringClosing || $('form').filter('.dirty').length == 0)
                            return;

                        evt.preventDefault();
                        $('#dialogCancel').modal('show');
                        $rootScope.next_url = next;
                        consideringClosing = true;
                    }

                    $scope.$on('$locationChangeStart', confirmLeaving);
                    $scope.$on('$locationChangeSuccess', function(evt, data){
                        $rootScope.next_url = undefined;
                    });

                    $window.onbeforeunload = onBeforeUnload;

                    function onBeforeUnload(e) {
                        if($rootScope.isFormLeaving)
                            return;
                        var formChanged = !angular.equals($scope.getDocumentFn(), originalDocument);
                        if(!originalDocument || !formChanged){
                            return;
                        }
                        // console.log(e);
                        e.preventDefault();	// Cancel the event as stated by the standard.					
                        if (e) {
                            e.returnValue = '';// Chrome requires returnValue to be set.
                        }
                      
                        // For Safari
                        return '';
                    }

                    $rootScope.$on('event:sessionExpired-signIn', function(evt, data){
                        $scope.error = null;
                        if($scope.tab == "review" || $scope.tab=='publish')
                        validate();
                    })

                /////////////////////////////////////////////////////////////////////


                if($location.search().softReload == 'true'){
                    $timeout(()=>{
                        $scope.tab = 'edit';
                    }, 300)
                }
                if($scope.tab!='edit') 
                    $scope.switchTab($scope.tab, true)
            }
    	};

    }]);

