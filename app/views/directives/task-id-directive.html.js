require('app').directive('taskId', function () {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/directives/task-id-directive.html?'+(new Date().getTime()),
            replace: true,
            scope: {
                loadTaskData : '=',
                workflowTaskId : '@'
            },
            controller: [ "$scope", "$timeout", "authHttp", "$route", "IStorage", "IWorkflows", "authentication", "underscore",
					 function ($scope, $timeout, $http, $route, IStorage, IWorkflows, authentication, _) 
					{
						//==================================================
						//
						//
						//==================================================
						function load() {
								if($scope.workflowTaskId != undefined && $scope.loadTaskData != undefined)
								{
									//console.log	($scope.workflowTaskId + '-' + $scope.loadTaskData)
									IWorkflows.get($scope.workflowTaskId).then(function(workflow){
										$scope.workflow = workflow;

										if(workflow.data.identifier && !workflow.closedOn) {

											IStorage.drafts.get(workflow.data.identifier).then(function(result){
												$scope.document = result.data || result;
											});
										}
										//console.log	('promise exe');
									});
									//console.log	('load exe');
								}
						}
						
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
                    //console.log(newValue);
		                    if(newValue != undefined);
							{
								load();
							}	
		                });

					}
				]

        };
    });