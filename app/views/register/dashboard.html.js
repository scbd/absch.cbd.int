define(['app', 'underscore',
 '/app/services/role-service.js', '/app/services/app-config-service.js',
 '/app/views/register/directives/register-top-menu.js', 'toastr','scbd-angularjs-services'],
function(app, _) {
    "use strict";
    app.controller("DashboardController", ["$rootScope", "$scope", "IStorage", "roleService", "$compile", "realm", "$q",
                    "$routeParams", '$location', "$filter", "$http", "$element","$timeout", 'toastr', 'appConfigService',
                    'IWorkflows',
        function($rootScope, $scope, storage, roleService, $compile, realm, $q, $routeParams, 
                $location, $filter, $http, $element, $timeout, toastr, appConfigService, IWorkflows) {

            var schemaFacets = {};

            $timeout(function(){
                $element.find('[data-toggle="tooltip"]').tooltip();
            },50);


            //====================================================================================
            $scope.isFilter = function(filter) {
                return $scope.dashboardFilter == filter || $scope.dashboardFilter == "All";
            }

            $scope.user = $rootScope.user;

            if ($scope.user.isAuthenticated) {
                $scope.roles = {
                    isAbsPublishingAuthority : roleService.isAbsPublishingAuthority(),
                    isAbsNationalFocalPoint  : roleService.isAbsNationalFocalPoint(),
                    isAbsAdministrator       : roleService.isAbsAdministrator(),
                    isAdministrator          : roleService.isAdministrator(),
                    isAbsNationalAuthorizedUser : roleService.isAbsNationalAuthorizedUser(),
                    isUser                      : roleService.isUser()
                };

                if($scope.user.government)
                    $scope.userCountry = {identifier:$scope.user.government };

            }


            $scope.gotoNew = function($event, cftype) {
                $event.stopPropagation();
                $location.path("/register/" + $filter("urlSchemaShortName")(cftype) + "/new");
            }

            $scope.gotoList = function($event, cftype) {
                $location.path("/register/" + $filter("urlSchemaShortName")(cftype));
            }

            //===================================================================
            $scope.facets = function(schema, type){

                if (schemaFacets[schema]) {
                    return schemaFacets[schema][type+'Count']||0;
                }
                else return 0;
            };

            function init(){
                $scope.isNationalUser = roleService.hasAbsRoles();
                loadFacets();
            }

            function loadFacets() {
                //  var fromStorage = localStorageService.get('documentRegisterFacets');
                // if(fromStorage)
                //     return fromStorage;

                var published = storage.documentQuery.facets("", {collection: "my"});
                var drafts = storage.documentQuery.facets("", {collection: "mydraft"});
                var requests = storage.documentQuery.facets("", {collection: "request"});
                var queries = [published, drafts, requests]

                var taskQueries = loadmyTaskFacets();
                if(taskQueries.length>0)
                    queries.push(taskQueries);

                $q.all(_.flatten(queries)).then(function(results) {

                    var index = 0;
                    _.each(results, function(facets) {
                        _.each(facets.data, function(count, format) {

                            if (!schemaFacets[format])
                                schemaFacets[format] = {};

                            if (index == 0)
                                schemaFacets[format].publishCount = count;
                            else if (index == 1)
                                schemaFacets[format].draftCount = count;
                            else if (index == 2)
                                schemaFacets[format].requestCount = count;
                            else if (index > 2)//workflow count from workflows
                                schemaFacets[format].requestCount = (schemaFacets[format].requestCount||0) + count;
                        })
                        index++;
                    });

                }).then(null, function(error) {
                    toastr.error("error loading facets.");
                    console.log(error);
                })
            }
             function loadmyTaskFacets(){
                   var taskQuery = [];
                   var referenceApproverRoles =
                            {"resource"                 : ["AbsRequestApprovalNotification", "AbsRequestApprovalNotification-trg", "AbsRequestApprovalNotification-dev"],
                            "capacityBuildingInitiative": ["AbsPACapacityBuildingInitiative", "AbsPACapacityBuildingInitiative-trg", "AbsPACapacityBuildingInitiative-dev"],
                            "capacityBuildingResource"  : ["AbsPACapacityBuildingResource", "AbsPACapacityBuildingResource-trg", "AbsPACapacityBuildingResource-dev"],
                            "modelContractualClause"    :  ["AbsPAModelContractualClause", "AbsPAModelContractualClause-dev", "AbsPAModelContractualClause-trg"],
                            "communityProtocol"         :  ["AbsPACommunityProtocol", "AbsPACommunityProtocol-trg", "AbsPACommunityProtocol-dev"]};
                            
                    _.each(referenceApproverRoles, function(roles, schema){

                        if(roleService.isUserInRoles(roles)){
                        
                            var myUserID = $scope.$root.user.userID;
                            var query    = {
                                $and : [
                                    { "activities.assignedTo": myUserID } ,
                                    { "closedOn"             : { $exists : false } },
                                    { "data.realm"           : appConfigService.currentRealm },
                                    { "data.metadata.schema" : schema }
                                ]
                            };
                            var query = IWorkflows.query(query,true)
                                        .then(function(data){
                                            var facetData = {data : {}};
                                            facetData.data[schema] = data.count;
                                            return facetData;
                                        });
                            taskQuery.push(query);
                        }
                    })
                    
                    return taskQuery;
                }
            init();
        }
    ]);
});
