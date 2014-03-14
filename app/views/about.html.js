require('app').controller('AboutController', ['$scope','$rootScope', '$location', '$window', function ($scope, $rootScope, $location, $window) {


$scope.tab = "about";


//============================================================
//
//
//============================================================
$scope.scroll= function scroll () {

	var hash = $location.hash();
	if(hash != null)
		$anchorScroll();
}


}]);