import app from '~/app';
import template from 'text!./message-list-directive.html';
import _ from 'lodash';
    app.directive('mailboxMessageList', function() {
        return {
            restrict: 'EAC',
            replace: true,
            template: template, 
            scope: {
                onSelection: '&',
                onDeletion: '&',
                mailFolder: '='
            },
            controller: ['$scope', '$rootScope', 'IUserNotifications', '$timeout', '$filter',
                function($scope, $rootScope, userNotifications, $timeout, $filter) {

                    $scope.messageSelection = function(type, mail) {

                        if ($scope.onSelection) {
                            var data = {
                                'type': type,
                                'mail': mail
                            };
                            $scope.onSelection({
                                data: data
                            });
                        }
                    };
                    var queries = {
                        "inbox": {
                            $and: [{
                                $or: [{
                                    'state': 'read'
                                }, {
                                    'state': 'unread'
                                }]
                            }, {
                                'type': 'message'
                            }]
                        },
                        "trash": {
                            "data.mailFolder": "inbox",
                            "state": "deleted"
                        },
                        "sent": {
                            "data.mailFolder": "sent"
                        },
                        "draft": {
                            "data.mailFolder": "draft",
                            "state": "drafted"
                        },
                    }
                    $scope.pageNumber = 0;
                    $scope.pageLength = 10;
                    $scope.mailCount = 0
                    $scope.loadMessages = function(newVal) {

                        $scope.errorMessage = undefined;

                        if (!$scope.mailFolder)
                            return;

                        // var query = {
                        //     $and: [{
                        //         "data.mailFolder": newVal
                        //     }]
                        // };
                        userNotifications.query(queries[newVal], $scope.pageNumber, $scope.pageLength)
                            .then(function(data) {
                                $scope.mails = data;
                            })
                            .catch(function(error) {
                                if (error.data.code == 401)
                                    $scope.errorMessage = 'Please signin to view your messages';
                                else if (error.data.code == 403)
                                    $scope.errorMessage = 'You are not authorized to view messages';
                            });
                    };

                    $scope.$watch('mailFolder', function(newVal, oldVal) {
                        //console.log(newVal,oldVal);
                        if (newVal && newVal != oldVal) {
                            $scope.loadMessages(newVal);
                            loadMailCount(newVal);
                        }
                    });

                    function loadMailCount(newVal){

                        userNotifications.query(queries[newVal], null, null,1)
                            .then(function(data) {
                                console.log(data);
                                $scope.mailCount = data.count;
                            })

                    }
                    //
                    $scope.messageSelection('mailList');
                    $scope.mailFolder = 'inbox';
                    $scope.loadMessages('inbox');
                    loadMailCount('inbox');


                    $scope.deleteMail = function() {

                        if (confirm('Are you sure you want to delete this mail(s)?')) {

                            var selectedMails = _.filter($scope.mails, {
                                mailSelected: true
                            });

                            _.forEach(selectedMails, function(mail) {
                                userNotifications.delete(mail.id)
                                    .then(function() {

                                        if ($scope.onDeletion)
                                            $scope.onDeletion({
                                                data: mail
                                            });

                                        $scope.mails.splice(mail, 1);
                                    });
                            });

                        }
                    }

                }
            ]

        };
    });

