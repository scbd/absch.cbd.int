define(['app','underscore','ngMaterial','ngAria','angular-animate','scbd-angularjs-services','scbd-angularjs-filters','scbd-angularjs-controls'], function (app, _) {
app.controller("faqController",
	["$rootScope", "$scope", "$q", "underscore",'$http',function ($rootScope, $scope, $q, _, $http) {	
		
		
		 $q.when( $http.get('/api/v2015/help-faqs'))
          .then(function(response){
              $scope.faqs = response.data;
          });
        
   }]);
});
