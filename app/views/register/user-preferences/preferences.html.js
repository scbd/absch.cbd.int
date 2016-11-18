define(['app', '/app/js/common.js',
'/app/views/register/directives/register-top-menu.js', 'ngDialog',
'/app/views/register/user-preferences/user-preference-filter.js',
'/app/services/local-storage-service.js','angular-gravatar',
'scbd-angularjs-services/generic-service', '/app/services/role-service.js'
], function (app) {
    app.controller('userPreferencesCtrl', ['$scope', '$http', '$timeout', '$element', 'ngDialog', 
    '$rootScope', 'localStorageService', '$location','IGenericService', 'realm', 'roleService',
    function ($scope, $http, $timeout, $element, ngDialog, $rootScope, 
        localStorageService, $location, IGenericService, realm, roleService) {
            var user = $rootScope.user;

            $scope.systemAlertsSubscription=[];

            if(user.government){

                if(roleService.isAbsPublishingAuthority() ||
                    roleService.isAbsNationalAuthorizedUser() ||
                    roleService.isAbsNationalFocalPoint()){

                        $scope.showSystemAlerts = true;
                }
            }

            $scope.runFilter = function(filter){

                localStorageService.set("run-query", filter.filters)
                $location.path('/search/run-query')
            }
            
            $scope.$watch('tab', function(newVal){
                if(newVal && newVal=='subscriptions' && $scope.showSystemAlerts){
                    // if(!$scope.systemAlertsSubscription){
                        var query = {
                            realm         : realm,
                            isSystemAlert : true
                        }
                        IGenericService.query('v2016', 'me/subscriptions', query)
                        .then(function (data) {
                            $scope.systemAlertsSubscription = data
                        });
                    // }
                }
            });


            $scope.hasUserSubscribed = function(event){
                return $scope.systemAlertsSubscription && 
                       _.some($scope.systemAlertsSubscription, function(alert){
                           return alert.isSystemAlert &&
                                  _.contains(_.pluck(alert.filters, 'id'), event);
                       })
            }

            $scope.subscribe = function(event){
                var document = {
                    queryTitle : event + " system alert",
                    isSystemAlert : true,                                       
                    realm : realm.value,
                    filters : [ 
                            { "type" : "national", "id" : event }, 
                            { "type" : "country", "id" : user.government } ]
                };
                IGenericService.create('v2016', 'me/subscriptions', document)
                .then(function (data) {
                     IGenericService.get('v2016', 'me/subscriptions', data.id)
                     .then(function (event) {
                        $scope.systemAlertsSubscription.push(event)
                     })
                });;
              
            }

            $scope.unsubscribe = function(event){
                if($scope.systemAlertsSubscription){ 
                    var event = _.find($scope.systemAlertsSubscription, function(alert){
                                return alert.isSystemAlert &&
                                        _.contains(_.pluck(alert.filters, 'id'), event);
                            })
                   IGenericService.delete('v2016', 'me/subscriptions', event._id)
                   .then(function (event) {
                        $scope.systemAlertsSubscription
                              .splice($scope.systemAlertsSubscription.indexOf(event), 1)
                     });
                }
            }
        }]
    );

});
