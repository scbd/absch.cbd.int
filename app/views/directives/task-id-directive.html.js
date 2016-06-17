define(['app', 'ngDialog',
	'../forms/view/record-loader.directive.html.js', 'toastr'], function (app) {

		app.directive('taskId', function () {
			return {
				restrict: 'EAC',
				templateUrl: '/app/views/directives/task-id-directive.html?',
				replace: true,
				scope: {
					loadTaskData: '=',
					workflowTaskId: '@',
					onActivityUpdate: '&', //used in case if the directive parent needs to be refreshed else the workflow details will be fetched.
					showDetails: "="
				},
				controller: ["$scope", "$timeout", "$http", "$route", "IStorage", "IWorkflows", "authentication", "underscore", '$element', 'toastr', '$window', 'ngDialog',
					function ($scope, $timeout, $http, $route, IStorage, IWorkflows, authentication, _, $element, toastr, $window, ngDialog) {
						//==================================================
						//
						//
						//==================================================
						function load() {

							var activityName = $route.current.params.activity;
							if ($scope.workflowTaskId != undefined && $scope.loadTaskData != undefined) {
								IWorkflows.get($scope.workflowTaskId).then(function (workflow) {

									$scope.workflow = workflow;
									if (workflow.data.identifier && !workflow.closedOn) {

										IStorage.drafts.get(workflow.data.identifier).then(function (result) {
											$scope.document = result.data || result;
										});
									}
									if (!workflow.workflowAge) {
										workflow.workflowAge = { 'age': 12, 'type': 'weeks' };
									}
									var expiryDate = moment(workflow.createdOn)
										.add(workflow.workflowAge.age, workflow.workflowAge.type);
									workflow.daysToApproval = expiryDate.diff(moment(), 'days');

								});
							}
						}

						//==================================================
						//
						//
						//==================================================
						$scope.updateActivity = function (resultData) {
							$element.find('#buttonsDiv').wrap("<div class='overlayDiv'> </div>")

							$element.find('#spinner').css('display', 'block');
							$scope.isUpdating = true;
							IWorkflows.updateActivity($scope.workflowTaskId, $scope.workflow.activities[0].name, resultData).then(function (result) {
								
								var msg = "";
								if (result.result.action == 'approve') {
									msg = "Record published";
								}
								else {
									msg = "Record rejected";
								}

								var workflowInfo = { workflowId: $scope.workflowTaskId, activity: result, status: 'completed' }

								if (typeof $scope.onActivityUpdate == 'function') {
									$scope.onActivityUpdate({ document: $scope.document, workflowInfo: workflowInfo });
									$scope.hideEverything = true;
								}
								else {
									load();
									$scope.isUpdating = false;
								}
								toastr.success(msg);
								$scope.closeDialog();

							}).catch(function (error) {
								toastr.error('There was an error processing your request, please try again.');
								$element.find('.overlayDiv').removeClass('overlayDiv');
								$element.find('#spiner').css('display', 'none');
								$scope.isUpdating = false;
							});
						};
						$scope.user = function () {
							return $scope.$root.user.userID;
						};
						//==================================================
						//
						//
						//==================================================
						$scope.isAssignedToMe = function (activity) {
							return activity && _.contains(activity.assignedTo || [], $scope.$root.user.userID || -1);
						};

                        //==================================================
						//
						//
						//==================================================
						$scope.workFlowIsCreatedByMe = function () {
							return $scope.workflow && ($scope.workflow.createdBy == $scope.$root.user.userID);
						};

						//==================================================
						//
						//
						//==================================================
						$scope.isOpen = function (element) {
							return element && !element.closedOn && !element.timedOut;
						}

						//==================================================
						//
						//
						//==================================================
						$scope.isClose = function (element) {
							return element && element.closedOn;
						}

						//==============================
						//
						//==============================
						$scope.formatWID = function (workflowID) {
							return workflowID ? workflowID.replace(/(?:.*)(.{3})(.{4})$/g, "W$1-$2") : "";
						};


						$scope.$watch('loadTaskData', function (newValue, oldValue) {
                            if (newValue != undefined && newValue != oldValue);
							{
								load();
							}
						});

						$scope.showRejectDialog = function () {
							ngDialog.openConfirm({
								template: 'rejectWorkflowRequestModalTemplate',
								scope: $scope
							});
						}

						$scope.askCancelWorkflowRequest = function () {
							$scope.loading = false;
							ngDialog.openConfirm({
								template: 'cancelWorkflowRequestModalTemplate',
                            	closeByDocument: false,
								scope: $scope
							});
						};
						$scope.cancelWorkflowRequest = function (record) {

							$scope.loading = true;
							IWorkflows.cancel(record._id, { 'action': 'cancel' })
								.then(function (result) {
									var workflowInfo = { workflowId: record._id, activity: result, status: 'canceled' }

									if (typeof $scope.onActivityUpdate == 'function') {
										$scope.onActivityUpdate({ document: $scope.document, workflowInfo: workflowInfo });
										$scope.hideEverything = true;
									}
									toastr.info('The request was successfully recalled');
									$scope.closeDialog();
								}).catch(function (error) {
									toastr.error('There was an error processing your request, please try again.');
									$scope.isUpdating = false;
								}).finally(function () {
									delete $scope.loading;
								});
						};

						$scope.closeDialog = function () {
							ngDialog.close();
						};

					}
				]

			};
		});
	});
