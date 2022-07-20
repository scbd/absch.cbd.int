import app from '~/app';
import template from 'text!./mailbox-menu-directive.html';
import _ from 'lodash';
    app.directive('mailboxMenu', function() {
        return {
            restrict: 'EAC',
            replace: true,
            template: template, 
            scope : {
                onSelection : '&'
            },
            controller: ['$scope', '$rootScope', 'IUserNotifications', '$timeout', '$filter','$q',
                function($scope, $rootScope, userNotifications, $timeout, $filter, $q) {

                    $scope.menuSelection = function(type,link){

                        if($scope.onSelection){
                            var data = {'type':type, 'folder':link};//, 'query' : queries[link]
                            $scope.onSelection({data:data});
                        }
                    };

                    $scope.$on('signOut', function(evt,user){
                        loadFolderCount();
                    });

                    var queries = {
                        "inbox" : {$and :[{$or:[{'state': 'read'},{'state': 'unread'}]}, {'type':'message'}]},
                        "trash" : {"data.mailFolder": "inbox","state":"deleted"},
                        "sent"  : {"data.mailFolder": "sent"},
                        "draft" : {"data.mailFolder": "draft","state":"drafted"},
                    }

                    function loadFolderCount(){

                        var inbox = userNotifications.query(queries.inbox,null,null,1);
                        var trash = userNotifications.query(queries.trash,null,null,1);

                        $q.all([inbox,trash])
                        .then(function(data){
                            $scope.inboxCount = data[0].count;
                            $scope.trashCount = data[1].count;
                        });
                    }

                    loadFolderCount();


                    $scope.$on('mailDeleted', function(evt,mail){
                        $scope.inboxCount--;
                        $scope.trashCount++;
                    });

                    // $scope.$on('mailComposed', function(evt,mail){
                    //     //$scope.inboxCount++;
                    // });

                }
            ]

        };
    });

