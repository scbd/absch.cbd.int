define(['app',
	'./register.html.js',
	'../views/directives/login.directive.html.js',
	'./register-record-list.directive.js',
	'./tasks/my-completed-tasks.directive.js',
	'./tasks/my-pending-tasks.directive.js',
	'./tasks/my-tasks.directive.js',
	'../js/directives/forms/form-controls.js',
	'./forms/edit/km-form-buttons.js',
	'./forms/edit/editFormUtility.js',
	'./forms/edit/field-embed-contact.directive.js',
	'./forms/edit/edit-contact-base.directive.js',
	'./forms/view/view-contact-reference.directive.js',
	'./forms/view/view-organization-reference.directive.js',
	'./forms/view/record-loader.directive.html.js',
	'./forms/view/view-organization.directive.js',
	'./forms/view/view-organization-reference.directive.js',
	'./directives/task-id-directive.html.js',
	'./directives/user-details.directive.html.js',
	'./directives/ngxLazy.directive.js'], function (app) {

"use strict";
//require("app", "dragAndDrop")

app.controller("RegisterController", 
	["$rootScope", "$location" , "$scope", "$q", "$window", "IStorage", "underscore",
	 "schemaTypes", "$compile", 
	 function ($rootScope, $location, $scope, $q, $window, storage, _,
	  schemaTypes) {

	//============================================================
	//============================================================
	//====================== SECURIZE ============================
	//============================================================
	//============================================================
// console.log(dragAndDrop);
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
	$scope.records = [];
	$scope.dashboardFilter = "All";
  	$scope.isLoaded = [];

	$scope.schemaTypesFacets = [
		{"schema":"measure","schemaType":"nationalRecords", "header":"ABSCH-MSR","commonFormat":"Legislative, administrative or policy measures", "draftCount":0,"requestCount":0,"publishCount": 0},
		{"schema":"authority","schemaType":"nationalRecords", "header":"ABSCH-CNA ","commonFormat":"Competent National Authority ", "draftCount":0,"requestCount":0,"publishCount": 0},
		{"schema":"absPermit","schemaType":"nationalRecords", "header":"ABSCH-IRCC","commonFormat":"Internationally recognized certificate of compliance", "draftCount":0,"requestCount":0,"publishCount": 0},
		{"schema":"absCheckpoint","schemaType":"nationalRecords", "header":"ABSCH-CP","commonFormat":"Checkpoint", "draftCount":0,"requestCount":0,"publishCount": 0},
		{"schema":"absCheckpointCommunique","schemaType":"nationalRecords", "header":"ABSCH-CPC","commonFormat":"Checkpoint Communiqué", "draftCount":0,"requestCount":0,"publishCount": 0},
		{"schema":"database","schemaType":"nationalRecords", "header":"ABSCH-NDB","commonFormat":"ABS National Website or Database", "draftCount":0,"requestCount":0,"publishCount": 0},
		{"schema":"resource","schemaType":"referenceRecords", "header":"ABSCH-VLR","commonFormat":"Virtual Library Record", "draftCount":0,"requestCount":0,"publishCount": 0}
	];


 	$scope.setDashFilter = function(filter){
 		console.log(filter);
 			$scope.dashboardFilter = filter;
 	}
 	$scope.isFilter = function(filter){
 			return	$scope.dashboardFilter == filter || $scope.dashboardFilter == "All";
 	}


	//============================================================
	//
	// 
	//
	//============================================================
	$scope.findString = function (arr, str)
	{
		if(!arr)
			return false;
		if(!str)
			return false;

		for(var i=0; i < arr.length; i++) {
			if(arr[i] == str)
				return true;
		}

		return false;
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
	$scope.facets = function(entity,type){
		var schemaCount = _.where($scope.schemaTypesFacets,{"schema":entity});
 // console.log(entity + ''+ type);
		if(schemaCount.length>0)
		{
			if(type=='draft')
				return schemaCount[0].draftCount;
			else if(type=='publish')
				return schemaCount[0].publishCount;
			else if(type=='request')
				return schemaCount[0].requestCount;
		}
		return 0;//schema[0][type+ 'Count'];
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
	function loadRecords(schema)
	{

		console.log( schema);
		
		if(schema == null || schema==undefined || schema=="dashboard"){
			schema = schemaTypes.join("' or type eq '");
		}

		if(schema == null || schema==undefined )
			return;

		
		if(_.contains($scope.isLoaded, schema))
			return;

		if(!$rootScope.user.isAuthenticated)
			return $scope.records = null;

		var qAnd = [];
		qAnd.push("(type eq '" + schema + "')");

		var qDocuments = storage.documents.query(qAnd.join(" and ")||undefined);
		var qDrafts    = storage.drafts   .query(qAnd.join(" and ")||undefined);

		$q.all([qDocuments, qDrafts]).then(function(results) {

			var documents = results[0].data.Items;
			var drafts    = results[1].data.Items;

			var map = {};

			_.map(documents, function(o) { map[o.identifier] = o });
			_.map(drafts,    function(o) { map[o.identifier] = o });

			$scope.isLoaded.push(schema);
			
			_.values(map).forEach(function(row){				
					  	
				var schemaCount = _.where($scope.schemaTypesFacets,{"schema":row.type});
				
				if(schemaCount != null && schemaCount.length > 0)
				{
					schemaCount[0].draftCount 	+= $scope.isDraft(row) ? 1:0;					
					schemaCount[0].requestCount += $scope.isRequest(row) ? 1:0;
					schemaCount[0].publishCount += $scope.isPublished(row) ? 1:0;
				}
				else
				{
					$scope.schemaTypesFacets.push({"schema":row.type, "draftCount":$scope.isDraft(row) ? 1:0
						,"requestCount":$scope.isPublished(row) ? 1:0
						,"publishCount":$scope.isRequest(row) ? 1:0})
				}
					
				$scope.records.push(row);
			})
			// var recrords _.groupBy($scope.records,'')
// console.log($scope.schemaTypesFacets);
			return $scope.records;
		});
	}
	//loadRecords();

	function refreshRecords(){
		var currentTab = $scope.tab();

		//remove tab details from isLoded array which is used to avoid reload of records on tab change.
		$scope.isLoaded.splice($.inArray(currentTab,$scope.isLoaded),1);

		//remove records for the current tab from records array and refetch from server.
		// var currentTabRecords = _.where($scope.records, {"type": currentTab})
		// console.log(currentTabRecords)
		//debugger;
		// $scope.records.forEach(function(row){
		// 	console.log(row);

		// 	if(row.type==currentTab)
		// 		$scope.records.splice($.inArray(row,$scope.records),1);
		// });
	$scope.records =_.reject($scope.records, function(record){
							return record.type== currentTab;
					});

		loadRecords(currentTab);
	}

	// loadRecords();

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
		//debugger;
		refreshRecords();
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
		
		refreshRecords();
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
		
		refreshRecords();
		evt.stopPropagation();
		$scope.editing = false;
		$scope.msg = "Record published.";

		

	});

	//============================================================
	//
	// Occurs when record-list delete a record or a draft
	//
	//============================================================
	$scope.$on("documentDeleted", function(evt){
		refreshRecords();
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

		//loadRecords(value)
		$scope.msg = "";
		if(value=='authority'              ) 
			require(['../views/forms/view/view-authority.directive',
		             '../views/forms/edit/edit-authority.directive',               
		             '../views/forms/view/view-authority-reference.directive'],                 
		                 function() { $scope.authorityReady = true; });
		

		if(value=='absCheckpoint')
		{
			require(['../views/forms/edit/edit-abs-checkpoint.directive'],
			         function() {
			          	$scope.absCheckpointReady = true;					
			      });
		}
		if(value=='absCheckpointCommunique') require(['../views/forms/edit/edit-abs-checkpoint-communique.directive'], function() { $scope.absCheckpointCommuniqueReady = true; });
		if(value=='absPermit'              ) require(['../views/forms/view/view-abs-permit.directive',                '../views/forms/edit/edit-abs-permit.directive'],                function() { $scope.absPermitReady = true; });
		if(value=='database'               ) require(['../views/forms/view/view-database.directive',                  '../views/forms/edit/edit-database.directive'],                  function() {$scope.databaseReady = true; });
		if(value=='measure'                ) require(['../views/forms/view/view-measure.directive',                   '../views/forms/edit/edit-measure.directive'],                   function() { $scope.measureReady = true; });
		if(value=='resource'               ) require(['../views/forms/view/view-resource.directive',                  '../views/forms/edit/edit-resource.directive'],                  function() { $scope.resourceReady = true; });
	})
}]);
});

//debugger;
//       	console.log('function here');
// console.log(module);
// deferred.resolve(module);
// $timeoux(function(){
// 	var el = $compile( "<view-abs-checkpoint source='fkdlfkdlfkld'></view-abs-checkpoint>" )( $scope );
// 	$("whre it goes").append(el);
			   
// //============================================================
// //
// //
// //============================================================
// define(['app'], function (app) {
// 	app.directive('ngxLazy', function ($http, $compile, $timeout) {
// 	    return {
// 	        restrict: 'E',
// 	        scope: {
// 	            ready: '=ready'
// 	        },
// 	        link: function (scope, $element, attr, ctrl, $transclude) {
// 	        	scope.$watch('ready', function (value) { 
// 	        		if(value) {
// 	        			console.log(value);
// 	        			$compile($element.contents())(scope);
// 	        		}
// 	        	});
// 	    	}
// 	    }
// 	})
// });