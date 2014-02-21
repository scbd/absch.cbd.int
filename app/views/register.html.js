"use strict";
require("app").controller("RegisterController", ["$rootScope", "$scope", "$q", "$window", "IStorage", "underscore", "schemaTypes", function ($rootScope, $scope, $q, $window, storage, _, schemaTypes) {

	//============================================================
	//============================================================
	//====================== SECURIZE ============================
	//============================================================
	//============================================================

    $scope.isAuthenticated      = $rootScope.user.isAuthenticated;
    $scope.canRegisterNational  = !!_.intersection($rootScope.user.roles, ["AbsAdministrator", "AbsNationalAuthorizedUser", "AbsNationalFocalPoint", "AbsPublishingAuthorities", "Administrator"]).length;
    $scope.canRegisterReference = $rootScope.user.isAuthenticated;

	//============================================================
	//============================================================
	//============================================================
	//============================================================
	//============================================================

	var leftTab = "measure";

	$scope.records = null;

	//============================================================
	//
	// 
	//
	//============================================================
	function loadRecords()
	{
		if(!$rootScope.user.isAuthenticated)
			return $scope.records = null;

		var qAnd = [];

		qAnd.push("(type eq '"+schemaTypes.join("' or type eq '") + "')");

		var qDocuments = storage.documents.query(qAnd.join(" and ")||undefined);
		var qDrafts    = storage.drafts   .query(qAnd.join(" and ")||undefined);

		$q.all([qDocuments, qDrafts]).then(function(results) {

			var documents = results[0].data.Items;
			var drafts    = results[1].data.Items;

			var map = {};

			_.map(documents, function(o) { map[o.identifier] = o });
			_.map(drafts,    function(o) { map[o.identifier] = o });

			return $scope.records = _.values(map);
		});
	}

	loadRecords();

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
	$scope.signIn = function(callbackSchema) {

		if(!$rootScope.user.isAuthenticated)
			$scope.actionSignin();
	}

	//============================================================
	//
	// Start edition of a new or an existing document/draft
	//
	//============================================================
	$scope.edit = function(schema, identifier) {

		if(!$rootScope.user.isAuthenticated) {  //navigation.securize();
	        $scope.actionSignin();
	        return;
	    }

		if(!canSwitch())
			return;

		$q.when($scope.canEdit(schema, identifier), function (allowed) {

			if(!allowed) {

				if(identifier) alert("You are not authorized to edit this record");
				else           alert("You are not authorized to create a new record");

				return;
			}

			$scope.$broadcast("loadDocument", {
				schema : schema,
				identifier : identifier
			});

			leftTab = schema;
			$scope.editing = true;

		});
	};

	//============================================================
	//
	//
	//
	//============================================================
	$scope.$on("editDocument", function(evt, schema, identifier){

		evt.stopPropagation();
		$scope.edit(schema, identifier);
	});

	//============================================================
	//
	//
	//
	//============================================================
	var canEdit_cache = {}
	$scope.canEdit = function (schema, identifier) {

		if(!$rootScope.user.isAuthenticated)
			return false;

		var cacheKey = (schema||"") + "+" + (identifier||"");

		if(canEdit_cache[cacheKey])
			return canEdit_cache[cacheKey];

		if(identifier) {

			return storage.drafts.get(identifier, {info:""}).then(function (result) {

				var info = result.data || result;

				if(info.type!=schema)
					throw "Schema type mismatch";

				return storage.drafts.security.canUpdate(identifier, schema);

			}).catch(function(error) {

				if(error.status==404)
					return storage.drafts.security.canCreate(identifier, schema);

				throw error;
			})
		}
		else {

			return canEdit_cache[cacheKey] = storage.drafts.security.canCreate(identifier, schema).then(function(allowed){
				return canEdit_cache[cacheKey] = allowed;
			});
		}
	}

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
