define(['app', 'underscore',
 '/app/services/role-service.js',
 '/app/views/register/directives/record-overview.js',
 '/app/views/register/directives/register-top-menu.js'],
function(app, _) {
    "use strict";
    app.controller("DashboardController", ["$rootScope", "$scope", "IStorage", "roleService", "$compile", "realm", "$q",
                    "$routeParams", '$location', "$filter", "$http", "$element","$timeout",
        function($rootScope, $scope, storage, roleService, $compile, realm, $q, $routeParams, $location, $filter, $http, $element, $timeout) {

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
                $location.url("/register/" + $filter("mapSchema")(cftype) + "/new");
            }

            $scope.gotoList = function($event, cftype) {
                $location.url("/register/" + $filter("mapSchema")(cftype));
            }

            //===================================================================
            $scope.facets = function(schema, type){

                if (schemaFacets[schema]) {
                    return schemaFacets[schema][type+'Count']||0;
                }
                else return 0;
            };

            function init(){
                if (roleService.hasAbsRoles()) {

                    require(['/app/views/register/directives/national-records-menu.html.js'], function(menu) {
                        $scope.$apply(function() {
                            $element.find('#menuPlaceholder')
                                .append($compile('<div register-national-menu ></div>')($scope));
                        });
                    });
                }
                loadFacets();
            }

            function loadFacets() {
                //  var fromStorage = localStorageService.get('documentRegisterFacets');
                // if(fromStorage)
                //     return fromStorage;

                var published = storage.documentQuery.facets("", {collection: "my"});
                var drafts = storage.documentQuery.facets("", {collection: "mydraft"});
                var requests = storage.documentQuery.facets("", {collection: "request"});

                $q.all([published, drafts, requests]).then(function(results) {

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
                        })
                        index++;
                    });

                }).then(null, function(error) {
                    toastr.error("error loading facets.");
                    console.log(error);
                })
            }

            init();
        }
    ]);
});
