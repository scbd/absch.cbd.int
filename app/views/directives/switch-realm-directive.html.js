define(['app','underscore', '/app/services/app-config-service.js', 'ionsound'],
function(app,_) {
    app.directive('switchRealm', function() {
        return {
            restrict: 'EAC',
            replace: true,
            templateUrl: '/app/views/directives/switch-realm-directive.html',
            controller: ['$scope', '$location','appConfigService','realm',
                function($scope, $location, appConfigService, realm) {

                    console.log(realm);

                    $scope.realmList = [{identifier:'ABS', value:'ABS', message:'PRODUCTION'}
                                        ,{identifier:'ABS-DEV', value:'ABS-DEV', message:'DEVELOPMENT'},
                                        {identifier:'ABS-TRG', value:'ABS-TRG', message:'TRAINING'}]

                    $scope.currentRealm = function(){
                        return appConfigService.currentRealm;
                    }

                    $scope.currentRealmMessage = function(){

                        return _.find($scope.realmList,{identifier:appConfigService.currentRealm}).message;
                    }
                    $scope.switchRealm = function(){
                        appConfigService.setCurrentRealm($scope.selectedRealm);
                        appConfigService.currentRealm   = $scope.selectedRealm;
                        realm.value = appConfigService.currentRealm;
                    }
                }]

        };
    });
});
