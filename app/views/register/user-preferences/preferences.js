define(['app', 'js/common',
'views/register/directives/register-top-menu', 'ngDialog',
'views/register/user-preferences/user-preference-filter',
'services/local-storage-service',
'components/scbd-angularjs-services/services/generic-service', 'services/role-service'
], function (app) {
    app.controller('userPreferencesCtrl', ['$scope', '$http', '$timeout', '$element', 'ngDialog', 
    '$rootScope', 'localStorageService', '$location','IGenericService', 'realm', 'roleService', '$route',
    function ($scope, $http, $timeout, $element, ngDialog, $rootScope, 
        localStorageService, $location, IGenericService, realm, roleService, $route) {
            var user = $rootScope.user;

            $scope.systemAlertsSubscription=[];
            if($route.current.params.tab){
                
                $scope.tab = $route.current.params.tab;                    
                $element.find('.active').removeClass('active fade')
                $timeout(function(){
                    $element.find('#tab-content-'+$scope.tab).removeClass('fade').addClass('active fade-in');
                    $element.find('#tab-'+$scope.tab).addClass('active')
                }, 100);
            }
            else
                $scope.tab = 'subscriptions';

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
                            realm         : realm.value,
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
                     document._id = data.id                     
                     $scope.systemAlertsSubscription.push(document);
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
