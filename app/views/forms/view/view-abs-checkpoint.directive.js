require("app").directive("viewAbsCheckpoint", [function () {

	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/view/view-abs-checkpoint.directive.html",
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			allowDrafts : "@"
		},
		link : function ($scope)
		{
			$scope.contacts = undefined;
		},
		controller : ["$scope", "IStorage", function ($scope, storage)
		{
			//====================
			//
			//====================
			$scope.$watch("document.contacts", function()
			{
				if ($scope.document) {
					$scope.contacts = angular.fromJson(angular.toJson($scope.document.contacts));

					if ($scope.contacts)
						$scope.loadReferences($scope.contacts);
				}
			});

			//====================
			//
			//====================
			$scope.$watch("document.authoritiesToInform", function () {
				if ($scope.document) {
					$scope.authoritiesToInform = angular.fromJson(angular.toJson($scope.document.authoritiesToInform));

					if ($scope.authoritiesToInform)
						$scope.loadReferences($scope.authoritiesToInform);
				}
			});

			//====================
			//
			//====================
			$scope.$watch("document.contactsToInform", function () {
				if ($scope.document) {
					$scope.contactsToInform = angular.fromJson(angular.toJson($scope.document.contactsToInform));

					if ($scope.contactsToInform)
						$scope.loadReferences($scope.contactsToInform);
				}
			});

			//====================
			//
			//====================
			$scope.loadReferences = function(targets) {

				angular.forEach(targets, function(ref){

					storage.documents.get(ref.identifier, { cache : true})
						.success(function(data){
							ref.document = data;
						})
						.error(function(error, code){
							if (code == 404 && $scope.allowDrafts == "true") {

								storage.drafts.get(ref.identifier, { cache : true})
									.success(function(data){
										ref.document = data;
									})
									.error(function(){
										ref.document  = undefined;
										ref.error     = error;
										ref.errorCode = code;
									});
							}

							ref.document  = undefined;
							ref.error     = error;
							ref.errorCode = code;

						});
				});
			};
		}]
	};
}]);
