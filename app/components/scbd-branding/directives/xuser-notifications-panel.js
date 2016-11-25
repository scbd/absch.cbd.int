define(['app',
  'text!./xuser-notifications-panel.html','lodash','moment',
  'css!./xuser-notifications-panel',
  'scbd-angularjs-filters',
  'scbd-angularjs-services/user-notifications', 'ngInfiniteScroll', './header/xuser-notification-config-service'],
function(app, template,_,moment) {
    
    app.directive('xuserNotificationsPanel', function() {
        return {
            restrict: 'EAC',
            replace: true,
            template: template,
            scope: {
                 pagesize: '@',
                 page: '@',
                 docId: '=',
            },
            link: function ($scope, element, attrs){
              if(attrs.hideCloseButton)
                $scope.hideCloseButton=attrs.hideCloseButton;
              else
                $scope.hideCloseButton=0;

            },
            controller: ['$scope', '$rootScope', 'IUserNotifications',
                        '$timeout', '$filter','authentication','cfgUserNotification','$location', '$window',
                function($scope, $rootScope, userNotifications, $timeout, $filter,
                        authentication, cfgUserNotification, $location, $window) {

                    var realmsForQuery = cfgUserNotification.realmsForQuery();

                    $scope.loading = false;
                    var pageNumber = 0;
                    var pageLength = 30;
                    var notificationCount;

                    if($scope.pagesize)
                        var pageLength = $scope.pagesize;

                    if($scope.page)
                        var pageNumber = $scope.page;

                    $scope.showInView =function(){
                      userNotifications.viewAll=!userNotifications.viewAll;
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


                     //*************************************************************************************************************************************
                     $scope.hasState = function(item) {
                            if(!$scope.stateFilter || $scope.stateFilter === 'All'){
                                return true;
                            }
                            if($scope.stateFilter === item.state){
                                return item;
                            }
                            else{
                                return false;
                            }
                        };

                    //*************************************************************************************************************************************
                     $scope.hasType = function(item) {
                            if(!$scope.typeFilter || $scope.typeFilter === 'All'){
                                return true;
                            }
                            if($scope.typeFilter ==='request' && item.data.action==='request' && (!item.data.iteration || item.data.iteration===1)){
                                    return item;
                            }
                            else if ($scope.typeFilter ==='reminder' && item.data.action==='request' && item.data.iteration > 1){
                               return item ;
                            }
                            else if($scope.typeFilter === item.data.action){
                                return item;
                            }
                            else if($scope.typeFilter === 'alert' && item.data.action==='published' && item.type==='subscriptionNotification'){
                                return item;
                            }
                            else
                                return false;
                        };

    	           var notificationTimer;
                    //============================================================
                    //
                    //
                    //============================================================
                    getNotification = function(count) {
                        if ($rootScope.user && $rootScope.user.isAuthenticated) {
                            $scope.loading = true;
                            
                             var queryMyNotifications = {'data.documentInfo.realm' : {$in  : realmsForQuery}};

                             if($scope.docId)
                                 queryMyNotifications = { 
                                     'data.documentInfo.realm' : {$in  : realmsForQuery},
                                     $and : [{"data.documentInfo.identifier": $scope.docId}]
                                    };

                            userNotifications.query(queryMyNotifications, pageNumber, pageLength, count)
                                .then(function(data) {

                                    if(count)
                                        notificationCount = data.count;
                                    else {
                                        if (!data || data.length === 0)
                                            return;

                                        processNotifications(data);
                                    }
                                })
                                .catch(function(error){
                                    if(error.data && error.data.statusCode==401){
                                       // console.log('calling get fetch from notifications' );
                                        //authentication.getUser(true);
                                         continueNotification = false;
                                    }
                                })
                                .finally(function(){
                                    $scope.loading = false;
                                });
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
                        if (notification && notification.state =='unread') {
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

                    $rootScope.$on('event:server-pushNotification', function(evt,data){
                        if(data.type == 'userNotification'){
                            
                            userNotifications.get(data.data.id)
                            .then(function(notification) {
                                 if(notification.data && notification.data.documentInfo){
                                   if(_.contains(realmsForQuery, notification.data.documentInfo.realm.toUpperCase())){
                                        processNotifications([notification]);
                                        notificationCount++;
                                   }
                                }
                                //if(ion)
                                    //ion.sound.play("bell_ring");
                            });
                        }
                        else if(data.type == 'notificationStatus'){
                            if(data.message == 'markAllRead'){
                                _.each($scope.notifications, function(notification){
                                    notification.state = 'read';
                                });
                            }
                            else {
                                var notification = _.findWhere($scope.notifications, {id: data.data.id});
                                if(notification)
                                    $timeout(function(){notification.state = data.data.state;});
                            }

                        }
                    });

                    $rootScope.$on('onNotificationStatusChanged', function(evt,data){
                        // console.log('onNotificationStatusChanged',data)
                        var notification = _.first(_.where($scope.notifications, {id:data.id}));

                        if(notification){
                            notification.state = 'read';
                        }

                    });

                    function processNotifications(data){
                        var localNotifications;
                        if ($scope.notifications) {
                            localNotifications = _.clone($scope.notifications);
                            _.each(data, function(message) {
                                var exists = _.findWhere(localNotifications,{'id':message.id});
                                if(!exists)
                                    localNotifications.push(message);
                            });
                        } else {
                            localNotifications = data;

                            //if(ion && _.some(localNotifications,function(notification){return notification.state == "unread"}))
                                //ion.sound.play("bell_ring");
                        }
                        $timeout(function(){
                            $scope.notifications = [];
                            $scope.notifications = $filter("orderBy")(localNotifications, 'createdOn', true);
                        });
                    }

                    $scope.loadNotifications = function(){
                        // console.log('load Notification')
                        if($scope.loading || notificationCount <= pageNumber + pageLength)
                            return;
                        $scope.loading = true;

                         pageNumber = pageNumber + pageLength;
                         getNotification();
                    }
                    $scope.markAllRead = function(){
                         userNotifications.markAllRead(realmsForQuery)
                            .then(function() {
                                _.each($scope.notifications, function(notification){
                                    notification.state = 'read';
                                });
                            });
                    }

                    getNotification(1);//notification count;
                    getNotification();

                }
            ]

        };
    });

});
