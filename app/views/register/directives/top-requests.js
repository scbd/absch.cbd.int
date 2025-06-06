﻿import app from '~/app';
import template from 'text!./top-requests.html';
import _ from 'lodash';
import '~/services/main';
import topRequestsT from '~/app-text/views/register/directives/top-requests.json';

app.directive("topRequests", ['$q', "IWorkflows", "realm", '$rootScope', 'roleService', "$location", "$filter", "translationService",
        function ($q, IWorkflows, realm, $rootScope, roleService, $location, $filter, translationService) {
        return {
            restrict: "EA",
            template: template, 
            replace: true,
            transclude: false,
            scope: {
                viewAllUrl: '@'
            },
            link: function($scope, element, attrs ) {
                translationService.set('topRequestsT', topRequestsT);            
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
                $scope.user = $rootScope.user;
                $scope.isBch = realm.is('BCH');
                 if ($scope.user.isAuthenticated) {
                    $scope.roles = {
                        is                       : roleService.is.bind(roleService),
                        isPublishingAuthority : roleService.isPublishingAuthority(),
                        isNationalFocalPoint  : roleService.isNationalFocalPoint(),
                        isAdministrator       : roleService.isAdministrator(),
                        isNationalAuthorizedUser : roleService.isNationalAuthorizedUser(),
                        isUser                      : roleService.isUser()
                    };
                }
               function isSCBDReviewType (requestType, schema) {
                    if (!requestType || !schema) return false;

                    const schemaType = realm.schemas?.[schema]?.type;

                    return schemaType == 'reference' && ['publishReferenceRecord', 'deleteRecord'].includes(requestType);
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
                                    var activity = _.last(_.sortBy(workflow.activities, ['createdOn']));
                                    if(activity && (!activity.timedOutOn || !activity.closedOn)){
                                        tasks.push({
                                            workflow: workflow, 
                                            activity: activity,
                                            identifier: workflow.data.identifier,
                                            isSCBDReviewType: isSCBDReviewType(workflow.type.name, workflow.data.metadata.schema)
                                        });
                                    }
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

                    if((roleService.isPublishingAuthority() ||  roleService.isNationalFocalPoint()) && $rootScope.user.government ){
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
                    //only get workflow with activities
                    queries.$and.push( {"$and" : [ { "state": 'running'}, {activities : {$gt: []}}, {"createdOn": {"$gte": expired }} ] });
                
                    return queries;
                }
                    //==================================================
					//
					//
					//==================================================
					$scope.isPA = function(){
						return roleService.isPublishingAuthority() 
                    };
                    $scope.gotoRequest = function(type, id) {
                        $location.url('/register/'+ $filter("urlSchemaShortName")(type)+'/'+id+'/view');
                    }


            }
        };
    }]);

