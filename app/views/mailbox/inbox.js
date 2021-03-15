import app from 'app';
import 'views/mailbox/message-directive';
import 'views/mailbox/compose-directive';
import 'views/mailbox/mailbox-menu-directive';
import 'views/mailbox/message-list-directive';
    export default["$scope", "$rootScope",
        function($scope, $rootScope) {



           $scope.onMenuSelection = function(data){
               $scope.mail = undefined;
               $scope.mailCompose = data.type == 'mailCompose';
               $scope.mailList = data.type == 'mailList';
               $scope.mailMessage = data.type == 'mailMessage';
               $scope.mailFolder = data.folder;


               if($scope.mailCompose){
                    $scope.$broadcast('composeMail',data);
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


           $scope.onMailDelete = function(data){
               $scope.$broadcast('mailDeleted',data.mail);

               if(data.type=='delete'){
                   $scope.onMenuSelection({type:'mailList',folder:'inbox'})
               }
           }

           $scope.onMailComposed = function(data){
               $scope.$broadcast('mailComposed',data);
               $scope.mailList = true;
               $scope.mailCompose = false
               $scope.mailFolder = 'inbox';
           }
           ///Reply forward
           $scope.onMailAction = function(data){
               $scope.mailCompose = true;
               $scope.mailList = false;
               $scope.mailMessage = false
               $scope.$broadcast('composeMail',data);
           }

        }];

