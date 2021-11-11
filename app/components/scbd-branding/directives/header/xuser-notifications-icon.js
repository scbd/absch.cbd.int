import app from 'app';
import template from 'text!./xuser-notifications-icon.html';
import 'css!components/scbd-branding/directives/header/xuser-notifications-icon';
import 'components/scbd-angularjs-services/main';
import './xuser-notifications';
    app.directive('xuserNotificationsIcon', function() {
        return {
            restrict: 'E',
            replace: true,
            template: template,

            controller: ['$scope',  'IUserNotifications', 'cfgUserNotification',
                function($scope,  userNotifications, cfgUserNotification) {
                    $scope.userNotifications=userNotifications;

                    $scope.showInView =function(){
                      userNotifications.viewAll=true;
                    }

                    $scope.viewAllUrl = cfgUserNotification.notificationUrls.viewAllNotificationUrl;
                }]};
    });

