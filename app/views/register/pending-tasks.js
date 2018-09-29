define(['app', 'underscore', 'js/common',  'moment', 'components/scbd-angularjs-controls/form-control-directives/all-controls',
    'views/register/directives/register-top-menu', 'services/role-service',
    'views/directives/task-id-directive',
    'views/forms/view/record-loader.directive'], function (app) {

        "use strict";
        app.controller("pendingTasksCotroller", ["$scope",  "$timeout", "IWorkflows", "realm", "commonjs", '$rootScope', 'roleService', 'locale',
            function ($scope, $timeout, IWorkflows, realm, commonjs, $rootScope, roleService, locale) {
                

                $scope.sortTerm = 'createdOn';
                $scope.orderList = true;
                $scope.today = new Date();
                $scope.tasks = null;
                $scope.sortTerm = 'workflow.createdOn';
                $scope.orderList = true;
                $scope.sort = { createdOn: -1 };
                load(null);

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

                //==================================
                $scope.getDays = function (Date1) {
                    var days = moment.duration().asDays();
                    return days;
                };

                //==================================
                $scope.filterByStatus = function (stat) {
                   $scope.filterStatus = stat;
                   $scope.tasks = null;
                   load(null);
                };

                //==================================
                function load(query) {

                        if(!query)
                            query = buildQuery();

                        $scope.loadingTasks = true;

                        IWorkflows.query(query, null).then(function (workflows) {
                           
                            var tasks = [];

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

                //==================================
                function buildQuery(){
                    var queries = {
                        $and: [
                            { "data.realm": realm.value }
                        ]
                    };
                    if(!roleService.isAdministrator()){
                        var status = $scope.filterStatus || 'Pending';

                            if(status == 'Pending'){
                                queries.$and.push({ "state": 'running'})
                                queries.$and.push({$or : [{"createdBy": $rootScope.user.userID}, {"activities.assignedTo": $rootScope.user.userID}] });
                            }
                            else if(status == 'Approved' ){
                                queries.$and.push({ "state": 'completed'})
                                queries.$and.push({$or : [{ "activities.result.action": 'approve'}, {"activities.result.action": 'approved'}] });
                                queries.$and.push({$or : [{"createdBy": $rootScope.user.userID}, {"activities.completedBy": $rootScope.user.userID}] });
                            }
                            else if(status == 'Rejected'){
                                queries.$and.push({"state": 'completed'})
                                queries.$and.push({$or : [{"activities.result.action": 'reject'}, {"activities.result.action": 'rejected'}] });
                                queries.$and.push({$or : [{"createdBy": $rootScope.user.userID}, {"activities.completedBy": $rootScope.user.userID}] });
                            }
                            else if(status == 'TimedOut' ){
                                queries.$and.push({"state": 'timedOut'})
                                queries.$and.push({$or : [{"createdBy": $rootScope.user.userID}, {"activities.assignedTo": $rootScope.user.userID}] });
                            }
                            else if(status == 'Canceled' ){
                                queries.$and.push({"state": 'canceled'})
                                queries.$and.push({"activities.assignedTo": $rootScope.user.userID});
                            }
                            else if(status == 'All' ){
                                queries.$and.push({$or : [{"createdBy": $rootScope.user.userID}, 
                                {"activities.assignedTo": $rootScope.user.userID},
                                {"activities.canceledBy": $rootScope.user.userID},
                                {"activities.completedBy": $rootScope.user.userID},
                                {"activities.terminatedBy": $rootScope.user.userID}
                                ] });
                            }
                    }
                    return queries;
                }

            }]);
    });
