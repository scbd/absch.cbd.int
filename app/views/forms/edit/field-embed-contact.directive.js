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
				$scope.errorMessage = undefined;
			});

			$scope.organizationOnly = $attrs.organizationOnly!==undefined;


        },
		controller : ["$scope", "$http", "$window", "$filter", "underscore", "guid", "editFormUtility", "$q","IStorage","commonjs",
		 function ($scope, $http, $window, $filter, _, guid, editFormUtility, $q, storage,commonjs)
		{
			var workingContacts = null;
			$scope.buttonText = "Show existing";
			$scope.edition = null;
			$scope.loading = true;

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

				var cnaContact = contacts[index];
				if(cnaContact && cnaContact.type == 'CNA'){
					alert('Please use the Competent National Authority form to edit this contact.');
					return;
				}

				if(index<0 || index>=contacts.length) {
					var id = guid();
					if(!$scope.organizationOnly)
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
					else
						$scope.edition = {
							contact : {
										header: {
													identifier : id,
													schema   : "organization",
													languages: ["en"]
												},
										type: "organization",libraries: [{ identifier: "cbdLibrary:abs-ch" }]
									  },
							index   : -1
						};
				}
				else {

					$scope.edition = {
						contact : angular.fromJson(angular.toJson(contacts[index])),
						index   : index
					};
					if($scope.organizationOnly){
						$scope.edition.contact.type = "organization";
					}
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

				var saveOperation;
				//save the contact to db for furture use.
				if(saveContact!=false){
					var cont = _.clone(contact)
					saveOperation = saveContactDraft(cont);
				}
				$q.when(saveOperation)
				.then(function(){

					if(!$scope.showFilter && !$scope.organizationOnly){
						delete contact.government;
						delete contact.header;
					}
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

				})
				.catch(function(error){
					if(error.data && error.data.message){
						$scope.errorMessage =  error.data.message;
					}
				});
			};

			//============================================================
			//
			//
			//============================================================
			$scope.deleteContact = function(index, isSoft) {

				var contacts = $scope.existingContacts;//_.clone($scope.getContacts());
				if(isSoft)
					contacts = $scope.getContacts();

				var indexNo = index;
				if(index<0 || index>=contacts.length)
					return;

				// if showfilter then permanently delete the record from draft.
				//if($scope.showFilter){

				if(isSoft){
					//if(confirm("Are you you want to remove this contact from the list?")){
						contacts.splice(index,1);
					//}
				}
				else{
					if(confirm("Are you you want to delete this record?")){
						var contact = contacts[index];

							contact.loading = true;
							storage.drafts.delete(contact.source || contact.header.identifier)
							.then(function(){
								contacts.splice(index,1);
							})
							.finally(function(){
								if(contact)//incase if there is a error on delete
									contact.loading = false;
							});
						}
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


			//============================================================
			//
			//
			//============================================================
			$scope.loadExisting = function(){

				$scope.loading = true;

				$scope.selectExisting = !$scope.selectExisting;

				if($scope.selectExisting)
					$scope.buttonText = "Create New";
				else
					$scope.buttonText = "Show existing";

				if($scope.existingContacts){
					$scope.loading = false;
					return;
				}

				var contactType = 'contact';

				if($scope.organizationOnly)
					contactType = 'organization';

				var qDrafts = storage.drafts.query("(type eq '" + contactType + "')", {body:true});
				$scope.existingContacts= [];

				$q.all([qDrafts]).then(function(results) {
					//debugger;
					results[0].data.Items.forEach(function(contact){
						contact = contact.body;
						//console.log(contact);
						if(!$scope.organizationOnly){
							if(!contact.source && contact.header)
								contact.source = contact.header.identifier;
							delete contact.government;
							delete contact.header;
						}
						$scope.existingContacts.push(contact);
					});


				});
				$scope.loading = false;
			}

			function saveContactDraft(contact){
					if(!contact)
						throw "Invalid document";
					if(!$scope.organizationOnly){

						var government = $scope.$root.user.government;
						if(!contact.header)
						{
							contact.header = {schema   : "contact",languages: ["en"]};
						}
						contact.header.identifier = contact.source;
						contact.government = government ? { identifier: government } : undefined;

						return editFormUtility.saveDraft(contact);
					}
					else{

						return $q.when(updateSecurity(contact)).then(function(){
							if(!$scope.security)
								return;
							delete contact.type
							if($scope.security.canSave)
								return editFormUtility.publish(contact);
							else
								return editFormUtility.saveDraft(contact);
						});
					}

			}

			function updateSecurity(document)
			{
				$scope.security = {};
				$scope.loading = true;

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
					else if($scope.organizationOnly && contact.header && contact.header.identifier == cont.header.identifier)
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

			$scope.showButtons=function(entity){

				if($scope.isCNA(entity))
					return false;

				return	commonjs.isUserInRole($scope.$root.getRoleName('AbsPublishingAuthorities'))||
						commonjs.isUserInRole($scope.$root.getRoleName('AbsNationalAuthorizedUser'))||
						commonjs.isUserInRole($scope.$root.getRoleName('AbsNationalFocalPoint'))||
						//commonjs.isUserInRole($scope.$root.getRoleName('abschiac')) ||
						commonjs.isUserInRole($scope.$root.getRoleName('AbsAdministrator')) ||
						commonjs.isUserInRole($scope.$root.getRoleName('Administrator'));

			}
		}]
	};
}]);

});
