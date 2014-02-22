require('app').controller("TaskIdController", [ "$scope", "$timeout", "authHttp", "$route", "IStorage", "IWorkflows", "authentication", "underscore", function ($scope, $timeout, $http, $route, IStorage, IWorkflows, authentication, _) 
{
	//==================================================
	//
	//
	//==================================================
	function load() {

		IWorkflows.get($route.current.params.id).then(function(workflow){
			$scope.workflow = workflow;

			if(workflow.data.identifier && !workflow.closedOn) {

				IStorage.drafts.get(workflow.data.identifier).then(function(result){
					$scope.document = result.data || result;
				});
			}
		});
	}
	
	load();

	//==================================================
	//
	//
	//==================================================
	$scope.isAssignedToMe = function(activity) {
		return activity && _.contains(activity.assignedTo||[], $scope.$root.user.userID||-1);
	};

	//==================================================
	//
	//
	//==================================================
	$scope.isOpen = function(element) {
		return element && !element.closedOn;
	}

	//==================================================
	//
	//
	//==================================================
	$scope.isClose = function(element) {
		return element && element.closedOn;
	}

	//==============================
	//
	//==============================
	$scope.formatWID = function (workflowID) {
		return workflowID ? workflowID.replace(/(?:.*)(.{3})(.{4})$/g, "W$1-$2") : "";
	};
}]);
