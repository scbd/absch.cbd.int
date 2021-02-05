define(['app',"text!views/forms/view/view-resource.directive.html",
'views/directives/record-options',
], function (app, template) {
app.directive("viewResource", [function () {
	return {
		restrict   : "EAC",
		template: template, 
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			hide : "@"
		},
		controller : ["$scope", "IStorage", "$http","realm",function ($scope, storage, $http, realm)
		{
			$scope.isABS = realm.is('ABS');
			$scope.isBCH = realm.is('BCH');
			
			
			//====================
			//
			//====================
			$scope.display = function(field) {

				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			};

			//====================
			//
			//====================
			$scope.$watch("document.organizations", function(_new)
			{
				$scope.organizations = angular.fromJson(angular.toJson(_new||[]));

				if($scope.organizations)
					$scope.loadReferences($scope.organizations);
			});

			//====================
			//
			//====================
			$scope.loadReferences = function(targets) {

				angular.forEach(targets, function(ref){

					storage.documents.get(ref.identifier, { cache : true})
					.then(function(res){return res.data}).then(function (data){
							ref.document = data;
						})
						.catch(function(error){
							if (error.status == 404) {

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

			$scope.getTerm = function(term){

				return {
					identifier : term
				}
			}
			
		}]
	};
}]);

});
