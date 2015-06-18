define(['app', '/app/views/directives/xuser-notifications.js',
'/app/views/directives/switch-realm-directive.html.js'], function (app) {
"use strict";
app.controller("DashboardController",
	["$rootScope", "$scope", "underscore", "lstringFilter","IWorkflows","realm","$q","$routeParams",'$location',
	function ($rootScope, $scope, _, lstringFilter,workflows,realm,$q,$routeParams, $location) {

    //intro.js configurations
	$scope.startTour=false;

    if($routeParams.tour)
    {
        $scope.startTour=true;
        $location.search("tour", null);
    }
    $scope.introOptions = {
      steps: [
        {
          intro: "Welcome to the introduction the ABSCH Dashboard. When the page is fully loaded click 'Next ->' to start the tour.",
        },
		{
          element: '#dashboard_panels',
          intro: 'Use these panels to get an overview of your documents and requests, as well as view the detail lists of requests.',
        },
        {
          element: '#myTabContent',
          intro: 'This feed give an overview of the activities of all members.',
        },
        {
          element: '#document_type_links',
          intro: 'To create a new document or view and edit current documents, select the type of document you want work with here.',
          position: 'right',
        },
        {
          element: '.label',
          intro: 'These labels describe the number of documents in each phase.<br />Green is published<br />Gray is draft<br />Red is Requests',
          position: 'right',
        },
      ],
    };


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
	}

	$scope.approvedRequests = 0;
	$scope.rejectedRequests = 0;
	$scope.completedRequestCount = 0;
	$scope.pendingCount = 0;
	$scope.urgentAttentionCount = 0;


}]);
});
