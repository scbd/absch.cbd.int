"use strict";
require("app").directive("registerRecordList", [ function () {

	return {
		restrict   : "EA",
		templateUrl: "/app/views/register-record-list.directive.html",
		replace    : true,
		transclude : false,
		scope      : {
			records : "=records",
			schema : "@schema",
		},
		controller : ["$scope", function ($scope) {

			//============================================================
			//
			//
			//============================================================
			$scope.edit = function(record) {

				$scope.$emit("editDocument", record.type, record.identifier);
			};

			//============================================================
			//
			//
			//============================================================
			$scope.baseFilter = function(entity){

				var ok = !!entity;

				if($scope.schema)
					ok = ok && entity.type == $scope.schema;

				return ok;
			};

			//============================================================
			//
			//
			//============================================================
			$scope.isDraft = function(entity){
				return $scope.baseFilter(entity) && entity.workingDocumentCreatedOn;
			};

			//============================================================
			//
			//
			//============================================================
			$scope.isRequest = function(entity){
				return $scope.baseFilter(entity) && entity.workingDocumentLock;
			};

			//============================================================
			//
			//
			//============================================================
			$scope.isPublished = function(entity){
				return $scope.baseFilter(entity) && entity.documentID;
			};
		}]
	};
}]);
