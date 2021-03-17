import app from 'app';
import template from 'text!./message-directive.html';
import _ from 'lodash';
    app.directive('mailboxMessage', function() {
        return {
            restrict: 'EAC',
            replace: true,
            template: template, 
            scope: {
                mail: '=',
                onReply: '&',
                onForward: '&',
                onDelete: '&',
            },
            controller: ['$scope', 'IUserNotifications','$rootScope', function($scope, userNotifications,$rootScope) {

                $scope.reply = function() {
                    var data = {
                        'mail': $scope.mail,
                        'type': 'reply'
                    }
                    if ($scope.onReply) {
                        $scope.onReply({
                            data: data
                        })
                    }
                }

                $scope.forward = function() {
                    var data = {
                        'mail': $scope.mail,
                        'type': 'forward'
                    }
                    if ($scope.onForward) {
                        $scope.onForward({
                            data: data
                        })
                    }
                }

                $scope.delete = function() {

                    if (confirm('Are you sure you want to delete this mail?')) {
                        userNotifications.delete($scope.mail.id)
                            .then(function() {
                                if ($scope.onDelete) {
                                    var data = {
                                        'mail': $scope.mail,
                                        'type': 'delete'
                                    }
                                    $scope.onDelete({
                                        data: data
                                    })
                                }
                            });
                    }
                }

                $scope.$watch('mail', function(newVal) {
                    if (newVal && newVal.state == 'unread') {
                        userNotifications.update(newVal.id, {
                                'state': 'read'
                            })
                            .then(function() {
                                newVal.state = 'read';
                                $rootScope.$emit('onNotificationStatusChanged',newVal);
                            });
                    }
                })

            }]

        };
    });

