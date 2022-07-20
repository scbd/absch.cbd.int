import app from '~/app';
import _ from 'lodash';
import template from 'text!./discussion-directive.html';
import 'cbd-forums';

    app.directive('discussion', function() {
        return {
            restrict: 'EAC',
            template: template,
            scope: {
                forumId: '@',
                threadTitle: '@',
                threadMessage: '@',
                exampleMsg: '&',
                tagIdentifier:'@'
            },
            controller: ['$q', '$scope','$http', function($q, $scope, $http) {
                
                $scope.post = function() {

                    //console.log($scope.document, $scope.document.title.en);
                    if (!$scope.threadId) {
                        var thread = {};
                        thread.subject = $scope.threadTitle
                        thread.message = $scope.threadMessage;
                        thread.forumId = $scope.forumId;

                        $scope.discussionMessage = 'validating...';
                        $http.get('/api/v2014/discussions/forums/' + thread.forumId + '/threads?tags=' + $scope.tagIdentifier)
                            .then(function(result) {

                                if (result.data.length == 0) {
                                    $scope.discussionMessage = 'creating discussion...';
                                    $http.post('/api/v2014/discussions/forums/' + thread.forumId + '/threads', thread)
                                        .then(function(result) {
                                            $scope.discussionMessage = 'tagging discussion...';
                                            $scope.threadId = result.data.threadId;
                                            createPost();
                                            $http.post('/api/v2014/discussions/threads/' + result.data.threadId + '/tags', '"' + $scope.tagIdentifier + '"')
                                                .then(function(result) {
                                                    $scope.startWatching();
                                                    $scope.discussionMessage = 'Discussion srated successfully, please wait while CBD approves your request for discussion.';
                                                });
                                        });
                                } else {
                                    $scope.threadId = resutl.data.threadId;
                                    $scope.discussionMessage = 'Discussion alreay exists and may be in approval process, please contact ABS team for further details.';
                                    createPost();
                                }

                            }).catch(function(error) {
                                $scope.discussionMessage = error.message;
                            }).finally(function() {
                                $timeout(function() {
                                    $scope.discussionMessage = null;
                                }, 10000)
                            });
                    } else {
                        createPost();
                    }

                }

                $scope.loadForum = function() {

                    console.log('loadForum');
                    $http.get('/api/v2014/discussions/forums/' + $scope.forumId + '/threads?tags=' + $scope.tagIdentifier)
                        .then(function(result) {
                            if (result.data.length > 0) {
                                console.log(result.data);
                                $scope.threadId = _.head(result.data).threadId;

                                $scope.forumWatch = null;
                                var forumWatchQuery = $http.get('/api/v2014/discussions/forums/' + $scope.forumId + '/watch');
                                var threadWatchQuery = $http.get('/api/v2014/discussions/threads/' + $scope.threadId + '/watch');
                                $q.when(threadWatchQuery).then(function(result) {
                                    if (result.data.watch)
                                        $scope.threadWatch = result.data;
                                    else {
                                        $q.when(forumWatchQuery).then(function(result) {
                                            $scope.threadWatch = result.data;
                                        });
                                    }
                                });

                            }
                        });
                }

                $scope.$watch('tagIdentifier', function(newVal, oldVal) {
                    console.log(newVal,$scope.threadId)
                    if (newVal && !$scope.threadId)
                        $scope.loadForum();
                });


                $scope.startWatching = function() {
                    var watchDetails = $http.post('/api/v2014/discussions/threads/' + $scope.threadId + '/watch');
                    $q.when(watchDetails).then(function(result) {
                        $scope.threadWatch = result.data;
                    });
                }

                $scope.stopWatching = function() {
                    var watchDetails = $http.delete('/api/v2014/discussions/threads/' + $scope.threadId + '/watch');
                    $q.when(watchDetails).then(function(result) {
                        $scope.threadWatch = result.data;
                    });
                }

                $scope.postLoaded = function(posts){
                     $scope.commentsCount = posts.length;
                     $scope.newest = true;
                }

                function createPost() {

                    var unsafePost = {};
                    unsafePost.subject = $scope.threadTitle
                    unsafePost.message = $scope.post.message;
                    unsafePost.forumId = $scope.forumId;

                    if (unsafePost.subject == '')
                        return;

                    if (unsafePost.message == '')
                        return;

                    unsafePost.parentID = $scope.threadId;
                    unsafePost.threadID = $scope.threadId;

                    $scope.loading = true;
                    $http.post('/api/v2014/discussions/threads/' + $scope.threadId + '/posts', unsafePost)
                        .then(function(data) {
                            console.log(data);
                            $scope.$broadcast("postUpdated", {
                                action: 'new',
                                post: data.data
                            });
                            $scope.post.message = '';
                        }).catch(function(error) {

                            $scope.discussionMessage = error.message;
                            console.log(error);
                        }).finally(function() {
                            $scope.loading = false;
                        });

                }

                $scope.$watch('newest', function(newVal,oldVal){
                    if(newVal!=undefined){
                        $scope.$broadcast('sortPosts', {'field': 'createdOn', 'reverse' : newVal});
                    }
                });

            }]

        }
    });


