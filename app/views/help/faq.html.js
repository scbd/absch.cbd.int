define(['app','underscore','ngSmoothScroll','ngAria','angular-animate','scbd-angularjs-services',
'scbd-angularjs-filters','scbd-angularjs-controls', '/app/services/role-service.js'], function (app, _) {
app.controller("faqController",
	["$rootScope", "$scope", "$q", "underscore",'$http','commonjs','smoothScroll', '$element', 'roleService', function ($rootScope, $scope, $q, _, $http, commonjs, smoothScroll, $element, roleService) {

		 $q.when( $http.get('/api/v2015/help-faqs'))
          .then(function(response){
               $scope.faqSearch = response.data;

			   $scope.faqs = _(response.data).reduce(function(memo, o) {
				    _(o.tags).each(function(i) {
				        memo[i] = memo[i] || [ ];
				        memo[i].push(o);
				    });
				    return memo;
				}, { });
          });

          $scope.isAdmin = function(){
				return roleService.isAbsAdministrator() ||
				roleService.isAdministrator()

			};


		$scope.getTitle = function(id){
			for(var i=0;i<$scope.faqs.length;i++){
				if($scope.faqs[i]._id == id)
					return $scope.faqs[i].title;
			}
			return "";
		}


   }]);
});
