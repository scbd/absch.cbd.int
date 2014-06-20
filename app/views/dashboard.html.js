define(['app',], function (app) {
// ,
//     './tasks/my-completed-tasks.directive.html.js',
//     './tasks/my-pending-tasks.directive.js',
//     './tasks/my-tasks.directive.js'
"use strict";
//require("app", "dragAndDrop")

app.controller("DashboardController", 
	["$rootScope", "$scope", "underscore", "lstringFilter","IWorkflows","realm","$q",
	 function ($rootScope, $scope, _, lstringFilter,workflows,realm,$q) {

  //TODO: this is almost identical to type_document_list.html.js... inherit them

	$scope.dashboardFilter = "All";

 	$scope.setDashFilter = function(filter){
 			$scope.dashboardFilter = filter;
 	}
 	$scope.isFilter = function(filter){
 			return	$scope.dashboardFilter == filter || $scope.dashboardFilter == "All";
 	}


    var myUserID = $scope.$root.user.userID;
    var query    = {  
                $and : [
                    { "createdBy" : myUserID }, 
                    { closedOn : { $exists : true } },
                    { "data.realm" : realm }
                ]                
            };
    $q.when(workflows.query(query), function(data){
        $scope.completedRequestCount = data.length;    
    });
     $scope.completedRequestCount = 0
     $scope.pendingCount = 0;
     $scope.urgentAttentionCount = 0;

 	
}]);
});
