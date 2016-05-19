define(['app', 'underscore', '/app/js/common.js', '/app/views/directives/infinite-scroll-directive.js', 'moment',
    '/app/views/register/directives/register-top-menu.js'], function (app) {

        "use strict";
        app.controller("adminPendingTasksCotroller", ["$scope", "$timeout", "IWorkflows", "realm", "commonjs",
            function ($scope, $timeout, IWorkflows, realm, commonjs) {

                $scope.sortTerm = 'createdOn';
                $scope.orderList = true;

                var query = {
                    $and: [
                        { state: "running" },
                        { "data.realm": realm.value },
                        { createdOn: { "$lte": moment().subtract(12, "weeks").toISOString() } }
                    ]
                };

                $scope.options = {
                    filterTypes: function () {
                        var types = [];
                        types.push({ 'identifier': 'authority', 'name': 'Competent National Authority' });
                        types.push({ 'identifier': 'measure', 'name': 'Legislative, administrative or policy measures' });
                        types.push({ 'identifier': 'database', 'name': 'National Websites and Databases' });
                        types.push({ 'identifier': 'absPermit', 'name': 'Internationally Recognized Certificate of Compliance' });
                        types.push({ 'identifier': 'absCheckpoint', 'name': 'Checkpoints' });
                        types.push({ 'identifier': 'absCheckpointCommunique', 'name': 'Checkpoint Communiqués' });
                        types.push({ 'identifier': 'resource', 'name': 'Virtual Library Record' });
                        return types;
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
                function load(taskGroupBy) {

                    if ($scope.recordCount > 0) {

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
                                workflow.workflowExpiryDate = moment(workflow.createdOn)
                                    .add(workflow.workflowAge.age, workflow.workflowAge.type);
                            });

                            $scope.tasks = _.union(tasks, $scope.tasks);


                        }).finally(function () {
                            $scope.loadingTasks = false;
                        });
                    }

                }

                $scope.loadTasks = function () {
                    if ($scope.loadingTasks || $scope.skip > Math.ceil($scope.recordCount / $scope.length))
                        return;

                    $scope.loadingTasks = true;
                    //get record count
                    if (!$scope.recordCount)
                        IWorkflows.query(query, 1).then(function (recordCount) {
                            $scope.recordCount = recordCount.count;
                            $scope.tasks = [];
                            load();
                        });
                    else
                        load();
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

            }]);
    });
