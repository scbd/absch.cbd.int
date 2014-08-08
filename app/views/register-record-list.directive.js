define(['app', '/app/js/common.js'], function (app) {
"use strict";

app.directive("registerRecordList", ["$timeout", "commonjs","bootbox", "authHttp", function ($timeout,commonjs,bootbox, $http) {

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
			var duplicateRecordModel = $element.find("#duplicateRecordModel");

			$element.find("[data-toggle='tooltip']").tooltip({trigger:'hover'});


			$scope.$watch("recordToDelete", function(val){


				if( val && !deleteRecordModel.is(":visible")) {  deleteRecordModel.modal("show"); }
				if(!val &&  deleteRecordModel.is(":visible")) {  deleteRecordModel.modal("hide"); }
			});

			$scope.$watch("recordToDuplicate", function(val){


				if( val && !duplicateRecordModel.is(":visible")) { duplicateRecordModel.modal("show"); }
				if(!val &&  duplicateRecordModel.is(":visible")) { duplicateRecordModel.modal("hide"); }
			});

			deleteRecordModel.on("hidden.bs.modal", function(){
				$timeout(function() {
					$scope.recordToDelete = null; //clear on backdrop click
				});
			});

			duplicateRecordModel.on("hidden.bs.modal", function(){
				$timeout(function() {
					$scope.recordToDuplicate = null; //clear on backdrop click
				});
			});
		},
		controller : ["$scope", "$q", "IStorage","$http", "guid", "editFormUtility", "$timeout", function ($scope, $q, storage, $http, guid, editFormUtility, $timeout) {

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

				if(commonjs.isIAC() && !commonjs.isAnyOtherRoleThenIAC()){
					$scope.iacCantDelete = true;
					$scope.cantDelete = false;
					$scope.recordToDelete = "0";

				}
				if(record.type == 'absPermit' && $scope.isPublished(record)){
					//cant delete only modify
					$scope.pilotDelete = true;
					//$scope.cantDelete = true;
					//$scope.recordToDelete = "0"; //TODO:only for pilot phase
				}
				// else{
					$scope.recordToDelete = record;
					$scope.cantDelete = false;
				// }

			};

			//============================================================
			//
			//
			//============================================================
			$scope.deleteDraft = function(record) {


				$scope.loading = true;

				return $q.when(storage.drafts.delete(record.identifier)).then(function(){

					$scope.$emit("documentDeleted", record);
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
					$scope.$emit("documentDeleted", record);
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
						commonjs.isUserInRole('ABS-CH Administrator') ||
						commonjs.isUserInRole('Administrator') ||
						$scope.schema == 'resource';

			}

			$scope.isIAC=function(){

			return	commonjs.isUserInRole('abschiac');

			}

			//============================================================
			//
			//
			//============================================================
			$scope.askDuplicate = function(record) {

				$scope.recordToDuplicate = record;

			};

			$scope.duplicate = function(entity)
			{
				 $scope.loading = true;
				var document;
			//	console.log(entity);
				if($scope.isDraft(entity) || $scope.isRequest(entity)){
					document = storage.drafts.get(entity.identifier)
				}
				else if($scope.isPublished(entity)){
					document = storage.documents.get(entity.identifier	);
				}

				return $q.when(document).then(function(document)
				{
					//console.log(document);
					if(!document.data)
						throw "Invalid document";

					document = document.data;

					document.header.identifier = guid();

					return editFormUtility.saveDraft(document);

				}).then(function(draftInfo) {
					$scope.$emit("documentDuplicated", draftInfo)
					//$scope.records.push(draftInfo);
					$timeout(function(){
						shake("#record" + draftInfo.identifier);//.effect( "shake" );
					},500)


					return draftInfo;

				}).catch(function(error){
					if(error.error.indexOf('Not authorized to save draft')>=0){
						bootbox.alert('Yur are not authorized to create duplicate records.')
					}
					$scope.$emit("documentError", { action: "duplicate", error: error })

				}).finally(function(){
 					$scope.loading = false;
 					$scope.recordToDuplicate = null;
				});
			};

			$scope.$on('shakeUpdatedRecord', function(evt, document){
				//console.log(document);
				shake("#record" + document.identifier);
			});

			function shake(div){
				var interval=100,distance=20,times=10
			    $(div).css('position','relative');
			    for(var iter=0;iter<(times+1);iter++){
			        $(div).animate({ left: ((iter%2==0 ? distance : distance*-1))}, interval);
			    }//for
			    $(div).animate({ left: 0},interval, function(){
			    	$(div).css('position','inherit');
			    });
			    //
			}
		}]
	};
}]);

});
