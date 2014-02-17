require('app').controller('CallbackController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

	//============================================================
    // TODO: USE ANGULARJS EQUIVALENT
    //
    //============================================================
     function setCookie (name, value, days, path) {

        var cookieString = escape(name) + "=";

        if(value) cookieString += escape(value);
        else      days = -1;

        if(path)
            cookieString += "; path=" + path;

        if(days || days == 0) {

            var expirationDate = new Date();

            expirationDate.setDate(expirationDate.getDate() + days);

            cookieString += "; expires=" + expirationDate.toUTCString();
        }

        document.cookie = cookieString
    };

	var code  = $location.search().code||'';
    var state = $location.search().state||'';

    if(code) {
    	setCookie('authenticationToken', code, 1, '/');
    	$location.path(state || '/').search('');
    } else {
    	alert('invalid code');
    }

}]);
