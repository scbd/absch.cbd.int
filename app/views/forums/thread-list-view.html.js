define(['app', 'cbd-forums',
	'/app/views/directives/login.directive.html.js',
	'/app/js/common.js'], function(app) {


    return ["$scope", "$http", "$q", "$filter", "$timeout", "$location", "$route","commonjs","$rootScope",'$route',
        function($scope, $http, $q, $filter, $timeout, $location, $route, commonjs, $rootScope, $route) {

            //$scope.forumId = 17384;

            if (!$route.current.$$route.postUrl) {
                throw 'Post URL not specified in route, please postUrl attribute in routes'
            } else
                $scope.postUrl = $route.current.$$route.postUrl;

            $scope.forumId = $route.current.$$route.forumId;
			$scope.forum = $route.current.$$route.text;

			$scope.isAdmin = function(){
				return commonjs.isUserInRole($rootScope.getRoleName('AbsAdministrator')) ||
				commonjs.isUserInRole($rootScope.getRoleName('Administrator'))

			};
        
            $scope.$on('signIn', function(evt, user){
               $route.reload(); 
            });

        }
    ];
});
