define(['app', "text!views/register/directives/register-top-menu.html",
'underscore', 'services/role-service', 'moment','js/common'], function(app, template, _) {

    app.directive("registerTopMenu", ['roleService',"IWorkflows", '$rootScope', '$location', 'realm', function(roleService, IWorkflows,  $rootScope, $location, realm) {

        return {
            restrict: "EA",
            template: template, 
            replace: true,
            transclude: false,
            scope: {},
            link: function($scope, element, attrs) {

                $scope.roles = {
                    isAdministrator: roleService.isAdministrator(),
                    isAbsAdministrator: roleService.isAbsAdministrator()
                };
                $scope.user = $rootScope.user;
                $scope.isBCH = realm.is('BCH');
                $scope.isABS = realm.is('ABS');
                $scope.path = $location.absUrl();
                $scope.isPA = false;
                    
            //    if(roleService.isAbsPublishingAuthority() && !$scope.pendingCount ){
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
});
