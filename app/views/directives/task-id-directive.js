define(['app', 'lodash','text!views/directives/task-id-directive.html',
	'../forms/view/record-loader.directive', 'toastr', , 'ngDialog',
	'views/directives/document-reference-history',
	'services/local-storage-service', './block-region-directive',
	'../forms/view/record-loader.directive','services/role-service',
], function (app, _, template) {

	app.directive('taskId', function () {
        return {
            restrict: 'EAC',
            template: template,
            replace: true,
            scope: {
                loadTaskData: '=',
                workflowTaskId: '@',
                onActivityUpdate: '&', //used in case if the directive parent needs to be refreshed else the workflow details will be fetched.
                showDetails: "="
            },
            controller: ["$rootScope", "$scope",  "$route", "IStorage", "IWorkflows",
				"$filter", 'toastr',  'ngDialog', 'localStorageService', "$location", 'roleService',
				function ($rootScope, $scope,  $route, IStorage, IWorkflows,
					$filter, toastr, ngDialog, localStorageService, $location, roleService) {
					
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
//
									IStorage.drafts.get(workflow.data.identifier , { info: true, body:true }).then(function (result) {
										result 				= result.data || result;
										$scope.document 	= _.cloneDeep(result.workingDocumentBody || result.body);
										result.body 		= undefined;
										result.workingDocumentBody = undefined;
										$scope.documentInfo = result;
									});
								}
								if (!workflow.workflowAge) {
									workflow.workflowAge = { 'age': 12, 'type': 'weeks' };
								}
								var expiryDate = moment.utc(workflow.createdOn)
									.add(workflow.workflowAge.age, workflow.workflowAge.type);
								workflow.daysToApproval = expiryDate.diff(moment.utc(), 'days');

							});
						}
					}
						//==================================================
						//
						//
						//==================================================
						$scope.isClose = function (element) {
							return element && element.closedOn;
						}

					//==================================================
					//
					//
					//==================================================
					$scope.updateActivity = function (resultData, isDelete) {
						
						$scope.isUpdating = true;

						IWorkflows.updateActivity($scope.workflowTaskId, $scope.workflow.activities[0].name, resultData)
							.then(function (result) {
								var msg = "";
								var operationType;
								if (result.result.action == 'approve') {
									if (isDelete){
										msg = "Record deleted";
										operationType = 'delete';
									}
									else{
										msg = "Record published";
										operationType = 'publish'
									}
								}
								else {
									msg = "Record rejected";
									operationType = 'reject'
								}
								localStorageService.set('workflow-activity-status', { identifier: $scope.document.header.identifier, type: operationType });
								$scope.closeDialog();

					var evtServerPushNotification = $rootScope.$on('event:server-pushNotification', function (evt, data) {
									
									var localStorageDocument = localStorageService.get('workflow-activity-status');

									if(data.type == 'workflowActivityStatus' && localStorageDocument &&
										localStorageDocument.identifier == data.data.identifier && (
										(data.data.workflowActivity == 'document-unlock' && localStorageDocument.type == 'reject') || 
										(data.data.workflowActivity == 'create-revision-from-draft' && 'publish' == localStorageDocument.type) || 
										(data.data.workflowActivity == 'document-deleted' && 'delete'==localStorageDocument.type))){
										
										localStorageService.remove('workflow-activity-status');

										var workflowInfo = { workflowId: $scope.workflowTaskId, activity: result }
										$scope.onActivityUpdate({ document: $scope.document, workflowInfo: workflowInfo });
										$scope.hideEverything = true;
										toastr.success(msg);
									}
								});

								$scope.$on('$destroy', function(){
									evtServerPushNotification();
								})

							}).catch(function (error) {
								toastr.error('There was an error processing your request, please try again.');
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
					$scope.isAdmin = function(){
						return roleService.isAdministrator();
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
							closeByDocument: false,
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

					$scope.confirmDelete = function () {
						var identifier = $scope.document.header.identifier
						var updateActivity = $scope.updateActivity;
						ngDialog.open({
							closeByEscape: false, closeByDocument: false,
							template: 'deleteConfirmation',
							controller: ['$scope', function ($scope) {
								$scope.showDocumentHistory = identifier;

								$scope.updateActivity = function () {
									updateActivity({ action: 'approve' }, true);
									$scope.closeConfirmation();
								}
								$scope.closeConfirmation = function () {
									ngDialog.close();
								}
							}]
						});
					}


					$scope.edit = function (workflow, activity, workflowId) {
						var schemaName = $filter("urlSchemaShortName")(workflow.data.metadata.schema);
						$location.url('/register/' + schemaName + '/' + activity.input.identifier + '/edit?workflow=' + workflowId);
					}

				}
			]

			};
		});
	});
