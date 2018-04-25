define(['app', 'underscore', 'js/common', 'ngInfiniteScroll', 'moment', 'components/scbd-angularjs-controls/form-control-directives/all-controls',
    'views/register/directives/register-top-menu', 'services/role-service',
    'views/directives/task-id-directive',
    'views/forms/view/record-loader.directive'], function (app) {

        "use strict";
        app.controller("pendingTasksCotroller", ["$scope", "$timeout", "IWorkflows", "realm", "commonjs", '$rootScope', 'roleService', 'locale',
            function ($scope, $timeout, IWorkflows, realm, commonjs, $rootScope, roleService, locale) {
                $scope.filters = {};
                $scope.sortTerm = 'createdOn';
                $scope.orderList = true;
                $rootScope.stopSmoothScroll = true;
                
                $scope.options = {
                    filterTypes: function () {
                        return _.sortBy(_.map(realm.schemas, function(schema, key){
                            return {identifier: key, name: schema.title[locale]}
                        }), "name");
                    },
                    filterStatus: function () {
                        var status = [];
                        status.push({ 'identifier': '1', 'name': 'Wating your approval' });
                        status.push({ 'identifier': '2', 'name': 'Approved' });
                        status.push({ 'identifier': '3', 'name': 'Rejected' });

                        return status;
                    }
                };

                $scope.tasks = null;
                $scope.load = load;

                $scope.sortTerm = 'workflow.createdOn';
                $scope.orderList = true;

                $scope.length = 25;
                $scope.skip = 0;
                $scope.sort = { createdOn: -1 };

                //==================================
                $scope.sortTable = function (term) {

                    if ($scope.sortTerm == term) {
                        $scope.orderList = !$scope.orderList;
                    }
                    else {
                        $scope.sortTerm = term;
                        $scope.orderList = true;
                    }
                };
                //==============================
                //
                //==============================
                function load(query) {

                    if ($scope.recordCount > 0) {
                        if(!query)
                            query = buildQuery();
                        $scope.loadingTasks = true;
                        IWorkflows.query(query, null, $scope.length, $scope.skip == 0 ? 0 : $scope.length * $scope.skip).then(function (workflows) {
                            $scope.skip++;
                            var tasks = [];
                            //tasks = _.clone($scope.taskLists||[]);
                            workflows.forEach(function (workflow) {
                                if (workflow.activities.length > 0) {
                                    workflow.activities.forEach(function (activity) {
                                        tasks.push({
                                            workflow: workflow, activity: activity,
                                            identifier: workflow.data.identifier
                                        });
                                    });
                                }
                                else {
                                    tasks.push({ workflow: workflow, identifier: workflow.data.identifier });
                                }

                                if (!workflow.workflowAge) {
                                    workflow.workflowAge = { 'age': 12, 'type': 'weeks' };
                                }
                                workflow.workflowExpiryDate = moment.utc(workflow.createdOn)
                                    .add(workflow.workflowAge.age, workflow.workflowAge.type);
                            });

                            $scope.tasks = _.union($scope.tasks, tasks);


                        }).finally(function () {
                            $scope.loadingTasks = false;
                        });
                    }
                    else
                        $scope.loadingTasks = false;

                }

                $scope.loadTasks = function (query) {
                    if ($scope.loadingTasks || $scope.skip > Math.ceil($scope.recordCount / $scope.length))
                        return;

                    if(!query)
                        query = buildQuery();
                    $scope.loadingTasks = true;
                    //get record count
                    if (!$scope.recordCount)
                        IWorkflows.query(query, 1).then(function (recordCount) {
                            $scope.recordCount = recordCount.count;
                            $scope.tasks = [];
                            load(query);
                        });
                    else
                        load(query);
                }
                //==============================
                //
                //==============================
                $scope.formatWID = function (workflowID) {
                    return workflowID.replace(/(?:.*)(.{3})(.{4})$/g, "W$1-$2");
                };


                $scope.filterByType = function (entity) {

                    if (!$scope.filterType)
                        return true;

                    return entity && $scope.filterType == entity.workflow.data.metadata.schema;
                };

                $scope.filterByStatus = function (task) {

                    if (!$scope.filterStatus)
                        return true;

                    if ($scope.filterStatus == 1) {
                        return task && task.workflow.state != 'completed' && task.activity.name == 'publishRecord';
                    }
                    else if ($scope.filterStatus == 2) {
                        return task && task.workflow.state == 'completed' && task.activity.result.action == 'approve';
                    }
                    else if ($scope.filterStatus == 3) {
                        return task && task.workflow.state == 'completed' && task.activity.result.action == 'reject';
                    }
                    //return entity && _.contains($scope.filterStatus, entity.workflow.data.metadata.schema);
                };

                $scope.$watch('filters', function(old, newVal){

                    $scope.recordCount = 0;
                    $scope.length = 25;
                    $scope.skip = 0;
                    $scope.loadTasks(buildQuery());
                }, true);

                function buildQuery(){
                    var queries = {
                        $and: [
                            { state: "running" },
                            { "data.realm": realm.value }
                        ]
                    };
                    if(!roleService.isAdministrator()){
                        queries.$and.push({"activities.assignedTo": $rootScope.user.userID});
                    }
                    if($scope.filters.endDate)
                        queries.$and.push({ createdOn: { "$lte": moment(moment($scope.filters.endDate).format("YYYY-MM-DD")).toISOString() } })
                    
                    if($scope.filters.startDate)
                        queries.$and.push({ createdOn: { "$gte": moment(moment($scope.filters.startDate).format("YYYY-MM-DD")).toISOString() } })
                    else
                        queries.$and.push({ createdOn: { "$gte": moment().subtract(12, "weeks").toISOString() }});
                        
                    if($scope.filters.filterType && $scope.filters.filterType.length > 0)
                        queries.$and.push({ "data.metadata.schema": { $in: $scope.filters.filterType }});
                    
                    return queries;
                }

                $scope.$on('$destroy', function(){$rootScope.stopSmoothScroll = false;})
            }]);
    });
