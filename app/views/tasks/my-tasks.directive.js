define(['app'], function (app) {

"use strict";
app.directive("myTasks", ['authHttp', function ($http) {
	return {
		priority: 0,
		restrict: 'EAC',
		templateUrl: '/app/views/tasks/my-tasks.directive.html',
		replace: true,
		transclude: false,
		scope : true,
		controller: [ "$scope", "$timeout", "IWorkflows", "realm", "underscore", function ($scope, $timeout, IWorkflows, realm, _) 
		{
			var nextLoad  = null
			var myUserID = $scope.$root.user.userID;
			var query    = { 
				$and : [
					{ "activities.assignedTo" : myUserID }, 
					{ closedOn : { $exists : false } },
					{ "data.realm" : realm }
				] 
			};

			$scope.tasks = null;

			$scope.load = load;
			//==============================
			//
			//==============================
			function load() {
				IWorkflows.query(query).then(function(workflows){

					var tasks  = [];

					workflows.forEach(function(workflow) {
						
						workflow.activities.forEach(function(activity){

							if(isAssignedToMe(activity)) {
								tasks.push({ workflow : workflow, activity : activity});
							}
						});
					});

					$scope.tasks = tasks;

					//nextLoad = $timeout(load, 15*1000);
				});
			}

			if($scope.$root.user.isAuthenticated)
				load();
			
			//==============================
			//
			//==============================
			function isAssignedToMe(activity) {

				return _.contains(activity.assignedTo||[], $scope.$root.user.userID||-1);
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

		}]
	}
}]);

});