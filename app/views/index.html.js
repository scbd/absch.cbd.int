require('app').controller('IndexController', ['$scope', '$http', '$window', '$cookies', function ($scope, $http, $window, $cookies) {

	$scope.email = null;
	$scope.password = null;

	//============================================================
	//
	//
	//============================================================
	$scope.doSignIn = function doSignIn () {

		$scope.errorInvalid = false;
        $scope.errorTimeout = false;
        $scope.waiting      = true;

        //

        var credentials = { 'email': $scope.email, 'password': $scope.password };

        $http.post('/api/v2013/authentication/token', credentials).then(function onsuccess(success) {

			$cookies.authenticationToken = success.data.authenticationToken;
            $cookies.email = $scope.rememberMe ? $scope.email : undefined;

            var response = { type: 'setAuthenticationToken', authenticationToken: $cookies.authenticationToken, setAuthenticationEmail: $cookies.email };
        	
        	var authenticationFrame = angular.element(document.querySelector('#authenticationFrame'))[0];
            authenticationFrame.contentWindow.postMessage(JSON.stringify(response), 'https://accounts.cbd.int');

        	$window.location.href = $window.location.href;

        }, function onerror(error) {

        	$scope.password     = "";
            $scope.errorInvalid = error.status == 403;
            $scope.errorTimeout = error.status != 403;
            $scope.waiting      = false;
        });
	}

}]);
