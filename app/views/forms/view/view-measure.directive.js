define(['app',
        '/app/views/search/measure-matrix-elements-derective.html.js',
        '/app/services/search-service.js', '/app/services/app-config-service.js','/app/views/directives/party-status.js'
    ], function (app) {

app.directive("viewMeasure", [function () {
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
		controller : ["$scope", "IStorage","$filter", "searchService", "$q", "appConfigService",
         function ($scope, storage, $filter, searchService, $q, appConfigService)
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

            $scope.$watch("document", function (_new) {
				if ($scope.document && $scope.document.header
                    && $scope.document.header.identifier) {
                        var queries = [];
                        if(!$scope.document.measureAmendedBy){
                            var listQuery = {
                                query: 'realm_ss:' + appConfigService.currentRealm.toLowerCase() +
                                 ' AND schema_s:measure AND amendedMeasures_ss:'  + $scope.document.header.identifier
                            };
                            queries.push(searchService.list(listQuery));
                        }
                        if(!$scope.document.measureRelatedTo){
                            var listQuery = {
                                query: 'realm_ss:' + appConfigService.currentRealm.toLowerCase() +
                                 ' AND schema_s:measure AND linkedMeasures_ss:'  + $scope.document.header.identifier
                            };
                            queries.push(searchService.list(listQuery));
                        }
                        $q.all(queries)
                          .then(function(data){
                              $scope.document.measureAmendedBy = data[0].data.response.docs;
                              $scope.document.measureRelatedTo = data[1].data.response.docs;
                              $scope.measureMatrixApi.reloadMatrix(true);
                          });
				}
			});

			$scope.showLanguage = function(model, type){

				if(type=='file'){
					return $filter("term")(model);
				}
				else
					return model;
			}

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

});
