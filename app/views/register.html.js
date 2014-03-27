"use strict";
require("app").controller("RegisterController", ["$rootScope", "$scope", "$q", "$window", "IStorage", "underscore", "schemaTypes", "$compile", function ($rootScope, $scope, $q, $window, storage, _, schemaTypes, $compile) {

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
	
	var leftTab = "dashboard";
	$scope.msg="";
	$scope.records = null;

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

			$scope.lastSchema = schema;
			$scope.lastIdentifier = identifier; 

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

	$scope.$on("getDocumentInfo", function(evt, info) {
		if($scope.lastSchema)
		$scope.$broadcast("loadDocument", {
			schema : $scope.lastSchema,
			identifier : $scope.lastIdentifier
		});
	});


	//============================================================
	//
	//
	//
	//============================================================
	$scope.$on("newDocument", function(evt, schema){

		evt.stopPropagation();
		$scope.edit(schema);
	}); 
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

		if(canEdit_cache[cacheKey]!==undefined)
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
				return canEdit_cache[cacheKey] = allowed||false;
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
		$scope.msg = "Your record has been closed without saving.";
		
	});

	//============================================================
	//
	// Occurs when edit-form is closed and document is saved as draft
	//
	//============================================================
	$scope.$on("documentDraftSaved", function(evt, draftInfo) {
		
		loadRecords();
		evt.stopPropagation();
		$scope.editing = false;
		$scope.msg = "Your record has been saved as a draft.";
	});

	//============================================================
	//
	// Occurs when edit-form is closed and document is saved as draft
	// and a request for publication is sent to a FocalPoint/Admin
	//
	//============================================================
	$scope.$on("documentPublishRequested", function(evt, workflowInfo){
		
		loadRecords();
		evt.stopPropagation();
		$scope.editing = false;
		$scope.msg = "Record saved. A publishing request has been sent to your Publishing Authority.";
		
	});

	//============================================================
	//
	// Occurs when edit-form is closed and document is saved 
	// and published directly to the repository
	//
	//============================================================
	$scope.$on("documentPublished", function(evt, documentInfo){
		
		loadRecords();
		evt.stopPropagation();
		$scope.editing = false;
		$scope.msg = "Record published." + documentInfo;

		

	});

	//============================================================
	//
	// Occurs when record-list delete a record or a draft
	//
	//============================================================
	$scope.$on("documentDeleted", function(evt){
		
		loadRecords();
		evt.stopPropagation();
		$scope.editing = false;
		$scope.msg = "Record deleted.";

	});

	//============================================================
	//
	//
	//
	//============================================================
	var unreg_locationChangeStart = $scope.$on('$locationChangeStart', function(evt, next, current) {

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

		if(!$scope.editing || $window.confirm("Are you sure you want to leave this form and lose your changes?")) {
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

		unreg_routeChangeStart();
		unreg_locationChangeStart();
	});

	$scope.$watch('tab()', function(value) {
		if(value=='authority'              ) require(['../views/forms/view/view-authority.directive',                 '../views/forms/edit/edit-authority.directive'],                 function() { $scope.authorityReady = true; });
		if(value=='absCheckpoint'          ) require(['../views/forms/view/view-abs-checkpoint.directive',            '../views/forms/edit/edit-abs-checkpoint.directive'],            function() { $scope.absCheckpointReady = true; });
		if(value=='absCheckpointCommunique') require(['../views/forms/view/view-abs-checkpoint-communique.directive', '../views/forms/edit/edit-abs-checkpoint-communique.directive'], function() { $scope.absCheckpointCommuniqueReady = true; });
		if(value=='absPermit'              ) require(['../views/forms/view/view-abs-permit.directive',                '../views/forms/edit/edit-abs-permit.directive'],                function() { $scope.absPermitReady = true; });
		if(value=='database'               ) require(['../views/forms/view/view-database.directive',                  '../views/forms/edit/edit-database.directive'],                  function() { $scope.databaseReady = true; });
		if(value=='measure'                ) require(['../views/forms/view/view-measure.directive',                   '../views/forms/edit/edit-measure.directive'],                   function() { $scope.measureReady = true; });
		if(value=='resource'               ) require(['../views/forms/view/view-resource.directive',                  '../views/forms/edit/edit-resource.directive'],                  function() { $scope.resourceReady = true; });
	})
}]);

//============================================================
//
//
//============================================================
require("app").directive('ngxLazy', function ($http, $compile, $timeout) {
    return {
        restrict: 'E',
        scope: {
            ready: '=ready'
        },
        link: function (scope, $element, attr, ctrl, $transclude) {
        	scope.$watch('ready', function (value) { 
        		if(value) {
        			$compile($element.contents())(scope);
        		}
        	});
    	}
    }
})