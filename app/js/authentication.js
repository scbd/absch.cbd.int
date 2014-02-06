'use strict';

define(['app'], function (app) {

	app.factory('authentication', ["$http", "$browser", function($http, $browser) { 

		var currentUser = null;

		//============================================================
	    //
	    //
	    //============================================================
		function getUser () {

			if(currentUser) return currentUser;

			var headers = { Authorization: "Ticket " + $browser.cookies().authenticationToken };

			currentUser = $http.get('/api/v2013/authentication/user', { headers: headers}).then(function onsuccess (response) {
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

			document.cookie = "authenticationToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
			reset();
		}

		//============================================================
	    //
	    //
	    //============================================================
		function reset () {

			currentUser = undefined;
		}

		return { getUser: getUser, signOut: signOut, reset: reset };

	}]);

	app.factory('authHttp', ["$http", "$browser", function($http, $browser) {

		function addAuthentication(config) {
		
			if(!config)         config         = {};
			if(!config.headers) config.headers = {};

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