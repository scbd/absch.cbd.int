define(['app','underscore'], function(app,_) {
    app.directive('mailboxMenu', function() {
        return {
            restrict: 'EAC',
            replace: true,
            templateUrl: '/app/views/mailbox/mailbox-menu-directive.html',
            scope : {
                onSelection : '&'
            },
            controller: ['$scope', '$rootScope', 'IUserNotifications', '$timeout', '$filter',
                function($scope, $rootScope, userNotifications, $timeout, $filter) {

                    $scope.menuSelection = function(type,link){
                        
                        if($scope.onSelection){
                            var data = {'type':type, 'folder':link};
                            $scope.onSelection({data:data});
                        }
                    };
                    
                   
                    
                }
            ]

        };
    });
});
