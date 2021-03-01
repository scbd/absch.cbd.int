define(['app','text!./xuser-notifications-icon.html','css!components/scbd-branding/directives/header/xuser-notifications-icon',
        'components/scbd-angularjs-services/main','./xuser-notifications'],
function(app,template) {
    app.directive('xuserNotificationsIcon', function() {
        return {
            restrict: 'E',
            replace: true,
            template: template,

            controller: ['$scope',  'IUserNotifications', 'cfgUserNotification',
                function($scope,  userNotifications, cfgUserNotification) {
                    $scope.userNotifications=userNotifications;

                    $scope.showInView =function(){
                      userNotifications.viewAll=!userNotifications.viewAll;
                    }

                    $scope.viewAllUrl = cfgUserNotification.notificationUrls.viewAllNotificationUrl;
                }]};
    });
});
