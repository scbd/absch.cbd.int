define(['app', 'underscore', 'cbd-forums',
        '/app/js/common.js'], function(app, _) {

    return ["$scope", "$http", "$q", "$route", "$routeParams","commonjs","$rootScope",'$route',
     function($scope, $http, $q, $route, $routeParams, commonjs, $rootScope, $route) {

        if (!$route.current.$$route.forumListUrl) {
            throw 'Forum list URL not specified in route, please forumListUrl attribute in routes'
        } else
            $scope.forumListUrl = $route.current.$$route.forumListUrl;

        $scope.forum = $route.current.$$route.text;
        $scope.forumId = $route.current.$$route.forumId
        $scope.threadId = $routeParams.threadId;


        var thread = $http.get('/api/v2014/discussions/threads/' + $scope.threadId);
        $q.when(thread).then(function(response) {

            $scope.threadSubject = response.data.subject;

        });

        $scope.isAdmin = function(){
            return commonjs.isUserInRole($rootScope.getRoleName('AbsAdministrator')) ||
            commonjs.isUserInRole($rootScope.getRoleName('Administrator'))

        }
        
        $scope.$on('signIn', function(evt, user){
           $route.reload(); 
        });
        
    }];
});
