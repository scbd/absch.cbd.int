define(['app','underscore'], function(app,_) {
    app.directive('mailboxCompose', function() {
        return {
            restrict: 'EAC',
            replace: true,
            templateUrl: '/app/views/mailbox/compose-directive.html',
            scope : {
                
            },
            controller: ['$scope', '$rootScope', 'IUserNotifications', '$timeout', '$filter',
                function($scope, $rootScope, userNotifications, $timeout, $filter) {

                   $scope.sendMail = function(){
                       $scope.errorMessage = undefined;
                       if($scope.mail.assignedTo && $scope.mail.data.subject && $scope.mail.data.message){
                           $scope.mail.data.mailFolder = 'inbox';
                           userNotifications.create('message', $scope.mail.assignedTo, $scope.mail.data)
                           .then(function (data) {
                               console.log(data);
                           })
                           .catch(function(error){
                               if(error.data.statusCode == 400)
                                    $scope.errorMessage = error.data.code;
                               else  if(error.data.statusCode == 401)
                                    $scope.errorMessage = error.data.code;
                               else  if(error.data.statusCode == 403)
                                    $scope.errorMessage = error.data.code;
                               else  if(error.data.statusCode == 404)
                                    $scope.errorMessage = error.data.code;
                           });                           
                       }                       
                   };
                   
                   $scope.$on('composeMail',function (evt,data) {
                       console.log(data);
                       $scope.errorMessage = undefined;
                       $scope.mail = {};
                       if(data.type=='reply'){
                           $scope.mail.data.subject = 'Re:' + data.mail.data.subject;
                       }
                   });
                    
                }
            ]

        };
    });
});
