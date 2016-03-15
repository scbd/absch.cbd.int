define(['app', 'underscore', '/app/services/role-service.js'], function(app, _) {

    app.directive("registerMenu", [
        function() {

            return {
                restrict: "EA",
                templateUrl: "/app/views/register/directives/register-menu.html",
                replace: true,
                transclude: false,
                require     : '^^absRegister',
                scope : {},
                link    : function($scope, element, attrs, absRegisterCtrl){
                    // console.log(absRegisterCtrl);
                    
                    //===================================================================
                    $scope.gotoList = function($event, type){
                        absRegisterCtrl.gotoList($event, type);
                    }
                    
                    //===================================================================
                    $scope.gotoNew = function($event, type){
                        absRegisterCtrl.gotoNew($event, type);
                    }

                    //===================================================================
                    $scope.facets = function(schema, type){
                        var facetList = absRegisterCtrl.getFacets();

                        if(facetList){

                            return _.findWhere(facetList, {'schema':schema})[type+'Count'];
                        }

                    };
                    
                    //===================================================================
                    $scope.isActiveTab = function(){
                        return false;
                    }

                    
                },
                controller : ['$scope', '$element', 'roleService', '$rootScope', '$compile', '$filter', '$routeParams','authentication',
                    function($scope, $element, roleService, $rootScope, $compile, $filter, $routeParams, authentication){


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
                        
                        }
              
                       
                    
                    if ($rootScope.user && $rootScope.user.isAuthenticated && roleService.hasAbsRoles()) {

                        require(['/app/views/register/directives/national-records-menu.html.js'], function(menu) {
                            $scope.$apply(function() {
                                // console.log(menu);
                                $element.find('#menuPlaceholder')
                                    .append($compile('<div register-national-menu ></div>')($scope));
                            });
                        });
                    }

                }]
            };
        }]);
    });
