define(['app','underscore','ngMaterial','ngAria','angular-animate','scbd-angularjs-services','scbd-angularjs-filters','scbd-angularjs-controls'], function (app, _) {
app.controller("faqController",
	["$rootScope", "$scope", "$q", "underscore",'$http','commonjs',function ($rootScope, $scope, $q, _, $http, commonjs) {	
				
		 $q.when( $http.get('/api/v2015/help-faqs'))
          .then(function(response){
              $scope.faqs = response.data;
          });
          
          $scope.isAdmin = function(){
				return commonjs.isUserInRole($rootScope.getRoleName('AbsAdministrator')) ||
				commonjs.isUserInRole($rootScope.getRoleName('Administrator'))

			};
        
   }]);
});
