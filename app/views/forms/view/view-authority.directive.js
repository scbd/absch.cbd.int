define(['app', "text!views/forms/view/view-authority.directive.html", 
'views/forms/view/view-contact-reference.directive',
'views/directives/record-options',
'views/directives/party-status'], function (app, template) {

app.directive("viewAuthority", [function () {
	return {
		restrict   : "EAC",
		template: template ,
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			target  : "@linkTarget",
			locale      : "=",
			allowDrafts : "@",
			hide : "@"
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
			$scope.display = function(field) {

				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}


			//====================
			//
			//====================
			$scope.$watch("document.contacts", function(_new)
			{
				$scope.contacts = angular.fromJson(angular.toJson(_new||[]));

				if($scope.contacts)
					$scope.loadReferences($scope.contacts);
			});

			// $scope.$watch("document.absPolicyBasisForCompetencyRef", function(_new)
			// {
			// 	if ($scope.document && $scope.document.absPolicyBasisForCompetencyRef) {
			// 		$scope.absPolicyBasisForCompetencyRef = angular.fromJson(angular.toJson($scope.document.absPolicyBasisForCompetencyRef));
			//
			// 		if ($scope.absPolicyBasisForCompetencyRef)
			// 			$scope.loadReferences($scope.absPolicyBasisForCompetencyRef, true);
			// 	}
			// });

			//====================
			//
			//====================
			$scope.loadReferences = function(targets) {

				angular.forEach(targets, function(ref){

					storage.documents.get(ref.identifier, { info : true, body:true})
					.then(function(res){return res.data}).then(function (data){
							ref.document = data;
						})
						.catch(function(error){
							if (error.status == 404 && $scope.allowDrafts == "true") {

								storage.drafts.get(ref.identifier, { cache : true})
								.then(function(res){return res.data}).then(function (data){
										ref.document = data;
									})
									.catch(function(){
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
