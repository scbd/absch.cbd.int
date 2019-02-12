define(['app', 
'underscore', 
'js/common',  
'moment', 
'components/scbd-angularjs-controls/form-control-directives/all-controls',
'views/register/directives/register-top-menu', 
'services/role-service',
'views/directives/task-id-directive',
'views/directives/pagination',
'views/forms/view/record-loader.directive'], function (app) {

        "use strict";
        app.controller("requestsController", ["$scope", "IWorkflows", "realm", '$rootScope', 'roleService', "$q",
            function ($scope, IWorkflows, realm, $rootScope, roleService, $q) {

                $scope.sortTerm = 'createdOn';
                $scope.orderList = true;
                $scope.today = new Date();
                $scope.tasks = null;
                $scope.sortTerm = 'workflow.createdOn';
                $scope.orderList = true;
                $scope.sort = { createdOn: -1 };
                $scope.loading = true;
                $scope.filterStatus = "Pending";
                $scope.user = $rootScope.user;
                
                $scope.currentPage=0;
                $scope.itemCount=0;
                $scope.itemsPerPage=15;

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
                   load(null, 0);

                };
                 //==================================
                 $scope.search = function () {
                    
                    var query = buildQuery(0);
                    load (query, 0)

                 };

                //==================================
                function load(query, page) {

                    if(!query)
                        query = buildQuery(page);

                    $scope.loading = true;
                    var skip = (page || 0 ) * $scope.itemsPerPage;
                    var sort = {'createdOn':-1};
                    var countQuery;
                    var itemsQuery;

                    if(page == 0 ){
                        countQuery = IWorkflows.query(query, true).then(function (data) {
                            $scope.itemCount = data.count;
                            $scope.pageCount = Math.ceil($scope.itemCount / $scope.itemsPerPage);
                        });
                    }
                    else countQuery = { data : {count : $scope.itemCount}};

                    $scope.currentPage   = page;

                    itemsQuery = IWorkflows.query(query, null, $scope.itemsPerPage, skip, null)
                    .then(function (workflows) {
                                
                        $scope.tasks = [];
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
                    
                    })

                    $q.all([countQuery, itemsQuery])
                    .finally(function () {
                        $scope.loading = false;
                    
                    });
                }

                //==================================
                function buildQuery(page){
                    
                    var queries = {
                        $and: [
                            { "data.realm": realm.value }
                        ]
                    };

                    if($scope.filterType && $scope.filterType.length > 0)
                        queries.$and.push({ "data.metadata.schema": { $in: $scope.filters.filterType }})

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

                $scope.onPageChange = function(page){
                    load(null, page)
                }
        
                load(null, 0)

            }]);
    });
