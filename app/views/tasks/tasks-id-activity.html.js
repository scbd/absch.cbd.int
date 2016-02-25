define(['app',
	'../forms/view/view-abs-checkpoint.directive.js',
	'../forms/view/view-abs-checkpoint-communique.directive.js',
	'../forms/view/view-abs-permit.directive.js',
	'../forms/view/view-authority.directive.js',
	'../forms/view/view-authority-reference.directive.js',
	'../forms/view/view-contact.directive.js',
	'../forms/view/view-contact-reference.directive.js',
	'../forms/view/view-database.directive.js',
	'../forms/view/view-measure.directive.js',
	'../forms/view/view-organization.directive.js',
	'../forms/view/view-organization-reference.directive.js',
	'../forms/view/view-resource.directive.js',
	'../forms/view/record-loader.directive.html.js',
	'../forms/view/view-capacity-building-initiative.directive.js',
	'../forms/view/view-capacity-building-resource.directive.js'
], function (app) {

app.controller("TaskIdActivityController", [ "$scope", "$timeout", "$http", "$route", "$location", "IStorage", "IWorkflows", "authentication", "underscore", function ($scope, $timeout, $http, $route, $location, IStorage, IWorkflows, authentication, _)
{
	//==================================================
	//
	//
	//==================================================
	function load() {

		var workflowID   = $route.current.params.id;
		var activityName = $route.current.params.activity;

		IWorkflows.get(workflowID).then(function(workflow){

			var activity = _.findWhere(workflow.activities, {name : activityName });

			if(!activity)
				throw { code:404, message:"Activity not found" };

			if(workflow.data.identifier && !workflow.closedOn) {

				IStorage.drafts.get(workflow.data.identifier).then(function(result){
					$scope.document = result.data || result;
				});
			}

			$scope.workflow = workflow;
			$scope.activity = activity
			console.log($scope.activity);
		});
	}

	load();

	//==================================================
	//
	//
	//==================================================
	$scope.updateActivity = function(resultData) {

		IWorkflows.updateActivity($scope.workflow._id, $scope.activity.name, resultData).then(function(){

			$location.path("/register/tasks/"+$scope.workflow._id)

		}).catch(function(error) {
			alert(error);
		});
	};

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
		return !element.closedOn;
	}

	//==============================
	//
	//==============================
	$scope.formatWID = function (workflowID) {
		return workflowID ? workflowID.replace(/(?:.*)(.{3})(.{4})$/g, "W$1-$2") : "";
	};

}]);

});
