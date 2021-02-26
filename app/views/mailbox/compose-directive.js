define(['app','text!./compose-directive.html',
'lodash'], function(app, template,_) {
    app.directive('mailboxCompose', function() {
        return {
            restrict: 'EAC',
            replace: true,
            template: template, 
            scope : {
                onMailComposed : '&'
            },
            controller: ['$scope', '$rootScope', 'IUserNotifications', '$timeout', '$filter',
                function($scope, $rootScope, userNotifications, $timeout, $filter) {

                   $scope.sendMail = function(){
                       $scope.errorMessage = undefined;
                       if($scope.mail.assignedTo && $scope.mail.data.subject && $scope.mail.data.message){
                           $scope.mail.data.mailFolder = 'inbox';
                           userNotifications.create('message', $scope.mail.assignedTo, $scope.mail.data)
                           .then(function (data) {

                               if($scope.onMailComposed)
                                   $scope.onMailComposed({data:data});

                               $scope.mail = undefined;
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

                       var appendMessage = "\n\nOn " +  $filter("formatDateWithTime")(data.mail.createdOn)
                                        + ' ' + data.mail.createdBy_info.firstName + ' ' +  data.mail.createdBy_info.lastName + ' wrote:\n'
                       if(data && data.type=='reply'){
                           $scope.mail.assignedTo = data.mail.createdBy;
                           $scope.mail.data = {};
                           $scope.mail.data.subject = 'Re: ' + data.mail.data.subject;
                           $scope.mail.data.message = appendMessage + data.mail.data.message;
                       }
                       else if(data && data.type=='forward'){
                           $scope.mail.data = {};
                           $scope.mail.data.subject = 'Fw:' + data.mail.data.subject;
                           $scope.mail.data.message = appendMessage + data.mail.data.message;
                       }

                   });


                }
            ]

        };
    });
});
