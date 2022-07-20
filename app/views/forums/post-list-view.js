import app from '~/app';
import _ from 'lodash';
import 'ng-breadcrumbs';
import 'cbd-forums';
import '~/services/main';

    export { default as template } from './post-list-view.html';
export default ["$scope", "$http", "$q", "$route", "$routeParams","commonjs","$rootScope",'breadcrumbs',
     function($scope, $http, $q, $route, $routeParams, commonjs, $rootScope, breadcrumbs) {

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

            console.log(breadcrumbs);

            breadcrumbs.options = {'thread_subject': response.data.subject};

        });

        $scope.isAdmin = function(){
            return roleService.isAdministrator();

        }

        $scope.$on('signIn', function(evt, user){
           $route.reload();
        });

    }];

