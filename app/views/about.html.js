define(['app','./app/views/about.html.js'], function (app) {

	app.controller('AboutController', ['$scope','$rootScope', '$location', '$window', function ($scope, $rootScope, $location, $window) {
		$scope.tab = "about";
		$scope.anchor = $location.hash();

		$scope.$watch('anchor', function() { $scope.setTab() });    

		//============================================================
		//
		//
		//============================================================
		$scope.scroll= function scroll () {

			var hash = $location.hash();
			if(hash != null)
				$anchorScroll();

		}

		$scope.setTab = function setTab(){
			$scope.tab = $location.hash();
		}

		}]);
});