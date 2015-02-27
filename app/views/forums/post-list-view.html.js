define(['app', 'underscore', 'cbd-forums'], function(app, _) {

    return ["$scope", "authHttp", "$q", "$route", "$routeParams", function($scope, $http, $q, $route, $routeParams) {

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


    }];
});
