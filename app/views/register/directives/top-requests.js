define(['app', 
'text!./top-requests.html', 
'lodash',
'js/common',  
'services/role-service'], function(app, template, _) {

    app.directive("topRequests", ['$q', "IWorkflows", "realm", '$rootScope', 'roleService', "$location", "$filter",
    function($q, IWorkflows, realm, $rootScope, roleService, $location, $filter) {
        return {
            restrict: "EA",
            template: template, 
            replace: true,
            transclude: false,
            scope: {
                viewAllUrl: '@'
            },
            link: function($scope, element, attrs ) {
                                
                $scope.sortTerm = 'createdOn';
                $scope.orderList = true;
                $scope.today = new Date();
                $scope.tasks = null;
                $scope.sortTerm = 'workflow.createdOn';
                $scope.orderList = true;
                $scope.sort = { createdOn: -1 };
                load(null);
                $scope.loading = true;
                $scope.showAll= true;

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

                    if((roleService.isAbsPublishingAuthority() ||  roleService.isAbsNationalFocalPoint()) && $rootScope.user.government ){
                        queries.$and.push({$or : [
                            {"createdBy": $rootScope.user.userID}, 
                            {"activities.assignedTo": $rootScope.user.userID},
                            {"data.metadata.government": $rootScope.user.government}
                            ] });
                    }
                    else{
                        queries.$and.push({$or : [
                            {"createdBy": $rootScope.user.userID}, 
                            {"activities.assignedTo": $rootScope.user.userID},
                            ] });
                    }

                    queries.$and.push( {"$and" : [ { "state": 'running'}, {"createdOn": {"$gte": expired }} ] });
                
                    return queries;
                }
                    //==================================================
					//
					//
					//==================================================
					$scope.isPA = function(){
						return roleService.isAbsPublishingAuthority() 
                    };
                    $scope.gotoRequest = function(type, id) {
                        $location.url('/register/'+ $filter("urlSchemaShortName")(type)+'/'+id+'/view');
                    }


            }
        };
    }]);
});
