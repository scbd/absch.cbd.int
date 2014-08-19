define(['app','angular-form-controls'], function (app) {

    app.directive('workflowStdButtons',["$q", "$timeout", function($q, $timeout){

    	return{
    		restrict: 'EAC',
    		replace:false,
    		templateUrl: '/app/views/directives/workflow-std-buttons.html',
    		scope: {
    			getDocumentFn : '&document'
    		},
            link: function ($scope, $element)
			{
				$scope.errors              = null;
                var next_fs
                $("#progressbar li button").click(function(){
                	next_fs = $(this).parent();
                    next_fs.nextAll().removeClass("active");
                    next_fs.prevAll().addClass("active");
                    next_fs.addClass("active");

                });
                $timeout(function(){$scope.updateSecurity();}, 3500);
			},
    		controller: ["$rootScope","$scope", "IStorage", "editFormUtility",
            function ($rootScope, $scope, storage, editFormUtility)
			{
				//====================
				//
				//====================
				$scope.updateSecurity = function()
				{
                    $scope.languages = $scope.getDocumentFn().header.languages;
					$scope.security = {};
					$scope.loading = true;
					$q.when($scope.getDocumentFn()).then(function(document){


						if(!document || !document.header)
							return;

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

						return $q.all([a,b]);

					}).finally(function(){

						$scope.loading = false;
					});
				}


				//====================
				//
				//====================
				$scope.publish = function()
				{
					$scope.loading = true;

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
						else return $q.when(editFormUtility.publish(document)).then(function(documentInfo) {

							if(documentInfo.type=='authority'){
								//in case of authority save the CNA as a contact in drafts
								saveAuthorityInContacts(documentInfo);
							}
                            $('form').filter('.dirty').removeClass('dirty');
							$scope.$emit("documentPublished", documentInfo, document);
                            $scope.$emit("updateOrignalDocument", document);
							return documentInfo;

						});
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
						else return $q.when(editFormUtility.publishRequest(document)).then(function(workflowInfo) {

							if(workflowInfo.type=='authority'){
								//in case of authority save the CNA as a contact in drafts
								saveAuthorityInContacts(workflowInfo);
							}
                            $('form').filter('.dirty').removeClass('dirty');
							$scope.$emit("documentPublishRequested", workflowInfo, document);
                            $scope.$emit("updateOrignalDocument", document);
							return workflowInfo;

						});
					}).catch(function(error){

						$scope.$emit("documentError", { action: "publishRequest", error: error })

					}).finally(function(){

						    $scope.loading = false;
                            $scope.$emit("documentClosed");
						//return $scope.closeDialog();

					});
				};

				//====================
				//
				//====================
				$scope.saveDraft = function()
				{
					$scope.loading = true;

					return $q.when($scope.getDocumentFn()).then(function(document)
					{
						if(!document)
							throw "Invalid document";

						return editFormUtility.saveDraft(document);

					}).then(function(draftInfo) {

						if(draftInfo.type=='authority'){
							//in case of authority save the CNA as a contact in drafts
							saveAuthorityInContacts(draftInfo);
						}
						//$scope.$emit("documentDraftSaved", draftInfo)
                        $('form').filter('.dirty').removeClass('dirty');
                        $scope.$emit("updateOrignalDocument", $scope.getDocumentFn());
                        $scope.$emit("documentDraftSaved", draftInfo);
						return draftInfo;

					}).catch(function(error){

						$scope.$emit("documentError", { action: "saveDraft", error: error })

					}).finally(function(){
						    $scope.loading = false;

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
				$scope.closeDialog = function()
				{
					return $q.all([$scope.showSaveDialog(false), $scope.showCancelDialog(false)]).finally(function(){
						$scope.loading = false;
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
                    $("#progressbar li").removeClass('active');
                    $("#step" + tab).addClass('active');
                    $("#step" + tab).prevAll().addClass('active');

                }
                $scope.$watch('languages', function(newValue){
                    if(newValue)
                        $scope.$parent.document.header.languages = newValue;
                });

                $scope.close = function(){
                    $scope.$emit("documentClosed");
                }
			}]
    	};

    }]);
});
