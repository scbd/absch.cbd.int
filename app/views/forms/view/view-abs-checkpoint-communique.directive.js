define(['app'], function (app) {

app.directive("viewAbsCheckpointCommunique", [function () {

	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/view/view-abs-checkpoint-communique.directive.html",
		replace    : true,
		transclude : false,
		scope: {
			document: "=ngModel",
			locale  : "=",
			target  : "@linkTarget",
			allowDrafts : "@",
			hide: "@"
		},
		link : function ($scope, $element, $attr)
		{
			$scope.showPdf = $attr.showPdf === undefined || $attr.showPdf != "false";
		},
		controller: ["$scope", "IStorage", "authHttp", "$q","underscore", function ($scope, storage, $http, $q, _)
		{
			$scope.contacts = undefined;
			$scope.gisMapLayers = null;
			$scope.gisMapCenter = null;

			//====================
			//
			//====================
			$scope.display = function(field) {
				
				if(!$scope.hide) return true; //show all fields

				return( $scope.hide.indexOf(field) >= 0 ? false : true);
			}

			//==================================
			//
			//==================================
			$scope.$watch("document.gisMapCenter", function (gisMapCenter) {
				$scope.gisMapCenter = angular.fromJson(angular.toJson(gisMapCenter));
			});

			//==================================
			//
			//==================================
			$scope.$watch("document.gisFiles", function (gisFiles) {
				var qLinks = gisFiles || [];
				var qGis = _.map(qLinks, function(link) {

					/* global L: true */ // JSHint for leaflet

					return $http.get(link.url).then(function(res) {
						return L.geoJson(res.data);
					});
				});

				$q.all(qGis).then(function (layers) {
					$scope.gisMapLayers = layers;
				});
			});


			//====================
			//
			//====================
			$scope.$watch("document.checkpoint", function ()
			{
				if ($scope.document) {
					$scope.checkpoint = angular.fromJson(angular.toJson($scope.document.checkpoint));

					if ($scope.checkpoint)
						$scope.loadReference($scope.checkpoint);
				}
			});

			//====================
			//
			//====================
			$scope.$watch("document.responsibleAuthority", function () {
				if ($scope.document) {
					$scope.responsibleAuthority = angular.fromJson(angular.toJson($scope.document.responsibleAuthority));

					if ($scope.responsibleAuthority)
						$scope.loadReference($scope.responsibleAuthority);
				}
			});

			//====================
			//
			//====================
			$scope.$watch("document.checkpointCommuniques", function () {
				if ($scope.document) {
					$scope.checkpointCommuniques = angular.fromJson(angular.toJson($scope.document.checkpointCommuniques));

					if ($scope.checkpointCommuniques)
						$scope.loadReferences($scope.checkpointCommuniques);
				}
			});

			//====================
			//
			//====================
			$scope.loadReference = function (ref) {

					storage.documents.get(ref.identifier, { cache: true })
						.success(function (data) {
							ref.document = data;
						})
						.error(function (error, code) {
							if (code == 404 && $scope.allowDrafts == "true") {

								storage.drafts.get(ref.identifier, { cache: true })
									.success(function (data) {
										ref.document = data;
									})
									.error(function () {
										ref.document = undefined;
										ref.error = error;
										ref.errorCode = code;
									});
							}

							ref.document = undefined;
							ref.error = error;
							ref.errorCode = code;

						});
			};

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

})