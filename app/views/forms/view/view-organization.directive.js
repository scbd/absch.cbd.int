define(['app', "text!views/forms/view/view-organization.directive.html",
'views/directives/record-options'], function (app, template) {

app.directive("viewOrganization", [function () {
	return {
		restrict   : "EAC",
		template: template, 
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
			$scope.contacts      = undefined;
			$scope.organizations = undefined;
		},
		controller : ["$scope", "IStorage", function ($scope, storage)
		{
			//====================
			//
			//====================
			$scope.$watch("document.contacts", function()
			{
				$scope.contacts = undefined;

				if($scope.document && $scope.document.contacts)
					angular.fromJson(angular.toJson($scope.document.contacts));

				if($scope.contacts)
					$scope.loadReferences($scope.contacts);
			});


			//====================
			//
			//====================
			$scope.$watch("document.linkedOrganizations", function()
			{
				$scope.linkedOrganizations = undefined;

				if($scope.document && $scope.document.linkedOrganizations)
					angular.fromJson(angular.toJson($scope.document.linkedOrganizations));

				if($scope.linkedOrganizations)
					$scope.loadReferences($scope.linkedOrganizations);
			});

			//====================
			//
			//====================
			$scope.loadReferences = function(targets) {

				angular.forEach(targets, function(ref){

					storage.documents.get(ref.identifier, { cache : true})
						.then(function(res){
							ref.document = res.data;
						})
						.catch(function(error){
							if (error.status == 404 && $scope.allowDrafts == "true") {

								storage.drafts.get(ref.identifier, { cache : true})
									.then(function(res){
										ref.document = res.data;
									})
									.catch(function() {
										ref.document  = undefined;
										ref.error     = error.data;
										ref.errorCode = error.status;
									});
							}

							ref.document  = undefined;
							ref.error     = error.data;
							ref.errorCode = error.status;

						});
				});
			};
		}]
	};
}]);

});
