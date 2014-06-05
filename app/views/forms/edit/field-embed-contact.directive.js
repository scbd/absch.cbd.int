define(['app', '/app/js/common.js'
	], function (app,commonjs) {

app.directive("fieldEmbedContact", [ function () {

	return {
		restrict   : "EA",
		templateUrl: "/app/views/forms/edit/field-embed-contact.directive.html",
		replace    : true,
		transclude : false,
		scope      : {
			model : "=ngModel",
			locales : "=locales",
			caption : "@caption",
			documents : "@"
		},
		link : function($scope, $element, $attrs) {
			

			$scope.multiple = $attrs.multiple!==undefined;
			$scope.showFilter = $attrs.showFilter!==undefined;
			
			var modalEdit = $element.find("#editContact");

			$scope.$watch("edition", function(val){

				var show = !!val;

				if( show && !modalEdit.is(":visible")) {  modalEdit.modal("show"); }
				if(!show &&  modalEdit.is(":visible")) {  modalEdit.modal("hide"); }

			});

			
        },
		controller : ["$scope", "authHttp", "$window", "$filter", "underscore", "guid", "editFormUtility", "$q","IStorage","commonjs",
		 function ($scope, $http, $window, $filter, _, guid, editFormUtility, $q, storage,commonjs)
		{
			var workingContacts = null;
			$scope.buttonText = "Show existing";
			$scope.edition = null;

			//============================================================
			//
			//
			//============================================================
			$scope.$watch("model", function() {				
				workingContacts = null;
			});

			//============================================================
			//
			//
			//============================================================
			$scope.getContacts = function() {				
				if(workingContacts===null) {

					     if(_.isArray ($scope.model)) workingContacts = _.clone($scope.model);
					else if(_.isObject($scope.model)) workingContacts = [$scope.model];
					else							  workingContacts = [];
				}

				return workingContacts;
			};

			//============================================================
			//
			//
			//============================================================
			$scope.editContact = function(index) {

				var contacts = $scope.getContacts();

				if(index<0 || index>=contacts.length) {		
					var id = guid();						
					$scope.edition = {
						contact : {															
									header: {												
												schema   : "contact",
												languages: ["en"]
											},
									type: "organization" ,									
									source: id
								  },
						index   : -1
					};
				}
				else {

					$scope.edition = {
						contact : angular.fromJson(angular.toJson(contacts[index])),
						index   : index
					};
				}
			};

			//============================================================
			//
			//
			//============================================================
			$scope.saveContact = function(saveContact) {

				if(!$scope.edition)
					return;

				var contact = $scope.edition.contact;
				var empty = /^\s*$/;

				if(contact.firstName !==undefined && (!contact.firstName  || empty.test(contact.firstName ))) delete contact.firstName;
				if(contact.middleName!==undefined && (!contact.middleName || empty.test(contact.middleName))) delete contact.middleName;
				if(contact.lastName  !==undefined && (!contact.lastName   || empty.test(contact.lastName  ))) delete contact.lastName;

				//save the contact to db for furture use.
				if(saveContact!=false){
					var cont = _.clone(contact)
					saveContactDraft(cont);						
				}			
				
				delete contact.government;
				delete contact.header;
					// console.log(contact);
				if($scope.multiple) {

					var contacts =  _.clone($scope.getContacts());

					if($scope.edition.index>=0)
						contacts[$scope.edition.index] = contact;
					else
						contacts.push(contact);
					
					$scope.model = contacts;


				}
				else {

					$scope.model = contact;
				}
				$scope.existingContacts = null;
				$scope.edition = null;

				//clear the dropdown list display text which remains after the dialog is closed.
				$scope.$broadcast('clearSelectSelection');
			};

			//============================================================
			//
			//
			//============================================================
			$scope.deleteContact = function(index) {

				var contacts = _.clone($scope.getContacts());

				if(index<0 || index>=contacts.length)
					return;

				// if showfilter then permanently delete the record from draft.
				if($scope.showFilter){					
									    
				    $("#myModal").modal({ 
				      "backdrop"  : "static",
				      "keyboard"  : true,
				      "show"      : true  
				    });
			        $("#deleteOk").on("click", function(e) {
			            var contact = contacts[index];
			            console.log(contact);
						storage.drafts.delete(contact.header.identifier);

						contacts.splice(index,1);
						if($scope.multiple)
							$scope.model = contacts;
						else
							$scope.model = _.first(contacts);
			            
			            $("#myModal").modal('hide');     
			        });
				    $("#myModal").on("hide", function() {  
				        $("#myModal a.btn").off("click");
				    });
				    
				    $("#myModal").on("hidden", function() { 
				        $("#myModal").remove();
				    });

				}
				else{
					contacts.splice(index,1);
					if($scope.multiple)
						$scope.model = contacts;
					else
						$scope.model = _.first(contacts);
				}
			};

			


			//============================================================
			//
			//
			//============================================================
			$scope.closeContact = function() {
				$scope.selectExisting = false;	
				$scope.buttonText = "Show existing";
				$scope.edition = null;

				//clear the dropdown list display text which remains after the dialog is closed.
				$scope.$broadcast('clearSelectSelection');
			};

			$scope.loadExisting = function(){
				

				$scope.selectExisting = !$scope.selectExisting;

				if($scope.selectExisting)
					$scope.buttonText = "Create New";
				else
					$scope.buttonText = "Show existing";

				if($scope.existingContacts)
					return;
				
				var qDrafts = storage.drafts.query("(type eq 'contact')", {body:true});
				$scope.existingContacts= [];

				$q.all([qDrafts]).then(function(results) {
					//debugger;
					results[0].data.Items.forEach(function(contact){
						contact = contact.body;
						if(!contact.source && contact.header)
							contact.source = contact.header.identifier;
						delete contact.government;
						delete contact.header;
						//console.log(contact);
						$scope.existingContacts.push(contact);
					});


				});

			}

			saveContactDraft = function(contact){
					if(!contact)
						throw "Invalid document";
					
					var government = $scope.$root.user.government;	
					if(!contact.header)	
					{
						contact.header = {schema   : "contact",languages: ["en"]};
					}
					contact.header.identifier = contact.source;
					contact.government = government ? { identifier: government } : undefined;
					
					$q.when(editFormUtility.saveDraft(contact), function(contact){							
					});
			}

			$scope.selectContact = function(contact){
				$scope.buttonText = "Show existing";
				$scope.selectExisting = !$scope.selectExisting;				
				$scope.edition.contact = contact;
				$scope.saveContact(false);				
			}

			$scope.isSelected = function(contact){
				var selected = false;
				$scope.getContacts().forEach(function(cont){
					if(cont.source && cont.source == contact.source)
							selected = true;
				});
				return !selected;
			}

		 	$scope.isOrganization=function(entity){ 
		 	//console.log(entity)		;
				return entity && entity.type == "organization";
			}
			$scope.isPerson=function(entity){
				// console.log(entity);
				return entity && entity.type == "person";
			}
			$scope.isCNA=function(entity){
				return entity && entity.type == "CNA";
			}

			$scope.showButtons=function(){
				
				return	commonjs.isUserInRole('AbsPublishingAuthorities')|| 
						commonjs.isUserInRole('AbsNationalAuthorizedUser')||  
						commonjs.isUserInRole('AbsNationalFocalPoint')|| 
						commonjs.isUserInRole('abschiac') ||
						commonjs.isUserInRole('ABS-CH Administrator') ||
						commonjs.isUserInRole('Administrator');

			}
		}]
	};
}]);

});