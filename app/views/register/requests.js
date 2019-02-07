define(['app', 
'underscore', 
'js/common',  
'moment', 
'components/scbd-angularjs-controls/form-control-directives/all-controls',
'views/register/directives/register-top-menu', 
'services/role-service',
'views/directives/task-id-directive',
'views/forms/view/record-loader.directive'], function (app) {

        "use strict";
        app.controller("requestsController", ["$scope", "IWorkflows", "realm", '$rootScope', 'roleService', 
            function ($scope, IWorkflows, realm, $rootScope, roleService) {

                $scope.sortTerm = 'createdOn';
                $scope.orderList = true;
                $scope.today = new Date();
                $scope.tasks = null;
                $scope.sortTerm = 'workflow.createdOn';
                $scope.orderList = true;
                $scope.sort = { createdOn: -1 };
                load(null);
                $scope.loading = true;
                $scope.filterStatus = "Pending";
                $scope.user = $rootScope.user;

                if ($scope.user.isAuthenticated) {
                    $scope.roles = {
                        is                       : roleService.is.bind(roleService),
                        isAbsPublishingAuthority : roleService.isAbsPublishingAuthority(),
                        isAbsNationalFocalPoint  : roleService.isAbsNationalFocalPoint(),
                        isAbsAdministrator       : roleService.isAbsAdministrator(),
                        isAdministrator          : roleService.isAdministrator(),
                        isAbsNationalAuthorizedUser : roleService.isAbsNationalAuthorizedUser(),
                        isUser                      : roleService.isUser()
                    };
                }
    

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

                        $scope.loading = true;

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
                            $scope.loading = false;
                        });
                }

                //==================================
                function buildQuery(){
                    var queries = {
                        $and: [
                            { "data.realm": realm.value }
                        ]
                    };

                    var expired = moment.utc(new Date()).subtract("12", "weeks");
                    console.log(expired);

                    var status = $scope.filterStatus || 'Pending';

                    if((roleService.isAbsPublishingAuthority() || roleService.isAbsNationalAuthorizedUser() || roleService.isAbsNationalFocalPoint()) && $rootScope.user.government ){
                        queries.$and.push({$or : [
                            {"createdBy": $rootScope.user.userID}, 
                            {"activities.assignedTo": $rootScope.user.userID},
                            {"activities.canceledBy": $rootScope.user.userID},
                            {"activities.completedBy": $rootScope.user.userID},
                            {"activities.terminatedBy": $rootScope.user.userID},
                            {"data.metadata.government": $rootScope.user.government}
                            ] });
                    }
                    else{
                        queries.$and.push({$or : [
                            {"createdBy": $rootScope.user.userID}, 
                            {"activities.assignedTo": $rootScope.user.userID},
                            {"activities.canceledBy": $rootScope.user.userID},
                            {"activities.completedBy": $rootScope.user.userID},
                            {"activities.terminatedBy": $rootScope.user.userID},
                            ] });
                    }

                    if(status == 'Pending'){
                        queries.$and.push( {"$and" : [ { "state": 'running'}, {"createdOn": {"$gte": expired }} ] });
                    }
                    else if(status == 'Approved' ){
                        queries.$and.push({ "state": 'completed'})
                        queries.$and.push({$or : [{ "activities.result.action": 'approve'}, {"activities.result.action": 'approved'}] });
                    }
                    else if(status == 'Rejected'){
                        queries.$and.push({"state": 'completed'})
                        queries.$and.push({$or : [{"activities.result.action": 'reject'}, {"activities.result.action": 'rejected'}] });
                    }
                    else if(status == 'Expired' ){
                        queries.$and.push({ "state": {'$ne' : 'completed'}});
                        queries.$and.push({ "state": {'$ne' : 'canceled'}})
                        queries.$and.push( {"$and" : [{"createdOn": {"$lt": expired }} ] });
                    }
                    else if(status == 'Canceled' ){
                        queries.$and.push({"state": 'canceled'})
                    }
                    else if(status == 'All' ){
                        
                    }
                    
                    return queries;
                }

            }]);
    });
