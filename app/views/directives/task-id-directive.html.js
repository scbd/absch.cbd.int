define(['app'], function (app) {

app.directive('taskId', function () {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/directives/task-id-directive.html?'+(new Date().getTime()),
            replace: true,
            scope: {
                loadTaskData : '=',
                workflowTaskId : '@',
                parentWatcher : '@', //used in case if the directive parent needs to be refreshed else the workflow details will be fetched.
            },
            controller: [ "$scope", "$timeout", "authHttp", "$route", "IStorage", "IWorkflows", "authentication", "underscore",
					 function ($scope, $timeout, $http, $route, IStorage, IWorkflows, authentication, _) 
					{
						//==================================================
						//
						//
						//==================================================
						function load() {

								var activityName = $route.current.params.activity;
								if($scope.workflowTaskId != undefined && $scope.loadTaskData != undefined)
								{
									//console.log	($scope.workflowTaskId + '-' + $scope.loadTaskData)
									IWorkflows.get($scope.workflowTaskId).then(function(workflow){

										$scope.workflow = workflow;
										// $scope.activity = _.findWhere(workflow.activities[0], {name : activityName });
// console.log(workflow.activities);
										if(workflow.data.identifier && !workflow.closedOn) {

											IStorage.drafts.get(workflow.data.identifier).then(function(result){
												$scope.document = result.data || result;
											});
										}
										//console.log	('promise exe');
									});
								
								}

						}
						//==================================================
						//
						//
						//==================================================
						$scope.updateActivity = function(resultData) {

							IWorkflows.updateActivity($scope.workflowTaskId, $scope.workflow.activities[0].name, resultData).then(function(){
									// if($scope.$parentWatcher){
										var msg = "";
										if(resultData.action == 'approve'){
											msg = "Record approved successfully";
										}
										else{
											msg = "Record rejected successfully";
										}
										//console.log($scope.parentWatcher);
										if($scope.parentWatcher=="dashboard")
											$scope.$parent.load();
										else if($scope.parentWatcher=="documents")										
											$scope.$parent.$parent.$parent.refreshRecords(msg);
										else
											load();		

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


						 $scope.$watch('loadTaskData', function (newValue, oldValue) { 
                            if(newValue != undefined && newValue != oldValue);
							{
								load();
							}	
		                });

					}
				]

        };
    });
});