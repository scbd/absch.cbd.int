define(['app', '/app/js/common.js'], function (app) {
"use strict";

app.directive("registerRecordList", ["$timeout", "commonjs", function ($timeout,commonjs) {

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


				if( val && !deleteRecordModel.is(":visible")) { console.log("show"); deleteRecordModel.modal("show"); }
				if(!val &&  deleteRecordModel.is(":visible")) { console.log("hide"); deleteRecordModel.modal("hide"); }
			});

			deleteRecordModel.on("hidden.bs.modal", function(){
				$timeout(function() {
					$scope.recordToDelete = null; //clear on backdrop click
				});
			});
		},
		controller : ["$scope", "$q", "IStorage","$http", function ($scope, $q, storage, $http) {

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
			$scope.newDoc = function() {

				$scope.$emit("newDocument", $scope.schema);
			};

			//============================================================
			//
			//
			//============================================================
			$scope.askDelete = function(record) {

				if(record.type == 'absPermit' && $scope.isPublished(record)){
					//cant delete only modify
					$scope.cantDelete = true;
					$scope.recordToDelete = "0";
				}
				else{
					$scope.recordToDelete = record;
					$scope.cantDelete = false;
				}

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

				if(entity && entity.workingDocumentLock && entity.workingDocumentLock.lockID)
					return entity.workingDocumentLock.lockID.replace(workflowRE, "$1");

				return "";
			};

			//============================================================
			//
			//
			//============================================================
			$scope.loadDocument = function(item){

				if(item.data)
					return;
				
		        item.data = {'schema':item.type, 'url_ss': '', 'data': []};
		        $http.get("/api/v2013/documents/"+item.identifier).then(function (result) {  
		            item.data = result.data;
		           
		            $http.get("/api/v2013/documents/"+item.identifier + "?info").then(function (result) {  
		                item.data.info = result.data;
		            });

		        });				
				//href="/database/record?documentID={{record.documentID}}" 
			}

			$scope.showAddButton=function(){

				return	commonjs.isUserInRole('AbsPublishingAuthorities')|| 
						commonjs.isUserInRole('AbsNationalAuthorizedUser')||  
						commonjs.isUserInRole('AbsNationalFocalPoint')|| 
						commonjs.isUserInRole('abschiac') ||
						$scope.schema == 'resource';

			}
		}]
	};
}]);

});