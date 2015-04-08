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
                onActivityUpdate : '&', //used in case if the directive parent needs to be refreshed else the workflow details will be fetched.
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
									IWorkflows.get($scope.workflowTaskId).then(function(workflow){

										$scope.workflow = workflow;
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
										if(resultData.result.action == 'approve'){
											msg = "Record approved successfully";
										}
										else{
											msg = "Record rejected successfully";
										}


										if(typeof $scope.onActivityUpdate == 'function')
											$timeout(function(){
												$scope.onActivityUpdate();
												$scope.$emit('taskAction',{document:$scope.document, workflowAction:resultData});
												$scope.isUpdating = false;
											}, 8000);
										else{
											load();
											$scope.isUpdating = false;
										}

							}).catch(function(error) {
								alert(error);
								$scope.isUpdating = false;
								$element.find('.overlayDiv').removeClass('overlayDiv');
								$element.find('#spiner').css('display', 'none');
								$scope.isUpdating = false;
							}).finally(function(){

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
