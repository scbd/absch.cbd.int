define(['app'], function (app) {

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

			var modalEdit = $element.find("#editContact");

			$scope.$watch("edition", function(val){

				var show = !!val;

				if( show && !modalEdit.is(":visible")) { console.log("show"); modalEdit.modal("show"); }
				if(!show &&  modalEdit.is(":visible")) { console.log("hide"); modalEdit.modal("hide"); }

			});

			
        },
		controller : ["$scope", "authHttp", "$window", "$filter", "underscore", "guid", "editFormUtility", "$q","IStorage",
		 function ($scope, $http, $window, $filter, _, guid, editFormUtility, $q, storage)
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
					var government = $scope.$root.user.government;
					$scope.edition = {
						contact : {
									header: {
												identifier: guid(),
												schema   : "contact",
												languages: ["en"]
											},
									type: "organization" ,
									government: government ? { identifier: government } : undefined
								  },
						index   : -1
					};

					console.log($scope.edition);
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
				if(saveContact!=false)
					saveContactDraft(contact);

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
			};

			//============================================================
			//
			//
			//============================================================
			$scope.deleteContact = function(index) {

				var contacts = _.clone($scope.getContacts());

				if(index<0 || index>=contacts.length)
					return;

				contacts.splice(index,1);

				if($scope.multiple)
					$scope.model = contacts;
				else
					$scope.model = _.first(contacts);
			};

			//============================================================
			//
			//
			//============================================================
			$scope.closeContact = function() {
				$scope.selectExisting = false;	
				$scope.buttonText = "Show existing";
				$scope.edition = null;
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
						$scope.existingContacts.push(contact.body);
					});


				});

			}

			saveContactDraft = function(contact){

				return $q.when(contact).then(function(document)
				{
					if(!document)
						throw "Invalid document";

					return editFormUtility.saveDraft(document);

				}).catch(function(error){

					console.log(error);

				})
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
					if(cont.header && cont.header.identifier == contact.header.identifier)
							selected = true;
				});
				return !selected;
			}
		}]
	};
}]);

});