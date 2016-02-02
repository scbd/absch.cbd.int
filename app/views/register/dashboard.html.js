define(['app', '/app/views/directives/xuser-notifications.js',
'/app/views/directives/switch-realm-directive.html.js'
], function (app) {
"use strict";
app.controller("DashboardController",
	["$rootScope", "$scope", "underscore", "lstringFilter","IWorkflows","realm","$q","$routeParams",'$location',"$filter","$http",
	function ($rootScope, $scope, _, lstringFilter,workflows,realm,$q,$routeParams, $location, $filter,$http) {



//============================================================
	$scope.PAroles= [$scope.$root.getRoleName('AbsPublishingAuthorities'), $scope.$root.getRoleName('AbsNationalFocalPoint'),
					$scope.$root.getRoleName('AbsAdministrator'),$scope.$root.getRoleName('Administrator')];
	//console.log($scope.PAroles);
	 $scope.compareRoles = function(array1, array2) {

		if(!array1) return false;
		if(!array2) return false;

		for(var i=0; i < array1.length; i++){
			for(var j=0; j < array2.length; j++){
				if(array1[i] == array2[j])
					return true;
			}
		}
    };


//============================================================

  //TODO: this is almost identical to type_document_list.html.js... inherit them

	$scope.dashboardFilter = "All";

 	$scope.setDashFilter = function(filter){
 			$scope.dashboardFilter = filter;
 	}


 	$scope.isFilter = function(filter){
 			return	$scope.dashboardFilter == filter || $scope.dashboardFilter == "All";
 	}

	if($rootScope.user.isAuthenticated){
	    // var myUserID = $scope.$root.user.userID;
	    // var query    = {
	    //             $and : [
	    //                 { "createdBy" : myUserID },
	    //                 { closedOn : { $exists : true } },
	    //                 { "data.realm" : realm.value }
	    //             ]
	    //         };
	    // $q.when(workflows.query(query), function(data){
		//
		// 	$scope.completedRequests = data;
		//
		// 	for(var i=0; i < data.length; i++){
		// 		for(var j=0; j < data[i].activities.length; j++){
		//
		// 			if(data[i].activities[j].result && data[i].activities[j].result.action == 'reject')
		// 				$scope.rejectedRequests++;
		//
		// 			if(data[i].activities[j].result && data[i].activities[j].result.action == 'approve')
		// 					$scope.approvedRequests++;
		// 		}
		// 	}
		//
		//
	    // });
		//
		// query    = {
		// 			$and : [
		// 				{ "createdBy" : myUserID } ,
		// 				{ closedOn : { $exists : false } },
		// 				{ "data.realm" : realm.value }
		// 			]
		// 		};
	    // $q.when(workflows.query(query), function(data){
		//     $scope.pendingCount  = data.length;
	    // });
		//
		// query    = {
		// 		$and : [
		// 			{ "activities.assignedTo" : myUserID },
		// 			{ closedOn : { $exists : false } },
		// 			{ "data.realm" : realm.value }
		// 		]
		// 	};
	    // $q.when(workflows.query(query), function(data){
		// 	$scope.urgentAttentionCount = data.length;
	    // });

		$scope.$emit('loadActivities','dashboard');
		$http.get("/api/v2013/thesaurus/terms?termCode=" + $scope.user.government, {
                cache: true
        }).then(function(result) {
            $scope.userCountry = $filter("lstring")(result.data.title);
        });
	}

	$scope.approvedRequests = 0;
	$scope.rejectedRequests = 0;
	$scope.completedRequestCount = 0;
	$scope.pendingCount = 0;
	$scope.urgentAttentionCount = 0;


}]);
});
