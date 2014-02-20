require("app").directive("fieldEmbedContact", [ function () {

	return {
		restrict   : "EA",
		templateUrl: "/app/views/forms/edit/field-embed-contact.directive.html",
		replace    : true,
		transclude : false,
		scope      : {
			model : "=ngModel",
			locales : "=locales",
			caption : "@caption"
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
		controller : ["$scope", "authHttp", "$window", "$filter", "underscore", "guid", function ($scope, $http, $window, $filter, _, guid)
		{
			var workingContacts = null;

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

					$scope.edition = {
						contact : { source : guid(),  type: "organization" },
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
			$scope.saveContact = function() {

				if(!$scope.edition)
					return;

				var contact = $scope.edition.contact;
				var empty = /^\s*$/;

				if(contact.firstName !==undefined && (!contact.firstName  || empty.test(contact.firstName ))) delete contact.firstName;
				if(contact.middleName!==undefined && (!contact.middleName || empty.test(contact.middleName))) delete contact.middleName;
				if(contact.lastName  !==undefined && (!contact.lastName   || empty.test(contact.lastName  ))) delete contact.lastName;

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
				$scope.edition = null;
			};
		}]
	};
}]);
