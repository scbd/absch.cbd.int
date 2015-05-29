define(['app','angular-form-controls','/app/views/directives/workflow-history-directive.html.js'], function (app) {

    app.directive('workflowStdButtons',["$q", "$timeout","underscore",
     function($q, $timeout, _){

    	return{
    		restrict: 'EAC',
    		replace:false,
    		templateUrl: '/app/views/directives/workflow-std-buttons.html',
    		scope: {
    			getDocumentFn : '&document',
                languages     : '=languages',
                hideTimer     : '@hideTimer'
    		},
            link: function ($scope, $element)
			{
                //console.log($scope.hideTime)
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

				$scope.cancelDialogDefered = [];
                $scope.AdditionalInfoDialogDefered = [];

				$scope.showCancelDialog = function(visible) {
        			  if($('form').filter('.dirty').length == 0) {
        				 $scope.$emit("documentClosed");
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


                $scope.loadSecurity();
			},
    		controller: ["$rootScope","$scope", "IStorage", "editFormUtility", "$route","IWorkflows",'$element',
            function ($rootScope, $scope, storage, editFormUtility, $route, IWorkflows, $element)
			{

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

                            return $q.when(processRequest).then(function(documentInfo) {

                                // if($route.current.params.workflow){
                                //     IWorkflows.updateActivity($route.current.params.workflow, 'publishRecord', { action : 'approve' })
                                // }

    							if(documentInfo.type=='authority'){
    								//in case of authority save the CNA as a contact in drafts
    								saveAuthorityInContacts(documentInfo);
    							}
                                $('form').filter('.dirty').removeClass('dirty');
    							$scope.$emit("documentPublished", documentInfo, document);
                                $scope.$emit("updateOrignalDocument", document);
    							return documentInfo;

    						});
                        }
					}).catch(function(error){

						$scope.$emit("documentError", { action: "publish", error: error })

					}).finally(function(){
						    $scope.loading = false;
                            $scope.$emit("documentClosed");
						//return $scope.closeDialog();

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
                                $q.when(editFormUtility.publishRequest(document,$scope.InfoDoc ? $scope.InfoDoc.additionalInfo:'')).then(function(workflowInfo) {

                                    if(workflowInfo.type=='authority'){
                                        //in case of authority save the CNA as a contact in drafts
                                        saveAuthorityInContacts(workflowInfo);
                                    }
                                    $('form').filter('.dirty').removeClass('dirty');
                                    $scope.$emit("documentPublishRequested", workflowInfo, document);
                                    $scope.$emit("updateOrignalDocument", document);
                                    return workflowInfo;

                                }).catch(function(error){
                                    $scope.$emit("documentError", { action: "publishRequest", error: error })

                                }).finally(function(){
                                        $scope.loading = false;
                                        $scope.$emit("documentClosed");
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

						return editFormUtility.saveDraft(document);

					}).then(function(draftInfo) {

                        $scope.showMessage = true;

						if(draftInfo.type=='authority'){
							//in case of authority save the CNA as a contact in drafts
							saveAuthorityInContacts(draftInfo);
						}
						//$scope.$emit("documentDraftSaved", draftInfo)
                        $('form').filter('.dirty').removeClass('dirty');
                        $scope.$emit("updateOrignalDocument", $scope.getDocumentFn());
                        $scope.$emit("documentDraftSaved", draftInfo);
                        $('#divShowMessage').show('slow');

                        $timeout(function() { $('#divShowMessage').hide('slow');}, 10000);
						return draftInfo;


					}).catch(function(error){

						$scope.$emit("documentError", { action: "saveDraft", error: error })

					}).finally(function(){
						    $scope.loading = false;
                            $scope.timer(true);
						//return $scope.closeDialog();

					});
				};

				saveAuthorityInContacts = function(draftInfo){

					var document = $scope.getDocumentFn();
					if(!document)
						document = draftInfo;

					$q.when(document).then(function(document)
					{
						//replace the last char of authority doc GUID with C to create a new GUID for contact
						//this will help for easy update
						var id =''
						if(draftInfo.identifier)
							id = draftInfo.identifier;
						else if(draftInfo.data.identifier)
							id = draftInfo.data.identifier;

						if(id=='') {
							console.log('identifier not found in document info passed');
							return;
						}

						id = id.substr(0, id.length-3) + 'CNA'

						var qDocument = {
											header: {
														identifier : id,
														schema   : "contact",
														languages: ["en"]
													},
											type: "CNA" ,
											government : document.government,
											source: id,
											organization : document.name,
											organizationAcronym:{en:'NA'},
											city : document.city,
											country : document.country,
											phones : document.phones,
											emails : document.emails
										}

						if(document.address)qDocument.address = document.address;
						if(document.state)qDocument.state = document.state;
						if(document.postalCode)qDocument.postalCode = document.postalCode;
						if(document.websites)qDocument.websites = document.websites;
						if(document.faxes)qDocument.faxes = document.faxes;

						editFormUtility.saveDraft(qDocument);
					});
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
				$scope.close = function()
				{
					return $scope.closeDialog().then(function() {

						$scope.$emit("documentClosed")

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
                        $scope.errorMessage = 'Your action ';
                        if(data.action=='saveDraft')
                            $scope.errorMessage += 'save draft ';
                        else if(data.action=='publish')
                            $scope.errorMessage += 'publish ';
                        else if(data.action=='publishRequest')
                            $scope.errorMessage += 'request publication ';

                        $scope.errorMessage += 'was not successful. ';

                        $('#divShowError').show('slow');

                        if(data.error && data.error.data.Message)
                            $scope.errorMessage += data.error.data.Message;

                    }
                });

			}]
    	};

    }]);
});
