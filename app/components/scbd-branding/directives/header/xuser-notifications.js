define(['app',
    'text!./xuser-notifications.html', 'lodash', 'moment',
    'css!./xuser-notifications',
    'scbd-angularjs-filters',
    'scbd-angularjs-services/user-notifications', 'ngInfiniteScroll', './xuser-notification-config-service'],
    function (app, template, _, moment) {
        
        app.directive('xuserNotifications', function () {
            return {
                restrict: 'EAC',
                replace: true,
                template: template,
                //needed to hide button in drop down but isolete scope make parent directive disapear
                // stephane help!!!! why is angular crazy here or more like what am I not seeing?
                // scope: {
                //      hideCloseButton: '@',
                // },
                link: function ($scope, element, attrs) {
                    if (attrs.hideCloseButton)
                        $scope.hideCloseButton = attrs.hideCloseButton;
                    else
                        $scope.hideCloseButton = 0;

                },
                controller: ['$scope', '$rootScope', 'IUserNotifications',
                    '$timeout', '$filter', 'authentication', 'cfgUserNotification', '$location',
                    function ($scope, $rootScope, userNotifications, $timeout, $filter,
                        authentication, cfgUserNotification, $location) {

                        $scope.loading = false;
                        var pageNumber = 0;
                        var pageLength = 30;

                        var realmsForQuery = cfgUserNotification.realmsForQuery();

                        $scope.showInView = function () {
                            userNotifications.viewAll = !userNotifications.viewAll;
                        }

                        //============================================================
                        //
                        //
                        //============================================================
                        $scope.goto = function (notification) {
                            var waitTime = 0;
                            if (notification.state === 'unread') {
                                $scope.updateStatus(notification);
                                waitTime = 300;
                            }
                            $timeout(function () {
                                var url = ''
                                if (notification.data && notification.data.documentInfo) {
                                    url = cfgUserNotification.notificationUrl(notification);
                                }
                                else {
                                    url = cfgUserNotification.getURL(notification);
                                }

                                $location.url(url);
                            }, waitTime);
                        };

                        //============================================================
                        //
                        //
                        //============================================================
                        getNotification = function (count) {
                            if ($rootScope.user && $rootScope.user.isAuthenticated) {
                                var queryMyNotifications;
                                queryMyNotifications = {
                                    $and: [{ 'state': 'unread' }],
                                    'data.documentInfo.realm': { $in: realmsForQuery }
                                };

                                userNotifications.query(queryMyNotifications, pageNumber, pageLength, count)
                                    .then(function (data) {

                                        if (count) {
                                            $scope.notificationCount = data.count;
                                            $scope.notificationUnreadCount = data.count;
                                        }
                                        else {
                                            if (!data || data.length === 0)
                                                return;
                                            processNotifications(data);
                                        }
                                    })
                                    .catch(function (error) {
                                        if (error.data && error.data.statusCode == 401) {
                                            // console.log('calling get fetch from notifications' );
                                            //authentication.getUser(true);
                                            continueNotification = false;
                                        }
                                    })
                                    .finally(function () {
                                        $scope.loading = false;
                                    });
                            }
                        };
                        //============================================================
                        //
                        //
                        //============================================================
                        $scope.updateStatus = function (notification) {
                            if (notification && notification.state == 'unread') {
                                userNotifications.update(notification.id, {
                                    'state': 'read'
                                })
                                    .then(function () {
                                        notification.state = 'read';
                                    });
                            }
                            if (notification && notification.state == 'read') {
                                userNotifications.update(notification.id, {
                                    'state': 'unread'
                                })
                                    .then(function () {
                                        notification.state = 'unread';
                                    });
                            }
                        };

                        //============================================================
                        //
                        //
                        //============================================================
                        $scope.markAsRead = function (notification) {
                            if (notification && notification.state == 'unread') {
                                userNotifications.update(notification.id, {
                                    'state': 'read'
                                })
                                    .then(function () {
                                        notification.state = 'read';
                                    });
                            }
                        };
                        //============================================================
                        //
                        //
                        //============================================================
                        $scope.isUnread = function (notification) {

                            return notification && notification.state == 'unread';
                        };

                        $rootScope.$watch('user', function (newVla, oldVal) {
                            //console.log(newVla,oldVal)
                            if (newVla && !angular.equals(newVla, oldVal)) {
                                if (newVla.isAuthenticated) {
                                    getNotification(1);//notification count;
                                    getNotification();
                                }
                            }
                        });

                        $rootScope.$on('event:server-pushNotification', function (evt, data) {
                            if (data.type == 'userNotification') {

                                userNotifications.get(data.data.id)
                                    .then(function (notification) {
                                        processNotifications([notification]);
                                        $scope.notificationCount++;
                                        $scope.notificationUnreadCount++;
                                        //if(ion)
                                        //ion.sound.play("bell_ring");
                                    });
                            }
                            else if (data.type == 'notificationStatus') {
                                 if(data.message == 'markAllRead'){
                                    _.each($scope.notifications, function(notification){
                                        notification.state = 'read';
                                    });
                                    $scope.notificationUnreadCount = 0;
                                }
                                else {
                                    var notification = _.findWhere($scope.notifications, { id: data.data.id });
                                    if (notification) {
                                        $timeout(function () {
                                            notification.state = data.data.state;
                                        });
                                    }
                                    else {
                                        userNotifications.get(data.data.id)
                                            .then(function (data) {
                                                processNotifications([data]);
                                            });
                                    }
                                    if (data.data.state == 'read')
                                        $scope.notificationUnreadCount--;
                                    else if (data.data.state == 'unread')
                                        $scope.notificationUnreadCount++;
                                }
                            }
                        });
                        

                        $rootScope.$on('onNotificationStatusChanged', function (evt, data) {
                            // console.log('onNotificationStatusChanged',data)
                            var notification = _.first(_.where($scope.notifications, { id: data.id }));

                            if (notification) {
                                notification.state = 'read';
                            }

                        });

                        function processNotifications(data) {
                            var localNotifications;
                            if ($scope.notifications) {
                                localNotifications = _.clone($scope.notifications);
                                _.each(data, function (message) {
                                    var exists = _.findWhere(localNotifications, { 'id': message.id });
                                    if (!exists)
                                        localNotifications.push(message);
                                });

                            } else {
                                localNotifications = data;
                                // if(ion && _.some(localNotifications,function(notification){return notification.state == "unread"}))
                                //     ion.sound.play("bell_ring");
                            }
                            $timeout(function () {
                                $scope.notifications = [];
                                $scope.notifications = $filter("orderBy")(localNotifications, 'createdOn', true);
                            });
                        }

                        $scope.loadNotifications = function () {
                            // console.log('load Notification')
                            if (!$scope.enableInfiniteScroll || $scope.loading || $scope.notificationCount <= pageNumber + pageLength)
                                return;
                            $scope.loading = true;

                            pageNumber = pageNumber + pageLength;
                            getNotification();
                        }

                        $scope.markAllRead = function(evt){
                            evt.stopPropagation()
                            userNotifications.markAllRead(realmsForQuery)
                                .then(function() {
                                    _.each($scope.notifications, function(notification){
                                        notification.state = 'read';
                                    });
                                });
                        }

                    }
                ]

            };
        });

    });
