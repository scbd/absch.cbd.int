define(['app',
'/app/views/mailbox/message-directive.html.js',
'/app/views/mailbox/compose-directive.html.js',
'/app/views/mailbox/mailbox-menu-directive.html.js',
'/app/views/mailbox/message-list-directive.html.js',], function(app) {
    return["$scope", "$rootScope",
        function($scope, $rootScope) {
    	   
           
           
           $scope.onMenuSelection = function(data){
               $scope.mail = undefined;
               $scope.mailCompose = data.type == 'mailCompose';
               $scope.mailList = data.type == 'mailList';
               $scope.mailMessage = data.type == 'mailMessage';
               $scope.mailFolder = data.folder;
               
               
               if($scope.mailCompose){
                    $scope.$broadcast('composeMail',data.mail);
               }
               else if($scope.mailMessage){
                   $scope.mail = data.mail;
               }
               
           };
           
           $scope.$on('signOut', function(evt,user){
               $scope.mailFolder = undefined;
           });
    	            
           $rootScope.$watch('user', function(newVla,oldVal){
                if(newVla && newVla!=oldVal && newVla.isAuthenticated){
                   $scope.mailFolder = undefined;
                   $scope.mail = undefined;
                   $scope.mailList = true;
                   $scope.mailFolder = 'inbox';
                }                        
           });
           

        }];
});
