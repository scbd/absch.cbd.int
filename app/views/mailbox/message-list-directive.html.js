define(['app','underscore'], function(app,_) {
    app.directive('mailboxMessageList', function() {
        return {
            restrict: 'EAC',
            replace: true,
            templateUrl: '/app/views/mailbox/message-list-directive.html',
            scope : {
                onSelection : '&',
                mailFolder : '='
            },
            controller: ['$scope', '$rootScope', 'IUserNotifications', '$timeout', '$filter',
                function($scope, $rootScope, userNotifications, $timeout, $filter) {
    	           
                   $scope.messageSelection = function(type, mail){
                        
                        if($scope.onSelection){
                            var data ={'type':type, 'mail':mail};
                            $scope.onSelection({data:data});
                        }
                    };
                    var pageNumber = 0;
                    var pageLength = 10;
                    
                    $scope.loadMessages = function(newVal){
                        
                            $scope.errorMessage = undefined; 
                            
                            if(!$scope.mailFolder)   
                                return;
                                
                            var query = {
                                $and: [{
                                    "data.mailFolder": newVal
                                }]
                            };
                            userNotifications.query(query, pageNumber, pageLength)
                                .then(function(data) {
                                    $scope.mails = data;
                                })
                                .catch(function(error){
                                       if(error.data.code == 401)
                                            $scope.errorMessage = 'Please signin to view your messages';
                                       else  if(error.data.code == 403)
                                            $scope.errorMessage = 'You are not authorized to view messages';
                            	});   
                    };
                    
                    $scope.$watch('mailFolder', function(newVal,oldVal){
                        //console.log(newVal,oldVal);
                        if(newVal && newVal!=oldVal){
                            $scope.loadMessages(newVal);    
                        }
                    });
//                   
//                    $scope.messageSelection('mailList');
//                     $scope.loadMessages('inbox');
                }
            ]

        };
    });
});
