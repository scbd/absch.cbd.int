define(['app',
	'../forms/view/record-loader.directive.html.js'], function (app) {

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
            controller: [ "$scope", "$timeout", "authHttp", "$route", "IStorage", "IWorkflows", "authentication", "underscore",'$element',
					 function ($scope, $timeout, $http, $route, IStorage, IWorkflows, authentication, _, $element)
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

									});

								}



						}


						//==================================================
						//
						//
						//==================================================
						$scope.updateActivity = function(resultData) {
							$('#buttonsDiv').wrap("<div class='overlayDiv'> </div>")

							$element.find('#spinner').css('display', 'block');
							$scope.isUpdating = true;
							IWorkflows.updateActivity($scope.workflowTaskId, $scope.workflow.activities[0].name, resultData).then(function(resultData){
									// if($scope.$parentWatcher){
									console.log(resultData);
										var msg = "";
										if(resultData.action == 'approve'){
											msg = "Record approved successfully";
										}
										else{
											msg = "Record rejected successfully";
										}
                                        $scope.$emit('taskAction',$scope.document, resultData);
										
										//TODO: call proper event on parent instead going by parent object.
										if($scope.parentWatcher=="dashboard")
											$scope.$emit("updateWorkflowList");//.$parent.load();
										else if($scope.parentWatcher=="documents")
											$scope.$parent.$parent.$parent.refreshRecords(msg);
										else
											load();

							}).catch(function(error) {
								alert(error);
								$element.find('.overlayDiv').removeClass('overlayDiv');
								$element.find('#spiner').css('display', 'none');
								$scope.isUpdating = false;
							}).finally(function(){
								$scope.isUpdating = false;
							});
						};
						$scope.user = function() {
							return $scope.$root.user.userID;
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
