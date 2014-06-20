define(['app'], function (app) {

"use strict";
app.controller("myPendingTasksCotroller", [ "$scope", "$timeout", "IWorkflows", "realm", function ($scope, $timeout, IWorkflows, realm) 
		{
			var nextLoad = null;
			var myUserID = $scope.$root.user.userID;
			var query    = { 
				$and : [
					{ "createdBy" : myUserID } , 
					{ closedOn : { $exists : false } },
					{ "data.realm" : realm }
				] 
			};

			$scope.sortTerm = 'createdOn';
			$scope.orderList = true;
	       	 //==================================
	       	 $scope.sortTable = function (term) {

	       	     if ($scope.sortTerm == term) {
	       	         $scope.orderList = !$scope.orderList;
	       	     }
	       	     else {
	       	         $scope.sortTerm = term;
	       	         $scope.orderList = true;
	       	     }
	       	 }

			//==============================
			//
			//==============================
			function load() {
				
				IWorkflows.query(query).then(function(workflows){

					workflows.forEach(function(workflow) { //tweaks
						if(!workflow.activities || !workflow.activities.length)
							workflow.activities = [null];
					});

					$scope.workflows = workflows;

					//nextLoad = $timeout(load, 15*1000);
				})
			}

			if($scope.$root.user.isAuthenticated)
				load();

			//==============================
			//
			//==============================
			$scope.isOpen = function(element) {
				return element && !element.closedOn;
			}

			//==============================
			//
			//==============================
			$scope.formatWID = function (workflowID) {
				return workflowID.replace(/(?:.*)(.{3})(.{4})$/g, "W$1-$2");
			};

			//============================================================
			//
			// ROUTE CHANGE CLEAN-UP
			//
			//============================================================
			var unreg_RouteChangeStart = $scope.$on('$routeChangeStart', function() {

				unreg_RouteChangeStart();

				if(nextLoad)
					$timeout.cancel(nextLoad);
			});
		}]);
});