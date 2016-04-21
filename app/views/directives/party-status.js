define(['app', '/app/js/common.js'], function (app) {
app.directive('ngPartyStatus', function () {
        return {
            restrict: 'EAC',
            templateUrl : '/app/views/directives/party-status.html',
           
            scope : {
                    code : '=',
                    government : '='
                },
            controller: [ "$scope", '$rootScope', '$filter', '$timeout', 'commonjs', '$q',
					 function ($scope, $rootScope, $filter, $timeout, commonjs, $q) 
					{
					var iso_code;
                    
                    // if($scope.code)
                    //     getStatus($scope.code);
                        
                    if($scope.government)
                        getStatus($scope.government.identifier);
                     
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
            
                    

					}
				]
        };
    });
});

