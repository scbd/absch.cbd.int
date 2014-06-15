define(['app',
	'./tasks/my-completed-tasks.directive.js',
	'./tasks/my-pending-tasks.directive.js',
	'./tasks/my-tasks.directive.js',], function (app) {

"use strict";
//require("app", "dragAndDrop")

app.controller("DashboardController", 
	["$rootScope", "$scope", "underscore", "lstringFilter",
	 function ($rootScope, $scope, _, lstringFilter) {

  //TODO: this is almost identical to type_document_list.html.js... inherit them

	$scope.dashboardFilter = "All";

 	$scope.setDashFilter = function(filter){
 			$scope.dashboardFilter = filter;
 	}
 	$scope.isFilter = function(filter){
 			return	$scope.dashboardFilter == filter || $scope.dashboardFilter == "All";
 	}
}]);
});
