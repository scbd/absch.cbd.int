define(['app','underscore'], function(app,_) {
    app.directive('mailboxMessage', function() {
        return {
            restrict: 'EAC',
            replace: true,
            templateUrl: '/app/views/mailbox/message-directive.html',
            scope : {
                mail : '='
            },
            controller: ['$scope', '$rootScope', 'IUserNotifications', '$timeout', '$filter',
                function($scope, $rootScope, userNotifications, $timeout, $filter) {

                   
                    
                }
            ]

        };
    });
});
