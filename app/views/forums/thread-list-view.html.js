define(['app', 'cbd-forums',
	'/app/views/directives/login.directive.html.js'], function(app) {


    return ["$scope", "$http", "$q", "$filter", "$timeout", "$location", "$route",
        function($scope, $http, $q, $filter, $timeout, $location, $route) {

            //$scope.forumId = 17384;

            if (!$route.current.$$route.postUrl) {
                throw 'Post URL not specified in route, please postUrl attribute in routes'
            } else
                $scope.postUrl = $route.current.$$route.postUrl;

            $scope.forumId = $route.current.$$route.forumId;
			$scope.forum = $route.current.$$route.text;

        }
    ];
});
