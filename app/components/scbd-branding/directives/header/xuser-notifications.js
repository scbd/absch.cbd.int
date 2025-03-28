import app from '~/app';
import template from 'text!./xuser-notifications.html';
import _ from 'lodash';
import moment from 'moment';
import '~/components/scbd-branding/directives/header/xuser-notifications.css';
import '~/components/scbd-angularjs-services/main';
import 'ngInfiniteScroll';
import './xuser-notification-config-service';
        
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
                    async function ($scope, $rootScope, userNotifications, $timeout, $filter,
                        authentication, cfgUserNotification, $location) {
                            
                        $scope.deviceSize = $rootScope.deviceSize;
                        $scope.loading = false;
                        var pageNumber = 0;
                        var pageLength = 30;

                        const realmsForQuery = await cfgUserNotification.realmsForQuery();

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
                            
                                let url;
                                if (notification.data && notification.data.documentInfo) {
                                    url = cfgUserNotification.notificationUrl(notification);
                                } else {
                                    url = cfgUserNotification.getURL(notification);
                                }

                                $location.url(url);
                                
                            }, waitTime);
                        };

                        //============================================================
                        //
                        //
                        //============================================================                      

                        var getNotification = function (count, type) {
                            
                            if ($rootScope.user && $rootScope.user.isAuthenticated) {
                                var queryMyNotifications;
                                queryMyNotifications = {
                                    'data.documentInfo.realm': { $in: realmsForQuery }
                                };

                                if(type)
                                    queryMyNotifications['state'] = 'unread';

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
                            if (newVla && (!angular.equals(newVla, oldVal) || 
                                          (!$scope.notificationCount && newVla.isAuthenticated) && !$scope.loading)) {
                                if (newVla.isAuthenticated) {
                                    getNotification(1, 'unread');//notification count;
                                    getNotification(null, 'unread');
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
                                    _.forEach($scope.notifications, function(notification){
                                        notification.state = 'read';
                                    });
                                    $scope.notificationUnreadCount = 0;
                                }
                                else {
                                    var notification = _.find($scope.notifications, { id: data.data.id });
                                    if (notification) {
                                        $timeout(function () {
                                            notification.state = data.data.state;
                                        });
                                    }
                                    else {
                                        $scope.loading = true;
                                        userNotifications.get(data.data.id)
                                            .then(function (data) {
                                                processNotifications([data]);
                                            })
                                            .finally(function(){$scope.loading = false;});
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
                            var notification = _.head(_.filter($scope.notifications, { id: data.id }));

                            if (notification) {
                                notification.state = 'read';
                            }

                        });

                        function processNotifications(data) {
                            var localNotifications;
                            if ($scope.notifications && $scope.notifications.length>0) {
                                localNotifications = _.clone($scope.notifications);
                                _.forEach(data, function (message) {
                                    var exists = _.forEach(localNotifications, { 'id': message.id });
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
                            getNotification(null, 'all');
                        }

                        $scope.markAllRead = function(evt){
                            evt.stopPropagation()
                            userNotifications.markAllRead(realmsForQuery)
                                .then(function() {
                                    _.forEach($scope.notifications, function(notification){
                                        notification.state = 'read';
                                    });
                                });
                        }

                        $scope.loadRecords = function(evt, type){
                            evt.stopPropagation();
                            $scope.activeLink=type;
                            $scope.notifications = [];
                            getNotification(null, type=='unread' ? type :undefined);
                        }
                    }
                ]

            };
        });

    
