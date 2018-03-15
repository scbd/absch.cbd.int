define(['app', 'text!views/directives/workflow-std-buttons.html', 'underscore',
        'views/directives/workflow-history-directive',
        'toastr', 'services/local-storage-service', 'services/app-config-service'
], function (app, template) {

    app.directive('workflowStdButtons',["$q", "$timeout", "localStorageService",
     function($q, $timeout, localStorageService){

    	return{
    		restrict: 'EAC',
    		replace:false,
    		template: template,
    		scope: {
    			getDocumentFn : '&document',
                languages     : '=languages',
                hideTimer     : '@hideTimer'
    		},
    		controller: ["$rootScope","$scope", "IStorage", "editFormUtility", "$route","IWorkflows",'$element', 'toastr', '$location', '$filter', '$routeParams', 'appConfigService',
            function ($rootScope, $scope, storage, editFormUtility, $route, IWorkflows, $element, toastr, $location, $filter, $routeParams, appConfigService)
			{
                var document_type =  $filter("mapSchema")($route.current.$$route.documentType);
                //////////////////////////////
                $scope.errors              = null;
                var next_fs
                $(".progressbar li button").click(function(){
                	next_fs = $(this).parent();
                    var classes = next_fs.attr("class").split(' ')

                    var selectedClass = _.find(classes, function(className){if(className.indexOf("step")>=0) return true; else return false;} );
                    next_fs = $('.' + selectedClass);
                    next_fs.nextAll().removeClass("active");
                    next_fs.prevAll().addClass("active");
                    next_fs.addClass("active");

                });

                //BOOTSTRAP Dialog handling
				var qCancelDialog = $element.find("#dialogCancel");
                var qAdditionalInfoDialog = $element.find("#divAdditionalInfo");
                var qWorkflowDraftDialog = $element.find("#divWorkflowDraft");

				$scope.cancelDialogDefered = [];
                $scope.AdditionalInfoDialogDefered = [];
                $scope.WorkflowDraftDialogDefered = [];

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
                        $scope.timer(true);
					});
				}

                $scope.timer = function(startNew){
                    if(startNew){
                        $scope.lastSaved = '';
                        $scope.lastSavedTime = moment();
                    }
                    var duration = moment.duration(moment() - $scope.lastSavedTime)
                    $scope.lastSaved = duration._data.hours + ':' + duration._data.minutes + ':' + duration._data.seconds
                    $timeout(function(){$scope.timer();},1000);
                }

				//====================
				//
				//====================
				$scope.publish = function()
				{
					$scope.loading = true;
					$scope.$emit("clearDocumentErrors");
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
						}
						else {

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
                                $scope.$emit("updateOrignalDocument", document);
    							return documentInfo;

    						});
                        }
					}).catch(function(error){

						$scope.$emit("documentError", { action: "publish", error: error })

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
					$scope.$emit("clearDocumentErrors");
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
						}
						else{

                            $element.find('#continueRequest').bind('click', function(){
                                $scope.closeAddInfoDialog(true);
                                $scope.loading = true;
                                $q.when(editFormUtility.publishRequest(document,$scope.InfoDoc ? $scope.InfoDoc.additionalInfo:''))
                                .then(function(workflowInfo) {

                                    $('form').filter('.dirty').removeClass('dirty');
                                    documentPublishRequested(document, workflowInfo._id);
                                    $scope.$emit("updateOrignalDocument", document);
                                    return workflowInfo;

                                }).catch(function(error){
                                    $scope.$emit("documentError", { action: "publishRequest", error: error })

                                }).finally(function(){
                                        $scope.loading = false;
                                   //closeDocument()
                                });

                            });
                            return 	$scope.showAdditionalInfoDialog(true);
                        }

					}).catch(function(error){
						$scope.$emit("documentError", { action: "publishRequest", error: error });
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
					$scope.loading = true;
                    $scope.$emit("clearDocumentErrors");
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
                                            $scope.$emit("documentError", { action: "saveDraft", error: error })
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
                            $scope.$emit("updateOrignalDocument", $scope.getDocumentFn());
                            documentDraftSaved(draftInfo);
                            $location.path($location.path().replace(/\/new/, '/'+ draftInfo.identifier + '/edit'));
                            return draftInfo;
                        }

					}).catch(function(error){
						$scope.$emit("documentError", { action: "saveDraft", error: error });
					}).finally(function(){
						    $scope.loading = false;
                            $scope.timer(true);
					});
				};

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

				//====================
				//
				//====================
				$scope.checkErrors = function()
				{
					$scope.errors = "";

					if($scope.errors.trim()=="")
						$scope.errors = null;
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

						$scope.$emit("documentError", { action: "close", error: error })

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

                $scope.$on("documentInvalid", function(){
                  $scope.tab = "review";
                });

                //==================================
                //
                //==================================
                $scope.$watch("tab", function(tab) {
                  if(tab == "review" || tab == "edit"){
                      $scope.$parent.tab = tab;
                      $scope.updateStep(tab);
                  }



                });
                $scope.$parent.$watch("tab", function(tab) {

                  if(tab == "review" || tab == "edit" ){
                      $scope.updateStep(tab);
                      $scope.tab = tab;
                  }
                });
                $scope.updateStep = function(tab){
                    $(".progressbar li").removeClass('active');
                    $(".step" + tab).addClass('active');
                    $(".step" + tab).prevAll().addClass('active');

                }

                $scope.$on("documentError",function(evt, data){

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

                        if(data.error && data.error.data && data.error.data.Message)
                            $scope.errorMessage += data.error.data.Message;

                    }
                });


                $scope.loadSecurity();

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

                    $timeout(function() {
                        $location.path('/register/' + $filter("urlSchemaShortName")(document_type));
                    }, 1000);

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
                    $timeout(function() {
                        $location.path('/register/' + $filter("urlSchemaShortName")(document_type));
                    }, 1000);

                };


            }]
    	};

    }]);
});
