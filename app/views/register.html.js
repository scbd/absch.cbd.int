"use strict";
require("app").controller("RegisterController", ["$scope", "$window", function ($scope, $window) {

	var leftTab = "measure";
	$scope.editing = false;

	//============================================================
	//
	// 
	//
	//============================================================
	$scope.tab = function(newTab) {

		if(!newTab)
			return leftTab;

		if(canSwitch())
			leftTab = newTab;

		return leftTab;
	};

	//============================================================
	//
	// Start edition of a new or an existing document/draft
	//
	//============================================================
	$scope.edit = function(schema, identifier) {

		if(!canSwitch())
			return;

		$scope.$broadcast("loadDocument", {
			schema : schema,
			identifier : identifier
		});

		leftTab = schema;
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

	//============================================================
	//
	//
	//
	//============================================================
	var unreg_locationChangeStart = $scope.$on('$locationChangeStart', function(evt, next, current) {

		console.log("locationChangeStart", $scope.editing, evt)

		if(!canSwitch()) {
			evt.preventDefault();
		}
	});

	//============================================================
	//
	//
	//
	//============================================================
	function canSwitch() {

		if(!$scope.editing || $window.confirm("Are you sure you want to leave this form and lost your changes?")) {
			$scope.editing = false;
		}

		return !$scope.editing;
	}

	//============================================================
	//
	// ROUTE CHANGE CLEAN-UP
	//
	//============================================================
	var unreg_routeChangeStart = $scope.$on('$routeChangeStart', function() {

		console.log("routeChangeStart")

		unreg_routeChangeStart();
		unreg_locationChangeStart();
	});

}]);
