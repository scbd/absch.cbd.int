define(['app','underscore','ngSmoothScroll','ngMaterial','ngAria','angular-animate','scbd-angularjs-services','scbd-angularjs-filters','scbd-angularjs-controls'], function (app, _) {
app.controller("AboutController",
	["$rootScope", "$scope", "$q", "underscore",'$http','commonjs','smoothScroll', '$element', function ($rootScope, $scope, $q, _, $http, commonjs, smoothScroll, $element) {

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
				return commonjs.isUserInRole($rootScope.getRoleName('AbsAdministrator')) ||
				commonjs.isUserInRole($rootScope.getRoleName('Administrator'))

			};


		$scope.getTitle = function(id){
			for(var i=0;i<$scope.faqs.length;i++){
				if($scope.faqs[i]._id == id)
					return $scope.faqs[i].title;
			}
			return "";
		}


		$scope.scrollTo = function(rel){
			var element = document.getElementById(rel);
			var options = {
				duration: 700,
				easing: 'easeInQuad',
				offset: 60,
			}

			smoothScroll(element, options);
		}




   }]);
});
