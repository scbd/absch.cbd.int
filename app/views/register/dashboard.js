import app from 'app';
import _ from 'lodash';
import ng from 'angular';
import 'services/main';
import 'views/register/directives/register-top-menu';
import 'toastr';
import 'components/scbd-angularjs-services/main';
import 'views/register/directives/top-records';
import 'views/register/directives/top-requests';
import 'ngDialog';
    
    export default ["$rootScope", "$scope", "IStorage", "roleService", "articlesService", "realm", "$q",
                    "$routeParams", '$location', "$filter", "ngDialog", "$timeout", 'toastr',
                    'IWorkflows', 'commonjs',
        function($rootScope, $scope, storage, roleService, articlesService, realm, $q, $routeParams, 
                $location, $filter, ngDialog, $timeout, toastr, IWorkflows, commonjs) {
            
            $scope.schemas          = realm.schemas        
            $scope.languages        = commonjs.languages;
            $scope.Math             = window.Math;
            $scope.nationalSchemas  = _.without(realm.nationalSchemas, 'contact', 'focalPoint');
            $scope.referenceSchemas = _.without(realm.referenceSchemas, 'capacityBuildingResource');
            $scope.topRecords       = {};
            $scope.user             = $rootScope.user;
            $scope.showRecords      = true;
            $scope.isBch            = realm.is('BCH');
            $scope.isAbs            = realm.is('ABS');

            var schemaFacets = {};

            //====================================================================================
            $scope.isFilter = function(filter) {
                return $scope.dashboardFilter == filter || $scope.dashboardFilter == "All";
            }

            if ($scope.user.isAuthenticated) {
                $scope.roles = {
                    is                      : roleService.is.bind(roleService),
                    isPublishingAuthority   : roleService.isPublishingAuthority(),
                    isNationalFocalPoint    : roleService.isNationalFocalPoint(),
                    isAdministrator         : roleService.isAdministrator(),
                    isNationalAuthorizedUser: roleService.isNationalAuthorizedUser(),
                    isUser                  : roleService.isUser(),
                    isNationalSchemaUser    : roleService.isNationalSchemaUser,
                    isNationalUser          : roleService.isNationalUser(),
                    isSchemaUser            : roleService.isSchemaUser
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

            $scope.showUserRoles = function(){
                var user = $scope.user;
                ngDialog.open({
                    name     : 'rolesDialog',
                    className : 'ngdialog-theme-default',
                    template : 'rolesDialog',
                    controller : ['$scope', '$http', function($scope, $http){
                        var roleQuery = {roles : user.roles };
                        $http.get('/api/v2013/roles' , {params : {q : roleQuery}})
                        .then(function(data){
                            $scope.userRoles = data.data;
                        })

                        $scope.closeDialog = function(){
                            ngDialog.close();
                        }
                    }]
                })

            }

            $scope.toggleTooTip = function(){
                $timeout(function(){
                    ng.element('#welcomeSection').find('[data-toggle="tooltip"]').tooltip();  
                }, 200)
            }
            
            function init(){                      
                loadFacets();
                if($scope.isBch){
                    commonjs.loadJsonFile('app-data/bch/offline-formats.json')
                    .then(function(data){
                        $scope.offlineFormats = data;
                    })
                    loadArticle();
                }
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
                    _.forEach(results, function(facets) {
                        _.forEach(facets.data, function(count, format) {

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
                            
                    _.forEach(referenceApproverRoles, function(roles, schema){

                        if(roleService.isUserInRoles(roles)){
                        
                            var myUserID = $scope.$root.user.userID;
                            var query    = {
                                $and : [
                                    { "activities.assignedTo": myUserID } ,
                                    { "closedOn"             : { $exists : false } },
                                    { "data.realm"           : realm.value },
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
            
            function loadArticle(){
                articlesService.getArticle('5ce467f7452a5c00015e3406')
                .then(function(article){
                    $scope.betaArticle = article;
                })
            }

            init();

            $timeout(function(){
                ng.element('#RegisterPage').find('[data-toggle="tooltip"]').tooltip();                
            },100);
        }
    ];

