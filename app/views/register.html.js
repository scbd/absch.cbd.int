"use strict";
require("app").controller("RegisterController", ["$scope", function ($scope) {

	$scope.leftTab = "authority";
	$scope.editing = false;

	//============================================================
	//
	// Start edition of a new or an existing document/draft
	//
	//============================================================
	$scope.edit = function(schema, identifier) {

		$scope.$broadcast("loadDocument", {
			schema : schema,
			identifier : identifier
		});

		$scope.leftTab = schema;
		$scope.editing = true;
	};

	//============================================================
	//
	// Occurs when edit-form is closed without saving 
	//
	//============================================================
	$scope.$on("documentClosed", function(evt){
		
		evt.stopPropagation();
		$scope.editing = false;
		
	});

	//============================================================
	//
	// Occurs when edit-form is closed and document is saved as draft
	//
	//============================================================
	$scope.$on("documentDraftSaved", function(evt, draftInfo) {
		
		evt.stopPropagation();
		$scope.editing = false;
		
	});

	//============================================================
	//
	// Occurs when edit-form is closed and document is saved as draft
	// and a request for publication is sent to a FocalPoint/Admin
	//
	//============================================================
	$scope.$on("documentPublishRequested", function(evt, workflowInfo){
		
		evt.stopPropagation();
		$scope.editing = false;
		
	});

	//============================================================
	//
	// Occurs when edit-form is closed and document is saved 
	// and published directly to the repository
	//
	//============================================================
	$scope.$on("documentPublished", function(evt, documentInfo){
		
		evt.stopPropagation();
		$scope.editing = false;

	});
}]);
