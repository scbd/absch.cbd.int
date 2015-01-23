define(['app'], function (app) {

"use strict";
app.controller("myTasksCotroller", [ "$scope", "$timeout", "IWorkflows", "realm", "underscore","$route", function ($scope, $timeout, IWorkflows, realm, _, $route)
		{

			$scope.options = {
					filterTypes : function(){
							var types = [];
							types.push({'identifier':'authority', 				'name':'Competent National Authority'});
							types.push({'identifier':'measure', 				'name':'Legislative, administrative or policy measures'});
							types.push({'identifier':'database', 				'name':'National Websites and Databases'});
							types.push({'identifier':'absPermit', 				'name':'Internationally Recognized Certificate of Compliance'});
							types.push({'identifier':'absCheckpoint', 			'name':'Checkpoints'});
							types.push({'identifier':'absCheckpointCommunique', 'name':'Checkpoint Communiqués'});

							return types;
					},
					filterStatus : function(){
						var status = [];
						status.push({'identifier':'1', 				'name':'Wating your approval'});
						status.push({'identifier':'2', 				'name':'Approved'});
						status.push({'identifier':'3', 				'name':'Rejected'});

						return status;
					}
			};

			var nextLoad  = null
			var myUserID = $scope.$root.user.userID;
			var queryAllTasks    = {
				$or : [
							{ $and : [	{ "activities.assignedTo" : myUserID },
										{ closedOn : { $exists : false } },{ "data.realm" : realm.value }
							] },
							{ $and : [	{ "createdBy" : myUserID } ,
									{ closedOn : { $exists : false } },{ "data.realm" : realm.value }
									] },
							{ $and : [	{ "createdBy" : myUserID },
								{ closedOn : { $exists : true } },{ "data.realm" : realm.value }
								] }
								,
								{ $and : [	{ "activities.completedBy" : myUserID },{ "data.realm" : realm.value }
								] }
					   ]
			};
			var queryMyTasks = {
				$and : [
							{ "activities.assignedTo" : myUserID },
							{ closedOn : { $exists : false } },
							{ "data.realm" : realm.value }
						]
					};

			$scope.tasks = null;
			$scope.load = load;

			$scope.sortTerm = 'activity.createdOn';
			$scope.orderList = true;
	       	 //==================================
	       	 $scope.sortTable = function (term) {

	       	     if ($scope.sortTerm == term) {
	       	         $scope.orderList = !$scope.orderList;
	       	     }
	       	     else {
	       	         $scope.sortTerm = term;
	       	         $scope.orderList = true;
	       	     }
	       	 }
			//==============================
			//
			//==============================
			function load() {

				var query = queryMyTasks;

				if($route.current.$$route.type == 'all'){
					query = queryAllTasks;
				}

				IWorkflows.query(query).then(function(workflows){

					var tasks  = [];

					workflows.forEach(function(workflow) {

						workflow.activities.forEach(function(activity){

							//if(isAssignedToMe(activity)) {
								tasks.push({ workflow : workflow, activity : activity});
						//	}
						});
					});

					$scope.tasks = tasks;

					//nextLoad = $timeout(load, 15*1000);
				});
			}

			if($scope.$root.user.isAuthenticated)
				load();

			//==============================
			//
			//==============================
			function isAssignedToMe(activity) {

				return _.contains(activity.assignedTo||[], $scope.$root.user.userID||-1);
			}

			//==============================
			//
			//==============================
			$scope.formatWID = function (workflowID) {
				return workflowID.replace(/(?:.*)(.{3})(.{4})$/g, "W$1-$2");
			};

			//============================================================
			//
			// ROUTE CHANGE CLEAN-UP
			//
			//============================================================
			var unreg_RouteChangeStart = $scope.$on('$routeChangeStart', function() {

				unreg_RouteChangeStart();

				if(nextLoad)
					$timeout.cancel(nextLoad);
			});

			$scope.filterByType = function(entity){

				console.log($scope.filterType,entity.workflow.data.metadata.schema)
				if(!$scope.filterType)
					return true;

				return entity && $scope.filterType == entity.workflow.data.metadata.schema;
			}

			$scope.filterByStatus = function(task){

				if(!$scope.filterStatus)
					return true;

				if($scope.filterStatus==1){
					return task && task.workflow.state!='completed' &&  task.activity.name=='publishRecord';
				}
				else if($scope.filterStatus == 2){
					return task && task.workflow.state=='completed' &&  task.activity.result.action=='approve';
				}
				else if($scope.filterStatus == 3){
					return task && task.workflow.state=='completed' &&  task.activity.result.action=='reject';
				}
				//return entity && _.contains($scope.filterStatus, entity.workflow.data.metadata.schema);
			}

		}]);
});
