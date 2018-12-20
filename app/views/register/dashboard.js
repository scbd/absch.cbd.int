define(['app', 'underscore', 'angular', 
 'services/role-service', 'services/app-config-service',
 'views/register/directives/register-top-menu', 'toastr','components/scbd-angularjs-services/services/main', 'views/register/directives/top-records', 'views/register/directives/top-requests'],
function(app, _, ng) {
    "use strict";
    return ["$rootScope", "$scope", "IStorage", "roleService", "$compile", "realm", "$q",
                    "$routeParams", '$location', "$filter", "$http", "$timeout", 'toastr', 'appConfigService',
                    'IWorkflows',
        function($rootScope, $scope, storage, roleService, $compile, realm, $q, $routeParams, 
                $location, $filter, $http, $timeout, toastr, appConfigService, IWorkflows) {
            
            $scope.Math = window.Math;
            $scope.nationalSchemas = _.without(appConfigService.nationalSchemas, 'contact', 'focalPoint');
            $scope.referenceSchemas = _.without(appConfigService.referenceSchemas, 'capacityBuildingResource');
            $scope.topRecords = {};
            $scope.user = $rootScope.user;
            $scope.showRecords= true;

            var schemaFacets = {};

            $timeout(function(){
                ng.element('ng-view').find('[data-toggle="tooltip"]').tooltip();                
            },50);


            //====================================================================================
            $scope.isFilter = function(filter) {
                return $scope.dashboardFilter == filter || $scope.dashboardFilter == "All";
            }

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

                if($scope.user.government)
                    $scope.userCountry = {identifier:$scope.user.government };

            }


            $scope.showTopRecords = function($event, schema) {
                $event.stopPropagation();
                $scope.topRecords[schema] = !$scope.topRecords[schema];
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
    ];
});
