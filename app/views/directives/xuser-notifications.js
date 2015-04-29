define(['app'], function(app) {
    app.directive('xuserNotifications', function() {
        return {
            restrict: 'EAC',
            replace: true,
            templateUrl: '/app/views/directives/xuser-notifications.html',
            controller: ['$scope', '$rootScope', 'IUserNotifications', '$timeout', '$filter','authentication',
                function($scope, $rootScope, userNotifications, $timeout, $filter, authentication) {


                    var pageNumber = 0;
                    var pageLength = 10;
                    // var canQuery = true;


                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.timePassed = function(createdOn) {
                        var timespan = moment(createdOn);
                        return timespan.startOf('hours').fromNow(true);
                    }

                    //============================================================
                    //
                    //
                    //============================================================
                    getNotification = function() {
                        if ($rootScope.user && $rootScope.user.isAuthenticated) {
                            // if (canQuery) {
                            var queryMyNotifications;
                            // canQuery = false;
                            if ($scope.notifications) {
                                var notification = _.first($scope.notifications);
                                if (notification)
                                    queryMyNotifications = {
                                        $and: [{
                                            "createdOn": {
                                                "$gt": new Date(notification.createdOn).toISOString()
                                            }
                                        }]
                                    };
                            }
                            //$and: [{"_id": {"$gt": notification._id}}]

                            userNotifications.query(queryMyNotifications, pageNumber, pageLength)
                                .then(function(data) {
                                    if (!data || data.length === 0)
                                        return;
                                    var localNotifications;
                                    if ($scope.notifications) {
                                        localNotifications = _.clone($scope.notifications);
                                        _.each(data, function(message) {
                                            localNotifications.push(message);
                                        });
                                    } else {
                                        localNotifications = data;
                                    }
                                    $scope.notifications = [];
                                    $scope.notifications = $filter("orderBy")(localNotifications, 'createdOn', true);
                                })
                                .catch(function(error){
                                    if(error.data.statusCode==401){
                                        authentication.getUser(true);
                                    }
                                })
                                .finally(function() {
                                    $timeout(function() {
                                        getNotification();
                                    }, 10000);
                                });
                            //}
                        }

                    };
                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.updateStatus = function(notification) {
                        if (notification && notification.state == 'unread') {
                            userNotifications.update(notification.id, {
                                    'state': 'read'
                                })
                                .then(function() {
                                    notification.state = 'read';
                                });
                        }
                        if (notification && notification.state == 'read') {
                            userNotifications.update(notification.id, {
                                    'state': 'unread'
                                })
                                .then(function() {
                                    notification.state = 'unread';
                                });
                        }
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.markAsRead = function(notification) {
                        if (notification) {
                            userNotifications.update(notification.id, {
                                    'state': 'read'
                                })
                                .then(function() {
                                    notification.state = 'read';
                                });
                        }
                    };
                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.isUnread = function(notification) {

                        return notification && notification.state == 'unread';
                    };

                    $scope.$on('signIn', function(evt,user){
                        getNotification();
                    });

                    getNotification();




                }
            ]

        };
    });
});
