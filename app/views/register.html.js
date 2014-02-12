"use strict";
require("app").controller("RegisterController", ["$scope", function ($scope) {

	$scope.leftTab = "authority";
	$scope.editing = false;

	//==================================
	//
	//==================================
	$scope.edit = function(schema, identifier) {

		$scope.$broadcast("loadDocument", {
			schema : schema,
			identifier : identifier
		});

		$scope.leftTab = schema;
		$scope.editing = true;
	};

	//==================================
	//
	//==================================
	$scope.$on("documentClosed", function(evt){
		
		evt.stopPropagation();
		$scope.editing = false;
		
	});

	//==================================
	//
	//==================================
	$scope.$on("documentDraftSaved", function(evt, draftInfo) {
		
		evt.stopPropagation();
		$scope.editing = false;
		
	});

	//==================================
	//
	//==================================
	$scope.$on("documentPublishRequested", function(evt, workflowInfo){
		
		evt.stopPropagation();
		$scope.editing = false;
		
	});

	//==================================
	//
	//==================================
	$scope.$on("documentPublished", function(evt, documentInfo){
		
		evt.stopPropagation();
		$scope.editing = false;

	});



}]);
