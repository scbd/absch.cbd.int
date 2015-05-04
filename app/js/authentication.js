'use strict';

define(['app'], function (app) {

	app.factory('authentication', ["$http", "$browser","$rootScope", function($http, $browser, $rootScope) {

		var currentUser = null;

		//============================================================
	    //
	    //
	    //============================================================
		function getUser (refetch) {

			if(refetch)
				currentUser = null;

			if(currentUser) return currentUser;

			var headers = {}
			//console.log($browser.cookies().authenticationToken);
				headers = { Authorization: "Ticket " + $browser.cookies().authenticationToken };

			currentUser = $http.get('/api/v2013/authentication/user', { headers: headers}).then(function onsuccess (response) {
				$rootScope.user = response.data;
				
				return response.data;
			}, function onerror (error) {
				return { userID: 1, name: 'anonymous', email: 'anonymous@domain', government: null, userGroups: null, isAuthenticated: false, isOffline: true, roles: [] };
			});
		
			return currentUser;
		}

		//============================================================
	    //
	    //
	    //============================================================
		function signOut () {
			//console.log('signnnnouttttttt');
			var response = { type: 'setAuthenticationToken', authenticationToken: null, setAuthenticationEmail: $browser.cookies().email||'' };
			//console.log($browser.cookies().authenticationToken)
			$browser.cookies().authenticationToken = '';
//			document.cookie = "authenticationToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
			reset();
			
			var authenticationFrame = angular.element(document.querySelector('#authenticationFrame'))[0];
			authenticationFrame.contentWindow.postMessage(JSON.stringify(response), 'https://accounts.cbd.int');
		}

		//============================================================
	    //
	    //
	    //============================================================
		function reset () {

			currentUser = undefined;
			$rootScope.user = undefined;
		}

		return { getUser: getUser, signOut: signOut, reset: reset };

	}]);

	app.factory('authHttp', ["$http", "$browser","realm","$location", function($http, $browser,realm,$location) { 

		function addAuthentication(config) {

			if(!config)         config         = {};
			if(!config.headers) config.headers = {};
			// if($location.$$host != 'absch.cbd.int' && realm.value != "ABS-DEV"){
			// 	realm.value = "ABS-DEV";
			// 	config.headers.realm = realm.value;
			// }
			config.headers.realm = realm.value;

			if($browser.cookies().authenticationToken) config.headers.Authorization = "Ticket "+$browser.cookies().authenticationToken;
			else                                       config.headers.Authorization = undefined;

			return config;
		}

		function authHttp(config) {
			return $http(addAuthentication(config));
		}

		authHttp["get"   ] = function(url,       config) { return authHttp(angular.extend(config||{}, { 'method' : "GET"   , 'url' : url })); };
		authHttp["head"  ] = function(url,       config) { return authHttp(angular.extend(config||{}, { 'method' : "HEAD"  , 'url' : url })); };
		authHttp["delete"] = function(url,       config) { return authHttp(angular.extend(config||{}, { 'method' : "DELETE", 'url' : url })); };
		authHttp["jsonp" ] = function(url,       config) { return authHttp(angular.extend(config||{}, { 'method' : "JSONP" , 'url' : url })); };
		authHttp["post"  ] = function(url, data, config) { return authHttp(angular.extend(config||{}, { 'method' : "POST"  , 'url' : url, 'data' : data })); };
		authHttp["put"   ] = function(url, data, config) { return authHttp(angular.extend(config||{}, { 'method' : "PUT"   , 'url' : url, 'data' : data })); };

		return authHttp;
	}]);

});
