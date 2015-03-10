define(['app','underscore','/app/js/common.js'], function (app,_) {

app.controller("myTasksCotroller", [ "$scope", "$timeout", "IWorkflows", "realm", "$route","$filter","commonjs",'$parse','$element',
 	function ($scope, $timeout, IWorkflows, realm, $route, $filter,commonjs,$parse,$element)
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
									tasks.push({ workflow : workflow, activity : activity, identifier: workflow.data.identifier});
							//	}
							});
						});
						$scope.taskLists = $filter("orderBy")(tasks,'workflow.createdOn',true);
						$scope.taskGroupBy = 'workflow._id';
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

			$scope.$on("updateWorkflowList", function(evt,data){

				$timeout(function(){ load(); }, 8000);
			});

			$scope.getGroupTaskDetails = function(tasks){
				// console.log($filter("orderBy")(tasks,'createdOn'));
				 //console.log(_.last(_.sortBy(tasks,'createdOn')));
				// console.log(commonjs.underscoreSort(tasks,'createdOn'))
				if(tasks)
					return _.last(_.sortBy(tasks,'createdOn'));
				return '';
			}

			$scope.$watch('taskGroupBy', function(newVal,oldVal){

				if(newVal && newVal!=oldVal && $scope.taskLists ){
					$element.find('#taskList').fadeOut();
                    $timeout(function(){
                        $scope.tasks = [];
                        if(newVal=='workflow.data.identifier'){
                            if(!$scope.tasksGroup){
                                $scope.tasksGroup=[]
                                var taskList = angular.copy($scope.taskLists);
                                _.each(taskList, function(item){
                                    var task = _.find($scope.tasksGroup, {identifier : item.workflow.data.identifier});
                                    if(!task || task.length==0){
                                        $scope.tasksGroup.push(item);
                                    }
                                    else{
                                        if(!task.workflowHistory){
                                            task.workflowHistory=[];
                                        }
                                        task.workflowHistory.push(item)
                                    }
                                });
                            }
                            $scope.tasks = $scope.tasksGroup;
                        }
                        else
                        {
                            $scope.tasks = $scope.taskLists;
                        }
                    },200);
					// var getter = $parse(newVal);
					// $scope.tasks =  _.groupBy($scope.taskLists, function(item) {
					// 	return getter(item);
					// });
					$element.find('#taskList').fadeIn();
				}
			})

		}]);
});
