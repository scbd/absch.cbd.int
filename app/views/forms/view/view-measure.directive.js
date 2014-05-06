require("app").directive("viewMeasure", [function () {
	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/view/view-measure.directive.html",
		replace    : true,
		transclude : false,
		scope: {
			document    : "=ngModel",
			locale      : "=",
			target      : "@linkTarget",
			allowDrafts : "@",
			hide		: "@"
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
			$scope.$watch("document.amendedMeasures", function(_new)
			{
				if ($scope.document && $scope.document.amendedMeasures) {
					$scope.amendedMeasures = angular.fromJson(angular.toJson($scope.document.amendedMeasures));

					if ($scope.amendedMeasures)
						$scope.loadReferences($scope.amendedMeasures, true);
				}
			});

			//====================
			//
			//====================
			$scope.$watch("document.registeredMeasures", function (_new) {
				if ($scope.document && $scope.document.registeredMeasures) {
					$scope.registeredMeasures = angular.fromJson(angular.toJson($scope.document.registeredMeasures));

					if ($scope.registeredMeasures)
						$scope.loadReferences($scope.registeredMeasures, true);
				}
			});

			//====================
			//
			//====================
			$scope.$watch("document.linkedMeasures", function(_new)
			{
				if ($scope.document && $scope.document.linkedMeasures) {
					$scope.linkedMeasures = angular.fromJson(angular.toJson($scope.document.linkedMeasures));

					if ($scope.linkedMeasures)
						$scope.loadReferences($scope.linkedMeasures, true);
				}
			});

			//====================
			//
			//====================
			$scope.loadReferences = function(targets, infoOnly) {

				angular.forEach(targets, function(ref) {

					var oOptions = { cache: true };

					if (infoOnly)
						oOptions.info = true;

					storage.documents.get(ref.identifier, oOptions)
						.success(function(data){
							ref.document = data;
						})
						.error(function(error, code){
							if (code == 404 && $scope.allowDrafts == "true") {

								storage.drafts.get(ref.identifier, oOptions)
									.success(function(data){
										ref.document = data;
									})
									.error(function(draftError, draftCode){
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
