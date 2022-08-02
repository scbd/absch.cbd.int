import app from '~/app';
import template from 'text!./party-status.html';
import '~/services/main';
import partyStatusT from '~/app-text/views/directives/party-status.json';

app.directive('ngPartyStatus', function () {
        return {
            restrict: 'EAC',
            template : template,           
            scope : {
                    code : '=',
                    government : '='
                },
            link: function ($scope, element, attrs) {
                
            },
            controller: ["$scope", '$rootScope', '$filter', '$timeout', 'commonjs', '$q', 'realm', 'translationService',
                function ($scope, $rootScope, $filter, $timeout, commonjs, $q, realm, translationService) {
                var iso_code;
                translationService.set('partyStatusT', partyStatusT);
                $scope.isAbs = realm.is('ABS');
                $scope.isBch = realm.is('BCH');
                // if($scope.code)
                //     getStatus($scope.code);
                    
                // if($scope.government)
                //     getStatus($scope.government.identifier);
                    
                function getStatus(code){ 
                    if(!code)return;
                    code = code.toUpperCase();
                    $q.when(commonjs.getCountry(code))
                        .then(function(country){
                            $scope.partyStatus = country;
                        });
                }
                
                $scope.$watch('code', function(newValue, oldValue){
                    //if(newValue && newValue != oldValue){
                        getStatus($scope.code); 
                    //}
                });
                
                $scope.$watch('government', function(newValue, oldValue){
                    //if(newValue && newValue != oldValue){
                        if($scope.government)
                        getStatus($scope.government.identifier); 
                    //}
                });

            }]
        };
    });


