import app from '~/app';
import template from "text!./register-top-menu.html";
import _ from 'lodash';
import '~/services/main';
import 'moment';
import registerTopMenuT from '~/app-text/views/register/directives/register-top-menu.json';

app.directive("registerTopMenu", ['roleService', "IWorkflows", '$rootScope', '$location', 'realm', 'translationService',
    function (roleService, IWorkflows, $rootScope, $location, realm, translationService) {

        return {
            restrict: "EA",
            template: template, 
            replace: true,
            transclude: false,
            scope: {},
            link: function($scope, element, attrs) {
                translationService.set('registerTopMenuT', registerTopMenuT);      
                $scope.deviceSize = $rootScope.deviceSize;
                $scope.roles = {
                    isAdministrator: roleService.isAdministrator()
                };
                $scope.user = $rootScope.user;
                $scope.isBCH = realm.is('BCH');
                $scope.isABS = realm.is('ABS');
                $scope.path = $location.absUrl();
                $scope.isPA = false;
                    
            //    if(roleService.isPublishingAuthority() && !$scope.pendingCount ){
            //         $scope.isPA = true;
            //         var expired = moment.utc(new Date()).subtract("12", "weeks");
            //         var query = []; 
            //         query.push({"$and" : [
            //             { "data.realm": realm.value }, 
            //             { "activities.assignedTo": $rootScope.user.userID}, 
            //             { "state": 'running'}, 
            //             { "createdOn": {"$gte": expired }}
            //         ]});
                                    
            //         IWorkflows.query(query, true).then(function (workflows) {
            //             $scope.pendingCount = (workflows||{}).count||0;
            //         });
            //     }

               }
            };
    }]);

