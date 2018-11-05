define(['app', 'text!views/directives/workflow-arrow-buttons.html', 'underscore',
        'views/directives/workflow-history-directive',
        'toastr', 'services/local-storage-service', 'services/app-config-service', 'services/articles-service',
], function (app, template) {
    
    app.directive('workflowArrowButtons',["$rootScope", "IStorage", "editFormUtility", "$route","IWorkflows",
    'toastr', '$location', '$filter', '$routeParams', 'appConfigService', 'realm', '$http','$timeout', '$q', 'localStorageService', 'articlesService',
    function ($rootScope,  storage, editFormUtility, $route, IWorkflows, toastr, $location, $filter, 
            $routeParams, appConfigService, realm, $http, $timeout, $q, localStorageService, articlesService){

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
                onErrorFn: "&onError",
                validationReport    : '=?'
    		},
            link : function($scope, $element, $attr){

                var originalDocument;
                var next_fs
                var document_type = $filter("mapSchema")($route.current.$$route.documentType);
                var isDialog      = $attr.isDialog||false;

                //BOOTSTRAP Dialog handling
				var qCancelDialog         = $element.find("#dialogCancel");
				var qAdditionalInfoDialog = $element.find("#divAdditionalInfo");
				var qWorkflowDraftDialog  = $element.find("#divWorkflowDraft");

                $scope.container                   = $attr.container;
                $scope.cancelDialogDefered         = [];
                $scope.AdditionalInfoDialogDefered = [];
                $scope.WorkflowDraftDialogDefered  = [];
                $scope.workflowScope               = $scope;
                
                if(!$scope.tab)
                    $scope.tab = 'edit';

                $attr.$observe('isDialog', function(){
                    isDialog = $attr.isDialog||false
                })
                $attr.$observe('container', function(){
                    $scope.container  = $attr.container; 
                })


                
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

                $scope.showWorkflowDraftDialog = function(visible) {
                    var isVisible = qWorkflowDraftDialog.css("display")!='none';
                    if(visible == isVisible)
                        return $q.when(isVisible);
                    var defered = $q.defer();
                    $scope.WorkflowDraftDialogDefered.push(defered)
                    qWorkflowDraftDialog.modal(visible ? "show" : "hide");
                    return defered.promise;
                }

                qWorkflowDraftDialog.on('shown.bs.modal' ,function() {
                    $timeout(function(){
                        var promise = null;
                        while((promise=$scope.WorkflowDraftDialogDefered.pop()))
                            promise.resolve(true);
                    });
                });

                qWorkflowDraftDialog.on('hidden.bs.modal' ,function() {
                    $timeout(function(){
                        var promise = null;
                        while((promise=$scope.WorkflowDraftDialogDefered.pop()))
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

					$scope.loading = true;
                    if(!$scope.getDocumentFn().header || !$scope.getDocumentFn().header.languages)
                        return $scope.loadSecurity();

					$scope.security = {};
					$q.when($scope.getDocumentFn()).then(function(document){

						if(!document || !document.header)
							return;

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

					}).finally(function(){

						$scope.loading = false;
					});
				}

                //====================
				//
				//====================
				$scope.review = function()
				{
					$scope.loading = true;                    
					$scope.validationReport = {isAnalyzing:true};
                   $scope.errorMessage              = null;
					var qReport   = validate($scope.getDocumentFn());

					return $q.when(qReport).then(function(validation) {

						var validationReport = validation;
						//Has validation errors ?
						if(validationReport && validationReport.errors && validationReport.errors.length>0) {
                            // $scope.$emit("documentInvalid", validationReport);
                            $scope.tab = "review";
                            $scope.validationReport = validationReport;
                        }
                        else
                            $scope.validationReport = {};
                    }).catch(function(error){
						showError(null, { action: "review", error: error });
                        $scope.validationReport = undefined;
					}).finally(function(){
						$scope.loading = false;
					});
                }
				//====================
				//
				//====================
				$scope.publish = function()
				{
					    $scope.loading          = true;
					    $scope.validationReport = {isAnalyzing:true};
					    $scope.errorMessage     = null;
					var qDocument               = $scope.getDocumentFn();
					var qReport                 = validate(qDocument);

					return $q.all([qDocument, qReport]).then(function(results) {

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
                            if($route.current.params.workflow){
                                var metadata = {};
                                processRequest =  storage.drafts.security.canUpdate(document.header.identifier, document.header.schema, metadata)
                                                    .then(function(edit){
                                                        return storage.drafts.locks.get(document.header.identifier,{lockID:''})
                                                    })
                                                    .then(function(lockInfo){
                                                        return storage.drafts.locks.delete(document.header.identifier, lockInfo.data[0].lockID)
                                                                .then(function(){
                                                                    return storage.drafts.put(document.header.identifier, document);
                                                                })
                                                                .then(function(draftInfo){
                                                                    return storage.drafts.locks.put(document.header.identifier, {lockID:lockInfo.data[0].lockID});
                                                                })
                                                    })
                                                    .then(function(data){
                                                        return IWorkflows.updateActivity($route.current.params.workflow, 'publishRecord', { action : 'approve' })
                                                    });
                            }
                            else{
                                processRequest = editFormUtility.publish(document);
                            }

                            return $q.when(processRequest)
                            .then(function(documentInfo) {

                                $('form').filter('.dirty').removeClass('dirty');
    							documentPublished(document, documentInfo._id);
                                originalDocument =  document;

                                $scope.onPostPublishFn({ data: documentInfo });
    							return documentInfo;

    						});
                        }
					}).catch(function(error){

                        showError(null,  { action: "publish", error: error });                        
					    $scope.validationReport = undefined;

					}).finally(function(){
                            $scope.loading = false;
                            
					});
				};

				//====================
				//
				//====================
				$scope.publishRequest = function()
				{
					$scope.loading = true;					
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
                                $q.when(editFormUtility.publishRequest(document,$scope.InfoDoc ? $scope.InfoDoc.additionalInfo:''))
                                .then(function(workflowInfo) {

                                    $('form').filter('.dirty').removeClass('dirty');
                                    documentPublishRequested(document, workflowInfo._id);
                                    originalDocument = document;
                                    $scope.onPostRequestFn({ data: workflowInfo });
                                    return workflowInfo;

                                }).catch(function(error){
                                    showError(null,  { action: "publishRequest", error: error })

                                }).finally(function(){
                                        $scope.loading = false;
                                   //closeDocument()
                                });

                            });
                            return 	$scope.showAdditionalInfoDialog(true);
                        }

					}).catch(function(error){
						showError(null,  { action: "publishRequest", error: error });
                        $scope.validationReport = undefined;
					}).finally(function(){
                            $scope.loading = false;
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
                   $scope.errorMessage              = null;
					return $q.when($scope.getDocumentFn()).then(function(document)
					{
						if(!document)
							throw "Invalid document";
                        if($route.current.params.workflow){

                            $element.find('#continueWorkflowDraftRequest').bind('click', function(){
                                $scope.closeWorkflowDraftDialog(true);
                                $scope.loading = true;
                                storage.drafts.security.canUpdate(document.header.identifier, document.header.schema, {})
                                        .then(function(edit){
                                           return storage.drafts.locks.get(document.header.identifier,{lockID:''})
                                        })
                                        .then(function(lockInfo){
                                           return storage.drafts.locks.delete(document.header.identifier, lockInfo.data[0].lockID)
                                        })
                                        .then(function(){
                                           return storage.drafts.put(document.header.identifier, document);
                                        })
                                        .then(function(draftInfo){
                                           $location.search('workflow', null);
                                           return afterDraftSaved(draftInfo);
                                        }).catch(function(error){
                                            showError(null,  { action: "saveDraft", error: error })
                                        }).finally(function(){
                                            $scope.loading = false;
                                        });

                            });

                            return 	$scope.showWorkflowDraftDialog(true);
                        }
                        else{
                            return editFormUtility.saveDraft(document)
                                    .then(function(draftInfo){
                                        return afterDraftSaved(draftInfo);
                                    });
                        }                            

                        function afterDraftSaved(draftInfo){
                            toastr.info($element.find('#msgDraftSaveMessage').text());

                            $('form').filter('.dirty').removeClass('dirty');
                            originalDocument = $scope.getDocumentFn();
                            documentDraftSaved(draftInfo);
                            if(!isDialog)
                                $location.path($location.path().replace(/\/new/, '/'+ draftInfo.identifier + '/edit'));
                            return draftInfo;
                        }

					}).catch(function(error){
						showError(null,  { action: "saveDraft", error: error });
					}).finally(function(){
						    $scope.loading = false;
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
					return $q.all([$scope.showCancelDialog(false)]).finally(function(){
						$scope.loading = false;
					});
				};

                $scope.closeAddInfoDialog = function(changeLoading)
                {
                    return $q.all([$scope.showAdditionalInfoDialog(false)]).finally(function(){
                        $scope.loading = changeLoading;
                    });
                };

                $scope.closeWorkflowDraftDialog = function(changeLoading)
                {
                    return $q.all([$scope.showWorkflowDraftDialog(false)]).finally(function(){
                        $scope.loading = changeLoading;
                    });
                };

                $scope.switchTab = function(tab){
                    if(tab==$scope.tab)
                        return;

                    $scope.tab = tab;

                    if(tab == "review" || tab == "edit" || tab == "intro" || tab == "publish")
                        $scope.updateStep(tab);
                    
                    if(tab == "intro")
                        loadArticle(document_type);

                    if(tab == "review" || tab == "publish")
                        $scope.review();
                }

                $scope.updateStep = function(tab){
                    $(".progressbar li").removeClass('active');
                    $(".step" + tab).addClass('active');
                    $(".step" + tab).prevAll().addClass('active');

                }

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

                        $scope.validationReport.isSaving=false;
                    }
                }

				//====================
				//
				//====================
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
                        toastr.info("Your record has been closed without saving.");

                    var absHosts = ['https://absch.cbddev.xyz/', 'https://training-absch.cbd.int/',
                       'http://localhost:2010/', 'https://absch.cbd.int/', 'https://absch.cbddev.xyz/',
                   ]
                   $timeout(function() {
                       if($route.current.params.workflow){
                           $timeout(function() {
                               $location.url('/register/' + $filter("urlSchemaShortName")(document_type)+'/' + $route.current.params.identifier + '/view');
                           }, 100);
                       }
                       else if ($rootScope.next_url) {
                           var url = $rootScope.next_url.replace($location.$$protocol + '://' +
                               $location.$$host + ($location.$$host != 'absch.cbd.int' ? ':' + $location.$$port : '') + '/', '');
                           _.each(absHosts, function(host) {
                               url = url.replace(host, '');
                           });
                           url = url.replace(/^(en|ar|fr|es|ru|zh)\//, '/');
                           $timeout(function() {
                               $location.url(url);
                           }, 100)
                       } else {
                           $timeout(function() {
                               $location.url('/register/' + $filter("urlSchemaShortName")(document_type));
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

                    if(_.contains(appConfigService.referenceSchemas, documentInfo.header.schema)){
                        toastr.info('Record saved. A publishing request has been sent to your SCBD.');
                    }
                    else
                        toastr.info('Record saved. A publishing request has been sent to your Publishing Authority.');
                        
                    localStorageService.set('workflow-activity-status', {
                        identifier : documentInfo.header.identifier, type:'request',
                        workflowId : workflowId
                    });

                    if(!isDialog){
                        $timeout(function() {
                            $location.path('/register/' + $filter("urlSchemaShortName")(document_type));
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

                    toastr.info('Record published. The record will be now publicly accessible on ABSCH.');
                    if(documentInfo.header.schema!= 'contact'){
                        localStorageService.set('workflow-activity-status', {
                            identifier : documentInfo.header.identifier, type:'publish',
                            workflowId : workflowId
                        });
                    }
                    if(!isDialog){
                        $timeout(function() {
                            $location.path('/register/' + $filter("urlSchemaShortName")(document_type));
                        }, 1000);
                    }

                };

                function loadArticle(schema){
                    
                    if($scope.article)
                        return;

                    $scope.loading = true;
                    var ag = [];
                    ag.push({"$match":{"adminTags.title.en": { "$all" :
                        [   encodeURIComponent('edit-form'), encodeURIComponent(realm.value),
                            encodeURIComponent($filter("urlSchemaShortName")(document_type))]}}
                    });
                    ag.push({"$project" : {"title":1, "content":1}});
                    
                    var qs = {
                      "ag" : JSON.stringify(ag)
                    };

                    articlesService.getArticles(qs).then(function(data){
                        $scope.article = data[0];
                    })
                    .finally(function(){
                        $scope.loading = false;
                    })
                }

                $scope.loadSecurity();







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
                            $scope.onError(err.data, err.status)
                            throw err;
                        });
                    }
                    $rootScope.$on("loadDocument", function(event, data) {
                        console.log(data)
                        originalDocument = data.document;
                    });

                    $rootScope.$on('$includeContentLoaded', function(event) {

                        if($('#dialogCancel').length != 0){
                            attachEvents();
                        }
                    });
                    function confirmLeaving(evt, next, current) {
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

                    $rootScope.$on('event:sessionExpired-signIn', function(evt, data){
                        $scope.error = null;
                        if($scope.tab == "review" || $scope.tab=='publish')
                        validate();
                    })

                //////////////////////////////////////////////////////////////////////

                $scope.changeTab = function(type){
                    switch ($scope.tab) {
                        case 'intro':{
                            $scope.prevTab = undefined;
                            $scope.nextTab = 'edit';
                            break;
                        }
                        case 'edit':{
                            $scope.prevTab = 'intro';
                            $scope.nextTab = 'review';
                            break;
                        }
                        case 'review':{
                            $scope.prevTab = 'edit';
                            $scope.nextTab = 'publish';
                            break;
                        }
                        case 'publish':{
                            $scope.prevTab = 'review';
                            $scope.nextTab = undefined;
                            break;
                        }
                        default:{
                            $scope.prevTab = undefined;
                            $scope.nextTab = undefined;
                            break;
                        }
                    }

                    if(type=='prev' && $scope.prevTab)
                        $scope.switchTab($scope.prevTab);
                    else if(type=='next' && $scope.nextTab)
                        $scope.switchTab($scope.nextTab);

                    if(type)
                        $scope.changeTab();
                }

                $scope.changeTab();
            }
    	};

    }]);
});
