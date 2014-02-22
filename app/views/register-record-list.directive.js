"use strict";
require("app").directive("registerRecordList", ["$timeout", function ($timeout) {

	return {
		restrict   : "EA",
		templateUrl: "/app/views/register-record-list.directive.html",
		replace    : true,
		transclude : false,
		scope      : {
			records : "=records",
			schema : "@schema",
		},
		link : function ($scope, $element) {

			var deleteRecordModel = $element.find("#deleteRecordModel");

			$element.find("[data-toggle='tooltip']").tooltip({trigger:'hover'});


			$scope.$watch("recordToDelete", function(val){
				console.log("recordToDelete", val);

				if( val && !deleteRecordModel.is(":visible")) { console.log("show"); deleteRecordModel.modal("show"); }
				if(!val &&  deleteRecordModel.is(":visible")) { console.log("hide"); deleteRecordModel.modal("hide"); }
			});

			deleteRecordModel.on("hidden.bs.modal", function(){
				$timeout(function() {
					$scope.recordToDelete = null; //clear on backdrop click
				});
			});
		},
		controller : ["$scope", "$q", "IStorage", function ($scope, $q, storage) {

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
			$scope.askDelete = function(record) {

				$scope.recordToDelete = record;
			};

			//============================================================
			//
			//
			//============================================================
			$scope.deleteDraft = function(record) {

				$scope.loading = true;

				return $q.when(storage.drafts.delete(record.identifier)).then(function(){
					
					$scope.$emit("documentDeleted");
					$scope.recordToDelete = null;

				}).finally(function(){
					delete $scope.loading
				});
			};

			//============================================================
			//
			//
			//============================================================
			$scope.deleteRecord = function(record) {

				$scope.loading = true;

				return $q.when(storage.documents.delete(record.identifier)).then(function(){
					$scope.$emit("documentDeleted");
					$scope.recordToDelete = null;

				}).finally(function(){
					delete $scope.loading
				});
			};

			//============================================================
			//
			//
			//============================================================
			$scope.schemaFilter = function(entity){

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
				return entity && entity.workingDocumentCreatedOn;
			};

			//============================================================
			//
			//
			//============================================================
			$scope.isRequest = function(entity){
				return entity && entity.workingDocumentLock;
			};

			//============================================================
			//
			//
			//============================================================
			$scope.isPublished = function(entity){
				return entity && entity.documentID;
			};

			//============================================================
			//
			//
			//============================================================
			var workflowRE = /^workflow\-(.*)/g

			$scope.getWorkflowID = function(entity){

				return entity ? entity.workingDocumentLock.lockID.replace(workflowRE, "$1") : "";
			};
		}]
	};
}]);
